import Foundation
import CoreLocation

// MARK: - Airspace Service (OpenAIP API)

@MainActor
class AirspaceService: ObservableObject {
    static let shared = AirspaceService()

    @Published var airspaces: [Airspace] = []
    @Published var isLoading = false
    @Published var error: String?

    private var lastFetchTime: Date?
    private var lastBounds: (Double, Double, Double, Double)?
    private let cacheInterval: TimeInterval = 24 * 60 * 60 // 24 hours

    private let decoder = JSONDecoder()
    private let apiKey: String? = nil // OpenAIP requires API key; set via UserDefaults or config

    func fetchAirspaces(
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

        // OpenAIP API v2
        let urlString = "https://api.core.openaip.net/api/airspaces"
            + "?pos=\((minLat + maxLat) / 2),\((minLon + maxLon) / 2)"
            + "&dist=100000"  // 100km radius
            + "&country=CH"
            + "&limit=200"
            + "&page=1"

        guard let url = URL(string: urlString) else {
            error = "Invalid URL"
            isLoading = false
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        if let key = apiKey {
            request.setValue(key, forHTTPHeaderField: "x-openaip-client-id")
        }

        do {
            let (data, response) = try await URLSession.shared.data(for: request)

            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else {
                // Fallback to Swiss demo airspace data
                loadSwissAirspaceFallback()
                isLoading = false
                return
            }

            let apiResponse = try decoder.decode(OpenAIPAirspaceResponse.self, from: data)
            airspaces = apiResponse.items.map { $0.toAirspace() }
            lastFetchTime = Date()
            lastBounds = (minLat, minLon, maxLat, maxLon)
        } catch {
            // Use fallback data
            loadSwissAirspaceFallback()
        }

        isLoading = false
    }

    // MARK: - Swiss Airspace Fallback Data

    private func loadSwissAirspaceFallback() {
        // Key Swiss airspaces for paragliding — CTRs and TMAs
        airspaces = [
            // Zurich CTR
            Airspace(
                id: "ch-zurich-ctr",
                name: "Zurich CTR",
                airspaceClass: .ctr,
                lowerLimit: AltitudeLimit(value: 0, unit: .ft, reference: .gnd),
                upperLimit: AltitudeLimit(value: 6000, unit: .ft, reference: .msl),
                geometry: [
                    [8.40, 47.55], [8.60, 47.55], [8.65, 47.40],
                    [8.35, 47.35], [8.30, 47.45], [8.40, 47.55]
                ]
            ),
            // Bern TMA
            Airspace(
                id: "ch-bern-tma",
                name: "Bern TMA",
                airspaceClass: .tma,
                lowerLimit: AltitudeLimit(value: 6500, unit: .ft, reference: .msl),
                upperLimit: AltitudeLimit(value: 10000, unit: .ft, reference: .msl),
                geometry: [
                    [7.35, 47.00], [7.60, 47.00], [7.60, 46.85],
                    [7.35, 46.85], [7.35, 47.00]
                ]
            ),
            // Geneva CTR
            Airspace(
                id: "ch-geneva-ctr",
                name: "Geneva CTR",
                airspaceClass: .ctr,
                lowerLimit: AltitudeLimit(value: 0, unit: .ft, reference: .gnd),
                upperLimit: AltitudeLimit(value: 6500, unit: .ft, reference: .msl),
                geometry: [
                    [6.05, 46.28], [6.20, 46.30], [6.25, 46.18],
                    [6.08, 46.15], [6.05, 46.28]
                ]
            ),
            // Sion Restricted
            Airspace(
                id: "ch-sion-r",
                name: "Sion R",
                airspaceClass: .restricted,
                lowerLimit: AltitudeLimit(value: 0, unit: .ft, reference: .gnd),
                upperLimit: AltitudeLimit(value: 6500, unit: .ft, reference: .msl),
                geometry: [
                    [7.28, 46.24], [7.38, 46.24], [7.38, 46.20],
                    [7.28, 46.20], [7.28, 46.24]
                ]
            ),
        ]
        lastFetchTime = Date()
    }

    func invalidateCache() {
        lastFetchTime = nil
    }
}
