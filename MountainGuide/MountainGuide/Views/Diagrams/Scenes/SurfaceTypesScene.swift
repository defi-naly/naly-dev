import SwiftUI

struct SurfaceTypesScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Sky
            LinearGradient(
                colors: [Color(hex: "1e3a5f"), Color(hex: "2563eb").opacity(0.2)],
                startPoint: .top,
                endPoint: .bottom
            )

            // Ground strips (left to right: dark field, lake, town, forest)
            let groundY = height * 0.65
            let stripW = width / 4
            let stripH = height * 0.35

            // Dark plowed field
            Rectangle()
                .fill(Color(hex: "3B2507").opacity(0.7))
                .frame(width: stripW, height: stripH)
                .position(x: stripW * 0.5, y: groundY + stripH / 2)

            // Lake (blue)
            Rectangle()
                .fill(Color(hex: "1E40AF").opacity(0.4))
                .frame(width: stripW, height: stripH)
                .position(x: stripW * 1.5, y: groundY + stripH / 2)

            // Town (gray)
            Rectangle()
                .fill(Color(hex: "6B7280").opacity(0.5))
                .frame(width: stripW, height: stripH)
                .position(x: stripW * 2.5, y: groundY + stripH / 2)

            // Forest (green)
            Rectangle()
                .fill(Color(hex: "166534").opacity(0.5))
                .frame(width: stripW, height: stripH)
                .position(x: stripW * 3.5, y: groundY + stripH / 2)

            // Thermal arrows from dark surfaces (strong from field, weak from town)
            // Field — strong thermal
            thermalArrow(x: stripW * 0.5, baseY: groundY, strength: 0.4, opacity: 0.6)

            // Lake — downdraft (sink)
            Path { path in
                let lx = stripW * 1.5
                path.move(to: CGPoint(x: lx, y: groundY - height * 0.15))
                path.addLine(to: CGPoint(x: lx, y: groundY - height * 0.05))
                path.move(to: CGPoint(x: lx - 3, y: groundY - height * 0.08))
                path.addLine(to: CGPoint(x: lx, y: groundY - height * 0.05))
                path.addLine(to: CGPoint(x: lx + 3, y: groundY - height * 0.08))
            }
            .stroke(Color.diagramCyan.opacity(0.4), lineWidth: 1)

            // Town — moderate thermal
            thermalArrow(x: stripW * 2.5, baseY: groundY, strength: 0.25, opacity: 0.4)

            // Forest — weak thermal
            thermalArrow(x: stripW * 3.5, baseY: groundY, strength: 0.15, opacity: 0.3)

            // Labels
            Group {
                Text("Field")
                    .position(x: stripW * 0.5, y: height * 0.92)
                Text("Lake")
                    .position(x: stripW * 1.5, y: height * 0.92)
                Text("Town")
                    .position(x: stripW * 2.5, y: height * 0.92)
                Text("Forest")
                    .position(x: stripW * 3.5, y: height * 0.92)
            }
            .font(.mono(7, weight: .bold))
            .foregroundStyle(Color.textMuted)

            // Dividers between strips
            ForEach(1..<4, id: \.self) { i in
                Path { path in
                    let x = stripW * CGFloat(i)
                    path.move(to: CGPoint(x: x, y: groundY))
                    path.addLine(to: CGPoint(x: x, y: height))
                }
                .stroke(Color.terminalBorder.opacity(0.3), lineWidth: 0.5)
            }
        }
    }

    private func thermalArrow(x: CGFloat, baseY: CGFloat, strength: CGFloat, opacity: Double) -> some View {
        Path { path in
            let topY = baseY - height * strength
            path.move(to: CGPoint(x: x, y: baseY - 4))
            path.addLine(to: CGPoint(x: x, y: topY))
            // Arrowhead
            path.move(to: CGPoint(x: x - 3, y: topY + 5))
            path.addLine(to: CGPoint(x: x, y: topY))
            path.addLine(to: CGPoint(x: x + 3, y: topY + 5))
        }
        .stroke(Color.amber.opacity(opacity), lineWidth: 1.5)
    }
}
