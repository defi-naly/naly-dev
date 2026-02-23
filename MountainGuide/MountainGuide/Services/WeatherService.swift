import Foundation
import CoreLocation

// MARK: - Weather Service (Open-Meteo API)

@MainActor
class WeatherService: ObservableObject {
    static let shared = WeatherService()

    @Published var currentConditions: WeatherConditions?
    @Published var mountainWeather: MountainWeather?
    @Published var hourlyForecast: [HourlyForecast] = []
    @Published var pressureTrend: PressureTrend = .stable
    @Published var isLoading = false
    @Published var error: String?

    private var lastFetchTime: Date?
    private var lastLocation: CLLocationCoordinate2D?
    private let cacheInterval: TimeInterval = 30 * 60 // 30 minutes

    private let decoder: JSONDecoder = {
        let d = JSONDecoder()
        d.keyDecodingStrategy = .convertFromSnakeCase
        return d
    }()

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
            + "&forecast_days=1"
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
            + "&forecast_days=1"
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
            let count = min(24, hourly.time.count)
            let iso = ISO8601DateFormatter()
            iso.formatOptions = [.withFullDate, .withTime, .withDashSeparatorInDate, .withColonSeparatorInTime]

            hourlyForecast = (0..<count).compactMap { i in
                guard let date = iso.date(from: hourly.time[i]) else { return nil }
                return HourlyForecast(
                    time: date,
                    temperature: hourly.temperature2m[i],
                    precipitation: hourly.precipitation[i],
                    windSpeed: hourly.windSpeed10m[i],
                    cloudCover: Int(hourly.cloudCover[i]),
                    weatherCode: Int(hourly.weatherCode[i])
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

    func invalidateCache() {
        lastFetchTime = nil
    }
}

// MARK: - Open-Meteo API Response Models

struct OpenMeteoResponse: Codable {
    let current: CurrentWeather
    let hourly: HourlyWeather?
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
}

struct HourlyWeather: Codable {
    let time: [String]
    let temperature2m: [Double]
    let precipitation: [Double]
    let windSpeed10m: [Double]
    let cloudCover: [Double]
    let weatherCode: [Double]
}

struct MountainMeteoResponse: Codable {
    let current: MountainCurrent?
    let hourly: MountainHourly?
}

struct MountainCurrent: Codable {
    let freezinglevelHeight: Double
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
}
