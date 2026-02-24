import Foundation

// MARK: - XContest Service

@MainActor
class XContestService: ObservableObject {
    static let shared = XContestService()

    @Published var flights: [XContestFlight] = []
    @Published var isLoading = false
    @Published var username: String? {
        didSet { UserDefaults.standard.set(username, forKey: usernameKey) }
    }
    @Published var lastSyncDate: Date?

    private let usernameKey = "xcontestUsername"
    private let lastSyncKey = "xcontestLastSyncDate"

    struct XContestFlight: Codable, Identifiable {
        let id: String
        let date: Date
        let takeoffName: String
        let distance: Double       // km
        let points: Double         // XContest points
        let duration: TimeInterval
        let igcUrl: String?
        let maxAltitude: Double?
    }

    private init() {
        username = UserDefaults.standard.string(forKey: usernameKey)
        if let ts = UserDefaults.standard.object(forKey: lastSyncKey) as? Date {
            lastSyncDate = ts
        }
    }

    // MARK: - Fetch Flights

    func fetchFlights() async {
        guard let username, !username.isEmpty else { return }

        isLoading = true
        defer { isLoading = false }

        // XContest JSON API V2
        let urlString = "https://www.xcontest.org/api/2/flights?pilot=\(username)&sort=date&dir=desc&limit=50"
        guard let url = URL(string: urlString) else { return }

        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else { return }

            let decoded = try JSONDecoder().decode(XContestAPIResponse.self, from: data)
            flights = decoded.flights.map { flight in
                XContestFlight(
                    id: flight.id,
                    date: ISO8601DateFormatter().date(from: flight.dateStr) ?? Date(),
                    takeoffName: flight.takeoff?.name ?? "Unknown",
                    distance: flight.distance ?? 0,
                    points: flight.points ?? 0,
                    duration: flight.duration ?? 0,
                    igcUrl: flight.igcUrl,
                    maxAltitude: flight.maxAltitude
                )
            }
        } catch {
            // Silently fail — network errors are expected
        }
    }

    // MARK: - Download IGC

    func downloadIGC(url: String) async throws -> String {
        guard let igcURL = URL(string: url) else {
            throw URLError(.badURL)
        }
        let (data, _) = try await URLSession.shared.data(from: igcURL)
        guard let content = String(data: data, encoding: .utf8) else {
            throw URLError(.cannotDecodeContentData)
        }
        return content
    }

    // MARK: - Import Flight

    func importFlight(_ flight: XContestFlight) async {
        var trackPoints: [TrackPoint] = []

        // Try to download and parse IGC for trackpoints
        if let igcUrl = flight.igcUrl,
           let igcContent = try? await downloadIGC(url: igcUrl),
           let parsed = IGCParser.parse(igcContent) {
            trackPoints = parsed.trackPoints
        }

        let takeoff = trackPoints.first
        let landing = trackPoints.last

        let flightLog = FlightLog(
            date: flight.date,
            takeoffLat: takeoff?.latitude ?? 0,
            takeoffLon: takeoff?.longitude ?? 0,
            landingLat: landing?.latitude ?? 0,
            landingLon: landing?.longitude ?? 0,
            duration: flight.duration,
            maxAltitude: flight.maxAltitude ?? 0,
            altitudeGain: trackPoints.isEmpty ? 0 : calculateClimb(trackPoints),
            xcDistance: flight.distance,
            trackPoints: trackPoints,
            source: .xcontest(flightId: flight.id),
            xcScore: flight.points,
            igcUrl: flight.igcUrl
        )

        ActivityLogStore.shared.save(flight: flightLog)
        ActivityLogStore.shared.addPendingReview(activityId: flightLog.id)
    }

    // MARK: - Sync All

    func syncAll() async {
        guard username != nil else { return }

        await fetchFlights()

        // Filter out already-imported flights
        let existingIds = await getExistingXContestIds()
        let newFlights = flights.filter { !existingIds.contains($0.id) }

        for flight in newFlights {
            await importFlight(flight)
        }

        lastSyncDate = Date()
        UserDefaults.standard.set(lastSyncDate, forKey: lastSyncKey)
    }

    // MARK: - Helpers

    private func calculateClimb(_ points: [TrackPoint]) -> Double {
        var totalClimb = 0.0
        for i in 1..<points.count {
            let diff = points[i].altitude - points[i-1].altitude
            if diff > 0 { totalClimb += diff }
        }
        return totalClimb
    }

    private func getExistingXContestIds() async -> Set<String> {
        let summaries = await ActivityFileStore.shared.loadIndex()
        var ids = Set<String>()
        for summary in summaries {
            if case .xcontest(let flightId) = summary.source {
                ids.insert(flightId)
            }
        }
        return ids
    }
}

// MARK: - API Response Models

private struct XContestAPIResponse: Codable {
    let flights: [XContestAPIFlight]
}

private struct XContestAPIFlight: Codable {
    let id: String
    let dateStr: String
    let takeoff: XContestTakeoff?
    let distance: Double?
    let points: Double?
    let duration: TimeInterval?
    let igcUrl: String?
    let maxAltitude: Double?

    enum CodingKeys: String, CodingKey {
        case id, takeoff, distance, points, duration, maxAltitude
        case dateStr = "date"
        case igcUrl = "igc_url"
    }
}

private struct XContestTakeoff: Codable {
    let name: String
}
