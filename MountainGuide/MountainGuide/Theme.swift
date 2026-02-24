import SwiftUI

// MARK: - Light Theme Design System (White Risk inspired)

extension Color {
    // Backgrounds
    static let lightBg = Color(hex: "F5F5F7")
    static let lightSurface = Color(hex: "FFFFFF")
    static let lightBorder = Color(hex: "E5E7EB")

    // Legacy aliases (map to new colors)
    static let terminalBg = Color.lightBg
    static let terminalSurface = Color.lightSurface
    static let terminalBorder = Color.lightBorder

    // Primary accent (institutional blue)
    static let accent = Color(hex: "1B5C85")
    static let accentLight = Color(hex: "3B7FA5")
    static let accentSoft = Color(hex: "DBEAFE")

    // Legacy accent aliases
    static let amber = Color.accent
    static let amberLight = Color.accentLight

    // Semantic
    static let emerald = Color(hex: "059669")
    static let danger = Color(hex: "DC2626")
    static let warning = Color(hex: "D97706")

    // Text
    static let textPrimary = Color(hex: "111827")
    static let textSecondary = Color(hex: "6B7280")
    static let textTertiary = Color(hex: "9CA3AF")

    // Legacy text aliases
    static let textMuted = Color.textSecondary
    static let textDim = Color.textTertiary

    // Domain accents (adjusted for light backgrounds)
    static let weatherAccent = Color(hex: "2563EB")
    static let avalancheAccent = Color(hex: "DC2626")
    static let flyingAccent = Color(hex: "EA580C")
    static let navigationAccent = Color(hex: "7C3AED")
    static let ropeSystemsAccent = Color(hex: "B45309")
    static let glacierTravelAccent = Color(hex: "0891B2")
    static let firstAidAccent = Color(hex: "BE123C")

    // Medal colors (darkened for light bg)
    static let medalBronze = Color(hex: "92400E")
    static let medalSilver = Color(hex: "6B7280")
    static let medalGold = Color(hex: "B45309")

    // Diagram palette (keep saturated)
    static let diagramBlue = Color(hex: "3B82F6")
    static let diagramCyan = Color(hex: "06B6D4")
    static let diagramPurple = Color(hex: "8B5CF6")
    static let diagramPink = Color(hex: "EC4899")
    static let diagramOrange = Color(hex: "F97316")
    static let diagramTeal = Color(hex: "14B8A6")
    static let diagramRed = Color(hex: "EF4444")
    static let diagramGreen = Color(hex: "22C55E")
    static let diagramYellow = Color(hex: "EAB308")

    // XP accent
    static let xpGlow = Color(hex: "D97706")

    // XP axis colors
    static let preparationXPColor = Color(hex: "3B82F6")  // Blue
    static let prowessXPColor = Color(hex: "F59E0B")      // Amber
    static let safetyXPColor = Color(hex: "22C55E")       // Green

    // European Avalanche Danger Scale
    static let dangerLow = Color(hex: "4CAF50")
    static let dangerModerate = Color(hex: "FFC107")
    static let dangerConsiderable = Color(hex: "FF9800")
    static let dangerHigh = Color(hex: "F44336")
    static let dangerVeryHigh = Color(hex: "880E4F")
    static let dangerNoRating = Color(hex: "9CA3AF")

    static func dangerColor(for level: Int) -> Color {
        switch level {
        case 1: return .dangerLow
        case 2: return .dangerModerate
        case 3: return .dangerConsiderable
        case 4: return .dangerHigh
        case 5: return .dangerVeryHigh
        default: return .dangerNoRating
        }
    }

    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r, g, b: UInt64
        (r, g, b) = ((int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: 1
        )
    }
}

// MARK: - Typography

extension Font {
    static func mono(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
        .system(size: size, weight: weight, design: .monospaced)
    }

    static func body(_ size: CGFloat = 14, weight: Font.Weight = .regular) -> Font {
        .system(size: size, weight: weight)
    }

    static func heading(_ size: CGFloat, weight: Font.Weight = .semibold) -> Font {
        .system(size: size, weight: weight)
    }
}

// MARK: - Card Style Modifier (shadow-based for light theme)

struct CardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(16)
            .background(Color.lightSurface)
            .cornerRadius(12)
            .shadow(color: .black.opacity(0.04), radius: 2, x: 0, y: 1)
            .shadow(color: .black.opacity(0.06), radius: 8, x: 0, y: 4)
    }
}

extension View {
    func card() -> some View {
        modifier(CardModifier())
    }

    func terminalCard() -> some View {
        modifier(CardModifier())
    }
}
