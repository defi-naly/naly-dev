import SwiftUI

struct MapContourScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        Canvas { context, size in
            // Parchment-like map background
            let bg = Path(roundedRect: CGRect(origin: .zero, size: size), cornerRadius: 0)
            context.fill(bg, with: .color(Color(hex: "1a1a2e")))

            // Contour lines — concentric rounded shapes representing a summit
            let center = CGPoint(x: size.width * 0.45, y: size.height * 0.4)
            for i in 0..<7 {
                let r = CGFloat(12 + i * 14)
                let skewX: CGFloat = CGFloat(i) * 3
                let skewY: CGFloat = CGFloat(i) * 2
                let rect = CGRect(
                    x: center.x - r + skewX,
                    y: center.y - r * 0.7 + skewY,
                    width: r * 2,
                    height: r * 1.4
                )
                let contour = Path(ellipseIn: rect)
                let opacity = i % 5 == 0 ? 0.5 : 0.25
                let lineWidth: CGFloat = i % 5 == 0 ? 1.2 : 0.6
                context.stroke(contour, with: .color(Color(hex: "8B5CF6").opacity(opacity)), lineWidth: lineWidth)
            }

            // Summit marker
            let summitDot = Path(ellipseIn: CGRect(x: center.x - 3, y: center.y - 3, width: 6, height: 6))
            context.fill(summitDot, with: .color(Color(hex: "8B5CF6").opacity(0.7)))

            // A stream line (blue)
            var stream = Path()
            stream.move(to: CGPoint(x: size.width * 0.7, y: size.height * 0.1))
            stream.addQuadCurve(
                to: CGPoint(x: size.width * 0.65, y: size.height * 0.5),
                control: CGPoint(x: size.width * 0.75, y: size.height * 0.3)
            )
            stream.addQuadCurve(
                to: CGPoint(x: size.width * 0.6, y: size.height * 0.9),
                control: CGPoint(x: size.width * 0.55, y: size.height * 0.7)
            )
            context.stroke(stream, with: .color(Color.diagramCyan.opacity(0.4)), lineWidth: 1.5)

            // Compass rose (top right)
            let crX = size.width * 0.85
            let crY = size.height * 0.15
            let crSize: CGFloat = 12

            // N-S line
            var ns = Path()
            ns.move(to: CGPoint(x: crX, y: crY - crSize))
            ns.addLine(to: CGPoint(x: crX, y: crY + crSize))
            context.stroke(ns, with: .color(Color.textMuted.opacity(0.5)), lineWidth: 1)

            // E-W line
            var ew = Path()
            ew.move(to: CGPoint(x: crX - crSize, y: crY))
            ew.addLine(to: CGPoint(x: crX + crSize, y: crY))
            context.stroke(ew, with: .color(Color.textMuted.opacity(0.5)), lineWidth: 1)

            // N arrow
            var nArrow = Path()
            nArrow.move(to: CGPoint(x: crX - 3, y: crY - crSize + 4))
            nArrow.addLine(to: CGPoint(x: crX, y: crY - crSize))
            nArrow.addLine(to: CGPoint(x: crX + 3, y: crY - crSize + 4))
            context.stroke(nArrow, with: .color(Color.danger.opacity(0.6)), lineWidth: 1.5)

            // Grid lines
            for i in 1..<4 {
                let y = size.height * CGFloat(i) / 4
                var hLine = Path()
                hLine.move(to: CGPoint(x: 0, y: y))
                hLine.addLine(to: CGPoint(x: size.width, y: y))
                context.stroke(hLine, with: .color(Color.terminalBorder.opacity(0.2)), lineWidth: 0.3)
            }
            for i in 1..<4 {
                let x = size.width * CGFloat(i) / 4
                var vLine = Path()
                vLine.move(to: CGPoint(x: x, y: 0))
                vLine.addLine(to: CGPoint(x: x, y: size.height))
                context.stroke(vLine, with: .color(Color.terminalBorder.opacity(0.2)), lineWidth: 0.3)
            }
        }
        .allowsHitTesting(false)
    }
}
