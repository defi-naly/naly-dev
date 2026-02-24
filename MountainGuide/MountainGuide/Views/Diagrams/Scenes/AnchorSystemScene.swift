import SwiftUI

struct AnchorSystemScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        Canvas { context, size in
            // Rock face background
            let bg = Path(roundedRect: CGRect(origin: .zero, size: size), cornerRadius: 0)
            context.fill(bg, with: .linearGradient(
                Gradient(colors: [Color(hex: "E7E5E4"), Color(hex: "D6D3D1")]),
                startPoint: CGPoint(x: size.width / 2, y: 0), endPoint: CGPoint(x: size.width / 2, y: size.height)
            ))

            // Rock texture lines
            for i in 0..<8 {
                var crack = Path()
                let startX = CGFloat.random(in: 0...size.width)
                let startY = CGFloat(i) * size.height / 8 + CGFloat.random(in: -10...10)
                crack.move(to: CGPoint(x: startX, y: startY))
                crack.addLine(to: CGPoint(x: startX + CGFloat.random(in: 20...60), y: startY + CGFloat.random(in: 5...20)))
                context.stroke(crack, with: .color(Color(hex: "78716C").opacity(0.2)), lineWidth: 0.5)
            }

            let ropeColor = Color(hex: "F97316")
            let cx = size.width * 0.5

            // Three anchor points forming equalized system
            let anchorPoints: [(CGFloat, CGFloat)] = [
                (cx - 30, size.height * 0.2),
                (cx + 25, size.height * 0.15),
                (cx + 5, size.height * 0.28)
            ]

            // Master point
            let masterPt = CGPoint(x: cx, y: size.height * 0.48)

            // Draw anchor placements (bolts/cams)
            for (ax, ay) in anchorPoints {
                // Bolt circle
                let bolt = Path(ellipseIn: CGRect(x: ax - 5, y: ay - 5, width: 10, height: 10))
                context.fill(bolt, with: .color(Color.textMuted.opacity(0.6)))
                context.stroke(bolt, with: .color(Color.white.opacity(0.4)), lineWidth: 1)

                // Carabiner (small rectangle)
                let biner = Path(roundedRect: CGRect(x: ax - 3, y: ay + 7, width: 6, height: 10), cornerRadius: 2)
                context.stroke(biner, with: .color(Color.white.opacity(0.5)), lineWidth: 1)

                // Sling to master point
                var sling = Path()
                sling.move(to: CGPoint(x: ax, y: ay + 17))
                sling.addQuadCurve(
                    to: masterPt,
                    control: CGPoint(x: (ax + masterPt.x) / 2, y: (ay + 17 + masterPt.y) / 2 + 8)
                )
                context.stroke(sling, with: .color(ropeColor.opacity(0.7)), lineWidth: 2)
            }

            // Master point knot
            let masterKnot = Path(ellipseIn: CGRect(x: masterPt.x - 7, y: masterPt.y - 7, width: 14, height: 14))
            context.fill(masterKnot, with: .color(ropeColor.opacity(0.3)))
            context.stroke(masterKnot, with: .color(ropeColor.opacity(0.8)), lineWidth: 2)

            // Rope going down from master point
            var mainRope = Path()
            mainRope.move(to: CGPoint(x: masterPt.x, y: masterPt.y + 7))
            mainRope.addLine(to: CGPoint(x: masterPt.x, y: size.height * 0.85))
            context.stroke(mainRope, with: .color(ropeColor.opacity(0.6)), lineWidth: 3)

            // Downward arrow at rope end
            var downArrow = Path()
            let arrowY = size.height * 0.85
            downArrow.move(to: CGPoint(x: cx - 5, y: arrowY - 6))
            downArrow.addLine(to: CGPoint(x: cx, y: arrowY))
            downArrow.addLine(to: CGPoint(x: cx + 5, y: arrowY - 6))
            context.stroke(downArrow, with: .color(ropeColor.opacity(0.5)), lineWidth: 2)

            // Labels
            context.draw(
                Text("EQUALIZED").font(.mono(7, weight: .bold)).foregroundStyle(Color.textDim),
                at: CGPoint(x: cx, y: size.height * 0.92)
            )

            // Force arrows from master point
            let forceColor = Color.danger.opacity(0.3)
            for (ax, ay) in anchorPoints {
                var forceArrow = Path()
                let midX = (ax + masterPt.x) / 2
                let midY = (ay + 17 + masterPt.y) / 2
                forceArrow.move(to: CGPoint(x: midX, y: midY))
                forceArrow.addLine(to: CGPoint(x: midX - 3, y: midY + 4))
                forceArrow.move(to: CGPoint(x: midX, y: midY))
                forceArrow.addLine(to: CGPoint(x: midX + 3, y: midY + 4))
                context.stroke(forceArrow, with: .color(forceColor), lineWidth: 1)
            }
        }
        .allowsHitTesting(false)
    }
}
