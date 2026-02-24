import SwiftUI

enum EquipmentPrimitives {

    // MARK: - Rope

    static func rope(context: inout GraphicsContext, size: CGSize, points: [UnitPoint], color: Color = Color(hex: "D97706"), lineWidth: CGFloat = 3) {
        guard points.count >= 2 else { return }

        var path = Path()
        let first = points[0]
        path.move(to: CGPoint(x: first.x * size.width, y: first.y * size.height))

        if points.count == 2 {
            let last = points[1]
            path.addLine(to: CGPoint(x: last.x * size.width, y: last.y * size.height))
        } else {
            for i in 1..<points.count {
                let pt = points[i]
                path.addLine(to: CGPoint(x: pt.x * size.width, y: pt.y * size.height))
            }
        }

        context.stroke(path, with: .color(color), lineWidth: lineWidth)
    }

    // MARK: - Curved Rope (catenary-like)

    static func curvedRope(context: inout GraphicsContext, size: CGSize, start: UnitPoint, end: UnitPoint, sag: CGFloat = 0.1, color: Color = Color(hex: "D97706")) {
        let sp = CGPoint(x: start.x * size.width, y: start.y * size.height)
        let ep = CGPoint(x: end.x * size.width, y: end.y * size.height)
        let midX = (sp.x + ep.x) / 2
        let midY = max(sp.y, ep.y) + sag * size.height

        var path = Path()
        path.move(to: sp)
        path.addQuadCurve(to: ep, control: CGPoint(x: midX, y: midY))

        context.stroke(path, with: .color(color), lineWidth: 3)
    }

    // MARK: - Carabiner

    static func carabiner(context: inout GraphicsContext, size: CGSize, position: UnitPoint, scale: CGFloat = 1.0, color: Color = Color(hex: "9CA3AF")) {
        let x = position.x * size.width
        let y = position.y * size.height
        let w = 10 * scale
        let h = 18 * scale

        // D-shape
        var path = Path()
        path.addRoundedRect(in: CGRect(x: x - w / 2, y: y - h / 2, width: w, height: h), cornerSize: CGSize(width: w * 0.4, height: w * 0.4))

        context.stroke(path, with: .color(color), lineWidth: 2.5 * scale)

        // Gate line
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: x + w / 2, y: y - h * 0.3))
                p.addLine(to: CGPoint(x: x + w / 2, y: y + h * 0.25))
            },
            with: .color(color.opacity(0.5)),
            lineWidth: 1.5 * scale
        )
    }

    // MARK: - Compass Rose

    static func compassRose(context: inout GraphicsContext, size: CGSize, center: UnitPoint, radius: CGFloat = 0.12) {
        let cx = center.x * size.width
        let cy = center.y * size.height
        let r = radius * min(size.width, size.height)

        // Outer ring
        context.stroke(
            Path(ellipseIn: CGRect(x: cx - r, y: cy - r, width: r * 2, height: r * 2)),
            with: .color(Color(hex: "6B7280").opacity(0.5)),
            lineWidth: 1.5
        )

        // Cardinal lines
        let directions: [(dx: CGFloat, dy: CGFloat, label: String)] = [
            (0, -1, "N"), (1, 0, "E"), (0, 1, "S"), (-1, 0, "W")
        ]
        for dir in directions {
            let endX = cx + dir.dx * r * 0.85
            let endY = cy + dir.dy * r * 0.85
            context.stroke(
                Path { p in
                    p.move(to: CGPoint(x: cx, y: cy))
                    p.addLine(to: CGPoint(x: endX, y: endY))
                },
                with: .color(dir.label == "N" ? Color(hex: "EF4444") : Color(hex: "6B7280")),
                lineWidth: dir.label == "N" ? 2.5 : 1.5
            )

            // Label
            let labelX = cx + dir.dx * r * 1.15
            let labelY = cy + dir.dy * r * 1.15
            context.draw(
                Text(dir.label).font(.system(size: 9, weight: .bold, design: .monospaced)).foregroundStyle(Color.textSecondary),
                at: CGPoint(x: labelX, y: labelY)
            )
        }
    }

    // MARK: - First Aid Cross

    static func firstAidCross(context: inout GraphicsContext, size: CGSize, center: UnitPoint, crossSize: CGFloat = 0.1, color: Color = Color(hex: "DC2626")) {
        let cx = center.x * size.width
        let cy = center.y * size.height
        let s = crossSize * min(size.width, size.height)
        let arm = s * 0.3

        var path = Path()
        // Vertical bar
        path.addRect(CGRect(x: cx - arm / 2, y: cy - s / 2, width: arm, height: s))
        // Horizontal bar
        path.addRect(CGRect(x: cx - s / 2, y: cy - arm / 2, width: s, height: arm))

        context.fill(path, with: .color(color))
    }

    // MARK: - Ice Axe

    static func iceAxe(context: inout GraphicsContext, size: CGSize, position: UnitPoint, angle: CGFloat = -0.3, scale: CGFloat = 1.0) {
        let x = position.x * size.width
        let y = position.y * size.height
        let length = 40 * scale

        // Shaft
        let endX = x + cos(angle) * length
        let endY = y + sin(angle) * length

        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: x, y: y))
                p.addLine(to: CGPoint(x: endX, y: endY))
            },
            with: .color(Color(hex: "78716C")),
            lineWidth: 2.5
        )

        // Pick head
        let pickAngle = angle - .pi / 4
        let pickLen = 12 * scale
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: x, y: y))
                p.addLine(to: CGPoint(x: x + cos(pickAngle) * pickLen, y: y + sin(pickAngle) * pickLen))
            },
            with: .color(Color(hex: "4B5563")),
            lineWidth: 3
        )
    }

    // MARK: - Backpack

    static func backpack(context: inout GraphicsContext, size: CGSize, position: UnitPoint, scale: CGFloat = 1.0, color: Color = Color(hex: "1E40AF")) {
        let x = position.x * size.width
        let y = position.y * size.height
        let w = 16 * scale
        let h = 22 * scale

        // Main body
        context.fill(
            Path(roundedRect: CGRect(x: x - w / 2, y: y - h / 2, width: w, height: h), cornerSize: CGSize(width: 4, height: 4)),
            with: .color(color)
        )

        // Top flap
        context.fill(
            Path(roundedRect: CGRect(x: x - w * 0.55, y: y - h * 0.55, width: w * 1.1, height: h * 0.2), cornerSize: CGSize(width: 3, height: 3)),
            with: .color(color.opacity(0.8))
        )
    }
}
