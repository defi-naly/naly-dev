import Foundation

// MARK: - Merged Activity (Hike & Fly, etc.)

struct MergedActivity: Codable, Identifiable {
    let id: UUID
    let date: Date
    let name: String
    let componentActivityIds: [UUID]
    var totalDuration: TimeInterval
    var totalElevationGain: Double
    var totalDistance: Double

    init(
        id: UUID = UUID(),
        date: Date,
        name: String,
        componentActivityIds: [UUID],
        totalDuration: TimeInterval,
        totalElevationGain: Double,
        totalDistance: Double
    ) {
        self.id = id
        self.date = date
        self.name = name
        self.componentActivityIds = componentActivityIds
        self.totalDuration = totalDuration
        self.totalElevationGain = totalElevationGain
        self.totalDistance = totalDistance
    }

    var durationFormatted: String {
        let hours = Int(totalDuration) / 3600
        let minutes = (Int(totalDuration) % 3600) / 60
        if hours > 0 {
            return "\(hours)h \(minutes)m"
        }
        return "\(minutes)m"
    }
}
