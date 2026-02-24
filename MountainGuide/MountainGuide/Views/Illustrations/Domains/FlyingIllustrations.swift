import SwiftUI

enum FlyingIllustrations {

    // MARK: - Hero Illustrations

    static func heroSoaring(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.8, y: 0.1))
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.3, y: 0.2), scale: 1.0)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.65, y: 0.3), scale: 0.7)
        paraglider(context: &context, size: size, position: .init(x: 0.5, y: 0.35))
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.85), (0.2, 0.6), (0.4, 0.5), (0.6, 0.45), (0.8, 0.55), (1.0, 0.75)],
            style: .grassy)
    }

    static func heroThermalStructure(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.75, y: 0.08))
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.4, bottomY: 0.8, topY: 0.2)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.4, y: 0.15), scale: 1.0)
        paraglider(context: &context, size: size, position: .init(x: 0.42, y: 0.4))
        TerrainPrimitives.valley(context: &context, size: size)
    }

    static func heroSkyReading(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.cirrus(context: &context, size: size, center: .init(x: 0.4, y: 0.08))
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.25, y: 0.25), scale: 0.9)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.55, y: 0.3), scale: 1.1)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.8, y: 0.35), scale: 0.7)
        SkyPrimitives.hazeGradient(context: &context, size: size, opacity: 0.15)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.75)
    }

    static func heroCentering(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.5, bottomY: 0.8, topY: 0.2)
        // Spiral path
        spiralPath(context: &context, size: size, center: .init(x: 0.5, y: 0.4), radius: 0.12)
        paraglider(context: &context, size: size, position: .init(x: 0.55, y: 0.35))
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.5, y: 0.15), scale: 0.9)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.8)
    }

    static func heroCloudbase(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.cloudBank(context: &context, size: size, yPosition: 0.35, opacity: 0.8)
        paraglider(context: &context, size: size, position: .init(x: 0.5, y: 0.3))
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.9), (0.25, 0.6), (0.5, 0.5), (0.75, 0.65), (1.0, 0.85)],
            style: .silhouette, color: Color(hex: "6B7280").opacity(0.3))
    }

    static func heroValleyTactics(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.8, y: 0.1))
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.4), (0.15, 0.55), (0.3, 0.7), (0.5, 0.8), (0.7, 0.7), (0.85, 0.55), (1.0, 0.4)],
            style: .grassy)
        paraglider(context: &context, size: size, position: .init(x: 0.5, y: 0.35))
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.75, bottomY: 0.55, topY: 0.25)
    }

    static func heroSpeedToFly(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        paraglider(context: &context, size: size, position: .init(x: 0.3, y: 0.3))
        // Glide path
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.3, y: 0.35), .init(x: 0.5, y: 0.45), .init(x: 0.7, y: 0.55), .init(x: 0.9, y: 0.65)],
            color: Color.flyingAccent.opacity(0.5))
        WeatherPrimitives.windArrows(context: &context, size: size, direction: .pi, count: 3, yCenter: 0.25)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.8)
    }

    static func heroXCPlanning(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        // Route line across thermals
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.2, y: 0.2), scale: 0.7)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.5, y: 0.25), scale: 0.8)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.8, y: 0.2), scale: 0.7)
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.1, y: 0.5), .init(x: 0.2, y: 0.3), .init(x: 0.5, y: 0.35), .init(x: 0.8, y: 0.3), .init(x: 0.9, y: 0.5)],
            color: Color.flyingAccent)
        TerrainPrimitives.valley(context: &context, size: size)
    }

    static func heroConvergence(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        // Line of cumulus
        for i in 0..<6 {
            SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.1 + CGFloat(i) * 0.15, y: 0.25), scale: 0.5)
        }
        WeatherPrimitives.windArrows(context: &context, size: size, direction: .pi / 4, count: 3, yCenter: 0.15)
        WeatherPrimitives.windArrows(context: &context, size: size, direction: -.pi / 4 + .pi, count: 3, yCenter: 0.15)
        paraglider(context: &context, size: size, position: .init(x: 0.5, y: 0.2))
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.7)
    }

    static func heroGlide(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.hazeGradient(context: &context, size: size, opacity: 0.2)
        paraglider(context: &context, size: size, position: .init(x: 0.25, y: 0.25))
        // Glide slope
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.25, y: 0.3), .init(x: 0.85, y: 0.7)],
            color: Color.flyingAccent.opacity(0.4))
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.9), (0.3, 0.65), (0.5, 0.55), (0.7, 0.6), (1.0, 0.8)],
            style: .grassy)
    }

    // MARK: - Section Illustrations

    static func sectionThreeLiftSources(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        // Thermal
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.2, bottomY: 0.8, topY: 0.3)
        // Ridge lift
        TerrainPrimitives.singlePeak(context: &context, size: size, peakX: 0.5, peakY: 0.45, baseWidth: 0.25, color: Color(hex: "6B7280"))
        WeatherPrimitives.windArrows(context: &context, size: size, direction: -.pi / 3, count: 2, yCenter: 0.35)
        // Wave
        SkyPrimitives.lenticular(context: &context, size: size, center: .init(x: 0.8, y: 0.25), scale: 0.8)
    }

    static func sectionThermalStreet(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        for i in 0..<5 {
            let x = 0.1 + CGFloat(i) * 0.18
            SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: x, y: 0.3), scale: 0.5)
            WeatherPrimitives.thermalArrow(context: &context, size: size, x: x, bottomY: 0.8, topY: 0.4)
        }
        TerrainPrimitives.foreground(context: &context, size: size, yPosition: 0.82)
    }

    static func sectionParagliderThermal(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.5, bottomY: 0.85, topY: 0.2)
        spiralPath(context: &context, size: size, center: .init(x: 0.5, y: 0.4), radius: 0.1)
        paraglider(context: &context, size: size, position: .init(x: 0.55, y: 0.35))
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.5, y: 0.15), scale: 0.8)
    }

    static func sectionCumulusMarkers(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.3, y: 0.25), scale: 1.0)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.65, y: 0.3), scale: 1.2)
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.3, bottomY: 0.8, topY: 0.35)
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.65, bottomY: 0.8, topY: 0.4)
    }

    static func sectionBlueThermalHaze(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .hazy)
        SkyPrimitives.hazeGradient(context: &context, size: size, opacity: 0.4)
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.4, bottomY: 0.8, topY: 0.3)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.8)
    }

    static func sectionValleyOverview(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.8, y: 0.1))
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.35), (0.15, 0.5), (0.3, 0.7), (0.5, 0.8), (0.7, 0.7), (0.85, 0.5), (1.0, 0.35)],
            style: .grassy)
        paraglider(context: &context, size: size, position: .init(x: 0.5, y: 0.3))
    }

    static func sectionSunnySlope(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.8, y: 0.1))
        TerrainPrimitives.slope(context: &context, size: size, startY: 0.3, endY: 0.8, color: Color(hex: "4D7C5C"))
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.5, bottomY: 0.6, topY: 0.2)
    }

    static func sectionSpeedBarCockpit(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "87CEEB"), Color(hex: "E0F0FF")])
        // Simplified cockpit/vario display
        let cx = size.width * 0.5, cy = size.height * 0.5
        context.stroke(Path(roundedRect: CGRect(x: cx - 40, y: cy - 50, width: 80, height: 100), cornerSize: CGSize(width: 8, height: 8)), with: .color(Color(hex: "374151")), lineWidth: 2)
        context.draw(Text("SPD").font(.system(size: 10, weight: .bold, design: .monospaced)).foregroundStyle(Color.flyingAccent), at: CGPoint(x: cx, y: cy - 30))
        context.draw(Text("42").font(.system(size: 20, weight: .bold, design: .monospaced)).foregroundStyle(Color.textPrimary), at: CGPoint(x: cx, y: cy))
        context.draw(Text("km/h").font(.system(size: 8, design: .monospaced)).foregroundStyle(Color.textSecondary), at: CGPoint(x: cx, y: cy + 18))
    }

    static func sectionXCCockpitSetup(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "87CEEB"), Color(hex: "E0F0FF")])
        PatternPrimitives.grid(context: &context, size: size, spacing: 20, color: Color(hex: "6B7280").opacity(0.1))
        // GPS track
        PatternPrimitives.dashedPath(context: &context, size: size,
            points: [.init(x: 0.1, y: 0.7), .init(x: 0.3, y: 0.4), .init(x: 0.5, y: 0.5), .init(x: 0.7, y: 0.3), .init(x: 0.9, y: 0.6)],
            color: Color.flyingAccent)
    }

    static func sectionConvergenceLine(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        for i in 0..<6 {
            SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.1 + CGFloat(i) * 0.15, y: 0.35), scale: 0.5)
        }
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.75)
    }

    static func sectionSeaBreezeFront(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        WeatherPrimitives.frontLine(context: &context, size: size, yPosition: 0.5, isWarm: true)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.5, y: 0.3), scale: 1.0)
        // Water on one side
        context.fill(
            Path(CGRect(x: 0, y: size.height * 0.7, width: size.width * 0.4, height: size.height * 0.3)),
            with: .color(Color(hex: "3B82F6").opacity(0.2))
        )
        TerrainPrimitives.foreground(context: &context, size: size, yPosition: 0.7, color: Color(hex: "4D7C5C").opacity(0.5))
    }

    static func sectionLowSaveTerrain(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.valley(context: &context, size: size)
        paraglider(context: &context, size: size, position: .init(x: 0.5, y: 0.5), scale: 0.7)
        // Landing field
        context.fill(
            Path(roundedRect: CGRect(x: size.width * 0.3, y: size.height * 0.75, width: size.width * 0.4, height: size.height * 0.1), cornerSize: CGSize(width: 4, height: 4)),
            with: .color(Color(hex: "4ADE80").opacity(0.3))
        )
    }

    // MARK: - Helpers

    private static func paraglider(context: inout GraphicsContext, size: CGSize, position: UnitPoint, scale: CGFloat = 1.0) {
        let x = position.x * size.width
        let y = position.y * size.height
        let w = 24 * scale
        let h = 8 * scale

        // Canopy
        var canopy = Path()
        canopy.addArc(center: CGPoint(x: x, y: y - h), radius: w / 2, startAngle: .degrees(180), endAngle: .degrees(0), clockwise: false)
        context.fill(canopy, with: .color(Color.flyingAccent.opacity(0.8)))

        // Lines
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: x - w * 0.4, y: y - h * 0.5))
                p.addLine(to: CGPoint(x: x, y: y + h * 0.5))
                p.move(to: CGPoint(x: x + w * 0.4, y: y - h * 0.5))
                p.addLine(to: CGPoint(x: x, y: y + h * 0.5))
            },
            with: .color(Color(hex: "6B7280").opacity(0.5)),
            lineWidth: 0.8
        )

        // Pilot dot
        context.fill(
            Path(ellipseIn: CGRect(x: x - 2, y: y + h * 0.3, width: 4, height: 4)),
            with: .color(Color(hex: "374151"))
        )
    }

    private static func spiralPath(context: inout GraphicsContext, size: CGSize, center: UnitPoint, radius: CGFloat) {
        let cx = center.x * size.width
        let cy = center.y * size.height
        let r = radius * min(size.width, size.height)

        var path = Path()
        for i in 0..<24 {
            let angle = CGFloat(i) * .pi / 6
            let ri = r * (1.0 - CGFloat(i) * 0.03)
            let x = cx + cos(angle) * ri
            let y = cy + sin(angle) * ri
            if i == 0 { path.move(to: CGPoint(x: x, y: y)) }
            else { path.addLine(to: CGPoint(x: x, y: y)) }
        }
        context.stroke(path, with: .color(Color.flyingAccent.opacity(0.4)), style: StrokeStyle(lineWidth: 1.5, dash: [4, 3]))
    }
}
