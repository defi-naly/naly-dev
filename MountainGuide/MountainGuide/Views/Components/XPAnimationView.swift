import SwiftUI

struct XPAnimationView: View {
    let amount: Int
    @State private var show = false
    @State private var offsetY: CGFloat = 0

    var body: some View {
        Text("+\(amount) XP")
            .font(.mono(14, weight: .bold))
            .foregroundStyle(Color.amber)
            .shadow(color: .amber.opacity(0.6), radius: 4)
            .opacity(show ? 0 : 1)
            .offset(y: offsetY)
            .onAppear {
                withAnimation(.easeOut(duration: 1.2)) {
                    offsetY = -40
                }
                withAnimation(.easeOut(duration: 1.2).delay(0.3)) {
                    show = true
                }
            }
    }
}

struct XPBurstView: View {
    let amount: Int
    let label: String

    @State private var scale: CGFloat = 0.5
    @State private var opacity: CGFloat = 0

    var body: some View {
        VStack(spacing: 4) {
            Text("+\(amount)")
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.amber)

            Text(label)
                .font(.mono(10))
                .foregroundStyle(Color.textMuted)
        }
        .scaleEffect(scale)
        .opacity(opacity)
        .onAppear {
            withAnimation(.spring(response: 0.4, dampingFraction: 0.6)) {
                scale = 1
                opacity = 1
            }
        }
    }
}
