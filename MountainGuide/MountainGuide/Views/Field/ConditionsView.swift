import SwiftUI
import CoreLocation

// MARK: - Weather Conditions View

struct ConditionsView: View {
    @StateObject private var weather = WeatherService.shared
    @StateObject private var location = ConditionsLocationManager()

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                if weather.isLoading {
                    ProgressView("Loading weather data...")
                        .padding(.top, 40)
                } else if let error = weather.error {
                    NoDataCard(message: error)
                } else if let conditions = weather.currentConditions {
                    // Current conditions hero
                    CurrentConditionsCard(conditions: conditions)

                    // Freezing level + mountain winds
                    if let mountain = weather.mountainWeather {
                        MountainConditionsCard(mountain: mountain)
                    }

                    // Pressure trend
                    PressureTrendCard(
                        pressure: conditions.pressure,
                        trend: weather.pressureTrend
                    )

                    // 24h forecast mini-chart
                    if !weather.hourlyForecast.isEmpty {
                        HourlyForecastCard(forecast: weather.hourlyForecast)
                    }

                    // Domain-specific assessments
                    DomainAssessmentCard(conditions: conditions, mountain: weather.mountainWeather)

                } else {
                    NoDataCard(message: "Waiting for location to fetch weather...")
                }
            }
            .padding()
        }
        .task {
            if let loc = location.lastLocation {
                await weather.fetchWeather(latitude: loc.latitude, longitude: loc.longitude)
            }
        }
        .onChange(of: location.lastLocation?.latitude) { _, _ in
            if let loc = location.lastLocation {
                Task {
                    await weather.fetchWeather(latitude: loc.latitude, longitude: loc.longitude)
                }
            }
        }
        .refreshable {
            weather.invalidateCache()
            if let loc = location.lastLocation {
                await weather.fetchWeather(latitude: loc.latitude, longitude: loc.longitude)
            }
        }
    }
}

// MARK: - Current Conditions Card

struct CurrentConditionsCard: View {
    let conditions: WeatherConditions

    var body: some View {
        VStack(spacing: 16) {
            // Weather icon + temp
            HStack(spacing: 16) {
                Image(systemName: conditions.weatherIcon)
                    .font(.system(size: 40))
                    .foregroundStyle(iconColor)

                VStack(alignment: .leading, spacing: 2) {
                    Text(String(format: "%.1f°", conditions.temperature))
                        .font(.system(size: 36, weight: .bold, design: .monospaced))
                        .foregroundStyle(Color.textPrimary)
                    Text(conditions.weatherDescription)
                        .font(.mono(13))
                        .foregroundStyle(Color.textSecondary)
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 4) {
                    Text("Feels like")
                        .font(.mono(10))
                        .foregroundStyle(Color.textTertiary)
                    Text(String(format: "%.1f°", conditions.apparentTemperature))
                        .font(.mono(16, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                }
            }

            Divider()

            // Stats grid
            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible()),
                GridItem(.flexible()),
            ], spacing: 12) {
                WeatherStatItem(icon: "wind", label: "Wind", value: String(format: "%.0f km/h", conditions.windSpeed), sublabel: conditions.windCardinal)
                WeatherStatItem(icon: "humidity.fill", label: "Humidity", value: "\(conditions.humidity)%", sublabel: nil)
                WeatherStatItem(icon: "cloud.fill", label: "Cloud", value: "\(conditions.cloudCover)%", sublabel: nil)
                WeatherStatItem(icon: "eye.fill", label: "Visibility", value: String(format: "%.0f km", conditions.visibility), sublabel: nil)
                WeatherStatItem(icon: "wind", label: "Gusts", value: String(format: "%.0f km/h", conditions.windGusts), sublabel: nil)
                if let snow = conditions.snowDepth, snow > 0 {
                    WeatherStatItem(icon: "snowflake", label: "Snow", value: String(format: "%.0f cm", snow), sublabel: nil)
                } else {
                    WeatherStatItem(icon: "drop.fill", label: "Precip", value: String(format: "%.1f mm", conditions.precipitation), sublabel: nil)
                }
            }
        }
        .terminalCard()
    }

    private var iconColor: Color {
        switch conditions.weatherCode {
        case 0, 1: return .weatherSun
        case 2, 3: return .weatherCloud
        case 45, 48: return .weatherCloud
        case 51...67: return .weatherRain
        case 71...86: return .weatherSnow
        case 95...99: return .danger
        default: return .textSecondary
        }
    }
}

// MARK: - Weather Stat Item

struct WeatherStatItem: View {
    let icon: String
    let label: String
    let value: String
    let sublabel: String?

    var body: some View {
        VStack(spacing: 4) {
            Image(systemName: icon)
                .font(.system(size: 14))
                .foregroundStyle(Color.accent)
            Text(value)
                .font(.mono(13, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text(label)
                .font(.mono(9))
                .foregroundStyle(Color.textTertiary)
            if let sub = sublabel {
                Text(sub)
                    .font(.mono(10, weight: .semibold))
                    .foregroundStyle(Color.textSecondary)
            }
        }
    }
}

// MARK: - Mountain Conditions Card

struct MountainConditionsCard: View {
    let mountain: MountainWeather

    var body: some View {
        InstrumentCard(title: "Mountain Conditions", icon: "mountain.2.fill") {
            VStack(spacing: 12) {
                // Freezing level
                if let freezing = mountain.freezingLevel {
                    HStack {
                        Image(systemName: "thermometer.snowflake")
                            .foregroundStyle(Color.weatherSnow)
                        Text("Freezing Level")
                            .font(.mono(13))
                            .foregroundStyle(Color.textSecondary)
                        Spacer()
                        Text("\(freezing) m")
                            .font(.mono(16, weight: .bold))
                            .foregroundStyle(Color.textPrimary)
                    }
                    Divider()
                }

                // Wind at altitude bands
                Text("WIND AT ALTITUDE")
                    .font(.mono(10, weight: .bold))
                    .foregroundStyle(Color.textTertiary)
                    .frame(maxWidth: .infinity, alignment: .leading)

                if let w = mountain.windAt2000m {
                    AltitudeWindRow(wind: w)
                }
                if let w = mountain.windAt3000m {
                    AltitudeWindRow(wind: w)
                }
                if let w = mountain.windAt4000m {
                    AltitudeWindRow(wind: w)
                }
            }
        }
    }
}

// MARK: - Altitude Wind Row

struct AltitudeWindRow: View {
    let wind: WindAtAltitude

    private var windCardinal: String {
        let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        let index = Int((Double(wind.direction) + 22.5) / 45.0) % 8
        return directions[index]
    }

    var body: some View {
        HStack {
            Text("\(wind.altitude)m")
                .font(.mono(12, weight: .bold))
                .foregroundStyle(Color.textPrimary)
                .frame(width: 50, alignment: .leading)

            Image(systemName: "arrow.up")
                .rotationEffect(.degrees(Double(wind.direction)))
                .font(.system(size: 12))
                .foregroundStyle(Color.accent)

            Text("\(windCardinal)")
                .font(.mono(11))
                .foregroundStyle(Color.textSecondary)
                .frame(width: 24)

            Spacer()

            Text(String(format: "%.0f km/h", wind.speed))
                .font(.mono(12, weight: .semibold))
                .foregroundStyle(windSpeedColor)

            Text(String(format: "%.0f°C", wind.temperature))
                .font(.mono(11))
                .foregroundStyle(Color.textSecondary)
                .frame(width: 44, alignment: .trailing)
        }
    }

    private var windSpeedColor: Color {
        if wind.speed < 30 { return .emerald }
        if wind.speed < 60 { return .warning }
        return .danger
    }
}

// MARK: - Pressure Trend Card

struct PressureTrendCard: View {
    let pressure: Double
    let trend: PressureTrend

    var body: some View {
        InstrumentCard(title: "Barometric Pressure", icon: "barometer") {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(String(format: "%.1f hPa", pressure))
                        .font(.mono(20, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                    Text(trend.weatherImplication)
                        .font(.mono(11))
                        .foregroundStyle(Color.textSecondary)
                }
                Spacer()
                VStack(spacing: 4) {
                    Image(systemName: trend.icon)
                        .font(.system(size: 24, weight: .semibold))
                        .foregroundStyle(trendColor)
                    Text(trend.rawValue)
                        .font(.mono(10, weight: .bold))
                        .foregroundStyle(trendColor)
                }
            }
        }
    }

    private var trendColor: Color {
        switch trend {
        case .rising: return .emerald
        case .stable: return .textSecondary
        case .falling: return .warning
        }
    }
}

// MARK: - Hourly Forecast Card

struct HourlyForecastCard: View {
    let forecast: [HourlyForecast]

    var body: some View {
        InstrumentCard(title: "24-Hour Forecast", icon: "clock") {
            VStack(spacing: 8) {
                // Temperature mini chart
                HourlyChartView(forecast: forecast)
                    .frame(height: 80)

                // Scrollable hourly items
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(forecast) { hour in
                            VStack(spacing: 4) {
                                Text(hourLabel(hour.time))
                                    .font(.mono(9))
                                    .foregroundStyle(Color.textTertiary)
                                Image(systemName: weatherIcon(hour.weatherCode))
                                    .font(.system(size: 14))
                                    .foregroundStyle(Color.accent)
                                Text(String(format: "%.0f°", hour.temperature))
                                    .font(.mono(11, weight: .semibold))
                                    .foregroundStyle(Color.textPrimary)
                                if hour.precipitation > 0 {
                                    Text(String(format: "%.1f", hour.precipitation))
                                        .font(.mono(9))
                                        .foregroundStyle(Color.weatherRain)
                                }
                            }
                            .frame(width: 40)
                        }
                    }
                }
            }
        }
    }

    private func hourLabel(_ date: Date) -> String {
        let f = DateFormatter()
        f.dateFormat = "HH"
        return f.string(from: date)
    }

    private func weatherIcon(_ code: Int) -> String {
        switch code {
        case 0, 1: return "sun.max.fill"
        case 2: return "cloud.sun.fill"
        case 3: return "cloud.fill"
        case 45, 48: return "cloud.fog.fill"
        case 51...57: return "cloud.drizzle.fill"
        case 61...67: return "cloud.rain.fill"
        case 71...77: return "cloud.snow.fill"
        case 80...86: return "cloud.heavyrain.fill"
        case 95...99: return "cloud.bolt.rain.fill"
        default: return "cloud"
        }
    }
}

// MARK: - Hourly Chart (Canvas)

struct HourlyChartView: View {
    let forecast: [HourlyForecast]

    var body: some View {
        Canvas { context, size in
            guard forecast.count > 1 else { return }

            let temps = forecast.map(\.temperature)
            let minTemp = (temps.min() ?? 0) - 2
            let maxTemp = (temps.max() ?? 10) + 2
            let range = max(maxTemp - minTemp, 1)

            let stepX = size.width / CGFloat(forecast.count - 1)

            // Temperature line
            var tempPath = Path()
            for (i, hour) in forecast.enumerated() {
                let x = CGFloat(i) * stepX
                let y = size.height - ((hour.temperature - minTemp) / range) * size.height

                if i == 0 {
                    tempPath.move(to: CGPoint(x: x, y: y))
                } else {
                    tempPath.addLine(to: CGPoint(x: x, y: y))
                }
            }
            context.stroke(tempPath, with: .color(Color.accent), style: StrokeStyle(lineWidth: 2, lineCap: .round, lineJoin: .round))

            // Precipitation bars
            let maxPrecip = max(forecast.map(\.precipitation).max() ?? 1, 1)
            for (i, hour) in forecast.enumerated() where hour.precipitation > 0 {
                let x = CGFloat(i) * stepX - 2
                let barHeight = (hour.precipitation / maxPrecip) * size.height * 0.3
                let y = size.height - barHeight

                let rect = CGRect(x: x, y: y, width: 4, height: barHeight)
                context.fill(Path(roundedRect: rect, cornerRadius: 1), with: .color(Color.weatherRain.opacity(0.6)))
            }

            // Zero line if temps cross 0
            if minTemp < 0 && maxTemp > 0 {
                let zeroY = size.height - ((0 - minTemp) / range) * size.height
                var zeroLine = Path()
                zeroLine.move(to: CGPoint(x: 0, y: zeroY))
                zeroLine.addLine(to: CGPoint(x: size.width, y: zeroY))
                context.stroke(zeroLine, with: .color(Color.weatherSnow.opacity(0.5)), style: StrokeStyle(lineWidth: 1, dash: [4, 4]))
            }
        }
    }
}

// MARK: - Domain Assessment Card

struct DomainAssessmentCard: View {
    let conditions: WeatherConditions
    let mountain: MountainWeather?

    var body: some View {
        InstrumentCard(title: "Conditions For...", icon: "figure.hiking") {
            VStack(spacing: 10) {
                DomainChip(
                    domain: "Flying",
                    icon: "paraglider",
                    assessment: flyingAssessment,
                    color: assessmentColor(flyingAssessment)
                )
                DomainChip(
                    domain: "Skiing",
                    icon: "figure.skiing.downhill",
                    assessment: skiingAssessment,
                    color: assessmentColor(skiingAssessment)
                )
                DomainChip(
                    domain: "Hiking",
                    icon: "figure.hiking",
                    assessment: hikingAssessment,
                    color: assessmentColor(hikingAssessment)
                )
                DomainChip(
                    domain: "Climbing",
                    icon: "figure.climbing",
                    assessment: climbingAssessment,
                    color: assessmentColor(climbingAssessment)
                )
            }
        }
    }

    private var flyingAssessment: String {
        let wind = conditions.windSpeed
        if wind > 35 { return "Too windy" }
        if conditions.weatherCode >= 95 { return "Thunderstorm risk" }
        if wind > 25 { return "Marginal winds" }
        if conditions.cloudCover > 80 { return "Low cloud — limited thermals" }
        return "Flyable conditions"
    }

    private var skiingAssessment: String {
        if conditions.temperature > 5 { return "Warm — wet snow risk" }
        if conditions.windSpeed > 50 { return "High wind — poor visibility" }
        if let snow = conditions.snowDepth, snow > 0 { return "Snow: \(String(format: "%.0f", snow)) cm" }
        return "Check local conditions"
    }

    private var hikingAssessment: String {
        if conditions.weatherCode >= 95 { return "Thunderstorm — avoid exposed terrain" }
        if conditions.precipitation > 5 { return "Heavy rain" }
        if conditions.precipitation > 0 { return "Rain expected" }
        if conditions.windSpeed > 40 { return "Strong winds on ridges" }
        return "Good conditions"
    }

    private var climbingAssessment: String {
        if conditions.weatherCode >= 95 { return "Thunderstorm — descend immediately" }
        if conditions.precipitation > 0 { return "Wet rock — increased fall risk" }
        if conditions.windSpeed > 40 { return "High wind on exposed faces" }
        if let mt = mountain, let fl = mt.freezingLevel, fl < 2500 { return "Low freezing level — icy above \(fl)m" }
        return "Weather window available"
    }

    private func assessmentColor(_ text: String) -> Color {
        if text.contains("Too") || text.contains("Thunderstorm") || text.contains("descend") { return .danger }
        if text.contains("Marginal") || text.contains("Warm") || text.contains("Rain") || text.contains("Heavy") || text.contains("wind") || text.contains("Wet") || text.contains("Low freezing") { return .warning }
        return .emerald
    }
}

// MARK: - Domain Chip

struct DomainChip: View {
    let domain: String
    let icon: String
    let assessment: String
    let color: Color

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 16))
                .foregroundStyle(color)
                .frame(width: 24)

            VStack(alignment: .leading, spacing: 2) {
                Text(domain)
                    .font(.mono(12, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                Text(assessment)
                    .font(.mono(11))
                    .foregroundStyle(color)
            }

            Spacer()

            Circle()
                .fill(color)
                .frame(width: 8, height: 8)
        }
    }
}

// MARK: - No Data Card

struct NoDataCard: View {
    let message: String

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "cloud.slash")
                .font(.system(size: 32))
                .foregroundStyle(Color.textTertiary)
            Text(message)
                .font(.mono(13))
                .foregroundStyle(Color.textSecondary)
                .multilineTextAlignment(.center)
        }
        .padding(40)
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Location Manager for Conditions

class ConditionsLocationManager: NSObject, ObservableObject, CLLocationManagerDelegate {
    @Published var lastLocation: CLLocationCoordinate2D?

    private let manager = CLLocationManager()

    override init() {
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyKilometer
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        lastLocation = locations.last?.coordinate
        manager.stopUpdatingLocation() // One fix is enough for weather
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        // Use default coords (Zurich) as fallback
        if lastLocation == nil {
            lastLocation = CLLocationCoordinate2D(latitude: 47.3769, longitude: 8.5417)
        }
    }
}
