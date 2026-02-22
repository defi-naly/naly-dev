import Foundation

enum AvalancheLessons {

    // MARK: - Avalanche Triangle

    static let avalancheTriangle = Lesson(
        id: "avalanche-triangle",
        domain: .avalanche,
        teachingSteps: [
            TeachingStep(
                id: "triangle-1",
                headline: "Three Sides of the Triangle",
                body: "Every avalanche requires three factors: unstable terrain (slope angle, traps), weather (precipitation, wind, temperature), and snowpack (weak layers, slabs). Remove any one side and the triangle collapses — no avalanche.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "terrain", label: "TERRAIN", description: "Slope angle 30-45°, terrain traps, aspect", color: "EF4444"),
                        DiagramVertex(id: "weather", label: "WEATHER", description: "Loading: wind, precipitation, temperature changes", color: "F59E0B"),
                        DiagramVertex(id: "snowpack", label: "SNOWPACK", description: "Weak layers, slab formation, bonding", color: "3B82F6"),
                    ],
                    centerLabel: "HUMAN",
                    centerDescription: "Decision-making under uncertainty"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "triangle-2",
                headline: "The Human Factor in the Center",
                body: "The avalanche triangle has a fourth element at its center: the human factor. Even when terrain, weather, and snowpack align for danger, humans choose whether to enter. Biases like familiarity, commitment, and social proof often override rational assessment.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "terrain", label: "TERRAIN", description: "Where we choose to go", color: "EF4444"),
                        DiagramVertex(id: "weather", label: "WEATHER", description: "Conditions we can't control", color: "F59E0B"),
                        DiagramVertex(id: "snowpack", label: "SNOWPACK", description: "Hidden structure we must assess", color: "3B82F6"),
                    ],
                    centerLabel: "HUMAN",
                    centerDescription: "Heuristic traps, group dynamics, risk perception"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "triangle-3",
                headline: "Combined Factor Assessment",
                body: "Each side of the triangle exists on a spectrum from safe to dangerous. A 25° slope is low risk. A 38° slope is high risk. Recent wind loading is worse than settled snow. The danger is not additive — it's multiplicative. When all three sides are elevated, the risk compounds exponentially.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "terrain", label: "TERRAIN", description: "35° north-facing slope with gully", color: "EF4444"),
                        DiagramVertex(id: "weather", label: "WEATHER", description: "30cm new snow + 48hr wind loading", color: "F59E0B"),
                        DiagramVertex(id: "snowpack", label: "SNOWPACK", description: "Buried surface hoar on north aspects", color: "3B82F6"),
                    ],
                    centerLabel: "HIGH RISK",
                    centerDescription: "All three factors elevated — danger is multiplicative"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "triangle-4",
                headline: "Using the Triangle for Decisions",
                body: "Before committing to any slope, evaluate all three sides. Can you control terrain by choosing a different aspect or angle? No. Can you control weather? No. Can you control snowpack? No. But you CAN control whether you expose yourself to the combination. That's the decision.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "terrain", label: "TERRAIN", description: "Choose slopes <30° or different aspects", color: "22C55E"),
                        DiagramVertex(id: "weather", label: "WEATHER", description: "Wait for conditions to stabilize", color: "22C55E"),
                        DiagramVertex(id: "snowpack", label: "SNOWPACK", description: "Test before committing", color: "22C55E"),
                    ],
                    centerLabel: "RETREAT",
                    centerDescription: "When in doubt, choose the conservative option"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "triangle-q1",
                type: .multipleChoice,
                prompt: "The avalanche danger is rated Considerable. You're looking at a 35° north-facing slope with recent wind loading. Which side of the triangle is LEAST concerning?",
                difficulty: .foundation,
                explanation: "At Considerable danger, all three sides are elevated. Terrain (35° angle in danger zone), weather (wind loading), and snowpack (Considerable rating) all contribute. None is 'least' concerning — the combination is the problem.",
                options: [
                    PracticeOption(label: "All three sides are equally concerning — the combination creates the danger", correct: true, explanation: "When all three factors align, the risk is multiplicative."),
                    PracticeOption(label: "Weather — wind loading is temporary and will settle", correct: false, explanation: "Recent wind loading is a major red flag, not something to dismiss."),
                    PracticeOption(label: "Terrain — 35° is near the lower end of the danger zone", correct: false, explanation: "35° is well within the 30-45° danger zone where 93% of fatalities occur."),
                ]
            ),
            PracticeQuestion(
                id: "triangle-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Danger is multiplicative, not additive. When all three sides of the triangle are elevated simultaneously, the probability of an avalanche increases exponentially, not incrementally.",
                statement: "If terrain, weather, and snowpack are each at moderate risk, the overall avalanche danger is also moderate.",
                isTrue: false,
                reasoning: "Moderate + moderate + moderate doesn't equal moderate overall danger. The factors multiply each other. Three moderate factors together create high risk."
            ),
            PracticeQuestion(
                id: "triangle-q3",
                type: .matchPairs,
                prompt: "Match each side of the avalanche triangle to the factor you can directly control:",
                difficulty: .intermediate,
                explanation: "You cannot change terrain, weather, or snowpack. You can only control your exposure to the combination by choosing where and when to go.",
                matchPairs: [
                    MatchPair(left: "Terrain", right: "Choose alternative slope"),
                    MatchPair(left: "Weather", right: "Wait for stabilization"),
                    MatchPair(left: "Snowpack", right: "Test and assess before committing"),
                ]
            ),
            PracticeQuestion(
                id: "triangle-q4",
                type: .multipleChoice,
                prompt: "Your group wants to ski a 38° slope. The danger is Low, recent weather has been clear and cold, but you haven't assessed the snowpack. Should you proceed?",
                difficulty: .advanced,
                explanation: "Even at Low danger, a 38° slope requires snowpack assessment. Low danger doesn't mean no danger — it means avalanches are unlikely but possible in specific terrain. The slope angle alone puts you in the danger zone.",
                options: [
                    PracticeOption(label: "No — assess the snowpack first. Low danger doesn't eliminate risk on steep terrain.", correct: true, explanation: "38° is prime avalanche terrain. Low danger means unlikely, not impossible."),
                    PracticeOption(label: "Yes — Low danger means the snowpack is stable everywhere", correct: false, explanation: "Low danger is a regional forecast. Specific slopes can still have isolated instabilities."),
                    PracticeOption(label: "Yes — clear and cold weather means the snowpack is well-bonded", correct: false, explanation: "Clear and cold can produce surface hoar, a dangerous weak layer when buried."),
                ]
            ),
        ],
        synthesisPrompt: "The avalanche triangle is a mental model, not a guarantee. When all three sides are green, proceed with caution. When any side is red, heighten your assessment. When multiple sides are red, retreat is the only rational choice. How does this framework connect to the decision-making frameworks you'll learn later?",
        conceptMapNodes: [
            ConceptMapNode(id: "avalanche-triangle", label: "Avalanche Triangle", domain: .avalanche, x: 0.5, y: 0.2, connections: ["slope-angle", "weather-loading", "snowpack-layers", "human-factors"]),
            ConceptMapNode(id: "slope-angle", label: "Slope Angle", domain: .avalanche, x: 0.3, y: 0.5, connections: ["avalanche-triangle"]),
            ConceptMapNode(id: "weather-loading", label: "Weather Loading", domain: .avalanche, x: 0.7, y: 0.5, connections: ["avalanche-triangle"]),
            ConceptMapNode(id: "human-factors", label: "Human Factors", domain: .avalanche, x: 0.5, y: 0.7, connections: ["avalanche-triangle", "decision-framework"]),
        ]
    )

    // MARK: - Slab Physics

    static let slabPhysics = Lesson(
        id: "slab-physics",
        domain: .avalanche,
        teachingSteps: [
            TeachingStep(
                id: "slab-1",
                headline: "What Is a Slab?",
                body: "A slab avalanche is a cohesive layer of snow resting on a weak layer. The slab acts as a single unit — when it breaks, it breaks everywhere at once. Think of it as a dinner plate balanced on ball bearings. It's stable until one critical point fails.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "surface", name: "Surface snow", color: "F9FAFB", heightRatio: 0.15, description: "Recent snowfall, light and unconsolidated"),
                        DiagramLayer(id: "slab", name: "SLAB (cohesive)", color: "3B82F6", heightRatio: 0.4, description: "Wind-deposited or settled snow — acts as single unit"),
                        DiagramLayer(id: "weak", name: "WEAK LAYER", color: "EF4444", heightRatio: 0.05, description: "Surface hoar, facets, or depth hoar"),
                        DiagramLayer(id: "old", name: "Old snow base", color: "D1D5DB", heightRatio: 0.4, description: "Well-bonded layers from previous storms"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "slab-2",
                headline: "The Weak Layer Fails First",
                body: "Avalanches don't release because the slab is heavy — they release because the weak layer underneath fails. When stress (gravity + additional load like a skier) exceeds the strength of the weak layer, it collapses. The failure starts at one point and propagates across the slope at 100 meters per second.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "slab", name: "SLAB", color: "3B82F6", heightRatio: 0.5, description: "40cm hard wind slab — stores elastic energy"),
                        DiagramLayer(id: "weak", name: "WEAK LAYER (failing)", color: "EF4444", heightRatio: 0.05, description: "Faceted grains — poor bonding, collapsing under stress"),
                        DiagramLayer(id: "old", name: "Base", color: "D1D5DB", heightRatio: 0.45, description: "Stable foundation"),
                    ],
                    highlightIndex: 1
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "slab-3",
                headline: "Fracture Propagation",
                body: "When the weak layer fails at one point, the fracture propagates horizontally across the slope. If the weak layer is continuous and the slab is cohesive, the entire slope can release from a single trigger point. This is why remote triggering is possible — you can trigger a slide from 50 meters away.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "slab", name: "SLAB (releasing)", color: "3B82F6", heightRatio: 0.5, description: "Entire layer moving as single unit"),
                        DiagramLayer(id: "weak", name: "WEAK LAYER (failed)", color: "EF4444", heightRatio: 0.05, description: "Complete bond failure across slope"),
                        DiagramLayer(id: "old", name: "Bed surface", color: "D1D5DB", heightRatio: 0.45, description: "Sliding surface exposed"),
                    ],
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.25, toX: 0.5, toY: 0.5, label: "Fracture propagates 100m/s", color: "EF4444")
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "slab-4",
                headline: "Hard Slabs Are More Dangerous",
                body: "A hard slab stores more elastic energy than a soft slab. When it releases, it breaks into large blocks that accelerate faster and travel farther. A soft slab might run 100 meters. A hard wind slab can run 500 meters and bury you under tons of concrete-hard debris.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "hard-slab", name: "HARD WIND SLAB", color: "1E40AF", heightRatio: 0.5, description: "Dense, cohesive — high energy storage"),
                        DiagramLayer(id: "weak", name: "Depth hoar", color: "EF4444", heightRatio: 0.05, description: "Persistent weak layer"),
                        DiagramLayer(id: "old", name: "Base", color: "D1D5DB", heightRatio: 0.45, description: "Old snow"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "slab-5",
                headline: "Recognizing Slab Conditions",
                body: "Look for signs: hollow 'whumpfing' sounds when you step, shooting cracks radiating from your skis, wind-scoured ridges with pillowy deposits on the lee side. These are all evidence that a cohesive slab sits on a weak layer — the setup for a slab avalanche.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "wind-deposit", name: "Wind slab (lee side)", color: "60A5FA", heightRatio: 0.45, description: "Pillowy wind deposits"),
                        DiagramLayer(id: "weak", name: "Weak interface", color: "EF4444", heightRatio: 0.05, description: "Old snow surface + faceting"),
                        DiagramLayer(id: "old", name: "Old snow", color: "D1D5DB", heightRatio: 0.5, description: "Scoured by wind"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "slab-q1",
                type: .multipleChoice,
                prompt: "What layer fails first in a slab avalanche?",
                difficulty: .foundation,
                explanation: "The weak layer underneath the slab fails first. The slab itself is strong — it's the failure of the weak layer underneath that allows the slab to release.",
                options: [
                    PracticeOption(label: "The weak layer underneath the slab", correct: true, explanation: "Weak layer failure triggers the avalanche."),
                    PracticeOption(label: "The slab itself breaks apart", correct: false, explanation: "The slab is cohesive. It's the weak layer that fails."),
                    PracticeOption(label: "The old snow base collapses", correct: false, explanation: "The base is typically strong. The weak layer between slab and base fails."),
                ]
            ),
            PracticeQuestion(
                id: "slab-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Soft slabs are generally less dangerous because they store less elastic energy, break into smaller pieces, and don't travel as far. Hard wind slabs are the most destructive.",
                statement: "A soft slab is more dangerous than a hard slab because it's harder to detect.",
                isTrue: false,
                reasoning: "Hard slabs store more energy and produce more destructive avalanches. Soft slabs break into smaller pieces and don't travel as far."
            ),
            PracticeQuestion(
                id: "slab-q3",
                type: .multipleChoice,
                prompt: "You're skinning uphill and hear a 'whumpf' sound with the snowpack settling around you. What does this indicate?",
                difficulty: .intermediate,
                explanation: "A 'whumpf' or collapsing sound is a major red flag. It means a weak layer just failed under your weight, and the slab settled. This indicates slab avalanche conditions — you should retreat immediately.",
                options: [
                    PracticeOption(label: "A weak layer just collapsed — slab avalanche conditions exist. Retreat.", correct: true, explanation: "Whumpfing is direct evidence of weak layer failure."),
                    PracticeOption(label: "The snowpack is settling naturally — this is normal and safe", correct: false, explanation: "Natural settlement doesn't produce whumpfing. This is a failure event."),
                    PracticeOption(label: "The snow is too soft — you need to find firmer snow", correct: false, explanation: "Whumpfing indicates a hard slab on a weak layer, not soft snow."),
                ]
            ),
            PracticeQuestion(
                id: "slab-q4",
                type: .sequenceOrder,
                prompt: "Order the sequence of events in a slab avalanche release:",
                difficulty: .foundation,
                explanation: "The sequence is: stress exceeds strength at one point → weak layer fails → fracture propagates across slope → entire slab releases as a unit.",
                correctOrder: [
                    "Stress exceeds strength at a trigger point",
                    "Weak layer fails at that point",
                    "Fracture propagates horizontally at 100m/s",
                    "Entire slab releases as single unit",
                ],
                shuffledItems: [
                    "Entire slab releases as single unit",
                    "Stress exceeds strength at a trigger point",
                    "Fracture propagates horizontally at 100m/s",
                    "Weak layer fails at that point",
                ]
            ),
        ],
        synthesisPrompt: "Understanding slab mechanics is fundamental to avalanche safety. Every stability test you perform is checking whether the weak layer can support the slab. Every decision about terrain is evaluating whether a slab can form there. How does this connect to snowpack layer assessment and stability testing?",
        conceptMapNodes: [
            ConceptMapNode(id: "slab-physics", label: "Slab Physics", domain: .avalanche, x: 0.5, y: 0.4, connections: ["snowpack-layers", "stability-testing", "avalanche-triangle"]),
            ConceptMapNode(id: "snowpack-layers", label: "Snowpack Layers", domain: .avalanche, x: 0.3, y: 0.6, connections: ["slab-physics"]),
            ConceptMapNode(id: "stability-testing", label: "Stability Testing", domain: .avalanche, x: 0.7, y: 0.6, connections: ["slab-physics"]),
            ConceptMapNode(id: "avalanche-triangle", label: "Avalanche Triangle", domain: .avalanche, x: 0.5, y: 0.2, connections: ["slab-physics"]),
        ]
    )

    // MARK: - Slope Angle

    static let slopeAngle = Lesson(
        id: "slope-angle",
        domain: .avalanche,
        teachingSteps: [
            TeachingStep(
                id: "slope-1",
                headline: "The Safe Zone",
                body: "Most slopes under 30° are safe from slab avalanches. The snow simply doesn't have enough gravitational pull to overcome the friction holding it in place. This is where you want to be when conditions are uncertain.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "safe", label: "Safe", minValue: 0, maxValue: 30, color: "22C55E", description: "Low angle — insufficient gravitational stress for slab release"),
                        DiagramZone(id: "danger", label: "DANGER ZONE", minValue: 30, maxValue: 45, color: "EF4444", description: "93% of avalanche fatalities occur on 30–45° slopes"),
                        DiagramZone(id: "slough", label: "Constant Slough", minValue: 45, maxValue: 60, color: "F59E0B", description: "Too steep for slabs to build — snow sloughs off continuously"),
                    ],
                    minValue: 0,
                    maxValue: 60,
                    unit: "°",
                    currentValue: 15
                ),
                interactionHint: "Drag the slider to explore different angles",
                revealItems: nil
            ),
            TeachingStep(
                id: "slope-2",
                headline: "The Killing Zone: 30°–45°",
                body: "93% of avalanche fatalities occur on slopes between 30° and 45°. At these angles, slabs can build up to dangerous depths AND gravity provides enough force to release them. The sweet spot for destruction.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "safe", label: "Safe", minValue: 0, maxValue: 30, color: "22C55E", description: "Low angle — insufficient gravitational stress"),
                        DiagramZone(id: "danger", label: "DANGER ZONE", minValue: 30, maxValue: 45, color: "EF4444", description: "Peak danger. 93% of fatalities."),
                        DiagramZone(id: "slough", label: "Constant Slough", minValue: 45, maxValue: 60, color: "F59E0B", description: "Too steep for slab accumulation"),
                    ],
                    minValue: 0,
                    maxValue: 60,
                    unit: "°",
                    currentValue: 38
                ),
                interactionHint: "Notice the slider is deep in the red zone",
                revealItems: nil
            ),
            TeachingStep(
                id: "slope-3",
                headline: "Too Steep for Slabs",
                body: "Above 45°, snow constantly sloughs off the slope. It can't accumulate into dangerous slabs. These slopes look scary but are actually lower risk for large avalanches — though small sloughs can still push you off a cliff.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "safe", label: "Safe", minValue: 0, maxValue: 30, color: "22C55E", description: "Low angle — insufficient gravitational stress"),
                        DiagramZone(id: "danger", label: "DANGER ZONE", minValue: 30, maxValue: 45, color: "EF4444", description: "Peak danger. 93% of fatalities."),
                        DiagramZone(id: "slough", label: "Constant Slough", minValue: 45, maxValue: 60, color: "F59E0B", description: "Snow can't accumulate — sloughs continuously"),
                    ],
                    minValue: 0,
                    maxValue: 60,
                    unit: "°",
                    currentValue: 50
                ),
                interactionHint: "Drag between zones to feel the difference",
                revealItems: nil
            ),
            TeachingStep(
                id: "slope-4",
                headline: "Measure Before You Commit",
                body: "Before committing to any slope, estimate its angle. A simple inclinometer, ski poles held vertically, or even your arm can help. The difference between 28° and 35° is the difference between safe and deadly — and it's hard to tell by eye.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "safe", label: "Safe (<30°)", minValue: 0, maxValue: 30, color: "22C55E", description: "Low risk for slab avalanches"),
                        DiagramZone(id: "danger", label: "DANGER (30–45°)", minValue: 30, maxValue: 45, color: "EF4444", description: "93% of avalanche fatalities"),
                        DiagramZone(id: "slough", label: "Slough (>45°)", minValue: 45, maxValue: 60, color: "F59E0B", description: "Constant small releases"),
                    ],
                    minValue: 0,
                    maxValue: 60,
                    unit: "°",
                    currentValue: 30
                ),
                interactionHint: "Explore the full range — the boundary at 30° is critical",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "slope-q1",
                type: .multipleChoice,
                prompt: "What slope angle range accounts for 93% of avalanche fatalities?",
                difficulty: .foundation,
                explanation: "The 30–45° range is where slabs can both accumulate to dangerous depth AND have enough gravitational force to release. This is the critical danger zone.",
                options: [
                    PracticeOption(label: "30°–45°", correct: true, explanation: "The danger zone. Slabs accumulate and gravity provides sufficient release force."),
                    PracticeOption(label: "20°–35°", correct: false, explanation: "Below 30°, slab release is very rare. The danger zone starts higher."),
                    PracticeOption(label: "45°–60°", correct: false, explanation: "Above 45°, snow sloughs off constantly and can't form dangerous slabs."),
                    PracticeOption(label: "15°–30°", correct: false, explanation: "Slopes under 30° generally don't produce slab avalanches."),
                ]
            ),
            PracticeQuestion(
                id: "slope-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Steeper slopes (>45°) actually have lower risk for large slab avalanches because snow can't accumulate into thick slabs — it sloughs off continuously.",
                statement: "The steeper the slope, the more dangerous it is for avalanches.",
                isTrue: false,
                reasoning: "Above 45°, snow constantly sloughs off and can't accumulate into dangerous slabs. The most dangerous range is 30–45°, not the steepest slopes."
            ),
            PracticeQuestion(
                id: "slope-q3",
                type: .multipleChoice,
                prompt: "You're planning a ski tour and see a beautiful open slope. You estimate it's about 35°. What should you do?",
                difficulty: .intermediate,
                explanation: "A 35° slope is squarely in the danger zone (30–45°). You need to assess all other factors — snowpack, weather history, terrain traps — before considering it, or choose a safer alternative.",
                options: [
                    PracticeOption(label: "Assess snowpack conditions carefully — this is in the danger zone", correct: true, explanation: "35° is in the critical range. Full assessment required before committing."),
                    PracticeOption(label: "It's fine — avalanches only happen above 40°", correct: false, explanation: "Avalanches commonly occur from 30° upward. 35° is well within the danger zone."),
                    PracticeOption(label: "Immediately retreat — any slope above 30° will avalanche", correct: false, explanation: "30–45° is the danger zone, but not every slope in this range avalanches. Assessment of conditions is key."),
                ]
            ),
            PracticeQuestion(
                id: "slope-q4",
                type: .matchPairs,
                prompt: "Match each slope angle range to its avalanche characteristic:",
                difficulty: .foundation,
                explanation: "Understanding these three zones is fundamental to terrain assessment. Below 30° is generally safe, 30–45° is the danger zone, and above 45° snow can't accumulate into slabs.",
                matchPairs: [
                    MatchPair(left: "Below 30°", right: "Rarely slides"),
                    MatchPair(left: "30°–45°", right: "93% of fatalities"),
                    MatchPair(left: "Above 45°", right: "Constant sloughing"),
                ]
            ),
        ],
        synthesisPrompt: "Slope angle is just one vertex of the avalanche triangle. How does knowing the 30–45° danger zone change how you look at terrain traps? A small slide on a 35° slope above a cliff is very different from the same slide on open terrain.",
        conceptMapNodes: [
            ConceptMapNode(id: "slope-angle", label: "Slope Angle", domain: .avalanche, x: 0.5, y: 0.3, connections: ["avalanche-triangle", "terrain-traps", "slab-physics"]),
            ConceptMapNode(id: "avalanche-triangle", label: "Avalanche Triangle", domain: .avalanche, x: 0.2, y: 0.5, connections: ["slope-angle"]),
            ConceptMapNode(id: "terrain-traps", label: "Terrain Traps", domain: .avalanche, x: 0.8, y: 0.5, connections: ["slope-angle"]),
            ConceptMapNode(id: "slab-physics", label: "Slab Physics", domain: .avalanche, x: 0.5, y: 0.7, connections: ["slope-angle", "avalanche-triangle"]),
        ]
    )

    // MARK: - Terrain Traps

    static let terrainTraps = Lesson(
        id: "terrain-traps",
        domain: .avalanche,
        teachingSteps: [
            TeachingStep(
                id: "traps-1",
                headline: "What Is a Terrain Trap?",
                body: "A terrain trap is any feature that amplifies the consequence of even a small avalanche. Gullies, creek beds, cliff bands, dense trees — these features can turn a survivable slide into a fatal burial. The danger isn't always the size of the slide. It's where the slide takes you.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Cross-section of alpine terrain showing common terrain traps",
                    hotspots: [
                        RevealItem(id: "gully", label: "Gully", detail: "Funnels debris, increases burial depth 3-5x", x: 0.3, y: 0.5),
                        RevealItem(id: "cliff", label: "Cliff band", detail: "No escape — even 30cm slide can push you over", x: 0.5, y: 0.7),
                        RevealItem(id: "trees", label: "Dense trees", detail: "Trauma from impacts, difficult probe search", x: 0.7, y: 0.4),
                        RevealItem(id: "creek", label: "Creek bed", detail: "Deep burial in confined channel", x: 0.2, y: 0.6),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "traps-2",
                headline: "Gullies: The Funnel of Death",
                body: "A gully channels avalanche debris like water in a pipe. A 40cm slide across an open slope might bury you to your waist. The same slide funneled into a gully can bury you 3 meters deep. Gullies also trap additional snow from the slopes above, multiplying the volume of debris.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Comparison: open slope vs. gully terrain trap",
                    hotspots: [
                        RevealItem(id: "open", label: "Open slope", detail: "Debris spreads wide — shallow burial", x: 0.25, y: 0.4),
                        RevealItem(id: "gully-channel", label: "Gully channel", detail: "Debris funnels and deepens — 3-5m burial", x: 0.75, y: 0.5),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "traps-3",
                headline: "Cliff Bands and Benches",
                body: "A bench above a cliff looks safe because it's flat. But if a slide from above reaches the bench, it can push you over the cliff. Even a 20cm slide has enough force to carry you. The bench is a false refuge — it's actually a terrain trap with no escape route.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Bench above cliff band terrain trap",
                    hotspots: [
                        RevealItem(id: "slope-above", label: "Release zone", detail: "35° slope above bench", x: 0.5, y: 0.2),
                        RevealItem(id: "bench", label: "Bench (false safety)", detail: "Flat area — debris decelerates but doesn't stop", x: 0.5, y: 0.5),
                        RevealItem(id: "cliff-drop", label: "Cliff band", detail: "20-30m drop — no escape", x: 0.5, y: 0.8),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "traps-4",
                headline: "Trees and Obstacles",
                body: "Dense timber can be a terrain trap. Small trees won't stop an avalanche — they'll just create obstacles that cause trauma during burial. Hitting a tree at 30 km/h can break bones or cause fatal head injuries. Mature, widely-spaced trees offer some protection. Dense young timber is a trap.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Forest terrain — safe vs. dangerous",
                    hotspots: [
                        RevealItem(id: "mature", label: "Mature forest", detail: "Wide spacing — avalanches rare, anchoring effect", x: 0.3, y: 0.5),
                        RevealItem(id: "young", label: "Young dense timber", detail: "Impact hazards, difficult rescue, slides still occur", x: 0.7, y: 0.5),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "traps-q1",
                type: .multipleChoice,
                prompt: "What makes a terrain trap dangerous?",
                difficulty: .foundation,
                explanation: "Terrain traps amplify consequence. A small slide that would be survivable on open terrain can become fatal when it funnels into a gully, pushes you over a cliff, or buries you deep in a confined space.",
                options: [
                    PracticeOption(label: "It amplifies the consequence of even a small avalanche", correct: true, explanation: "Terrain traps turn small slides into fatal burials."),
                    PracticeOption(label: "It makes avalanches more likely to trigger", correct: false, explanation: "Terrain traps don't trigger avalanches — they amplify consequences."),
                    PracticeOption(label: "It prevents you from seeing avalanche danger", correct: false, explanation: "Visibility isn't the issue. Consequence amplification is the danger."),
                ]
            ),
            PracticeQuestion(
                id: "traps-q2",
                type: .matchPairs,
                prompt: "Match each terrain trap to its primary danger:",
                difficulty: .foundation,
                explanation: "Each terrain trap has a characteristic danger: gullies funnel debris and increase depth, cliffs provide no escape, trees cause trauma, creek beds create deep burial in confined channels.",
                matchPairs: [
                    MatchPair(left: "Gully", right: "Funnels debris — 3-5x burial depth"),
                    MatchPair(left: "Cliff band", right: "No escape route"),
                    MatchPair(left: "Dense young trees", right: "Impact trauma during burial"),
                ]
            ),
            PracticeQuestion(
                id: "traps-q3",
                type: .multipleChoice,
                prompt: "You're planning a descent through a narrow gully that exits onto a wide, flat meadow. The danger rating is Moderate. Should you choose this line?",
                difficulty: .intermediate,
                explanation: "The gully is a terrain trap regardless of the runout. Even a small slide in the gully can bury you 3+ meters deep. At Moderate danger, avoiding terrain traps is critical — choose an open slope instead.",
                options: [
                    PracticeOption(label: "No — the gully is a terrain trap that amplifies consequence", correct: true, explanation: "Gullies funnel debris and create deep burials. Avoid them at Moderate or higher danger."),
                    PracticeOption(label: "Yes — the wide meadow at the bottom provides safe runout", correct: false, explanation: "The runout doesn't matter if you're buried 4 meters deep in the gully."),
                    PracticeOption(label: "Yes — Moderate danger means small avalanches, and small slides are safe in gullies", correct: false, explanation: "Small slides in gullies create deep burials. This is exactly when terrain traps are most dangerous."),
                ]
            ),
            PracticeQuestion(
                id: "traps-q4",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "A bench may slow debris temporarily, but it won't stop it. Avalanches carry enough momentum to cross flat benches and continue over cliff bands below. The bench is a false refuge.",
                statement: "A flat bench above a cliff provides a safe stopping point if an avalanche releases from above.",
                isTrue: false,
                reasoning: "Avalanche debris maintains momentum across benches. Even a small slide can push you over the cliff band below."
            ),
        ],
        synthesisPrompt: "Terrain traps are why slope angle alone doesn't determine risk. A 32° slope on open terrain might be acceptable at Moderate danger. The same 32° slope above a gully is not. How does terrain trap awareness integrate with the avalanche triangle framework?",
        conceptMapNodes: [
            ConceptMapNode(id: "terrain-traps", label: "Terrain Traps", domain: .avalanche, x: 0.6, y: 0.4, connections: ["slope-angle", "decision-framework", "companion-rescue"]),
            ConceptMapNode(id: "slope-angle", label: "Slope Angle", domain: .avalanche, x: 0.4, y: 0.2, connections: ["terrain-traps"]),
            ConceptMapNode(id: "decision-framework", label: "Decision Framework", domain: .avalanche, x: 0.7, y: 0.6, connections: ["terrain-traps"]),
            ConceptMapNode(id: "companion-rescue", label: "Companion Rescue", domain: .avalanche, x: 0.3, y: 0.6, connections: ["terrain-traps"]),
        ]
    )

    // MARK: - Snowpack Layers

    static let snowpackLayers = Lesson(
        id: "snowpack-layers",
        domain: .avalanche,
        teachingSteps: [
            TeachingStep(
                id: "layers-1",
                headline: "The Snowpack Is a History Book",
                body: "Every storm, every cold snap, every warm period leaves a layer. The snowpack is a chronological record of the winter's weather. Strong layers bond well. Weak layers don't. Your job is to read the history and identify the weak spots.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "recent", name: "Recent storm snow (20cm)", color: "F9FAFB", heightRatio: 0.2, description: "Fresh dendrites — low density, good bonding potential"),
                        DiagramLayer(id: "crust", name: "Rain crust", color: "94A3B8", heightRatio: 0.05, description: "Refrozen rain layer — very strong"),
                        DiagramLayer(id: "facets", name: "Faceted layer", color: "F59E0B", heightRatio: 0.1, description: "Loose sugary grains — weak bonding"),
                        DiagramLayer(id: "old-slab", name: "Old wind slab", color: "60A5FA", heightRatio: 0.25, description: "Dense, well-bonded"),
                        DiagramLayer(id: "depth-hoar", name: "Depth hoar", color: "EF4444", heightRatio: 0.1, description: "Large faceted crystals — persistent weak layer"),
                        DiagramLayer(id: "ground", name: "Ground", color: "78716C", heightRatio: 0.3, description: "Soil, rocks, vegetation"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "layers-2",
                headline: "Crystal Types: Rounds vs. Facets",
                body: "Rounded grains bond well — they sinter together like snowballs. Faceted grains (angular, sugary) don't bond. They act like ball bearings. Surface hoar (frost feathers) is the worst — it's beautiful, delicate, and deadly when buried. These crystal types determine layer strength.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "rounds", name: "Rounded grains (STRONG)", color: "22C55E", heightRatio: 0.33, description: "Sintered bonds — high strength"),
                        DiagramLayer(id: "facets", name: "Faceted grains (WEAK)", color: "EF4444", heightRatio: 0.33, description: "Angular crystals — poor bonding"),
                        DiagramLayer(id: "hoar", name: "Surface hoar (VERY WEAK)", color: "DC2626", heightRatio: 0.34, description: "Feathery crystals — collapses under load"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "layers-3",
                headline: "Persistent Weak Layers",
                body: "Some weak layers heal and strengthen over time. Others persist for weeks or months. Depth hoar, surface hoar, and near-surface facets are persistent weak layers — they don't bond, don't strengthen, and wait for a trigger. These are the layers that kill.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "new", name: "New snow (1 week old)", color: "E2E8F0", heightRatio: 0.3, description: "Bonding and strengthening"),
                        DiagramLayer(id: "surface-hoar", name: "BURIED SURFACE HOAR", color: "EF4444", heightRatio: 0.05, description: "Persistent weak layer — does not heal"),
                        DiagramLayer(id: "old", name: "Old snow (2 months)", color: "94A3B8", heightRatio: 0.35, description: "Well-sintered, strong"),
                        DiagramLayer(id: "depth-hoar", name: "DEPTH HOAR", color: "DC2626", heightRatio: 0.1, description: "Persistent weak layer at base"),
                        DiagramLayer(id: "ground", name: "Ground", color: "78716C", heightRatio: 0.2, description: "Base"),
                    ],
                    highlightIndex: 1
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "layers-4",
                headline: "How Weak Layers Form",
                body: "Weak layers form during specific conditions: clear, cold nights produce surface hoar. Prolonged cold with a shallow snowpack creates depth hoar. Rapid temperature gradients cause faceting. Understanding these formation mechanisms helps you predict where weak layers exist without digging every pit.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "surface", name: "Surface", color: "F9FAFB", heightRatio: 0.2, description: "Clear cold nights → surface hoar"),
                        DiagramLayer(id: "mid", name: "Mid-pack", color: "CBD5E1", heightRatio: 0.4, description: "Strong temp gradient → faceting"),
                        DiagramLayer(id: "base", name: "Base (shallow, cold)", color: "EF4444", heightRatio: 0.2, description: "Shallow + cold → depth hoar"),
                        DiagramLayer(id: "ground", name: "Ground (warm)", color: "78716C", heightRatio: 0.2, description: "Heat source"),
                    ],
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.9, toX: 0.5, toY: 0.7, label: "Heat flux", color: "F59E0B")
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "layers-q1",
                type: .multipleChoice,
                prompt: "Which crystal type bonds the strongest?",
                difficulty: .foundation,
                explanation: "Rounded grains sinter together and form strong bonds. Faceted grains remain angular and loose. Surface hoar is the weakest — it collapses under minimal load.",
                options: [
                    PracticeOption(label: "Rounded grains", correct: true, explanation: "Rounded crystals sinter and bond well."),
                    PracticeOption(label: "Faceted grains", correct: false, explanation: "Faceted grains are angular and don't bond."),
                    PracticeOption(label: "Surface hoar", correct: false, explanation: "Surface hoar is extremely weak and never bonds well."),
                ]
            ),
            PracticeQuestion(
                id: "layers-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Persistent weak layers like depth hoar and buried surface hoar do NOT heal or strengthen over time. They remain weak for weeks or months, waiting for a trigger. This is what makes them so dangerous.",
                statement: "All weak layers in the snowpack will eventually strengthen and heal given enough time.",
                isTrue: false,
                reasoning: "Persistent weak layers (depth hoar, surface hoar, near-surface facets) do not heal. They remain weak indefinitely."
            ),
            PracticeQuestion(
                id: "layers-q3",
                type: .multipleChoice,
                prompt: "After a week of clear, cold nights followed by 40cm of new snow, what weak layer are you most concerned about?",
                difficulty: .intermediate,
                explanation: "Clear, cold nights create surface hoar — delicate frost feathers that form on the snow surface. When buried by new snow, surface hoar becomes a dangerous persistent weak layer that can produce large avalanches.",
                options: [
                    PracticeOption(label: "Buried surface hoar", correct: true, explanation: "Clear cold nights = surface hoar formation. When buried, it's a persistent weak layer."),
                    PracticeOption(label: "The new-old snow interface", correct: false, explanation: "Interfaces can be weak, but surface hoar is more specific and dangerous in these conditions."),
                    PracticeOption(label: "Depth hoar at the base", correct: false, explanation: "Depth hoar forms over prolonged periods with shallow snowpack, not after one week."),
                ]
            ),
            PracticeQuestion(
                id: "layers-q4",
                type: .matchPairs,
                prompt: "Match each weak layer type to its formation condition:",
                difficulty: .intermediate,
                explanation: "Understanding formation conditions helps predict weak layer distribution. Clear cold nights produce surface hoar. Shallow early-season snowpack with cold temps produces depth hoar. Strong temperature gradients cause faceting.",
                matchPairs: [
                    MatchPair(left: "Surface hoar", right: "Clear, cold nights"),
                    MatchPair(left: "Depth hoar", right: "Shallow snowpack + prolonged cold"),
                    MatchPair(left: "Faceted layer", right: "Strong temperature gradient"),
                ]
            ),
        ],
        synthesisPrompt: "Every stability test you perform is testing the bond between layers. Every avalanche that releases does so on a weak layer. Understanding snowpack structure is the foundation of avalanche assessment. How does this knowledge connect to slab physics and stability testing?",
        conceptMapNodes: [
            ConceptMapNode(id: "snowpack-layers", label: "Snowpack Layers", domain: .avalanche, x: 0.5, y: 0.5, connections: ["slab-physics", "stability-testing", "weather-loading", "avalanche-triangle"]),
            ConceptMapNode(id: "slab-physics", label: "Slab Physics", domain: .avalanche, x: 0.3, y: 0.3, connections: ["snowpack-layers"]),
            ConceptMapNode(id: "stability-testing", label: "Stability Testing", domain: .avalanche, x: 0.7, y: 0.3, connections: ["snowpack-layers"]),
            ConceptMapNode(id: "weather-loading", label: "Weather Loading", domain: .avalanche, x: 0.5, y: 0.7, connections: ["snowpack-layers"]),
        ]
    )

    // MARK: - Stability Testing

    static let stabilityTesting = Lesson(
        id: "stability-testing",
        domain: .avalanche,
        teachingSteps: [
            TeachingStep(
                id: "testing-1",
                headline: "Why We Test",
                body: "Stability tests answer two questions: (1) How much force is required to trigger the weak layer? (2) If triggered, will the fracture propagate? A test that answers only one question is incomplete. You need both the trigger threshold AND the propagation potential.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "assess", label: "Identify slope", value: 20, description: "Choose representative terrain", color: "94A3B8"),
                        DiagramSegment(id: "dig", label: "Dig pit", value: 20, description: "Isolate column to snowpack base", color: "60A5FA"),
                        DiagramSegment(id: "ct", label: "Compression test", value: 30, description: "How hard to trigger?", color: "F59E0B"),
                        DiagramSegment(id: "ect", label: "Extended column test", value: 30, description: "Will it propagate?", color: "EF4444"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "testing-2",
                headline: "Compression Test (CT)",
                body: "The compression test measures how hard you must tap to trigger a failure. CT5 = very easy (collapses with light taps). CT15 = moderate (requires firm taps). CT30 = hard (requires very hard force). The lower the number, the easier to trigger — and the more dangerous.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "easy", label: "CT1-10", value: 33, description: "Very easy to trigger — high danger", color: "EF4444"),
                        DiagramSegment(id: "moderate", label: "CT11-20", value: 33, description: "Moderate trigger force — assess propagation", color: "F59E0B"),
                        DiagramSegment(id: "hard", label: "CT21-30", value: 34, description: "Hard to trigger — generally more stable", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "testing-3",
                headline: "Extended Column Test (ECT)",
                body: "The ECT tests propagation potential. You load a 90cm-wide column and watch for fracture propagation. ECTP (propagation across the entire column) means the fracture will likely propagate across a slope — very dangerous. ECTN (no propagation) is more stable.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "ectp", label: "ECTP", value: 50, description: "Full propagation — fracture spreads across column", color: "EF4444"),
                        DiagramSegment(id: "ectn", label: "ECTN", value: 50, description: "No propagation — fracture doesn't spread", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "testing-4",
                headline: "Interpreting Combined Results",
                body: "CT + ECT together give the full picture. CT12 + ECTP = moderate trigger force but full propagation — dangerous. CT25 + ECTN = hard to trigger and won't propagate — stable. CT8 + ECTN = easy to trigger but won't spread — isolated instability. Use both tests.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "ct-low-ectp", label: "CT8 + ECTP", value: 25, description: "Easy trigger + propagation = VERY DANGEROUS", color: "DC2626"),
                        DiagramSegment(id: "ct-mid-ectp", label: "CT15 + ECTP", value: 25, description: "Moderate trigger + propagation = DANGEROUS", color: "EF4444"),
                        DiagramSegment(id: "ct-high-ectn", label: "CT25 + ECTN", value: 25, description: "Hard trigger + no propagation = STABLE", color: "22C55E"),
                        DiagramSegment(id: "ct-low-ectn", label: "CT8 + ECTN", value: 25, description: "Easy trigger + no propagation = ISOLATED", color: "F59E0B"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "testing-q1",
                type: .multipleChoice,
                prompt: "What do stability tests measure?",
                difficulty: .foundation,
                explanation: "Stability tests measure two things: (1) how hard it is to trigger the weak layer (CT score), and (2) whether the fracture will propagate across the slope (ECT result). Both are critical.",
                options: [
                    PracticeOption(label: "Trigger force and propagation potential", correct: true, explanation: "CT measures trigger threshold. ECT measures propagation."),
                    PracticeOption(label: "Only how deep the snowpack is", correct: false, explanation: "Depth is observed, but tests measure failure mechanics."),
                    PracticeOption(label: "Only the strength of the slab", correct: false, explanation: "Tests measure weak layer failure and propagation, not just slab strength."),
                ]
            ),
            PracticeQuestion(
                id: "testing-q2",
                type: .multipleChoice,
                prompt: "You perform a compression test and get CT12 with sudden planar shear. Your extended column test shows ECTP. How do you interpret this?",
                difficulty: .intermediate,
                explanation: "CT12 means moderate force can trigger the weak layer — within the range a skier can apply. ECTP means the fracture will propagate across the slope. This combination is dangerous.",
                options: [
                    PracticeOption(label: "Dangerous — moderate trigger threshold with full propagation potential", correct: true, explanation: "CT12 is skiable load. ECTP means slope-wide failure. Very dangerous combination."),
                    PracticeOption(label: "Moderately stable — CT12 is a moderate score", correct: false, explanation: "The ECTP (full propagation) is the critical red flag here."),
                    PracticeOption(label: "Stable — you need CT below 10 to be concerned", correct: false, explanation: "CT12 can be triggered by a skier, and ECTP means it will propagate."),
                ]
            ),
            PracticeQuestion(
                id: "testing-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "A compression test alone only tells you how hard it is to trigger the weak layer. It doesn't tell you if the fracture will propagate. You need the ECT to assess propagation potential.",
                statement: "A compression test alone is sufficient to assess avalanche danger.",
                isTrue: false,
                reasoning: "CT measures trigger threshold only. ECT is required to test propagation. You need both for full assessment."
            ),
            PracticeQuestion(
                id: "testing-q4",
                type: .matchPairs,
                prompt: "Match each test result to its meaning:",
                difficulty: .foundation,
                explanation: "CT scores measure how many taps to failure. Low = easy to trigger. High = hard to trigger. ECTP = propagation across column. ECTN = no propagation.",
                matchPairs: [
                    MatchPair(left: "CT8", right: "Very easy to trigger"),
                    MatchPair(left: "CT20", right: "Moderate force to trigger"),
                    MatchPair(left: "ECTP", right: "Fracture propagates fully"),
                ]
            ),
        ],
        synthesisPrompt: "Stability tests are just one data point. They tell you about the specific slope you tested, at that elevation, on that aspect, at that moment. Extrapolation requires understanding how weak layers vary across terrain. How does stability testing integrate with your understanding of snowpack layers?",
        conceptMapNodes: [
            ConceptMapNode(id: "stability-testing", label: "Stability Testing", domain: .avalanche, x: 0.6, y: 0.5, connections: ["snowpack-layers", "slab-physics", "decision-framework"]),
            ConceptMapNode(id: "snowpack-layers", label: "Snowpack Layers", domain: .avalanche, x: 0.4, y: 0.3, connections: ["stability-testing"]),
            ConceptMapNode(id: "slab-physics", label: "Slab Physics", domain: .avalanche, x: 0.3, y: 0.6, connections: ["stability-testing"]),
            ConceptMapNode(id: "decision-framework", label: "Decision Framework", domain: .avalanche, x: 0.7, y: 0.7, connections: ["stability-testing"]),
        ]
    )

    // MARK: - Weather Loading

    static let weatherLoading = Lesson(
        id: "weather-loading",
        domain: .avalanche,
        teachingSteps: [
            TeachingStep(
                id: "loading-1",
                headline: "Wind: The Architect of Avalanches",
                body: "Wind transports snow from windward slopes to lee slopes. It strips snow from ridges and deposits it in thick, cohesive slabs on the downwind side. 2cm of wind-deposited snow equals 20cm of natural snowfall in terms of avalanche danger. Wind is the single most important weather factor.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.6, toX: 0.8, toY: 0.5, label: "Wind transport", color: "60A5FA")
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.5),
                        DiagramPoint(x: 0.3, y: 0.7),
                        DiagramPoint(x: 0.5, y: 0.8),
                        DiagramPoint(x: 0.7, y: 0.6),
                        DiagramPoint(x: 1.0, y: 0.4),
                    ],
                    overlayType: "wind",
                    labels: ["Windward (scoured)", "Ridge", "Lee (loaded)"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "loading-2",
                headline: "Identifying Wind-Loaded Slopes",
                body: "Look for wind scour on ridges and windward slopes — hard, shiny, rippled surfaces. Look for pillowy deposits on lee slopes — soft, rounded drifts. Cornices form on the lee side. Wind plumes off peaks. These signs tell you where the danger is building.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.5),
                        DiagramPoint(x: 0.4, y: 0.75),
                        DiagramPoint(x: 0.5, y: 0.8),
                        DiagramPoint(x: 0.6, y: 0.75),
                        DiagramPoint(x: 0.7, y: 0.55),
                        DiagramPoint(x: 1.0, y: 0.4),
                    ],
                    overlayType: "wind",
                    labels: ["Scoured surface", "Cornice", "Pillowy slab"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "loading-3",
                headline: "Precipitation Loading",
                body: "New snow adds weight to the snowpack. The rate of loading matters more than the total amount. 10cm in 1 hour is more dangerous than 30cm in 24 hours. Fast loading doesn't give the snowpack time to adjust. Rain is even worse — it adds weight AND reduces strength by warming the pack.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.6),
                        DiagramPoint(x: 0.25, y: 0.65),
                        DiagramPoint(x: 0.5, y: 0.55),
                        DiagramPoint(x: 0.75, y: 0.5),
                        DiagramPoint(x: 1.0, y: 0.45),
                    ],
                    labels: ["New snow loading", "Weak layer underneath"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "loading-4",
                headline: "The 48-Hour Rule",
                body: "After significant loading (wind or precipitation), wait 48 hours before skiing steep terrain. The snowpack needs time to adjust and strengthen. Exceptions: warming and settlement accelerate stabilization. Persistent weak layers don't heal. Use your judgment, but 48 hours is a good default.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "storm", label: "Storm ends", value: 10, description: "Peak instability", color: "EF4444"),
                        DiagramSegment(id: "settle-1", label: "0-24hr", value: 30, description: "Initial settlement — still dangerous", color: "F59E0B"),
                        DiagramSegment(id: "settle-2", label: "24-48hr", value: 30, description: "Continued bonding — improving", color: "FBBF24"),
                        DiagramSegment(id: "stable", label: "48hr+", value: 30, description: "Generally safe to reassess", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "loading-q1",
                type: .multipleChoice,
                prompt: "Why is wind-transported snow more dangerous than natural snowfall?",
                difficulty: .foundation,
                explanation: "Wind deposits snow in thick, dense, cohesive slabs on lee slopes. These slabs are much harder and store more energy than natural snowfall. When they release, they produce larger, more destructive avalanches.",
                options: [
                    PracticeOption(label: "Wind creates dense, cohesive slabs that store more energy", correct: true, explanation: "Wind-deposited snow is harder, denser, and more avalanche-prone."),
                    PracticeOption(label: "Wind melts the snow and refreezes it into ice", correct: false, explanation: "Wind transports and compacts snow, it doesn't melt it."),
                    PracticeOption(label: "Wind removes the dangerous snow from slopes", correct: false, explanation: "Wind deposits the snow on lee slopes, concentrating the danger."),
                ]
            ),
            PracticeQuestion(
                id: "loading-q2",
                type: .multipleChoice,
                prompt: "Strong westerly winds have blown for 48 hours after a 20cm snowfall. Which aspect is most dangerous?",
                difficulty: .intermediate,
                explanation: "West winds transport snow from west-facing (windward) slopes and deposit it on east-facing (lee) slopes. East aspects will have thick wind slabs and the highest avalanche danger.",
                options: [
                    PracticeOption(label: "East — lee side of the prevailing wind", correct: true, explanation: "Lee slopes receive wind-deposited slabs. West wind = east lee slopes."),
                    PracticeOption(label: "West — directly exposed to the wind", correct: false, explanation: "West slopes are scoured by west winds, not loaded."),
                    PracticeOption(label: "North — most shaded and coldest", correct: false, explanation: "Wind direction determines loading, not aspect temperature."),
                ]
            ),
            PracticeQuestion(
                id: "loading-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "The rate of loading is more important than the total. 10cm in 1 hour loads the snowpack faster than it can adjust, creating high stress on weak layers. 30cm over 24 hours allows gradual adjustment and bonding.",
                statement: "10cm of snow in 1 hour is more dangerous than 30cm of snow over 24 hours.",
                isTrue: true,
                reasoning: "Rapid loading doesn't give the snowpack time to adjust. Slow loading allows the snowpack to strengthen and bond incrementally."
            ),
            PracticeQuestion(
                id: "loading-q4",
                type: .matchPairs,
                prompt: "Match each wind indicator to what it tells you:",
                difficulty: .foundation,
                explanation: "Wind signs tell you where snow is being stripped and where it's being deposited. Scour = windward. Pillows and cornices = lee. Wind plumes show active transport.",
                matchPairs: [
                    MatchPair(left: "Scoured ridge", right: "Windward — snow removed"),
                    MatchPair(left: "Pillowy drifts", right: "Lee — wind slab deposition"),
                    MatchPair(left: "Cornices", right: "Lee side of ridge"),
                ]
            ),
        ],
        synthesisPrompt: "Weather loading — especially wind — is the most dynamic variable in the avalanche triangle. It changes day to day, slope to slope. Understanding how wind transports snow helps you predict where danger is building without seeing the slope. How does this knowledge connect to the avalanche triangle and snowpack assessment?",
        conceptMapNodes: [
            ConceptMapNode(id: "weather-loading", label: "Weather Loading", domain: .avalanche, x: 0.5, y: 0.3, connections: ["avalanche-triangle", "snowpack-layers", "slope-angle"]),
            ConceptMapNode(id: "avalanche-triangle", label: "Avalanche Triangle", domain: .avalanche, x: 0.3, y: 0.5, connections: ["weather-loading"]),
            ConceptMapNode(id: "snowpack-layers", label: "Snowpack Layers", domain: .avalanche, x: 0.7, y: 0.5, connections: ["weather-loading"]),
            ConceptMapNode(id: "slope-angle", label: "Slope Angle", domain: .avalanche, x: 0.5, y: 0.7, connections: ["weather-loading"]),
        ]
    )

    // MARK: - Human Factors

    static let humanFactors = Lesson(
        id: "human-factors",
        domain: .avalanche,
        teachingSteps: [
            TeachingStep(
                id: "human-1",
                headline: "The Human Factor Kills",
                body: "Most avalanche accidents don't happen because people missed the signs. They happen because people saw the signs and ignored them. Cognitive biases — mental shortcuts — override rational assessment. Familiarity, commitment, expert halo, social proof, and scarcity are the five heuristic traps that kill.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "familiarity", label: "FAMILIARITY", description: "\"I've skied this 100 times\"", color: "F59E0B"),
                        DiagramVertex(id: "commitment", label: "COMMITMENT", description: "\"We drove 6 hours to get here\"", color: "EF4444"),
                        DiagramVertex(id: "expert-halo", label: "EXPERT HALO", description: "\"The guide knows what they're doing\"", color: "3B82F6"),
                    ],
                    centerLabel: "BIAS",
                    centerDescription: "Mental shortcuts that override rational thought"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "human-2",
                headline: "Familiarity: \"I Know This Slope\"",
                body: "You've skied this slope 50 times without incident. Your brain treats it as safe by default. But the snowpack changes. Familiarity breeds complacency. The most dangerous terrain is the terrain you know well — because you stop assessing it critically.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "familiarity", label: "FAMILIARITY", description: "Past success ≠ future safety", color: "EF4444"),
                        DiagramVertex(id: "conditions", label: "CONDITIONS", description: "The snowpack TODAY is different", color: "F59E0B"),
                        DiagramVertex(id: "outcome", label: "OUTCOME", description: "One bad decision ends it all", color: "DC2626"),
                    ],
                    centerLabel: "TRAP",
                    centerDescription: "\"I've done this before\" — the deadliest phrase"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "human-3",
                headline: "Social Proof and Expert Halo",
                body: "You see tracks on the slope — someone already skied it. Or the guide wants to go — they must know it's safe. Social proof (others did it) and expert halo (authority figure endorsement) are powerful biases. Neither actually assesses current conditions. Both get people killed.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "social", label: "SOCIAL PROOF", description: "\"There are tracks — it's fine\"", color: "F59E0B"),
                        DiagramVertex(id: "expert", label: "EXPERT HALO", description: "\"The guide said it's okay\"", color: "3B82F6"),
                        DiagramVertex(id: "reality", label: "REALITY", description: "Conditions can change in minutes", color: "EF4444"),
                    ],
                    centerLabel: "DANGER",
                    centerDescription: "Deferring judgment to others"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "human-4",
                headline: "Commitment and Scarcity",
                body: "You drove 6 hours. You have one day off this month. The powder won't last. Commitment (sunk cost) and scarcity (limited opportunity) create pressure to proceed despite red flags. The antidote: decide before you leave home what conditions would make you turn around — and stick to it.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "commitment", label: "COMMITMENT", description: "\"We came all this way\"", color: "F59E0B"),
                        DiagramVertex(id: "scarcity", label: "SCARCITY", description: "\"Powder like this is rare\"", color: "FBBF24"),
                        DiagramVertex(id: "rational", label: "RATIONAL CHOICE", description: "Retreat is always an option", color: "22C55E"),
                    ],
                    centerLabel: "DECISION",
                    centerDescription: "Emotion vs. logic"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "human-q1",
                type: .multipleChoice,
                prompt: "What is the most common cause of avalanche accidents among experienced backcountry users?",
                difficulty: .foundation,
                explanation: "Most accidents happen not because of lack of knowledge, but because of cognitive biases that override rational decision-making. Experienced users often fall into heuristic traps like familiarity and expert halo.",
                options: [
                    PracticeOption(label: "Cognitive biases overriding rational assessment", correct: true, explanation: "Heuristic traps like familiarity, commitment, and social proof cause most accidents."),
                    PracticeOption(label: "Lack of avalanche education or training", correct: false, explanation: "Most victims are educated. The problem is decision-making under bias."),
                    PracticeOption(label: "Unexpected avalanche conditions", correct: false, explanation: "Conditions are rarely unexpected — signs are usually present but ignored."),
                ]
            ),
            PracticeQuestion(
                id: "human-q2",
                type: .multipleChoice,
                prompt: "Your group of 5 includes two IFMGA guides who want to ski a steep line. You're uncomfortable but don't want to speak up. Which heuristic traps are active?",
                difficulty: .intermediate,
                explanation: "Expert halo (trusting the guides' authority over your own judgment) and social proof (group consensus) are both active. These biases suppress your instinct to speak up.",
                options: [
                    PracticeOption(label: "Expert halo and social proof", correct: true, explanation: "You're deferring to authority and group consensus over your own assessment."),
                    PracticeOption(label: "Only commitment — you drove a long way", correct: false, explanation: "Commitment isn't mentioned. The dominant traps are expert halo and social proof."),
                    PracticeOption(label: "Familiarity — you've skied with guides before", correct: false, explanation: "The scenario is about authority and group pressure, not familiarity."),
                ]
            ),
            PracticeQuestion(
                id: "human-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Familiarity is one of the most dangerous biases. When you know a slope well, you stop assessing it critically. The snowpack changes every storm, but your brain treats the slope as 'safe by default' based on past success.",
                statement: "Skiing the same slope repeatedly makes you safer because you know the terrain well.",
                isTrue: false,
                reasoning: "Familiarity breeds complacency. You stop assessing conditions critically and rely on past outcomes, which don't predict current snowpack stability."
            ),
            PracticeQuestion(
                id: "human-q4",
                type: .matchPairs,
                prompt: "Match each heuristic trap to its characteristic thought pattern:",
                difficulty: .foundation,
                explanation: "Each bias has a signature phrase. Recognizing these thought patterns in yourself is the first step to countering them.",
                matchPairs: [
                    MatchPair(left: "Familiarity", right: "\"I've done this 100 times\""),
                    MatchPair(left: "Expert halo", right: "\"The guide knows best\""),
                    MatchPair(left: "Commitment", right: "\"We drove 6 hours to get here\""),
                ]
            ),
        ],
        synthesisPrompt: "Human factors are the invisible fourth side of the avalanche triangle. Even when you correctly assess terrain, weather, and snowpack, biases can still lead you into danger. The antidote is structured decision frameworks and pre-trip agreements. How does recognizing your own biases connect to systematic decision-making?",
        conceptMapNodes: [
            ConceptMapNode(id: "human-factors", label: "Human Factors", domain: .avalanche, x: 0.5, y: 0.5, connections: ["decision-framework", "avalanche-triangle"]),
            ConceptMapNode(id: "decision-framework", label: "Decision Framework", domain: .avalanche, x: 0.7, y: 0.6, connections: ["human-factors"]),
            ConceptMapNode(id: "avalanche-triangle", label: "Avalanche Triangle", domain: .avalanche, x: 0.3, y: 0.3, connections: ["human-factors"]),
            ConceptMapNode(id: "companion-rescue", label: "Companion Rescue", domain: .avalanche, x: 0.5, y: 0.8, connections: []),
        ]
    )

    // MARK: - Decision Framework

    static let decisionFramework = Lesson(
        id: "decision-framework",
        domain: .avalanche,
        teachingSteps: [
            TeachingStep(
                id: "framework-1",
                headline: "Why Use a Framework?",
                body: "Gut feel fails under pressure. Biases cloud judgment. A systematic decision framework forces you to evaluate all factors methodically — terrain, snowpack, weather, group capability, consequence — before committing. It's a checklist against death.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "forecast", label: "Check forecast", value: 20, description: "Danger rating, problem type, elevation", color: "60A5FA"),
                        DiagramSegment(id: "terrain", label: "Assess terrain", value: 20, description: "Slope angle, aspect, traps", color: "F59E0B"),
                        DiagramSegment(id: "snowpack", label: "Test snowpack", value: 20, description: "Stability tests, layer ID", color: "3B82F6"),
                        DiagramSegment(id: "decide", label: "Go / No-go", value: 20, description: "Systematic evaluation", color: "22C55E"),
                        DiagramSegment(id: "reassess", label: "Reassess", value: 20, description: "Conditions change — re-evaluate", color: "EF4444"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "framework-2",
                headline: "The Obvious Clues Method",
                body: "Before you even leave the car, check for obvious clues: recent avalanches, shooting cracks, whumpfing, rapid loading, wind transport. If you observe ANY obvious clue, avoid all avalanche terrain that day. No exceptions. This is the simplest, most effective decision tool.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "observe", label: "Observe", value: 50, description: "Recent slides, cracks, whumpfs, loading", color: "60A5FA"),
                        DiagramSegment(id: "decide", label: "ANY clue = Retreat", value: 50, description: "Avoid all avalanche terrain", color: "EF4444"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "framework-3",
                headline: "The Avaluator: Systematic Scoring",
                body: "The Avaluator framework assigns points to risk factors: danger rating, terrain, group size, experience. Add up the points. Above a threshold = too much risk. It's not perfect, but it's objective and catches what intuition misses.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "danger-rating", label: "Danger rating", value: 25, description: "Low=1, Moderate=2, Considerable=3, High=4", color: "60A5FA"),
                        DiagramSegment(id: "terrain-score", label: "Terrain", value: 25, description: "Simple=0, Challenging=1, Complex=2", color: "F59E0B"),
                        DiagramSegment(id: "group", label: "Group factors", value: 25, description: "Size, experience, rescue gear", color: "3B82F6"),
                        DiagramSegment(id: "total", label: "Sum → Decision", value: 25, description: "Green / Yellow / Red zones", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "framework-4",
                headline: "Pre-Trip Agreements",
                body: "Before you leave, agree on turnaround conditions: 'If danger is Considerable or higher, we ski low-angle.' 'If we see shooting cracks, we retreat.' Pre-committing removes in-the-moment bias. Decide when you're rational, execute when you're emotional.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "home", label: "At home (rational)", value: 50, description: "Set clear go/no-go criteria", color: "22C55E"),
                        DiagramSegment(id: "field", label: "In field (biased)", value: 50, description: "Execute pre-agreed plan", color: "60A5FA"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "framework-q1",
                type: .multipleChoice,
                prompt: "Why is a decision framework more reliable than gut feel?",
                difficulty: .foundation,
                explanation: "Decision frameworks force systematic evaluation of all factors. Gut feel is vulnerable to biases like familiarity, commitment, and social proof. A checklist ensures nothing is missed.",
                options: [
                    PracticeOption(label: "It forces systematic evaluation and counters cognitive biases", correct: true, explanation: "Frameworks are objective. Gut feel is biased."),
                    PracticeOption(label: "It's faster than thinking through conditions yourself", correct: false, explanation: "Frameworks take time. Speed is not the advantage — objectivity is."),
                    PracticeOption(label: "It guarantees safety if you follow it", correct: false, explanation: "No framework guarantees safety. It reduces risk by improving decisions."),
                ]
            ),
            PracticeQuestion(
                id: "framework-q2",
                type: .multipleChoice,
                prompt: "You observe shooting cracks while skinning up. According to the Obvious Clues method, what should you do?",
                difficulty: .intermediate,
                explanation: "Shooting cracks are an obvious clue of instability — they indicate a slab on a weak layer. The Obvious Clues method says ANY obvious clue means you retreat from all avalanche terrain immediately. No exceptions.",
                options: [
                    PracticeOption(label: "Retreat from all avalanche terrain immediately", correct: true, explanation: "Shooting cracks = obvious instability. Retreat is the only safe choice."),
                    PracticeOption(label: "Dig a pit to assess the weak layer before deciding", correct: false, explanation: "Obvious clues override the need for testing. Retreat immediately."),
                    PracticeOption(label: "Proceed with caution and spacing", correct: false, explanation: "Shooting cracks indicate slope-wide instability. Spacing doesn't help."),
                ]
            ),
            PracticeQuestion(
                id: "framework-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Pre-trip agreements remove in-the-moment bias. When you're standing at the base of a beautiful powder slope, commitment and scarcity biases kick in. But if you agreed at home that 'Considerable = no steep terrain,' you have a rational anchor to hold onto.",
                statement: "Pre-trip agreements are effective because they're made when you're rational, before biases kick in.",
                isTrue: true,
                reasoning: "At home, you're calm and objective. In the field, biases cloud judgment. Pre-committing to criteria removes emotional override."
            ),
            PracticeQuestion(
                id: "framework-q4",
                type: .sequenceOrder,
                prompt: "Order the decision-making sequence:",
                difficulty: .foundation,
                explanation: "The process is: check forecast → assess terrain → test snowpack → evaluate all factors → make go/no-go decision → reassess continuously as conditions change.",
                correctOrder: [
                    "Check avalanche forecast before leaving",
                    "Assess terrain: slope angle, aspect, traps",
                    "Test snowpack stability",
                    "Evaluate all factors systematically",
                    "Make go/no-go decision",
                    "Reassess as conditions change",
                ],
                shuffledItems: [
                    "Make go/no-go decision",
                    "Reassess as conditions change",
                    "Check avalanche forecast before leaving",
                    "Test snowpack stability",
                    "Assess terrain: slope angle, aspect, traps",
                    "Evaluate all factors systematically",
                ]
            ),
        ],
        synthesisPrompt: "Decision frameworks are the antidote to human factors. They force you to confront biases and evaluate conditions objectively. But frameworks are tools, not guarantees. They work only if you use them honestly. How does systematic decision-making integrate with your understanding of the avalanche triangle, human biases, and field observations?",
        conceptMapNodes: [
            ConceptMapNode(id: "decision-framework", label: "Decision Framework", domain: .avalanche, x: 0.6, y: 0.5, connections: ["human-factors", "avalanche-triangle", "stability-testing", "terrain-traps"]),
            ConceptMapNode(id: "human-factors", label: "Human Factors", domain: .avalanche, x: 0.4, y: 0.3, connections: ["decision-framework"]),
            ConceptMapNode(id: "avalanche-triangle", label: "Avalanche Triangle", domain: .avalanche, x: 0.3, y: 0.6, connections: ["decision-framework"]),
            ConceptMapNode(id: "stability-testing", label: "Stability Testing", domain: .avalanche, x: 0.7, y: 0.7, connections: ["decision-framework"]),
        ]
    )

    // MARK: - Companion Rescue

    static let companionRescue = Lesson(
        id: "companion-rescue",
        domain: .avalanche,
        teachingSteps: [
            TeachingStep(
                id: "rescue-1",
                headline: "The 18-Minute Window",
                body: "Survival probability is 90% if the victim is dug out within 18 minutes. After 18 minutes, it drops to 30%. After 35 minutes, it's below 20%. Helicopter rescue takes 30-60 minutes. Your partners are the victim's only realistic chance. Speed is everything.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "critical", label: "0-18 min", value: 30, description: "90% survival — CRITICAL WINDOW", color: "22C55E"),
                        DiagramSegment(id: "declining", label: "18-35 min", value: 28, description: "30% survival — rapidly declining", color: "F59E0B"),
                        DiagramSegment(id: "low", label: "35+ min", value: 42, description: "<20% survival — asphyxiation likely", color: "EF4444"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rescue-2",
                headline: "Step 1: Beacon Search",
                body: "The moment someone is buried, switch your beacon to SEARCH mode. Move quickly to the last-seen point. Follow the signal: when the distance number decreases, you're heading toward the victim. When it increases, turn around. Use the grid search pattern. Locate the signal within 2-3 minutes.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "switch", label: "Switch to search", value: 5, description: "Immediate — within 10 seconds", color: "EF4444"),
                        DiagramSegment(id: "coarse", label: "Coarse search", value: 40, description: "Move to last-seen point, follow signal", color: "F59E0B"),
                        DiagramSegment(id: "fine", label: "Fine search", value: 30, description: "Grid pattern, pinpoint location", color: "FBBF24"),
                        DiagramSegment(id: "pinpoint", label: "Mark spot", value: 25, description: "Lowest distance reading", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rescue-3",
                headline: "Step 2: Probe",
                body: "Once your beacon shows the victim is within 1-2 meters, probe in a spiral pattern outward from the lowest signal point. When you get a strike, leave the probe in place. The probe angle tells you burial depth. Don't waste time probing randomly — use the beacon signal to narrow your search first.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "beacon-pinpoint", label: "Beacon pinpoint", value: 30, description: "Within 1-2m of victim", color: "60A5FA"),
                        DiagramSegment(id: "probe-search", label: "Spiral probe", value: 40, description: "Systematic pattern from signal center", color: "F59E0B"),
                        DiagramSegment(id: "strike", label: "Strike", value: 30, description: "Contact — leave probe in place", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rescue-4",
                headline: "Step 3: Dig",
                body: "Dig downslope from the probe, 1.5x the burial depth. If they're buried 2 meters, start digging 3 meters downslope. This creates a ramp to the victim rather than a vertical hole. Dig aggressively. Use a shovel, not your hands. Clear the airway first, then the chest. Every second counts.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "position", label: "Position", value: 15, description: "1.5x depth downslope from probe", color: "60A5FA"),
                        DiagramSegment(id: "dig", label: "Dig aggressively", value: 60, description: "Ramp approach — fastest method", color: "F59E0B"),
                        DiagramSegment(id: "clear", label: "Clear airway", value: 25, description: "Face and chest first — assess breathing", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "rescue-q1",
                type: .multipleChoice,
                prompt: "What is the survival probability if a buried victim is dug out within 18 minutes?",
                difficulty: .foundation,
                explanation: "The 18-minute window is critical. If you dig them out within 18 minutes, they have a 90% chance of survival. After 18 minutes, survival drops rapidly due to asphyxiation.",
                options: [
                    PracticeOption(label: "90%", correct: true, explanation: "Within 18 minutes = 90% survival. This is the critical window."),
                    PracticeOption(label: "50%", correct: false, explanation: "50% is too low. Within 18 minutes, survival is 90%."),
                    PracticeOption(label: "30%", correct: false, explanation: "30% is the survival rate AFTER 18 minutes."),
                ]
            ),
            PracticeQuestion(
                id: "rescue-q2",
                type: .sequenceOrder,
                prompt: "Order the steps of companion rescue:",
                difficulty: .foundation,
                explanation: "The sequence is: switch beacon to search → move to last-seen point → follow signal to pinpoint location → probe for strike → dig victim out → clear airway.",
                correctOrder: [
                    "Switch beacon to SEARCH mode",
                    "Move to last-seen point",
                    "Follow beacon signal — coarse search",
                    "Grid search — fine pinpoint",
                    "Probe in spiral pattern",
                    "Dig 1.5x depth downslope from probe",
                    "Clear airway and assess breathing",
                ],
                shuffledItems: [
                    "Probe in spiral pattern",
                    "Switch beacon to SEARCH mode",
                    "Clear airway and assess breathing",
                    "Follow beacon signal — coarse search",
                    "Dig 1.5x depth downslope from probe",
                    "Move to last-seen point",
                    "Grid search — fine pinpoint",
                ]
            ),
            PracticeQuestion(
                id: "rescue-q3",
                type: .multipleChoice,
                prompt: "Your partner is buried. You saw them disappear 50m upslope 2 minutes ago. What is your FIRST action?",
                difficulty: .intermediate,
                explanation: "The first action is always to switch your beacon to SEARCH mode and begin the signal search. You have 16 minutes left in the critical 18-minute window. Every second counts.",
                options: [
                    PracticeOption(label: "Switch beacon to SEARCH and move to last-seen point", correct: true, explanation: "Beacon search is the fastest way to locate them. Start immediately."),
                    PracticeOption(label: "Call for helicopter rescue", correct: false, explanation: "Helicopters take 30-60 minutes. Companion rescue is their only chance."),
                    PracticeOption(label: "Start probing the debris randomly", correct: false, explanation: "Your beacon can locate them in 2-3 minutes. Use it first."),
                ]
            ),
            PracticeQuestion(
                id: "rescue-q4",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Digging downslope creates a ramp to the victim, which is much faster than digging a vertical hole. The ramp approach is the standard rescue technique and saves critical minutes.",
                statement: "When digging, you should start directly above the probe to dig straight down to the victim.",
                isTrue: false,
                reasoning: "Dig downslope at 1.5x the burial depth. This creates a ramp approach, which is faster than a vertical hole."
            ),
        ],
        synthesisPrompt: "Companion rescue is the last line of defense when everything else has failed. The 18-minute window is unforgiving. Practice until the sequence is automatic: beacon, probe, dig. Speed and repetition save lives. But prevention is always better than rescue. How does rescue preparation integrate with your overall avalanche safety mindset?",
        conceptMapNodes: [
            ConceptMapNode(id: "companion-rescue", label: "Companion Rescue", domain: .avalanche, x: 0.5, y: 0.7, connections: ["terrain-traps", "decision-framework"]),
            ConceptMapNode(id: "terrain-traps", label: "Terrain Traps", domain: .avalanche, x: 0.3, y: 0.5, connections: ["companion-rescue"]),
            ConceptMapNode(id: "decision-framework", label: "Decision Framework", domain: .avalanche, x: 0.7, y: 0.5, connections: ["companion-rescue"]),
            ConceptMapNode(id: "avalanche-triangle", label: "Avalanche Triangle", domain: .avalanche, x: 0.5, y: 0.3, connections: []),
        ]
    )
}
