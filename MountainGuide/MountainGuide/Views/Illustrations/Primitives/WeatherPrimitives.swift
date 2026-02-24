import SwiftUI

enum WeatherPrimitives {

    // MARK: - Rain

    static func rain(context: inout GraphicsContext, size: CGSize, intensity: Int = 20, angle: CGFloat = 0.1, seed: Int = 13) {
        var rng = SeededRNG(seed: UInt64(seed))
        let color = Color(hex: "93C5FD").opacity(0.5)

        for _ in 0..<intensity {
            let x = CGFloat.random(in: 0...size.width, using: &rng)
            let y = CGFloat.random(in: 0...size.height, using: &rng)
            let length = CGFloat.random(in: 8...16, using: &rng)
            let dx = angle * length

            context.stroke(
                Path { p in
                    p.move(to: CGPoint(x: x, y: y))
                    p.addLine(to: CGPoint(x: x + dx, y: y + length))
                },
                with: .color(color),
                lineWidth: 1
            )
        }
    }

    // MARK: - Lightning

    static func lightning(context: inout GraphicsContext, size: CGSize, startPoint: UnitPoint, length: CGFloat = 0.4) {
        let sx = startPoint.x * size.width
        let sy = startPoint.y * size.height
        let endY = sy + length * size.height

        var path = Path()
        path.move(to: CGPoint(x: sx, y: sy))

        var cy = sy
        var cx = sx
        let segments = 5
        let segLen = (endY - sy) / CGFloat(segments)

        for i in 0..<segments {
            let offset: CGFloat = (i % 2 == 0) ? 12 : -8
            cx += offset
            cy += segLen
            path.addLine(to: CGPoint(x: cx, y: cy))
        }

        // Glow
        context.stroke(path, with: .color(Color(hex: "FDE68A").opacity(0.4)), lineWidth: 6)
        context.stroke(path, with: .color(Color(hex: "FCD34D")), lineWidth: 2)
    }

    // MARK: - Wind Arrows

    static func windArrows(context: inout GraphicsContext, size: CGSize, direction: CGFloat = 0, count: Int = 4, yCenter: CGFloat = 0.4) {
        let arrowLen = size.width * 0.12
        let spacing = size.width * 0.18
        let startX = size.width * 0.15
        let y = yCenter * size.height

        for i in 0..<count {
            let x = startX + CGFloat(i) * spacing
            let opacity = 0.3 + Double(i) * 0.15

            let endX = x + cos(direction) * arrowLen
            let endY = y + sin(direction) * arrowLen

            var arrowPath = Path()
            arrowPath.move(to: CGPoint(x: x, y: y))
            arrowPath.addLine(to: CGPoint(x: endX, y: endY))

            // Arrowhead
            let headLen: CGFloat = 6
            let angle1 = direction + .pi * 0.8
            let angle2 = direction - .pi * 0.8
            arrowPath.addLine(to: CGPoint(x: endX + cos(angle1) * headLen, y: endY + sin(angle1) * headLen))
            arrowPath.move(to: CGPoint(x: endX, y: endY))
            arrowPath.addLine(to: CGPoint(x: endX + cos(angle2) * headLen, y: endY + sin(angle2) * headLen))

            context.stroke(arrowPath, with: .color(Color(hex: "60A5FA").opacity(opacity)), lineWidth: 2)
        }
    }

    // MARK: - Front Line (warm/cold)

    static func frontLine(context: inout GraphicsContext, size: CGSize, yPosition: CGFloat = 0.5, isWarm: Bool) {
        let y = yPosition * size.height
        let color = isWarm ? Color(hex: "EF4444") : Color(hex: "3B82F6")
        let symbolSpacing = size.width / 8

        // Base line
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: 0, y: y))
                p.addLine(to: CGPoint(x: size.width, y: y))
            },
            with: .color(color),
            lineWidth: 3
        )

        // Symbols along the line
        for i in 1..<8 {
            let x = CGFloat(i) * symbolSpacing
            if isWarm {
                // Semicircles above
                let arc = Path { p in
                    p.addArc(center: CGPoint(x: x, y: y), radius: 6, startAngle: .degrees(180), endAngle: .degrees(0), clockwise: false)
                }
                context.fill(arc, with: .color(color))
            } else {
                // Triangles below
                var tri = Path()
                tri.move(to: CGPoint(x: x - 5, y: y))
                tri.addLine(to: CGPoint(x: x, y: y + 10))
                tri.addLine(to: CGPoint(x: x + 5, y: y))
                tri.closeSubpath()
                context.fill(tri, with: .color(color))
            }
        }
    }

    // MARK: - Pressure Isobars

    static func isobars(context: inout GraphicsContext, size: CGSize, center: UnitPoint, count: Int = 4) {
        let cx = center.x * size.width
        let cy = center.y * size.height

        for i in 1...count {
            let r = CGFloat(i) * 25
            context.stroke(
                Path(ellipseIn: CGRect(x: cx - r, y: cy - r * 0.6, width: r * 2, height: r * 1.2)),
                with: .color(Color(hex: "6B7280").opacity(0.3 + Double(count - i) * 0.1)),
                lineWidth: 1
            )
        }

        // H or L label
        context.draw(
            Text("L").font(.mono(14, weight: .bold)).foregroundStyle(Color(hex: "EF4444")),
            at: CGPoint(x: cx, y: cy)
        )
    }

    // MARK: - Temperature Gradient (atmospheric layers)

    static func atmosphericLayers(context: inout GraphicsContext, size: CGSize, labels: [(name: String, color: Color, fraction: CGFloat)]) {
        var currentY: CGFloat = 0
        for layer in labels {
            let h = layer.fraction * size.height
            context.fill(
                Path(CGRect(x: 0, y: currentY, width: size.width, height: h)),
                with: .color(layer.color.opacity(0.3))
            )

            // Label
            context.draw(
                Text(layer.name).font(.mono(9, weight: .medium)).foregroundStyle(Color.textSecondary),
                at: CGPoint(x: size.width * 0.85, y: currentY + h / 2)
            )

            currentY += h
        }
    }

    // MARK: - Thermal Arrow (rising air)

    static func thermalArrow(context: inout GraphicsContext, size: CGSize, x: CGFloat, bottomY: CGFloat = 0.8, topY: CGFloat = 0.2) {
        let px = x * size.width
        let by = bottomY * size.height
        let ty = topY * size.height

        // Wavy upward arrow
        var path = Path()
        path.move(to: CGPoint(x: px, y: by))
        let segments = 6
        let segH = (by - ty) / CGFloat(segments)
        for i in 1...segments {
            let cy = by - CGFloat(i) * segH
            let wobble = sin(CGFloat(i) * 1.2) * 8
            path.addLine(to: CGPoint(x: px + wobble, y: cy))
        }

        context.stroke(path, with: .color(Color(hex: "F97316").opacity(0.6)), lineWidth: 2)

        // Arrowhead
        var head = Path()
        let finalX = px + sin(CGFloat(segments) * 1.2) * 8
        head.move(to: CGPoint(x: finalX - 6, y: ty + 8))
        head.addLine(to: CGPoint(x: finalX, y: ty))
        head.addLine(to: CGPoint(x: finalX + 6, y: ty + 8))
        context.stroke(head, with: .color(Color(hex: "F97316").opacity(0.6)), lineWidth: 2)
    }
}
