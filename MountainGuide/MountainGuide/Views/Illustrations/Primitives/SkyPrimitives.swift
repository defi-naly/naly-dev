import SwiftUI

enum SkyStyle {
    case clearDay, clearDawn, clearDusk, overcast, stormy, night, hazy, whiteout
}

enum SkyPrimitives {

    // MARK: - Sky Gradients

    static func skyGradient(context: inout GraphicsContext, size: CGSize, style: SkyStyle) {
        let colors: [Color]
        switch style {
        case .clearDay:
            colors = [Color(hex: "87CEEB"), Color(hex: "E0F0FF")]
        case .clearDawn:
            colors = [Color(hex: "2D1B69"), Color(hex: "E8837C"), Color(hex: "FFECD2")]
        case .clearDusk:
            colors = [Color(hex: "1A1A2E"), Color(hex: "E94560"), Color(hex: "FFB347")]
        case .overcast:
            colors = [Color(hex: "9CA3AF"), Color(hex: "D1D5DB")]
        case .stormy:
            colors = [Color(hex: "374151"), Color(hex: "6B7280")]
        case .night:
            colors = [Color(hex: "0F172A"), Color(hex: "1E293B")]
        case .hazy:
            colors = [Color(hex: "B0C4DE"), Color(hex: "E8E8E8")]
        case .whiteout:
            colors = [Color(hex: "E5E7EB"), Color(hex: "F3F4F6")]
        }
        let gradient = Gradient(colors: colors)
        context.fill(
            Path(CGRect(origin: .zero, size: size)),
            with: .linearGradient(gradient, startPoint: .zero, endPoint: CGPoint(x: 0, y: size.height))
        )
    }

    // MARK: - Sun

    static func sun(context: inout GraphicsContext, size: CGSize, center: UnitPoint, radius: CGFloat = 0.06, glowRadius: CGFloat = 0.12) {
        let pt = CGPoint(x: center.x * size.width, y: center.y * size.height)
        let r = radius * min(size.width, size.height)
        let gr = glowRadius * min(size.width, size.height)

        // Glow
        let glowGradient = Gradient(colors: [
            Color(hex: "FCD34D").opacity(0.4),
            Color(hex: "FCD34D").opacity(0)
        ])
        context.fill(
            Path(ellipseIn: CGRect(x: pt.x - gr, y: pt.y - gr, width: gr * 2, height: gr * 2)),
            with: .radialGradient(glowGradient, center: pt, startRadius: r, endRadius: gr)
        )

        // Disc
        context.fill(
            Path(ellipseIn: CGRect(x: pt.x - r, y: pt.y - r, width: r * 2, height: r * 2)),
            with: .color(Color(hex: "FCD34D"))
        )
    }

    // MARK: - Moon

    static func moon(context: inout GraphicsContext, size: CGSize, center: UnitPoint, radius: CGFloat = 0.04) {
        let pt = CGPoint(x: center.x * size.width, y: center.y * size.height)
        let r = radius * min(size.width, size.height)
        let glowR = r * 2

        let glowGradient = Gradient(colors: [
            Color(hex: "E2E8F0").opacity(0.3),
            Color(hex: "E2E8F0").opacity(0)
        ])
        context.fill(
            Path(ellipseIn: CGRect(x: pt.x - glowR, y: pt.y - glowR, width: glowR * 2, height: glowR * 2)),
            with: .radialGradient(glowGradient, center: pt, startRadius: r * 0.5, endRadius: glowR)
        )

        context.fill(
            Path(ellipseIn: CGRect(x: pt.x - r, y: pt.y - r, width: r * 2, height: r * 2)),
            with: .color(Color(hex: "F1F5F9"))
        )
    }

    // MARK: - Stars

    static func stars(context: inout GraphicsContext, size: CGSize, count: Int = 30, seed: Int = 42) {
        var rng = SeededRNG(seed: UInt64(seed))
        for _ in 0..<count {
            let x = CGFloat.random(in: 0..<size.width, using: &rng)
            let y = CGFloat.random(in: 0..<size.height * 0.6, using: &rng)
            let r = CGFloat.random(in: 1...2.5, using: &rng)
            let opacity = Double.random(in: 0.4...1.0, using: &rng)
            context.fill(
                Path(ellipseIn: CGRect(x: x - r, y: y - r, width: r * 2, height: r * 2)),
                with: .color(.white.opacity(opacity))
            )
        }
    }

    // MARK: - Clouds

    static func cumulus(context: inout GraphicsContext, size: CGSize, center: UnitPoint, scale: CGFloat = 1.0, opacity: Double = 0.9) {
        let cx = center.x * size.width
        let cy = center.y * size.height
        let w = size.width * 0.2 * scale
        let h = w * 0.5

        var copy = context
        copy.opacity = opacity

        let path = CloudShapes.cumulus(
            center: CGPoint(x: cx, y: cy),
            width: w,
            height: h
        )
        copy.fill(path, with: .color(.white))
    }

    static func lenticular(context: inout GraphicsContext, size: CGSize, center: UnitPoint, scale: CGFloat = 1.0, opacity: Double = 0.85) {
        let cx = center.x * size.width
        let cy = center.y * size.height
        let w = size.width * 0.25 * scale
        let h = w * 0.25

        var copy = context
        copy.opacity = opacity

        let path = CloudShapes.lenticular(
            center: CGPoint(x: cx, y: cy),
            width: w,
            height: h
        )
        copy.fill(path, with: .color(.white.opacity(0.9)))
    }

    static func cirrus(context: inout GraphicsContext, size: CGSize, center: UnitPoint, scale: CGFloat = 1.0, opacity: Double = 0.6) {
        let cx = center.x * size.width
        let cy = center.y * size.height
        let w = size.width * 0.3 * scale
        let h = w * 0.15

        var copy = context
        copy.opacity = opacity

        let path = CloudShapes.wispy(
            center: CGPoint(x: cx, y: cy),
            width: w,
            height: h
        )
        copy.fill(path, with: .color(.white))
    }

    static func stormCloud(context: inout GraphicsContext, size: CGSize, center: UnitPoint, scale: CGFloat = 1.0) {
        let cx = center.x * size.width
        let cy = center.y * size.height
        let w = size.width * 0.3 * scale
        let h = w * 0.6

        let path = CloudShapes.cumulus(
            center: CGPoint(x: cx, y: cy),
            width: w,
            height: h
        )
        context.fill(path, with: .color(Color(hex: "4B5563")))

        // Dark base
        let basePath = Path(ellipseIn: CGRect(x: cx - w * 0.45, y: cy + h * 0.1, width: w * 0.9, height: h * 0.2))
        context.fill(basePath, with: .color(Color(hex: "374151").opacity(0.8)))
    }

    static func cloudBank(context: inout GraphicsContext, size: CGSize, yPosition: CGFloat = 0.6, opacity: Double = 0.7) {
        let y = yPosition * size.height
        var path = Path()
        path.move(to: CGPoint(x: 0, y: y + 20))
        let steps = 8
        for i in 0...steps {
            let x = size.width * CGFloat(i) / CGFloat(steps)
            let bumpY = y - CGFloat(10 + (i % 3) * 8)
            path.addQuadCurve(
                to: CGPoint(x: x, y: bumpY),
                control: CGPoint(x: x - size.width / CGFloat(steps * 2), y: bumpY - 12)
            )
        }
        path.addLine(to: CGPoint(x: size.width, y: size.height))
        path.addLine(to: CGPoint(x: 0, y: size.height))
        path.closeSubpath()
        context.fill(path, with: .color(.white.opacity(opacity)))
    }

    // MARK: - Atmospheric

    static func fogLayer(context: inout GraphicsContext, size: CGSize, yRange: ClosedRange<CGFloat> = 0.5...0.8, opacity: Double = 0.4) {
        let topY = yRange.lowerBound * size.height
        let bottomY = yRange.upperBound * size.height
        let gradient = Gradient(colors: [
            .white.opacity(0),
            .white.opacity(opacity),
            .white.opacity(opacity * 0.8),
            .white.opacity(0)
        ])
        context.fill(
            Path(CGRect(x: 0, y: topY, width: size.width, height: bottomY - topY)),
            with: .linearGradient(gradient, startPoint: CGPoint(x: 0, y: topY), endPoint: CGPoint(x: 0, y: bottomY))
        )
    }

    static func hazeGradient(context: inout GraphicsContext, size: CGSize, opacity: Double = 0.3) {
        let gradient = Gradient(colors: [
            Color(hex: "CBD5E1").opacity(0),
            Color(hex: "CBD5E1").opacity(opacity)
        ])
        context.fill(
            Path(CGRect(origin: .zero, size: size)),
            with: .linearGradient(gradient, startPoint: CGPoint(x: 0, y: size.height * 0.3), endPoint: CGPoint(x: 0, y: size.height))
        )
    }
}

// MARK: - Deterministic RNG

struct SeededRNG: RandomNumberGenerator {
    private var state: UInt64

    init(seed: UInt64) {
        state = seed
    }

    mutating func next() -> UInt64 {
        state &+= 0x9E3779B97F4A7C15
        var z = state
        z = (z ^ (z >> 30)) &* 0xBF58476D1CE4E5B9
        z = (z ^ (z >> 27)) &* 0x94D049BB133111EB
        return z ^ (z >> 31)
    }
}
