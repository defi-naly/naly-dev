import Foundation

// MARK: - Card Generator
// Direct port of cardGenerator.ts

enum CardGenerator {

    // MARK: - Domain-Specific Application Templates

    private static let weatherApplicationTemplates: [String: String] = [
        "atmosphere": "You're at 6000ft and the surface temperature is 30°C. Using the standard lapse rate, what temperature would you expect? How does this affect your flight planning?",
        "pressure-systems": "Looking at a weather map, you see isobars spaced 2° apart over your planned route. What wind conditions should you expect, and how does this affect your plans?",
        "fronts": "A cold front is approaching from the west, expected arrival in 6 hours. You're planning an afternoon hike. What weather sequence should you anticipate?",
        "thermals": "It's 11am on a clear day. You're looking at a dark plowed field next to a lake. Where would you expect the first thermals to form, and why?",
        "lapse-rates": "Surface temp is 25°C, dewpoint is 15°C. Calculate the cloud base and determine if conditions are stable or unstable.",
        "clouds": "You see lenticular clouds forming over a ridge and cumulus building rapidly to the east. What does this tell you about current conditions?",
        "mountain-winds": "It's 2pm in an alpine valley. Which direction is the valley wind blowing, and where would you expect the strongest thermals?",
        "mountain-waves": "You observe a series of lens-shaped clouds stacked above a mountain ridge, with strong turbulence reported below. What phenomenon is occurring and what are the risks?",
        "convergence": "Two valley systems merge ahead of you. What lift conditions should you expect at the convergence point?",
        "thunderstorms": "You have instability, moisture, and an approaching cold front. The wind shear is moderate. Assess the thunderstorm risk.",
    ]

    private static let avalancheApplicationTemplates: [String: String] = [
        "avalanche-triangle": "You're assessing a backcountry route. The danger rating is Considerable. Walk through each side of the avalanche triangle for this terrain.",
        "slab-physics": "You find a 40cm hard slab sitting on depth hoar while digging a pit. What does this tell you about the stability of the slope?",
        "slope-angle": "You're approaching a beautiful powder bowl. Your inclinometer reads 36°. Connected slopes above measure 42°. Should you enter the bowl?",
        "terrain-traps": "Your planned descent follows a narrow gully that opens onto a flat bench above a cliff band. Identify the terrain traps and propose an alternative.",
        "snowpack-layers": "After a week of clear, cold nights followed by a 30cm storm, what weak layer would you most expect to find in the snowpack?",
        "stability-testing": "Your CT result is 12, with a clean planar shear on a faceted layer. The ECT shows full propagation. Interpret these results.",
        "weather-loading": "Strong westerly winds have been blowing for 48 hours after a 20cm snowfall. Which aspects are most dangerous and why?",
        "human-factors": "Your group of 5 includes two experts who want to ski the steepest line. You're uncomfortable but don't want to speak up. Which heuristic traps are at play?",
        "decision-framework": "Apply the systematic decision framework to this scenario: Considerable danger, 35° north-facing slope, recent wind loading, party of 3.",
        "companion-rescue": "Your partner is buried. You saw them disappear 50m upslope. You have a beacon, probe, and shovel. Walk through your rescue sequence and timeline.",
    ]

    private static let flyingApplicationTemplates: [String: String] = [
        "soaring-fundamentals": "You're at a coastal ridge launch site. The wind is onshore at 15 knots and cumulus are forming inland. What types of lift are available to you?",
        "reading-sky": "You see a line of well-developed cumulus with dark flat bases trending northwest. Some are starting to spread out at the top. What do you read from this?",
        "thermal-entry": "You're gliding toward a thermal marked by a circling hawk. You feel a strong surge on your right wing. Describe your entry technique.",
        "centering": "You're circling in a thermal. Your vario shows +3 on the south side and +1 on the north side. How do you adjust your circle?",
        "climbing": "You're climbing at +2 m/s at 5000ft. Cloudbase is estimated at 6500ft. The next thermal source is 8km away. When should you leave this thermal?",
        "valley-flying": "It's 1pm in a north-south alpine valley. The east slope is in full sun, the west slope is shaded. Where do you fly and why?",
        "speed-to-fly": "Your expected climb rate in the next thermal is 2 m/s. You're in 1 m/s sink between thermals. What speed should you fly at?",
        "xc-tactics": "You're planning a 100km XC triangle. The wind is from the west at 20km/h. Cumulus are aligned in streets running northwest-southeast. Plan your route.",
        "convergence-sea-breeze": "It's afternoon and you see a distinct cloud line forming 30km inland, parallel to the coast. What is it and how would you use it?",
        "between-thermals": "You're at 4000ft, 5km from the next likely thermal source, in 1 m/s sink. Your min sink speed is 35 km/h. Calculate if you'll arrive with enough altitude.",
    ]

    private static let navigationApplicationTemplates: [String: String] = [
        "map-reading": "You're holding a 1:25,000 topographic map. The contour interval is 20m. You count 5 contour lines between two points. What is the elevation difference?",
        "compass": "Your map bearing to a summit is 045° magnetic. The local declination is 2°E. What bearing do you set on your compass for the field?",
        "gps": "Your GPS shows you're at 46.5°N, 7.8°E with 8m accuracy. You're navigating to a waypoint 200m away in forest. What's your navigation strategy?",
        "route-planning": "You're planning a route over a 3,200m pass. The approach is 1,200m of elevation gain over 6km. Estimate your travel time using Naismith's Rule.",
        "terrain-association": "You can see a prominent ridge to your east and a lake to your northwest. Using your map, how do you confirm your position?",
        "contouring": "You need to traverse a steep hillside at 2,400m without gaining or losing elevation. Describe your contouring technique.",
        "triangulation": "You can identify three peaks from your position. Their map bearings are 030°, 150°, and 270°. How do you fix your position?",
        "whiteout-navigation": "Visibility drops to 10m on a glacier. You have a compass bearing of 195° to the hut. How do you navigate safely?",
        "night-navigation": "You're descending a mountain trail at night with headlamps. The trail junctions are unmarked. What techniques keep you on route?",
        "emergency-navigation": "Your GPS is dead, compass lost. It's 3pm, you know the valley runs east-west. How do you navigate to safety?",
    ]

    private static let ropeSystemsApplicationTemplates: [String: String] = [
        "knots": "You need to tie into the end of a climbing rope. Which knot do you use, and how do you verify it's correctly tied?",
        "anchors": "You're building a top-rope anchor using two bolts and a cordelette. Walk through the SERENE criteria for your anchor.",
        "belaying": "Your climber is 15m above you on a vertical face. They fall. Describe the belay technique to catch the fall safely.",
        "rappelling": "You need to rappel a 50m cliff with a 60m rope. Describe your setup including backup and rope retrieval plan.",
        "rope-mechanics": "A climber takes a 6m fall on 3m of rope out. What is the fall factor? What forces does this generate?",
        "top-rope": "You're setting up a top-rope system at a crag. The anchor is 3m back from the edge. How do you manage rope drag and direction?",
        "multi-pitch": "You're leading the third pitch of a 5-pitch route. Your second is cleaning gear. Describe your belay transition.",
        "rescue-hauls": "Your partner is hanging on the rope 10m below you and cannot climb. You need to haul them up. Describe a 3:1 Z-pulley setup.",
        "crevasse-rescue-rope": "Your rope team partner has fallen into a crevasse. They're conscious but can't climb out. Walk through the rescue sequence.",
        "improvised-systems": "You need to build an emergency rappel but have no rappel device. What improvised techniques can you use?",
    ]

    private static let glacierTravelApplicationTemplates: [String: String] = [
        "glacier-anatomy": "You're approaching a glacier. You can see a bergschrund at the top and lateral moraines on both sides. What does this tell you about route options?",
        "crevasse-identification": "You see a convex roll in the glacier surface with subtle sagging lines perpendicular to the fall line. What crevasse hazard does this indicate?",
        "rope-teams": "Your party of 4 is crossing a moderately crevassed glacier. How do you configure your rope team?",
        "probe-techniques": "You're crossing a snow bridge that spans approximately 3m. How do you probe it to assess safety?",
        "glacier-route-finding": "The glacier ahead has a major icefall. You can see a route through on the left side or around on moraine. Evaluate both options.",
        "travel-protocols": "Your rope team is crossing a crevasse zone. The person ahead of you suddenly drops through a snow bridge. What are your immediate actions?",
        "crevasse-rescue": "You've self-arrested after your partner fell in a crevasse. They're 8m down and conscious. Describe the rescue steps.",
        "glacier-camping": "You need to camp on a glacier at 3,500m. What are your site selection criteria and safety considerations?",
        "seasonal-changes": "It's mid-August and you're planning to cross a glacier that was fully snow-covered in June. How have conditions changed?",
        "glacier-weather": "Morning cloud is building rapidly over the glacier and temperature is rising. What weather hazards should you anticipate?",
    ]

    private static let firstAidApplicationTemplates: [String: String] = [
        "wilderness-assessment": "You find an unconscious hiker on the trail. There's no one else around. Walk through your primary assessment sequence.",
        "hypothermia": "Your partner is shivering uncontrollably, confused, and has slurred speech after a river crossing. Core temp estimated 32°C. What stage is this and what do you do?",
        "altitude-sickness": "At 4,200m, a team member has a severe headache, nausea, and is staggering when they walk. What condition do you suspect and what's the treatment?",
        "fractures-splints": "A climber has an obvious deformity of the lower leg after a fall. They can wiggle their toes. How do you splint and manage this injury?",
        "wound-care": "A team member has a deep laceration on their forearm from a sharp rock. Bleeding is steady but not spurting. Describe wound management.",
        "lightning-injuries": "A lightning strike hits near your group on an exposed ridge. One person is unconscious and not breathing. What do you do?",
        "frostbite": "After 6 hours in -25°C, a climber's fingers are white, hard, and have no sensation. What stage is this and how do you treat it?",
        "dehydration-heat": "A hiker collapses on a hot day. Their skin is hot and dry, they're confused, and their heart rate is 140. What's your diagnosis and treatment?",
        "emergency-shelter": "A storm hits and your group is caught above treeline with no tent. Temperature is dropping to -10°C. How do you build emergency shelter?",
        "evacuation-planning": "A team member has a suspected spinal injury at 3,000m, 8km from the trailhead. Walk through your evacuation decision-making.",
    ]

    // MARK: - Generate Cards

    static func generateCardsForModule(domain: DomainId, moduleSlug: String) -> [SRSCard] {
        guard let domainData = DomainContent.allDomains.first(where: { $0.id == domain }),
              let mod = domainData.modules.first(where: { $0.slug == moduleSlug }) else {
            return []
        }

        var cards: [SRSCard] = []

        // 1. Concept card (due tomorrow)
        cards.append(SRSEngine.createCard(
            domain: domain,
            moduleSlug: moduleSlug,
            moduleId: mod.id,
            cardType: .concept,
            question: "Explain: \(mod.concept)",
            answer: mod.takeaway,
            initialDueOffset: 1
        ))

        // 2. Application card (due in 2 days)
        let appQuestion = getApplicationQuestion(domain: domain, slug: moduleSlug, module: mod)
        cards.append(SRSEngine.createCard(
            domain: domain,
            moduleSlug: moduleSlug,
            moduleId: mod.id,
            cardType: .application,
            question: appQuestion,
            answer: "Key principle: \(mod.takeaway)",
            initialDueOffset: 2
        ))

        // 3. Connection card (due in 3 days)
        cards.append(SRSEngine.createCard(
            domain: domain,
            moduleSlug: moduleSlug,
            moduleId: mod.id,
            cardType: .connection,
            question: getConnectionQuestion(mod),
            answer: getConnectionAnswer(mod),
            initialDueOffset: 3
        ))

        return cards
    }

    static func generateAllMissingCards(
        existingCardIds: Set<String>,
        completedModules: [(domain: DomainId, slug: String)]
    ) -> [SRSCard] {
        var newCards: [SRSCard] = []

        for (domain, slug) in completedModules {
            let moduleCards = generateCardsForModule(domain: domain, moduleSlug: slug)
            for card in moduleCards where !existingCardIds.contains(card.id) {
                newCards.append(card)
            }
        }

        return newCards
    }

    // MARK: - Helpers

    private static func getApplicationQuestion(domain: DomainId, slug: String, module: Module) -> String {
        let templates: [String: String]
        switch domain {
        case .weather: templates = weatherApplicationTemplates
        case .avalanche: templates = avalancheApplicationTemplates
        case .flying: templates = flyingApplicationTemplates
        case .navigation: templates = navigationApplicationTemplates
        case .ropeSystems: templates = ropeSystemsApplicationTemplates
        case .glacierTravel: templates = glacierTravelApplicationTemplates
        case .firstAid: templates = firstAidApplicationTemplates
        }
        return templates[slug] ?? "Apply your understanding of \(module.title.lowercased()) to a practical scenario."
    }

    private static func getConnectionQuestion(_ mod: Module) -> String {
        guard let related = mod.relatedModules?.first else {
            return "How does \(mod.title.lowercased()) connect to safety decision-making in the mountains?"
        }

        guard let relatedMod = DomainContent.getModule(domainId: related.domain, slug: related.slug) else {
            return "How does \(mod.title.lowercased()) connect to other mountain knowledge?"
        }

        let domainLabel = related.domain == mod.domain ? "" : " (\(related.domain.rawValue))"
        return "How does \(mod.title.lowercased()) connect to \(relatedMod.title.lowercased())\(domainLabel)?"
    }

    private static func getConnectionAnswer(_ mod: Module) -> String {
        guard let related = mod.relatedModules?.first else {
            return "\(mod.takeaway) This knowledge directly informs decision-making in mountain environments."
        }

        guard let relatedMod = DomainContent.getModule(domainId: related.domain, slug: related.slug) else {
            return mod.takeaway
        }

        return "\(mod.title): \(mod.takeaway)\n\n\(relatedMod.title): \(relatedMod.takeaway)\n\nThese concepts are interconnected — understanding one deepens your grasp of the other."
    }
}
