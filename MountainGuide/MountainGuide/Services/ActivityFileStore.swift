import Foundation

// MARK: - Activity File Store

/// File-based JSON storage for activities, replacing UserDefaults.
/// Structure:
///   Documents/Activities/index.json — lightweight summary array
///   Documents/Activities/{uuid}.json — full ActivityRecord with trackpoints
///   Documents/Reviews/index.json — review summary array
///   Documents/Reviews/review-{uuid}.json — full PostTripReview
actor ActivityFileStore {

    static let shared = ActivityFileStore()

    private let fileManager = FileManager.default

    private var activitiesDir: URL {
        let docs = fileManager.urls(for: .documentDirectory, in: .userDomainMask)[0]
        return docs.appendingPathComponent("Activities", isDirectory: true)
    }

    private var reviewsDir: URL {
        let docs = fileManager.urls(for: .documentDirectory, in: .userDomainMask)[0]
        return docs.appendingPathComponent("Reviews", isDirectory: true)
    }

    private var activitiesIndexURL: URL {
        activitiesDir.appendingPathComponent("index.json")
    }

    private var reviewsIndexURL: URL {
        reviewsDir.appendingPathComponent("index.json")
    }

    private let encoder: JSONEncoder = {
        let e = JSONEncoder()
        e.dateEncodingStrategy = .iso8601
        e.outputFormatting = [.prettyPrinted, .sortedKeys]
        return e
    }()

    private let decoder: JSONDecoder = {
        let d = JSONDecoder()
        d.dateDecodingStrategy = .iso8601
        return d
    }()

    // MARK: - Init

    private init() {
        ensureDirectories()
    }

    private func ensureDirectories() {
        try? fileManager.createDirectory(at: activitiesDir, withIntermediateDirectories: true)
        try? fileManager.createDirectory(at: reviewsDir, withIntermediateDirectories: true)
    }

    // MARK: - Activity Index (Summary)

    struct ActivitySummary: Codable, Identifiable {
        let id: UUID
        let date: Date
        let activityType: Activity
        let source: ActivitySource
        let name: String
        let duration: TimeInterval
        let elevationGain: Double
        let distance: Double
        let hasReview: Bool
    }

    func loadIndex() -> [ActivitySummary] {
        guard fileManager.fileExists(atPath: activitiesIndexURL.path),
              let data = try? Data(contentsOf: activitiesIndexURL),
              let index = try? decoder.decode([ActivitySummary].self, from: data) else {
            return []
        }
        return index
    }

    func saveIndex(_ summaries: [ActivitySummary]) {
        guard let data = try? encoder.encode(summaries) else { return }
        try? data.write(to: activitiesIndexURL, options: .atomic)
    }

    // MARK: - Full Activity Records

    func saveActivity(_ record: ActivityRecord) {
        let url = activitiesDir.appendingPathComponent("\(record.id.uuidString).json")
        guard let data = try? encoder.encode(record) else { return }
        try? data.write(to: url, options: .atomic)

        // Update index
        var index = loadIndex()
        index.removeAll { $0.id == record.id }
        index.insert(makeSummary(from: record), at: 0)
        saveIndex(index)
    }

    func loadActivity(id: UUID) -> ActivityRecord? {
        let url = activitiesDir.appendingPathComponent("\(id.uuidString).json")
        guard let data = try? Data(contentsOf: url),
              let record = try? decoder.decode(ActivityRecord.self, from: data) else {
            return nil
        }
        return record
    }

    func deleteActivity(id: UUID) {
        let url = activitiesDir.appendingPathComponent("\(id.uuidString).json")
        try? fileManager.removeItem(at: url)

        var index = loadIndex()
        index.removeAll { $0.id == id }
        saveIndex(index)
    }

    func loadTrackPoints(id: UUID) -> [TrackPoint]? {
        guard let record = loadActivity(id: id) else { return nil }
        switch record {
        case .flight(let f): return f.trackPoints
        case .tour(let t): return t.trackPoints
        case .hike(let h): return h.trackPoints
        case .climb(let c): return c.trackPoints
        }
    }

    // MARK: - Reviews

    struct ReviewSummary: Codable, Identifiable {
        let id: UUID
        let activityId: UUID
        let date: Date
    }

    func loadReviewIndex() -> [ReviewSummary] {
        guard fileManager.fileExists(atPath: reviewsIndexURL.path),
              let data = try? Data(contentsOf: reviewsIndexURL),
              let index = try? decoder.decode([ReviewSummary].self, from: data) else {
            return []
        }
        return index
    }

    func saveReviewIndex(_ summaries: [ReviewSummary]) {
        guard let data = try? encoder.encode(summaries) else { return }
        try? data.write(to: reviewsIndexURL, options: .atomic)
    }

    func saveReview(_ review: PostTripReview) {
        let url = reviewsDir.appendingPathComponent("review-\(review.activityId.uuidString).json")
        guard let data = try? encoder.encode(review) else { return }
        try? data.write(to: url, options: .atomic)

        var index = loadReviewIndex()
        index.removeAll { $0.activityId == review.activityId }
        index.insert(ReviewSummary(id: review.id, activityId: review.activityId, date: review.date), at: 0)
        saveReviewIndex(index)
    }

    func loadReview(activityId: UUID) -> PostTripReview? {
        let url = reviewsDir.appendingPathComponent("review-\(activityId.uuidString).json")
        guard let data = try? Data(contentsOf: url),
              let review = try? decoder.decode(PostTripReview.self, from: data) else {
            return nil
        }
        return review
    }

    func hasReview(activityId: UUID) -> Bool {
        let url = reviewsDir.appendingPathComponent("review-\(activityId.uuidString).json")
        return fileManager.fileExists(atPath: url.path)
    }

    // MARK: - Migration from UserDefaults

    func migrateFromUserDefaults() {
        let key = "activityLogRecords"
        guard let data = UserDefaults.standard.data(forKey: key),
              let records = try? JSONDecoder().decode([ActivityRecord].self, from: data),
              !records.isEmpty else { return }

        for record in records {
            saveActivity(record)
        }

        UserDefaults.standard.removeObject(forKey: key)
    }

    // MARK: - Summary Builder

    private func makeSummary(from record: ActivityRecord) -> ActivitySummary {
        switch record {
        case .flight(let f):
            return ActivitySummary(
                id: f.id, date: f.date, activityType: .paragliding,
                source: f.source, name: "Flight",
                duration: f.duration, elevationGain: f.altitudeGain,
                distance: f.xcDistance, hasReview: false
            )
        case .tour(let t):
            return ActivitySummary(
                id: t.id, date: t.date, activityType: .skiTouring,
                source: t.source, name: t.routeName,
                duration: t.duration, elevationGain: t.elevationGain,
                distance: t.distance, hasReview: false
            )
        case .hike(let h):
            return ActivitySummary(
                id: h.id, date: h.date, activityType: .hiking,
                source: h.source, name: h.name,
                duration: h.duration, elevationGain: h.elevationGain,
                distance: h.distance, hasReview: false
            )
        case .climb(let c):
            return ActivitySummary(
                id: c.id, date: c.date, activityType: .climbing,
                source: c.source, name: c.name,
                duration: c.duration, elevationGain: c.elevationGain,
                distance: c.distance, hasReview: false
            )
        }
    }
}
