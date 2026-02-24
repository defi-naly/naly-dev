import Foundation
import CoreLocation

// MARK: - Flight Logger

@MainActor
class FlightLogger: NSObject, ObservableObject, CLLocationManagerDelegate {
    static let shared = FlightLogger()

    @Published var isRecording = false
    @Published var currentAltitude: Double = 0
    @Published var currentVario: Double = 0        // m/s
    @Published var maxAltitude: Double = 0
    @Published var totalClimb: Double = 0
    @Published var elapsedTime: TimeInterval = 0
    @Published var currentSpeed: Double = 0        // m/s

    private var locationManager: CLLocationManager?
    private var trackPoints: [TrackPoint] = []
    private var startTime: Date?
    private var lastAltitude: Double?
    private var lastTimestamp: Date?
    private var timer: Timer?

    private override init() {
        super.init()
    }

    func startRecording() {
        guard !isRecording else { return }

        locationManager = CLLocationManager()
        locationManager?.delegate = self
        locationManager?.desiredAccuracy = kCLLocationAccuracyBest
        locationManager?.distanceFilter = 5
        locationManager?.allowsBackgroundLocationUpdates = false
        locationManager?.requestWhenInUseAuthorization()
        locationManager?.startUpdatingLocation()

        trackPoints = []
        startTime = Date()
        maxAltitude = 0
        totalClimb = 0
        elapsedTime = 0
        currentVario = 0
        isRecording = true

        // Elapsed time timer
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
            Task { @MainActor in
                guard let self = self, let start = self.startTime else { return }
                self.elapsedTime = Date().timeIntervalSince(start)
            }
        }
    }

    func stopRecording() -> FlightLog? {
        guard isRecording, let start = startTime else { return nil }

        locationManager?.stopUpdatingLocation()
        locationManager = nil
        timer?.invalidate()
        timer = nil
        isRecording = false

        guard trackPoints.count >= 2 else { return nil }

        let first = trackPoints.first!
        let last = trackPoints.last!

        // Calculate XC distance (straight line takeoff to landing)
        let takeoff = CLLocation(latitude: first.latitude, longitude: first.longitude)
        let landing = CLLocation(latitude: last.latitude, longitude: last.longitude)
        let xcDistance = takeoff.distance(from: landing) / 1000 // km

        let log = FlightLog(
            date: start,
            takeoffLat: first.latitude,
            takeoffLon: first.longitude,
            landingLat: last.latitude,
            landingLon: last.longitude,
            duration: Date().timeIntervalSince(start),
            maxAltitude: maxAltitude,
            altitudeGain: totalClimb,
            xcDistance: xcDistance,
            trackPoints: trackPoints
        )

        trackPoints = []
        startTime = nil
        lastAltitude = nil
        lastTimestamp = nil

        return log
    }

    // MARK: - CLLocationManagerDelegate

    nonisolated func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else { return }

        Task { @MainActor in
            let altitude = location.altitude
            let now = Date()
            let speed = max(0, location.speed)

            // Calculate vario
            var vario = 0.0
            if let prevAlt = lastAltitude, let prevTime = lastTimestamp {
                let dt = now.timeIntervalSince(prevTime)
                if dt > 0 {
                    vario = (altitude - prevAlt) / dt
                }
            }

            // Update state
            currentAltitude = altitude
            currentVario = vario
            currentSpeed = speed

            if altitude > maxAltitude {
                maxAltitude = altitude
            }

            if let prevAlt = lastAltitude, altitude > prevAlt {
                totalClimb += (altitude - prevAlt)
            }

            // Record track point
            let point = TrackPoint(
                latitude: location.coordinate.latitude,
                longitude: location.coordinate.longitude,
                altitude: altitude,
                timestamp: now,
                speed: speed,
                vario: vario
            )
            trackPoints.append(point)

            lastAltitude = altitude
            lastTimestamp = now
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        // GPS errors are non-fatal during flight recording
    }
}
