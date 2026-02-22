import SwiftUI

struct MountainCloudOverviewScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Sky gradient
            LinearGradient(
                colors: [Color(hex: "0f172a"), Color(hex: "1e3a5f"), Color(hex: "2563eb").opacity(0.15)],
                startPoint: .top,
                endPoint: .bottom
            )

            // Mountain silhouette
            CloudShapes.mountainSilhouette(width: width, height: height, peakY: 0.35)
                .fill(
                    LinearGradient(
                        colors: [Color(hex: "374151"), Color(hex: "1f2937")],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )

            // High altitude: Lenticular over peak
            CloudShapes.lenticular(
                center: CGPoint(x: width * 0.5, y: height * 0.15),
                width: width * 0.25, height: 10
            )
            .fill(Color.white.opacity(0.5))

            CloudShapes.lenticular(
                center: CGPoint(x: width * 0.5, y: height * 0.21),
                width: width * 0.2, height: 8
            )
            .fill(Color.white.opacity(0.35))

            // Mid altitude: Cumulus
            CloudShapes.cumulus(
                center: CGPoint(x: width * 0.2, y: height * 0.42),
                width: width * 0.18, height: height * 0.12
            )
            .fill(
                LinearGradient(
                    colors: [Color.white.opacity(0.8), Color(hex: "D1D5DB").opacity(0.5)],
                    startPoint: .top,
                    endPoint: .bottom
                )
            )

            CloudShapes.cumulus(
                center: CGPoint(x: width * 0.8, y: height * 0.38),
                width: width * 0.15, height: height * 0.1
            )
            .fill(Color.white.opacity(0.6))

            // Tall: Cumulonimbus tower (right side, background)
            ForEach(0..<4, id: \.self) { i in
                let frac = CGFloat(i) / 3.0
                Circle()
                    .fill(Color.white.opacity(0.35 - Double(i) * 0.05))
                    .frame(width: width * 0.08, height: width * 0.08)
                    .position(
                        x: width * 0.88 + (i % 2 == 0 ? -3 : 3),
                        y: height * (0.55 - frac * 0.35)
                    )
            }

            // Anvil top of CB
            Path { path in
                path.addEllipse(in: CGRect(
                    x: width * 0.82, y: height * 0.12,
                    width: width * 0.16, height: 8
                ))
            }
            .fill(Color.white.opacity(0.3))

            // Height labels
            Text("HIGH")
                .font(.mono(7, weight: .bold))
                .foregroundStyle(Color.textDim)
                .position(x: width * 0.05, y: height * 0.1)

            Text("MID")
                .font(.mono(7, weight: .bold))
                .foregroundStyle(Color.textDim)
                .position(x: width * 0.05, y: height * 0.4)
        }
    }
}
