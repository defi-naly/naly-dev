import Foundation

enum RopeSystemsLessons {

    // MARK: - Essential Climbing Knots

    static let knots = Lesson(
        id: "knots",
        domain: .ropeSystems,
        teachingSteps: [
            TeachingStep(
                id: "knots-1",
                headline: "The Figure-Eight on a Bight",
                body: "The figure-eight on a bight is the single most important knot in climbing. It creates a strong, reliable loop that's easy to inspect visually. You tie it by forming a bight (loop) in the rope, then tracing a figure-eight pattern and pulling the bight through. When dressed properly, the strands run parallel without crossing. This knot retains roughly 75-80% of rope strength — more than enough for any climbing fall.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Knot diagram showing figure-eight on a bight",
                    hotspots: [
                        RevealItem(id: "standing", label: "Standing end", detail: "The main rope running to the belayer or anchor", x: 0.15, y: 0.5),
                        RevealItem(id: "bight", label: "Bight loop", detail: "The doubled section that forms the attachment point", x: 0.5, y: 0.3),
                        RevealItem(id: "crossings", label: "Parallel strands", detail: "Must run parallel, not crossed — easy visual check", x: 0.5, y: 0.55),
                        RevealItem(id: "tail", label: "Tail (6 inches min)", detail: "Minimum 15cm tail to prevent slipping under load", x: 0.8, y: 0.6),
                    ]
                ),
                interactionHint: "Tap each part of the knot to learn its role",
                revealItems: nil
            ),
            TeachingStep(
                id: "knots-2",
                headline: "The Clove Hitch",
                body: "The clove hitch is the workhorse of anchor building and self-belay. It wraps around a carabiner and can be adjusted under load — slide it one direction to take in slack, the other to give slack. This adjustability makes it indispensable at belay stations. Tie it by forming two identical loops and clipping them together onto a carabiner. The critical rule: always load it along the spine, never across the gate.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Clove Hitch",
                    rightTitle: "Munter Hitch",
                    leftColor: "3B82F6",
                    rightColor: "F59E0B",
                    leftItems: [
                        "Adjustable under load",
                        "Self-belay at stations",
                        "Fast to tie one-handed",
                        "Low friction — not for belaying",
                    ],
                    rightItems: [
                        "High friction for belaying",
                        "Emergency rappel device",
                        "Works with single carabiner",
                        "Kinks rope over extended use",
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "knots-3",
                headline: "The Munter Hitch",
                body: "The munter hitch (Italian hitch) is your emergency belay and rappel device. It provides dynamic friction by wrapping the rope around itself through a pear-shaped (HMS) carabiner. When you pull the brake strand, friction increases. When you feed slack, it flows freely. Every climber should be able to tie and operate a munter — it works when you drop your belay device, when gear is lost, or in improvised rescue scenarios.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.5, toX: 0.45, toY: 0.5, label: "Load strand", color: "EF4444"),
                        DiagramArrow(fromX: 0.55, fromY: 0.5, toX: 0.8, toY: 0.5, label: "Brake strand", color: "22C55E"),
                        DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.5, toY: 0.45, label: "Friction at carabiner", color: "F59E0B"),
                    ],
                    centerLabel: "HMS Carabiner"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "knots-4",
                headline: "Backup Knots and Safety",
                body: "Every critical knot needs a backup or a properly dressed tail. The figure-eight follow-through (used to tie in to a harness) should have at least 15cm of tail. Some climbers add a stopper knot. Clove hitches should be weighted and checked. The double fisherman's knot is used for joining ropes and building cordelette loops — it's secure but difficult to untie after loading. Inspect every knot before committing to it.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Harness tie-in point showing figure-eight follow-through with backup",
                    hotspots: [
                        RevealItem(id: "tie-in", label: "Tie-in points", detail: "Thread through both harness tie-in loops — leg loop and waist", x: 0.5, y: 0.4),
                        RevealItem(id: "follow-through", label: "Follow-through", detail: "Retrace the figure-eight exactly — parallel strands throughout", x: 0.5, y: 0.55),
                        RevealItem(id: "backup", label: "Stopper knot", detail: "Optional backup — adds security to the tail", x: 0.75, y: 0.65),
                    ]
                ),
                interactionHint: "Tap each element to review tie-in safety checks",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "knots-q1",
                type: .multipleChoice,
                prompt: "Why is the clove hitch preferred over the figure-eight for self-belay at anchor stations?",
                difficulty: .foundation,
                explanation: "The clove hitch can be adjusted while loaded, allowing the climber to change their position relative to the anchor without untying. A figure-eight loop is fixed-length once tied.",
                options: [
                    PracticeOption(label: "It can be adjusted under load to change your distance from the anchor", correct: true, explanation: "Adjustability is the key advantage at belay stations."),
                    PracticeOption(label: "It is stronger than the figure-eight knot", correct: false, explanation: "The figure-eight actually retains more rope strength than a clove hitch."),
                    PracticeOption(label: "It uses less rope than other knots", correct: false, explanation: "Rope consumption is not the primary consideration at stations."),
                ]
            ),
            PracticeQuestion(
                id: "knots-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "The munter hitch requires an HMS (pear-shaped) carabiner to function properly. A D-shaped carabiner restricts the rope's ability to flip through the hitch, causing it to bind and malfunction.",
                statement: "A munter hitch works equally well on any carabiner shape.",
                isTrue: false,
                reasoning: "The munter requires an HMS (pear-shaped) carabiner. The wide basket allows the rope to flip freely through the hitch. D-shaped carabiners cause binding."
            ),
            PracticeQuestion(
                id: "knots-q3",
                type: .sequenceOrder,
                prompt: "Order the steps for tying a figure-eight follow-through to a harness:",
                difficulty: .foundation,
                explanation: "The sequence is: tie a loose figure-eight → thread tail through both harness tie-in points → retrace the figure-eight exactly → dress the knot with parallel strands → leave at least 15cm of tail.",
                correctOrder: [
                    "Tie a loose figure-eight in the rope",
                    "Thread the tail through both harness tie-in points",
                    "Retrace the figure-eight pattern exactly",
                    "Dress the knot so all strands run parallel",
                    "Verify at least 15cm of tail remains",
                ],
                shuffledItems: [
                    "Dress the knot so all strands run parallel",
                    "Tie a loose figure-eight in the rope",
                    "Verify at least 15cm of tail remains",
                    "Thread the tail through both harness tie-in points",
                    "Retrace the figure-eight pattern exactly",
                ]
            ),
            PracticeQuestion(
                id: "knots-q4",
                type: .multipleChoice,
                prompt: "You need to join two ropes for a long rappel. Which knot is the most secure choice?",
                difficulty: .intermediate,
                explanation: "The double fisherman's knot (grapevine) is the standard for joining ropes permanently. It's extremely secure and won't roll under load. The flat overhand (EDK) is sometimes used for rappels because it's less likely to snag, but it's less secure.",
                options: [
                    PracticeOption(label: "Double fisherman's (grapevine) knot", correct: true, explanation: "Most secure knot for joining ropes. Extremely difficult to untie after loading."),
                    PracticeOption(label: "Square knot with backups", correct: false, explanation: "Square knots can roll and capsize under load — never use for life-safety."),
                    PracticeOption(label: "Clove hitch on each rope", correct: false, explanation: "Clove hitches don't join ropes — they attach rope to carabiners."),
                ]
            ),
        ],
        synthesisPrompt: "Knots are the interface between you and the safety system. A dropped belay device means nothing if you can tie a munter hitch. A lost sling is irrelevant if you can clove hitch to the anchor. How do these fundamental knots connect to the larger rope systems — anchors, belay chains, and rescue scenarios — that depend on them?",
        conceptMapNodes: [
            ConceptMapNode(id: "knots", label: "Essential Knots", domain: .ropeSystems, x: 0.5, y: 0.2, connections: ["anchors", "belaying", "rappelling"]),
            ConceptMapNode(id: "figure-eight", label: "Figure-Eight", domain: .ropeSystems, x: 0.3, y: 0.5, connections: ["knots"]),
            ConceptMapNode(id: "clove-hitch", label: "Clove Hitch", domain: .ropeSystems, x: 0.7, y: 0.5, connections: ["knots", "anchors"]),
            ConceptMapNode(id: "munter-hitch", label: "Munter Hitch", domain: .ropeSystems, x: 0.5, y: 0.7, connections: ["knots", "belaying"]),
        ]
    )

    // MARK: - Anchor Systems

    static let anchors = Lesson(
        id: "anchors",
        domain: .ropeSystems,
        teachingSteps: [
            TeachingStep(
                id: "anchors-1",
                headline: "The SERENE/ERNEST Principles",
                body: "Every anchor must meet the SERENE criteria: Solid (individual placements are strong), Equalized (load shared between pieces), Redundant (no single point of failure), Efficient (quick to build and break down), No Extension (if one piece fails, the system doesn't shock-load the remaining pieces). Some use the mnemonic ERNEST, adding Timely. These principles apply whether you're building a trad gear anchor, slinging a tree, or using bolts.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "solid", name: "SOLID", color: "22C55E", heightRatio: 0.2, description: "Each individual piece is bomber — would hold a fall alone"),
                        DiagramLayer(id: "equalized", name: "EQUALIZED", color: "3B82F6", heightRatio: 0.2, description: "Load distributed across all pieces via cordelette or sliding-X"),
                        DiagramLayer(id: "redundant", name: "REDUNDANT", color: "F59E0B", heightRatio: 0.2, description: "Minimum 2 pieces, ideally 3 — no single point of failure"),
                        DiagramLayer(id: "no-extension", name: "NO EXTENSION", color: "EF4444", heightRatio: 0.2, description: "Limiter knots prevent shock-loading if one piece pulls"),
                        DiagramLayer(id: "efficient", name: "EFFICIENT", color: "A855F7", heightRatio: 0.2, description: "Quick to build and clean — time is safety in the mountains"),
                    ]
                ),
                interactionHint: "Tap each layer to understand the principle",
                revealItems: nil
            ),
            TeachingStep(
                id: "anchors-2",
                headline: "The Cordelette Anchor",
                body: "A cordelette is a 5-7 meter loop of 7mm nylon cord tied with a double fisherman's knot. To build an anchor: clip the cordelette to each piece, pull loops of cord down between the pieces, tie all loops together in a figure-eight or overhand knot at the master point. This equalizes load across all pieces in one direction. The knot also acts as a limiter — if one piece fails, the system can't extend more than a few centimeters.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Three-piece cordelette anchor on rock face",
                    hotspots: [
                        RevealItem(id: "piece1", label: "Piece 1 (cam)", detail: "Placed in crack — outward pull direction", x: 0.2, y: 0.2),
                        RevealItem(id: "piece2", label: "Piece 2 (nut)", detail: "Passive protection — downward pull only", x: 0.5, y: 0.15),
                        RevealItem(id: "piece3", label: "Piece 3 (cam)", detail: "Third piece for redundancy", x: 0.75, y: 0.25),
                        RevealItem(id: "master", label: "Master point", detail: "All strands tied together — clip belay here", x: 0.5, y: 0.6),
                    ]
                ),
                interactionHint: "Tap each component of the anchor",
                revealItems: nil
            ),
            TeachingStep(
                id: "anchors-3",
                headline: "The Sliding-X (Equalette)",
                body: "The sliding-X uses a sling clipped to two pieces with a twist in the middle. As the load direction changes, the master point slides along the sling to maintain equalization. The twist creates limiter loops — if one piece fails, the sling catches and prevents full extension. The sliding-X is faster than a cordelette and self-equalizes in multiple directions, making it ideal for top-rope anchors where the load swings side to side.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.15, toX: 0.4, toY: 0.5, label: "Left piece", color: "3B82F6"),
                        DiagramArrow(fromX: 0.8, fromY: 0.15, toX: 0.6, toY: 0.5, label: "Right piece", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.85, label: "Load direction", color: "EF4444"),
                    ],
                    centerLabel: "Sliding Master Point"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "anchors-4",
                headline: "Natural Anchors and Fixed Hardware",
                body: "Bolts, trees, and large boulders are often the strongest anchors available. Two modern expansion bolts can hold over 25kN each — far more than any fall generates. A healthy tree over 30cm diameter is effectively bombproof. But always inspect: are bolts rusty or spinning? Is the tree alive and well-rooted? Is the boulder truly immovable? Natural anchors often eliminate the need for complex equalization — a single sling around a bomber tree may be all you need.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Natural Anchors",
                    rightTitle: "Placed Protection",
                    leftColor: "22C55E",
                    rightColor: "F59E0B",
                    leftItems: [
                        "Trees (>30cm diameter, alive)",
                        "Boulders (immovable, tested)",
                        "Rock horns and tunnels",
                        "Often bombproof — simple sling",
                    ],
                    rightItems: [
                        "Cams (active, spring-loaded)",
                        "Nuts (passive, wedge-fit)",
                        "Bolts (drilled, fixed)",
                        "Require equalization system",
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "anchors-q1",
                type: .multipleChoice,
                prompt: "What does 'No Extension' mean in the SERENE acronym?",
                difficulty: .foundation,
                explanation: "No Extension means that if one piece of the anchor fails, the remaining pieces don't experience a sudden shock load from the system extending. Limiter knots or twists in the sling prevent this.",
                options: [
                    PracticeOption(label: "If one piece fails, the system doesn't shock-load remaining pieces", correct: true, explanation: "Extension creates a dynamic shock that can cascade failures."),
                    PracticeOption(label: "The anchor shouldn't extend beyond the rock face", correct: false, explanation: "This describes placement, not the structural property of the system."),
                    PracticeOption(label: "The rope shouldn't be extended to full length", correct: false, explanation: "Rope extension is unrelated to anchor extension."),
                ]
            ),
            PracticeQuestion(
                id: "anchors-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "A single bolt is indeed a single point of failure. Standard practice at bolted anchors is to clip into both bolts and equalize them. Even though modern bolts are extremely strong, redundancy is a core principle.",
                statement: "At a bolted anchor with two solid-looking expansion bolts, you only need to clip into one bolt since each bolt can hold well over 25kN.",
                isTrue: false,
                reasoning: "Redundancy is non-negotiable. Even bomber-looking bolts can have hidden defects — corrosion behind the hanger, improper installation, or rock degradation. Always use both."
            ),
            PracticeQuestion(
                id: "anchors-q3",
                type: .multipleChoice,
                prompt: "When is a sliding-X preferred over a cordelette?",
                difficulty: .intermediate,
                explanation: "The sliding-X self-equalizes as the load direction changes, making it ideal when the pull direction varies (like a top-rope anchor where the climber traverses). A cordelette equalizes in one fixed direction only.",
                options: [
                    PracticeOption(label: "When the load direction may change, such as a top-rope anchor", correct: true, explanation: "The sliding master point adjusts automatically to changing load angles."),
                    PracticeOption(label: "When you have more than three pieces in the anchor", correct: false, explanation: "The sliding-X works best with two pieces. More pieces favor a cordelette."),
                    PracticeOption(label: "When the rock is overhanging", correct: false, explanation: "Rock angle doesn't determine which equalization method to use."),
                ]
            ),
            PracticeQuestion(
                id: "anchors-q4",
                type: .sequenceOrder,
                prompt: "Order the steps for building a three-piece cordelette anchor:",
                difficulty: .foundation,
                explanation: "Place protection pieces first, clip the cordelette to each, pull cord between pieces, tie the master point knot in the anticipated load direction, then clip your belay carabiner to the master point.",
                correctOrder: [
                    "Place three solid pieces of protection",
                    "Clip the cordelette to each piece with carabiners",
                    "Pull loops of cord down between each piece",
                    "Tie all strands together with a master point knot",
                    "Clip belay carabiner to the master point",
                ],
                shuffledItems: [
                    "Clip belay carabiner to the master point",
                    "Pull loops of cord down between each piece",
                    "Place three solid pieces of protection",
                    "Tie all strands together with a master point knot",
                    "Clip the cordelette to each piece with carabiners",
                ]
            ),
        ],
        synthesisPrompt: "Anchors are the foundation of every rope system. A perfect belay means nothing if the anchor fails. As you progress to multi-pitch climbing and rescue scenarios, anchor building becomes second nature — but it should never become careless. How do the SERENE principles scale when you're building anchors under time pressure in a rescue or on a remote alpine route?",
        conceptMapNodes: [
            ConceptMapNode(id: "anchors", label: "Anchor Systems", domain: .ropeSystems, x: 0.5, y: 0.2, connections: ["knots", "belaying", "top-rope", "multi-pitch"]),
            ConceptMapNode(id: "cordelette", label: "Cordelette", domain: .ropeSystems, x: 0.25, y: 0.55, connections: ["anchors"]),
            ConceptMapNode(id: "sliding-x", label: "Sliding-X", domain: .ropeSystems, x: 0.75, y: 0.55, connections: ["anchors"]),
            ConceptMapNode(id: "serene", label: "SERENE Principles", domain: .ropeSystems, x: 0.5, y: 0.8, connections: ["anchors", "rescue-hauls"]),
        ]
    )

    // MARK: - Belay Technique and Devices

    static let belaying = Lesson(
        id: "belaying",
        domain: .ropeSystems,
        teachingSteps: [
            TeachingStep(
                id: "belay-1",
                headline: "The Brake Hand Never Leaves the Rope",
                body: "This is the single most important rule in belaying: the brake hand never leaves the rope. Ever. Not to scratch your nose, not to wave at a friend, not for any reason while the climber is on the wall. A tube-style device (ATC) provides friction by bending the rope through a slot, but it relies entirely on you maintaining a grip on the brake strand. Release the brake hand and you release the climber.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.1, toX: 0.5, toY: 0.35, label: "Climber's weight", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.45, toX: 0.5, toY: 0.65, label: "Rope through device", color: "F59E0B"),
                        DiagramArrow(fromX: 0.5, fromY: 0.7, toX: 0.5, toY: 0.9, label: "Brake hand (NEVER release)", color: "22C55E"),
                    ],
                    centerLabel: "Belay Device"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "belay-2",
                headline: "Tube Devices vs. Assisted-Braking",
                body: "Tube-style devices (ATC, Reverso) are simple and versatile — they work for belaying and rappelling, in guide mode for multi-pitch. Assisted-braking devices (GriGri, Mega Jul) add a camming mechanism that pinches the rope when loaded suddenly. They don't replace attentive belaying, but they add a backup. The GriGri is standard for sport climbing. For trad and alpine, many climbers carry a tube device for its versatility.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Tube Device (ATC)",
                    rightTitle: "Assisted-Braking (GriGri)",
                    leftColor: "3B82F6",
                    rightColor: "22C55E",
                    leftItems: [
                        "Works for belay and rappel",
                        "Guide mode for multi-pitch",
                        "Lighter and simpler",
                        "Requires constant brake hand",
                    ],
                    rightItems: [
                        "Camming mechanism locks on falls",
                        "Added safety backup",
                        "Easier to hold hanging climber",
                        "Single-rope only, heavier",
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "belay-3",
                headline: "Catching a Lead Fall",
                body: "When the leader falls, the forces are dynamic and directional. The belayer will be pulled upward and toward the first piece of protection. A good belay is dynamic — you give a small jump or step into the wall to absorb energy, reducing the force on the top piece. Too static a catch slams the climber into the wall. Too soft a catch means excessive fall distance. The art is in reading the situation: rope drag, distance above the last piece, terrain below.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.1, toX: 0.5, toY: 0.3, label: "Falling climber", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.3, toY: 0.5, label: "Force to top piece", color: "F59E0B"),
                        DiagramArrow(fromX: 0.3, fromY: 0.5, toX: 0.3, toY: 0.75, label: "Redirected to belayer", color: "3B82F6"),
                        DiagramArrow(fromX: 0.3, fromY: 0.75, toX: 0.5, toY: 0.9, label: "Dynamic catch (soft)", color: "22C55E"),
                    ],
                    centerLabel: "Lead Fall Forces"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "belay-4",
                headline: "Communication and Checks",
                body: "Before every climb, run through the safety check: harness buckled and doubled back, knot tied correctly with adequate tail, belay device loaded properly, rope running freely without tangles. Use standard commands: 'On belay?' / 'Belay on.' / 'Climbing.' / 'Climb on.' / 'Take!' / 'Slack!' / 'Off belay.' At busy crags or in wind, use names. Miscommunication kills — if you can't hear, don't assume.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "check", label: "Safety Check", value: 0.15, description: "Harness, knot, device, rope — verify partner's setup", color: "3B82F6"),
                        DiagramSegment(id: "commands", label: "Commands", value: 0.15, description: "'On belay?' → 'Belay on' → 'Climbing' → 'Climb on'", color: "22C55E"),
                        DiagramSegment(id: "active", label: "Active Belay", value: 0.4, description: "Eyes on climber, brake hand on rope, manage slack", color: "F59E0B"),
                        DiagramSegment(id: "lower-off", label: "Lower/Off", value: 0.3, description: "'Take!' → lower smoothly → 'Off belay'", color: "A855F7"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "belay-q1",
                type: .multipleChoice,
                prompt: "What is the most critical rule in belaying?",
                difficulty: .foundation,
                explanation: "The brake hand never leaves the rope. This is the foundational rule because the belay device's friction is useless without a hand on the brake strand to maintain tension.",
                options: [
                    PracticeOption(label: "The brake hand never leaves the rope", correct: true, explanation: "Without the brake hand, the device provides no meaningful friction."),
                    PracticeOption(label: "Always use an assisted-braking device", correct: false, explanation: "Assisted-braking helps but is not required. Brake hand discipline is."),
                    PracticeOption(label: "Stand as close to the wall as possible", correct: false, explanation: "Position matters, but brake hand discipline is the non-negotiable rule."),
                ]
            ),
            PracticeQuestion(
                id: "belay-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "A dynamic catch reduces the force on protection by allowing the belayer to absorb energy through controlled movement. A completely static catch transfers maximum force to the top piece, potentially causing it to fail.",
                statement: "A soft, dynamic catch is preferred over a hard, static catch because it reduces force on the top piece of protection.",
                isTrue: true,
                reasoning: "Dynamic catching absorbs energy, reducing the peak force transmitted to protection. This is especially critical on marginal gear placements."
            ),
            PracticeQuestion(
                id: "belay-q3",
                type: .multipleChoice,
                prompt: "Your partner is lead climbing and shouts something, but you can't hear the words due to wind. What should you do?",
                difficulty: .intermediate,
                explanation: "If you cannot clearly hear commands, do not guess. Maintain your belay, keep the rope management consistent, and try to visually assess what the climber needs. Miscommunication has caused numerous accidents.",
                options: [
                    PracticeOption(label: "Maintain belay, don't assume — try to visually confirm what they need", correct: true, explanation: "Never act on unclear commands. Watch the climber and maintain a safe belay."),
                    PracticeOption(label: "Assume they said 'Off belay' and take them off", correct: false, explanation: "Assuming 'off belay' could result in the climber falling unprotected."),
                    PracticeOption(label: "Give maximum slack since they probably want to clip", correct: false, explanation: "Giving excessive slack increases fall distance if they're actually falling."),
                ]
            ),
            PracticeQuestion(
                id: "belay-q4",
                type: .sequenceOrder,
                prompt: "Order the standard climbing communication sequence:",
                difficulty: .foundation,
                explanation: "The standard sequence ensures both partners confirm readiness at each stage. Each call-and-response must be completed before proceeding.",
                correctOrder: [
                    "'On belay?'",
                    "'Belay on'",
                    "'Climbing'",
                    "'Climb on'",
                    "'Off belay'",
                ],
                shuffledItems: [
                    "'Climb on'",
                    "'Off belay'",
                    "'On belay?'",
                    "'Climbing'",
                    "'Belay on'",
                ]
            ),
        ],
        synthesisPrompt: "Belaying is a partnership built on trust and discipline. The climber trusts you with their life every time they leave the ground. The device is just a tool — you are the safety system. How does belay technique change as you move from single-pitch sport climbing to multi-pitch alpine routes where communication is difficult and conditions are harsh?",
        conceptMapNodes: [
            ConceptMapNode(id: "belaying", label: "Belay Technique", domain: .ropeSystems, x: 0.5, y: 0.2, connections: ["knots", "anchors", "top-rope", "multi-pitch"]),
            ConceptMapNode(id: "belay-devices", label: "Belay Devices", domain: .ropeSystems, x: 0.25, y: 0.55, connections: ["belaying"]),
            ConceptMapNode(id: "dynamic-catch", label: "Dynamic Catch", domain: .ropeSystems, x: 0.75, y: 0.55, connections: ["belaying", "rope-mechanics"]),
        ]
    )

    // MARK: - Rappelling

    static let rappelling = Lesson(
        id: "rappelling",
        domain: .ropeSystems,
        teachingSteps: [
            TeachingStep(
                id: "rappel-1",
                headline: "Why Rappelling Is the Most Dangerous Routine Skill",
                body: "More experienced climbers die rappelling than leading. The reason is simple: every other system has a backup. When you lead climb, the belayer catches you. When you rappel, you are your own safety system. Errors are unforgiving — a single mistake (unthreaded device, rope too short, hair caught in device) can be fatal. Treat every rappel with the seriousness it deserves, regardless of how many you've done.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "low", label: "Vigilant", minValue: 0, maxValue: 3, color: "22C55E", description: "Focused, double-checking every step"),
                        DiagramZone(id: "moderate", label: "Routine", minValue: 3, maxValue: 6, color: "F59E0B", description: "Comfortable but still checking — acceptable"),
                        DiagramZone(id: "high", label: "Complacent", minValue: 6, maxValue: 10, color: "EF4444", description: "Skipping checks, rushing — this is where accidents happen"),
                    ],
                    minValue: 0,
                    maxValue: 10,
                    unit: "Complacency",
                    currentValue: 2
                ),
                interactionHint: "Adjust the gauge to see how complacency increases risk",
                revealItems: nil
            ),
            TeachingStep(
                id: "rappel-2",
                headline: "Setting Up the Rappel",
                body: "Thread the rope through the anchor rings or chains — never through fixed slings (they melt from friction). Find the middle mark and pull the rope until both strands are even. Load your device on both strands. Before unclipping from the anchor, verify: device is loaded correctly, both strands reach the ground or next station, hair and clothing are clear of the device, and you have a backup (autoblock or fireman's belay from below).",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Rappel setup at anchor station showing rope through rings",
                    hotspots: [
                        RevealItem(id: "rings", label: "Rappel rings", detail: "Thread rope through metal rings — never through slings", x: 0.5, y: 0.15),
                        RevealItem(id: "middle", label: "Middle mark", detail: "Ensures both strands reach the next station equally", x: 0.5, y: 0.35),
                        RevealItem(id: "device", label: "Loaded device", detail: "Both strands through device, carabiner locked", x: 0.5, y: 0.55),
                        RevealItem(id: "backup", label: "Autoblock backup", detail: "Friction hitch below device — locks if you let go", x: 0.5, y: 0.75),
                    ]
                ),
                interactionHint: "Tap each component to review the setup checklist",
                revealItems: nil
            ),
            TeachingStep(
                id: "rappel-3",
                headline: "The Autoblock Backup",
                body: "An autoblock (French prusik) is a friction hitch tied below your rappel device using a thin cord loop. If you release both hands, the autoblock tightens around the rope and stops your descent. It's your backup against losing control — if a rock hits you, if you get disoriented, if you need both hands free. Tie it with 5-6mm cord, 3-4 wraps around both rope strands, clipped to your leg loop. Test it before weighting the rope.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.1, toX: 0.5, toY: 0.3, label: "Rope from anchor", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.35, toX: 0.5, toY: 0.55, label: "Through rappel device", color: "F59E0B"),
                        DiagramArrow(fromX: 0.5, fromY: 0.6, toX: 0.5, toY: 0.75, label: "Autoblock friction hitch", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.8, toX: 0.5, toY: 0.95, label: "To leg loop carabiner", color: "22C55E"),
                    ],
                    centerLabel: "Backup System"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rappel-4",
                headline: "Rope Management and Retrieval",
                body: "Before pulling the rope, identify which strand to pull — it should run through the anchor rings, not around them. Call 'Rope!' to warn anyone below. Pull steadily from below. If the rope gets stuck, try flipping it or pulling from a different angle before committing to reclimbing. On multi-rappel descents, tie knots in the ends of both strands so you can't rappel off the ends. This simple step has saved countless lives.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "setup", label: "Setup", value: 0.25, description: "Thread, equalize strands, load device, backup", color: "3B82F6"),
                        DiagramSegment(id: "descend", label: "Descend", value: 0.3, description: "Smooth, controlled — autoblock engaged", color: "22C55E"),
                        DiagramSegment(id: "arrive", label: "Arrive", value: 0.2, description: "Clip into next anchor before unloading device", color: "F59E0B"),
                        DiagramSegment(id: "retrieve", label: "Retrieve Rope", value: 0.25, description: "Pull correct strand, call 'Rope!', manage tangles", color: "A855F7"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "rappel-q1",
                type: .multipleChoice,
                prompt: "Why should you NEVER thread a rappel rope through fixed nylon slings?",
                difficulty: .foundation,
                explanation: "Rappelling generates friction heat where the rope contacts the anchor. Metal rings dissipate heat. Nylon slings can melt from the friction of a rope being pulled through them, and they have failed catastrophically in documented incidents.",
                options: [
                    PracticeOption(label: "The friction heat from pulling the rope can melt the nylon", correct: true, explanation: "Nylon melts at relatively low temperatures. Rappel friction generates enough heat to sever slings."),
                    PracticeOption(label: "The slings are too narrow for the rope to fit", correct: false, explanation: "Most slings can physically accommodate a rope — the danger is thermal, not mechanical."),
                    PracticeOption(label: "The rope will get stuck and you won't be able to retrieve it", correct: false, explanation: "While slings can cause stuck ropes, the primary danger is sling failure from heat."),
                ]
            ),
            PracticeQuestion(
                id: "rappel-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Knots in rope ends are a critical safety measure on multi-rappel descents. If your rope doesn't reach the next station and you don't have stopper knots, you will rappel off the ends of the rope.",
                statement: "You should always tie stopper knots in both rope ends when doing multi-rappel descents.",
                isTrue: true,
                reasoning: "Stopper knots prevent rappelling off the rope ends if the rope doesn't reach the next station. This simple backup has prevented many fatalities."
            ),
            PracticeQuestion(
                id: "rappel-q3",
                type: .sequenceOrder,
                prompt: "Order the steps for a safe rappel setup:",
                difficulty: .intermediate,
                explanation: "The sequence ensures each safety check is completed before the next step. The autoblock goes on before weighting the rope, and you stay clipped to the anchor until the system is fully tested.",
                correctOrder: [
                    "Thread rope through anchor rings and equalize strands",
                    "Tie stopper knots in both rope ends",
                    "Load both strands into rappel device",
                    "Tie autoblock backup below the device",
                    "Test the system while still clipped to anchor",
                    "Unclip from anchor and begin descent",
                ],
                shuffledItems: [
                    "Tie autoblock backup below the device",
                    "Unclip from anchor and begin descent",
                    "Thread rope through anchor rings and equalize strands",
                    "Load both strands into rappel device",
                    "Test the system while still clipped to anchor",
                    "Tie stopper knots in both rope ends",
                ]
            ),
            PracticeQuestion(
                id: "rappel-q4",
                type: .multipleChoice,
                prompt: "What does the autoblock (French prusik) backup do during a rappel?",
                difficulty: .foundation,
                explanation: "The autoblock is a friction hitch below the rappel device that grips the rope when not actively managed. If you release both hands (due to rockfall, disorientation, or needing hands free), it locks and stops your descent.",
                options: [
                    PracticeOption(label: "It locks the rope and stops your descent if you release both hands", correct: true, explanation: "The friction hitch tightens under load when not held open by the rappeller's hand."),
                    PracticeOption(label: "It prevents the rope from spinning during descent", correct: false, explanation: "Rope spin is managed by technique, not the autoblock."),
                    PracticeOption(label: "It makes the descent faster by reducing friction", correct: false, explanation: "The autoblock adds friction — it's a braking backup, not a speed tool."),
                ]
            ),
        ],
        synthesisPrompt: "Rappelling is the one climbing skill where you are most alone in the safety chain. Every check matters because there's no belayer to catch you. How does this heightened personal responsibility connect to the broader theme of self-reliance in alpine climbing — and how do backup systems like the autoblock reflect the principle of redundancy you learned in anchor building?",
        conceptMapNodes: [
            ConceptMapNode(id: "rappelling", label: "Rappelling", domain: .ropeSystems, x: 0.5, y: 0.2, connections: ["knots", "anchors", "multi-pitch"]),
            ConceptMapNode(id: "autoblock", label: "Autoblock Backup", domain: .ropeSystems, x: 0.3, y: 0.55, connections: ["rappelling"]),
            ConceptMapNode(id: "rope-retrieval", label: "Rope Retrieval", domain: .ropeSystems, x: 0.7, y: 0.55, connections: ["rappelling", "multi-pitch"]),
        ]
    )

    // MARK: - Rope Mechanics

    static let ropeMechanics = Lesson(
        id: "rope-mechanics",
        domain: .ropeSystems,
        teachingSteps: [
            TeachingStep(
                id: "rope-mech-1",
                headline: "Fall Factor: The Key Metric",
                body: "Fall factor is the ratio of fall distance to rope length out. A 2-meter fall on 10 meters of rope is fall factor 0.2. A 2-meter fall on 1 meter of rope is fall factor 2.0 — the maximum. Fall factor matters more than absolute fall distance because the rope's ability to absorb energy depends on how much rope is in the system. A short rope absorbs less energy per unit length, generating higher peak forces.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "low", label: "Low (Top-rope)", minValue: 0, maxValue: 0.3, color: "22C55E", description: "Minimal forces — typical top-rope scenario"),
                        DiagramZone(id: "sport", label: "Moderate (Sport)", minValue: 0.3, maxValue: 1.0, color: "F59E0B", description: "Standard lead falls — rope absorbs well"),
                        DiagramZone(id: "high", label: "High (Factor 1+)", minValue: 1.0, maxValue: 1.7, color: "F97316", description: "Significant forces — gear must be solid"),
                        DiagramZone(id: "max", label: "Factor 2 (Max)", minValue: 1.7, maxValue: 2.0, color: "EF4444", description: "Maximum possible — fall directly onto belay anchor"),
                    ],
                    minValue: 0,
                    maxValue: 2.0,
                    unit: "Fall Factor",
                    currentValue: 0.5
                ),
                interactionHint: "Adjust the gauge to see how fall factor changes force on the system",
                revealItems: nil
            ),
            TeachingStep(
                id: "rope-mech-2",
                headline: "Dynamic vs. Static Ropes",
                body: "Dynamic climbing ropes stretch 30-40% under load to absorb fall energy. This elongation converts kinetic energy into heat, reducing the peak force on the climber and protection. Static ropes stretch only 2-5% — they're used for rappelling, hauling, and fixed lines where stretch is undesirable. Never lead climb on a static rope. A factor 0.5 fall on a static rope generates forces that can break anchors and bones.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Dynamic Rope",
                    rightTitle: "Static Rope",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: [
                        "30-40% elongation under load",
                        "Absorbs fall energy as heat",
                        "Required for lead climbing",
                        "Lower peak forces on gear",
                    ],
                    rightItems: [
                        "2-5% elongation only",
                        "Transmits forces directly",
                        "Rappelling, hauling, fixed lines",
                        "NEVER use for lead climbing",
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rope-mech-3",
                headline: "Impact Force and the UIAA Limit",
                body: "Impact force is the peak force transmitted to the climber during a fall. The UIAA standard requires that a new single rope generates no more than 12kN on a standard test fall (factor 1.77 with 80kg mass). For reference, 12kN is about 1200kg of force — enough to cause serious injury. In practice, friction through carabiners and over rock reduces the actual impact force. But rope aging, UV exposure, and repeated falls increase it over time.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "safe", label: "Normal range", minValue: 0, maxValue: 6, color: "22C55E", description: "Typical sport falls — well within limits"),
                        DiagramZone(id: "elevated", label: "Elevated", minValue: 6, maxValue: 9, color: "F59E0B", description: "High fall factor or old rope — still within standards"),
                        DiagramZone(id: "max", label: "UIAA limit", minValue: 9, maxValue: 12, color: "EF4444", description: "Approaching maximum — potential for injury"),
                    ],
                    minValue: 0,
                    maxValue: 12,
                    unit: "kN",
                    currentValue: 5
                ),
                interactionHint: "Adjust to see force levels relative to the UIAA limit",
                revealItems: nil
            ),
            TeachingStep(
                id: "rope-mech-4",
                headline: "Friction in the System",
                body: "Every carabiner the rope runs through adds friction — roughly 30-40% reduction per bend. This means the belayer feels much less force than the climber experiences. On a wandering route with multiple direction changes, friction can be so high that the rope effectively becomes static at the top piece. This is why long runouts on straight routes produce harder catches than short falls on zig-zagging routes.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.1, toX: 0.5, toY: 0.3, label: "Climber: 8kN", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.35, toX: 0.35, toY: 0.5, label: "Top piece: 10kN", color: "F59E0B"),
                        DiagramArrow(fromX: 0.35, fromY: 0.55, toX: 0.25, toY: 0.7, label: "Mid piece: friction loss", color: "3B82F6"),
                        DiagramArrow(fromX: 0.25, fromY: 0.75, toX: 0.25, toY: 0.9, label: "Belayer: 4kN", color: "22C55E"),
                    ],
                    centerLabel: "Friction Reduction"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "rope-mech-5",
                headline: "Rope Retirement and Care",
                body: "A climbing rope degrades from use, UV exposure, chemical contact, and age. Retire a rope after: any factor 2 fall, visible sheath damage or core shots, 5+ years of age regardless of use, or when the sheath slides excessively over the core. Wash ropes with mild soap and lukewarm water, dry in shade. Store loosely coiled away from sunlight, chemicals, and heat. Your rope is the most critical single piece of gear in the system — treat it accordingly.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "new", label: "New", value: 0.2, description: "Full rated strength, maximum elongation", color: "22C55E"),
                        DiagramSegment(id: "used", label: "Regular Use", value: 0.3, description: "Gradual loss of elongation and strength over use cycles", color: "3B82F6"),
                        DiagramSegment(id: "aged", label: "Aging", value: 0.25, description: "UV and time degrade nylon — stiffer, less energy absorption", color: "F59E0B"),
                        DiagramSegment(id: "retire", label: "Retire", value: 0.25, description: "Core shots, stiff sections, excessive sheath slip — replace", color: "EF4444"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "rope-mech-q1",
                type: .calculation,
                prompt: "A climber is 3 meters above their last piece of protection, with 15 meters of rope out. They fall. What is the fall factor? (Fall distance = 6m, rope out = 15m)",
                difficulty: .intermediate,
                explanation: "Fall factor = fall distance / rope out. The climber falls 3m to the piece + 3m below it = 6m total. With 15m of rope out: 6/15 = 0.4.",
                correctAnswer: 0.4,
                tolerance: 0.05,
                answerUnit: "fall factor"
            ),
            PracticeQuestion(
                id: "rope-mech-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .advanced,
                explanation: "A longer fall distance doesn't necessarily mean higher forces. A 20m fall on 40m of rope (FF 0.5) generates lower peak force than a 4m fall on 2m of rope (FF 2.0). The ratio of fall distance to rope length determines force, not absolute distance.",
                statement: "A 20-meter fall always generates more force than a 4-meter fall.",
                isTrue: false,
                reasoning: "Fall factor determines force, not absolute distance. A 20m fall on 40m of rope (FF 0.5) generates far less force than a 4m fall on 2m of rope (FF 2.0)."
            ),
            PracticeQuestion(
                id: "rope-mech-q3",
                type: .multipleChoice,
                prompt: "Why should you NEVER lead climb on a static rope?",
                difficulty: .foundation,
                explanation: "Static ropes stretch only 2-5%, meaning they cannot absorb fall energy through elongation. Even a modest fall factor on a static rope generates forces high enough to break anchors, damage gear, and cause serious injury to the climber.",
                options: [
                    PracticeOption(label: "It cannot absorb fall energy — peak forces will be dangerously high", correct: true, explanation: "Without elongation to absorb energy, forces spike to equipment-breaking and body-breaking levels."),
                    PracticeOption(label: "It is too heavy for lead climbing", correct: false, explanation: "Static ropes are often lighter than dynamic ropes. Weight is not the issue."),
                    PracticeOption(label: "It wears out faster than a dynamic rope", correct: false, explanation: "Durability is not the concern. Force transmission is the danger."),
                ]
            ),
            PracticeQuestion(
                id: "rope-mech-q4",
                type: .multipleChoice,
                prompt: "Each carabiner the rope bends through reduces the force felt by the belayer by approximately:",
                difficulty: .intermediate,
                explanation: "Each carabiner adds roughly 30-40% friction. This means the belayer may feel significantly less force than the climber, but also means rope drag increases with more direction changes in the route.",
                options: [
                    PracticeOption(label: "30-40%", correct: true, explanation: "Each bend through a carabiner absorbs roughly a third of the remaining force."),
                    PracticeOption(label: "5-10%", correct: false, explanation: "The friction is much higher than 5-10% per carabiner."),
                    PracticeOption(label: "70-80%", correct: false, explanation: "A single carabiner doesn't absorb this much. Two or three bends might cumulatively reach this level."),
                ]
            ),
        ],
        synthesisPrompt: "Understanding rope physics transforms you from someone who follows rules to someone who understands why the rules exist. Fall factor explains why the first piece above the belay is the most critical. Dynamic elongation explains why we use specific ropes for specific tasks. How do these principles inform your decisions about rope selection, protection placement, and fall management on real routes?",
        conceptMapNodes: [
            ConceptMapNode(id: "rope-mechanics", label: "Rope Mechanics", domain: .ropeSystems, x: 0.5, y: 0.2, connections: ["belaying", "knots", "top-rope"]),
            ConceptMapNode(id: "fall-factor", label: "Fall Factor", domain: .ropeSystems, x: 0.25, y: 0.5, connections: ["rope-mechanics"]),
            ConceptMapNode(id: "impact-force", label: "Impact Force", domain: .ropeSystems, x: 0.75, y: 0.5, connections: ["rope-mechanics"]),
            ConceptMapNode(id: "dynamic-vs-static", label: "Dynamic vs Static", domain: .ropeSystems, x: 0.5, y: 0.75, connections: ["rope-mechanics", "rescue-hauls"]),
        ]
    )

    // MARK: - Top-Rope Systems

    static let topRope = Lesson(
        id: "top-rope",
        domain: .ropeSystems,
        teachingSteps: [
            TeachingStep(
                id: "toprope-1",
                headline: "The Top-Rope Advantage",
                body: "In a top-rope system, the rope runs from the belayer up through an anchor at the top of the climb and back down to the climber. Because the rope is always above, the maximum fall is essentially zero — only rope stretch and slack. This makes top-roping the safest form of roped climbing and the ideal way to practice harder moves, train endurance, and introduce beginners to climbing.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.3, fromY: 0.85, toX: 0.3, toY: 0.15, label: "Belayer → anchor", color: "3B82F6"),
                        DiagramArrow(fromX: 0.35, fromY: 0.1, toX: 0.7, toY: 0.1, label: "Through anchor", color: "F59E0B"),
                        DiagramArrow(fromX: 0.7, fromY: 0.15, toX: 0.7, toY: 0.5, label: "Anchor → climber", color: "22C55E"),
                    ],
                    centerLabel: "Top-Rope System"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "toprope-2",
                headline: "Building the Top-Rope Anchor",
                body: "The anchor must be bomber — it bears the combined weight of the climber and the friction forces throughout the session. Use two or more independent anchor points equalized at the master point. Ensure the rope runs over a smooth edge or use a pad to prevent sheath damage. If using a tree, sling it low at the base for the best angle. The master point should sit just over the cliff edge so the carabiners don't grind on rock.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Top-rope anchor setup at cliff edge with equalized pieces",
                    hotspots: [
                        RevealItem(id: "anchor-left", label: "Left anchor point", detail: "Bolt or solid cam — independent from right side", x: 0.25, y: 0.25),
                        RevealItem(id: "anchor-right", label: "Right anchor point", detail: "Second independent piece — redundancy", x: 0.7, y: 0.2),
                        RevealItem(id: "edge", label: "Cliff edge", detail: "Pad if sharp — rope damage is cumulative and invisible", x: 0.5, y: 0.45),
                        RevealItem(id: "master-point", label: "Master point", detail: "Just over the edge — two locking carabiners, gates opposed", x: 0.5, y: 0.55),
                    ]
                ),
                interactionHint: "Tap each element of the anchor setup",
                revealItems: nil
            ),
            TeachingStep(
                id: "toprope-3",
                headline: "Belaying on Top-Rope",
                body: "Top-rope belaying is about managing slack. Keep the rope snug but not so tight that you're pulling the climber off the wall. When they move up, take in. When they rest, hold. When they fall, the impact is gentle — just body weight minus friction. Use the PBUS method: Pull, Brake, Under, Slide. Every take-in cycle follows this pattern to ensure the brake hand never leaves the rope.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "pull", label: "Pull", value: 0.25, description: "Pull rope through device with guide hand", color: "3B82F6"),
                        DiagramSegment(id: "brake", label: "Brake", value: 0.25, description: "Move brake hand to locked position below device", color: "EF4444"),
                        DiagramSegment(id: "under", label: "Under", value: 0.25, description: "Guide hand moves below brake hand on rope", color: "F59E0B"),
                        DiagramSegment(id: "slide", label: "Slide", value: 0.25, description: "Brake hand slides up to device — ready for next cycle", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "toprope-4",
                headline: "Common Top-Rope Errors",
                body: "The most dangerous top-rope error is a poorly built anchor — it's out of sight and out of mind once climbing starts. Other common mistakes: too much slack (unnecessary fall distance), rope running over sharp edges without protection (sheath damage or cutting), not extending the anchor over the edge (carabiners grinding on rock), and cross-loading carabiners at the master point. Inspect the anchor and rope path before every session.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Correct Setup",
                    rightTitle: "Common Errors",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: [
                        "Equalized, redundant anchor",
                        "Master point over edge",
                        "Padded sharp edges",
                        "Locking carabiners, gates opposed",
                    ],
                    rightItems: [
                        "Single-point anchor",
                        "Carabiners grinding on rock",
                        "Rope over sharp edge unpadded",
                        "Unlocked or cross-loaded biners",
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "toprope-q1",
                type: .multipleChoice,
                prompt: "Why should the master point of a top-rope anchor extend just over the cliff edge?",
                difficulty: .foundation,
                explanation: "If the master point sits back from the edge, the rope and carabiners grind on the rock lip during the session. This damages the rope sheath, wears carabiners, and can cross-load them. Extending the master point over the edge allows the rope to hang freely.",
                options: [
                    PracticeOption(label: "To prevent rope and carabiners from grinding on the rock edge", correct: true, explanation: "Rock contact damages equipment and can cross-load carabiners."),
                    PracticeOption(label: "To make the climb longer for the climber", correct: false, explanation: "Anchor position doesn't meaningfully change climb length."),
                    PracticeOption(label: "To reduce the amount of sling material needed", correct: false, explanation: "You should use enough material to position the master point correctly, not minimize it."),
                ]
            ),
            PracticeQuestion(
                id: "toprope-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Even though top-rope falls are gentle, the anchor bears the climber's weight plus friction forces repeatedly throughout an entire session. A multi-hour session with multiple falls subjects the anchor to more cumulative loading than many lead climbing scenarios.",
                statement: "Top-rope anchors can be less robust than lead climbing anchors because the falls are smaller.",
                isTrue: false,
                reasoning: "Top-rope anchors sustain prolonged, repeated loading over entire sessions. They need to be at least as robust as lead anchors — often more so because they bear continuous use."
            ),
            PracticeQuestion(
                id: "toprope-q3",
                type: .multipleChoice,
                prompt: "What does PBUS stand for in top-rope belay technique?",
                difficulty: .foundation,
                explanation: "PBUS stands for Pull, Brake, Under, Slide — the four-step cycle for taking in slack while ensuring the brake hand never leaves the rope.",
                options: [
                    PracticeOption(label: "Pull, Brake, Under, Slide", correct: true, explanation: "This cycle keeps the brake hand on the rope at all times."),
                    PracticeOption(label: "Push, Belay, Untie, Secure", correct: false, explanation: "These are not the correct steps of the belay cycle."),
                    PracticeOption(label: "Pull, Bind, Unweight, Stop", correct: false, explanation: "These are not the correct steps of the belay cycle."),
                ]
            ),
            PracticeQuestion(
                id: "toprope-q4",
                type: .sequenceOrder,
                prompt: "Order the steps for setting up a top-rope session:",
                difficulty: .intermediate,
                explanation: "Build and verify the anchor first, then set up the rope system, then run safety checks before climbing begins.",
                correctOrder: [
                    "Build equalized anchor with redundant pieces",
                    "Extend master point over cliff edge",
                    "Thread rope through master point carabiners",
                    "Pad any sharp edges in the rope path",
                    "Perform partner safety checks before climbing",
                ],
                shuffledItems: [
                    "Thread rope through master point carabiners",
                    "Build equalized anchor with redundant pieces",
                    "Perform partner safety checks before climbing",
                    "Extend master point over cliff edge",
                    "Pad any sharp edges in the rope path",
                ]
            ),
        ],
        synthesisPrompt: "Top-roping appears simple, but it contains the same fundamental elements as every climbing system: anchors, belaying, communication, and equipment management. How do the principles you practice here — anchor building, edge protection, slack management — scale up when you move to multi-pitch climbing where these skills must be executed at height, under stress, and without a walk-off option?",
        conceptMapNodes: [
            ConceptMapNode(id: "top-rope", label: "Top-Rope Systems", domain: .ropeSystems, x: 0.5, y: 0.2, connections: ["anchors", "belaying", "rope-mechanics"]),
            ConceptMapNode(id: "tr-anchor", label: "TR Anchor Building", domain: .ropeSystems, x: 0.25, y: 0.55, connections: ["top-rope", "anchors"]),
            ConceptMapNode(id: "pbus", label: "PBUS Belay Cycle", domain: .ropeSystems, x: 0.75, y: 0.55, connections: ["top-rope", "belaying"]),
        ]
    )

    // MARK: - Multi-Pitch Climbing

    static let multiPitch = Lesson(
        id: "multi-pitch",
        domain: .ropeSystems,
        teachingSteps: [
            TeachingStep(
                id: "multi-1",
                headline: "The Multi-Pitch System",
                body: "Multi-pitch climbing strings together multiple rope-lengths (pitches) to ascend routes taller than a single rope. Two climbers leapfrog — one leads while the other belays, then they swap at each belay station. The system requires seamless anchor building, efficient rope management, clear communication, and the ability to manage all of this at height where retreat is difficult. Every skill you've learned converges here.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Multi-pitch route on rock face showing three belay stations",
                    hotspots: [
                        RevealItem(id: "ground", label: "Ground belay", detail: "First belay — standard setup with redirect if needed", x: 0.3, y: 0.85),
                        RevealItem(id: "p1-anchor", label: "Pitch 1 anchor", detail: "First hanging belay — build SERENE anchor, belay from here", x: 0.45, y: 0.55),
                        RevealItem(id: "p2-anchor", label: "Pitch 2 anchor", detail: "Second station — leader builds anchor, brings up second", x: 0.6, y: 0.3),
                        RevealItem(id: "summit", label: "Summit / top-out", detail: "Final pitch — may top out or traverse to descent", x: 0.7, y: 0.1),
                    ]
                ),
                interactionHint: "Tap each station to understand the flow",
                revealItems: nil
            ),
            TeachingStep(
                id: "multi-2",
                headline: "Belay Station Management",
                body: "At each station, the leader builds an anchor, clips in with a clove hitch (adjustable), and puts the second on belay. The second climbs up, cleaning gear along the way. When the second arrives, they clip into the anchor and the pair reorganizes: gear is racked, the rope is re-stacked, and the next leader ties in and departs. Efficiency here determines whether you finish the route in daylight or get caught in the dark.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "arrive", label: "Leader Arrives", value: 0.2, description: "Build anchor, self-belay with clove hitch, call 'Off belay'", color: "3B82F6"),
                        DiagramSegment(id: "belay-second", label: "Belay Second", value: 0.3, description: "Put second on belay, take in rope as they climb and clean", color: "22C55E"),
                        DiagramSegment(id: "transition", label: "Transition", value: 0.3, description: "Swap gear, re-stack rope, decide who leads next", color: "F59E0B"),
                        DiagramSegment(id: "lead-on", label: "Lead On", value: 0.2, description: "Next leader departs — efficient transition saves hours", color: "A855F7"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "multi-3",
                headline: "Rope Management at Height",
                body: "On a multi-pitch route, the rope must be managed carefully at every station. Stack it on the anchor (not your lap, not the ledge) using the rope bag or butterfly coils tied to the anchor. The end that was belayed in (the leader's end) goes on the bottom of the stack so it feeds out first when the next leader departs. Tangles at height waste time and create dangerous fumbling situations.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "leader-end", name: "Leader's end (bottom of stack)", color: "22C55E", heightRatio: 0.15, description: "Feeds out first when next leader departs"),
                        DiagramLayer(id: "main-stack", name: "Stacked rope (organized coils)", color: "3B82F6", heightRatio: 0.5, description: "Neat laps hung on anchor — no tangles"),
                        DiagramLayer(id: "second-end", name: "Second's end (top of stack)", color: "F59E0B", heightRatio: 0.15, description: "Last to come in, first to grab for transition"),
                        DiagramLayer(id: "anchor", name: "Anchor / tie-in point", color: "D1D5DB", heightRatio: 0.2, description: "Everything attached to the anchor — nothing hanging loose"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "multi-4",
                headline: "Swinging Leads vs. Block Leading",
                body: "In swinging leads, partners alternate who leads each pitch. The second arrives, the pair swaps gear, and the former second becomes the leader. This is efficient because you don't need to re-stack the rope — it's already oriented correctly. In block leading, one person leads multiple pitches in a row. This is useful when one partner is significantly stronger, but requires re-flaking the rope at each station.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Swinging Leads",
                    rightTitle: "Block Leading",
                    leftColor: "22C55E",
                    rightColor: "3B82F6",
                    leftItems: [
                        "Partners alternate pitches",
                        "No rope re-stacking needed",
                        "Equal workload distribution",
                        "Standard for even partnerships",
                    ],
                    rightItems: [
                        "Same person leads multiple pitches",
                        "Must re-flake rope at each station",
                        "Used when skill levels differ",
                        "Stronger climber handles crux pitches",
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "multi-5",
                headline: "Retreat and Descent Planning",
                body: "Before starting any multi-pitch route, know your retreat options. Can you rappel the route? Are there walk-off descents? Where are the bail anchors? Weather can change fast — being two pitches up when a storm hits means you need to descend efficiently and safely. Carry enough gear to build rappel anchors if fixed ones are missing. Know how to join your rope for double-rope rappels. The summit is optional; getting home is mandatory.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "up", label: "SUMMIT", description: "Continue up — only if conditions and ability allow", color: "22C55E"),
                        DiagramVertex(id: "rappel", label: "RAPPEL", description: "Descend the route — requires anchors at each pitch", color: "F59E0B"),
                        DiagramVertex(id: "walkoff", label: "WALK-OFF", description: "Easier descent route — research before climbing", color: "3B82F6"),
                    ],
                    centerLabel: "RETREAT PLAN",
                    centerDescription: "Always know your options before leaving the ground"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "multi-q1",
                type: .multipleChoice,
                prompt: "When stacking rope at a multi-pitch belay station, which end should be on the bottom of the stack?",
                difficulty: .intermediate,
                explanation: "The leader's end goes on the bottom so it feeds out first when the next leader departs. If you stack it wrong, the rope feeds from the wrong end and tangles.",
                options: [
                    PracticeOption(label: "The leader's end — so it feeds out first for the next pitch", correct: true, explanation: "Bottom of stack feeds first. Leader's end must be there."),
                    PracticeOption(label: "The second's end — so the second can tie in first", correct: false, explanation: "The second is already tied in. The stack orientation serves the next leader."),
                    PracticeOption(label: "Either end — it doesn't matter as long as it's organized", correct: false, explanation: "Stack orientation directly affects whether the rope tangles on the next pitch."),
                ]
            ),
            PracticeQuestion(
                id: "multi-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Swinging leads is more efficient because the rope is already oriented correctly — the end that was belayed in is ready to lead out. Block leading requires re-flaking the rope at every station, which adds significant time.",
                statement: "Swinging leads (alternating who leads) is generally more efficient than block leading because it eliminates the need to re-stack the rope.",
                isTrue: true,
                reasoning: "When partners swap leads, the rope naturally feeds from the correct end. Block leading means the rope comes in backwards and must be re-stacked."
            ),
            PracticeQuestion(
                id: "multi-q3",
                type: .sequenceOrder,
                prompt: "Order the steps when the leader arrives at a belay station:",
                difficulty: .foundation,
                explanation: "The leader must secure themselves, build the anchor, communicate with the second, then bring them up. Each step depends on the previous one being complete.",
                correctOrder: [
                    "Clip into a solid piece with a clove hitch",
                    "Build the full equalized anchor",
                    "Call 'Off belay' to the second",
                    "Put the second on belay at the anchor",
                    "Take in rope as the second climbs and cleans",
                ],
                shuffledItems: [
                    "Put the second on belay at the anchor",
                    "Build the full equalized anchor",
                    "Call 'Off belay' to the second",
                    "Take in rope as the second climbs and cleans",
                    "Clip into a solid piece with a clove hitch",
                ]
            ),
            PracticeQuestion(
                id: "multi-q4",
                type: .multipleChoice,
                prompt: "Why is retreat planning essential before starting a multi-pitch route?",
                difficulty: .foundation,
                explanation: "Once you're multiple pitches up, retreat is difficult and time-consuming. Weather, injury, or route difficulty can force a retreat. Knowing your options (rappel the route, walk-off descent, bail anchors) before you leave the ground means you can make fast, safe decisions under pressure.",
                options: [
                    PracticeOption(label: "You may need to descend quickly due to weather, injury, or difficulty — knowing options saves time and lives", correct: true, explanation: "Pre-planned retreat is fast. Improvised retreat under pressure is dangerous."),
                    PracticeOption(label: "It helps you decide which gear to bring for the summit", correct: false, explanation: "Gear selection is important but separate from retreat planning."),
                    PracticeOption(label: "It impresses your climbing partner", correct: false, explanation: "Retreat planning is about safety, not impression."),
                ]
            ),
        ],
        synthesisPrompt: "Multi-pitch climbing is where all rope skills integrate into a flowing system. Knots, anchors, belaying, communication, and rope management must work seamlessly under the stress of exposure and commitment. How does efficiency at belay stations — transitions, rope management, gear swaps — affect the overall safety margin on a long alpine route where daylight and weather are your limiting factors?",
        conceptMapNodes: [
            ConceptMapNode(id: "multi-pitch", label: "Multi-Pitch", domain: .ropeSystems, x: 0.5, y: 0.2, connections: ["anchors", "belaying", "rappelling", "rescue-hauls"]),
            ConceptMapNode(id: "station-mgmt", label: "Station Management", domain: .ropeSystems, x: 0.25, y: 0.55, connections: ["multi-pitch"]),
            ConceptMapNode(id: "retreat-plan", label: "Retreat Planning", domain: .ropeSystems, x: 0.75, y: 0.55, connections: ["multi-pitch", "rappelling"]),
            ConceptMapNode(id: "lead-strategy", label: "Lead Strategy", domain: .ropeSystems, x: 0.5, y: 0.8, connections: ["multi-pitch"]),
        ]
    )

    // MARK: - Hauling Systems

    static let rescueHauls = Lesson(
        id: "rescue-hauls",
        domain: .ropeSystems,
        teachingSteps: [
            TeachingStep(
                id: "haul-1",
                headline: "Mechanical Advantage Basics",
                body: "A hauling system uses pulleys and redirections to multiply the force you can apply. A 1:1 system gives no advantage — you pull 1 kilogram to lift 1 kilogram. A 3:1 system (Z-pulley) means you pull 1 kilogram to lift 3. The tradeoff is rope travel: to raise the load 1 meter in a 3:1 system, you must pull 3 meters of rope. In rescue, mechanical advantage means one person can raise an injured climber who weighs far more than they could lift directly.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.85, toX: 0.5, toY: 0.65, label: "Load (injured climber)", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.6, toX: 0.3, toY: 0.4, label: "Rope to pulley 1", color: "3B82F6"),
                        DiagramArrow(fromX: 0.3, fromY: 0.35, toX: 0.5, toY: 0.2, label: "Redirect to anchor", color: "F59E0B"),
                        DiagramArrow(fromX: 0.5, fromY: 0.15, toX: 0.7, toY: 0.35, label: "Hauler pulls: 3:1 advantage", color: "22C55E"),
                    ],
                    centerLabel: "Z-Pulley (3:1)"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "haul-2",
                headline: "The Z-Pulley System (3:1)",
                body: "The Z-pulley is the most common rescue haul. To build it: anchor the rope from the load, run it through a pulley at the anchor, back down to a prusik on the load rope, through a second pulley on the prusik, and the hauler pulls the free end. The prusik acts as a ratchet — it grips when the hauler rests, preventing the load from sliding back. With two pulleys and a prusik, one person can raise an 80kg climber from a ledge or crevasse.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Z-pulley hauling system rigged at cliff edge",
                    hotspots: [
                        RevealItem(id: "anchor-pulley", label: "Anchor pulley", detail: "Redirects rope at top — reduces friction for hauler", x: 0.5, y: 0.15),
                        RevealItem(id: "prusik", label: "Prusik (ratchet)", detail: "Grips load rope when hauler rests — prevents backslide", x: 0.35, y: 0.55),
                        RevealItem(id: "traveling-pulley", label: "Traveling pulley", detail: "Attached to prusik — creates the 3:1 mechanical advantage", x: 0.4, y: 0.5),
                        RevealItem(id: "hauler", label: "Hauler", detail: "Pulls rope — effectively lifting 3x their applied force", x: 0.7, y: 0.35),
                    ]
                ),
                interactionHint: "Tap each component to understand its role",
                revealItems: nil
            ),
            TeachingStep(
                id: "haul-3",
                headline: "Simple vs. Compound Systems",
                body: "A simple system uses a single set of pulleys (3:1, 5:1). A compound system piggybacks one system onto another — a 3:1 pulling on a 3:1 creates a 9:1. More mechanical advantage means less force needed, but more rope travel and more complexity. In practice, a 3:1 is usually sufficient. A 6:1 (C-pulley) is the next step up. Beyond 6:1, friction losses in real-world conditions erode the theoretical advantage significantly.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Simple Systems",
                    rightTitle: "Compound Systems",
                    leftColor: "22C55E",
                    rightColor: "F59E0B",
                    leftItems: [
                        "3:1 Z-pulley (most common)",
                        "5:1 for heavier loads",
                        "Less rope needed",
                        "Simpler to build and manage",
                    ],
                    rightItems: [
                        "6:1 C-pulley (practical max)",
                        "9:1 for extreme situations",
                        "More rope travel required",
                        "Friction losses increase with complexity",
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "haul-4",
                headline: "Rescue Hauling in Practice",
                body: "Real-world hauling is messy. The rope runs over edges, through snow, around obstacles. Each bend adds friction that eats into your mechanical advantage. A theoretical 3:1 might be an actual 2:1 after friction. Pad edges, use pulleys instead of carabiners (pulleys are ~95% efficient vs. carabiners at ~50%), and keep the system as straight as possible. Practice building haul systems until you can do it under stress, in the dark, with cold hands. In a real rescue, those are the conditions you'll face.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "ideal", label: "Ideal (pulleys, straight)", minValue: 0, maxValue: 3, color: "22C55E", description: "3:1 with pulleys on smooth surface — near theoretical"),
                        DiagramZone(id: "real", label: "Real-world (some friction)", minValue: 3, maxValue: 6, color: "F59E0B", description: "Edge friction, carabiner bends — typical field conditions"),
                        DiagramZone(id: "degraded", label: "Degraded (high friction)", minValue: 6, maxValue: 10, color: "EF4444", description: "Multiple bends, no pulleys, wet rope — may need higher MA"),
                    ],
                    minValue: 0,
                    maxValue: 10,
                    unit: "Friction Loss",
                    currentValue: 4
                ),
                interactionHint: "Adjust to see how friction degrades mechanical advantage",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "haul-q1",
                type: .calculation,
                prompt: "In a 3:1 Z-pulley system, how many meters of rope must you pull to raise the load 1 meter?",
                difficulty: .foundation,
                explanation: "In a 3:1 system, the tradeoff for tripled force is tripled rope travel. To raise the load 1 meter, you must pull 3 meters of rope through the system.",
                correctAnswer: 3.0,
                tolerance: 0.1,
                answerUnit: "meters"
            ),
            PracticeQuestion(
                id: "haul-q2",
                type: .multipleChoice,
                prompt: "Why are pulleys preferred over carabiners in hauling systems?",
                difficulty: .intermediate,
                explanation: "Pulleys are approximately 95% efficient (only 5% energy lost to friction), while carabiners are roughly 50% efficient. In a multi-redirect system, this difference compounds dramatically. A 3:1 with carabiners might deliver only 1.5:1 actual advantage.",
                options: [
                    PracticeOption(label: "Pulleys are ~95% efficient vs. ~50% for carabiners — friction losses compound", correct: true, explanation: "Each friction point degrades the system. Pulleys minimize this degradation."),
                    PracticeOption(label: "Pulleys are lighter than carabiners", correct: false, explanation: "Pulleys are actually heavier. The advantage is friction reduction, not weight."),
                    PracticeOption(label: "Carabiners can break under hauling loads", correct: false, explanation: "Carabiners are strong enough. The issue is friction, not strength."),
                ]
            ),
            PracticeQuestion(
                id: "haul-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "The prusik hitch acts as a progress capture (ratchet) in the Z-pulley system. When the hauler pauses to reset, the prusik grips the rope and holds the load in place. Without it, the load would slide back every time the hauler rests.",
                statement: "The prusik hitch in a Z-pulley system acts as a ratchet, preventing the load from sliding back when the hauler rests.",
                isTrue: true,
                reasoning: "The prusik grips under load and releases when pushed. This ratcheting function is essential — it allows the hauler to work in short pulls without losing progress."
            ),
            PracticeQuestion(
                id: "haul-q4",
                type: .multipleChoice,
                prompt: "A theoretical 3:1 system with significant edge friction might deliver what actual mechanical advantage?",
                difficulty: .advanced,
                explanation: "Real-world friction from rock edges, carabiner bends, and dirty rope can reduce a 3:1 system to roughly 2:1 or less. This is why rescue practitioners pad edges, use pulleys, and keep systems as straight as possible.",
                options: [
                    PracticeOption(label: "Approximately 2:1 or less due to friction losses", correct: true, explanation: "Edge friction and carabiner bends can consume a third or more of the theoretical advantage."),
                    PracticeOption(label: "Still 3:1 — friction doesn't affect mechanical advantage", correct: false, explanation: "Friction directly reduces the effective force transmitted to the load."),
                    PracticeOption(label: "Approximately 4:1 — friction helps by adding grip", correct: false, explanation: "Friction opposes the hauling force, reducing advantage rather than increasing it."),
                ]
            ),
        ],
        synthesisPrompt: "Hauling systems turn one person into a rescue team. The physics are simple — pulleys multiply force at the cost of rope travel. But the execution under pressure, at height, in bad conditions, is where practice matters. How do you decide between a simple 3:1 and a more complex system when every minute counts and every added component introduces potential failure points?",
        conceptMapNodes: [
            ConceptMapNode(id: "rescue-hauls", label: "Hauling Systems", domain: .ropeSystems, x: 0.5, y: 0.2, connections: ["anchors", "crevasse-rescue-rope", "improvised-systems"]),
            ConceptMapNode(id: "z-pulley", label: "Z-Pulley (3:1)", domain: .ropeSystems, x: 0.25, y: 0.55, connections: ["rescue-hauls"]),
            ConceptMapNode(id: "mechanical-advantage", label: "Mechanical Advantage", domain: .ropeSystems, x: 0.75, y: 0.55, connections: ["rescue-hauls"]),
            ConceptMapNode(id: "friction-loss", label: "Friction Losses", domain: .ropeSystems, x: 0.5, y: 0.8, connections: ["rescue-hauls", "rope-mechanics"]),
        ]
    )

    // MARK: - Crevasse Rescue Rope Systems

    static let crevasseRescueRope = Lesson(
        id: "crevasse-rescue-rope",
        domain: .ropeSystems,
        teachingSteps: [
            TeachingStep(
                id: "crevasse-1",
                headline: "When the Rope Goes Tight",
                body: "Crevasse rescue begins when a rope team member falls through a snow bridge. The remaining team members self-arrest to stop the fall — the rope goes tight, cutting into the crevasse lip. Time is critical: the fallen climber may be injured, hypothermic, or hanging in a harness (which can restrict blood flow within 15-20 minutes). Every second spent setting up the rescue system matters.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "arrest", label: "Self-Arrest", value: 0.15, description: "Stop the fall — ice axe, prone position, hold the rope", color: "EF4444"),
                        DiagramSegment(id: "assess", label: "Assess", value: 0.15, description: "Is the victim conscious? Injured? Can they self-rescue?", color: "F59E0B"),
                        DiagramSegment(id: "anchor", label: "Build Anchor", value: 0.2, description: "Transfer load from your body to a bombproof snow anchor", color: "3B82F6"),
                        DiagramSegment(id: "haul", label: "Haul System", value: 0.3, description: "Build Z-pulley, pad lip, begin hauling", color: "22C55E"),
                        DiagramSegment(id: "extract", label: "Extract", value: 0.2, description: "Pull victim over lip — most difficult phase", color: "A855F7"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "crevasse-2",
                headline: "Transferring the Load to an Anchor",
                body: "After self-arrest, you must transfer the victim's weight from your body to an anchor so you can move freely to build the rescue system. While maintaining the arrest, use your feet to stomp in a snow picket or bury an ice axe as a deadman anchor. Tie the rope to the anchor using a prusik or Klemheist, then carefully transfer the load. Test the anchor before fully releasing — if it pulls, you both go in.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Glacier surface showing self-arrest position and snow anchor placement",
                    hotspots: [
                        RevealItem(id: "rescuer", label: "Rescuer (self-arrest)", detail: "Prone position, ice axe planted, feet dug in — holding the fall", x: 0.7, y: 0.4),
                        RevealItem(id: "anchor", label: "Snow anchor", detail: "Buried picket or deadman — must hold full body weight", x: 0.5, y: 0.3),
                        RevealItem(id: "prusik", label: "Prusik transfer", detail: "Tied on loaded rope, clipped to anchor — transfers weight", x: 0.55, y: 0.45),
                        RevealItem(id: "lip", label: "Crevasse lip", detail: "Rope cuts into snow — pad with ice axe or pack before hauling", x: 0.3, y: 0.55),
                    ]
                ),
                interactionHint: "Tap each element of the rescue setup",
                revealItems: nil
            ),
            TeachingStep(
                id: "crevasse-3",
                headline: "Building the Haul System on Snow",
                body: "The Z-pulley system is the standard for crevasse rescue. Build it on the rope running to the victim, with the anchor as the redirect point. The key challenge on snow is the crevasse lip — the rope digs in and creates enormous friction. Pad the lip with an ice axe, pack, or ski laid perpendicular to the rope. Without lip padding, even a 6:1 system may not overcome the friction of rope sawing through snow.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.7, toX: 0.2, toY: 0.4, label: "Victim in crevasse", color: "EF4444"),
                        DiagramArrow(fromX: 0.2, fromY: 0.35, toX: 0.5, toY: 0.35, label: "Rope over padded lip", color: "F59E0B"),
                        DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.5, toY: 0.15, label: "To anchor/redirect", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.15, toX: 0.8, toY: 0.35, label: "Hauler pulls (3:1)", color: "22C55E"),
                    ],
                    centerLabel: "Lip Friction Is Your Enemy"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "crevasse-4",
                headline: "The Drop-C (6:1) System",
                body: "When a 3:1 isn't enough — typically with a heavier victim, deep lip cutting, or a solo rescuer — upgrade to a 6:1 (Drop-C). This piggybacks a 2:1 onto the existing 3:1 by adding another redirect at the anchor. The tradeoff: 6 meters of rope travel for every 1 meter of victim raised. On a 60-meter rope with the victim 30 meters down, you have limited pulls before running out of rope and needing to reset.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "3:1 Z-Pulley",
                    rightTitle: "6:1 Drop-C",
                    leftColor: "22C55E",
                    rightColor: "3B82F6",
                    leftItems: [
                        "Simpler to build (2 pulleys, 1 prusik)",
                        "3m rope per 1m of raise",
                        "Usually sufficient for 2-person team",
                        "Faster to set up",
                    ],
                    rightItems: [
                        "More complex (3 pulleys, 2 prusiks)",
                        "6m rope per 1m of raise",
                        "Needed for solo rescue or high friction",
                        "May require rope resets on long raises",
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "crevasse-5",
                headline: "Self-Rescue from the Crevasse",
                body: "If the victim is conscious and uninjured, self-rescue is fastest. Using two prusik loops (one for feet, one for waist), the climber ascends the rope by alternately sliding each prusik upward and weighting it. Slide the waist prusik up, stand in the foot prusik, slide the foot prusik up, sit in the waist prusik, repeat. It's exhausting, especially with a pack, but it's faster than waiting for a haul system to be built from above.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Climber ascending rope inside crevasse using prusik technique",
                    hotspots: [
                        RevealItem(id: "waist-prusik", label: "Waist prusik", detail: "Tied to harness — bears body weight while resting", x: 0.5, y: 0.35),
                        RevealItem(id: "foot-prusik", label: "Foot prusik/loop", detail: "Sling to foot — stand up to advance waist prusik", x: 0.5, y: 0.6),
                        RevealItem(id: "rope", label: "Loaded rope", detail: "Runs to team above — taut from anchor", x: 0.45, y: 0.15),
                        RevealItem(id: "lip-challenge", label: "Lip overhang", detail: "Hardest part — may need hauling assistance over the lip", x: 0.45, y: 0.08),
                    ]
                ),
                interactionHint: "Tap each element of the prusik ascent system",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "crevasse-q1",
                type: .sequenceOrder,
                prompt: "Order the steps of a crevasse rescue after a team member falls through:",
                difficulty: .intermediate,
                explanation: "The sequence follows a logical progression: stop the fall, assess, secure the load to an anchor, prepare the lip, build the haul system, and extract. Skipping steps or doing them out of order wastes time and creates danger.",
                correctOrder: [
                    "Self-arrest to stop the fall",
                    "Assess victim condition — can they self-rescue?",
                    "Build snow anchor and transfer load from body",
                    "Pad the crevasse lip to reduce friction",
                    "Build Z-pulley hauling system and begin extraction",
                ],
                shuffledItems: [
                    "Build Z-pulley hauling system and begin extraction",
                    "Self-arrest to stop the fall",
                    "Pad the crevasse lip to reduce friction",
                    "Build snow anchor and transfer load from body",
                    "Assess victim condition — can they self-rescue?",
                ]
            ),
            PracticeQuestion(
                id: "crevasse-q2",
                type: .multipleChoice,
                prompt: "Why is padding the crevasse lip critical before hauling?",
                difficulty: .foundation,
                explanation: "The rope cuts into the snow at the crevasse lip under the victim's weight. This creates enormous friction that can make hauling impossible even with mechanical advantage. Padding with an ice axe, pack, or ski prevents the rope from sawing in and reduces friction dramatically.",
                options: [
                    PracticeOption(label: "The rope cuts into snow creating friction that can make hauling impossible", correct: true, explanation: "Lip friction is the biggest obstacle in crevasse rescue — it can defeat even a 6:1 system."),
                    PracticeOption(label: "It prevents the rope from being cut by sharp ice", correct: false, explanation: "While rope damage is a concern, the primary issue is friction preventing the haul."),
                    PracticeOption(label: "It makes a smoother surface for the victim to slide over", correct: false, explanation: "Victim comfort at the lip is secondary to the friction problem during hauling."),
                ]
            ),
            PracticeQuestion(
                id: "crevasse-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .advanced,
                explanation: "Harness hang syndrome (suspension trauma) can restrict blood flow to the legs, causing blood to pool. Unconsciousness can occur within 15-20 minutes, and death within 30-60 minutes. This creates genuine urgency in crevasse rescue — speed matters.",
                statement: "A conscious, uninjured climber hanging in their harness in a crevasse is in no immediate danger and the rescue can proceed slowly and carefully.",
                isTrue: false,
                reasoning: "Harness hang syndrome can cause unconsciousness in 15-20 minutes and death within an hour. Even an uninjured victim is on a clock. Speed and efficiency in the rescue system matter."
            ),
            PracticeQuestion(
                id: "crevasse-q4",
                type: .multipleChoice,
                prompt: "When should you upgrade from a 3:1 to a 6:1 hauling system?",
                difficulty: .intermediate,
                explanation: "A 6:1 system is needed when a 3:1 can't overcome the friction and load — typically with a heavier victim, significant lip cutting, a solo rescuer, or when conditions make hauling difficult. The tradeoff is complexity and more rope travel per meter of raise.",
                options: [
                    PracticeOption(label: "When the 3:1 can't overcome friction — heavy victim, deep lip cut, solo rescuer", correct: true, explanation: "Upgrade when the simpler system isn't generating enough force."),
                    PracticeOption(label: "Always start with 6:1 for maximum safety", correct: false, explanation: "A 6:1 takes longer to build and uses more rope. Start with 3:1 and upgrade if needed."),
                    PracticeOption(label: "Only when the victim is unconscious", correct: false, explanation: "Victim consciousness doesn't determine the mechanical advantage needed — friction and weight do."),
                ]
            ),
        ],
        synthesisPrompt: "Crevasse rescue combines every skill: self-arrest (mountaineering), anchor building (rock skills adapted to snow), hauling systems (engineering), and prusik ascending (technique under duress). The challenge is executing all of this under time pressure with cold hands and high stress. How does practicing these systems in controlled conditions prepare you for the real thing — and where does practice fall short of reality?",
        conceptMapNodes: [
            ConceptMapNode(id: "crevasse-rescue-rope", label: "Crevasse Rescue", domain: .ropeSystems, x: 0.5, y: 0.2, connections: ["rescue-hauls", "knots", "anchors"]),
            ConceptMapNode(id: "prusik-ascent", label: "Prusik Ascent", domain: .ropeSystems, x: 0.25, y: 0.55, connections: ["crevasse-rescue-rope", "knots"]),
            ConceptMapNode(id: "snow-anchors", label: "Snow Anchors", domain: .ropeSystems, x: 0.75, y: 0.55, connections: ["crevasse-rescue-rope", "anchors"]),
            ConceptMapNode(id: "lip-management", label: "Lip Management", domain: .ropeSystems, x: 0.5, y: 0.8, connections: ["crevasse-rescue-rope"]),
        ]
    )

    // MARK: - Improvised Rope Systems

    static let improvisedSystems = Lesson(
        id: "improvised-systems",
        domain: .ropeSystems,
        teachingSteps: [
            TeachingStep(
                id: "improv-1",
                headline: "When Gear Fails or Gets Lost",
                body: "In alpine climbing, gear loss happens. A dropped belay device, a stuck rappel rope, a broken carabiner. The ability to improvise with what remains separates a manageable situation from an emergency. The munter hitch replaces any belay device. Prusik loops substitute for ascenders. Slings become anchors. Cordelette becomes a hauling system. Mastering these improvisations means the loss of any single piece of equipment never leaves you stranded.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Standard Gear",
                    rightTitle: "Improvised Substitute",
                    leftColor: "3B82F6",
                    rightColor: "F59E0B",
                    leftItems: [
                        "Belay device (ATC/GriGri)",
                        "Mechanical ascenders",
                        "Pulleys",
                        "Pre-sewn slings",
                    ],
                    rightItems: [
                        "Munter hitch on HMS carabiner",
                        "Prusik / Klemheist hitches",
                        "Carabiner redirects (50% efficiency)",
                        "Tied cord / webbing loops",
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "improv-2",
                headline: "The Munter-Mule: Lock Off Any Belay",
                body: "The munter-mule combination lets you lock off a belay hands-free. Start with a munter hitch, then tie a mule knot (slip knot) around the load strand and secure it with a half hitch. This frees both hands while the climber remains safely held. Use it when you need to escape the belay to assist an injured leader, build an anchor extension, or set up a rescue system. Practice until you can tie it one-handed with gloves.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Munter-mule lockoff on carabiner at belay station",
                    hotspots: [
                        RevealItem(id: "munter", label: "Munter hitch", detail: "Dynamic friction belay — standard starting point", x: 0.5, y: 0.3),
                        RevealItem(id: "mule", label: "Mule knot (slip)", detail: "Locks the belay — holds load without hands", x: 0.5, y: 0.5),
                        RevealItem(id: "backup", label: "Half hitch backup", detail: "Secures the mule knot — prevents accidental release", x: 0.5, y: 0.65),
                        RevealItem(id: "release", label: "Release tail", detail: "Pull to release under load — returns to active munter belay", x: 0.7, y: 0.55),
                    ]
                ),
                interactionHint: "Tap each part of the munter-mule system",
                revealItems: nil
            ),
            TeachingStep(
                id: "improv-3",
                headline: "Escaping the Belay",
                body: "If the leader is injured and hanging on the rope, you need to escape the belay — transfer the load from your device to the anchor so you can move freely to help. Lock off with a munter-mule, tie a prusik below your device on the load strand, clip it to the anchor, and slowly release the mule to transfer the load to the prusik. Once the anchor holds the climber, you can detach your device and move. This is arguably the most important improvised technique to master.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "lockoff", label: "Lock Off", value: 0.25, description: "Tie munter-mule to secure the belay hands-free", color: "3B82F6"),
                        DiagramSegment(id: "prusik", label: "Prusik to Anchor", value: 0.25, description: "Attach prusik below device on load strand, clip to anchor", color: "F59E0B"),
                        DiagramSegment(id: "transfer", label: "Transfer Load", value: 0.25, description: "Slowly release mule — load transfers to prusik and anchor", color: "EF4444"),
                        DiagramSegment(id: "free", label: "Free to Move", value: 0.25, description: "Remove device, move to assist leader or build rescue system", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "improv-4",
                headline: "Improvised Rescue Litter and Lowering",
                body: "When a climber can't move under their own power, you may need to lower them to safety. An improvised litter can be built from a coiled rope (wrapping the victim in large butterfly coils), a backpack frame, or trekking poles lashed with cord. Lowering uses a munter hitch on the anchor with a mule knot backup. Lower in controlled increments, resetting the mule between sections. On terrain too steep to lower, call for helicopter rescue — knowing your limits is the ultimate improvisation skill.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "self-rescue", label: "SELF-RESCUE", description: "Victim can move with assistance — fastest option", color: "22C55E"),
                        DiagramVertex(id: "team-rescue", label: "TEAM RESCUE", description: "Improvised haul/lower — requires gear and skill", color: "F59E0B"),
                        DiagramVertex(id: "external", label: "CALL FOR HELP", description: "Helicopter, SAR team — know when to escalate", color: "EF4444"),
                    ],
                    centerLabel: "DECISION",
                    centerDescription: "Assess injuries, terrain, and your capability honestly"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "improv-q1",
                type: .multipleChoice,
                prompt: "You drop your belay device mid-route. What is the standard improvised substitute?",
                difficulty: .foundation,
                explanation: "The munter hitch tied on an HMS (pear-shaped) carabiner provides dynamic friction belaying and can also be used for rappelling. It is the universal backup for any lost belay device.",
                options: [
                    PracticeOption(label: "Munter hitch on an HMS carabiner", correct: true, explanation: "The munter provides dynamic friction for belaying and rappelling — no device needed."),
                    PracticeOption(label: "Wrap the rope around your waist for friction", correct: false, explanation: "Body belaying is extremely dangerous and provides minimal control. Use a munter."),
                    PracticeOption(label: "Tie the rope directly to the anchor and have the climber self-belay", correct: false, explanation: "This doesn't provide a functioning belay system."),
                ]
            ),
            PracticeQuestion(
                id: "improv-q2",
                type: .sequenceOrder,
                prompt: "Order the steps for escaping the belay when the leader is injured and hanging:",
                difficulty: .advanced,
                explanation: "The sequence must be followed precisely. Each step depends on the previous one. Releasing the mule before the prusik is loaded to the anchor means dropping the climber.",
                correctOrder: [
                    "Lock off the belay with a munter-mule",
                    "Tie a prusik on the load strand below the device",
                    "Clip the prusik to the anchor with a sling",
                    "Slowly release the mule to transfer load to the prusik",
                    "Remove your device and move to assist",
                ],
                shuffledItems: [
                    "Slowly release the mule to transfer load to the prusik",
                    "Lock off the belay with a munter-mule",
                    "Remove your device and move to assist",
                    "Tie a prusik on the load strand below the device",
                    "Clip the prusik to the anchor with a sling",
                ]
            ),
            PracticeQuestion(
                id: "improv-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "The munter-mule allows you to lock off any belay hands-free, which is the critical first step in escaping the belay or setting up a rescue system. Without it, you cannot free yourself to help an injured partner.",
                statement: "The munter-mule combination is the most important improvised technique because it allows you to lock off a belay and free both hands.",
                isTrue: true,
                reasoning: "The munter-mule is the gateway to every rescue scenario. Without the ability to lock off the belay, you cannot escape it, and without escaping the belay, you cannot perform rescue operations."
            ),
            PracticeQuestion(
                id: "improv-q4",
                type: .multipleChoice,
                prompt: "When should you abandon improvised rescue efforts and call for external help?",
                difficulty: .advanced,
                explanation: "Knowing your limits is as important as knowing techniques. If injuries are severe (spinal, head trauma, compound fractures), if terrain prevents safe lowering, or if your skills are insufficient, calling for professional rescue is the right decision. Delayed calls for help have contributed to many preventable deaths.",
                options: [
                    PracticeOption(label: "When injuries exceed your ability to safely move the victim, or terrain prevents lowering", correct: true, explanation: "Honest self-assessment and early escalation saves lives."),
                    PracticeOption(label: "Only after exhausting every possible improvised option", correct: false, explanation: "Delaying a call while attempting increasingly desperate improvisations wastes critical time."),
                    PracticeOption(label: "Immediately — improvised rescue is too dangerous", correct: false, explanation: "Many situations are safely handled with improvised techniques. External help isn't always available quickly."),
                ]
            ),
        ],
        synthesisPrompt: "Improvisation is the highest expression of rope system mastery. It requires understanding not just how to use gear, but why each piece of gear works — so you can recreate its function with whatever you have. How does deep understanding of friction, mechanical advantage, and knot function enable you to solve problems that no guidebook specifically covers?",
        conceptMapNodes: [
            ConceptMapNode(id: "improvised-systems", label: "Improvised Systems", domain: .ropeSystems, x: 0.5, y: 0.2, connections: ["knots", "rescue-hauls", "belaying"]),
            ConceptMapNode(id: "munter-mule", label: "Munter-Mule", domain: .ropeSystems, x: 0.25, y: 0.55, connections: ["improvised-systems", "knots"]),
            ConceptMapNode(id: "belay-escape", label: "Belay Escape", domain: .ropeSystems, x: 0.75, y: 0.55, connections: ["improvised-systems", "belaying"]),
            ConceptMapNode(id: "rescue-decision", label: "Rescue Decisions", domain: .ropeSystems, x: 0.5, y: 0.8, connections: ["improvised-systems", "rescue-hauls"]),
        ]
    )
}
