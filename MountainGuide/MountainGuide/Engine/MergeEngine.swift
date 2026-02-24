import Foundation
import CoreLocation

// MARK: - Smart Merge Engine

enum MergeEngine {

    struct MergeSuggestion: Identifiable {
        let id = UUID()
        let groundActivity: ActivityRecord
        let flight: ActivityRecord
        let confidence: Double
        let suggestedName: String
    }

    static let maxMergeDistanceKm: Double = 5.0

    // MARK: - Detect Merges

    static func detectMerges(activities: [ActivityRecord]) -> [MergeSuggestion] {
        var suggestions: [MergeSuggestion] = []

        // Group by calendar day (UTC)
        let calendar = Calendar(identifier: .gregorian)
        let grouped = Dictionary(grouping: activities) { activity in
            calendar.startOfDay(for: activity.date)
        }

        for (_, dayActivities) in grouped {
            let flights = dayActivities.filter { $0.activityType == .paragliding }
            let groundActivities = dayActivities.filter {
                $0.activityType == .hiking || $0.activityType == .skiTouring || $0.activityType == .climbing
            }

            // Check each ground + flight pair
            for ground in groundActivities {
                for flight in flights {
                    if let suggestion = evaluateMerge(ground: ground, flight: flight) {
                        suggestions.append(suggestion)
                    }
                }
            }
        }

        return suggestions.sorted { $0.confidence > $1.confidence }
    }

    // MARK: - Evaluate Merge

    private static func evaluateMerge(ground: ActivityRecord, flight: ActivityRecord) -> MergeSuggestion? {
        // Get start coordinates
        guard let groundCoord = startCoordinate(of: ground),
              let flightCoord = startCoordinate(of: flight) else { return nil }

        let distanceKm = haversineDistance(
            lat1: groundCoord.latitude, lon1: groundCoord.longitude,
            lat2: flightCoord.latitude, lon2: flightCoord.longitude
        )

        guard distanceKm <= maxMergeDistanceKm else { return nil }

        let confidence = 1.0 - (distanceKm / maxMergeDistanceKm)
        let name = "Hike \u{0026} Fly"  // Hike & Fly

        return MergeSuggestion(
            groundActivity: ground,
            flight: flight,
            confidence: confidence,
            suggestedName: name
        )
    }

    // MARK: - Create Merged Activity

    static func createMerged(from suggestion: MergeSuggestion) -> MergedActivity {
        MergedActivity(
            date: min(suggestion.groundActivity.date, suggestion.flight.date),
            name: suggestion.suggestedName,
            componentActivityIds: [suggestion.groundActivity.id, suggestion.flight.id],
            totalDuration: suggestion.groundActivity.duration + suggestion.flight.duration,
            totalElevationGain: suggestion.groundActivity.elevationGain + suggestion.flight.elevationGain,
            totalDistance: suggestion.groundActivity.distance + suggestion.flight.distance
        )
    }

    // MARK: - Helpers

    private static func startCoordinate(of activity: ActivityRecord) -> CLLocationCoordinate2D? {
        switch activity {
        case .flight(let f):
            return f.takeoffCoordinate
        case .tour(let t):
            return t.trackPoints?.first?.coordinate
        case .hike(let h):
            return h.trackPoints?.first?.coordinate
        case .climb(let c):
            return c.trackPoints?.first?.coordinate
        }
    }

    private static func haversineDistance(lat1: Double, lon1: Double, lat2: Double, lon2: Double) -> Double {
        let R = 6371.0 // Earth radius in km
        let dLat = (lat2 - lat1) * .pi / 180
        let dLon = (lon2 - lon1) * .pi / 180
        let a = sin(dLat/2) * sin(dLat/2) +
                cos(lat1 * .pi / 180) * cos(lat2 * .pi / 180) *
                sin(dLon/2) * sin(dLon/2)
        let c = 2 * atan2(sqrt(a), sqrt(1-a))
        return R * c
    }
}
