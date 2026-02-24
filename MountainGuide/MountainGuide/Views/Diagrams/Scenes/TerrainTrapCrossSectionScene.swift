import SwiftUI

struct TerrainTrapCrossSectionScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Muted sky
            LinearGradient(
                colors: [Color(hex: "F5F0EB"), Color(hex: "E7E5E4")],
                startPoint: .top,
                endPoint: .bottom
            )

            // Mountain profile with terrain features
            // Left: open slope → gully → cliff band → creek bed
            let profilePath = Path { path in
                path.move(to: CGPoint(x: 0, y: height * 0.4))
                // Open slope
                path.addLine(to: CGPoint(x: width * 0.15, y: height * 0.35))
                path.addLine(to: CGPoint(x: width * 0.25, y: height * 0.25))
                // Gully (V-notch)
                path.addLine(to: CGPoint(x: width * 0.35, y: height * 0.4))
                path.addLine(to: CGPoint(x: width * 0.38, y: height * 0.45))
                path.addLine(to: CGPoint(x: width * 0.41, y: height * 0.4))
                // Ridge after gully
                path.addLine(to: CGPoint(x: width * 0.5, y: height * 0.3))
                // Cliff band (vertical drop)
                path.addLine(to: CGPoint(x: width * 0.6, y: height * 0.3))
                path.addLine(to: CGPoint(x: width * 0.62, y: height * 0.55))
                // Bench below cliff
                path.addLine(to: CGPoint(x: width * 0.72, y: height * 0.56))
                // Creek bed (depression)
                path.addLine(to: CGPoint(x: width * 0.78, y: height * 0.65))
                path.addLine(to: CGPoint(x: width * 0.82, y: height * 0.65))
                path.addLine(to: CGPoint(x: width * 0.88, y: height * 0.55))
                // Trees area
                path.addLine(to: CGPoint(x: width, y: height * 0.5))
                path.addLine(to: CGPoint(x: width, y: height))
                path.addLine(to: CGPoint(x: 0, y: height))
                path.closeSubpath()
            }

            // Terrain fill
            profilePath
                .fill(
                    LinearGradient(
                        colors: [Color(hex: "A8A29E"), Color(hex: "78716C"), Color(hex: "57534E")],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )

            profilePath
                .stroke(Color.terminalBorder, lineWidth: 1)

            // Snow surface on slope
            Path { path in
                path.move(to: CGPoint(x: 0, y: height * 0.38))
                path.addLine(to: CGPoint(x: width * 0.25, y: height * 0.23))
                path.addLine(to: CGPoint(x: width * 0.35, y: height * 0.38))
            }
            .stroke(Color.white.opacity(0.4), lineWidth: 2)

            // Gully label
            Text("GULLY")
                .font(.mono(7, weight: .bold))
                .foregroundStyle(Color.danger.opacity(0.8))
                .position(x: width * 0.38, y: height * 0.52)

            // Cliff band highlight
            Rectangle()
                .fill(Color.danger.opacity(0.15))
                .frame(width: width * 0.03, height: height * 0.25)
                .position(x: width * 0.61, y: height * 0.425)

            Text("CLIFF")
                .font(.mono(7, weight: .bold))
                .foregroundStyle(Color.danger.opacity(0.8))
                .position(x: width * 0.61, y: height * 0.2)

            // Creek bed label
            Text("CREEK")
                .font(.mono(7, weight: .bold))
                .foregroundStyle(Color.diagramCyan.opacity(0.8))
                .position(x: width * 0.8, y: height * 0.72)

            // Creek water hint
            Path { path in
                path.move(to: CGPoint(x: width * 0.78, y: height * 0.64))
                path.addQuadCurve(
                    to: CGPoint(x: width * 0.82, y: height * 0.64),
                    control: CGPoint(x: width * 0.8, y: height * 0.62)
                )
            }
            .stroke(Color.diagramCyan.opacity(0.4), lineWidth: 1)

            // Tree triangles at right
            ForEach(0..<4, id: \.self) { i in
                let tx = width * (0.9 + CGFloat(i) * 0.025)
                let ty = height * 0.45
                Path { path in
                    path.move(to: CGPoint(x: tx, y: ty - 12))
                    path.addLine(to: CGPoint(x: tx - 5, y: ty))
                    path.addLine(to: CGPoint(x: tx + 5, y: ty))
                    path.closeSubpath()
                }
                .fill(Color(hex: "166534").opacity(0.5))
            }

            Text("TREES")
                .font(.mono(7, weight: .bold))
                .foregroundStyle(Color(hex: "22C55E").opacity(0.7))
                .position(x: width * 0.93, y: height * 0.38)
        }
    }
}
