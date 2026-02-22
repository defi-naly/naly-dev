import SwiftUI

struct LenticularScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Sky gradient
            LinearGradient(
                colors: [Color(hex: "0f172a"), Color(hex: "1e3a5f")],
                startPoint: .top,
                endPoint: .bottom
            )

            // Mountain ridge silhouette
            CloudShapes.mountainSilhouette(width: width, height: height, peakY: 0.45)
                .fill(
                    LinearGradient(
                        colors: [Color(hex: "374151"), Color(hex: "1f2937")],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )

            // Stacked lenticular clouds over the peak
            let peakX = width * 0.5
            let baseAlt = height * 0.2

            ForEach(0..<3, id: \.self) { i in
                let yOff = CGFloat(i) * height * 0.08
                let w = width * (0.35 - CGFloat(i) * 0.06)
                let h: CGFloat = 14 - CGFloat(i) * 2

                CloudShapes.lenticular(
                    center: CGPoint(x: peakX, y: baseAlt + yOff),
                    width: w, height: h
                )
                .fill(Color.white.opacity(0.6 - Double(i) * 0.15))

                CloudShapes.lenticular(
                    center: CGPoint(x: peakX, y: baseAlt + yOff),
                    width: w, height: h
                )
                .stroke(Color.white.opacity(0.3), lineWidth: 0.5)
            }

            // Rotor zone indicator (dashed oval below peak)
            let rotorY = height * 0.55
            Path { path in
                path.addEllipse(in: CGRect(
                    x: peakX - width * 0.12,
                    y: rotorY - 8,
                    width: width * 0.24,
                    height: 16
                ))
            }
            .stroke(Color.danger.opacity(0.4), style: StrokeStyle(lineWidth: 1, dash: [4, 4]))

            // Rotor label
            Text("ROTOR")
                .font(.mono(7, weight: .bold))
                .foregroundStyle(Color.danger.opacity(0.5))
                .position(x: peakX, y: rotorY + 14)

            // Wind direction arrows (left to right)
            ForEach(0..<3, id: \.self) { i in
                let y = height * (0.3 + CGFloat(i) * 0.1)
                Path { path in
                    path.move(to: CGPoint(x: width * 0.05, y: y))
                    path.addLine(to: CGPoint(x: width * 0.2, y: y))
                    // Arrowhead
                    path.move(to: CGPoint(x: width * 0.18, y: y - 3))
                    path.addLine(to: CGPoint(x: width * 0.2, y: y))
                    path.addLine(to: CGPoint(x: width * 0.18, y: y + 3))
                }
                .stroke(Color.diagramCyan.opacity(0.4), lineWidth: 1)
            }
        }
    }
}
