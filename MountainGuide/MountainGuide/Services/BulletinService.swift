import Foundation

// MARK: - SLF Avalanche Bulletin Service

@MainActor
class BulletinService: ObservableObject {
    static let shared = BulletinService()

    @Published var bulletins: [Bulletin] = []
    @Published var selectedBulletin: Bulletin?
    @Published var dangerRegions: [DangerRegionFeature] = []
    @Published var isLoading = false
    @Published var error: String?
    @Published var lastUpdated: Date?

    private var lastFetchTime: Date?
    private var lastGeoJSONFetchTime: Date?
    private let cacheInterval: TimeInterval = 2 * 60 * 60 // 2 hours

    private static let endpoint = "https://aws.slf.ch/api/bulletin/caaml/v4/en/json"
    private static let geoJSONEndpoint = "https://aws.slf.ch/api/bulletin/caaml/en/geojson"

    func fetchBulletin() async {
        // Check cache
        if let lastFetch = lastFetchTime,
           Date().timeIntervalSince(lastFetch) < cacheInterval,
           !bulletins.isEmpty {
            return
        }

        isLoading = true
        error = nil

        guard let url = URL(string: Self.endpoint) else {
            error = "Invalid bulletin URL"
            isLoading = false
            return
        }

        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            let decoder = JSONDecoder()
            let response = try decoder.decode(BulletinResponse.self, from: data)
            bulletins = response.bulletins
            lastFetchTime = Date()
            lastUpdated = Date()

            // Auto-select first bulletin if none selected
            if selectedBulletin == nil, let first = bulletins.first {
                selectedBulletin = first
            }
        } catch {
            // Keep cached data visible on error
            if bulletins.isEmpty {
                self.error = "Failed to fetch avalanche bulletin"
            }
        }

        isLoading = false
    }

    var allRegions: [BulletinRegion] {
        var seen = Set<String>()
        var regions: [BulletinRegion] = []
        for bulletin in bulletins {
            for region in bulletin.regions ?? [] {
                if !seen.contains(region.regionID) {
                    seen.insert(region.regionID)
                    regions.append(region)
                }
            }
        }
        return regions
    }

    func selectRegion(_ regionID: String) {
        selectedBulletin = bulletins.first { bulletin in
            bulletin.regions?.contains { $0.regionID == regionID } ?? false
        }
    }

    func fetchDangerGeoJSON() async {
        // Check cache
        if let lastFetch = lastGeoJSONFetchTime,
           Date().timeIntervalSince(lastFetch) < cacheInterval,
           !dangerRegions.isEmpty {
            return
        }

        guard let url = URL(string: Self.geoJSONEndpoint) else { return }

        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            let decoder = JSONDecoder()
            let collection = try decoder.decode(DangerRegionCollection.self, from: data)
            dangerRegions = collection.features
            lastGeoJSONFetchTime = Date()
        } catch {
            // Keep cached data on error
            if dangerRegions.isEmpty {
                self.error = "Failed to fetch danger regions"
            }
        }
    }

    func invalidateCache() {
        lastFetchTime = nil
        lastGeoJSONFetchTime = nil
    }

    var maxDangerLevel: Int {
        guard let bulletin = selectedBulletin else { return 0 }
        return bulletin.dangerRatings?.map(\.numericLevel).max() ?? 0
    }
}
