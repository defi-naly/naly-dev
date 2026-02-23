import SwiftUI
import CoreLocation

// MARK: - Compass View

struct CompassView: View {
    @StateObject private var heading = CompassManager()

    private var cardinalDirection: String {
        let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        let index = Int((heading.magneticHeading + 22.5) / 45.0) % 8
        return directions[index]
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Compass rose
                ZStack {
                    // Rotating compass
                    CompassRose(heading: heading.magneticHeading)
                        .frame(width: 280, height: 280)

                    // Fixed north indicator triangle at top
                    VStack {
                        Image(systemName: "triangle.fill")
                            .font(.system(size: 14))
                            .foregroundStyle(Color.accent)
                        Spacer()
                    }
                    .frame(height: 280)
                }
                .padding(.top, 12)

                // Heading display
                VStack(spacing: 4) {
                    Text(String(format: "%.0f°", heading.magneticHeading))
                        .font(.system(size: 48, weight: .bold, design: .monospaced))
                        .foregroundStyle(Color.textPrimary)
                        .contentTransition(.numericText())
                    Text(cardinalDirection)
                        .font(.mono(20, weight: .bold))
                        .foregroundStyle(Color.accent)
                }

                // Details
                InstrumentCard(title: "Heading Details", icon: "safari") {
                    VStack(spacing: 10) {
                        StatusIndicator(
                            label: "Magnetic",
                            value: String(format: "%.1f°", heading.magneticHeading),
                            color: .accent
                        )
                        StatusIndicator(
                            label: "True",
                            value: String(format: "%.1f°", heading.trueHeading),
                            color: .emerald
                        )
                        StatusIndicator(
                            label: "Declination",
                            value: String(format: "%.1f°", heading.declination),
                            color: .warning
                        )
                        StatusIndicator(
                            label: "Accuracy",
                            value: heading.accuracyDescription,
                            color: heading.accuracyColor
                        )
                    }
                }

                // Aspect assessment
                InstrumentCard(title: "Slope Aspect", icon: "mountain.2") {
                    VStack(spacing: 8) {
                        Text("Point device downhill to measure slope aspect")
                            .font(.mono(12))
                            .foregroundStyle(Color.textSecondary)
                            .multilineTextAlignment(.center)

                        HStack(spacing: 16) {
                            AspectChip(label: "N", active: cardinalDirection == "N", dangerous: true)
                            AspectChip(label: "NE", active: cardinalDirection == "NE", dangerous: true)
                            AspectChip(label: "E", active: cardinalDirection == "E", dangerous: true)
                            AspectChip(label: "SE", active: cardinalDirection == "SE", dangerous: false)
                            AspectChip(label: "S", active: cardinalDirection == "S", dangerous: false)
                            AspectChip(label: "SW", active: cardinalDirection == "SW", dangerous: false)
                            AspectChip(label: "W", active: cardinalDirection == "W", dangerous: true)
                            AspectChip(label: "NW", active: cardinalDirection == "NW", dangerous: true)
                        }

                        Text("N-NE-E-W-NW aspects are typically more avalanche-prone (leeward loading, slower stabilization)")
                            .font(.mono(10))
                            .foregroundStyle(Color.textTertiary)
                            .multilineTextAlignment(.center)
                            .padding(.top, 4)
                    }
                }

                if !heading.isAvailable {
                    HStack(spacing: 8) {
                        Image(systemName: "exclamationmark.triangle")
                            .foregroundStyle(Color.warning)
                        Text("Compass unavailable on this device")
                            .font(.mono(12))
                            .foregroundStyle(Color.textSecondary)
                    }
                    .padding()
                }
            }
            .padding()
        }
        .background(Color.terminalBg)
        .navigationTitle("Compass")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Aspect Chip

struct AspectChip: View {
    let label: String
    let active: Bool
    let dangerous: Bool

    var body: some View {
        Text(label)
            .font(.mono(10, weight: active ? .bold : .medium))
            .foregroundStyle(active ? .white : (dangerous ? Color.danger : Color.textSecondary))
            .frame(width: 28, height: 28)
            .background(active ? Color.accent : (dangerous ? Color.danger.opacity(0.1) : Color.lightBorder))
            .cornerRadius(6)
    }
}

// MARK: - Compass Rose (Canvas)

struct CompassRose: View {
    let heading: Double

    var body: some View {
        Canvas { context, size in
            let center = CGPoint(x: size.width / 2, y: size.height / 2)
            let radius: Double = Double(min(size.width, size.height)) / 2 - 10

            // Outer ring
            var outerCircle = Path()
            outerCircle.addEllipse(in: CGRect(x: center.x - radius, y: center.y - radius, width: radius * 2, height: radius * 2))
            context.stroke(outerCircle, with: .color(Color.lightBorder), lineWidth: 2)

            // Degree ticks
            for deg in stride(from: 0, to: 360, by: 5) {
                let isMajor = deg % 30 == 0
                let isCardinal = deg % 90 == 0
                let tickLength: Double = isCardinal ? 16 : (isMajor ? 10 : 5)
                let rad = Angle.degrees(Double(deg) - heading - 90).radians

                let outer = CGPoint(
                    x: center.x + radius * cos(rad),
                    y: center.y + radius * sin(rad)
                )
                let inner = CGPoint(
                    x: center.x + (radius - tickLength) * cos(rad),
                    y: center.y + (radius - tickLength) * sin(rad)
                )

                var tick = Path()
                tick.move(to: outer)
                tick.addLine(to: inner)
                context.stroke(tick, with: .color(isCardinal ? Color.textPrimary : Color.textTertiary), lineWidth: isCardinal ? 2 : 1)
            }

            // Cardinal labels
            let cardinals: [(String, Double, Color)] = [
                ("N", 0, .danger),
                ("E", 90, .textPrimary),
                ("S", 180, .textPrimary),
                ("W", 270, .textPrimary),
            ]

            for (label, deg, color) in cardinals {
                let rad = Angle.degrees(deg - heading - 90).radians
                let labelRadius = radius - 30
                let pos = CGPoint(
                    x: center.x + labelRadius * cos(rad),
                    y: center.y + labelRadius * sin(rad)
                )
                context.draw(
                    Text(label).font(.mono(18, weight: .bold)).foregroundStyle(color),
                    at: pos
                )
            }

            // Inner circle
            var innerCircle = Path()
            let innerRadius = radius - 45
            innerCircle.addEllipse(in: CGRect(x: center.x - innerRadius, y: center.y - innerRadius, width: innerRadius * 2, height: innerRadius * 2))
            context.stroke(innerCircle, with: .color(Color.lightBorder.opacity(0.5)), lineWidth: 1)

            // Cross hairs
            for angle in [Angle.degrees(0), .degrees(90)] {
                let rad = angle.radians
                var line = Path()
                line.move(to: CGPoint(
                    x: center.x + 20 * cos(rad),
                    y: center.y + 20 * sin(rad)
                ))
                line.addLine(to: CGPoint(
                    x: center.x - 20 * cos(rad),
                    y: center.y - 20 * sin(rad)
                ))
                context.stroke(line, with: .color(Color.lightBorder), lineWidth: 1)
            }
        }
    }
}

// MARK: - CLLocationManager Wrapper

class CompassManager: NSObject, ObservableObject, CLLocationManagerDelegate {
    @Published var magneticHeading: Double = 0
    @Published var trueHeading: Double = 0
    @Published var declination: Double = 0
    @Published var accuracy: CLLocationDirection = -1
    @Published var isAvailable: Bool = true

    private let locationManager = CLLocationManager()

    var accuracyDescription: String {
        if accuracy < 0 { return "Calibrating..." }
        if accuracy <= 5 { return "High" }
        if accuracy <= 15 { return "Medium" }
        return "Low"
    }

    var accuracyColor: Color {
        if accuracy < 0 { return .warning }
        if accuracy <= 5 { return .emerald }
        if accuracy <= 15 { return .slopeYellow }
        return .danger
    }

    override init() {
        super.init()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest

        guard CLLocationManager.headingAvailable() else {
            isAvailable = false
            return
        }

        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingHeading()
        locationManager.startUpdatingLocation() // For declination calculation
    }

    deinit {
        locationManager.stopUpdatingHeading()
        locationManager.stopUpdatingLocation()
    }

    func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
        magneticHeading = newHeading.magneticHeading
        trueHeading = newHeading.trueHeading
        accuracy = newHeading.headingAccuracy

        if newHeading.trueHeading >= 0 {
            declination = newHeading.trueHeading - newHeading.magneticHeading
        }
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        // Silently handle — compass may still work without location
    }
}
