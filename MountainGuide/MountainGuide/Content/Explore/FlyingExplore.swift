import Foundation

enum FlyingExplore {

    // MARK: - All Flying Explore Articles

    static let articles: [ExploreArticle] = [
        soaringFundamentals,
        thermalStructureAndEntry,
        skyReading,
        centeringTechnique,
        climbingToCloudbase,
        valleyFlyingTactics,
        speedToFlyTheory,
        xcPlanning,
        convergenceAndSeaBreeze,
        glideManagement
    ]

    // MARK: - 1. Soaring Fundamentals

    static let soaringFundamentals = ExploreArticle(
        id: "flying-soaring-fundamentals",
        domain: .flying,
        title: "Soaring Fundamentals",
        summary: "The core principles of unpowered flight: how gliders stay aloft by harvesting energy from the atmosphere rather than an engine.",
        icon: "wind",
        heroImageName: "Photos/Heroes/hero-flying-soaring",
        sections: [
            ExploreSection(
                id: "soaring-fund-1",
                heading: "The Energy Equation",
                body: "A glider is always descending relative to the air mass it flies in. The polar curve describes this reality: for every airspeed there is a corresponding sink rate, and no wing design escapes it. Soaring becomes possible only when the pilot finds air that rises faster than the glider sinks. The art of cross-country flight is therefore not about defying gravity but about finding and exploiting those invisible columns, bands, and waves of ascending air that the atmosphere continuously produces.",
                diagram: nil,
                keyFacts: [
                    "A paraglider's minimum sink rate is typically 1.0-1.2 m/s",
                    "Thermals regularly produce 2-5 m/s of lift, easily exceeding glider sink",
                    "Best glide speed increases in headwinds and decreases in tailwinds",
                    "The polar curve is the single most important performance reference"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "soaring-fund-2",
                heading: "Three Sources of Lift",
                body: "Thermal lift is the most common and versatile source: sun-heated ground warms air parcels that eventually detach and rise as buoyant columns. Ridge lift occurs when horizontal wind strikes a slope and is deflected upward, creating a band of lift along the windward face. Wave lift, the rarest and most powerful, forms in the lee of mountain ranges when stable air oscillates in standing waves that can reach the stratosphere. Most cross-country flights rely primarily on thermals, but skilled pilots exploit all three sources depending on the terrain, wind, and time of day.",
                imageName: "Photos/flying-three-lift-sources",
                imageCaption: "Three sources of soaring lift: thermal, ridge, and wave",
                diagram: nil,
                keyFacts: [
                    "Thermals: buoyant rising air from solar heating, usable from late morning to late afternoon",
                    "Ridge lift: wind deflected upward by terrain, reliable but altitude-limited",
                    "Wave lift: standing oscillations in stable air, can exceed 10 m/s to extreme altitudes"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "soaring-fund-3",
                heading: "The Thermal Day",
                body: "A classic soaring day follows a predictable arc. Morning inversion suppresses convection until the sun heats the ground enough to break through, typically between 10:00 and 11:00 local time. Thermals strengthen through midday, reaching peak intensity and height between 13:00 and 15:00. As the sun angle drops in late afternoon, thermals weaken, become broken, and eventually cease. Understanding this daily cycle is essential for flight planning: launch timing, task declarations, and final glide calculations all depend on where you are in the thermal day.",
                diagram: nil,
                keyFacts: [
                    "Morning inversion usually breaks between 10:00-11:00 local solar time",
                    "Peak thermal activity occurs between 13:00-15:00",
                    "Late afternoon thermals are weaker, narrower, and more turbulent",
                    "The usable soaring window is typically 4-6 hours on a good day"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["flying-thermal-structure", "flying-sky-reading", "flying-speed-to-fly"],
        relatedModules: ["soaring-fundamentals", "reading-sky"]
    )

    // MARK: - 2. Thermal Structure & Entry

    static let thermalStructureAndEntry = ExploreArticle(
        id: "flying-thermal-structure",
        domain: .flying,
        title: "Thermal Structure & Entry",
        summary: "What a thermal actually looks like from the inside, how it forms, and how to transition from straight flight into a centered climb.",
        icon: "arrow.up.circle",
        heroImageName: "Photos/Heroes/hero-flying-thermal-structure",
        sections: [
            ExploreSection(
                id: "thermal-struct-1",
                heading: "Anatomy of a Thermal",
                body: "A thermal is not a smooth, uniform column. Research and pilot experience reveal a structure closer to a rising bubble or plume with a toroidal (doughnut-shaped) circulation at its top. The strongest lift is found in the core, which may be only 50-100 meters in diameter even when the overall thermal is much wider. Surrounding the core is a zone of weaker lift that gradually transitions into sink at the edges. As the thermal rises it entrains surrounding air, which cools the edges and creates the turbulence pilots feel when entering from outside.",
                diagram: ExploreDiagram(
                    type: .crossSection,
                    config: DiagramConfig(
                        profilePoints: [
                            DiagramPoint(x: 0.0, y: 0.5),
                            DiagramPoint(x: 0.15, y: 0.5),
                            DiagramPoint(x: 0.25, y: 0.45),
                            DiagramPoint(x: 0.35, y: 0.3),
                            DiagramPoint(x: 0.5, y: 0.15),
                            DiagramPoint(x: 0.65, y: 0.3),
                            DiagramPoint(x: 0.75, y: 0.45),
                            DiagramPoint(x: 0.85, y: 0.5),
                            DiagramPoint(x: 1.0, y: 0.5)
                        ],
                        overlayType: "zones",
                        labels: ["Sink", "Weak lift", "Core", "Weak lift", "Sink"],
                        colors: ["EF4444", "F59E0B", "22C55E", "F59E0B", "EF4444"],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "Thermal cores are typically 50-100m in diameter",
                    "Surrounding the core is a gradient from weak lift to sink",
                    "The thermal boundary is marked by turbulence from entrainment",
                    "Thermals lean with wind: the top is downwind of the base"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "thermal-struct-2",
                heading: "Trigger Points and Thermal Streets",
                body: "Thermals do not release randomly. They tend to detach from specific ground features that heat faster than their surroundings: plowed fields, dark rock faces, parking lots, south-facing slopes, and transitions between different land types. These trigger points become reliable thermal sources that experienced local pilots memorize. When the wind is moderate and consistent, thermals can align into thermal streets: parallel rows of rising air connected by a band of weak lift at their tops. Flying along a thermal street allows sustained climbs with minimal circling.",
                imageName: "Photos/flying-thermal-street",
                imageCaption: "Thermal street marked by aligned cumulus clouds over open terrain",
                diagram: nil,
                keyFacts: [
                    "Dark surfaces, dry fields, and rock faces are common trigger points",
                    "The same trigger point often produces thermals repeatedly throughout the day",
                    "Thermal streets form in moderate, steady winds aligned with the thermal drift",
                    "Streets are visible when cumulus clouds line up in parallel rows"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "thermal-struct-3",
                heading: "The Entry Technique",
                body: "Approaching a thermal requires discipline. Fly toward the suspected lift source at best glide speed and remain alert for asymmetric wing loading. When one wing rises, it indicates the thermal core is on that side. The correct response is immediate: turn toward the rising wing with 30-40 degrees of bank. Hesitation is the most common beginner error because the window of usable lift is narrow, and flying straight through it means exiting into sink before a turn can be established. A tangential entry, approaching the thermal edge at an angle rather than head-on, gives more time to feel the lift gradient and commit to the correct turn direction.",
                imageName: "Photos/flying-paraglider-thermal",
                imageCaption: "Paraglider thermalling above a mountain valley",
                animationName: "anim-thermal-entry",
                diagram: nil,
                keyFacts: [
                    "Always enter tangentially, never head-on through the center",
                    "Turn toward the wing that lifts: lift on right wing means turn right",
                    "Commit to 30-40 degrees bank immediately upon feeling lift",
                    "Hesitation is the number one entry error for developing pilots"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["flying-centering-technique", "flying-soaring-fundamentals", "flying-climbing-cloudbase"],
        relatedModules: ["thermal-entry", "centering", "soaring-fundamentals"]
    )

    // MARK: - 3. Sky Reading

    static let skyReading = ExploreArticle(
        id: "flying-sky-reading",
        domain: .flying,
        title: "Reading the Sky",
        summary: "Interpreting cloud formations, haze patterns, and atmospheric signs to locate lift and anticipate changing conditions before instruments confirm them.",
        icon: "cloud.sun",
        heroImageName: "Photos/Heroes/hero-flying-sky-reading",
        sections: [
            ExploreSection(
                id: "sky-read-1",
                heading: "Cumulus as Thermal Markers",
                body: "Fair-weather cumulus clouds are the pilot's best friends. Each one marks the top of an active thermal where rising air has cooled to its dew point and condensed into visible moisture. The cloud's lifecycle tells you about the thermal beneath it. A sharp, cauliflower-edged cumulus with a flat base is actively fed by a strong thermal. A wispy, dissolving cloud signals a thermal that has already died. Between these extremes, pilots learn to read the stages: forming, mature, decaying. The goal is always to arrive under a cloud in its early mature phase, when the thermal feeding it is strongest.",
                imageName: "Photos/flying-cumulus-markers",
                imageCaption: "Fair-weather cumulus clouds marking active thermals at various lifecycle stages",
                diagram: nil,
                keyFacts: [
                    "Flat cloud base = condensation level, consistent across a region",
                    "Hard, crisp edges indicate an active, feeding thermal below",
                    "Wispy, thinning edges mean the thermal has stopped or weakened",
                    "Dark, flat cloud bases suggest strong updraft and good lift underneath"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "sky-read-2",
                heading: "Blue Thermals and Haze Domes",
                body: "On drier days, thermals may not produce visible clouds at all. These blue thermals are invisible, but not undetectable. Haze provides a critical clue: rising thermals carry dust, pollen, and moisture upward, creating subtle domes or columns of slightly hazier air against the clearer background. Experienced pilots scan the sky at shallow angles where haze layers are most visible. Circling birds, especially raptors with their exquisite thermal sensitivity, are another reliable indicator. Even insects carried aloft in thermal cores can mark lift, though they are obviously harder to spot at distance.",
                imageName: "Photos/flying-blue-thermal-haze",
                imageCaption: "Subtle haze dome visible against clear sky indicating a blue thermal",
                diagram: nil,
                keyFacts: [
                    "Blue thermals are common in dry or desert conditions",
                    "Haze domes form where thermals push particulates upward",
                    "Circling birds (eagles, hawks, vultures) reliably mark thermal cores",
                    "On blue days, ground features become the primary thermal predictor"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "sky-read-3",
                heading: "Overdevelopment and Spread-Out",
                body: "Not all cumulus growth is welcome. When clouds grow vertically beyond their flat bases into towering cumulus or cumulonimbus, the atmosphere is becoming unstable enough to produce dangerous convective weather. Spread-out occurs when cumulus clouds merge into an overcast layer that blocks the sun, shutting down thermal production beneath. Both conditions require the pilot to recognize warning signs early: rapidly growing vertical development, darkening cloud bases, or a sky that is filling in rather than showing distinct individual thermals. A sky transitioning from well-spaced cumulus to a grey sheet overhead means the soaring day is ending.",
                diagram: nil,
                keyFacts: nil,
                warningNote: "Towering cumulus and cumulonimbus produce severe turbulence, hail, lightning, and extreme updrafts/downdrafts. Never fly near or under overdeveloping clouds. Begin your retreat to landing options well before thunderstorm maturity."
            ),
            ExploreSection(
                id: "sky-read-4",
                heading: "Wind Indicators in the Sky",
                body: "Cloud movement reveals wind speed and direction at altitude, which often differs significantly from surface wind. High cirrus streaks show upper-level flow. Cumulus drift indicates the wind at thermal top altitude, which determines how thermals lean and where you should expect to find lift relative to the trigger point on the ground. Watching multiple cloud layers simultaneously gives you a three-dimensional picture of the wind field. When upper and lower clouds move in different directions, wind shear is present, and thermals passing through the shear layer will be broken and turbulent.",
                diagram: nil,
                keyFacts: [
                    "Cumulus drift direction shows wind at condensation level",
                    "Thermals lean downwind: the top is displaced from the ground trigger",
                    "Contrasting cloud layer movement indicates wind shear",
                    "Lenticular clouds signal mountain wave activity regardless of other conditions"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["flying-soaring-fundamentals", "flying-climbing-cloudbase", "flying-convergence-sea-breeze"],
        relatedModules: ["reading-sky", "soaring-fundamentals", "convergence-sea-breeze"]
    )

    // MARK: - 4. Centering Technique

    static let centeringTechnique = ExploreArticle(
        id: "flying-centering-technique",
        domain: .flying,
        title: "Centering Technique",
        summary: "The skill of adjusting your circle to find and stay in the strongest part of a thermal, maximizing climb rate and minimizing wasted altitude.",
        icon: "scope",
        heroImageName: "Photos/Heroes/hero-flying-centering",
        sections: [
            ExploreSection(
                id: "centering-1",
                heading: "The Basic Centering Rule",
                body: "Centering a thermal follows one simple principle: when your vario shows increasing lift, straighten up slightly to shift your circle toward the stronger air; when lift decreases, tighten your turn to move the circle center away from the weaker side. In practice, this means you are constantly making small corrections to your bank angle throughout each revolution. The strongest lift is rarely at the center of your first circle. It takes two or three orbits of deliberate adjustment to migrate your circle into the core. Patience and smooth control inputs matter more than aggressive maneuvering.",
                animationName: "anim-thermal-entry",
                diagram: nil,
                keyFacts: [
                    "Stronger lift: widen the turn (reduce bank) to shift circle toward it",
                    "Weaker lift: tighten the turn (increase bank) to shift away from it",
                    "Expect 2-3 orbits to center properly in a new thermal",
                    "Smooth, continuous adjustments outperform jerky corrections"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "centering-2",
                heading: "Reading the Vario Lag",
                body: "Varios have inherent lag, typically 1-3 seconds for mechanical instruments and less for electronic ones with speed-to-fly compensation. This lag means the vario is always telling you what the air was doing a moment ago, not what it is doing right now. Skilled pilots compensate by anticipating: they note the compass heading where lift peaks on each orbit and begin their correction before the vario confirms the next peak. Developing this internal model of where the core is, updating it every revolution, is what separates adequate climbers from efficient ones. Some pilots use audio vario tone variation as the primary centering input because the ear detects changes faster than the eye can read a needle.",
                diagram: nil,
                keyFacts: [
                    "Mechanical varios lag 1-3 seconds; electronic varios are faster",
                    "Note compass heading at peak lift each orbit to build a mental model",
                    "Audio vario tones provide faster feedback than visual instruments",
                    "Anticipate corrections based on pattern, do not wait for vario confirmation"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "centering-3",
                heading: "Bank Angle and Circle Size",
                body: "The ideal bank angle balances two competing demands. A steeper bank produces a tighter circle, which keeps you closer to the narrow core but also increases your sink rate due to higher wing loading. A shallower bank gives a wider circle with lower sink rate but may extend beyond the core into weaker lift. In strong, narrow thermals, 35-45 degrees of bank is appropriate. In wide, gentle thermals, 20-30 degrees works better. As you climb higher and the thermal broadens, you can often relax the bank angle progressively. The correct bank is whatever produces the highest sustained vario reading through a full orbit.",
                diagram: nil,
                keyFacts: [
                    "Strong narrow thermals: 35-45 degrees bank angle",
                    "Wide gentle thermals: 20-30 degrees bank angle",
                    "Steeper bank = tighter circle but higher sink rate",
                    "Thermals widen with altitude, allowing progressively shallower bank"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["flying-thermal-structure", "flying-climbing-cloudbase", "flying-glide-management"],
        relatedModules: ["centering", "thermal-entry", "climbing"]
    )

    // MARK: - 5. Climbing to Cloudbase

    static let climbingToCloudbase = ExploreArticle(
        id: "flying-climbing-cloudbase",
        domain: .flying,
        title: "Climbing to Cloudbase",
        summary: "How thermals behave as they approach condensation level, the risks of cloud suck, and strategies for maximizing altitude safely.",
        icon: "arrow.up.to.line",
        heroImageName: "Photos/Heroes/hero-flying-cloudbase",
        sections: [
            ExploreSection(
                id: "cloudbase-1",
                heading: "The Approach to Condensation Level",
                body: "As a thermal rises and cools adiabatically, it approaches the dew point temperature at a predictable altitude: the condensation level, visible as the flat base of cumulus clouds. In the final few hundred meters below cloudbase, the thermal often accelerates because the latent heat released by condensation adds buoyancy to the already rising air. This acceleration zone is where climb rates peak, sometimes doubling from the values at mid-altitude. Pilots who leave thermals too early to avoid clouds sacrifice significant altitude that could extend their glide range dramatically.",
                diagram: nil,
                keyFacts: [
                    "Condensation level = flat cloud base, consistent over a wide area",
                    "Latent heat release accelerates thermals near cloudbase",
                    "Peak climb rates often occur in the last 200-300m below cloudbase",
                    "Cloudbase height is predictable from surface temperature and dew point spread"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "cloudbase-2",
                heading: "Cloud Suck and Overconvection",
                body: "When convection is strong and the atmosphere is deeply unstable, the updraft beneath and inside a cumulus cloud can become powerful enough to draw a pilot into the cloud involuntarily. This phenomenon, known as cloud suck, is one of the most dangerous situations in soaring. Inside a cloud, the pilot loses visual references, spatial orientation, and the ability to see other traffic or terrain. Climb rates can exceed the glider's maximum descent capability, making escape difficult. The updraft inside an active cumulus can reach 10-15 m/s or more, and the associated turbulence can cause collapses and loss of control.",
                diagram: nil,
                keyFacts: nil,
                warningNote: "Cloud suck is a life-threatening hazard. If you feel acceleration increasing rapidly near cloudbase, leave the thermal immediately by turning away from the cloud, applying speed bar, and flying toward clear air. Never attempt to climb into or through a cloud. Pilots have been carried to altitudes above 9,000m inside cumulonimbus clouds, resulting in hypoxia, hypothermia, and fatal outcomes."
            ),
            ExploreSection(
                id: "cloudbase-3",
                heading: "Working the Top of the Climb",
                body: "As you approach cloudbase, the thermal core often becomes wider and more uniform, allowing you to relax your bank angle and still maintain excellent climb rates. The challenge is knowing when to stop climbing and transition. On cross-country flights, the decision to leave a thermal depends on your task: if cloudbase gives you enough altitude to reach the next reliable thermal source, stop climbing and go. Topping out every thermal to absolute cloudbase wastes time when you could be making distance. On weak or late-day flights, however, every meter of altitude is precious and the calculation reverses: climb as high as you safely can before committing to the glide.",
                diagram: nil,
                keyFacts: [
                    "Thermals often widen near cloudbase, allowing shallower bank angles",
                    "Leave thermals when you have enough altitude to reach the next thermal",
                    "On strong days, leaving early to cover ground is faster than topping out",
                    "On weak days, maximize every climb before transitioning"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["flying-thermal-structure", "flying-centering-technique", "flying-glide-management"],
        relatedModules: ["climbing", "centering", "between-thermals"]
    )

    // MARK: - 6. Valley Flying Tactics

    static let valleyFlyingTactics = ExploreArticle(
        id: "flying-valley-flying",
        domain: .flying,
        title: "Valley Flying Tactics",
        summary: "Navigating the complex wind and thermal patterns created by mountain terrain: valley breezes, slope winds, convergence lines, and the unique challenges of flying between ridges.",
        icon: "mountain.2",
        heroImageName: "Photos/Heroes/hero-flying-valley-tactics",
        sections: [
            ExploreSection(
                id: "valley-1",
                heading: "The Valley Wind System",
                body: "Mountain valleys develop their own predictable wind circulation independent of the synoptic (large-scale) weather. In the morning, sun-heated slopes create anabatic winds that flow uphill, drawing air up from the valley floor. This drives a compensating valley breeze that flows up the main valley axis from the plains toward the mountains. In the afternoon, the system reverses: cooling slopes produce katabatic (downhill) flow. This diurnal cycle means that thermal sources, wind direction, and the best flying routes change throughout the day in a predictable pattern that experienced mountain pilots internalize.",
                imageName: "Photos/flying-valley-overview",
                imageCaption: "Valley overview from a flying perspective",
                diagram: nil,
                keyFacts: [
                    "Morning: anabatic (upslope) winds and up-valley breeze develop",
                    "Afternoon: system reaches peak intensity around 14:00-15:00",
                    "Evening: katabatic (downslope) winds and down-valley flow begin",
                    "The valley breeze can reach 15-25 km/h in well-defined valleys"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "valley-2",
                heading: "Working the Sunny Side",
                body: "In valley flying, the sun-exposed slope is where the action is. South-facing slopes (in the Northern Hemisphere) receive maximum solar heating and produce the strongest thermals and anabatic lift. As the day progresses and the sun angle changes, the active side shifts: east-facing slopes are best in the morning, south-facing slopes dominate midday, and west-facing slopes come alive in the afternoon. Skilled valley pilots plan their routes to always be working the currently active slope, crossing the valley to follow the sun. This means your track over the ground may zigzag between valley walls rather than following a straight line down the center.",
                imageName: "Photos/flying-sunny-slope",
                imageCaption: "Sun-exposed valley slope generating anabatic lift in the afternoon",
                diagram: nil,
                keyFacts: [
                    "Morning: work east-facing slopes for earliest thermal activity",
                    "Midday: south-facing slopes are strongest",
                    "Afternoon: west-facing slopes catch the late sun",
                    "Never fly the center of a valley: lift is always near the slopes"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "valley-3",
                heading: "Terrain Traps and Low Save",
                body: "The greatest danger in valley flying is getting low between high ridges with no landable fields. Valley floors are often narrow, forested, or built up. Once below ridge height, your glide options become severely limited and you are committed to finding lift or executing a difficult outlanding. The rule is simple: never fly deeper into a valley than you can glide back out of. Maintain enough altitude to reach either a known landing option or to cross back to the main valley. When low, hug the sun-warmed slope closely, flying slowly in any available anabatic flow, and be prepared to commit to a landing field early rather than pushing into a dead-end valley.",
                diagram: nil,
                keyFacts: nil,
                warningNote: "Valley terrain traps are a leading cause of serious soaring accidents. Always maintain glide to a safe landing option. Never continue into a narrowing valley below ridge height. Commit to an outlanding early rather than attempting a low save in hostile terrain."
            )
        ],
        relatedArticles: ["flying-soaring-fundamentals", "flying-glide-management", "flying-xc-planning"],
        relatedModules: ["valley-flying", "between-thermals", "xc-tactics"]
    )

    // MARK: - 7. Speed-to-Fly Theory

    static let speedToFlyTheory = ExploreArticle(
        id: "flying-speed-to-fly",
        domain: .flying,
        title: "Speed-to-Fly Theory",
        summary: "The MacCready framework for choosing optimal inter-thermal cruise speed: flying faster in sink, slower in lift, and adjusting for expected climb rates.",
        icon: "speedometer",
        heroImageName: "Photos/Heroes/hero-flying-speed-to-fly",
        sections: [
            ExploreSection(
                id: "stf-1",
                heading: "The MacCready Ring",
                body: "Paul MacCready's elegant insight was that the optimal speed between thermals depends on the strength of the next thermal you expect to find. If you expect strong climbs ahead, you should fly faster between thermals, accepting a higher sink rate in exchange for covering ground quickly to reach the next climb sooner. If thermals are weak, you should fly more slowly to conserve altitude. The MacCready ring, a rotating bezel on the variometer, solves this optimization graphically by drawing a tangent line from the expected climb rate to the glider's polar curve. The point where this tangent touches the polar gives the optimal inter-thermal speed.",
                diagram: nil,
                keyFacts: [
                    "Higher MacCready setting = faster cruise, accepts more sink between thermals",
                    "Lower MacCready setting = slower cruise, conserves altitude",
                    "The optimal setting equals the expected average climb rate of the next thermal",
                    "Flying too slow wastes time; flying too fast wastes altitude"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "stf-2",
                heading: "Speed-to-Fly in Practice",
                body: "The textbook MacCready speed assumes you fly through uniform air between thermals, but real air is anything but uniform. You encounter patches of lift and sink. The practical rule is: speed up in sink and slow down in lift. When you fly through a sinking air mass, increasing speed minimizes the time you spend losing altitude in that bad air. When you encounter lift between thermals, slowing down lets you gain free altitude without circling. Electronic varios with speed-to-fly directors automate this calculation, showing a command bar that tells you to push or pull relative to current conditions. The pilot's job becomes following the director while also making strategic decisions about whether to stop and circle.",
                imageName: "Photos/flying-speed-bar-cockpit",
                imageCaption: "Paraglider cockpit showing speed bar and vario during inter-thermal cruise",
                diagram: nil,
                keyFacts: [
                    "Speed up in sink to minimize time in descending air",
                    "Slow down in lift to gain altitude without circling",
                    "Electronic speed-to-fly directors provide real-time airspeed commands",
                    "The 'dolphin' technique: undulating speed through mixed air without circling"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "stf-3",
                heading: "When Theory Breaks Down",
                body: "MacCready theory assumes perfect information about future thermals, which no pilot has. Setting the ring too high makes you fast but you may arrive at your next thermal too low to connect with it. Setting it too low keeps you high but slow, wasting the best soaring hours. Experienced pilots adjust their MacCready setting dynamically based on terrain, time of day, cloud development, and their confidence in finding the next thermal. Early in the day when thermals are uncertain, fly conservatively. At peak thermal time with cumulus clouds marking lift everywhere, be aggressive. Late in the day as conditions decay, drop the MacCready back down and prioritize altitude over speed.",
                diagram: nil,
                keyFacts: [
                    "Reduce MacCready when thermals are uncertain or weakening",
                    "Increase MacCready during peak conditions with reliable cloud markers",
                    "Arriving too low at the next thermal negates the time saved by flying fast",
                    "Dynamic MacCready adjustment is a core cross-country skill"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["flying-glide-management", "flying-xc-planning", "flying-soaring-fundamentals"],
        relatedModules: ["speed-to-fly", "between-thermals", "xc-tactics"]
    )

    // MARK: - 8. XC Planning

    static let xcPlanning = ExploreArticle(
        id: "flying-xc-planning",
        domain: .flying,
        title: "Cross-Country Planning",
        summary: "Strategic planning for cross-country flights: weather analysis, route selection, turnpoint tactics, and the decision framework that transforms a local soaring flight into a distance task.",
        icon: "map",
        heroImageName: "Photos/Heroes/hero-flying-xc-planning",
        sections: [
            ExploreSection(
                id: "xc-1",
                heading: "Pre-Flight Weather Analysis",
                body: "Every serious XC flight begins hours before launch with a thorough weather assessment. Key parameters include the thermal index (trigger temperature minus forecast maximum), cloud base predictions from the Spread (temperature minus dew point times 400 feet per degree Celsius), wind at altitude for drift and ground speed calculations, and any risk of overdevelopment or spread-out. The atmospheric sounding, if available, reveals the depth of the convective boundary layer, which determines maximum thermal height. Combining these elements into a mental model of the day gives you a usable flying window, expected climb rates, and achievable task distance.",
                imageName: "Photos/flying-xc-cockpit-setup",
                imageCaption: "XC flight computer displaying thermal predictions and task overlay",
                diagram: nil,
                keyFacts: [
                    "Thermal index predicts convection onset: trigger temp minus surface temp",
                    "Cloudbase height (ft) is roughly 400 times the temperature-dew point spread in Celsius",
                    "Wind at altitude determines drift direction and ground speed on each leg",
                    "Atmospheric soundings reveal convective depth and potential overdevelopment"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "xc-2",
                heading: "Route Selection and Turnpoints",
                body: "Route selection integrates weather with terrain. The ideal XC track follows a line of reliable thermal sources: ridges, sun-facing slopes, and terrain transitions. Avoid routing over large bodies of water, dense forest, or extensive shade zones where thermals are suppressed. Turnpoints should be located near strong thermal sources so you can climb back up after making the turn at reduced altitude. On triangle tasks, plan the longest leg into the wind during the strongest part of the day so you benefit from full thermal development and make your downwind dash when thermals are still working but you have speed advantage.",
                diagram: nil,
                keyFacts: [
                    "Route along terrain that produces thermals: ridges, dark ground, slope transitions",
                    "Avoid routing over thermal-dead zones: lakes, dense forest, irrigated fields",
                    "Place turnpoints near reliable thermal sources",
                    "Fly the into-wind leg during peak thermal time"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "xc-3",
                heading: "Decision Points and Abort Criteria",
                body: "The hardest skill in XC flying is knowing when to press on and when to turn back. Establish personal minimums before launch: a minimum altitude below which you will divert to a landing field, a time beyond which you will not continue outbound, and weather conditions that trigger an immediate return. Overconfidence in weak conditions leads to stressful low saves or outlandings in hostile terrain. The best XC pilots are conservative when conditions are marginal and aggressive when conditions are booming. They also know that abandoning a task to stay safe is always the right call. No distance record is worth a dangerous situation.",
                diagram: nil,
                keyFacts: [
                    "Set personal minimum altitude for diversion before you launch",
                    "Establish a latest turnaround time based on thermal decay forecasts",
                    "Be conservative when uncertain, aggressive when conditions confirm",
                    "Outlandings happen: always have at least one reachable field in your glide cone"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["flying-speed-to-fly", "flying-valley-flying", "flying-convergence-sea-breeze"],
        relatedModules: ["xc-tactics", "speed-to-fly", "valley-flying"]
    )

    // MARK: - 9. Convergence & Sea Breeze

    static let convergenceAndSeaBreeze = ExploreArticle(
        id: "flying-convergence-sea-breeze",
        domain: .flying,
        title: "Convergence & Sea Breeze",
        summary: "How colliding air masses create powerful lines of lift, with special focus on sea breeze fronts: their formation, identification, and exploitation for cross-country soaring.",
        icon: "arrow.left.and.right",
        heroImageName: "Photos/Heroes/hero-flying-convergence",
        sections: [
            ExploreSection(
                id: "conv-1",
                heading: "Convergence Basics",
                body: "When two air masses flowing in different directions meet, the air has nowhere to go but up. This convergence creates a line or zone of lift that can extend for tens or even hundreds of kilometers. Unlike thermals, which are point sources of lift, convergence lines offer sustained lift along their entire length. A pilot who finds a convergence line can fly along it at speed, climbing continuously without circling. Convergence can form between valley breeze systems, at the boundary of different thermal regimes, or most dramatically where a sea breeze front pushes inland against the prevailing gradient wind.",
                imageName: "Photos/flying-convergence-line",
                imageCaption: "Convergence line visible as a band of vigorous cumulus stretching to the horizon",
                diagram: nil,
                keyFacts: [
                    "Convergence occurs where opposing air flows meet and force air upward",
                    "Convergence lines can extend for 50-200+ km",
                    "Lift along convergence is linear, allowing straight-line climbs without circling",
                    "Convergence zones are often marked by a line of cumulus clouds"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "conv-2",
                heading: "The Sea Breeze Front",
                body: "The sea breeze is a thermally driven circulation that develops along coastlines when the land heats faster than the water. Cool, dense marine air flows inland as a shallow wedge, pushing under the warmer continental air. The leading edge of this marine air, the sea breeze front, forces the warm air it undercuts sharply upward, creating a wall of lift. The front moves inland through the day, typically reaching 20-50 km from the coast by late afternoon depending on the strength of the onshore pressure gradient. Behind the front, marine air suppresses thermals and conditions become smooth but sinking.",
                imageName: "Photos/flying-sea-breeze-front",
                imageCaption: "Sea breeze front approaching inland, marked by a sharp cloud boundary",
                diagram: nil,
                keyFacts: [
                    "Sea breeze fronts move inland at roughly 10-30 km/h",
                    "The front is a wedge of cool marine air undercutting warm land air",
                    "Lift at the front can exceed 3-5 m/s in a narrow band",
                    "Behind the front: stable marine air with no thermals"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "conv-3",
                heading: "Identifying and Working Convergence",
                body: "Convergence lines reveal themselves through several visual cues. A distinct line of cumulus clouds, especially if they are taller or more vigorous than surrounding clouds, often marks the convergence zone. A sharp haze boundary where clear air meets hazier air can indicate a sea breeze front. Wind direction changes at the surface, detectable from smoke, flags, or windsocks, confirm the boundary. Once on a convergence line, the technique is to fly along it at moderate speed, maintaining position on the lifting side. If the line is marked by clouds, stay just on the warm side where thermals are feeding into the convergence. Drift off the line and you lose the lift entirely.",
                diagram: nil,
                keyFacts: [
                    "Look for a line of vigorous cumulus taller than surrounding clouds",
                    "Sharp haze boundaries often mark sea breeze fronts",
                    "Surface wind shifts confirm convergence position",
                    "Stay on the warm (thermal) side of the convergence for best lift"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "conv-4",
                heading: "Tactical Use in XC Flights",
                body: "Convergence lines are among the most powerful tools in cross-country soaring because they allow rapid distance covering with minimal altitude loss. When a convergence line aligns favorably with your task, you can cover its length at full speed in sustained lift, making distance that would take hours using thermal-to-thermal flying. However, convergence is not always reliable. Sea breeze fronts can stall, accelerate, or dissipate unpredictably. Valley convergences shift as the sun angle changes. The pilot must continuously assess whether the convergence remains active and have a fallback plan for when it fails. Combining convergence legs with thermal climbing at the endpoints of the line is a common XC strategy in coastal and mountainous regions.",
                diagram: nil,
                keyFacts: [
                    "Convergence lines enable high-speed distance legs with minimal circling",
                    "Sea breeze convergence timing varies: plan for 2-4 hours of usability",
                    "Combine convergence runs with thermal climbing at the ends of the line",
                    "Always have a fallback thermal plan when convergence weakens or shifts"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["flying-sky-reading", "flying-xc-planning", "flying-soaring-fundamentals"],
        relatedModules: ["convergence-sea-breeze", "xc-tactics", "reading-sky"]
    )

    // MARK: - 10. Glide Management Between Thermals

    static let glideManagement = ExploreArticle(
        id: "flying-glide-management",
        domain: .flying,
        title: "Glide Management Between Thermals",
        summary: "The art of transitioning between thermals: maintaining energy, choosing glide paths, managing risk at low altitude, and executing final glides.",
        icon: "point.topleft.down.to.point.bottomright.curvepath",
        heroImageName: "Photos/Heroes/hero-flying-glide",
        sections: [
            ExploreSection(
                id: "glide-1",
                heading: "The Glide Transition",
                body: "Leaving a thermal is a commitment. You are trading altitude, which is energy in the bank, for distance. The transition should be purposeful: point your nose at the next likely thermal source, accelerate to your MacCready speed, and fly a steady, efficient line. Resist the temptation to deviate for every bump of lift along the way unless it is strong enough to justify stopping. Each deviation adds distance and time. The dolphin technique, varying speed through rising and sinking air without circling, is the most efficient way to cross between thermals when conditions are buoyant enough to support it. In weaker conditions, a more conservative straight-line glide at lower speed preserves altitude for the critical connection to the next climb.",
                diagram: ExploreDiagram(
                    type: .forceArrows,
                    config: DiagramConfig(
                        arrows: [
                            DiagramArrow(fromX: 0.1, fromY: 0.3, toX: 0.35, toY: 0.5, label: "Glide", color: "3B82F6"),
                            DiagramArrow(fromX: 0.35, fromY: 0.5, toX: 0.35, toY: 0.2, label: "Climb", color: "22C55E"),
                            DiagramArrow(fromX: 0.35, fromY: 0.2, toX: 0.65, toY: 0.45, label: "Glide", color: "3B82F6"),
                            DiagramArrow(fromX: 0.65, fromY: 0.45, toX: 0.65, toY: 0.15, label: "Climb", color: "22C55E"),
                            DiagramArrow(fromX: 0.65, fromY: 0.15, toX: 0.9, toY: 0.4, label: "Glide", color: "3B82F6")
                        ],
                        labels: ["Thermal 1", "Thermal 2", "Goal"],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "Each glide is a deliberate trade of altitude for distance",
                    "Fly directly toward the next thermal source at MacCready speed",
                    "Dolphin flying: vary speed in lift and sink without circling",
                    "Only deviate from your line for lift stronger than your expected climb rate"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "glide-2",
                heading: "The Low Save",
                body: "Every cross-country pilot will eventually find themselves low with no obvious thermal in reach. This is the low save scenario, and survival depends on changing your priorities instantly. Stop trying to make distance. Your only goal now is to find lift. Slow down to minimum sink speed to maximize your time in the air. Head for the most promising thermal trigger within glide range: a sun-facing slope, a dark field, a ridge. Fly close to the terrain where thermals are strongest and narrowest. Accept weak lift and circle in anything positive. A one meter per second climb is salvation when you are 300 meters above the ground. Many of the best XC flights include a dramatic low save that felt like the flight was over.",
                imageName: "Photos/flying-low-save-terrain",
                imageCaption: "Pilot flying close to sun-warmed slope during a low-altitude save attempt",
                diagram: nil,
                keyFacts: [
                    "Below 300m AGL: switch entirely to survival mode",
                    "Slow to minimum sink speed to maximize remaining flight time",
                    "Target the nearest reliable thermal trigger within glide range",
                    "Accept any positive lift: even 0.5 m/s buys time to find better lift"
                ],
                warningNote: "Flying low over terrain demands constant awareness of landing options. Never continue searching for lift below the altitude where you can safely reach a landable field. Commit to an outlanding early rather than risk running out of options."
            ),
            ExploreSection(
                id: "glide-3",
                heading: "Final Glide Calculation",
                body: "The final glide is the most rewarding moment in a cross-country task: the transition from climbing to a continuous glide to goal. The calculation integrates your current altitude, the distance to goal, your glide ratio at the chosen speed, the forecast headwind or tailwind component, and a safety margin for unexpected sink. Electronic flight computers handle this math in real time, but understanding the underlying logic is essential for trusting (or overriding) the computer's recommendation. A conservative pilot adds 200-300 meters of altitude above the computed final glide altitude to account for uncertainty. Starting final glide early and arriving with speed is both faster and safer than stretching a marginal glide.",
                diagram: nil,
                keyFacts: [
                    "Final glide factors: distance, glide ratio, wind, altitude above goal, safety margin",
                    "Add 200-300m margin above computed final glide altitude",
                    "Starting slightly high and fast is better than stretching a marginal glide",
                    "Final glide into a headwind requires significantly more altitude than downwind"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["flying-speed-to-fly", "flying-centering-technique", "flying-xc-planning"],
        relatedModules: ["between-thermals", "speed-to-fly", "xc-tactics"]
    )
}
