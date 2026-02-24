import SwiftUI
import CoreLocation

// MARK: - Pre-Flight Assessment

struct PreFlightView: View {
    @EnvironmentObject var weather: WeatherService
    @StateObject private var airspaceService = AirspaceService.shared
    @EnvironmentObject var store: KnowledgeStore
    @State private var flyability: FlyabilityIndex?
    @State private var thermalForecast: ThermalForecast?

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                // Flyability Gauge
                if let flyability = flyability {
                    FlyabilityGaugeCard(flyability: flyability)
                } else {
                    loadingCard("Calculating flyability...")
                }

                // Wind Assessment
                if let conditions = weather.currentConditions {
                    WindAssessmentCard(conditions: conditions)
                }

                // Thermal Forecast
                if let thermal = thermalForecast {
                    ThermalForecastCard(forecast: thermal)
                }

                // Cloud Base
                if let mountain = weather.mountainWeather {
                    CloudBaseCard(mountainWeather: mountain, thermalForecast: thermalForecast)
                }

                // Airspace Warnings
                if !airspaceService.airspaces.isEmpty {
                    AirspaceWarningsCard(airspaces: airspaceService.airspaces)
                }

                // GO / NO-GO Summary
                if let flyability = flyability {
                    GoNoGoCard(flyability: flyability)
                }
            }
            .padding()
        }
        .background(Color.terminalBg)
        .navigationTitle("Pre-Flight Assessment")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await loadData()
            // Award Preparation XP once per day for pre-flight check
            let key = "lastPreFlightXP"
            let today = Calendar.current.startOfDay(for: Date())
            let lastDate = UserDefaults.standard.object(forKey: key) as? Date ?? .distantPast
            if lastDate < today {
                store.addXP(XPReward.preFlightCheckedXP, axis: .preparation, domain: .flying)
                UserDefaults.standard.set(today, forKey: key)
            }
        }
    }

    private func loadData() async {
        // Default: Interlaken area (central Swiss Alps)
        let lat = 46.68
        let lon = 7.86

        await weather.fetchWeather(latitude: lat, longitude: lon)
        await weather.fetchAviationWeather(latitude: lat, longitude: lon)
        await airspaceService.fetchAirspaces(minLat: lat - 0.5, minLon: lon - 0.5, maxLat: lat + 0.5, maxLon: lon + 0.5)

        // Build thermal forecast from weather data
        if let conditions = weather.currentConditions {
            thermalForecast = weather.thermalForecast

            // Calculate flyability
            flyability = FlyabilityIndex.calculate(
                windSpeed: conditions.windSpeed,
                windGusts: conditions.windGusts,
                thermalVelocity: thermalForecast?.thermalVelocity ?? 0,
                cape: thermalForecast?.cape ?? 0,
                cloudBase: thermalForecast?.cloudBase ?? 1500,
                precipitation: conditions.precipitation,
                cloudCover: conditions.cloudCover
            )
        }
    }

    private func loadingCard(_ text: String) -> some View {
        HStack {
            ProgressView()
                .tint(Color.accent)
            Text(text)
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)
        }
        .frame(maxWidth: .infinity)
        .terminalCard()
    }
}

// MARK: - Flyability Gauge Card

struct FlyabilityGaugeCard: View {
    let flyability: FlyabilityIndex

    var body: some View {
        VStack(spacing: 12) {
            // Gauge (reuses ReadinessGauge pattern)
            ZStack {
                Circle()
                    .stroke(Color.terminalBorder, lineWidth: 8)
                    .frame(width: 100, height: 100)

                Circle()
                    .trim(from: 0, to: Double(flyability.score) / 100)
                    .stroke(flyability.verdict.color, style: StrokeStyle(lineWidth: 8, lineCap: .round))
                    .frame(width: 100, height: 100)
                    .rotationEffect(.degrees(-90))

                VStack(spacing: 2) {
                    Text("\(flyability.score)")
                        .font(.mono(28, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                    Text(flyability.verdict.rawValue.uppercased())
                        .font(.mono(9, weight: .bold))
                        .foregroundStyle(flyability.verdict.color)
                }
            }

            // Score breakdown
            HStack(spacing: 16) {
                ScoreBreakdownItem(label: "Wind", score: flyability.windScore, max: 25)
                ScoreBreakdownItem(label: "Thermal", score: flyability.thermalScore, max: 25)
                ScoreBreakdownItem(label: "Cloud", score: flyability.cloudBaseScore, max: 25)
                ScoreBreakdownItem(label: "Precip", score: flyability.precipScore, max: 25)
            }
        }
        .terminalCard()
    }
}

struct ScoreBreakdownItem: View {
    let label: String
    let score: Int
    let max: Int

    var body: some View {
        VStack(spacing: 4) {
            Text("\(score)/\(max)")
                .font(.mono(12, weight: .bold))
                .foregroundStyle(score >= max * 3/4 ? Color.emerald : (score >= max/2 ? Color.accent : Color.danger))
            Text(label)
                .font(.mono(9))
                .foregroundStyle(Color.textMuted)
        }
    }
}

// MARK: - Wind Assessment Card

struct WindAssessmentCard: View {
    let conditions: WeatherConditions

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "wind")
                    .foregroundStyle(Color.flyingAccent)
                Text("WIND")
                    .font(.mono(12, weight: .bold))
                    .foregroundStyle(Color.textMuted)
            }

            HStack(spacing: 20) {
                VStack(spacing: 2) {
                    Text("\(Int(conditions.windSpeed))")
                        .font(.mono(24, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                    Text("km/h")
                        .font(.mono(10))
                        .foregroundStyle(Color.textMuted)
                }

                VStack(spacing: 2) {
                    Text("\(Int(conditions.windGusts))")
                        .font(.mono(24, weight: .bold))
                        .foregroundStyle(conditions.windGusts > 30 ? Color.danger : Color.textPrimary)
                    Text("gusts")
                        .font(.mono(10))
                        .foregroundStyle(Color.textMuted)
                }

                VStack(spacing: 2) {
                    Text(compassDirection(conditions.windDirection))
                        .font(.mono(20, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                    Text("\(conditions.windDirection)°")
                        .font(.mono(10))
                        .foregroundStyle(Color.textMuted)
                }
            }

            // Wind assessment
            if conditions.windSpeed > 35 {
                warningBanner("Strong winds — NOT flyable", color: .danger)
            } else if conditions.windGusts > 40 {
                warningBanner("Dangerous gusts", color: .danger)
            } else if conditions.windSpeed > 25 {
                warningBanner("Moderate wind — experienced pilots only", color: .warning)
            }
        }
        .terminalCard()
    }

    private func compassDirection(_ degrees: Int) -> String {
        let dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        let index = Int(round(Double(degrees) / 45.0)) % 8
        return dirs[index]
    }

    private func warningBanner(_ text: String, color: Color) -> some View {
        HStack(spacing: 6) {
            Image(systemName: "exclamationmark.triangle.fill")
                .font(.system(size: 12))
            Text(text)
                .font(.mono(11, weight: .semibold))
        }
        .foregroundStyle(color)
        .padding(8)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(color.opacity(0.1))
        .cornerRadius(6)
    }
}

// MARK: - Thermal Forecast Card

struct ThermalForecastCard: View {
    let forecast: ThermalForecast

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: forecast.thermalQuality.icon)
                    .foregroundStyle(forecast.thermalQuality.color)
                Text("THERMALS")
                    .font(.mono(12, weight: .bold))
                    .foregroundStyle(Color.textMuted)
                Spacer()
                Text(forecast.thermalQuality.rawValue)
                    .font(.mono(12, weight: .bold))
                    .foregroundStyle(forecast.thermalQuality.color)
            }

            HStack(spacing: 20) {
                VStack(spacing: 2) {
                    Text(String(format: "%.1f", forecast.thermalVelocity))
                        .font(.mono(20, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                    Text("m/s climb")
                        .font(.mono(10))
                        .foregroundStyle(Color.textMuted)
                }

                VStack(spacing: 2) {
                    Text("\(Int(forecast.cape))")
                        .font(.mono(20, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                    Text("J/kg CAPE")
                        .font(.mono(10))
                        .foregroundStyle(Color.textMuted)
                }

                VStack(spacing: 2) {
                    Text(String(format: "%.1f", forecast.triggerTemperature))
                        .font(.mono(20, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                    Text("°C trigger")
                        .font(.mono(10))
                        .foregroundStyle(Color.textMuted)
                }
            }
        }
        .terminalCard()
    }
}

// MARK: - Cloud Base Card

struct CloudBaseCard: View {
    let mountainWeather: MountainWeather
    let thermalForecast: ThermalForecast?

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "cloud.fill")
                    .foregroundStyle(Color.weatherAccent)
                Text("CLOUD BASE & CEILING")
                    .font(.mono(12, weight: .bold))
                    .foregroundStyle(Color.textMuted)
            }

            HStack(spacing: 20) {
                if let cloudBase = thermalForecast?.cloudBase {
                    VStack(spacing: 2) {
                        Text("\(cloudBase)")
                            .font(.mono(20, weight: .bold))
                            .foregroundStyle(Color.textPrimary)
                        Text("m cloud base")
                            .font(.mono(10))
                            .foregroundStyle(Color.textMuted)
                    }
                }

                if let freezing = mountainWeather.freezingLevel {
                    VStack(spacing: 2) {
                        Text("\(freezing)")
                            .font(.mono(20, weight: .bold))
                            .foregroundStyle(Color.glacierTravelAccent)
                        Text("m 0° level")
                            .font(.mono(10))
                            .foregroundStyle(Color.textMuted)
                    }
                }

                if let blh = thermalForecast?.boundaryLayerHeight {
                    VStack(spacing: 2) {
                        Text("\(blh)")
                            .font(.mono(20, weight: .bold))
                            .foregroundStyle(Color.textPrimary)
                        Text("m BLH")
                            .font(.mono(10))
                            .foregroundStyle(Color.textMuted)
                    }
                }
            }
        }
        .terminalCard()
    }
}

// MARK: - Airspace Warnings Card

struct AirspaceWarningsCard: View {
    let airspaces: [Airspace]

    private var relevantAirspaces: [Airspace] {
        airspaces.filter { $0.airspaceClass != .g && $0.airspaceClass != .f }
    }

    var body: some View {
        if !relevantAirspaces.isEmpty {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Image(systemName: "airplane.circle.fill")
                        .foregroundStyle(Color.danger)
                    Text("AIRSPACE WARNINGS")
                        .font(.mono(12, weight: .bold))
                        .foregroundStyle(Color.textMuted)
                }

                ForEach(relevantAirspaces) { airspace in
                    HStack(spacing: 8) {
                        Circle()
                            .fill(airspace.airspaceClass.fillColor)
                            .frame(width: 10, height: 10)
                        VStack(alignment: .leading, spacing: 1) {
                            Text(airspace.name)
                                .font(.mono(12, weight: .semibold))
                                .foregroundStyle(Color.textPrimary)
                            Text("\(airspace.airspaceClass.displayName) · \(airspace.lowerLimit.displayString) – \(airspace.upperLimit.displayString)")
                                .font(.mono(10))
                                .foregroundStyle(Color.textMuted)
                        }
                        Spacer()
                    }
                }
            }
            .terminalCard()
        }
    }
}

// MARK: - GO / NO-GO Card

struct GoNoGoCard: View {
    let flyability: FlyabilityIndex

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: flyability.verdict.icon)
                .font(.system(size: 28))
                .foregroundStyle(flyability.verdict.color)

            VStack(alignment: .leading, spacing: 2) {
                Text(flyability.verdict == .noGo ? "NO-GO" : "GO")
                    .font(.mono(22, weight: .bold))
                    .foregroundStyle(flyability.verdict.color)
                Text(verdictDescription)
                    .font(.mono(12))
                    .foregroundStyle(Color.textMuted)
            }

            Spacer()
        }
        .padding(20)
        .background(flyability.verdict.color.opacity(0.08))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(flyability.verdict.color.opacity(0.3), lineWidth: 1)
        )
    }

    private var verdictDescription: String {
        switch flyability.verdict {
        case .excellent: return "Conditions are excellent for flying"
        case .good: return "Good conditions, stay aware of changes"
        case .marginal: return "Marginal conditions, experienced pilots only"
        case .noGo: return "Conditions are not suitable for flying"
        }
    }
}
