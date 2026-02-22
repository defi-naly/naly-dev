import SwiftUI

struct AnimatedCounterView: View {
    let target: Int
    var prefix: String = ""
    var suffix: String = ""
    var font: Font = .mono(28, weight: .bold)
    var color: Color = .amber

    @State private var displayed: Int = 0

    var body: some View {
        Text("\(prefix)\(displayed)\(suffix)")
            .font(font)
            .foregroundStyle(color)
            .monospacedDigit()
            .onAppear {
                animateCounter()
            }
            .onChange(of: target) { _ in
                animateCounter()
            }
    }

    private func animateCounter() {
        let steps = min(target, 30)
        guard steps > 0 else {
            displayed = target
            return
        }

        let interval = 0.8 / Double(steps)

        for i in 0...steps {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(i) * interval) {
                withAnimation(.easeOut(duration: 0.05)) {
                    displayed = target * i / steps
                }
            }
        }
    }
}
