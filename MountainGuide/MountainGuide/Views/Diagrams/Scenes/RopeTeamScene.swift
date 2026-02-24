import SwiftUI

struct RopeTeamScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        Canvas { context, size in
            // Snow/glacier background
            let bg = Path(roundedRect: CGRect(origin: .zero, size: size), cornerRadius: 0)
            context.fill(bg, with: .linearGradient(
                Gradient(colors: [Color(hex: "E0F2FE"), Color(hex: "7DD3FC")]),
                startPoint: CGPoint(x: size.width / 2, y: 0), endPoint: CGPoint(x: size.width / 2, y: size.height)
            ))

            // Snow surface
            var surface = Path()
            surface.move(to: CGPoint(x: 0, y: size.height * 0.65))
            surface.addQuadCurve(
                to: CGPoint(x: size.width, y: size.height * 0.6),
                control: CGPoint(x: size.width * 0.5, y: size.height * 0.58)
            )
            surface.addLine(to: CGPoint(x: size.width, y: size.height))
            surface.addLine(to: CGPoint(x: 0, y: size.height))
            surface.closeSubpath()
            context.fill(surface, with: .color(Color.white.opacity(0.1)))

            // Crevasse (dashed line)
            var crevasse = Path()
            let crevX = size.width * 0.55
            crevasse.move(to: CGPoint(x: crevX - 12, y: size.height * 0.6))
            crevasse.addLine(to: CGPoint(x: crevX + 12, y: size.height * 0.62))
            context.stroke(crevasse, with: .color(Color.diagramCyan.opacity(0.4)),
                          style: StrokeStyle(lineWidth: 2, dash: [4, 3]))

            // Three team members (bird's eye dots)
            let ropeColor = Color(hex: "F97316")
            let memberPositions: [(CGFloat, CGFloat)] = [
                (0.2, 0.55),   // Leader
                (0.45, 0.52),  // Middle
                (0.75, 0.48)   // Last
            ]

            // Rope between members
            var rope = Path()
            rope.move(to: CGPoint(x: size.width * memberPositions[0].0, y: size.height * memberPositions[0].1))
            for pos in memberPositions.dropFirst() {
                rope.addLine(to: CGPoint(x: size.width * pos.0, y: size.height * pos.1))
            }
            context.stroke(rope, with: .color(ropeColor.opacity(0.7)), lineWidth: 2)

            // Prusik knots (small marks on rope)
            for i in 0..<2 {
                let t: CGFloat = CGFloat(i + 1) / 3.0
                let px = size.width * (memberPositions[0].0 + t * (memberPositions[2].0 - memberPositions[0].0))
                let py = size.height * (memberPositions[0].1 + t * (memberPositions[2].1 - memberPositions[0].1))
                let knotOffset: CGFloat = 15
                let knot = Path(ellipseIn: CGRect(x: px + knotOffset - 2, y: py - 2, width: 4, height: 4))
                context.fill(knot, with: .color(ropeColor.opacity(0.5)))
            }

            // Member dots
            for (i, pos) in memberPositions.enumerated() {
                let mx = size.width * pos.0
                let my = size.height * pos.1
                let memberDot = Path(ellipseIn: CGRect(x: mx - 6, y: my - 6, width: 12, height: 12))
                context.fill(memberDot, with: .color(Color.white.opacity(0.8)))
                context.stroke(memberDot, with: .color(ropeColor.opacity(0.6)), lineWidth: 1.5)

                // Labels
                let labels = ["L", "M", "E"]
                context.draw(
                    Text(labels[i]).font(.mono(7, weight: .bold)).foregroundStyle(Color.textDim),
                    at: CGPoint(x: mx, y: my + 16)
                )
            }

            // Spacing labels
            context.draw(
                Text("~10m").font(.mono(7, weight: .medium)).foregroundStyle(ropeColor.opacity(0.5)),
                at: CGPoint(x: size.width * 0.33, y: size.height * 0.45)
            )
            context.draw(
                Text("~10m").font(.mono(7, weight: .medium)).foregroundStyle(ropeColor.opacity(0.5)),
                at: CGPoint(x: size.width * 0.6, y: size.height * 0.42)
            )

            // Direction arrow
            var arrow = Path()
            let arrowY = size.height * 0.35
            arrow.move(to: CGPoint(x: size.width * 0.15, y: arrowY))
            arrow.addLine(to: CGPoint(x: size.width * 0.35, y: arrowY))
            arrow.move(to: CGPoint(x: size.width * 0.33, y: arrowY - 3))
            arrow.addLine(to: CGPoint(x: size.width * 0.35, y: arrowY))
            arrow.addLine(to: CGPoint(x: size.width * 0.33, y: arrowY + 3))
            context.stroke(arrow, with: .color(Color.textMuted.opacity(0.4)), lineWidth: 1)

            context.draw(
                Text("TRAVEL").font(.mono(7, weight: .bold)).foregroundStyle(Color.textDim),
                at: CGPoint(x: size.width * 0.25, y: arrowY - 10)
            )
        }
        .allowsHitTesting(false)
    }
}
