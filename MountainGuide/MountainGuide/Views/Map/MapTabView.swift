import SwiftUI
import MapKit

// MARK: - Map Tab

struct MapTabView: View {
    @EnvironmentObject var activityStore: ActivityStore
    @StateObject private var airspaceService = AirspaceService.shared
    @StateObject private var launchSiteService = ParaglidingEarthService.shared
    @StateObject private var bulletinService = BulletinService.shared
    @State private var showAirspace = true
    @State private var showLaunchSites = true
    @State private var showDanger = true
    @State private var showSlope = false
    @State private var showTrails = false
    @State private var showPOI = false

    var body: some View {
        ZStack(alignment: .top) {
            // Full-screen activity-aware map
            ActivityMapView(
                activity: activityStore.currentActivity,
                airspaces: activityStore.currentActivity == .paragliding && showAirspace ? airspaceService.airspaces : [],
                dangerRegions: activityStore.currentActivity == .skiTouring && showDanger ? bulletinService.dangerRegions : [],
                showSlopeAngle: showSlope && (activityStore.currentActivity == .skiTouring || activityStore.currentActivity == .climbing),
                showHikingTrails: showTrails && activityStore.currentActivity == .hiking,
                poiAnnotations: showPOI ? poiForActivity : [],
                launchSites: activityStore.currentActivity == .paragliding && showLaunchSites ? launchSiteService.sites : [],
                trackPoints: [],
                onTap: nil
            )
            .ignoresSafeArea()

            // Bottom overlay: Layer toggles + Activity selector
            VStack(spacing: 0) {
                Spacer()

                // Layer toggles (centered)
                HStack(spacing: 8) {
                    Spacer()
                    togglesForActivity
                    Spacer()
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 8)

                // Activity selector above tab bar
                ActivitySelectorBar()
                    .environmentObject(activityStore)
                    .padding(.horizontal, 16)
                    .padding(.bottom, 8)
            }
        }
        .task {
            if activityStore.currentActivity == .paragliding {
                async let _air: Void = airspaceService.fetchAirspaces(
                    minLat: 46.3, minLon: 6.0,
                    maxLat: 47.5, maxLon: 10.5
                )
                async let _launch: Void = launchSiteService.fetchSites(
                    minLat: 46.3, minLon: 6.0,
                    maxLat: 47.5, maxLon: 10.5
                )
                _ = await (_air, _launch)
            }
            if activityStore.currentActivity == .skiTouring {
                await bulletinService.fetchDangerGeoJSON()
            }
        }
        .onChange(of: activityStore.currentActivity) { _, newValue in
            if newValue == .paragliding {
                Task {
                    async let _air: Void = airspaceService.fetchAirspaces(
                        minLat: 46.3, minLon: 6.0,
                        maxLat: 47.5, maxLon: 10.5
                    )
                    async let _launch: Void = launchSiteService.fetchSites(
                        minLat: 46.3, minLon: 6.0,
                        maxLat: 47.5, maxLon: 10.5
                    )
                    _ = await (_air, _launch)
                }
            }
            if newValue == .skiTouring {
                Task {
                    await bulletinService.fetchDangerGeoJSON()
                }
            }
            // Reset layer toggles on activity change
            showAirspace = (newValue == .paragliding)
            showLaunchSites = (newValue == .paragliding)
            showDanger = (newValue == .skiTouring)
            showSlope = false
            showTrails = false
            showPOI = false
        }
    }

    // MARK: - Activity-Specific Toggles

    @ViewBuilder
    private var togglesForActivity: some View {
        switch activityStore.currentActivity {
        case .paragliding:
            LayerToggleButton(
                icon: "airplane.circle",
                label: "Airspace",
                isActive: showAirspace
            ) {
                showAirspace.toggle()
            }
            LayerToggleButton(
                icon: "mappin.and.ellipse",
                label: "Launch Sites",
                isActive: showLaunchSites
            ) {
                showLaunchSites.toggle()
            }

        case .skiTouring:
            LayerToggleButton(
                icon: "exclamationmark.triangle.fill",
                label: "Danger",
                isActive: showDanger
            ) {
                showDanger.toggle()
            }
            LayerToggleButton(
                icon: "angle",
                label: "Slope",
                isActive: showSlope
            ) {
                showSlope.toggle()
            }

        case .hiking:
            LayerToggleButton(
                icon: "figure.hiking",
                label: "Trails",
                isActive: showTrails
            ) {
                showTrails.toggle()
            }
            LayerToggleButton(
                icon: "mappin.circle",
                label: "Huts & Peaks",
                isActive: showPOI
            ) {
                showPOI.toggle()
            }

        case .climbing:
            LayerToggleButton(
                icon: "angle",
                label: "Slope",
                isActive: showSlope
            ) {
                showSlope.toggle()
            }
            LayerToggleButton(
                icon: "figure.climbing",
                label: "Crags",
                isActive: showPOI
            ) {
                showPOI.toggle()
            }
        }
    }

    // MARK: - POI Data

    private var poiForActivity: [SwissPOI] {
        switch activityStore.currentActivity {
        case .hiking:
            return SwissPOI.huts + SwissPOI.peaks
        case .climbing:
            return SwissPOI.crags + SwissPOI.peaks
        default:
            return []
        }
    }
}

// MARK: - Swiss POI Data

struct SwissPOI: Identifiable {
    let id = UUID()
    let name: String
    let latitude: Double
    let longitude: Double
    let type: POIType

    enum POIType {
        case hut, peak, crag

        var icon: String {
            switch self {
            case .hut: return "house.fill"
            case .peak: return "mountain.2.fill"
            case .crag: return "figure.climbing"
            }
        }

        var tintColor: UIColor {
            switch self {
            case .hut: return UIColor(red: 0.55, green: 0.35, blue: 0.17, alpha: 1) // brown
            case .peak: return UIColor.systemGray
            case .crag: return UIColor(red: 0.49, green: 0.23, blue: 0.93, alpha: 1) // purple
            }
        }
    }

    // Notable SAC huts
    static let huts: [SwissPOI] = [
        SwissPOI(name: "Hörnlihütte", latitude: 45.9764, longitude: 7.6589, type: .hut),
        SwissPOI(name: "Cabane de Moiry", latitude: 46.1248, longitude: 7.5714, type: .hut),
        SwissPOI(name: "Konkordiahütte", latitude: 46.5461, longitude: 8.0142, type: .hut),
        SwissPOI(name: "Hollandiahütte", latitude: 46.5133, longitude: 7.8358, type: .hut),
        SwissPOI(name: "Finsteraarhornhütte", latitude: 46.5375, longitude: 8.0683, type: .hut),
        SwissPOI(name: "Dossenhütte", latitude: 46.6783, longitude: 8.1567, type: .hut),
        SwissPOI(name: "Cabane du Trient", latitude: 46.0042, longitude: 7.0775, type: .hut),
        SwissPOI(name: "Cabane de Bertol", latitude: 46.0633, longitude: 7.4283, type: .hut),
        SwissPOI(name: "Britanniahütte", latitude: 46.0656, longitude: 7.9353, type: .hut),
        SwissPOI(name: "Grünhornhütte", latitude: 46.5514, longitude: 8.0958, type: .hut),
    ]

    // Major Swiss peaks
    static let peaks: [SwissPOI] = [
        SwissPOI(name: "Matterhorn", latitude: 45.9763, longitude: 7.6586, type: .peak),
        SwissPOI(name: "Eiger", latitude: 46.5775, longitude: 8.0053, type: .peak),
        SwissPOI(name: "Mönch", latitude: 46.5578, longitude: 7.9972, type: .peak),
        SwissPOI(name: "Jungfrau", latitude: 46.5372, longitude: 7.9622, type: .peak),
        SwissPOI(name: "Finsteraarhorn", latitude: 46.5372, longitude: 8.1261, type: .peak),
        SwissPOI(name: "Aletschhorn", latitude: 46.4958, longitude: 7.9933, type: .peak),
        SwissPOI(name: "Dom", latitude: 46.0947, longitude: 7.8583, type: .peak),
        SwissPOI(name: "Weisshorn", latitude: 46.1067, longitude: 7.7164, type: .peak),
        SwissPOI(name: "Dent Blanche", latitude: 46.0336, longitude: 7.6039, type: .peak),
        SwissPOI(name: "Piz Bernina", latitude: 46.3819, longitude: 9.9083, type: .peak),
    ]

    // Climbing crags
    static let crags: [SwissPOI] = [
        SwissPOI(name: "Magic Wood", latitude: 46.3556, longitude: 9.2694, type: .crag),
        SwissPOI(name: "Grimsel", latitude: 46.5719, longitude: 8.3328, type: .crag),
        SwissPOI(name: "Voralpsee", latitude: 47.0639, longitude: 9.3347, type: .crag),
        SwissPOI(name: "Chironico", latitude: 46.4444, longitude: 8.8167, type: .crag),
        SwissPOI(name: "Cresciano", latitude: 46.2306, longitude: 9.0111, type: .crag),
        SwissPOI(name: "Brione", latitude: 46.3653, longitude: 8.7694, type: .crag),
        SwissPOI(name: "Sustenpass", latitude: 46.7333, longitude: 8.4500, type: .crag),
        SwissPOI(name: "Ratikon (Rätikon)", latitude: 47.0500, longitude: 9.7833, type: .crag),
    ]
}

// MARK: - Layer Toggle Button

struct LayerToggleButton: View {
    let icon: String
    let label: String
    let isActive: Bool
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 6) {
                Image(systemName: icon)
                    .font(.system(size: 14))
                Text(label)
                    .font(.mono(11, weight: .semibold))
            }
            .foregroundStyle(isActive ? .white : Color.textSecondary)
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background {
                if isActive {
                    Capsule().fill(Color.accent)
                } else {
                    Capsule().fill(.ultraThinMaterial)
                }
            }
            .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
        }
        .buttonStyle(.plain)
    }
}
