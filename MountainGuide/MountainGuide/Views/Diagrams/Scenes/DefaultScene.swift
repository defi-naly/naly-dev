import SwiftUI

struct DefaultScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Subtle mountain silhouette
            CloudShapes.mountainSilhouette(width: width, height: height, peakY: 0.4)
                .fill(
                    LinearGradient(
                        colors: [Color(hex: "1f2937").opacity(0.4), Color(hex: "111827").opacity(0.3)],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )

            // Subtle stars
            ForEach(0..<8, id: \.self) { i in
                Circle()
                    .fill(Color.white.opacity(0.15))
                    .frame(width: 2, height: 2)
                    .position(
                        x: width * CGFloat([0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 0.15, 0.6][i]),
                        y: height * CGFloat([0.1, 0.15, 0.08, 0.2, 0.12, 0.18, 0.25, 0.05][i])
                    )
            }
        }
    }
}
