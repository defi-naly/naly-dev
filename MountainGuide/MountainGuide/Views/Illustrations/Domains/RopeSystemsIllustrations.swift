import SwiftUI

enum RopeSystemsIllustrations {

    // MARK: - Hero Illustrations

    static func heroKnots(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF3C7"), Color(hex: "FDE68A").opacity(0.3)])
        // Figure-eight knot representation
        figureEightKnot(context: &context, size: size, center: .init(x: 0.5, y: 0.45), scale: 2.0)
    }

    static func heroAnchors(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.cliffBand(context: &context, size: size, yRange: 0.25...0.45)
        // Anchor bolts
        for x in [0.35, 0.5, 0.65] as [CGFloat] {
            context.fill(Path(ellipseIn: CGRect(x: size.width * x - 4, y: size.height * 0.33, width: 8, height: 8)), with: .color(Color(hex: "9CA3AF")))
        }
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.35, y: 0.35), .init(x: 0.5, y: 0.42), .init(x: 0.65, y: 0.35)],
            color: Color(hex: "D97706"), lineWidth: 2.5)
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.5, y: 0.45))
    }

    static func heroBelaying(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.cliffBand(context: &context, size: size, yRange: 0.1...0.85, color: Color(hex: "9CA3AF"))
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.3, y: 0.8), scale: 0.8, action: .standing)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.6, y: 0.35), scale: 0.8, action: .climbing)
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.3, y: 0.7), .init(x: 0.45, y: 0.55), .init(x: 0.6, y: 0.35)])
    }

    static func heroRappelling(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.cliffBand(context: &context, size: size, yRange: 0.05...0.85, color: Color(hex: "78716C"))
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.45, y: 0.08), .init(x: 0.45, y: 0.9)], lineWidth: 2)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.45, y: 0.5), scale: 0.8, action: .climbing)
    }

    static func heroMechanics(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        // Force vectors
        for (x, y, angle) in [(0.3, 0.3, -CGFloat.pi/4), (0.5, 0.5, 0.0), (0.7, 0.3, CGFloat.pi/4)] as [(CGFloat, CGFloat, CGFloat)] {
            let px = x * size.width
            let py = y * size.height
            let len: CGFloat = 40
            context.stroke(
                Path { p in
                    p.move(to: CGPoint(x: px, y: py))
                    p.addLine(to: CGPoint(x: px + cos(angle) * len, y: py + sin(angle) * len))
                },
                with: .color(Color.ropeSystemsAccent.opacity(0.7)),
                lineWidth: 2.5
            )
        }
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.5, y: 0.5), scale: 1.5)
        EquipmentPrimitives.rope(context: &context, size: size, points: [.init(x: 0.2, y: 0.5), .init(x: 0.5, y: 0.5), .init(x: 0.8, y: 0.5)])
    }

    static func heroTopRope(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.cliffBand(context: &context, size: size, yRange: 0.05...0.9, color: Color(hex: "9CA3AF"))
        // Top anchor
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.5, y: 0.1))
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.5, y: 0.12), .init(x: 0.55, y: 0.5), .init(x: 0.5, y: 0.85)], lineWidth: 2)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.55, y: 0.5), scale: 0.7, action: .climbing)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.88), scale: 0.7, action: .standing)
    }

    static func heroMultiPitch(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.cliffBand(context: &context, size: size, yRange: 0.0...0.95, color: Color(hex: "78716C"))
        // Multiple belay stations
        for y in [0.2, 0.5, 0.8] as [CGFloat] {
            EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.45, y: y), scale: 0.7)
        }
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.45, y: 0.2), .init(x: 0.5, y: 0.35), .init(x: 0.45, y: 0.5), .init(x: 0.5, y: 0.65), .init(x: 0.45, y: 0.8)], lineWidth: 2)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.35), scale: 0.6, action: .climbing)
    }

    static func heroRescue(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.cliffBand(context: &context, size: size, yRange: 0.05...0.7, color: Color(hex: "78716C"))
        // Hauling system
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.4, y: 0.1), .init(x: 0.4, y: 0.5), .init(x: 0.55, y: 0.3), .init(x: 0.55, y: 0.6)], lineWidth: 2)
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.4, y: 0.1), scale: 0.8)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.6, y: 0.8), scale: 0.7, action: .standing)
    }

    static func heroCrevasse(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.45)
        // Crevasse
        context.fill(
            Path { p in
                p.move(to: CGPoint(x: size.width * 0.45, y: size.height * 0.45))
                p.addLine(to: CGPoint(x: size.width * 0.48, y: size.height * 0.9))
                p.addLine(to: CGPoint(x: size.width * 0.55, y: size.height * 0.45))
                p.closeSubpath()
            },
            with: .color(Color(hex: "1E293B"))
        )
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.3, y: 0.42), .init(x: 0.5, y: 0.48), .init(x: 0.7, y: 0.42)], lineWidth: 2)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.3, y: 0.45), scale: 0.6, action: .standing)
    }

    static func heroImprovised(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.85), (0.3, 0.5), (0.5, 0.4), (0.7, 0.55), (1.0, 0.8)],
            style: .rocky)
        VegetationPrimitives.rocks(context: &context, size: size, positions: [.init(x: 0.3, y: 0.7), .init(x: 0.6, y: 0.65)], scale: 1.5)
        EquipmentPrimitives.curvedRope(context: &context, size: size, start: .init(x: 0.3, y: 0.68), end: .init(x: 0.6, y: 0.63), sag: 0.05)
    }

    // MARK: - Section Illustrations

    static func sectionFigureEight(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF3C7"), Color(hex: "FFFBEB")])
        figureEightKnot(context: &context, size: size, center: .init(x: 0.5, y: 0.5), scale: 2.5)
    }

    static func sectionCloveHitch(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF3C7"), Color(hex: "FFFBEB")])
        // Vertical pole
        context.fill(Path(CGRect(x: size.width * 0.5 - 4, y: size.height * 0.15, width: 8, height: size.height * 0.7)), with: .color(Color(hex: "9CA3AF")))
        // Wraps
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.3, y: 0.35), .init(x: 0.55, y: 0.4), .init(x: 0.45, y: 0.5), .init(x: 0.55, y: 0.6), .init(x: 0.3, y: 0.65)])
    }

    static func sectionMunterHitch(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF3C7"), Color(hex: "FFFBEB")])
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.5, y: 0.45), scale: 1.8)
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.3, y: 0.3), .init(x: 0.5, y: 0.45), .init(x: 0.45, y: 0.55), .init(x: 0.5, y: 0.45), .init(x: 0.7, y: 0.65)])
    }

    static func sectionPrusikKnot(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF3C7"), Color(hex: "FFFBEB")])
        // Main rope vertical
        EquipmentPrimitives.rope(context: &context, size: size, points: [.init(x: 0.5, y: 0.1), .init(x: 0.5, y: 0.9)], color: Color(hex: "D97706"), lineWidth: 4)
        // Prusik cord wraps
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.35, y: 0.55), .init(x: 0.53, y: 0.4), .init(x: 0.47, y: 0.45), .init(x: 0.53, y: 0.5), .init(x: 0.47, y: 0.55), .init(x: 0.35, y: 0.6)],
            color: Color(hex: "EF4444"), lineWidth: 2)
    }

    static func sectionAnchorSystem(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        // Three anchor points
        for x in [0.3, 0.5, 0.7] as [CGFloat] {
            context.fill(Path(ellipseIn: CGRect(x: size.width * x - 5, y: size.height * 0.2, width: 10, height: 10)), with: .color(Color(hex: "6B7280")))
        }
        // Equalized sling
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.3, y: 0.22), .init(x: 0.5, y: 0.55), .init(x: 0.7, y: 0.22)], color: Color(hex: "D97706"), lineWidth: 2)
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.5, y: 0.58))
    }

    static func sectionCordelette(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        // Loop of cord
        context.stroke(
            Path(ellipseIn: CGRect(x: size.width * 0.25, y: size.height * 0.2, width: size.width * 0.5, height: size.height * 0.6)),
            with: .color(Color(hex: "D97706")),
            lineWidth: 3
        )
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.5, y: 0.8))
    }

    static func sectionBelayDeviceSetup(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        // Device shape
        context.fill(Path(roundedRect: CGRect(x: size.width * 0.4, y: size.height * 0.3, width: size.width * 0.2, height: size.height * 0.25), cornerSize: CGSize(width: 8, height: 8)), with: .color(Color(hex: "6B7280")))
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.5, y: 0.65))
        EquipmentPrimitives.rope(context: &context, size: size, points: [.init(x: 0.3, y: 0.4), .init(x: 0.5, y: 0.42), .init(x: 0.7, y: 0.5)], lineWidth: 2.5)
    }

    static func sectionRappelAnchor(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        // Rock with anchor
        VegetationPrimitives.rocks(context: &context, size: size, positions: [.init(x: 0.5, y: 0.3)], scale: 3)
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.5, y: 0.3), .init(x: 0.5, y: 0.9)], lineWidth: 2.5)
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.5, y: 0.32))
    }

    static func sectionCoil(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF3C7"), Color(hex: "FFFBEB")])
        // Coiled rope
        let cx = size.width * 0.5, cy = size.height * 0.5
        for i in 0..<8 {
            let angle = CGFloat(i) * .pi / 4
            let r: CGFloat = 30
            context.stroke(
                Path(ellipseIn: CGRect(x: cx + cos(angle) * 5 - r, y: cy + sin(angle) * 3 - r * 0.5, width: r * 2, height: r)),
                with: .color(Color(hex: "D97706").opacity(0.5 + Double(i) * 0.05)),
                lineWidth: 3
            )
        }
    }

    static func sectionHaulingSystem(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        // 3:1 Z-pulley diagram
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.5, y: 0.15), scale: 0.8)
        EquipmentPrimitives.carabiner(context: &context, size: size, position: .init(x: 0.5, y: 0.55), scale: 0.8)
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.5, y: 0.17), .init(x: 0.5, y: 0.53), .init(x: 0.5, y: 0.17), .init(x: 0.7, y: 0.5)], lineWidth: 2)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.7, y: 0.8), scale: 0.7, action: .standing)
    }

    static func sectionPrusikAscending(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        EquipmentPrimitives.rope(context: &context, size: size, points: [.init(x: 0.5, y: 0.05), .init(x: 0.5, y: 0.95)], lineWidth: 3)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.55), scale: 0.8, action: .climbing)
        // Prusik knots
        context.fill(Path(ellipseIn: CGRect(x: size.width * 0.47, y: size.height * 0.35, width: 12, height: 6)), with: .color(Color(hex: "EF4444")))
        context.fill(Path(ellipseIn: CGRect(x: size.width * 0.47, y: size.height * 0.6, width: 12, height: 6)), with: .color(Color(hex: "EF4444")))
    }

    static func sectionCrevasseLip(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.4)
        // Crevasse gap
        context.fill(
            Path { p in
                p.move(to: CGPoint(x: size.width * 0.4, y: size.height * 0.4))
                p.addLine(to: CGPoint(x: size.width * 0.45, y: size.height * 0.95))
                p.addLine(to: CGPoint(x: size.width * 0.6, y: size.height * 0.4))
                p.closeSubpath()
            },
            with: .color(Color(hex: "1E293B"))
        )
        // Lip pad
        context.fill(Path(CGRect(x: size.width * 0.35, y: size.height * 0.37, width: size.width * 0.1, height: size.height * 0.06)), with: .color(Color(hex: "D97706").opacity(0.5)))
    }

    static func sectionSnowBollard(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.3)
        // Bollard shape (horseshoe channel)
        context.stroke(
            Path { p in
                p.addArc(center: CGPoint(x: size.width * 0.5, y: size.height * 0.55), radius: 35, startAngle: .degrees(-30), endAngle: .degrees(210), clockwise: false)
            },
            with: .color(Color(hex: "6B7280")),
            style: StrokeStyle(lineWidth: 4, dash: [6, 3])
        )
        EquipmentPrimitives.curvedRope(context: &context, size: size, start: .init(x: 0.35, y: 0.5), end: .init(x: 0.65, y: 0.5), sag: 0.08)
    }

    // MARK: - Helpers

    private static func figureEightKnot(context: inout GraphicsContext, size: CGSize, center: UnitPoint, scale: CGFloat) {
        let cx = center.x * size.width
        let cy = center.y * size.height
        let s = scale * 8

        // Figure-8 shape
        var path = Path()
        path.move(to: CGPoint(x: cx - s * 2, y: cy - s))
        path.addCurve(
            to: CGPoint(x: cx + s, y: cy + s * 1.5),
            control1: CGPoint(x: cx + s * 2, y: cy - s * 2),
            control2: CGPoint(x: cx - s * 2, y: cy + s * 2)
        )
        path.addCurve(
            to: CGPoint(x: cx + s * 2, y: cy + s * 0.5),
            control1: CGPoint(x: cx + s * 3, y: cy + s),
            control2: CGPoint(x: cx + s * 2, y: cy)
        )

        context.stroke(path, with: .color(Color(hex: "D97706")), lineWidth: 4)
    }
}
