import SwiftUI

struct MedalView: View {
    let medal: Medal
    var size: CGFloat = 32
    var showLabel: Bool = true

    var body: some View {
        VStack(spacing: 4) {
            ZStack {
                Circle()
                    .fill(medal.color.opacity(0.15))
                    .frame(width: size, height: size)

                Image(systemName: medal.icon)
                    .font(.system(size: size * 0.5))
                    .foregroundStyle(medal.color)
            }

            if showLabel && medal != .none {
                Text(medal.label)
                    .font(.mono(9, weight: .bold))
                    .foregroundStyle(medal.color)
            }
        }
    }
}

struct MedalAwardView: View {
    let medal: Medal
    @State private var scale: CGFloat = 0.3
    @State private var rotation: Double = -30
    @State private var glowOpacity: CGFloat = 0

    var body: some View {
        ZStack {
            // Glow
            Circle()
                .fill(medal.color.opacity(glowOpacity * 0.3))
                .frame(width: 120, height: 120)
                .blur(radius: 20)

            // Medal
            VStack(spacing: 8) {
                Image(systemName: medal.icon)
                    .font(.system(size: 48))
                    .foregroundStyle(medal.color)
                    .shadow(color: medal.color.opacity(0.5), radius: 8)

                Text(medal.label.uppercased())
                    .font(.mono(16, weight: .bold))
                    .foregroundStyle(medal.color)

                Text("Medal Earned!")
                    .font(.mono(11))
                    .foregroundStyle(Color.textMuted)
            }
        }
        .scaleEffect(scale)
        .rotationEffect(.degrees(rotation))
        .onAppear {
            withAnimation(.spring(response: 0.5, dampingFraction: 0.6)) {
                scale = 1
                rotation = 0
            }
            withAnimation(.easeInOut(duration: 1.5).repeatForever(autoreverses: true)) {
                glowOpacity = 1
            }
        }
    }
}
