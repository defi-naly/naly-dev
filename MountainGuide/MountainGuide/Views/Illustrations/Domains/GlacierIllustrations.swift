import SwiftUI

enum GlacierIllustrations {

    // MARK: - Hero Illustrations

    static func heroAnatomy(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.6), (0.2, 0.35), (0.4, 0.25), (0.6, 0.3), (0.8, 0.4), (1.0, 0.6)],
            style: .snowCapped)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.55, color: Color(hex: "BFDBFE"))
        // Crevasses
        crevasses(context: &context, size: size, yBase: 0.58, count: 3)
    }

    static func heroCrevasseid(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.4)
        // Multiple crevasse types
        crevasses(context: &context, size: size, yBase: 0.42, count: 4)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.7, y: 0.15), scale: 0.7)
    }

    static func heroRopeTeam(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.55)
        HumanPrimitives.ropeTeam(context: &context, size: size,
            positions: [.init(x: 0.2, y: 0.65), .init(x: 0.5, y: 0.62), .init(x: 0.8, y: 0.65)])
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.55), (0.3, 0.35), (0.5, 0.25), (0.7, 0.3), (1.0, 0.5)],
            style: .snowCapped, color: Color(hex: "9CA3AF").opacity(0.3))
    }

    static func heroProbe(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.5)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.6), scale: 0.9, action: .standing)
        // Probe line
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: size.width * 0.52, y: size.height * 0.35))
                p.addLine(to: CGPoint(x: size.width * 0.52, y: size.height * 0.85))
            },
            with: .color(Color(hex: "374151")),
            lineWidth: 1.5
        )
    }

    static func heroRoute(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.45)
        crevasses(context: &context, size: size, yBase: 0.48, count: 3)
        // Wanded route
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.1, y: 0.7), .init(x: 0.25, y: 0.55), .init(x: 0.45, y: 0.6), .init(x: 0.65, y: 0.52), .init(x: 0.9, y: 0.55)],
            color: Color.glacierTravelAccent)
        // Wands
        for x in [0.25, 0.45, 0.65] as [CGFloat] {
            wand(context: &context, size: size, x: x, y: 0.55)
        }
    }

    static func heroProtocols(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.5)
        HumanPrimitives.ropeTeam(context: &context, size: size,
            positions: [.init(x: 0.25, y: 0.62), .init(x: 0.55, y: 0.6), .init(x: 0.85, y: 0.62)])
        // Protocol indicator arrows
        WeatherPrimitives.windArrows(context: &context, size: size, direction: 0, count: 2, yCenter: 0.4)
    }

    static func heroRescue(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.4)
        // Crevasse with person inside
        context.fill(
            Path { p in
                p.move(to: CGPoint(x: size.width * 0.45, y: size.height * 0.4))
                p.addLine(to: CGPoint(x: size.width * 0.48, y: size.height * 0.85))
                p.addLine(to: CGPoint(x: size.width * 0.55, y: size.height * 0.4))
                p.closeSubpath()
            },
            with: .color(Color(hex: "1E293B"))
        )
        EquipmentPrimitives.rope(context: &context, size: size,
            points: [.init(x: 0.3, y: 0.38), .init(x: 0.5, y: 0.55)], lineWidth: 2)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.3, y: 0.42), scale: 0.7, action: .kneeling)
    }

    static func heroCamping(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDusk)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.55)
        // Tent shape
        var tent = Path()
        tent.move(to: CGPoint(x: size.width * 0.4, y: size.height * 0.65))
        tent.addLine(to: CGPoint(x: size.width * 0.5, y: size.height * 0.45))
        tent.addLine(to: CGPoint(x: size.width * 0.6, y: size.height * 0.65))
        tent.closeSubpath()
        context.fill(tent, with: .color(Color(hex: "EA580C").opacity(0.7)))
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.55), (0.3, 0.3), (0.5, 0.2), (0.7, 0.3), (1.0, 0.5)],
            style: .silhouette, color: Color(hex: "1E293B").opacity(0.5))
    }

    static func heroSeasonal(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        // Split: winter (left) vs summer (right)
        let half = size.width / 2
        // Winter side
        var wCtx = context
        wCtx.clipToLayer { c in
            c.fill(Path(CGRect(x: 0, y: 0, width: half, height: size.height)), with: .color(.white))
        }
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.5)
        // Summer side
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.8, y: 0.12))
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.55, color: Color(hex: "93C5FD").opacity(0.5))
        crevasses(context: &context, size: size, yBase: 0.58, count: 2)
    }

    static func heroWeather(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .stormy)
        SkyPrimitives.stormCloud(context: &context, size: size, center: .init(x: 0.4, y: 0.15), scale: 1.2)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.55)
        WeatherPrimitives.rain(context: &context, size: size, intensity: 15, seed: 33)
        SkyPrimitives.fogLayer(context: &context, size: size, yRange: 0.4...0.7, opacity: 0.4)
    }

    // MARK: - Section Illustrations

    static func sectionBergschrund(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.singlePeak(context: &context, size: size, peakX: 0.3, peakY: 0.2, baseWidth: 0.5, color: Color(hex: "9CA3AF"))
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.5)
        // Bergschrund gap
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: size.width * 0.35, y: size.height * 0.45))
                p.addQuadCurve(to: CGPoint(x: size.width * 0.5, y: size.height * 0.48), control: CGPoint(x: size.width * 0.42, y: size.height * 0.55))
            },
            with: .color(Color(hex: "1E293B")),
            lineWidth: 3
        )
    }

    static func sectionFlowPatterns(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.4, color: Color(hex: "BFDBFE"))
        // Flow arrows
        for y in [0.5, 0.6, 0.7] as [CGFloat] {
            WeatherPrimitives.windArrows(context: &context, size: size, direction: 0, count: 4, yCenter: y)
        }
    }

    static func sectionCrevasseField(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.35)
        crevasses(context: &context, size: size, yBase: 0.38, count: 6)
    }

    static func sectionMarginalCrevasse(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.4)
        // Edge crevasses
        for i in 0..<4 {
            let y = 0.45 + CGFloat(i) * 0.1
            context.stroke(
                Path { p in
                    p.move(to: CGPoint(x: 0, y: size.height * y))
                    p.addLine(to: CGPoint(x: size.width * 0.25, y: size.height * (y + 0.05)))
                },
                with: .color(Color(hex: "1E293B").opacity(0.5)),
                lineWidth: 2
            )
        }
        TerrainPrimitives.cliffBand(context: &context, size: size, yRange: 0.35...0.42, color: Color(hex: "78716C").opacity(0.5))
    }

    static func sectionSnowBridge(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "E0F2FE"), Color(hex: "BFDBFE")])
        // Crevasse cross-section with bridge
        context.fill(
            Path { p in
                p.move(to: CGPoint(x: size.width * 0.3, y: size.height * 0.4))
                p.addLine(to: CGPoint(x: size.width * 0.4, y: size.height * 0.9))
                p.addLine(to: CGPoint(x: size.width * 0.6, y: size.height * 0.9))
                p.addLine(to: CGPoint(x: size.width * 0.7, y: size.height * 0.4))
                p.closeSubpath()
            },
            with: .color(Color(hex: "1E293B").opacity(0.6))
        )
        // Snow bridge across top
        context.fill(
            Path(roundedRect: CGRect(x: size.width * 0.28, y: size.height * 0.35, width: size.width * 0.44, height: size.height * 0.08), cornerSize: CGSize(width: 4, height: 4)),
            with: .color(Color(hex: "F9FAFB"))
        )
    }

    static func sectionRopeTeam(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.55)
        HumanPrimitives.ropeTeam(context: &context, size: size,
            positions: [.init(x: 0.15, y: 0.65), .init(x: 0.5, y: 0.62), .init(x: 0.85, y: 0.65)])
    }

    static func sectionKiwiCoils(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F0F9FF"), Color(hex: "E0F2FE")])
        HumanPrimitives.silhouette(context: &context, size: size, position: .init(x: 0.5, y: 0.65), scale: 1.0)
        // Coils around torso
        for i in 0..<4 {
            let y = size.height * (0.4 + CGFloat(i) * 0.04)
            context.stroke(
                Path(ellipseIn: CGRect(x: size.width * 0.42, y: y, width: size.width * 0.16, height: 8)),
                with: .color(Color(hex: "D97706").opacity(0.6)),
                lineWidth: 2
            )
        }
    }

    static func sectionSimultaneousTravel(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.55)
        HumanPrimitives.ropeTeam(context: &context, size: size,
            positions: [.init(x: 0.2, y: 0.65), .init(x: 0.5, y: 0.63), .init(x: 0.8, y: 0.65)])
        WeatherPrimitives.windArrows(context: &context, size: size, direction: 0, count: 2, yCenter: 0.75)
    }

    static func sectionProbeTechnique(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.45)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.45, y: 0.58), scale: 0.8, action: .standing)
        // Probe
        context.stroke(Path { p in
            p.move(to: CGPoint(x: size.width * 0.47, y: size.height * 0.3))
            p.addLine(to: CGPoint(x: size.width * 0.47, y: size.height * 0.8))
        }, with: .color(Color(hex: "374151")), lineWidth: 1.5)
    }

    static func sectionWandedRoute(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.5)
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.1, y: 0.65), .init(x: 0.3, y: 0.58), .init(x: 0.5, y: 0.6), .init(x: 0.7, y: 0.55), .init(x: 0.9, y: 0.6)],
            color: Color.glacierTravelAccent.opacity(0.5))
        for x in [0.3, 0.5, 0.7] as [CGFloat] {
            wand(context: &context, size: size, x: x, y: 0.57)
        }
    }

    static func sectionPrusikAscent(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "E0F2FE"), Color(hex: "BFDBFE")])
        EquipmentPrimitives.rope(context: &context, size: size, points: [.init(x: 0.5, y: 0.05), .init(x: 0.5, y: 0.95)], lineWidth: 3)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.55), scale: 0.8, action: .climbing)
    }

    static func sectionRescueComplications(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.35)
        context.fill(
            Path { p in
                p.move(to: CGPoint(x: size.width * 0.4, y: size.height * 0.35))
                p.addLine(to: CGPoint(x: size.width * 0.45, y: size.height * 0.9))
                p.addLine(to: CGPoint(x: size.width * 0.6, y: size.height * 0.35))
                p.closeSubpath()
            },
            with: .color(Color(hex: "1E293B"))
        )
        EquipmentPrimitives.rope(context: &context, size: size, points: [.init(x: 0.3, y: 0.33), .init(x: 0.5, y: 0.6)], lineWidth: 2)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.3, y: 0.38), scale: 0.6, action: .kneeling)
    }

    static func sectionCampAnchors(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDusk)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.5)
        // Tent
        var tent = Path()
        tent.move(to: CGPoint(x: size.width * 0.4, y: size.height * 0.58))
        tent.addLine(to: CGPoint(x: size.width * 0.5, y: size.height * 0.4))
        tent.addLine(to: CGPoint(x: size.width * 0.6, y: size.height * 0.58))
        tent.closeSubpath()
        context.fill(tent, with: .color(Color(hex: "EA580C").opacity(0.6)))
        // Anchor stakes
        for x in [0.35, 0.65] as [CGFloat] {
            context.stroke(Path { p in
                p.move(to: CGPoint(x: size.width * x, y: size.height * 0.5))
                p.addLine(to: CGPoint(x: size.width * x, y: size.height * 0.65))
            }, with: .color(Color(hex: "374151")), lineWidth: 2)
        }
    }

    static func sectionSummerMelt(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.75, y: 0.1))
        TerrainPrimitives.glacierSurface(context: &context, size: size, yPosition: 0.45, color: Color(hex: "93C5FD"))
        crevasses(context: &context, size: size, yBase: 0.48, count: 4)
        // Meltwater
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: size.width * 0.6, y: size.height * 0.5))
                p.addQuadCurve(to: CGPoint(x: size.width * 0.8, y: size.height * 0.8), control: CGPoint(x: size.width * 0.75, y: size.height * 0.6))
            },
            with: .color(Color(hex: "3B82F6").opacity(0.4)),
            lineWidth: 3
        )
    }

    // MARK: - Helpers

    private static func crevasses(context: inout GraphicsContext, size: CGSize, yBase: CGFloat, count: Int) {
        var rng = SeededRNG(seed: 44)
        for _ in 0..<count {
            let x = CGFloat.random(in: 0.15...0.85, using: &rng)
            let w = CGFloat.random(in: 0.02...0.04, using: &rng)
            let depth = CGFloat.random(in: 0.15...0.3, using: &rng)
            context.fill(
                Path { p in
                    p.move(to: CGPoint(x: (x - w) * size.width, y: yBase * size.height))
                    p.addLine(to: CGPoint(x: x * size.width, y: (yBase + depth) * size.height))
                    p.addLine(to: CGPoint(x: (x + w) * size.width, y: yBase * size.height))
                    p.closeSubpath()
                },
                with: .color(Color(hex: "1E293B").opacity(0.5))
            )
        }
    }

    private static func wand(context: inout GraphicsContext, size: CGSize, x: CGFloat, y: CGFloat) {
        let px = x * size.width
        let py = y * size.height
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: px, y: py))
                p.addLine(to: CGPoint(x: px, y: py - 20))
            },
            with: .color(Color(hex: "374151")),
            lineWidth: 1.5
        )
        // Flag
        context.fill(
            Path { p in
                p.move(to: CGPoint(x: px, y: py - 20))
                p.addLine(to: CGPoint(x: px + 8, y: py - 17))
                p.addLine(to: CGPoint(x: px, y: py - 14))
                p.closeSubpath()
            },
            with: .color(Color(hex: "EF4444"))
        )
    }
}
