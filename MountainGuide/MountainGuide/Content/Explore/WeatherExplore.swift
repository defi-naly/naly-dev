import Foundation

// MARK: - Weather Explore Articles
// Reference material for mountain pilots, hikers, and backcountry travelers.
// Inspired by Dennis Pagen's "Understanding the Sky."

enum WeatherExplore {

    static let articles: [ExploreArticle] = [
        atmosphereOverview,
        pressureSystems,
        frontsOverview,
        cloudTypes,
        thermalsAndConvection,
        lapseRatesAndStability,
        mountainWinds,
        mountainWaves,
        convergence,
        thunderstormSafety
    ]

    // MARK: - 1. Atmosphere Overview

    static let atmosphereOverview = ExploreArticle(
        id: "weather-atmosphere-overview",
        domain: .weather,
        title: "The Atmosphere: Our Ocean of Air",
        summary: "The structure, composition, and behavior of the atmosphere from the ground up. Understanding this invisible ocean is the foundation of all weather knowledge.",
        icon: "globe.americas.fill",
        heroImageName: "Photos/Heroes/hero-weather-atmosphere",
        sections: [
            ExploreSection(
                id: "atmosphere-structure",
                heading: "Layers of the Atmosphere",
                body: "The atmosphere is not a uniform blanket of air but a layered structure, each layer with distinct characteristics that matter for anyone operating in the mountains. The troposphere, where all weather occurs, extends from the surface to roughly 36,000 feet at mid-latitudes, though this height varies with season and latitude. Almost all the moisture, clouds, and turbulence that concern us are confined to this lowest layer. Above it sits the stratosphere, remarkably stable and dry, which acts as a lid on the weather systems below. The tropopause, the boundary between these two layers, is a critical ceiling that even the most powerful thunderstorms struggle to penetrate.",
                imageName: "Photos/weather-atmosphere-layers",
                imageCaption: "Earth's atmospheric layers viewed from high altitude",
                animationName: "anim-cloud-formation",
                diagram: ExploreDiagram(
                    type: .layeredStack,
                    config: DiagramConfig(
                        layers: [
                            DiagramLayer(id: "thermo", name: "Thermosphere", color: "#1a1a2e", heightRatio: 0.15, description: "80+ km — extremely thin air, auroras"),
                            DiagramLayer(id: "meso", name: "Mesosphere", color: "#16213e", heightRatio: 0.15, description: "50–80 km — coldest layer, meteors burn up"),
                            DiagramLayer(id: "strato", name: "Stratosphere", color: "#0f3460", heightRatio: 0.25, description: "12–50 km — ozone layer, stable, dry"),
                            DiagramLayer(id: "tropo", name: "Troposphere", color: "#533483", heightRatio: 0.45, description: "0–12 km — all weather happens here")
                        ],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "The troposphere contains 75% of the atmosphere's mass and virtually all its water vapor",
                    "Air pressure at sea level is approximately 1013.25 hPa (29.92 inHg)",
                    "Temperature decreases with altitude at roughly 2 degrees C per 1,000 feet in the standard atmosphere",
                    "The tropopause is higher over the equator (~55,000 ft) than over the poles (~25,000 ft)"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "atmosphere-composition",
                heading: "Composition and Density",
                body: "Air is roughly 78% nitrogen and 21% oxygen by volume, with the remaining 1% consisting of argon, carbon dioxide, water vapor, and trace gases. While this composition is fairly constant, the water vapor content varies dramatically — from nearly zero in desert air to about 4% in tropical maritime air masses. This variation in moisture is what makes weather so dynamic and localized. Density decreases exponentially with altitude: at 18,000 feet, you have only half the air molecules available at sea level. For pilots, this means reduced lift and engine performance at altitude. For hikers, it means less oxygen per breath and greater susceptibility to altitude sickness.",
                diagram: nil,
                keyFacts: [
                    "Water vapor, though a tiny fraction of the atmosphere, is the single most important weather-producing gas",
                    "Air density at 10,000 feet is about 70% of sea level density",
                    "Warm air holds more moisture than cold air — roughly double for every 11 degrees C increase",
                    "Mountain air is often drier than lowland air because moisture condenses out during ascent"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "atmosphere-heating",
                heading: "How the Atmosphere Heats",
                body: "The sun does not heat the air directly. Instead, solar radiation passes through the atmosphere largely unimpeded and heats the ground. The ground then heats the air in contact with it through conduction and radiation. This is why valleys are warmer than mountain peaks even though peaks are closer to the sun, and why the hottest part of the day lags behind solar noon by an hour or two. Differential heating of the surface — dark soil versus snow, south-facing slopes versus north-facing ones, land versus water — creates the temperature contrasts that drive local wind systems, thermals, and ultimately all the weather patterns that mountain travelers must understand. The atmosphere is heated from below, and this single fact explains more about weather than any other principle.",
                diagram: nil,
                keyFacts: [
                    "Dark surfaces absorb more heat and create stronger thermals than reflective surfaces",
                    "South-facing slopes in the Northern Hemisphere receive more direct solar radiation and warm faster",
                    "Maximum surface heating typically occurs 1–2 hours after solar noon",
                    "Snow cover dramatically reduces surface heating by reflecting up to 90% of incoming solar radiation"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["weather-lapse-rates", "weather-thermals-convection", "weather-pressure-systems"],
        relatedModules: ["atmosphere", "lapse-rates", "thermals"]
    )

    // MARK: - 2. Pressure Systems

    static let pressureSystems = ExploreArticle(
        id: "weather-pressure-systems",
        domain: .weather,
        title: "Pressure Systems: The Engines of Weather",
        summary: "High and low pressure systems are the primary organizing structures of weather. Understanding how they form, move, and interact is essential for reading weather maps and anticipating conditions.",
        icon: "gauge.with.dots.needle.33percent",
        heroImageName: "Photos/Heroes/hero-weather-pressure-systems",
        sections: [
            ExploreSection(
                id: "pressure-basics",
                heading: "What Pressure Means",
                body: "Atmospheric pressure is simply the weight of the air column above a given point. When air is heated, it expands and becomes less dense, creating relatively lower pressure at the surface. When air cools, it contracts and sinks, creating higher pressure. These pressure differences, though small in absolute terms, are the fundamental driving force of all wind. Air always flows from high pressure toward low pressure, but because the Earth is rotating, this flow is deflected by the Coriolis effect — to the right in the Northern Hemisphere. The result is that air spirals clockwise out of high pressure systems and counterclockwise into low pressure systems. The spacing of isobars on a weather map tells you the pressure gradient: tightly packed isobars mean strong winds, widely spaced isobars mean light winds.",
                imageName: "Photos/weather-pressure-map",
                imageCaption: "Surface pressure analysis chart with isobars",
                diagram: nil,
                keyFacts: [
                    "Standard sea-level pressure is 1013.25 hPa — deviations indicate weather systems",
                    "Pressure drops approximately 1 hPa for every 8 meters of altitude gain near sea level",
                    "A rapidly falling barometer (more than 3 hPa in 3 hours) signals approaching bad weather",
                    "In the Northern Hemisphere, if you stand with your back to the wind, low pressure is to your left (Buys Ballot's Law)"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "pressure-highs",
                heading: "High Pressure Systems",
                body: "High pressure systems, or anticyclones, are regions of sinking air. As air descends, it compresses and warms, which inhibits cloud formation and generally produces clear, stable weather. Large-scale highs can persist for days or weeks, creating extended periods of fine weather that are ideal for mountain activities. However, highs are not without their hazards. Strong highs in winter can trap cold air in valleys, creating persistent temperature inversions with fog, frost, and poor visibility below while summits bask in sunshine. In summer, a stagnant high can lead to haze buildup and unexpectedly warm temperatures at altitude. The edges of high pressure systems, where they interact with approaching lows, often produce the most dynamic and interesting weather.",
                diagram: nil,
                keyFacts: [
                    "Sinking air in a high warms at the dry adiabatic lapse rate (3 degrees C per 1,000 ft)",
                    "Inversions created by highs can trap pollution and moisture in valleys for days",
                    "The Azores High and Siberian High are semi-permanent features that strongly influence European weather",
                    "Ridges of high pressure extending from a high center can briefly improve conditions between storm systems"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "pressure-lows",
                heading: "Low Pressure Systems",
                body: "Low pressure systems, or cyclones, are regions of rising air. As air ascends, it expands and cools, eventually reaching saturation and forming clouds and precipitation. Lows are the weather-makers — they bring wind, rain, snow, and rapid changes in conditions. A mature low pressure system can span hundreds of miles and persist for several days as it tracks across the landscape. The approach of a low is often telegraphed well in advance: first by high cirrus clouds, then by a gradual lowering and thickening of the cloud deck, falling pressure, and backing winds. For mountain travelers, the key is recognizing these advance signals and adjusting plans accordingly. The most dangerous conditions often occur in the warm sector of a low, where moist, unstable air can produce violent convective storms with little warning.",
                diagram: nil,
                keyFacts: [
                    "Low pressure systems in the Northern Hemisphere have counterclockwise circulation",
                    "The deepest lows produce the strongest winds and most severe weather",
                    "Fronts are the boundaries between different air masses drawn into a low's circulation",
                    "Lows typically move from west to east in mid-latitudes at 20–30 mph"
                ],
                warningNote: "Rapidly deepening lows (pressure falling more than 24 hPa in 24 hours) are called 'bomb cyclones' and can produce hurricane-force winds in mountain terrain."
            )
        ],
        relatedArticles: ["weather-fronts-overview", "weather-mountain-winds", "weather-atmosphere-overview"],
        relatedModules: ["pressure-systems", "fronts", "mountain-winds"]
    )

    // MARK: - 3. Fronts Overview

    static let frontsOverview = ExploreArticle(
        id: "weather-fronts-overview",
        domain: .weather,
        title: "Fronts: Where Air Masses Collide",
        summary: "Fronts mark the boundaries between air masses of different temperature and moisture characteristics. They produce much of the significant weather that affects mountain activities.",
        icon: "arrow.left.and.right",
        heroImageName: "Photos/Heroes/hero-weather-fronts",
        sections: [
            ExploreSection(
                id: "fronts-cold",
                heading: "Cold Fronts",
                body: "A cold front is the leading edge of an advancing cold air mass pushing beneath warmer air. Because cold air is denser, it acts like a wedge, lifting the warm air forcefully and rapidly. The frontal surface is steep — typically sloping at 1:50 to 1:100 — which concentrates the lifting into a narrow band. This produces a line of intense weather: towering cumulonimbus clouds, heavy rain or hail, gusty winds, and sometimes severe thunderstorms. The passage of a cold front is usually dramatic and fast, lasting perhaps an hour or two at any given location. Afterwards, the air clears remarkably quickly as the cold, dry air mass moves in, often bringing excellent visibility and crisp conditions. In the mountains, cold fronts can produce sudden drops in temperature of 10 to 15 degrees C, violent gusts, and rapid accumulation of snow at altitude.",
                imageName: "Photos/weather-cold-front",
                imageCaption: "Cold front approaching over mountain terrain",
                diagram: nil,
                keyFacts: [
                    "Cold fronts typically move at 20–35 mph, faster than warm fronts",
                    "The worst weather is usually in a narrow band 50–100 miles wide along the front",
                    "Wind shifts sharply at frontal passage — typically from southwest to northwest in the Northern Hemisphere",
                    "Post-frontal clearing can happen within an hour, bringing excellent flying and hiking conditions"
                ],
                warningNote: "Cold fronts in mountainous terrain can produce extremely hazardous conditions with zero warning. Winds can gust to 60+ mph at ridgeline, visibility can drop to near zero in driving snow, and temperature drops can cause rapid hypothermia for unprepared travelers."
            ),
            ExploreSection(
                id: "fronts-warm",
                heading: "Warm Fronts",
                body: "A warm front is the leading edge of an advancing warm air mass sliding up and over retreating cooler air. The frontal surface is shallow, typically sloping at 1:150 to 1:300, which means the lifting is gentle and spread over a wide area. The classic warm front approach begins with high cirrus clouds 500 to 1,000 miles ahead of the surface front, gradually thickening to cirrostratus, then altostratus, and finally nimbostratus with steady, persistent rain. This sequence can take 12 to 24 hours to unfold, giving mountain travelers ample warning. The rain is typically light to moderate but can last for many hours, saturating terrain and raising the risk of landslides and river flooding. Warm fronts are particularly treacherous in winter, when they can produce freezing rain and ice storms as warm air rides over sub-freezing surface temperatures.",
                diagram: nil,
                keyFacts: [
                    "Warm fronts move at 10–20 mph, roughly half the speed of cold fronts",
                    "Cloud sequence (cirrus, cirrostratus, altostratus, nimbostratus) is a reliable predictor",
                    "Warm sector air between a warm and cold front is often moist and unstable",
                    "Visibility in warm front precipitation is typically poor — fog and low stratus are common"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "fronts-occluded",
                heading: "Occluded and Stationary Fronts",
                body: "As a low pressure system matures, the faster-moving cold front catches up to the warm front, lifting the warm air entirely off the surface in a process called occlusion. An occluded front combines characteristics of both cold and warm fronts: the widespread cloud and precipitation of a warm front combined with the more intense lifting of a cold front. The weather along an occluded front is often complex and difficult to predict, with embedded thunderstorms in otherwise stratiform precipitation. Stationary fronts, where neither air mass is advancing, can produce prolonged periods of cloud and rain over the same area for days. In mountainous terrain, stationary fronts draped across a range can create persistent orographic precipitation on the windward side while the lee side remains relatively dry.",
                diagram: nil,
                keyFacts: [
                    "Occluded fronts typically form 12–24 hours after a low pressure system develops",
                    "Stationary fronts can produce multiday precipitation events and significant flooding",
                    "A stationary front can reactivate into a warm or cold front if the pressure pattern shifts",
                    "Frontal zones in mountainous terrain are amplified by orographic lifting"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["weather-pressure-systems", "weather-cloud-types", "weather-thunderstorm-safety"],
        relatedModules: ["fronts", "pressure-systems", "thunderstorms"]
    )

    // MARK: - 4. Cloud Types

    static let cloudTypes = ExploreArticle(
        id: "weather-cloud-types",
        domain: .weather,
        title: "Cloud Types: Reading the Sky's Language",
        summary: "Clouds are visible messages written in the sky. Learning to read their form, altitude, and evolution tells you what the atmosphere is doing now and what it will do next.",
        icon: "cloud.fill",
        heroImageName: "Photos/Heroes/hero-weather-cloud-types",
        sections: [
            ExploreSection(
                id: "clouds-high",
                heading: "High Clouds: Cirrus Family",
                body: "High clouds form above roughly 20,000 feet and are composed entirely of ice crystals. Cirrus clouds appear as thin, wispy streaks or filaments, often with hooks or tufts at their ends. They are the advance scouts of approaching weather systems — when you see cirrus thickening and lowering from the west, a warm front is likely 12 to 24 hours away. Cirrostratus creates a thin, translucent veil that often produces a halo around the sun or moon, a classic sign of deteriorating weather. Cirrocumulus, small white patches arranged in rippled rows, indicates instability at high levels and sometimes precedes thunderstorm development. As Dennis Pagen emphasizes, the key is not just identifying the cloud type but observing how it changes over time. Cirrus that remains thin and scattered on a blue sky is benign; cirrus that thickens and spreads is telling you something important.",
                diagram: nil,
                keyFacts: [
                    "Cirrus clouds form above 20,000 ft and are always made of ice crystals",
                    "A halo around the sun or moon (caused by cirrostratus) often precedes rain by 12–24 hours",
                    "Jet stream cirrus appears as long, dense bands and indicates strong upper-level winds",
                    "Cirrus 'mare's tails' with hooked ends indicate upper-level wind shear"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "clouds-mid",
                heading: "Middle Clouds: Alto Family",
                body: "Middle clouds occupy the 6,500 to 20,000 foot range and are composed of water droplets, ice crystals, or a mixture of both. Altostratus forms a gray or bluish sheet that typically covers most of the sky, dimming the sun to a pale disk without producing a halo. When you can no longer see the sun through the cloud layer, the altostratus has thickened enough that precipitation is likely within hours. Altocumulus appears as white or gray patches, often in regular patterns of rounded masses or rolls. A sky full of altocumulus on a warm, humid morning — the so-called 'mackerel sky' — is one of the most reliable indicators that afternoon thunderstorms will develop. Lenticular clouds, technically a form of altocumulus, deserve special attention in mountain country: their smooth, lens-shaped appearance marks the crest of standing mountain waves and indicates strong winds at altitude.",
                diagram: nil,
                keyFacts: [
                    "Altocumulus on a warm morning ('mackerel sky') predicts afternoon thunderstorms with 70%+ reliability",
                    "Lenticular clouds (altocumulus lenticularis) indicate mountain wave activity and strong winds aloft",
                    "Altostratus thick enough to hide the sun usually means rain within 6 hours",
                    "Middle clouds that gradually lower and thicken confirm an approaching warm front"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "clouds-low",
                heading: "Low Clouds and Vertical Development",
                body: "Low clouds form below 6,500 feet and include stratus, stratocumulus, and nimbostratus. Stratus is the featureless gray blanket that produces drizzle and reduces visibility — it is common in valleys during stable conditions and can persist for days under a strong inversion. Nimbostratus is the thick, dark rain cloud that produces steady, moderate precipitation over wide areas. Cumulus clouds, which extend vertically rather than horizontally, are the most dynamic and informative clouds for mountain travelers. Fair-weather cumulus with flat bases and limited vertical extent indicate mild instability and pleasant conditions. Cumulus that grow tall rapidly, especially those with hard, cauliflower-like edges, are a sign of vigorous convection. When their tops glaciate — turning from sharp-edged white to fuzzy, fibrous ice — they are transitioning to cumulonimbus and thunderstorm development is imminent.",
                imageName: "Photos/weather-cumulus",
                imageCaption: "Fair-weather cumulus over alpine terrain",
                animationName: "anim-cloud-formation",
                diagram: nil,
                keyFacts: [
                    "Cumulus cloud bases can be estimated: base height in feet equals the spread between surface temperature and dew point multiplied by 400",
                    "Cumulus with flat bases and limited vertical growth indicate stable, pleasant conditions",
                    "Rapidly growing cumulus with hard, sharp edges indicate strong updrafts and instability",
                    "When cumulus tops become fibrous or anvil-shaped, the cloud has become a cumulonimbus"
                ],
                warningNote: "Cumulonimbus clouds produce lightning, hail, severe turbulence, downbursts, and occasionally tornadoes. If you can see a cumulus tower growing rapidly with an anvil forming at its top, seek shelter immediately — do not wait for thunder."
            )
        ],
        relatedArticles: ["weather-thermals-convection", "weather-lapse-rates", "weather-thunderstorm-safety"],
        relatedModules: ["clouds", "thermals", "thunderstorms"]
    )

    // MARK: - 5. Thermals & Convection

    static let thermalsAndConvection = ExploreArticle(
        id: "weather-thermals-convection",
        domain: .weather,
        title: "Thermals and Convection: The Vertical Engine",
        summary: "Thermals are columns of rising air driven by differential surface heating. They are the primary energy source for soaring flight and a critical factor in mountain weather development.",
        icon: "arrow.up.circle.fill",
        heroImageName: "Photos/Heroes/hero-weather-thermals",
        sections: [
            ExploreSection(
                id: "thermals-formation",
                heading: "How Thermals Form",
                body: "Thermals begin at the surface, where solar heating creates pockets of air that are warmer and therefore less dense than their surroundings. These 'thermal bubbles' initially cling to the surface, growing in temperature until they are buoyant enough to break free and rise. The trigger is often a surface feature that concentrates heat — a plowed field, a parking lot, a rocky south-facing slope, or a ridge line that focuses wind into a convergence zone. Once released, the thermal accelerates upward, entraining surrounding air and growing in diameter as it rises. A typical thermal in mountain country might be 200 to 500 meters in diameter near the surface, expanding to a kilometer or more at cloudbase. The air between thermals sinks to compensate, creating the alternating pattern of lift and sink that pilots know so well.",
                imageName: "Photos/weather-thermal-source",
                imageCaption: "Differential heating on sun-exposed slopes",
                diagram: nil,
                keyFacts: [
                    "Thermals typically begin forming 2–3 hours after sunrise as the surface heats",
                    "Dark, dry surfaces produce stronger thermals than light or wet surfaces",
                    "Thermal strength increases through the day, typically peaking 1–2 hours after solar noon",
                    "Ridge lines and valley confluences are reliable thermal trigger points"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "thermals-structure",
                heading: "Thermal Structure and Behavior",
                body: "A thermal is not a simple, smooth column of rising air. Pagen describes thermals as more like a series of pulsating bubbles or a turbulent plume, with stronger lift in the core and weaker, broken lift at the edges. The classic thermal has a toroidal (doughnut-shaped) circulation, with air rising strongly in the center and cascading down around the edges. In calm conditions, thermals rise more or less vertically, but wind tilts them downwind, so the thermal you enter at one altitude may be displaced from where it was lower down. In mountain terrain, thermals are heavily influenced by topography. They tend to follow ridges and spines upward, concentrating along sun-facing slopes and converging at peaks and cols. The lee side of a ridge is generally a thermal desert — the downwashing air suppresses convection and creates sink.",
                diagram: nil,
                keyFacts: [
                    "Thermal cores typically produce lift of 2–5 m/s (400–1000 ft/min) in moderate conditions",
                    "Wind tilts thermals downwind — at 15 mph wind, a thermal at 5,000 ft AGL is displaced about 1 mile from its source",
                    "The strongest thermals are often narrow and turbulent; smooth thermals tend to be weaker but wider",
                    "Dust devils on the surface mark the base of particularly strong thermals"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "thermals-cycles",
                heading: "Daily Thermal Cycle in Mountains",
                body: "The daily thermal cycle in mountain terrain follows a predictable pattern that every mountain traveler should understand. Morning begins with cold air pooled in valleys from overnight radiative cooling. As the sun rises, east-facing slopes heat first, generating the first weak thermals by mid-morning. By late morning, south-facing slopes are fully heated and thermal activity becomes widespread. The thermal cycle peaks in early to mid-afternoon, when surface temperatures are highest and the convective boundary layer has grown to its maximum depth. This is the period of strongest thermals but also the greatest risk of overdevelopment — when thermals become so vigorous that they punch through stable layers and trigger cumulonimbus development. As the sun angle decreases in late afternoon, thermal activity weakens and eventually ceases. The transition from convective to stable conditions can be surprisingly abrupt, especially in autumn when days are shorter.",
                diagram: nil,
                keyFacts: [
                    "First thermals of the day typically appear on east-facing slopes by mid-morning",
                    "Peak thermal activity in summer mountains is usually between 1:00 and 4:00 PM local time",
                    "The convective boundary layer in mountain terrain can reach 12,000–15,000 ft above valley floors",
                    "Thermal activity ceases abruptly when the sun drops behind ridges, sometimes an hour before sunset"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["weather-lapse-rates", "weather-cloud-types", "weather-convergence"],
        relatedModules: ["thermals", "lapse-rates", "clouds"]
    )

    // MARK: - 6. Lapse Rates & Stability

    static let lapseRatesAndStability = ExploreArticle(
        id: "weather-lapse-rates",
        domain: .weather,
        title: "Lapse Rates and Stability: The Atmosphere's Thermostat",
        summary: "Lapse rates describe how temperature changes with altitude. The relationship between actual and theoretical lapse rates determines atmospheric stability — the single most important factor in weather development.",
        icon: "thermometer.medium",
        heroImageName: "Photos/Heroes/hero-weather-lapse-rates",
        sections: [
            ExploreSection(
                id: "lapse-basics",
                heading: "Understanding Lapse Rates",
                body: "When a parcel of dry air rises, it expands due to decreasing pressure and cools at a fixed rate of approximately 3 degrees C per 1,000 feet (9.8 degrees C per kilometer). This is the Dry Adiabatic Lapse Rate (DALR), and it is constant regardless of the actual temperature. If the rising air reaches its dew point and condensation begins, the release of latent heat slows the cooling rate to the Saturated Adiabatic Lapse Rate (SALR), which varies between about 1.5 and 3 degrees C per 1,000 feet depending on temperature and moisture content. The Environmental Lapse Rate (ELR) is what is actually measured in the atmosphere at any given time and place — it is the real temperature profile that a balloon sounding would reveal. The relationship between these three rates determines whether the atmosphere is stable, unstable, or conditionally unstable.",
                diagram: nil,
                keyFacts: [
                    "Dry Adiabatic Lapse Rate (DALR): 3 degrees C per 1,000 ft — constant and reliable",
                    "Saturated Adiabatic Lapse Rate (SALR): 1.5–3 degrees C per 1,000 ft — varies with temperature",
                    "Environmental Lapse Rate (ELR): varies with actual conditions — must be measured or forecast",
                    "The 'standard atmosphere' assumes an average ELR of 2 degrees C per 1,000 ft"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "stability-types",
                heading: "Stability and Instability",
                body: "If the ELR is less than the DALR (temperature decreases slowly with altitude), a rising parcel of air cools faster than its environment and becomes denser, so it sinks back down. This is a stable atmosphere — it resists vertical motion and suppresses convection. Stratus clouds, haze, and poor visibility are typical stable-air indicators. If the ELR is greater than the DALR (temperature decreases rapidly with altitude), a rising parcel remains warmer than its surroundings and continues to accelerate upward. This is an absolutely unstable atmosphere — it promotes vigorous convection, cumulus development, and turbulence. Conditional instability, the most common state, occurs when the ELR falls between the DALR and SALR. The atmosphere is stable for dry air but unstable for saturated air, meaning that convection, once triggered and sustained to the condensation level, becomes self-reinforcing.",
                diagram: nil,
                keyFacts: [
                    "Stable: ELR less than SALR — resists all vertical motion",
                    "Conditionally unstable: ELR between SALR and DALR — the most common and trickiest state",
                    "Absolutely unstable: ELR greater than DALR — vigorous convection inevitable",
                    "Inversions (temperature increasing with altitude) are extremely stable layers that cap convection"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "stability-practical",
                heading: "Reading Stability in the Field",
                body: "You do not need a radiosonde to assess atmospheric stability. The sky itself is your instrument. A stable atmosphere produces smooth air, layered clouds (stratus, altostratus), haze trapped beneath inversions, and steady winds. An unstable atmosphere produces bumpy air, vertically developed clouds (cumulus, cumulonimbus), excellent visibility between thermals, and gusty, shifting winds. Pagen teaches pilots to 'read the sky' by watching cumulus clouds: their height, rate of growth, and shape tell you about instability and moisture. Flat cumulus that spread out horizontally are hitting a stable layer. Cumulus that tower upward aggressively have found unstable air above and may become hazardous. For mountain hikers, stability matters because unstable air means afternoon thunderstorms are possible and route planning should prioritize being off exposed ridges and summits by early afternoon.",
                imageName: "Photos/weather-stability-sky",
                imageCaption: "Reading stability from cumulus development",
                diagram: nil,
                keyFacts: [
                    "Smooth air and layered clouds indicate stability",
                    "Bumpy air and towering cumulus indicate instability",
                    "Morning fog that burns off early suggests the atmosphere will become unstable",
                    "Morning fog that persists past midday suggests a strong inversion and stable conditions"
                ],
                warningNote: "A deceptively clear morning with extreme surface heating can produce explosive thunderstorm development in the afternoon, especially when a conditionally unstable atmosphere is present. Monitor cumulus development throughout the day."
            )
        ],
        relatedArticles: ["weather-atmosphere-overview", "weather-thermals-convection", "weather-thunderstorm-safety"],
        relatedModules: ["lapse-rates", "thermals", "atmosphere"]
    )

    // MARK: - 7. Mountain Winds

    static let mountainWinds = ExploreArticle(
        id: "weather-mountain-winds",
        domain: .weather,
        title: "Mountain Winds: Local Circulation Systems",
        summary: "Mountains create their own wind systems through differential heating and channeling of airflow. These local winds can dominate over synoptic patterns and create both opportunities and hazards.",
        icon: "wind",
        heroImageName: "Photos/Heroes/hero-weather-mountain-winds",
        sections: [
            ExploreSection(
                id: "winds-valley",
                heading: "Valley and Slope Winds",
                body: "The most fundamental mountain wind system is the valley breeze cycle, driven entirely by differential heating. During the day, mountain slopes heat faster than the air at the same altitude over the valley center. This creates an upslope wind (anabatic flow) that begins on east-facing slopes in the morning and spreads to all sun-exposed slopes by midday. The cumulative effect of all these slope winds draws air up from the plains and lowlands into the valley, creating a valley wind that flows up-valley during the day. This system can be remarkably strong — 10 to 20 knots is common in well-defined alpine valleys. At night, the process reverses. Radiative cooling chills the slopes, and cold, dense air drains downhill as a katabatic wind, pooling in valley floors and flowing down-valley as a mountain wind. Understanding this daily reversal is critical for planning departure times, selecting campsites, and anticipating conditions at passes and ridges.",
                animationName: "anim-valley-winds",
                diagram: nil,
                keyFacts: [
                    "Upslope (anabatic) winds begin 1–2 hours after sunrise and peak in early afternoon",
                    "Downslope (katabatic) winds begin shortly after sunset and peak in the early morning hours",
                    "Valley winds typically flow up-valley during the day and down-valley at night",
                    "The transition from up-valley to down-valley wind usually occurs 1–2 hours after sunset"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "winds-foehn",
                heading: "Foehn Winds",
                body: "The foehn is one of the most dramatic and dangerous mountain wind phenomena. It occurs when a strong pressure gradient forces air over a mountain range. As the air rises on the windward side, it cools at the DALR until it reaches saturation, then continues cooling at the slower SALR while shedding moisture as precipitation. When this air descends the lee side, it warms at the DALR the entire way down — having lost its moisture on the windward side. The result is a dramatically warmer and drier wind on the lee side. A classic foehn can raise temperatures by 15 to 20 degrees C in hours, drop relative humidity to single digits, and produce sustained winds of 40 to 80 knots in exposed terrain. In the Alps, the foehn is a well-known hazard, capable of triggering avalanches through rapid warming, creating extreme fire danger, and producing turbulence severe enough to destroy aircraft.",
                imageName: "Photos/weather-foehn-wall",
                imageCaption: "Foehn wall cloud bank on the windward side",
                diagram: nil,
                keyFacts: [
                    "Foehn winds can raise temperatures by 15–20 degrees C within hours",
                    "Relative humidity during a strong foehn can drop below 10%",
                    "The 'foehn wall' — a dramatic cloud bank on the windward side — is a classic visual indicator",
                    "Foehn gaps (clear areas on the lee side) are visible on satellite imagery"
                ],
                warningNote: "Foehn conditions create extreme avalanche hazard through rapid warming and wind loading. Fire danger becomes extreme with single-digit humidity. Wind gusts in exposed terrain can exceed 100 mph. Do not venture onto exposed ridges or summits during active foehn events."
            ),
            ExploreSection(
                id: "winds-channeling",
                heading: "Gap Winds and Channeling",
                body: "Mountain terrain channels and accelerates wind in ways that can surprise even experienced travelers. When wind is forced through a narrow valley, pass, or gap between peaks, the Venturi effect accelerates it — sometimes to double or triple the speed in open terrain. Passes and cols are particularly notorious for this acceleration, which is why a calm valley can have a raging gale at the col just a thousand feet above. Canyon winds are a related phenomenon, where the walls of a narrow canyon focus and intensify the prevailing wind. Corner effects occur where the wind wraps around a ridge end or mountain spur, creating accelerated flow and severe turbulence on the lee side. For hikers planning ridge traverses, it is essential to check wind forecasts and understand that conditions at the ridgeline may be dramatically different from conditions at the trailhead.",
                diagram: nil,
                keyFacts: [
                    "Wind speed through a mountain pass can be 2–3 times stronger than in the open valley",
                    "The Venturi effect: as the cross-sectional area decreases, wind speed increases proportionally",
                    "Lee-side turbulence (rotors) can extend downwind for several times the height of the ridge",
                    "Wind chill at an exposed pass with 40 mph wind can make a 5 degree C day feel like minus 15 degrees C"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["weather-mountain-waves", "weather-pressure-systems", "weather-convergence"],
        relatedModules: ["mountain-winds", "mountain-waves", "pressure-systems"]
    )

    // MARK: - 8. Mountain Waves

    static let mountainWaves = ExploreArticle(
        id: "weather-mountain-waves",
        domain: .weather,
        title: "Mountain Waves: Standing Waves in the Sky",
        summary: "When stable air flows over mountain barriers, it can set up standing wave patterns that extend tens of thousands of feet above the peaks. These waves are both a magnificent soaring resource and a serious hazard.",
        icon: "water.waves",
        heroImageName: "Photos/Heroes/hero-weather-mountain-waves",
        sections: [
            ExploreSection(
                id: "waves-formation",
                heading: "How Mountain Waves Form",
                body: "Mountain waves form when three conditions are met: wind blowing roughly perpendicular to a ridge (within about 30 degrees), a stable layer at or near ridge-top level, and wind speed increasing with altitude. When these conditions align, the mountain acts like a rock in a stream, displacing the airflow upward. In a stable atmosphere, the displaced air overshoots its equilibrium level and oscillates back and forth, creating a standing wave pattern downwind of the ridge. The wavelength — the distance between successive wave crests — depends on wind speed and stability, typically ranging from 5 to 15 miles. The wave pattern can extend far downwind, sometimes producing three or four crests, and can reach altitudes well into the stratosphere. The Sierra Wave in California has been documented to heights above 40,000 feet, and similar wave systems occur in the Alps, Andes, and any significant mountain range.",
                animationName: "anim-lenticular-wave",
                diagram: ExploreDiagram(
                    type: .crossSection,
                    config: DiagramConfig(
                        profilePoints: [
                            DiagramPoint(x: 0.0, y: 0.3),
                            DiagramPoint(x: 0.15, y: 0.3),
                            DiagramPoint(x: 0.25, y: 0.7),
                            DiagramPoint(x: 0.30, y: 0.85),
                            DiagramPoint(x: 0.35, y: 0.7),
                            DiagramPoint(x: 0.45, y: 0.3),
                            DiagramPoint(x: 1.0, y: 0.3)
                        ],
                        overlayType: "waves",
                        labels: ["Rotor Zone", "Primary Wave Crest", "Lenticular Cloud", "Secondary Wave"],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "Mountain waves require wind perpendicular to the ridge, a stable layer, and increasing wind with altitude",
                    "Wavelength is typically 5–15 miles and depends on wind speed and stability",
                    "Lenticular (lens-shaped) clouds mark the crests of mountain waves",
                    "Wave lift can exceed 2,000 ft/min and reach altitudes above 40,000 feet"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "waves-rotors",
                heading: "Rotors: The Dangerous Underbelly",
                body: "Beneath each wave crest, on the lee side of the mountain, lies a rotor — a violently turbulent zone of rotating air that is one of the most dangerous phenomena in mountain meteorology. Rotors form where the descending air on the back side of a wave hits the surface and is forced to roll forward, creating a horizontal vortex. The turbulence in a rotor can be severe enough to damage aircraft and is certainly capable of knocking hikers off their feet on exposed terrain. Rotors are often marked by ragged, tumbling rotor clouds (cumulus fractus) that form and dissipate rapidly in the chaotic airflow. However, rotors can also be invisible in dry air, making them an insidious trap. The strongest rotors typically form beneath the first wave crest, roughly one wavelength downwind of the ridge, and can extend from the surface up to ridge-top level. For ground-based travelers, the practical implication is that conditions on the lee side of a ridge during strong cross-ridge wind can be far more violent and unpredictable than on the windward side.",
                diagram: nil,
                keyFacts: [
                    "Rotors form beneath wave crests on the lee side of ridges",
                    "Rotor turbulence can be severe to extreme — the most violent clear-air turbulence known",
                    "Ragged, rapidly changing cumulus fractus clouds are visual indicators of rotor activity",
                    "Rotors are strongest when the wave system is well-developed with strong wind and good stability"
                ],
                warningNote: "Rotor zones are extremely hazardous for all mountain activities. On the ground, rotor turbulence can produce sudden violent gusts from unpredictable directions. Never camp on the immediate lee side of a ridge during strong cross-wind conditions. Pilots should avoid rotor zones entirely except with specific wave-flying training and experience."
            ),
            ExploreSection(
                id: "waves-indicators",
                heading: "Recognizing Wave Activity",
                body: "Mountain waves advertise their presence through several distinctive visual signatures. The most obvious is the lenticular cloud — a smooth, lens-shaped or almond-shaped cloud that hovers in place despite strong winds, continuously forming at the upwind edge and evaporating at the downwind edge. Lenticular clouds are often stacked in layers, and when they appear over mountain terrain, they are an unambiguous sign that a wave system is active. A cap cloud or foehn wall on the ridge itself indicates the initial displacement of the airflow. Below, ragged rotor clouds tumble chaotically, in stark contrast to the serene lenticulars above. In dry conditions, wave activity may be entirely invisible, betrayed only by strong, gusty surface winds on the lee side and pilots' reports of smooth, powerful lift and sink aloft. Weather stations on mountain summits that report sustained strong winds with relatively little gustiness are another indicator — the smooth laminar flow of a well-established wave is very different from mechanical turbulence.",
                imageName: "Photos/weather-lenticular",
                imageCaption: "Lenticular cloud cap over a mountain peak",
                diagram: nil,
                keyFacts: [
                    "Lenticular clouds are the signature visual indicator of mountain wave activity",
                    "Stacked lenticulars indicate a particularly strong and deep wave system",
                    "Cap clouds on the ridge crest indicate the initial airflow displacement",
                    "In dry air, waves can be present with no visual indicators — use wind reports and forecasts"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["weather-mountain-winds", "weather-lapse-rates", "weather-cloud-types"],
        relatedModules: ["mountain-waves", "mountain-winds", "lapse-rates"]
    )

    // MARK: - 9. Convergence

    static let convergence = ExploreArticle(
        id: "weather-convergence",
        domain: .weather,
        title: "Convergence: Where Air Masses Meet",
        summary: "Convergence zones, where air from different directions meets and is forced upward, are among the most important and least understood weather features in mountain terrain. They produce reliable lift, unexpected clouds, and sometimes violent weather.",
        icon: "arrow.triangle.merge",
        heroImageName: "Photos/Heroes/hero-weather-convergence",
        sections: [
            ExploreSection(
                id: "convergence-basics",
                heading: "What Convergence Means",
                body: "Convergence occurs whenever horizontal airflows come together, forcing air upward. This can happen at multiple scales: from the grand collision of continental air masses along fronts to the local meeting of valley breezes at a mountain pass. Because air cannot pile up at the surface, convergence always produces lift — and lift means clouds, turbulence, and weather. The most common form of mountain convergence occurs when opposing valley breezes meet at a ridgeline or when a sea breeze penetrates inland and collides with thermally heated air flowing off the mountains. These convergence lines are often invisible at the surface but are clearly marked by lines of cumulus clouds that form along the boundary. For pilots, convergence zones offer some of the strongest and most reliable lift of the day. For hikers and mountaineers, they are zones of enhanced cloud development and potential thunderstorm initiation.",
                diagram: nil,
                keyFacts: [
                    "Convergence always produces upward motion — air that meets horizontally must go somewhere",
                    "Convergence lines are often visible as lines of cumulus clouds",
                    "Mountain convergence zones tend to form in predictable locations based on terrain and wind direction",
                    "Fronts are the largest-scale convergence zones in the atmosphere"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "convergence-sea-breeze",
                heading: "Sea Breeze and Valley Convergence",
                body: "The sea breeze front is one of the most dramatic convergence features in coastal mountain terrain. As the land heats during the day, cool marine air pushes inland, undercutting the warmer air over land and lifting it forcefully. This sea breeze front can penetrate 30 to 50 miles or more inland, sometimes reaching mountain ranges in the afternoon. When the sea breeze collides with valley breezes or thermally driven upslope winds, the convergence can trigger explosive cumulus development and thunderstorms. In many mountain regions around the world, the daily collision of sea breeze and mountain winds is the primary thunderstorm trigger. Valley-to-valley convergence is equally important: where two valley systems meet at a common ridge or pass, the opposing up-valley winds converge and create persistent lift zones that can sustain cloud development even when conditions elsewhere are too weak.",
                imageName: "Photos/weather-convergence-line",
                imageCaption: "Convergence line marked by cumulus development",
                diagram: nil,
                keyFacts: [
                    "Sea breeze fronts can penetrate 30–50 miles inland by late afternoon",
                    "The sea breeze front is marked by a sharp wind shift and temperature drop of 5–10 degrees C",
                    "Valley-to-valley convergence at passes and ridges creates predictable lift zones",
                    "Convergence-triggered thunderstorms often develop at the same locations day after day"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "convergence-practical",
                heading: "Convergence in the Mountains: Practical Implications",
                body: "For mountain travelers, convergence zones have important practical implications. First, they are the preferred locations for thunderstorm initiation. If you can identify where convergence is likely — ridgelines between opposing valleys, the expected penetration line of a sea breeze, or the boundary between different wind regimes — you can predict where storms are most likely to develop. Second, convergence zones are areas of enhanced wind and turbulence near the surface. The meeting of two air masses is rarely smooth; expect gusty, shifting winds and potential microbursts if convection develops overhead. Third, convergence creates microclimates. The windward side of a convergence zone may be sunny and warm while the other side is cool and cloudy. Understanding the local convergence patterns in your mountain area allows you to select routes and timing that minimize exposure to the worst conditions and take advantage of the best.",
                diagram: nil,
                keyFacts: [
                    "Thunderstorms preferentially form along convergence lines — these locations repeat daily",
                    "Convergence zones produce gusty, variable winds at the surface",
                    "The same pass or ridge can be a convergence zone on some days and not others, depending on the large-scale wind pattern",
                    "Satellite imagery and local wind observations are the best tools for identifying real-time convergence"
                ],
                warningNote: "Convergence zones in mountainous terrain are the most common trigger for afternoon thunderstorms. Plan routes to be below treeline and off exposed terrain by the time convergence-driven convection typically peaks, usually 2:00 to 4:00 PM in summer."
            )
        ],
        relatedArticles: ["weather-thermals-convection", "weather-mountain-winds", "weather-thunderstorm-safety"],
        relatedModules: ["convergence", "thermals", "mountain-winds"]
    )

    // MARK: - 10. Thunderstorm Safety

    static let thunderstormSafety = ExploreArticle(
        id: "weather-thunderstorm-safety",
        domain: .weather,
        title: "Thunderstorm Safety: Respect the King of Storms",
        summary: "Thunderstorms are the most dangerous weather phenomenon that mountain travelers routinely encounter. Understanding their lifecycle, recognizing the warning signs, and knowing how to respond can save your life.",
        icon: "cloud.bolt.fill",
        heroImageName: "Photos/Heroes/hero-weather-thunderstorms",
        sections: [
            ExploreSection(
                id: "thunderstorm-lifecycle",
                heading: "The Thunderstorm Lifecycle",
                body: "Every thunderstorm follows a three-stage lifecycle. The cumulus stage begins when a trigger — a thermal, convergence line, frontal lift, or orographic forcing — pushes moist, unstable air past its level of free convection. The cloud grows rapidly, with updrafts of 3,000 to 6,000 feet per minute drawing in moisture from miles around. There is no precipitation and no lightning yet, but the cloud's explosive vertical growth is unmistakable. The mature stage begins when precipitation becomes too heavy for the updraft to support and falls through the cloud, dragging air down with it to create a downdraft alongside the updraft. This is the most violent phase: lightning, heavy rain or hail, severe turbulence, and downbursts all occur simultaneously. The dissipating stage begins when the downdraft spreads across the base, cutting off the updraft's warm, moist air supply. Precipitation weakens, the cloud loses its sharp edges, and the storm gradually decays into stratiform debris. The entire lifecycle typically takes 30 to 60 minutes for an individual cell.",
                imageName: "Photos/weather-cumulonimbus",
                imageCaption: "Cumulonimbus anvil developing over the Alps",
                animationName: "anim-cumulonimbus-lifecycle",
                diagram: nil,
                keyFacts: [
                    "Cumulus stage: rapid vertical growth, strong updraft only, no precipitation or lightning yet",
                    "Mature stage: both updraft and downdraft present — this is when all hazards peak",
                    "Dissipating stage: downdraft dominates, precipitation weakens, cloud decays",
                    "A single cell lasts 30–60 minutes, but multicell clusters can regenerate for hours"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "thunderstorm-hazards",
                heading: "Hazards in Mountain Terrain",
                body: "Thunderstorms in mountains are more dangerous than their lowland counterparts for several reasons. First, you are closer to the cloud base and therefore closer to the electrical discharge zone — lightning becomes a direct and immediate threat rather than a distant spectacle. Exposed ridges, summits, and open meadows above treeline offer no natural shelter, and wet rock and metal equipment (ice axes, trekking poles, via ferrata cables) become excellent conductors. Second, mountain thunderstorms produce flash flooding with terrifying speed. Rain that falls on steep, rocky terrain with little soil to absorb it concentrates into gullies and drainages within minutes, creating walls of water that sweep away everything in their path. Third, the terrain itself becomes a hazard. Wet rock becomes slippery, making descent dangerous. Hail accumulation can create ice-like conditions on trails. And the psychological pressure of being caught in a violent storm on an exposed ridge can lead to panic and poor decision-making.",
                diagram: nil,
                keyFacts: [
                    "Lightning kills more people in mountain terrain than avalanches in most regions",
                    "The 30-30 rule: if the time between flash and thunder is 30 seconds or less, seek shelter immediately",
                    "Flash floods can arrive in a drainage with no warning — even from storms you cannot see",
                    "Hypothermia is a serious risk when thunderstorm rain and wind combine to cool a summer-clothed hiker"
                ],
                warningNote: "If you can hear thunder, you are within lightning strike range. There is no safe place on an exposed ridge or summit during a thunderstorm. The only reliable strategy is to not be there — plan your route to be below treeline before storms develop."
            ),
            ExploreSection(
                id: "thunderstorm-protection",
                heading: "Avoidance and Response",
                body: "The best thunderstorm strategy is avoidance through timing and route selection. In most mountain ranges during summer, thunderstorms follow a predictable diurnal pattern: cumulus development begins by late morning, storms initiate by early to mid-afternoon, and peak activity occurs between 2:00 and 5:00 PM. The classic alpine strategy is an early start — on the trail by dawn, on the summit by late morning, and back below treeline by early afternoon. Watch the sky constantly: if cumulus clouds are growing rapidly by mid-morning, conditions are more unstable than usual and you should accelerate your timeline. If caught in the open, the lightning crouch is a last resort: squat on the balls of your feet with feet together, arms wrapped around your knees, on an insulating pad if possible. Avoid being the tallest object, avoid metal conductors, and stay away from water and wet crevices. In a group, spread out to reduce the chance of multiple casualties from a single strike. Get off ridges and summits immediately — descending even a few hundred feet can dramatically reduce your exposure.",
                imageName: "Photos/weather-lightning-ridge",
                imageCaption: "Lightning striking an exposed mountain ridge",
                diagram: nil,
                keyFacts: [
                    "Alpine start strategy: summit by late morning, below treeline by early afternoon",
                    "If cumulus is growing aggressively by 10:00 AM, expect storms earlier and more severe than normal",
                    "The lightning position: crouch on balls of feet, feet together, hands on knees, on insulating pad",
                    "In a group, spread out at least 50 feet apart to avoid multiple casualties from one strike"
                ],
                warningNote: "There is no safe outdoor location during an active thunderstorm in mountain terrain above treeline. Prevention through early timing is the only reliable strategy. If you see rapid cumulus development and hear distant thunder, you have perhaps 30 minutes before conditions become life-threatening. Descend immediately — do not wait to see if the storm 'will pass.' It probably will not."
            ),
            ExploreSection(
                id: "thunderstorm-forecasting",
                heading: "Forecasting Thunderstorms in the Field",
                body: "You can forecast thunderstorm probability without instruments by reading the sky and understanding the day's setup. Check the morning conditions: is there residual moisture in the air? Is the sky hazy, suggesting moisture? Did fog form overnight and burn off quickly, suggesting instability? A clear, dry morning with low humidity is less likely to produce storms than a muggy, hazy one. Watch cumulus development through the morning. Cumulus that remains small and flat-topped is being capped by stable air — storms are less likely. Cumulus that grows vertically without apparent limit, especially with hard, cauliflower-like edges, indicates deep instability and storms are probable. The most dangerous days are those with a seemingly innocuous morning followed by explosive afternoon development — often associated with a conditionally unstable atmosphere where a trigger is needed to release the energy. Altocumulus castellanus — small cumulus turrets sprouting from an altocumulus layer — is a morning warning sign of afternoon convective storms.",
                diagram: nil,
                keyFacts: [
                    "Altocumulus castellanus in the morning is one of the best visual predictors of afternoon thunderstorms",
                    "Rapid cumulus growth with hard edges means strong updrafts and high storm probability",
                    "High dew points (above 10 degrees C at mountain elevations) increase storm intensity",
                    "Check local forecasts the night before — modern mountain weather forecasts are remarkably accurate for storm timing"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["weather-cloud-types", "weather-lapse-rates", "weather-convergence"],
        relatedModules: ["thunderstorms", "clouds", "convergence"]
    )
}
