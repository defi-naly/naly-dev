import Foundation

// MARK: - Domain Content
// Direct port of domains.ts — all 3 domains, 30 modules

enum DomainContent {

    static let totalModulesPerDomain = 10

    static func getDomain(_ id: DomainId) -> Domain? {
        allDomains.first { $0.id == id }
    }

    static func getModule(domainId: DomainId, slug: String) -> Module? {
        getDomain(domainId)?.modules.first { $0.slug == slug }
    }

    static func getModuleById(domainId: DomainId, moduleId: Int) -> Module? {
        getDomain(domainId)?.modules.first { $0.id == moduleId }
    }

    // MARK: - All Domains

    static let allDomains: [Domain] = [weather, avalanche, flying]

    // MARK: - Weather Domain

    static let weather = Domain(
        id: .weather,
        name: "Weather",
        subtitle: "Understanding the Sky",
        description: "Read pressure systems, thermals, and mountain winds. Anticipate what the sky will do next.",
        book: "Understanding the Sky",
        author: "Dennis Pagen",
        accent: "#7BA7CC",
        accentRgb: "123, 167, 204",
        modules: [
            Module(
                id: 1, domain: .weather, slug: "atmosphere",
                title: "The Atmosphere", concept: "Atmospheric layers, pressure, temperature",
                takeaway: "Air cools as it rises, warms as it sinks. This single principle drives all weather.",
                tool: "AtmosphericLayerExplorer", difficulty: .foundation,
                relatedModules: [RelatedModule(domain: .flying, slug: "soaring-fundamentals")],
                applicationScenario: ApplicationScenario(
                    situation: "You're at 6,000ft and the surface temperature is 30°C. Using the standard lapse rate (2°C/1000ft), what temperature should you expect at your altitude?",
                    options: [
                        ApplicationOption(label: "18°C", correct: true, explanation: "30°C - (6 × 2°C) = 18°C. The standard environmental lapse rate is approximately 2°C per 1000 feet."),
                        ApplicationOption(label: "24°C", correct: false, explanation: "This would only be correct if you used 1°C per 1000ft, which is lower than the standard lapse rate."),
                        ApplicationOption(label: "12°C", correct: false, explanation: "You used the dry adiabatic lapse rate (3°C/1000ft) instead of the standard environmental lapse rate."),
                    ]
                ),
                connectionPrompt: "How does understanding atmospheric temperature change with altitude connect to soaring fundamentals?"
            ),
            Module(
                id: 2, domain: .weather, slug: "pressure-systems",
                title: "Pressure Systems", concept: "Pressure gradients create wind",
                takeaway: "Wind is simply air flowing from high to low pressure. The tighter the isobars, the stronger the wind.",
                tool: "PressureSystemAnimator", difficulty: .foundation,
                relatedModules: [RelatedModule(domain: .weather, slug: "mountain-waves")],
                applicationScenario: ApplicationScenario(
                    situation: "You see a weather map with isobars very tightly packed over the Alps. What should you expect?",
                    options: [
                        ApplicationOption(label: "Strong winds and possible mountain wave activity", correct: true, explanation: "Tightly packed isobars indicate a strong pressure gradient, meaning strong winds — perfect conditions for mountain waves."),
                        ApplicationOption(label: "Light winds and good thermal conditions", correct: false, explanation: "Tight isobars mean strong pressure gradients and strong winds, not light winds."),
                        ApplicationOption(label: "Heavy precipitation with calm winds", correct: false, explanation: "Tight isobars indicate wind, not precipitation. Rain depends on moisture and lift mechanisms."),
                    ]
                ),
                connectionPrompt: "How do pressure systems relate to mountain wave formation?"
            ),
            Module(
                id: 3, domain: .weather, slug: "fronts",
                title: "Air Masses & Fronts", concept: "Frontal weather sequence",
                takeaway: "Cold fronts are steep and violent. Warm fronts are shallow and persistent. Both demand respect.",
                tool: "FrontPassageTimeline", difficulty: .foundation,
                relatedModules: [RelatedModule(domain: .weather, slug: "thunderstorms")],
                applicationScenario: ApplicationScenario(
                    situation: "A cold front is approaching from the west, expected in 6 hours. You're planning an afternoon hike. What weather sequence should you prepare for?",
                    options: [
                        ApplicationOption(label: "Rapidly deteriorating conditions with gusty winds and possible thunderstorms", correct: true, explanation: "Cold fronts are steep and move fast. Expect a sharp wind shift, rapid temperature drop, gusty conditions, and possible cumulonimbus development."),
                        ApplicationOption(label: "Gradual cloud thickening and light steady rain", correct: false, explanation: "This describes a warm front approach, not a cold front. Cold fronts bring sudden, violent weather changes."),
                        ApplicationOption(label: "Improving conditions as the front passes", correct: false, explanation: "Conditions improve after the front passes, but the passage itself brings the worst weather."),
                    ]
                ),
                connectionPrompt: "How do frontal systems relate to thunderstorm development?"
            ),
            Module(
                id: 4, domain: .weather, slug: "thermals",
                title: "Thermals", concept: "Thermal triggering & sources",
                takeaway: "Dark surfaces heat fastest. Thermals release when the trigger temperature is exceeded — like bubbles in a pot.",
                tool: "ThermalTriggerSimulator", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .flying, slug: "thermal-entry"), RelatedModule(domain: .flying, slug: "centering")],
                applicationScenario: ApplicationScenario(
                    situation: "It's 11am on a clear day. You're looking at a dark plowed field next to a lake. Where would you expect the first thermals?",
                    options: [
                        ApplicationOption(label: "Over the dark plowed field", correct: true, explanation: "Dark surfaces absorb more solar radiation and heat faster. The plowed field will reach trigger temperature before the lake, which has high thermal inertia."),
                        ApplicationOption(label: "Over the lake", correct: false, explanation: "Water has very high thermal inertia — it heats slowly. Lakes suppress thermals and often create sink."),
                        ApplicationOption(label: "Equally from both", correct: false, explanation: "Different surface types heat at very different rates. Dark, dry surfaces always trigger first."),
                    ]
                ),
                connectionPrompt: "How does understanding thermal sources help with thermal entry technique?"
            ),
            Module(
                id: 5, domain: .weather, slug: "lapse-rates",
                title: "Lapse Rates", concept: "Stability & instability",
                takeaway: "Dry air cools at 3°C/1000ft. Moist air at 1.5°C/1000ft. The gap between them determines whether air rises or sinks.",
                tool: "LapseRateCalculator", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .flying, slug: "climbing")],
                applicationScenario: ApplicationScenario(
                    situation: "Surface temp is 25°C, dewpoint is 15°C. At what altitude will clouds form?",
                    options: [
                        ApplicationOption(label: "Approximately 2,200ft AGL", correct: true, explanation: "Using Espy's formula: LCL = 222 × (T - Td) = 222 × (25 - 15) = 2,220ft. This is where rising air reaches saturation."),
                        ApplicationOption(label: "Approximately 5,000ft AGL", correct: false, explanation: "This is too high. The temperature-dewpoint spread of 10°C gives an LCL around 2,200ft."),
                        ApplicationOption(label: "Approximately 1,000ft AGL", correct: false, explanation: "This is too low. You'd need a temperature-dewpoint spread of only about 4.5°C for this altitude."),
                    ]
                ),
                connectionPrompt: "How do lapse rates affect your decisions when climbing to cloudbase?"
            ),
            Module(
                id: 6, domain: .weather, slug: "clouds",
                title: "Clouds", concept: "Cloud classification & meaning",
                takeaway: "Every cloud is a message. Cumulus means lift. Lenticularis means waves. Cumulonimbus means run.",
                tool: "CloudTypeIdentifier", difficulty: .foundation,
                relatedModules: [RelatedModule(domain: .flying, slug: "reading-sky")],
                applicationScenario: ApplicationScenario(
                    situation: "You see lenticular clouds forming over a ridge and cumulus building rapidly to the east. What does this tell you?",
                    options: [
                        ApplicationOption(label: "Mountain waves are active over the ridge; thermals are working to the east", correct: true, explanation: "Lenticular clouds are the signature of mountain waves — smooth, powerful lift aloft with dangerous rotors below. Active cumulus indicate thermal activity."),
                        ApplicationOption(label: "Rain is approaching from the east", correct: false, explanation: "Cumulus with vertical development indicate thermals, not approaching rain."),
                        ApplicationOption(label: "Stable conditions with no usable lift", correct: false, explanation: "Both cloud types indicate active atmospheric lift — waves and thermals respectively."),
                    ]
                ),
                connectionPrompt: "How does cloud identification help with reading the sky for flying?"
            ),
            Module(
                id: 7, domain: .weather, slug: "mountain-winds",
                title: "Mountain Winds", concept: "Valley, slope, sea breeze winds",
                takeaway: "Valleys breathe: upslope by day, downslope by night. The transition windows are the calmest — and most flyable.",
                tool: "ValleyWindCycleAnimator", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .flying, slug: "valley-flying"), RelatedModule(domain: .avalanche, slug: "weather-loading")],
                applicationScenario: ApplicationScenario(
                    situation: "It's 2pm in an alpine valley. Which direction is the valley wind blowing?",
                    options: [
                        ApplicationOption(label: "Up-valley (anabatic)", correct: true, explanation: "By afternoon, solar heating drives strong up-valley (anabatic) winds. The slopes heat the air which rises, drawing air up from the valley mouth."),
                        ApplicationOption(label: "Down-valley (katabatic)", correct: false, explanation: "Down-valley winds occur at night when slopes cool radiatively."),
                        ApplicationOption(label: "Calm — no wind during transition", correct: false, explanation: "The morning transition is around 9-10am. By 2pm, the anabatic wind cycle is at full strength."),
                    ]
                ),
                connectionPrompt: "How do mountain wind patterns affect both valley flying and avalanche weather loading?"
            ),
            Module(
                id: 8, domain: .weather, slug: "mountain-waves",
                title: "Mountain Waves", concept: "Lee waves, rotors, foehn",
                takeaway: "Strong wind over ridges creates standing waves. Smooth and powerful aloft, violent rotors below. Lenticular clouds mark the crests.",
                tool: "MountainWaveVisualizer", difficulty: .advanced,
                relatedModules: [RelatedModule(domain: .flying, slug: "convergence-sea-breeze")],
                applicationScenario: ApplicationScenario(
                    situation: "You observe a stack of smooth lens-shaped clouds above a ridge with strong turbulence reported below 8,000ft. What is happening?",
                    options: [
                        ApplicationOption(label: "Mountain wave with rotor turbulence below", correct: true, explanation: "The lenticular stack marks wave crests. Below the wave, rotor zones create severe turbulence."),
                        ApplicationOption(label: "Thunderstorm developing behind the ridge", correct: false, explanation: "Lenticular clouds are smooth and stationary — the opposite of cumulonimbus."),
                        ApplicationOption(label: "Temperature inversion trapping pollution", correct: false, explanation: "Inversions create haze layers, not lenticular cloud stacks."),
                    ]
                ),
                connectionPrompt: "How does understanding mountain waves connect to convergence and sea breeze phenomena?"
            ),
            Module(
                id: 9, domain: .weather, slug: "convergence",
                title: "Convergence", concept: "Convergence lift",
                takeaway: "Where two air masses collide, air has nowhere to go but up. Convergence lines are invisible highways of lift.",
                tool: "ConvergenceZoneFinder", difficulty: .advanced,
                relatedModules: [RelatedModule(domain: .flying, slug: "convergence-sea-breeze")],
                applicationScenario: ApplicationScenario(
                    situation: "Two valley wind systems are converging ahead of you, marked by a distinct cloud line. What should you expect?",
                    options: [
                        ApplicationOption(label: "A line of strong, reliable lift along the convergence", correct: true, explanation: "When two air masses collide, the air is forced upward. Convergence lines produce some of the strongest and most reliable lift available."),
                        ApplicationOption(label: "Strong sink and turbulence to avoid", correct: false, explanation: "Convergence produces lift, not sink."),
                        ApplicationOption(label: "The clouds will dissipate as the systems cancel out", correct: false, explanation: "Air masses don't cancel — they collide and force air upward."),
                    ]
                ),
                connectionPrompt: "How does convergence lift relate to sea breeze convergence in flying?"
            ),
            Module(
                id: 10, domain: .weather, slug: "thunderstorms",
                title: "Thunderstorms", concept: "CB development & escape",
                takeaway: "Instability + moisture + trigger + shear = thunderstorm. Missing any one of these and the storm doesn't form. Know all four.",
                tool: "ThunderstormDecisionTree", difficulty: .advanced,
                relatedModules: [RelatedModule(domain: .avalanche, slug: "decision-framework")],
                applicationScenario: ApplicationScenario(
                    situation: "You have instability, moisture, and an approaching cold front. Wind shear is moderate. Assess the thunderstorm risk.",
                    options: [
                        ApplicationOption(label: "High risk — all four ingredients present, expect organized storms", correct: true, explanation: "Instability + moisture + trigger (cold front) + shear = all four ingredients. Moderate shear means storms will be organized."),
                        ApplicationOption(label: "Low risk — wind shear prevents storm formation", correct: false, explanation: "Moderate wind shear actually organizes storms, making them longer-lasting."),
                        ApplicationOption(label: "Moderate risk — missing the trigger mechanism", correct: false, explanation: "The cold front IS the trigger mechanism. All four ingredients are present."),
                    ]
                ),
                connectionPrompt: "How does systematic thunderstorm assessment relate to avalanche decision frameworks?"
            ),
        ]
    )

    // MARK: - Avalanche Domain

    static let avalanche = Domain(
        id: .avalanche,
        name: "Avalanche",
        subtitle: "Staying Alive",
        description: "Assess snowpack layers, terrain traps, and human bias. Make decisions that keep you alive.",
        book: "Staying Alive in Avalanche Terrain",
        author: "Bruce Tremper",
        accent: "#FFFFFF",
        accentRgb: "255, 255, 255",
        modules: [
            Module(
                id: 1, domain: .avalanche, slug: "avalanche-triangle",
                title: "The Avalanche Triangle", concept: "Combined factor risk",
                takeaway: "Three sides: terrain, weather, snowpack. Plus the human factor in the center. All four must align for safety.",
                tool: "AvalancheTriangle", difficulty: .foundation,
                relatedModules: [RelatedModule(domain: .avalanche, slug: "human-factors")],
                applicationScenario: ApplicationScenario(
                    situation: "The danger rating is Considerable. You're looking at a 35° north-facing slope with recent wind loading. Which side of the avalanche triangle is most concerning?",
                    options: [
                        ApplicationOption(label: "All three sides are elevated — terrain, weather, and snowpack all contribute", correct: true, explanation: "At Considerable danger, the combination matters. The 35° angle is in the prime danger zone, recent wind loading adds stress, and north-facing slopes preserve weak layers longer."),
                        ApplicationOption(label: "Only the terrain side — the slope angle is the main concern", correct: false, explanation: "Slope angle alone doesn't cause avalanches. You need the interplay of all three factors."),
                        ApplicationOption(label: "Only the weather side — recent wind is the problem", correct: false, explanation: "Wind loading is one factor, but the combination with terrain and snowpack creates the danger."),
                    ]
                ),
                connectionPrompt: "How does the avalanche triangle connect to understanding human factors in decision-making?"
            ),
            Module(
                id: 2, domain: .avalanche, slug: "slab-physics",
                title: "Slab Physics", concept: "How avalanches release",
                takeaway: "A slab is a cohesive layer resting on a weak layer. Stress exceeds strength at one point, then the fracture propagates at 100m/s.",
                tool: "SlabPhysics", difficulty: .foundation,
                relatedModules: [RelatedModule(domain: .avalanche, slug: "snowpack-layers")],
                applicationScenario: ApplicationScenario(
                    situation: "You find a 40cm hard slab sitting on depth hoar while digging a snow pit. What does this tell you about stability?",
                    options: [
                        ApplicationOption(label: "Extremely dangerous — hard slab on a persistent weak layer", correct: true, explanation: "Depth hoar is a persistent weak layer that doesn't heal. A hard slab on depth hoar can produce a large, destructive avalanche."),
                        ApplicationOption(label: "Moderately dangerous — the hard slab provides good support", correct: false, explanation: "A hard slab stores more energy and produces larger avalanches when it releases."),
                        ApplicationOption(label: "Safe — depth hoar at the bottom means the snowpack settled well", correct: false, explanation: "Depth hoar is the most persistent and dangerous weak layer type."),
                    ]
                ),
                connectionPrompt: "How does understanding slab physics connect to identifying snowpack layers?"
            ),
            Module(
                id: 3, domain: .avalanche, slug: "slope-angle",
                title: "Slope Angle", concept: "The 30-45 degree danger zone",
                takeaway: "93% of avalanche fatalities occur on slopes between 30-45°. Below 30° it rarely slides. Above 45° it sloughs constantly.",
                tool: "SlopeAngleAnalyzer", difficulty: .foundation,
                relatedModules: [RelatedModule(domain: .avalanche, slug: "terrain-traps")],
                applicationScenario: ApplicationScenario(
                    situation: "Your inclinometer reads 36° on the slope you want to ski. Connected slopes above measure 42°. Should you enter?",
                    options: [
                        ApplicationOption(label: "No — both angles are in the prime danger zone and the slope above can release onto you", correct: true, explanation: "36° and 42° are both in the 30-45° danger zone. The steeper connected slope above adds significant risk."),
                        ApplicationOption(label: "Yes — 36° is near the lower end of the danger zone", correct: false, explanation: "36° is well within the prime avalanche zone, and the 42° slope above adds risk."),
                        ApplicationOption(label: "Yes — slopes above 40° slough and can't build slabs", correct: false, explanation: "42° is still within the slab avalanche zone. Sloughing dominates above 45°."),
                    ]
                ),
                connectionPrompt: "How does slope angle analysis connect to terrain trap identification?"
            ),
            Module(
                id: 4, domain: .avalanche, slug: "terrain-traps",
                title: "Terrain Traps", concept: "Terrain feature recognition",
                takeaway: "A small slide into a terrain trap kills. Gullies, cliffs, creek beds, and trees amplify consequence.",
                tool: "TerrainTrapIdentifier", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .avalanche, slug: "slope-angle")],
                applicationScenario: ApplicationScenario(
                    situation: "Your planned descent follows a narrow gully that opens onto a flat bench above a cliff band. Identify the terrain trap risk.",
                    options: [
                        ApplicationOption(label: "Multiple terrain traps: gully funnels debris, cliff band prevents escape", correct: true, explanation: "The gully channels avalanche debris. The cliff band below means even a small slide could push you over."),
                        ApplicationOption(label: "Low risk — the flat bench provides a safe runout zone", correct: false, explanation: "A bench above a cliff is not safe — debris can push you off."),
                        ApplicationOption(label: "Moderate risk — only the gully is a concern", correct: false, explanation: "Both the gully AND the cliff band are terrain traps."),
                    ]
                ),
                connectionPrompt: "How does terrain trap identification relate to slope angle assessment?"
            ),
            Module(
                id: 5, domain: .avalanche, slug: "snowpack-layers",
                title: "Snowpack Layers", concept: "Weak layers & crystal types",
                takeaway: "Rounds bond well. Facets don't. Surface hoar is beautiful and deadly. The snowpack remembers every storm.",
                tool: "SnowpackLayerBuilder", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .avalanche, slug: "slab-physics"), RelatedModule(domain: .avalanche, slug: "stability-testing")],
                applicationScenario: ApplicationScenario(
                    situation: "After a week of clear, cold nights followed by a 30cm storm, what weak layer are you most concerned about?",
                    options: [
                        ApplicationOption(label: "Surface hoar buried by the new snow", correct: true, explanation: "Clear, cold nights produce surface hoar. When buried, it creates a dangerous persistent weak layer."),
                        ApplicationOption(label: "The interface between old and new snow", correct: false, explanation: "The specific conditions produce surface hoar — a much more dangerous weak layer."),
                        ApplicationOption(label: "Wind slab on the surface of the new snow", correct: false, explanation: "No wind was mentioned. The key concern is surface hoar from the clear, cold nights."),
                    ]
                ),
                connectionPrompt: "How does understanding snowpack layers connect to both slab physics and stability testing?"
            ),
            Module(
                id: 6, domain: .avalanche, slug: "stability-testing",
                title: "Stability Testing", concept: "Field stability assessment",
                takeaway: "CT scores tell you how hard to trigger. ECT tells you if the fracture will propagate. Both matter.",
                tool: "StabilityTestSimulator", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .avalanche, slug: "snowpack-layers")],
                applicationScenario: ApplicationScenario(
                    situation: "Your compression test shows CT12 with a clean planar shear. The ECT shows full propagation (ECTP). Interpret these results.",
                    options: [
                        ApplicationOption(label: "Dangerous — moderate trigger force but the fracture will propagate widely", correct: true, explanation: "CT12 means a moderate force triggers the weak layer. Full ECT propagation means the fracture will spread across the slope."),
                        ApplicationOption(label: "Moderate — CT12 is a moderate score so moderate danger", correct: false, explanation: "The full ECT propagation is the critical finding."),
                        ApplicationOption(label: "Safe — you need hard force (CT > 20) before worrying", correct: false, explanation: "CT12 can be triggered by a skier. Combined with full propagation, this is very dangerous."),
                    ]
                ),
                connectionPrompt: "How does stability testing relate to understanding snowpack layer structure?"
            ),
            Module(
                id: 7, domain: .avalanche, slug: "weather-loading",
                title: "Weather Loading", concept: "Wind slab formation",
                takeaway: "Wind is the architect of avalanches. It deposits snow on lee slopes. 2cm of wind slab equals 20cm of natural snowfall in danger.",
                tool: "WeatherLoadingSimulator", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .weather, slug: "mountain-winds")],
                applicationScenario: ApplicationScenario(
                    situation: "Strong westerly winds have been blowing for 48 hours after a 20cm snowfall. Which aspects are most dangerous?",
                    options: [
                        ApplicationOption(label: "East-facing slopes — lee side of the prevailing wind", correct: true, explanation: "West winds deposit wind slab on east-facing lee slopes. 48 hours of transport builds substantial wind slabs."),
                        ApplicationOption(label: "West-facing slopes — directly exposed to the wind", correct: false, explanation: "Windward (west) slopes are stripped of snow. The danger is on the lee (east) side."),
                        ApplicationOption(label: "South-facing slopes — most solar exposure", correct: false, explanation: "Wind direction determines where slabs build — lee (east) slopes receive the snow."),
                    ]
                ),
                connectionPrompt: "How does wind slab formation connect to understanding mountain wind patterns?"
            ),
            Module(
                id: 8, domain: .avalanche, slug: "human-factors",
                title: "Human Factors", concept: "The 5 heuristic traps",
                takeaway: "Familiarity, commitment, expert halo, social proof, scarcity. These biases kill more people than bad snowpack assessment.",
                tool: "HumanFactorsScenarios", difficulty: .advanced,
                relatedModules: [RelatedModule(domain: .avalanche, slug: "decision-framework")],
                applicationScenario: ApplicationScenario(
                    situation: "Your group of 5 includes two mountain guides who want to ski the steepest line. You're uncomfortable but don't want to speak up. Which heuristic traps are active?",
                    options: [
                        ApplicationOption(label: "Expert halo and social proof — deferring to perceived authority and group pressure", correct: true, explanation: "Expert halo: you trust the guides' judgment over your own. Social proof: group consensus overrides your instinct."),
                        ApplicationOption(label: "Only commitment — you've driven a long way", correct: false, explanation: "The dominant traps here are expert halo and social proof."),
                        ApplicationOption(label: "Scarcity — wanting the fresh powder before others get it", correct: false, explanation: "The scenario highlights social dynamics, not scarcity."),
                    ]
                ),
                connectionPrompt: "How do human factor biases undermine structured decision frameworks?"
            ),
            Module(
                id: 9, domain: .avalanche, slug: "decision-framework",
                title: "Decision Framework", concept: "Structured decision-making",
                takeaway: "A checklist is not a guarantee, but it's better than gut feel. Systematic evaluation catches what intuition misses.",
                tool: "DecisionFramework", difficulty: .advanced,
                relatedModules: [RelatedModule(domain: .weather, slug: "thunderstorms"), RelatedModule(domain: .avalanche, slug: "human-factors")],
                applicationScenario: ApplicationScenario(
                    situation: "Considerable danger, 35° north-facing slope, recent wind loading, party of 3. Apply the decision framework.",
                    options: [
                        ApplicationOption(label: "Multiple red flags — choose alternative terrain below 30° or different aspect", correct: true, explanation: "Considerable + prime slope angle + north aspect + wind loading = too many risk factors."),
                        ApplicationOption(label: "Acceptable — proceed with spacing and escape route planned", correct: false, explanation: "Spacing reduces consequence but doesn't reduce triggering probability."),
                        ApplicationOption(label: "Need more data — dig a pit before deciding", correct: false, explanation: "You already have enough red flags to choose alternative terrain."),
                    ]
                ),
                connectionPrompt: "How does systematic avalanche decision-making parallel thunderstorm risk assessment?"
            ),
            Module(
                id: 10, domain: .avalanche, slug: "companion-rescue",
                title: "Companion Rescue", concept: "The 18-minute window",
                takeaway: "Survival drops from 90% to 30% after 18 minutes. Your partners are your lifeline. Practice until the search is automatic.",
                tool: "CompanionRescueTimer", difficulty: .advanced,
                relatedModules: nil,
                applicationScenario: ApplicationScenario(
                    situation: "Your partner is buried. You saw them disappear 50m upslope 2 minutes ago. What is your first action?",
                    options: [
                        ApplicationOption(label: "Switch beacon to search, move to last-seen point, begin signal search", correct: true, explanation: "Immediately switch to search mode. You have 16 minutes left in the critical window."),
                        ApplicationOption(label: "Call for helicopter rescue immediately", correct: false, explanation: "A helicopter takes 20-45 minutes. Companion rescue is their only chance."),
                        ApplicationOption(label: "Probe the debris randomly to find them faster", correct: false, explanation: "Your beacon can locate them in 2-3 minutes. Follow the signal search protocol."),
                    ]
                ),
                connectionPrompt: "How does the urgency of companion rescue connect to overall avalanche safety preparation?"
            ),
        ]
    )

    // MARK: - Flying Domain

    static let flying = Domain(
        id: .flying,
        name: "Flying",
        subtitle: "Thermal Flying",
        description: "Core thermals, glide between lift, and fly cross-country. Turn invisible energy into distance.",
        book: "Thermal Flying",
        author: "Burkhard Martens",
        accent: "#E8A87C",
        accentRgb: "232, 168, 124",
        modules: [
            Module(
                id: 1, domain: .flying, slug: "soaring-fundamentals",
                title: "Soaring Fundamentals", concept: "Types of usable lift",
                takeaway: "Three types of lift: ridge, thermal, convergence. Each has a season, a time of day, and a signature in the sky.",
                tool: "SoaringFundamentals", difficulty: .foundation,
                relatedModules: [RelatedModule(domain: .weather, slug: "atmosphere")],
                applicationScenario: ApplicationScenario(
                    situation: "You're at a coastal ridge launch site. Wind is onshore at 15 knots, cumulus forming inland. What lift types are available?",
                    options: [
                        ApplicationOption(label: "Ridge lift at the coast, thermals inland — transition possible", correct: true, explanation: "15kt onshore wind creates ridge lift. Cumulus inland mark thermal activity."),
                        ApplicationOption(label: "Only ridge lift — thermals don't work near the coast", correct: false, explanation: "The cumulus inland prove thermals are working."),
                        ApplicationOption(label: "Only thermals — 15 knots is too strong for ridge lift", correct: false, explanation: "15 knots is ideal for ridge lift."),
                    ]
                ),
                connectionPrompt: "How does understanding atmospheric layers connect to the fundamentals of soaring?"
            ),
            Module(
                id: 2, domain: .flying, slug: "reading-sky",
                title: "Reading the Sky", concept: "Visual cues for thermals",
                takeaway: "Cumulus with flat bases and cauliflower tops mark active thermals. Dark bases mean strong lift. Wispy edges mean dying lift.",
                tool: "ReadingTheSky", difficulty: .foundation,
                relatedModules: [RelatedModule(domain: .weather, slug: "clouds")],
                applicationScenario: ApplicationScenario(
                    situation: "You see a line of cumulus with dark flat bases trending northwest. Some tops are starting to spread out and flatten. What do you read?",
                    options: [
                        ApplicationOption(label: "Active thermal street, but the spreading tops indicate an inversion — climb will be capped", correct: true, explanation: "Dark bases mean strong thermals. Spreading tops indicate an inversion capping convection."),
                        ApplicationOption(label: "Thunderstorm development — the spreading tops are anvils forming", correct: false, explanation: "Spreading cumulus tops indicate an inversion, not storm development."),
                        ApplicationOption(label: "Dying thermal conditions — the clouds are dissipating", correct: false, explanation: "Dark bases indicate active thermals. The spreading is from hitting an inversion."),
                    ]
                ),
                connectionPrompt: "How does reading the sky connect to cloud classification and identification?"
            ),
            Module(
                id: 3, domain: .flying, slug: "thermal-entry",
                title: "Thermal Entry", concept: "Approach technique",
                takeaway: "Enter tangentially, never head-on. A thermal is a column — you need to join its rotation, not punch through it.",
                tool: "ThermalEntry", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .weather, slug: "thermals")],
                applicationScenario: ApplicationScenario(
                    situation: "You're gliding toward a thermal marked by a circling hawk. You feel a strong surge on your right wing. How should you enter?",
                    options: [
                        ApplicationOption(label: "Turn right immediately — enter tangentially on the side where you felt the surge", correct: true, explanation: "The thermal core is to your right. Turn toward it to enter tangentially."),
                        ApplicationOption(label: "Continue straight through to find the center", correct: false, explanation: "Flying straight through wastes the lift."),
                        ApplicationOption(label: "Turn left to circle back for a better approach", correct: false, explanation: "The thermal is to your right NOW. Turning away wastes time and altitude."),
                    ]
                ),
                connectionPrompt: "How does thermal entry technique connect to understanding how thermals form?"
            ),
            Module(
                id: 4, domain: .flying, slug: "centering",
                title: "Centering", concept: "Core centering technique",
                takeaway: "When the vario peaks, flatten your turn. When it drops, steepen. Shift your circle toward the strongest lift.",
                tool: "CenteringGame", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .weather, slug: "thermals")],
                applicationScenario: ApplicationScenario(
                    situation: "You're circling in a thermal. The vario shows +3 m/s on the south side and +1 m/s on the north. How do you adjust?",
                    options: [
                        ApplicationOption(label: "Shift your circle south — flatten the turn when the vario peaks, steepen when it drops", correct: true, explanation: "Flatten your bank when vario reads +3 (south) to widen arc toward core. Steepen when it drops to +1 (north)."),
                        ApplicationOption(label: "Tighten your turn radius to stay in the strongest part", correct: false, explanation: "A tighter circle doesn't shift your position."),
                        ApplicationOption(label: "Fly straight south to find the core", correct: false, explanation: "Breaking out of your turn risks losing the thermal entirely."),
                    ]
                ),
                connectionPrompt: "How does centering technique relate to understanding thermal structure and behavior?"
            ),
            Module(
                id: 5, domain: .flying, slug: "climbing",
                title: "Climbing to Cloudbase", concept: "Altitude optimization",
                takeaway: "Leave the thermal before cloudbase, not at it. Cloud suck is real. The best altitude to leave is the one that gets you to the next thermal.",
                tool: "ClimbingToCloudbase", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .weather, slug: "lapse-rates")],
                applicationScenario: ApplicationScenario(
                    situation: "You're climbing at +2 m/s at 5,000ft. Cloudbase is estimated at 6,500ft. The next thermal source is 8km away. When should you leave?",
                    options: [
                        ApplicationOption(label: "Leave around 6,000ft — high enough to reach the next thermal, safe margin below cloudbase", correct: true, explanation: "500ft margin below cloudbase avoids cloud suck. Enough altitude for the 8km glide."),
                        ApplicationOption(label: "Climb all the way to cloudbase for maximum altitude", correct: false, explanation: "Cloud suck is dangerous. The lift weakens near the base."),
                        ApplicationOption(label: "Leave immediately — any climb rate below +3 is not worth circling for", correct: false, explanation: "+2 m/s is a good climb rate with 1,500ft still to gain."),
                    ]
                ),
                connectionPrompt: "How do lapse rates affect your decisions about climbing to cloudbase?"
            ),
            Module(
                id: 6, domain: .flying, slug: "valley-flying",
                title: "Valley Flying", concept: "Valley wind systems",
                takeaway: "Fly the sunny side in the morning. Transition to the shaded side after the thermals cross. The valley wind tells you the time.",
                tool: "ValleyFlying", difficulty: .intermediate,
                relatedModules: [RelatedModule(domain: .weather, slug: "mountain-winds")],
                applicationScenario: ApplicationScenario(
                    situation: "It's 1pm in a north-south alpine valley. The east slope is in full sun. Where should you fly?",
                    options: [
                        ApplicationOption(label: "The east (sunny) slope — it has been heating longest", correct: true, explanation: "By 1pm, the east slope has had full morning sun and produces the strongest thermals."),
                        ApplicationOption(label: "The west slope — it will have the freshest thermals", correct: false, explanation: "The west slope is just beginning to heat up."),
                        ApplicationOption(label: "The valley center — convergence lift from both slopes", correct: false, explanation: "Valley center convergence develops later in the afternoon."),
                    ]
                ),
                connectionPrompt: "How does understanding mountain wind patterns improve valley flying tactics?"
            ),
            Module(
                id: 7, domain: .flying, slug: "speed-to-fly",
                title: "Speed-to-Fly", concept: "MacCready theory",
                takeaway: "Fly faster between strong thermals, slower between weak ones. The McCready ring turns intuition into math — and math into distance.",
                tool: "SpeedToFly", difficulty: .advanced,
                relatedModules: [RelatedModule(domain: .flying, slug: "between-thermals")],
                applicationScenario: ApplicationScenario(
                    situation: "Your expected climb rate in the next thermal is 2 m/s. You're in 1 m/s sink. What speed strategy is optimal?",
                    options: [
                        ApplicationOption(label: "Fly faster than best glide — McCready setting of 2 adds speed proportional to expected climb", correct: true, explanation: "With McCready 2, fly faster to trade altitude for speed."),
                        ApplicationOption(label: "Fly at minimum sink speed to conserve altitude", correct: false, explanation: "Min sink wastes time. McCready theory shows flying faster is optimal."),
                        ApplicationOption(label: "Fly at best L/D speed — maximum distance per altitude lost", correct: false, explanation: "Best L/D is optimal only when McCready = 0."),
                    ]
                ),
                connectionPrompt: "How does speed-to-fly theory connect to managing transitions between thermals?"
            ),
            Module(
                id: 8, domain: .flying, slug: "xc-tactics",
                title: "XC Tactics", concept: "Cross-country route planning",
                takeaway: "Plan your route along energy lines — ridges, dark fields, convergence zones. The shortest distance is rarely the fastest.",
                tool: "XCTactics", difficulty: .advanced,
                relatedModules: [RelatedModule(domain: .weather, slug: "convergence")],
                applicationScenario: ApplicationScenario(
                    situation: "You're planning a 100km triangle. Wind is from the west at 20km/h. Cumulus streets aligned NW-SE. How do you plan?",
                    options: [
                        ApplicationOption(label: "Route along the cloud streets for the upwind legs, use tailwind for the final leg", correct: true, explanation: "Cloud streets are highways of lift — fly along them, not across."),
                        ApplicationOption(label: "Fly the shortest route regardless of cloud streets", correct: false, explanation: "The shortest distance crosses sink zones between streets."),
                        ApplicationOption(label: "Always fly into the wind first to get the hardest leg done", correct: false, explanation: "Route along energy lines for efficiency, not just wind direction."),
                    ]
                ),
                connectionPrompt: "How does understanding convergence zones improve cross-country route planning?"
            ),
            Module(
                id: 9, domain: .flying, slug: "convergence-sea-breeze",
                title: "Convergence & Sea Breeze", concept: "Riding convergence lines",
                takeaway: "Sea breeze fronts push inland all day. Where they meet valley thermals, a convergence zone forms — the strongest, most reliable lift.",
                tool: "ConvergenceSeaBreeze", difficulty: .advanced,
                relatedModules: [RelatedModule(domain: .weather, slug: "convergence"), RelatedModule(domain: .weather, slug: "mountain-waves")],
                applicationScenario: ApplicationScenario(
                    situation: "It's afternoon and you see a distinct cloud line 30km inland, parallel to the coast. What is it?",
                    options: [
                        ApplicationOption(label: "Sea breeze convergence — fly along it for sustained strong lift", correct: true, explanation: "The sea breeze front meets warmer inland air, creating convergence with strong lift."),
                        ApplicationOption(label: "A cold front approaching from the sea", correct: false, explanation: "Sea breeze convergence is a daily local phenomenon, not a synoptic front."),
                        ApplicationOption(label: "Cloud development to avoid — instability is too high", correct: false, explanation: "Convergence clouds indicate organized lift, not dangerous instability."),
                    ]
                ),
                connectionPrompt: "How does sea breeze convergence relate to understanding convergence lift and mountain wave phenomena?"
            ),
            Module(
                id: 10, domain: .flying, slug: "between-thermals",
                title: "Between Thermals", concept: "Glide management",
                takeaway: "You don't lose altitude in sink — you lose it in time. Speed is altitude. But too much speed and you arrive low.",
                tool: "BetweenThermals", difficulty: .advanced,
                relatedModules: [RelatedModule(domain: .flying, slug: "speed-to-fly")],
                applicationScenario: ApplicationScenario(
                    situation: "You're at 4,000ft AGL, 5km from the next likely thermal source, in 1 m/s sink. Your best L/D is 40:1. Will you arrive with enough altitude?",
                    options: [
                        ApplicationOption(label: "Marginal — you'll arrive around 1,500ft, which is low but workable if the thermal is strong", correct: true, explanation: "At 40:1 in still air, 5km needs only ~410ft. But 1 m/s sink adds significantly to altitude loss."),
                        ApplicationOption(label: "Comfortable — 40:1 glide ratio means you only need 125m for 5km", correct: false, explanation: "Still-air glide doesn't account for sink, which adds significantly to loss."),
                        ApplicationOption(label: "Impossible — you need to find closer lift immediately", correct: false, explanation: "While margins are tight, 4,000ft is enough for 5km in sink."),
                    ]
                ),
                connectionPrompt: "How does managing the glide between thermals connect to speed-to-fly theory?"
            ),
        ]
    )
}
