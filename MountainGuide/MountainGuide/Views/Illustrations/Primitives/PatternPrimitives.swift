import SwiftUI

enum PatternPrimitives {

    // MARK: - Contour Lines

    static func contourLines(context: inout GraphicsContext, size: CGSize, center: UnitPoint = .init(x: 0.5, y: 0.5), rings: Int = 6, color: Color = Color(hex: "6B7280").opacity(0.3)) {
        let cx = center.x * size.width
        let cy = center.y * size.height

        for i in 1...rings {
            let rx = CGFloat(i) * size.width * 0.07
            let ry = rx * 0.65
            context.stroke(
                Path(ellipseIn: CGRect(x: cx - rx, y: cy - ry, width: rx * 2, height: ry * 2)),
                with: .color(color),
                lineWidth: 1
            )
        }
    }

    // MARK: - Grid

    static func grid(context: inout GraphicsContext, size: CGSize, spacing: CGFloat = 30, color: Color = Color(hex: "E5E7EB").opacity(0.5)) {
        // Vertical
        for x in stride(from: CGFloat(0), through: size.width, by: spacing) {
            context.stroke(
                Path { p in
                    p.move(to: CGPoint(x: x, y: 0))
                    p.addLine(to: CGPoint(x: x, y: size.height))
                },
                with: .color(color),
                lineWidth: 0.5
            )
        }
        // Horizontal
        for y in stride(from: CGFloat(0), through: size.height, by: spacing) {
            context.stroke(
                Path { p in
                    p.move(to: CGPoint(x: 0, y: y))
                    p.addLine(to: CGPoint(x: size.width, y: y))
                },
                with: .color(color),
                lineWidth: 0.5
            )
        }
    }

    // MARK: - Hatching (diagonal lines for shadow/terrain)

    static func hatching(context: inout GraphicsContext, size: CGSize, region: CGRect? = nil, angle: CGFloat = 0.785, spacing: CGFloat = 6, color: Color = Color(hex: "9CA3AF").opacity(0.3)) {
        let area = region ?? CGRect(origin: .zero, size: size)
        let lineLen = max(area.width, area.height) * 2

        context.clipToLayer { clipCtx in
            clipCtx.fill(Path(area), with: .color(.white))
        }

        for offset in stride(from: -lineLen, through: lineLen, by: spacing) {
            let startX = area.midX + cos(angle + .pi / 2) * offset
            let startY = area.midY + sin(angle + .pi / 2) * offset

            context.stroke(
                Path { p in
                    p.move(to: CGPoint(x: startX - cos(angle) * lineLen, y: startY - sin(angle) * lineLen))
                    p.addLine(to: CGPoint(x: startX + cos(angle) * lineLen, y: startY + sin(angle) * lineLen))
                },
                with: .color(color),
                lineWidth: 0.8
            )
        }
    }

    // MARK: - Gradient Overlay

    static func gradientOverlay(context: inout GraphicsContext, size: CGSize, colors: [Color], direction: GradientDirection = .topToBottom) {
        let gradient = Gradient(colors: colors)
        let start: CGPoint
        let end: CGPoint

        switch direction {
        case .topToBottom:
            start = .zero
            end = CGPoint(x: 0, y: size.height)
        case .bottomToTop:
            start = CGPoint(x: 0, y: size.height)
            end = .zero
        case .leftToRight:
            start = .zero
            end = CGPoint(x: size.width, y: 0)
        }

        context.fill(
            Path(CGRect(origin: .zero, size: size)),
            with: .linearGradient(gradient, startPoint: start, endPoint: end)
        )
    }

    enum GradientDirection {
        case topToBottom, bottomToTop, leftToRight
    }

    // MARK: - Scale Bar

    static func scaleBar(context: inout GraphicsContext, size: CGSize, position: UnitPoint = .init(x: 0.5, y: 0.9), label: String = "1 km") {
        let x = position.x * size.width
        let y = position.y * size.height
        let barW: CGFloat = 60
        let barH: CGFloat = 4

        context.fill(
            Path(CGRect(x: x - barW / 2, y: y, width: barW, height: barH)),
            with: .color(Color(hex: "374151"))
        )

        // End caps
        for dx: CGFloat in [-barW / 2, barW / 2] {
            context.stroke(
                Path { p in
                    p.move(to: CGPoint(x: x + dx, y: y - 2))
                    p.addLine(to: CGPoint(x: x + dx, y: y + barH + 2))
                },
                with: .color(Color(hex: "374151")),
                lineWidth: 1.5
            )
        }

        context.draw(
            Text(label).font(.system(size: 8, weight: .medium, design: .monospaced)).foregroundStyle(Color.textSecondary),
            at: CGPoint(x: x, y: y + barH + 10)
        )
    }

    // MARK: - Angle Indicator

    static func angleIndicator(context: inout GraphicsContext, size: CGSize, position: UnitPoint, degrees: Int, color: Color = Color(hex: "EF4444")) {
        let x = position.x * size.width
        let y = position.y * size.height
        let r: CGFloat = 20

        // Arc
        let startAngle = Angle.degrees(-180)
        let endAngle = Angle.degrees(Double(-180 + degrees))

        context.stroke(
            Path { p in
                p.addArc(center: CGPoint(x: x, y: y), radius: r, startAngle: startAngle, endAngle: .degrees(0), clockwise: false)
            },
            with: .color(Color(hex: "6B7280").opacity(0.3)),
            lineWidth: 1.5
        )

        context.stroke(
            Path { p in
                p.addArc(center: CGPoint(x: x, y: y), radius: r, startAngle: startAngle, endAngle: endAngle, clockwise: false)
            },
            with: .color(color),
            lineWidth: 2
        )

        context.draw(
            Text("\(degrees)°").font(.system(size: 9, weight: .bold, design: .monospaced)).foregroundStyle(color),
            at: CGPoint(x: x, y: y - r - 10)
        )
    }

    // MARK: - Dashed Path

    static func dashedPath(context: inout GraphicsContext, size: CGSize, points: [UnitPoint], color: Color = Color(hex: "6B7280"), dashPattern: [CGFloat] = [6, 4]) {
        guard points.count >= 2 else { return }
        var path = Path()
        path.move(to: CGPoint(x: points[0].x * size.width, y: points[0].y * size.height))
        for pt in points.dropFirst() {
            path.addLine(to: CGPoint(x: pt.x * size.width, y: pt.y * size.height))
        }
        context.stroke(path, with: .color(color), style: StrokeStyle(lineWidth: 2, dash: dashPattern))
    }
}
