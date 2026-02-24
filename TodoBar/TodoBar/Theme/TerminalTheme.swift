import SwiftUI

// MARK: - Colors

extension Color {
    static let terminalBg = Color(hex: "0a0a0a")
    static let terminalSurface = Color(hex: "111111")
    static let terminalBorder = Color(hex: "262626")
    static let terminalText = Color(hex: "e5e5e5")
    static let terminalMuted = Color(hex: "737373")
    static let terminalAccent = Color(hex: "f59e0b")  // amber
    static let terminalSuccess = Color(hex: "22c55e") // green
    static let terminalError = Color(hex: "ef4444")   // red

    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Fonts

extension Font {
    static let terminalTitle = Font.system(size: 14, weight: .semibold, design: .monospaced)
    static let terminalBody = Font.system(size: 13, weight: .regular, design: .monospaced)
    static let terminalSmall = Font.system(size: 11, weight: .regular, design: .monospaced)
    static let terminalMicro = Font.system(size: 9, weight: .medium, design: .monospaced)
}

// MARK: - View Modifiers

struct TerminalCard: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(Color.terminalSurface)
            .clipShape(RoundedRectangle(cornerRadius: 6))
            .overlay(
                RoundedRectangle(cornerRadius: 6)
                    .stroke(Color.terminalBorder, lineWidth: 1)
            )
    }
}

struct TerminalButton: ViewModifier {
    var isActive: Bool = false

    func body(content: Content) -> some View {
        content
            .font(.terminalSmall)
            .foregroundColor(isActive ? .terminalBg : .terminalText)
            .padding(.horizontal, 8)
            .padding(.vertical, 5)
            .background(isActive ? Color.terminalAccent : Color.terminalSurface)
            .clipShape(RoundedRectangle(cornerRadius: 4))
            .overlay(
                RoundedRectangle(cornerRadius: 4)
                    .stroke(isActive ? Color.terminalAccent : Color.terminalBorder, lineWidth: 1)
            )
    }
}

extension View {
    func terminalCard() -> some View {
        modifier(TerminalCard())
    }

    func terminalButton(isActive: Bool = false) -> some View {
        modifier(TerminalButton(isActive: isActive))
    }
}

// MARK: - Animations

extension Animation {
    static let taskComplete = Animation.easeOut(duration: 0.5)
    static let taskDelete = Animation.easeOut(duration: 0.3)
    static let taskAdd = Animation.spring(response: 0.4, dampingFraction: 0.8)
}

// MARK: - Transitions

extension AnyTransition {
    static var taskInsertion: AnyTransition {
        .asymmetric(
            insertion: .opacity.combined(with: .scale(scale: 0.9)).combined(with: .offset(y: -10)),
            removal: .opacity.combined(with: .scale(scale: 0.95))
        )
    }

    static var taskDeletion: AnyTransition {
        .asymmetric(
            insertion: .opacity,
            removal: .opacity.combined(with: .offset(x: -50))
        )
    }
}
