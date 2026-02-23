import SwiftUI
import CoreMotion

// MARK: - Inclinometer View

struct InclinometerView: View {
    @StateObject private var motion = InclinometerManager()
    @State private var isLocked = false
    @State private var lockedAngle: Double = 0

    private var displayAngle: Double {
        isLocked ? lockedAngle : motion.slopeAngle
    }

    private var zoneColor: Color {
        .slopeColor(for: displayAngle)
    }

    private var zoneLabel: String {
        if displayAngle < 30 { return "LOW RISK" }
        if displayAngle < 35 { return "MODERATE" }
        if displayAngle < 40 { return "HIGH RISK" }
        return "EXTREME"
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Main gauge
                ZStack {
                    // Background arc
                    SlopeGaugeArc(zones: true)
                        .frame(width: 260, height: 160)

                    // Needle
                    SlopeNeedle(angle: displayAngle)
                        .frame(width: 260, height: 160)

                    // Reading
                    VStack(spacing: 4) {
                        Text(String(format: "%.1f", displayAngle))
                            .font(.system(size: 56, weight: .bold, design: .monospaced))
                            .foregroundStyle(zoneColor)
                            .contentTransition(.numericText())
                        Text("DEGREES")
                            .font(.mono(11, weight: .bold))
                            .foregroundStyle(Color.textSecondary)
                    }
                    .offset(y: 30)
                }
                .padding(.top, 20)

                // Zone indicator
                HStack(spacing: 8) {
                    Circle()
                        .fill(zoneColor)
                        .frame(width: 10, height: 10)
                    Text(zoneLabel)
                        .font(.mono(13, weight: .bold))
                        .foregroundStyle(zoneColor)
                }

                // Lock / Reset buttons
                HStack(spacing: 16) {
                    Button {
                        if isLocked {
                            isLocked = false
                        } else {
                            lockedAngle = motion.slopeAngle
                            isLocked = true
                            UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                        }
                    } label: {
                        HStack(spacing: 8) {
                            Image(systemName: isLocked ? "lock.fill" : "lock.open")
                            Text(isLocked ? "Unlock" : "Lock Reading")
                                .font(.mono(14, weight: .semibold))
                        }
                        .foregroundStyle(isLocked ? .white : Color.accent)
                        .padding(.horizontal, 20)
                        .padding(.vertical, 12)
                        .background(isLocked ? Color.accent : Color.accentSoft)
                        .cornerRadius(10)
                    }

                    Button {
                        motion.calibrate()
                        UIImpactFeedbackGenerator(style: .light).impactOccurred()
                    } label: {
                        HStack(spacing: 8) {
                            Image(systemName: "arrow.counterclockwise")
                            Text("Calibrate")
                                .font(.mono(14, weight: .semibold))
                        }
                        .foregroundStyle(Color.accent)
                        .padding(.horizontal, 20)
                        .padding(.vertical, 12)
                        .background(Color.accentSoft)
                        .cornerRadius(10)
                    }
                }

                // Zone reference
                InstrumentCard(title: "Slope Zones", icon: "chart.bar.fill") {
                    VStack(spacing: 8) {
                        SlopeZoneRow(range: "< 30°", label: "Generally safe terrain", color: .slopeGreen)
                        SlopeZoneRow(range: "30–35°", label: "Primary avalanche terrain", color: .slopeYellow)
                        SlopeZoneRow(range: "35–40°", label: "Most frequent avalanche release", color: .slopeRed)
                        SlopeZoneRow(range: "> 40°", label: "Extreme steep terrain", color: .slopeBlack)
                    }
                }

                // Educational note
                HStack(alignment: .top, spacing: 12) {
                    Image(systemName: "info.circle.fill")
                        .foregroundStyle(Color.accent)
                        .font(.system(size: 16))
                    Text("Slopes above 30° are considered primary avalanche terrain. Most slab avalanches release on slopes between 35° and 45°.")
                        .font(.mono(12))
                        .foregroundStyle(Color.textSecondary)
                }
                .padding(16)
                .background(Color.accentSoft)
                .cornerRadius(12)

                if !motion.isAvailable {
                    HStack(spacing: 8) {
                        Image(systemName: "exclamationmark.triangle")
                            .foregroundStyle(Color.warning)
                        Text("Motion sensors unavailable on this device")
                            .font(.mono(12))
                            .foregroundStyle(Color.textSecondary)
                    }
                    .padding()
                }
            }
            .padding()
        }
        .background(Color.terminalBg)
        .navigationTitle("Inclinometer")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Slope Zone Row

struct SlopeZoneRow: View {
    let range: String
    let label: String
    let color: Color

    var body: some View {
        HStack(spacing: 12) {
            RoundedRectangle(cornerRadius: 3)
                .fill(color)
                .frame(width: 4, height: 24)
            Text(range)
                .font(.mono(13, weight: .bold))
                .foregroundStyle(Color.textPrimary)
                .frame(width: 60, alignment: .leading)
            Text(label)
                .font(.mono(12))
                .foregroundStyle(Color.textSecondary)
            Spacer()
        }
    }
}

// MARK: - Gauge Arc

struct SlopeGaugeArc: View {
    let zones: Bool

    var body: some View {
        Canvas { context, size in
            let center = CGPoint(x: size.width / 2, y: size.height)
            let radius = min(size.width, size.height * 2) / 2 - 20

            // Draw zone arcs (0-90 degrees mapped to 180-0 on the arc)
            let zoneRanges: [(ClosedRange<Double>, Color)] = [
                (0...30, .slopeGreen),
                (30...35, .slopeYellow),
                (35...40, .slopeRed),
                (40...90, Color(hex: "1C1917").opacity(0.3)),
            ]

            for (range, color) in zoneRanges {
                let startAngle = Angle.degrees(180 - range.lowerBound * 2)
                let endAngle = Angle.degrees(180 - range.upperBound * 2)

                var path = Path()
                path.addArc(center: center, radius: radius, startAngle: startAngle, endAngle: endAngle, clockwise: true)

                context.stroke(path, with: .color(color), style: StrokeStyle(lineWidth: 12, lineCap: .butt))
            }

            // Tick marks every 10 degrees
            for tick in stride(from: 0, through: 90, by: 10) {
                let rad = Angle.degrees(180 - Double(tick) * 2).radians
                let innerRadius = radius - 20
                let outerRadius = radius + 8

                let inner = CGPoint(
                    x: center.x + innerRadius * cos(rad),
                    y: center.y + innerRadius * sin(rad)
                )
                let outer = CGPoint(
                    x: center.x + outerRadius * cos(rad),
                    y: center.y + outerRadius * sin(rad)
                )

                var tickPath = Path()
                tickPath.move(to: inner)
                tickPath.addLine(to: outer)
                context.stroke(tickPath, with: .color(Color.textTertiary), style: StrokeStyle(lineWidth: 1.5))

                // Label
                let labelPos = CGPoint(
                    x: center.x + (radius + 18) * cos(rad),
                    y: center.y + (radius + 18) * sin(rad)
                )
                context.draw(
                    Text("\(tick)°").font(.mono(9, weight: .medium)).foregroundStyle(Color.textTertiary),
                    at: labelPos
                )
            }
        }
    }
}

// MARK: - Needle

struct SlopeNeedle: View {
    let angle: Double

    var body: some View {
        Canvas { context, size in
            let center = CGPoint(x: size.width / 2, y: size.height)
            let radius = min(size.width, size.height * 2) / 2 - 35
            let rad = Angle.degrees(180 - angle * 2).radians

            let tip = CGPoint(
                x: center.x + radius * cos(rad),
                y: center.y + radius * sin(rad)
            )

            // Needle line
            var path = Path()
            path.move(to: center)
            path.addLine(to: tip)
            context.stroke(path, with: .color(Color.slopeColor(for: angle)), style: StrokeStyle(lineWidth: 3, lineCap: .round))

            // Center dot
            let dotRect = CGRect(x: center.x - 6, y: center.y - 6, width: 12, height: 12)
            context.fill(Path(ellipseIn: dotRect), with: .color(Color.textPrimary))
        }
        .animation(.easeOut(duration: 0.15), value: angle)
    }
}

// MARK: - CoreMotion Manager

class InclinometerManager: ObservableObject {
    @Published var slopeAngle: Double = 0
    @Published var isAvailable: Bool = true

    private let motionManager = CMMotionManager()
    private var calibrationOffset: Double = 0
    private var lastZone: Int = 0

    init() {
        startUpdates()
    }

    deinit {
        motionManager.stopDeviceMotionUpdates()
    }

    func startUpdates() {
        guard motionManager.isDeviceMotionAvailable else {
            isAvailable = false
            return
        }

        motionManager.deviceMotionUpdateInterval = 1.0 / 30.0
        motionManager.startDeviceMotionUpdates(to: .main) { [weak self] motion, error in
            guard let self, let motion, error == nil else { return }

            let pitch = motion.attitude.pitch * 180 / .pi
            let rawAngle = max(0, min(90, abs(pitch) - self.calibrationOffset))

            // Smooth the reading
            self.slopeAngle = self.slopeAngle * 0.7 + rawAngle * 0.3

            // Haptic on zone boundary crossing
            let newZone = self.zoneIndex(for: self.slopeAngle)
            if newZone != self.lastZone {
                UIImpactFeedbackGenerator(style: .rigid).impactOccurred()
                self.lastZone = newZone
            }
        }
    }

    func calibrate() {
        if let motion = motionManager.deviceMotion {
            calibrationOffset = abs(motion.attitude.pitch * 180 / .pi)
        }
    }

    private func zoneIndex(for angle: Double) -> Int {
        if angle < 30 { return 0 }
        if angle < 35 { return 1 }
        if angle < 40 { return 2 }
        return 3
    }
}
