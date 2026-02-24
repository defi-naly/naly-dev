import SwiftUI

enum VegetationPrimitives {

    // MARK: - Conifer Tree

    static func coniferTree(context: inout GraphicsContext, size: CGSize, position: UnitPoint, scale: CGFloat = 1.0, color: Color = Color(hex: "2D5F3E")) {
        let x = position.x * size.width
        let baseY = position.y * size.height
        let h = 30 * scale
        let w = 14 * scale

        // Trunk
        context.fill(
            Path(CGRect(x: x - 2 * scale, y: baseY - h * 0.15, width: 4 * scale, height: h * 0.15)),
            with: .color(Color(hex: "78716C"))
        )

        // Triangle layers
        for i in 0..<3 {
            let layerY = baseY - h * 0.15 - CGFloat(i) * h * 0.25
            let layerW = w * (1.0 - CGFloat(i) * 0.2)
            var tri = Path()
            tri.move(to: CGPoint(x: x - layerW / 2, y: layerY))
            tri.addLine(to: CGPoint(x: x, y: layerY - h * 0.3))
            tri.addLine(to: CGPoint(x: x + layerW / 2, y: layerY))
            tri.closeSubpath()
            context.fill(tri, with: .color(color.opacity(1.0 - Double(i) * 0.1)))
        }
    }

    // MARK: - Tree Line (row of conifers)

    static func treeLine(context: inout GraphicsContext, size: CGSize, yPosition: CGFloat = 0.7, count: Int = 8, color: Color = Color(hex: "2D5F3E")) {
        let spacing = size.width / CGFloat(count + 1)
        var rng = SeededRNG(seed: 55)

        for i in 1...count {
            let x = CGFloat(i) * spacing + CGFloat.random(in: -5...5, using: &rng)
            let scale = CGFloat.random(in: 0.6...1.1, using: &rng)
            let yOff = CGFloat.random(in: -3...3, using: &rng)
            coniferTree(
                context: &context,
                size: size,
                position: UnitPoint(x: x / size.width, y: yPosition + yOff / size.height),
                scale: scale,
                color: color
            )
        }
    }

    // MARK: - Deciduous Tree

    static func deciduousTree(context: inout GraphicsContext, size: CGSize, position: UnitPoint, scale: CGFloat = 1.0) {
        let x = position.x * size.width
        let baseY = position.y * size.height
        let r = 12 * scale

        // Trunk
        context.fill(
            Path(CGRect(x: x - 2 * scale, y: baseY - r, width: 4 * scale, height: r)),
            with: .color(Color(hex: "92400E"))
        )

        // Crown
        context.fill(
            Path(ellipseIn: CGRect(x: x - r, y: baseY - r * 2.5, width: r * 2, height: r * 1.8)),
            with: .color(Color(hex: "4D7C5C"))
        )
    }

    // MARK: - Grass Tufts

    static func grassTufts(context: inout GraphicsContext, size: CGSize, yPosition: CGFloat = 0.85, count: Int = 15, seed: Int = 19) {
        var rng = SeededRNG(seed: UInt64(seed))
        let baseY = yPosition * size.height

        for _ in 0..<count {
            let x = CGFloat.random(in: 10...(size.width - 10), using: &rng)
            let bladeCount = Int.random(in: 3...5, using: &rng)

            for b in 0..<bladeCount {
                let angle = CGFloat.random(in: -0.4...0.4, using: &rng)
                let h = CGFloat.random(in: 6...12, using: &rng)
                let bx = x + CGFloat(b) * 2

                context.stroke(
                    Path { p in
                        p.move(to: CGPoint(x: bx, y: baseY))
                        p.addQuadCurve(
                            to: CGPoint(x: bx + sin(angle) * h, y: baseY - h),
                            control: CGPoint(x: bx + angle * 6, y: baseY - h * 0.6)
                        )
                    },
                    with: .color(Color(hex: "4D7C5C").opacity(0.6)),
                    lineWidth: 1.5
                )
            }
        }
    }

    // MARK: - Rock/Boulder

    static func rocks(context: inout GraphicsContext, size: CGSize, positions: [UnitPoint], scale: CGFloat = 1.0, color: Color = Color(hex: "78716C")) {
        for pos in positions {
            let x = pos.x * size.width
            let y = pos.y * size.height
            let w = 12 * scale
            let h = 8 * scale

            var path = Path()
            path.move(to: CGPoint(x: x - w / 2, y: y))
            path.addLine(to: CGPoint(x: x - w * 0.3, y: y - h))
            path.addLine(to: CGPoint(x: x + w * 0.2, y: y - h * 0.9))
            path.addLine(to: CGPoint(x: x + w / 2, y: y))
            path.closeSubpath()

            context.fill(path, with: .color(color))
        }
    }
}
