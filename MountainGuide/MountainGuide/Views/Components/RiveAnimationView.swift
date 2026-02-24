import SwiftUI
import RiveRuntime

struct RiveAnimationView: View {
    let animationName: String
    var stateMachine: String? = nil

    var body: some View {
        if let _ = Bundle.main.url(forResource: animationName, withExtension: "riv") {
            RiveViewModel(fileName: animationName, stateMachineName: stateMachine).view()
        } else {
            // Graceful fallback when .riv file doesn't exist yet
            RivePlaceholder(animationName: animationName)
        }
    }
}

private struct RivePlaceholder: View {
    let animationName: String

    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.lightBorder.opacity(0.5))
            VStack(spacing: 8) {
                Image(systemName: "play.circle")
                    .font(.system(size: 28))
                    .foregroundStyle(Color.textTertiary)
                Text(animationName)
                    .font(.mono(10))
                    .foregroundStyle(Color.textTertiary)
            }
        }
    }
}
