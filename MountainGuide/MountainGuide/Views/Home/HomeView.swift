import SwiftUI

// MARK: - Home Dashboard (Field-Readiness Focus)

struct HomeView: View {
    @EnvironmentObject var store: KnowledgeStore
    @EnvironmentObject var activityStore: ActivityStore
    @State private var showSettings = false

    private var relevantDomains: [Domain] {
        activityStore.currentActivity.relevantDomains.compactMap { domainId in
            DomainContent.allDomains.first { $0.id == domainId }
        }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    // Activity selector — subdued text pills
                    ActivitySelectorBar()
                        .environmentObject(activityStore)
                        .padding(.horizontal)
                        .padding(.top, 4)

                    // Hero: Conditions card (largest element)
                    NavigationLink {
                        ConditionsView()
                    } label: {
                        ConditionsSnapshotCard()
                            .environmentObject(activityStore)
                    }
                    .buttonStyle(.plain)
                    .padding(.horizontal)

                    // Activity-aware danger assessment
                    DangerAssessmentRow(activity: activityStore.currentActivity)
                        .padding(.horizontal)

                    // Quick tools — activity-aware shortcuts
                    QuickToolsRow(activity: activityStore.currentActivity)
                        .padding(.horizontal)

                    // Knowledge section — always visible
                    VStack(alignment: .leading, spacing: 12) {
                        Text("KNOWLEDGE")
                            .font(.body(11, weight: .bold))
                            .foregroundStyle(Color.textMuted)
                            .padding(.horizontal)

                        // Due cards — always present
                        NavigationLink {
                            ReviewSessionView()
                                .environmentObject(store)
                        } label: {
                            HStack(spacing: 8) {
                                Image(systemName: store.dueCardCount > 0 ? "rectangle.stack" : "checkmark.circle")
                                    .font(.system(size: 13))
                                    .foregroundStyle(store.dueCardCount > 0 ? Color.amber : Color.emerald)
                                Text(store.dueCardCount > 0 ? "\(store.dueCardCount) cards due for review" : "All caught up")
                                    .font(.body(14, weight: .medium))
                                    .foregroundStyle(store.dueCardCount > 0 ? Color.textPrimary : Color.textSecondary)
                                Spacer()
                                Image(systemName: "chevron.right")
                                    .font(.system(size: 11))
                                    .foregroundStyle(Color.textTertiary)
                            }
                            .padding(14)
                            .background(Color.lightSurface)
                            .cornerRadius(10)
                            .shadow(color: .black.opacity(0.04), radius: 2, x: 0, y: 1)
                        }
                        .padding(.horizontal)

                        // Relevant domains for current activity
                        ForEach(relevantDomains, id: \.id) { domain in
                            DomainStrengthRow(
                                domain: domain,
                                strength: store.domainStrength(domain.id),
                                completed: store.completedModuleCount(domainId: domain.id),
                                total: domain.modules.count
                            )
                        }
                    }
                }
                .padding(.bottom, 32)
            }
            .background(Color.terminalBg)
            .navigationTitle("Mountain Guide")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showSettings = true
                    } label: {
                        Image(systemName: "gear")
                            .foregroundStyle(Color.textSecondary)
                    }
                }
            }
            .sheet(isPresented: $showSettings) {
                SettingsView()
                    .environmentObject(store)
            }
        }
    }
}

// MARK: - Danger Assessment Row

struct DangerAssessmentRow: View {
    let activity: Activity
    @EnvironmentObject var weather: WeatherService

    var body: some View {
        HStack(spacing: 12) {
            // Semantic danger indicator
            Circle()
                .fill(dangerColor)
                .frame(width: 10, height: 10)

            Text(dangerText)
                .font(.body(13, weight: .medium))
                .foregroundStyle(Color.textPrimary)

            Spacer()

            Text(dangerSubtext)
                .font(.mono(11))
                .foregroundStyle(Color.textSecondary)
        }
        .padding(14)
        .background(Color.lightSurface)
        .cornerRadius(10)
        .shadow(color: .black.opacity(0.04), radius: 2, x: 0, y: 1)
    }

    private var dangerColor: Color {
        guard let conditions = weather.currentConditions else { return .textTertiary }
        let code = conditions.weatherCode
        let wind = conditions.windSpeed
        let gusts = conditions.windGusts
        let vis = conditions.visibility
        let precip = conditions.precipitation

        switch activity {
        case .paragliding:
            if code >= 95 { return .danger }
            if precip > 0.5 { return .danger }
            if (code >= 51 && code <= 86) { return .danger }
            if vis < 1.5 { return .danger }
            if wind > 35 { return .danger }
            if gusts > 45 { return .danger }
            if wind > 25 { return .warning }
            if gusts > 35 { return .warning }
            if vis < 5.0 { return .warning }
            return .emerald
        case .skiTouring:
            if code >= 95 { return .danger }
            if code == 66 || code == 67 { return .danger }
            if wind > 50 { return .danger }
            if gusts > 70 { return .danger }
            if precip > 5 { return .danger }
            if (code >= 61 && code <= 65) || (code >= 80 && code <= 82) { return .warning }
            if (code == 45 || code == 48) && vis < 0.5 { return .danger }
            if (code == 45 || code == 48) && vis < 2.0 { return .warning }
            if (code >= 71 && code <= 77) || (code >= 85 && code <= 86) { return .warning }
            if conditions.temperature > 5 { return .warning }
            return .emerald
        case .hiking:
            if code >= 95 { return .danger }
            if gusts > 60 { return .danger }
            if conditions.apparentTemperature < -10 { return .danger }
            if conditions.apparentTemperature > 35 { return .danger }
            if precip > 5 { return .warning }
            if (code >= 61 && code <= 67) || (code >= 80 && code <= 82) { return .warning }
            if (code == 45 || code == 48) && vis < 1.0 { return .warning }
            if wind > 40 { return .warning }
            if conditions.apparentTemperature > 30 { return .warning }
            return .emerald
        case .climbing:
            if code >= 95 { return .danger }
            if (code >= 61 && code <= 67) || (code >= 80 && code <= 82) { return .danger }
            if code == 56 || code == 57 || code == 66 || code == 67 { return .danger }
            if (code >= 71 && code <= 77) || (code >= 85 && code <= 86) { return .danger }
            if code >= 51 && code <= 55 { return .danger }
            if precip > 0.5 { return .danger }
            if weather.recentPrecipitation > 2.0 { return .warning }
            if weather.recentPrecipitation > 0.5 && conditions.humidity > 75 { return .warning }
            if (code == 45 || code == 48) && vis < 1.0 { return .warning }
            if conditions.humidity > 90 && conditions.temperature < 8 { return .warning }
            if gusts > 60 { return .danger }
            if wind > 40 { return .warning }
            return .emerald
        }
    }

    private var dangerText: String {
        guard let conditions = weather.currentConditions else { return "Loading conditions..." }
        let code = conditions.weatherCode
        let wind = conditions.windSpeed
        let gusts = conditions.windGusts
        let vis = conditions.visibility

        switch activity {
        case .paragliding:
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
            return "Flyable conditions"
        case .skiTouring:
            if code >= 95 { return "Thunderstorm — descend" }
            if code == 66 || code == 67 { return "Freezing rain — icy crust" }
            if wind > 50 { return "Storm wind — whiteout risk" }
            if gusts > 70 { return "Dangerous gusts" }
            if conditions.precipitation > 5 { return "Heavy precipitation" }
            if (code >= 61 && code <= 65) || (code >= 80 && code <= 82) {
                if conditions.temperature > -2 { return "Rain on snow — instability" }
                return "Precipitation — check bulletin"
            }
            if (code == 45 || code == 48) && vis < 0.5 { return "Fog — near-zero visibility" }
            if (code == 45 || code == 48) { return "Fog — low visibility" }
            if (code >= 71 && code <= 77) || (code >= 85 && code <= 86) { return "Snow — check bulletin" }
            if conditions.temperature > 5 { return "Warm — wet snow risk" }
            return "Good touring conditions"
        case .hiking:
            if code >= 95 { return "Thunderstorm — avoid ridges" }
            if conditions.precipitation > 5 { return "Heavy rain — flooding risk" }
            if (code >= 61 && code <= 67) || (code >= 80 && code <= 82) { return "Rain — slippery trails" }
            if (code >= 71 && code <= 77) || (code >= 85 && code <= 86) { return "Snow — trail conditions changing" }
            if conditions.precipitation > 0 { return "Rain expected" }
            if (code == 45 || code == 48) && vis < 1.0 { return "Fog — poor visibility" }
            if gusts > 60 { return "Dangerous gusts" }
            if wind > 40 { return "Strong winds on ridges" }
            if conditions.apparentTemperature < -10 { return "Severe wind chill" }
            if conditions.apparentTemperature > 35 { return "Extreme heat" }
            if conditions.apparentTemperature > 30 { return "High heat — stay hydrated" }
            return "Good hiking conditions"
        case .climbing:
            if code >= 95 { return "Thunderstorm — descend" }
            if (code >= 61 && code <= 67) || (code >= 80 && code <= 82) { return "Wet rock — high fall risk" }
            if code == 56 || code == 57 || code == 66 || code == 67 { return "Freezing precip — verglas" }
            if (code >= 71 && code <= 77) || (code >= 85 && code <= 86) { return "Snow on rock" }
            if code >= 51 && code <= 55 { return "Drizzle — slippery rock" }
            if conditions.precipitation > 0.5 { return "Precipitation — wet rock" }
            if weather.recentPrecipitation > 2.0 { return "Recently rained — rock still wet" }
            if weather.recentPrecipitation > 0.5 && conditions.humidity > 75 { return "Damp — rock may be wet" }
            if (code == 45 || code == 48) && vis < 1.0 { return "Fog — poor visibility" }
            if conditions.humidity > 90 && conditions.temperature < 8 { return "Condensation on rock" }
            if gusts > 60 { return "Dangerous gusts" }
            if wind > 40 { return "High wind on faces" }
            return "Good climbing conditions"
        }
    }

    private var dangerSubtext: String {
        guard let conditions = weather.currentConditions else { return "" }
        switch activity {
        case .paragliding:
            return String(format: "%.0f km/h (gusts %.0f) %@", conditions.windSpeed, conditions.windGusts, conditions.windCardinal)
        case .skiTouring:
            let base = String(format: "%.0f°C", conditions.temperature)
            if let mt = weather.mountainWeather, let fl = mt.freezingLevel {
                return "\(base) · 0° at \(fl)m"
            }
            return base
        case .hiking:
            let parts = [
                String(format: "Feels %.0f°C", conditions.apparentTemperature),
                conditions.visibility < 10 ? String(format: "Vis %.0fkm", conditions.visibility) : nil
            ].compactMap { $0 }
            return parts.joined(separator: " · ")
        case .climbing:
            let recentPrecip = weather.recentPrecipitation
            if recentPrecip > 0.5 {
                return String(format: "%.1fmm rain (6h) · %d%% humidity", recentPrecip, conditions.humidity)
            }
            if conditions.humidity > 80 {
                return String(format: "%.0f°C · %d%% humidity", conditions.temperature, conditions.humidity)
            }
            return String(format: "%.0f°C", conditions.temperature)
        }
    }
}

// MARK: - Conditions Snapshot Card

struct ConditionsSnapshotCard: View {
    @EnvironmentObject var weather: WeatherService
    @EnvironmentObject var activityStore: ActivityStore
    @EnvironmentObject var locationService: LocationService

    var body: some View {
        VStack(spacing: 0) {
            if let conditions = weather.currentConditions {
                HStack(spacing: 14) {
                    // Weather icon
                    Image(systemName: conditions.weatherIcon)
                        .font(.system(size: 32))
                        .foregroundStyle(weatherIconColor(conditions))
                        .frame(width: 44)

                    // Temp + description
                    VStack(alignment: .leading, spacing: 3) {
                        Text(String(format: "%.0f°C", conditions.temperature))
                            .font(.mono(24, weight: .bold))
                            .foregroundStyle(Color.textPrimary)
                        Text(conditions.weatherDescription)
                            .font(.body(12))
                            .foregroundStyle(Color.textSecondary)
                    }

                    Spacer()

                    // Wind
                    VStack(alignment: .trailing, spacing: 3) {
                        HStack(spacing: 4) {
                            Image(systemName: "wind")
                                .font(.system(size: 12))
                            Text(String(format: "%.0f km/h", conditions.windSpeed))
                                .font(.mono(12))
                        }
                        .foregroundStyle(Color.textSecondary)

                        Text(conditions.windCardinal)
                            .font(.mono(11))
                            .foregroundStyle(Color.textTertiary)
                    }

                    Image(systemName: "chevron.right")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundStyle(Color.textTertiary)
                }

                // Freshness footer
                HStack(spacing: 4) {
                    if let name = weather.locationName {
                        Text(name)
                            .font(.mono(10))
                            .foregroundStyle(Color.textTertiary)
                    }
                    if let lastFetch = weather.lastFetchTime {
                        Text("·")
                            .font(.mono(10))
                            .foregroundStyle(Color.textTertiary)
                        Text(lastFetch, style: .relative)
                            .font(.mono(10))
                            .foregroundStyle(Color.textTertiary)
                        Text("ago")
                            .font(.mono(10))
                            .foregroundStyle(Color.textTertiary)
                    }
                    Spacer()
                }
                .padding(.top, 8)
            } else {
                VStack(spacing: 12) {
                    Image(systemName: activityStore.currentActivity.icon)
                        .font(.system(size: 36))
                        .foregroundStyle(activityStore.currentActivity.color.opacity(0.5))

                    ProgressView()
                        .tint(Color.textTertiary)

                    Text("Loading weather...")
                        .font(.body(13))
                        .foregroundStyle(Color.textSecondary)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
            }
        }
        .terminalCard()
        .task {
            // Wait for real device location (up to 5s) before first fetch
            if locationService.currentLocation == nil {
                for _ in 0..<10 {
                    try? await Task.sleep(for: .milliseconds(500))
                    if locationService.currentLocation != nil { break }
                }
            }
            let loc = locationService.effectiveLocation
            await weather.fetchWeather(latitude: loc.latitude, longitude: loc.longitude)
        }
        .onChange(of: locationService.currentLocation?.latitude) { _, _ in
            // .task handles first fetch; only re-fetch for subsequent location changes
            guard weather.lastFetchTime != nil else { return }
            let loc = locationService.effectiveLocation
            Task {
                await weather.fetchWeather(latitude: loc.latitude, longitude: loc.longitude)
            }
        }
    }

    private func weatherIconColor(_ conditions: WeatherConditions) -> Color {
        switch conditions.weatherCode {
        case 0, 1: return .warning
        case 2, 3: return .textSecondary
        case 45, 48: return .textTertiary
        case 51...67: return .accent
        case 71...86: return .glacierTravelAccent
        case 95...99: return .danger
        default: return .textSecondary
        }
    }
}

// MARK: - Quick Tools Row

struct QuickToolsRow: View {
    let activity: Activity

    private var tools: [ToolEntry] {
        let all = toolsFor(activity)
        return Array(all.prefix(3))
    }

    var body: some View {
        HStack(spacing: 10) {
            ForEach(tools) { tool in
                NavigationLink {
                    tool.destinationView
                } label: {
                    VStack(spacing: 6) {
                        Image(systemName: tool.icon)
                            .font(.system(size: 16, weight: .semibold))
                            .foregroundStyle(Color.accent)
                        Text(tool.shortTitle)
                            .font(.body(11, weight: .medium))
                            .foregroundStyle(Color.textSecondary)
                            .lineLimit(1)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(Color.lightSurface)
                    .cornerRadius(10)
                    .shadow(color: .black.opacity(0.04), radius: 2, x: 0, y: 1)
                }
                .buttonStyle(.plain)
            }
        }
    }

    private func toolsFor(_ activity: Activity) -> [ToolEntry] {
        switch activity {
        case .paragliding:
            return [
                ToolEntry(title: "Pre-Flight Assessment", subtitle: "", icon: "bird.fill", color: .accent, viewTag: .preFlight),
                ToolEntry(title: "Altimeter", subtitle: "", icon: "mountain.2.fill", color: .accent, viewTag: .altimeter),
                ToolEntry(title: "Compass", subtitle: "", icon: "location.north.fill", color: .accent, viewTag: .compass),
            ]
        case .skiTouring:
            return [
                ToolEntry(title: "Avalanche Bulletin", subtitle: "", icon: "exclamationmark.triangle.fill", color: .accent, viewTag: .bulletin),
                ToolEntry(title: "Inclinometer", subtitle: "", icon: "angle", color: .accent, viewTag: .inclinometer),
                ToolEntry(title: "Compass", subtitle: "", icon: "location.north.fill", color: .accent, viewTag: .compass),
            ]
        case .hiking:
            return [
                ToolEntry(title: "Compass", subtitle: "", icon: "location.north.fill", color: .accent, viewTag: .compass),
                ToolEntry(title: "Altimeter", subtitle: "", icon: "mountain.2.fill", color: .accent, viewTag: .altimeter),
            ]
        case .climbing:
            return [
                ToolEntry(title: "Inclinometer", subtitle: "", icon: "angle", color: .accent, viewTag: .inclinometer),
                ToolEntry(title: "Compass", subtitle: "", icon: "location.north.fill", color: .accent, viewTag: .compass),
                ToolEntry(title: "Altimeter", subtitle: "", icon: "mountain.2.fill", color: .accent, viewTag: .altimeter),
            ]
        }
    }
}
