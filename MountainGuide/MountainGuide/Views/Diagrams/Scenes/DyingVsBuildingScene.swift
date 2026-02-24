import SwiftUI

struct DyingVsBuildingScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Sky
            LinearGradient(
                colors: [Color(hex: "DBEAFE"), Color(hex: "93C5FD")],
                startPoint: .top,
                endPoint: .bottom
            )

            // Divider line
            Path { path in
                path.move(to: CGPoint(x: width / 2, y: 0))
                path.addLine(to: CGPoint(x: width / 2, y: height))
            }
            .stroke(Color.terminalBorder.opacity(0.4), style: StrokeStyle(lineWidth: 0.5, dash: [4, 4]))

            // LEFT: Building cumulus — sharp edges, bright white
            let buildCenter = CGPoint(x: width * 0.25, y: height * 0.4)
            let buildW = width * 0.35
            let buildH = height * 0.35

            CloudShapes.cumulus(center: buildCenter, width: buildW, height: buildH)
                .fill(
                    LinearGradient(
                        colors: [Color.white.opacity(0.95), Color(hex: "E5E7EB").opacity(0.8)],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )

            // Building highlight
            CloudShapes.cumulus(
                center: CGPoint(x: buildCenter.x - 4, y: buildCenter.y - 4),
                width: buildW * 0.7, height: buildH * 0.6
            )
            .fill(Color.white.opacity(0.4))

            // Building label
            Text("BUILDING")
                .font(.mono(8, weight: .bold))
                .foregroundStyle(Color.emerald.opacity(0.8))
                .position(x: width * 0.25, y: height * 0.78)

            // Upward arrow under building cloud
            Path { path in
                let ax = width * 0.25
                path.move(to: CGPoint(x: ax, y: height * 0.72))
                path.addLine(to: CGPoint(x: ax, y: height * 0.62))
                path.move(to: CGPoint(x: ax - 4, y: height * 0.65))
                path.addLine(to: CGPoint(x: ax, y: height * 0.62))
                path.addLine(to: CGPoint(x: ax + 4, y: height * 0.65))
            }
            .stroke(Color.emerald.opacity(0.5), lineWidth: 1.5)

            // RIGHT: Dying cumulus — wispy, faded, spreading edges
            let dyingCenter = CGPoint(x: width * 0.75, y: height * 0.38)
            let dyingW = width * 0.38
            let dyingH = height * 0.15

            // Wispy faded shape
            CloudShapes.wispy(center: dyingCenter, width: dyingW, height: dyingH)
                .fill(Color.white.opacity(0.25))

            // Extra wisps
            CloudShapes.wispy(
                center: CGPoint(x: dyingCenter.x + 15, y: dyingCenter.y - 5),
                width: dyingW * 0.5, height: dyingH * 0.6
            )
            .fill(Color.white.opacity(0.15))

            // Dying label
            Text("DYING")
                .font(.mono(8, weight: .bold))
                .foregroundStyle(Color.danger.opacity(0.8))
                .position(x: width * 0.75, y: height * 0.78)

            // Downward arrow under dying cloud
            Path { path in
                let ax = width * 0.75
                path.move(to: CGPoint(x: ax, y: height * 0.62))
                path.addLine(to: CGPoint(x: ax, y: height * 0.72))
                path.move(to: CGPoint(x: ax - 4, y: height * 0.69))
                path.addLine(to: CGPoint(x: ax, y: height * 0.72))
                path.addLine(to: CGPoint(x: ax + 4, y: height * 0.69))
            }
            .stroke(Color.danger.opacity(0.5), lineWidth: 1.5)
        }
    }
}
