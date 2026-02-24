import SwiftUI

struct ForestTerrainScene: View {
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

            // Divider
            Path { path in
                path.move(to: CGPoint(x: width / 2, y: 0))
                path.addLine(to: CGPoint(x: width / 2, y: height))
            }
            .stroke(Color.terminalBorder.opacity(0.4), style: StrokeStyle(lineWidth: 0.5, dash: [4, 4]))

            // Ground on both sides
            Rectangle()
                .fill(Color(hex: "A8A29E").opacity(0.3))
                .frame(width: width, height: height * 0.25)
                .position(x: width / 2, y: height * 0.875)

            // Snow surface
            Path { path in
                path.move(to: CGPoint(x: 0, y: height * 0.75))
                path.addLine(to: CGPoint(x: width, y: height * 0.75))
            }
            .stroke(Color.white.opacity(0.3), lineWidth: 1)

            // LEFT: Wide-spaced tall trees (safe — avalanche can flow between)
            ForEach(0..<5, id: \.self) { i in
                let tx = width * (0.05 + CGFloat(i) * 0.08)
                let treeH: CGFloat = 45

                // Trunk
                Path { path in
                    path.move(to: CGPoint(x: tx, y: height * 0.75))
                    path.addLine(to: CGPoint(x: tx, y: height * 0.75 - treeH * 0.3))
                }
                .stroke(Color(hex: "78716C").opacity(0.5), lineWidth: 2)

                // Canopy — tall triangle
                Path { path in
                    path.move(to: CGPoint(x: tx, y: height * 0.75 - treeH))
                    path.addLine(to: CGPoint(x: tx - 10, y: height * 0.75 - treeH * 0.3))
                    path.addLine(to: CGPoint(x: tx + 10, y: height * 0.75 - treeH * 0.3))
                    path.closeSubpath()
                }
                .fill(Color(hex: "166534").opacity(0.6))
            }

            // Flow arrows between widely-spaced trees
            ForEach(0..<3, id: \.self) { i in
                let ax = width * (0.08 + CGFloat(i) * 0.1)
                let ay = height * 0.6
                Path { path in
                    path.move(to: CGPoint(x: ax, y: ay))
                    path.addLine(to: CGPoint(x: ax + 15, y: ay))
                    path.move(to: CGPoint(x: ax + 12, y: ay - 2))
                    path.addLine(to: CGPoint(x: ax + 15, y: ay))
                    path.addLine(to: CGPoint(x: ax + 12, y: ay + 2))
                }
                .stroke(Color.white.opacity(0.25), lineWidth: 0.8)
            }

            Text("WIDE SPACING")
                .font(.mono(7, weight: .bold))
                .foregroundStyle(Color.emerald.opacity(0.7))
                .position(x: width * 0.22, y: height * 0.15)

            Text("Flow-through")
                .font(.mono(6))
                .foregroundStyle(Color.textDim)
                .position(x: width * 0.22, y: height * 0.22)

            // RIGHT: Dense small trees (dangerous — snow accumulates, traps victim)
            ForEach(0..<10, id: \.self) { i in
                let tx = width * (0.53 + CGFloat(i) * 0.045)
                let treeH: CGFloat = 25

                // Trunk
                Path { path in
                    path.move(to: CGPoint(x: tx, y: height * 0.75))
                    path.addLine(to: CGPoint(x: tx, y: height * 0.75 - treeH * 0.25))
                }
                .stroke(Color(hex: "78716C").opacity(0.5), lineWidth: 1.5)

                // Small dense canopy
                Path { path in
                    path.move(to: CGPoint(x: tx, y: height * 0.75 - treeH))
                    path.addLine(to: CGPoint(x: tx - 6, y: height * 0.75 - treeH * 0.25))
                    path.addLine(to: CGPoint(x: tx + 6, y: height * 0.75 - treeH * 0.25))
                    path.closeSubpath()
                }
                .fill(Color(hex: "166534").opacity(0.7))
            }

            // Snow accumulation between dense trees
            Path { path in
                path.move(to: CGPoint(x: width * 0.53, y: height * 0.68))
                for i in 0..<10 {
                    let x = width * (0.53 + CGFloat(i) * 0.045)
                    let y = height * (0.68 + 0.02 * sin(CGFloat(i) * 1.5))
                    path.addLine(to: CGPoint(x: x, y: y))
                }
                path.addLine(to: CGPoint(x: width * 0.98, y: height * 0.68))
            }
            .fill(Color.white.opacity(0.12))

            Text("DENSE FOREST")
                .font(.mono(7, weight: .bold))
                .foregroundStyle(Color.danger.opacity(0.7))
                .position(x: width * 0.75, y: height * 0.15)

            Text("Traps debris")
                .font(.mono(6))
                .foregroundStyle(Color.textDim)
                .position(x: width * 0.75, y: height * 0.22)
        }
    }
}
