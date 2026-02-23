import SwiftUI
import CoreMotion
import CoreLocation

// MARK: - Altimeter View

struct AltimeterView: View {
    @StateObject private var altimeter = AltimeterManager()

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Main altitude display
                VStack(spacing: 8) {
                    Image(systemName: "mountain.2.fill")
                        .font(.system(size: 28))
                        .foregroundStyle(Color.emerald)

                    if let gpsAlt = altimeter.gpsAltitude {
                        LargeReading(
                            value: String(format: "%.0f", gpsAlt),
                            unit: "m",
                            color: .textPrimary
                        )
                        Text("GPS ALTITUDE")
                            .font(.mono(11, weight: .bold))
                            .foregroundStyle(Color.textSecondary)
                    } else {
                        LargeReading(value: "--", unit: "m", color: .textTertiary)
                        Text("ACQUIRING GPS...")
                            .font(.mono(11, weight: .bold))
                            .foregroundStyle(Color.textTertiary)
                    }
                }
                .padding(.top, 16)

                // Relative altitude change
                InstrumentCard(title: "Relative Altitude", icon: "arrow.up.arrow.down") {
                    VStack(spacing: 12) {
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("Change since start")
                                    .font(.mono(12))
                                    .foregroundStyle(Color.textSecondary)
                                HStack(alignment: .firstTextBaseline, spacing: 2) {
                                    Text(String(format: "%+.1f", altimeter.relativeAltitude))
                                        .font(.mono(28, weight: .bold))
                                        .foregroundStyle(altimeter.relativeAltitude >= 0 ? Color.emerald : Color.danger)
                                    Text("m")
                                        .font(.mono(14))
                                        .foregroundStyle(Color.textSecondary)
                                }
                            }
                            Spacer()
                            Image(systemName: altimeter.relativeAltitude >= 0 ? "arrow.up.circle.fill" : "arrow.down.circle.fill")
                                .font(.system(size: 32))
                                .foregroundStyle(altimeter.relativeAltitude >= 0 ? Color.emerald : Color.danger)
                        }

                        if !altimeter.isBarometerAvailable {
                            Text("Barometer not available — relative altitude unavailable")
                                .font(.mono(10))
                                .foregroundStyle(Color.warning)
                        }
                    }
                }

                // Barometric pressure
                InstrumentCard(title: "Barometric Pressure", icon: "barometer") {
                    VStack(spacing: 12) {
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                HStack(alignment: .firstTextBaseline, spacing: 2) {
                                    Text(String(format: "%.1f", altimeter.pressure))
                                        .font(.mono(28, weight: .bold))
                                        .foregroundStyle(Color.textPrimary)
                                    Text("hPa")
                                        .font(.mono(14))
                                        .foregroundStyle(Color.textSecondary)
                                }
                            }
                            Spacer()
                            VStack(alignment: .trailing, spacing: 4) {
                                Image(systemName: altimeter.pressureTrend.icon)
                                    .font(.system(size: 20, weight: .semibold))
                                    .foregroundStyle(trendColor)
                                Text(altimeter.pressureTrend.rawValue)
                                    .font(.mono(11, weight: .semibold))
                                    .foregroundStyle(trendColor)
                            }
                        }

                        Text(altimeter.pressureTrend.weatherImplication)
                            .font(.mono(11))
                            .foregroundStyle(Color.textSecondary)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }

                // Pressure reference guide
                InstrumentCard(title: "Pressure Reference", icon: "info.circle") {
                    VStack(spacing: 8) {
                        PressureRefRow(label: "Standard atmosphere", value: "1013.25 hPa")
                        PressureRefRow(label: "High pressure", value: "> 1020 hPa")
                        PressureRefRow(label: "Low pressure", value: "< 1000 hPa")
                        Divider()
                        Text("Pressure drops ~12 hPa per 100m of altitude gain. A falling barometer often precedes worsening weather.")
                            .font(.mono(10))
                            .foregroundStyle(Color.textTertiary)
                    }
                }

                if !altimeter.isBarometerAvailable {
                    HStack(spacing: 8) {
                        Image(systemName: "exclamationmark.triangle")
                            .foregroundStyle(Color.warning)
                        Text("Barometric altimeter unavailable on this device")
                            .font(.mono(12))
                            .foregroundStyle(Color.textSecondary)
                    }
                    .padding()
                }
            }
            .padding()
        }
        .background(Color.terminalBg)
        .navigationTitle("Altimeter")
        .navigationBarTitleDisplayMode(.inline)
    }

    private var trendColor: Color {
        switch altimeter.pressureTrend {
        case .rising: return .emerald
        case .stable: return .textSecondary
        case .falling: return .warning
        }
    }
}

// MARK: - Pressure Reference Row

struct PressureRefRow: View {
    let label: String
    let value: String

    var body: some View {
        HStack {
            Text(label)
                .font(.mono(11))
                .foregroundStyle(Color.textSecondary)
            Spacer()
            Text(value)
                .font(.mono(11, weight: .semibold))
                .foregroundStyle(Color.textPrimary)
        }
    }
}

// MARK: - Altimeter Manager

class AltimeterManager: NSObject, ObservableObject, CLLocationManagerDelegate {
    @Published var relativeAltitude: Double = 0
    @Published var pressure: Double = 1013.25  // Standard atmosphere default
    @Published var pressureTrend: PressureTrend = .stable
    @Published var gpsAltitude: Double?
    @Published var isBarometerAvailable: Bool = true

    private let altimeter = CMAltimeter()
    private let locationManager = CLLocationManager()
    private var pressureHistory: [Double] = []

    override init() {
        super.init()

        // GPS altitude
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()

        // Barometric altimeter
        guard CMAltimeter.isRelativeAltitudeAvailable() else {
            isBarometerAvailable = false
            return
        }

        altimeter.startRelativeAltitudeUpdates(to: .main) { [weak self] data, error in
            guard let self, let data, error == nil else { return }

            self.relativeAltitude = data.relativeAltitude.doubleValue
            self.pressure = data.pressure.doubleValue * 10 // kPa to hPa

            // Track pressure trend
            self.pressureHistory.append(self.pressure)
            if self.pressureHistory.count > 30 { // ~30 samples
                self.pressureHistory.removeFirst()
            }
            self.updatePressureTrend()
        }
    }

    deinit {
        altimeter.stopRelativeAltitudeUpdates()
        locationManager.stopUpdatingLocation()
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.last {
            gpsAltitude = location.altitude
        }
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        // GPS may not be available
    }

    private func updatePressureTrend() {
        guard pressureHistory.count >= 10 else { return }
        let recent = pressureHistory.suffix(5).reduce(0, +) / 5
        let earlier = pressureHistory.prefix(5).reduce(0, +) / 5
        let delta = recent - earlier

        if delta > 0.3 {
            pressureTrend = .rising
        } else if delta < -0.3 {
            pressureTrend = .falling
        } else {
            pressureTrend = .stable
        }
    }
}
