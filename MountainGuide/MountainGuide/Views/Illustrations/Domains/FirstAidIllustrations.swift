import SwiftUI

enum FirstAidIllustrations {

    // MARK: - Hero Illustrations

    static func heroAssessment(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.7)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.35, y: 0.65), scale: 0.8, action: .kneeling)
        HumanPrimitives.injuredPerson(context: &context, size: size, position: .init(x: 0.6, y: 0.72))
        EquipmentPrimitives.firstAidCross(context: &context, size: size, center: .init(x: 0.85, y: 0.15), crossSize: 0.08)
    }

    static func heroHypothermia(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.55)
        SnowPrimitives.snowCrystals(context: &context, size: size, count: 15, seed: 28)
        HumanPrimitives.silhouette(context: &context, size: size, position: .init(x: 0.5, y: 0.65), scale: 0.9)
        // Cold indicator
        context.draw(
            Text("❄︎").font(.system(size: 24)),
            at: CGPoint(x: size.width * 0.15, y: size.height * 0.15)
        )
    }

    static func heroAltitude(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.85), (0.2, 0.5), (0.4, 0.3), (0.5, 0.2), (0.6, 0.3), (0.8, 0.5), (1.0, 0.8)],
            style: .snowCapped)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.35), scale: 0.6, action: .walking)
        // Altitude lines
        for y in [0.2, 0.4, 0.6] as [CGFloat] {
            context.stroke(
                Path { p in p.move(to: CGPoint(x: 0, y: size.height * y)); p.addLine(to: CGPoint(x: size.width, y: size.height * y)) },
                with: .color(Color(hex: "6B7280").opacity(0.15)),
                style: StrokeStyle(lineWidth: 0.5, dash: [4, 4])
            )
        }
    }

    static func heroFractures(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.65)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.35, y: 0.6), scale: 0.8, action: .kneeling)
        HumanPrimitives.injuredPerson(context: &context, size: size, position: .init(x: 0.6, y: 0.68))
        EquipmentPrimitives.firstAidCross(context: &context, size: size, center: .init(x: 0.85, y: 0.15), crossSize: 0.07)
    }

    static func heroWounds(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF2F2"), Color(hex: "FEE2E2")])
        EquipmentPrimitives.firstAidCross(context: &context, size: size, center: .init(x: 0.5, y: 0.35), crossSize: 0.15)
        EquipmentPrimitives.backpack(context: &context, size: size, position: .init(x: 0.2, y: 0.7), color: Color(hex: "DC2626"))
        // Bandage roll
        context.stroke(Path(ellipseIn: CGRect(x: size.width * 0.65, y: size.height * 0.55, width: 30, height: 30)), with: .color(Color(hex: "F9FAFB")), lineWidth: 3)
        context.fill(Path(ellipseIn: CGRect(x: size.width * 0.67, y: size.height * 0.57, width: 26, height: 26)), with: .color(Color(hex: "F9FAFB").opacity(0.5)))
    }

    static func heroLightning(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .stormy)
        SkyPrimitives.stormCloud(context: &context, size: size, center: .init(x: 0.4, y: 0.15), scale: 1.3)
        WeatherPrimitives.lightning(context: &context, size: size, startPoint: .init(x: 0.4, y: 0.3), length: 0.35)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.85), (0.3, 0.55), (0.5, 0.45), (0.7, 0.55), (1.0, 0.8)],
            style: .silhouette, color: Color(hex: "1F2937"))
        HumanPrimitives.silhouette(context: &context, size: size, position: .init(x: 0.5, y: 0.7), scale: 0.6, color: Color(hex: "1F2937"))
    }

    static func heroFrostbite(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.5)
        SnowPrimitives.snowCrystals(context: &context, size: size, count: 20, seed: 55)
        WeatherPrimitives.windArrows(context: &context, size: size, direction: 0, count: 4, yCenter: 0.3)
        HumanPrimitives.silhouette(context: &context, size: size, position: .init(x: 0.5, y: 0.65), scale: 0.8)
    }

    static func heroHeat(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.5, y: 0.1), radius: 0.08, glowRadius: 0.18)
        TerrainPrimitives.slope(context: &context, size: size, startY: 0.5, endY: 0.8, color: Color(hex: "92400E").opacity(0.3))
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.7), scale: 0.8, action: .walking)
        SkyPrimitives.hazeGradient(context: &context, size: size, opacity: 0.3)
    }

    static func heroShelter(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .stormy)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.55)
        // Shelter shape
        var shelter = Path()
        shelter.move(to: CGPoint(x: size.width * 0.35, y: size.height * 0.65))
        shelter.addLine(to: CGPoint(x: size.width * 0.5, y: size.height * 0.45))
        shelter.addLine(to: CGPoint(x: size.width * 0.65, y: size.height * 0.65))
        shelter.closeSubpath()
        context.fill(shelter, with: .color(Color(hex: "F97316").opacity(0.6)))
        WeatherPrimitives.rain(context: &context, size: size, intensity: 15, seed: 47)
    }

    static func heroEvacuation(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.mountainRange(context: &context, size: size,
            peaks: [(0.0, 0.8), (0.3, 0.5), (0.5, 0.4), (0.7, 0.5), (1.0, 0.8)],
            style: .rocky)
        // Helicopter silhouette
        helicopter(context: &context, size: size, position: .init(x: 0.6, y: 0.2))
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.35, y: 0.7), scale: 0.7, action: .standing)
        HumanPrimitives.injuredPerson(context: &context, size: size, position: .init(x: 0.5, y: 0.73))
    }

    // MARK: - Section Illustrations

    static func sectionSceneSafety(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.65)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.6), scale: 0.8, action: .standing)
        // Safety perimeter
        context.stroke(
            Path(ellipseIn: CGRect(x: size.width * 0.3, y: size.height * 0.45, width: size.width * 0.4, height: size.height * 0.35)),
            with: .color(Color.firstAidAccent.opacity(0.3)),
            style: StrokeStyle(lineWidth: 2, dash: [6, 4])
        )
    }

    static func sectionAssessment(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "FEF2F2"), Color(hex: "FEE2E2")])
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.35, y: 0.6), scale: 0.9, action: .kneeling)
        HumanPrimitives.injuredPerson(context: &context, size: size, position: .init(x: 0.6, y: 0.65))
        EquipmentPrimitives.firstAidCross(context: &context, size: size, center: .init(x: 0.85, y: 0.15), crossSize: 0.06)
    }

    static func sectionHeadToToe(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        HumanPrimitives.injuredPerson(context: &context, size: size, position: .init(x: 0.5, y: 0.5), scale: 1.2)
        // Assessment arrows
        for y in [0.3, 0.45, 0.6, 0.7] as [CGFloat] {
            context.stroke(Path { p in
                p.move(to: CGPoint(x: size.width * 0.2, y: size.height * y))
                p.addLine(to: CGPoint(x: size.width * 0.35, y: size.height * y))
            }, with: .color(Color.firstAidAccent.opacity(0.4)), lineWidth: 1.5)
        }
    }

    static func sectionHypothermiaTreatment(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "EFF6FF"), Color(hex: "DBEAFE")])
        HumanPrimitives.injuredPerson(context: &context, size: size, position: .init(x: 0.5, y: 0.5), scale: 1.0)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.2, y: 0.55), scale: 0.7, action: .kneeling)
    }

    static func sectionHypothermiaWrap(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "EFF6FF"), Color(hex: "DBEAFE")])
        // Wrapped patient
        context.fill(
            Path(roundedRect: CGRect(x: size.width * 0.25, y: size.height * 0.35, width: size.width * 0.5, height: size.height * 0.3), cornerSize: CGSize(width: 12, height: 12)),
            with: .color(Color(hex: "FCD34D").opacity(0.4))
        )
        // Head poking out
        context.fill(Path(ellipseIn: CGRect(x: size.width * 0.2, y: size.height * 0.42, width: 16, height: 16)), with: .color(Color(hex: "374151").opacity(0.5)))
    }

    static func sectionAltitudeSymptoms(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.singlePeak(context: &context, size: size, peakX: 0.5, peakY: 0.15, baseWidth: 0.8)
        // Altitude zones
        for (y, label) in [(0.25, "5000m"), (0.45, "3000m"), (0.65, "1500m")] as [(CGFloat, String)] {
            context.stroke(Path { p in
                p.move(to: CGPoint(x: 0, y: size.height * y))
                p.addLine(to: CGPoint(x: size.width, y: size.height * y))
            }, with: .color(Color(hex: "6B7280").opacity(0.2)), style: StrokeStyle(lineWidth: 0.5, dash: [3, 3]))
            context.draw(Text(label).font(.system(size: 8, design: .monospaced)).foregroundStyle(Color.textSecondary), at: CGPoint(x: size.width * 0.9, y: size.height * y - 8))
        }
    }

    static func sectionSamSplint(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        // SAM splint shape (bent aluminum)
        context.stroke(
            Path { p in
                p.move(to: CGPoint(x: size.width * 0.2, y: size.height * 0.6))
                p.addLine(to: CGPoint(x: size.width * 0.4, y: size.height * 0.3))
                p.addQuadCurve(to: CGPoint(x: size.width * 0.6, y: size.height * 0.3), control: CGPoint(x: size.width * 0.5, y: size.height * 0.15))
                p.addLine(to: CGPoint(x: size.width * 0.8, y: size.height * 0.6))
            },
            with: .color(Color(hex: "3B82F6")),
            lineWidth: 4
        )
    }

    static func sectionKit(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        // First aid bag
        context.fill(Path(roundedRect: CGRect(x: size.width * 0.3, y: size.height * 0.25, width: size.width * 0.4, height: size.height * 0.5), cornerSize: CGSize(width: 8, height: 8)), with: .color(Color(hex: "DC2626")))
        EquipmentPrimitives.firstAidCross(context: &context, size: size, center: .init(x: 0.5, y: 0.5), crossSize: 0.12, color: .white)
    }

    static func sectionWoundIrrigation(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        PatternPrimitives.gradientOverlay(context: &context, size: size, colors: [Color(hex: "F5F5F7"), Color(hex: "E5E7EB")])
        // Syringe shape
        context.fill(Path(CGRect(x: size.width * 0.35, y: size.height * 0.35, width: size.width * 0.3, height: size.height * 0.12)), with: .color(Color(hex: "E5E7EB")))
        context.fill(Path(CGRect(x: size.width * 0.65, y: size.height * 0.38, width: size.width * 0.08, height: size.height * 0.06)), with: .color(Color(hex: "9CA3AF")))
        // Water stream
        context.stroke(Path { p in
            p.move(to: CGPoint(x: size.width * 0.35, y: size.height * 0.44))
            p.addQuadCurve(to: CGPoint(x: size.width * 0.2, y: size.height * 0.7), control: CGPoint(x: size.width * 0.25, y: size.height * 0.5))
        }, with: .color(Color(hex: "3B82F6").opacity(0.5)), lineWidth: 2)
    }

    static func sectionLightningPosition(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .stormy)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.6, color: Color(hex: "374151"))
        // Person in lightning position (crouched)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.65), scale: 0.6, color: Color(hex: "D1D5DB"), action: .kneeling)
        WeatherPrimitives.lightning(context: &context, size: size, startPoint: .init(x: 0.7, y: 0.05), length: 0.3)
    }

    static func sectionFrostbiteStages(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        // Gradient stages
        let stageColors: [(String, Color)] = [
            ("Stage 1", Color(hex: "FDE68A")),
            ("Stage 2", Color(hex: "F97316")),
            ("Stage 3", Color(hex: "DC2626")),
            ("Stage 4", Color(hex: "7F1D1D")),
        ]
        let w = size.width / CGFloat(stageColors.count)
        for (i, stage) in stageColors.enumerated() {
            let x = CGFloat(i) * w
            context.fill(Path(CGRect(x: x, y: 0, width: w + 1, height: size.height)), with: .color(stage.1.opacity(0.3)))
            context.draw(Text(stage.0).font(.system(size: 9, weight: .medium, design: .monospaced)).foregroundStyle(Color.textSecondary), at: CGPoint(x: x + w / 2, y: size.height * 0.9))
        }
    }

    static func sectionHeatExhaustion(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        SkyPrimitives.sun(context: &context, size: size, center: .init(x: 0.5, y: 0.1), radius: 0.07, glowRadius: 0.15)
        SkyPrimitives.hazeGradient(context: &context, size: size, opacity: 0.4)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.7), scale: 0.8, action: .kneeling)
    }

    static func sectionSnowShelter(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .stormy)
        SnowPrimitives.snowSurface(context: &context, size: size, yPosition: 0.5)
        // Snow cave cross section
        context.fill(
            Path { p in
                p.addArc(center: CGPoint(x: size.width * 0.5, y: size.height * 0.6), radius: 35, startAngle: .degrees(180), endAngle: .degrees(0), clockwise: false)
            },
            with: .color(Color(hex: "374151").opacity(0.5))
        )
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.5, y: 0.65), scale: 0.5, action: .kneeling)
    }

    static func sectionImprovisedLitter(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .overcast)
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.7)
        // Litter (two poles + surface)
        context.stroke(Path { p in
            p.move(to: CGPoint(x: size.width * 0.2, y: size.height * 0.55))
            p.addLine(to: CGPoint(x: size.width * 0.8, y: size.height * 0.55))
        }, with: .color(Color(hex: "78716C")), lineWidth: 3)
        context.stroke(Path { p in
            p.move(to: CGPoint(x: size.width * 0.2, y: size.height * 0.6))
            p.addLine(to: CGPoint(x: size.width * 0.8, y: size.height * 0.6))
        }, with: .color(Color(hex: "78716C")), lineWidth: 3)
        // Patient on litter
        context.fill(Path(roundedRect: CGRect(x: size.width * 0.3, y: size.height * 0.52, width: size.width * 0.4, height: size.height * 0.1), cornerSize: CGSize(width: 4, height: 4)), with: .color(Color(hex: "6B7280").opacity(0.4)))
        // Carriers
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.15, y: 0.6), scale: 0.6, action: .walking)
        HumanPrimitives.stickFigure(context: &context, size: size, position: .init(x: 0.85, y: 0.6), scale: 0.6, action: .walking)
    }

    // MARK: - Helpers

    private static func helicopter(context: inout GraphicsContext, size: CGSize, position: UnitPoint) {
        let x = position.x * size.width
        let y = position.y * size.height

        // Body
        context.fill(Path(roundedRect: CGRect(x: x - 15, y: y - 5, width: 30, height: 12), cornerSize: CGSize(width: 5, height: 5)), with: .color(Color(hex: "DC2626")))
        // Rotor
        context.stroke(Path { p in
            p.move(to: CGPoint(x: x - 25, y: y - 6))
            p.addLine(to: CGPoint(x: x + 25, y: y - 6))
        }, with: .color(Color(hex: "374151")), lineWidth: 1.5)
        // Tail
        context.stroke(Path { p in
            p.move(to: CGPoint(x: x + 15, y: y))
            p.addLine(to: CGPoint(x: x + 30, y: y - 3))
        }, with: .color(Color(hex: "374151")), lineWidth: 2)
    }
}
