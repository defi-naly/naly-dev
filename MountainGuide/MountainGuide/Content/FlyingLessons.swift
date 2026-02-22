import Foundation

enum FlyingLessons {

    // MARK: - Thermal Entry

    static let thermalEntry = Lesson(
        id: "thermal-entry",
        domain: .flying,
        teachingSteps: [
            TeachingStep(
                id: "entry-1",
                headline: "A Thermal Is a Column",
                body: "A thermal isn't a gust of hot air — it's a rotating column of rising air, typically 100-300m in diameter. Think of it as a spinning cylinder. Your goal is to join its rotation, not punch through the middle.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.2, toX: 0.5, toY: 0.8, label: "Rising Air", color: "EF4444"),
                        DiagramArrow(fromX: 0.3, fromY: 0.5, toX: 0.4, toY: 0.6, label: "", color: "F59E0B"),
                        DiagramArrow(fromX: 0.6, fromY: 0.6, toX: 0.7, toY: 0.5, label: "", color: "F59E0B"),
                    ],
                    centerLabel: "Thermal Core"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "entry-2",
                headline: "Enter Tangentially",
                body: "Never fly directly into a thermal head-on. You'll pass through the lift band and into sink on the other side before you can turn. Instead, approach at 45° to the edge — tangentially. This lets you feel the lift and begin turning immediately.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        // Thermal column
                        DiagramArrow(fromX: 0.5, fromY: 0.2, toX: 0.5, toY: 0.8, label: "Lift", color: "22C55E"),
                        // Bad approach — head on
                        DiagramArrow(fromX: 0.1, fromY: 0.5, toX: 0.5, toY: 0.5, label: "Wrong ✗", color: "EF4444"),
                        // Good approach — tangential
                        DiagramArrow(fromX: 0.15, fromY: 0.7, toX: 0.4, toY: 0.55, label: "Correct ✓", color: "22C55E"),
                    ],
                    centerLabel: "Core"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "entry-3",
                headline: "Feel the Wing",
                body: "As you enter the thermal's edge, one wing will lift. This tells you which side the core is on. If your RIGHT wing lifts, the core is to your RIGHT — turn right. The vario confirms, but the wing tells you first.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        // Lift zone
                        DiagramArrow(fromX: 0.6, fromY: 0.3, toX: 0.6, toY: 0.7, label: "Lift", color: "22C55E"),
                        // Glider path
                        DiagramArrow(fromX: 0.2, fromY: 0.6, toX: 0.45, toY: 0.5, label: "Approach", color: "F59E0B"),
                        // Wing tip indicators
                        DiagramArrow(fromX: 0.55, fromY: 0.45, toX: 0.55, toY: 0.35, label: "Wing lifts ↑", color: "3B82F6"),
                    ],
                    centerLabel: "Glider"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "entry-4",
                headline: "Commit to the Turn",
                body: "Once you feel lift on one wing, commit immediately. Bank 30–40° and begin circling. Don't hesitate — thermals are small and you'll fly through weak lift into sink if you delay. A decisive turn into the lifting wing is the single most important skill in soaring.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        // Circular path
                        DiagramArrow(fromX: 0.65, fromY: 0.3, toX: 0.75, toY: 0.5, label: "", color: "22C55E"),
                        DiagramArrow(fromX: 0.75, fromY: 0.5, toX: 0.65, toY: 0.7, label: "", color: "22C55E"),
                        DiagramArrow(fromX: 0.65, fromY: 0.7, toX: 0.5, toY: 0.6, label: "", color: "22C55E"),
                        DiagramArrow(fromX: 0.5, fromY: 0.6, toX: 0.5, toY: 0.4, label: "", color: "22C55E"),
                        DiagramArrow(fromX: 0.5, fromY: 0.4, toX: 0.65, toY: 0.3, label: "Circle", color: "22C55E"),
                        // Core
                        DiagramArrow(fromX: 0.6, fromY: 0.25, toX: 0.6, toY: 0.75, label: "Core ↑", color: "EF4444"),
                    ],
                    centerLabel: "30-40° bank"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "entry-5",
                headline: "The Complete Technique",
                body: "To summarize: Approach tangentially → feel the lifting wing → turn toward the lift → commit to 30-40° bank → circle in the core. The whole sequence takes 3-5 seconds from first contact to established turn. Speed is everything.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        // Approach
                        DiagramArrow(fromX: 0.1, fromY: 0.7, toX: 0.35, toY: 0.55, label: "1. Approach", color: "F59E0B"),
                        // Feel lift
                        DiagramArrow(fromX: 0.35, fromY: 0.55, toX: 0.45, toY: 0.45, label: "2. Feel lift", color: "3B82F6"),
                        // Turn
                        DiagramArrow(fromX: 0.45, fromY: 0.45, toX: 0.6, toY: 0.35, label: "3. Turn in", color: "22C55E"),
                        // Circle
                        DiagramArrow(fromX: 0.6, fromY: 0.35, toX: 0.7, toY: 0.5, label: "4. Circle", color: "22C55E"),
                        // Core
                        DiagramArrow(fromX: 0.55, fromY: 0.2, toX: 0.55, toY: 0.8, label: "Core", color: "EF4444"),
                    ],
                    centerLabel: "Thermal"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "entry-q1",
                type: .multipleChoice,
                prompt: "What is the correct approach angle when entering a thermal?",
                difficulty: .intermediate,
                explanation: "A tangential (45°) approach lets you feel the lift gradient and begin turning immediately, rather than flying straight through the thermal.",
                options: [
                    PracticeOption(label: "Tangentially (at ~45° to the edge)", correct: true, explanation: "This gives you time to feel the lift and begin your turn before passing through."),
                    PracticeOption(label: "Directly head-on through the center", correct: false, explanation: "Head-on, you'll fly through the narrow core and into sink before you can react."),
                    PracticeOption(label: "Parallel to the thermal, then hard turn in", correct: false, explanation: "Parallel approaches waste too much time and distance. You may fly past the thermal entirely."),
                    PracticeOption(label: "From above, descending into the thermal", correct: false, explanation: "You enter thermals from the side, not from above. They rise — you want to join the rising column."),
                ]
            ),
            PracticeQuestion(
                id: "entry-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "The vario has lag — it responds to pressure changes that take a moment to register. Your wing responds instantly to differential lift, giving you faster information about where the core is.",
                statement: "Your variometer (vario) is the first and best indicator of which side the thermal core is on.",
                isTrue: false,
                reasoning: "The wing responds before the vario. If your right wing lifts, the core is to your right. The vario confirms what the wing already told you, but with delay."
            ),
            PracticeQuestion(
                id: "entry-q3",
                type: .sequenceOrder,
                prompt: "Put the thermal entry steps in the correct order:",
                difficulty: .intermediate,
                explanation: "The sequence is: approach at an angle, feel which wing lifts (tells you core location), turn toward the lift, then commit to a tight bank to circle in the core.",
                correctOrder: ["Approach tangentially", "Feel the lifting wing", "Turn toward the lift", "Bank 30-40° and circle"],
                shuffledItems: ["Bank 30-40° and circle", "Approach tangentially", "Turn toward the lift", "Feel the lifting wing"]
            ),
            PracticeQuestion(
                id: "entry-q4",
                type: .multipleChoice,
                prompt: "You're flying straight and your LEFT wing suddenly lifts. Where is the thermal core?",
                difficulty: .intermediate,
                explanation: "The wing that lifts is on the side of the thermal. Differential lift pushes up the wing closest to the core.",
                options: [
                    PracticeOption(label: "To your left — turn left", correct: true, explanation: "The lifting wing points toward the core. Turn into the lift immediately."),
                    PracticeOption(label: "To your right — turn right", correct: false, explanation: "The right wing is NOT lifting. The core is on the side where lift is pushing up."),
                    PracticeOption(label: "Directly ahead — fly straight", correct: false, explanation: "If the core were ahead, both wings would lift equally. One wing lifting means the core is to that side."),
                    PracticeOption(label: "Behind you — turn around", correct: false, explanation: "If the core were behind you, you'd feel sink, not lift on a wing."),
                ]
            ),
        ],
        synthesisPrompt: "Thermal entry requires understanding thermal structure (from the Weather domain) and translating it into physical technique. How does knowing that thermals are triggered by dark surfaces help you predict where to start looking for your next thermal?",
        conceptMapNodes: [
            ConceptMapNode(id: "thermal-entry", label: "Thermal Entry", domain: .flying, x: 0.5, y: 0.3, connections: ["thermals", "centering", "reading-the-sky"]),
            ConceptMapNode(id: "thermals", label: "Thermals", domain: .weather, x: 0.2, y: 0.5, connections: ["thermal-entry"]),
            ConceptMapNode(id: "centering", label: "Centering", domain: .flying, x: 0.8, y: 0.5, connections: ["thermal-entry"]),
            ConceptMapNode(id: "reading-the-sky", label: "Reading the Sky", domain: .flying, x: 0.5, y: 0.7, connections: ["thermal-entry", "thermals"]),
        ]
    )

    // MARK: - Soaring Fundamentals

    static let soaringFundamentals = Lesson(
        id: "soaring-fundamentals",
        domain: .flying,
        teachingSteps: [
            TeachingStep(
                id: "soaring-1",
                headline: "Three Sources of Lift",
                body: "All soaring flight relies on three sources: ridge lift (wind deflected upward by terrain), thermals (buoyant air rising from heated surfaces), and convergence (air masses colliding and forced upward). Each has distinct characteristics and requirements.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.7, toX: 0.2, toY: 0.3, label: "Ridge", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.7, toX: 0.5, toY: 0.2, label: "Thermal", color: "EF4444"),
                        DiagramArrow(fromX: 0.8, fromY: 0.7, toX: 0.8, toY: 0.3, label: "Convergence", color: "22C55E"),
                    ],
                    centerLabel: "Three Lift Types"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "soaring-2",
                headline: "Glide Ratio Fundamentals",
                body: "Your glide ratio (L/D) is the distance traveled horizontally per unit of altitude lost. A paraglider with 10:1 glide ratio travels 10 meters forward for every 1 meter down. Modern wings achieve 40:1 or better in still air. This number determines everything.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.1, fromY: 0.3, toX: 0.9, toY: 0.7, label: "10km horizontal", color: "22C55E"),
                        DiagramArrow(fromX: 0.9, fromY: 0.7, toX: 0.9, toY: 0.9, label: "1km down", color: "EF4444"),
                    ],
                    centerLabel: "10:1 Glide Ratio"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "soaring-3",
                headline: "Sink Rate vs. Glide Ratio",
                body: "Sink rate (meters per second descent) and glide ratio are related but different. Your minimum sink speed gives the slowest descent but worst glide ratio. Best glide speed gives maximum distance. Speed-to-fly theory chooses between them based on conditions.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.3, fromY: 0.4, toX: 0.3, toY: 0.8, label: "Min sink: -1.0 m/s", color: "F59E0B"),
                        DiagramArrow(fromX: 0.7, fromY: 0.2, toX: 0.7, toY: 0.8, label: "Best L/D: -1.2 m/s", color: "22C55E"),
                    ],
                    centerLabel: "Speed affects sink"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "soaring-4",
                headline: "Energy Management",
                body: "You have two forms of energy: altitude (potential) and speed (kinetic). You can trade between them. Pull in for speed, push out to climb. But every conversion has a cost. Understanding this exchange is the foundation of efficient flight.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.2, toX: 0.7, toY: 0.5, label: "Speed up →", color: "EF4444"),
                        DiagramArrow(fromX: 0.7, fromY: 0.6, toX: 0.5, toY: 0.3, label: "← Climb", color: "22C55E"),
                    ],
                    centerLabel: "Energy exchange"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "soaring-q1",
                type: .multipleChoice,
                prompt: "You're at a coastal ridge with 15kt onshore wind and cumulus forming inland. What lift sources are available?",
                difficulty: .foundation,
                explanation: "Onshore wind creates ridge lift where it hits terrain. Cumulus indicate active thermals. Both lift types are working.",
                options: [
                    PracticeOption(label: "Ridge lift at the coast, thermals inland", correct: true, explanation: "15kt onshore creates ridge lift. Cumulus prove thermals are working inland."),
                    PracticeOption(label: "Only ridge lift — wind is too strong for thermals", correct: false, explanation: "Wind doesn't prevent thermal formation. The cumulus prove thermals exist."),
                    PracticeOption(label: "Only thermals — 15kt is too light for ridge", correct: false, explanation: "15kt is excellent for ridge lift."),
                    PracticeOption(label: "Convergence where ridge and thermal meet", correct: false, explanation: "Ridge and thermal are different lift types, not a convergence zone."),
                ]
            ),
            PracticeQuestion(
                id: "soaring-q2",
                type: .calculation,
                prompt: "Your glider has a 35:1 glide ratio. You're at 3,500ft AGL. How far can you glide in still air?",
                difficulty: .foundation,
                explanation: "Glide ratio × altitude = distance. 35:1 means 35 meters horizontal per 1 meter vertical. At 3,500ft (~1,067m), you can glide 35 × 1,067m = 37.3km.",
                correctAnswer: 37.3,
                tolerance: 2.0,
                answerUnit: "km"
            ),
            PracticeQuestion(
                id: "soaring-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Minimum sink speed gives the slowest descent, not the furthest glide. Best glide speed (best L/D) gives maximum distance. They're different speeds with different purposes.",
                statement: "Flying at minimum sink speed will give you the furthest possible glide distance.",
                isTrue: false,
                reasoning: "Minimum sink minimizes altitude loss per second, but best L/D speed maximizes distance traveled. Best L/D is faster than minimum sink."
            ),
            PracticeQuestion(
                id: "soaring-q4",
                type: .sequenceOrder,
                prompt: "Rank these lift sources by typical strength (weakest to strongest):",
                difficulty: .intermediate,
                explanation: "Ridge lift is typically 1-3 m/s. Strong thermals reach 3-5 m/s. Convergence zones can produce 5-8 m/s or more — the strongest lift available.",
                correctOrder: ["Ridge lift (1-3 m/s)", "Strong thermals (3-5 m/s)", "Convergence lift (5-8 m/s)"],
                shuffledItems: ["Strong thermals (3-5 m/s)", "Convergence lift (5-8 m/s)", "Ridge lift (1-3 m/s)"]
            ),
        ],
        synthesisPrompt: "Understanding atmospheric structure from the Weather domain connects directly to soaring fundamentals. How does knowing the temperature lapse rate help you predict the strength and height of thermals on a given day?",
        conceptMapNodes: [
            ConceptMapNode(id: "soaring-fundamentals", label: "Soaring Fundamentals", domain: .flying, x: 0.5, y: 0.3, connections: ["atmosphere", "thermal-entry", "glide-ratio"]),
            ConceptMapNode(id: "atmosphere", label: "Atmosphere", domain: .weather, x: 0.2, y: 0.5, connections: ["soaring-fundamentals"]),
            ConceptMapNode(id: "thermal-entry", label: "Thermal Entry", domain: .flying, x: 0.8, y: 0.5, connections: ["soaring-fundamentals"]),
            ConceptMapNode(id: "glide-ratio", label: "Glide Ratio", domain: .flying, x: 0.5, y: 0.7, connections: ["soaring-fundamentals", "speed-to-fly"]),
        ]
    )

    // MARK: - Reading the Sky

    static let readingSky = Lesson(
        id: "reading-sky",
        domain: .flying,
        teachingSteps: [
            TeachingStep(
                id: "sky-1",
                headline: "Cumulus: The Thermal Marker",
                body: "Cumulus clouds with flat bases and cauliflower tops mark active thermals. The cloud IS the top of the thermal — rising air condenses at the lifting condensation level (LCL). If you see a cumulus, there's likely a thermal column beneath it.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "A well-developed cumulus cloud marking an active thermal column",
                    hotspots: [
                        RevealItem(id: "cloud-1", label: "Flat base", detail: "Marks the LCL — where rising air reaches dewpoint", x: 0.5, y: 0.3),
                        RevealItem(id: "cloud-2", label: "Cauliflower top", detail: "Active convection — thermal still rising and growing", x: 0.5, y: 0.15),
                        RevealItem(id: "cloud-3", label: "Dark base", detail: "Thick cloud = strong thermal with high moisture content", x: 0.35, y: 0.32),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "sky-2",
                headline: "Cloud Streets and Lines",
                body: "When cumulus form in organized lines or streets, they mark convergence zones or wind shear boundaries. These are highways of lift — you can fly 50-100km along a single street without circling. Always orient your route along streets, never across them.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "A thermal street — organized line of cumulus marking a zone of continuous lift",
                    hotspots: [
                        RevealItem(id: "street-1", label: "Cloud street", detail: "Line of cumulus aligned with wind shear", x: 0.3, y: 0.5),
                        RevealItem(id: "street-2", label: "Blue holes", detail: "Gaps between thermals — expect sink here", x: 0.6, y: 0.5),
                        RevealItem(id: "street-3", label: "Street orientation", detail: "Aligned with prevailing wind direction", x: 0.5, y: 0.7),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "sky-3",
                headline: "Dying vs. Building Clouds",
                body: "A cloud with sharp, hard edges and brilliant white top is actively building — the thermal beneath it is strong. Wispy, frayed edges and a flattening top mean the thermal is dying or has hit an inversion. Fly toward the builders, away from the dying.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Active vs. dying cumulus — reading cloud health tells you where lift is",
                    hotspots: [
                        RevealItem(id: "build-1", label: "Building cloud", detail: "Sharp edges, growing towers — strong active lift", x: 0.3, y: 0.4),
                        RevealItem(id: "dying-1", label: "Dying cloud", detail: "Wispy edges, flattening — thermal weakening or gone", x: 0.7, y: 0.4),
                        RevealItem(id: "inversion", label: "Spreading top", detail: "Cloud hit inversion layer — climb is capped", x: 0.5, y: 0.2),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "sky-4",
                headline: "Shadow and Surface",
                body: "Dark surfaces heat fastest. Look for plowed fields, asphalt parking lots, rock faces. Avoid water, green fields, and forests — they suppress thermals. The surface UNDER the cloud tells you if the thermal is worth chasing. Cumulus over a lake? Skip it.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Surface types determine thermal strength — read the ground, not just the sky",
                    hotspots: [
                        RevealItem(id: "surface-1", label: "Dark field", detail: "Strong thermal trigger — high absorption", x: 0.3, y: 0.7),
                        RevealItem(id: "surface-2", label: "Lake", detail: "Thermal killer — high thermal mass, low absorption", x: 0.7, y: 0.7),
                        RevealItem(id: "surface-3", label: "Town/asphalt", detail: "Urban heat island — reliable late-day thermals", x: 0.5, y: 0.8),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "sky-q1",
                type: .multipleChoice,
                prompt: "You see a cumulus with dark flat base and spreading, flattening top. What does this tell you?",
                difficulty: .intermediate,
                explanation: "Dark base indicates a strong thermal (high moisture, thick cloud). Spreading top means it hit an inversion — lift will be capped at cloudbase.",
                options: [
                    PracticeOption(label: "Strong thermal, but climb is capped by inversion", correct: true, explanation: "Dark base = strong lift. Spreading top = inversion stopping vertical development."),
                    PracticeOption(label: "Dying thermal — avoid this cloud", correct: false, explanation: "Dark base indicates strong lift. The inversion caps it but doesn't kill it."),
                    PracticeOption(label: "Thunderstorm development — evacuate immediately", correct: false, explanation: "Spreading cumulus indicates inversion, not storm development."),
                    PracticeOption(label: "Weak thermal with low cloudbase", correct: false, explanation: "Dark base indicates strong, moist thermal, not weak."),
                ]
            ),
            PracticeQuestion(
                id: "sky-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Water has very high thermal mass and low absorption — it heats slowly and suppresses thermal development. Cumulus over water usually indicate thermals that started over land and drifted downwind.",
                statement: "A cumulus cloud directly over a large lake is a good indicator of strong thermal lift in that location.",
                isTrue: false,
                reasoning: "Water suppresses thermals. The cumulus likely drifted from an upwind source. The thermal beneath it over the lake is weak or nonexistent."
            ),
            PracticeQuestion(
                id: "sky-q3",
                type: .matchPairs,
                prompt: "Match the cloud characteristic to its meaning:",
                difficulty: .intermediate,
                explanation: "Sharp edges mean active convection. Dark base means strong lift with moisture. Wispy edges mean the thermal is dying. Flat top means inversion cap.",
                matchPairs: [
                    MatchPair(left: "Sharp, hard edges", right: "Active building thermal"),
                    MatchPair(left: "Dark flat base", right: "Strong lift with high moisture"),
                    MatchPair(left: "Wispy, frayed edges", right: "Dying or weakening thermal"),
                    MatchPair(left: "Spreading, flattening top", right: "Inversion capping climb"),
                ]
            ),
            PracticeQuestion(
                id: "sky-q4",
                type: .sequenceOrder,
                prompt: "Rank these surface types by thermal strength (weakest to strongest):",
                difficulty: .foundation,
                explanation: "Water suppresses thermals. Green fields produce weak thermals. Dry dark surfaces (plowed field, rock, asphalt) produce the strongest thermals.",
                correctOrder: ["Lake or reservoir", "Green grass field", "Plowed dark soil or asphalt"],
                shuffledItems: ["Green grass field", "Plowed dark soil or asphalt", "Lake or reservoir"]
            ),
        ],
        synthesisPrompt: "Reading the sky requires both cloud identification (from the Weather domain) and understanding how surface heating produces thermals. How does knowing cloud classification help you differentiate between cumulus (flyable), altocumulus (too high), and cumulonimbus (dangerous)?",
        conceptMapNodes: [
            ConceptMapNode(id: "reading-sky", label: "Reading the Sky", domain: .flying, x: 0.5, y: 0.3, connections: ["clouds", "thermals", "thermal-entry"]),
            ConceptMapNode(id: "clouds", label: "Clouds", domain: .weather, x: 0.2, y: 0.5, connections: ["reading-sky"]),
            ConceptMapNode(id: "thermals-weather", label: "Thermals", domain: .weather, x: 0.8, y: 0.5, connections: ["reading-sky"]),
            ConceptMapNode(id: "thermal-entry-ref", label: "Thermal Entry", domain: .flying, x: 0.5, y: 0.7, connections: ["reading-sky"]),
        ]
    )

    // MARK: - Centering

    static let centering = Lesson(
        id: "centering",
        domain: .flying,
        teachingSteps: [
            TeachingStep(
                id: "centering-1",
                headline: "The Core Is Narrow",
                body: "The strongest part of a thermal — the core — is typically only 20-50 meters wide. Your turn radius at 30° bank is about 40 meters. This means you're constantly drifting in and out of the core as you circle. Centering is the technique of shifting your circle to stay in the strongest lift.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.2, toX: 0.5, toY: 0.8, label: "Core (narrow)", color: "EF4444"),
                        DiagramArrow(fromX: 0.65, fromY: 0.3, toX: 0.75, toY: 0.5, label: "", color: "22C55E"),
                        DiagramArrow(fromX: 0.75, fromY: 0.5, toX: 0.65, toY: 0.7, label: "", color: "22C55E"),
                        DiagramArrow(fromX: 0.65, fromY: 0.7, toX: 0.45, toY: 0.6, label: "Turn circle", color: "22C55E"),
                    ],
                    centerLabel: "Circle vs. Core"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "centering-2",
                headline: "Flatten When It Peaks",
                body: "When your variometer reaches maximum climb rate, flatten your turn slightly — reduce bank angle by 5-10°. This widens your turn radius on that side, shifting your circle toward the stronger lift. It's a subtle input, not a dramatic change.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.4, toX: 0.5, toY: 0.2, label: "Core", color: "EF4444"),
                        DiagramArrow(fromX: 0.6, fromY: 0.5, toX: 0.7, toY: 0.35, label: "Flatten turn →", color: "22C55E"),
                        DiagramArrow(fromX: 0.4, fromY: 0.6, toX: 0.3, toY: 0.65, label: "← Steepen turn", color: "F59E0B"),
                    ],
                    centerLabel: "Adjust bank angle"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "centering-3",
                headline: "Steepen When It Drops",
                body: "When the vario drops, steepen your bank angle. This tightens your turn on the weak side, shortening the time spent in sink. You're carving away from the sink and back toward the core. The combination — flatten in lift, steepen in sink — gradually walks your circle toward the strongest part of the thermal.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.2, label: "Strong lift", color: "22C55E"),
                        DiagramArrow(fromX: 0.7, fromY: 0.6, toX: 0.65, toY: 0.75, label: "Weak/sink", color: "EF4444"),
                        DiagramArrow(fromX: 0.55, fromY: 0.4, toX: 0.6, toY: 0.3, label: "Shift circle", color: "3B82F6"),
                    ],
                    centerLabel: "Walk toward core"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "centering-4",
                headline: "Read the Full Circle",
                body: "Don't react to every vario beep. Read the full 360° turn. Where does it peak? Where does it drop? The pattern repeats every circle. Strong at north, weak at south means the core is to the north. Shift your circle north by flattening your turn when heading north, steepening when heading south.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.5, toY: 0.1, label: "Peak: +4 m/s (North)", color: "22C55E"),
                        DiagramArrow(fromX: 0.7, fromY: 0.5, toX: 0.8, toY: 0.5, label: "+2 m/s (East)", color: "F59E0B"),
                        DiagramArrow(fromX: 0.5, fromY: 0.7, toX: 0.5, toY: 0.9, label: "Drop: +1 m/s (South)", color: "EF4444"),
                        DiagramArrow(fromX: 0.3, fromY: 0.5, toX: 0.2, toY: 0.5, label: "+2 m/s (West)", color: "F59E0B"),
                    ],
                    centerLabel: "Core is North"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "centering-q1",
                type: .multipleChoice,
                prompt: "You're circling in a thermal. Vario reads +3 m/s on the east side, +1 m/s on the west. What should you do?",
                difficulty: .intermediate,
                explanation: "The core is to the east (where lift is stronger). Flatten your turn when heading east (wider arc toward core). Steepen when heading west (tighter arc away from sink).",
                options: [
                    PracticeOption(label: "Flatten turn on east side, steepen on west — shift circle east", correct: true, explanation: "This shifts your circle toward the stronger lift on the east side."),
                    PracticeOption(label: "Tighten the entire turn to stay in the core", correct: false, explanation: "Tightening both sides doesn't shift your circle position."),
                    PracticeOption(label: "Fly straight east to find the core", correct: false, explanation: "Breaking out of the turn risks losing the thermal entirely."),
                    PracticeOption(label: "Steepen turn on east side, flatten on west", correct: false, explanation: "This shifts you AWAY from the core. You want the opposite."),
                ]
            ),
            PracticeQuestion(
                id: "centering-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "You should react to the pattern, not individual beeps. Thermals are turbulent — the vario fluctuates constantly. Read the full 360° circle to identify where lift peaks and drops, then adjust accordingly.",
                statement: "You should adjust your bank angle immediately every time the variometer beeps or changes tone.",
                isTrue: false,
                reasoning: "Reacting to every beep creates over-corrections and unstable flight. Wait for the pattern to emerge over a full circle, then make smooth adjustments."
            ),
            PracticeQuestion(
                id: "centering-q3",
                type: .sequenceOrder,
                prompt: "Put the centering steps in order:",
                difficulty: .intermediate,
                explanation: "First, establish a turn and read the vario pattern over a full circle. Identify where lift peaks. Flatten turn at peak (shift toward core). Steepen in sink (shift away from weak side). Repeat.",
                correctOrder: ["Establish 30-40° bank and complete one full circle", "Identify where vario peaks and where it drops", "Flatten bank angle where vario peaks", "Steepen bank angle where vario drops"],
                shuffledItems: ["Flatten bank angle where vario peaks", "Identify where vario peaks and where it drops", "Establish 30-40° bank and complete one full circle", "Steepen bank angle where vario drops"]
            ),
            PracticeQuestion(
                id: "centering-q4",
                type: .calculation,
                prompt: "Your turn radius at 30° bank is 40m. The thermal core is 30m wide. What percentage of each circle is spent in the core if perfectly centered?",
                difficulty: .advanced,
                explanation: "If the core is 30m wide and your turn diameter is 80m (radius × 2), the core occupies 30/80 = 37.5% of the circle diameter. Centering maximizes time in this zone.",
                correctAnswer: 37.5,
                tolerance: 5.0,
                answerUnit: "%"
            ),
        ],
        synthesisPrompt: "Centering requires understanding thermal structure from the Weather domain. How does knowing that thermals are strongest in the center and weaken toward the edges help you interpret variometer readings during a turn?",
        conceptMapNodes: [
            ConceptMapNode(id: "centering", label: "Centering", domain: .flying, x: 0.5, y: 0.3, connections: ["thermal-entry", "thermals-structure", "climbing"]),
            ConceptMapNode(id: "thermal-entry-centering", label: "Thermal Entry", domain: .flying, x: 0.2, y: 0.5, connections: ["centering"]),
            ConceptMapNode(id: "thermals-structure", label: "Thermals", domain: .weather, x: 0.8, y: 0.5, connections: ["centering"]),
            ConceptMapNode(id: "climbing-ref", label: "Climbing", domain: .flying, x: 0.5, y: 0.7, connections: ["centering"]),
        ]
    )

    // MARK: - Climbing to Cloudbase

    static let climbing = Lesson(
        id: "climbing",
        domain: .flying,
        teachingSteps: [
            TeachingStep(
                id: "climbing-1",
                headline: "Cloudbase Is Not the Goal",
                body: "Pilots instinctively want to climb to cloudbase — maximum altitude. But cloudbase is often dangerous (cloud suck, reduced visibility, icing). The goal is not maximum altitude, but optimal altitude for your next move. Sometimes that's 500ft below cloudbase.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "danger", label: "Cloud suck zone", minValue: 5500, maxValue: 6500, color: "EF4444", description: "Dangerous — strong lift into cloud"),
                        DiagramZone(id: "optimal", label: "Optimal departure", minValue: 4500, maxValue: 5500, color: "22C55E", description: "Safe altitude for next glide"),
                        DiagramZone(id: "low", label: "Too low", minValue: 0, maxValue: 4500, color: "F59E0B", description: "May not reach next thermal"),
                    ],
                    minValue: 0,
                    maxValue: 7000,
                    unit: "ft AGL",
                    currentValue: 5000
                ),
                interactionHint: "Leave the thermal in the green zone",
                revealItems: nil
            ),
            TeachingStep(
                id: "climbing-2",
                headline: "Know Your Exit Altitude",
                body: "Before you enter a thermal, know where you're going next and what altitude you need to get there. If the next thermal is 6km away and you need 2,000ft to glide there safely, climb to 2,500ft (500ft buffer) then leave. Don't climb just because the thermal is still working.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "excess", label: "Excess climb", minValue: 3000, maxValue: 4000, color: "3B82F6", description: "More than needed — wasting time"),
                        DiagramZone(id: "target", label: "Target altitude", minValue: 2500, maxValue: 3000, color: "22C55E", description: "Optimal for next glide"),
                        DiagramZone(id: "insufficient", label: "Insufficient", minValue: 0, maxValue: 2500, color: "EF4444", description: "Won't reach next thermal"),
                    ],
                    minValue: 0,
                    maxValue: 4000,
                    unit: "ft AGL",
                    currentValue: 2800
                ),
                interactionHint: "Climb to green zone, then leave",
                revealItems: nil
            ),
            TeachingStep(
                id: "climbing-3",
                headline: "Weak Lift Near Cloudbase",
                body: "Thermals weaken as they approach cloudbase. The strongest lift is typically in the middle third of the thermal column. Near cloudbase, lift often drops to +0.5 m/s or weaker. You're wasting time circling in weak lift when you could be gliding to the next strong thermal.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "weak-top", label: "Weak lift", minValue: 5000, maxValue: 6000, color: "F59E0B", description: "+0.5 to +1 m/s — slow climbing"),
                        DiagramZone(id: "strong-mid", label: "Strong core", minValue: 3000, maxValue: 5000, color: "22C55E", description: "+3 to +5 m/s — fastest climb"),
                        DiagramZone(id: "weak-low", label: "Entry zone", minValue: 0, maxValue: 3000, color: "3B82F6", description: "+1 to +3 m/s — building strength"),
                    ],
                    minValue: 0,
                    maxValue: 6000,
                    unit: "ft AGL",
                    currentValue: 4000
                ),
                interactionHint: "Best climb rate is in the green zone",
                revealItems: nil
            ),
            TeachingStep(
                id: "climbing-4",
                headline: "Cloud Suck Is Real",
                body: "Strong thermals create powerful updrafts at cloudbase — cloud suck. You can be pulled into cloud at 5-8 m/s, unable to escape. Inside cloud: zero visibility, disorientation, possible icing, and (in some countries) regulatory violations. Leave 500-1000ft below cloudbase as a safety margin.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "in-cloud", label: "In cloud", minValue: 6500, maxValue: 8000, color: "EF4444", description: "Dangerous — no visibility, icing risk"),
                        DiagramZone(id: "suck-zone", label: "Cloud suck", minValue: 6000, maxValue: 6500, color: "F59E0B", description: "Strong updraft — may be pulled in"),
                        DiagramZone(id: "safe", label: "Safe altitude", minValue: 0, maxValue: 6000, color: "22C55E", description: "Clear of cloudbase hazards"),
                    ],
                    minValue: 0,
                    maxValue: 8000,
                    unit: "ft AGL",
                    currentValue: 5800
                ),
                interactionHint: "Exit in green zone, avoid yellow and red",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "climbing-q1",
                type: .multipleChoice,
                prompt: "You're climbing at +2 m/s at 5,000ft. Cloudbase is 6,500ft. Next thermal is 8km away. When should you leave?",
                difficulty: .intermediate,
                explanation: "You need altitude for 8km glide plus safety margin, but must leave before cloudbase. 6,000ft gives 500ft margin below cloudbase and sufficient altitude for the glide.",
                options: [
                    PracticeOption(label: "Around 6,000ft — safe margin below cloudbase, enough for the glide", correct: true, explanation: "500ft below cloudbase avoids cloud suck. 6,000ft is sufficient for 8km glide."),
                    PracticeOption(label: "Climb to cloudbase for maximum altitude", correct: false, explanation: "Cloudbase is dangerous. Cloud suck and visibility issues aren't worth the extra 500ft."),
                    PracticeOption(label: "Leave immediately — +2 m/s is weak", correct: false, explanation: "+2 m/s is a good climb rate. You have 1,500ft more to gain."),
                    PracticeOption(label: "Climb to 6,500ft then dive away from cloud suck", correct: false, explanation: "Why risk cloud suck when you can leave 500ft earlier with sufficient altitude?"),
                ]
            ),
            PracticeQuestion(
                id: "climbing-q2",
                type: .calculation,
                prompt: "Your glider has 35:1 glide ratio. Next thermal is 7km away. What altitude (in meters) do you need, minimum?",
                difficulty: .intermediate,
                explanation: "7km = 7,000m. Glide ratio 35:1 means 35m forward per 1m down. Altitude needed = 7,000 ÷ 35 = 200m minimum (add safety margin in practice).",
                correctAnswer: 200,
                tolerance: 10,
                answerUnit: "m"
            ),
            PracticeQuestion(
                id: "climbing-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Thermals weaken near cloudbase as the temperature difference between rising air and environment decreases. The strongest lift is typically in the middle third of the column.",
                statement: "The strongest part of a thermal is always at the top, just below cloudbase.",
                isTrue: false,
                reasoning: "Thermals weaken near cloudbase. The core is strongest in the middle third of the column, where temperature differential is greatest."
            ),
            PracticeQuestion(
                id: "climbing-q4",
                type: .sequenceOrder,
                prompt: "Order these actions for safe climbing:",
                difficulty: .intermediate,
                explanation: "Before entering, know your target altitude. Climb through the strong middle section. Monitor cloudbase distance. Exit with safe margin below cloudbase.",
                correctOrder: ["Calculate altitude needed for next glide", "Climb through strong mid-level core", "Monitor distance to cloudbase", "Exit 500-1000ft below cloudbase"],
                shuffledItems: ["Monitor distance to cloudbase", "Calculate altitude needed for next glide", "Exit 500-1000ft below cloudbase", "Climb through strong mid-level core"]
            ),
        ],
        synthesisPrompt: "Climbing decisions depend on understanding lapse rates from the Weather domain. How does knowing the lifting condensation level (LCL) help you predict cloudbase altitude before you even launch?",
        conceptMapNodes: [
            ConceptMapNode(id: "climbing", label: "Climbing", domain: .flying, x: 0.5, y: 0.3, connections: ["lapse-rates", "centering", "cloudbase"]),
            ConceptMapNode(id: "lapse-rates-ref", label: "Lapse Rates", domain: .weather, x: 0.2, y: 0.5, connections: ["climbing"]),
            ConceptMapNode(id: "centering-climb", label: "Centering", domain: .flying, x: 0.8, y: 0.5, connections: ["climbing"]),
            ConceptMapNode(id: "cloudbase", label: "Cloudbase", domain: .flying, x: 0.5, y: 0.7, connections: ["climbing", "cloud-suck"]),
        ]
    )

    // MARK: - Valley Flying

    static let valleyFlying = Lesson(
        id: "valley-flying",
        domain: .flying,
        teachingSteps: [
            TeachingStep(
                id: "valley-1",
                headline: "Valleys Breathe",
                body: "By day, valley slopes heat and generate anabatic (up-valley) winds. By night, they cool and produce katabatic (down-valley) winds. This daily cycle is predictable and exploitable. Understanding which slope is working at what time is key to valley flying.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.3, fromY: 0.6, toX: 0.5, toY: 0.4, label: "Anabatic ↑", color: "EF4444"),
                        DiagramArrow(fromX: 0.7, fromY: 0.6, toX: 0.5, toY: 0.4, label: "Anabatic ↑", color: "EF4444"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 0.2, y: 0.5),
                        DiagramPoint(x: 0.5, y: 0.3),
                        DiagramPoint(x: 0.8, y: 0.5),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "wind",
                    labels: ["East slope (morning sun)", "West slope (afternoon sun)"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "valley-2",
                headline: "Fly the Sunny Side First",
                body: "In the morning, the east-facing slope has been in sun longest. It heats first and produces the earliest thermals. Fly the sunny side until midday, then watch for the thermal cycle to shift. By afternoon, the west-facing slope (now in sun) becomes the active side.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.25, fromY: 0.6, toX: 0.25, toY: 0.3, label: "Strong thermals (AM)", color: "22C55E"),
                        DiagramArrow(fromX: 0.75, fromY: 0.7, toX: 0.75, toY: 0.5, label: "Weak (shaded)", color: "F59E0B"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 0.3, y: 0.5),
                        DiagramPoint(x: 0.5, y: 0.4),
                        DiagramPoint(x: 0.7, y: 0.5),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: nil,
                    labels: ["East slope: morning sun", "West slope: in shade"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "valley-3",
                headline: "Valley Wind Convergence",
                body: "By late afternoon, both slopes produce thermals that meet in the valley center, creating a convergence zone. This is some of the strongest, most reliable lift in a valley system. Look for a line of cumulus forming down the valley centerline — that's the convergence zone.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.3, fromY: 0.6, toX: 0.5, toY: 0.35, label: "", color: "3B82F6"),
                        DiagramArrow(fromX: 0.7, fromY: 0.6, toX: 0.5, toY: 0.35, label: "", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.35, toX: 0.5, toY: 0.15, label: "Convergence ↑", color: "22C55E"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 0.3, y: 0.5),
                        DiagramPoint(x: 0.5, y: 0.3),
                        DiagramPoint(x: 0.7, y: 0.5),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "clouds",
                    labels: ["Valley convergence", "Cloud line"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "valley-4",
                headline: "Evening Transition: Get Out",
                body: "As the sun sets, anabatic winds stop and katabatic (down-valley) winds begin. This transition brings turbulence, sink, and rapidly deteriorating conditions. Know when the transition happens in your valley (usually 1-2 hours before sunset) and be on the ground before it starts.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.3, fromY: 0.5, toX: 0.5, toY: 0.7, label: "Katabatic ↓", color: "EF4444"),
                        DiagramArrow(fromX: 0.7, fromY: 0.5, toX: 0.5, toY: 0.7, label: "Katabatic ↓", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.7, toX: 0.5, toY: 0.9, label: "Down-valley", color: "EF4444"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 0.3, y: 0.5),
                        DiagramPoint(x: 0.5, y: 0.3),
                        DiagramPoint(x: 0.7, y: 0.5),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "wind",
                    labels: ["Evening katabatic flow", "Turbulent transition"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "valley-q1",
                type: .multipleChoice,
                prompt: "It's 1pm in a north-south alpine valley. The east slope is in full sun. Where should you fly?",
                difficulty: .intermediate,
                explanation: "By 1pm, the east slope has had full morning sun and produces the strongest thermals. The west slope is just beginning to heat.",
                options: [
                    PracticeOption(label: "East slope — it has been heating longest", correct: true, explanation: "The east slope received morning sun and is now producing strong thermals."),
                    PracticeOption(label: "West slope — it will have the freshest thermals", correct: false, explanation: "The west slope is just starting to receive sun. Thermals there are still weak."),
                    PracticeOption(label: "Valley center — convergence lift", correct: false, explanation: "Valley convergence develops later in the afternoon when both slopes are active."),
                    PracticeOption(label: "It doesn't matter — thermals are equal on both sides", correct: false, explanation: "Solar heating is asymmetric. The sunny side always produces stronger thermals."),
                ]
            ),
            PracticeQuestion(
                id: "valley-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Late afternoon valley convergence, where thermals from both slopes meet in the center, produces some of the strongest and most reliable lift. Look for cumulus lines marking the convergence zone.",
                statement: "The strongest lift in a valley system is always found on the slopes, never in the valley center.",
                isTrue: false,
                reasoning: "Late afternoon convergence in the valley center can be stronger than slope thermals. Both slopes feed air into the convergence zone."
            ),
            PracticeQuestion(
                id: "valley-q3",
                type: .sequenceOrder,
                prompt: "Order the daily valley wind cycle:",
                difficulty: .foundation,
                explanation: "Morning: anabatic up-valley. Afternoon: peak anabatic with convergence. Evening: transition to katabatic. Night: katabatic down-valley.",
                correctOrder: ["Morning: anabatic winds start", "Afternoon: valley convergence forms", "Evening: transition period", "Night: katabatic winds dominate"],
                shuffledItems: ["Afternoon: valley convergence forms", "Night: katabatic winds dominate", "Morning: anabatic winds start", "Evening: transition period"]
            ),
            PracticeQuestion(
                id: "valley-q4",
                type: .matchPairs,
                prompt: "Match the time of day to the best tactic:",
                difficulty: .intermediate,
                explanation: "Morning: east slopes heat first. Afternoon: west slopes are active, convergence forms. Evening: transition brings danger, land before it.",
                matchPairs: [
                    MatchPair(left: "Morning (9am-12pm)", right: "Fly the east-facing slope"),
                    MatchPair(left: "Afternoon (1pm-4pm)", right: "Fly west slope or valley convergence"),
                    MatchPair(left: "Evening (sunset -2hrs)", right: "Land before katabatic transition"),
                ]
            ),
        ],
        synthesisPrompt: "Valley flying tactics depend on understanding mountain wind patterns from the Weather domain. How does knowing the anabatic/katabatic cycle help you predict not just where to fly, but when it becomes unsafe to fly?",
        conceptMapNodes: [
            ConceptMapNode(id: "valley-flying", label: "Valley Flying", domain: .flying, x: 0.5, y: 0.3, connections: ["mountain-winds", "convergence-tactics", "thermal-timing"]),
            ConceptMapNode(id: "mountain-winds-ref", label: "Mountain Winds", domain: .weather, x: 0.2, y: 0.5, connections: ["valley-flying"]),
            ConceptMapNode(id: "convergence-tactics", label: "Convergence", domain: .flying, x: 0.8, y: 0.5, connections: ["valley-flying"]),
            ConceptMapNode(id: "thermal-timing", label: "Thermal Timing", domain: .flying, x: 0.5, y: 0.7, connections: ["valley-flying", "reading-sky"]),
        ]
    )

    // MARK: - Speed-to-Fly

    static let speedToFly = Lesson(
        id: "speed-to-fly",
        domain: .flying,
        teachingSteps: [
            TeachingStep(
                id: "speed-1",
                headline: "The McCready Concept",
                body: "McCready theory answers: what speed should I fly between thermals? The answer depends on how strong the next thermal will be. If you expect strong thermals (+5 m/s), fly fast — time spent gliding is wasted. If you expect weak thermals (+1 m/s), fly slow — conserve altitude.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "slow", label: "Slow (weak expected)", minValue: 0, maxValue: 1.5, color: "F59E0B", description: "Expecting weak lift — conserve altitude"),
                        DiagramZone(id: "cruise", label: "Cruise (moderate)", minValue: 1.5, maxValue: 3.5, color: "22C55E", description: "Normal conditions"),
                        DiagramZone(id: "fast", label: "Fast (strong expected)", minValue: 3.5, maxValue: 6.0, color: "3B82F6", description: "Expecting strong thermals — fly fast"),
                    ],
                    minValue: 0,
                    maxValue: 6.0,
                    unit: "m/s (expected climb)",
                    currentValue: 2.5
                ),
                interactionHint: "Set McCready to expected next thermal strength",
                revealItems: nil
            ),
            TeachingStep(
                id: "speed-2",
                headline: "Fast in Sink, Slow in Lift",
                body: "The McCready ring modifies your speed based on whether you're in lift or sink. In sink, speed up to minimize time in descending air. In lift, slow down to minimize altitude loss while you decide whether to turn. The vario plus McCready setting gives you the optimal speed continuously.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "sink-zone", label: "In sink: speed up", minValue: -3, maxValue: 0, color: "EF4444", description: "Fly faster to minimize time in sink"),
                        DiagramZone(id: "zero", label: "Still air: best L/D", minValue: 0, maxValue: 0.5, color: "22C55E", description: "Fly at best glide speed"),
                        DiagramZone(id: "lift-zone", label: "In lift: slow down", minValue: 0.5, maxValue: 3, color: "3B82F6", description: "Slow down to assess lift quality"),
                    ],
                    minValue: -3,
                    maxValue: 3,
                    unit: "m/s (current air)",
                    currentValue: -1.5
                ),
                interactionHint: "Adjust speed based on current air mass",
                revealItems: nil
            ),
            TeachingStep(
                id: "speed-3",
                headline: "The Math: Time vs. Distance",
                body: "Flying fast trades altitude for speed, covering more distance per unit time. Flying slow conserves altitude but takes longer. McCready theory calculates the optimal trade-off. The result: in good conditions (strong thermals expected), flying 10-15 km/h faster than best glide is optimal.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "too-slow", label: "Too slow", minValue: 30, maxValue: 40, color: "F59E0B", description: "Wasting time, poor average speed"),
                        DiagramZone(id: "optimal", label: "Optimal speed", minValue: 40, maxValue: 55, color: "22C55E", description: "Best distance per time"),
                        DiagramZone(id: "too-fast", label: "Too fast", minValue: 55, maxValue: 70, color: "EF4444", description: "Burning altitude, may not reach thermal"),
                    ],
                    minValue: 30,
                    maxValue: 70,
                    unit: "km/h",
                    currentValue: 48
                ),
                interactionHint: "Fly in the green zone for best average speed",
                revealItems: nil
            ),
            TeachingStep(
                id: "speed-4",
                headline: "When to Ignore McCready",
                body: "McCready assumes you'll find the expected thermal. If you're low, or uncertain about the next thermal, ignore McCready and fly conservatively. Arriving 200ft lower but 2 minutes faster is worthless if the thermal isn't there. Survival trumps optimization.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "critical", label: "Survival mode", minValue: 0, maxValue: 1000, color: "EF4444", description: "Ignore McCready — conserve altitude"),
                        DiagramZone(id: "low", label: "Conservative", minValue: 1000, maxValue: 2500, color: "F59E0B", description: "Reduce speed, prioritize safety"),
                        DiagramZone(id: "safe", label: "Use McCready", minValue: 2500, maxValue: 6000, color: "22C55E", description: "Enough altitude to optimize speed"),
                    ],
                    minValue: 0,
                    maxValue: 6000,
                    unit: "ft AGL",
                    currentValue: 1800
                ),
                interactionHint: "Below 2,500ft AGL, fly conservatively",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "speed-q1",
                type: .multipleChoice,
                prompt: "You're expecting +3 m/s thermals. You're currently in -1 m/s sink. What should you do?",
                difficulty: .advanced,
                explanation: "With McCready 3, you should already be flying faster than best L/D. In sink, speed up further to minimize time in descending air.",
                options: [
                    PracticeOption(label: "Speed up — McCready 3 says fly fast, and sink says speed up more", correct: true, explanation: "High McCready setting + sink both indicate: fly faster."),
                    PracticeOption(label: "Slow down to minimum sink to conserve altitude", correct: false, explanation: "In sink, slowing down wastes time. Fly fast to get through it."),
                    PracticeOption(label: "Maintain best L/D speed regardless of sink", correct: false, explanation: "Best L/D is only optimal when McCready = 0 (no lift expected)."),
                    PracticeOption(label: "Turn immediately — any lift is worth taking", correct: false, explanation: "-1 m/s is sink, not lift. Keep gliding."),
                ]
            ),
            PracticeQuestion(
                id: "speed-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .advanced,
                explanation: "McCready assumes you'll find the expected thermal. When low or uncertain, survival (conserving altitude) is more important than speed optimization. Fly conservatively.",
                statement: "You should always fly at the speed indicated by your McCready setting, regardless of altitude or conditions.",
                isTrue: false,
                reasoning: "When low or uncertain, ignore McCready and fly conservatively. Optimization assumes you'll find lift — at low altitude, that's a dangerous assumption."
            ),
            PracticeQuestion(
                id: "speed-q3",
                type: .sequenceOrder,
                prompt: "Order these steps for using McCready theory:",
                difficulty: .advanced,
                explanation: "First, estimate next thermal strength. Set McCready ring. Adjust speed based on current air. Reassess if conditions change or altitude becomes critical.",
                correctOrder: ["Estimate expected strength of next thermal", "Set McCready ring to that value", "Adjust speed based on current lift/sink", "Reassess if low or conditions change"],
                shuffledItems: ["Adjust speed based on current lift/sink", "Estimate expected strength of next thermal", "Reassess if low or conditions change", "Set McCready ring to that value"]
            ),
            PracticeQuestion(
                id: "speed-q4",
                type: .calculation,
                prompt: "Your best L/D speed is 45 km/h. McCready is set to 2.5 m/s (good thermals). In still air, you should fly approximately how much faster?",
                difficulty: .advanced,
                explanation: "With McCready 2.5, typical guidance is to fly 10-15 km/h faster than best L/D. So 45 + 12 ≈ 57 km/h is optimal cruise speed.",
                correctAnswer: 57,
                tolerance: 5,
                answerUnit: "km/h"
            ),
        ],
        synthesisPrompt: "Speed-to-fly connects to glide management and thermal expectations. How does understanding that thermals weaken near cloudbase affect your McCready setting as you approach the top of a climb?",
        conceptMapNodes: [
            ConceptMapNode(id: "speed-to-fly", label: "Speed-to-Fly", domain: .flying, x: 0.5, y: 0.3, connections: ["mccready-theory", "between-thermals", "glide-management"]),
            ConceptMapNode(id: "mccready-theory", label: "McCready Theory", domain: .flying, x: 0.2, y: 0.5, connections: ["speed-to-fly"]),
            ConceptMapNode(id: "between-thermals-ref", label: "Between Thermals", domain: .flying, x: 0.8, y: 0.5, connections: ["speed-to-fly"]),
            ConceptMapNode(id: "glide-management", label: "Glide Management", domain: .flying, x: 0.5, y: 0.7, connections: ["speed-to-fly", "energy-management"]),
        ]
    )

    // MARK: - XC Tactics

    static let xcTactics = Lesson(
        id: "xc-tactics",
        domain: .flying,
        teachingSteps: [
            TeachingStep(
                id: "xc-1",
                headline: "Plan Along Energy Lines",
                body: "The shortest route is rarely the fastest. Plan your route along energy lines: ridges that produce lift, valleys with active thermals, convergence zones, cloud streets. Flying 20% further along good energy can be 50% faster than the direct route through blue (cloudless) sink zones.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 0.15, y: 0.5),
                        DiagramPoint(x: 0.3, y: 0.4),
                        DiagramPoint(x: 0.5, y: 0.3),
                        DiagramPoint(x: 0.7, y: 0.4),
                        DiagramPoint(x: 0.85, y: 0.6),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "clouds",
                    labels: ["Direct route (blue, sink)", "Energy route (ridge, thermals)"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "xc-2",
                headline: "Cloud Streets Are Highways",
                body: "When cumulus align in streets (parallel lines), they mark zones of organized lift — often convergence or wind shear boundaries. Fly ALONG the street, not across it. You can cover 50-100km without circling if the street is strong. Crossing a street wastes the best energy source available.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.55, toX: 0.8, toY: 0.55, label: "Fly along street →", color: "22C55E"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.7),
                        DiagramPoint(x: 0.2, y: 0.6),
                        DiagramPoint(x: 0.4, y: 0.5),
                        DiagramPoint(x: 0.6, y: 0.5),
                        DiagramPoint(x: 0.8, y: 0.6),
                        DiagramPoint(x: 1.0, y: 0.7),
                    ],
                    overlayType: "clouds",
                    labels: ["Cloud street (convergence)", "Don't cross — fly along!"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "xc-3",
                headline: "Wind Strategy",
                body: "Wind affects both your route and timing. Headwind legs take longer and burn more altitude — do them early when you're high and thermals are still building. Tailwind legs are fast and efficient — save them for late in the day when thermals weaken. Plan the triangle accordingly.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.1, fromY: 0.5, toX: 0.3, toY: 0.5, label: "Wind →", color: "3B82F6"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.7),
                        DiagramPoint(x: 0.33, y: 0.6),
                        DiagramPoint(x: 0.66, y: 0.6),
                        DiagramPoint(x: 1.0, y: 0.7),
                    ],
                    overlayType: "wind",
                    labels: ["Leg 1: Into wind (early, high)", "Leg 3: Downwind (late, lower)"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "xc-4",
                headline: "Final Glide Calculation",
                body: "The final glide is the last leg home without circling. Calculate: distance ÷ glide ratio = altitude needed. Add 500-1000ft safety margin. Check wind: headwind requires MORE altitude, tailwind requires LESS. Start final glide with margin — arriving high is better than landing short.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.0, fromY: 0.3, toX: 1.0, toY: 0.7, label: "Final glide", color: "22C55E"),
                    ],
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.3),
                        DiagramPoint(x: 0.3, y: 0.4),
                        DiagramPoint(x: 0.7, y: 0.5),
                        DiagramPoint(x: 1.0, y: 0.7),
                    ],
                    overlayType: nil,
                    labels: ["Landing zone", "Start with margin", "Account for wind"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "xc-q1",
                type: .multipleChoice,
                prompt: "You're planning a 100km triangle. Wind is west at 20 km/h. Cumulus streets aligned NW-SE. How do you plan?",
                difficulty: .advanced,
                explanation: "Cloud streets are highways of lift — plan your route along them. Use tailwind for the final leg when thermals weaken.",
                options: [
                    PracticeOption(label: "Route along cloud streets for upwind legs, tailwind for final", correct: true, explanation: "Streets provide organized lift. Save the fast tailwind leg for later when thermals weaken."),
                    PracticeOption(label: "Fly the shortest route regardless of streets", correct: false, explanation: "Ignoring energy lines wastes time. Streets are much faster than straight blue holes."),
                    PracticeOption(label: "Always fly into wind first to get the hard leg done", correct: false, explanation: "Doing the hardest leg first when you're lowest is poor strategy."),
                    PracticeOption(label: "Avoid cloud streets — they indicate instability", correct: false, explanation: "Cloud streets are organized lift zones, not dangerous instability."),
                ]
            ),
            PracticeQuestion(
                id: "xc-q2",
                type: .calculation,
                prompt: "Final glide: 25km to goal, 40:1 glide ratio, 10 km/h headwind. Without safety margin, what altitude (in meters) do you need?",
                difficulty: .advanced,
                explanation: "25km ÷ 40 = 625m in still air. Headwind increases required altitude by ~20-30%. 625 × 1.25 ≈ 780m minimum. Add safety margin in practice.",
                correctAnswer: 780,
                tolerance: 50,
                answerUnit: "m"
            ),
            PracticeQuestion(
                id: "xc-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .advanced,
                explanation: "Flying along energy lines (ridges, streets, convergence) is almost always faster than the direct route through blue or sink zones, even if it adds distance.",
                statement: "The shortest distance between two turnpoints is always the fastest route in cross-country flying.",
                isTrue: false,
                reasoning: "Energy lines provide continuous lift. Flying 20% further along good energy is often 50% faster than the direct route through sink."
            ),
            PracticeQuestion(
                id: "xc-q4",
                type: .sequenceOrder,
                prompt: "Order these XC planning steps:",
                difficulty: .advanced,
                explanation: "Check forecast for wind and thermal strength. Identify energy lines (streets, ridges, convergence). Plan route along energy, considering wind. Calculate final glide before starting it.",
                correctOrder: ["Check wind and thermal forecast", "Identify cloud streets and energy lines", "Plan route along energy, into wind early", "Calculate final glide with safety margin"],
                shuffledItems: ["Plan route along energy, into wind early", "Check wind and thermal forecast", "Calculate final glide with safety margin", "Identify cloud streets and energy lines"]
            ),
        ],
        synthesisPrompt: "XC tactics require understanding convergence zones from the Weather domain. How does recognizing sea breeze convergence or valley convergence help you plan faster routes than flying the straight-line distance?",
        conceptMapNodes: [
            ConceptMapNode(id: "xc-tactics", label: "XC Tactics", domain: .flying, x: 0.5, y: 0.3, connections: ["convergence-xc", "cloud-streets", "final-glide"]),
            ConceptMapNode(id: "convergence-xc", label: "Convergence", domain: .weather, x: 0.2, y: 0.5, connections: ["xc-tactics"]),
            ConceptMapNode(id: "cloud-streets", label: "Cloud Streets", domain: .flying, x: 0.8, y: 0.5, connections: ["xc-tactics", "reading-sky"]),
            ConceptMapNode(id: "final-glide", label: "Final Glide", domain: .flying, x: 0.5, y: 0.7, connections: ["xc-tactics", "glide-ratio"]),
        ]
    )

    // MARK: - Convergence & Sea Breeze

    static let convergenceSeaBreeze = Lesson(
        id: "convergence-sea-breeze",
        domain: .flying,
        teachingSteps: [
            TeachingStep(
                id: "convergence-1",
                headline: "Where Air Masses Collide",
                body: "Convergence occurs when two air masses meet and have nowhere to go but up. This can be valley winds colliding, a sea breeze front meeting inland air, or two thermal systems pushed together by wind shear. The result: strong, organized, reliable lift along a defined line.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.6, toX: 0.45, toY: 0.6, label: "Air mass 1 →", color: "3B82F6"),
                        DiagramArrow(fromX: 0.8, fromY: 0.6, toX: 0.55, toY: 0.6, label: "← Air mass 2", color: "F59E0B"),
                        DiagramArrow(fromX: 0.5, fromY: 0.6, toX: 0.5, toY: 0.2, label: "Forced lift ↑", color: "22C55E"),
                    ],
                    centerLabel: "Convergence Zone"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "convergence-2",
                headline: "Sea Breeze Front Basics",
                body: "During the day, land heats faster than water. Hot air rises over land, creating low pressure. Cool air from the ocean flows in to replace it — the sea breeze. Where the sea breeze meets the warmer inland air, a convergence front forms, often marked by a distinct line of cumulus clouds.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.1, fromY: 0.7, toX: 0.4, toY: 0.7, label: "Sea breeze →", color: "3B82F6"),
                        DiagramArrow(fromX: 0.6, fromY: 0.6, toX: 0.6, toY: 0.3, label: "Inland thermals ↑", color: "EF4444"),
                        DiagramArrow(fromX: 0.45, fromY: 0.65, toX: 0.45, toY: 0.25, label: "Convergence ↑", color: "22C55E"),
                    ],
                    centerLabel: "Sea Breeze Front"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "convergence-3",
                headline: "Flying the Convergence Line",
                body: "A well-developed convergence line produces 3-6 m/s lift or more — stronger than most thermals. You can fly 50-100km along the line without circling, dolphin-gliding through continuous lift. The key is to stay ON the line. Drift too far to either side and you're in sink or weak thermals.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.3, fromY: 0.5, toX: 0.7, toY: 0.5, label: "Fly along line →", color: "22C55E"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.2, label: "+5 m/s ↑", color: "EF4444"),
                        DiagramArrow(fromX: 0.3, fromY: 0.7, toX: 0.3, toY: 0.85, label: "Sink off-line", color: "F59E0B"),
                        DiagramArrow(fromX: 0.7, fromY: 0.7, toX: 0.7, toY: 0.85, label: "Sink off-line", color: "F59E0B"),
                    ],
                    centerLabel: "Stay on the line"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "convergence-4",
                headline: "Timing and Location",
                body: "Sea breeze fronts move inland as the day progresses. Early (10am-12pm), the front is close to the coast. By afternoon (2pm-4pm), it can be 20-50km inland. The front is strongest in the early afternoon. By evening, it weakens and may reverse. Check wind forecasts to predict front location and strength.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.6, toX: 0.35, toY: 0.6, label: "10am: 5km inland", color: "F59E0B"),
                        DiagramArrow(fromX: 0.2, fromY: 0.5, toX: 0.5, toY: 0.5, label: "2pm: 30km inland", color: "22C55E"),
                        DiagramArrow(fromX: 0.2, fromY: 0.4, toX: 0.7, toY: 0.4, label: "4pm: 50km inland", color: "3B82F6"),
                    ],
                    centerLabel: "Front moves inland"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "convergence-q1",
                type: .multipleChoice,
                prompt: "It's afternoon and you see a distinct cloud line 30km inland, parallel to the coast. What is it?",
                difficulty: .advanced,
                explanation: "A cloud line parallel to the coast and inland is the signature of a sea breeze convergence front. Fly along it for strong, sustained lift.",
                options: [
                    PracticeOption(label: "Sea breeze convergence — fly along it for strong lift", correct: true, explanation: "The sea breeze front has moved inland and is producing convergence lift."),
                    PracticeOption(label: "A cold front approaching from the sea", correct: false, explanation: "Cold fronts move differently and don't form parallel cloud lines."),
                    PracticeOption(label: "Cloud development to avoid — instability too high", correct: false, explanation: "Convergence clouds indicate organized lift, not dangerous instability."),
                    PracticeOption(label: "Thermal street aligned with prevailing wind", correct: false, explanation: "Thermal streets aren't typically parallel to coastlines."),
                ]
            ),
            PracticeQuestion(
                id: "convergence-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .advanced,
                explanation: "Convergence lift is some of the strongest and most reliable lift available. Cloud streets, sea breeze fronts, and valley convergence can produce 5-8 m/s or more — stronger than typical thermals.",
                statement: "Convergence zones produce weaker lift than thermals because the air is spread over a larger area.",
                isTrue: false,
                reasoning: "Convergence zones produce STRONGER lift than thermals. Where air masses collide, they're forced upward with great power — often 5-8 m/s or more."
            ),
            PracticeQuestion(
                id: "convergence-q3",
                type: .sequenceOrder,
                prompt: "Order the daily progression of a sea breeze front:",
                difficulty: .intermediate,
                explanation: "Morning: front starts near coast. Early afternoon: front moves inland and strengthens. Late afternoon: front 30-50km inland. Evening: front weakens or reverses.",
                correctOrder: ["Morning: front forms near coast", "Early afternoon: front moves inland, strengthens", "Late afternoon: front 30-50km inland", "Evening: front weakens or reverses"],
                shuffledItems: ["Late afternoon: front 30-50km inland", "Morning: front forms near coast", "Evening: front weakens or reverses", "Early afternoon: front moves inland, strengthens"]
            ),
            PracticeQuestion(
                id: "convergence-q4",
                type: .matchPairs,
                prompt: "Match the convergence type to its cause:",
                difficulty: .advanced,
                explanation: "Sea breeze: land/water temperature difference. Valley: opposing slope winds meeting. Wind shear: air masses at different speeds colliding.",
                matchPairs: [
                    MatchPair(left: "Sea breeze front", right: "Cool ocean air meets warm land air"),
                    MatchPair(left: "Valley convergence", right: "Anabatic winds from both slopes collide"),
                    MatchPair(left: "Wind shear convergence", right: "Air masses at different speeds meet"),
                ]
            ),
        ],
        synthesisPrompt: "Convergence flying connects to both convergence lift (Weather domain) and mountain wave phenomena. How does understanding that air has nowhere to go but up help you predict where convergence zones will form in complex terrain?",
        conceptMapNodes: [
            ConceptMapNode(id: "convergence-sea-breeze", label: "Convergence & Sea Breeze", domain: .flying, x: 0.5, y: 0.3, connections: ["convergence-weather", "mountain-waves", "xc-convergence"]),
            ConceptMapNode(id: "convergence-weather", label: "Convergence", domain: .weather, x: 0.2, y: 0.5, connections: ["convergence-sea-breeze"]),
            ConceptMapNode(id: "mountain-waves-ref", label: "Mountain Waves", domain: .weather, x: 0.8, y: 0.5, connections: ["convergence-sea-breeze"]),
            ConceptMapNode(id: "xc-convergence", label: "XC Tactics", domain: .flying, x: 0.5, y: 0.7, connections: ["convergence-sea-breeze"]),
        ]
    )

    // MARK: - Between Thermals

    static let betweenThermals = Lesson(
        id: "between-thermals",
        domain: .flying,
        teachingSteps: [
            TeachingStep(
                id: "between-1",
                headline: "You Don't Lose Altitude in Sink",
                body: "Counter-intuitive but true: you lose altitude based on TIME, not sink rate. Flying through -2 m/s sink for 30 seconds loses 60m. Flying through -1 m/s for 60 seconds also loses 60m. Speed is altitude. The faster you cross sink zones, the less altitude you lose — in total.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "slow", label: "Slow (60s in sink)", minValue: 0, maxValue: 40, color: "EF4444", description: "-1 m/s × 60s = -60m lost"),
                        DiagramZone(id: "fast", label: "Fast (30s in sink)", minValue: 40, maxValue: 65, color: "22C55E", description: "-2 m/s × 30s = -60m lost (same!)"),
                    ],
                    minValue: 0,
                    maxValue: 65,
                    unit: "km/h",
                    currentValue: 52
                ),
                interactionHint: "Same altitude loss, but fast saves time",
                revealItems: nil
            ),
            TeachingStep(
                id: "between-2",
                headline: "Reading the Air",
                body: "Between thermals, you're flying through varying air — lift, sink, and neutral zones. Your vario tells you what you're IN, not what's AHEAD. Learn to read visual cues: birds circling (thermal), haze (sink), cumulus ahead (lift coming). Plan your path through the air, not just over the ground.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "sink-air", label: "Sink zone", minValue: -3, maxValue: 0, color: "EF4444", description: "Descending air — speed up"),
                        DiagramZone(id: "neutral", label: "Neutral air", minValue: 0, maxValue: 0.5, color: "F59E0B", description: "Still air — fly best L/D"),
                        DiagramZone(id: "lift-air", label: "Lift zone", minValue: 0.5, maxValue: 3, color: "22C55E", description: "Rising air — assess quality"),
                    ],
                    minValue: -3,
                    maxValue: 3,
                    unit: "m/s",
                    currentValue: -1.2
                ),
                interactionHint: "Vario shows current air, not ahead",
                revealItems: nil
            ),
            TeachingStep(
                id: "between-3",
                headline: "When to Stop vs. Keep Going",
                body: "You find +1.5 m/s lift, but the next thermal should be stronger. Do you stop or keep going? If you're HIGH and thermals are strong, keep going. If you're LOW or uncertain, take what you can get. The decision point is: can I afford to pass this up and arrive lower at the next one?",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "must-stop", label: "Take any lift", minValue: 0, maxValue: 1500, color: "EF4444", description: "Too low to be selective"),
                        DiagramZone(id: "selective", label: "Be selective", minValue: 1500, maxValue: 3000, color: "F59E0B", description: "Moderate altitude — judge quality"),
                        DiagramZone(id: "keep-going", label: "Can skip weak", minValue: 3000, maxValue: 6000, color: "22C55E", description: "High enough to pass weak lift"),
                    ],
                    minValue: 0,
                    maxValue: 6000,
                    unit: "ft AGL",
                    currentValue: 2200
                ),
                interactionHint: "Altitude determines selectivity",
                revealItems: nil
            ),
            TeachingStep(
                id: "between-4",
                headline: "Glide Ratio in Moving Air",
                body: "Your glide ratio (40:1) is measured in still air. In a headwind, your ground glide ratio is worse. In a tailwind, it's better. In sink, it's worse. In lift, it's better. You're not gliding through still air — you're gliding through a moving, rising, sinking ocean of air. Plan accordingly.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "worse", label: "Effective < 40:1", minValue: 0, maxValue: 30, color: "EF4444", description: "Headwind or sink — glide is worse"),
                        DiagramZone(id: "nominal", label: "Still air: 40:1", minValue: 30, maxValue: 50, color: "22C55E", description: "No wind, neutral air"),
                        DiagramZone(id: "better", label: "Effective > 40:1", minValue: 50, maxValue: 70, color: "3B82F6", description: "Tailwind or lift — glide is better"),
                    ],
                    minValue: 0,
                    maxValue: 70,
                    unit: "effective L/D",
                    currentValue: 40
                ),
                interactionHint: "Wind and air mass affect real glide",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "between-q1",
                type: .multipleChoice,
                prompt: "You're at 4,000ft AGL, 5km from the next thermal, in -1 m/s sink. Glide ratio is 40:1. Will you make it?",
                difficulty: .advanced,
                explanation: "5km = 5,000m. At 40:1, you need 125m (410ft) in still air. But -1 m/s sink adds loss. At 50 km/h, 5km takes 6 minutes = 360s. Sink loss: 360m. Total: 125 + 360 = 485m (~1,590ft). You'll arrive around 2,400ft.",
                options: [
                    PracticeOption(label: "Marginal — arrive around 1,500-2,500ft depending on speed", correct: true, explanation: "Still-air glide needs ~400ft. Sink adds ~1,200ft loss. You'll arrive low but workable."),
                    PracticeOption(label: "Comfortable — 40:1 means only 125m needed", correct: false, explanation: "That's still-air calculation. Sink adds significantly to altitude loss."),
                    PracticeOption(label: "Impossible — find closer lift immediately", correct: false, explanation: "You have enough altitude, but margins are tight."),
                    PracticeOption(label: "Easily — sink doesn't affect glide ratio", correct: false, explanation: "Sink absolutely affects your total altitude loss."),
                ]
            ),
            PracticeQuestion(
                id: "between-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .advanced,
                explanation: "Altitude loss depends on TIME in sink, not sink rate alone. Flying faster reduces time in sink, reducing total altitude loss even though instantaneous sink rate is higher.",
                statement: "Flying faster in sink increases your sink rate, so you should always fly slowly to minimize altitude loss.",
                isTrue: false,
                reasoning: "Time matters more than rate. Flying fast through -2 m/s for 30s loses the same altitude as slow through -1 m/s for 60s, but saves 30 seconds."
            ),
            PracticeQuestion(
                id: "between-q3",
                type: .sequenceOrder,
                prompt: "Order these steps for efficient inter-thermal glides:",
                difficulty: .advanced,
                explanation: "Set McCready based on expected thermals. Adjust speed for current air. Read visual cues ahead. Decide whether to stop or continue based on altitude and conditions.",
                correctOrder: ["Set McCready based on expected next thermal", "Adjust speed: fast in sink, slower in lift", "Read visual cues (birds, cumulus) for next thermal", "Decide to stop or continue based on altitude"],
                shuffledItems: ["Read visual cues (birds, cumulus) for next thermal", "Set McCready based on expected next thermal", "Decide to stop or continue based on altitude", "Adjust speed: fast in sink, slower in lift"]
            ),
            PracticeQuestion(
                id: "between-q4",
                type: .calculation,
                prompt: "You're in -1.5 m/s sink for 2 minutes. How much altitude (in meters) did you lose?",
                difficulty: .intermediate,
                explanation: "2 minutes = 120 seconds. -1.5 m/s × 120s = -180m altitude loss.",
                correctAnswer: 180,
                tolerance: 5,
                answerUnit: "m"
            ),
        ],
        synthesisPrompt: "Managing the glide between thermals connects directly to speed-to-fly theory. How does understanding McCready settings help you decide when to stop for weak lift versus when to keep gliding toward stronger thermals ahead?",
        conceptMapNodes: [
            ConceptMapNode(id: "between-thermals", label: "Between Thermals", domain: .flying, x: 0.5, y: 0.3, connections: ["speed-to-fly-ref", "glide-management-ref", "reading-air"]),
            ConceptMapNode(id: "speed-to-fly-ref", label: "Speed-to-Fly", domain: .flying, x: 0.2, y: 0.5, connections: ["between-thermals"]),
            ConceptMapNode(id: "glide-management-ref", label: "Glide Management", domain: .flying, x: 0.8, y: 0.5, connections: ["between-thermals"]),
            ConceptMapNode(id: "reading-air", label: "Reading Air", domain: .flying, x: 0.5, y: 0.7, connections: ["between-thermals", "soaring-fundamentals"]),
        ]
    )
}
