import Foundation

enum AvalancheExplore {

    // MARK: - All Avalanche Explore Articles

    static let articles: [ExploreArticle] = [
        avalancheTriangleOverview,
        slabMechanics,
        slopeAngleAnalysis,
        terrainTraps,
        snowpackAndCrystals,
        stabilityTesting,
        windLoading,
        humanFactors,
        decisionFrameworks,
        companionRescue,
    ]

    // MARK: - 1. Avalanche Triangle Overview

    static let avalancheTriangleOverview = ExploreArticle(
        id: "avalanche-triangle-overview",
        domain: .avalanche,
        title: "The Avalanche Triangle",
        summary: "Every avalanche requires the simultaneous presence of three factors: unstable terrain, a reactive snowpack, and a weather trigger. Understanding how these elements interact is the foundation of all avalanche risk assessment.",
        icon: "triangle.fill",
        heroImageName: "Photos/Heroes/hero-avalanche-triangle",
        sections: [
            ExploreSection(
                id: "triangle-overview-1",
                heading: "Three Ingredients, One Result",
                body: "The avalanche triangle is the central organizing framework for understanding why avalanches happen. Every avalanche requires terrain steep enough to slide, a snowpack with a weak layer beneath a cohesive slab, and a weather event that tips the balance. Remove any single ingredient and the avalanche cannot occur. This is not a theoretical abstraction; it is the practical reality that every backcountry traveler must internalize before stepping into avalanche terrain.",
                imageName: "Photos/avalanche-triangle-overview",
                imageCaption: "The three elements of avalanche formation",
                diagram: nil,
                keyFacts: [
                    "All three factors must be present simultaneously for an avalanche to release",
                    "Terrain is the only factor you can observe directly and with certainty",
                    "Weather is the primary driver of change in avalanche conditions",
                    "Snowpack is the hardest factor to assess and the most spatially variable",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "triangle-overview-2",
                heading: "The Human at the Center",
                body: "Bruce Tremper places the human factor at the center of the triangle because it is humans who choose to enter avalanche terrain. The mountain does not care about your experience level, your equipment, or your plans. When all three sides of the triangle are elevated, the only variable left is whether a person triggers the slide. Statistically, about 90% of avalanche fatalities involve a slide triggered by the victim or someone in the victim's party. The triangle framework exists to support better human decisions.",
                diagram: ExploreDiagram(
                    type: .triangle,
                    config: DiagramConfig(
                        vertices: [
                            DiagramVertex(id: "terrain", label: "TERRAIN", description: "Slope angle, aspect, shape, anchoring, terrain traps", color: "EF4444"),
                            DiagramVertex(id: "weather", label: "WEATHER", description: "Precipitation, wind, temperature changes", color: "F59E0B"),
                            DiagramVertex(id: "snowpack", label: "SNOWPACK", description: "Weak layers, slab properties, spatial variability", color: "3B82F6"),
                        ],
                        centerLabel: "HUMAN",
                        centerDescription: "Decision-making under uncertainty"
                    )
                ),
                keyFacts: [
                    "~90% of avalanche victims trigger their own avalanche or are triggered by someone in their group",
                    "The human factor is the only element of the triangle you have direct control over",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "triangle-overview-3",
                heading: "Multiplicative Risk",
                body: "The danger from each side of the triangle does not simply add together. When terrain is marginal, snowpack is suspect, and weather has been loading slopes, the combined risk compounds in a multiplicative fashion. A slope that might be manageable with one elevated factor becomes deadly when all three align. This is why experienced practitioners treat Considerable danger (level 3 on the North American scale) with great respect: it is the danger level at which the most fatalities occur, precisely because all three factors are often moderately elevated and people underestimate the compounding effect.",
                diagram: nil,
                keyFacts: [
                    "Considerable (Level 3) accounts for the most avalanche fatalities in North America",
                    "Risk compounds multiplicatively, not additively, when multiple factors align",
                    "Even moderate elevation across all three factors can produce extreme danger",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "avalanche-slab-mechanics",
            "avalanche-slope-angle",
            "avalanche-human-factors",
        ],
        relatedModules: [
            "avalanche-triangle",
            "human-factors",
            "decision-framework",
        ]
    )

    // MARK: - 2. Slab Mechanics

    static let slabMechanics = ExploreArticle(
        id: "avalanche-slab-mechanics",
        domain: .avalanche,
        title: "Slab Avalanche Mechanics",
        summary: "Slab avalanches kill more people than any other type. Understanding how a cohesive slab sits atop a weak layer and fractures as a unit is essential to recognizing the invisible architecture of danger in the snowpack.",
        icon: "square.stack.3d.up.fill",
        heroImageName: "Photos/Heroes/hero-avalanche-slab-mechanics",
        sections: [
            ExploreSection(
                id: "slab-mechanics-1",
                heading: "Anatomy of a Slab",
                body: "A slab avalanche requires a cohesive layer of snow resting on top of a weaker layer, all sitting on a bed surface. The slab has enough internal cohesion to fracture and move as a single unit, much like a pane of glass sliding off a tilted table. The weak layer is the critical failure plane, often composed of faceted crystals, surface hoar, or depth hoar that cannot bear the increasing load above. When stress on the weak layer exceeds its strength, the fracture propagates outward at speeds approaching 100 meters per second, and the entire slab begins to move.",
                imageName: "Photos/avalanche-slab-anatomy",
                imageCaption: "Cross-section showing slab, weak layer, and bed surface",
                animationName: "anim-avalanche-slab-release",
                diagram: nil,
                keyFacts: [
                    "Slab avalanches account for virtually all avalanche fatalities",
                    "The weak layer is the failure plane where fracture initiates",
                    "Fracture propagation speed in weak layers approaches 100 m/s",
                    "The slab must be cohesive enough to fracture as a unit",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "slab-mechanics-2",
                heading: "Stress vs. Strength",
                body: "Every point in the snowpack exists in a balance between the stress applied by gravity and the overlying snow, and the strength of the bonds holding the structure together. Adding new snow, wind-depositing snow, or a skier's weight adds stress. Warming weakens bonds. A slab releases when stress exceeds strength at a triggering point and the resulting fracture can propagate across the weak layer. This is why a single skier can trigger a massive slide: they add just enough localized stress to initiate a fracture that then spreads across an area far larger than the trigger point.",
                diagram: nil,
                keyFacts: [
                    "A single skier can add roughly 1 kPa of stress to the snowpack",
                    "Natural triggers include new snow loading, wind loading, and solar warming",
                    "The fracture initiates at a point and propagates outward across the weak layer",
                ],
                warningNote: "A slope that has not yet avalanched is not necessarily safe. It may be loaded to within a hair's breadth of its failure threshold, waiting for one additional trigger."
            ),
            ExploreSection(
                id: "slab-mechanics-3",
                heading: "Slab Properties That Matter",
                body: "Not all slabs are equal. A soft slab made of recent storm snow may release easily but run with less destructive force. A hard wind slab is more difficult to trigger but far more dangerous when it does release, carrying enormous mass at high speed. Slab thickness directly affects both the likelihood of triggering and the consequences. Thicker slabs distribute a trigger's stress over a larger area, making them harder to trigger from the surface, but when they do release, the volume of debris is devastating. Understanding slab hardness and thickness helps practitioners assess both probability and consequence.",
                diagram: nil,
                keyFacts: [
                    "Soft slabs are easier to trigger but typically less destructive",
                    "Hard wind slabs are harder to trigger but far more dangerous",
                    "Slab thickness affects both trigger sensitivity and destructive potential",
                    "A slab as thin as 30 cm can be fatal if it carries a person into a terrain trap",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "avalanche-triangle-overview",
            "avalanche-snowpack-crystals",
            "avalanche-stability-testing",
        ],
        relatedModules: [
            "slab-physics",
            "snowpack-layers",
            "stability-testing",
        ]
    )

    // MARK: - 3. Slope Angle Analysis

    static let slopeAngleAnalysis = ExploreArticle(
        id: "avalanche-slope-angle",
        domain: .avalanche,
        title: "Slope Angle & the Danger Zone",
        summary: "Slope angle is the single most important terrain factor in avalanche risk. The vast majority of slab avalanches release on slopes between 30 and 45 degrees, with a sharp peak around 38 degrees.",
        icon: "angle",
        heroImageName: "Photos/Heroes/hero-avalanche-slope-angle",
        sections: [
            ExploreSection(
                id: "slope-angle-1",
                heading: "The Critical Range: 30 to 45 Degrees",
                body: "Decades of accident data show that roughly 93% of fatal avalanches release on slopes between 30 and 45 degrees, with the peak frequency near 38 degrees. Below 30 degrees, most snow simply does not have enough gravitational stress to overcome the friction and bonding holding it in place. Above 45 degrees, snow tends to sluff off continuously in small amounts rather than building into dangerous slabs. This 30-to-45-degree band is the avalanche sweet spot, and learning to recognize it in the field is the single most impactful terrain skill a backcountry traveler can develop.",
                imageName: "Photos/avalanche-slope-angle",
                imageCaption: "Slope angle assessment in avalanche terrain",
                diagram: nil,
                keyFacts: [
                    "93% of fatal avalanches occur on slopes between 30-45 degrees",
                    "Peak avalanche frequency is around 38 degrees",
                    "Below 30 degrees, gravitational stress is usually insufficient for slab release",
                    "Above 45 degrees, snow tends to sluff rather than form cohesive slabs",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "slope-angle-2",
                heading: "Measuring Slope Angle in the Field",
                body: "An inclinometer is an essential backcountry tool, whether as a standalone device, built into a compass, or as a smartphone app. The key skill is measuring the steepest part of the slope above you, not the average angle. Convex rolls are particularly dangerous because the steepest point is often just over the roll where you cannot see it, and the transition from low angle to high angle concentrates stress on the weak layer. Always measure multiple points across the slope and use the steepest reading for your assessment.",
                diagram: nil,
                keyFacts: [
                    "Always measure the steepest pitch on the slope, not the average",
                    "Convex rolls concentrate stress and are common trigger points",
                    "An inclinometer is essential gear for backcountry travel",
                    "Terrain that looks moderate from below can be well into the danger zone",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "slope-angle-3",
                heading: "Slope Angle Is Not the Whole Story",
                body: "While slope angle is the most reliable single indicator of terrain risk, it must be considered alongside aspect, elevation, anchoring, and terrain traps. A 35-degree north-facing slope with buried surface hoar is a different proposition than a 35-degree south-facing slope that has been baked by the sun. Connected slopes above your position also matter: you can be killed by an avalanche that releases on a 40-degree slope above you while you stand on a perfectly flat valley floor. Always assess the slope angle of everything above and around your position, not just the ground directly beneath your feet.",
                diagram: nil,
                keyFacts: [
                    "Aspect, elevation, and anchoring modify the risk at any given angle",
                    "Slopes above your position can avalanche onto you even on flat terrain",
                    "North-facing slopes preserve weak layers longer in the Northern Hemisphere",
                    "South-facing slopes stabilize faster from solar radiation but can wet-slide in spring",
                ],
                warningNote: "You do not need to be on the avalanche slope to be killed by it. Runout zones and connected terrain can carry debris far beyond the starting zone."
            ),
        ],
        relatedArticles: [
            "avalanche-terrain-traps",
            "avalanche-slab-mechanics",
            "avalanche-triangle-overview",
        ],
        relatedModules: [
            "slope-angle",
            "terrain-traps",
            "avalanche-triangle",
        ]
    )

    // MARK: - 4. Terrain Traps

    static let terrainTraps = ExploreArticle(
        id: "avalanche-terrain-traps",
        domain: .avalanche,
        title: "Terrain Traps",
        summary: "A terrain trap is any feature that increases the consequences of being caught in an avalanche. Gullies, cliff bands, tree wells, and flat benches below steep slopes all transform survivable slides into fatal ones.",
        icon: "exclamationmark.triangle.fill",
        heroImageName: "Photos/Heroes/hero-avalanche-terrain-traps",
        sections: [
            ExploreSection(
                id: "terrain-traps-1",
                heading: "What Makes a Terrain Trap",
                body: "A terrain trap does not change the probability of an avalanche releasing. Instead, it dramatically increases the consequences if one does. A small slide on an open slope might carry a skier 50 meters with shallow burial. The same small slide funneling into a gully can pile debris 3 meters deep. Terrain traps include gullies and couloirs that channel debris, cliff bands that add fall trauma, flat benches or creek beds where debris piles deep, and dense trees that cause impact injuries and complicate rescue. Learning to read terrain traps is a matter of asking one question: if a slide happens here, what happens to me?",
                imageName: "Photos/avalanche-terrain-trap",
                imageCaption: "Terrain trap: gully feature concentrating avalanche runout",
                diagram: nil,
                keyFacts: [
                    "Terrain traps increase consequences, not probability",
                    "Gullies can multiply burial depth by 3-5x compared to open slopes",
                    "Cliff bands add fall trauma to avalanche burial risk",
                    "Even small avalanches become deadly when they funnel into terrain traps",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "terrain-traps-2",
                heading: "Common Terrain Trap Scenarios",
                body: "The most common fatal terrain trap is a gully or creek bed at the bottom of an avalanche path. Debris funnels into the narrow channel and piles deep, making both survival and rescue extremely difficult. Cliff bands below avalanche slopes add falling injuries to burial risk. Crevasses on glaciated terrain swallow avalanche debris and victims alike. Even trees, often thought of as safety anchors, become terrain traps when they are sparse enough to allow a slide but dense enough to cause fatal impact injuries. The worst scenarios combine multiple traps: a slide that carries a victim over a cliff into a gully produces compounding trauma.",
                imageName: "Photos/avalanche-debris",
                imageCaption: "Avalanche debris field in a valley",
                diagram: nil,
                keyFacts: [
                    "Creek beds and gullies are the most common fatal terrain traps",
                    "Sparse trees can act as terrain traps rather than anchors",
                    "Crevasses on glaciated terrain combine avalanche and crevasse fall risk",
                    "Multiple terrain traps compound to create the worst outcomes",
                ],
                warningNote: "A Size 1 avalanche (relatively harmless on open terrain) can be fatal if it pushes a victim into a terrain trap. Never dismiss small avalanche potential in complex terrain."
            ),
            ExploreSection(
                id: "terrain-traps-3",
                heading: "Route Planning Around Terrain Traps",
                body: "The most effective way to manage terrain traps is to avoid them during route planning, before you are standing in them making real-time decisions under pressure. Study topographic maps and satellite imagery to identify gullies, cliff bands, and terrain features below avalanche starting zones. In the field, maintain awareness of what lies below and around you at all times. When you must cross beneath terrain traps, minimize exposure time by moving quickly through danger zones one person at a time, with the rest of the group watching from a safe position. Terrain selection is the highest-leverage decision in avalanche safety.",
                diagram: nil,
                keyFacts: [
                    "Identify terrain traps during route planning, not in the field",
                    "Cross beneath hazardous terrain one person at a time",
                    "Use topographic maps and satellite imagery to spot gullies and cliff bands",
                    "Terrain selection is the single highest-leverage avalanche safety decision",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "avalanche-slope-angle",
            "avalanche-decision-frameworks",
            "avalanche-companion-rescue",
        ],
        relatedModules: [
            "terrain-traps",
            "slope-angle",
            "decision-framework",
        ]
    )

    // MARK: - 5. Snowpack & Crystal Types

    static let snowpackAndCrystals = ExploreArticle(
        id: "avalanche-snowpack-crystals",
        domain: .avalanche,
        title: "Snowpack Structure & Crystal Types",
        summary: "The snowpack is a layered history of the winter's weather. Understanding how different crystal types form, bond, and fail is essential to reading the invisible architecture that determines whether a slope will hold or release.",
        icon: "snowflake",
        heroImageName: "Photos/Heroes/hero-avalanche-snowpack",
        sections: [
            ExploreSection(
                id: "snowpack-crystals-1",
                heading: "The Snowpack as a Historical Record",
                body: "Every layer in the snowpack tells a story about the weather conditions when it was deposited and how it has metamorphosed since. A heavy storm deposits dense, well-bonded snow. A cold clear night creates delicate surface hoar crystals. A week of cold temperatures with a thin snowpack drives temperature gradients that grow large, poorly-bonded faceted crystals near the ground. Reading a snowpit is reading the winter's weather history, layer by layer. The critical question is always whether the layers are well-bonded to each other or whether weak interfaces exist that could serve as failure planes.",
                diagram: nil,
                keyFacts: [
                    "Each snowpack layer reflects the weather conditions during and after deposition",
                    "The critical question is always about interlayer bonding strength",
                    "A snowpit reveals the winter's weather history in physical form",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "snowpack-crystals-2",
                heading: "Weak Layer Crystal Types",
                body: "Three crystal types are responsible for the vast majority of slab avalanche weak layers. Surface hoar forms on cold, clear, calm nights when water vapor deposits as large, feathery crystals on the snow surface; once buried by subsequent snowfall, these crystals form an extremely persistent weak layer. Faceted crystals grow when large temperature gradients drive water vapor transport through the snowpack, producing large, angular, poorly-bonded grains. Depth hoar is the extreme end of faceting, forming large cup-shaped crystals near the ground in shallow snowpacks with strong temperature gradients. All three types share a critical property: they resist bonding with surrounding snow and can persist as weak layers for weeks or months.",
                imageName: "Photos/avalanche-crystal-types",
                imageCaption: "Weak layer crystal types under magnification",
                animationName: "anim-snowpack-metamorphism",
                diagram: nil,
                keyFacts: [
                    "Surface hoar: forms on cold clear nights, extremely persistent once buried",
                    "Faceted crystals: grow under strong temperature gradients, weak bonds",
                    "Depth hoar: extreme faceting near the ground, can persist all season",
                    "All three types resist bonding and can remain weak for weeks to months",
                ],
                warningNote: "Persistent weak layers are the most dangerous snowpack feature because they can produce avalanches long after the original weather event, when travelers have let their guard down."
            ),
            ExploreSection(
                id: "snowpack-crystals-3",
                heading: "Rounding and Stabilization",
                body: "Not all metamorphism produces weakness. Under moderate temperature gradients, snow crystals undergo equilibrium metamorphism, rounding into small, well-bonded grains that increase snowpack strength over time. This is why older, undisturbed snow layers often become stronger with time. Warm temperatures accelerate rounding but can also introduce melt-freeze crusts that later become sliding surfaces for new slabs. The interplay between destructive metamorphism (rounding, strengthening) and constructive metamorphism (faceting, weakening) determines the snowpack's evolving stability. Understanding this dynamic is what separates an informed practitioner from someone merely checking boxes.",
                diagram: nil,
                keyFacts: [
                    "Equilibrium metamorphism rounds crystals and strengthens bonds",
                    "Older undisturbed layers generally gain strength over time",
                    "Melt-freeze crusts can later serve as sliding surfaces for new slabs",
                    "The balance between rounding and faceting drives snowpack evolution",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "snowpack-crystals-4",
                heading: "Spatial Variability",
                body: "One of the most challenging aspects of snowpack assessment is spatial variability. A snowpit dug on one part of a slope may show a strong, well-bonded snowpack while 30 meters away a pocket of surface hoar or facets lurks beneath the slab. Wind effects, solar radiation, vegetation, and terrain shape all create dramatic local variations. This is why a single snowpit result should never be treated as representative of an entire slope. Experienced practitioners dig multiple pits, triangulate their findings with regional avalanche bulletins, and use terrain analysis to estimate where weak layers are most likely to exist and be most reactive.",
                diagram: nil,
                keyFacts: [
                    "Snowpack structure can vary dramatically over short distances",
                    "A single snowpit is never representative of an entire slope",
                    "Wind, solar radiation, and terrain create local variations in weak layer distribution",
                    "Always triangulate pit results with bulletins and terrain analysis",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "avalanche-slab-mechanics",
            "avalanche-stability-testing",
            "avalanche-wind-loading",
        ],
        relatedModules: [
            "snowpack-layers",
            "slab-physics",
            "weather-loading",
        ]
    )

    // MARK: - 6. Stability Testing Methods

    static let stabilityTesting = ExploreArticle(
        id: "avalanche-stability-testing",
        domain: .avalanche,
        title: "Stability Testing Methods",
        summary: "Snowpack stability tests provide direct evidence of weak layer presence and reactivity. From quick field tests to formal pit profiles, each method has strengths and limitations that practitioners must understand.",
        icon: "hand.tap.fill",
        heroImageName: "Photos/Heroes/hero-avalanche-stability-testing",
        sections: [
            ExploreSection(
                id: "stability-testing-1",
                heading: "Extended Column Test (ECT)",
                body: "The Extended Column Test is widely considered the gold standard for assessing fracture propagation potential. A 90cm-wide column is isolated on three sides, and progressive taps are applied to one end with increasing force. The test reveals not just whether a weak layer exists (initiation), but whether a fracture will propagate across the column (propagation). A result of ECTP (propagation across the full column) on easy to moderate taps is a strong red flag. The ECT's advantage over older tests like the Rutschblock is that it specifically tests propagation, which is the critical step between a localized failure and a full slab release.",
                imageName: "Photos/avalanche-column-test",
                imageCaption: "Extended Column Test setup in the field",
                diagram: nil,
                keyFacts: [
                    "ECT specifically tests fracture propagation, not just initiation",
                    "ECTP on easy to moderate taps is a strong indicator of instability",
                    "Column width of 90 cm is critical for meaningful propagation results",
                    "ECTN (no propagation) does not guarantee stability due to spatial variability",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "stability-testing-2",
                heading: "Compression Test and Hand Shear",
                body: "The Compression Test uses a 30cm column and progressive loading to identify weak layers and their depth. It is faster than an ECT and useful for getting a quick read on snowpack structure, but it tests only initiation, not propagation. Results are scored by the number of taps required: easy (1-10 taps from wrist), moderate (11-20 from elbow), and hard (21-30 from shoulder). Hand shear tests are even faster: isolate a small column and pull across it with your hand to feel for weak layers. These quick tests are valuable for sampling multiple locations, building a picture of spatial variability across a slope.",
                diagram: nil,
                keyFacts: [
                    "Compression Tests reveal weak layer presence and approximate strength",
                    "Easy failures (1-10 taps from wrist) indicate significant instability",
                    "Hand shear tests take seconds and are useful for rapid spatial sampling",
                    "Quick tests at multiple locations beat a single thorough test at one location",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "stability-testing-3",
                heading: "Limitations of Stability Tests",
                body: "No stability test is a green light. A stable result at one location does not mean the slope is safe, because spatial variability means the weak layer may be more reactive just meters away. Tests are most reliable when they show instability: a clear failure on a known weak layer is strong evidence of danger. Stable results are less conclusive because you may have simply tested in the wrong spot. Additionally, stability tests do not account for terrain traps, remote triggering potential, or the consequences of being wrong. Tremper emphasizes that stability tests are one data point among many, not a pass/fail gate for committing to a slope.",
                diagram: nil,
                keyFacts: [
                    "Unstable results are more reliable than stable results",
                    "Spatial variability means one test does not represent the entire slope",
                    "Tests do not account for terrain traps or remote triggering",
                    "Stability tests are one data point, not a go/no-go decision tool",
                ],
                warningNote: "Never use a single stable test result as justification for entering a suspect slope. The weak layer may be present and reactive just meters from where you tested."
            ),
        ],
        relatedArticles: [
            "avalanche-snowpack-crystals",
            "avalanche-slab-mechanics",
            "avalanche-decision-frameworks",
        ],
        relatedModules: [
            "stability-testing",
            "snowpack-layers",
            "decision-framework",
        ]
    )

    // MARK: - 7. Wind Loading

    static let windLoading = ExploreArticle(
        id: "avalanche-wind-loading",
        domain: .avalanche,
        title: "Wind Loading & Slab Formation",
        summary: "Wind is the most efficient architect of avalanche slabs. It can deposit snow ten times faster than a storm, building dense, reactive wind slabs on lee slopes that are often invisible from the windward side of a ridge.",
        icon: "wind",
        heroImageName: "Photos/Heroes/hero-avalanche-wind-loading",
        sections: [
            ExploreSection(
                id: "wind-loading-1",
                heading: "How Wind Builds Slabs",
                body: "Wind transports snow from exposed windward slopes and deposits it on sheltered lee slopes, building dense wind slabs with remarkable efficiency. A moderate wind can transport more snow in an hour than a storm deposits in the same period. The deposited snow is mechanically broken into small fragments that sinter together quickly, forming hard, cohesive slabs that are primed for avalanche release. Wind slabs often form on cross-loaded features like gully sidewalls and terrain flanks, not just on the obvious lee side of ridges. Recognizing wind effect on terrain requires understanding local wind patterns, which are far more complex than the prevailing regional wind direction.",
                diagram: nil,
                keyFacts: [
                    "Wind can deposit snow 10x faster than direct snowfall",
                    "Wind-broken snow fragments sinter into hard, cohesive slabs quickly",
                    "Cross-loading on gully sidewalls is a commonly overlooked wind slab hazard",
                    "Local wind patterns can differ dramatically from regional prevailing winds",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "wind-loading-2",
                heading: "Reading Wind Effect in the Field",
                body: "Wind leaves visible signatures in the snow that practitioners must learn to read. Sastrugi (wind-sculpted ridges), cornices on ridge crests, snow plumes blowing off summits, and pillow-shaped deposits on lee slopes all indicate active or recent wind transport. The texture of the snow surface changes dramatically between windward and lee aspects: scoured, hard-packed snow on the wind side and soft, deep deposits on the lee side. Cracking or hollow-sounding snow underfoot on a lee slope is a direct warning of wind slab formation. These field observations are among the most reliable real-time indicators of current avalanche conditions.",
                imageName: "Photos/avalanche-wind-signs",
                imageCaption: "Wind effect indicators: sastrugi and cornices",
                diagram: nil,
                keyFacts: [
                    "Sastrugi, cornices, and plumes are visible indicators of wind transport",
                    "Cracking or hollow-sounding snow on lee slopes indicates wind slab",
                    "Pillow-shaped deposits on lee features are freshly formed wind slabs",
                    "Compare windward and lee aspects to gauge the magnitude of wind effect",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "wind-loading-3",
                heading: "Wind Slabs and Timing",
                body: "Wind slabs are most reactive during and immediately after the wind event. A slab that formed overnight may be highly sensitive to a human trigger by morning. However, wind slabs can also bond and stabilize relatively quickly compared to persistent slab problems, often within 24 to 48 hours if temperatures are moderate. The danger is that wind events often coincide with storms, creating a double-loading effect where both direct snowfall and wind transport pile onto lee slopes simultaneously. After a storm cycle, the most dangerous slopes are the lee aspects that received both precipitation and wind-loaded snow, particularly if those slopes harbor a pre-existing buried weak layer.",
                diagram: nil,
                keyFacts: [
                    "Wind slabs are most reactive during and immediately after wind events",
                    "Wind slabs can stabilize within 24-48 hours under moderate temperatures",
                    "Storm + wind creates dangerous double-loading on lee slopes",
                    "Post-storm lee aspects with buried weak layers are the highest-priority concern",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "avalanche-slab-mechanics",
            "avalanche-snowpack-crystals",
            "avalanche-slope-angle",
        ],
        relatedModules: [
            "weather-loading",
            "slab-physics",
            "snowpack-layers",
        ]
    )

    // MARK: - 8. Human Factors & Heuristic Traps

    static let humanFactors = ExploreArticle(
        id: "avalanche-human-factors",
        domain: .avalanche,
        title: "Human Factors & Heuristic Traps",
        summary: "The majority of avalanche accidents involve experienced people making poor decisions, not beginners who do not know better. Understanding the cognitive shortcuts and social dynamics that lead to bad decisions is as important as understanding snow science.",
        icon: "brain.head.profile",
        heroImageName: "Photos/Heroes/hero-avalanche-human-factors",
        sections: [
            ExploreSection(
                id: "human-factors-1",
                heading: "The Six Heuristic Traps",
                body: "Ian McCammon's research identified six heuristic traps that lead backcountry travelers into avalanches. Familiarity: \"I've skied this slope many times and it's never slid.\" Commitment: \"We drove four hours to get here; we're not turning around.\" Social proof: \"Other people are skiing it, so it must be fine.\" The expert halo: \"She's a certified guide, so her decision must be right.\" Scarcity: \"This is the last powder day of the season.\" Acceptance: \"I don't want to be the one who calls it off and looks weak.\" These traps operate below conscious awareness, hijacking rational assessment with emotional shortcuts that feel like good reasoning.",
                imageName: "Photos/avalanche-group-decision",
                imageCaption: "Group decision-making in avalanche terrain",
                diagram: nil,
                keyFacts: [
                    "Familiarity: past safe outcomes create false sense of security",
                    "Commitment: sunk costs drive continued exposure to danger",
                    "Social proof: following others' tracks into hazardous terrain",
                    "Acceptance: desire for group approval overrides personal risk assessment",
                    "Expert halo: deferring to perceived authority without independent evaluation",
                    "Scarcity: perceived limited opportunity increases risk tolerance",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "human-factors-2",
                heading: "Group Dynamics and Risky Shift",
                body: "Groups consistently make riskier decisions than individuals acting alone, a phenomenon known as risky shift. In a group, responsibility diffuses across members, individual concerns go unvoiced, and the most confident voice often carries the decision regardless of whether that confidence is warranted. Avalanche accidents frequently involve groups where at least one member had reservations but did not speak up. Effective group management requires explicit protocols: designating a skeptic whose job is to argue for the conservative option, taking anonymous votes before committing to a slope, and establishing clear turn-back criteria before leaving the trailhead.",
                diagram: nil,
                keyFacts: [
                    "Groups make riskier decisions than individuals (risky shift)",
                    "Diffusion of responsibility reduces individual accountability",
                    "The most confident voice often overrides the most informed assessment",
                    "Many avalanche fatalities involve groups where members suppressed concerns",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "human-factors-3",
                heading: "Overconfidence and Experience",
                body: "One of the most counterintuitive findings in avalanche research is that experience can increase overconfidence faster than it increases actual skill. A person who has traveled safely in avalanche terrain for years without incident may conclude they have good judgment, when in reality they have been lucky. This is particularly dangerous because the feedback loop in avalanche terrain is broken: safe trips provide no information about how close you were to triggering a slide. You can ski a slope that was one additional skier's weight away from releasing, have a wonderful day, and conclude the slope was safe. Tremper calls this the \"lack of negative feedback\" problem, and it is the reason experienced people continue to die in avalanches.",
                diagram: nil,
                keyFacts: [
                    "Experience can increase overconfidence faster than actual skill",
                    "Safe trips provide zero information about proximity to triggering",
                    "The feedback loop in avalanche terrain is fundamentally broken",
                    "Experienced practitioners die because they mistake luck for skill",
                ],
                warningNote: "The most dangerous person in avalanche terrain is an experienced person who has never been caught. They have survived long enough to believe their judgment is infallible."
            ),
        ],
        relatedArticles: [
            "avalanche-decision-frameworks",
            "avalanche-triangle-overview",
            "avalanche-companion-rescue",
        ],
        relatedModules: [
            "human-factors",
            "decision-framework",
            "avalanche-triangle",
        ]
    )

    // MARK: - 9. Decision Frameworks

    static let decisionFrameworks = ExploreArticle(
        id: "avalanche-decision-frameworks",
        domain: .avalanche,
        title: "Avalanche Decision Frameworks",
        summary: "Structured decision frameworks counteract the heuristic traps and cognitive biases that lead to avalanche accidents. From the Avalanche Terrain Exposure Scale to the Obvious Clues method, these tools turn intuitive guessing into systematic assessment.",
        icon: "checklist",
        heroImageName: "Photos/Heroes/hero-avalanche-decision-frameworks",
        sections: [
            ExploreSection(
                id: "decision-frameworks-1",
                heading: "The Obvious Clues Method",
                body: "Bruce Tremper's Obvious Clues method is designed for the 90% of situations where the answer should be straightforward. Before any detailed snowpack analysis, look for obvious red flags: recent avalanche activity on similar slopes, cracking or collapsing of the snowpack underfoot (whumpfing), heavy recent loading from snow or wind, and a danger rating of Considerable or higher. Any single obvious clue is sufficient reason to avoid avalanche terrain. The power of this method is its simplicity: it short-circuits the complex analysis that creates opportunities for rationalization and heuristic traps. Most avalanche fatalities occur on days when obvious clues were present and ignored.",
                diagram: nil,
                keyFacts: [
                    "Recent avalanche activity on similar aspects and elevations is the strongest clue",
                    "Whumpfing (collapsing) indicates a reactive weak layer across a wide area",
                    "Any single obvious clue is sufficient reason to avoid avalanche terrain",
                    "Most fatalities occur when obvious clues were present but rationalized away",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "decision-frameworks-2",
                heading: "Avalanche Terrain Exposure Scale (ATES)",
                body: "The ATES classifies terrain into simple, challenging, and complex categories based on slope angle, terrain traps, route options, and consequences of being caught. Simple terrain has slopes under 30 degrees with no overhead hazard. Challenging terrain has well-defined avalanche paths with options to reduce exposure. Complex terrain has multiple overlapping avalanche paths, severe terrain traps, and limited options for risk reduction. Matching your terrain choice to the current danger rating is one of the most effective decision tools available. At Considerable danger, restrict travel to simple terrain. At High, avoid avalanche terrain entirely.",
                diagram: nil,
                keyFacts: [
                    "Simple terrain: slopes under 30 degrees, no overhead avalanche hazard",
                    "Challenging terrain: defined paths with options to reduce exposure",
                    "Complex terrain: overlapping paths, severe traps, limited escape options",
                    "Match terrain choice to the current avalanche danger rating",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "decision-frameworks-3",
                heading: "The Continuous Assessment Approach",
                body: "Good avalanche decision-making is not a single choice at the trailhead. It is a continuous process of gathering evidence, updating your assessment, and adjusting your plans as conditions reveal themselves. Start with the regional avalanche bulletin the night before. Observe conditions during the approach: wind direction, recent loading, temperature trends, and signs of instability. At each decision point, ask whether the evidence supports continuing or whether it is time to modify your route. The best practitioners make many small conservative decisions throughout the day rather than one big bold decision at the top of a slope. Each observation is a data point, and the goal is to build a preponderance of evidence, not to find a single reason to go.",
                diagram: nil,
                keyFacts: [
                    "Decision-making is a continuous process, not a single trailhead choice",
                    "Start with the regional avalanche bulletin the night before",
                    "Build a preponderance of evidence from multiple observations",
                    "The best practitioners make many small conservative decisions all day",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "avalanche-human-factors",
            "avalanche-terrain-traps",
            "avalanche-triangle-overview",
        ],
        relatedModules: [
            "decision-framework",
            "human-factors",
            "terrain-traps",
        ]
    )

    // MARK: - 10. Companion Rescue

    static let companionRescue = ExploreArticle(
        id: "avalanche-companion-rescue",
        domain: .avalanche,
        title: "Companion Rescue",
        summary: "When an avalanche buries a partner, organized rescue by the surviving group members is the only realistic chance of a live recovery. Professional rescue takes too long. The survival window is brutally short, and every second of practice before the event translates directly into lives saved.",
        icon: "figure.run",
        heroImageName: "Photos/Heroes/hero-avalanche-companion-rescue",
        sections: [
            ExploreSection(
                id: "companion-rescue-1",
                heading: "The Survival Curve",
                body: "The avalanche survival curve is an unforgiving clock. Approximately 93% of fully buried victims are alive at the moment of burial, but survival drops precipitously with time. If a victim has an air pocket, survival remains above 90% for roughly the first 15 minutes. Between 15 and 35 minutes, the survival rate drops sharply as carbon dioxide builds in the air pocket. After 35 minutes, the survival rate plateaus around 27% as victims with adequate air pockets may survive longer, but those without have already suffocated. Professional rescue teams typically arrive in 45 minutes to 2 hours. The math is unambiguous: companion rescue within the first 15 minutes is the victim's only realistic chance.",
                diagram: ExploreDiagram(
                    type: .timeline,
                    config: DiagramConfig(
                        segments: [
                            DiagramSegment(id: "phase-1", label: "0-15 min", value: 0.93, description: "~93% survival with air pocket", color: "22C55E"),
                            DiagramSegment(id: "phase-2", label: "15-35 min", value: 0.34, description: "Rapid decline from CO2 buildup", color: "F59E0B"),
                            DiagramSegment(id: "phase-3", label: "35-90 min", value: 0.27, description: "Plateau: survivors have air pockets", color: "EF4444"),
                            DiagramSegment(id: "phase-4", label: "90+ min", value: 0.05, description: "Hypothermia and suffocation", color: "7F1D1D"),
                        ]
                    )
                ),
                keyFacts: [
                    "93% of fully buried victims are alive at the moment of burial",
                    "Survival drops sharply between 15 and 35 minutes due to CO2 buildup",
                    "Average professional rescue arrival: 45 minutes to 2 hours",
                    "Companion rescue within 15 minutes provides the best survival odds",
                ],
                warningNote: "The 15-minute window is not negotiable. Every minute spent fumbling with an unfamiliar transceiver or disorganized probe line is a minute your partner is suffocating. Practice until the sequence is automatic."
            ),
            ExploreSection(
                id: "companion-rescue-2",
                heading: "Transceiver, Probe, Shovel: The Sequence",
                body: "Companion rescue follows a strict sequence that must be practiced until it is automatic. First, switch your transceiver to search mode and begin a systematic signal search pattern, moving quickly across the debris. As the signal strengthens, narrow your search using the transceiver's distance and directional indicators. When the transceiver reads 3 meters or less, switch to a fine search by lowering the transceiver to the snow surface and moving in a cross pattern to find the minimum distance reading. At the minimum, begin probing in a spiral pattern from the center outward. When you get a positive probe strike, leave the probe in place and begin strategic shoveling from the downhill side, creating a ramp rather than digging a vertical hole. A vertical hole is slower and risks collapsing onto the victim.",
                imageName: "Photos/avalanche-transceiver-search",
                imageCaption: "Transceiver search pattern in debris field",
                diagram: nil,
                keyFacts: [
                    "Signal search: move quickly across the debris field following the transceiver signal",
                    "Fine search: lower transceiver to surface, find minimum distance reading",
                    "Probe: spiral pattern from the minimum reading outward",
                    "Shovel: approach from downhill, create a ramp, never dig a vertical hole",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "companion-rescue-3",
                heading: "Strategic Shoveling",
                body: "Shoveling accounts for the majority of time in a companion rescue, and poor technique is the most common reason rescue takes too long. Research shows that the V-shaped conveyor method reduces exhumation time by up to 40% compared to unstructured digging. Start your hole 1.5 times the burial depth downhill from the probe strike. If the burial depth is 1 meter, start 1.5 meters downhill. Multiple rescuers should line up in a V formation, with the lead digger breaking snow and passing it backward to secondary shovelers who move it out of the hole. Rotate the lead digger every 2 minutes to prevent exhaustion. This is the single most trainable skill in avalanche rescue, and the one where practice yields the greatest time savings.",
                diagram: nil,
                keyFacts: [
                    "Shoveling is the most time-consuming phase of companion rescue",
                    "V-shaped conveyor method reduces exhumation time by up to 40%",
                    "Start digging 1.5x the burial depth downhill from the probe strike",
                    "Rotate the lead digger every 2 minutes to maintain speed",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "companion-rescue-4",
                heading: "Multiple Burials and Triage",
                body: "Multiple burial scenarios are the most challenging and stressful companion rescue situations. Modern digital transceivers can display multiple signals and allow you to flag or suppress found signals to search for additional victims. The triage principle is the same as in any mass casualty event: locate all victims first before committing all resources to exhuming a single deep burial. A shallow burial with a visible clue can be cleared quickly, freeing a rescuer to help with a deeper burial. Assign clear roles immediately: one person searches, others probe and shovel. In a group of four with two buried, the two remaining rescuers must work with extraordinary efficiency and composure. Practice multiple burial scenarios regularly, because the stress of a real event degrades performance by roughly 50%.",
                diagram: nil,
                keyFacts: [
                    "Modern transceivers can display and manage multiple simultaneous signals",
                    "Triage: locate all victims before fully committing to one deep burial",
                    "Assign clear roles immediately to avoid confusion and duplication",
                    "Stress degrades rescue performance by approximately 50% vs. practice conditions",
                ],
                warningNote: "In a real multiple burial, you will be terrified, exhausted, and potentially injured. Your rescue performance will be roughly half of what it is in practice. Train twice as hard as you think you need to."
            ),
        ],
        relatedArticles: [
            "avalanche-human-factors",
            "avalanche-decision-frameworks",
            "avalanche-terrain-traps",
        ],
        relatedModules: [
            "companion-rescue",
            "human-factors",
            "decision-framework",
        ]
    )
}
