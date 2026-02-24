import SwiftUI

struct DefaultScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Light background
            Color(hex: "F5F5F7")

            // Subtle mountain silhouette
            CloudShapes.mountainSilhouette(width: width, height: height, peakY: 0.4)
                .fill(
                    LinearGradient(
                        colors: [Color(hex: "D6D3D1").opacity(0.5), Color(hex: "E7E5E4").opacity(0.4)],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
        }
    }
}
