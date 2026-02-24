import Foundation
import CoreLocation

// MARK: - Track Point

struct TrackPoint: Codable {
    let latitude: Double
    let longitude: Double
    let altitude: Double         // meters
    let timestamp: Date
    let speed: Double            // m/s ground speed
    let vario: Double            // m/s vertical speed (positive = climb)

    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }
}

// MARK: - Flight Log

// MARK: - Heart Rate Zones

struct HeartRateZones: Codable {
    let zone1Minutes: Int   // 50-60% max HR
    let zone2Minutes: Int   // 60-70%
    let zone3Minutes: Int   // 70-80%
    let zone4Minutes: Int   // 80-90%
    let zone5Minutes: Int   // 90-100%
    let averageHR: Int
    let maxHR: Int
}

// MARK: - Flight Log

struct FlightLog: Codable, Identifiable {
    let id: UUID
    let date: Date
    let takeoffLat: Double
    let takeoffLon: Double
    let landingLat: Double
    let landingLon: Double
    let duration: TimeInterval      // seconds
    let maxAltitude: Double         // meters
    let altitudeGain: Double        // meters total climb
    let xcDistance: Double           // km cross-country distance
    let trackPoints: [TrackPoint]
    var source: ActivitySource
    var xcScore: Double?
    var igcUrl: String?
    var competitionDistance: Double?

    var takeoffCoordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: takeoffLat, longitude: takeoffLon)
    }

    var landingCoordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: landingLat, longitude: landingLon)
    }

    var durationFormatted: String {
        let hours = Int(duration) / 3600
        let minutes = (Int(duration) % 3600) / 60
        if hours > 0 {
            return "\(hours)h \(minutes)m"
        }
        return "\(minutes)m"
    }

    init(
        id: UUID = UUID(),
        date: Date = Date(),
        takeoffLat: Double,
        takeoffLon: Double,
        landingLat: Double,
        landingLon: Double,
        duration: TimeInterval,
        maxAltitude: Double,
        altitudeGain: Double,
        xcDistance: Double,
        trackPoints: [TrackPoint],
        source: ActivitySource = .manual,
        xcScore: Double? = nil,
        igcUrl: String? = nil,
        competitionDistance: Double? = nil
    ) {
        self.id = id
        self.date = date
        self.takeoffLat = takeoffLat
        self.takeoffLon = takeoffLon
        self.landingLat = landingLat
        self.landingLon = landingLon
        self.duration = duration
        self.maxAltitude = maxAltitude
        self.altitudeGain = altitudeGain
        self.xcDistance = xcDistance
        self.trackPoints = trackPoints
        self.source = source
        self.xcScore = xcScore
        self.igcUrl = igcUrl
        self.competitionDistance = competitionDistance
    }
}

// MARK: - Activity Record

enum ActivityRecord: Codable, Identifiable {
    case flight(FlightLog)
    case tour(TourLogRecord)
    case hike(HikeLogRecord)
    case climb(ClimbLogRecord)

    var id: UUID {
        switch self {
        case .flight(let log): return log.id
        case .tour(let log): return log.id
        case .hike(let log): return log.id
        case .climb(let log): return log.id
        }
    }

    var date: Date {
        switch self {
        case .flight(let log): return log.date
        case .tour(let log): return log.date
        case .hike(let log): return log.date
        case .climb(let log): return log.date
        }
    }

    var activityType: Activity {
        switch self {
        case .flight: return .paragliding
        case .tour: return .skiTouring
        case .hike: return .hiking
        case .climb: return .climbing
        }
    }

    var source: ActivitySource {
        switch self {
        case .flight(let f): return f.source
        case .tour(let t): return t.source
        case .hike(let h): return h.source
        case .climb(let c): return c.source
        }
    }

    var elevationGain: Double {
        switch self {
        case .flight(let f): return f.altitudeGain
        case .tour(let t): return t.elevationGain
        case .hike(let h): return h.elevationGain
        case .climb(let c): return c.elevationGain
        }
    }

    var duration: TimeInterval {
        switch self {
        case .flight(let f): return f.duration
        case .tour(let t): return t.duration
        case .hike(let h): return h.duration
        case .climb(let c): return c.duration
        }
    }

    var distance: Double {
        switch self {
        case .flight(let f): return f.xcDistance
        case .tour(let t): return t.distance
        case .hike(let h): return h.distance
        case .climb(let c): return c.distance
        }
    }

    var name: String {
        switch self {
        case .flight: return "Flight"
        case .tour(let t): return t.routeName
        case .hike(let h): return h.name
        case .climb(let c): return c.name
        }
    }
}

// MARK: - Tour Log

struct TourLogRecord: Codable, Identifiable {
    let id: UUID
    let date: Date
    let routeName: String
    let distance: Double       // km
    let elevationGain: Double  // meters
    let duration: TimeInterval
    var source: ActivitySource
    var trackPoints: [TrackPoint]?
    var heartRateZones: HeartRateZones?
    var maxSlopeEncountered: Double?
    var caloriesBurned: Double?

    init(
        id: UUID = UUID(),
        date: Date = Date(),
        routeName: String,
        distance: Double,
        elevationGain: Double,
        duration: TimeInterval,
        source: ActivitySource = .manual,
        trackPoints: [TrackPoint]? = nil,
        heartRateZones: HeartRateZones? = nil,
        maxSlopeEncountered: Double? = nil,
        caloriesBurned: Double? = nil
    ) {
        self.id = id
        self.date = date
        self.routeName = routeName
        self.distance = distance
        self.elevationGain = elevationGain
        self.duration = duration
        self.source = source
        self.trackPoints = trackPoints
        self.heartRateZones = heartRateZones
        self.maxSlopeEncountered = maxSlopeEncountered
        self.caloriesBurned = caloriesBurned
    }
}

// MARK: - Hike Log

struct HikeLogRecord: Codable, Identifiable {
    let id: UUID
    let date: Date
    let name: String
    let distance: Double       // km
    let elevationGain: Double  // meters
    let duration: TimeInterval
    var source: ActivitySource
    var trackPoints: [TrackPoint]?
    var heartRateZones: HeartRateZones?
    var caloriesBurned: Double?

    init(
        id: UUID = UUID(),
        date: Date = Date(),
        name: String,
        distance: Double,
        elevationGain: Double,
        duration: TimeInterval,
        source: ActivitySource = .manual,
        trackPoints: [TrackPoint]? = nil,
        heartRateZones: HeartRateZones? = nil,
        caloriesBurned: Double? = nil
    ) {
        self.id = id
        self.date = date
        self.name = name
        self.distance = distance
        self.elevationGain = elevationGain
        self.duration = duration
        self.source = source
        self.trackPoints = trackPoints
        self.heartRateZones = heartRateZones
        self.caloriesBurned = caloriesBurned
    }
}

// MARK: - Climb Log

struct ClimbLogRecord: Codable, Identifiable {
    let id: UUID
    let date: Date
    let name: String
    let distance: Double        // km
    let elevationGain: Double   // meters
    let duration: TimeInterval
    var source: ActivitySource
    var trackPoints: [TrackPoint]?
    var heartRateZones: HeartRateZones?
    var caloriesBurned: Double?

    init(
        id: UUID = UUID(),
        date: Date = Date(),
        name: String,
        distance: Double,
        elevationGain: Double,
        duration: TimeInterval,
        source: ActivitySource = .manual,
        trackPoints: [TrackPoint]? = nil,
        heartRateZones: HeartRateZones? = nil,
        caloriesBurned: Double? = nil
    ) {
        self.id = id
        self.date = date
        self.name = name
        self.distance = distance
        self.elevationGain = elevationGain
        self.duration = duration
        self.source = source
        self.trackPoints = trackPoints
        self.heartRateZones = heartRateZones
        self.caloriesBurned = caloriesBurned
    }
}
