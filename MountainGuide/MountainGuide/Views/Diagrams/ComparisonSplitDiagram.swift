import SwiftUI

struct ComparisonSplitDiagram: View {
    let config: DiagramConfig
    let stepIndex: Int

    @State private var showLeft = false
    @State private var showRight = false

    var body: some View {
        GeometryReader { _ in
            HStack(spacing: 2) {
                leftPanel
                Rectangle()
                    .fill(Color.terminalBorder)
                    .frame(width: 2)
                rightPanel
            }
        }
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
                showLeft = true
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                showRight = true
            }
        }
    }

    private var leftColor: Color {
        Color(hex: config.leftColor ?? "3B82F6")
    }

    private var rightColor: Color {
        Color(hex: config.rightColor ?? "EF4444")
    }

    private var leftPanel: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text((config.leftTitle ?? "Before").uppercased())
                .font(.mono(11, weight: .bold))
                .foregroundStyle(leftColor)

            if let items = config.leftItems {
                ForEach(Array(items.enumerated()), id: \.offset) { index, item in
                    comparisonRow(item: item, color: leftColor, isShown: showLeft, offsetDir: -20.0, index: index)
                        .animation(.spring(response: 0.4).delay(Double(index) * 0.1), value: showLeft)
                }
            }
            Spacer()
        }
        .padding(12)
        .frame(maxWidth: .infinity)
        .background(leftColor.opacity(0.08))
        .cornerRadius(8)
    }

    private var rightPanel: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text((config.rightTitle ?? "After").uppercased())
                .font(.mono(11, weight: .bold))
                .foregroundStyle(rightColor)

            if let items = config.rightItems {
                ForEach(Array(items.enumerated()), id: \.offset) { index, item in
                    comparisonRow(item: item, color: rightColor, isShown: showRight, offsetDir: 20.0, index: index)
                        .animation(.spring(response: 0.4).delay(Double(index) * 0.1), value: showRight)
                }
            }
            Spacer()
        }
        .padding(12)
        .frame(maxWidth: .infinity)
        .background(rightColor.opacity(0.08))
        .cornerRadius(8)
    }

    private func comparisonRow(item: String, color: Color, isShown: Bool, offsetDir: CGFloat, index: Int) -> some View {
        let icon = Self.iconForKeyword(item)
        return HStack(spacing: 6) {
            Image(systemName: icon)
                .font(.system(size: 10))
                .foregroundStyle(color)
                .frame(width: 14, height: 14)
            Text(item)
                .font(.mono(10))
                .foregroundStyle(Color.textPrimary)
        }
        .opacity(isShown ? 1 : 0)
        .offset(x: isShown ? 0 : offsetDir)
    }

    static func iconForKeyword(_ text: String) -> String {
        let t = text.lowercased()
        if t.contains("wind") { return "wind" }
        if t.contains("snow") || t.contains("snowpack") { return "snowflake" }
        if t.contains("temperature") || t.contains("cold") || t.contains("warm") { return "thermometer.medium" }
        if t.contains("steep") || t.contains("slope") || t.contains("angle") { return "triangle" }
        if t.contains("danger") || t.contains("risk") || t.contains("hazard") { return "exclamationmark.triangle" }
        if t.contains("safe") || t.contains("stable") { return "checkmark.shield" }
        if t.contains("cloud") { return "cloud" }
        if t.contains("rain") { return "cloud.rain" }
        if t.contains("sun") || t.contains("solar") { return "sun.max" }
        if t.contains("terrain") || t.contains("mountain") { return "mountain.2" }
        if t.contains("tree") || t.contains("forest") { return "tree" }
        if t.contains("water") || t.contains("stream") { return "drop" }
        if t.contains("time") || t.contains("hour") || t.contains("duration") { return "clock" }
        if t.contains("speed") || t.contains("fast") || t.contains("velocity") { return "gauge.with.dots.needle.67percent" }
        if t.contains("pressure") { return "barometer" }
        if t.contains("altitude") || t.contains("height") || t.contains("elevation") { return "arrow.up" }
        if t.contains("visibility") || t.contains("see") { return "eye" }
        if t.contains("rope") || t.contains("anchor") { return "link" }
        if t.contains("compass") || t.contains("direction") { return "location.north" }
        if t.contains("map") { return "map" }
        return "circle.fill"
    }
}
