import SwiftUI

enum TerrainStyle {
    case silhouette, snowCapped, rocky, grassy, glacial
}

enum TerrainPrimitives {

    // MARK: - Mountain Range

    static func mountainRange(context: inout GraphicsContext, size: CGSize, peaks: [(x: CGFloat, y: CGFloat)], style: TerrainStyle, color: Color? = nil) {
        var path = Path()
        path.move(to: CGPoint(x: 0, y: size.height))

        // Start from bottom-left
        let firstPeak = peaks.first ?? (x: 0.1, y: 0.5)
        path.addLine(to: CGPoint(x: firstPeak.x * size.width, y: firstPeak.y * size.height))

        for peak in peaks.dropFirst() {
            path.addLine(to: CGPoint(x: peak.x * size.width, y: peak.y * size.height))
        }

        path.addLine(to: CGPoint(x: size.width, y: size.height))
        path.closeSubpath()

        let fillColor: Color
        switch style {
        case .silhouette:
            fillColor = color ?? Color(hex: "374151")
        case .snowCapped:
            fillColor = color ?? Color(hex: "6B7280")
        case .rocky:
            fillColor = color ?? Color(hex: "78716C")
        case .grassy:
            fillColor = color ?? Color(hex: "4D7C5C")
        case .glacial:
            fillColor = color ?? Color(hex: "94A3B8")
        }

        context.fill(path, with: .color(fillColor))

        // Snow caps for snowCapped style
        if style == .snowCapped {
            for peak in peaks where peak.y < 0.5 {
                snowCap(context: &context, size: size, peakX: peak.x, peakY: peak.y, width: 0.08)
            }
        }
    }

    // MARK: - Single Peak

    static func singlePeak(context: inout GraphicsContext, size: CGSize, peakX: CGFloat = 0.5, peakY: CGFloat = 0.2, baseWidth: CGFloat = 0.6, color: Color = Color(hex: "6B7280")) {
        let px = peakX * size.width
        let py = peakY * size.height
        let hw = baseWidth * size.width * 0.5

        var path = Path()
        path.move(to: CGPoint(x: px - hw, y: size.height))
        path.addLine(to: CGPoint(x: px - hw * 0.3, y: size.height * 0.7))
        path.addLine(to: CGPoint(x: px, y: py))
        path.addLine(to: CGPoint(x: px + hw * 0.3, y: size.height * 0.65))
        path.addLine(to: CGPoint(x: px + hw, y: size.height))
        path.closeSubpath()

        context.fill(path, with: .color(color))
    }

    // MARK: - Snow Cap

    static func snowCap(context: inout GraphicsContext, size: CGSize, peakX: CGFloat, peakY: CGFloat, width: CGFloat = 0.08) {
        let px = peakX * size.width
        let py = peakY * size.height
        let w = width * size.width

        var path = Path()
        path.move(to: CGPoint(x: px, y: py))
        path.addLine(to: CGPoint(x: px - w, y: py + w * 1.2))
        path.addQuadCurve(
            to: CGPoint(x: px + w, y: py + w * 1.0),
            control: CGPoint(x: px, y: py + w * 0.8)
        )
        path.closeSubpath()

        context.fill(path, with: .color(.white.opacity(0.9)))
    }

    // MARK: - Ridgeline

    static func ridgeline(context: inout GraphicsContext, size: CGSize, yPosition: CGFloat = 0.6, color: Color = Color(hex: "9CA3AF"), amplitude: CGFloat = 0.05) {
        var path = Path()
        let y = yPosition * size.height
        let amp = amplitude * size.height

        path.move(to: CGPoint(x: 0, y: y))
        let segments = 12
        for i in 0...segments {
            let x = size.width * CGFloat(i) / CGFloat(segments)
            let offset = sin(CGFloat(i) * 0.8) * amp + cos(CGFloat(i) * 1.3) * amp * 0.5
            path.addLine(to: CGPoint(x: x, y: y - offset))
        }
        path.addLine(to: CGPoint(x: size.width, y: size.height))
        path.addLine(to: CGPoint(x: 0, y: size.height))
        path.closeSubpath()

        context.fill(path, with: .color(color))
    }

    // MARK: - Valley

    static func valley(context: inout GraphicsContext, size: CGSize, color: Color = Color(hex: "4D7C5C").opacity(0.6)) {
        var path = Path()
        path.move(to: CGPoint(x: 0, y: size.height * 0.7))
        path.addQuadCurve(
            to: CGPoint(x: size.width, y: size.height * 0.65),
            control: CGPoint(x: size.width * 0.5, y: size.height * 0.85)
        )
        path.addLine(to: CGPoint(x: size.width, y: size.height))
        path.addLine(to: CGPoint(x: 0, y: size.height))
        path.closeSubpath()

        context.fill(path, with: .color(color))
    }

    // MARK: - Slope

    static func slope(context: inout GraphicsContext, size: CGSize, startY: CGFloat = 0.4, endY: CGFloat = 0.8, color: Color = Color(hex: "9CA3AF")) {
        var path = Path()
        path.move(to: CGPoint(x: 0, y: startY * size.height))
        path.addLine(to: CGPoint(x: size.width, y: endY * size.height))
        path.addLine(to: CGPoint(x: size.width, y: size.height))
        path.addLine(to: CGPoint(x: 0, y: size.height))
        path.closeSubpath()

        context.fill(path, with: .color(color))
    }

    // MARK: - Glacier Surface

    static func glacierSurface(context: inout GraphicsContext, size: CGSize, yPosition: CGFloat = 0.5, color: Color = Color(hex: "BFDBFE")) {
        var path = Path()
        let y = yPosition * size.height

        path.move(to: CGPoint(x: 0, y: y + 10))
        for i in stride(from: 0, through: Int(size.width), by: 20) {
            let x = CGFloat(i)
            let wiggle = sin(x * 0.03) * 5 + cos(x * 0.05) * 3
            path.addLine(to: CGPoint(x: x, y: y + wiggle))
        }
        path.addLine(to: CGPoint(x: size.width, y: size.height))
        path.addLine(to: CGPoint(x: 0, y: size.height))
        path.closeSubpath()

        context.fill(path, with: .color(color))
    }

    // MARK: - Cliff Band

    static func cliffBand(context: inout GraphicsContext, size: CGSize, yRange: ClosedRange<CGFloat> = 0.4...0.5, color: Color = Color(hex: "78716C")) {
        let topY = yRange.lowerBound * size.height
        let bottomY = yRange.upperBound * size.height

        var path = Path()
        path.move(to: CGPoint(x: 0, y: topY))

        // Jagged top edge
        let steps = 10
        for i in 0...steps {
            let x = size.width * CGFloat(i) / CGFloat(steps)
            let jag = (i % 2 == 0) ? topY - 4 : topY + 3
            path.addLine(to: CGPoint(x: x, y: jag))
        }

        path.addLine(to: CGPoint(x: size.width, y: bottomY))
        path.addLine(to: CGPoint(x: 0, y: bottomY))
        path.closeSubpath()

        context.fill(path, with: .color(color))
    }

    // MARK: - Foreground Ground

    static func foreground(context: inout GraphicsContext, size: CGSize, yPosition: CGFloat = 0.85, color: Color = Color(hex: "4B5563")) {
        var path = Path()
        let y = yPosition * size.height
        path.move(to: CGPoint(x: 0, y: y))
        path.addQuadCurve(
            to: CGPoint(x: size.width, y: y + 8),
            control: CGPoint(x: size.width * 0.4, y: y - 6)
        )
        path.addLine(to: CGPoint(x: size.width, y: size.height))
        path.addLine(to: CGPoint(x: 0, y: size.height))
        path.closeSubpath()

        context.fill(path, with: .color(color))
    }
}
