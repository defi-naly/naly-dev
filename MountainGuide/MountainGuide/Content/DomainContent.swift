import Foundation

// MARK: - Domain Content
// 7 domains, 70 modules

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

    static let allDomains: [Domain] = [weather, avalanche, flying, navigation, ropeSystems, glacierTravel, firstAid]

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

    // MARK: - Navigation Domain

    static let navigation = Domain(
        id: .navigation,
        name: "Navigation",
        subtitle: "Finding Your Way",
        description: "Read maps, take bearings, plan routes, and navigate in zero visibility. The mountain doesn't care if your GPS dies.",
        book: "Freedom of the Hills",
        author: "The Mountaineers",
        accent: "#8B5CF6",
        accentRgb: "139, 92, 246",
        modules: [
            Module(id: 1, domain: .navigation, slug: "map-reading", title: "Map Reading", concept: "Topographic map interpretation", takeaway: "Contour lines tell the story of the terrain. Close lines mean steep. Concentric circles mean summit or depression. Learn to see 3D from 2D.", tool: "TopographicMapExplorer", difficulty: .foundation, relatedModules: [RelatedModule(domain: .navigation, slug: "terrain-association")], applicationScenario: ApplicationScenario(situation: "You're holding a 1:25,000 map with a 20m contour interval. You count 5 contour lines between two points. What is the elevation difference?", options: [ApplicationOption(label: "100m", correct: true, explanation: "5 contour lines × 20m interval = 100m elevation difference."), ApplicationOption(label: "50m", correct: false, explanation: "You need to multiply the count by the interval."), ApplicationOption(label: "125m", correct: false, explanation: "There are only 5 lines, not 6.25.")]), connectionPrompt: "How does map reading connect to terrain association in the field?"),
            Module(id: 2, domain: .navigation, slug: "compass", title: "Compass Navigation", concept: "Bearings and declination", takeaway: "A compass gives direction, not location. Declination is the angle between true and magnetic north — ignore it and you'll walk in circles.", tool: "CompassBearingTrainer", difficulty: .foundation, relatedModules: [RelatedModule(domain: .navigation, slug: "triangulation")], applicationScenario: ApplicationScenario(situation: "Your map bearing to a summit is 045°. Local declination is 2°E. What bearing do you set on your compass?", options: [ApplicationOption(label: "043°", correct: true, explanation: "Grid to Mag: subtract east declination. 045° - 2° = 043°."), ApplicationOption(label: "047°", correct: false, explanation: "You add for west declination, subtract for east."), ApplicationOption(label: "045°", correct: false, explanation: "You must account for declination.")]), connectionPrompt: "How does compass skill connect to triangulation for position fixing?"),
            Module(id: 3, domain: .navigation, slug: "gps", title: "GPS Navigation", concept: "GPS use and limitations", takeaway: "GPS tells you where you are. It doesn't tell you where to go or what the terrain looks like. Batteries die. Signals fail. Always carry a map.", tool: "GPSTrainer", difficulty: .foundation, relatedModules: [RelatedModule(domain: .navigation, slug: "emergency-navigation")], applicationScenario: ApplicationScenario(situation: "Your GPS shows 8m accuracy in forest. You're navigating to a waypoint 200m away. What's your strategy?", options: [ApplicationOption(label: "Use GPS for general direction, then terrain association for final approach", correct: true, explanation: "8m accuracy is good for direction but fine navigation needs terrain features."), ApplicationOption(label: "Follow the GPS arrow exactly", correct: false, explanation: "8m accuracy means you could walk past the target."), ApplicationOption(label: "Ignore the GPS and use map only", correct: false, explanation: "GPS is still useful for general direction.")]), connectionPrompt: "How does understanding GPS limitations connect to emergency navigation skills?"),
            Module(id: 4, domain: .navigation, slug: "route-planning", title: "Route Planning", concept: "Mountain route planning", takeaway: "Naismith's Rule: 5km/hr plus 1 hour per 600m ascent. Add time for terrain, weather, and fitness. Always plan an escape route.", tool: "RoutePlanner", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .navigation, slug: "map-reading")], applicationScenario: ApplicationScenario(situation: "A route is 6km with 1,200m elevation gain. Using Naismith's Rule, estimate travel time.", options: [ApplicationOption(label: "Approximately 3 hours 12 minutes", correct: true, explanation: "6km ÷ 5km/hr = 1.2hr. 1200m ÷ 600m/hr = 2hr. Total = 3.2hr = 3hr 12min."), ApplicationOption(label: "Approximately 2 hours", correct: false, explanation: "This only accounts for horizontal distance."), ApplicationOption(label: "Approximately 5 hours", correct: false, explanation: "This overestimates significantly.")]), connectionPrompt: "How does route planning build on map reading skills?"),
            Module(id: 5, domain: .navigation, slug: "terrain-association", title: "Terrain Association", concept: "Matching map to terrain", takeaway: "Orient your map to the terrain, not to north. When the map matches what you see, you know where you are. When it doesn't, stop.", tool: "TerrainMatcher", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .navigation, slug: "map-reading")], applicationScenario: ApplicationScenario(situation: "You see a ridge to your east and a lake to your northwest. How do you confirm your position on the map?", options: [ApplicationOption(label: "Orient the map so the ridge and lake align with the terrain, then find your position at the intersection", correct: true, explanation: "Terrain association means making the map match reality."), ApplicationOption(label: "Take a GPS reading", correct: false, explanation: "Terrain association is a map-based technique."), ApplicationOption(label: "Walk to the lake to confirm", correct: false, explanation: "You can confirm position without moving by using multiple features.")]), connectionPrompt: "How does terrain association reinforce map reading skills?"),
            Module(id: 6, domain: .navigation, slug: "contouring", title: "Contouring", concept: "Following elevation contours", takeaway: "Contouring means traversing a slope without gaining or losing height. Use the altimeter as your guide and accept that the path will zigzag.", tool: "ContouringSimulator", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .navigation, slug: "terrain-association")], applicationScenario: ApplicationScenario(situation: "You need to traverse at 2,400m across steep terrain. Describe your contouring technique.", options: [ApplicationOption(label: "Set altimeter to 2,400m and traverse, adjusting up or down to maintain constant altitude", correct: true, explanation: "The altimeter is your best friend when contouring. Small corrections keep you on track."), ApplicationOption(label: "Walk in a straight line across the slope", correct: false, explanation: "Terrain forces deviations; maintaining altitude requires continuous adjustment."), ApplicationOption(label: "Descend to the valley and climb back up on the other side", correct: false, explanation: "This wastes enormous energy compared to contouring.")]), connectionPrompt: "How does contouring depend on terrain association?"),
            Module(id: 7, domain: .navigation, slug: "triangulation", title: "Triangulation", concept: "Position fixing with bearings", takeaway: "Three bearings give a triangle of error. The smaller the triangle, the more accurate your position. Two bearings are minimum, three give confidence.", tool: "TriangulationTrainer", difficulty: .advanced, relatedModules: [RelatedModule(domain: .navigation, slug: "compass")], applicationScenario: ApplicationScenario(situation: "You identify three peaks with map bearings 030°, 150°, and 270°. How do you fix your position?", options: [ApplicationOption(label: "Plot the back-bearings on the map; your position is inside the triangle where they intersect", correct: true, explanation: "Back-bearings (±180°) plotted from each peak intersect at your position."), ApplicationOption(label: "Average the three bearings to get your direction", correct: false, explanation: "Triangulation fixes position, not direction."), ApplicationOption(label: "Walk toward the middle bearing", correct: false, explanation: "The purpose is to determine your current position.")]), connectionPrompt: "How does triangulation build on compass skills?"),
            Module(id: 8, domain: .navigation, slug: "whiteout-navigation", title: "Whiteout Navigation", concept: "Zero visibility techniques", takeaway: "In whiteout, trust the compass over your eyes. Your eyes will lie. Use roped team, probe ahead, and navigate by time and bearing.", tool: "WhiteoutSimulator", difficulty: .advanced, relatedModules: [RelatedModule(domain: .navigation, slug: "compass"), RelatedModule(domain: .glacierTravel, slug: "travel-protocols")], applicationScenario: ApplicationScenario(situation: "Visibility drops to 10m on a glacier. You have a bearing of 195° to the hut. How do you navigate?", options: [ApplicationOption(label: "Send a team member ahead on rope as a moving marker, navigate by compass bearing and distance", correct: true, explanation: "The human marker technique gives you a visible reference point while the compass provides direction."), ApplicationOption(label: "Follow footprints back the way you came", correct: false, explanation: "In whiteout, footprints may be covered and you may need to go forward."), ApplicationOption(label: "Wait for visibility to improve", correct: false, explanation: "Conditions may worsen; you may need to reach shelter.")]), connectionPrompt: "How does whiteout navigation connect to compass skills and glacier travel protocols?"),
            Module(id: 9, domain: .navigation, slug: "night-navigation", title: "Night Navigation", concept: "Night movement techniques", takeaway: "Night navigation demands simplicity. Follow handrails, use catching features, and break the route into short legs. If you're not confident, stop.", tool: "NightNavTrainer", difficulty: .advanced, relatedModules: [RelatedModule(domain: .navigation, slug: "route-planning")], applicationScenario: ApplicationScenario(situation: "You're descending a mountain trail at night with headlamps. Trail junctions are unmarked. What keeps you on route?", options: [ApplicationOption(label: "Count junctions, use handrails like streams and ridges, check bearing at each decision point", correct: true, explanation: "Systematic tracking of junctions and terrain features prevents wrong turns."), ApplicationOption(label: "Follow the most worn path", correct: false, explanation: "In darkness you can't assess path wear reliably."), ApplicationOption(label: "Use GPS exclusively", correct: false, explanation: "GPS alone may not distinguish close parallel paths.")]), connectionPrompt: "How does night navigation build on route planning principles?"),
            Module(id: 10, domain: .navigation, slug: "emergency-navigation", title: "Emergency Navigation", concept: "Navigation without tools", takeaway: "The sun rises in the east and sets in the west. Polaris marks north. A watch can give direction. The mountain always has clues if you know where to look.", tool: "EmergencyNavTrainer", difficulty: .advanced, relatedModules: [RelatedModule(domain: .navigation, slug: "terrain-association")], applicationScenario: ApplicationScenario(situation: "GPS dead, compass lost. It's 3pm, valley runs east-west. How do you navigate to safety?", options: [ApplicationOption(label: "The sun is in the west at 3pm — use it to orient, then follow the valley downhill", correct: true, explanation: "The sun's position gives approximate direction. Valleys lead to civilization."), ApplicationOption(label: "Stay put and wait for rescue", correct: false, explanation: "If you can navigate to safety, that's preferable to waiting indefinitely."), ApplicationOption(label: "Follow a ridge uphill for a better view", correct: false, explanation: "Going up exposes you to weather and wastes energy. Valleys lead down to safety.")]), connectionPrompt: "How does emergency navigation rely on terrain association skills?"),
        ]
    )

    // MARK: - Rope Systems Domain

    static let ropeSystems = Domain(
        id: .ropeSystems,
        name: "Rope Systems",
        subtitle: "The Safety Chain",
        description: "Tie knots that hold, build anchors that don't fail, and manage rope systems from single pitch to crevasse rescue.",
        book: "Freedom of the Hills",
        author: "The Mountaineers",
        accent: "#F97316",
        accentRgb: "249, 115, 22",
        modules: [
            Module(id: 1, domain: .ropeSystems, slug: "knots", title: "Essential Knots", concept: "Climbing knot repertoire", takeaway: "Five knots cover 90% of climbing: figure-eight follow-through, clove hitch, munter hitch, double fisherman's, and prusik. Master them until they're automatic.", tool: "KnotTrainer", difficulty: .foundation, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "anchors")], applicationScenario: ApplicationScenario(situation: "You need to tie into the end of a rope. Which knot?", options: [ApplicationOption(label: "Figure-eight follow-through", correct: true, explanation: "The standard tie-in knot. Easy to inspect, doesn't slip."), ApplicationOption(label: "Bowline", correct: false, explanation: "Can untie itself without a stopper knot."), ApplicationOption(label: "Clove hitch", correct: false, explanation: "Clove hitch is for anchors, not tie-in.")]), connectionPrompt: "How do essential knots form the foundation of anchor building?"),
            Module(id: 2, domain: .ropeSystems, slug: "anchors", title: "Anchor Systems", concept: "SERENE anchor criteria", takeaway: "SERENE: Solid, Equalized, Redundant, Efficient, No Extension. Every anchor must meet all five criteria or it's not an anchor — it's a hope.", tool: "AnchorBuilder", difficulty: .foundation, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "knots"), RelatedModule(domain: .ropeSystems, slug: "belaying")], applicationScenario: ApplicationScenario(situation: "Building a top-rope anchor with two bolts and a cordelette. Walk through SERENE.", options: [ApplicationOption(label: "Clip both bolts, equalize the cordelette with a master point, check for extension", correct: true, explanation: "Equalization distributes load; no-extension prevents shock loading if one bolt fails."), ApplicationOption(label: "Clip one bolt and extend with a sling", correct: false, explanation: "Single point of failure — no redundancy."), ApplicationOption(label: "Tie directly to the strongest-looking bolt", correct: false, explanation: "No redundancy or equalization.")]), connectionPrompt: "How do anchor systems depend on knots and connect to belaying?"),
            Module(id: 3, domain: .ropeSystems, slug: "belaying", title: "Belaying", concept: "Belay technique and devices", takeaway: "The brake hand never leaves the rope. Ever. An assisted-braking device is backup, not replacement, for proper technique.", tool: "BelaySimulator", difficulty: .foundation, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "anchors")], applicationScenario: ApplicationScenario(situation: "Your climber is 15m up and falls. Describe proper belay technique.", options: [ApplicationOption(label: "Lock brake hand down, brace for impact, keep rope through device — never let go", correct: true, explanation: "The brake hand is the primary catch mechanism."), ApplicationOption(label: "Pull rope through the device to add friction", correct: false, explanation: "This means releasing the brake hand, which is the primary failure mode."), ApplicationOption(label: "Jump to add dynamic catch", correct: false, explanation: "Jumping can be appropriate but brake hand technique is the critical element.")]), connectionPrompt: "How does belaying connect to anchor systems?"),
            Module(id: 4, domain: .ropeSystems, slug: "rappelling", title: "Rappelling", concept: "Rappel setup and safety", takeaway: "More climbers die rappelling than climbing. Always use a backup. Check the anchor, check the rope ends, check the knot. Then check again.", tool: "RappelSimulator", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "knots")], applicationScenario: ApplicationScenario(situation: "Rappelling a 50m cliff with a 60m rope. Describe your setup.", options: [ApplicationOption(label: "Thread rope through anchor, tie ends together, use autoblock backup, verify rope reaches the ground", correct: true, explanation: "60m rope doubled gives 30m — enough for 50m? No! You need two ropes or an intermediate anchor."), ApplicationOption(label: "Thread and rappel with knots at the ends", correct: false, explanation: "60m doubled only gives 30m — not enough for 50m."), ApplicationOption(label: "Single-strand rappel to save rope length", correct: false, explanation: "Only possible with a retrievable system; still need backup.")]), connectionPrompt: "How does rappelling depend on knot skills?"),
            Module(id: 5, domain: .ropeSystems, slug: "rope-mechanics", title: "Rope Mechanics", concept: "Fall factors and forces", takeaway: "Fall factor = fall distance ÷ rope out. Factor 2 is the maximum. Dynamic rope stretches to absorb energy. Static rope doesn't — and breaks things.", tool: "FallFactorCalculator", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "belaying")], applicationScenario: ApplicationScenario(situation: "A climber takes a 6m fall on 3m of rope out. What's the fall factor?", options: [ApplicationOption(label: "Fall factor 2 — the maximum", correct: true, explanation: "6m ÷ 3m = 2. This generates maximum force on the system."), ApplicationOption(label: "Fall factor 3", correct: false, explanation: "Fall factor cannot exceed 2 in a standard climbing system."), ApplicationOption(label: "Fall factor 0.5", correct: false, explanation: "6 ÷ 3 = 2, not 0.5.")]), connectionPrompt: "How does understanding rope mechanics improve belaying?"),
            Module(id: 6, domain: .ropeSystems, slug: "top-rope", title: "Top-Rope Systems", concept: "Top-rope setup and management", takeaway: "A top-rope system is only as strong as the anchor. Set the anchor above, the belayer below, and keep the rope running cleanly with minimal drag.", tool: "TopRopeSetup", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "anchors")], applicationScenario: ApplicationScenario(situation: "Setting up a top-rope with the anchor 3m back from the edge. How do you manage rope direction?", options: [ApplicationOption(label: "Extend the anchor to the edge with slings so the rope runs cleanly over the lip", correct: true, explanation: "The rope must run straight from climber to anchor to minimize drag."), ApplicationOption(label: "Have the climber tie in with extra rope", correct: false, explanation: "This doesn't address rope drag at the edge."), ApplicationOption(label: "Belay from the top", correct: false, explanation: "Top belaying changes the system entirely and requires different technique.")]), connectionPrompt: "How does top-rope setup build on anchor knowledge?"),
            Module(id: 7, domain: .ropeSystems, slug: "multi-pitch", title: "Multi-Pitch Climbing", concept: "Multi-pitch systems", takeaway: "Multi-pitch is a chain of linked pitches. Each transition is a potential failure point. Efficiency at anchors saves hours on the route.", tool: "MultiPitchManager", difficulty: .advanced, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "anchors"), RelatedModule(domain: .ropeSystems, slug: "belaying")], applicationScenario: ApplicationScenario(situation: "Leading pitch 3 of a 5-pitch route. Your second is cleaning. Describe your belay transition.", options: [ApplicationOption(label: "Build anchor, clip in, pull up rope, put second on belay, communicate clearly", correct: true, explanation: "Systematic transition: secure yourself, manage rope, belay partner, clear communication."), ApplicationOption(label: "Wait for the second to arrive and discuss", correct: false, explanation: "You should have the anchor built and be ready before they arrive."), ApplicationOption(label: "Start leading the next pitch immediately", correct: false, explanation: "You must belay your second up first.")]), connectionPrompt: "How does multi-pitch integrate anchor building and belaying skills?"),
            Module(id: 8, domain: .ropeSystems, slug: "rescue-hauls", title: "Hauling Systems", concept: "Mechanical advantage for rescue", takeaway: "A 3:1 Z-pulley system lets you haul 3x your pulling force. Add a ratchet to hold progress. Practice until you can build it in the dark.", tool: "HaulSystemBuilder", difficulty: .advanced, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "rope-mechanics"), RelatedModule(domain: .ropeSystems, slug: "crevasse-rescue-rope")], applicationScenario: ApplicationScenario(situation: "Your partner is hanging 10m below on rope and can't climb. Describe a 3:1 Z-pulley.", options: [ApplicationOption(label: "Attach prusik to load strand, redirect through anchor carabiner, pull — 3:1 advantage with ratchet", correct: true, explanation: "The Z-configuration provides 3:1 mechanical advantage."), ApplicationOption(label: "Just pull the rope directly through the anchor", correct: false, explanation: "That's 1:1 — you'd need to lift their full weight."), ApplicationOption(label: "Tie off and wait for help", correct: false, explanation: "In an emergency, hauling may be necessary before help arrives.")]), connectionPrompt: "How do hauling systems connect to rope mechanics and crevasse rescue?"),
            Module(id: 9, domain: .ropeSystems, slug: "crevasse-rescue-rope", title: "Crevasse Rescue Rope Systems", concept: "Rope systems for crevasse rescue", takeaway: "Self-rescue from a crevasse uses prusik knots to climb the rope. Team rescue uses a Z-pulley built from what you carry. Practice on flat ground first.", tool: "CrevasseRescueRope", difficulty: .advanced, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "rescue-hauls"), RelatedModule(domain: .glacierTravel, slug: "crevasse-rescue")], applicationScenario: ApplicationScenario(situation: "Your rope team partner has fallen into a crevasse, conscious but can't climb out. Walk through rescue.", options: [ApplicationOption(label: "Self-arrest, build anchor, pad lip, set up Z-pulley haul system, communicate with victim", correct: true, explanation: "Systematic: arrest fall → anchor → lip protection → haul system → rescue."), ApplicationOption(label: "Pull them out directly", correct: false, explanation: "The rope cuts into the lip and you can't generate enough force alone."), ApplicationOption(label: "Lower more rope for them to climb", correct: false, explanation: "They already said they can't climb out.")]), connectionPrompt: "How do crevasse rescue rope skills connect to hauling systems and glacier travel?"),
            Module(id: 10, domain: .ropeSystems, slug: "improvised-systems", title: "Improvised Systems", concept: "Emergency rope techniques", takeaway: "When gear fails, the mountains test your creativity. A munter hitch replaces a belay device. A prusik replaces an ascender. Knowledge is the lightest gear.", tool: "ImprovisedGearTrainer", difficulty: .advanced, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "knots")], applicationScenario: ApplicationScenario(situation: "You need to rappel but have no device. What improvised technique can you use?", options: [ApplicationOption(label: "Munter hitch on a locking carabiner", correct: true, explanation: "The munter hitch provides friction for controlled descent without a device."), ApplicationOption(label: "Wrap rope around your body (Dulfersitz)", correct: false, explanation: "Dulfersitz works but is painful and hard to control. Munter is preferred."), ApplicationOption(label: "Slide down the rope with gloves", correct: false, explanation: "No friction control — this is extremely dangerous.")]), connectionPrompt: "How do improvised systems build on foundational knot knowledge?"),
        ]
    )

    // MARK: - Glacier Travel Domain

    static let glacierTravel = Domain(
        id: .glacierTravel,
        name: "Glacier Travel",
        subtitle: "Walking on Ice",
        description: "Read crevasse patterns, travel in rope teams, and rescue companions from the ice. The glacier is always moving.",
        book: "Freedom of the Hills",
        author: "The Mountaineers",
        accent: "#06B6D4",
        accentRgb: "6, 182, 212",
        modules: [
            Module(id: 1, domain: .glacierTravel, slug: "glacier-anatomy", title: "Glacier Anatomy", concept: "Glacier zones and features", takeaway: "A glacier has an accumulation zone (snow adds), an ablation zone (ice melts), and the equilibrium line between. Crevasses form where ice flows over bumps or curves.", tool: "GlacierAnatomyExplorer", difficulty: .foundation, relatedModules: [RelatedModule(domain: .glacierTravel, slug: "crevasse-identification")], applicationScenario: ApplicationScenario(situation: "You see a bergschrund at the top and lateral moraines on both sides. What do route options look like?", options: [ApplicationOption(label: "Avoid the bergschrund; moraines indicate glacier boundaries — route up the center or along a moraine", correct: true, explanation: "The bergschrund is a gap between glacier and mountain. Moraines mark edges. Center may have fewer crevasses."), ApplicationOption(label: "Cross the bergschrund directly", correct: false, explanation: "Bergschrunds are wide, deep gaps that are dangerous to cross."), ApplicationOption(label: "The moraines mean the glacier is safe", correct: false, explanation: "Moraines indicate active glacier movement — crevasses exist.")]), connectionPrompt: "How does glacier anatomy knowledge connect to crevasse identification?"),
            Module(id: 2, domain: .glacierTravel, slug: "crevasse-identification", title: "Crevasse Identification", concept: "Types of crevasses", takeaway: "Crevasses form perpendicular to the direction of tension. Transverse crevasses cross the glacier. Marginal crevasses angle from the edges. All can be hidden by snow.", tool: "CrevasseIdentifier", difficulty: .foundation, relatedModules: [RelatedModule(domain: .glacierTravel, slug: "glacier-anatomy"), RelatedModule(domain: .glacierTravel, slug: "glacier-route-finding")], applicationScenario: ApplicationScenario(situation: "You see a convex roll with subtle sag lines perpendicular to the fall line. What crevasse hazard?", options: [ApplicationOption(label: "Transverse crevasses where the glacier accelerates over the roll — hidden under snow bridges", correct: true, explanation: "Convex rolls create tension that opens transverse crevasses. Sag lines may indicate hidden crevasses."), ApplicationOption(label: "No hazard — rolls are smooth terrain", correct: false, explanation: "Convex terrain is where crevasses form most frequently."), ApplicationOption(label: "Only surface cracks, not deep crevasses", correct: false, explanation: "Surface sag lines can indicate deep hidden crevasses.")]), connectionPrompt: "How does crevasse identification build on glacier anatomy knowledge?"),
            Module(id: 3, domain: .glacierTravel, slug: "rope-teams", title: "Rope Teams", concept: "Rope team configurations", takeaway: "Two-person teams space 15m apart. Three-person teams space 10m. Carry coils to absorb initial fall and provide rescue rope. Always clip prusiks to harness.", tool: "RopeTeamConfigurator", difficulty: .foundation, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "knots")], applicationScenario: ApplicationScenario(situation: "Your party of 4 is crossing a moderately crevassed glacier. Configuration?", options: [ApplicationOption(label: "Two rope teams of 2, or one team of 3 with a fourth, spaced 10-15m apart with prusiks ready", correct: true, explanation: "Two teams of 2 provides redundancy. Each person has prusiks attached for self-rescue."), ApplicationOption(label: "All four on one rope", correct: false, explanation: "One crevasse fall could pull in multiple people."), ApplicationOption(label: "Unroped with wide spacing", correct: false, explanation: "On a crevassed glacier, you must be roped.")]), connectionPrompt: "How do rope team configurations depend on knot skills?"),
            Module(id: 4, domain: .glacierTravel, slug: "probe-techniques", title: "Probe Techniques", concept: "Probing snow bridges", takeaway: "Probe at 45° ahead and to both sides. Resistance tells you thickness. If your probe punches through with body weight, the bridge won't hold you.", tool: "ProbeTrainer", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .glacierTravel, slug: "crevasse-identification")], applicationScenario: ApplicationScenario(situation: "You're crossing a snow bridge spanning approximately 3m. How do you probe it?", options: [ApplicationOption(label: "Probe at 45° every meter across the width, testing at center and both edges for thickness", correct: true, explanation: "Systematic probing reveals the weakest points. Edges may be thinner."), ApplicationOption(label: "One probe in the center is enough", correct: false, explanation: "Snow bridges vary in thickness; you need to test multiple points."), ApplicationOption(label: "Don't probe — just cross quickly", correct: false, explanation: "Speed doesn't reduce risk. Probing tells you if it's safe.")]), connectionPrompt: "How does probing connect to crevasse identification skills?"),
            Module(id: 5, domain: .glacierTravel, slug: "glacier-route-finding", title: "Glacier Route Finding", concept: "Route selection on glaciers", takeaway: "Follow the path of least tension. Avoid convex slopes, icefalls, and areas below seracs. When in doubt, go around — the longer route may be the safer one.", tool: "GlacierRoutePlanner", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .glacierTravel, slug: "crevasse-identification"), RelatedModule(domain: .navigation, slug: "route-planning")], applicationScenario: ApplicationScenario(situation: "A major icefall ahead. Route through on the left or around on moraine?", options: [ApplicationOption(label: "Moraine — the longer route avoids icefall hazard entirely", correct: true, explanation: "Icefalls are unpredictable. Seracs can collapse without warning. The moraine adds time but removes a lethal hazard."), ApplicationOption(label: "Through the icefall — it's shorter", correct: false, explanation: "Shorter doesn't mean safer. Icefalls are one of the most dangerous glacier features."), ApplicationOption(label: "Wait until early morning when it's frozen", correct: false, explanation: "Cold temperatures reduce risk but don't eliminate it. Avoidance is better.")]), connectionPrompt: "How does glacier route finding connect to crevasse identification and general route planning?"),
            Module(id: 6, domain: .glacierTravel, slug: "travel-protocols", title: "Travel Protocols", concept: "Travel safety procedures", takeaway: "Keep the rope taut. If someone falls in, self-arrest immediately. The first minutes are critical — arrest the fall, then rescue.", tool: "TravelProtocolTrainer", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .glacierTravel, slug: "rope-teams")], applicationScenario: ApplicationScenario(situation: "The person ahead drops through a snow bridge. Your immediate actions?", options: [ApplicationOption(label: "Self-arrest: drop, dig in ice axe, hold the fall — then build an anchor and initiate rescue", correct: true, explanation: "Arrest first. Then transition to anchor. Then rescue."), ApplicationOption(label: "Run backward to take up slack", correct: false, explanation: "The rope should already be taut. Running could pull you off balance."), ApplicationOption(label: "Unclip from the rope to avoid being pulled in", correct: false, explanation: "Unclipping abandons your partner. The rope is their lifeline.")]), connectionPrompt: "How do travel protocols depend on rope team configuration?"),
            Module(id: 7, domain: .glacierTravel, slug: "crevasse-rescue", title: "Crevasse Rescue", concept: "Self and team rescue from crevasses", takeaway: "Self-rescue uses prusiks to climb the rope. Team rescue uses a haul system. Both require practice before you need them. The glacier won't wait for you to learn.", tool: "CrevasseRescueSimulator", difficulty: .advanced, relatedModules: [RelatedModule(domain: .ropeSystems, slug: "crevasse-rescue-rope"), RelatedModule(domain: .glacierTravel, slug: "travel-protocols")], applicationScenario: ApplicationScenario(situation: "You've self-arrested. Partner is 8m down, conscious. Describe rescue steps.", options: [ApplicationOption(label: "Build anchor, transfer load, pad lip, set up Z-pulley, haul — communicate throughout", correct: true, explanation: "Systematic: anchor → load transfer → lip pad → haul → rescue."), ApplicationOption(label: "Pull the rope directly", correct: false, explanation: "Rope cuts into lip. You can't generate enough force alone."), ApplicationOption(label: "Call for helicopter", correct: false, explanation: "Help may be hours away. Self-rescue is the priority.")]), connectionPrompt: "How does crevasse rescue integrate rope systems and travel protocols?"),
            Module(id: 8, domain: .glacierTravel, slug: "glacier-camping", title: "Glacier Camping", concept: "Camp setup on ice", takeaway: "Probe for crevasses before pitching tents. Anchor everything to ice screws or buried deadmen. Mark the kitchen, latrine, and crevasse danger zones.", tool: "GlacierCampPlanner", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .glacierTravel, slug: "probe-techniques")], applicationScenario: ApplicationScenario(situation: "Camping on a glacier at 3,500m. What are your site selection criteria?", options: [ApplicationOption(label: "Probe the entire camp area, avoid convex terrain, anchor tents with ice screws, mark crevasse zones", correct: true, explanation: "Probe first, flat terrain preferred, secure anchoring, and clearly marked zones."), ApplicationOption(label: "Find a flat area and pitch tents", correct: false, explanation: "Flat-looking areas can hide crevasses. You must probe."), ApplicationOption(label: "Camp on the moraine instead", correct: false, explanation: "If moraine is available it may be safer, but you still need glacier camping skills.")]), connectionPrompt: "How does glacier camping build on probing techniques?"),
            Module(id: 9, domain: .glacierTravel, slug: "seasonal-changes", title: "Seasonal Changes", concept: "How glaciers change by season", takeaway: "Early season: snow bridges are strong but crevasses are hidden. Late season: crevasses are visible but snow bridges are weak. Know the season, know the risk.", tool: "SeasonalGlacierViewer", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .glacierTravel, slug: "glacier-anatomy"), RelatedModule(domain: .weather, slug: "thermals")], applicationScenario: ApplicationScenario(situation: "Mid-August, a glacier was fully snow-covered in June. How have conditions changed?", options: [ApplicationOption(label: "Snow bridges are weakened, crevasses more visible, ablation zone exposed — higher risk of breakthrough", correct: true, explanation: "Summer melt thins snow bridges. More crevasses are visible but hidden ones are weaker."), ApplicationOption(label: "Conditions are safer because you can see the crevasses", correct: false, explanation: "Visible crevasses are safer to avoid, but hidden ones are more dangerous."), ApplicationOption(label: "No significant change on a glacier", correct: false, explanation: "Glaciers change dramatically between seasons.")]), connectionPrompt: "How do seasonal changes relate to glacier anatomy and weather?"),
            Module(id: 10, domain: .glacierTravel, slug: "glacier-weather", title: "Glacier Weather", concept: "Weather hazards on glaciers", takeaway: "Glaciers create their own weather. Cold air drains off them. Whiteout can strike in minutes. Sun reflected off snow blinds and burns. Respect the glacier's micro-climate.", tool: "GlacierWeatherTrainer", difficulty: .advanced, relatedModules: [RelatedModule(domain: .weather, slug: "mountain-winds"), RelatedModule(domain: .navigation, slug: "whiteout-navigation")], applicationScenario: ApplicationScenario(situation: "Morning cloud is building rapidly over the glacier and temperature is rising. What hazards?", options: [ApplicationOption(label: "Whiteout risk, snow bridge weakening from warmth, possible afternoon storms", correct: true, explanation: "Cloud reduces visibility. Warming weakens snow. Afternoon convection can bring storms."), ApplicationOption(label: "No concern — clouds provide shade", correct: false, explanation: "Cloud means potential whiteout and associated navigation hazards."), ApplicationOption(label: "Only sunburn risk", correct: false, explanation: "Multiple hazards compound on glaciers in changing weather.")]), connectionPrompt: "How does glacier weather connect to mountain winds and whiteout navigation?"),
        ]
    )

    // MARK: - First Aid Domain

    static let firstAid = Domain(
        id: .firstAid,
        name: "First Aid",
        subtitle: "Wilderness Medicine",
        description: "Assess patients, manage trauma, and make evacuation decisions when help is hours away. In the mountains, you are the first responder.",
        book: "Freedom of the Hills",
        author: "The Mountaineers",
        accent: "#EF4444",
        accentRgb: "239, 68, 68",
        modules: [
            Module(id: 1, domain: .firstAid, slug: "wilderness-assessment", title: "Wilderness Assessment", concept: "Patient assessment in the field", takeaway: "Scene safety first. Then ABCs: Airway, Breathing, Circulation. A systematic assessment misses nothing. Panic misses everything.", tool: "WildernessAssessment", difficulty: .foundation, relatedModules: [RelatedModule(domain: .firstAid, slug: "evacuation-planning")], applicationScenario: ApplicationScenario(situation: "Unconscious hiker on trail. No one else around. Walk through primary assessment.", options: [ApplicationOption(label: "Scene safe → responsive check → airway → breathing → circulation → rapid body scan", correct: true, explanation: "Systematic primary assessment catches life threats in order."), ApplicationOption(label: "Check for broken bones first", correct: false, explanation: "ABCs before anything — airway, breathing, circulation save lives."), ApplicationOption(label: "Call for help immediately", correct: false, explanation: "Assess first — you may need to start CPR before calling for help.")]), connectionPrompt: "How does wilderness assessment connect to evacuation planning?"),
            Module(id: 2, domain: .firstAid, slug: "hypothermia", title: "Hypothermia", concept: "Recognition and treatment", takeaway: "Mild: shivering, confused. Moderate: stopped shivering, stuporous. Severe: unconscious. Treat gently — rough handling can cause cardiac arrest in severe cases.", tool: "HypothermiaManager", difficulty: .foundation, relatedModules: [RelatedModule(domain: .firstAid, slug: "emergency-shelter")], applicationScenario: ApplicationScenario(situation: "Partner shivering uncontrollably, confused, slurred speech after river crossing. Core ~32°C. What stage and action?", options: [ApplicationOption(label: "Moderate hypothermia — remove wet clothes, insulate, warm fluids if conscious, handle gently", correct: true, explanation: "32°C with confusion = moderate. Active rewarming needed. Handle gently to avoid cardiac complications."), ApplicationOption(label: "Mild — just give them a warm drink", correct: false, explanation: "Confusion and slurred speech indicate moderate, not mild hypothermia."), ApplicationOption(label: "Severe — start CPR", correct: false, explanation: "They're conscious with shivering — not severe. CPR is for unconscious non-breathing patients.")]), connectionPrompt: "How does hypothermia management connect to emergency shelter skills?"),
            Module(id: 3, domain: .firstAid, slug: "altitude-sickness", title: "Altitude Sickness", concept: "AMS, HACE, HAPE", takeaway: "AMS is a headache at altitude. HACE is a brain swelling emergency. HAPE drowns you from inside. The treatment for all three: descend. Now.", tool: "AltitudeAssessment", difficulty: .foundation, relatedModules: [RelatedModule(domain: .firstAid, slug: "evacuation-planning")], applicationScenario: ApplicationScenario(situation: "At 4,200m a team member has severe headache, nausea, and is staggering. What condition?", options: [ApplicationOption(label: "HACE (High Altitude Cerebral Edema) — immediate descent required", correct: true, explanation: "Ataxia (staggering) at altitude = HACE until proven otherwise. This is a life-threatening emergency."), ApplicationOption(label: "AMS — rest at current altitude", correct: false, explanation: "Ataxia elevates this beyond AMS to HACE. Resting is insufficient."), ApplicationOption(label: "Dehydration — give fluids", correct: false, explanation: "The ataxia indicates neurological involvement — this is HACE.")]), connectionPrompt: "How does altitude sickness assessment connect to evacuation planning?"),
            Module(id: 4, domain: .firstAid, slug: "fractures-splints", title: "Fractures & Splints", concept: "Fracture management in the field", takeaway: "Immobilize above and below the break. Check circulation before and after splinting. Pain management matters — a patient in agony can't help with their own rescue.", tool: "SplintBuilder", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .firstAid, slug: "wilderness-assessment"), RelatedModule(domain: .firstAid, slug: "evacuation-planning")], applicationScenario: ApplicationScenario(situation: "Obvious lower leg deformity after a fall. Patient can wiggle toes. How do you manage?", options: [ApplicationOption(label: "Splint in position found, padding above and below, check pulses after, manage pain", correct: true, explanation: "Don't realign unless circulation is compromised. Splint, check circulation, prepare for evacuation."), ApplicationOption(label: "Straighten the leg first", correct: false, explanation: "Only realign if there's no distal pulse."), ApplicationOption(label: "Have them try to walk on it", correct: false, explanation: "Weight-bearing on a fracture risks further damage.")]), connectionPrompt: "How does fracture management build on assessment and connect to evacuation?"),
            Module(id: 5, domain: .firstAid, slug: "wound-care", title: "Wound Care", concept: "Wound treatment in wilderness", takeaway: "Clean water is your best wound irrigant. Pressure stops bleeding. Close clean wounds, pack dirty ones. Infection is the enemy in the backcountry.", tool: "WoundCareTrainer", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .firstAid, slug: "wilderness-assessment")], applicationScenario: ApplicationScenario(situation: "Deep forearm laceration from a sharp rock. Steady bleeding, not spurting. Management?", options: [ApplicationOption(label: "Direct pressure to stop bleeding, irrigate with clean water, close if clean, dress and monitor", correct: true, explanation: "Pressure first, then clean, then close clean wounds. Monitor for infection."), ApplicationOption(label: "Apply a tourniquet", correct: false, explanation: "Tourniquet is for life-threatening hemorrhage. Steady non-arterial bleeding responds to direct pressure."), ApplicationOption(label: "Leave it open to air-dry", correct: false, explanation: "Wounds need cleaning, closure if appropriate, and sterile dressing.")]), connectionPrompt: "How does wound care build on wilderness assessment skills?"),
            Module(id: 6, domain: .firstAid, slug: "lightning-injuries", title: "Lightning Injuries", concept: "Lightning strike response", takeaway: "Lightning victims are safe to touch — they carry no charge. Start CPR immediately on non-breathing victims. Reverse triage: treat the 'dead' first because cardiac arrest from lightning is often reversible.", tool: "LightningResponse", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .weather, slug: "thunderstorms")], applicationScenario: ApplicationScenario(situation: "Lightning strikes near your group. One person unconscious, not breathing. What do you do?", options: [ApplicationOption(label: "Start CPR immediately — lightning cardiac arrest is often reversible", correct: true, explanation: "Lightning victims don't carry charge. Immediate CPR has high success rates."), ApplicationOption(label: "Don't touch them — they may still be charged", correct: false, explanation: "Lightning victims carry no residual charge. This myth costs lives."), ApplicationOption(label: "Treat the conscious injured first", correct: false, explanation: "Reverse triage for lightning — treat non-breathing victims first because their arrest is most reversible.")]), connectionPrompt: "How do lightning injuries connect to thunderstorm knowledge?"),
            Module(id: 7, domain: .firstAid, slug: "frostbite", title: "Frostbite", concept: "Frostbite stages and treatment", takeaway: "Superficial: white, numb, but soft underneath. Deep: white, hard, wooden. Never rub. Never rewarm if refreezing is possible — refreezing causes far more tissue death.", tool: "FrostbiteAssessment", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .firstAid, slug: "hypothermia")], applicationScenario: ApplicationScenario(situation: "After 6 hours in -25°C, fingers are white, hard, no sensation. Stage and treatment?", options: [ApplicationOption(label: "Deep frostbite — do NOT rewarm if there's any chance of refreezing. Protect, insulate, evacuate", correct: true, explanation: "Hard, white, wooden = deep frostbite. Rewarming then refreezing destroys tissue."), ApplicationOption(label: "Rub the fingers to restore circulation", correct: false, explanation: "Never rub frostbitten tissue — this causes mechanical damage."), ApplicationOption(label: "Rewarm in warm water immediately", correct: false, explanation: "Only if you can guarantee no refreezing. In the field, protect and evacuate.")]), connectionPrompt: "How does frostbite management relate to hypothermia treatment?"),
            Module(id: 8, domain: .firstAid, slug: "dehydration-heat", title: "Dehydration & Heat Illness", concept: "Heat illness management", takeaway: "Heat exhaustion: sweaty, weak, nauseated. Heat stroke: hot dry skin, confused, emergency. Cool them aggressively. Every minute of elevated temperature damages organs.", tool: "HeatIllnessAssessment", difficulty: .intermediate, relatedModules: [RelatedModule(domain: .firstAid, slug: "wilderness-assessment")], applicationScenario: ApplicationScenario(situation: "Hiker collapses on a hot day. Skin hot and dry, confused, HR 140. Diagnosis and treatment?", options: [ApplicationOption(label: "Heat stroke — cool aggressively: shade, remove clothes, wet skin, fan, ice to neck/groin/armpits", correct: true, explanation: "Hot dry skin + confusion + tachycardia = heat stroke. This is a life-threatening emergency."), ApplicationOption(label: "Heat exhaustion — give fluids and rest", correct: false, explanation: "Hot dry skin with confusion = heat stroke, not exhaustion."), ApplicationOption(label: "Dehydration — give oral fluids", correct: false, explanation: "Heat stroke with confusion means they may not be able to drink safely.")]), connectionPrompt: "How does heat illness management build on wilderness assessment?"),
            Module(id: 9, domain: .firstAid, slug: "emergency-shelter", title: "Emergency Shelter", concept: "Improvised shelter building", takeaway: "A snow cave stays near 0°C regardless of outside temperature. A tree well provides wind protection. Even a garbage bag saves lives. Shelter is the first priority in survival.", tool: "ShelterBuilder", difficulty: .advanced, relatedModules: [RelatedModule(domain: .firstAid, slug: "hypothermia"), RelatedModule(domain: .avalanche, slug: "terrain-traps")], applicationScenario: ApplicationScenario(situation: "Storm hits above treeline, no tent, temps dropping to -10°C. How do you build shelter?", options: [ApplicationOption(label: "Dig a snow trench or cave, insulate the floor, block the entrance from wind", correct: true, explanation: "Snow shelters maintain near 0°C inside. Insulated floor prevents conductive heat loss."), ApplicationOption(label: "Build a wall from rocks", correct: false, explanation: "Rocks don't insulate. Snow is a far better shelter material."), ApplicationOption(label: "Keep moving to stay warm", correct: false, explanation: "Exhaustion will set in. Shelter preserves more heat than movement in a storm.")]), connectionPrompt: "How does emergency shelter building connect to hypothermia and terrain knowledge?"),
            Module(id: 10, domain: .firstAid, slug: "evacuation-planning", title: "Evacuation Planning", concept: "Evacuation decision-making", takeaway: "Can they walk? How far? What resources do you have? Is helicopter possible? These four questions determine your evacuation plan. Time is always the enemy.", tool: "EvacuationPlanner", difficulty: .advanced, relatedModules: [RelatedModule(domain: .firstAid, slug: "wilderness-assessment"), RelatedModule(domain: .navigation, slug: "route-planning")], applicationScenario: ApplicationScenario(situation: "Suspected spinal injury at 3,000m, 8km from trailhead. Walk through evacuation decision-making.", options: [ApplicationOption(label: "Immobilize spine, assess helicopter access, if not possible plan carry-out with team coordination", correct: true, explanation: "Spinal injury = no walking. Helicopter is ideal. If unavailable, improvised litter carry-out with frequent rest."), ApplicationOption(label: "Help them walk out slowly", correct: false, explanation: "Suspected spinal injury means NO movement without immobilization."), ApplicationOption(label: "Send someone for help and wait", correct: false, explanation: "Sending for help is part of the plan, but you must also immobilize and monitor.")]), connectionPrompt: "How does evacuation planning integrate assessment skills and navigation?"),
        ]
    )
}
