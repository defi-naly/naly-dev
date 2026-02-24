import SwiftUI

enum WeatherIllustrations {

    // MARK: - Hero Illustrations

    static func heroAtmosphere(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        // Layered atmosphere with gradient sky and mountain silhouette
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.75, y: 0.15))
        SkyPrimitives.cirrus(context: &context, size: size, center: .init(x: 0.3, y: 0.12), scale: 0.8)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.6, y: 0.35), scale: 1.0)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.8), (0.15, 0.55), (0.3, 0.4), (0.5, 0.35), (0.7, 0.45), (0.85, 0.6), (1.0, 0.75)],
            style: .snowCapped)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.75, color: Color(hex: "6B7280").opacity(0.5))
    }

    static func heroPressureSystems(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        WeatherPrimitives.isobars(context: &context, size: size, center: .init(x: 0.35, y: 0.4), count: 5)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.7, y: 0.25), scale: 1.2)
        WeatherPrimitives.windArrows(context: &context, size: size, direction: -0.2, count: 3, yCenter: 0.6)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.8)
    }

    static func heroFronts(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        WeatherPrimitives.frontLine(context: &context, size: size, yPosition: 0.45, isWarm: false)
        SkyPrimitives.stormCloud(context: &context, size: size, center: .init(x: 0.3, y: 0.25), scale: 1.0)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.7, y: 0.3), scale: 0.9)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.85), (0.25, 0.6), (0.45, 0.5), (0.65, 0.55), (0.85, 0.65), (1.0, 0.8)],
            style: .silhouette)
    }

    static func heroCloudTypes(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.cirrus(context: &context, size: size, center: .init(x: 0.5, y: 0.08), scale: 1.0)
        SkyPrimitives.lenticular(context: &context, size: size, center: .init(x: 0.3, y: 0.25), scale: 0.8)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.65, y: 0.4), scale: 1.2)
        SkyPrimitives.stormCloud(context: &context, size: size, center: .init(x: 0.2, y: 0.5), scale: 0.7)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.78)
    }

    static func heroThermals(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.8, y: 0.12))
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.35, bottomY: 0.8, topY: 0.25)
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.6, bottomY: 0.75, topY: 0.3)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.35, y: 0.2), scale: 0.9)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.6, y: 0.25), scale: 0.7)
        TerrainPrimitives.valley(context: &context, size: size)
    }

    static func heroLapseRates(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        // Temperature layers
        WeatherPrimitives.atmosphericLayers(context: &context, size: size, labels: [
            (name: "Cold", color: Color(hex: "3B82F6"), fraction: 0.25),
            (name: "Cool", color: Color(hex: "60A5FA"), fraction: 0.25),
            (name: "Mild", color: Color(hex: "FCD34D"), fraction: 0.25),
            (name: "Warm", color: Color(hex: "F97316"), fraction: 0.25),
        ])
        TerrainPrimitives.singlePeak(context: &context, size: size, peakY: 0.15, color: Color(hex: "6B7280"))
        TerrainPrimitives.snowCap(context: &context, size: size, peakX: 0.5, peakY: 0.15)
    }

    static func heroMountainWinds(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.singlePeak(context: &context, size: size, peakX: 0.5, peakY: 0.25, baseWidth: 0.7)
        WeatherPrimitives.windArrows(context: &context, size: size, direction: 0, count: 5, yCenter: 0.35)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.8, y: 0.2))
        SkyPrimitives.hazeGradient(context: &context, size: size, opacity: 0.2)
    }

    static func heroMountainWaves(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.singlePeak(context: &context, size: size, peakX: 0.3, peakY: 0.4, baseWidth: 0.4)
        SkyPrimitives.lenticular(context: &context, size: size, center: .init(x: 0.6, y: 0.2), scale: 1.2)
        SkyPrimitives.lenticular(context: &context, size: size, center: .init(x: 0.65, y: 0.32), scale: 0.8, opacity: 0.6)
        WeatherPrimitives.windArrows(context: &context, size: size, direction: 0, count: 3, yCenter: 0.5)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.75)
    }

    static func heroConvergence(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        // Opposing wind arrows
        WeatherPrimitives.windArrows(context: &context, size: size, direction: 0, count: 3, yCenter: 0.4)
        WeatherPrimitives.windArrows(context: &context, size: size, direction: .pi, count: 3, yCenter: 0.5)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.5, y: 0.2), scale: 1.3)
        TerrainPrimitives.valley(context: &context, size: size)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.65, color: Color(hex: "4D7C5C").opacity(0.4))
    }

    static func heroThunderstorms(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .stormy)
        SkyPrimitives.stormCloud(context: &context, size: size, center: .init(x: 0.4, y: 0.2), scale: 1.5)
        WeatherPrimitives.lightning(context: &context, size: size, startPoint: .init(x: 0.4, y: 0.35), length: 0.35)
        WeatherPrimitives.rain(context: &context, size: size, intensity: 25, angle: 0.05)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.85), (0.2, 0.6), (0.4, 0.5), (0.6, 0.55), (0.8, 0.65), (1.0, 0.8)],
            style: .silhouette, color: Color(hex: "1F2937"))
    }

    // MARK: - Section Illustrations

    static func sectionAtmosphereLayers(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        WeatherPrimitives.atmosphericLayers(context: &context, size: size, labels: [
            (name: "Thermosphere", color: Color(hex: "1E1B4B"), fraction: 0.15),
            (name: "Mesosphere", color: Color(hex: "312E81"), fraction: 0.2),
            (name: "Stratosphere", color: Color(hex: "3B82F6"), fraction: 0.25),
            (name: "Troposphere", color: Color(hex: "93C5FD"), fraction: 0.4),
        ])
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.88, color: Color(hex: "4B5563"))
    }

    static func sectionPressureMap(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        WeatherPrimitives.isobars(context: &context, size: size, center: .init(x: 0.4, y: 0.45), count: 5)
        WeatherPrimitives.windArrows(context: &context, size: size, direction: 0.3, count: 4, yCenter: 0.3)
    }

    static func sectionColdFront(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        WeatherPrimitives.frontLine(context: &context, size: size, yPosition: 0.5, isWarm: false)
        SkyPrimitives.stormCloud(context: &context, size: size, center: .init(x: 0.35, y: 0.2), scale: 1.1)
        WeatherPrimitives.rain(context: &context, size: size, intensity: 15, seed: 21)
    }

    static func sectionCumulus(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.3, y: 0.3), scale: 1.3)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.7, y: 0.4), scale: 0.9)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.5, y: 0.55), scale: 0.6)
    }

    static func sectionThermalSource(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.7, y: 0.1))
        TerrainPrimitives.foreground(context: &context, size: size, yPosition: 0.7, color: Color(hex: "92400E").opacity(0.4))
        WeatherPrimitives.thermalArrow(context: &context, size: size, x: 0.45, bottomY: 0.7, topY: 0.2)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.45, y: 0.15), scale: 0.8)
    }

    static func sectionStabilitySky(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .hazy)
        SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: 0.3, y: 0.3), scale: 0.7)
        SkyPrimitives.cirrus(context: &context, size: size, center: .init(x: 0.6, y: 0.15))
        SkyPrimitives.hazeGradient(context: &context, size: size, opacity: 0.4)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.8)
    }

    static func sectionFoehnWall(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.singlePeak(context: &context, size: size, peakX: 0.4, peakY: 0.3, baseWidth: 0.5)
        SkyPrimitives.cloudBank(context: &context, size: size, yPosition: 0.28, opacity: 0.9)
        WeatherPrimitives.windArrows(context: &context, size: size, direction: 0, count: 3, yCenter: 0.5)
    }

    static func sectionLenticular(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.lenticular(context: &context, size: size, center: .init(x: 0.5, y: 0.3), scale: 1.5)
        SkyPrimitives.lenticular(context: &context, size: size, center: .init(x: 0.55, y: 0.45), scale: 1.0, opacity: 0.6)
        TerrainPrimitives.singlePeak(context: &context, size: size, peakX: 0.35, peakY: 0.5, baseWidth: 0.4, color: Color(hex: "6B7280"))
    }

    static func sectionConvergenceLine(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        // Line of cumulus along convergence
        for i in 0..<5 {
            let x = 0.15 + CGFloat(i) * 0.15
            SkyPrimitives.cumulus(context: &context, size: size, center: .init(x: x, y: 0.35), scale: 0.6)
        }
        TerrainPrimitives.valley(context: &context, size: size, color: Color(hex: "4D7C5C").opacity(0.4))
    }

    static func sectionCumulonimbus(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .stormy)
        SkyPrimitives.stormCloud(context: &context, size: size, center: .init(x: 0.5, y: 0.2), scale: 1.8)
        // Anvil top
        SkyPrimitives.cirrus(context: &context, size: size, center: .init(x: 0.65, y: 0.08), scale: 1.0, opacity: 0.7)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.85, color: Color(hex: "374151"))
    }

    static func sectionLightningRidge(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .stormy)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.85), (0.2, 0.55), (0.4, 0.4), (0.6, 0.5), (0.8, 0.6), (1.0, 0.8)],
            style: .silhouette, color: Color(hex: "1F2937"))
        WeatherPrimitives.lightning(context: &context, size: size, startPoint: .init(x: 0.35, y: 0.15), length: 0.25)
        WeatherPrimitives.lightning(context: &context, size: size, startPoint: .init(x: 0.6, y: 0.1), length: 0.3)
        WeatherPrimitives.rain(context: &context, size: size, intensity: 20)
    }
}
