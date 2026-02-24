import Foundation

enum WeatherLessons {

    // MARK: - The Atmosphere

    static let atmosphere = Lesson(
        id: "atmosphere",
        domain: .weather,
        teachingSteps: [
            TeachingStep(
                id: "atmo-1",
                headline: "Where Weather Lives",
                body: "The troposphere is the lowest layer of the atmosphere — roughly 36,000ft thick. All weather, all clouds, all turbulence happens here. This is your operating environment.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "tropo", name: "Troposphere", color: "3B82F6", heightRatio: 0.45, description: "0–36,000ft. All weather occurs here. Temperature decreases with altitude."),
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "atmo-2",
                headline: "The Cooling Principle",
                body: "As air rises, it expands and cools — roughly 2°C per 1,000ft (the environmental lapse rate). This single principle drives all weather. It determines where clouds form, where thermals die, and where turbulence lives.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "tropo", name: "Troposphere", color: "3B82F6", heightRatio: 0.45, description: "0–36,000ft. Temperature decreases ~2°C per 1,000ft."),
                    ],
                    arrows: [
                        DiagramArrow(fromX: 0.7, fromY: 0.05, toX: 0.7, toY: 0.15, label: "30°C", color: "EF4444"),
                        DiagramArrow(fromX: 0.65, fromY: 0.15, toX: 0.65, toY: 0.25, label: "20°C", color: "F59E0B"),
                        DiagramArrow(fromX: 0.6, fromY: 0.25, toX: 0.6, toY: 0.35, label: "10°C", color: "3B82F6"),
                        DiagramArrow(fromX: 0.55, fromY: 0.35, toX: 0.55, toY: 0.45, label: "0°C", color: "06B6D4"),
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "atmo-3",
                headline: "The Tropopause Ceiling",
                body: "The tropopause is a temperature inversion that acts as a lid. Convection stops here — thermals can't punch through. Thunderstorm anvils spread along this boundary. It's the hard ceiling of weather.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "tropo", name: "Troposphere", color: "3B82F6", heightRatio: 0.45, description: "All weather occurs below this line."),
                        DiagramLayer(id: "strato", name: "Stratosphere", color: "1E3A5F", heightRatio: 0.35, description: "Above the tropopause. Stable, no weather. Temperature increases due to ozone."),
                    ],
                    highlightIndex: 1,
                    animationStyle: "sequential"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "atmo-4",
                headline: "The Complete Picture",
                body: "The atmosphere is layered. Understanding these layers tells you where clouds form, where turbulence lives, and where lift dies. Tap any layer to explore.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "tropo", name: "Troposphere", color: "3B82F6", heightRatio: 0.35, description: "0–36,000ft. All weather. Temp decreases with altitude (~2°C/1000ft)."),
                        DiagramLayer(id: "strato", name: "Stratosphere", color: "1E3A5F", heightRatio: 0.25, description: "36,000–164,000ft. Ozone layer here. Temp increases. Very stable."),
                        DiagramLayer(id: "meso", name: "Mesosphere", color: "0F172A", heightRatio: 0.2, description: "164,000–262,000ft. Coldest layer. Meteors burn up here."),
                        DiagramLayer(id: "thermo", name: "Thermosphere", color: "06070A", heightRatio: 0.2, description: "262,000ft+. Very thin air. Aurora borealis occurs here."),
                    ],
                    highlightIndex: 1,
                    animationStyle: "sequential"
                ),
                interactionHint: "Tap any layer to learn more",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "atmo-q1",
                type: .multipleChoice,
                prompt: "At what rate does air temperature typically decrease with altitude in the troposphere?",
                difficulty: .foundation,
                explanation: "The standard environmental lapse rate is approximately 2°C per 1,000ft. This is the average observed rate, not the dry or moist adiabatic rate.",
                options: [
                    PracticeOption(label: "~2°C per 1,000ft", correct: true, explanation: "The standard environmental lapse rate."),
                    PracticeOption(label: "~5°C per 1,000ft", correct: false, explanation: "This is far too high. At this rate, temperatures would plummet."),
                    PracticeOption(label: "~0.5°C per 1,000ft", correct: false, explanation: "This is too low. The actual rate is about 4x higher."),
                    PracticeOption(label: "Temperature increases with altitude", correct: false, explanation: "Temperature decreases with altitude in the troposphere (the opposite happens in the stratosphere)."),
                ]
            ),
            PracticeQuestion(
                id: "atmo-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "The troposphere extends only to about 36,000ft. The stratosphere, mesosphere, and thermosphere continue above it, each with different temperature profiles.",
                statement: "All of Earth's atmosphere is contained within the troposphere.",
                isTrue: false,
                reasoning: "The troposphere is only the lowest layer (~36,000ft). It contains all weather, but above it lie the stratosphere, mesosphere, and thermosphere."
            ),
            PracticeQuestion(
                id: "atmo-q3",
                type: .calculation,
                prompt: "Surface temperature is 28°C. Using the standard lapse rate (2°C/1,000ft), what temperature would you expect at 8,000ft?",
                difficulty: .foundation,
                explanation: "28°C - (8 × 2°C) = 28 - 16 = 12°C. At 8,000ft, the air has cooled by 16 degrees from the surface temperature.",
                correctAnswer: 12,
                tolerance: 1,
                answerUnit: "°C"
            ),
            PracticeQuestion(
                id: "atmo-q4",
                type: .sequenceOrder,
                prompt: "Order the atmospheric layers from lowest to highest altitude:",
                difficulty: .foundation,
                explanation: "The layers from ground up are: Troposphere (weather), Stratosphere (ozone), Mesosphere (coldest), Thermosphere (aurora).",
                correctOrder: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
                shuffledItems: ["Mesosphere", "Troposphere", "Thermosphere", "Stratosphere"]
            ),
        ],
        synthesisPrompt: "The atmosphere's layered structure drives all weather. How does the cooling-with-altitude principle connect to soaring fundamentals? Think about what makes thermals possible and what stops them.",
        conceptMapNodes: [
            ConceptMapNode(id: "atmosphere", label: "Atmosphere", domain: .weather, x: 0.5, y: 0.3, connections: ["lapse-rates", "thermals", "soaring-fundamentals"]),
            ConceptMapNode(id: "lapse-rates", label: "Lapse Rates", domain: .weather, x: 0.2, y: 0.5, connections: ["atmosphere"]),
            ConceptMapNode(id: "thermals", label: "Thermals", domain: .weather, x: 0.8, y: 0.5, connections: ["atmosphere", "soaring-fundamentals"]),
            ConceptMapNode(id: "soaring-fundamentals", label: "Soaring Fundamentals", domain: .flying, x: 0.5, y: 0.7, connections: ["atmosphere", "thermals"]),
        ]
    )

    // MARK: - Pressure Systems

    static let pressureSystems = Lesson(
        id: "pressure-systems",
        domain: .weather,
        teachingSteps: [
            TeachingStep(
                id: "pressure-1",
                headline: "Air in Motion",
                body: "Wind is nothing more than air flowing from high pressure to low pressure. Pressure differences drive all atmospheric motion — from gentle breezes to hurricane-force winds.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.5, toX: 0.8, toY: 0.5, label: "Wind", color: "3B82F6"),
                    ],
                    centerLabel: "High → Low"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "pressure-2",
                headline: "Pressure Gradient",
                body: "The tighter the isobars (lines of equal pressure), the stronger the pressure gradient — and the stronger the wind. Widely spaced isobars mean gentle winds. Tightly packed isobars mean strong winds.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.15, fromY: 0.3, toX: 0.85, toY: 0.3, label: "Strong Wind", color: "EF4444"),
                        DiagramArrow(fromX: 0.15, fromY: 0.7, toX: 0.85, toY: 0.7, label: "Light Wind", color: "3B82F6"),
                    ],
                    centerLabel: "Gradient Strength"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "pressure-3",
                headline: "Coriolis Effect",
                body: "On a rotating Earth, moving air deflects to the right in the Northern Hemisphere. This creates the circular flow around pressure systems: counterclockwise around lows, clockwise around highs.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.3, fromY: 0.3, toX: 0.5, toY: 0.2, label: "CCW", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.2, toX: 0.7, toY: 0.3, label: "", color: "3B82F6"),
                        DiagramArrow(fromX: 0.7, fromY: 0.3, toX: 0.8, toY: 0.5, label: "", color: "3B82F6"),
                    ],
                    centerLabel: "Low Pressure"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "pressure-4",
                headline: "Mountain Implications",
                body: "Strong pressure gradients over mountains create powerful winds. These winds drive mountain waves, create rotors, and accelerate through passes and valleys. Read the isobars to predict the wind.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.1, fromY: 0.5, toX: 0.4, toY: 0.5, label: "Strong Wind", color: "EF4444"),
                        DiagramArrow(fromX: 0.6, fromY: 0.5, toX: 0.9, toY: 0.5, label: "Wave Setup", color: "F59E0B"),
                    ],
                    centerLabel: "Ridge Line"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "pressure-q1",
                type: .multipleChoice,
                prompt: "What does it mean when isobars are tightly packed on a weather map?",
                difficulty: .foundation,
                explanation: "Tightly packed isobars indicate a steep pressure gradient, which drives strong winds. The tighter the spacing, the stronger the wind.",
                options: [
                    PracticeOption(label: "Strong pressure gradient and strong winds", correct: true, explanation: "Close isobars mean rapid pressure change over distance — the definition of a strong gradient."),
                    PracticeOption(label: "Low pressure system approaching", correct: false, explanation: "Isobar spacing indicates wind strength, not the type of pressure system."),
                    PracticeOption(label: "Light winds and calm conditions", correct: false, explanation: "This describes widely spaced isobars, not tightly packed ones."),
                    PracticeOption(label: "High altitude jet stream presence", correct: false, explanation: "Isobars show surface pressure patterns, not jet stream location."),
                ]
            ),
            PracticeQuestion(
                id: "pressure-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "In the Northern Hemisphere, the Coriolis effect causes wind to deflect to the right, creating counterclockwise rotation around lows and clockwise rotation around highs.",
                statement: "In the Northern Hemisphere, wind flows clockwise around low pressure systems.",
                isTrue: false,
                reasoning: "Coriolis deflection creates counterclockwise flow around lows in the Northern Hemisphere. Clockwise flow occurs around high pressure systems."
            ),
            PracticeQuestion(
                id: "pressure-q3",
                type: .matchPairs,
                prompt: "Match the pressure pattern to its wind behavior:",
                difficulty: .foundation,
                explanation: "Pressure patterns determine wind strength and direction. Tight gradients create strong winds, while weak gradients produce light winds.",
                matchPairs: [
                    MatchPair(left: "Tightly packed isobars", right: "Strong winds"),
                    MatchPair(left: "Widely spaced isobars", right: "Light winds"),
                    MatchPair(left: "Low pressure center", right: "Inward spiraling flow"),
                    MatchPair(left: "High pressure center", right: "Outward spiraling flow"),
                ]
            ),
            PracticeQuestion(
                id: "pressure-q4",
                type: .sequenceOrder,
                prompt: "Order these steps in the chain from pressure gradient to mountain wave:",
                difficulty: .foundation,
                explanation: "Pressure differences create wind, which flows over mountains and creates wave patterns when conditions are right.",
                correctOrder: ["Pressure gradient forms", "Wind accelerates", "Air flows over ridge", "Wave pattern develops"],
                shuffledItems: ["Wave pattern develops", "Pressure gradient forms", "Air flows over ridge", "Wind accelerates"]
            ),
        ],
        synthesisPrompt: "Pressure gradients are the engine of all wind. How does this connect to mountain wave formation? Think about what creates the initial flow and what the mountains do to it.",
        conceptMapNodes: [
            ConceptMapNode(id: "pressure-systems", label: "Pressure Systems", domain: .weather, x: 0.5, y: 0.3, connections: ["mountain-waves", "mountain-winds"]),
            ConceptMapNode(id: "mountain-waves", label: "Mountain Waves", domain: .weather, x: 0.2, y: 0.6, connections: ["pressure-systems"]),
            ConceptMapNode(id: "mountain-winds", label: "Mountain Winds", domain: .weather, x: 0.8, y: 0.6, connections: ["pressure-systems"]),
            ConceptMapNode(id: "convergence-sea-breeze", label: "Convergence", domain: .flying, x: 0.5, y: 0.8, connections: ["pressure-systems"]),
        ]
    )

    // MARK: - Fronts

    static let fronts = Lesson(
        id: "fronts",
        domain: .weather,
        teachingSteps: [
            TeachingStep(
                id: "fronts-1",
                headline: "Air Mass Collision",
                body: "A front is the boundary between two air masses with different temperatures and moisture content. When these masses collide, the weather changes — often dramatically.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Warm Air Mass",
                    rightTitle: "Cold Air Mass",
                    leftColor: "EF4444",
                    rightColor: "3B82F6",
                    leftItems: ["Higher temperature", "More moisture", "Less dense"],
                    rightItems: ["Lower temperature", "Less moisture", "More dense"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "fronts-2",
                headline: "Cold Front: Steep and Violent",
                body: "Cold fronts are steep — cold air wedges under warm air like a plow. Warm air is forced up rapidly, creating towering cumulus and cumulonimbus. The passage is sudden: temperature drops, wind shifts sharply, precipitation is intense but brief.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Before Cold Front",
                    rightTitle: "After Cold Front",
                    leftColor: "F59E0B",
                    rightColor: "3B82F6",
                    leftItems: ["Warm, humid air", "Building cumulus", "Southerly winds"],
                    rightItems: ["Cooler, drier air", "Clearing skies", "Northwesterly winds"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "fronts-3",
                headline: "Warm Front: Shallow and Persistent",
                body: "Warm fronts are shallow — warm air slides up and over cold air gradually. The approach is slow: high cirrus clouds appear first, thickening to altostratus, then nimbostratus with steady rain. The sequence can last 24-48 hours.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Cold Front",
                    rightTitle: "Warm Front",
                    leftColor: "3B82F6",
                    rightColor: "EF4444",
                    leftItems: ["Steep slope (1:50)", "Fast movement", "Sudden weather", "Cumulonimbus", "Brief heavy rain"],
                    rightItems: ["Shallow slope (1:200)", "Slow movement", "Gradual weather", "Nimbostratus", "Steady light rain"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "fronts-4",
                headline: "Reading the Sequence",
                body: "Fronts bring predictable weather sequences. Cold front: rapid deterioration, violent weather, quick clearing. Warm front: gradual thickening clouds, persistent precipitation, eventual improvement. Learn the sequence to anticipate what's coming.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Cold Front Sequence",
                    rightTitle: "Warm Front Sequence",
                    leftColor: "3B82F6",
                    rightColor: "EF4444",
                    leftItems: ["1. Building cumulus", "2. Dark clouds approach", "3. Gusty winds, sharp shift", "4. Heavy rain/storms", "5. Rapid clearing"],
                    rightItems: ["1. High cirrus appear", "2. Clouds thicken & lower", "3. Steady rain begins", "4. Visibility drops", "5. Gradual improvement"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "fronts-q1",
                type: .multipleChoice,
                prompt: "A cold front is approaching. What weather sequence should you expect?",
                difficulty: .foundation,
                explanation: "Cold fronts bring rapid weather changes: building cumulus, sudden wind shift, possible thunderstorms, followed by clearing and cooler temperatures.",
                options: [
                    PracticeOption(label: "Rapid deterioration with gusty winds and possible thunderstorms", correct: true, explanation: "Cold fronts are steep and fast-moving, creating sudden, violent weather."),
                    PracticeOption(label: "Gradual cloud thickening with steady rain for 24+ hours", correct: false, explanation: "This describes a warm front approach, not a cold front."),
                    PracticeOption(label: "Improving conditions as the front approaches", correct: false, explanation: "Conditions improve after the front passes, not during the approach."),
                    PracticeOption(label: "No significant weather — fronts only affect temperature", correct: false, explanation: "Fronts drive significant weather changes, especially cold fronts."),
                ]
            ),
            PracticeQuestion(
                id: "fronts-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Cold fronts are steep and move fast (1:50 slope), while warm fronts are shallow and move slowly (1:200 slope). The difference in slope determines the weather intensity.",
                statement: "Warm fronts have a steeper slope than cold fronts.",
                isTrue: false,
                reasoning: "Warm fronts are shallow (~1:200 slope), creating gradual weather changes. Cold fronts are steep (~1:50), creating sudden, violent weather."
            ),
            PracticeQuestion(
                id: "fronts-q3",
                type: .sequenceOrder,
                prompt: "Order the cloud types as a warm front approaches:",
                difficulty: .foundation,
                explanation: "Warm fronts bring a predictable cloud sequence from high to low: cirrus → altostratus → nimbostratus as the front approaches.",
                correctOrder: ["Cirrus (high, wispy)", "Altostratus (mid-level, gray)", "Nimbostratus (low, rain-bearing)", "Rain begins"],
                shuffledItems: ["Rain begins", "Altostratus (mid-level, gray)", "Cirrus (high, wispy)", "Nimbostratus (low, rain-bearing)"]
            ),
            PracticeQuestion(
                id: "fronts-q4",
                type: .matchPairs,
                prompt: "Match the front type to its characteristic weather:",
                difficulty: .foundation,
                explanation: "Front types produce distinct weather patterns based on their structure and movement speed.",
                matchPairs: [
                    MatchPair(left: "Cold front", right: "Sudden violent weather"),
                    MatchPair(left: "Warm front", right: "Gradual persistent rain"),
                    MatchPair(left: "Steep frontal slope", right: "Rapid air lifting"),
                    MatchPair(left: "Shallow frontal slope", right: "Slow widespread clouds"),
                ]
            ),
        ],
        synthesisPrompt: "Fronts are air mass boundaries that drive major weather changes. How does understanding frontal structure connect to thunderstorm development? Think about what creates the lifting mechanism.",
        conceptMapNodes: [
            ConceptMapNode(id: "fronts", label: "Fronts", domain: .weather, x: 0.5, y: 0.3, connections: ["thunderstorms", "pressure-systems"]),
            ConceptMapNode(id: "thunderstorms", label: "Thunderstorms", domain: .weather, x: 0.3, y: 0.6, connections: ["fronts"]),
            ConceptMapNode(id: "pressure-systems", label: "Pressure Systems", domain: .weather, x: 0.7, y: 0.6, connections: ["fronts"]),
            ConceptMapNode(id: "clouds", label: "Clouds", domain: .weather, x: 0.5, y: 0.8, connections: ["fronts"]),
        ]
    )

    // MARK: - Thermals

    static let thermals = Lesson(
        id: "thermals",
        domain: .weather,
        teachingSteps: [
            TeachingStep(
                id: "thermals-1",
                headline: "Heat From Below",
                body: "The sun heats the ground. The ground heats the air. When a parcel of air gets hot enough, buoyancy overcomes resistance and it breaks free — rising like a bubble in a pot of water.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.8, toX: 0.5, toY: 0.3, label: "Rising Air", color: "EF4444"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "wind",
                    labels: ["Surface heating", "Thermal bubble"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "thermals-2",
                headline: "Trigger Temperature",
                body: "Not all surfaces heat equally. Dark plowed fields, asphalt, rock faces — these absorb solar radiation and reach trigger temperature first. Water and forests lag behind, sometimes suppressing thermals entirely.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.8, toX: 0.2, toY: 0.4, label: "Strong", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.75, toX: 0.5, toY: 0.5, label: "Best", color: "F59E0B"),
                        DiagramArrow(fromX: 0.8, fromY: 0.8, toX: 0.8, toY: 0.7, label: "Weak", color: "3B82F6"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 0.3, y: 0.8),
                        DiagramPoint(x: 0.3, y: 0.75),
                        DiagramPoint(x: 0.7, y: 0.75),
                        DiagramPoint(x: 0.7, y: 0.8),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: nil,
                    labels: ["Field (hot)", "Dark rock (best)", "Forest (cool)"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "thermals-3",
                headline: "Thermal Structure",
                body: "A mature thermal is a column of rising air — strongest in the core, weaker at the edges. Think of it as a river flowing upward. The best lift is in the center, with sink surrounding it.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.8, toX: 0.5, toY: 0.2, label: "Core +4m/s", color: "EF4444"),
                        DiagramArrow(fromX: 0.3, fromY: 0.8, toX: 0.3, toY: 0.5, label: "+1m/s", color: "F59E0B"),
                        DiagramArrow(fromX: 0.7, fromY: 0.8, toX: 0.7, toY: 0.5, label: "+1m/s", color: "F59E0B"),
                        DiagramArrow(fromX: 0.1, fromY: 0.6, toX: 0.1, toY: 0.8, label: "Sink", color: "3B82F6"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "wind",
                    labels: ["Sink zone", "Core", "Sink zone"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "thermals-4",
                headline: "Thermal Lifetime",
                body: "Thermals have a life cycle: trigger, rise, mature, dissipate. Early in the day they're weak and broken. By afternoon they're powerful columns. Late day they weaken again as surface heating fades.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.8, toX: 0.2, toY: 0.65, label: "Morning\nweak", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.8, toX: 0.5, toY: 0.2, label: "Afternoon\nstrong", color: "EF4444"),
                        DiagramArrow(fromX: 0.8, fromY: 0.8, toX: 0.8, toY: 0.6, label: "Evening\nfading", color: "F59E0B"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "clouds",
                    labels: ["Time of day matters"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "thermals-q1",
                type: .multipleChoice,
                prompt: "It's midday and you see a dark plowed field next to a lake. Where will the first thermals trigger?",
                difficulty: .foundation,
                explanation: "Dark surfaces absorb more solar radiation and heat faster. Water has high thermal inertia — it heats slowly and often suppresses thermals.",
                options: [
                    PracticeOption(label: "Over the dark plowed field", correct: true, explanation: "Dark surfaces reach trigger temperature first."),
                    PracticeOption(label: "Over the lake", correct: false, explanation: "Water heats slowly and creates sink, not lift."),
                    PracticeOption(label: "Equally from both", correct: false, explanation: "Different surfaces heat at vastly different rates."),
                    PracticeOption(label: "Between the field and lake", correct: false, explanation: "The field triggers thermals; the lake suppresses them."),
                ]
            ),
            PracticeQuestion(
                id: "thermals-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "A thermal is a column structure with the strongest lift in the core and weaker lift at the edges, surrounded by compensating sink.",
                statement: "The strongest lift in a thermal is found at its edges.",
                isTrue: false,
                reasoning: "The thermal core has the strongest lift. Lift weakens toward the edges, with sink surrounding the thermal."
            ),
            PracticeQuestion(
                id: "thermals-q3",
                type: .calculation,
                prompt: "A thermal's core shows +4 m/s at 3,000ft AGL. It took 8 minutes to climb from 2,000ft to 3,000ft. What was the average climb rate in m/s?",
                difficulty: .foundation,
                explanation: "1,000ft in 8 minutes = 125 ft/min = 2.08 ft/s. Converting to metric: 2.08 ft/s ÷ 3.28 = 0.63 m/s. The core reading is higher than the average because you spend time in weaker lift at the edges.",
                correctAnswer: 0.63,
                tolerance: 0.1,
                answerUnit: "m/s"
            ),
            PracticeQuestion(
                id: "thermals-q4",
                type: .matchPairs,
                prompt: "Match the surface type to its thermal characteristics:",
                difficulty: .foundation,
                explanation: "Different surfaces have different thermal properties based on albedo (reflectivity) and thermal inertia (heat storage capacity).",
                matchPairs: [
                    MatchPair(left: "Dark plowed field", right: "Triggers early, strong thermals"),
                    MatchPair(left: "Forest", right: "Slow heating, weak thermals"),
                    MatchPair(left: "Lake or ocean", right: "High inertia, creates sink"),
                    MatchPair(left: "Rocky slopes", right: "Fast heating, good triggers"),
                ]
            ),
        ],
        synthesisPrompt: "Thermals are the foundation of soaring flight. How does understanding thermal sources and structure connect to thermal entry and centering technique? Think about where to look and what to feel.",
        conceptMapNodes: [
            ConceptMapNode(id: "thermals", label: "Thermals", domain: .weather, x: 0.5, y: 0.3, connections: ["thermal-entry", "centering", "lapse-rates"]),
            ConceptMapNode(id: "thermal-entry", label: "Thermal Entry", domain: .flying, x: 0.2, y: 0.6, connections: ["thermals"]),
            ConceptMapNode(id: "centering", label: "Centering", domain: .flying, x: 0.5, y: 0.6, connections: ["thermals"]),
            ConceptMapNode(id: "lapse-rates", label: "Lapse Rates", domain: .weather, x: 0.8, y: 0.6, connections: ["thermals"]),
        ]
    )

    // MARK: - Lapse Rates

    static let lapseRates = Lesson(
        id: "lapse-rates",
        domain: .weather,
        teachingSteps: [
            TeachingStep(
                id: "lapse-1",
                headline: "Three Critical Rates",
                body: "Temperature changes with altitude. Three rates matter: the environmental lapse rate (what the atmosphere is doing), the dry adiabatic lapse rate (unsaturated rising air), and the moist adiabatic lapse rate (saturated rising air in clouds).",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "env", label: "Environmental", minValue: 0, maxValue: 2, color: "3B82F6", description: "Average atmospheric cooling: ~2°C/1000ft"),
                        DiagramZone(id: "moist", label: "Moist Adiabatic", minValue: 1.5, maxValue: 1.5, color: "22C55E", description: "Saturated air: ~1.5°C/1000ft"),
                        DiagramZone(id: "dry", label: "Dry Adiabatic", minValue: 3, maxValue: 3, color: "EF4444", description: "Unsaturated air: ~3°C/1000ft"),
                    ],
                    minValue: 0,
                    maxValue: 5,
                    unit: "°C/1000ft",
                    currentValue: 2
                ),
                interactionHint: "Slide to see different lapse rates",
                revealItems: nil
            ),
            TeachingStep(
                id: "lapse-2",
                headline: "Dry Adiabatic Lapse Rate",
                body: "Rising air expands and cools at 3°C per 1,000ft — the dry adiabatic lapse rate (DALR). This rate is constant for unsaturated air. It's the cooling rate of thermals before they reach cloudbase.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "slow", label: "Too slow - stable", minValue: 0, maxValue: 2.5, color: "3B82F6", description: "Air cools slower than DALR — stable, sinking"),
                        DiagramZone(id: "dalr", label: "DALR - neutral", minValue: 3, maxValue: 3, color: "F59E0B", description: "Air cools at 3°C/1000ft — neutral stability"),
                        DiagramZone(id: "fast", label: "Faster - unstable", minValue: 3.5, maxValue: 5, color: "EF4444", description: "Air cools faster than DALR — unstable, rising"),
                    ],
                    minValue: 0,
                    maxValue: 5,
                    unit: "°C/1000ft",
                    currentValue: 3
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "lapse-3",
                headline: "Moist Adiabatic Lapse Rate",
                body: "When rising air reaches saturation (cloudbase), water vapor condenses and releases latent heat. This slows the cooling to about 1.5°C per 1,000ft — the moist adiabatic lapse rate (MALR). This is why clouds can tower so high.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "below-cloud", label: "Below cloud", minValue: 0, maxValue: 1.5, color: "3B82F6", description: "Dry adiabatic rate: 3°C/1000ft"),
                        DiagramZone(id: "in-cloud", label: "In cloud", minValue: 1.5, maxValue: 1.5, color: "22C55E", description: "Moist adiabatic rate: 1.5°C/1000ft"),
                        DiagramZone(id: "strong", label: "Strong convection", minValue: 1.5, maxValue: 3, color: "EF4444", description: "Latent heat release drives towering clouds"),
                    ],
                    minValue: 0,
                    maxValue: 5,
                    unit: "°C/1000ft",
                    currentValue: 1.5
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "lapse-4",
                headline: "Stability Assessment",
                body: "Compare the environmental lapse rate to the adiabatic rates. If the environment cools faster than DALR (steep lapse rate), the air is unstable — thermals accelerate as they rise. If it cools slower (shallow lapse rate), the air is stable — thermals die out.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "very-stable", label: "Very Stable", minValue: 0, maxValue: 1, color: "3B82F6", description: "Inversion or isothermal — no convection"),
                        DiagramZone(id: "stable", label: "Stable", minValue: 1, maxValue: 2.5, color: "06B6D4", description: "Weak thermals, limited lift"),
                        DiagramZone(id: "neutral", label: "Neutral", minValue: 2.5, maxValue: 3.5, color: "F59E0B", description: "Moderate thermal activity"),
                        DiagramZone(id: "unstable", label: "Unstable", minValue: 3.5, maxValue: 5, color: "EF4444", description: "Strong thermals, possible storms"),
                    ],
                    minValue: 0,
                    maxValue: 5,
                    unit: "°C/1000ft",
                    currentValue: 2.5
                ),
                interactionHint: "Slide to see how stability changes",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "lapse-q1",
                type: .multipleChoice,
                prompt: "Why does rising air cool more slowly after it reaches cloudbase?",
                difficulty: .intermediate,
                explanation: "Water vapor condensation releases latent heat, warming the air and slowing the cooling rate from 3°C/1000ft (DALR) to about 1.5°C/1000ft (MALR).",
                options: [
                    PracticeOption(label: "Condensation releases latent heat, slowing the cooling", correct: true, explanation: "The phase change from vapor to liquid releases energy."),
                    PracticeOption(label: "Cloud droplets insulate the air parcel", correct: false, explanation: "Clouds don't insulate — latent heat release is the mechanism."),
                    PracticeOption(label: "The air stops rising at cloudbase", correct: false, explanation: "Air continues rising in clouds — that's how cumulonimbus form."),
                    PracticeOption(label: "Pressure increases above cloudbase", correct: false, explanation: "Pressure decreases with altitude both below and above cloudbase."),
                ]
            ),
            PracticeQuestion(
                id: "lapse-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "An unstable atmosphere has an environmental lapse rate steeper than the dry adiabatic rate (>3°C/1000ft). This means rising air parcels remain warmer than their surroundings and continue accelerating upward.",
                statement: "An environmental lapse rate of 4°C/1000ft indicates stable atmospheric conditions.",
                isTrue: false,
                reasoning: "4°C/1000ft is steeper than the DALR (3°C/1000ft), indicating instability. Rising air parcels will be warmer and more buoyant than the environment."
            ),
            PracticeQuestion(
                id: "lapse-q3",
                type: .calculation,
                prompt: "Surface temp is 25°C, dewpoint is 13°C. Using the approximation that LCL = 222 × (T - Td), at what altitude will clouds form?",
                difficulty: .intermediate,
                explanation: "LCL = 222 × (25 - 13) = 222 × 12 = 2,664ft AGL. This is where rising air reaches saturation and clouds begin to form.",
                correctAnswer: 2664,
                tolerance: 100,
                answerUnit: "ft AGL"
            ),
            PracticeQuestion(
                id: "lapse-q4",
                type: .matchPairs,
                prompt: "Match the lapse rate to its typical value:",
                difficulty: .intermediate,
                explanation: "Each lapse rate describes a different process: environmental (observed), dry adiabatic (unsaturated rising air), moist adiabatic (saturated rising air).",
                matchPairs: [
                    MatchPair(left: "Environmental lapse rate", right: "~2°C/1000ft"),
                    MatchPair(left: "Dry adiabatic lapse rate", right: "3°C/1000ft"),
                    MatchPair(left: "Moist adiabatic lapse rate", right: "~1.5°C/1000ft"),
                    MatchPair(left: "Inversion", right: "Temperature increases with altitude"),
                ]
            ),
        ],
        synthesisPrompt: "Lapse rates determine atmospheric stability — whether thermals accelerate or die. How does this connect to decisions about climbing to cloudbase in soaring? Think about when to stay in lift and when to leave.",
        conceptMapNodes: [
            ConceptMapNode(id: "lapse-rates", label: "Lapse Rates", domain: .weather, x: 0.5, y: 0.3, connections: ["thermals", "clouds", "climbing"]),
            ConceptMapNode(id: "thermals", label: "Thermals", domain: .weather, x: 0.2, y: 0.6, connections: ["lapse-rates"]),
            ConceptMapNode(id: "clouds", label: "Clouds", domain: .weather, x: 0.5, y: 0.6, connections: ["lapse-rates"]),
            ConceptMapNode(id: "climbing", label: "Climbing", domain: .flying, x: 0.8, y: 0.6, connections: ["lapse-rates"]),
        ]
    )

    // MARK: - Clouds

    static let clouds = Lesson(
        id: "clouds",
        domain: .weather,
        teachingSteps: [
            TeachingStep(
                id: "clouds-1",
                headline: "Visible Lift",
                body: "Clouds are condensed water vapor — visible markers of atmospheric motion. Every cloud type tells a story about the air that created it. Learn to read the language.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Mountain landscape with various cloud types",
                    hotspots: [
                        RevealItem(id: "cu", label: "Cumulus", detail: "Fair weather cumulus — marks active thermals", x: 0.3, y: 0.4),
                        RevealItem(id: "cb", label: "Cumulonimbus", detail: "Thunderstorm — extreme lift and danger", x: 0.5, y: 0.2),
                        RevealItem(id: "lent", label: "Lenticular", detail: "Mountain wave — smooth, powerful, stationary", x: 0.7, y: 0.35),
                    ]
                ),
                interactionHint: "Tap each cloud type to learn more",
                revealItems: nil
            ),
            TeachingStep(
                id: "clouds-2",
                headline: "Cumulus: The Thermal Marker",
                body: "Cumulus clouds mark active thermals. Flat bases show the lifting condensation level. Cauliflower tops indicate strong convection. Dark bases mean moisture and strong lift. Wispy edges mean dying thermals.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Cumulus cloud details",
                    hotspots: [
                        RevealItem(id: "flat-base", label: "Flat Base", detail: "Marks the LCL — all thermals reach saturation at same altitude", x: 0.3, y: 0.6),
                        RevealItem(id: "cauliflower", label: "Cauliflower Top", detail: "Active convection — strong updrafts building the cloud", x: 0.3, y: 0.3),
                        RevealItem(id: "dark-base", label: "Dark Base", detail: "High moisture content — strong thermals", x: 0.6, y: 0.6),
                        RevealItem(id: "wispy", label: "Wispy Edges", detail: "Evaporating — thermal is weakening or dying", x: 0.7, y: 0.4),
                    ]
                ),
                interactionHint: "Tap features to learn what they indicate",
                revealItems: nil
            ),
            TeachingStep(
                id: "clouds-3",
                headline: "Lenticular: The Wave Signature",
                body: "Lenticular clouds are smooth, lens-shaped, and stationary. They mark the crests of mountain waves. Smooth and beautiful aloft, but often violent rotors below. These clouds don't move with the wind — the wind flows through them.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Lenticular cloud stack over mountain",
                    hotspots: [
                        RevealItem(id: "lens-shape", label: "Lens Shape", detail: "Smooth, layered appearance — sign of laminar flow", x: 0.5, y: 0.4),
                        RevealItem(id: "stationary", label: "Stationary", detail: "Cloud stays in place as air flows through it", x: 0.3, y: 0.35),
                        RevealItem(id: "stack", label: "Stacked", detail: "Multiple layers indicate strong wave system", x: 0.6, y: 0.3),
                        RevealItem(id: "rotor", label: "Rotor Zone", detail: "Turbulent air below — dangerous for aircraft", x: 0.4, y: 0.7),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "clouds-4",
                headline: "Cumulonimbus: The Storm",
                body: "Cumulonimbus is the thunderstorm cloud. Towering to 40,000ft+, anvil top spreading at the tropopause, extreme updrafts and downdrafts, lightning, hail, tornadoes. This cloud demands total avoidance — it will destroy aircraft.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Cumulonimbus structure",
                    hotspots: [
                        RevealItem(id: "anvil", label: "Anvil Top", detail: "Spreading at tropopause — marks the ceiling", x: 0.5, y: 0.15),
                        RevealItem(id: "tower", label: "Towering", detail: "Can exceed 50,000ft — extreme energy", x: 0.45, y: 0.4),
                        RevealItem(id: "mammatus", label: "Mammatus", detail: "Pouch-like formations — severe turbulence", x: 0.6, y: 0.25),
                        RevealItem(id: "rain-shaft", label: "Rain Shaft", detail: "Heavy precipitation — downdrafts and microbursts", x: 0.3, y: 0.5),
                    ]
                ),
                interactionHint: "Tap to see CB danger zones",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "clouds-q1",
                type: .multipleChoice,
                prompt: "You see cumulus clouds with dark flat bases and rapidly building tops. What does this indicate?",
                difficulty: .foundation,
                explanation: "Dark bases indicate high moisture content. Flat bases mark the LCL. Rapidly building tops show strong convection — all signs of active, strong thermals.",
                options: [
                    PracticeOption(label: "Strong active thermals with good moisture", correct: true, explanation: "All signs point to strong thermal activity."),
                    PracticeOption(label: "Dying thermals — the dark color shows they're dissipating", correct: false, explanation: "Dark bases indicate moisture, not dissipation."),
                    PracticeOption(label: "Approaching thunderstorms to avoid", correct: false, explanation: "While strong, these are cumulus, not cumulonimbus."),
                    PracticeOption(label: "Stratiform clouds with no usable lift", correct: false, explanation: "The description indicates convective cumulus, not stratiform clouds."),
                ]
            ),
            PracticeQuestion(
                id: "clouds-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Lenticular clouds are stationary — they mark a fixed location where the wave crest occurs. Wind flows through the cloud, continuously condensing on the upwind side and evaporating on the downwind side.",
                statement: "Lenticular clouds move with the prevailing wind like normal clouds.",
                isTrue: false,
                reasoning: "Lenticular clouds are stationary markers of mountain waves. They stay in position as air flows through them."
            ),
            PracticeQuestion(
                id: "clouds-q3",
                type: .matchPairs,
                prompt: "Match the cloud type to what it indicates:",
                difficulty: .foundation,
                explanation: "Each cloud type signals specific atmospheric conditions and available lift.",
                matchPairs: [
                    MatchPair(left: "Cumulus", right: "Active thermals"),
                    MatchPair(left: "Lenticular", right: "Mountain wave"),
                    MatchPair(left: "Cumulonimbus", right: "Thunderstorm — avoid"),
                    MatchPair(left: "Stratus", right: "Stable air, no lift"),
                ]
            ),
            PracticeQuestion(
                id: "clouds-q4",
                type: .sequenceOrder,
                prompt: "Order these cloud features from least to most concerning for flight safety:",
                difficulty: .foundation,
                explanation: "Fair weather cumulus is safe and marks lift. Strong cumulus requires attention. Lenticular indicates waves with rotor danger. Cumulonimbus is an absolute avoid.",
                correctOrder: ["Fair weather cumulus", "Cumulus with building tops", "Lenticular with rotor clouds", "Cumulonimbus with anvil"],
                shuffledItems: ["Cumulonimbus with anvil", "Fair weather cumulus", "Lenticular with rotor clouds", "Cumulus with building tops"]
            ),
        ],
        synthesisPrompt: "Every cloud is a message about atmospheric motion. How does cloud identification connect to reading the sky for soaring flight? Think about what each cloud type tells you about where to fly and where to avoid.",
        conceptMapNodes: [
            ConceptMapNode(id: "clouds", label: "Clouds", domain: .weather, x: 0.5, y: 0.3, connections: ["reading-sky", "lapse-rates", "thermals"]),
            ConceptMapNode(id: "reading-sky", label: "Reading Sky", domain: .flying, x: 0.2, y: 0.6, connections: ["clouds"]),
            ConceptMapNode(id: "lapse-rates", label: "Lapse Rates", domain: .weather, x: 0.5, y: 0.6, connections: ["clouds"]),
            ConceptMapNode(id: "thermals", label: "Thermals", domain: .weather, x: 0.8, y: 0.6, connections: ["clouds"]),
        ]
    )

    // MARK: - Mountain Winds

    static let mountainWinds = Lesson(
        id: "mountain-winds",
        domain: .weather,
        teachingSteps: [
            TeachingStep(
                id: "mtn-winds-1",
                headline: "The Valley Breathing Cycle",
                body: "Mountain valleys breathe. By day, slopes heat and drive air upward — up-valley (anabatic) winds. By night, slopes cool and air sinks — down-valley (katabatic) winds. This daily cycle is as predictable as the sunrise.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.9, toX: 0.5, toY: 0.6, label: "Day: Upslope", color: "EF4444"),
                        DiagramArrow(fromX: 0.8, fromY: 0.9, toX: 0.5, toY: 0.6, label: "Day: Upslope", color: "EF4444"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 0.3, y: 0.4),
                        DiagramPoint(x: 0.5, y: 0.5),
                        DiagramPoint(x: 0.7, y: 0.4),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "wind",
                    labels: ["Valley cross-section", "Anabatic flow"]
                ),
                interactionHint: nil,
                revealItems: nil,
                mapConfig: MapConfig(
                    centerLat: 46.5936,
                    centerLon: 7.9086,
                    spanLat: 0.04,
                    spanLon: 0.04,
                    pins: [
                        MapPinData(id: "lauterbrunnen", lat: 46.5936, lon: 7.9086, label: "Lauterbrunnen Valley"),
                        MapPinData(id: "stechelberg", lat: 46.5592, lon: 7.8981, label: "Stechelberg"),
                        MapPinData(id: "murren", lat: 46.5592, lon: 7.8925, label: "Mürren 1,638m")
                    ]
                )
            ),
            TeachingStep(
                id: "mtn-winds-2",
                headline: "Anabatic Winds: Upslope",
                body: "Morning sun heats the slopes. Air warms, becomes buoyant, and flows upward. By afternoon, strong up-valley winds develop — drawing air from lower elevations. This flow feeds thermals and creates ridge lift on sunny slopes.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.1, fromY: 0.85, toX: 0.3, toY: 0.5, label: "", color: "EF4444"),
                        DiagramArrow(fromX: 0.3, fromY: 0.5, toX: 0.5, toY: 0.3, label: "Upslope", color: "EF4444"),
                        DiagramArrow(fromX: 0.7, fromY: 0.5, toX: 0.5, toY: 0.3, label: "", color: "EF4444"),
                        DiagramArrow(fromX: 0.9, fromY: 0.85, toX: 0.7, toY: 0.5, label: "", color: "EF4444"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 0.3, y: 0.4),
                        DiagramPoint(x: 0.5, y: 0.5),
                        DiagramPoint(x: 0.7, y: 0.4),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "wind",
                    labels: ["Daytime heating", "Up-valley convergence"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "mtn-winds-3",
                headline: "Katabatic Winds: Downslope",
                body: "After sunset, slopes radiate heat and cool rapidly. Cold air is dense — it sinks and flows downslope like water. Down-valley (katabatic) winds develop, draining cold air toward lower elevations. This creates temperature inversions in valleys.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.3, fromY: 0.5, toX: 0.1, toY: 0.85, label: "Downslope", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.4, toX: 0.3, toY: 0.6, label: "", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.4, toX: 0.7, toY: 0.6, label: "", color: "3B82F6"),
                        DiagramArrow(fromX: 0.7, fromY: 0.5, toX: 0.9, toY: 0.85, label: "", color: "3B82F6"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 0.3, y: 0.4),
                        DiagramPoint(x: 0.5, y: 0.5),
                        DiagramPoint(x: 0.7, y: 0.4),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "wind",
                    labels: ["Nighttime cooling", "Cold air drainage"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "mtn-winds-4",
                headline: "Sea Breeze Circulation",
                body: "Near coasts, land heats faster than water by day. Warm air rises over land, cool air flows in from the sea — the sea breeze. By late afternoon, this breeze can penetrate 50+ km inland, creating convergence zones with inland valley winds.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.1, fromY: 0.7, toX: 0.5, toY: 0.7, label: "Sea breeze", color: "3B82F6"),
                        DiagramArrow(fromX: 0.7, fromY: 0.6, toX: 0.9, toY: 0.4, label: "Rising air", color: "EF4444"),
                        DiagramArrow(fromX: 0.9, fromY: 0.3, toX: 0.3, toY: 0.3, label: "Return flow", color: "F59E0B"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.7),
                        DiagramPoint(x: 0.4, y: 0.7),
                        DiagramPoint(x: 0.6, y: 0.5),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "wind",
                    labels: ["Ocean", "Land", "Sea breeze front"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "mtn-winds-q1",
                type: .multipleChoice,
                prompt: "It's 2pm in an alpine valley. Which direction is the valley wind most likely blowing?",
                difficulty: .intermediate,
                explanation: "By afternoon, solar heating of the slopes creates strong up-valley (anabatic) winds. Heated air rises, drawing air up from the valley mouth.",
                options: [
                    PracticeOption(label: "Up-valley (anabatic)", correct: true, explanation: "Afternoon heating drives strong up-valley flow."),
                    PracticeOption(label: "Down-valley (katabatic)", correct: false, explanation: "Down-valley winds occur at night when slopes cool."),
                    PracticeOption(label: "Calm — the transition period", correct: false, explanation: "Transition periods are around 9-10am and 6-8pm. 2pm is peak anabatic flow."),
                    PracticeOption(label: "Cross-valley only", correct: false, explanation: "The dominant flow at 2pm is up-valley."),
                ]
            ),
            PracticeQuestion(
                id: "mtn-winds-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Katabatic (downslope) winds create temperature inversions as cold dense air drains into valleys. The coldest air settles at the valley floor, with warmer air above — an inversion.",
                statement: "Katabatic winds create temperature inversions in valleys.",
                isTrue: true,
                reasoning: "Cold air drainage concentrates dense, cold air at valley floors with warmer air above — the definition of an inversion."
            ),
            PracticeQuestion(
                id: "mtn-winds-q3",
                type: .sequenceOrder,
                prompt: "Order these events in the daily valley wind cycle:",
                difficulty: .intermediate,
                explanation: "The daily cycle follows solar heating: morning calm, developing upslope flow, peak afternoon up-valley wind, evening transition, nighttime downslope drainage.",
                correctOrder: ["Sunrise — calm transition", "Slopes heat — upslope winds begin", "Afternoon — strong up-valley flow", "Sunset — transition period", "Night — down-valley katabatic flow"],
                shuffledItems: ["Night — down-valley katabatic flow", "Afternoon — strong up-valley flow", "Sunrise — calm transition", "Sunset — transition period", "Slopes heat — upslope winds begin"]
            ),
            PracticeQuestion(
                id: "mtn-winds-q4",
                type: .matchPairs,
                prompt: "Match the wind type to its characteristics:",
                difficulty: .intermediate,
                explanation: "Each mountain wind has distinct triggers and behaviors based on heating/cooling cycles.",
                matchPairs: [
                    MatchPair(left: "Anabatic", right: "Daytime upslope flow"),
                    MatchPair(left: "Katabatic", right: "Nighttime downslope drainage"),
                    MatchPair(left: "Sea breeze", right: "Afternoon onshore flow"),
                    MatchPair(left: "Transition period", right: "Morning/evening calm"),
                ]
            ),
        ],
        synthesisPrompt: "Mountain valleys breathe daily — upslope by day, downslope by night. How does understanding this cycle connect to valley flying tactics and avalanche weather loading? Think about timing and wind direction.",
        conceptMapNodes: [
            ConceptMapNode(id: "mountain-winds", label: "Mountain Winds", domain: .weather, x: 0.5, y: 0.3, connections: ["valley-flying", "weather-loading", "convergence"]),
            ConceptMapNode(id: "valley-flying", label: "Valley Flying", domain: .flying, x: 0.2, y: 0.6, connections: ["mountain-winds"]),
            ConceptMapNode(id: "weather-loading", label: "Weather Loading", domain: .avalanche, x: 0.5, y: 0.6, connections: ["mountain-winds"]),
            ConceptMapNode(id: "convergence", label: "Convergence", domain: .weather, x: 0.8, y: 0.6, connections: ["mountain-winds"]),
        ]
    )

    // MARK: - Mountain Waves

    static let mountainWaves = Lesson(
        id: "mountain-waves",
        domain: .weather,
        teachingSteps: [
            TeachingStep(
                id: "waves-1",
                headline: "Standing Waves in the Sky",
                body: "When stable air flows over a mountain ridge, it creates a wave pattern downwind — like water flowing over a rock. The wave is stationary (the air flows through it), smooth and powerful aloft, but violent rotors below.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.1, fromY: 0.5, toX: 0.9, toY: 0.5, label: "Wind flow", color: "3B82F6"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.7),
                        DiagramPoint(x: 0.3, y: 0.4),
                        DiagramPoint(x: 0.5, y: 0.5),
                        DiagramPoint(x: 0.7, y: 0.6),
                        DiagramPoint(x: 1.0, y: 0.7),
                    ],
                    overlayType: "waves",
                    labels: ["Ridge", "Wave crests", "Smooth lift aloft"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "waves-2",
                headline: "Wave Formation Requirements",
                body: "Three ingredients create mountain waves: (1) Wind perpendicular to ridge at 15+ knots, (2) Stable air (inversion or strong stability), (3) Increasing wind with altitude. Missing any one and waves won't form or will be weak.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.0, fromY: 0.6, toX: 0.3, toY: 0.5, label: "15+ kt", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.5, toY: 0.2, label: "Stable layer", color: "F59E0B"),
                        DiagramArrow(fromX: 0.7, fromY: 0.4, toX: 0.9, toY: 0.35, label: "Wind increases", color: "22C55E"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.7),
                        DiagramPoint(x: 0.3, y: 0.4),
                        DiagramPoint(x: 0.5, y: 0.5),
                        DiagramPoint(x: 0.7, y: 0.6),
                        DiagramPoint(x: 1.0, y: 0.7),
                    ],
                    overlayType: "waves",
                    labels: ["All 3 required"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "waves-3",
                headline: "Rotor Zone: The Danger Below",
                body: "Below the smooth wave, the rotor zone is a horizontal vortex of violent turbulence. Rotors can flip aircraft, break structures, and create extreme downdrafts. Lenticular clouds mark wave crests; rotor clouds mark the turbulent zone below.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.35, toX: 0.5, toY: 0.25, label: "Smooth lift", color: "22C55E"),
                        DiagramArrow(fromX: 0.6, fromY: 0.6, toX: 0.55, toY: 0.65, label: "Rotor", color: "EF4444"),
                        DiagramArrow(fromX: 0.55, fromY: 0.65, toX: 0.6, toY: 0.6, label: "", color: "EF4444"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.7),
                        DiagramPoint(x: 0.3, y: 0.4),
                        DiagramPoint(x: 0.5, y: 0.5),
                        DiagramPoint(x: 0.7, y: 0.6),
                        DiagramPoint(x: 1.0, y: 0.7),
                    ],
                    overlayType: "waves",
                    labels: ["Lenticular aloft", "Violent rotor below", "Extreme turbulence"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "waves-4",
                headline: "Foehn Winds",
                body: "When stable air is forced over a mountain, it warms adiabatically on descent — creating warm, dry, gusty winds on the lee side (foehn winds). These winds can be 20-30°C warmer than the windward side and cause rapid snowmelt and fire danger.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.1, fromY: 0.65, toX: 0.3, toY: 0.5, label: "Cool", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.7, toY: 0.65, label: "Warming", color: "F59E0B"),
                        DiagramArrow(fromX: 0.7, fromY: 0.65, toX: 0.95, toY: 0.7, label: "Warm & dry", color: "EF4444"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.7),
                        DiagramPoint(x: 0.3, y: 0.4),
                        DiagramPoint(x: 0.5, y: 0.5),
                        DiagramPoint(x: 0.7, y: 0.6),
                        DiagramPoint(x: 1.0, y: 0.7),
                    ],
                    overlayType: "wind",
                    labels: ["Windward", "Lee side", "Foehn"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "waves-q1",
                type: .multipleChoice,
                prompt: "You observe smooth lens-shaped clouds above a ridge with turbulence reported below 8,000ft. What is happening?",
                difficulty: .advanced,
                explanation: "Lenticular clouds mark mountain wave crests — smooth, powerful lift aloft. The turbulence below indicates active rotor zones, which are extremely dangerous.",
                options: [
                    PracticeOption(label: "Mountain wave with dangerous rotor turbulence below", correct: true, explanation: "Classic wave setup: lenticular aloft, rotors below."),
                    PracticeOption(label: "Thunderstorm developing behind the ridge", correct: false, explanation: "Lenticular clouds are smooth and stationary, not convective."),
                    PracticeOption(label: "Temperature inversion trapping pollution", correct: false, explanation: "Inversions contribute to wave formation but don't create lenticular stacks."),
                    PracticeOption(label: "Sea breeze convergence", correct: false, explanation: "Sea breeze creates different cloud patterns, not smooth lenticular."),
                ]
            ),
            PracticeQuestion(
                id: "waves-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .advanced,
                explanation: "Wave formation requires (1) perpendicular wind 15+ kt, (2) stable air, and (3) wind increasing with altitude. All three must be present.",
                statement: "Mountain waves can form with light winds if the air is sufficiently unstable.",
                isTrue: false,
                reasoning: "Waves require stable air (not unstable) and winds of at least 15 knots. Unstable air creates thermals, not waves."
            ),
            PracticeQuestion(
                id: "waves-q3",
                type: .matchPairs,
                prompt: "Match the wave component to its characteristic:",
                difficulty: .advanced,
                explanation: "Mountain waves have distinct zones with very different characteristics — smooth aloft, violent below.",
                matchPairs: [
                    MatchPair(left: "Wave crest", right: "Smooth powerful lift"),
                    MatchPair(left: "Lenticular cloud", right: "Stationary wave marker"),
                    MatchPair(left: "Rotor zone", right: "Violent turbulence"),
                    MatchPair(left: "Foehn wind", right: "Warm dry lee-side wind"),
                ]
            ),
            PracticeQuestion(
                id: "waves-q4",
                type: .sequenceOrder,
                prompt: "Order the conditions needed for strong mountain wave formation:",
                difficulty: .advanced,
                explanation: "Strong waves require the right combination of wind speed, stability, and wind profile. All must be present.",
                correctOrder: ["Stable air mass present", "Wind 15+ kt perpendicular to ridge", "Wind speed increases with altitude", "Mountain wave forms"],
                shuffledItems: ["Mountain wave forms", "Wind 15+ kt perpendicular to ridge", "Stable air mass present", "Wind speed increases with altitude"]
            ),
        ],
        synthesisPrompt: "Mountain waves are powerful but dangerous — smooth lift aloft, violent rotors below. How does understanding wave formation connect to convergence phenomena and pressure systems? Think about the role of stability and wind.",
        conceptMapNodes: [
            ConceptMapNode(id: "mountain-waves", label: "Mountain Waves", domain: .weather, x: 0.5, y: 0.3, connections: ["pressure-systems", "convergence-sea-breeze", "clouds"]),
            ConceptMapNode(id: "pressure-systems", label: "Pressure Systems", domain: .weather, x: 0.2, y: 0.6, connections: ["mountain-waves"]),
            ConceptMapNode(id: "convergence-sea-breeze", label: "Convergence", domain: .flying, x: 0.5, y: 0.7, connections: ["mountain-waves"]),
            ConceptMapNode(id: "clouds", label: "Clouds", domain: .weather, x: 0.8, y: 0.6, connections: ["mountain-waves"]),
        ]
    )

    // MARK: - Convergence

    static let convergence = Lesson(
        id: "convergence",
        domain: .weather,
        teachingSteps: [
            TeachingStep(
                id: "convergence-1",
                headline: "Where Air Masses Collide",
                body: "When two air masses flow toward each other, the air has nowhere to go but up. This forced lifting creates convergence zones — invisible highways of reliable, strong lift.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.5, toX: 0.5, toY: 0.5, label: "Air mass 1", color: "3B82F6"),
                        DiagramArrow(fromX: 0.8, fromY: 0.5, toX: 0.5, toY: 0.5, label: "Air mass 2", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.2, label: "Forced lift", color: "22C55E"),
                    ],
                    centerLabel: "Convergence"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "convergence-2",
                headline: "Types of Convergence",
                body: "Convergence forms from multiple sources: sea breeze fronts meeting valley winds, opposing valley wind systems colliding, wind flowing around obstacles and rejoining downwind. Each creates a line or zone of organized lift.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.15, fromY: 0.3, toX: 0.4, toY: 0.3, label: "Sea breeze", color: "3B82F6"),
                        DiagramArrow(fromX: 0.6, fromY: 0.3, toX: 0.4, toY: 0.3, label: "Thermal wind", color: "EF4444"),
                        DiagramArrow(fromX: 0.45, fromY: 0.3, toX: 0.45, toY: 0.15, label: "Lift", color: "22C55E"),
                        DiagramArrow(fromX: 0.15, fromY: 0.7, toX: 0.35, toY: 0.55, label: "Valley 1", color: "F59E0B"),
                        DiagramArrow(fromX: 0.65, fromY: 0.7, toX: 0.45, toY: 0.55, label: "Valley 2", color: "F59E0B"),
                        DiagramArrow(fromX: 0.4, fromY: 0.55, toX: 0.4, toY: 0.4, label: "Lift", color: "22C55E"),
                    ],
                    centerLabel: "Multiple sources"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "convergence-3",
                headline: "Cloud Streets Mark the Line",
                body: "Convergence zones often produce cloud streets — long linear rows of cumulus aligned with the convergence. These streets can extend 100+ km and provide continuous lift for cross-country flying.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.3, fromY: 0.7, toX: 0.5, toY: 0.5, label: "", color: "3B82F6"),
                        DiagramArrow(fromX: 0.7, fromY: 0.7, toX: 0.5, toY: 0.5, label: "", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.2, label: "Cloud street", color: "22C55E"),
                    ],
                    centerLabel: "Linear lift highway"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "convergence-4",
                headline: "Timing and Strength",
                body: "Convergence strength varies through the day. Sea breeze convergence builds in afternoon as the sea breeze penetrates inland. Valley convergence peaks when both systems are at full strength — typically mid-to-late afternoon.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.4, toX: 0.5, toY: 0.4, label: "Weak AM", color: "06B6D4"),
                        DiagramArrow(fromX: 0.8, fromY: 0.4, toX: 0.5, toY: 0.4, label: "", color: "06B6D4"),
                        DiagramArrow(fromX: 0.5, fromY: 0.4, toX: 0.5, toY: 0.35, label: "", color: "06B6D4"),
                        DiagramArrow(fromX: 0.15, fromY: 0.6, toX: 0.5, toY: 0.6, label: "Strong PM", color: "EF4444"),
                        DiagramArrow(fromX: 0.85, fromY: 0.6, toX: 0.5, toY: 0.6, label: "", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.6, toX: 0.5, toY: 0.5, label: "", color: "EF4444"),
                    ],
                    centerLabel: "Afternoon peak"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "convergence-q1",
                type: .multipleChoice,
                prompt: "You see a distinct cloud line extending 50km inland, parallel to the coast. What is this?",
                difficulty: .advanced,
                explanation: "A cloud line parallel to the coast indicates sea breeze convergence — where the sea breeze meets warmer inland air and forces it upward.",
                options: [
                    PracticeOption(label: "Sea breeze convergence — fly along it for sustained lift", correct: true, explanation: "Classic sea breeze front with convergence lift."),
                    PracticeOption(label: "Cold front approaching from the ocean", correct: false, explanation: "Sea breeze convergence is a local daily phenomenon, not a synoptic front."),
                    PracticeOption(label: "Mountain wave cloud street", correct: false, explanation: "Mountain waves create lenticular, not cumulus streets."),
                    PracticeOption(label: "Wind shear line to avoid", correct: false, explanation: "Convergence creates lift, not dangerous shear."),
                ]
            ),
            PracticeQuestion(
                id: "convergence-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .advanced,
                explanation: "Convergence zones produce some of the strongest and most reliable lift available. The organized vertical motion can sustain flights for hours along the convergence line.",
                statement: "Convergence lift is typically weak and unreliable compared to thermals.",
                isTrue: false,
                reasoning: "Convergence zones produce strong, organized lift that is often more reliable than individual thermals."
            ),
            PracticeQuestion(
                id: "convergence-q3",
                type: .sequenceOrder,
                prompt: "Order these events in the development of sea breeze convergence:",
                difficulty: .advanced,
                explanation: "Sea breeze convergence develops as land-sea temperature differences create circulation, with the front penetrating inland through the day.",
                correctOrder: ["Morning sun heats land", "Sea breeze begins", "Front moves inland", "Convergence zone strengthens", "Cloud street forms"],
                shuffledItems: ["Cloud street forms", "Sea breeze begins", "Convergence zone strengthens", "Morning sun heats land", "Front moves inland"]
            ),
            PracticeQuestion(
                id: "convergence-q4",
                type: .matchPairs,
                prompt: "Match the convergence type to its typical timing:",
                difficulty: .advanced,
                explanation: "Different convergence types peak at different times based on the heating/cooling cycles that drive them.",
                matchPairs: [
                    MatchPair(left: "Sea breeze convergence", right: "Afternoon — strongest 2-5pm"),
                    MatchPair(left: "Valley wind convergence", right: "Late afternoon peak"),
                    MatchPair(left: "Terrain-induced convergence", right: "All day when wind present"),
                    MatchPair(left: "Thermal-driven convergence", right: "Midday to afternoon"),
                ]
            ),
        ],
        synthesisPrompt: "Convergence zones are invisible highways of lift created when air masses collide. How does this connect to sea breeze phenomena and cross-country flying tactics? Think about predictability and route planning.",
        conceptMapNodes: [
            ConceptMapNode(id: "convergence", label: "Convergence", domain: .weather, x: 0.5, y: 0.3, connections: ["convergence-sea-breeze", "mountain-winds", "xc-tactics"]),
            ConceptMapNode(id: "convergence-sea-breeze", label: "Convergence & Sea Breeze", domain: .flying, x: 0.2, y: 0.6, connections: ["convergence"]),
            ConceptMapNode(id: "mountain-winds", label: "Mountain Winds", domain: .weather, x: 0.5, y: 0.6, connections: ["convergence"]),
            ConceptMapNode(id: "xc-tactics", label: "XC Tactics", domain: .flying, x: 0.8, y: 0.6, connections: ["convergence"]),
        ]
    )

    // MARK: - Thunderstorms

    static let thunderstorms = Lesson(
        id: "thunderstorms",
        domain: .weather,
        teachingSteps: [
            TeachingStep(
                id: "storms-1",
                headline: "The Four Ingredients",
                body: "Thunderstorms require four ingredients: (1) Instability, (2) Moisture, (3) Trigger mechanism, (4) Wind shear. All four must be present. Missing any one and the storm doesn't form. Understand all four to predict and avoid.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "instability", label: "Instability", description: "Steep lapse rate — air accelerates upward", color: "EF4444"),
                        DiagramVertex(id: "moisture", label: "Moisture", description: "High dewpoint — fuel for convection", color: "3B82F6"),
                        DiagramVertex(id: "trigger", label: "Trigger", description: "Fronts, convergence, terrain — initiates lift", color: "F59E0B"),
                    ],
                    centerLabel: "Wind Shear",
                    centerDescription: "Organizes storms, creates supercells"
                ),
                interactionHint: "Tap each ingredient to learn more",
                revealItems: nil
            ),
            TeachingStep(
                id: "storms-2",
                headline: "Storm Lifecycle",
                body: "Thunderstorms have three stages: (1) Towering cumulus — all updraft, (2) Mature — updrafts and downdrafts, most dangerous, (3) Dissipating — all downdraft, weakening. The mature stage produces extreme weather: lightning, hail, tornadoes, microbursts.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "towering", label: "Towering", description: "15-30 min. All updraft, rapid growth", color: "F59E0B"),
                        DiagramVertex(id: "mature", label: "Mature", description: "30+ min. Peak intensity, extreme weather", color: "EF4444"),
                        DiagramVertex(id: "dissipating", label: "Dissipating", description: "Downdrafts dominate, weakening", color: "3B82F6"),
                    ],
                    centerLabel: "Lifecycle",
                    centerDescription: "Towering → Mature → Dissipating"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "storms-3",
                headline: "Wind Shear: The Organizer",
                body: "Wind shear (changing wind speed or direction with altitude) organizes thunderstorms. No shear: storms are short-lived. Moderate shear: storms become organized and long-lasting. Strong shear: supercells with rotating updrafts — the most dangerous storms.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "no-shear", label: "No Shear", description: "Air mass storms — brief, disorganized", color: "3B82F6"),
                        DiagramVertex(id: "moderate", label: "Moderate Shear", description: "Multicell storms — organized, longer-lasting", color: "F59E0B"),
                        DiagramVertex(id: "strong", label: "Strong Shear", description: "Supercells — rotating, most dangerous", color: "EF4444"),
                    ],
                    centerLabel: "Shear Effect",
                    centerDescription: "More shear = more organized = more dangerous"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "storms-4",
                headline: "Avoidance Rules",
                body: "Never enter a thunderstorm. Stay 20+ miles away from severe storms. Never fly under an anvil — hail and downdrafts extend far beyond the visible cloud. If caught near a storm, land immediately or divert 90° from its path.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "distance", label: "Distance", description: "20+ miles from severe storms", color: "22C55E"),
                        DiagramVertex(id: "anvil", label: "Avoid Anvil", description: "Never fly under — hail extends far", color: "EF4444"),
                        DiagramVertex(id: "escape", label: "Escape", description: "Land or 90° diversion", color: "F59E0B"),
                    ],
                    centerLabel: "Safety Rules",
                    centerDescription: "Avoidance is the only option"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "storms-q1",
                type: .multipleChoice,
                prompt: "You have instability, moisture, and an approaching cold front. Wind shear is moderate. Assess the thunderstorm risk.",
                difficulty: .advanced,
                explanation: "All four ingredients are present: instability, moisture, trigger (cold front), and shear. Moderate shear means storms will be organized and long-lasting — high risk.",
                options: [
                    PracticeOption(label: "High risk — all four ingredients present, expect organized storms", correct: true, explanation: "All ingredients align. Moderate shear organizes storms."),
                    PracticeOption(label: "Low risk — wind shear prevents storm formation", correct: false, explanation: "Shear organizes storms, it doesn't prevent them."),
                    PracticeOption(label: "Moderate risk — missing the trigger mechanism", correct: false, explanation: "The cold front IS the trigger mechanism."),
                    PracticeOption(label: "No risk — one ingredient missing", correct: false, explanation: "All four ingredients are present."),
                ]
            ),
            PracticeQuestion(
                id: "storms-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .advanced,
                explanation: "Wind shear organizes thunderstorms and makes them longer-lasting and more dangerous. Strong shear can create supercells — the most dangerous storm type.",
                statement: "Wind shear weakens thunderstorms by disrupting the updraft.",
                isTrue: false,
                reasoning: "Wind shear actually organizes storms, separating updraft and downdraft and making storms longer-lasting and more severe."
            ),
            PracticeQuestion(
                id: "storms-q3",
                type: .sequenceOrder,
                prompt: "Order the thunderstorm lifecycle stages:",
                difficulty: .advanced,
                explanation: "Storms develop through three stages: towering cumulus (growth), mature (peak intensity), dissipating (weakening).",
                correctOrder: ["Towering cumulus stage", "Mature stage with updrafts and downdrafts", "Dissipating stage", "Storm weakens and ends"],
                shuffledItems: ["Storm weakens and ends", "Mature stage with updrafts and downdrafts", "Towering cumulus stage", "Dissipating stage"]
            ),
            PracticeQuestion(
                id: "storms-q4",
                type: .matchPairs,
                prompt: "Match the thunderstorm ingredient to its role:",
                difficulty: .advanced,
                explanation: "Each of the four ingredients plays a specific role in storm formation and intensity.",
                matchPairs: [
                    MatchPair(left: "Instability", right: "Drives upward acceleration"),
                    MatchPair(left: "Moisture", right: "Provides latent heat energy"),
                    MatchPair(left: "Trigger", right: "Initiates the updraft"),
                    MatchPair(left: "Wind shear", right: "Organizes the storm"),
                ]
            ),
        ],
        synthesisPrompt: "Thunderstorms are the atmosphere's most violent phenomenon — requiring four ingredients to form. How does systematic storm assessment connect to avalanche decision frameworks? Think about ingredient-based risk assessment.",
        conceptMapNodes: [
            ConceptMapNode(id: "thunderstorms", label: "Thunderstorms", domain: .weather, x: 0.5, y: 0.3, connections: ["fronts", "lapse-rates", "decision-framework"]),
            ConceptMapNode(id: "fronts", label: "Fronts", domain: .weather, x: 0.2, y: 0.6, connections: ["thunderstorms"]),
            ConceptMapNode(id: "lapse-rates", label: "Lapse Rates", domain: .weather, x: 0.5, y: 0.6, connections: ["thunderstorms"]),
            ConceptMapNode(id: "decision-framework", label: "Decision Framework", domain: .avalanche, x: 0.8, y: 0.6, connections: ["thunderstorms"]),
        ]
    )
}
