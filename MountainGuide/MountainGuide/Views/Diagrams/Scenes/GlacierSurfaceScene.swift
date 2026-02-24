import SwiftUI

struct GlacierSurfaceScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        Canvas { context, size in
            // Glacier ice background
            let bg = Path(roundedRect: CGRect(origin: .zero, size: size), cornerRadius: 0)
            context.fill(bg, with: .linearGradient(
                Gradient(colors: [Color(hex: "E0F2FE"), Color(hex: "7DD3FC")]),
                startPoint: CGPoint(x: size.width / 2, y: 0), endPoint: CGPoint(x: size.width / 2, y: size.height)
            ))

            // Glacier surface line
            var surface = Path()
            surface.move(to: CGPoint(x: 0, y: size.height * 0.35))
            surface.addQuadCurve(
                to: CGPoint(x: size.width * 0.3, y: size.height * 0.38),
                control: CGPoint(x: size.width * 0.15, y: size.height * 0.33)
            )
            surface.addQuadCurve(
                to: CGPoint(x: size.width * 0.7, y: size.height * 0.36),
                control: CGPoint(x: size.width * 0.5, y: size.height * 0.42)
            )
            surface.addQuadCurve(
                to: CGPoint(x: size.width, y: size.height * 0.32),
                control: CGPoint(x: size.width * 0.85, y: size.height * 0.34)
            )
            context.stroke(surface, with: .color(Color.white.opacity(0.4)), lineWidth: 1.5)

            // Snow surface fill
            var surfaceFill = surface
            surfaceFill.addLine(to: CGPoint(x: size.width, y: 0))
            surfaceFill.addLine(to: CGPoint(x: 0, y: 0))
            surfaceFill.closeSubpath()
            context.fill(surfaceFill, with: .color(Color.white.opacity(0.6)))

            // Crevasse 1 — wide transverse
            var crev1 = Path()
            let c1x = size.width * 0.35
            crev1.move(to: CGPoint(x: c1x - 15, y: size.height * 0.37))
            crev1.addLine(to: CGPoint(x: c1x - 5, y: size.height * 0.7))
            crev1.addLine(to: CGPoint(x: c1x + 5, y: size.height * 0.7))
            crev1.addLine(to: CGPoint(x: c1x + 15, y: size.height * 0.38))
            crev1.closeSubpath()
            context.fill(crev1, with: .color(Color(hex: "0c4a6e").opacity(0.6)))
            context.stroke(crev1, with: .color(Color.diagramCyan.opacity(0.3)), lineWidth: 0.5)

            // Crevasse 2 — narrow
            var crev2 = Path()
            let c2x = size.width * 0.6
            crev2.move(to: CGPoint(x: c2x - 4, y: size.height * 0.37))
            crev2.addLine(to: CGPoint(x: c2x - 2, y: size.height * 0.55))
            crev2.addLine(to: CGPoint(x: c2x + 2, y: size.height * 0.55))
            crev2.addLine(to: CGPoint(x: c2x + 4, y: size.height * 0.36))
            crev2.closeSubpath()
            context.fill(crev2, with: .color(Color(hex: "0c4a6e").opacity(0.5)))

            // Snow bridge (dashed line over crevasse 1)
            var bridge = Path()
            bridge.move(to: CGPoint(x: c1x - 18, y: size.height * 0.36))
            bridge.addQuadCurve(
                to: CGPoint(x: c1x + 18, y: size.height * 0.37),
                control: CGPoint(x: c1x, y: size.height * 0.34)
            )
            context.stroke(bridge, with: .color(Color.white.opacity(0.35)),
                          style: StrokeStyle(lineWidth: 2, dash: [4, 3]))

            // Ice blocks / seracs
            for i in 0..<3 {
                let bx = size.width * (0.8 + CGFloat(i) * 0.06)
                let by = size.height * 0.3
                let block = Path(roundedRect: CGRect(x: bx, y: by, width: 8, height: 12), cornerRadius: 1)
                context.fill(block, with: .color(Color.white.opacity(0.15)))
            }

            // Moraine at bottom
            var moraine = Path()
            moraine.move(to: CGPoint(x: 0, y: size.height * 0.85))
            moraine.addLine(to: CGPoint(x: size.width, y: size.height * 0.88))
            moraine.addLine(to: CGPoint(x: size.width, y: size.height))
            moraine.addLine(to: CGPoint(x: 0, y: size.height))
            moraine.closeSubpath()
            context.fill(moraine, with: .color(Color(hex: "78716C").opacity(0.3)))
        }
        .allowsHitTesting(false)
    }
}
