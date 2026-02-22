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
        case .navigation:
            return navigationLessons[slug]
        case .ropeSystems:
            return ropeSystemsLessons[slug]
        case .glacierTravel:
            return glacierTravelLessons[slug]
        case .firstAid:
            return firstAidLessons[slug]
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

    // MARK: - Navigation Lessons

    private static let navigationLessons: [String: Lesson] = [
        "map-reading": NavigationLessons.mapReading,
        "compass": NavigationLessons.compass,
        "gps": NavigationLessons.gps,
        "route-planning": NavigationLessons.routePlanning,
        "terrain-association": NavigationLessons.terrainAssociation,
        "contouring": NavigationLessons.contouring,
        "triangulation": NavigationLessons.triangulation,
        "whiteout-navigation": NavigationLessons.whiteoutNavigation,
        "night-navigation": NavigationLessons.nightNavigation,
        "emergency-navigation": NavigationLessons.emergencyNavigation,
    ]

    // MARK: - Rope Systems Lessons

    private static let ropeSystemsLessons: [String: Lesson] = [
        "knots": RopeSystemsLessons.knots,
        "anchors": RopeSystemsLessons.anchors,
        "belaying": RopeSystemsLessons.belaying,
        "rappelling": RopeSystemsLessons.rappelling,
        "rope-mechanics": RopeSystemsLessons.ropeMechanics,
        "top-rope": RopeSystemsLessons.topRope,
        "multi-pitch": RopeSystemsLessons.multiPitch,
        "rescue-hauls": RopeSystemsLessons.rescueHauls,
        "crevasse-rescue-rope": RopeSystemsLessons.crevasseRescueRope,
        "improvised-systems": RopeSystemsLessons.improvisedSystems,
    ]

    // MARK: - Glacier Travel Lessons

    private static let glacierTravelLessons: [String: Lesson] = [
        "glacier-anatomy": GlacierTravelLessons.glacierAnatomy,
        "crevasse-identification": GlacierTravelLessons.crevasseIdentification,
        "rope-teams": GlacierTravelLessons.ropeTeams,
        "probe-techniques": GlacierTravelLessons.probeTechniques,
        "glacier-route-finding": GlacierTravelLessons.glacierRouteFinding,
        "travel-protocols": GlacierTravelLessons.travelProtocols,
        "crevasse-rescue": GlacierTravelLessons.crevasseRescue,
        "glacier-camping": GlacierTravelLessons.glacierCamping,
        "seasonal-changes": GlacierTravelLessons.seasonalChanges,
        "glacier-weather": GlacierTravelLessons.glacierWeather,
    ]

    // MARK: - First Aid Lessons

    private static let firstAidLessons: [String: Lesson] = [
        "wilderness-assessment": FirstAidLessons.wildernessAssessment,
        "hypothermia": FirstAidLessons.hypothermia,
        "altitude-sickness": FirstAidLessons.altitudeSickness,
        "fractures-splints": FirstAidLessons.fracturesSplints,
        "wound-care": FirstAidLessons.woundCare,
        "lightning-injuries": FirstAidLessons.lightningInjuries,
        "frostbite": FirstAidLessons.frostbite,
        "dehydration-heat": FirstAidLessons.dehydrationHeat,
        "emergency-shelter": FirstAidLessons.emergencyShelter,
        "evacuation-planning": FirstAidLessons.evacuationPlanning,
    ]
}
