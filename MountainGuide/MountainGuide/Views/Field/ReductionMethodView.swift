import SwiftUI

// MARK: - Graphical Reduction Method Calculator

struct ReductionMethodView: View {
    @State private var dangerLevel: Double = 2.0     // 1.0 - 5.0 (continuous)
    @State private var slopeAngle: Double = 35
    @State private var selectedAspects: Set<String> = []
    @State private var isUnfavorable: Bool = true

    private let aspects = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

    // GRM danger reduction factors
    private var riskResult: GRMResult {
        calculateGRM()
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Result banner
                GRMResultBanner(result: riskResult)
                    .padding(.top, 8)

                // Danger level
                InstrumentCard(title: "Danger Level", icon: "exclamationmark.triangle.fill") {
                    VStack(spacing: 12) {
                        // Display the level with sub-level
                        HStack {
                            Text(dangerLevelLabel)
                                .font(.mono(24, weight: .bold))
                                .foregroundStyle(dangerLevelColor)
                            Spacer()
                            Text(dangerLevelName)
                                .font(.mono(14, weight: .semibold))
                                .foregroundStyle(Color.textSecondary)
                        }

                        // Interval slider (like White Risk — allows "low 2" / "high 2")
                        VStack(spacing: 4) {
                            Slider(value: $dangerLevel, in: 1...5, step: 0.5)
                                .tint(dangerLevelColor)

                            HStack {
                                ForEach(1...5, id: \.self) { level in
                                    Text("\(level)")
                                        .font(.mono(10, weight: .medium))
                                        .foregroundStyle(Color.textTertiary)
                                        .frame(maxWidth: .infinity)
                                }
                            }
                        }

                        Text("Set to match the current avalanche bulletin. Use half-steps for nuance (e.g., \"high 2\" = 2.5).")
                            .font(.mono(10))
                            .foregroundStyle(Color.textTertiary)
                    }
                }

                // Slope angle
                InstrumentCard(title: "Slope Angle", icon: "angle") {
                    VStack(spacing: 12) {
                        HStack(alignment: .firstTextBaseline) {
                            Text(String(format: "%.0f°", slopeAngle))
                                .font(.mono(28, weight: .bold))
                                .foregroundStyle(Color.slopeColor(for: slopeAngle))
                            Spacer()
                            Text(slopeZoneLabel)
                                .font(.mono(12, weight: .semibold))
                                .foregroundStyle(Color.slopeColor(for: slopeAngle))
                        }

                        Slider(value: $slopeAngle, in: 20...50, step: 1)
                            .tint(Color.slopeColor(for: slopeAngle))

                        HStack {
                            Text("20°").font(.mono(10)).foregroundStyle(Color.textTertiary)
                            Spacer()
                            Text("50°").font(.mono(10)).foregroundStyle(Color.textTertiary)
                        }
                    }
                }

                // Aspect selector
                InstrumentCard(title: "Slope Aspect", icon: "safari") {
                    VStack(spacing: 12) {
                        // Compass rose tap targets
                        AspectSelector(selected: $selectedAspects, aspects: aspects)

                        Text("Tap aspects mentioned in the avalanche bulletin as problematic. Multiple selections allowed.")
                            .font(.mono(10))
                            .foregroundStyle(Color.textTertiary)
                    }
                }

                // Conditions toggle
                InstrumentCard(title: "Conditions", icon: "cloud.sun") {
                    VStack(spacing: 12) {
                        Toggle(isOn: $isUnfavorable) {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Unfavorable conditions")
                                    .font(.mono(14, weight: .semibold))
                                    .foregroundStyle(Color.textPrimary)
                                Text("Recent wind loading, new snow, warming trend, or persistent weak layers")
                                    .font(.mono(10))
                                    .foregroundStyle(Color.textTertiary)
                            }
                        }
                        .tint(Color.danger)
                    }
                }

                // Reduction factors table
                InstrumentCard(title: "GRM Reduction Factors", icon: "tablecells") {
                    VStack(spacing: 8) {
                        GRMFactorRow(header: true, level: "Level", favorable: "Favorable", unfavorable: "Unfavorable")
                        Divider()
                        GRMFactorRow(level: "1 – Low", favorable: "< 50°", unfavorable: "< 50°")
                        GRMFactorRow(level: "2 – Moderate", favorable: "< 40°", unfavorable: "< 35°")
                        GRMFactorRow(level: "3 – Considerable", favorable: "< 35°", unfavorable: "< 30°")
                        GRMFactorRow(level: "4 – High", favorable: "< 35°", unfavorable: "Avoid!")
                        GRMFactorRow(level: "5 – Very High", favorable: "Avoid!", unfavorable: "Avoid!")

                        Divider()
                        Text("The Graphical Reduction Method (GRM) is a standard Swiss tool for avalanche risk assessment during tour planning.")
                            .font(.mono(10))
                            .foregroundStyle(Color.textTertiary)
                    }
                }
            }
            .padding()
        }
        .background(Color.terminalBg)
        .navigationTitle("Reduction Method")
        .navigationBarTitleDisplayMode(.inline)
    }

    // MARK: - Computed Properties

    private var dangerLevelLabel: String {
        let base = Int(dangerLevel)
        let fraction = dangerLevel - Double(base)
        if fraction < 0.25 { return "Low \(base)" }
        if fraction > 0.75 { return "High \(base)" }
        if fraction > 0.25 && fraction < 0.75 && dangerLevel != Double(base) {
            return "\(base)+"
        }
        return "\(base)"
    }

    private var dangerLevelName: String {
        let level = Int(dangerLevel.rounded())
        switch level {
        case 1: return "Low"
        case 2: return "Moderate"
        case 3: return "Considerable"
        case 4: return "High"
        case 5: return "Very High"
        default: return ""
        }
    }

    private var dangerLevelColor: Color {
        let level = Int(dangerLevel.rounded())
        switch level {
        case 1: return .slopeGreen
        case 2: return .slopeYellow
        case 3: return .warning
        case 4: return .danger
        case 5: return Color(hex: "7F1D1D")
        default: return .textSecondary
        }
    }

    private var slopeZoneLabel: String {
        if slopeAngle < 30 { return "Below threshold" }
        if slopeAngle < 35 { return "Avalanche terrain" }
        if slopeAngle < 40 { return "Prime release zone" }
        return "Extreme steep"
    }

    // MARK: - GRM Calculation

    private func calculateGRM() -> GRMResult {
        let level = Int(dangerLevel.rounded())
        let isHighEnd = dangerLevel > Double(level) - 0.25

        // Standard GRM threshold angles
        let thresholds: [(favorable: Double, unfavorable: Double)] = [
            (50, 50),   // Level 1
            (40, 35),   // Level 2
            (35, 30),   // Level 3
            (35, -1),   // Level 4 (-1 = avoid)
            (-1, -1),   // Level 5 (-1 = avoid)
        ]

        let idx = min(max(level - 1, 0), 4)
        let threshold = isUnfavorable ? thresholds[idx].unfavorable : thresholds[idx].favorable

        // If high-end of level, tighten by 2.5°
        let adjustedThreshold = isHighEnd ? threshold - 2.5 : threshold

        if threshold < 0 {
            return GRMResult(risk: .unacceptable, message: "Avoid all avalanche terrain at this danger level", threshold: nil)
        }

        if slopeAngle >= adjustedThreshold {
            if slopeAngle < adjustedThreshold + 3 {
                return GRMResult(risk: .borderline, message: "Slope angle near the limit — extra caution required", threshold: adjustedThreshold)
            }
            return GRMResult(risk: .unacceptable, message: "Slope exceeds safe threshold for current conditions", threshold: adjustedThreshold)
        }

        return GRMResult(risk: .acceptable, message: "Within acceptable risk according to GRM", threshold: adjustedThreshold)
    }
}

// MARK: - GRM Result

struct GRMResult {
    enum Risk: String {
        case acceptable = "ACCEPTABLE"
        case borderline = "BORDERLINE"
        case unacceptable = "STOP"
    }

    let risk: Risk
    let message: String
    let threshold: Double?

    var color: Color {
        switch risk {
        case .acceptable: return .emerald
        case .borderline: return .warning
        case .unacceptable: return .danger
        }
    }

    var icon: String {
        switch risk {
        case .acceptable: return "checkmark.circle.fill"
        case .borderline: return "exclamationmark.triangle.fill"
        case .unacceptable: return "xmark.octagon.fill"
        }
    }
}

// MARK: - Result Banner

struct GRMResultBanner: View {
    let result: GRMResult

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: result.icon)
                .font(.system(size: 36))
                .foregroundStyle(result.color)

            Text(result.risk.rawValue)
                .font(.mono(20, weight: .bold))
                .foregroundStyle(result.color)

            Text(result.message)
                .font(.mono(12))
                .foregroundStyle(Color.textSecondary)
                .multilineTextAlignment(.center)

            if let threshold = result.threshold {
                Text("Threshold: \(String(format: "%.0f°", threshold))")
                    .font(.mono(11, weight: .semibold))
                    .foregroundStyle(Color.textTertiary)
            }
        }
        .padding(20)
        .frame(maxWidth: .infinity)
        .background(result.color.opacity(0.08))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(result.color.opacity(0.3), lineWidth: 1)
        )
    }
}

// MARK: - Aspect Selector (Compass Rose)

struct AspectSelector: View {
    @Binding var selected: Set<String>
    let aspects: [String]

    var body: some View {
        ZStack {
            // Background circle
            Circle()
                .stroke(Color.lightBorder, lineWidth: 1)
                .frame(width: 180, height: 180)

            // Aspect buttons
            ForEach(Array(aspects.enumerated()), id: \.element) { index, aspect in
                let rad = Angle.degrees(Double(index) * 45 - 90).radians
                let radius: Double = 75

                Button {
                    if selected.contains(aspect) {
                        selected.remove(aspect)
                    } else {
                        selected.insert(aspect)
                    }
                } label: {
                    Text(aspect)
                        .font(.mono(12, weight: selected.contains(aspect) ? .bold : .medium))
                        .foregroundStyle(selected.contains(aspect) ? .white : Color.textSecondary)
                        .frame(width: 36, height: 36)
                        .background(selected.contains(aspect) ? Color.danger : Color.lightSurface)
                        .cornerRadius(18)
                        .shadow(color: .black.opacity(0.06), radius: 2, x: 0, y: 1)
                }
                .offset(
                    x: radius * cos(rad),
                    y: radius * sin(rad)
                )
            }
        }
        .frame(height: 200)
    }
}

// MARK: - GRM Factor Row

struct GRMFactorRow: View {
    var header: Bool = false
    let level: String
    let favorable: String
    let unfavorable: String

    var body: some View {
        HStack {
            Text(level)
                .font(.mono(header ? 10 : 11, weight: header ? .bold : .medium))
                .foregroundStyle(header ? Color.textTertiary : Color.textPrimary)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text(favorable)
                .font(.mono(header ? 10 : 11, weight: header ? .bold : .semibold))
                .foregroundStyle(header ? Color.textTertiary : Color.emerald)
                .frame(width: 70, alignment: .center)
            Text(unfavorable)
                .font(.mono(header ? 10 : 11, weight: header ? .bold : .semibold))
                .foregroundStyle(header ? Color.textTertiary : Color.danger)
                .frame(width: 80, alignment: .center)
        }
    }
}
