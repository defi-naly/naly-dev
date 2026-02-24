import SwiftUI

typealias IllustrationRenderer = (inout GraphicsContext, CGSize, DomainId) -> Void

enum IllustrationRegistry {

    static func lookup(_ imageName: String) -> IllustrationRenderer? {
        registry[imageName]
    }

    // MARK: - Generic Fallback

    static func genericFallback(_ context: inout GraphicsContext, _ size: CGSize, _ domain: DomainId) {
        SkyPrimitives.skyGradient(context: &context, size: size, style: .clearDay)
        TerrainPrimitives.mountainRange(
            context: &context, size: size,
            peaks: [(0.05, 0.7), (0.2, 0.5), (0.35, 0.35), (0.5, 0.3), (0.65, 0.4), (0.8, 0.55), (0.95, 0.65)],
            style: .snowCapped,
            color: domain.color.opacity(0.4)
        )
        TerrainPrimitives.ridgeline(context: &context, size: size, yPosition: 0.7, color: domain.color.opacity(0.2))
    }

    // MARK: - Full Registry

    private static let registry: [String: IllustrationRenderer] = {
        var r: [String: IllustrationRenderer] = [:]

        // ── WEATHER ──────────────────────────────────────────
        // Heroes
        r["Photos/Heroes/hero-weather-atmosphere"] = WeatherIllustrations.heroAtmosphere
        r["Photos/Heroes/hero-weather-pressure-systems"] = WeatherIllustrations.heroPressureSystems
        r["Photos/Heroes/hero-weather-fronts"] = WeatherIllustrations.heroFronts
        r["Photos/Heroes/hero-weather-cloud-types"] = WeatherIllustrations.heroCloudTypes
        r["Photos/Heroes/hero-weather-thermals"] = WeatherIllustrations.heroThermals
        r["Photos/Heroes/hero-weather-lapse-rates"] = WeatherIllustrations.heroLapseRates
        r["Photos/Heroes/hero-weather-mountain-winds"] = WeatherIllustrations.heroMountainWinds
        r["Photos/Heroes/hero-weather-mountain-waves"] = WeatherIllustrations.heroMountainWaves
        r["Photos/Heroes/hero-weather-convergence"] = WeatherIllustrations.heroConvergence
        r["Photos/Heroes/hero-weather-thunderstorms"] = WeatherIllustrations.heroThunderstorms
        // Sections
        r["Photos/weather-atmosphere-layers"] = WeatherIllustrations.sectionAtmosphereLayers
        r["Photos/weather-pressure-map"] = WeatherIllustrations.sectionPressureMap
        r["Photos/weather-cold-front"] = WeatherIllustrations.sectionColdFront
        r["Photos/weather-cumulus"] = WeatherIllustrations.sectionCumulus
        r["Photos/weather-thermal-source"] = WeatherIllustrations.sectionThermalSource
        r["Photos/weather-stability-sky"] = WeatherIllustrations.sectionStabilitySky
        r["Photos/weather-foehn-wall"] = WeatherIllustrations.sectionFoehnWall
        r["Photos/weather-lenticular"] = WeatherIllustrations.sectionLenticular
        r["Photos/weather-convergence-line"] = WeatherIllustrations.sectionConvergenceLine
        r["Photos/weather-cumulonimbus"] = WeatherIllustrations.sectionCumulonimbus
        r["Photos/weather-lightning-ridge"] = WeatherIllustrations.sectionLightningRidge

        // ── AVALANCHE ────────────────────────────────────────
        // Heroes
        r["Photos/Heroes/hero-avalanche-triangle"] = AvalancheIllustrations.heroTriangle
        r["Photos/Heroes/hero-avalanche-slab-mechanics"] = AvalancheIllustrations.heroSlabMechanics
        r["Photos/Heroes/hero-avalanche-slope-angle"] = AvalancheIllustrations.heroSlopeAngle
        r["Photos/Heroes/hero-avalanche-terrain-traps"] = AvalancheIllustrations.heroTerrainTraps
        r["Photos/Heroes/hero-avalanche-snowpack"] = AvalancheIllustrations.heroSnowpack
        r["Photos/Heroes/hero-avalanche-stability-testing"] = AvalancheIllustrations.heroStabilityTesting
        r["Photos/Heroes/hero-avalanche-wind-loading"] = AvalancheIllustrations.heroWindLoading
        r["Photos/Heroes/hero-avalanche-human-factors"] = AvalancheIllustrations.heroHumanFactors
        r["Photos/Heroes/hero-avalanche-decision-frameworks"] = AvalancheIllustrations.heroDecisionFrameworks
        r["Photos/Heroes/hero-avalanche-companion-rescue"] = AvalancheIllustrations.heroCompanionRescue
        // Sections
        r["Photos/avalanche-triangle-overview"] = AvalancheIllustrations.sectionTriangleOverview
        r["Photos/avalanche-slab-anatomy"] = AvalancheIllustrations.sectionSlabAnatomy
        r["Photos/avalanche-slope-angle"] = AvalancheIllustrations.sectionSlopeAngle
        r["Photos/avalanche-terrain-trap"] = AvalancheIllustrations.sectionTerrainTrap
        r["Photos/avalanche-debris"] = AvalancheIllustrations.sectionDebris
        r["Photos/avalanche-crystal-types"] = AvalancheIllustrations.sectionCrystalTypes
        r["Photos/avalanche-column-test"] = AvalancheIllustrations.sectionColumnTest
        r["Photos/avalanche-wind-signs"] = AvalancheIllustrations.sectionWindSigns
        r["Photos/avalanche-group-decision"] = AvalancheIllustrations.sectionGroupDecision
        r["Photos/avalanche-transceiver-search"] = AvalancheIllustrations.sectionTransceiverSearch

        // ── FLYING ───────────────────────────────────────────
        // Heroes
        r["Photos/Heroes/hero-flying-soaring"] = FlyingIllustrations.heroSoaring
        r["Photos/Heroes/hero-flying-thermal-structure"] = FlyingIllustrations.heroThermalStructure
        r["Photos/Heroes/hero-flying-sky-reading"] = FlyingIllustrations.heroSkyReading
        r["Photos/Heroes/hero-flying-centering"] = FlyingIllustrations.heroCentering
        r["Photos/Heroes/hero-flying-cloudbase"] = FlyingIllustrations.heroCloudbase
        r["Photos/Heroes/hero-flying-valley-tactics"] = FlyingIllustrations.heroValleyTactics
        r["Photos/Heroes/hero-flying-speed-to-fly"] = FlyingIllustrations.heroSpeedToFly
        r["Photos/Heroes/hero-flying-xc-planning"] = FlyingIllustrations.heroXCPlanning
        r["Photos/Heroes/hero-flying-convergence"] = FlyingIllustrations.heroConvergence
        r["Photos/Heroes/hero-flying-glide"] = FlyingIllustrations.heroGlide
        // Sections
        r["Photos/flying-three-lift-sources"] = FlyingIllustrations.sectionThreeLiftSources
        r["Photos/flying-thermal-street"] = FlyingIllustrations.sectionThermalStreet
        r["Photos/flying-paraglider-thermal"] = FlyingIllustrations.sectionParagliderThermal
        r["Photos/flying-cumulus-markers"] = FlyingIllustrations.sectionCumulusMarkers
        r["Photos/flying-blue-thermal-haze"] = FlyingIllustrations.sectionBlueThermalHaze
        r["Photos/flying-valley-overview"] = FlyingIllustrations.sectionValleyOverview
        r["Photos/flying-sunny-slope"] = FlyingIllustrations.sectionSunnySlope
        r["Photos/flying-speed-bar-cockpit"] = FlyingIllustrations.sectionSpeedBarCockpit
        r["Photos/flying-xc-cockpit-setup"] = FlyingIllustrations.sectionXCCockpitSetup
        r["Photos/flying-convergence-line"] = FlyingIllustrations.sectionConvergenceLine
        r["Photos/flying-sea-breeze-front"] = FlyingIllustrations.sectionSeaBreezeFront
        r["Photos/flying-low-save-terrain"] = FlyingIllustrations.sectionLowSaveTerrain

        // ── NAVIGATION ───────────────────────────────────────
        // Heroes
        r["Photos/Heroes/hero-navigation-map-reading"] = NavigationIllustrations.heroMapReading
        r["Photos/Heroes/hero-navigation-compass"] = NavigationIllustrations.heroCompass
        r["Photos/Heroes/hero-navigation-gps"] = NavigationIllustrations.heroGPS
        r["Photos/Heroes/hero-navigation-route-planning"] = NavigationIllustrations.heroRoutePlanning
        r["Photos/Heroes/hero-navigation-terrain"] = NavigationIllustrations.heroTerrain
        r["Photos/Heroes/hero-navigation-contouring"] = NavigationIllustrations.heroContouring
        r["Photos/Heroes/hero-navigation-triangulation"] = NavigationIllustrations.heroTriangulation
        r["Photos/Heroes/hero-navigation-whiteout"] = NavigationIllustrations.heroWhiteout
        r["Photos/Heroes/hero-navigation-night"] = NavigationIllustrations.heroNight
        r["Photos/Heroes/hero-navigation-emergency"] = NavigationIllustrations.heroEmergency
        // Sections
        r["Photos/navigation-topo-contours"] = NavigationIllustrations.sectionTopoContours
        r["Photos/navigation-map-scale"] = NavigationIllustrations.sectionMapScale
        r["Photos/navigation-compass-map"] = NavigationIllustrations.sectionCompassMap
        r["Photos/navigation-gps-device"] = NavigationIllustrations.sectionGPSDevice
        r["Photos/navigation-route-card"] = NavigationIllustrations.sectionRouteCard
        r["Photos/navigation-ridge-route"] = NavigationIllustrations.sectionRidgeRoute
        r["Photos/navigation-stream-handrail"] = NavigationIllustrations.sectionStreamHandrail
        r["Photos/navigation-slope-aspect"] = NavigationIllustrations.sectionSlopeAspect
        r["Photos/navigation-whiteout-conditions"] = NavigationIllustrations.sectionWhiteoutConditions
        r["Photos/navigation-compass-pacing"] = NavigationIllustrations.sectionCompassPacing
        r["Photos/navigation-headlamp-night"] = NavigationIllustrations.sectionHeadlampNight
        r["Photos/navigation-night-group"] = NavigationIllustrations.sectionNightGroup
        r["Photos/navigation-star-sky"] = NavigationIllustrations.sectionStarSky

        // ── ROPE SYSTEMS ─────────────────────────────────────
        // Heroes
        r["Photos/Heroes/hero-rope-knots"] = RopeSystemsIllustrations.heroKnots
        r["Photos/Heroes/hero-rope-anchors"] = RopeSystemsIllustrations.heroAnchors
        r["Photos/Heroes/hero-rope-belaying"] = RopeSystemsIllustrations.heroBelaying
        r["Photos/Heroes/hero-rope-rappelling"] = RopeSystemsIllustrations.heroRappelling
        r["Photos/Heroes/hero-rope-mechanics"] = RopeSystemsIllustrations.heroMechanics
        r["Photos/Heroes/hero-rope-top-rope"] = RopeSystemsIllustrations.heroTopRope
        r["Photos/Heroes/hero-rope-multi-pitch"] = RopeSystemsIllustrations.heroMultiPitch
        r["Photos/Heroes/hero-rope-rescue"] = RopeSystemsIllustrations.heroRescue
        r["Photos/Heroes/hero-rope-crevasse"] = RopeSystemsIllustrations.heroCrevasse
        r["Photos/Heroes/hero-rope-improvised"] = RopeSystemsIllustrations.heroImprovised
        // Sections
        r["Photos/rope-figure-eight"] = RopeSystemsIllustrations.sectionFigureEight
        r["Photos/rope-clove-hitch"] = RopeSystemsIllustrations.sectionCloveHitch
        r["Photos/rope-munter-hitch"] = RopeSystemsIllustrations.sectionMunterHitch
        r["Photos/rope-prusik-knot"] = RopeSystemsIllustrations.sectionPrusikKnot
        r["Photos/rope-anchor-system"] = RopeSystemsIllustrations.sectionAnchorSystem
        r["Photos/rope-cordelette"] = RopeSystemsIllustrations.sectionCordelette
        r["Photos/rope-belay-device-setup"] = RopeSystemsIllustrations.sectionBelayDeviceSetup
        r["Photos/rope-rappel-anchor"] = RopeSystemsIllustrations.sectionRappelAnchor
        r["Photos/rope-coil"] = RopeSystemsIllustrations.sectionCoil
        r["Photos/rope-hauling-system"] = RopeSystemsIllustrations.sectionHaulingSystem
        r["Photos/rope-prusik-ascending"] = RopeSystemsIllustrations.sectionPrusikAscending
        r["Photos/rope-crevasse-lip"] = RopeSystemsIllustrations.sectionCrevasseLip
        r["Photos/rope-snow-bollard"] = RopeSystemsIllustrations.sectionSnowBollard

        // ── GLACIER TRAVEL ───────────────────────────────────
        // Heroes
        r["Photos/Heroes/hero-glacier-anatomy"] = GlacierIllustrations.heroAnatomy
        r["Photos/Heroes/hero-glacier-crevasse-id"] = GlacierIllustrations.heroCrevasseid
        r["Photos/Heroes/hero-glacier-rope-team"] = GlacierIllustrations.heroRopeTeam
        r["Photos/Heroes/hero-glacier-probe"] = GlacierIllustrations.heroProbe
        r["Photos/Heroes/hero-glacier-route"] = GlacierIllustrations.heroRoute
        r["Photos/Heroes/hero-glacier-protocols"] = GlacierIllustrations.heroProtocols
        r["Photos/Heroes/hero-glacier-rescue"] = GlacierIllustrations.heroRescue
        r["Photos/Heroes/hero-glacier-camping"] = GlacierIllustrations.heroCamping
        r["Photos/Heroes/hero-glacier-seasonal"] = GlacierIllustrations.heroSeasonal
        r["Photos/Heroes/hero-glacier-weather"] = GlacierIllustrations.heroWeather
        // Sections
        r["Photos/glacier-bergschrund"] = GlacierIllustrations.sectionBergschrund
        r["Photos/glacier-flow-patterns"] = GlacierIllustrations.sectionFlowPatterns
        r["Photos/glacier-crevasse-field"] = GlacierIllustrations.sectionCrevasseField
        r["Photos/glacier-marginal-crevasse"] = GlacierIllustrations.sectionMarginalCrevasse
        r["Photos/glacier-snow-bridge"] = GlacierIllustrations.sectionSnowBridge
        r["Photos/glacier-rope-team"] = GlacierIllustrations.sectionRopeTeam
        r["Photos/glacier-kiwi-coils"] = GlacierIllustrations.sectionKiwiCoils
        r["Photos/glacier-simultaneous-travel"] = GlacierIllustrations.sectionSimultaneousTravel
        r["Photos/glacier-probe-technique"] = GlacierIllustrations.sectionProbeTechnique
        r["Photos/glacier-wanded-route"] = GlacierIllustrations.sectionWandedRoute
        r["Photos/glacier-prusik-ascent"] = GlacierIllustrations.sectionPrusikAscent
        r["Photos/glacier-rescue-complications"] = GlacierIllustrations.sectionRescueComplications
        r["Photos/glacier-camp-anchors"] = GlacierIllustrations.sectionCampAnchors
        r["Photos/glacier-summer-melt"] = GlacierIllustrations.sectionSummerMelt

        // ── FIRST AID ────────────────────────────────────────
        // Heroes
        r["Photos/Heroes/hero-firstaid-assessment"] = FirstAidIllustrations.heroAssessment
        r["Photos/Heroes/hero-firstaid-hypothermia"] = FirstAidIllustrations.heroHypothermia
        r["Photos/Heroes/hero-firstaid-altitude"] = FirstAidIllustrations.heroAltitude
        r["Photos/Heroes/hero-firstaid-fractures"] = FirstAidIllustrations.heroFractures
        r["Photos/Heroes/hero-firstaid-wounds"] = FirstAidIllustrations.heroWounds
        r["Photos/Heroes/hero-firstaid-lightning"] = FirstAidIllustrations.heroLightning
        r["Photos/Heroes/hero-firstaid-frostbite"] = FirstAidIllustrations.heroFrostbite
        r["Photos/Heroes/hero-firstaid-heat"] = FirstAidIllustrations.heroHeat
        r["Photos/Heroes/hero-firstaid-shelter"] = FirstAidIllustrations.heroShelter
        r["Photos/Heroes/hero-firstaid-evacuation"] = FirstAidIllustrations.heroEvacuation
        // Sections
        r["Photos/firstaid-scene-safety"] = FirstAidIllustrations.sectionSceneSafety
        r["Photos/firstaid-assessment"] = FirstAidIllustrations.sectionAssessment
        r["Photos/firstaid-head-to-toe"] = FirstAidIllustrations.sectionHeadToToe
        r["Photos/firstaid-hypothermia-treatment"] = FirstAidIllustrations.sectionHypothermiaTreatment
        r["Photos/firstaid-hypothermia-wrap"] = FirstAidIllustrations.sectionHypothermiaWrap
        r["Photos/firstaid-altitude-symptoms"] = FirstAidIllustrations.sectionAltitudeSymptoms
        r["Photos/firstaid-sam-splint"] = FirstAidIllustrations.sectionSamSplint
        r["Photos/firstaid-kit"] = FirstAidIllustrations.sectionKit
        r["Photos/firstaid-wound-irrigation"] = FirstAidIllustrations.sectionWoundIrrigation
        r["Photos/firstaid-lightning-position"] = FirstAidIllustrations.sectionLightningPosition
        r["Photos/firstaid-frostbite-stages"] = FirstAidIllustrations.sectionFrostbiteStages
        r["Photos/firstaid-heat-exhaustion"] = FirstAidIllustrations.sectionHeatExhaustion
        r["Photos/firstaid-snow-shelter"] = FirstAidIllustrations.sectionSnowShelter
        r["Photos/firstaid-improvised-litter"] = FirstAidIllustrations.sectionImprovisedLitter

        return r
    }()
}
