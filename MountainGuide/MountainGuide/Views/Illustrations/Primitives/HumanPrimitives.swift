import SwiftUI

enum HumanPrimitives {

    // MARK: - Stick Figure

    static func stickFigure(context: inout GraphicsContext, size: CGSize, position: UnitPoint, scale: CGFloat = 1.0, color: Color = Color(hex: "374151"), action: FigureAction = .standing) {
        let x = position.x * size.width
        let baseY = position.y * size.height
        let s = scale

        let headR = 4 * s
        let bodyLen = 16 * s
        let limbLen = 12 * s

        // Head
        context.stroke(
            Path(ellipseIn: CGRect(x: x - headR, y: baseY - bodyLen - headR * 2, width: headR * 2, height: headR * 2)),
            with: .color(color),
            lineWidth: 1.5
        )

        // Body
        let neckY = baseY - bodyLen
        let hipY = baseY

        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: x, y: neckY))
                p.addLine(to: CGPoint(x: x, y: hipY))
            },
            with: .color(color),
            lineWidth: 1.5
        )

        // Arms and legs based on action
        switch action {
        case .standing:
            // Arms down
            drawLimbs(context: &context, origin: CGPoint(x: x, y: neckY + bodyLen * 0.2),
                       leftEnd: CGPoint(x: x - limbLen * 0.5, y: neckY + bodyLen * 0.6),
                       rightEnd: CGPoint(x: x + limbLen * 0.5, y: neckY + bodyLen * 0.6),
                       color: color, lineWidth: 1.5)
            // Legs
            drawLimbs(context: &context, origin: hipY == baseY ? CGPoint(x: x, y: hipY) : CGPoint(x: x, y: hipY),
                       leftEnd: CGPoint(x: x - limbLen * 0.4, y: hipY + limbLen),
                       rightEnd: CGPoint(x: x + limbLen * 0.4, y: hipY + limbLen),
                       color: color, lineWidth: 1.5)

        case .walking:
            // Arms swinging
            drawLimbs(context: &context, origin: CGPoint(x: x, y: neckY + bodyLen * 0.2),
                       leftEnd: CGPoint(x: x - limbLen * 0.6, y: neckY + bodyLen * 0.5),
                       rightEnd: CGPoint(x: x + limbLen * 0.3, y: neckY + bodyLen * 0.6),
                       color: color, lineWidth: 1.5)
            // Legs stride
            drawLimbs(context: &context, origin: CGPoint(x: x, y: hipY),
                       leftEnd: CGPoint(x: x - limbLen * 0.5, y: hipY + limbLen),
                       rightEnd: CGPoint(x: x + limbLen * 0.5, y: hipY + limbLen * 0.9),
                       color: color, lineWidth: 1.5)

        case .climbing:
            // Arms reaching up
            drawLimbs(context: &context, origin: CGPoint(x: x, y: neckY + bodyLen * 0.15),
                       leftEnd: CGPoint(x: x - limbLen * 0.3, y: neckY - limbLen * 0.5),
                       rightEnd: CGPoint(x: x + limbLen * 0.5, y: neckY - limbLen * 0.3),
                       color: color, lineWidth: 1.5)
            // Legs spread on holds
            drawLimbs(context: &context, origin: CGPoint(x: x, y: hipY),
                       leftEnd: CGPoint(x: x - limbLen * 0.6, y: hipY + limbLen * 0.5),
                       rightEnd: CGPoint(x: x + limbLen * 0.4, y: hipY + limbLen * 0.7),
                       color: color, lineWidth: 1.5)

        case .kneeling:
            // Arms forward
            drawLimbs(context: &context, origin: CGPoint(x: x, y: neckY + bodyLen * 0.2),
                       leftEnd: CGPoint(x: x + limbLen * 0.5, y: neckY + bodyLen * 0.3),
                       rightEnd: CGPoint(x: x + limbLen * 0.6, y: neckY + bodyLen * 0.4),
                       color: color, lineWidth: 1.5)
            // Kneeling legs
            drawLimbs(context: &context, origin: CGPoint(x: x, y: hipY),
                       leftEnd: CGPoint(x: x - limbLen * 0.2, y: hipY + limbLen * 0.3),
                       rightEnd: CGPoint(x: x + limbLen * 0.3, y: hipY + limbLen * 0.3),
                       color: color, lineWidth: 1.5)
        }
    }

    enum FigureAction {
        case standing, walking, climbing, kneeling
    }

    private static func drawLimbs(context: inout GraphicsContext, origin: CGPoint, leftEnd: CGPoint, rightEnd: CGPoint, color: Color, lineWidth: CGFloat) {
        context.stroke(
            Path { p in
                p.move(to: origin)
                p.addLine(to: leftEnd)
                p.move(to: origin)
                p.addLine(to: rightEnd)
            },
            with: .color(color),
            lineWidth: lineWidth
        )
    }

    // MARK: - Silhouette

    static func silhouette(context: inout GraphicsContext, size: CGSize, position: UnitPoint, scale: CGFloat = 1.0, color: Color = Color(hex: "1F2937")) {
        let x = position.x * size.width
        let baseY = position.y * size.height
        let h = 30 * scale
        let w = 10 * scale

        // Simple oval body
        context.fill(
            Path(ellipseIn: CGRect(x: x - w / 2, y: baseY - h, width: w, height: h * 0.7)),
            with: .color(color)
        )
        // Head
        let headR = 4 * scale
        context.fill(
            Path(ellipseIn: CGRect(x: x - headR, y: baseY - h - headR * 1.5, width: headR * 2, height: headR * 2)),
            with: .color(color)
        )
        // Legs
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: x - 2 * scale, y: baseY - h * 0.3))
                p.addLine(to: CGPoint(x: x - w * 0.4, y: baseY))
                p.move(to: CGPoint(x: x + 2 * scale, y: baseY - h * 0.3))
                p.addLine(to: CGPoint(x: x + w * 0.4, y: baseY))
            },
            with: .color(color),
            lineWidth: 2
        )
    }

    // MARK: - Rope Team (multiple figures connected)

    static func ropeTeam(context: inout GraphicsContext, size: CGSize, positions: [UnitPoint], ropeColor: Color = Color(hex: "D97706")) {
        // Draw rope between figures
        if positions.count >= 2 {
            for i in 0..<(positions.count - 1) {
                let start = positions[i]
                let end = positions[i + 1]
                EquipmentPrimitives.curvedRope(
                    context: &context,
                    size: size,
                    start: start,
                    end: end,
                    sag: 0.03,
                    color: ropeColor
                )
            }
        }

        // Draw figures
        for pos in positions {
            silhouette(context: &context, size: size, position: pos, scale: 0.8)
        }
    }

    // MARK: - Injured Person (lying down)

    static func injuredPerson(context: inout GraphicsContext, size: CGSize, position: UnitPoint, scale: CGFloat = 1.0) {
        let x = position.x * size.width
        let y = position.y * size.height
        let w = 30 * scale
        let h = 8 * scale

        // Lying body
        context.fill(
            Path(roundedRect: CGRect(x: x - w / 2, y: y - h / 2, width: w, height: h), cornerSize: CGSize(width: 3, height: 3)),
            with: .color(Color(hex: "374151").opacity(0.7))
        )
        // Head
        context.fill(
            Path(ellipseIn: CGRect(x: x - w / 2 - 6 * scale, y: y - 4 * scale, width: 8 * scale, height: 8 * scale)),
            with: .color(Color(hex: "374151").opacity(0.7))
        )
    }
}
