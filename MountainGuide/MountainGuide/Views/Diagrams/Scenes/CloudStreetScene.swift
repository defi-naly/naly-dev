import SwiftUI

struct CloudStreetScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Blue sky
            LinearGradient(
                colors: [Color(hex: "1e3a5f"), Color(hex: "2563eb").opacity(0.3)],
                startPoint: .top,
                endPoint: .bottom
            )

            // Line of small cumulus clouds forming a street
            ForEach(0..<5, id: \.self) { i in
                let x = width * (0.12 + CGFloat(i) * 0.19)
                let y = height * (0.32 + (i % 2 == 0 ? 0 : 0.04))
                let cw = width * CGFloat.random(in: 0.1...0.14)
                let ch = height * CGFloat.random(in: 0.08...0.12)

                // Shadow
                CloudShapes.cumulus(
                    center: CGPoint(x: x + 2, y: y + 2),
                    width: cw, height: ch
                )
                .fill(Color(hex: "6B7280").opacity(0.15))

                // Cloud
                CloudShapes.cumulus(
                    center: CGPoint(x: x, y: y),
                    width: cw, height: ch
                )
                .fill(
                    LinearGradient(
                        colors: [Color.white.opacity(0.85), Color(hex: "D1D5DB").opacity(0.6)],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
            }

            // Blue gaps indicator — subtle dashed line connecting clouds
            Path { path in
                path.move(to: CGPoint(x: width * 0.1, y: height * 0.35))
                path.addLine(to: CGPoint(x: width * 0.9, y: height * 0.35))
            }
            .stroke(Color.diagramCyan.opacity(0.2), style: StrokeStyle(lineWidth: 0.5, dash: [6, 4]))

            // Ground plane at bottom
            Path { path in
                path.move(to: CGPoint(x: 0, y: height * 0.8))
                path.addQuadCurve(
                    to: CGPoint(x: width, y: height * 0.82),
                    control: CGPoint(x: width * 0.5, y: height * 0.78)
                )
                path.addLine(to: CGPoint(x: width, y: height))
                path.addLine(to: CGPoint(x: 0, y: height))
                path.closeSubpath()
            }
            .fill(
                LinearGradient(
                    colors: [Color(hex: "374151").opacity(0.4), Color(hex: "1f2937").opacity(0.3)],
                    startPoint: .top,
                    endPoint: .bottom
                )
            )

            // Thermal arrows rising into each cloud
            ForEach(0..<5, id: \.self) { i in
                let x = width * (0.12 + CGFloat(i) * 0.19)
                Path { path in
                    path.move(to: CGPoint(x: x, y: height * 0.78))
                    path.addLine(to: CGPoint(x: x, y: height * 0.45))
                    // Arrowhead
                    path.move(to: CGPoint(x: x - 3, y: height * 0.48))
                    path.addLine(to: CGPoint(x: x, y: height * 0.45))
                    path.addLine(to: CGPoint(x: x + 3, y: height * 0.48))
                }
                .stroke(Color.amber.opacity(0.25), lineWidth: 0.8)
            }
        }
    }
}
