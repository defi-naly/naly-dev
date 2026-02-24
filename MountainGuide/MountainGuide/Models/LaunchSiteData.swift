import Foundation
import CoreLocation

// MARK: - Wind Direction

enum WindDirection: String, CaseIterable, Codable, Comparable {
    case N, NE, E, SE, S, SW, W, NW

    var displayName: String { rawValue }

    static func < (lhs: WindDirection, rhs: WindDirection) -> Bool {
        let order: [WindDirection] = [.N, .NE, .E, .SE, .S, .SW, .W, .NW]
        return (order.firstIndex(of: lhs) ?? 0) < (order.firstIndex(of: rhs) ?? 0)
    }
}

// MARK: - Launch Site

struct LaunchSite: Identifiable {
    let id: UUID
    let name: String
    let latitude: Double
    let longitude: Double
    let altitude: Int
    let siteDescription: String
    let windDirections: [WindDirection: Int] // 0 = unsuitable, 1 = ok, 2 = optimal
    let isParagliding: Bool
    let isHanggliding: Bool

    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }

    var suitableWinds: [WindDirection] {
        windDirections.filter { $0.value > 0 }.map(\.key).sorted()
    }

    var suitableWindsDisplay: String {
        let winds = suitableWinds
        guard !winds.isEmpty else { return "No wind data" }
        return winds.map(\.rawValue).joined(separator: " ")
    }
}

// MARK: - GeoJSON Parsing

extension LaunchSite {
    /// Parse from ParaglidingEarth GeoJSON Feature (all property values are strings)
    static func fromGeoJSON(feature: [String: Any]) -> LaunchSite? {
        guard let geometry = feature["geometry"] as? [String: Any],
              let coordinates = geometry["coordinates"] as? [Double],
              coordinates.count >= 2,
              let properties = feature["properties"] as? [String: Any],
              let name = properties["name"] as? String else {
            return nil
        }

        let lon = coordinates[0]
        let lat = coordinates[1]

        let altitudeStr = properties["takeoff_altitude"] as? String ?? "0"
        let altitude = Int(altitudeStr) ?? 0

        let description = properties["takeoff_description"] as? String ?? ""

        // Parse wind directions (each is "0", "1", or "2")
        var winds: [WindDirection: Int] = [:]
        for direction in WindDirection.allCases {
            if let val = properties[direction.rawValue] as? String {
                winds[direction] = Int(val) ?? 0
            }
        }

        let pgStr = properties["paragliding"] as? String ?? "0"
        let hgStr = properties["hanggliding"] as? String ?? "0"

        return LaunchSite(
            id: UUID(),
            name: name,
            latitude: lat,
            longitude: lon,
            altitude: altitude,
            siteDescription: description,
            windDirections: winds,
            isParagliding: pgStr != "0",
            isHanggliding: hgStr != "0"
        )
    }
}
