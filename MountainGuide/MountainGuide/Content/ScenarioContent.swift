import Foundation

// MARK: - Scenario Content
// Direct port of scenarios.ts — all 6 branching decision scenarios

enum ScenarioContent {

    static func getScenario(_ id: String) -> Scenario? {
        allScenarios.first { $0.id == id }
    }

    static let allScenarios: [Scenario] = [springPowder, afternoonXC, postStormTour, thermalDayPlanning, whiteoutRescue, seaBreezeConvergence]

    // MARK: - Spring Powder Day

    static let springPowder = Scenario(
        id: "spring-powder",
        title: "Spring Powder Day",
        description: "A warm front has passed overnight, followed by clearing skies and dropping temperatures. Fresh snow covers the mountains. Your group wants to ski a north-facing bowl.",
        difficulty: .intermediate,
        domains: [.weather, .avalanche],
        testedModules: ["weather-fronts", "avalanche-weather-loading", "avalanche-human-factors", "avalanche-slope-angle"],
        requirements: [
            ScenarioRequirement(domain: .weather, moduleSlug: "fronts"),
            ScenarioRequirement(domain: .avalanche, moduleSlug: "weather-loading"),
            ScenarioRequirement(domain: .avalanche, moduleSlug: "slope-angle"),
        ],
        startNodeId: "start",
        nodes: [
            "start": ScenarioNode(
                id: "start",
                narrative: "It's 7am. The forecast shows a warm front passed overnight bringing 25cm of new snow, followed by NW winds at 30km/h. Skies are clearing. Your group of 4 is eager to hit a north-facing bowl at 2800m. The avalanche danger is rated Considerable. What do you do first?",
                choices: [
                    ScenarioChoice(label: "Check the avalanche bulletin and assess wind loading direction", nextNodeId: "assess", optimal: true, feedback: "Good — systematic assessment before committing."),
                    ScenarioChoice(label: "Head straight to the bowl — the powder won't last", nextNodeId: "rush", feedback: "Scarcity bias is active. Fresh snow + Considerable danger demands assessment first."),
                    ScenarioChoice(label: "Suggest a south-facing alternative instead", nextNodeId: "south", feedback: "Considering alternatives is smart, but you should assess the conditions first."),
                ]
            ),
            "assess": ScenarioNode(
                id: "assess",
                narrative: "The bulletin confirms Considerable danger on north aspects above 2400m. NW winds have been loading east and north-east aspects. Your target bowl faces north with a connected east-facing slope above. The bowl has a runout into a narrow gully. How do you proceed?",
                choices: [
                    ScenarioChoice(label: "The terrain trap (gully) and wind-loaded aspects make this too risky — choose different terrain", nextNodeId: "good-decision", optimal: true, feedback: "Multiple red flags: Considerable danger + wind-loaded aspects + terrain trap. Excellent risk assessment."),
                    ScenarioChoice(label: "Proceed but stay on the true north section, avoiding the NE-loaded part", nextNodeId: "partial", feedback: "You identified the wind loading, but the terrain trap amplifies the consequence."),
                    ScenarioChoice(label: "Dig a pit at the top to assess before committing", nextNodeId: "pit", feedback: "Digging on a slope you're concerned about exposes you to the hazard."),
                ]
            ),
            "rush": ScenarioNode(
                id: "rush",
                narrative: "You skin up quickly. At 2600m, you notice cracking in the new snow around your skis. A whumpf sound echoes across the slope. What do you do?",
                choices: [
                    ScenarioChoice(label: "Stop immediately, retreat down your skin track one at a time", nextNodeId: "late-retreat", optimal: true, feedback: "Shooting cracks and whumpfing are clear signs of instability."),
                    ScenarioChoice(label: "Continue — whumpfing is common after new snow", nextNodeId: "bad-outcome", feedback: "Whumpfing IS the weak layer collapsing. This is one of the strongest signs of instability."),
                ]
            ),
            "good-decision": ScenarioNode(
                id: "good-decision",
                narrative: "You choose a wind-sheltered, south-facing slope at 30° with an open runout. The skiing is excellent — 20cm of settled powder on a supportive base. Your group has a great day with wide safety margins.",
                isTerminal: true, score: 95,
                lessons: [
                    "Systematic assessment prevented exposure to a high-risk slope.",
                    "Choosing alternative terrain doesn't mean missing out.",
                    "The gully runout was a critical terrain trap.",
                ]
            ),
            "partial": ScenarioNode(
                id: "partial",
                narrative: "You ski the true north section. The snow is beautiful but you hear a whumpf on your second turn. You freeze, then carefully ski to the side of the bowl. Nothing releases, but the red flag is clear.",
                isTerminal: true, score: 45,
                lessons: [
                    "You correctly identified wind loading but underestimated the terrain trap risk.",
                    "The gully runout means even a small slide could have been fatal.",
                    "Considerable danger + new snow + terrain traps = choose different terrain.",
                ]
            ),
            "pit": ScenarioNode(
                id: "pit",
                narrative: "You expose yourself to the hazard while digging. Your CT shows 8 with a clean shear on a crust/facet interface. ECT propagates fully. The results confirm what the bulletin already told you.",
                isTerminal: true, score: 40,
                lessons: [
                    "The bulletin and terrain assessment provided enough information.",
                    "A decision framework should have caught the multiple red flags.",
                    "CT8 with full ECT propagation means human-triggering is very likely.",
                ]
            ),
            "south": ScenarioNode(
                id: "south",
                narrative: "Good instinct to consider alternatives. A south-facing slope at similar elevation has been warming since sunrise. You need to assess: will the warming make it more or less stable?",
                choices: [
                    ScenarioChoice(label: "South aspects will be warming and potentially unstable — look for a lower-angle option under 30°", nextNodeId: "good-decision", optimal: true, feedback: "Correct. Morning solar warming can trigger wet loose avalanches."),
                    ScenarioChoice(label: "South aspects are fine because the wind loaded north and east", nextNodeId: "south-risk", feedback: "Wind loading isn't the only concern. Solar warming creates a different hazard."),
                ]
            ),
            "south-risk": ScenarioNode(
                id: "south-risk",
                narrative: "You ski a south-facing 38° slope. By 10am, the surface is warming rapidly. A wet loose slide releases above you — small, but it pushes you into rocks. Minor injuries but a lesson learned.",
                isTerminal: true, score: 35,
                lessons: [
                    "South-facing slopes avoid wind loading but introduce solar warming hazard.",
                    "Steeper south aspects (>35°) can release wet loose avalanches.",
                    "Choosing safer terrain means managing angle AND aspect AND timing.",
                ]
            ),
            "late-retreat": ScenarioNode(
                id: "late-retreat",
                narrative: "You retreat safely, spacing yourselves along the skin track. Back at the car, you reassess and find a lower-angle option. The day is saved, but the signs were clear from the start.",
                isTerminal: true, score: 55,
                lessons: [
                    "Recognizing instability signs and retreating was the right call.",
                    "The bulletin should have prevented you from being on this slope.",
                    "Scarcity bias drove the initial decision to skip assessment.",
                ]
            ),
            "bad-outcome": ScenarioNode(
                id: "bad-outcome",
                narrative: "The slope releases on your third turn. A 40cm deep slab fractures across 200m of the bowl. The debris funnels into the gully below. Two of your group are caught; one is partially buried.",
                isTerminal: true, score: 10,
                lessons: [
                    "Whumpfing and shooting cracks are the clearest signs of instability.",
                    "Continuing showed commitment bias.",
                    "The terrain trap amplified the consequence.",
                    "Multiple failures: no assessment, ignored red flags, continued despite danger signs.",
                ]
            ),
        ]
    )

    // MARK: - Afternoon XC Flight

    static let afternoonXC = Scenario(
        id: "afternoon-xc",
        title: "Afternoon XC Flight",
        description: "A classic summer thermal day with sea breeze convergence developing. You're planning a 60km cross-country triangle from a mountain launch site.",
        difficulty: .advanced,
        domains: [.weather, .flying],
        testedModules: ["weather-thermals", "weather-convergence", "flying-speed-to-fly", "flying-xc-tactics", "flying-between-thermals"],
        requirements: [
            ScenarioRequirement(domain: .weather, moduleSlug: "thermals"),
            ScenarioRequirement(domain: .flying, moduleSlug: "speed-to-fly"),
            ScenarioRequirement(domain: .flying, moduleSlug: "xc-tactics"),
        ],
        startNodeId: "start",
        nodes: [
            "start": ScenarioNode(
                id: "start",
                narrative: "It's 12:30pm at a 1500m launch site. Cumulus are well-developed with bases at 2800m. A sea breeze convergence line is expected to form 30km inland by 2pm. Wind is light NW at 10km/h. You want to fly a 60km triangle. How do you plan your route?",
                choices: [
                    ScenarioChoice(label: "Route the first two legs to intercept the convergence line, use it for the longest leg, tailwind home", nextNodeId: "good-plan", optimal: true, feedback: "Excellent — using the convergence line as an energy highway."),
                    ScenarioChoice(label: "Fly the triangle as a shortest-distance equilateral", nextNodeId: "geometric", feedback: "The shortest route ignores energy lines."),
                    ScenarioChoice(label: "Wait for the convergence to develop before launching", nextNodeId: "wait", feedback: "You're wasting the best thermal period by waiting."),
                ]
            ),
            "good-plan": ScenarioNode(
                id: "good-plan",
                narrative: "You launch and climb to 2600m in a strong 3 m/s thermal. The first turnpoint is 15km NE. You're in good lift with cloud streets aligned NW-SE. How do you fly the first leg?",
                choices: [
                    ScenarioChoice(label: "Dolphin along the cloud street — McCready 3, speed up in sink", nextNodeId: "dolphin", optimal: true, feedback: "Cloud streets let you dolphin. McCready 3 is correct."),
                    ScenarioChoice(label: "Climb to cloudbase in every thermal for maximum altitude", nextNodeId: "slow-climb", feedback: "Topping out every thermal is slow."),
                ]
            ),
            "geometric": ScenarioNode(
                id: "geometric",
                narrative: "The first leg takes you perpendicular to the cloud streets. You cross multiple sink zones and lose altitude rapidly. At 1800m, you're 10km from the turnpoint with no obvious lift ahead.",
                choices: [
                    ScenarioChoice(label: "Adjust course to fly along the nearest cloud street", nextNodeId: "adjust", optimal: true, feedback: "Adapting to conditions. Cloud streets are energy lines."),
                    ScenarioChoice(label: "Push on toward the turnpoint — you have enough altitude", nextNodeId: "push", feedback: "At 1800m crossing cloud streets, you'll likely end up too low."),
                ]
            ),
            "dolphin": ScenarioNode(
                id: "dolphin",
                narrative: "You reach the first turnpoint at 2400m. Ahead, you see the convergence line — a distinct cloud line 20km south. The second turnpoint is 25km SW. Do you fly direct or intercept the convergence?",
                choices: [
                    ScenarioChoice(label: "Intercept the convergence first, then ride it toward the second turnpoint", nextNodeId: "convergence", optimal: true, feedback: "Brilliant. The convergence will make the 25km leg almost effortless."),
                    ScenarioChoice(label: "Fly direct to the second turnpoint in the thermal air", nextNodeId: "direct", feedback: "Direct works but misses the convergence."),
                ]
            ),
            "convergence": ScenarioNode(
                id: "convergence",
                narrative: "You intercept the convergence at 2200m. Your vario jumps to +4 m/s. You fly along the line at 80km/h, barely losing altitude. The second turnpoint passes beneath you at 2600m. The final leg is 20km home with tailwind.",
                choices: [
                    ScenarioChoice(label: "Leave the convergence, glide home with tailwind — McCready 4 for speed", nextNodeId: "fast-finish", optimal: true, feedback: "With 2600m, 20km, and tailwind, fly fast."),
                    ScenarioChoice(label: "Stay on the convergence line as long as possible", nextNodeId: "overshoot", feedback: "The convergence is heading away from home."),
                ]
            ),
            "fast-finish": ScenarioNode(id: "fast-finish", narrative: "You arrive home at 1800m after a 60km triangle in 2 hours 15 minutes. A textbook XC flight.", isTerminal: true, score: 95, lessons: ["Routing along energy lines made the triangle achievable.", "McCready theory optimized your speed.", "Intercepting the convergence line was the key decision."]),
            "direct": ScenarioNode(id: "direct", narrative: "You thermal-hop to the second turnpoint in 45 minutes. The flight took 3 hours and felt labored.", isTerminal: true, score: 65, lessons: ["The convergence line would have halved the time.", "Energy lines are highways — use them."]),
            "slow-climb": ScenarioNode(id: "slow-climb", narrative: "Your average speed is only 25km/h. After 40 minutes you've covered 12km. The day is passing.", isTerminal: true, score: 45, lessons: ["Climbing to cloudbase in every thermal wastes time.", "Dolphining is far more efficient with cloud streets."]),
            "wait": ScenarioNode(id: "wait", narrative: "You wait until 2pm. The best thermal period has passed. You manage a 20km out-and-return.", isTerminal: true, score: 30, lessons: ["Launch early and adapt to convergence as it develops.", "Time-on-task is your most valuable resource."]),
            "adjust": ScenarioNode(id: "adjust", narrative: "You divert to a cloud street and recover. You complete a shortened 45km triangle.", isTerminal: true, score: 55, lessons: ["Adapting saved the flight.", "Always plan along energy lines."]),
            "push": ScenarioNode(id: "push", narrative: "You hit extended sink. At 1200m, 5km short, you land in a field.", isTerminal: true, score: 20, lessons: ["Crossing perpendicular to cloud streets means crossing sink.", "Altitude = options."]),
            "overshoot": ScenarioNode(id: "overshoot", narrative: "The convergence carries you 10km past home. You face a 10km headwind final glide. Barely make it.", isTerminal: true, score: 50, lessons: ["Know when to leave good lift.", "Final glide planning requires wind accounting."]),
        ]
    )

    // MARK: - Post-Storm Ski Tour

    static let postStormTour = Scenario(
        id: "post-storm-tour",
        title: "Post-Storm Ski Tour",
        description: "Two days after a major storm cycle with 60cm of new snow. Danger is dropping but persistent weak layers lurk.",
        difficulty: .advanced,
        domains: [.avalanche, .weather],
        testedModules: ["avalanche-snowpack-layers", "avalanche-stability-testing", "avalanche-terrain-traps", "avalanche-decision-framework", "weather-mountain-winds"],
        requirements: [
            ScenarioRequirement(domain: .avalanche, moduleSlug: "snowpack-layers"),
            ScenarioRequirement(domain: .avalanche, moduleSlug: "stability-testing"),
            ScenarioRequirement(domain: .avalanche, moduleSlug: "decision-framework"),
        ],
        startNodeId: "start",
        nodes: [
            "start": ScenarioNode(id: "start", narrative: "Day 3 after a 60cm storm. Danger dropping from High to Considerable on north aspects, Moderate on south. A persistent depth hoar layer noted at 80cm. Winds were strong NW during the storm. Your planned tour crosses a north-facing col at 2600m. How do you assess?", choices: [
                ScenarioChoice(label: "Dig a pit on a representative slope before the col", nextNodeId: "pit", optimal: true, feedback: "Systematic field assessment of the persistent weak layer."),
                ScenarioChoice(label: "The danger is dropping — proceed with caution", nextNodeId: "proceed", feedback: "Considerable danger with a known persistent weak layer is serious."),
                ScenarioChoice(label: "Skip the col entirely and stay on south-facing terrain", nextNodeId: "conservative", feedback: "Very conservative. Field observations could open up more terrain."),
            ]),
            "pit": ScenarioNode(id: "pit", narrative: "Your pit reveals: 55cm new snow over a rain crust, then 25cm faceted snow above depth hoar at 80cm. CT18 on depth hoar, ECT no propagation. CT10 on crust/new snow interface, ECT full propagation. Assessment?", choices: [
                ScenarioChoice(label: "Two problems: storm slab on crust is reactive (CT10+prop). Depth hoar is harder to trigger but persistent. Avoid steep north-facing terrain.", nextNodeId: "correct-read", optimal: true, feedback: "Excellent pit interpretation. Two weak layers, two risk profiles."),
                ScenarioChoice(label: "CT18 on depth hoar means it's hard to trigger — main problem solved", nextNodeId: "missed-slab", feedback: "You missed the more reactive storm slab."),
                ScenarioChoice(label: "Everything looks bad — abandon the tour", nextNodeId: "conservative", feedback: "The pit shows nuance. The storm slab is reactive but terrain choice can manage it."),
            ]),
            "correct-read": ScenarioNode(id: "correct-read", narrative: "The col traverse crosses a 34° north-facing slope with NE wind-loading. Plan?", choices: [
                ScenarioChoice(label: "Reroute to cross at a lower-angle section (<30°), avoiding wind-loaded aspect", nextNodeId: "reroute-success", optimal: true, feedback: "Managing both slope angle and wind loading."),
                ScenarioChoice(label: "Proceed one-at-a-time with spacing across the 34° slope", nextNodeId: "spacing", feedback: "Spacing doesn't reduce triggering probability."),
            ]),
            "reroute-success": ScenarioNode(id: "reroute-success", narrative: "You find a 26° ridge traverse. The extra 30 minutes of skinning is worth the safety margin. Excellent skiing on moderate south-facing slopes below.", isTerminal: true, score: 90, lessons: ["Field assessment informed terrain choices.", "Identifying two weak layers led to informed risk management.", "Rerouting addressed the primary threat."]),
            "spacing": ScenarioNode(id: "spacing", narrative: "The second person triggers a slab on the crust interface. 50cm deep, runs 150m. Your partner is caught but surfaces. Lucky.", isTerminal: true, score: 30, lessons: ["CT10 with full propagation on 34° = high triggering probability.", "Spacing is not terrain management.", "Reactive stability tests demand terrain avoidance."]),
            "proceed": ScenarioNode(id: "proceed", narrative: "At 2500m, you notice a fracture line from a natural avalanche nearby. How do you respond?", choices: [
                ScenarioChoice(label: "Clear sign — stop, assess, reconsider the route", nextNodeId: "late-assessment", optimal: true, feedback: "Natural activity is strong evidence of instability."),
                ScenarioChoice(label: "That slope is steeper than our route — continue", nextNodeId: "bad-proceed", feedback: "Natural avalanches indicate widespread instability."),
            ]),
            "late-assessment": ScenarioNode(id: "late-assessment", narrative: "You stop and dig a hand shear test. Easy results on a crust layer. You reroute to lower-angle terrain.", isTerminal: true, score: 55, lessons: ["Responding to red flags saved the day.", "Quick hand shear confirmed instability.", "\"Considerable is manageable\" is not an assessment."]),
            "bad-proceed": ScenarioNode(id: "bad-proceed", narrative: "You trigger a slab at 2550m. Two members caught in debris.", isTerminal: true, score: 10, lessons: ["Ignoring natural avalanche evidence is a critical error.", "No field assessment despite known persistent weak layer.", "\"Continue with caution\" is not a plan."]),
            "conservative": ScenarioNode(id: "conservative", narrative: "You stay on south-facing terrain below 2400m. Moderate but safe skiing. Zero avalanche exposure.", isTerminal: true, score: 70, lessons: ["Conservative choice eliminated risk.", "Field assessment could have opened more terrain.", "Developing assessment skills lets you make informed choices."]),
            "missed-slab": ScenarioNode(id: "missed-slab", narrative: "You proceed onto a 35° north face. Third turn triggers the storm slab — the CT10 layer you overlooked. 50cm slab carries you 100m.", isTerminal: true, score: 15, lessons: ["Assess EVERY weak layer, not just the one you're looking for.", "The storm slab was more reactive than the persistent weak layer.", "Interpret ALL pit results."]),
        ]
    )

    // MARK: - Thermal Day Planning

    static let thermalDayPlanning = Scenario(
        id: "thermal-day-planning",
        title: "Thermal Day Planning",
        description: "Plan and execute a cross-country flight on a classic thermal day.",
        difficulty: .intermediate,
        domains: [.weather, .flying],
        testedModules: ["weather-thermals", "weather-lapse-rates", "flying-reading-sky", "flying-centering", "flying-climbing"],
        requirements: [
            ScenarioRequirement(domain: .weather, moduleSlug: "thermals"),
            ScenarioRequirement(domain: .flying, moduleSlug: "reading-sky"),
            ScenarioRequirement(domain: .flying, moduleSlug: "centering"),
        ],
        startNodeId: "start",
        nodes: [
            "start": ScenarioNode(id: "start", narrative: "Morning briefing: surface temp 22°C, dewpoint 8°C, forecast high 30°C. Light SE wind. Cumulus expected by 11am. You plan a 40km out-and-return. First calculation?", choices: [
                ScenarioChoice(label: "Calculate cloudbase: LCL = 222 × (22-8) = 3,108ft ≈ 950m AGL", nextNodeId: "calculated", optimal: true, feedback: "Perfect. Espy's formula gives you the altitude ceiling."),
                ScenarioChoice(label: "Check wind direction and plan route accordingly", nextNodeId: "wind-first", feedback: "Wind matters, but cloudbase is more fundamental."),
                ScenarioChoice(label: "Launch early and figure it out in the air", nextNodeId: "no-plan", feedback: "XC success depends on pre-flight planning."),
            ]),
            "calculated": ScenarioNode(id: "calculated", narrative: "You launch at 11:15am. Initial climbs +1.5 m/s to 700m. By noon, cumulus darkening with grey bases. What do you read?", choices: [
                ScenarioChoice(label: "Thermals strengthening — dark bases mean strong lift. Go now.", nextNodeId: "peak-conditions", optimal: true, feedback: "Dark bases indicate peak thermal time."),
                ScenarioChoice(label: "Grey bases mean overdevelopment — wait for stabilization", nextNodeId: "hesitate", feedback: "Early grey at noon just means peak strength."),
            ]),
            "peak-conditions": ScenarioNode(id: "peak-conditions", narrative: "At 15km, you find +3.5 m/s. Centered beautifully. At 800m, climb weakens to +1 m/s. Cloudbase at 950m. What do you do?", choices: [
                ScenarioChoice(label: "Leave at 850m — close enough to cloudbase, push forward", nextNodeId: "smart-leave", optimal: true, feedback: "The thermal is weakening. Leaving with 100m margin is smart."),
                ScenarioChoice(label: "Grind to cloudbase — every meter counts", nextNodeId: "grind", feedback: "Circling in +1 m/s wastes time near cloudbase."),
            ]),
            "smart-leave": ScenarioNode(id: "smart-leave", narrative: "You push at McCready 3. Complete the 40km task in 2 hours. Great flight.", isTerminal: true, score: 90, lessons: ["Pre-flight cloudbase calculation set accurate expectations.", "Dark bases correctly identified peak conditions.", "Leaving below cloudbase saved time."]),
            "grind": ScenarioNode(id: "grind", narrative: "6 minutes grinding in weak lift. Cloud overdevelops, whiteout. 5 minutes lost. Task completed slowly.", isTerminal: true, score: 55, lessons: ["Grinding near cloudbase is time-inefficient.", "McCready theory: leave weak climbs.", "Cloud suck is real."]),
            "wind-first": ScenarioNode(id: "wind-first", narrative: "You didn't calculate cloudbase. Surprised when thermals top at 900m. Altitude expectations wrong.", isTerminal: true, score: 50, lessons: ["Cloudbase calculation is the foundation of flight planning.", "Knowing altitude ceiling lets you plan realistic glides."]),
            "hesitate": ScenarioNode(id: "hesitate", narrative: "You wait, missing peak conditions. By 1:30pm, real overdevelopment. Only a 15km local flight.", isTerminal: true, score: 30, lessons: ["Hesitating during peak wastes the best time.", "Dark bases at noon are strong thermals, not overdevelopment."]),
            "no-plan": ScenarioNode(id: "no-plan", narrative: "You launch at 10am. Thermals scrappy and weak. 45 minutes scratching low before conditions develop.", isTerminal: true, score: 25, lessons: ["Thermal trigger time depends on surface temperature.", "Pre-flight planning dramatically improves outcomes."]),
        ]
    )

    // MARK: - Whiteout Companion Rescue

    static let whiteoutRescue = Scenario(
        id: "whiteout-rescue",
        title: "Whiteout Companion Rescue",
        description: "A member of your group is caught in a slide during deteriorating visibility. Execute a companion rescue in challenging conditions.",
        difficulty: .expert,
        domains: [.avalanche],
        testedModules: ["avalanche-companion-rescue", "avalanche-avalanche-triangle", "avalanche-human-factors"],
        requirements: [
            ScenarioRequirement(domain: .avalanche, moduleSlug: "companion-rescue"),
            ScenarioRequirement(domain: .avalanche, moduleSlug: "human-factors"),
        ],
        startNodeId: "start",
        nodes: [
            "start": ScenarioNode(id: "start", narrative: "Your group of 3 is descending in deteriorating visibility. Moderate danger, 33° slope. The lead skier triggers a wind slab — carried 80m into debris, disappears. Time: 0 min. First action?", choices: [
                ScenarioChoice(label: "Switch beacon to search, note last-seen point, move toward it", nextNodeId: "beacon-search", optimal: true, feedback: "Correct priority. Every second counts."),
                ScenarioChoice(label: "Call mountain rescue immediately", nextNodeId: "call-first", feedback: "Mountain rescue takes 20+ minutes. Your partner needs YOU."),
                ScenarioChoice(label: "Assess for secondary avalanche risk before moving", nextNodeId: "assess-first", feedback: "A quick glance is prudent (2 seconds), but prolonged assessment costs time."),
            ]),
            "beacon-search": ScenarioNode(id: "beacon-search", narrative: "Time: 1 min. Signal at 40m. Visibility 20m. Signal increasing. At 15m, directional arrows show. Technique?", choices: [
                ScenarioChoice(label: "Follow arrows, reduce search width, slow down as distance decreases", nextNodeId: "fine-search", optimal: true, feedback: "Standard beacon technique: coarse → fine search."),
                ScenarioChoice(label: "Start probing immediately at the 15m mark", nextNodeId: "early-probe", feedback: "At 15m, the search area is too large. Continue fine search."),
            ]),
            "fine-search": ScenarioNode(id: "fine-search", narrative: "Time: 3 min. Signal narrowed to 2m radius, 1.2m depth. Probing in spiral — 4th strike at 1m. Next?", choices: [
                ScenarioChoice(label: "Leave probe in place, dig from 1.5m downhill, create a platform", nextNodeId: "efficient-dig", optimal: true, feedback: "Perfect technique. Dig from downhill for fastest extraction."),
                ScenarioChoice(label: "Start digging directly on top of the probe", nextNodeId: "overhead-dig", feedback: "Digging from above is slower and risks injuring the victim."),
            ]),
            "efficient-dig": ScenarioNode(id: "efficient-dig", narrative: "Time: 5 min. Rotating diggers. At 10 min, arm exposed. At 12 min, airway cleared. Partner conscious but hypothermic. 12-minute burial.", isTerminal: true, score: 95, lessons: ["12-minute burial — well within 90% survival zone.", "Efficient beacon technique saved minutes.", "Rotating diggers prevents exhaustion.", "Downhill V-excavation is 40% faster."]),
            "overhead-dig": ScenarioNode(id: "overhead-dig", narrative: "Digging from above is awkward — snow falls back in. At 15 min, face exposed. Partner unconscious but breathing.", isTerminal: true, score: 60, lessons: ["15 minutes — approaching the 18-minute mark.", "Digging from above cost 3+ extra minutes.", "In a rescue, technique matters as much as speed."]),
            "call-first": ScenarioNode(id: "call-first", narrative: "2 minutes on the phone. Helicopter ETA 35 min due to weather. Your partner has been buried 2 min before you even start searching.", choices: [
                ScenarioChoice(label: "Hang up and start beacon search immediately", nextNodeId: "late-search", optimal: true, feedback: "2 minutes wasted but starting now is critical."),
                ScenarioChoice(label: "Guide the helicopter while searching", nextNodeId: "late-search", feedback: "Can't effectively do both. Focus on finding your partner."),
            ]),
            "late-search": ScenarioNode(id: "late-search", narrative: "Starting 2 min late. Locate at 5 min, probe at 7 min, airway at 19 min. 19-minute burial. Survival ~30%.", isTerminal: true, score: 35, lessons: ["2 minutes on the phone pushed past the 18-minute window.", "Helicopter takes 45+ min average. Companion rescue is the ONLY option.", "Priority: BEACON → SEARCH → PROBE → DIG → CALL."]),
            "assess-first": ScenarioNode(id: "assess-first", narrative: "3 minutes assessing. Slope has released and is unlikely to slide again. But 3 minutes of the survival window are gone.", choices: [
                ScenarioChoice(label: "Begin beacon search now", nextNodeId: "late-search", optimal: true, feedback: "A 2-3 second visual scan is reasonable. 3 minutes was too long."),
            ]),
            "early-probe": ScenarioNode(id: "early-probe", narrative: "3 minutes of random probing at 15m radius. Then you continue fine search. Located at 7 min — 4 min late.", isTerminal: true, score: 45, lessons: ["15m radius = 700m² area. Needle in a haystack.", "Complete fine search to 2-3m BEFORE probing.", "Follow: coarse → fine → pinpoint → probe → dig."]),
        ]
    )

    // MARK: - Sea Breeze Convergence

    static let seaBreezeConvergence = Scenario(
        id: "sea-breeze-convergence",
        title: "Sea Breeze Convergence",
        description: "A coastal flying site with developing sea breeze. Navigate the transition from thermal to convergence lift.",
        difficulty: .advanced,
        domains: [.weather, .flying],
        testedModules: ["weather-convergence", "weather-mountain-winds", "flying-convergence-sea-breeze", "flying-valley-flying", "flying-speed-to-fly"],
        requirements: [
            ScenarioRequirement(domain: .weather, moduleSlug: "convergence"),
            ScenarioRequirement(domain: .flying, moduleSlug: "convergence-sea-breeze"),
            ScenarioRequirement(domain: .flying, moduleSlug: "valley-flying"),
        ],
        startNodeId: "start",
        nodes: [
            "start": ScenarioNode(id: "start", narrative: "Flying at 1200m over a coastal mountain range. 2pm. Thermals on seaward slopes have died — sea breeze has arrived. Inland thermals weakening. Distinct cloud line 15km east. What is it?", choices: [
                ScenarioChoice(label: "Sea breeze convergence front — maritime air meets inland thermals", nextNodeId: "identified", optimal: true, feedback: "Correct. The cloud line marks where cool sea breeze collides with warm inland air."),
                ScenarioChoice(label: "A cold front approaching from the east", nextNodeId: "wrong-id", feedback: "Cold fronts come from the west. This is daily sea breeze convergence."),
                ScenarioChoice(label: "Overdeveloping cumulus — thunderstorm risk", nextNodeId: "wrong-id", feedback: "A distinct LINE parallel to the coast is convergence, not random overdevelopment."),
            ]),
            "identified": ScenarioNode(id: "identified", narrative: "Convergence 15km east, moving slowly toward you. Your thermals weakening to +1 m/s. At 1200m. Strategy?", choices: [
                ScenarioChoice(label: "Fly east to intercept the convergence line", nextNodeId: "intercept", optimal: true, feedback: "The convergence will provide stronger lift than dying thermals."),
                ScenarioChoice(label: "Stay in the weakening thermals — familiar and workable", nextNodeId: "stay-thermal", feedback: "The sea breeze is killing them. They will continue to weaken."),
                ScenarioChoice(label: "Land while you have altitude — conditions deteriorating", nextNodeId: "early-land", feedback: "Conditions are transforming, not just deteriorating."),
            ]),
            "intercept": ScenarioNode(id: "intercept", narrative: "You fly east at McCready 1. After 10km, convergence ahead. You hit +4 m/s. Climb to 1800m in smooth lift. Now what?", choices: [
                ScenarioChoice(label: "Fly along the convergence line — ride the highway", nextNodeId: "ride-line", optimal: true, feedback: "The convergence is a highway. Fly along it, not across."),
                ScenarioChoice(label: "Circle up to maximum altitude, then push ahead", nextNodeId: "circle-leave", feedback: "Stopping to circle wastes the linear nature of convergence lift."),
            ]),
            "ride-line": ScenarioNode(id: "ride-line", narrative: "You fly along the convergence at 90km/h, barely circling. +2 to +4 m/s sustained for 25km. 25km in 20 minutes. Best lift of the day.", isTerminal: true, score: 95, lessons: ["Sea breeze convergence provides the strongest afternoon lift.", "Fly ALONG the line, not across.", "Transition from thermal to convergence requires reading the sky.", "The convergence moves inland throughout the afternoon."]),
            "circle-leave": ScenarioNode(id: "circle-leave", narrative: "You circle to 2000m, then leave the convergence. Within 5km, dead air — sea breeze killed thermals. You glide back to the line.", isTerminal: true, score: 50, lessons: ["Convergence lift is linear — use it linearly.", "Behind the line, the sea breeze killed thermals.", "Ahead of the line, thermals may work but convergence is stronger."]),
            "stay-thermal": ScenarioNode(id: "stay-thermal", narrative: "Thermals weaken to +0.5 m/s. By 3pm, sea breeze reaches you and thermals die. At 800m with no lift. Land 5km from the convergence.", isTerminal: true, score: 25, lessons: ["Staying in dying thermals while convergence develops is a classic missed opportunity.", "The sea breeze kills thermals progressively from coast inland."]),
            "early-land": ScenarioNode(id: "early-land", narrative: "You land at 2:30pm with 1000m to spare. From the ground, you watch massive cumulus with +4 m/s climbs pass overhead.", isTerminal: true, score: 15, lessons: ["What looked like deterioration was transformation.", "Understanding the sea breeze cycle would have kept you airborne.", "Landing with altitude and options is a waste."]),
            "wrong-id": ScenarioNode(id: "wrong-id", narrative: "You misidentify the cloud line and avoid it. Thermals continue to weaken. By 3pm, forced to land.", isTerminal: true, score: 20, lessons: ["The cloud line parallel to the coast is sea breeze convergence.", "Misidentifying it caused you to avoid the best lift.", "Coastal pilots must understand the daily sea breeze cycle."]),
        ]
    )
}
