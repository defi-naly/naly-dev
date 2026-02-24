import SwiftUI

enum SnowPrimitives {

    // MARK: - Snowpack Layer

    static func snowpackLayer(context: inout GraphicsContext, size: CGSize, yRange: ClosedRange<CGFloat> = 0.3...0.7, layerColors: [Color]? = nil) {
        let topY = yRange.lowerBound * size.height
        let bottomY = yRange.upperBound * size.height
        let colors = layerColors ?? [
            Color(hex: "F9FAFB"),
            Color(hex: "E5E7EB"),
            Color(hex: "D1D5DB"),
            Color(hex: "F3F4F6"),
            Color(hex: "E5E7EB"),
        ]
        let layerHeight = (bottomY - topY) / CGFloat(colors.count)

        for (i, color) in colors.enumerated() {
            let ly = topY + CGFloat(i) * layerHeight
            context.fill(
                Path(CGRect(x: 0, y: ly, width: size.width, height: layerHeight + 1)),
                with: .color(color)
            )
        }
    }

    // MARK: - Weak Layer (highlighted)

    static func weakLayer(context: inout GraphicsContext, size: CGSize, yPosition: CGFloat = 0.5, color: Color = Color(hex: "FCA5A5")) {
        let y = yPosition * size.height
        let h: CGFloat = 4

        // Wavy line for weak layer
        var path = Path()
        path.move(to: CGPoint(x: 0, y: y))
        for x in stride(from: 0, through: Int(size.width), by: 8) {
            let cx = CGFloat(x)
            let wy = y + sin(cx * 0.2) * 2
            path.addLine(to: CGPoint(x: cx, y: wy))
        }
        path.addLine(to: CGPoint(x: size.width, y: y + h))
        path.addLine(to: CGPoint(x: 0, y: y + h))
        path.closeSubpath()

        context.fill(path, with: .color(color))
    }

    // MARK: - Slab

    static func slab(context: inout GraphicsContext, size: CGSize, topY: CGFloat = 0.3, bottomY: CGFloat = 0.5, angle: CGFloat = 0.15) {
        let tl = CGPoint(x: 0, y: topY * size.height)
        let tr = CGPoint(x: size.width, y: (topY + angle) * size.height)
        let br = CGPoint(x: size.width, y: (bottomY + angle) * size.height)
        let bl = CGPoint(x: 0, y: bottomY * size.height)

        var path = Path()
        path.move(to: tl)
        path.addLine(to: tr)
        path.addLine(to: br)
        path.addLine(to: bl)
        path.closeSubpath()

        context.fill(path, with: .color(Color(hex: "DBEAFE").opacity(0.7)))

        // Fracture line
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: 0, y: bottomY * size.height))
                p.addLine(to: CGPoint(x: size.width, y: (bottomY + angle) * size.height))
            },
            with: .color(Color(hex: "EF4444").opacity(0.6)),
            style: StrokeStyle(lineWidth: 2, dash: [6, 4])
        )
    }

    // MARK: - Snow Crystals

    static func snowCrystals(context: inout GraphicsContext, size: CGSize, count: Int = 12, region: CGRect? = nil, seed: Int = 7) {
        var rng = SeededRNG(seed: UInt64(seed))
        let area = region ?? CGRect(origin: .zero, size: size)

        for _ in 0..<count {
            let x = CGFloat.random(in: area.minX...area.maxX, using: &rng)
            let y = CGFloat.random(in: area.minY...area.maxY, using: &rng)
            let r = CGFloat.random(in: 3...6, using: &rng)
            snowflakeSymbol(context: &context, center: CGPoint(x: x, y: y), radius: r)
        }
    }

    private static func snowflakeSymbol(context: inout GraphicsContext, center: CGPoint, radius: CGFloat) {
        let color = Color.white.opacity(0.8)
        // Simple 6-armed star
        for i in 0..<6 {
            let angle = CGFloat(i) * .pi / 3
            let endX = center.x + cos(angle) * radius
            let endY = center.y + sin(angle) * radius
            context.stroke(
                Path { p in
                    p.move(to: center)
                    p.addLine(to: CGPoint(x: endX, y: endY))
                },
                with: .color(color),
                lineWidth: 1
            )
        }
    }

    // MARK: - Avalanche Debris

    static func avalancheDebris(context: inout GraphicsContext, size: CGSize, startPoint: UnitPoint = .init(x: 0.5, y: 0.3), endPoint: UnitPoint = .init(x: 0.5, y: 0.9), width: CGFloat = 0.4) {
        let sx = startPoint.x * size.width
        let sy = startPoint.y * size.height
        let ex = endPoint.x * size.width
        let ey = endPoint.y * size.height
        let w = width * size.width

        var path = Path()
        path.move(to: CGPoint(x: sx, y: sy))
        path.addLine(to: CGPoint(x: ex - w * 0.5, y: ey))
        path.addQuadCurve(
            to: CGPoint(x: ex + w * 0.5, y: ey),
            control: CGPoint(x: ex, y: ey + 20)
        )
        path.closeSubpath()

        context.fill(path, with: .color(Color(hex: "E5E7EB").opacity(0.8)))

        // Debris chunks
        var rng = SeededRNG(seed: 31)
        for _ in 0..<8 {
            let bx = CGFloat.random(in: (ex - w * 0.3)...(ex + w * 0.3), using: &rng)
            let by = CGFloat.random(in: (ey - 30)...ey, using: &rng)
            let bs = CGFloat.random(in: 3...8, using: &rng)
            context.fill(
                Path(roundedRect: CGRect(x: bx, y: by, width: bs, height: bs * 0.7), cornerRadius: 2),
                with: .color(Color(hex: "D1D5DB"))
            )
        }
    }

    // MARK: - Snow Surface

    static func snowSurface(context: inout GraphicsContext, size: CGSize, yPosition: CGFloat = 0.6) {
        let y = yPosition * size.height
        var path = Path()
        path.move(to: CGPoint(x: 0, y: y))

        // Gentle undulations
        let steps = 10
        for i in 0...steps {
            let x = size.width * CGFloat(i) / CGFloat(steps)
            let wiggle = sin(CGFloat(i) * 0.9) * 4 + cos(CGFloat(i) * 1.5) * 2
            path.addLine(to: CGPoint(x: x, y: y + wiggle))
        }
        path.addLine(to: CGPoint(x: size.width, y: size.height))
        path.addLine(to: CGPoint(x: 0, y: size.height))
        path.closeSubpath()

        context.fill(path, with: .color(Color(hex: "F9FAFB")))
    }

    // MARK: - Wind-Loaded Snow

    static func windLoadedSnow(context: inout GraphicsContext, size: CGSize, side: Edge = .trailing) {
        let isRight = side == .trailing
        let startX = isRight ? size.width * 0.6 : 0
        let endX = isRight ? size.width : size.width * 0.4

        var path = Path()
        path.move(to: CGPoint(x: startX, y: size.height * 0.3))
        path.addQuadCurve(
            to: CGPoint(x: endX, y: size.height * 0.35),
            control: CGPoint(x: (startX + endX) / 2, y: size.height * 0.25)
        )
        path.addLine(to: CGPoint(x: endX, y: size.height * 0.5))
        path.addLine(to: CGPoint(x: startX, y: size.height * 0.45))
        path.closeSubpath()

        context.fill(path, with: .color(Color(hex: "DBEAFE").opacity(0.6)))
    }
}
