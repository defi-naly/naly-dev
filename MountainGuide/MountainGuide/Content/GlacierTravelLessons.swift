import Foundation

enum GlacierTravelLessons {

    // MARK: - Glacier Anatomy

    static let glacierAnatomy = Lesson(
        id: "glacier-anatomy",
        domain: .glacierTravel,
        teachingSteps: [
            TeachingStep(
                id: "anatomy-1",
                headline: "Accumulation and Ablation Zones",
                body: "A glacier has two primary zones. The accumulation zone is the upper region where snowfall exceeds melt — snow compresses into firn and eventually ice. The ablation zone is the lower region where melt exceeds snowfall. The line between them is the equilibrium line altitude (ELA). Above the ELA, the glacier grows. Below it, the glacier wastes away.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.1),
                        DiagramPoint(x: 0.2, y: 0.2),
                        DiagramPoint(x: 0.4, y: 0.35),
                        DiagramPoint(x: 0.5, y: 0.45),
                        DiagramPoint(x: 0.7, y: 0.6),
                        DiagramPoint(x: 0.9, y: 0.75),
                        DiagramPoint(x: 1.0, y: 0.8),
                    ],
                    overlayType: "zones",
                    labels: ["Accumulation Zone", "ELA", "Ablation Zone"]
                ),
                interactionHint: nil,
                revealItems: nil,
                mapConfig: MapConfig(
                    centerLat: 46.4730,
                    centerLon: 8.0647,
                    spanLat: 0.06,
                    spanLon: 0.06,
                    pins: [
                        MapPinData(id: "aletsch-start", lat: 46.4958, lon: 7.9479, label: "Konkordiaplatz"),
                        MapPinData(id: "aletsch-tongue", lat: 46.3933, lon: 8.0767, label: "Aletsch Tongue"),
                        MapPinData(id: "ela-line", lat: 46.4500, lon: 8.0300, label: "ELA ~2,800m")
                    ]
                )
            ),
            TeachingStep(
                id: "anatomy-2",
                headline: "Surface Features You Must Recognize",
                body: "Glaciers are not smooth highways. The surface is a mosaic of features that tell you what the ice is doing underneath. Crevasses form where the glacier stretches. Moulins are vertical shafts that drain meltwater into the glacier's interior. Seracs are unstable ice towers at icefalls. Moraines are rubble ridges pushed up by the glacier's flow. Each feature is a signal — learn to read them.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Glacier surface with crevasse features and surface morphology",
                    hotspots: [
                        RevealItem(id: "crevasse", label: "Crevasse", detail: "Fracture in ice caused by tensile stress — can be 30m+ deep", x: 0.25, y: 0.5),
                        RevealItem(id: "moulin", label: "Moulin", detail: "Vertical meltwater shaft — falling in means certain death", x: 0.5, y: 0.35),
                        RevealItem(id: "serac", label: "Serac", detail: "Unstable ice tower at icefall — can collapse without warning", x: 0.7, y: 0.3),
                        RevealItem(id: "moraine", label: "Moraine", detail: "Debris ridge deposited by glacier flow — marks glacier edges", x: 0.85, y: 0.65),
                    ]
                ),
                interactionHint: "Tap each feature to learn its significance",
                revealItems: nil
            ),
            TeachingStep(
                id: "anatomy-3",
                headline: "How Ice Flows",
                body: "Glaciers move under their own weight. The center flows faster than the edges (friction against valley walls). The surface flows faster than the base (friction against bedrock). Where the glacier speeds up — over a cliff, around a bend — the ice stretches and crevasses open. Where it slows down or compresses, crevasses close. Understanding flow mechanics tells you where the dangers are.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.5, toX: 0.8, toY: 0.5, label: "Center: Fast Flow", color: "3B82F6"),
                        DiagramArrow(fromX: 0.2, fromY: 0.2, toX: 0.6, toY: 0.2, label: "Edge: Slow (friction)", color: "60A5FA"),
                        DiagramArrow(fromX: 0.2, fromY: 0.8, toX: 0.6, toY: 0.8, label: "Edge: Slow (friction)", color: "60A5FA"),
                    ],
                    centerLabel: "Differential Flow"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "anatomy-4",
                headline: "The Bergschrund and Randkluft",
                body: "Two critical features form where ice meets rock. The bergschrund is the large crevasse at the head of a glacier where moving ice pulls away from the stationary snowfield above. The randkluft is the gap between glacier ice and the valley wall, formed by heat radiating from rock. Both are serious hazards on approach routes and must be identified during planning.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Head of glacier showing bergschrund and randkluft features",
                    hotspots: [
                        RevealItem(id: "bergschrund", label: "Bergschrund", detail: "Gap where glacier pulls away from headwall snowfield — can be impassable", x: 0.4, y: 0.25),
                        RevealItem(id: "randkluft", label: "Randkluft", detail: "Moat between ice and rock wall — widens in warm weather", x: 0.75, y: 0.4),
                        RevealItem(id: "headwall", label: "Headwall", detail: "Steep rock above glacier — source of rockfall onto ice", x: 0.3, y: 0.15),
                    ]
                ),
                interactionHint: "Tap features to understand approach hazards",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "anatomy-q1",
                type: .multipleChoice,
                prompt: "What separates a glacier's accumulation zone from its ablation zone?",
                difficulty: .foundation,
                explanation: "The equilibrium line altitude (ELA) is the boundary where annual snowfall equals annual melt. Above it, snow accumulates. Below it, ice is lost.",
                options: [
                    PracticeOption(label: "The equilibrium line altitude (ELA)", correct: true, explanation: "The ELA marks the transition from net snow gain to net ice loss."),
                    PracticeOption(label: "The bergschrund", correct: false, explanation: "The bergschrund is at the head of the glacier, not the zone boundary."),
                    PracticeOption(label: "The terminal moraine", correct: false, explanation: "The terminal moraine is at the glacier's snout, marking its farthest advance."),
                    PracticeOption(label: "The icefall", correct: false, explanation: "An icefall is where the glacier flows over a steep drop, not a zone boundary."),
                ]
            ),
            PracticeQuestion(
                id: "anatomy-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "The center of a glacier flows faster than the edges because the edges experience friction against the valley walls, slowing them down.",
                statement: "The edges of a glacier flow faster than the center because ice is pushed outward by pressure.",
                isTrue: false,
                reasoning: "The center flows fastest. Friction against valley walls slows the edges. This differential flow is why marginal crevasses form — the center pulls away from the slower edges."
            ),
            PracticeQuestion(
                id: "anatomy-q3",
                type: .multipleChoice,
                prompt: "A moulin on a glacier surface is:",
                difficulty: .intermediate,
                explanation: "A moulin is a vertical shaft carved by meltwater draining into the glacier interior. They are extremely dangerous — falling into one is typically fatal.",
                options: [
                    PracticeOption(label: "A vertical meltwater shaft draining into the glacier", correct: true, explanation: "Moulins can extend to the glacier bed and are among the most dangerous surface features."),
                    PracticeOption(label: "A ridge of debris pushed up by glacier flow", correct: false, explanation: "That describes a moraine, not a moulin."),
                    PracticeOption(label: "A tower of unstable ice at an icefall", correct: false, explanation: "That describes a serac, not a moulin."),
                    PracticeOption(label: "The gap between a glacier and valley wall", correct: false, explanation: "That describes a randkluft, not a moulin."),
                ]
            ),
            PracticeQuestion(
                id: "anatomy-q4",
                type: .sequenceOrder,
                prompt: "Order these glacier features from the head (top) to the terminus (bottom):",
                difficulty: .intermediate,
                explanation: "From top to bottom: the bergschrund at the headwall, accumulation zone, equilibrium line, ablation zone, then terminal moraine at the snout.",
                correctOrder: [
                    "Bergschrund at headwall",
                    "Accumulation zone",
                    "Equilibrium line altitude",
                    "Ablation zone with exposed ice",
                    "Terminal moraine at snout",
                ],
                shuffledItems: [
                    "Ablation zone with exposed ice",
                    "Bergschrund at headwall",
                    "Terminal moraine at snout",
                    "Equilibrium line altitude",
                    "Accumulation zone",
                ]
            ),
        ],
        synthesisPrompt: "Glacier anatomy is the foundation for all glacier travel decisions. Every feature — crevasses, seracs, moulins, moraines — tells you something about what the ice is doing and where the hazards are. How does understanding flow mechanics help you predict where crevasses will form?",
        conceptMapNodes: [
            ConceptMapNode(id: "glacier-anatomy", label: "Glacier Anatomy", domain: .glacierTravel, x: 0.5, y: 0.2, connections: ["crevasse-identification", "glacier-route-finding", "seasonal-changes"]),
            ConceptMapNode(id: "flow-mechanics", label: "Flow Mechanics", domain: .glacierTravel, x: 0.3, y: 0.5, connections: ["glacier-anatomy", "crevasse-identification"]),
            ConceptMapNode(id: "surface-features", label: "Surface Features", domain: .glacierTravel, x: 0.7, y: 0.5, connections: ["glacier-anatomy", "glacier-route-finding"]),
        ]
    )

    // MARK: - Crevasse Identification

    static let crevasseIdentification = Lesson(
        id: "crevasse-identification",
        domain: .glacierTravel,
        teachingSteps: [
            TeachingStep(
                id: "crevasse-id-1",
                headline: "Why Crevasses Form",
                body: "Crevasses open wherever the glacier surface is under tensile stress — when ice stretches faster than it can deform plastically. This happens where the bed steepens, where the glacier bends, where it widens, and where it flows over a convexity. The ice fractures perpendicular to the direction of maximum tension. Understanding the stress tells you where to look.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.3, fromY: 0.5, toX: 0.1, toY: 0.5, label: "Tension", color: "EF4444"),
                        DiagramArrow(fromX: 0.7, fromY: 0.5, toX: 0.9, toY: 0.5, label: "Tension", color: "EF4444"),
                    ],
                    centerLabel: "Crevasse Opens"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "crevasse-id-2",
                headline: "Types of Crevasses",
                body: "Transverse crevasses run across the glacier, perpendicular to flow — formed where the glacier accelerates over a steepening bed. Marginal crevasses angle upstream at the edges — formed by differential flow between fast center and slow margins. Longitudinal crevasses run parallel to flow — formed where the glacier widens or spreads. Radial crevasses fan out at the terminus as ice spreads freely.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Bird's eye view of glacier showing crevasse patterns",
                    hotspots: [
                        RevealItem(id: "transverse", label: "Transverse", detail: "Perpendicular to flow — glacier accelerating over steeper bed", x: 0.5, y: 0.3),
                        RevealItem(id: "marginal", label: "Marginal", detail: "Angled at edges — center flows faster than friction-slowed margins", x: 0.15, y: 0.5),
                        RevealItem(id: "longitudinal", label: "Longitudinal", detail: "Parallel to flow — glacier widening or spreading laterally", x: 0.5, y: 0.55),
                        RevealItem(id: "radial", label: "Radial", detail: "Fan pattern at terminus — ice spreading freely in all directions", x: 0.5, y: 0.8),
                    ]
                ),
                interactionHint: "Tap each crevasse type to understand its cause",
                revealItems: nil
            ),
            TeachingStep(
                id: "crevasse-id-3",
                headline: "Hidden Crevasses: The Real Danger",
                body: "Open crevasses you can see are manageable. Hidden crevasses — bridged by snow — are the killer. Snow bridges form from windblown snow and drift accumulation spanning the gap. In winter and spring, bridges are thick and strong. In summer, solar radiation and warm temperatures weaken them from below. A bridge that held your partner five minutes ago may not hold you. Always probe, always rope up.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "surface", name: "Surface snow", color: "F9FAFB", heightRatio: 0.15, description: "Appears solid and uniform"),
                        DiagramLayer(id: "bridge", name: "SNOW BRIDGE", color: "93C5FD", heightRatio: 0.2, description: "Windblown snow spanning the gap — variable strength"),
                        DiagramLayer(id: "void", name: "VOID (crevasse)", color: "1E293B", heightRatio: 0.45, description: "Empty space — 10 to 40 meters deep"),
                        DiagramLayer(id: "ice-walls", name: "Crevasse walls", color: "60A5FA", heightRatio: 0.2, description: "Smooth blue ice — no friction for self-arrest"),
                    ],
                    highlightIndex: 2
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "crevasse-id-4",
                headline: "Visual Clues on the Surface",
                body: "Even hidden crevasses leave clues. Look for: subtle linear depressions or troughs in the snow surface. Slight discoloration — bridged areas may be lighter or darker than surrounding snow. Sagging or concave surfaces. Cracks radiating from your feet. In low-angle light (early morning, late afternoon), shadows reveal depressions invisible at midday. Train your eye to read the surface.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Visible Clues",
                    rightTitle: "Conditions That Hide Them",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: ["Linear depressions in snow", "Slight color differences", "Low-angle shadow reveals", "Surface sagging or cracks"],
                    rightItems: ["Flat overhead light (midday)", "Fresh snowfall covering clues", "Whiteout conditions", "Thick winter snow bridges"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "crevasse-id-q1",
                type: .multipleChoice,
                prompt: "Marginal crevasses form because:",
                difficulty: .foundation,
                explanation: "The glacier center flows faster than the edges, which are slowed by friction against the valley walls. This shearing stress opens crevasses that angle upstream from the margins.",
                options: [
                    PracticeOption(label: "The center flows faster than the friction-slowed edges", correct: true, explanation: "Differential flow velocity creates shear stress that opens angled crevasses at the margins."),
                    PracticeOption(label: "The glacier is flowing over a steeper section of bedrock", correct: false, explanation: "That creates transverse crevasses, not marginal ones."),
                    PracticeOption(label: "The glacier is widening as it enters a broader valley", correct: false, explanation: "Widening creates longitudinal crevasses running parallel to flow."),
                    PracticeOption(label: "Meltwater is eroding the ice from underneath", correct: false, explanation: "Meltwater erosion creates channels and moulins, not marginal crevasses."),
                ]
            ),
            PracticeQuestion(
                id: "crevasse-id-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Snow bridges are strongest in winter and spring when temperatures keep them frozen solid. Summer warmth weakens bridges from below through solar radiation and warm air infiltration.",
                statement: "Snow bridges over crevasses are strongest during the summer months when more snow has accumulated.",
                isTrue: false,
                reasoning: "Summer heat weakens snow bridges from below. They are strongest in winter and spring when cold temperatures maintain structural integrity. Summer is the most dangerous time for hidden crevasses."
            ),
            PracticeQuestion(
                id: "crevasse-id-q3",
                type: .multipleChoice,
                prompt: "You notice a series of crevasses running parallel to the glacier's flow direction. What is the most likely cause?",
                difficulty: .intermediate,
                explanation: "Longitudinal crevasses form where the glacier is widening or spreading laterally. The tensile stress is perpendicular to flow, so the fractures run parallel to it.",
                options: [
                    PracticeOption(label: "The glacier is widening as it enters a broader area", correct: true, explanation: "Lateral spreading creates tension perpendicular to flow, opening longitudinal crevasses."),
                    PracticeOption(label: "The glacier is accelerating downhill", correct: false, explanation: "Acceleration creates transverse crevasses, perpendicular to flow."),
                    PracticeOption(label: "Friction with the valley walls", correct: false, explanation: "Wall friction creates marginal crevasses angled upstream, not longitudinal ones."),
                    PracticeOption(label: "The glacier is compressing", correct: false, explanation: "Compression closes crevasses — it doesn't open them."),
                ]
            ),
            PracticeQuestion(
                id: "crevasse-id-q4",
                type: .sequenceOrder,
                prompt: "Order the lighting conditions from BEST to WORST for spotting hidden crevasses:",
                difficulty: .foundation,
                explanation: "Low-angle light creates shadows that reveal subtle depressions over hidden crevasses. Flat overhead light and whiteout eliminate all shadow contrast.",
                correctOrder: [
                    "Early morning low-angle sun",
                    "Late afternoon side-lighting",
                    "Midday overhead sun",
                    "Flat overcast whiteout",
                ],
                shuffledItems: [
                    "Midday overhead sun",
                    "Flat overcast whiteout",
                    "Early morning low-angle sun",
                    "Late afternoon side-lighting",
                ]
            ),
        ],
        synthesisPrompt: "Crevasse identification is pattern recognition applied to ice mechanics. When you understand why crevasses form — tensile stress from flow changes — you can predict where they will be before you see them. How does this connect to route finding decisions on a glacier?",
        conceptMapNodes: [
            ConceptMapNode(id: "crevasse-identification", label: "Crevasse ID", domain: .glacierTravel, x: 0.5, y: 0.2, connections: ["glacier-anatomy", "probe-techniques", "glacier-route-finding"]),
            ConceptMapNode(id: "snow-bridges", label: "Snow Bridges", domain: .glacierTravel, x: 0.3, y: 0.5, connections: ["crevasse-identification", "probe-techniques"]),
            ConceptMapNode(id: "crevasse-types", label: "Crevasse Types", domain: .glacierTravel, x: 0.7, y: 0.5, connections: ["crevasse-identification", "glacier-route-finding"]),
            ConceptMapNode(id: "flow-mechanics-link", label: "Flow Mechanics", domain: .glacierTravel, x: 0.5, y: 0.7, connections: ["crevasse-identification", "glacier-anatomy"]),
        ]
    )

    // MARK: - Rope Teams

    static let ropeTeams = Lesson(
        id: "rope-teams",
        domain: .glacierTravel,
        teachingSteps: [
            TeachingStep(
                id: "rope-teams-1",
                headline: "Why We Rope Up",
                body: "On a glacier, the rope is your lifeline. When a team member breaks through a snow bridge, the rope arrests their fall before they plummet to the bottom of the crevasse. Without a rope, a crevasse fall is typically fatal. The rope doesn't prevent you from falling in — it prevents you from falling all the way down. Every person on the glacier must be roped in.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.5, toY: 0.7, label: "Fall Force", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.2, toY: 0.5, label: "Rope Arrest", color: "22C55E"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.8, toY: 0.5, label: "Rope Arrest", color: "22C55E"),
                    ],
                    centerLabel: "Crevasse Fall"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rope-teams-2",
                headline: "Two-Person vs Three-Person Teams",
                body: "A two-person rope team is the minimum. The partner must self-arrest and hold the fall alone — demanding but workable. A three-person team is safer: two people share the arrest load, and there's redundancy if one person is injured. Three is the ideal number for glacier travel. With four or more, communication becomes difficult and the rope is harder to manage.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "2-Person Team",
                    rightTitle: "3-Person Team",
                    leftColor: "F59E0B",
                    rightColor: "22C55E",
                    leftItems: ["Minimum viable team", "Partner must hold fall alone", "Simpler logistics", "Rescue is very difficult"],
                    rightItems: ["Ideal configuration", "Two share arrest load", "Built-in rescue team", "One falls, two perform rescue"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rope-teams-3",
                headline: "Spacing and Rope Management",
                body: "Standard spacing is 10-15 meters between team members on a 50m rope. Too close and there's not enough rope to arrest a fall. Too far apart and communication suffers. Keep the rope taut but not tight — no slack on the ground, no pulling your partner. Carry coils of extra rope on your harness to be used for rescue. Each person ties prusik knots on the rope as backup friction hitches.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Bird's eye rope team layout on glacier surface",
                    hotspots: [
                        RevealItem(id: "leader", label: "Leader", detail: "Navigates, probes, reads terrain — lightest person if possible", x: 0.2, y: 0.3),
                        RevealItem(id: "spacing", label: "10-15m Spacing", detail: "Enough rope to arrest a fall, close enough to communicate", x: 0.4, y: 0.45),
                        RevealItem(id: "middle", label: "Middle", detail: "Carries rescue gear — prusiks, pulleys, ice screws accessible", x: 0.5, y: 0.5),
                        RevealItem(id: "anchor", label: "Anchor (Last)", detail: "Strongest climber — first to arrest, last to cross bridges", x: 0.8, y: 0.7),
                    ]
                ),
                interactionHint: "Tap each position to learn their role",
                revealItems: nil
            ),
            TeachingStep(
                id: "rope-teams-4",
                headline: "Tying In and Prusik Placement",
                body: "Each climber ties into the rope with a figure-eight follow-through or butterfly knot. Between climbers, tie prusik loops onto the rope — these friction hitches grip the rope under load and are essential for crevasse rescue hauling systems. Clip the free ends of the rope to your harness as coils. These coils become your rescue rope if someone falls in.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "tie-in", label: "Tie In", value: 0.2, description: "Figure-eight follow-through to harness belay loop", color: "3B82F6"),
                        DiagramSegment(id: "prusik-1", label: "Prusik #1", value: 0.35, description: "Autoblock prusik 1m from harness — foot loop for ascending", color: "F59E0B"),
                        DiagramSegment(id: "prusik-2", label: "Prusik #2", value: 0.5, description: "Klemheist 0.5m from harness — clips to harness for backup", color: "F59E0B"),
                        DiagramSegment(id: "coils", label: "Carry Coils", value: 0.7, description: "Remaining rope coiled over shoulder, clipped to harness", color: "22C55E"),
                        DiagramSegment(id: "spacing-rope", label: "Active Rope", value: 0.9, description: "10-15m of taut rope between team members", color: "3B82F6"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "rope-teams-q1",
                type: .multipleChoice,
                prompt: "What is the ideal rope team size for glacier travel?",
                difficulty: .foundation,
                explanation: "Three is the ideal team size. It provides redundancy: two people to arrest and rescue if one falls in. Two-person teams work but make rescue extremely difficult.",
                options: [
                    PracticeOption(label: "Three people", correct: true, explanation: "Two arrest the fall and perform the rescue. Built-in redundancy."),
                    PracticeOption(label: "Two people", correct: false, explanation: "Two is the minimum. One partner must hold the fall alone and then somehow perform rescue — very difficult."),
                    PracticeOption(label: "Four people", correct: false, explanation: "Four is workable but communication and rope management become cumbersome."),
                    PracticeOption(label: "Solo with fixed lines", correct: false, explanation: "Solo glacier travel is extremely dangerous — no one to arrest your fall."),
                ]
            ),
            PracticeQuestion(
                id: "rope-teams-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Slack rope on the ground between team members is dangerous. If someone falls through a snow bridge, the slack means they fall farther before the rope catches. More fall distance means more force and a harder arrest.",
                statement: "Keeping some slack in the rope between team members makes travel more comfortable and is acceptable practice.",
                isTrue: false,
                reasoning: "Slack rope means the falling climber drops farther before the arrest engages, generating more force. The rope must be taut at all times — not pulling tight, but no slack dragging on the ground."
            ),
            PracticeQuestion(
                id: "rope-teams-q3",
                type: .multipleChoice,
                prompt: "Why do climbers carry coils of extra rope on their harness during glacier travel?",
                difficulty: .intermediate,
                explanation: "The coils serve as rescue rope. If someone falls into a crevasse, the remaining rope can be used to build hauling systems, lower rescue equipment, or extend the system as needed.",
                options: [
                    PracticeOption(label: "The coils become rescue rope for crevasse rescue hauling systems", correct: true, explanation: "Extra rope is essential for building Z-pulleys and other rescue systems."),
                    PracticeOption(label: "To keep the rope clean and off the snow surface", correct: false, explanation: "Rope management is important, but the coils serve a critical rescue function."),
                    PracticeOption(label: "In case the rope breaks during a fall", correct: false, explanation: "Modern climbing ropes don't break in glacier travel falls. The coils are for rescue."),
                    PracticeOption(label: "For setting up a belay at the edge of the glacier", correct: false, explanation: "Belays use anchors and the active rope, not the carried coils."),
                ]
            ),
            PracticeQuestion(
                id: "rope-teams-q4",
                type: .sequenceOrder,
                prompt: "Order the steps for setting up a glacier rope team:",
                difficulty: .foundation,
                explanation: "Set up starts with each person tying in, then attaching prusik backups, coiling extra rope, and finally spacing out to travel distance with a taut rope.",
                correctOrder: [
                    "Each climber ties into the rope",
                    "Attach prusik friction hitches to the rope",
                    "Coil remaining rope and clip to harness",
                    "Space out to 10-15m with taut rope",
                ],
                shuffledItems: [
                    "Space out to 10-15m with taut rope",
                    "Each climber ties into the rope",
                    "Coil remaining rope and clip to harness",
                    "Attach prusik friction hitches to the rope",
                ]
            ),
        ],
        synthesisPrompt: "The rope team is your primary safety system on a glacier. Without it, a crevasse fall is fatal. With it, a fall is survivable and rescuable. How does rope team configuration connect to the rescue techniques you'll need if someone does fall in?",
        conceptMapNodes: [
            ConceptMapNode(id: "rope-teams", label: "Rope Teams", domain: .glacierTravel, x: 0.5, y: 0.2, connections: ["crevasse-rescue", "travel-protocols", "probe-techniques"]),
            ConceptMapNode(id: "team-config", label: "Team Configuration", domain: .glacierTravel, x: 0.3, y: 0.5, connections: ["rope-teams"]),
            ConceptMapNode(id: "prusik-systems", label: "Prusik Systems", domain: .glacierTravel, x: 0.7, y: 0.5, connections: ["rope-teams", "crevasse-rescue"]),
        ]
    )

    // MARK: - Probe Techniques

    static let probeTechniques = Lesson(
        id: "probe-techniques",
        domain: .glacierTravel,
        teachingSteps: [
            TeachingStep(
                id: "probe-1",
                headline: "Why Probing Matters",
                body: "A snow bridge can look perfectly solid and collapse under your weight. Probing is the only way to test what's beneath the surface before you commit your body weight. The leader probes ahead of each step in suspect terrain. It's slow, it's tedious, and it saves lives. A 30-second probe can prevent a 30-meter fall.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.15, toX: 0.5, toY: 0.55, label: "Probe Insertion", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.55, toX: 0.5, toY: 0.85, label: "Void Detected", color: "EF4444"),
                    ],
                    centerLabel: "Snow Bridge"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "probe-2",
                headline: "Probe Technique: Reading the Resistance",
                body: "Push the probe (or ice axe shaft) vertically into the snow ahead of you. Solid glacier ice feels like hitting concrete — the probe stops hard. Snow over ice has consistent moderate resistance. A snow bridge over a crevasse will have resistance that suddenly drops to nothing — the probe punches through into empty space. That sudden loss of resistance means crevasse below. Alter your route.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "solid", label: "Solid Ice", minValue: 0, maxValue: 30, color: "22C55E", description: "Hard stop — safe glacier surface"),
                        DiagramZone(id: "firm-snow", label: "Firm Snow", minValue: 30, maxValue: 60, color: "3B82F6", description: "Consistent resistance — snow over solid ice"),
                        DiagramZone(id: "weak-bridge", label: "Weak Bridge", minValue: 60, maxValue: 80, color: "F59E0B", description: "Decreasing resistance — bridge thinning"),
                        DiagramZone(id: "void", label: "Void / Crevasse", minValue: 80, maxValue: 100, color: "EF4444", description: "Sudden zero resistance — open space below"),
                    ],
                    minValue: 0,
                    maxValue: 100,
                    unit: "depth (cm)",
                    currentValue: 70
                ),
                interactionHint: "Drag the indicator to feel the resistance change",
                revealItems: nil
            ),
            TeachingStep(
                id: "probe-3",
                headline: "When and Where to Probe",
                body: "Probe whenever you see surface clues: linear depressions, color changes, sagging snow. Probe on approach to known crevassed areas. Probe when the route crosses a suspected crevasse at an oblique angle. In whiteout conditions with zero visibility, probe continuously. The leader probes; the rest of the team follows exactly in the leader's footsteps.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Always Probe",
                    rightTitle: "Probe Not Required",
                    leftColor: "EF4444",
                    rightColor: "22C55E",
                    leftItems: ["Linear depressions visible", "Crossing suspected crevasses", "Whiteout conditions", "Unfamiliar glacier terrain"],
                    rightItems: ["Bare blue ice (crevasses visible)", "Well-traveled marked routes", "Known solid ice sections", "Rock or moraine surfaces"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "probe-4",
                headline: "Probing a Snow Bridge Crossing",
                body: "When you must cross a snow bridge, probe across the entire width to find the thickest, most solid section. Cross perpendicular to the crevasse — minimizing time over the void. The team crosses one at a time while others maintain a taut rope and ready position for arrest. After crossing, the last person may need to belay from a different angle.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Top-down view of team crossing a snow bridge over a crevasse",
                    hotspots: [
                        RevealItem(id: "probe-path", label: "Probe Path", detail: "Probe across full width to find strongest section", x: 0.4, y: 0.3),
                        RevealItem(id: "crossing", label: "Cross Perpendicular", detail: "Shortest path over the void — minimize exposure time", x: 0.5, y: 0.5),
                        RevealItem(id: "belayer", label: "Belayer Ready", detail: "Taut rope, self-arrest position, ready to hold a fall", x: 0.2, y: 0.7),
                        RevealItem(id: "one-at-time", label: "One at a Time", detail: "Only one person on the bridge — never load it with multiple people", x: 0.7, y: 0.5),
                    ]
                ),
                interactionHint: "Tap each element to understand the crossing procedure",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "probe-q1",
                type: .multipleChoice,
                prompt: "While probing ahead, your probe pushes through 40cm of snow then suddenly meets no resistance. What should you do?",
                difficulty: .foundation,
                explanation: "Sudden loss of resistance means the probe has punched through a snow bridge into a crevasse void. Stop immediately and alter your route to avoid the crevasse.",
                options: [
                    PracticeOption(label: "Stop — there is a crevasse below. Alter your route.", correct: true, explanation: "Zero resistance after snow means empty space. This is a hidden crevasse."),
                    PracticeOption(label: "Continue — 40cm of snow is a strong bridge", correct: false, explanation: "40cm of snow over a void may not support body weight, especially in warm conditions."),
                    PracticeOption(label: "Probe deeper to check if ice is just further down", correct: false, explanation: "If you hit a void, you've found a crevasse. The depth of the void doesn't matter — reroute."),
                    PracticeOption(label: "Step to the side and try again", correct: false, explanation: "Stepping sideways near a hidden crevasse risks falling in. Back up and reroute."),
                ]
            ),
            PracticeQuestion(
                id: "probe-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "When crossing a snow bridge, the team must cross one at a time. Loading a bridge with multiple people multiplies the weight and dramatically increases the chance of collapse.",
                statement: "The entire rope team should cross a snow bridge together to maintain a taut rope.",
                isTrue: false,
                reasoning: "Multiple people on a bridge multiplies the load and can cause catastrophic collapse. Cross one at a time while others hold a ready belay."
            ),
            PracticeQuestion(
                id: "probe-q3",
                type: .multipleChoice,
                prompt: "What is the optimal angle to cross a snow bridge relative to the crevasse?",
                difficulty: .foundation,
                explanation: "Cross perpendicular to the crevasse to minimize the distance you travel over the void. An oblique crossing means more time and more footsteps on the bridge.",
                options: [
                    PracticeOption(label: "Perpendicular — straight across the shortest distance", correct: true, explanation: "Perpendicular crossing minimizes time over the void."),
                    PracticeOption(label: "At a 45° angle for better balance", correct: false, explanation: "An angled crossing increases the distance over the crevasse."),
                    PracticeOption(label: "Parallel — along the length of the bridge", correct: false, explanation: "Walking along the bridge maximizes exposure to the void."),
                    PracticeOption(label: "The angle doesn't matter if the bridge is thick enough", correct: false, explanation: "Minimizing exposure is always important regardless of bridge thickness."),
                ]
            ),
            PracticeQuestion(
                id: "probe-q4",
                type: .sequenceOrder,
                prompt: "Order the steps for crossing a suspected snow bridge:",
                difficulty: .intermediate,
                explanation: "The sequence ensures systematic assessment before commitment: probe first, prepare the team, cross one at a time, confirm all are safe.",
                correctOrder: [
                    "Probe across the full width to find the strongest section",
                    "Team members take ready belay positions with taut rope",
                    "One person crosses perpendicular to the crevasse",
                    "Remaining team members cross one at a time",
                ],
                shuffledItems: [
                    "Remaining team members cross one at a time",
                    "Probe across the full width to find the strongest section",
                    "One person crosses perpendicular to the crevasse",
                    "Team members take ready belay positions with taut rope",
                ]
            ),
        ],
        synthesisPrompt: "Probing is your last line of defense against hidden crevasses. It's slow and laborious, but it's the difference between spotting a crevasse and falling into one. How does probing connect to route finding — when can you skip it, and when must you commit to probing every step?",
        conceptMapNodes: [
            ConceptMapNode(id: "probe-techniques", label: "Probe Techniques", domain: .glacierTravel, x: 0.5, y: 0.2, connections: ["crevasse-identification", "glacier-route-finding", "travel-protocols"]),
            ConceptMapNode(id: "snow-bridge-assessment", label: "Bridge Assessment", domain: .glacierTravel, x: 0.3, y: 0.5, connections: ["probe-techniques", "crevasse-identification"]),
            ConceptMapNode(id: "crossing-procedure", label: "Crossing Procedure", domain: .glacierTravel, x: 0.7, y: 0.5, connections: ["probe-techniques", "rope-teams"]),
        ]
    )

    // MARK: - Glacier Route Finding

    static let glacierRouteFinding = Lesson(
        id: "glacier-route-finding",
        domain: .glacierTravel,
        teachingSteps: [
            TeachingStep(
                id: "route-1",
                headline: "Reading the Glacier Before You Step On It",
                body: "Route finding on a glacier starts from a distance. Study the glacier from a vantage point or aerial imagery before you approach. Identify the accumulation and ablation zones. Locate icefalls, crevasse fields, and seracs. Find moraines that offer solid travel. Trace the path of least resistance through the maze. The best glacier travelers spend more time studying than walking.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Panoramic glacier view showing route options and hazard zones",
                    hotspots: [
                        RevealItem(id: "icefall", label: "Icefall", detail: "Avoid — chaotic crevasses and unstable seracs", x: 0.35, y: 0.35),
                        RevealItem(id: "moraine", label: "Medial Moraine", detail: "Often provides solid travel — rock debris over ice", x: 0.55, y: 0.5),
                        RevealItem(id: "crevasse-field", label: "Crevasse Field", detail: "Dense transverse crevasses — route around if possible", x: 0.25, y: 0.55),
                        RevealItem(id: "safe-corridor", label: "Safe Corridor", detail: "Compression zone between crevasse fields — ice is stable here", x: 0.7, y: 0.45),
                    ]
                ),
                interactionHint: "Tap to evaluate route options",
                revealItems: nil,
                mapConfig: MapConfig(
                    centerLat: 45.9400,
                    centerLon: 7.8700,
                    spanLat: 0.05,
                    spanLon: 0.05,
                    pins: [
                        MapPinData(id: "monte-rosa-hut", lat: 45.9567, lon: 7.8097, label: "Monte Rosa Hut 2,883m"),
                        MapPinData(id: "dufourspitze", lat: 45.9369, lon: 7.8667, label: "Dufourspitze 4,634m"),
                        MapPinData(id: "gorner-glacier", lat: 45.9500, lon: 7.8300, label: "Gornergletscher")
                    ]
                )
            ),
            TeachingStep(
                id: "route-2",
                headline: "Compression Zones Are Your Friends",
                body: "Where a glacier narrows or slows down, the ice compresses. Compressed ice closes crevasses instead of opening them. These compression zones are the safest travel corridors. Look for them at the base of icefalls (where steep becomes flat), where glaciers narrow between rock walls, and where tributaries merge. Plan your route to link compression zones together.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.15, fromY: 0.5, toX: 0.4, toY: 0.5, label: "Flow →", color: "3B82F6"),
                        DiagramArrow(fromX: 0.85, fromY: 0.5, toX: 0.6, toY: 0.5, label: "← Compression", color: "22C55E"),
                    ],
                    centerLabel: "Safe Zone"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "route-3",
                headline: "Timing Your Travel",
                body: "Snow bridges are strongest in the early morning when overnight cold has refrozen the surface. As the sun warms the glacier, bridges weaken and crevasse hazard increases. The standard practice: start before dawn, cross the most crevassed terrain in the cold hours, and be off the glacier or on safe ground by midday. On warm afternoons, even thick bridges can collapse.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "pre-dawn", label: "Pre-Dawn Start", value: 0.15, description: "Coldest temps — bridges are frozen solid, safest travel", color: "22C55E"),
                        DiagramSegment(id: "morning", label: "Morning", value: 0.35, description: "Sun angle increasing — still cold, good conditions", color: "3B82F6"),
                        DiagramSegment(id: "midday", label: "Midday", value: 0.55, description: "Sun high — bridges weakening, rockfall starting", color: "F59E0B"),
                        DiagramSegment(id: "afternoon", label: "Afternoon", value: 0.75, description: "Peak warming — maximum crevasse and rockfall danger", color: "EF4444"),
                        DiagramSegment(id: "evening", label: "Evening Refreeze", value: 0.9, description: "Cooling begins — but bridges may already be compromised", color: "F59E0B"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "route-4",
                headline: "Navigating Around Obstacles",
                body: "When crevasses block your route, look for end-runs — going around the end of the crevasse rather than crossing it. When an icefall blocks the route, look for flanking moraines or rock bands. Always have a Plan B. If you planned to ascend the center and find it heavily crevassed, can you traverse to a moraine? The best route on a glacier is rarely a straight line.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Good Route Choices",
                    rightTitle: "Route Red Flags",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: ["Follow compression zones", "Use moraines for solid ground", "End-run around crevasses", "Travel in early morning cold"],
                    rightItems: ["Straight line through crevasse fields", "Below active seracs", "Crossing many snow bridges", "Afternoon travel in direct sun"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "route-q1",
                type: .multipleChoice,
                prompt: "Why are compression zones on a glacier considered safe travel corridors?",
                difficulty: .foundation,
                explanation: "In compression zones, ice is being pushed together rather than pulled apart. This closes crevasses instead of opening them, making the surface more continuous and safer to travel.",
                options: [
                    PracticeOption(label: "Compressive forces close crevasses instead of opening them", correct: true, explanation: "Compression pushes ice together, sealing fractures."),
                    PracticeOption(label: "The ice is thicker in compression zones", correct: false, explanation: "Thickness isn't the key factor — it's the stress state of the ice."),
                    PracticeOption(label: "Snow bridges are stronger in compression zones", correct: false, explanation: "Bridge strength depends on temperature and depth, not compression."),
                    PracticeOption(label: "There is less snowfall in compression zones", correct: false, explanation: "Snowfall is unrelated to ice stress patterns."),
                ]
            ),
            PracticeQuestion(
                id: "route-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Starting before dawn is standard practice because overnight cold refreezes snow bridges, making them strongest. By midday, solar warming weakens bridges significantly.",
                statement: "The safest time to cross heavily crevassed glacier terrain is in the early afternoon when visibility is best.",
                isTrue: false,
                reasoning: "Afternoon sun weakens snow bridges to their most dangerous state. Pre-dawn and early morning, when bridges are frozen solid, is the safest time to cross crevassed terrain."
            ),
            PracticeQuestion(
                id: "route-q3",
                type: .multipleChoice,
                prompt: "A large crevasse blocks your planned route. What is the best strategy?",
                difficulty: .intermediate,
                explanation: "End-running — going around the end of the crevasse — avoids crossing it entirely. This is always safer than trying to find and cross a snow bridge.",
                options: [
                    PracticeOption(label: "End-run: travel to the end of the crevasse and go around it", correct: true, explanation: "Avoiding the crevasse entirely is always the safest option."),
                    PracticeOption(label: "Probe for the thickest snow bridge and cross it", correct: false, explanation: "Crossing any bridge carries risk. End-running is preferred when possible."),
                    PracticeOption(label: "Descend into the crevasse and climb out the other side", correct: false, explanation: "Entering a crevasse intentionally is extremely dangerous and not a valid strategy."),
                    PracticeOption(label: "Wait for afternoon when the bridge softens and is easier to test", correct: false, explanation: "Afternoon softening weakens bridges — exactly the wrong time to cross."),
                ]
            ),
            PracticeQuestion(
                id: "route-q4",
                type: .sequenceOrder,
                prompt: "Order these route planning steps from first to last:",
                difficulty: .foundation,
                explanation: "Route planning starts with distant observation, then identifies hazards, plans the path linking safe zones, and finally confirms conditions on the ground.",
                correctOrder: [
                    "Study the glacier from a vantage point or map",
                    "Identify icefalls, crevasse fields, and seracs",
                    "Plan a route linking compression zones and moraines",
                    "Confirm conditions on the ground and adjust as needed",
                ],
                shuffledItems: [
                    "Plan a route linking compression zones and moraines",
                    "Study the glacier from a vantage point or map",
                    "Confirm conditions on the ground and adjust as needed",
                    "Identify icefalls, crevasse fields, and seracs",
                ]
            ),
        ],
        synthesisPrompt: "Route finding is the synthesis of glacier anatomy, crevasse identification, and timing. The best route avoids hazards entirely rather than managing them. How does route selection connect to the overall travel protocol for your team?",
        conceptMapNodes: [
            ConceptMapNode(id: "glacier-route-finding", label: "Route Finding", domain: .glacierTravel, x: 0.5, y: 0.2, connections: ["glacier-anatomy", "crevasse-identification", "travel-protocols"]),
            ConceptMapNode(id: "compression-zones", label: "Compression Zones", domain: .glacierTravel, x: 0.3, y: 0.5, connections: ["glacier-route-finding", "glacier-anatomy"]),
            ConceptMapNode(id: "timing", label: "Travel Timing", domain: .glacierTravel, x: 0.7, y: 0.5, connections: ["glacier-route-finding", "seasonal-changes"]),
            ConceptMapNode(id: "terrain-reading", label: "Terrain Reading", domain: .glacierTravel, x: 0.5, y: 0.7, connections: ["glacier-route-finding", "crevasse-identification"]),
        ]
    )

    // MARK: - Travel Protocols

    static let travelProtocols = Lesson(
        id: "travel-protocols",
        domain: .glacierTravel,
        teachingSteps: [
            TeachingStep(
                id: "protocol-1",
                headline: "The Pre-Travel Checklist",
                body: "Before stepping onto the glacier, verify: all team members roped in correctly, prusik knots rigged and accessible, rescue gear distributed (pulley, ice screws, slings), crampons secure, rope taut between members, communication signals agreed upon. A missed step in preparation can mean the difference between a controlled rescue and a fatality.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "rope-up", label: "Rope Up", value: 0.15, description: "All members tied in with figure-eight knots", color: "3B82F6"),
                        DiagramSegment(id: "prusiks", label: "Rig Prusiks", value: 0.3, description: "Friction hitches attached, tested for grip", color: "F59E0B"),
                        DiagramSegment(id: "gear-check", label: "Gear Check", value: 0.5, description: "Pulleys, ice screws, slings distributed and accessible", color: "22C55E"),
                        DiagramSegment(id: "crampons", label: "Crampons On", value: 0.7, description: "Fitted securely — loose crampons cause trips near crevasses", color: "3B82F6"),
                        DiagramSegment(id: "signals", label: "Signals Agreed", value: 0.85, description: "Stop, probe, go, fall — clear voice and hand signals", color: "F59E0B"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "protocol-2",
                headline: "Movement Discipline",
                body: "On a glacier, discipline keeps you alive. The rope must always be taut. Team members move at the same pace — no sprinting, no lagging. When the leader stops, everyone stops. The team travels perpendicular to suspected crevasse orientation when possible. If the leader probes, the team waits. No shortcuts, no exceptions.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.3, toX: 0.5, toY: 0.3, label: "Leader", color: "22C55E"),
                        DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.5, toY: 0.5, label: "Taut Rope", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.7, label: "Taut Rope", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.7, toX: 0.8, toY: 0.7, label: "Anchor", color: "F59E0B"),
                    ],
                    centerLabel: "Team Formation"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "protocol-3",
                headline: "Self-Arrest Readiness",
                body: "Every team member must be ready to self-arrest instantly. Your ice axe is always in your hand — pick in the uphill hand, shaft down. When you feel a tug or hear a shout, drop immediately into self-arrest position: axe head driven into the snow against your shoulder, body weight over the axe, crampons up off the snow (to prevent catapulting). Practice until it's reflexive.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Climber in self-arrest position on glacier surface",
                    hotspots: [
                        RevealItem(id: "axe-position", label: "Axe Position", detail: "Pick driven into snow, shaft across chest, held at shoulder and spike", x: 0.4, y: 0.35),
                        RevealItem(id: "body-weight", label: "Body Weight", detail: "Press chest over the axe head — your weight drives the pick deeper", x: 0.5, y: 0.5),
                        RevealItem(id: "feet-up", label: "Feet Up", detail: "Lift crampons off the snow — catching a point can flip you", x: 0.6, y: 0.7),
                        RevealItem(id: "arrest-speed", label: "React Instantly", detail: "Every second of delay means more rope paid out and more force", x: 0.3, y: 0.6),
                    ]
                ),
                interactionHint: "Tap each element to learn proper arrest technique",
                revealItems: nil
            ),
            TeachingStep(
                id: "protocol-4",
                headline: "Communication on the Glacier",
                body: "Wind, distance, and crampons crunching on ice make verbal communication difficult. Establish simple, unambiguous signals before departure. 'FALLING!' — someone has broken through. 'STOP!' — halt all movement. 'ROPE!' — take in or pay out slack. A whistle blast pattern can serve as backup. Never assume your partner heard you — wait for acknowledgment.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Voice Commands",
                    rightTitle: "Whistle Signals",
                    leftColor: "3B82F6",
                    rightColor: "F59E0B",
                    leftItems: ["FALLING — arrest immediately", "STOP — halt all movement", "PROBE — leader is probing ahead", "CLEAR — safe to proceed"],
                    rightItems: ["1 blast — Stop", "2 blasts — Come toward me", "3 blasts — Emergency / Help", "Continuous — Immediate danger"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "protocol-q1",
                type: .multipleChoice,
                prompt: "During self-arrest on a glacier, why should you lift your crampons off the snow?",
                difficulty: .foundation,
                explanation: "Crampon points catching in the snow during a slide can violently catapult you forward, break your ankle, or flip you over — losing control of the arrest entirely.",
                options: [
                    PracticeOption(label: "Crampon points can catch and catapult you, causing loss of control", correct: true, explanation: "Points digging in creates a violent pivot point that flips you."),
                    PracticeOption(label: "To reduce friction and slide to safety", correct: false, explanation: "The goal is to STOP, not to slide. You want maximum friction from the axe."),
                    PracticeOption(label: "To protect your crampons from damage", correct: false, explanation: "Equipment damage is irrelevant in a life-threatening arrest situation."),
                    PracticeOption(label: "To signal to your team that you are arresting", correct: false, explanation: "Feet up is a technique requirement, not a signal."),
                ]
            ),
            PracticeQuestion(
                id: "protocol-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "The rope must always be taut between team members. Slack rope means a falling climber drops farther before arrest engages, generating more force and making the arrest harder or impossible.",
                statement: "It's acceptable to have some slack in the rope while the team takes a rest break on the glacier.",
                isTrue: false,
                reasoning: "Even during rest breaks, the rope should remain taut unless the team has built a solid anchor and established a formal belay. A crevasse collapse can happen at any time."
            ),
            PracticeQuestion(
                id: "protocol-q3",
                type: .sequenceOrder,
                prompt: "Order the immediate response when you hear 'FALLING!' from your rope partner:",
                difficulty: .intermediate,
                explanation: "The response is instinctive and sequential: drop immediately, drive the axe, brace against the load, then assess the situation once the fall is arrested.",
                correctOrder: [
                    "Drop into self-arrest position immediately",
                    "Drive ice axe pick into the snow",
                    "Brace for the rope load to come tight",
                    "Hold position and communicate with the fallen climber",
                ],
                shuffledItems: [
                    "Brace for the rope load to come tight",
                    "Hold position and communicate with the fallen climber",
                    "Drop into self-arrest position immediately",
                    "Drive ice axe pick into the snow",
                ]
            ),
            PracticeQuestion(
                id: "protocol-q4",
                type: .multipleChoice,
                prompt: "Which piece of gear should ALWAYS be in your hand during glacier travel?",
                difficulty: .foundation,
                explanation: "The ice axe is your primary self-arrest tool. It must be in your hand at all times, not strapped to your pack. A crevasse fall gives you less than a second to react.",
                options: [
                    PracticeOption(label: "Ice axe — ready for immediate self-arrest", correct: true, explanation: "Self-arrest must be reflexive. The axe must already be in your hand."),
                    PracticeOption(label: "Avalanche probe — for checking snow bridges", correct: false, explanation: "Probes are important but only the leader uses one actively. Everyone needs an axe."),
                    PracticeOption(label: "GPS device — for navigation", correct: false, explanation: "Navigation is important but doesn't prevent falls. The axe saves your life."),
                    PracticeOption(label: "Radio — for communication", correct: false, explanation: "Radios help communication but don't arrest falls. The axe is non-negotiable."),
                ]
            ),
        ],
        synthesisPrompt: "Travel protocols are the systems that keep your team alive on the glacier. Rope management, self-arrest readiness, communication, and discipline are all interconnected. A failure in any one component can cascade into a catastrophe. How do these protocols connect to the rescue procedures you need when things go wrong?",
        conceptMapNodes: [
            ConceptMapNode(id: "travel-protocols", label: "Travel Protocols", domain: .glacierTravel, x: 0.5, y: 0.2, connections: ["rope-teams", "crevasse-rescue", "glacier-route-finding"]),
            ConceptMapNode(id: "self-arrest", label: "Self-Arrest", domain: .glacierTravel, x: 0.3, y: 0.5, connections: ["travel-protocols", "crevasse-rescue"]),
            ConceptMapNode(id: "team-communication", label: "Communication", domain: .glacierTravel, x: 0.7, y: 0.5, connections: ["travel-protocols", "rope-teams"]),
        ]
    )

    // MARK: - Crevasse Rescue

    static let crevasseRescue = Lesson(
        id: "crevasse-rescue",
        domain: .glacierTravel,
        teachingSteps: [
            TeachingStep(
                id: "rescue-1",
                headline: "The First Seconds: Arrest and Stabilize",
                body: "When someone falls into a crevasse, the team arrests the fall. This is the most critical moment — if the arrest fails, the entire team can be pulled in. Once the fall is arrested, the holding climber must stabilize: maintain self-arrest position, do NOT let go. Communicate: 'I've got you. Are you injured?' The victim's response determines the rescue approach.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.5, toY: 0.7, label: "Fall Force (weight + impact)", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.2, toY: 0.3, label: "Arrest Force", color: "22C55E"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.8, toY: 0.3, label: "Arrest Force", color: "22C55E"),
                    ],
                    centerLabel: "Crevasse Lip"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rescue-2",
                headline: "Building the Anchor",
                body: "With the fall arrested, the next step is transferring the load to a solid anchor. Without releasing the arrest, the free climber (or the arrester, if only two) places a snow picket, ice screw, or buried axe as a deadman anchor. Attach the rope to the anchor with a prusik or Munter hitch. Now the anchor holds the victim — freeing the team to build a hauling system.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "arrest", label: "Arrest the Fall", value: 0.15, description: "Hold self-arrest — do not release under any circumstances", color: "EF4444"),
                        DiagramSegment(id: "anchor", label: "Place Anchor", value: 0.35, description: "Snow picket, ice screw, or buried axe — test before loading", color: "F59E0B"),
                        DiagramSegment(id: "transfer", label: "Transfer Load", value: 0.55, description: "Prusik or clove hitch from rope to anchor — slow and controlled", color: "3B82F6"),
                        DiagramSegment(id: "verify", label: "Verify Anchor Holds", value: 0.75, description: "Gradually weight the anchor — watch for creep or pull-out", color: "22C55E"),
                        DiagramSegment(id: "free", label: "Release Arrest", value: 0.9, description: "Only when anchor is verified — now build rescue system", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rescue-3",
                headline: "Self-Rescue: Prusiking Out",
                body: "If the victim is uninjured, the fastest rescue is self-rescue. Using the two prusik loops pre-rigged on the rope, the victim ascends: slide the upper prusik up, weight it (standing in the foot loop), slide the lower prusik up, sit back on it, repeat. This is exhausting but effective. Practice prusiking before your glacier trip — in a crevasse is not the time to learn.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "surface", name: "Glacier Surface", color: "F9FAFB", heightRatio: 0.15, description: "Team members managing the rope above"),
                        DiagramLayer(id: "lip", name: "Crevasse Lip", color: "93C5FD", heightRatio: 0.1, description: "Rope cuts into lip — may need padding or redirect"),
                        DiagramLayer(id: "upper-prusik", name: "Upper Prusik (foot loop)", color: "22C55E", heightRatio: 0.25, description: "Stand in foot loop — push upward"),
                        DiagramLayer(id: "lower-prusik", name: "Lower Prusik (harness)", color: "F59E0B", heightRatio: 0.25, description: "Sit back on this — slides up when unweighted"),
                        DiagramLayer(id: "void", name: "Crevasse Depth", color: "1E293B", heightRatio: 0.25, description: "Remaining void below climber"),
                    ],
                    highlightIndex: 2
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rescue-4",
                headline: "Team Rescue: The Z-Pulley (3:1)",
                body: "When the victim can't self-rescue — injured, hypothermic, or exhausted — the team builds a hauling system. The Z-pulley provides 3:1 mechanical advantage. Attach a prusik to the loaded rope, clip a pulley to it, run the free rope through the pulley and back to the anchor. Pull and the victim rises. Reset the prusik and repeat. It's slow but it works with one or two rescuers.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.5, toX: 0.5, toY: 0.3, label: "Pull", color: "22C55E"),
                        DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.8, toY: 0.5, label: "Redirect", color: "3B82F6"),
                        DiagramArrow(fromX: 0.8, fromY: 0.5, toX: 0.5, toY: 0.7, label: "Lift", color: "22C55E"),
                    ],
                    centerLabel: "3:1 Z-Pulley"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rescue-5",
                headline: "The Lip Problem",
                body: "The crevasse lip is where the rope cuts into the snow edge. As you haul, the rope digs deeper into the lip, creating enormous friction that can triple the force needed. Solutions: pad the lip with a pack or jacket, redirect the rope over an ice axe planted at the edge, or dig a ramp in the lip for the victim to slide over. The lip is often the hardest part of crevasse rescue.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Cross-section of crevasse lip showing rope friction problem",
                    hotspots: [
                        RevealItem(id: "rope-cut", label: "Rope Cuts In", detail: "Rope under load digs into soft snow at lip — creates massive friction", x: 0.45, y: 0.4),
                        RevealItem(id: "pad", label: "Lip Padding", detail: "Place pack, jacket, or foam pad under rope at lip edge", x: 0.55, y: 0.35),
                        RevealItem(id: "redirect", label: "Axe Redirect", detail: "Plant axe at lip edge — rope rolls over shaft instead of cutting in", x: 0.65, y: 0.45),
                        RevealItem(id: "ramp", label: "Dig a Ramp", detail: "Excavate snow at lip so victim can slide over instead of jamming", x: 0.35, y: 0.55),
                    ]
                ),
                interactionHint: "Tap each solution to learn when to use it",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "rescue-q1",
                type: .sequenceOrder,
                prompt: "Order the crevasse rescue sequence from the moment of the fall:",
                difficulty: .foundation,
                explanation: "The rescue follows a strict sequence: arrest first, then stabilize with an anchor, assess the victim, then execute rescue (self-rescue if possible, team haul if not).",
                correctOrder: [
                    "Arrest the fall and hold position",
                    "Build an anchor and transfer the load",
                    "Communicate with victim and assess injuries",
                    "Execute self-rescue (prusik) or team haul (Z-pulley)",
                ],
                shuffledItems: [
                    "Communicate with victim and assess injuries",
                    "Execute self-rescue (prusik) or team haul (Z-pulley)",
                    "Arrest the fall and hold position",
                    "Build an anchor and transfer the load",
                ]
            ),
            PracticeQuestion(
                id: "rescue-q2",
                type: .multipleChoice,
                prompt: "What mechanical advantage does a Z-pulley system provide?",
                difficulty: .foundation,
                explanation: "The Z-pulley (also called a C-pulley or 3:1) provides a 3:1 mechanical advantage, meaning you pull with one-third the force needed to lift the victim's weight directly.",
                options: [
                    PracticeOption(label: "3:1 — you pull with one-third the required force", correct: true, explanation: "Three units of rope pulled equals one unit of lift. Trade distance for force."),
                    PracticeOption(label: "2:1 — halves the required force", correct: false, explanation: "A 2:1 system uses a single redirect pulley. The Z-pulley is 3:1."),
                    PracticeOption(label: "5:1 — for heavy loads", correct: false, explanation: "5:1 systems exist but require additional pulleys. The standard Z-pulley is 3:1."),
                    PracticeOption(label: "1:1 — no mechanical advantage", correct: false, explanation: "A 1:1 system is a direct pull. The Z-pulley specifically provides 3:1."),
                ]
            ),
            PracticeQuestion(
                id: "rescue-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "The crevasse lip creates enormous friction as the rope cuts into soft snow. This friction can triple the effective force needed to haul the victim, making lip management the critical bottleneck in most rescues.",
                statement: "The hardest part of crevasse rescue is usually building the anchor system.",
                isTrue: false,
                reasoning: "The lip is typically the biggest obstacle. The rope cutting into soft snow creates friction that can triple the required hauling force. Padding, redirecting, or ramping the lip is often the key to a successful rescue."
            ),
            PracticeQuestion(
                id: "rescue-q4",
                type: .multipleChoice,
                prompt: "An uninjured victim in a crevasse has pre-rigged prusik loops. What is the fastest rescue method?",
                difficulty: .intermediate,
                explanation: "Self-rescue by prusiking is the fastest method when the victim is capable. They ascend the rope using alternating prusik loops without the team needing to build a hauling system.",
                options: [
                    PracticeOption(label: "Self-rescue — victim prusiks up the rope themselves", correct: true, explanation: "Prusiking is fastest because it requires no additional setup by the surface team."),
                    PracticeOption(label: "Z-pulley haul by the team above", correct: false, explanation: "Building a Z-pulley takes time. If the victim can self-rescue, it's faster."),
                    PracticeOption(label: "Lower a second rope for the victim to climb", correct: false, explanation: "Climbing a free-hanging rope requires enormous upper body strength. Prusiking is far more efficient."),
                    PracticeOption(label: "Call for helicopter rescue", correct: false, explanation: "External rescue may take hours. Self-rescue is immediate if the victim is capable."),
                ]
            ),
        ],
        synthesisPrompt: "Crevasse rescue is the culmination of every glacier travel skill: rope teams provide the arrest, prusiks enable self-rescue, hauling systems extract the victim. The entire system depends on preparation — pre-rigged prusiks, practiced technique, distributed rescue gear. How does this connect back to your pre-travel checklist and team protocols?",
        conceptMapNodes: [
            ConceptMapNode(id: "crevasse-rescue", label: "Crevasse Rescue", domain: .glacierTravel, x: 0.5, y: 0.2, connections: ["rope-teams", "travel-protocols"]),
            ConceptMapNode(id: "self-rescue", label: "Self-Rescue (Prusik)", domain: .glacierTravel, x: 0.25, y: 0.5, connections: ["crevasse-rescue", "rope-teams"]),
            ConceptMapNode(id: "z-pulley", label: "Z-Pulley Haul", domain: .glacierTravel, x: 0.75, y: 0.5, connections: ["crevasse-rescue"]),
            ConceptMapNode(id: "lip-management", label: "Lip Management", domain: .glacierTravel, x: 0.5, y: 0.7, connections: ["crevasse-rescue"]),
        ]
    )

    // MARK: - Glacier Camping

    static let glacierCamping = Lesson(
        id: "glacier-camping",
        domain: .glacierTravel,
        teachingSteps: [
            TeachingStep(
                id: "camping-1",
                headline: "Site Selection: Safety First",
                body: "Choosing a campsite on a glacier is a life-or-death decision. The primary concern is crevasses — probe the entire campsite area thoroughly before pitching a tent. Avoid areas below seracs (they collapse at any hour). Avoid the fall line of ice cliffs and hanging glaciers. Look for flat areas in compression zones where crevasses are closed. A medial moraine can provide stable ground if it's wide enough.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Glacier surface showing potential campsite locations and hazards",
                    hotspots: [
                        RevealItem(id: "safe-zone", label: "Safe Zone", detail: "Flat compression zone — probed thoroughly, no crevasses detected", x: 0.5, y: 0.5),
                        RevealItem(id: "serac-danger", label: "Serac Hazard", detail: "AVOID — below ice cliffs that can collapse without warning", x: 0.2, y: 0.3),
                        RevealItem(id: "crevasse-area", label: "Crevassed Area", detail: "AVOID — tension zone with active crevasse formation", x: 0.75, y: 0.4),
                        RevealItem(id: "moraine", label: "Moraine Option", detail: "Rocky but stable — no crevasse risk, good drainage", x: 0.6, y: 0.7),
                    ]
                ),
                interactionHint: "Tap to evaluate each campsite option",
                revealItems: nil
            ),
            TeachingStep(
                id: "camping-2",
                headline: "Platform Construction",
                body: "Glaciers are rarely flat. You need to build a platform for your tent. Use a snow saw or shovel to level an area larger than your tent footprint. Pack the platform down by stomping. On bare ice, chip a flat surface with your axe. Build snow walls on the windward side — they block wind and accumulate drift that insulates. A well-built platform improves sleep quality and prevents you from sliding off the glacier in the night.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.5),
                        DiagramPoint(x: 0.15, y: 0.48),
                        DiagramPoint(x: 0.25, y: 0.3),
                        DiagramPoint(x: 0.35, y: 0.3),
                        DiagramPoint(x: 0.65, y: 0.3),
                        DiagramPoint(x: 0.75, y: 0.3),
                        DiagramPoint(x: 0.85, y: 0.48),
                        DiagramPoint(x: 1.0, y: 0.5),
                    ],
                    overlayType: "zones",
                    labels: ["Wind Wall", "Level Platform", "Tent Area", "Kitchen"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "camping-3",
                headline: "Anchoring and Water",
                body: "On ice, standard tent stakes don't work. Use ice screws, snow pickets driven into firm snow, or buried stuff sacks filled with snow (deadman anchors). Guy lines must be tensioned — wind on a glacier can be ferocious. For water, melt snow or ice on your stove. Glacier ice melts more efficiently than snow (higher density). Place the kitchen area downwind and at least 5 meters from the tent in case of stove flare-up.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Anchoring Methods",
                    rightTitle: "Water Sources",
                    leftColor: "3B82F6",
                    rightColor: "06B6D4",
                    leftItems: ["Ice screws in solid ice", "Snow pickets in firm snow", "Deadman anchors (buried bags)", "T-slot axes in hard pack"],
                    rightItems: ["Melt glacier ice (most efficient)", "Melt dense packed snow", "Surface meltwater streams (if clean)", "Avoid discolored or silty ice"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "camping-4",
                headline: "Cold Management and Emergency Procedures",
                body: "Glacier nights are cold — temperatures drop rapidly after sunset at altitude. Insulate from the ice: closed-cell foam pad beneath your sleeping pad. Wear dry layers to bed. Keep your boots inside the tent so they don't freeze solid. Mark the path to the toilet area with wands — stumbling in the dark near crevasses is how people die. Establish a protocol for nighttime emergencies: headlamp accessible, boots within reach.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "setup", label: "Camp Setup", value: 0.15, description: "Probe site, build platform, pitch tent, build wind walls", color: "3B82F6"),
                        DiagramSegment(id: "kitchen", label: "Kitchen & Water", value: 0.35, description: "Melt ice, cook, store water bottles inside sleeping bag", color: "F59E0B"),
                        DiagramSegment(id: "evening", label: "Evening Protocol", value: 0.55, description: "Mark wand path, stow gear, boots in tent, headlamp ready", color: "22C55E"),
                        DiagramSegment(id: "night", label: "Night Watch", value: 0.75, description: "Monitor wind, check tent anchors if conditions change", color: "1E293B"),
                        DiagramSegment(id: "morning", label: "Early Departure", value: 0.9, description: "Break camp efficiently — get on the glacier in cold hours", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "camping-q1",
                type: .multipleChoice,
                prompt: "What is the FIRST thing you should do before setting up a glacier camp?",
                difficulty: .foundation,
                explanation: "Before any camp activity, probe the entire area to ensure there are no hidden crevasses beneath the campsite. Everything else follows safety verification.",
                options: [
                    PracticeOption(label: "Probe the entire campsite area for hidden crevasses", correct: true, explanation: "A tent pitched over a hidden crevasse can collapse catastrophically."),
                    PracticeOption(label: "Build snow walls for wind protection", correct: false, explanation: "Wind protection matters, but crevasse safety comes first."),
                    PracticeOption(label: "Level the platform for the tent", correct: false, explanation: "Leveling is important but meaningless if you're over a crevasse."),
                    PracticeOption(label: "Start melting water before the temperature drops", correct: false, explanation: "Water is a priority but secondary to ensuring the site is safe."),
                ]
            ),
            PracticeQuestion(
                id: "camping-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Glacier ice has much higher density than fresh snow, so it yields more water per volume and melts faster per unit weight. Using ice for water is significantly more fuel-efficient than using fluffy snow.",
                statement: "Fresh snow is more efficient than glacier ice for melting drinking water because it melts faster.",
                isTrue: false,
                reasoning: "Glacier ice is denser than snow and produces more water per volume. Snow contains a lot of trapped air, requiring more fuel to produce the same amount of water. Always prefer ice when available."
            ),
            PracticeQuestion(
                id: "camping-q3",
                type: .multipleChoice,
                prompt: "Why should you mark the path to the latrine area with wands at a glacier camp?",
                difficulty: .foundation,
                explanation: "At night on a glacier, visibility is near zero. Wandering off the probed campsite perimeter risks falling into a crevasse. Wands mark the safe path.",
                options: [
                    PracticeOption(label: "To prevent stumbling into crevasses in the dark", correct: true, explanation: "Nighttime navigation on a glacier without markers is extremely dangerous."),
                    PracticeOption(label: "To help locate the latrine in a whiteout", correct: false, explanation: "While true for whiteouts, the primary concern is crevasse safety at night."),
                    PracticeOption(label: "For environmental compliance and leave-no-trace principles", correct: false, explanation: "Environmental practice is important but wands serve a life-safety function here."),
                    PracticeOption(label: "To mark the area for other climbing teams", correct: false, explanation: "The wands are for your own team's safety, not for others."),
                ]
            ),
            PracticeQuestion(
                id: "camping-q4",
                type: .sequenceOrder,
                prompt: "Order the glacier camp setup from first to last priority:",
                difficulty: .intermediate,
                explanation: "Safety first (probing), then shelter (platform and tent), then sustenance (water and food), then overnight preparation.",
                correctOrder: [
                    "Probe entire campsite for crevasses",
                    "Build level platform and pitch tent",
                    "Construct wind walls and anchor all guy lines",
                    "Set up kitchen area and melt water",
                ],
                shuffledItems: [
                    "Set up kitchen area and melt water",
                    "Build level platform and pitch tent",
                    "Probe entire campsite for crevasses",
                    "Construct wind walls and anchor all guy lines",
                ]
            ),
        ],
        synthesisPrompt: "Glacier camping extends all the hazards of glacier travel into the overnight hours when visibility and reaction time are at their worst. Every decision — site selection, platform construction, nighttime protocols — is driven by the same fundamental risk: crevasses. How does campsite selection connect to what you know about glacier anatomy and seasonal changes?",
        conceptMapNodes: [
            ConceptMapNode(id: "glacier-camping", label: "Glacier Camping", domain: .glacierTravel, x: 0.5, y: 0.2, connections: ["glacier-route-finding", "seasonal-changes", "travel-protocols"]),
            ConceptMapNode(id: "site-selection", label: "Site Selection", domain: .glacierTravel, x: 0.3, y: 0.5, connections: ["glacier-camping", "crevasse-identification"]),
            ConceptMapNode(id: "cold-management", label: "Cold Management", domain: .glacierTravel, x: 0.7, y: 0.5, connections: ["glacier-camping", "glacier-weather"]),
        ]
    )

    // MARK: - Seasonal Changes

    static let seasonalChanges = Lesson(
        id: "seasonal-changes",
        domain: .glacierTravel,
        teachingSteps: [
            TeachingStep(
                id: "seasonal-1",
                headline: "Winter: Covered but Not Safe",
                body: "In winter, heavy snowfall blankets the glacier. Crevasses are hidden under thick snow bridges. The good news: bridges are strongest when cold temperatures keep them frozen. The bad news: you can't see any crevasses at all. Winter glacier travel requires meticulous probing and rope-team discipline. The glacier is covered in a white sheet — what's underneath is invisible.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "fresh-snow", name: "Fresh Winter Snow", color: "F9FAFB", heightRatio: 0.3, description: "Deep coverage — completely hides all surface features"),
                        DiagramLayer(id: "bridge", name: "Snow Bridges (Strong)", color: "93C5FD", heightRatio: 0.2, description: "Thick and frozen — can support heavy loads in cold temps"),
                        DiagramLayer(id: "crevasse", name: "Hidden Crevasses", color: "1E293B", heightRatio: 0.3, description: "Completely invisible — only found by probing"),
                        DiagramLayer(id: "ice", name: "Glacier Ice", color: "60A5FA", heightRatio: 0.2, description: "Solid ice base beneath crevasses"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "seasonal-2",
                headline: "Spring: The Transition Season",
                body: "Spring brings increasing warmth and solar radiation. Snow bridges begin to weaken from below as heat penetrates. The surface alternates between frozen dawn conditions and soft afternoon snow. This is the window for high-altitude glacier expeditions — bridges are still reasonably strong in the morning, but the clock is ticking. By late spring, the weakening accelerates.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "dawn", label: "Dawn (Frozen)", minValue: 0, maxValue: 25, color: "22C55E", description: "Bridges refrozen overnight — safest travel window"),
                        DiagramZone(id: "morning", label: "Morning (Firm)", minValue: 25, maxValue: 50, color: "3B82F6", description: "Surface softening — still generally safe"),
                        DiagramZone(id: "midday", label: "Midday (Soft)", minValue: 50, maxValue: 75, color: "F59E0B", description: "Bridges weakening — increase caution"),
                        DiagramZone(id: "afternoon", label: "Afternoon (Weak)", minValue: 75, maxValue: 100, color: "EF4444", description: "Maximum weakness — avoid crevassed terrain"),
                    ],
                    minValue: 0,
                    maxValue: 100,
                    unit: "bridge strength %",
                    currentValue: 35
                ),
                interactionHint: "Drag to see how bridge strength changes through the day",
                revealItems: nil
            ),
            TeachingStep(
                id: "seasonal-3",
                headline: "Summer: Exposed and Dangerous",
                body: "By mid-summer, snow has melted from the ablation zone, exposing bare ice with visible crevasses. In the accumulation zone, bridges are at their thinnest and weakest. Meltwater streams carve channels across the surface. Moulins open up. Rockfall from warming cliffs increases dramatically. The glacier is at its most active and most dangerous. Travel demands constant vigilance.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Summer Advantages",
                    rightTitle: "Summer Dangers",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: ["Crevasses visible on bare ice", "Route-finding is clearer", "Longer daylight hours"],
                    rightItems: ["Snow bridges at weakest", "Meltwater and moulins active", "Rockfall peaks in afternoon", "Seracs most unstable"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "seasonal-4",
                headline: "Autumn: Refreezing and New Hazards",
                body: "Autumn brings cooling temperatures and early snowfall. Thin snow covers crevasses that were visible in summer — creating a false sense of security. The new bridges are thin and weak, barely supporting their own weight. This is arguably the most dangerous season: climbers who traveled safely on exposed ice in summer return to find the same crevasses now hidden under a dusting of snow.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "winter", label: "Winter", value: 0.15, description: "Thick bridges, strong when cold, all crevasses hidden", color: "3B82F6"),
                        DiagramSegment(id: "spring", label: "Spring", value: 0.35, description: "Bridges weakening, dawn travel window, expeditions", color: "22C55E"),
                        DiagramSegment(id: "summer", label: "Summer", value: 0.6, description: "Bare ice, visible crevasses, weak bridges above, rockfall", color: "F59E0B"),
                        DiagramSegment(id: "autumn", label: "Autumn", value: 0.85, description: "Thin new snow hides crevasses — deceptively dangerous", color: "EF4444"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "seasonal-q1",
                type: .multipleChoice,
                prompt: "Which season is arguably the MOST dangerous for glacier travel?",
                difficulty: .intermediate,
                explanation: "Autumn is deceptively dangerous because thin new snow hides crevasses that were visible during summer. The snow bridges are too thin to support weight but thick enough to conceal the hazard.",
                options: [
                    PracticeOption(label: "Autumn — thin new snow hides crevasses with deceptively weak bridges", correct: true, explanation: "The combination of hidden crevasses and insufficient bridge strength creates maximum danger."),
                    PracticeOption(label: "Summer — snow bridges are at their weakest", correct: false, explanation: "Summer bridges are weak, but many crevasses are visible on bare ice. The hazard is more obvious."),
                    PracticeOption(label: "Winter — all crevasses are completely hidden", correct: false, explanation: "Winter bridges are thick and strong. The crevasses are hidden but the bridges can hold."),
                    PracticeOption(label: "Spring — rapid temperature changes stress the ice", correct: false, explanation: "Spring offers a viable travel window, especially in the early morning."),
                ]
            ),
            PracticeQuestion(
                id: "seasonal-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "In summer, the ablation zone loses its snow cover, exposing bare glacier ice. Crevasses on bare ice are clearly visible, making route-finding easier in those areas.",
                statement: "Summer glacier travel is always more dangerous than winter because of weaker snow bridges.",
                isTrue: false,
                reasoning: "Summer has advantages: crevasses are visible on bare ice in the ablation zone, making route-finding clearer. While bridges are weaker in the upper zones, the visibility of hazards partially compensates. 'Always more dangerous' is too absolute."
            ),
            PracticeQuestion(
                id: "seasonal-q3",
                type: .multipleChoice,
                prompt: "Why do high-altitude glacier expeditions typically target spring?",
                difficulty: .intermediate,
                explanation: "Spring offers the best balance: bridges are still reasonably strong (especially in the cold morning hours), weather is stabilizing, and the full summer melt hasn't yet compromised the snowpack.",
                options: [
                    PracticeOption(label: "Bridges are still strong in morning and weather is improving", correct: true, explanation: "Spring provides a window where bridge strength and weather conditions overlap favorably."),
                    PracticeOption(label: "There is less snowfall so the route is clearer", correct: false, explanation: "Spring often has significant snow. The advantage is bridge strength and morning freeze cycles."),
                    PracticeOption(label: "Crevasses are smallest in spring", correct: false, explanation: "Crevasse size doesn't change with seasons — only their visibility and bridge coverage change."),
                    PracticeOption(label: "Avalanche danger is lowest in spring", correct: false, explanation: "Spring avalanche danger can be high, especially on sun-affected slopes. This isn't the reason for spring expeditions."),
                ]
            ),
            PracticeQuestion(
                id: "seasonal-q4",
                type: .sequenceOrder,
                prompt: "Order the seasons by snow bridge strength from STRONGEST to WEAKEST:",
                difficulty: .foundation,
                explanation: "Winter cold keeps bridges frozen and strong. Spring begins weakening. Summer brings maximum melt and weakness. Autumn's new bridges are too thin to be considered strong.",
                correctOrder: [
                    "Winter — frozen solid, thickest coverage",
                    "Spring — still strong in morning, weakening by afternoon",
                    "Autumn — thin new snow, weak coverage",
                    "Summer — maximum melt, thinnest and weakest",
                ],
                shuffledItems: [
                    "Summer — maximum melt, thinnest and weakest",
                    "Winter — frozen solid, thickest coverage",
                    "Autumn — thin new snow, weak coverage",
                    "Spring — still strong in morning, weakening by afternoon",
                ]
            ),
        ],
        synthesisPrompt: "Seasonal changes transform the same glacier into fundamentally different environments. The route that was safe in May can be deadly in October. How do seasonal conditions affect every other glacier travel decision — route finding, travel timing, campsite selection, and rescue readiness?",
        conceptMapNodes: [
            ConceptMapNode(id: "seasonal-changes", label: "Seasonal Changes", domain: .glacierTravel, x: 0.5, y: 0.2, connections: ["glacier-anatomy", "glacier-route-finding", "glacier-weather"]),
            ConceptMapNode(id: "bridge-strength", label: "Bridge Strength", domain: .glacierTravel, x: 0.3, y: 0.5, connections: ["seasonal-changes", "crevasse-identification"]),
            ConceptMapNode(id: "melt-cycles", label: "Melt Cycles", domain: .glacierTravel, x: 0.7, y: 0.5, connections: ["seasonal-changes", "glacier-camping"]),
        ]
    )

    // MARK: - Glacier Weather

    static let glacierWeather = Lesson(
        id: "glacier-weather",
        domain: .glacierTravel,
        teachingSteps: [
            TeachingStep(
                id: "weather-1",
                headline: "The Glacier Creates Its Own Weather",
                body: "A glacier is a massive cold surface in an otherwise warming landscape. This temperature contrast creates katabatic winds — cold, dense air that drains downhill off the glacier like an invisible river. These winds are strongest in the morning and can reach 30-50 km/h on large glaciers. They blow consistently downslope, chilling exposed skin and reducing visibility with blowing snow.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.2, toX: 0.5, toY: 0.5, label: "Cold Air Drains Down", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.8, toY: 0.8, label: "Katabatic Wind", color: "3B82F6"),
                    ],
                    centerLabel: "Glacier Surface"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "weather-2",
                headline: "Whiteout: Total Loss of Orientation",
                body: "Whiteout is the glacier traveler's nightmare. When overcast skies meet a snow-covered surface, all contrast disappears. You cannot distinguish snow from sky, flat from slope, solid from crevasse. Navigation becomes impossible without instruments. People walk in circles, fall into crevasses they cannot see, and walk off cliffs. In a whiteout: stop moving, build an anchor, shelter, and wait. Or navigate strictly by compass bearing and rope-length counting.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Whiteout Survival",
                    rightTitle: "Whiteout Dangers",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: ["Stop and shelter if possible", "Navigate by compass bearing only", "Probe continuously if moving", "Use rope lengths to measure distance"],
                    rightItems: ["Cannot see crevasses", "Cannot judge slope or terrain", "Disorientation and vertigo", "Walking off cliffs or into crevasses"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "weather-3",
                headline: "Solar Radiation at Altitude",
                body: "On a glacier, you're exposed to direct UV radiation from above AND reflected UV from the snow surface below. At altitude, the thinner atmosphere filters less UV. Snow reflects 80-90% of UV radiation. The combined effect can cause snow blindness (photokeratitis) in as little as one hour without eye protection. Sunburn occurs faster and more severely. Glacier goggles or sunglasses with side shields are mandatory — not optional.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.1, toX: 0.5, toY: 0.5, label: "Direct UV", color: "F59E0B"),
                        DiagramArrow(fromX: 0.5, fromY: 0.9, toX: 0.5, toY: 0.5, label: "Reflected UV (80-90%)", color: "F59E0B"),
                        DiagramArrow(fromX: 0.2, fromY: 0.9, toX: 0.4, toY: 0.5, label: "Snow Reflection", color: "F59E0B"),
                        DiagramArrow(fromX: 0.8, fromY: 0.9, toX: 0.6, toY: 0.5, label: "Snow Reflection", color: "F59E0B"),
                    ],
                    centerLabel: "Climber"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "weather-4",
                headline: "Storm Hazards on a Glacier",
                body: "Storms on glaciers are uniquely dangerous. High winds combined with snow create instant whiteout. Temperatures can drop 15-20°C in an hour. Lightning is attracted to exposed ridges and metal gear on open ice. Hypothermia can develop rapidly when wet and wind-chilled on the ice surface. Know the forecast, watch cloud development, and have a retreat plan. When a storm moves in on a glacier, you may need to dig in rather than descend.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Glacier scene with approaching storm system and hazard indicators",
                    hotspots: [
                        RevealItem(id: "wind", label: "High Winds", detail: "60+ km/h gusts — impossible to stand, blowing snow reduces visibility to zero", x: 0.3, y: 0.2),
                        RevealItem(id: "temp-drop", label: "Temperature Crash", detail: "15-20°C drop in an hour — hypothermia risk from wind chill on open ice", x: 0.6, y: 0.3),
                        RevealItem(id: "lightning", label: "Lightning", detail: "Exposed ridges and metal gear are targets — get low, spread the team", x: 0.5, y: 0.15),
                        RevealItem(id: "dig-in", label: "Emergency Shelter", detail: "Dig a snow trench or build walls — sometimes you cannot descend", x: 0.4, y: 0.7),
                    ]
                ),
                interactionHint: "Tap each hazard to understand the threat",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "weather-q1",
                type: .multipleChoice,
                prompt: "Katabatic winds on a glacier are caused by:",
                difficulty: .foundation,
                explanation: "Katabatic winds are gravity-driven. The glacier cools the air in contact with its surface. This cold, dense air drains downslope under gravity, creating a persistent downhill wind.",
                options: [
                    PracticeOption(label: "Cold dense air draining downhill off the glacier surface", correct: true, explanation: "The glacier cools the air, which becomes dense and flows downslope under gravity."),
                    PracticeOption(label: "Warm air rising from the valley below the glacier", correct: false, explanation: "Warm rising air creates anabatic (upslope) winds, not katabatic."),
                    PracticeOption(label: "Large-scale pressure systems passing over the glacier", correct: false, explanation: "Synoptic winds are different from katabatic. Katabatic winds are locally generated by the glacier."),
                    PracticeOption(label: "The Coriolis effect deflecting wind at high altitude", correct: false, explanation: "Coriolis affects large-scale wind patterns, not small-scale katabatic drainage."),
                ]
            ),
            PracticeQuestion(
                id: "weather-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Snow reflects 80-90% of UV radiation. On a glacier, you receive direct UV from above and reflected UV from below — a double exposure that causes snow blindness rapidly at altitude.",
                statement: "Snow blindness is caused by cold temperatures freezing the surface of the eye.",
                isTrue: false,
                reasoning: "Snow blindness (photokeratitis) is caused by UV radiation burning the cornea, not by cold. The combination of direct and reflected UV on a glacier doubles the exposure. It can occur even on overcast days because UV penetrates clouds."
            ),
            PracticeQuestion(
                id: "weather-q3",
                type: .multipleChoice,
                prompt: "During a whiteout on a glacier, what is your FIRST priority?",
                difficulty: .intermediate,
                explanation: "In a whiteout, you cannot see crevasses, slopes, or terrain features. Moving without visual reference is extremely dangerous. The first priority is to stop moving unless you have reliable compass navigation and can probe continuously.",
                options: [
                    PracticeOption(label: "Stop moving — you cannot see crevasses or terrain", correct: true, explanation: "Movement in a whiteout without instruments and probing risks walking into a crevasse."),
                    PracticeOption(label: "Move downhill to get below the cloud layer", correct: false, explanation: "Moving downhill without visibility risks walking off cliffs or into crevasses."),
                    PracticeOption(label: "Use your phone GPS to navigate to safety", correct: false, explanation: "GPS shows position but not crevasses. You still can't see what's in front of you."),
                    PracticeOption(label: "Follow your footprints back to camp", correct: false, explanation: "In a whiteout, you cannot see footprints. Blowing snow fills them rapidly."),
                ]
            ),
            PracticeQuestion(
                id: "weather-q4",
                type: .sequenceOrder,
                prompt: "Order the response when a storm approaches while you're on a glacier:",
                difficulty: .intermediate,
                explanation: "Storm response prioritizes assessment, then action: evaluate whether you can descend safely, if not, prepare emergency shelter, protect against the specific hazards.",
                correctOrder: [
                    "Assess storm speed and your distance to safety",
                    "If retreat is possible, descend immediately",
                    "If retreat is not possible, dig emergency shelter",
                    "Protect against wind, cold, and lightning (get low, spread team)",
                ],
                shuffledItems: [
                    "If retreat is not possible, dig emergency shelter",
                    "Assess storm speed and your distance to safety",
                    "Protect against wind, cold, and lightning (get low, spread team)",
                    "If retreat is possible, descend immediately",
                ]
            ),
        ],
        synthesisPrompt: "Weather on a glacier is amplified and uniquely dangerous. The glacier creates its own wind, reflects radiation to burn you from below, and disappears entirely in a whiteout. Every weather decision on a glacier must account for the fact that retreat may be impossible. How does glacier weather connect to your travel timing, route selection, and emergency planning?",
        conceptMapNodes: [
            ConceptMapNode(id: "glacier-weather", label: "Glacier Weather", domain: .glacierTravel, x: 0.5, y: 0.2, connections: ["seasonal-changes", "travel-protocols", "glacier-camping"]),
            ConceptMapNode(id: "katabatic-winds", label: "Katabatic Winds", domain: .glacierTravel, x: 0.25, y: 0.5, connections: ["glacier-weather"]),
            ConceptMapNode(id: "whiteout", label: "Whiteout Navigation", domain: .glacierTravel, x: 0.75, y: 0.5, connections: ["glacier-weather", "glacier-route-finding"]),
            ConceptMapNode(id: "uv-hazards", label: "UV / Solar Hazards", domain: .glacierTravel, x: 0.5, y: 0.7, connections: ["glacier-weather"]),
        ]
    )
}
