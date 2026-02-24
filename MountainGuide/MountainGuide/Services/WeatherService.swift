import Foundation
import CoreLocation

// MARK: - Weather Service (Open-Meteo API)

@MainActor
class WeatherService: ObservableObject {
    static let shared = WeatherService()

    @Published var currentConditions: WeatherConditions?
    @Published var mountainWeather: MountainWeather?
    @Published var hourlyForecast: [HourlyForecast] = []
    @Published var dailyForecast: [DailyForecast] = []
    @Published var pressureTrend: PressureTrend = .stable
    @Published var locationName: String?
    @Published var elevation: Int?
    @Published var isLoading = false
    @Published var error: String?
    @Published var thermalForecast: ThermalForecast?
    @Published var hourlyThermals: [HourlyThermalForecast] = []
    @Published var recentPrecipitation: Double = 0  // mm over past 6h

    private var lastFetchTime: Date?
    private var lastLocation: CLLocationCoordinate2D?
    private let cacheInterval: TimeInterval = 30 * 60 // 30 minutes

    private let decoder = JSONDecoder()

    func fetchWeather(latitude: Double, longitude: Double) async {
        // Check cache
        if let lastFetch = lastFetchTime,
           let lastLoc = lastLocation,
           Date().timeIntervalSince(lastFetch) < cacheInterval,
           abs(lastLoc.latitude - latitude) < 0.01,
           abs(lastLoc.longitude - longitude) < 0.01 {
            return
        }

        isLoading = true
        error = nil

        let urlString = "https://api.open-meteo.com/v1/forecast"
            + "?latitude=\(latitude)&longitude=\(longitude)"
            + "&current=temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,cloud_cover,surface_pressure,relative_humidity_2m,visibility,snow_depth,is_day,weather_code"
            + "&hourly=temperature_2m,precipitation,wind_speed_10m,cloud_cover,weather_code"
            + "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,weather_code,wind_speed_10m_max,wind_gusts_10m_max"
            + "&forecast_days=7"
            + "&past_hours=6"
            + "&timezone=auto"

        guard let url = URL(string: urlString) else {
            error = "Invalid URL"
            isLoading = false
            return
        }

        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            let response = try decoder.decode(OpenMeteoResponse.self, from: data)
            parseResponse(response)
            lastFetchTime = Date()
            lastLocation = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
        } catch {
            self.error = "Failed to fetch weather data"
        }

        // Reverse geocode location name
        await reverseGeocode(latitude: latitude, longitude: longitude)

        // Fetch mountain-level winds separately
        await fetchMountainWeather(latitude: latitude, longitude: longitude)

        isLoading = false
    }

    private func fetchMountainWeather(latitude: Double, longitude: Double) async {
        let urlString = "https://api.open-meteo.com/v1/forecast"
            + "?latitude=\(latitude)&longitude=\(longitude)"
            + "&hourly=temperature_800hPa,temperature_700hPa,temperature_600hPa"
            + ",windspeed_800hPa,windspeed_700hPa,windspeed_600hPa"
            + ",winddirection_800hPa,winddirection_700hPa,winddirection_600hPa"
            + "&current=freezinglevel_height"
            + "&forecast_days=7"
            + "&timezone=auto"

        guard let url = URL(string: urlString) else { return }

        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            let response = try decoder.decode(MountainMeteoResponse.self, from: data)
            parseMountainResponse(response)
        } catch {
            // Mountain data is supplementary; don't fail the whole request
        }
    }

    private func parseResponse(_ response: OpenMeteoResponse) {
        let current = response.current

        // Parse elevation
        if let elev = response.elevation {
            elevation = Int(elev)
        }

        currentConditions = WeatherConditions(
            temperature: current.temperature2m,
            apparentTemperature: current.apparentTemperature,
            windSpeed: current.windSpeed10m,
            windDirection: Int(current.windDirection10m),
            windGusts: current.windGusts10m,
            precipitation: current.precipitation,
            cloudCover: Int(current.cloudCover),
            pressure: current.surfacePressure,
            humidity: Int(current.relativeHumidity2m),
            visibility: current.visibility / 1000, // Convert m to km
            snowDepth: current.snowDepth,
            isDay: current.isDay == 1,
            weatherCode: Int(current.weatherCode),
            timestamp: Date()
        )

        // Parse hourly
        if let hourly = response.hourly {
            let iso = ISO8601DateFormatter()
            iso.formatOptions = [.withFullDate, .withTime, .withDashSeparatorInDate, .withColonSeparatorInTime]

            // Recent precipitation: sum of past 6h
            let now = Date()
            var totalRecent = 0.0
            for i in 0..<hourly.time.count {
                guard let date = iso.date(from: hourly.time[i]) else { continue }
                if date <= now && now.timeIntervalSince(date) <= 6 * 3600 {
                    totalRecent += hourly.precipitation[i]
                }
            }
            recentPrecipitation = totalRecent

            // Filter to current hour onward (past_hours=6 prepends historical entries)
            hourlyForecast = (0..<hourly.time.count).compactMap { i in
                guard let date = iso.date(from: hourly.time[i]) else { return nil }
                guard now.timeIntervalSince(date) < 3600 else { return nil }
                return HourlyForecast(
                    time: date,
                    temperature: hourly.temperature2m[i],
                    precipitation: hourly.precipitation[i],
                    windSpeed: hourly.windSpeed10m[i],
                    cloudCover: Int(hourly.cloudCover[i]),
                    weatherCode: Int(hourly.weatherCode[i])
                )
            }
            if hourlyForecast.count > 24 {
                hourlyForecast = Array(hourlyForecast.prefix(24))
            }
        }

        // Parse daily forecast
        if let daily = response.daily {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd"

            dailyForecast = (0..<daily.time.count).compactMap { i in
                guard let date = dateFormatter.date(from: daily.time[i]) else { return nil }
                return DailyForecast(
                    date: date,
                    tempMax: daily.temperature2mMax[i],
                    tempMin: daily.temperature2mMin[i],
                    precipitationSum: daily.precipitationSum[i],
                    snowfallSum: daily.snowfallSum[i],
                    weatherCode: Int(daily.weatherCode[i]),
                    windSpeedMax: daily.windSpeed10mMax[i],
                    windGustsMax: daily.windGusts10mMax[i]
                )
            }
        }

        // Calculate pressure trend from hourly data
        if let hourly = response.hourly, hourly.time.count >= 6 {
            // Approximate: compare recent vs earlier hourly pressure is not available
            // Use cloud cover trend as proxy
            let recentCloud = hourly.cloudCover.suffix(3).reduce(0.0, +) / 3
            let earlierCloud = hourly.cloudCover.prefix(3).reduce(0.0, +) / 3
            if recentCloud > earlierCloud + 15 {
                pressureTrend = .falling
            } else if recentCloud < earlierCloud - 15 {
                pressureTrend = .rising
            } else {
                pressureTrend = .stable
            }
        }
    }

    private func parseMountainResponse(_ response: MountainMeteoResponse) {
        let freezingLevel: Int? = response.current.map { Int($0.freezinglevelHeight) }

        // Take the first hourly values as "current"
        var wind2000: WindAtAltitude?
        var wind3000: WindAtAltitude?
        var wind4000: WindAtAltitude?

        if let h = response.hourly {
            // 800 hPa ~ 2000m, 700 hPa ~ 3000m, 600 hPa ~ 4000m
            if let speed = h.windspeed800hPa?.first,
               let dir = h.winddirection800hPa?.first,
               let temp = h.temperature800hPa?.first {
                wind2000 = WindAtAltitude(altitude: 2000, speed: speed, direction: Int(dir), temperature: temp)
            }
            if let speed = h.windspeed700hPa?.first,
               let dir = h.winddirection700hPa?.first,
               let temp = h.temperature700hPa?.first {
                wind3000 = WindAtAltitude(altitude: 3000, speed: speed, direction: Int(dir), temperature: temp)
            }
            if let speed = h.windspeed600hPa?.first,
               let dir = h.winddirection600hPa?.first,
               let temp = h.temperature600hPa?.first {
                wind4000 = WindAtAltitude(altitude: 4000, speed: speed, direction: Int(dir), temperature: temp)
            }
        }

        mountainWeather = MountainWeather(
            freezingLevel: freezingLevel,
            windAt2000m: wind2000,
            windAt3000m: wind3000,
            windAt4000m: wind4000
        )
    }

    private func reverseGeocode(latitude: Double, longitude: Double) async {
        let location = CLLocation(latitude: latitude, longitude: longitude)
        do {
            let placemarks = try await CLGeocoder().reverseGeocodeLocation(location)
            if let place = placemarks.first {
                let name = place.locality ?? place.name ?? place.administrativeArea
                locationName = name ?? String(format: "%.2f, %.2f", latitude, longitude)
            }
        } catch {
            locationName = String(format: "%.2f, %.2f", latitude, longitude)
        }
    }

    func invalidateCache() {
        lastFetchTime = nil
    }

    // MARK: - Aviation Weather (CAPE, cloud base, thermals)

    func fetchAviationWeather(latitude: Double, longitude: Double) async {
        let urlString = "https://api.open-meteo.com/v1/forecast"
            + "?latitude=\(latitude)&longitude=\(longitude)"
            + "&hourly=cape,lifted_index,boundary_layer_height,dew_point_2m"
            + "&forecast_days=1"
            + "&timezone=auto"

        guard let url = URL(string: urlString) else { return }

        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            let response = try decoder.decode(AviationMeteoResponse.self, from: data)
            parseAviationResponse(response)
        } catch {
            // Aviation data is supplementary
        }
    }

    private func parseAviationResponse(_ response: AviationMeteoResponse) {
        guard let hourly = response.hourly else { return }

        let iso = ISO8601DateFormatter()
        iso.formatOptions = [.withFullDate, .withTime, .withDashSeparatorInDate, .withColonSeparatorInTime]

        // Find current hour index
        let now = Date()
        let calendar = Calendar.current
        let currentHour = calendar.component(.hour, from: now)
        let idx = min(currentHour, hourly.time.count - 1)

        let cape = hourly.cape?[safe: idx] ?? 0
        let liftedIndex = hourly.liftedIndex?[safe: idx] ?? 0
        let blh = hourly.boundaryLayerHeight?[safe: idx] ?? 1000
        let dewPoint = hourly.dewPoint2m?[safe: idx] ?? 5

        // Estimate thermal velocity from CAPE: v ≈ sqrt(2 * CAPE / 1000) for simplicity
        let thermalVelocity = cape > 0 ? sqrt(2 * cape / 1000) : 0

        // Estimate cloud base from dew point spread
        let temp = currentConditions?.temperature ?? 15
        let spreadRate = 125.0 // meters per °C spread
        let cloudBase = Int(max(0, (temp - dewPoint) * spreadRate))

        // Trigger temperature: surface dew point + lapse correction
        let triggerTemp = dewPoint + (blh / spreadRate)

        thermalForecast = ThermalForecast(
            thermalVelocity: thermalVelocity,
            cape: cape,
            cloudBase: cloudBase,
            boundaryLayerHeight: Int(blh),
            triggerTemperature: triggerTemp,
            dewPoint: dewPoint,
            liftedIndex: liftedIndex,
            timestamp: now
        )

        // Hourly thermals
        hourlyThermals = (0..<min(24, hourly.time.count)).compactMap { i in
            guard let date = iso.date(from: hourly.time[i]) else { return nil }
            let hCape = hourly.cape?[safe: i] ?? 0
            let hBlh = hourly.boundaryLayerHeight?[safe: i] ?? 0
            let hDew = hourly.dewPoint2m?[safe: i] ?? 0
            let hTemp = self.hourlyForecast[safe: i]?.temperature ?? 15
            let hCloudBase = Int(max(0, (hTemp - hDew) * spreadRate))

            return HourlyThermalForecast(
                hour: date,
                thermalVelocity: hCape > 0 ? sqrt(2 * hCape / 1000) : 0,
                cape: hCape,
                cloudBase: hCloudBase,
                boundaryLayerHeight: Int(hBlh)
            )
        }
    }
}

// MARK: - Open-Meteo API Response Models

struct OpenMeteoResponse: Codable {
    let current: CurrentWeather
    let hourly: HourlyWeather?
    let daily: DailyWeather?
    let elevation: Double?
}

struct CurrentWeather: Codable {
    let temperature2m: Double
    let apparentTemperature: Double
    let windSpeed10m: Double
    let windDirection10m: Double
    let windGusts10m: Double
    let precipitation: Double
    let cloudCover: Double
    let surfacePressure: Double
    let relativeHumidity2m: Double
    let visibility: Double
    let snowDepth: Double?
    let isDay: Double
    let weatherCode: Double

    enum CodingKeys: String, CodingKey {
        case temperature2m = "temperature_2m"
        case apparentTemperature = "apparent_temperature"
        case windSpeed10m = "wind_speed_10m"
        case windDirection10m = "wind_direction_10m"
        case windGusts10m = "wind_gusts_10m"
        case precipitation
        case cloudCover = "cloud_cover"
        case surfacePressure = "surface_pressure"
        case relativeHumidity2m = "relative_humidity_2m"
        case visibility
        case snowDepth = "snow_depth"
        case isDay = "is_day"
        case weatherCode = "weather_code"
    }
}

struct HourlyWeather: Codable {
    let time: [String]
    let temperature2m: [Double]
    let precipitation: [Double]
    let windSpeed10m: [Double]
    let cloudCover: [Double]
    let weatherCode: [Double]

    enum CodingKeys: String, CodingKey {
        case time
        case temperature2m = "temperature_2m"
        case precipitation
        case windSpeed10m = "wind_speed_10m"
        case cloudCover = "cloud_cover"
        case weatherCode = "weather_code"
    }
}

struct DailyWeather: Codable {
    let time: [String]
    let temperature2mMax: [Double]
    let temperature2mMin: [Double]
    let precipitationSum: [Double]
    let snowfallSum: [Double]
    let weatherCode: [Double]
    let windSpeed10mMax: [Double]
    let windGusts10mMax: [Double]

    enum CodingKeys: String, CodingKey {
        case time
        case temperature2mMax = "temperature_2m_max"
        case temperature2mMin = "temperature_2m_min"
        case precipitationSum = "precipitation_sum"
        case snowfallSum = "snowfall_sum"
        case weatherCode = "weather_code"
        case windSpeed10mMax = "wind_speed_10m_max"
        case windGusts10mMax = "wind_gusts_10m_max"
    }
}

struct MountainMeteoResponse: Codable {
    let current: MountainCurrent?
    let hourly: MountainHourly?
}

struct MountainCurrent: Codable {
    let freezinglevelHeight: Double

    enum CodingKeys: String, CodingKey {
        case freezinglevelHeight = "freezinglevel_height"
    }
}

// MARK: - Safe Array Subscript

extension Array {
    subscript(safe index: Int) -> Element? {
        indices.contains(index) ? self[index] : nil
    }
}

struct MountainHourly: Codable {
    let temperature800hPa: [Double]?
    let temperature700hPa: [Double]?
    let temperature600hPa: [Double]?
    let windspeed800hPa: [Double]?
    let windspeed700hPa: [Double]?
    let windspeed600hPa: [Double]?
    let winddirection800hPa: [Double]?
    let winddirection700hPa: [Double]?
    let winddirection600hPa: [Double]?

    enum CodingKeys: String, CodingKey {
        case temperature800hPa = "temperature_800hPa"
        case temperature700hPa = "temperature_700hPa"
        case temperature600hPa = "temperature_600hPa"
        case windspeed800hPa = "windspeed_800hPa"
        case windspeed700hPa = "windspeed_700hPa"
        case windspeed600hPa = "windspeed_600hPa"
        case winddirection800hPa = "winddirection_800hPa"
        case winddirection700hPa = "winddirection_700hPa"
        case winddirection600hPa = "winddirection_600hPa"
    }
}
