import SwiftUI
import Lottie

struct LottiePlayerView: View {
    let animationName: String
    var loopMode: LottieLoopMode = .loop

    var body: some View {
        LottieView(animation: .named(animationName))
            .playing(loopMode: loopMode)
    }
}
