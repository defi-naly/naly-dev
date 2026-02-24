import Foundation

// MARK: - Activity Log Store

@MainActor
class ActivityLogStore: ObservableObject {
    static let shared = ActivityLogStore()

    @Published var records: [ActivityRecord] = []
    @Published var pendingReviews: [UUID] = []  // activity IDs awaiting post-trip review

    private let encoder = JSONEncoder()
    private let decoder = JSONDecoder()
    private let pendingReviewsKey = "pendingReviewIds"

    private init() {
        loadRecords()
        loadPendingReviews()
    }

    // MARK: - CRUD

    func save(flight: FlightLog) {
        let record = ActivityRecord.flight(flight)
        records.insert(record, at: 0)
        persist(record)
    }

    func save(tour: TourLogRecord) {
        let record = ActivityRecord.tour(tour)
        records.insert(record, at: 0)
        persist(record)
    }

    func save(hike: HikeLogRecord) {
        let record = ActivityRecord.hike(hike)
        records.insert(record, at: 0)
        persist(record)
    }

    func save(climb: ClimbLogRecord) {
        let record = ActivityRecord.climb(climb)
        records.insert(record, at: 0)
        persist(record)
    }

    func save(record: ActivityRecord) {
        records.insert(record, at: 0)
        persist(record)
    }

    func delete(at offsets: IndexSet) {
        let idsToDelete = offsets.map { records[$0].id }
        records.remove(atOffsets: offsets)
        Task {
            for id in idsToDelete {
                await ActivityFileStore.shared.deleteActivity(id: id)
            }
        }
    }

    func delete(id: UUID) {
        records.removeAll { $0.id == id }
        Task {
            await ActivityFileStore.shared.deleteActivity(id: id)
        }
    }

    // MARK: - Full Record Loading (lazy)

    func loadFullRecord(id: UUID) async -> ActivityRecord? {
        await ActivityFileStore.shared.loadActivity(id: id)
    }

    func loadTrackPoints(id: UUID) async -> [TrackPoint]? {
        await ActivityFileStore.shared.loadTrackPoints(id: id)
    }

    // MARK: - Queries

    var flights: [FlightLog] {
        records.compactMap { record in
            if case .flight(let log) = record { return log }
            return nil
        }
    }

    var totalFlightTime: TimeInterval {
        flights.reduce(0) { $0 + $1.duration }
    }

    var totalFlights: Int {
        flights.count
    }

    // MARK: - Pending Reviews

    func addPendingReview(activityId: UUID) {
        if !pendingReviews.contains(activityId) {
            pendingReviews.append(activityId)
            savePendingReviews()
        }
    }

    func removePendingReview(activityId: UUID) {
        pendingReviews.removeAll { $0 == activityId }
        savePendingReviews()
    }

    private func loadPendingReviews() {
        guard let data = UserDefaults.standard.data(forKey: pendingReviewsKey),
              let ids = try? decoder.decode([UUID].self, from: data) else { return }
        pendingReviews = ids
    }

    private func savePendingReviews() {
        guard let data = try? encoder.encode(pendingReviews) else { return }
        UserDefaults.standard.set(data, forKey: pendingReviewsKey)
    }

    // MARK: - Persistence (File-Based)

    private func persist(_ record: ActivityRecord) {
        Task {
            await ActivityFileStore.shared.saveActivity(record)
        }
    }

    private func loadRecords() {
        // First, attempt migration from UserDefaults
        Task {
            await ActivityFileStore.shared.migrateFromUserDefaults()

            // Load index summaries and convert to lightweight records
            let summaries = await ActivityFileStore.shared.loadIndex()

            // Load full records for now (summaries don't carry enough info for list display)
            var loaded: [ActivityRecord] = []
            for summary in summaries {
                if let record = await ActivityFileStore.shared.loadActivity(id: summary.id) {
                    loaded.append(record)
                }
            }

            await MainActor.run {
                if !loaded.isEmpty {
                    self.records = loaded
                } else {
                    // Fallback: try UserDefaults directly (first launch before migration completes)
                    self.loadFromUserDefaults()
                }
            }
        }
    }

    private func loadFromUserDefaults() {
        let key = "activityLogRecords"
        guard let data = UserDefaults.standard.data(forKey: key),
              let decoded = try? decoder.decode([ActivityRecord].self, from: data) else {
            return
        }
        records = decoded
    }
}
