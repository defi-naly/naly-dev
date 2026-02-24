import Foundation

enum GlacierTravelExplore {

    // MARK: - All Glacier Travel Explore Articles

    static let articles: [ExploreArticle] = [
        glacierAnatomy,
        crevasseIdentification,
        ropeTeamTravel,
        probeTechniques,
        glacierRouteFinding,
        travelProtocols,
        crevasseRescue,
        glacierCamping,
        seasonalGlacierChanges,
        glacierWeather,
    ]

    // MARK: - 1. Glacier Anatomy

    static let glacierAnatomy = ExploreArticle(
        id: "glacier-glacier-anatomy",
        domain: .glacierTravel,
        title: "Glacier Anatomy",
        summary: "A glacier is a river of ice shaped by gravity, climate, and the terrain it flows through. Understanding its zones, features, and internal structure is the foundation for every decision you make on glaciated terrain.",
        icon: "mountain.2.fill",
        heroImageName: "Photos/Heroes/hero-glacier-anatomy",
        heroImageCaption: "Alpine glacier showing accumulation and ablation zones",
        sections: [
            ExploreSection(
                id: "glacier-anatomy-1",
                heading: "Accumulation and Ablation Zones",
                body: "Every glacier is divided into two fundamental regions by the equilibrium line altitude (ELA). Above the ELA lies the accumulation zone, where annual snowfall exceeds melt and the glacier gains mass. Below it lies the ablation zone, where melt and calving exceed snowfall and the glacier loses mass. The ELA shifts with climate: rising in warm years, dropping in cold ones. In the accumulation zone, fresh snow compacts into firn over successive seasons, gradually transforming into glacial ice under its own weight. In the ablation zone, bare ice is exposed, crevasses gape open, and meltwater streams carve channels across the surface. Recognizing which zone you are in fundamentally changes your hazard assessment.",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "Glacier surface with crevasse features and surface morphology",
                        hotspots: [
                            RevealItem(id: "accumulation", label: "Accumulation Zone", detail: "Snow-covered upper glacier where mass is gained annually", x: 0.3, y: 0.2),
                            RevealItem(id: "ela", label: "Equilibrium Line", detail: "Boundary where annual accumulation equals ablation", x: 0.5, y: 0.45),
                            RevealItem(id: "ablation", label: "Ablation Zone", detail: "Lower glacier where bare ice is exposed and mass is lost", x: 0.7, y: 0.7),
                            RevealItem(id: "terminus", label: "Terminus", detail: "The glacier's lowest point where ice melts or calves", x: 0.85, y: 0.85),
                        ]
                    )
                ),
                keyFacts: [
                    "The equilibrium line altitude (ELA) separates accumulation from ablation zones",
                    "Snow transforms into firn after surviving one melt season, then into glacial ice over decades",
                    "The accumulation zone hides crevasses under snow bridges; the ablation zone exposes them",
                    "A rising ELA over successive years indicates a glacier in retreat",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "glacier-anatomy-2",
                heading: "Firn, Ice, and the Transformation Process",
                body: "Fresh snow has a density of roughly 50-70 kg/m3. As it is buried by subsequent snowfall, the crystals compact and recrystallize. After surviving one summer melt season without melting away, the snow becomes firn, with a density of about 400 kg/m3. Under continued burial and pressure, firn transforms into glacial ice at roughly 830-850 kg/m3, a process that can take decades to centuries depending on accumulation rates. Glacial ice is fundamentally different from lake ice or seasonal ice: it is polycrystalline, contains trapped air bubbles, and deforms plastically under sustained stress. This plastic deformation is what allows glaciers to flow, and the transition from brittle surface behavior to plastic flow at depth is what creates crevasses.",
                diagram: nil,
                keyFacts: [
                    "Fresh snow density: ~50-70 kg/m3; firn: ~400 kg/m3; glacial ice: ~830-850 kg/m3",
                    "The snow-to-ice transformation takes decades to centuries depending on burial rate",
                    "Firn is defined as snow that has survived at least one melt season",
                    "Glacial ice deforms plastically below about 30 meters depth, but fractures brittly above",
                    "Crevasses cannot extend deeper than about 30 meters because plastic flow closes them",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "glacier-anatomy-3",
                heading: "Bergschrund, Randkluft, and Terminus",
                body: "Three features mark the boundaries of a glacier. The bergschrund is a crevasse that forms where the glacier pulls away from the headwall at the top of its cirque. It can be meters wide and tens of meters deep, and it often presents a serious route-finding obstacle on summit approaches. The randkluft is a gap between the glacier and the rock on its sides, formed by differential heating of the rock. Both features tend to open wider as the season progresses and the glacier thins. At the lower end, the terminus is where the glacier ends, often marked by a snout of dirty, debris-laden ice and a pile of terminal moraine. The terminus zone is unstable: ice collapses, rockfall is common, and meltwater streams can undercut the ice, creating hidden cavities.",
                imageName: "Photos/glacier-bergschrund",
                imageCaption: "Bergschrund crevasse separating glacier from headwall",
                diagram: nil,
                keyFacts: [
                    "The bergschrund separates moving glacier ice from the static snow and ice on the headwall",
                    "Bergschrunds widen through the summer and may become impassable by late season",
                    "The randkluft forms where rock warmth melts ice at the glacier's lateral margins",
                    "The terminus zone is unstable and prone to collapse, rockfall, and hidden voids",
                ],
                warningNote: "Bergschrunds and randklufts are often deeper than they appear. A fall into either feature can result in a complex rescue situation with limited anchor options. Probe and belay when approaching these features."
            ),
            ExploreSection(
                id: "glacier-anatomy-4",
                heading: "Glacial Movement and Flow",
                body: "Glaciers move through a combination of internal deformation and basal sliding. Internal deformation occurs as the weight of overlying ice causes the crystals to creep and recrystallize, with the upper layers moving faster than the lower layers. Basal sliding occurs when meltwater lubricates the interface between the glacier and its bed, allowing the entire mass to slide forward. Flow rates vary enormously: a few centimeters per day on a small alpine glacier to several meters per day on a fast-moving tidewater glacier. The center of a glacier moves faster than the edges due to friction against the valley walls. This differential flow is what opens marginal crevasses, which angle upstream at roughly 45 degrees from the glacier's edge.",
                imageName: "Photos/glacier-flow-patterns",
                imageCaption: "Glacier surface showing differential flow patterns",
                animationName: "anim-glacier-flow",
                diagram: nil,
                keyFacts: [
                    "Glacier flow combines internal deformation (crystal creep) and basal sliding",
                    "The center of a glacier flows faster than the margins due to wall friction",
                    "Differential flow between center and margins creates marginal crevasses",
                    "Basal sliding increases with meltwater, making glaciers faster in warm weather",
                    "Flow rate determines how quickly crevasse patterns change over time",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "glacier-crevasse-identification",
            "glacier-seasonal-changes",
            "glacier-glacier-route-finding",
        ],
        relatedModules: [
            "glacier-anatomy",
            "crevasse-identification",
            "seasonal-changes",
        ]
    )

    // MARK: - 2. Crevasse Identification

    static let crevasseIdentification = ExploreArticle(
        id: "glacier-crevasse-identification",
        domain: .glacierTravel,
        title: "Crevasse Identification",
        summary: "Crevasses are fractures in the glacier surface caused by tensile stress as ice flows over and around obstacles. Learning to read their types, patterns, and hidden indicators is the most critical visual skill in glacier travel.",
        icon: "line.diagonal",
        heroImageName: "Photos/Heroes/hero-glacier-crevasse-id",
        heroImageCaption: "Crevasse field with transverse fractures on a glacier surface",
        sections: [
            ExploreSection(
                id: "crevasse-id-1",
                heading: "Transverse and Longitudinal Crevasses",
                body: "Transverse crevasses run perpendicular to the direction of glacier flow. They open wherever the glacier accelerates, typically where the bed steepens or drops over a step. The ice stretches longitudinally, and because the upper 30 meters of ice is brittle, it fractures. Transverse crevasses are the most common type encountered on glacier travel and often span the entire width of the glacier. Longitudinal crevasses run parallel to the direction of flow and form where the glacier spreads laterally, such as where a valley widens or where the glacier emerges from a narrow constriction onto a broad plain. Both types can be tens of meters deep and meters wide, though the practical danger limit is the upper 30 meters where brittle fracture dominates.",
                imageName: "Photos/glacier-crevasse-field",
                imageCaption: "Crevasse field on a glacier surface",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "Glacier surface with crevasse features and surface morphology",
                        hotspots: [
                            RevealItem(id: "transverse", label: "Transverse Crevasses", detail: "Perpendicular to flow, formed by longitudinal stretching over steepening bed", x: 0.5, y: 0.35),
                            RevealItem(id: "longitudinal", label: "Longitudinal Crevasses", detail: "Parallel to flow, formed by lateral spreading where valley widens", x: 0.25, y: 0.55),
                            RevealItem(id: "convex-roll", label: "Convex Roll", detail: "Terrain feature where transverse crevasses concentrate — high danger zone", x: 0.6, y: 0.25),
                        ]
                    )
                ),
                keyFacts: [
                    "Transverse crevasses form perpendicular to flow where the glacier accelerates",
                    "Longitudinal crevasses form parallel to flow where the glacier spreads laterally",
                    "Crevasses cannot extend deeper than about 30 meters due to plastic flow below",
                    "Both types can span the full width of the glacier and may be interconnected",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "crevasse-id-2",
                heading: "Marginal Crevasses and Chevron Patterns",
                body: "Marginal crevasses form along the edges of a glacier where friction against the valley walls slows the ice relative to the faster-moving center. They angle upstream at roughly 45 degrees from the glacier margin, creating a distinctive chevron pattern that points up-valley. Marginal crevasses are typically shorter and shallower than transverse crevasses, but they are a consistent hazard when traveling near the glacier's edge or ascending lateral moraines. Where marginal crevasses intersect transverse crevasses, the ice becomes highly fractured and chaotic, forming seracs and ice towers. These intersection zones are among the most dangerous terrain on a glacier and should be avoided entirely when possible.",
                imageName: "Photos/glacier-marginal-crevasse",
                imageCaption: "Marginal crevasses angling upstream along glacier edge",
                diagram: nil,
                keyFacts: [
                    "Marginal crevasses angle upstream at ~45 degrees from the glacier edge",
                    "They form from differential flow between the fast center and slow margins",
                    "Intersection zones between marginal and transverse crevasses form seracs",
                    "Marginal crevasses are typically shorter but still hazardous near glacier edges",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "crevasse-id-3",
                heading: "Hidden Crevasses and Snow Bridges",
                body: "The most dangerous crevasses are the ones you cannot see. In the accumulation zone and after fresh snowfall, crevasses become hidden beneath snow bridges. A snow bridge forms when wind-blown or falling snow spans the gap, creating a surface that may look identical to solid glacier. Snow bridges vary enormously in strength: a thick bridge formed in mid-winter may support a truck; a thin bridge in late summer may collapse under a single footstep. Visual clues to hidden crevasses include subtle linear depressions in the snow surface, slight color changes where the snow is thinner over a void, and sagging or drooping of the snow surface. In whiteout conditions, these subtle clues become invisible, which is why glacier travel in poor visibility is extremely dangerous.",
                imageName: "Photos/glacier-snow-bridge",
                imageCaption: "Snow bridge spanning a hidden crevasse",
                diagram: nil,
                keyFacts: [
                    "Snow bridges can look identical to solid glacier surface",
                    "Bridge strength depends on thickness, temperature, snow density, and span width",
                    "Subtle linear depressions and color changes are visual clues to hidden crevasses",
                    "Whiteout eliminates visual clues, making hidden crevasses undetectable without probing",
                    "Early morning when bridges are frozen is the safest time to cross suspect terrain",
                ],
                warningNote: "Hidden crevasses kill experienced mountaineers. A surface that supported your weight in the morning may collapse in the afternoon as temperatures rise. Always rope up on glaciated terrain, no matter how solid the surface appears."
            ),
            ExploreSection(
                id: "crevasse-id-4",
                heading: "Reading Crevasse Patterns from Terrain",
                body: "Crevasse patterns are predictable because they follow the physics of ice under stress. Where the bed steepens, expect transverse crevasses. Where the valley widens, expect longitudinal crevasses. Where the glacier bends, expect en echelon crevasses that angle across the flow. Where the glacier flows over a major step, expect an icefall with chaotic, multi-directional fracturing. Convex rolls in the glacier surface are particularly dangerous because they concentrate tensile stress at the crest, opening crevasses that may be hidden just over the roll where you cannot see them from below. Study the glacier from a distance before committing to a route. Binoculars and a vantage point above the glacier reveal crevasse patterns that are invisible from the surface.",
                diagram: nil,
                keyFacts: [
                    "Steepening bed = transverse crevasses; widening valley = longitudinal crevasses",
                    "Glacier bends create en echelon crevasses angled across the flow direction",
                    "Icefalls form where the glacier drops over a major step in the bedrock",
                    "Convex rolls concentrate tensile stress and hide crevasses on the far side",
                    "Study crevasse patterns from a distance with binoculars before committing to a route",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "glacier-glacier-anatomy",
            "glacier-glacier-route-finding",
            "glacier-probe-techniques",
        ],
        relatedModules: [
            "crevasse-identification",
            "glacier-anatomy",
            "glacier-route-finding",
        ]
    )

    // MARK: - 3. Rope Team Travel

    static let ropeTeamTravel = ExploreArticle(
        id: "glacier-rope-team-travel",
        domain: .glacierTravel,
        title: "Rope Team Travel",
        summary: "The rope team is your primary safety system on a glacier. Proper spacing, coiling, communication, and coordinated movement transform a crevasse fall from a fatal event into a manageable one.",
        icon: "link",
        heroImageName: "Photos/Heroes/hero-glacier-rope-team",
        heroImageCaption: "Rope team traversing a glaciated alpine ridge",
        sections: [
            ExploreSection(
                id: "rope-team-1",
                heading: "Team Size and Rope Spacing",
                body: "A two-person rope team is the minimum for glacier travel. The partner must self-arrest and hold the fall alone, which is demanding but workable with a solid arrest position and firm snow. A three-person team is safer: two people share the arrest load, and there is redundancy if one person is injured or pulled off balance. Three is widely considered the ideal number for glacier travel by AMGA and Freedom of the Hills standards. Spacing depends on team size and terrain: 10-15 meters between members on a two-person team, 8-12 meters on a three-person team. Too little rope between climbers means insufficient friction on the crevasse lip to slow the fall. Too much rope means more slack to take up before the arrest engages.",
                imageName: "Photos/glacier-rope-team",
                imageCaption: "Rope team crossing a glacier",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "Bird's eye rope team layout on glacier surface",
                        hotspots: [
                            RevealItem(id: "leader", label: "Lead Climber", detail: "Routes the team, probes suspect areas, carries wands", x: 0.5, y: 0.2),
                            RevealItem(id: "middle", label: "Middle Person", detail: "Carries rescue gear, maintains spacing, provides arrest redundancy", x: 0.5, y: 0.5),
                            RevealItem(id: "last", label: "Last Person", detail: "Watches for hazards from behind, ready to arrest if leader or middle falls", x: 0.5, y: 0.8),
                            RevealItem(id: "spacing", label: "10-12m Spacing", detail: "Enough rope to generate friction on crevasse lip and absorb fall energy", x: 0.3, y: 0.35),
                        ]
                    )
                ),
                keyFacts: [
                    "Three-person rope teams are the standard for glacier travel safety",
                    "Two-person teams work but demand a reliable arrest from a single partner",
                    "Spacing: 10-15m for two-person teams, 8-12m for three-person teams",
                    "Too little rope reduces lip friction; too much rope allows excessive fall distance",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "rope-team-2",
                heading: "Carrying Coils and Kiwi Coils",
                body: "Each climber on a glacier rope team carries several coils of extra rope wrapped around their torso, called kiwi coils or body coils. These serve two critical functions. First, they absorb the initial shock of a crevasse fall, providing a few meters of stretch as the coils pay out before the rope comes tight between climbers. Second, they provide extra rope that the fallen climber can use for self-rescue or that the surface team can use for hauling. Typically, each climber carries 3-5 coils. The coils are tied off with a figure-eight on a bight clipped to the harness with a locking carabiner, so they can be released under load if needed. The remaining rope between climbers should be kept taut during travel to minimize fall distance.",
                imageName: "Photos/glacier-kiwi-coils",
                imageCaption: "Climber carrying kiwi coils wrapped around torso",
                diagram: nil,
                keyFacts: [
                    "Kiwi coils absorb initial fall shock and provide rescue rope",
                    "Each climber carries 3-5 coils around the torso",
                    "Coils are tied off and clipped to the harness so they can be released under load",
                    "The rope between climbers must be kept taut during travel",
                    "Slack rope allows a longer fall before arrest engages, increasing danger",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "rope-team-3",
                heading: "Communication and Signals",
                body: "Effective communication between rope team members is essential but often difficult on a glacier. Wind, distance, and the muffling effect of snow make voice communication unreliable beyond about 30 meters. Rope teams should establish a set of simple signals before starting: rope tugs for stop, go, and emergency. One tug often means stop, two tugs means ready to proceed, three rapid tugs means emergency. Voice commands should be short and standardized: 'Falling!' is the universal alert that a crevasse fall has occurred and all team members should immediately arrest. 'Rope!' signals that rope is being thrown. Clear pre-trip agreements about communication prevent confusion during the stress of an actual fall.",
                diagram: nil,
                keyFacts: [
                    "Wind and distance make voice communication unreliable beyond 30 meters",
                    "Establish rope tug signals before starting: stop, go, emergency",
                    "'Falling!' is the universal call that triggers immediate self-arrest by all team members",
                    "Pre-trip communication agreements prevent confusion during real emergencies",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "rope-team-4",
                heading: "Movement Techniques on Rope",
                body: "Rope team movement requires coordination and discipline. All members move simultaneously, maintaining a taut rope at all times. The leader sets the pace and route, probing suspect areas. When the leader stops to probe, the team stops. When changing direction, the team adjusts to keep the rope from crossing crevasses at an angle that could drag multiple members in. On steeper terrain or in heavily crevassed zones, the team may switch to running belays or even pitched travel, where one person moves while the others provide a belay from an anchor. The transition from simultaneous travel to belayed travel is a judgment call that depends on crevasse density, snow bridge condition, and consequence of a fall. Always err on the side of slowing down.",
                imageName: "Photos/glacier-simultaneous-travel",
                imageCaption: "Rope team moving simultaneously across glacier terrain",
                diagram: nil,
                keyFacts: [
                    "Simultaneous travel with a taut rope is the default movement technique",
                    "Switch to belayed or pitched travel in heavily crevassed zones",
                    "The leader probes suspect areas; the team stops when the leader stops",
                    "Avoid crossing crevasses at angles that could drag multiple members in",
                    "Err on the side of belayed travel when crevasse density is uncertain",
                ],
                warningNote: "Never travel unroped on a glaciated surface, even if the surface appears solid. Crevasses can be hidden under snow bridges that look identical to solid ground."
            ),
        ],
        relatedArticles: [
            "glacier-travel-protocols",
            "glacier-crevasse-rescue",
            "glacier-crevasse-identification",
        ],
        relatedModules: [
            "rope-teams",
            "travel-protocols",
            "crevasse-rescue",
        ]
    )

    // MARK: - 4. Probe Techniques

    static let probeTechniques = ExploreArticle(
        id: "glacier-probe-techniques",
        domain: .glacierTravel,
        title: "Probe Techniques",
        summary: "Probing is the primary method for detecting hidden crevasses and assessing snow bridge strength. Systematic probing techniques and route wanding turn invisible hazards into manageable risks.",
        icon: "arrow.down.to.line",
        heroImageName: "Photos/Heroes/hero-glacier-probe",
        heroImageCaption: "Mountaineer probing snow surface ahead of rope team",
        sections: [
            ExploreSection(
                id: "probe-techniques-1",
                heading: "Probing for Hidden Crevasses",
                body: "Probing uses a long, stiff pole or collapsible avalanche probe to test the snow surface ahead for hidden voids. The probe is driven into the snow at a 45-degree angle, roughly one to two meters ahead and to both sides of the intended path. A solid strike against glacier ice feels firm and unyielding. A strike into a snow bridge feels softer, and the probe may punch through with moderate pressure, revealing a void beneath. If the probe punches through with body weight alone, the snow bridge will not hold a person. Probing should be systematic: every step in suspect terrain, not just occasional spot checks. In heavily crevassed terrain, the leader probes continuously while the team provides a taut rope from behind.",
                imageName: "Photos/glacier-probe-technique",
                imageCaption: "Mountaineer probing at 45 degrees ahead of travel path",
                diagram: nil,
                keyFacts: [
                    "Probe at 45 degrees ahead and to both sides of the travel path",
                    "Solid ice gives a firm, unyielding strike; snow bridges feel softer and may punch through",
                    "If a probe punches through with body weight, the bridge will not support a person",
                    "Probe every step in suspect terrain, not just occasionally",
                    "The leader probes while the team maintains a taut rope from behind",
                ],
                warningNote: "A probe does not guarantee safety. A snow bridge may be strong enough to resist a probe but weak enough to collapse under the distributed weight of a person's footstep. Always combine probing with roped travel."
            ),
            ExploreSection(
                id: "probe-techniques-2",
                heading: "Wanding Routes",
                body: "Wanding is the practice of marking a safe route across a glacier with bamboo stakes or marker wands placed at regular intervals. Once the leader has probed and confirmed a safe path, wands are placed every 30-50 meters so the team can follow the same path and, critically, so the team can retrace its route in deteriorating visibility. Wands are essential for glacier camps: the route from tent to latrine, from camp to the climbing route, and from camp to any cached gear must all be wanded. In whiteout conditions, wands may be the only navigation possible. Place them close enough that each wand is visible from the previous one. Carry at least 20-30 wands per team for a day of glacier travel.",
                imageName: "Photos/glacier-wanded-route",
                imageCaption: "Wanded route marked with bamboo stakes across glacier",
                diagram: nil,
                keyFacts: [
                    "Place wands every 30-50 meters along confirmed safe routes",
                    "Wands allow route retracing in whiteout or deteriorating visibility",
                    "Wand all paths at glacier camps: tent to latrine, camp to route, camp to caches",
                    "Each wand must be visible from the previous one in the series",
                    "Carry 20-30 wands per team for a full day of glacier travel",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "probe-techniques-3",
                heading: "Systematic Search Probing",
                body: "When searching for a safe crossing of a known crevasse zone or assessing a campsite, systematic search probing replaces casual spot-checking. The leader probes in a grid pattern, driving the probe at regular intervals across the area of interest. For campsite assessment, probe the entire tent platform area and a buffer zone around it. For crevasse crossings, probe across the suspected bridge at multiple points to find the thickest, strongest section. Record the depth to solid ice at each point: a bridge that is two meters thick at one end may thin to 30 centimeters at the other. The strongest crossing point is not always the most obvious one. Systematic probing takes time but replaces guesswork with data.",
                diagram: nil,
                keyFacts: [
                    "Use a grid pattern for systematic probing of campsites and crossings",
                    "Probe the entire tent platform area plus a buffer zone for camp assessment",
                    "Snow bridge thickness can vary dramatically across a single crevasse span",
                    "Record depth to solid ice to find the strongest crossing point",
                    "Systematic probing replaces guesswork with data about subsurface conditions",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "glacier-crevasse-identification",
            "glacier-glacier-route-finding",
            "glacier-glacier-camping",
        ],
        relatedModules: [
            "probe-techniques",
            "crevasse-identification",
            "glacier-camping",
        ]
    )

    // MARK: - 5. Glacier Route Finding

    static let glacierRouteFinding = ExploreArticle(
        id: "glacier-glacier-route-finding",
        domain: .glacierTravel,
        title: "Glacier Route Finding",
        summary: "Route finding on a glacier requires reading terrain to predict crevasse locations, choosing paths that minimize exposure to hazards, and adjusting plans as conditions change. The safest route is rarely the most direct.",
        icon: "map.fill",
        heroImageName: "Photos/Heroes/hero-glacier-route",
        heroImageCaption: "Climber surveying a glacier route from a high vantage point",
        sections: [
            ExploreSection(
                id: "route-finding-1",
                heading: "Reading Terrain for Crevasse Prediction",
                body: "The fundamental principle of glacier route finding is that crevasses form where ice is under tensile stress. By reading the terrain beneath and around the glacier, you can predict where crevasses will be before you see them. Steepening slopes produce transverse crevasses. Widening valleys produce longitudinal crevasses. Bends in the glacier produce en echelon crevasses on the outside of the curve. Convex rolls are the most dangerous features because they concentrate stress at the crest, where crevasses may be hidden just over the horizon. The inside of a glacier bend tends to be under compression and is generally safer. Route finding is fundamentally about choosing the path of least tension.",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "Glacier surface with crevasse features and surface morphology",
                        hotspots: [
                            RevealItem(id: "convex", label: "Convex Roll", detail: "High tension zone — crevasses concentrate at the crest, hidden from below", x: 0.5, y: 0.3),
                            RevealItem(id: "inside-bend", label: "Inside of Bend", detail: "Compression zone — generally safer, fewer crevasses", x: 0.3, y: 0.5),
                            RevealItem(id: "outside-bend", label: "Outside of Bend", detail: "Tension zone — en echelon crevasses angle across the flow", x: 0.7, y: 0.5),
                            RevealItem(id: "concave", label: "Concave Terrain", detail: "Compression zone — ice slows and piles up, generally safer", x: 0.5, y: 0.75),
                        ]
                    )
                ),
                keyFacts: [
                    "Crevasses form where ice is under tensile stress — predict locations from terrain",
                    "Convex rolls are the most dangerous features on a glacier route",
                    "The inside of a glacier bend is under compression and generally safer",
                    "Follow the path of least tension to minimize crevasse encounters",
                    "Study the glacier from a vantage point before committing to a route",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "route-finding-2",
                heading: "Convex vs. Concave Terrain",
                body: "The distinction between convex and concave terrain is the single most important concept in glacier route finding. Convex terrain — where the glacier surface bulges upward — places the surface ice under tension. Think of bending a stick over your knee: the outside surface stretches and cracks. This is exactly what happens to glacier ice flowing over a convex roll. Concave terrain — where the glacier surface dips into a hollow — compresses the surface ice. The stick analogy: the inside surface of the bend is compressed and does not crack. In practice, this means you should route around convexities whenever possible, traversing across the glacier to find concave or flat terrain. The added distance is almost always justified by the dramatically reduced crevasse risk.",
                diagram: ExploreDiagram(
                    type: .comparisonSplit,
                    config: DiagramConfig(
                        leftTitle: "Convex (Danger)",
                        rightTitle: "Concave (Safer)",
                        leftColor: "EF4444",
                        rightColor: "22C55E",
                        leftItems: [
                            "Surface ice under tension",
                            "Crevasses open at the crest",
                            "Hidden crevasses on far side",
                            "High crevasse density",
                            "Avoid or cross with extreme caution",
                        ],
                        rightItems: [
                            "Surface ice under compression",
                            "Crevasses tend to close",
                            "Better visibility of terrain ahead",
                            "Lower crevasse density",
                            "Preferred route through glacier terrain",
                        ]
                    )
                ),
                keyFacts: [
                    "Convex terrain stretches surface ice, opening crevasses at the crest",
                    "Concave terrain compresses surface ice, closing or preventing crevasses",
                    "Routing around convexities adds distance but dramatically reduces risk",
                    "The added distance of routing through concave terrain is almost always justified",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "route-finding-3",
                heading: "Seasonal Changes and Route Adjustment",
                body: "A glacier route that is safe in June may be deadly in August. Snow bridges that solidly span crevasses in spring thin and weaken through the summer melt season. Crevasses that were hidden under winter snow become exposed as the snow line retreats upward. Seracs that were stable in cold conditions become more prone to collapse as temperatures rise. Route finding must account for the time of year and the time of day. Early morning, when overnight freezing has re-strengthened snow bridges, is the safest time to cross suspect terrain. By afternoon, solar warming and above-freezing temperatures may have weakened the same bridges to the point of failure. Successful glacier mountaineers plan their routes around both seasonal and diurnal freeze-thaw cycles.",
                diagram: nil,
                keyFacts: [
                    "Snow bridges weaken progressively through the summer melt season",
                    "Early morning is the safest time to cross suspect terrain due to overnight refreezing",
                    "Seracs become less stable as temperatures rise through the day and season",
                    "The snow line retreats upward through summer, exposing previously hidden crevasses",
                    "Plan routes around both seasonal conditions and daily freeze-thaw cycles",
                ],
                warningNote: "A route that was safe on your approach may be unsafe on your return if temperatures have risen. Always have alternate descent routes planned for afternoon conditions."
            ),
        ],
        relatedArticles: [
            "glacier-crevasse-identification",
            "glacier-seasonal-changes",
            "glacier-travel-protocols",
        ],
        relatedModules: [
            "glacier-route-finding",
            "crevasse-identification",
            "seasonal-changes",
        ]
    )

    // MARK: - 6. Travel Protocols

    static let travelProtocols = ExploreArticle(
        id: "glacier-travel-protocols",
        domain: .glacierTravel,
        title: "Travel Protocols",
        summary: "Glacier travel protocols are the systematic procedures that transform a group of climbers into a functional safety system. From roping up to rest stops to gear management, every protocol exists because someone died when it was not followed.",
        icon: "checklist.checked",
        heroImageName: "Photos/Heroes/hero-glacier-protocols",
        heroImageCaption: "Rope team preparing gear before stepping onto a glacier",
        sections: [
            ExploreSection(
                id: "travel-protocols-1",
                heading: "Roping Up Procedures",
                body: "Roping up should happen before you step onto the glacier, not after you see the first crevasse. The transition from rock or moraine to glacier ice is the moment the rope comes out. Each climber ties in with a figure-eight follow-through to their harness, then wraps kiwi coils around their torso and ties them off. Prusik loops should be pre-rigged and clipped to the harness, ready for immediate use in a crevasse fall. Each climber carries a locking carabiner, a sling, and a section of their personal rescue kit accessible without removing their pack. The entire roping-up process should take no more than 5-10 minutes with a practiced team. Rehearse it at the trailhead, not on the glacier.",
                diagram: nil,
                keyFacts: [
                    "Rope up before stepping onto the glacier, not after seeing the first crevasse",
                    "Figure-eight follow-through is the standard tie-in knot for glacier travel",
                    "Prusik loops should be pre-rigged and clipped to the harness before travel begins",
                    "Each climber should carry rescue gear accessible without removing their pack",
                    "Roping up should take no more than 5-10 minutes with a practiced team",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "travel-protocols-2",
                heading: "Rest Stops and Transitions",
                body: "Rest stops on a glacier require more planning than on rock or trail. The team must stop in a location that has been probed and confirmed free of hidden crevasses. All members remain roped in during the stop. Packs are set down on the rope side of each climber so they do not need to step off the probed path to retrieve them. When one member needs to step off the route for any reason, they are belayed by the team. Transitions from glacier travel to rock climbing, or from roped travel to camp routines, are particularly dangerous moments because they involve unroping, which temporarily removes the safety system. Establish clear protocols for when and where unroping is acceptable.",
                diagram: nil,
                keyFacts: [
                    "Rest stops must be on probed, confirmed safe ground",
                    "All members remain roped in during rest stops on glaciated terrain",
                    "Packs are placed on the rope side of each climber for easy access",
                    "Transitions from roped to unroped travel are dangerous inflection points",
                    "Belay any member who steps off the probed path for any reason",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "travel-protocols-3",
                heading: "Gear Management on Glaciers",
                body: "Gear management on a glacier has life-or-death implications. If the climber who falls into a crevasse is carrying all the rescue gear in their pack, the surface team cannot perform a rescue. Rescue gear must be distributed among all team members. Each person carries prusik loops, a locking carabiner, a sling or cordelette, and knows how to build an anchor and set up a haul system. Ice screws or pickets for anchor construction are distributed among multiple team members. The rope team leader carries wands and a probe. A critical point from AMGA curriculum: every item needed for rescue should be accessible while wearing a pack and remaining on the rope. Practice accessing your rescue kit while roped in and wearing gloves.",
                diagram: nil,
                keyFacts: [
                    "Distribute rescue gear among all team members, never concentrate it on one person",
                    "Each climber carries prusik loops, locking carabiners, slings, and anchor materials",
                    "Every rescue item must be accessible while wearing a pack and remaining on the rope",
                    "Practice accessing rescue gear while roped in and wearing gloves",
                    "The person who falls is often the one carrying critical gear if distribution is not planned",
                ],
                warningNote: "If the fallen climber is the only one carrying ice screws, the surface team cannot build an anchor. If the fallen climber has the only prusik loops, self-rescue is impossible. Redundancy in gear distribution is not optional."
            ),
            ExploreSection(
                id: "travel-protocols-4",
                heading: "Immediate Response to a Fall",
                body: "When a rope team member breaks through a snow bridge, the response sequence must be automatic. The instant you feel the rope load or hear 'Falling!' — drop into self-arrest position. Drive your ice axe into the snow, dig in your crampons (or boot toes if not wearing crampons), and hold. The first seconds are everything: the rope will come tight, the fallen climber's weight will try to drag you toward the crevasse, and the lip of the crevasse will provide critical friction that reduces the load you must hold. Once the fall is arrested, do not move. Communicate with the fallen climber. Assess whether they can self-rescue with prusiks or whether a team rescue with a hauling system is needed. The transition from arrest to anchor is the next critical step.",
                diagram: nil,
                keyFacts: [
                    "Self-arrest must be automatic — practice until the response is reflexive",
                    "Crevasse lip friction significantly reduces the load on the arresting climber",
                    "Do not move after arresting the fall — communicate first, then plan",
                    "Assess whether the fallen climber can self-rescue before committing to team rescue",
                    "The transition from self-arrest to anchor is the next critical step after arrest",
                ],
                warningNote: "The arrest must happen in seconds. If you are not in arrest position before the rope comes fully tight, you will be dragged into the crevasse. There is no second chance."
            ),
        ],
        relatedArticles: [
            "glacier-rope-team-travel",
            "glacier-crevasse-rescue",
            "glacier-glacier-route-finding",
        ],
        relatedModules: [
            "travel-protocols",
            "rope-teams",
            "crevasse-rescue",
        ]
    )

    // MARK: - 7. Crevasse Rescue

    static let crevasseRescue = ExploreArticle(
        id: "glacier-crevasse-rescue",
        domain: .glacierTravel,
        title: "Crevasse Rescue",
        summary: "Crevasse rescue is the culmination of every glacier travel skill. Self-rescue with prusiks, team rescue with hauling systems, and the Z-pulley technique are skills that must be practiced until they are automatic, because the crevasse will not wait for you to learn.",
        icon: "arrow.up.circle.fill",
        heroImageName: "Photos/Heroes/hero-glacier-rescue",
        heroImageCaption: "Crevasse rescue hauling system rigged on glacier surface",
        sections: [
            ExploreSection(
                id: "crevasse-rescue-1",
                heading: "Self-Rescue with Prusiks",
                body: "Self-rescue is the fastest way out of a crevasse if the fallen climber is uninjured and the crevasse geometry allows it. The climber uses two pre-rigged prusik loops attached to the rope above them: one connected to their harness via a sling (the waist prusik) and one for a foot loop (the foot prusik). The technique is simple but physically demanding: stand in the foot loop, slide the waist prusik up, sit back on the waist prusik, slide the foot prusik up, repeat. In practice, the hardest part is getting started. The climber is hanging in their harness, possibly spinning, cold, and frightened. They must orient themselves, locate their prusik loops, and begin the mechanical process of ascending. This is why prusiks must be pre-rigged and practiced before the trip, not learned from a book while hanging in a crevasse.",
                imageName: "Photos/glacier-prusik-ascent",
                imageCaption: "Climber ascending rope with prusik loops in crevasse",
                diagram: nil,
                keyFacts: [
                    "Self-rescue uses two prusik loops: one for the waist/harness, one for a foot loop",
                    "The technique is simple but physically demanding, especially with cold hands and a pack",
                    "Prusik loops must be pre-rigged and attached to the harness before travel begins",
                    "The crevasse lip is the main obstacle — overhanging lips may block self-rescue entirely",
                    "Practice prusik ascending on a low-angle slope before attempting it in a real crevasse",
                ],
                warningNote: "Self-rescue becomes impossible if the crevasse lip overhangs significantly, if the climber is injured, or if the rope has cut deeply into the lip. Always prepare for team rescue as a backup."
            ),
            ExploreSection(
                id: "crevasse-rescue-2",
                heading: "Team Rescue: Anchor and Load Transfer",
                body: "When self-rescue is not possible, the surface team must execute a team rescue. The first step after arresting the fall is building a bombproof anchor. On snow, this is a buried deadman anchor (an ice axe, snow fluke, or stuff sack buried horizontally and stamped down). On ice, this is an ice screw. The anchor must be placed well back from the crevasse lip to avoid loading the weakened snow near the edge. Once the anchor is built, the holding climber transfers the load from their self-arrest to the anchor using a prusik on the rope connected to the anchor with a sling. This is the most delicate moment: if the load transfer fails, the holding climber must re-arrest. Practice load transfers until they are smooth and confident.",
                diagram: nil,
                keyFacts: [
                    "Build the anchor well back from the crevasse lip on solid, probed snow or ice",
                    "A buried deadman anchor (axe, fluke, or stuff sack) works well in snow",
                    "Transfer load from self-arrest to anchor using a prusik on the rope to the anchor",
                    "The load transfer is the most delicate moment in the entire rescue sequence",
                    "Never release the self-arrest until the anchor is confirmed to be holding the load",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "crevasse-rescue-3",
                heading: "The Z-Pulley Hauling System",
                body: "The Z-pulley (or Z-rig) is a 3:1 mechanical advantage system used to haul a fallen climber out of a crevasse. After the load is transferred to the anchor, the rescuer pads the crevasse lip with a pack or foam pad to reduce friction, then sets up the Z-pulley on the loaded rope. A prusik is attached to the load rope going into the crevasse, clipped to a carabiner, and a separate rope or the tail of the climbing rope is run from the anchor, through this carabiner, back to a second prusik on the load rope near the anchor, and then out to the hauling end. Pulling on the hauling end gives a 3:1 mechanical advantage. The prusiks grip the rope when loaded and slide when unloaded, allowing ratcheting progress. In practice, friction at the lip and through the system reduces actual mechanical advantage significantly.",
                animationName: "anim-crevasse-rescue",
                diagram: ExploreDiagram(
                    type: .timeline,
                    config: DiagramConfig(
                        segments: [
                            DiagramSegment(id: "step-1", label: "1. Arrest", value: 1.0, description: "Self-arrest and hold the fall immediately", color: "EF4444"),
                            DiagramSegment(id: "step-2", label: "2. Anchor", value: 0.85, description: "Build anchor, transfer load from arrest to anchor", color: "F59E0B"),
                            DiagramSegment(id: "step-3", label: "3. Pad Lip", value: 0.7, description: "Pad crevasse lip with pack or pad to reduce friction", color: "3B82F6"),
                            DiagramSegment(id: "step-4", label: "4. Z-Pulley", value: 0.55, description: "Rig 3:1 mechanical advantage hauling system", color: "06B6D4"),
                            DiagramSegment(id: "step-5", label: "5. Haul", value: 0.4, description: "Haul victim to lip, manage transition over edge", color: "22C55E"),
                        ]
                    )
                ),
                keyFacts: [
                    "The Z-pulley provides 3:1 mechanical advantage in theory, less in practice due to friction",
                    "Padding the crevasse lip is critical — the rope cutting into the lip adds enormous friction",
                    "Prusiks on the system grip when loaded and slide when unloaded, allowing ratcheting",
                    "The victim's transition over the crevasse lip is often the hardest part of the haul",
                    "A C-pulley (adding a redirect) increases mechanical advantage to 6:1 if more force is needed",
                ],
                warningNote: "Practice the complete rescue sequence — arrest, anchor, load transfer, lip pad, Z-pulley, haul — at least twice before any glacier trip. Under stress, you will perform at roughly half your practice level."
            ),
            ExploreSection(
                id: "crevasse-rescue-4",
                heading: "Rescue Complications and Time Pressure",
                body: "Real crevasse rescues rarely go as smoothly as practice scenarios. The fallen climber may be injured, unconscious, or hanging in a harness that restricts blood flow to the legs (suspension trauma can become life-threatening within 15-20 minutes). The rope may have cut deeply into the crevasse lip, creating enormous friction that no hauling system can overcome without lip padding. The anchor snow may be poor quality, requiring multiple anchors equalized together. The surface team may be only one person on a two-person rope team, executing every step alone while maintaining the arrest. Cold, wind, altitude, and fear all degrade performance. The only way to prepare for these complications is to practice in conditions that simulate real stress: at altitude, in cold weather, with gloves on, under time pressure.",
                imageName: "Photos/glacier-rescue-complications",
                imageCaption: "Rescuer managing rope at crevasse lip during team rescue",
                diagram: nil,
                keyFacts: [
                    "Suspension trauma can become life-threatening within 15-20 minutes of hanging in a harness",
                    "Rope cutting into the lip creates friction that can defeat a hauling system without lip padding",
                    "Poor anchor conditions may require multiple equalized anchors",
                    "A solo rescuer on a two-person team must execute every step alone",
                    "Cold, altitude, and fear degrade rescue performance by roughly 50%",
                ],
                warningNote: "Time is your enemy in a crevasse rescue. Suspension trauma, hypothermia, and injury compound with every minute. A rescue that takes 45 minutes in practice may take 90 minutes under real conditions. Train harder than you think necessary."
            ),
        ],
        relatedArticles: [
            "glacier-travel-protocols",
            "glacier-rope-team-travel",
            "glacier-probe-techniques",
        ],
        relatedModules: [
            "crevasse-rescue",
            "travel-protocols",
            "rope-teams",
        ]
    )

    // MARK: - 8. Glacier Camping

    static let glacierCamping = ExploreArticle(
        id: "glacier-glacier-camping",
        domain: .glacierTravel,
        title: "Glacier Camping",
        summary: "Camping on a glacier introduces unique hazards that do not exist on rock or soil. Crevasse safety, anchor systems, waste management, and weather exposure all require glacier-specific protocols that differ from standard mountaineering camp practices.",
        icon: "tent.fill",
        heroImageName: "Photos/Heroes/hero-glacier-camping",
        heroImageCaption: "High camp pitched on a glacier with mountain backdrop",
        sections: [
            ExploreSection(
                id: "glacier-camping-1",
                heading: "Camp Site Selection",
                body: "Selecting a campsite on a glacier begins with crevasse assessment. Before anyone removes their pack, the team probes the entire intended camp area systematically, using a grid pattern to ensure no hidden crevasses lurk beneath the snow surface. Ideal campsites are on concave or flat terrain where compression reduces crevasse risk. Avoid convex rolls, areas near icefalls or seracs, and terrain that could channel avalanche debris from surrounding slopes. Consider the direction of potential katabatic winds, which drain cold air downhill off the glacier during the night, and position tents to minimize wind exposure. A campsite that feels sheltered in the evening calm may be scoured by fierce drainage winds by midnight.",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "Glacier surface showing potential campsite locations and hazards",
                        hotspots: [
                            RevealItem(id: "tent-area", label: "Probed Tent Area", detail: "Entire camp area probed in grid pattern, confirmed free of crevasses", x: 0.5, y: 0.45),
                            RevealItem(id: "latrine", label: "Latrine Zone", detail: "Downwind, wanded path, probed — away from water sources", x: 0.75, y: 0.6),
                            RevealItem(id: "danger-zone", label: "Crevasse Danger", detail: "Marked with wands, off-limits — do not approach unroped", x: 0.2, y: 0.3),
                            RevealItem(id: "wind", label: "Katabatic Wind", detail: "Cold air drains downhill off glacier at night — position tents for protection", x: 0.6, y: 0.2),
                        ]
                    )
                ),
                keyFacts: [
                    "Probe the entire camp area in a grid pattern before anyone sets down their pack",
                    "Choose concave or flat terrain — avoid convex rolls and areas below seracs or avalanche paths",
                    "Anticipate katabatic winds that drain cold air downhill during the night",
                    "The best camp location balances crevasse safety, wind protection, and morning sun exposure",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "glacier-camping-2",
                heading: "Anchoring and Camp Infrastructure",
                body: "Everything on a glacier must be anchored. Tents are staked with snow pickets, ice axes, or deadman anchors buried deeply and stamped down. In warm conditions, stakes can melt out as solar radiation heats the metal, so bury them horizontally with attached cord for retrieval. Packs, ropes, and loose gear left on the glacier surface will either blow away in katabatic winds or sink into the snow as solar heat melts them in. Wand the path from tent to latrine, from tent to kitchen area, and from camp to the start of the climbing route. These wanded paths must follow probed, safe ground. At night or in whiteout conditions, the wanded path is the only safe way to move around camp.",
                imageName: "Photos/glacier-camp-anchors",
                imageCaption: "Snow pickets and deadman anchors securing tent on glacier",
                diagram: nil,
                keyFacts: [
                    "Anchor tents with deep-buried snow pickets, axes, or deadman anchors",
                    "Metal stakes can melt out in sun — bury horizontally with retrieval cords",
                    "Wand all paths between tent, latrine, kitchen, and climbing route",
                    "Loose gear on the glacier surface will blow away or melt into the snow",
                    "At night, wanded paths are the only safe way to navigate camp",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "glacier-camping-3",
                heading: "Latrine and Waste Management",
                body: "Glacier camping requires strict waste management because glaciers are the water source for downstream communities. The latrine should be located downwind from camp, with a wanded and probed path for safe access. On many glaciers, particularly in heavily traveled areas like Denali or the Cascades volcanoes, human waste must be collected in clean mountain cans (CMCs) or wag bags and packed out. Where burial is acceptable, dig a latrine hole at least 60 centimeters deep and well away from meltwater channels. All gray water from cooking should be strained and the solids packed out. Fuel canisters and all trash are packed out without exception. The principle is simple: the glacier should look the same after you leave as it did before you arrived.",
                diagram: nil,
                keyFacts: [
                    "Many glaciers require pack-out of all human waste in clean mountain cans",
                    "Locate the latrine downwind with a wanded, probed access path",
                    "Where burial is acceptable, dig at least 60 cm deep, away from meltwater channels",
                    "Strain gray water and pack out solids; pack out all fuel canisters and trash",
                    "Leave no trace — the glacier should look unchanged after your departure",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "glacier-camping-4",
                heading: "Crevasse Safety at Camp",
                body: "The most dangerous moment in glacier camping is stepping outside the tent at night without clipping into the rope. Climbers who need to use the latrine at 2 AM, groggy and half-awake, have fallen into crevasses steps from their tent. The protocol is absolute: any movement outside the tent after dark requires clipping into a fixed line anchored to the camp, or roping up with a partner. Mark crevasse danger zones with wands and flagging tape so they are visible even in dim light. Brief the entire team on camp crevasse protocols before the first night. The mountain does not distinguish between a summit attempt and a bathroom trip — the crevasses are the same.",
                diagram: nil,
                keyFacts: [
                    "Never leave the tent at night without clipping into a fixed line or roping up",
                    "Mark all known crevasse danger zones with wands and flagging tape",
                    "Brief the entire team on camp crevasse protocols before the first night",
                    "Night-time bathroom trips are one of the most common causes of camp crevasse falls",
                    "Run a fixed line from the tent to the latrine anchored at both ends",
                ],
                warningNote: "People have died falling into crevasses mere steps from their tent during night-time bathroom trips. The protocol is non-negotiable: clip into the fixed line or rope up with a partner every single time you leave the tent."
            ),
        ],
        relatedArticles: [
            "glacier-probe-techniques",
            "glacier-glacier-weather",
            "glacier-travel-protocols",
        ],
        relatedModules: [
            "glacier-camping",
            "probe-techniques",
            "glacier-weather",
        ]
    )

    // MARK: - 9. Seasonal Glacier Changes

    static let seasonalGlacierChanges = ExploreArticle(
        id: "glacier-seasonal-changes",
        domain: .glacierTravel,
        title: "Seasonal Glacier Changes",
        summary: "Glaciers are dynamic systems that change dramatically through the year. Spring, summer, and fall present fundamentally different hazard profiles, and understanding seasonal patterns is essential for planning safe glacier travel.",
        icon: "calendar",
        heroImageName: "Photos/Heroes/hero-glacier-seasonal",
        heroImageCaption: "Glacier surface showing seasonal melt patterns and exposed ice",
        sections: [
            ExploreSection(
                id: "seasonal-changes-1",
                heading: "Spring Conditions: Strong Bridges, Hidden Dangers",
                body: "Spring is often considered the prime season for glacier travel because snow bridges are at their strongest following winter accumulation. The snowpack is deep and cold, spanning crevasses with thick, solid bridges that may support heavy loads. However, this same deep snow coverage means that crevasses are completely hidden. There are no visual clues on the surface — no depressions, no color changes, no sagging. The glacier looks like a smooth snowfield, and the only way to detect crevasses is probing and terrain reading. Spring also brings the risk of spring storm cycles that can deposit heavy new snow, loading slopes above the glacier with avalanche potential. The combination of hidden crevasses and avalanche-prone slopes above makes spring glacier travel demand constant vigilance despite the apparently benign surface conditions.",
                diagram: ExploreDiagram(
                    type: .comparisonSplit,
                    config: DiagramConfig(
                        leftTitle: "Spring (Apr-Jun)",
                        rightTitle: "Late Summer (Aug-Sep)",
                        leftColor: "3B82F6",
                        rightColor: "F59E0B",
                        leftItems: [
                            "Snow bridges at maximum strength",
                            "Crevasses completely hidden under snow",
                            "No visual surface clues to crevasse locations",
                            "Avalanche risk from surrounding slopes",
                            "Probing and terrain reading are essential",
                        ],
                        rightItems: [
                            "Snow bridges weakened by summer melt",
                            "Many crevasses exposed and visible",
                            "Visual clues available but subtle for hidden ones",
                            "Rockfall risk from thawing slopes",
                            "Early morning travel critical for bridge strength",
                        ]
                    )
                ),
                keyFacts: [
                    "Spring snow bridges are strongest but crevasses are completely hidden",
                    "A smooth snowfield in spring may conceal dozens of deep crevasses",
                    "Avalanche risk from surrounding terrain is highest in spring storm cycles",
                    "Probing and terrain reading are the only detection methods when bridges are strong",
                    "Spring conditions require maximum vigilance despite the apparently safe surface",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "seasonal-changes-2",
                heading: "Summer Conditions: Visible Hazards, Weak Bridges",
                body: "As summer progresses, the snow line retreats upward and the ablation zone expands. Crevasses that were hidden in spring become exposed as bare ice, which is actually safer in one sense — you can see what you are dealing with. But the hidden crevasses that remain in the shrinking accumulation zone above have weakened snow bridges that may collapse with little provocation. Summer also brings other hazards: meltwater streams carve channels and moulins in the ice, rockfall increases as permafrost thaws in surrounding terrain, and seracs become less stable as warm temperatures weaken the ice bonds holding them in place. The daily freeze-thaw cycle becomes the governing factor: travel in the early morning when overnight freezing has re-strengthened snow bridges, and be off dangerous terrain by midday when warming weakens them.",
                imageName: "Photos/glacier-summer-melt",
                imageCaption: "Exposed ablation zone with meltwater channels in summer",
                diagram: nil,
                keyFacts: [
                    "Exposed crevasses in the ablation zone are visible and can be navigated around",
                    "Remaining hidden crevasses in the accumulation zone have weakened bridges",
                    "Meltwater, rockfall, and serac instability all increase through summer",
                    "The daily freeze-thaw cycle governs snow bridge strength hour by hour",
                    "Plan to cross suspect terrain in early morning and be off by midday",
                ],
                warningNote: "Summer afternoon glacier travel is significantly more dangerous than morning travel. Snow bridges that held firm at 5 AM may collapse at noon. Plan alpine starts and be disciplined about turnaround times."
            ),
            ExploreSection(
                id: "seasonal-changes-3",
                heading: "Fall Conditions: Transition and Instability",
                body: "Fall is a transitional period on glaciers. Early fall snowstorms deposit new snow on the bare ice of the ablation zone, creating thin, weak snow bridges over crevasses that were fully exposed just days earlier. These new bridges are deceptively smooth and uniform but may be only centimeters thick. The first snowfall of autumn is one of the most dangerous periods on a glacier because it conceals hazards that were visible the day before. As fall progresses and the snowpack deepens, bridge strength gradually increases, but the period between first snowfall and reliable winter coverage is a window of heightened risk. Fall also brings shorter days, reducing the time available for safe travel, and early-season storms can be fierce, bringing high winds and heavy snowfall that trap climbers on the glacier.",
                diagram: nil,
                keyFacts: [
                    "Early fall snow conceals previously visible crevasses with thin, weak bridges",
                    "The first snowfall of autumn creates the most deceptive and dangerous conditions",
                    "New bridges may be only centimeters thick despite looking like solid snow",
                    "Shorter days reduce the window for safe morning travel",
                    "Early fall storms can be intense, trapping parties on exposed glacier terrain",
                ],
                warningNote: "The first snowfall of autumn is among the most dangerous periods on a glacier. Yesterday you could see every crevasse. Today they are hidden under centimeters of fresh snow. Do not trust early season snow bridges."
            ),
        ],
        relatedArticles: [
            "glacier-glacier-anatomy",
            "glacier-glacier-route-finding",
            "glacier-glacier-weather",
        ],
        relatedModules: [
            "seasonal-changes",
            "glacier-anatomy",
            "glacier-route-finding",
        ]
    )

    // MARK: - 10. Glacier Weather

    static let glacierWeather = ExploreArticle(
        id: "glacier-glacier-weather",
        domain: .glacierTravel,
        title: "Glacier Weather",
        summary: "Glaciers create their own microclimate. Katabatic winds, whiteout conditions, temperature inversions, and intense solar radiation are weather hazards unique to glaciated terrain that can transform a straightforward day into a survival situation.",
        icon: "wind.snow",
        heroImageName: "Photos/Heroes/hero-glacier-weather",
        heroImageCaption: "Storm clouds building over a glaciated mountain range",
        sections: [
            ExploreSection(
                id: "glacier-weather-1",
                heading: "Katabatic Winds",
                body: "Glaciers generate their own wind system. The ice surface cools the air in contact with it, making it denser than the surrounding air. This cold, dense air drains downhill under gravity, creating katabatic winds that flow off the glacier like an invisible river. Katabatic winds are strongest at night when radiative cooling is greatest, but on large glaciers they can persist throughout the day. Wind speeds of 30-50 km/h are common, and on large ice sheets like those in Greenland or Antarctica, katabatic winds can reach hurricane force. On alpine glaciers, katabatic winds are typically moderate but persistent, and they create a constant wind chill that can cause hypothermia even in above-freezing air temperatures. Camp placement should account for katabatic drainage: avoid camping in channels or gullies where cold air pools and accelerates.",
                diagram: nil,
                keyFacts: [
                    "Katabatic winds form when the glacier surface cools the air, making it drain downhill",
                    "These winds are strongest at night but can persist throughout the day on large glaciers",
                    "Speeds of 30-50 km/h are common on alpine glaciers; much stronger on ice sheets",
                    "Katabatic flow creates constant wind chill even in mild air temperatures",
                    "Avoid camping in drainage channels where katabatic winds pool and accelerate",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "glacier-weather-2",
                heading: "Whiteout Conditions",
                body: "Whiteout is a condition where cloud or fog merges with the snow surface, eliminating all contrast and making it impossible to distinguish ground from sky. On a glacier, whiteout renders navigation nearly impossible: you cannot see crevasses, terrain features, or even the slope angle beneath your feet. Vertigo and disorientation are common, and climbers have walked off cliffs or into open crevasses in whiteout conditions. Whiteout is most common when low cloud or fog moves in over snow-covered terrain, but it can also occur in bright sunlight when the snow surface is uniformly white and the sky is overcast, eliminating all shadows. The only reliable navigation in whiteout is following wanded routes, using compass bearings, or GPS navigation. If whiteout descends and you do not have a wanded route to follow, the safest option is often to stop, anchor, and wait.",
                diagram: nil,
                keyFacts: [
                    "Whiteout eliminates all contrast between ground and sky, disorienting climbers completely",
                    "Climbers have walked off cliffs and into open crevasses in whiteout conditions",
                    "Wanded routes, compass bearings, and GPS are the only reliable navigation in whiteout",
                    "If whiteout descends without a wanded route, stop, anchor, and wait for visibility",
                    "Whiteout can occur in both cloudy and bright overcast conditions on snow",
                ],
                warningNote: "Whiteout on a crevassed glacier is a life-threatening emergency. You cannot see crevasses, you cannot judge slope angle, and you may not even know which direction is downhill. If you have no wanded route, stop moving immediately."
            ),
            ExploreSection(
                id: "glacier-weather-3",
                heading: "Temperature Inversions and Solar Radiation",
                body: "Glaciers frequently create temperature inversions where the air temperature increases with altitude rather than decreasing. The cold glacier surface chills the air near the ground, while the air above remains warm. This can create a situation where a climber ascending from a cold, foggy glacier surface breaks through the inversion into brilliant sunshine and much warmer temperatures. The practical impact is twofold: the inversion layer traps moisture and reduces visibility at the glacier surface, while the warm air above can rapidly weaken snow bridges. Solar radiation on a glacier is intense and comes from all directions. The snow surface reflects up to 90% of incoming ultraviolet radiation, meaning you receive UV from above and below simultaneously. Without proper eye protection, snow blindness can occur within hours. Without sunscreen on all exposed skin including under the chin and inside the nostrils, severe sunburn is guaranteed.",
                diagram: nil,
                keyFacts: [
                    "Temperature inversions are common on glaciers, with cold air trapped near the surface",
                    "Inversions trap moisture and fog at the glacier surface while the air above is clear",
                    "Snow reflects up to 90% of UV radiation, causing exposure from above and below",
                    "Snow blindness can occur within hours without proper glacier glasses or goggles",
                    "Apply sunscreen to all exposed skin including under the chin and inside the nostrils",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "glacier-weather-4",
                heading: "Storms and Weather Windows",
                body: "Weather on glaciers can change with terrifying speed. A clear morning can become a full storm with high winds, heavy snowfall, and zero visibility within an hour. Glaciated peaks and ridges generate their own orographic weather as moist air is forced upward over the terrain. The key to surviving glacier weather is monitoring conditions continuously and moving decisively when weather windows open. Plan your most exposed glacier travel for the most stable weather windows, and have contingency plans for deteriorating conditions. Carry a weather radio or satellite communication device. Watch for the classic warning signs: lenticular clouds forming over peaks, a halo around the sun or moon, rapidly falling barometric pressure, and increasing wind at altitude. When these signs appear, you may have 6-12 hours before conditions deteriorate significantly. Use that time to descend to safer terrain or establish a well-anchored storm camp.",
                diagram: nil,
                keyFacts: [
                    "Glacier weather can change from clear to full storm within an hour",
                    "Glaciated peaks generate orographic weather as moist air ascends over terrain",
                    "Lenticular clouds, solar halos, and falling pressure signal approaching storms",
                    "Plan exposed glacier travel for the most stable weather windows available",
                    "Carry weather radio or satellite communication and monitor conditions continuously",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "glacier-glacier-camping",
            "glacier-seasonal-changes",
            "glacier-glacier-route-finding",
        ],
        relatedModules: [
            "glacier-weather",
            "seasonal-changes",
            "glacier-camping",
        ]
    )
}
