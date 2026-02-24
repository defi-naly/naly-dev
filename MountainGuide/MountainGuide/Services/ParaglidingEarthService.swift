import Foundation
import CoreLocation

// MARK: - ParaglidingEarth API Service

@MainActor
class ParaglidingEarthService: ObservableObject {
    static let shared = ParaglidingEarthService()

    @Published var sites: [LaunchSite] = []
    @Published var isLoading = false
    @Published var error: String?

    private var lastFetchTime: Date?
    private var lastBounds: (Double, Double, Double, Double)?
    private let cacheInterval: TimeInterval = 24 * 60 * 60 // 24 hours

    func fetchSites(
        minLat: Double, minLon: Double,
        maxLat: Double, maxLon: Double
    ) async {
        // Check cache
        if let lastFetch = lastFetchTime,
           let bounds = lastBounds,
           Date().timeIntervalSince(lastFetch) < cacheInterval,
           bounds.0 <= minLat && bounds.1 <= minLon &&
           bounds.2 >= maxLat && bounds.3 >= maxLon {
            return
        }

        isLoading = true
        error = nil

        let urlString = "http://www.paraglidingearth.com/api/geojson/getBoundingBoxSites.php"
            + "?north=\(maxLat)&east=\(maxLon)&south=\(minLat)&west=\(minLon)"

        guard let url = URL(string: urlString) else {
            error = "Invalid URL"
            isLoading = false
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.timeoutInterval = 15

        do {
            let (data, response) = try await URLSession.shared.data(for: request)

            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else {
                loadSwissFallback()
                isLoading = false
                return
            }

            // Manual JSON parsing (properties are all strings)
            guard let json = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                  let features = json["features"] as? [[String: Any]] else {
                loadSwissFallback()
                isLoading = false
                return
            }

            let parsed = features.compactMap { LaunchSite.fromGeoJSON(feature: $0) }
                .filter { $0.isParagliding }

            if parsed.isEmpty {
                loadSwissFallback()
            } else {
                sites = parsed
                lastFetchTime = Date()
                lastBounds = (minLat, minLon, maxLat, maxLon)
            }
        } catch {
            loadSwissFallback()
        }

        isLoading = false
    }

    func invalidateCache() {
        lastFetchTime = nil
    }

    // MARK: - Swiss Fallback Data

    private func loadSwissFallback() {
        sites = Self.swissFallbackSites
        lastFetchTime = Date()
    }

    static let swissFallbackSites: [LaunchSite] = [
        LaunchSite(
            id: UUID(), name: "Niesen", latitude: 46.6450, longitude: 7.6517, altitude: 2362,
            siteDescription: "Classic Bernese Oberland site with panoramic views",
            windDirections: [.N: 2, .NE: 1, .NW: 2, .W: 1], isParagliding: true, isHanggliding: true
        ),
        LaunchSite(
            id: UUID(), name: "Fiesch - Kühboden", latitude: 46.4080, longitude: 8.1200, altitude: 2212,
            siteDescription: "Gateway to Aletsch Glacier, reliable thermals",
            windDirections: [.S: 2, .SE: 1, .SW: 1], isParagliding: true, isHanggliding: true
        ),
        LaunchSite(
            id: UUID(), name: "Planplatten", latitude: 46.7500, longitude: 8.2500, altitude: 2245,
            siteDescription: "Popular Hasliberg launch, Brienzer See valley",
            windDirections: [.N: 2, .NW: 2, .NE: 1], isParagliding: true, isHanggliding: false
        ),
        LaunchSite(
            id: UUID(), name: "Interlaken - Beatenberg", latitude: 46.6950, longitude: 7.7800, altitude: 1600,
            siteDescription: "Above Lake Thun, beginner friendly",
            windDirections: [.N: 2, .NW: 1, .NE: 1], isParagliding: true, isHanggliding: true
        ),
        LaunchSite(
            id: UUID(), name: "Verbier - Attelas", latitude: 46.0989, longitude: 7.2283, altitude: 2727,
            siteDescription: "High-altitude launch, strong Valais thermals",
            windDirections: [.S: 2, .SW: 2, .SE: 1, .W: 1], isParagliding: true, isHanggliding: false
        ),
        LaunchSite(
            id: UUID(), name: "Engelberg - Brunni", latitude: 46.8133, longitude: 8.4117, altitude: 1860,
            siteDescription: "Central Switzerland, Mt. Titlis backdrop",
            windDirections: [.N: 2, .NE: 2, .NW: 1], isParagliding: true, isHanggliding: false
        ),
        LaunchSite(
            id: UUID(), name: "Davos - Jakobshorn", latitude: 46.7700, longitude: 9.8500, altitude: 2590,
            siteDescription: "Graubünden classic, excellent XC potential",
            windDirections: [.W: 2, .NW: 2, .SW: 1], isParagliding: true, isHanggliding: true
        ),
        LaunchSite(
            id: UUID(), name: "Chäserrugg", latitude: 47.1433, longitude: 9.2883, altitude: 2262,
            siteDescription: "Toggenburg panorama, consistent conditions",
            windDirections: [.S: 2, .SW: 2, .SE: 1], isParagliding: true, isHanggliding: true
        ),
        LaunchSite(
            id: UUID(), name: "Grindelwald - First", latitude: 46.6617, longitude: 8.0583, altitude: 2168,
            siteDescription: "Eiger north face views, tourist-friendly",
            windDirections: [.N: 2, .NW: 2, .NE: 1, .W: 1], isParagliding: true, isHanggliding: false
        ),
        LaunchSite(
            id: UUID(), name: "Frutigen - Elsigen", latitude: 46.5833, longitude: 7.6667, altitude: 2000,
            siteDescription: "Kander valley launch, reliable afternoon thermals",
            windDirections: [.N: 2, .NW: 1, .NE: 1, .W: 1], isParagliding: true, isHanggliding: false
        ),
    ]
}
