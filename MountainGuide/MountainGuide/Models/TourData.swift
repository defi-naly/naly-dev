import Foundation
import CoreLocation

// MARK: - Waypoint

struct Waypoint: Codable, Identifiable {
    let id: UUID
    var name: String
    var lat: Double
    var lon: Double
    var elevation: Double?
    var order: Int

    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: lat, longitude: lon)
    }

    init(id: UUID = UUID(), name: String, lat: Double, lon: Double, elevation: Double? = nil, order: Int) {
        self.id = id
        self.name = name
        self.lat = lat
        self.lon = lon
        self.elevation = elevation
        self.order = order
    }
}

// MARK: - Tour Route

struct TourRoute: Codable, Identifiable {
    let id: UUID
    var name: String
    var waypoints: [Waypoint]
    let createdAt: Date
    var updatedAt: Date

    init(id: UUID = UUID(), name: String = "New Tour", waypoints: [Waypoint] = [], createdAt: Date = Date(), updatedAt: Date = Date()) {
        self.id = id
        self.name = name
        self.waypoints = waypoints
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    var totalDistance: Double {
        guard waypoints.count > 1 else { return 0 }
        var total = 0.0
        let sorted = waypoints.sorted { $0.order < $1.order }
        for i in 1..<sorted.count {
            total += TourRoute.haversineDistance(
                lat1: sorted[i-1].lat, lon1: sorted[i-1].lon,
                lat2: sorted[i].lat, lon2: sorted[i].lon
            )
        }
        return total
    }

    var totalElevationGain: Double {
        guard waypoints.count > 1 else { return 0 }
        var gain = 0.0
        let sorted = waypoints.sorted { $0.order < $1.order }
        for i in 1..<sorted.count {
            if let e1 = sorted[i-1].elevation, let e2 = sorted[i].elevation, e2 > e1 {
                gain += e2 - e1
            }
        }
        return gain
    }

    var totalElevationLoss: Double {
        guard waypoints.count > 1 else { return 0 }
        var loss = 0.0
        let sorted = waypoints.sorted { $0.order < $1.order }
        for i in 1..<sorted.count {
            if let e1 = sorted[i-1].elevation, let e2 = sorted[i].elevation, e2 < e1 {
                loss += e1 - e2
            }
        }
        return loss
    }

    var dominantAspect: String? {
        guard waypoints.count > 1 else { return nil }
        let sorted = waypoints.sorted { $0.order < $1.order }
        var totalBearing = 0.0
        var count = 0
        for i in 1..<sorted.count {
            let bearing = TourRoute.bearing(
                lat1: sorted[i-1].lat, lon1: sorted[i-1].lon,
                lat2: sorted[i].lat, lon2: sorted[i].lon
            )
            totalBearing += bearing
            count += 1
        }
        guard count > 0 else { return nil }
        let avg = totalBearing / Double(count)
        return TourRoute.aspectFromBearing(avg)
    }

    var maxSlopeEstimate: Double? {
        guard waypoints.count > 1 else { return nil }
        let sorted = waypoints.sorted { $0.order < $1.order }
        var maxSlope = 0.0
        for i in 1..<sorted.count {
            guard let e1 = sorted[i-1].elevation, let e2 = sorted[i].elevation else { continue }
            let dist = TourRoute.haversineDistance(
                lat1: sorted[i-1].lat, lon1: sorted[i-1].lon,
                lat2: sorted[i].lat, lon2: sorted[i].lon
            )
            guard dist > 0 else { continue }
            let elevDiff = abs(e2 - e1)
            let slope = atan(elevDiff / dist) * 180 / .pi
            maxSlope = max(maxSlope, slope)
        }
        return maxSlope > 0 ? maxSlope : nil
    }

    var elevationRange: (min: Double, max: Double)? {
        let elevations = waypoints.compactMap(\.elevation)
        guard let min = elevations.min(), let max = elevations.max() else { return nil }
        return (min, max)
    }

    // MARK: - Utilities

    static func haversineDistance(lat1: Double, lon1: Double, lat2: Double, lon2: Double) -> Double {
        let R = 6371000.0 // Earth radius in meters
        let dLat = (lat2 - lat1) * .pi / 180
        let dLon = (lon2 - lon1) * .pi / 180
        let a = sin(dLat / 2) * sin(dLat / 2) +
                cos(lat1 * .pi / 180) * cos(lat2 * .pi / 180) *
                sin(dLon / 2) * sin(dLon / 2)
        let c = 2 * atan2(sqrt(a), sqrt(1 - a))
        return R * c
    }

    static func bearing(lat1: Double, lon1: Double, lat2: Double, lon2: Double) -> Double {
        let dLon = (lon2 - lon1) * .pi / 180
        let lat1Rad = lat1 * .pi / 180
        let lat2Rad = lat2 * .pi / 180
        let y = sin(dLon) * cos(lat2Rad)
        let x = cos(lat1Rad) * sin(lat2Rad) - sin(lat1Rad) * cos(lat2Rad) * cos(dLon)
        var bearing = atan2(y, x) * 180 / .pi
        bearing = bearing.truncatingRemainder(dividingBy: 360)
        if bearing < 0 { bearing += 360 }
        return bearing
    }

    static func aspectFromBearing(_ bearing: Double) -> String {
        let aspects = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        let index = Int((bearing + 22.5) / 45.0) % 8
        return aspects[index]
    }
}
