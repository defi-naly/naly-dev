import Foundation

// MARK: - Lesson Content Registry

enum LessonContentData {

    /// Returns lesson content for a module if it exists, nil otherwise.
    /// Modules without lesson content fall back to the old ModuleDetailView.
    static func getLesson(domain: DomainId, slug: String) -> Lesson? {
        switch domain {
        case .weather:
            return weatherLessons[slug]
        case .avalanche:
            return avalancheLessons[slug]
        case .flying:
            return flyingLessons[slug]
        }
    }

    /// Check if a lesson exists for a given module
    static func hasLesson(domain: DomainId, slug: String) -> Bool {
        getLesson(domain: domain, slug: slug) != nil
    }

    // MARK: - Weather Lessons

    private static let weatherLessons: [String: Lesson] = [
        "atmosphere": WeatherLessons.atmosphere,
        "pressure-systems": WeatherLessons.pressureSystems,
        "fronts": WeatherLessons.fronts,
        "thermals": WeatherLessons.thermals,
        "lapse-rates": WeatherLessons.lapseRates,
        "clouds": WeatherLessons.clouds,
        "mountain-winds": WeatherLessons.mountainWinds,
        "mountain-waves": WeatherLessons.mountainWaves,
        "convergence": WeatherLessons.convergence,
        "thunderstorms": WeatherLessons.thunderstorms,
    ]

    // MARK: - Avalanche Lessons

    private static let avalancheLessons: [String: Lesson] = [
        "avalanche-triangle": AvalancheLessons.avalancheTriangle,
        "slab-physics": AvalancheLessons.slabPhysics,
        "slope-angle": AvalancheLessons.slopeAngle,
        "terrain-traps": AvalancheLessons.terrainTraps,
        "snowpack-layers": AvalancheLessons.snowpackLayers,
        "stability-testing": AvalancheLessons.stabilityTesting,
        "weather-loading": AvalancheLessons.weatherLoading,
        "human-factors": AvalancheLessons.humanFactors,
        "decision-framework": AvalancheLessons.decisionFramework,
        "companion-rescue": AvalancheLessons.companionRescue,
    ]

    // MARK: - Flying Lessons

    private static let flyingLessons: [String: Lesson] = [
        "thermal-entry": FlyingLessons.thermalEntry,
        "soaring-fundamentals": FlyingLessons.soaringFundamentals,
        "reading-sky": FlyingLessons.readingSky,
        "centering": FlyingLessons.centering,
        "climbing": FlyingLessons.climbing,
        "valley-flying": FlyingLessons.valleyFlying,
        "speed-to-fly": FlyingLessons.speedToFly,
        "xc-tactics": FlyingLessons.xcTactics,
        "convergence-sea-breeze": FlyingLessons.convergenceSeaBreeze,
        "between-thermals": FlyingLessons.betweenThermals,
    ]
}
