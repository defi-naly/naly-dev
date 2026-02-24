import SwiftUI

enum AvalancheIllustrations {

    // MARK: - Hero Illustrations

    static func heroTriangle(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.singlePeak(context: &context, size: size, peakY: 0.25, color: Color(hex: "9CA3AF"))
        TerrainPrimitives.snowCap(context: &context, size: size, peakX: 0.5, peakY: 0.25, width: 0.1)
        // Avalanche triangle symbol
        var tri = Path()
        tri.move(to: CGPoint(x: size.width * 0.5, y: size.height * 0.08))
        tri.addLine(to: CGPoint(x: size.width * 0.35, y: size.height * 0.22))
        tri.addLine(to: CGPoint(x: size.width * 0.65, y: size.height * 0.22))
        tri.closeSubpath()
        context.stroke(tri, with: .color(Color.avalancheAccent.opacity(0.7)), lineWidth: 2.5)
    }

    static func heroSlabMechanics(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.slope(context: &context, size: size, startY: 0.25, endY: 0.7, color: Color(hex: "D1D5DB"))
        SnowPrimitives.slab(context: &context, size: size, topY: 0.25, bottomY: 0.45, angle: 0.12)
        SnowPrimitives.weakLayer(context: &context, size: size, yPosition: 0.45)
        SnowPrimitives.avalancheDebris(context: &context, size: size, startPoint: .init(x: 0.6, y: 0.5), endPoint: .init(x: 0.7, y: 0.85))
    }

    static func heroSlopeAngle(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.slope(context: &context, size: size, startY: 0.2, endY: 0.8, color: Color(hex: "E5E7EB"))
        PatternPrimitives.angleIndicator(context: &context, size: size, position: .init(x: 0.15, y: 0.8), degrees: 38)
        HumanPrimitives.silhouette(context: &context, size: size, position: .init(x: 0.55, y: 0.55), scale: 0.7)
    }

    static func heroTerrainTraps(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        // Gully terrain trap
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.8), (0.2, 0.4), (0.35, 0.6), (0.5, 0.7), (0.65, 0.6), (0.8, 0.4), (1.0, 0.8)],
            style: .snowCapped, color: Color(hex: "9CA3AF"))
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.72)
        SnowPrimitives.avalancheDebris(context: &context, size: size, startPoint: .init(x: 0.5, y: 0.5), endPoint: .init(x: 0.5, y: 0.85), width: 0.3)
    }

    static func heroSnowpack(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.7, y: 0.15))
        SnowPrimitives.snowpackLayer(context: &context, size: size, yRange: 0.35...0.85)
        SnowPrimitives.weakLayer(context: &context, size: size, yPosition: 0.55)
        SnowPrimitives.snowCrystals(context: &context, size: size, count: 8, region: CGRect(x: 0, y: size.height * 0.35, width: size.width, height: size.height * 0.5))
    }

    static func heroStabilityTesting(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SnowPrimitives.snowpackLayer(context: &context, size: size, yRange: 0.4...0.9)
        // Column block
        context.stroke(
            Path(CGRect(x: size.width * 0.35, y: size.height * 0.4, width: size.width * 0.3, height: size.height * 0.35)),
            with: .color(Color(hex: "374151").opacity(0.5)),
            style: StrokeStyle(lineWidth: 2, dash: [4, 3])
        )
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.75, y: 0.75), scale: 0.9, action: .kneeling)
    }

    static func heroWindLoading(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.singlePeak(context: &context, size: size, peakX: 0.45, peakY: 0.3, baseWidth: 0.6, color: Color(hex: "9CA3AF"))
        SnowPrimitives.windLoadedSnow(context: &context, size: size, side: .trailing)
        WeatherPrimitives.windArrows(context: &context, size: size, direction: 0, count: 4, yCenter: 0.25)
        SnowPrimitives.snowCrystals(context: &context, size: size, count: 10, seed: 15)
    }

    static func heroHumanFactors(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.slope(context: &context, size: size, startY: 0.3, endY: 0.75, color: Color(hex: "E5E7EB"))
        // Group of figures
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.3, y: 0.55), scale: 0.8, action: .standing)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.45, y: 0.6), scale: 0.8, action: .standing)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.6, y: 0.65), scale: 0.8, action: .walking)
        // Warning symbol
        PatternPrimitives.angleIndicator(context: &context, size: size, position: .init(x: 0.85, y: 0.2), degrees: 35)
    }

    static func heroDecisionFrameworks(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        PatternPrimitives.grid(context: &context, size: size, spacing: 25, color: Color(hex: "6B7280").opacity(0.15))
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.85), (0.3, 0.5), (0.5, 0.35), (0.7, 0.45), (1.0, 0.8)],
            style: .snowCapped)
        // Decision arrows
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.2, y: 0.3), .init(x: 0.4, y: 0.25), .init(x: 0.6, y: 0.3), .init(x: 0.8, y: 0.2)],
            color: Color.avalancheAccent.opacity(0.6))
    }

    static func heroCompanionRescue(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.5)
        SnowPrimitives.avalancheDebris(context: &context, size: size, startPoint: .init(x: 0.4, y: 0.3), endPoint: .init(x: 0.5, y: 0.7), width: 0.5)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.3, y: 0.65), scale: 0.8, action: .kneeling)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.7, y: 0.6), scale: 0.8, action: .walking)
    }

    // MARK: - Section Illustrations

    static func sectionTriangleOverview(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        // Triangle with labels
        let cx = size.width * 0.5, cy = size.height * 0.45
        let r = min(size.width, size.height) * 0.3
        var tri = Path()
        tri.move(to: CGPoint(x: cx, y: cy - r))
        tri.addLine(to: CGPoint(x: cx - r * 0.87, y: cy + r * 0.5))
        tri.addLine(to: CGPoint(x: cx + r * 0.87, y: cy + r * 0.5))
        tri.closeSubpath()
        context.stroke(tri, with: .color(Color.avalancheAccent), lineWidth: 3)
        // Labels
        context.draw(Text("Terrain").font(.system(size: 9, weight: .bold, design: .monospaced)).foregroundStyle(Color.textSecondary), at: CGPoint(x: cx, y: cy - r - 10))
        context.draw(Text("Snowpack").font(.system(size: 9, weight: .bold, design: .monospaced)).foregroundStyle(Color.textSecondary), at: CGPoint(x: cx - r * 0.87 - 5, y: cy + r * 0.5 + 12))
        context.draw(Text("Weather").font(.system(size: 9, weight: .bold, design: .monospaced)).foregroundStyle(Color.textSecondary), at: CGPoint(x: cx + r * 0.87 + 5, y: cy + r * 0.5 + 12))
    }

    static func sectionSlabAnatomy(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SnowPrimitives.snowpackLayer(context: &context, size: size, yRange: 0.1...0.9)
        SnowPrimitives.slab(context: &context, size: size, topY: 0.1, bottomY: 0.4, angle: 0.08)
        SnowPrimitives.weakLayer(context: &context, size: size, yPosition: 0.4)
    }

    static func sectionSlopeAngle(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.slope(context: &context, size: size, startY: 0.15, endY: 0.85, color: Color(hex: "E5E7EB"))
        PatternPrimitives.angleIndicator(context: &context, size: size, position: .init(x: 0.12, y: 0.85), degrees: 38, color: Color.avalancheAccent)
        // Danger zone shading
        context.fill(
            Path(CGRect(x: 0, y: 0, width: size.width, height: size.height)),
            with: .color(Color.avalancheAccent.opacity(0.05))
        )
    }

    static func sectionTerrainTrap(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        // Gully shape
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.7), (0.15, 0.35), (0.35, 0.65), (0.5, 0.75), (0.65, 0.65), (0.85, 0.35), (1.0, 0.7)],
            style: .rocky, color: Color(hex: "78716C"))
        SnowPrimitives.avalancheDebris(context: &context, size: size, startPoint: .init(x: 0.5, y: 0.5), endPoint: .init(x: 0.5, y: 0.85), width: 0.25)
    }

    static func sectionDebris(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.4)
        SnowPrimitives.avalancheDebris(context: &context, size: size, startPoint: .init(x: 0.3, y: 0.2), endPoint: .init(x: 0.5, y: 0.75), width: 0.5)
    }

    static func sectionCrystalTypes(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        // Light background with snow crystals
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "EFF6FF"), Color(hex: "DBEAFE")])
        SnowPrimitives.snowCrystals(context: &context, size: size, count: 20, seed: 42)
    }

    static func sectionColumnTest(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F0F9FF"), Color(hex: "E0F2FE")])
        SnowPrimitives.snowpackLayer(context: &context, size: size, yRange: 0.2...0.85)
        // Column outline
        context.stroke(
            Path(CGRect(x: size.width * 0.3, y: size.height * 0.2, width: size.width * 0.4, height: size.height * 0.5)),
            with: .color(Color(hex: "374151")),
            style: StrokeStyle(lineWidth: 2, dash: [5, 3])
        )
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.8, y: 0.7), scale: 0.7, action: .kneeling)
    }

    static func sectionWindSigns(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.singlePeak(context: &context, size: size, peakX: 0.4, peakY: 0.3, baseWidth: 0.5)
        SnowPrimitives.windLoadedSnow(context: &context, size: size, side: .trailing)
        WeatherPrimitives.windArrows(context: &context, size: size, direction: 0, count: 3, yCenter: 0.2)
    }

    static func sectionGroupDecision(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.slope(context: &context, size: size, startY: 0.4, endY: 0.8, color: Color(hex: "E5E7EB"))
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.25, y: 0.6), scale: 0.7, action: .standing)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.4, y: 0.65), scale: 0.7, action: .standing)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.55, y: 0.68), scale: 0.7, action: .standing)
    }

    static func sectionTransceiverSearch(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.5)
        SnowPrimitives.avalancheDebris(context: &context, size: size, startPoint: .init(x: 0.5, y: 0.3), endPoint: .init(x: 0.5, y: 0.75), width: 0.6)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.3, y: 0.65), scale: 0.8, action: .walking)
        // Search pattern
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.3, y: 0.65), .init(x: 0.5, y: 0.6), .init(x: 0.5, y: 0.7), .init(x: 0.7, y: 0.65)],
            color: Color.avalancheAccent.opacity(0.5))
    }
}
