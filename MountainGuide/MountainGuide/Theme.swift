import SwiftUI

// MARK: - Bloomberg Terminal Design System

extension Color {
    // Backgrounds
    static let terminalBg = Color(hex: "0a0a0a")
    static let terminalSurface = Color(hex: "111111")
    static let terminalBorder = Color(hex: "262626")

    // Accents
    static let amber = Color(hex: "F59E0B")
    static let amberLight = Color(hex: "FCD34D")
    static let emerald = Color(hex: "22C55E")
    static let danger = Color(hex: "EF4444")

    // Text
    static let textPrimary = Color(hex: "F9FAFB")
    static let textMuted = Color(hex: "9CA3AF")
    static let textDim = Color(hex: "6B7280")

    // Domain accents
    static let weatherAccent = Color(hex: "7BA7CC")
    static let avalancheAccent = Color.white
    static let flyingAccent = Color(hex: "E8A87C")
    static let navigationAccent = Color(hex: "8B5CF6")
    static let ropeSystemsAccent = Color(hex: "F97316")
    static let glacierTravelAccent = Color(hex: "06B6D4")
    static let firstAidAccent = Color(hex: "EF4444")

    // Medal colors
    static let medalBronze = Color(hex: "CD7F32")
    static let medalSilver = Color(hex: "C0C0C0")
    static let medalGold = Color(hex: "FFD700")

    // Diagram palette
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
    static let xpGlow = Color(hex: "F59E0B")

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

extension Font {
    static func mono(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
        .system(size: size, weight: weight, design: .monospaced)
    }
}

// MARK: - Card Style Modifier

struct TerminalCard: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(16)
            .background(Color.terminalSurface)
            .cornerRadius(12)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.terminalBorder, lineWidth: 1)
            )
    }
}

extension View {
    func terminalCard() -> some View {
        modifier(TerminalCard())
    }
}
