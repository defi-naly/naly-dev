import Foundation
import CoreLocation

// MARK: - Shared Location Service

@MainActor
class LocationService: NSObject, ObservableObject {
    static let shared = LocationService()

    @Published var currentLocation: CLLocationCoordinate2D?
    @Published private(set) var authorizationDenied = false

    /// Device location if available, otherwise Zurich fallback
    var effectiveLocation: CLLocationCoordinate2D {
        currentLocation ?? CLLocationCoordinate2D(latitude: 47.3769, longitude: 8.5417)
    }

    private let manager = CLLocationManager()
    private var gotInitialFix = false

    override init() {
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyHundredMeters
    }

    func requestPermissionAndStart() {
        let status = manager.authorizationStatus
        switch status {
        case .notDetermined:
            manager.requestWhenInUseAuthorization()
        case .authorizedWhenInUse, .authorizedAlways:
            startLocating()
        case .denied, .restricted:
            authorizationDenied = true
        @unknown default:
            break
        }
    }

    private func startLocating() {
        gotInitialFix = false
        manager.startUpdatingLocation()
    }
}

// MARK: - CLLocationManagerDelegate

extension LocationService: CLLocationManagerDelegate {
    nonisolated func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else { return }
        Task { @MainActor [weak self] in
            guard let self else { return }
            self.currentLocation = location.coordinate
            if !self.gotInitialFix {
                self.gotInitialFix = true
                // Switch to significant-change monitoring for battery efficiency
                manager.stopUpdatingLocation()
                manager.startMonitoringSignificantLocationChanges()
            }
        }
    }

    nonisolated func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        let status = manager.authorizationStatus
        Task { @MainActor [weak self] in
            guard let self else { return }
            switch status {
            case .authorizedWhenInUse, .authorizedAlways:
                self.authorizationDenied = false
                self.startLocating()
            case .denied, .restricted:
                self.authorizationDenied = true
            default:
                break
            }
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        // Fallback handled by effectiveLocation computed property
    }
}
