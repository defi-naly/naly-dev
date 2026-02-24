import Foundation

// MARK: - Rope Systems Explore Articles
// Reference material for climbers, mountaineers, and alpine travelers.
// Based on AMGA curriculum and "Freedom of the Hills" by The Mountaineers.

enum RopeSystemsExplore {

    // MARK: - All Rope Systems Explore Articles

    static let articles: [ExploreArticle] = [
        essentialKnots,
        anchorBuilding,
        belayingFundamentals,
        rappellingTechniques,
        ropeMechanics,
        topRopeSystems,
        multiPitchClimbing,
        rescueHaulingSystems,
        crevasseRescueRopeWork,
        improvisedSystems,
    ]

    // MARK: - 1. Essential Knots

    static let essentialKnots = ExploreArticle(
        id: "rope-essential-knots",
        domain: .ropeSystems,
        title: "Essential Knots",
        summary: "A small repertoire of knots covers the vast majority of climbing and mountaineering situations. The figure-eight follow-through, clove hitch, munter hitch, and bowline each serve a distinct purpose in the safety chain, and mastering them until they are automatic is a non-negotiable foundation.",
        icon: "link",
        heroImageName: "Photos/Heroes/hero-rope-knots",
        sections: [
            ExploreSection(
                id: "essential-knots-1",
                heading: "The Figure-Eight Follow-Through",
                body: "The figure-eight follow-through is the standard tie-in knot for climbing worldwide. It is strong, easy to visually inspect, and does not loosen under repeated loading and unloading cycles. To tie it, form a figure-eight in the rope about a meter from the end, pass the tail through both harness tie-in points, and retrace the figure-eight exactly. The finished knot should have five parallel sets of strands with a tail of at least six inches. The figure-eight retains approximately 75-80% of the rope's rated strength, which is more than sufficient given the safety margins built into modern climbing ropes.",
                imageName: "Photos/rope-figure-eight",
                imageCaption: "Figure-eight knot tied on a climbing rope",
                animationName: "anim-figure-eight-knot",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "A figure-eight follow-through knot tied through a climbing harness tie-in points, showing the rope retracing the figure-eight pattern with a visible tail extending from the finished knot.",
                        hotspots: [
                            RevealItem(id: "initial-eight", label: "Initial Figure-Eight", detail: "Form the base knot about 1 meter from the rope end. This determines how much tail you have to retrace.", x: 0.3, y: 0.35),
                            RevealItem(id: "harness-loop", label: "Harness Tie-In", detail: "Thread through both tie-in points on the harness — the belay loop alone is not sufficient for tying in.", x: 0.5, y: 0.6),
                            RevealItem(id: "retrace", label: "Retrace Path", detail: "Follow the original figure-eight exactly in reverse. Five parallel strand pairs should be visible when complete.", x: 0.65, y: 0.4),
                            RevealItem(id: "tail", label: "Safety Tail", detail: "Leave at least 15cm (6 inches) of tail. Some climbers tie a stopper knot with the tail for extra security.", x: 0.8, y: 0.5)
                        ],
                        animationStyle: "fade"
                    )
                ),
                keyFacts: [
                    "Retains 75-80% of rope strength — the strongest standard climbing knot",
                    "Easy to visually inspect: look for five parallel strand pairs",
                    "Does not loosen under repeated loading and unloading",
                    "The universal standard tie-in knot accepted at every climbing gym and crag worldwide",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "essential-knots-2",
                heading: "The Clove Hitch",
                body: "The clove hitch is the workhorse knot for attaching yourself to anchors and managing rope at belay stations. Its critical advantage is adjustability: you can lengthen or shorten your tether without untying, simply by pulling rope through the knot. This makes transitions at multi-pitch anchors far more efficient than tying and untying figure-eights. The clove hitch must always be tied on a locking carabiner, because it can slip on an unlocked gate. It holds well under sustained load but can creep under repeated small movements, so periodic inspection at long belay stances is good practice.",
                imageName: "Photos/rope-clove-hitch",
                imageCaption: "Clove hitch tied on a locking carabiner at an anchor",
                diagram: nil,
                keyFacts: [
                    "Adjustable without untying — essential for efficient anchor management",
                    "Must always be clipped to a locking carabiner",
                    "Can be tied with one hand, a critical skill when clipping anchors while leading",
                    "Holds approximately 65-70% of rope strength",
                    "Can creep under repeated light loading — inspect periodically",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "essential-knots-3",
                heading: "The Munter Hitch",
                body: "The munter hitch is a friction hitch that can replace a belay or rappel device in an emergency. Tied on a pear-shaped (HMS) locking carabiner, it provides enough friction to catch a leader fall or control a rappel. The munter works by reversing direction as the rope feeds through, creating friction against the carabiner. It kinks the rope badly over extended use, which is why it is reserved for emergencies and specific guide techniques rather than everyday belaying. Every climber should be able to tie a munter hitch by feel, in the dark, because the scenario in which you need one — a dropped belay device on a multi-pitch route — is exactly the scenario where stress is highest.",
                imageName: "Photos/rope-munter-hitch",
                imageCaption: "Munter hitch loaded on an HMS carabiner",
                diagram: ExploreDiagram(
                    type: .forceArrows,
                    config: DiagramConfig(
                        arrows: [
                            DiagramArrow(fromX: 0.1, fromY: 0.5, toX: 0.4, toY: 0.5, label: "Load Strand", color: "EF4444"),
                            DiagramArrow(fromX: 0.4, fromY: 0.5, toX: 0.5, toY: 0.3, label: "Friction Wrap", color: "F97316"),
                            DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.5, toY: 0.7, label: "Reversal", color: "F97316"),
                            DiagramArrow(fromX: 0.5, fromY: 0.7, toX: 0.9, toY: 0.5, label: "Brake Strand", color: "22C55E"),
                        ],
                        centerLabel: "HMS Carabiner",
                        labels: ["Climber Side", "Brake Hand Side"],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "Replaces a belay device in emergency — every climber must know this knot",
                    "Requires a pear-shaped (HMS) locking carabiner to function properly",
                    "Provides enough friction to catch a leader fall when belaying",
                    "Kinks the rope significantly — use only when necessary",
                ],
                warningNote: "Practice tying the munter hitch until you can do it by feel alone. You will need it precisely when conditions make it hardest to tie: hanging at an anchor, in the dark, with cold hands."
            ),
            ExploreSection(
                id: "essential-knots-4",
                heading: "The Bowline and Supporting Knots",
                body: "The bowline creates a fixed loop that is easy to untie after loading, making it valuable for tying into anchors and creating loops in the middle of a rope. However, the bowline can loosen when unloaded and capsize under ring loading, so it must always be backed up with a stopper knot or Yosemite finish. The double fisherman's knot joins two ropes of similar diameter for rappelling and is effectively permanent once loaded. The prusik knot, tied with a thin cord around a thicker rope, grips when weighted and slides when unweighted, serving as an ascending device and rappel backup. These supporting knots round out a complete climbing repertoire.",
                imageName: "Photos/rope-prusik-knot",
                imageCaption: "Prusik knot gripping a climbing rope for ascending",
                diagram: nil,
                keyFacts: [
                    "Bowline: easy to untie after loading but must be backed up with a stopper knot",
                    "Double fisherman's: the standard knot for joining two ropes for rappel",
                    "Prusik: friction hitch for ascending rope and backing up rappels",
                    "These five knots plus the figure-eight and clove hitch cover 90% of climbing situations",
                    "Every knot must be practiced until it can be tied correctly under stress",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "rope-anchor-building",
            "rope-rappelling-techniques",
            "rope-improvised-systems",
        ],
        relatedModules: [
            "knots",
            "anchors",
            "rappelling",
        ]
    )

    // MARK: - 2. Anchor Building

    static let anchorBuilding = ExploreArticle(
        id: "rope-anchor-building",
        domain: .ropeSystems,
        title: "Anchor Building",
        summary: "An anchor is the foundation of every rope system. Whether built from natural features, bolts, or removable protection, every anchor must meet the SERENE criteria: Solid, Equalized, Redundant, Efficient, No Extension. Failure to meet any one criterion can be fatal.",
        icon: "shield.fill",
        heroImageName: "Photos/Heroes/hero-rope-anchors",
        sections: [
            ExploreSection(
                id: "anchor-building-1",
                heading: "The SERENE Principle",
                body: "SERENE is the mnemonic that governs all anchor construction: Solid means each individual component can hold the expected load. Equalized means the load is distributed across all components so no single piece bears a disproportionate share. Redundant means that if any single component fails, the remaining pieces hold the load. Efficient means the anchor can be built quickly without wasting time or gear. No Extension means that if a component fails, the remaining system does not shock-load the other pieces by suddenly extending. These five criteria are not aspirational guidelines; they are binary requirements. An anchor that fails any one of them is not an anchor — it is a hope.",
                diagram: nil,
                keyFacts: [
                    "Solid: each component must independently hold the anticipated load",
                    "Equalized: load distributed so no single piece is overloaded",
                    "Redundant: system holds even if one component fails",
                    "No Extension: failure of one piece must not shock-load remaining pieces",
                    "All five criteria must be met simultaneously — failing one fails the anchor",
                ],
                warningNote: "The most common anchor failure is not mechanical — it is the climber who builds a two-piece anchor with no redundancy because the third piece would take another minute to place."
            ),
            ExploreSection(
                id: "anchor-building-2",
                heading: "Natural Anchors and Fixed Protection",
                body: "Natural anchors include trees, rock horns, boulders, and rock tunnels. A living tree of at least 30 centimeters diameter with a healthy root system in solid ground is one of the strongest anchors available. Rock horns must be inspected for fractures and tested by hitting them with the palm — a solid thud indicates integrity while a hollow ring suggests internal cracks. Fixed bolts in good condition are generally the strongest man-made anchors, rated to 25kN or more per bolt. However, bolt condition varies enormously: stainless steel bolts in granite may last decades, while carbon steel bolts in coastal limestone can corrode to failure in just a few years. Never trust a bolt without inspecting it.",
                imageName: "Photos/rope-anchor-system",
                imageCaption: "Multi-point anchor system on rock",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "A multi-point anchor at a cliff edge showing two bolts connected by a cordelette with a master point, plus a slung rock horn as a third anchor point, all equalized to a central master point carabiner.",
                        hotspots: [
                            RevealItem(id: "bolt-1", label: "Bolt Hanger", detail: "Inspect for rust, spinning hangers, and cracks in the surrounding rock. A good bolt holds 25kN+.", x: 0.25, y: 0.3),
                            RevealItem(id: "bolt-2", label: "Second Bolt", detail: "Redundancy requires at least two independent anchor points. Both must be solid.", x: 0.45, y: 0.25),
                            RevealItem(id: "rock-horn", label: "Rock Horn", detail: "Natural feature slung with a nylon runner. Tap-test for integrity. Adds a third independent point.", x: 0.7, y: 0.35),
                            RevealItem(id: "master-point", label: "Master Point", detail: "Where all anchor strands converge. Use a locking carabiner here — this is the single point the rope attaches to.", x: 0.5, y: 0.65),
                            RevealItem(id: "equalization", label: "Equalization Knot", detail: "The cordelette is tied so load distributes to all three points. Adjust strand lengths so all are equally weighted.", x: 0.4, y: 0.5)
                        ],
                        animationStyle: "fade"
                    )
                ),
                keyFacts: [
                    "A healthy tree with 30cm+ diameter in solid ground is an excellent anchor",
                    "Tap-test rock horns: solid thud means integrity, hollow ring means fractures",
                    "Bolts are rated to 25kN+ but condition varies — always inspect",
                    "Carbon steel bolts in marine environments can fail in as little as 3-5 years",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "anchor-building-3",
                heading: "Removable Protection: Cams and Nuts",
                body: "Removable protection allows anchor building on clean rock without fixed hardware. Nuts (chocks) are passive wedges that slot into constrictions in cracks. They are lightweight, simple, and reliable when properly placed. Spring-loaded camming devices (SLCDs or cams) use mechanical expansion to grip parallel-sided cracks where passive gear cannot hold. A well-placed cam with all four lobes in contact with rock and the stem pointing in the anticipated loading direction is rated to 10-14kN. Poor placements — over-cammed, under-cammed, or with the stem levered over an edge — can fail at a fraction of the rated strength. Learning to evaluate placement quality is one of the most important and difficult skills in traditional climbing.",
                diagram: ExploreDiagram(
                    type: .comparisonSplit,
                    config: DiagramConfig(
                        leftTitle: "Passive Gear (Nuts)",
                        rightTitle: "Active Gear (Cams)",
                        leftColor: "3B82F6",
                        rightColor: "F97316",
                        leftItems: [
                            "Wedge into crack constrictions",
                            "No moving parts — simple and reliable",
                            "Lightweight: carry many sizes easily",
                            "Require a constriction — won't work in parallel cracks",
                        ],
                        rightItems: [
                            "Spring-loaded expansion grips parallel cracks",
                            "Mechanical — can malfunction if dirty or worn",
                            "Heavier and more expensive per piece",
                            "Versatile — works in many crack sizes and shapes",
                        ]
                    )
                ),
                keyFacts: [
                    "A well-placed cam holds 10-14kN — sufficient for most climbing falls",
                    "All four cam lobes must contact rock for full rated strength",
                    "Nuts are strongest when the narrowest part of the crack is below the nut",
                    "Over-cammed devices are extremely difficult to remove and may need to be abandoned",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "anchor-building-4",
                heading: "Equalization Methods",
                body: "The three primary equalization methods are the cordelette, the quad, and the sliding-X. A cordelette is a 6-7 meter loop of 7mm nylon cord tied with a double fisherman's knot. Clipped to each anchor component and pulled into a master point tied with an overhand or figure-eight knot, it provides equalization for a specific loading direction. The quad uses a double-length sling clipped to two anchor points with limiting knots to prevent extension, offering self-equalization across a small range of angles. The sliding-X provides full self-equalization but has no redundancy at the crossing point unless a twist is added to limit extension. Each method has trade-offs between equalization, redundancy, extension potential, and simplicity.",
                imageName: "Photos/rope-cordelette",
                imageCaption: "Cordelette equalized to a master point on a three-piece anchor",
                animationName: "anim-anchor-equalization",
                diagram: nil,
                keyFacts: [
                    "Cordelette: equalizes for one direction, no extension risk, requires re-tying for direction changes",
                    "Quad: self-equalizing over a small range with limiting knots to prevent extension",
                    "Sliding-X: full self-equalization but requires a twist for redundancy at the cross point",
                    "The cordelette is the most commonly taught method for multi-point anchors",
                    "Master point should always use a locking carabiner",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "rope-essential-knots",
            "rope-top-rope-systems",
            "rope-multi-pitch-climbing",
        ],
        relatedModules: [
            "anchors",
            "knots",
            "top-rope",
        ]
    )

    // MARK: - 3. Belaying Fundamentals

    static let belayingFundamentals = ExploreArticle(
        id: "rope-belaying-fundamentals",
        domain: .ropeSystems,
        title: "Belaying Fundamentals",
        summary: "Belaying is the act of managing the rope to catch a falling climber. The brake hand never leaves the rope — this is the single most critical rule in climbing. Everything else in belay technique exists to support this absolute.",
        icon: "hand.raised.fill",
        heroImageName: "Photos/Heroes/hero-rope-belaying",
        sections: [
            ExploreSection(
                id: "belaying-1",
                heading: "The Brake Hand Rule",
                body: "The brake hand never leaves the rope. This is not a guideline, a best practice, or a suggestion. It is the fundamental rule of belaying from which all technique follows. A belayer with an assisted-braking device who removes their brake hand has defeated the very purpose of the device. The brake position — hand below the device with the rope running over the palm — generates friction that stops a falling climber. The PBUS method (Pull, Brake, Under, Slide) provides a systematic sequence for taking in rope while maintaining brake hand contact at all times. Every belay accident investigation starts with the same question: where was the brake hand?",
                imageName: "Photos/rope-belay-device-setup",
                imageCaption: "Belay device loaded with rope in the brake position",
                diagram: ExploreDiagram(
                    type: .forceArrows,
                    config: DiagramConfig(
                        arrows: [
                            DiagramArrow(fromX: 0.5, fromY: 0.1, toX: 0.5, toY: 0.35, label: "Climber Weight", color: "EF4444"),
                            DiagramArrow(fromX: 0.5, fromY: 0.45, toX: 0.5, toY: 0.65, label: "Through Device", color: "F59E0B"),
                            DiagramArrow(fromX: 0.5, fromY: 0.65, toX: 0.5, toY: 0.9, label: "Brake Hand Friction", color: "22C55E"),
                        ],
                        centerLabel: "Belay Device",
                        labels: ["Load Side", "Brake Side"],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "The brake hand NEVER leaves the rope — this is the cardinal rule of belaying",
                    "PBUS sequence: Pull, Brake, Under, Slide — maintains brake contact throughout",
                    "The brake position generates friction by bending the rope over the device",
                    "An assisted-braking device is a backup, not a replacement for brake hand technique",
                ],
                warningNote: "Every belay failure in recorded climbing history traces back to one cause: the brake hand was not on the rope. No device, no technology, no experience compensates for this error."
            ),
            ExploreSection(
                id: "belaying-2",
                heading: "Belay Stance and Positioning",
                body: "A good belay stance anticipates the direction and magnitude of force in a fall. When belaying a leader from below, position yourself close to the base of the climb, directly beneath the first piece of protection. This minimizes the lateral pull if the climber falls and prevents you from being dragged into the wall. Brace yourself with feet shoulder-width apart, one foot slightly ahead. When belaying from above at a multi-pitch anchor, sit in your harness with the anchor behind you so that a fall pulls you into the anchor rather than away from it. On alpine terrain, consider the belay stance as seriously as the anchor: an anchor is useless if the belayer is pulled off their stance before the system loads.",
                diagram: nil,
                keyFacts: [
                    "Position directly below the first protection piece when belaying from the ground",
                    "Stay close to the wall to minimize lateral pull in a fall",
                    "When belaying from above, sit so the fall loads you into the anchor",
                    "A belayer pulled off stance can release the brake hand reflexively",
                    "On ledges, brace feet against rock to resist the pull of a fall",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "belaying-3",
                heading: "Device Types and Selection",
                body: "Belay devices fall into three categories: tubular devices, assisted-braking devices, and the munter hitch. Tubular devices like the ATC are simple, lightweight, and versatile — they work for belaying and rappelling with single or double ropes. Assisted-braking devices like the GriGri use a camming mechanism that pinches the rope when loaded suddenly, providing a mechanical backup to the brake hand. Guide-mode devices allow direct belaying of a second from above. No device eliminates the need for proper brake hand technique, but assisted-braking devices provide a meaningful additional safety margin, particularly against the most common failure mode: momentary brake hand distraction.",
                diagram: ExploreDiagram(
                    type: .comparisonSplit,
                    config: DiagramConfig(
                        leftTitle: "Tubular (ATC-style)",
                        rightTitle: "Assisted-Braking (GriGri-style)",
                        leftColor: "3B82F6",
                        rightColor: "22C55E",
                        leftItems: [
                            "Simple, lightweight, no moving parts",
                            "Works with single or double ropes",
                            "Doubles as a rappel device",
                            "No mechanical backup — relies entirely on technique",
                        ],
                        rightItems: [
                            "Cam mechanism provides assisted braking",
                            "Meaningful backup against brake hand errors",
                            "Heavier and more complex",
                            "Single rope only (most models)",
                        ]
                    )
                ),
                keyFacts: [
                    "Tubular devices: simple, versatile, lightweight, rely entirely on technique",
                    "Assisted-braking devices: mechanical backup reduces risk of brake hand errors",
                    "Guide-mode plates allow direct belay of a second from above",
                    "No device replaces proper brake hand technique",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "belaying-4",
                heading: "Communication and Signals",
                body: "Clear communication between climber and belayer prevents accidents. The standard commands are: \"On belay?\" (climber asking if belayer is ready), \"Belay on\" (belayer confirming the system is active), \"Climbing\" (climber informing the belayer), \"Climb on\" (belayer confirming readiness to catch), \"Slack\" (climber needs more rope), \"Up rope\" or \"Take\" (climber needs rope taken in), and \"Off belay\" (climber is secure and the belay can be broken). In windy or noisy conditions, pre-arrange signals such as rope tugs: one tug for off belay, two tugs for belay on, three tugs for climbing. Miscommunication at transitions — particularly a premature \"off belay\" — accounts for a significant number of multi-pitch accidents.",
                diagram: nil,
                keyFacts: [
                    "Standard commands: On belay, Belay on, Climbing, Climb on, Slack, Take, Off belay",
                    "Pre-arrange rope tug signals for windy or noisy conditions",
                    "Premature 'off belay' at transitions is a leading cause of multi-pitch accidents",
                    "Both climber and belayer must confirm each command before acting",
                    "When in doubt, do not take the climber off belay",
                ],
                warningNote: "If you cannot hear your partner's commands, do NOT assume what they said. Maintain the belay until you have clear, confirmed communication."
            ),
        ],
        relatedArticles: [
            "rope-essential-knots",
            "rope-anchor-building",
            "rope-rope-mechanics",
        ],
        relatedModules: [
            "belaying",
            "anchors",
            "rope-mechanics",
        ]
    )

    // MARK: - 4. Rappelling Techniques

    static let rappellingTechniques = ExploreArticle(
        id: "rope-rappelling-techniques",
        domain: .ropeSystems,
        title: "Rappelling Techniques",
        summary: "More climbers are killed rappelling than climbing. The combination of fatigue, complex systems, and irreversible commitment makes rappelling the most dangerous routine activity in climbing. Every step demands deliberate verification.",
        icon: "arrow.down.to.line",
        heroImageName: "Photos/Heroes/hero-rope-rappelling",
        sections: [
            ExploreSection(
                id: "rappelling-1",
                heading: "Rappel Setup and Verification",
                body: "Before every rappel, verify five things in sequence. First, inspect the anchor: is it solid, and has the rope been threaded correctly through the rings or chains? Second, verify the rope reaches the next station or the ground: pull both strands and visually confirm, or tie knots in the ends. Third, check that your device is correctly loaded on both strands of the rope with the locking carabiner locked. Fourth, confirm your backup is in place — an autoblock or prusik below the device on the brake strand. Fifth, do a weighted test by sitting back on the rope while still connected to the anchor, confirming everything holds before unclipping your tether. Only after all five checks pass do you unclip and commit to the rappel.",
                imageName: "Photos/rope-rappel-anchor",
                imageCaption: "Rappel setup at a fixed anchor with rope threaded through chains",
                diagram: nil,
                keyFacts: [
                    "Five-point check: anchor, rope reaches, device loaded, backup in place, weighted test",
                    "Tie knots in rope ends to prevent rappelling off the end",
                    "Always use an autoblock or prusik backup below the device",
                    "Test the system with your weight before committing",
                    "More climbers die rappelling than on any other phase of climbing",
                ],
                warningNote: "Never commit to a rappel without a weighted test while still clipped to the anchor. The moment you unclip your tether, you are committed to a system you can no longer verify from a safe position."
            ),
            ExploreSection(
                id: "rappelling-2",
                heading: "The Extended Rappel",
                body: "An extended rappel moves the belay device away from the harness belay loop using a sling or personal anchor system, typically 20-30 centimeters. This creates space below the device for an autoblock backup to grip the brake strands without being pushed against the device by the climber's body. Without extension, the autoblock tends to get jammed against the device where it cannot function. The extension also keeps the device at chest or face level where it is easier to manage, particularly when threading the rope or clearing snags. The AMGA teaches the extended rappel as standard practice because it transforms the backup from theoretical to functional.",
                diagram: ExploreDiagram(
                    type: .forceArrows,
                    config: DiagramConfig(
                        arrows: [
                            DiagramArrow(fromX: 0.5, fromY: 0.1, toX: 0.5, toY: 0.3, label: "Anchor", color: "3B82F6"),
                            DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.5, toY: 0.5, label: "Extension Sling", color: "8B5CF6"),
                            DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.65, label: "Belay Device", color: "F59E0B"),
                            DiagramArrow(fromX: 0.5, fromY: 0.65, toX: 0.5, toY: 0.8, label: "Autoblock Backup", color: "22C55E"),
                            DiagramArrow(fromX: 0.5, fromY: 0.8, toX: 0.5, toY: 0.95, label: "Brake Hand", color: "EF4444"),
                        ],
                        centerLabel: "Rappel System",
                        labels: ["Top: Anchor", "Bottom: Climber"],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "Extension of 20-30cm moves the device away from the harness",
                    "Creates space for the autoblock backup to function properly",
                    "AMGA teaches the extended rappel as the standard method",
                    "Keeps the device at chest level for easier management",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "rappelling-3",
                heading: "Fireman's Belay and Additional Safeguards",
                body: "A fireman's belay is the simplest and most effective rappel backup when a partner is available. The person on the ground holds the free ends of the rope loosely. If the rappeller loses control, the belayer simply pulls the rope ends tight, which locks the rappel device through friction. This requires zero special equipment and provides an immediate stop. For solo rappels or situations without a ground belayer, the autoblock knot tied with a thin cordelette around the brake strands below the device serves as a self-belay. The autoblock grips when weighted (if the climber lets go) and releases when the climber pushes it down with the brake hand. Additional safeguards include tying knots in the rope ends and visually confirming the rope reaches the next station before committing.",
                diagram: nil,
                keyFacts: [
                    "Fireman's belay: ground partner holds rope ends, pulls tight to lock device if needed",
                    "Autoblock: self-belay using a friction hitch below the device on the brake strands",
                    "Knots in rope ends prevent rappelling off the end of the rope",
                    "The fireman's belay is the simplest and most reliable rappel backup available",
                    "Use both the autoblock and fireman's belay when possible — redundancy saves lives",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "rope-essential-knots",
            "rope-anchor-building",
            "rope-multi-pitch-climbing",
        ],
        relatedModules: [
            "rappelling",
            "knots",
            "anchors",
        ]
    )

    // MARK: - 5. Rope Mechanics

    static let ropeMechanics = ExploreArticle(
        id: "rope-rope-mechanics",
        domain: .ropeSystems,
        title: "Rope Mechanics",
        summary: "Understanding fall factors, impact force, elongation, and the differences between dynamic and static ropes transforms rope selection and system management from guesswork into engineering. The physics of falling is the physics of survival.",
        icon: "arrow.up.and.down.circle",
        heroImageName: "Photos/Heroes/hero-rope-mechanics",
        sections: [
            ExploreSection(
                id: "rope-mechanics-1",
                heading: "Fall Factor: The Governing Ratio",
                body: "Fall factor is the ratio of fall distance to rope in the system, and it is the single most important number in climbing physics. A climber who falls 10 meters on 50 meters of rope out experiences a fall factor of 0.2 — a relatively gentle catch. A climber who falls 4 meters on 2 meters of rope out experiences a fall factor of 2.0 — the theoretical maximum in a standard climbing system — and the forces generated are enormous. The critical insight is that fall factor, not fall distance, determines the force on the climber, belayer, and gear. A short fall directly above the belay with minimal rope out can generate higher forces than a long fall high on a pitch with plenty of rope to absorb energy through stretch.",
                diagram: ExploreDiagram(
                    type: .forceArrows,
                    config: DiagramConfig(
                        arrows: [
                            DiagramArrow(fromX: 0.2, fromY: 0.2, toX: 0.2, toY: 0.8, label: "Factor 2: 4m fall / 2m rope", color: "EF4444"),
                            DiagramArrow(fromX: 0.5, fromY: 0.35, toX: 0.5, toY: 0.8, label: "Factor 1: 6m fall / 6m rope", color: "F59E0B"),
                            DiagramArrow(fromX: 0.8, fromY: 0.55, toX: 0.8, toY: 0.8, label: "Factor 0.3: 3m fall / 10m rope", color: "22C55E"),
                        ],
                        centerLabel: "Fall Factor",
                        labels: ["Severe", "Moderate", "Low"],
                        colors: ["EF4444", "F59E0B", "22C55E"],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "Fall factor = fall distance / rope out — maximum is 2.0 in standard systems",
                    "Fall factor, not absolute fall distance, determines impact force",
                    "A factor 2 fall generates maximum force regardless of total fall distance",
                    "The first piece of protection above the belay is the most critical in the system",
                    "Every meter of rope in the system absorbs energy through dynamic elongation",
                ],
                warningNote: "A factor 2 fall — falling below the belay with only the rope between you and the belayer — is survivable on a dynamic rope but can destroy gear, pull anchors, and injure both climber and belayer. Clip the first piece quickly."
            ),
            ExploreSection(
                id: "rope-mechanics-2",
                heading: "Impact Force and Dynamic Elongation",
                body: "Impact force is the peak force transmitted to the climber's body during a fall. Modern dynamic climbing ropes are engineered to keep impact force below 12kN on the first UIAA test fall (a factor 1.77 fall with an 80kg mass), and most single ropes achieve 8-9kN. They accomplish this through dynamic elongation: the rope stretches 30-40% under fall loading, converting kinetic energy into heat and absorbing the shock over a longer time period. A static rope with only 2-3% elongation would transmit catastrophic forces to the climber's body in the same fall — this is why static ropes must never be used for lead climbing. The trade-off is that high elongation means longer falls, and at the crag this can mean hitting a ledge. Dry-treated ropes retain their dynamic properties better when wet.",
                diagram: nil,
                keyFacts: [
                    "UIAA standard limits impact force to 12kN — most ropes achieve 8-9kN",
                    "Dynamic ropes stretch 30-40% under fall loading to absorb energy",
                    "Static ropes stretch only 2-3% and must never be used for lead climbing",
                    "Higher elongation means lower impact force but longer total fall distance",
                    "Rope dynamic properties degrade with use — older ropes transmit higher forces",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "rope-mechanics-3",
                heading: "Rope Types and Selection",
                body: "Single ropes (9.5-10.2mm) are the standard for sport and most trad climbing. Half ropes (8-9mm), used in pairs with each strand clipped to alternating protection, reduce rope drag on wandering routes and provide two strands for full-length rappels. Twin ropes (7-8mm), clipped together through every piece, offer the lightest weight system for alpine routes. Static ropes (10-12mm) are used exclusively for fixed lines, hauling, and top-roping where no lead falls are possible. Selecting the right rope for the objective involves balancing diameter (affects weight and handling), length (60m standard, 70m increasingly common), sheath durability, and dry treatment. A thinner rope is lighter but wears faster and is harder to grip with cold hands.",
                imageName: "Photos/rope-coil",
                imageCaption: "Mountaineering rope coiled for glacier travel",
                diagram: ExploreDiagram(
                    type: .comparisonSplit,
                    config: DiagramConfig(
                        leftTitle: "Dynamic Ropes",
                        rightTitle: "Static Ropes",
                        leftColor: "22C55E",
                        rightColor: "EF4444",
                        leftItems: [
                            "30-40% elongation absorbs fall energy",
                            "Required for any system where lead falls are possible",
                            "Single, half, and twin configurations available",
                            "Impact force kept below 12kN on test falls",
                        ],
                        rightItems: [
                            "2-3% elongation — minimal stretch",
                            "Used for fixed lines, hauling, and top-rope only",
                            "Transmits catastrophic forces in a lead fall",
                            "Higher abrasion resistance for fixed-line use",
                        ]
                    )
                ),
                keyFacts: [
                    "Single ropes: 9.5-10.2mm, standard for sport and trad climbing",
                    "Half ropes: 8-9mm in pairs, reduce drag on wandering routes",
                    "Twin ropes: 7-8mm, lightest system for alpine objectives",
                    "Static ropes: NEVER for lead climbing — only fixed lines and hauling",
                    "Rope diameter directly affects grip, weight, durability, and dynamic performance",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "rope-belaying-fundamentals",
            "rope-top-rope-systems",
            "rope-rescue-hauling-systems",
        ],
        relatedModules: [
            "rope-mechanics",
            "belaying",
            "rescue-hauls",
        ]
    )

    // MARK: - 6. Top-Rope Systems

    static let topRopeSystems = ExploreArticle(
        id: "rope-top-rope-systems",
        domain: .ropeSystems,
        title: "Top-Rope Systems",
        summary: "A top-rope system runs the climbing rope through an anchor at the top of the cliff so the climber is always protected from above. It is the safest form of roped climbing when set up correctly, but anchor failure in a top-rope system is catastrophic because both climber and belayer depend on the same anchor.",
        icon: "arrow.up.to.line",
        heroImageName: "Photos/Heroes/hero-rope-top-rope",
        sections: [
            ExploreSection(
                id: "top-rope-1",
                heading: "Anchor Setup for Top-Roping",
                body: "A top-rope anchor must meet the SERENE criteria with particular emphasis on redundancy because the entire system — climber, belayer, and rope — depends on this single anchor point. The standard setup uses at least two independent anchor points connected by a cordelette or long slings to a master point positioned at or just over the cliff edge. The rope runs through two carabiners at the master point, gates opposed and reversed, or through a single large locking carabiner. If the anchor is set back from the edge, extend it to the lip so the rope does not drag over sharp rock, which generates friction and damages the rope. Always inspect the edge for sharp features that could cut the rope under load.",
                diagram: nil,
                keyFacts: [
                    "Top-rope anchor failure is catastrophic — both climber and belayer fall",
                    "Minimum two independent anchor points, three preferred",
                    "Extend the anchor to the cliff edge to prevent rope drag over rock",
                    "Use opposed and reversed carabiners or a single large locker at the master point",
                    "Inspect the cliff edge for sharp rock that could cut the rope under load",
                ],
                warningNote: "A top-rope anchor is more consequential than a lead climbing anchor. In lead climbing, you have multiple pieces of protection. In top-rope, you have one anchor. If it fails, everyone falls."
            ),
            ExploreSection(
                id: "top-rope-2",
                heading: "Redundancy and Monitoring",
                body: "Redundancy in a top-rope system means that no single component failure results in a total system failure. This applies to the anchor points themselves, the material connecting them, and the carabiners at the master point. Two bolts connected by a cordelette with a master point tied in a figure-eight provides redundancy at the anchor, connection, and carabiner levels. But redundancy at setup is not sufficient — the system must be monitored throughout the climbing session. Ropes can shift on carabiners, slings can be abraded by sharp edges, and carabiners can migrate to positions where gates could be opened by rock contact. Assign one person to monitor the anchor setup for the duration of the session.",
                diagram: nil,
                keyFacts: [
                    "Redundancy must exist at every level: anchor points, connections, and carabiners",
                    "A figure-eight master point provides redundancy at the connection level",
                    "Opposed and reversed carabiners provide redundancy at the carabiner level",
                    "Monitor the anchor throughout the session — components can shift and degrade",
                    "Assign one person to periodically inspect the anchor during use",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "top-rope-3",
                heading: "Lowering vs. Rappelling",
                body: "In a top-rope system, the climber can descend by being lowered by the belayer or by rappelling independently. Lowering is simpler for the climber — they just lean back and the belayer controls the descent — but it runs the rope through the anchor carabiners under friction, wearing both rope and carabiners. On fixed anchors at popular crags, excessive lowering wears through bolt hangers and chains, requiring costly replacement. Rappelling avoids this wear because the climber descends on their own device with the rope stationary through the anchor. However, rappelling requires more skill and introduces its own risks, particularly if the climber is fatigued. At personal anchors on natural gear, lowering is standard. At fixed anchors on popular routes, climbers are increasingly expected to clean the anchor and rappel to reduce wear on shared infrastructure.",
                diagram: nil,
                keyFacts: [
                    "Lowering is simpler but creates friction wear on the rope and anchor hardware",
                    "Rappelling avoids anchor wear but requires more skill from the climber",
                    "At popular crags, excessive lowering destroys shared anchor hardware",
                    "Cleaning and rappelling is increasingly expected etiquette at fixed anchors",
                    "Communication between climber and belayer is critical during the lowering transition",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "rope-anchor-building",
            "rope-belaying-fundamentals",
            "rope-rappelling-techniques",
        ],
        relatedModules: [
            "top-rope",
            "anchors",
            "belaying",
        ]
    )

    // MARK: - 7. Multi-Pitch Climbing

    static let multiPitchClimbing = ExploreArticle(
        id: "rope-multi-pitch-climbing",
        domain: .ropeSystems,
        title: "Multi-Pitch Climbing",
        summary: "Multi-pitch climbing links multiple rope lengths to ascend cliffs and alpine walls that exceed a single pitch. Every transition between pitches is a potential failure point where efficiency, communication, and systematic procedures determine whether the team moves safely or creates dangerous confusion.",
        icon: "arrow.up.forward",
        heroImageName: "Photos/Heroes/hero-rope-multi-pitch",
        sections: [
            ExploreSection(
                id: "multi-pitch-1",
                heading: "Belay Station Management",
                body: "A multi-pitch belay station is where the leader arrives at the end of a pitch, builds an anchor, and transitions to belaying the second climber. Efficiency here determines the overall speed of the climb. The sequence is: arrive at the station, clip into the anchor with a clove hitch (adjustable), call \"Off belay\" only after you are securely attached to the anchor, pull up rope until it is taut to the second, build the belay using your device in guide mode or a redirected belay, and call \"Belay on.\" A well-practiced team completes this transition in under three minutes. A team fumbling with tangled ropes and unclear communication can take fifteen minutes or more, multiplied across every pitch on a long route.",
                diagram: nil,
                keyFacts: [
                    "Clove hitch to the anchor allows quick length adjustment at the station",
                    "Call 'Off belay' only after you are securely attached to the anchor",
                    "Guide-mode belay allows hands-free holding of the second's weight",
                    "A practiced team completes transitions in under three minutes",
                    "Slow transitions compound across many pitches — a 10-pitch route can gain hours",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "multi-pitch-2",
                heading: "Leading in Blocks vs. Swinging Leads",
                body: "Two strategies govern who leads which pitch. Block leading assigns one climber to lead multiple pitches in a row while the other seconds. This is simpler to manage and appropriate when one climber is significantly stronger, but it requires rope management at the belay — the leader must flip the rope stack so the end that was on the bottom is now on top. Swinging leads alternate the leader each pitch, which distributes effort and avoids rope flipping because the second arrives at the belay with the rope already stacked for leading. Swinging leads require both climbers to be competent leaders and demand clear communication about who is leading next. On moderate terrain with a well-matched team, swinging leads are faster. On difficult terrain or with an uneven partnership, block leading is more appropriate.",
                diagram: ExploreDiagram(
                    type: .comparisonSplit,
                    config: DiagramConfig(
                        leftTitle: "Block Leading",
                        rightTitle: "Swinging Leads",
                        leftColor: "F97316",
                        rightColor: "3B82F6",
                        leftItems: [
                            "Same climber leads consecutive pitches",
                            "Simpler communication and transitions",
                            "Good when one climber is stronger",
                            "Requires rope flipping at each belay",
                        ],
                        rightItems: [
                            "Leader alternates each pitch",
                            "No rope flipping needed — faster transitions",
                            "Both climbers must be competent leaders",
                            "Distributes effort evenly across the team",
                        ]
                    )
                ),
                keyFacts: [
                    "Block leading: one leader, simpler management, requires rope flipping",
                    "Swinging leads: alternate leaders, faster transitions, requires equal competence",
                    "On a 10-pitch route, saving 3 minutes per transition equals 30 minutes total",
                    "Rope management is the single biggest time sink at multi-pitch belays",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "multi-pitch-3",
                heading: "Route Management and Time Planning",
                body: "Multi-pitch climbing demands route management skills that go beyond technical climbing ability. Before starting, research the route thoroughly: know the descent, identify bail points where you can retreat if things go wrong, and calculate a time budget based on the number of pitches and your team's expected pace. A conservative estimate for a moderate team is 30-45 minutes per pitch including transitions. A 10-pitch route at 40 minutes per pitch takes nearly seven hours of climbing time alone, before approach and descent. Being benighted (caught by darkness) on a multi-pitch route is a common and preventable emergency that results from optimistic time estimates and slow transitions. Set a turnaround time before you start and honor it.",
                diagram: nil,
                keyFacts: [
                    "Research descent and bail points before starting the route",
                    "Budget 30-45 minutes per pitch for a moderate team including transitions",
                    "Being benighted is the most common multi-pitch emergency — caused by poor time management",
                    "Set a turnaround time before starting and commit to it regardless of progress",
                    "The descent is part of the route — plan energy and daylight accordingly",
                ],
                warningNote: "The summit is only halfway. You must have enough daylight, energy, and water to descend. More multi-pitch accidents happen on the descent than on the ascent."
            ),
        ],
        relatedArticles: [
            "rope-anchor-building",
            "rope-belaying-fundamentals",
            "rope-rappelling-techniques",
        ],
        relatedModules: [
            "multi-pitch",
            "anchors",
            "belaying",
        ]
    )

    // MARK: - 8. Rescue Hauling Systems

    static let rescueHaulingSystems = ExploreArticle(
        id: "rope-rescue-hauling-systems",
        domain: .ropeSystems,
        title: "Rescue Hauling Systems",
        summary: "When a climber is injured or incapacitated and cannot ascend under their own power, hauling systems provide the mechanical advantage needed to raise them. The Z-pulley system is the foundation of all field rescue hauling, and every mountaineer must know how to build one from the gear on their harness.",
        icon: "arrow.up.circle.fill",
        heroImageName: "Photos/Heroes/hero-rope-rescue",
        sections: [
            ExploreSection(
                id: "rescue-haul-1",
                heading: "The 3:1 Z-Pulley System",
                body: "The Z-pulley is a 3:1 mechanical advantage system that allows a single rescuer to haul a load three times their pulling force. The setup requires a load-bearing anchor, a prusik or mechanical ascender on the load strand below the anchor, a carabiner acting as a redirect pulley at the anchor, and a second prusik or ascender on the load strand further down to serve as a ratchet. The rope runs from the load, up through the anchor redirect, back down to the travelling prusik on the load strand, and then up to the hauler. Each pull raises the load one-third the length of rope pulled through the system. A ratchet prusik at the anchor holds progress so the hauler can reset without losing ground.",
                imageName: "Photos/rope-hauling-system",
                imageCaption: "Z-pulley hauling system built from climbing gear on snow",
                diagram: ExploreDiagram(
                    type: .forceArrows,
                    config: DiagramConfig(
                        arrows: [
                            DiagramArrow(fromX: 0.5, fromY: 0.9, toX: 0.5, toY: 0.65, label: "Load (1x)", color: "EF4444"),
                            DiagramArrow(fromX: 0.5, fromY: 0.65, toX: 0.3, toY: 0.2, label: "To Anchor Redirect", color: "F59E0B"),
                            DiagramArrow(fromX: 0.3, fromY: 0.2, toX: 0.5, toY: 0.5, label: "To Travelling Prusik", color: "3B82F6"),
                            DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.8, toY: 0.2, label: "Hauler Pulls (3x advantage)", color: "22C55E"),
                        ],
                        centerLabel: "3:1 Z-Pulley",
                        labels: ["Load", "Anchor", "Hauler"],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "3:1 mechanical advantage: hauler exerts one-third the force needed to lift the load",
                    "Requires two prusiks (or ascenders), a redirect carabiner, and the climbing rope",
                    "A ratchet prusik at the anchor holds progress between pulls",
                    "Each pull cycle moves the load one-third the length of rope pulled through",
                    "Can be built from standard climbing rack — no special rescue gear needed",
                ],
                warningNote: "Practice building a Z-pulley in controlled conditions until you can do it under stress. In a real rescue, you will be frightened, exhausted, and working with numb hands. Fumbling with an unfamiliar system while your partner hangs in space costs critical time."
            ),
            ExploreSection(
                id: "rescue-haul-2",
                heading: "The Drop-Loop and Higher-Ratio Systems",
                body: "When 3:1 advantage is insufficient — for example, when hauling a heavy climber over a high-friction lip — the system can be compounded. Adding a second pulley to convert a 3:1 into a 6:1 (called a drop-loop or piggyback) doubles the mechanical advantage at the cost of doubling the rope travel required per unit of lift. A 5:1 system can be built by adding a change of direction to a 3:1. In practice, systems beyond 6:1 create so much rope drag through the pulleys and prusiks that the theoretical advantage is consumed by friction. Real carabiners are not frictionless pulleys; each bend in the system loses approximately 10-15% efficiency. A 3:1 system using carabiners delivers closer to 2:1 actual advantage. Carrying a lightweight rescue pulley on alpine routes is one of the highest-value weight investments in the pack.",
                diagram: nil,
                keyFacts: [
                    "6:1 system: add a second pulley to a 3:1 — doubles advantage, doubles rope travel",
                    "Each carabiner bend loses 10-15% efficiency compared to a true pulley",
                    "A 3:1 with carabiners delivers approximately 2:1 actual mechanical advantage",
                    "Systems beyond 6:1 are usually impractical due to accumulated friction",
                    "A lightweight rescue pulley dramatically improves hauling system efficiency",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "rescue-haul-3",
                heading: "Anchor Considerations for Hauling",
                body: "Hauling systems generate sustained loads on the anchor that can exceed the peak forces of a climbing fall, particularly when the load is being pulled over a friction edge. Unlike a fall, which generates a brief spike of force, hauling applies continuous load for extended periods while the rescuer resets and pulls again. The anchor must be bomber — absolutely solid with full redundancy — because failure during a haul drops the victim and potentially injures the rescuer. Position the anchor directly above or slightly behind the lip to minimize edge friction. Pad the lip with a pack, rope bag, or clothing to reduce friction that both steals mechanical advantage and abrades the rope. If the terrain allows, build a separate anchor for the hauling system rather than using the belay anchor, which may not be optimally positioned.",
                diagram: nil,
                keyFacts: [
                    "Hauling generates sustained loads that can exceed climbing fall forces",
                    "Anchor must be bomber with full redundancy — failure drops the victim",
                    "Pad the lip to reduce friction that steals mechanical advantage and damages rope",
                    "Position the anchor directly above the lip for optimal rope line",
                    "Consider building a dedicated haul anchor separate from the belay anchor",
                ],
                warningNote: "Hauling over an unpadded rock edge can cut a rope in minutes under sustained load. Always pad the lip — use a backpack, jacket, rope bag, or anything that protects the rope from abrasion."
            ),
        ],
        relatedArticles: [
            "rope-rope-mechanics",
            "rope-crevasse-rescue-rope-work",
            "rope-anchor-building",
        ],
        relatedModules: [
            "rescue-hauls",
            "rope-mechanics",
            "crevasse-rescue-rope",
        ]
    )

    // MARK: - 9. Crevasse Rescue Rope Work

    static let crevasseRescueRopeWork = ExploreArticle(
        id: "rope-crevasse-rescue-rope-work",
        domain: .ropeSystems,
        title: "Crevasse Rescue Rope Work",
        summary: "Crevasse rescue combines self-rescue ascending skills, team hauling systems, and the unique challenges of working on a glacier surface. The rope work must be practiced on flat ground until automatic, because the real scenario involves cold, fear, and a partner's life hanging in the balance.",
        icon: "figure.climbing",
        heroImageName: "Photos/Heroes/hero-rope-crevasse",
        sections: [
            ExploreSection(
                id: "crevasse-rescue-1",
                heading: "Self-Rescue: Prusik Ascending",
                body: "Self-rescue from a crevasse uses two prusik loops to ascend the rope independently. The foot prusik, a longer loop attached to the harness, reaches down to a foot sling. The chest prusik, shorter, attaches to the belay loop or chest harness point. The technique is systematic: weight the foot prusik and stand up in the sling, simultaneously slide the chest prusik up the rope. Then sit back on the chest prusik, slide the foot prusik up, and repeat. Each cycle gains roughly 30 centimeters. A free-hanging ascent of 30 meters requires approximately 100 cycles and is exhausting, but it is survivable. The key prerequisites are carrying pre-rigged prusik loops on every glacier crossing and practicing the ascending sequence until it requires no thought.",
                imageName: "Photos/rope-prusik-ascending",
                imageCaption: "Climber ascending rope with two prusik loops in a crevasse",
                diagram: nil,
                keyFacts: [
                    "Two prusik loops required: foot prusik (longer) and chest prusik (shorter)",
                    "Each ascending cycle gains approximately 30cm of height",
                    "A 30-meter ascent requires about 100 cycles — exhausting but survivable",
                    "Prusik loops must be pre-rigged and accessible during every glacier crossing",
                    "Practice ascending on a fixed rope before attempting on a glacier",
                ],
                warningNote: "If you have never practiced prusik ascending while hanging free in space, you have never practiced crevasse self-rescue. Ascending on a wall with your feet against rock is a completely different experience from spinning free in a crevasse."
            ),
            ExploreSection(
                id: "crevasse-rescue-2",
                heading: "Team Rescue: Arrest to Haul",
                body: "When a rope team member falls into a crevasse, the surface team must execute a precise sequence. First, arrest the fall using self-arrest technique with the ice axe. Second, while maintaining the arrest, build a solid anchor (ice screw, buried ice axe, or deadman) and transfer the load from your body to the anchor. Third, pad the crevasse lip where the rope cuts into the snow — this is critical because an unpadded lip can hold the rope with enough friction to make hauling impossible. Fourth, set up a Z-pulley hauling system using the load strand and begin raising the victim. Communication with the victim throughout is essential: they may be injured, hypothermic, or hanging in a position where they can assist by walking up the crevasse wall as you haul.",
                imageName: "Photos/rope-crevasse-lip",
                imageCaption: "Padded crevasse lip with hauling system on glacier surface",
                animationName: "anim-crevasse-rescue",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "A cross-section of a crevasse rescue showing the glacier surface with an anchor built from a buried ice axe, the rope running over a padded lip into the crevasse, and a Z-pulley hauling system set up on the surface.",
                        hotspots: [
                            RevealItem(id: "anchor", label: "Snow Anchor", detail: "A buried ice axe (T-slot) or ice screw provides the foundation. Must be bomber — test it before transferring the full load.", x: 0.25, y: 0.3),
                            RevealItem(id: "lip-pad", label: "Padded Lip", detail: "A pack or rope bag placed where the rope crosses the crevasse edge. Without this, friction can make hauling impossible.", x: 0.5, y: 0.45),
                            RevealItem(id: "z-pulley", label: "Z-Pulley System", detail: "3:1 mechanical advantage built on the load strand. A ratchet prusik holds progress between pulls.", x: 0.7, y: 0.3),
                            RevealItem(id: "victim", label: "Crevasse Victim", detail: "May be injured or hypothermic. Maintain voice contact. They can assist by walking up the wall as you haul.", x: 0.5, y: 0.75)
                        ],
                        animationStyle: "fade"
                    )
                ),
                keyFacts: [
                    "Sequence: arrest, anchor, transfer load, pad lip, build Z-pulley, haul",
                    "Padding the lip is critical — unpadded friction can make hauling impossible",
                    "The victim may be able to assist by walking up the crevasse wall during hauling",
                    "Communication with the victim throughout is essential for coordination",
                    "The entire sequence should take a practiced team under 15 minutes",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "crevasse-rescue-3",
                heading: "Two-Person vs. Three-Person Teams",
                body: "Crevasse rescue difficulty varies dramatically with team size. A three-person rope team has two surface members to arrest the fall, build the anchor, and operate the haul system — this is manageable with practice. A two-person team faces a far more demanding scenario: one person must simultaneously hold the arrest, build an anchor without releasing the load, transfer the load, and then single-handedly build and operate a haul system. This requires pre-rigged systems and well-rehearsed procedures. The Kiwi coil method, where each team member carries coils of rope on their harness, provides extra rope for building the haul system without needing to cut the climbing rope. Two-person glacier travel is inherently higher risk, and both members must be fully capable of solo rescue.",
                diagram: nil,
                keyFacts: [
                    "Three-person teams: two surface members share arrest, anchor, and hauling duties",
                    "Two-person teams: one person must do everything alone — much harder",
                    "Kiwi coils provide extra rope for rescue systems without cutting the climbing rope",
                    "Both members of a two-person team must be fully capable of solo rescue",
                    "Pre-rigged systems (prusiks already attached, rescue pulley accessible) save critical time",
                ],
                warningNote: "Two-person glacier travel means solo crevasse rescue. If your partner cannot rescue you alone, and you cannot rescue them alone, you should not be traveling as a pair on a crevassed glacier."
            ),
        ],
        relatedArticles: [
            "rope-rescue-hauling-systems",
            "rope-essential-knots",
            "rope-rope-mechanics",
        ],
        relatedModules: [
            "crevasse-rescue-rope",
            "rescue-hauls",
            "knots",
        ]
    )

    // MARK: - 10. Improvised Systems

    static let improvisedSystems = ExploreArticle(
        id: "rope-improvised-systems",
        domain: .ropeSystems,
        title: "Improvised Systems",
        summary: "When gear is lost, broken, or insufficient, the mountains test your creativity and fundamental knowledge. A munter hitch replaces a belay device. A prusik replaces an ascender. Webbing becomes a harness. The deepest understanding of rope systems reveals itself when you must improvise with what you have.",
        icon: "wrench.and.screwdriver",
        heroImageName: "Photos/Heroes/hero-rope-improvised",
        sections: [
            ExploreSection(
                id: "improvised-1",
                heading: "Emergency Anchors",
                body: "When conventional protection is unavailable, the environment itself becomes the anchor system. A bollard — a mushroom-shaped column carved from snow or ice — can hold substantial loads when properly constructed. In snow, a bollard should be at least 60 centimeters in diameter with a trench 15 centimeters deep cut around it. In solid ice, a smaller bollard of 30 centimeters suffices. A buried ice axe in a T-slot anchor, placed perpendicular to the load direction with a sling attached at the shaft-head junction and the whole assembly buried, provides a reliable snow anchor. Rocks can be stacked as deadmen, and even a backpack filled with snow and buried can serve as an emergency anchor. The critical factor is always testing the anchor with a progressive load before committing your life to it.",
                imageName: "Photos/rope-snow-bollard",
                imageCaption: "Snow bollard anchor carved for an emergency rappel",
                diagram: nil,
                keyFacts: [
                    "Snow bollard: 60cm diameter minimum, 15cm deep trench, for rappel or belay anchor",
                    "Ice bollard: 30cm diameter in solid ice, extremely strong when properly carved",
                    "T-slot ice axe anchor: axe perpendicular to load, sling at shaft-head junction, buried",
                    "Buried backpack (deadman): fill with snow, clip sling, bury — emergency anchor",
                    "Always test improvised anchors with progressive loading before committing",
                ],
                warningNote: "An untested improvised anchor is not an anchor. Apply body weight, then bounce-test, then commit to the full load gradually. If it shifts or creeps under testing, rebuild it."
            ),
            ExploreSection(
                id: "improvised-2",
                heading: "Improvised Harness Systems",
                body: "If a climbing harness is lost or damaged, a harness can be improvised from webbing or rope using several configurations. The Swiss seat uses a single length of webbing wrapped around the waist and legs in a specific pattern to create a sit harness. The diaper harness uses a loop of webbing passed between the legs and around the waist. Neither improvised harness is as safe or comfortable as a manufactured harness — they lack padding, have a higher tie-in point risk, and can be agonizingly painful in a sustained hang. However, for an emergency short rappel or a rescue lowering, they are far better than no harness at all. The key is practicing the wrapping pattern before you need it, because in an emergency you will not have instructions available.",
                diagram: nil,
                keyFacts: [
                    "Swiss seat: webbing wrapped around waist and legs, the standard improvised sit harness",
                    "Diaper harness: loop of webbing between legs and around waist, simpler but less secure",
                    "Both improvised harnesses are painful in sustained hanging — emergency use only",
                    "Practice the wrapping patterns beforehand — instructions won't be available in an emergency",
                    "A manufactured harness is always preferable — improvised systems are last resort",
                ],
                warningNote: "An improvised harness can roll you upside-down in a fall if the tie-in point is at the waist rather than at the center of gravity. Always tie in as close to your center of mass as possible."
            ),
            ExploreSection(
                id: "improvised-3",
                heading: "Improvised Belay and Rappel",
                body: "The munter hitch is the primary improvised belay and rappel method — it requires only a rope and a locking carabiner. For ascending, a pair of prusik loops tied from accessory cord replaces mechanical ascenders. For building hauling systems without pulleys, carabiners serve as redirects with reduced efficiency. A klemheist knot made from a nylon sling can replace a prusik when cord is unavailable. Knives can cut webbing to length. Shoes can be stuffed with webbing to create improvised foot slings. The capacity to improvise depends entirely on understanding the principles behind each system: if you know why a belay device creates friction, you can find other ways to create friction. If you know why a prusik grips, you can find other ways to create a gripping hitch.",
                diagram: nil,
                keyFacts: [
                    "Munter hitch: replaces any belay or rappel device — requires only a locking carabiner",
                    "Prusik loops from accessory cord replace mechanical ascenders",
                    "Klemheist from a nylon sling substitutes when prusik cord is unavailable",
                    "Carabiners replace pulleys at reduced (85-90%) efficiency",
                    "Improvisation depends on understanding principles, not memorizing specific setups",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "improvised-4",
                heading: "Rope Shortcuts and Field Expedients",
                body: "On alpine routes where speed is safety, certain shortcuts are accepted practice. A body belay — wrapping the rope around your hips to create friction — can be used for belaying on easy terrain where only short, low-force falls are possible. Running belays, where the leader places occasional protection while both climbers move simultaneously, trade security for speed on moderate terrain. Shortening the rope by carrying coils reduces the distance between partners on a glacier or ridge. A single strand rappel from a retrievable anchor uses half the rope length, allowing longer rappels when rope is limited. Every shortcut trades some margin of safety for efficiency, and the judgment of when that trade is acceptable is the hallmark of alpine experience. The rule is: take shortcuts only when you fully understand what you are giving up.",
                diagram: nil,
                keyFacts: [
                    "Body belay: friction from rope around hips, low-force situations only",
                    "Running belay (simul-climbing): both climbers move simultaneously with protection between them",
                    "Short-roping: reduced rope length between partners for speed on moderate terrain",
                    "Retrievable anchors: allow single-strand rappels to maximize rope length",
                    "Every shortcut trades safety margin for speed — understand the trade before taking it",
                ],
                warningNote: "Simul-climbing means that a fall by either climber pulls the other off. The leader must not fall, and the second must not fall. Use this technique only on terrain well within both climbers' ability."
            ),
        ],
        relatedArticles: [
            "rope-essential-knots",
            "rope-anchor-building",
            "rope-rescue-hauling-systems",
        ],
        relatedModules: [
            "improvised-systems",
            "knots",
            "rescue-hauls",
        ]
    )
}
