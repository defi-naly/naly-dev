import SwiftUI

enum NavigationIllustrations {

    // MARK: - Hero Illustrations

    static func heroMapReading(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF9C3"), Color(hex: "FEF3C7")])
        PatternPrimitives.contourLines(context: &context, size: size, center: .init(x: 0.45, y: 0.45), rings: 7)
        PatternPrimitives.grid(context: &context, size: size, spacing: 35, color: Color(hex: "3B82F6").opacity(0.1))
        PatternPrimitives.scaleBar(context: &context, size: size, position: .init(x: 0.5, y: 0.88))
    }

    static func heroCompass(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        EquipmentPrimitives.compassRose(context: &context, size: size, center: .init(x: 0.5, y: 0.45), radius: 0.25)
    }

    static func heroGPS(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F0F9FF"), Color(hex: "E0F2FE")])
        PatternPrimitives.grid(context: &context, size: size, spacing: 25, color: Color(hex: "6B7280").opacity(0.1))
        // GPS device outline
        let cx = size.width * 0.5, cy = size.height * 0.45
        context.stroke(Path(roundedRect: CGRect(x: cx - 30, y: cy - 45, width: 60, height: 90), cornerSize: CGSize(width: 6, height: 6)), with: .color(Color(hex: "374151")), lineWidth: 2)
        // Waypoint dots
        for pt in [(0.35, 0.35), (0.5, 0.45), (0.65, 0.3)] as [(CGFloat, CGFloat)] {
            context.fill(Path(ellipseIn: CGRect(x: size.width * pt.0 - 3, y: size.height * pt.1 - 3, width: 6, height: 6)), with: .color(Color.navigationAccent))
        }
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.35, y: 0.35), .init(x: 0.5, y: 0.45), .init(x: 0.65, y: 0.3)],
            color: Color.navigationAccent.opacity(0.5))
    }

    static func heroRoutePlanning(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF9C3"), Color(hex: "FEF3C7")])
        PatternPrimitives.contourLines(context: &context, size: size, center: .init(x: 0.4, y: 0.5), rings: 5)
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.1, y: 0.8), .init(x: 0.3, y: 0.6), .init(x: 0.5, y: 0.5), .init(x: 0.7, y: 0.3), .init(x: 0.9, y: 0.2)],
            color: Color.navigationAccent)
    }

    static func heroTerrain(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.8), (0.15, 0.5), (0.3, 0.35), (0.45, 0.3), (0.6, 0.4), (0.75, 0.5), (0.9, 0.6), (1.0, 0.75)],
            style: .rocky)
        VegetationPrimitives.treeLine(context: &context, size: size, yPosition: 0.7, count: 6)
        TerrainPrimitives.foreground(context: &context, size: size, yPosition: 0.85, color: Color(hex: "4D7C5C").opacity(0.6))
    }

    static func heroContouring(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF9C3"), Color(hex: "FEF3C7")])
        PatternPrimitives.contourLines(context: &context, size: size, center: .init(x: 0.5, y: 0.4), rings: 8)
        // Contouring path
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.15, y: 0.5), .init(x: 0.3, y: 0.48), .init(x: 0.5, y: 0.45), .init(x: 0.7, y: 0.48), .init(x: 0.85, y: 0.5)],
            color: Color.navigationAccent, dashPattern: [8, 4])
    }

    static func heroTriangulation(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.85), (0.2, 0.5), (0.5, 0.4), (0.8, 0.5), (1.0, 0.85)],
            style: .silhouette)
        // Triangulation lines
        let observer = UnitPoint(x: 0.5, y: 0.8)
        for target in [(0.2, 0.5), (0.5, 0.4), (0.8, 0.5)] as [(CGFloat, CGFloat)] {
            PatternPrimitives.dashedPath(context: &context, size: size,
                points: [observer, .init(x: target.0, y: target.1)],
                color: Color.navigationAccent.opacity(0.5), dashPattern: [4, 3])
        }
        HumanPrimitives.stickFigure(context: &context, size: size, position: observer, scale: 0.7)
    }

    static func heroWhiteout(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .whiteout)
        SkyPrimitives.fogLayer(context: &context, size: size, yRange: 0.2...0.9, opacity: 0.5)
        HumanPrimitives.silhouette(context: &context, size: size, position: .init(x: 0.5, y: 0.65), scale: 0.9, color: Color(hex: "6B7280").opacity(0.4))
        EquipmentPrimitives.compassRose(context: &context, size: size, center: .init(x: 0.15, y: 0.15), radius: 0.08)
    }

    static func heroNight(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .night)
        SkyPrimitives.stars(context: &context, size: size, count: 35)
        SkyPrimitives.moon(context: &context, size: size, center: .init(x: 0.75, y: 0.15))
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.85), (0.2, 0.55), (0.4, 0.45), (0.6, 0.5), (0.8, 0.6), (1.0, 0.8)],
            style: .silhouette, color: Color(hex: "0F172A"))
        // Headlamp beam
        headlampBeam(context: &context, size: size, position: .init(x: 0.5, y: 0.7))
    }

    static func heroEmergency(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.8), (0.3, 0.5), (0.5, 0.4), (0.7, 0.5), (1.0, 0.8)],
            style: .rocky)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.7), scale: 0.8, action: .standing)
        EquipmentPrimitives.compassRose(context: &context, size: size, center: .init(x: 0.8, y: 0.2), radius: 0.08)
        // Emergency signal
        context.stroke(
            Path(ellipseIn: CGRect(x: size.width * 0.45, y: size.height * 0.55, width: 40, height: 40)),
            with: .color(Color.navigationAccent.opacity(0.4)),
            style: StrokeStyle(lineWidth: 2, dash: [4, 3])
        )
    }

    // MARK: - Section Illustrations

    static func sectionTopoContours(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF9C3"), Color(hex: "FEF3C7")])
        PatternPrimitives.contourLines(context: &context, size: size, center: .init(x: 0.5, y: 0.5), rings: 8)
    }

    static func sectionMapScale(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF9C3"), Color(hex: "FEF3C7")])
        PatternPrimitives.grid(context: &context, size: size, spacing: 30, color: Color(hex: "3B82F6").opacity(0.1))
        PatternPrimitives.scaleBar(context: &context, size: size, position: .init(x: 0.5, y: 0.5), label: "1:25,000")
    }

    static func sectionCompassMap(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF9C3"), Color(hex: "FEF3C7")])
        PatternPrimitives.contourLines(context: &context, size: size, center: .init(x: 0.5, y: 0.55), rings: 5)
        EquipmentPrimitives.compassRose(context: &context, size: size, center: .init(x: 0.8, y: 0.2), radius: 0.1)
    }

    static func sectionGPSDevice(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F0F9FF"), Color(hex: "E0F2FE")])
        let cx = size.width * 0.5, cy = size.height * 0.45
        context.fill(Path(roundedRect: CGRect(x: cx - 35, y: cy - 50, width: 70, height: 100), cornerSize: CGSize(width: 8, height: 8)), with: .color(Color(hex: "374151")))
        context.fill(Path(roundedRect: CGRect(x: cx - 28, y: cy - 40, width: 56, height: 60), cornerSize: CGSize(width: 4, height: 4)), with: .color(Color(hex: "93C5FD").opacity(0.3)))
        PatternPrimitives.contourLines(context: &context, size: size, center: .init(x: 0.5, y: 0.4), rings: 3, color: Color(hex: "6B7280").opacity(0.2))
    }

    static func sectionRouteCard(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        // Card outline
        context.stroke(Path(roundedRect: CGRect(x: 20, y: 15, width: size.width - 40, height: size.height - 30), cornerSize: CGSize(width: 6, height: 6)), with: .color(Color(hex: "6B7280").opacity(0.3)), lineWidth: 1)
        // Lines representing route card entries
        for i in 0..<5 {
            let y = 35 + CGFloat(i) * 25
            context.fill(Path(CGRect(x: 35, y: y, width: size.width * 0.6, height: 3)), with: .color(Color(hex: "D1D5DB")))
        }
    }

    static func sectionRidgeRoute(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.8), (0.2, 0.45), (0.4, 0.35), (0.6, 0.3), (0.8, 0.4), (1.0, 0.75)],
            style: .rocky)
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.2, y: 0.45), .init(x: 0.4, y: 0.35), .init(x: 0.6, y: 0.3), .init(x: 0.8, y: 0.4)],
            color: Color.navigationAccent)
    }

    static func sectionStreamHandrail(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.valley(context: &context, size: size, color: Color(hex: "4D7C5C").opacity(0.4))
        // Stream
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: size.width * 0.3, y: size.height * 0.2))
                p.addQuadCurve(to: CGPoint(x: size.width * 0.5, y: size.height * 0.5), control: CGPoint(x: size.width * 0.45, y: size.height * 0.35))
                p.addQuadCurve(to: CGPoint(x: size.width * 0.6, y: size.height * 0.85), control: CGPoint(x: size.width * 0.55, y: size.height * 0.7))
            },
            with: .color(Color(hex: "3B82F6").opacity(0.5)),
            lineWidth: 3
        )
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.55, y: 0.55), scale: 0.7, action: .walking)
    }

    static func sectionSlopeAspect(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.8, y: 0.1))
        // South-facing lit slope
        TerrainPrimitives.slope(context: &context, size: size, startY: 0.3, endY: 0.75, color: Color(hex: "4D7C5C"))
        // North-facing shadow slope
        TerrainPrimitives.slope(context: &context, size: size, startY: 0.75, endY: 0.3, color: Color(hex: "374151").opacity(0.3))
    }

    static func sectionWhiteoutConditions(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .whiteout)
        SkyPrimitives.fogLayer(context: &context, size: size, yRange: 0.3...0.9, opacity: 0.6)
        HumanPrimitives.silhouette(context: &context, size: size, position: .init(x: 0.5, y: 0.65), scale: 0.8, color: Color(hex: "6B7280").opacity(0.3))
    }

    static func sectionCompassPacing(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        EquipmentPrimitives.compassRose(context: &context, size: size, center: .init(x: 0.3, y: 0.45), radius: 0.15)
        // Pacing footsteps
        for i in 0..<5 {
            let x = size.width * (0.55 + CGFloat(i) * 0.08)
            let y = size.height * (0.5 - CGFloat(i) * 0.05)
            let isLeft = i % 2 == 0
            context.fill(
                Path(ellipseIn: CGRect(x: x + (isLeft ? -3 : 3), y: y, width: 5, height: 8)),
                with: .color(Color(hex: "6B7280").opacity(0.4))
            )
        }
    }

    static func sectionHeadlampNight(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .night)
        SkyPrimitives.stars(context: &context, size: size, count: 20, seed: 88)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.7, color: Color(hex: "1E293B"))
        headlampBeam(context: &context, size: size, position: .init(x: 0.5, y: 0.65))
        HumanPrimitives.silhouette(context: &context, size: size, position: .init(x: 0.5, y: 0.72), scale: 0.7, color: Color(hex: "1E293B"))
    }

    static func sectionNightGroup(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .night)
        SkyPrimitives.stars(context: &context, size: size, count: 15, seed: 77)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.7, color: Color(hex: "1E293B"))
        for (x, y) in [(0.3, 0.72), (0.45, 0.7), (0.6, 0.73)] as [(CGFloat, CGFloat)] {
            headlampBeam(context: &context, size: size, position: .init(x: x, y: y - 0.08), scale: 0.6)
            HumanPrimitives.silhouette(context: &context, size: size, position: .init(x: x, y: y), scale: 0.6, color: Color(hex: "1E293B"))
        }
    }

    static func sectionStarSky(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .night)
        SkyPrimitives.stars(context: &context, size: size, count: 50, seed: 99)
        SkyPrimitives.moon(context: &context, size: size, center: .init(x: 0.2, y: 0.15), radius: 0.03)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.85, color: Color(hex: "0F172A"))
    }

    // MARK: - Helpers

    private static func headlampBeam(context: inout GraphicsContext, size: CGSize, position: UnitPoint, scale: CGFloat = 1.0) {
        let x = position.x * size.width
        let y = position.y * size.height
        let beamLen = 50 * scale
        let beamWidth = 30 * scale

        var beam = Path()
        beam.move(to: CGPoint(x: x, y: y))
        beam.addLine(to: CGPoint(x: x - beamWidth / 2, y: y - beamLen))
        beam.addLine(to: CGPoint(x: x + beamWidth / 2, y: y - beamLen))
        beam.closeSubpath()

        let gradient = Gradient(colors: [Color(hex: "FCD34D").opacity(0.4), Color(hex: "FCD34D").opacity(0)])
        context.fill(beam, with: .linearGradient(gradient, startPoint: CGPoint(x: x, y: y), endPoint: CGPoint(x: x, y: y - beamLen)))
    }
}
