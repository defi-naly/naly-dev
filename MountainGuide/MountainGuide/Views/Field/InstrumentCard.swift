import SwiftUI

// MARK: - Reusable Instrument Card

struct InstrumentCard<Content: View>: View {
    let title: String
    let icon: String
    let content: Content

    init(title: String, icon: String, @ViewBuilder content: () -> Content) {
        self.title = title
        self.icon = icon
        self.content = content()
    }

    var body: some View {
        VStack(spacing: 16) {
            HStack {
                Image(systemName: icon)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(Color.accent)
                Text(title.uppercased())
                    .font(.mono(11, weight: .bold))
                    .foregroundStyle(Color.textSecondary)
                Spacer()
            }

            content
        }
        .terminalCard()
    }
}

// MARK: - Large Reading Display

struct LargeReading: View {
    let value: String
    let unit: String
    let color: Color

    var body: some View {
        HStack(alignment: .firstTextBaseline, spacing: 4) {
            Text(value)
                .font(.system(size: 48, weight: .bold, design: .monospaced))
                .foregroundStyle(color)
            Text(unit)
                .font(.mono(16, weight: .medium))
                .foregroundStyle(Color.textSecondary)
        }
    }
}

// MARK: - Status Indicator

struct StatusIndicator: View {
    let label: String
    let value: String
    let color: Color

    var body: some View {
        HStack(spacing: 8) {
            Circle()
                .fill(color)
                .frame(width: 8, height: 8)
            Text(label)
                .font(.mono(11))
                .foregroundStyle(Color.textSecondary)
            Spacer()
            Text(value)
                .font(.mono(12, weight: .semibold))
                .foregroundStyle(Color.textPrimary)
        }
    }
}

// MARK: - Slope Zone Colors

extension Color {
    static let slopeGreen = Color(hex: "16A34A")
    static let slopeYellow = Color(hex: "CA8A04")
    static let slopeRed = Color(hex: "DC2626")
    static let slopeBlack = Color(hex: "1C1917")

    static let weatherSun = Color(hex: "F59E0B")
    static let weatherCloud = Color(hex: "9CA3AF")
    static let weatherRain = Color(hex: "3B82F6")
    static let weatherSnow = Color(hex: "E0E7FF")

    static let toolAccent = Color(hex: "1B5C85")

    static func slopeColor(for angle: Double) -> Color {
        if angle < 30 { return .slopeGreen }
        if angle < 35 { return .slopeYellow }
        if angle < 40 { return .slopeRed }
        return .slopeBlack
    }
}
