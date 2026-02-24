import SwiftUI
import CoreLocation

// MARK: - Weather Conditions View

struct ConditionsView: View {
    @EnvironmentObject var weather: WeatherService
    @EnvironmentObject var locationService: LocationService

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                if weather.isLoading {
                    ProgressView("Loading weather data...")
                        .padding(.top, 40)
                } else if let error = weather.error {
                    NoDataCard(message: error)
                } else if let conditions = weather.currentConditions {
                    // Location header
                    LocationHeader(
                        locationName: weather.locationName,
                        elevation: weather.elevation
                    )

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

                    // 7-day forecast
                    if !weather.dailyForecast.isEmpty {
                        DailyForecastCard(forecast: weather.dailyForecast)
                    }

                    // Domain-specific assessments
                    DomainAssessmentCard(conditions: conditions, mountain: weather.mountainWeather, recentPrecipitation: weather.recentPrecipitation)

                } else {
                    NoDataCard(message: "Waiting for location to fetch weather...")
                }
            }
            .padding()
        }
        .task {
            // Wait for real device location (up to 5s) before fetching
            if locationService.currentLocation == nil {
                for _ in 0..<10 {
                    try? await Task.sleep(for: .milliseconds(500))
                    if locationService.currentLocation != nil { break }
                }
            }
            let loc = locationService.effectiveLocation
            // Cache inside WeatherService means this is a no-op if HomeView already fetched
            await weather.fetchWeather(latitude: loc.latitude, longitude: loc.longitude)
        }
        .onChange(of: locationService.currentLocation?.latitude) { _, _ in
            guard weather.lastFetchTime != nil else { return }
            let loc = locationService.effectiveLocation
            Task {
                await weather.fetchWeather(latitude: loc.latitude, longitude: loc.longitude)
            }
        }
        .refreshable {
            weather.invalidateCache()
            let loc = locationService.effectiveLocation
            await weather.fetchWeather(latitude: loc.latitude, longitude: loc.longitude)
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
                .rotationEffect(.degrees(Double(wind.direction) + 180))
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
    let recentPrecipitation: Double

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

    // MARK: - Flying Assessment

    private var flyingAssessment: String {
        let code = conditions.weatherCode
        let wind = conditions.windSpeed
        let gusts = conditions.windGusts
        let vis = conditions.visibility

        if code >= 95 { return "Thunderstorm — no fly" }
        if conditions.precipitation > 0.5 { return "Rain — not flyable" }
        if code >= 80 && code <= 82 { return "Rain showers — not flyable" }
        if code >= 61 && code <= 67 { return "Rain — not flyable" }
        if code >= 71 && code <= 77 { return "Snow — not flyable" }
        if code >= 85 && code <= 86 { return "Snow showers — not flyable" }
        if code >= 51 && code <= 57 { return "Drizzle — not flyable" }
        if code == 45 || code == 48 { return "Fog — not flyable" }
        if vis < 1.5 { return "Near-zero visibility — not flyable" }
        if wind > 35 { return "Too windy" }
        if gusts > 45 { return "Dangerous gusts" }
        if wind > 25 { return "Marginal winds" }
        if gusts > 35 { return "Gusty — caution" }
        if vis < 5.0 { return "Reduced visibility" }
        if conditions.cloudCover > 80 { return "Low cloud — limited thermals" }
        return "Flyable conditions"
    }

    // MARK: - Climbing Assessment

    private var climbingAssessment: String {
        let code = conditions.weatherCode
        let wind = conditions.windSpeed
        let gusts = conditions.windGusts
        let vis = conditions.visibility
        let humidity = conditions.humidity
        let temp = conditions.temperature

        if code >= 95 { return "Thunderstorm — descend immediately" }
        if (code >= 61 && code <= 67) || (code >= 80 && code <= 82) { return "Wet rock — high fall risk" }
        if code == 56 || code == 57 || code == 66 || code == 67 { return "Freezing precip — verglas risk" }
        if (code >= 71 && code <= 77) || (code >= 85 && code <= 86) { return "Snow — route conditions changing" }
        if code >= 51 && code <= 55 { return "Drizzle — slippery rock" }
        if conditions.precipitation > 0.5 { return "Precipitation — wet rock" }
        if recentPrecipitation > 2.0 { return "Recently rained — rock still wet" }
        if recentPrecipitation > 0.5 && humidity > 75 { return "Damp conditions — rock may be wet" }
        if (code == 45 || code == 48) && vis < 1.0 { return "Fog — poor visibility on route" }
        if humidity > 90 && temp < 8 { return "Condensation on rock likely" }
        if gusts > 60 { return "Dangerous gusts on exposed faces" }
        if wind > 40 { return "High wind on exposed faces" }
        if gusts > 45 { return "Strong gusts — caution on ridges" }
        if let mt = mountain, let fl = mt.freezingLevel, fl < 2500 { return "Low freezing level — icy above \(fl)m" }
        if vis < 3.0 { return "Reduced visibility" }
        return "Weather window available"
    }

    // MARK: - Skiing Assessment

    private var skiingAssessment: String {
        let code = conditions.weatherCode
        let wind = conditions.windSpeed
        let gusts = conditions.windGusts
        let vis = conditions.visibility
        let temp = conditions.temperature
        let precip = conditions.precipitation

        if code >= 95 { return "Thunderstorm — descend immediately" }
        if code == 66 || code == 67 { return "Freezing rain — icy crust hazard" }
        if wind > 50 { return "Storm wind — whiteout risk" }
        if gusts > 70 { return "Dangerous gusts" }
        if precip > 5 { return "Heavy precipitation" }
        if (code >= 61 && code <= 65) || (code >= 80 && code <= 82) {
            if temp > -2 { return "Rain on snow — wet snow instability" }
            return "Precipitation — check avalanche bulletin"
        }
        if (code == 45 || code == 48) && vis < 0.5 { return "Fog — near-zero visibility" }
        if (code == 45 || code == 48) && vis < 2.0 { return "Fog — low visibility" }
        if (code >= 71 && code <= 77) || (code >= 85 && code <= 86) { return "Snow — check avalanche bulletin" }
        if code >= 56 && code <= 57 { return "Freezing drizzle — icy surface" }
        if code >= 51 && code <= 55 { return "Drizzle — wet conditions" }
        if wind > 35 && gusts > 50 { return "Strong wind — exposed ridges dangerous" }
        if temp > 5 { return "Warm — wet snow risk" }
        if let snow = conditions.snowDepth, snow > 0 { return "Snow depth: \(String(format: "%.0f", snow)) cm" }
        return "Check local conditions"
    }

    // MARK: - Hiking Assessment

    private var hikingAssessment: String {
        let code = conditions.weatherCode
        let wind = conditions.windSpeed
        let gusts = conditions.windGusts
        let vis = conditions.visibility
        let apparent = conditions.apparentTemperature

        if code >= 95 { return "Thunderstorm — avoid exposed terrain" }
        if conditions.precipitation > 5 { return "Heavy rain — flooding risk on trails" }
        if (code >= 61 && code <= 67) || (code >= 80 && code <= 82) { return "Rain — slippery trails" }
        if code == 56 || code == 57 || code == 66 || code == 67 { return "Freezing precip — icy trails" }
        if (code >= 71 && code <= 77) || (code >= 85 && code <= 86) { return "Snow — trail conditions changing" }
        if conditions.precipitation > 0 { return "Rain expected" }
        if (code == 45 || code == 48) && vis < 1.0 { return "Fog — poor visibility" }
        if (code == 45 || code == 48) && vis < 3.0 { return "Fog — reduced visibility" }
        if gusts > 60 { return "Dangerous gusts on exposed terrain" }
        if wind > 40 { return "Strong winds on ridges" }
        if gusts > 45 { return "Gusty — caution on exposed terrain" }
        if apparent < -10 { return "Severe wind chill — exposure risk" }
        if apparent < -5 && wind > 20 { return "Cold + wind — pack warm layers" }
        if apparent > 35 { return "Extreme heat — hydration critical" }
        if apparent > 30 { return "High heat — plan for shade and water" }
        return "Good conditions"
    }

    // MARK: - Assessment Color

    private func assessmentColor(_ text: String) -> Color {
        // Danger (red)
        let dangerKeywords = ["Thunderstorm", "Too", "descend", "not flyable", "No fly",
                              "Storm", "Dangerous", "Severe", "Extreme", "whiteout",
                              "Near-zero", "verglas"]
        for keyword in dangerKeywords {
            if text.contains(keyword) { return .danger }
        }

        // Warning (amber)
        let warningKeywords = ["Marginal", "Warm", "Rain", "Heavy", "wind", "Wet",
                               "Low freezing", "Drizzle", "Fog", "visibility", "Gusty",
                               "Snow", "Damp", "humidity", "Condensation", "slippery",
                               "Freezing", "Recently", "caution", "Reduced", "exposure",
                               "Cold", "heat", "icy", "flooding", "Precipitation",
                               "check", "bulletin"]
        for keyword in warningKeywords {
            if text.contains(keyword) { return .warning }
        }

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

// MARK: - Location Header

struct LocationHeader: View {
    let locationName: String?
    let elevation: Int?

    var body: some View {
        HStack(spacing: 6) {
            Image(systemName: "location.fill")
                .font(.system(size: 12))
                .foregroundStyle(Color.accent)

            if let name = locationName {
                Text(name)
                    .font(.mono(14, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
            }

            if let elev = elevation {
                Text("•")
                    .font(.mono(12))
                    .foregroundStyle(Color.textTertiary)
                Text("\(elev.formatted()) m")
                    .font(.mono(13))
                    .foregroundStyle(Color.textSecondary)
            }

            Spacer()
        }
        .padding(.bottom, 4)
    }
}

// MARK: - Daily Forecast Card

struct DailyForecastCard: View {
    let forecast: [DailyForecast]

    var body: some View {
        InstrumentCard(title: "7-Day Forecast", icon: "calendar") {
            VStack(spacing: 0) {
                ForEach(Array(forecast.enumerated()), id: \.element.id) { index, day in
                    DailyForecastRow(day: day, isToday: index == 0)
                    if index < forecast.count - 1 {
                        Divider()
                            .padding(.vertical, 6)
                    }
                }
            }
        }
    }
}

struct DailyForecastRow: View {
    let day: DailyForecast
    let isToday: Bool

    var body: some View {
        HStack(spacing: 8) {
            // Day name
            Text(dayLabel)
                .font(.mono(12, weight: isToday ? .bold : .medium))
                .foregroundStyle(Color.textPrimary)
                .frame(width: 40, alignment: .leading)

            // Weather icon
            Image(systemName: weatherIcon(day.weatherCode))
                .font(.system(size: 14))
                .foregroundStyle(iconColor)
                .frame(width: 20)

            // Precipitation / snowfall
            if day.snowfallSum > 0 {
                HStack(spacing: 2) {
                    Image(systemName: "snowflake")
                        .font(.system(size: 9))
                    Text(String(format: "%.0f cm", day.snowfallSum))
                        .font(.mono(10))
                }
                .foregroundStyle(Color.weatherSnow)
                .frame(width: 52, alignment: .leading)
            } else if day.precipitationSum > 0 {
                HStack(spacing: 2) {
                    Image(systemName: "drop.fill")
                        .font(.system(size: 9))
                    Text(String(format: "%.1f mm", day.precipitationSum))
                        .font(.mono(10))
                }
                .foregroundStyle(Color.weatherRain)
                .frame(width: 52, alignment: .leading)
            } else {
                Spacer()
                    .frame(width: 52)
            }

            Spacer()

            // Wind
            Text(String(format: "%.0f", day.windSpeedMax))
                .font(.mono(10))
                .foregroundStyle(Color.textTertiary)
            Image(systemName: "wind")
                .font(.system(size: 9))
                .foregroundStyle(Color.textTertiary)

            // Temp range
            Text(String(format: "%.0f°", day.tempMin))
                .font(.mono(11))
                .foregroundStyle(Color.textSecondary)
                .frame(width: 30, alignment: .trailing)

            TempRangeBar(low: day.tempMin, high: day.tempMax)
                .frame(width: 50, height: 4)

            Text(String(format: "%.0f°", day.tempMax))
                .font(.mono(11, weight: .semibold))
                .foregroundStyle(Color.textPrimary)
                .frame(width: 30, alignment: .trailing)
        }
    }

    private var dayLabel: String {
        if isToday { return "Today" }
        let f = DateFormatter()
        f.dateFormat = "EEE"
        return f.string(from: day.date)
    }

    private var iconColor: Color {
        switch day.weatherCode {
        case 0, 1: return .weatherSun
        case 2, 3: return .weatherCloud
        case 45, 48: return .weatherCloud
        case 51...67: return .weatherRain
        case 71...86: return .weatherSnow
        case 95...99: return .danger
        default: return .textSecondary
        }
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

struct TempRangeBar: View {
    let low: Double
    let high: Double

    var body: some View {
        GeometryReader { geo in
            RoundedRectangle(cornerRadius: 2)
                .fill(
                    LinearGradient(
                        colors: [.weatherRain, .weatherSun],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
                .frame(width: geo.size.width, height: geo.size.height)
        }
    }
}

// MARK: - No Data Card

struct NoDataCard: View {
    let message: String

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "icloud.slash")
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

