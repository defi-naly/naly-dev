import SwiftUI

struct CliffBandScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Background
            LinearGradient(
                colors: [Color(hex: "F5F0EB"), Color(hex: "E7E5E4")],
                startPoint: .top,
                endPoint: .bottom
            )

            // Upper slope
            Path { path in
                path.move(to: CGPoint(x: 0, y: height * 0.15))
                path.addLine(to: CGPoint(x: width * 0.3, y: height * 0.1))
                path.addLine(to: CGPoint(x: width * 0.6, y: height * 0.25))
                // Bench
                path.addLine(to: CGPoint(x: width * 0.65, y: height * 0.26))
                path.addLine(to: CGPoint(x: width * 0.75, y: height * 0.27))
                // Cliff drop
                path.addLine(to: CGPoint(x: width * 0.76, y: height * 0.6))
                // Below cliff
                path.addLine(to: CGPoint(x: width * 0.85, y: height * 0.62))
                path.addLine(to: CGPoint(x: width, y: height * 0.7))
                path.addLine(to: CGPoint(x: width, y: height))
                path.addLine(to: CGPoint(x: 0, y: height))
                path.closeSubpath()
            }
            .fill(
                LinearGradient(
                    colors: [Color(hex: "A8A29E"), Color(hex: "78716C"), Color(hex: "57534E")],
                    startPoint: .top,
                    endPoint: .bottom
                )
            )

            // Snow on upper slope
            Path { path in
                path.move(to: CGPoint(x: 0, y: height * 0.13))
                path.addLine(to: CGPoint(x: width * 0.3, y: height * 0.08))
                path.addLine(to: CGPoint(x: width * 0.6, y: height * 0.23))
                path.addLine(to: CGPoint(x: width * 0.75, y: height * 0.25))
            }
            .stroke(Color.white.opacity(0.5), lineWidth: 2.5)

            // Cliff face highlight
            Rectangle()
                .fill(Color(hex: "78716C").opacity(0.4))
                .frame(width: width * 0.02, height: height * 0.33)
                .position(x: width * 0.755, y: height * 0.435)

            // Cliff band label
            Text("CLIFF BAND")
                .font(.mono(8, weight: .bold))
                .foregroundStyle(Color.danger)
                .position(x: width * 0.85, y: height * 0.4)

            // Bench label
            Text("bench")
                .font(.mono(7))
                .foregroundStyle(Color.textDim)
                .position(x: width * 0.7, y: height * 0.2)

            // Debris flow arrows (avalanche pushing off cliff)
            ForEach(0..<3, id: \.self) { i in
                let startX = width * (0.65 + CGFloat(i) * 0.04)
                let startY = height * 0.26

                Path { path in
                    path.move(to: CGPoint(x: startX, y: startY))
                    path.addQuadCurve(
                        to: CGPoint(x: width * 0.82, y: height * 0.65),
                        control: CGPoint(x: width * 0.78, y: height * 0.35 + CGFloat(i) * 8)
                    )
                    // Arrowhead
                    let endX = width * 0.82
                    let endY = height * 0.65
                    path.move(to: CGPoint(x: endX - 4, y: endY - 5))
                    path.addLine(to: CGPoint(x: endX, y: endY))
                    path.addLine(to: CGPoint(x: endX + 2, y: endY - 6))
                }
                .stroke(Color.danger.opacity(0.4 - Double(i) * 0.1), lineWidth: 1.5)
            }

            // Danger zone below cliff
            Path { path in
                path.move(to: CGPoint(x: width * 0.76, y: height * 0.6))
                path.addLine(to: CGPoint(x: width * 0.95, y: height * 0.68))
                path.addLine(to: CGPoint(x: width * 0.95, y: height * 0.75))
                path.addLine(to: CGPoint(x: width * 0.76, y: height * 0.67))
                path.closeSubpath()
            }
            .fill(Color.danger.opacity(0.08))
        }
    }
}
