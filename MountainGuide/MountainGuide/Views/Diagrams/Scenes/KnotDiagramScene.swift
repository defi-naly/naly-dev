import SwiftUI

struct KnotDiagramScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        Canvas { context, size in
            // Dark background
            let bg = Path(roundedRect: CGRect(origin: .zero, size: size), cornerRadius: 0)
            context.fill(bg, with: .color(Color(hex: "E7E5E4")))

            // Figure-eight knot illustration
            let cx = size.width * 0.5
            let cy = size.height * 0.45
            let ropeColor = Color(hex: "F97316")

            // Rope coming from top
            var rope = Path()
            rope.move(to: CGPoint(x: cx, y: 0))
            rope.addLine(to: CGPoint(x: cx, y: cy - 40))

            // Figure-eight loop: two crossing loops
            // Top loop (right)
            rope.addQuadCurve(
                to: CGPoint(x: cx + 20, y: cy - 15),
                control: CGPoint(x: cx + 30, y: cy - 35)
            )
            // Cross over
            rope.addQuadCurve(
                to: CGPoint(x: cx - 20, y: cy + 15),
                control: CGPoint(x: cx, y: cy)
            )
            // Bottom loop (left)
            rope.addQuadCurve(
                to: CGPoint(x: cx, y: cy + 40),
                control: CGPoint(x: cx - 30, y: cy + 35)
            )

            // Rope going down
            rope.addLine(to: CGPoint(x: cx, y: size.height))

            context.stroke(rope, with: .color(ropeColor.opacity(0.8)), lineWidth: 4)

            // Crossing highlight
            let crossDot = Path(ellipseIn: CGRect(x: cx - 4, y: cy - 4, width: 8, height: 8))
            context.fill(crossDot, with: .color(ropeColor.opacity(0.4)))

            // Second rope strand (parallel for follow-through)
            var rope2 = Path()
            rope2.move(to: CGPoint(x: cx + 6, y: 0))
            rope2.addLine(to: CGPoint(x: cx + 6, y: cy - 38))
            rope2.addQuadCurve(
                to: CGPoint(x: cx + 26, y: cy - 13),
                control: CGPoint(x: cx + 36, y: cy - 33)
            )
            rope2.addQuadCurve(
                to: CGPoint(x: cx - 14, y: cy + 17),
                control: CGPoint(x: cx + 6, y: cy + 2)
            )
            rope2.addQuadCurve(
                to: CGPoint(x: cx + 6, y: cy + 42),
                control: CGPoint(x: cx - 24, y: cy + 37)
            )
            rope2.addLine(to: CGPoint(x: cx + 6, y: size.height))

            context.stroke(rope2, with: .color(ropeColor.opacity(0.4)), lineWidth: 3)

            // Label
            context.draw(
                Text("FIGURE-8").font(.mono(8, weight: .bold)).foregroundStyle(Color.textDim),
                at: CGPoint(x: size.width * 0.5, y: size.height * 0.88)
            )
        }
        .allowsHitTesting(false)
    }
}
