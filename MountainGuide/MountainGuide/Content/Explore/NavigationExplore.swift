import Foundation

// MARK: - Navigation Explore Articles
// Reference material for mountain navigators, hikers, and backcountry travelers.
// Covers map reading, compass work, GPS, route planning, and emergency navigation.

enum NavigationExplore {

    static let articles: [ExploreArticle] = [
        mapReadingFundamentals,
        compassNavigation,
        gpsAndDigitalNavigation,
        routePlanning,
        terrainAssociation,
        contouringAndSlopeNavigation,
        triangulationAndPositionFixing,
        whiteoutNavigation,
        nightNavigation,
        emergencyNavigation
    ]

    // MARK: - 1. Map Reading Fundamentals

    static let mapReadingFundamentals = ExploreArticle(
        id: "navigation-map-reading",
        domain: .navigation,
        title: "Map Reading Fundamentals",
        summary: "The topographic map is the most important navigation tool in mountain terrain. Understanding contour lines, scale, symbols, and grid references transforms a sheet of paper into a three-dimensional mental model of the landscape.",
        icon: "map.fill",
        heroImageName: "Photos/Heroes/hero-navigation-map-reading",
        sections: [
            ExploreSection(
                id: "map-contour-lines",
                heading: "Contour Lines: Reading the Third Dimension",
                body: "Contour lines are the foundation of topographic map reading. Each line connects points of equal elevation, and the vertical distance between successive contour lines — the contour interval — is fixed for any given map. On a 1:25,000 map the interval is typically 10 meters; on a 1:50,000 map it is usually 20 meters. Closely spaced contour lines indicate steep terrain, while widely spaced lines indicate gentle slopes. The shape of contour lines reveals the shape of the ground: concentric circles indicate a summit or hilltop, V-shapes pointing uphill indicate a valley or drainage (the 'V rule'), and V-shapes pointing downhill indicate a spur or ridge. Index contours, drawn as thicker lines every fifth contour, carry elevation labels and allow you to quickly determine height. Mastering contour interpretation means you can look at a map and visualize the terrain as though you were flying over it.",
                imageName: "Photos/navigation-topo-contours",
                imageCaption: "Topographic map showing contour lines across alpine terrain",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "Topographic map showing contour lines around a mountain with labeled features",
                        hotspots: [
                            RevealItem(id: "summit", label: "Summit", detail: "Closed concentric contours indicate the highest point", x: 0.5, y: 0.2),
                            RevealItem(id: "spur", label: "Spur/Ridge", detail: "Contour V-shapes point downhill away from high ground", x: 0.75, y: 0.45),
                            RevealItem(id: "valley", label: "Valley/Re-entrant", detail: "Contour V-shapes point uphill toward higher ground", x: 0.25, y: 0.55),
                            RevealItem(id: "cliff", label: "Steep Ground", detail: "Tightly packed contours — may indicate cliffs if they merge", x: 0.6, y: 0.7)
                        ],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "Contour interval on 1:25,000 maps is typically 10 meters; on 1:50,000 maps it is 20 meters",
                    "Closely spaced contours mean steep ground; widely spaced contours mean gentle slopes",
                    "V-shapes in contours pointing uphill indicate valleys; pointing downhill indicate ridges",
                    "Index contours (every 5th line, drawn thicker) carry elevation labels for quick reference"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "map-scale-distance",
                heading: "Scale, Distance, and Grid References",
                body: "Map scale determines the relationship between distance on the map and distance on the ground. At 1:25,000, one centimeter on the map equals 250 meters on the ground, and each grid square represents one square kilometer. At 1:50,000, one centimeter equals 500 meters, making the map cover more area but with less detail. For mountain navigation, 1:25,000 is strongly preferred because it reveals the subtle terrain features that guide route-finding. Grid references provide a standardized way to communicate locations. A four-figure reference identifies a one-kilometer square, while a six-figure reference narrows this to a 100-meter square. Always give the easting (left-right) before the northing (bottom-top) — the convention is 'along the corridor and up the stairs.' Measuring distance on a map gives you horizontal distance only; on steep terrain, actual walking distance is greater due to the slope angle, and Naismith's rule accounts for this by adding time for elevation gain.",
                imageName: "Photos/navigation-map-scale",
                imageCaption: "Close-up of map scale and grid references on a topographic sheet",
                diagram: nil,
                keyFacts: [
                    "1:25,000 scale means 4 cm on the map equals 1 km on the ground",
                    "Six-figure grid references locate a position to within 100 meters",
                    "Grid references are given easting first, then northing — 'along the corridor, up the stairs'",
                    "Slope distance is always greater than horizontal map distance — a 30-degree slope adds roughly 15% to travel distance"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "map-symbols-legend",
                heading: "Symbols, Legend, and Map Information",
                body: "Every topographic map uses a standardized symbol set to represent natural and man-made features. Learning the key symbols for your region's mapping authority is essential because these symbols convey critical navigation information that contour lines alone cannot provide. Cliff symbols (short hachure lines on contours) warn of vertical terrain. Marsh symbols indicate potentially impassable boggy ground. Forest boundaries show where visibility will be restricted. Path and track symbols distinguish between well-maintained trails, rough paths, and intermittent tracks that may vanish in bad weather. The map legend also contains the magnetic declination diagram, the contour interval, the survey date, and the datum — all critical pieces of information. A map surveyed decades ago may not show recent forestry plantations, new access roads, or changed watercourse positions. Always check the survey date and be prepared for discrepancies between the map and reality, particularly in areas with active land management or glacial retreat.",
                diagram: nil,
                keyFacts: [
                    "Cliff symbols (hachure marks) on contour lines indicate vertical or near-vertical terrain",
                    "The magnetic declination diagram on the map margin is essential for compass bearings",
                    "Map survey date indicates how current the information is — old maps may miss recent changes",
                    "Blue features represent water; green usually represents forest or vegetation; brown represents contours and earth features"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "map-folding-care",
                heading: "Map Preparation and Field Use",
                body: "A map is only useful if you can access it quickly and read it in adverse conditions. Before heading into the mountains, study the map at home and develop a mental model of the route. Mark key waypoints, escape routes, and critical decision points with a fine permanent marker. Fold the map so that the relevant section is immediately visible without having to unfold the entire sheet in the wind. A map case protects against rain and allows you to read the map without exposing it to the elements, but practice extracting and refolding the map in your gloves. Many experienced navigators cut their maps and mount the relevant section on a stiff card, or photocopy the key area at an enlarged scale for fine navigation in complex terrain. Keep the map accessible at all times — stowed in a jacket pocket or hanging from a neck cord — because the navigator who has to stop, remove their pack, and dig out a map will navigate less frequently and less accurately than one who can check the map every few minutes on the move.",
                diagram: nil,
                keyFacts: [
                    "Pre-mark key waypoints, escape routes, and decision points before departing",
                    "Fold the map to show only the relevant area — reduces wind resistance and fumbling",
                    "Keep the map accessible at all times, not buried in your pack",
                    "Waterproof the map with a map case or lamination — a wet map is difficult to read and tears easily"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["navigation-compass", "navigation-terrain-association", "navigation-route-planning"],
        relatedModules: ["navigation-map-reading", "navigation-compass", "navigation-terrain-association"]
    )

    // MARK: - 2. Compass Navigation

    static let compassNavigation = ExploreArticle(
        id: "navigation-compass",
        domain: .navigation,
        title: "Compass Navigation",
        summary: "The magnetic compass is the navigator's most reliable instrument — it requires no batteries, no satellites, and no signal. Mastering bearing work, declination correction, and map orientation is essential for confident mountain travel.",
        icon: "location.north.fill",
        heroImageName: "Photos/Heroes/hero-navigation-compass",
        sections: [
            ExploreSection(
                id: "compass-bearing-basics",
                heading: "Taking and Following Bearings",
                body: "A bearing is the direction from one point to another, measured as an angle clockwise from north, expressed in degrees from 0 to 360. To take a bearing from a map, place the compass baseplate along the line connecting your position to your target, rotate the bezel until the orienting lines align with the map's grid lines (with the orienting arrow pointing to grid north), and read the bearing at the index mark. To walk on a bearing in the field, hold the compass level in front of you, rotate your body until the magnetic needle sits within the orienting arrow (red in the shed), and walk toward the direction-of-travel arrow. The most common error is accidentally following the back bearing — 180 degrees in the wrong direction — which happens when the needle is reversed in the housing. Always double-check that north on the needle points to north on the bezel before stepping off.",
                imageName: "Photos/navigation-compass-map",
                imageCaption: "Compass and topographic map for mountain navigation",
                diagram: nil,
                keyFacts: [
                    "Bearings are measured clockwise from north, 0 to 360 degrees",
                    "Place the baseplate along your direction of travel, then rotate the bezel to align with grid north",
                    "Always verify the needle's north end points to the bezel's north before walking",
                    "A back bearing is your bearing plus or minus 180 degrees — useful for checking your origin point"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "compass-declination",
                heading: "Magnetic Declination",
                body: "Magnetic north and grid north are not the same. The angular difference between them is called magnetic declination (or magnetic variation), and failing to account for it will send you progressively further off course with every kilometer traveled. In the UK, declination is currently about 1 degree west and diminishing, making it negligible for most practical purposes. In parts of North America, declination can exceed 20 degrees — enough to put you a full kilometer off target after walking just three kilometers. The rule for converting between grid and magnetic bearings depends on whether declination is east or west. For west declination, add the declination to your grid bearing to get a magnetic bearing (the mnemonic is 'grid to mag, add'). For east declination, subtract. Many modern compasses allow you to set the declination adjustment once, so that every bearing you take is automatically corrected. This is a small investment of time that prevents one of the most common and consequential navigation errors.",
                diagram: ExploreDiagram(
                    type: .forceArrows,
                    config: DiagramConfig(
                        arrows: [
                            DiagramArrow(fromX: 0.5, fromY: 0.85, toX: 0.5, toY: 0.15, label: "Grid North", color: "8B5CF6"),
                            DiagramArrow(fromX: 0.5, fromY: 0.85, toX: 0.42, toY: 0.17, label: "Magnetic North", color: "EF4444"),
                            DiagramArrow(fromX: 0.5, fromY: 0.85, toX: 0.53, toY: 0.15, label: "True North", color: "3B82F6")
                        ],
                        labels: ["Grid North", "Magnetic North", "True North", "Declination Angle"],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "Magnetic declination varies by location and changes slowly over time",
                    "In parts of North America, declination exceeds 20 degrees — large enough to cause serious errors",
                    "Grid to magnetic: add west declination, subtract east declination",
                    "Set your compass declination adjustment once to eliminate conversion errors on every bearing"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "compass-orienting-map",
                heading: "Orienting the Map",
                body: "Orienting (or setting) the map means rotating it so that north on the map points to north in the real world. This is the single most important compass skill because an oriented map allows you to match features around you directly to features on the map without any mental rotation. To orient the map, place the compass on the map with the direction-of-travel arrow pointing to the top (north) edge. Rotate the map and compass together until the magnetic needle aligns with the north end of the orienting arrow, accounting for declination. Once oriented, every feature visible in the landscape should correspond in direction to the same feature on the map. This makes identification of landmarks, ridges, valleys, and paths intuitive and fast. Experienced navigators orient their map every time they look at it — it becomes automatic. In poor visibility, an oriented map combined with compass bearings to two or more known features allows you to determine your position through resection, a technique that forms the backbone of mountain navigation in challenging conditions.",
                diagram: nil,
                keyFacts: [
                    "An oriented map aligns north on the paper with north in the real world",
                    "Orient the map every time you use it — this should become an automatic habit",
                    "With an oriented map, features in the landscape match their direction on the map directly",
                    "An oriented map is the starting point for resection, triangulation, and all advanced navigation techniques"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["navigation-map-reading", "navigation-triangulation", "navigation-whiteout"],
        relatedModules: ["navigation-compass", "navigation-map-reading", "navigation-triangulation"]
    )

    // MARK: - 3. GPS and Digital Navigation

    static let gpsAndDigitalNavigation = ExploreArticle(
        id: "navigation-gps-digital",
        domain: .navigation,
        title: "GPS and Digital Navigation",
        summary: "GPS receivers and smartphone navigation apps have transformed mountain navigation, providing instant position fixes in any visibility. But they are tools to supplement, not replace, map and compass skills — and understanding their limitations is as important as knowing their strengths.",
        icon: "antenna.radiowaves.left.and.right",
        heroImageName: "Photos/Heroes/hero-navigation-gps",
        sections: [
            ExploreSection(
                id: "gps-how-it-works",
                heading: "How GPS Works",
                body: "The Global Positioning System uses a constellation of at least 24 satellites orbiting at approximately 20,200 kilometers altitude. Your GPS receiver calculates its position by measuring the time it takes radio signals to travel from multiple satellites. With signals from four or more satellites, the receiver can determine latitude, longitude, and altitude through trilateration. Civilian GPS accuracy is typically 3 to 5 meters in open terrain with good satellite geometry, though this can degrade significantly in deep valleys, dense forest, or near vertical cliff faces where satellites are blocked. The European Galileo and Russian GLONASS systems operate on the same principle, and modern receivers that use multiple constellations simultaneously achieve better accuracy and faster position fixes. Understanding that GPS gives you a horizontal position with reasonable accuracy but that the altitude reading is typically two to three times less accurate than the horizontal position is important for mountain navigation — do not rely on GPS altitude for determining which contour you are on.",
                diagram: nil,
                keyFacts: [
                    "GPS requires signals from at least 4 satellites to determine a 3D position fix",
                    "Civilian GPS horizontal accuracy is typically 3-5 meters in open terrain",
                    "GPS altitude is 2-3 times less accurate than horizontal position",
                    "Deep valleys, forest canopy, and cliff faces can block satellite signals and degrade accuracy"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "gps-waypoints-tracks",
                heading: "Waypoints, Tracks, and Routes",
                body: "Waypoints are stored coordinates representing specific locations — a summit, a col, a stream crossing, a hut. Before a trip, enter key waypoints from the map and assign each a clear name. In poor visibility, the GPS 'go to' function gives you a bearing and distance to any stored waypoint, essentially replacing the compass bearing you would otherwise have to calculate from the map. Tracks are the breadcrumb trail of your actual path, recorded at intervals as you walk. A recorded track is invaluable for retracing your steps in deteriorating conditions. Routes are pre-planned sequences of waypoints that the GPS follows in order, alerting you as you approach each one. The practical value of these functions is enormous, but they must be set up before you need them. Programming waypoints on a freezing mountain in driving rain with numb fingers and fading daylight is not realistic. Do this work at home, verify the waypoints on the map, and carry spare batteries or a power bank. The GPS that runs out of battery halfway through a whiteout traverse is worse than useless — it has replaced the skills you should have been practicing.",
                imageName: "Photos/navigation-gps-device",
                imageCaption: "GPS device showing waypoints on a mountain route",
                diagram: nil,
                keyFacts: [
                    "Program key waypoints at home before the trip — not in the field under pressure",
                    "Track recording creates a breadcrumb trail for retracing your route in poor visibility",
                    "A route strings waypoints together in sequence with automatic alerts at each one",
                    "Always carry spare batteries or a power bank — GPS is useless when the battery dies"
                ],
                warningNote: "GPS is a supplement to map and compass, never a replacement. Batteries fail, screens crack, satellites lose signal in deep terrain. Every mountain navigator must be able to navigate with map and compass alone."
            ),
            ExploreSection(
                id: "gps-datum-coordinate",
                heading: "Datum, Coordinate Systems, and Common Errors",
                body: "A map datum is the mathematical model of the Earth's surface used to create the map. Different datums — WGS84, OSGB36, ED50 — define slightly different coordinate grids. If your GPS is set to a different datum than your map, positions can be offset by hundreds of meters. WGS84 is the GPS default and the most universal datum, but many national mapping agencies use local datums. In the UK, Ordnance Survey maps use OSGB36; using a GPS set to WGS84 to plot a position on an OS map introduces an error of approximately 120 meters. Always check that your GPS datum matches your map datum. Coordinate systems add another layer of potential confusion: UTM, latitude/longitude, and national grid systems all describe the same locations using different numbers. Choose one system and use it consistently across your GPS, your map, and your trip notes. The most dangerous GPS error is the false confidence that comes from a precise-looking position fix that is actually wrong due to datum mismatch, poor satellite geometry, or multipath reflections off cliffs.",
                diagram: nil,
                keyFacts: [
                    "Using the wrong datum can offset your GPS position by 100+ meters from the map",
                    "WGS84 is the GPS standard; always check it matches your map's datum",
                    "Multipath errors near cliffs can cause position jumps of 10-50 meters",
                    "A GPS position that looks precise (many decimal places) is not necessarily accurate"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["navigation-map-reading", "navigation-triangulation", "navigation-emergency"],
        relatedModules: ["navigation-gps", "navigation-map-reading", "navigation-compass"]
    )

    // MARK: - 4. Route Planning

    static let routePlanning = ExploreArticle(
        id: "navigation-route-planning",
        domain: .navigation,
        title: "Route Planning",
        summary: "Good navigation begins long before you step onto the mountain. Thorough route planning — calculating timing, identifying hazards, establishing escape routes, and setting turnaround times — is the framework that turns a walk into a managed journey.",
        icon: "point.topleft.down.to.point.bottomright.curvepath.fill",
        heroImageName: "Photos/Heroes/hero-navigation-route-planning",
        sections: [
            ExploreSection(
                id: "route-timing",
                heading: "Timing Calculations: Naismith's Rule and Beyond",
                body: "Naismith's rule, formulated in 1892 by Scottish mountaineer William Naismith, remains the foundation of mountain timing estimates. The basic rule allows 5 kilometers per hour on flat ground plus an additional 1 minute for every 10 meters of ascent. For a hill walk covering 12 kilometers with 800 meters of ascent, the calculation gives 2 hours 24 minutes for the distance plus 80 minutes for the climb, totaling 3 hours 44 minutes. Tranter's corrections then adjust this estimate for the fitness of the party and the nature of the terrain. Rough ground, boggy paths, deep snow, or strong headwinds can easily halve your speed. Descent takes longer than many people expect: while you gain time by not climbing, steep or technical descent actually slows you compared to flat walking. A useful correction is to add 1 minute for every 25 meters of steep descent (greater than 12 degrees). Always plan timing based on the slowest member of the group, and add a contingency buffer of 20 to 30 percent for unexpected delays.",
                imageName: "Photos/navigation-route-card",
                imageCaption: "Handwritten route card with timing calculations for a mountain traverse",
                diagram: nil,
                keyFacts: [
                    "Naismith's rule: 5 km/hr horizontal plus 1 minute per 10 meters of ascent",
                    "Tranter's corrections account for fitness — an unfit party may take 50% longer than Naismith predicts",
                    "Add 1 minute per 25 meters for steep descent over 12 degrees",
                    "Always plan timing based on the slowest group member plus a 20-30% contingency buffer"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "route-escape-routes",
                heading: "Escape Routes and Decision Points",
                body: "Every mountain route should have pre-planned escape routes — alternative descent lines that allow you to bail out safely if conditions deteriorate, someone is injured, or you are running behind schedule. Identify these during the planning stage by examining the map for valleys, paths, and ridges that lead to safety from key points along the route. Mark them on the map with compass bearings from the main route to the start of each escape route. The best escape routes follow natural terrain features — valleys and ridges — that are easy to locate and follow even in poor visibility. Avoid escape routes that cross complex terrain, require navigation through featureless plateaus, or involve steep technical descent unless the party has the skills and equipment to handle it. Decision points are pre-selected locations where you will assess conditions and decide whether to continue, modify the route, or retreat. Establish turnaround times at the planning stage: if you have not reached checkpoint A by a specific time, you take escape route B. This removes the emotional pressure of making retreat decisions on the mountain, where summit fever and group dynamics can override good judgment.",
                imageName: "Photos/navigation-ridge-route",
                imageCaption: "Ridge route through alpine terrain",
                diagram: nil,
                keyFacts: [
                    "Identify at least one escape route from every major section of the route",
                    "Pre-calculate compass bearings from the main route to each escape route start point",
                    "Set turnaround times before departure — this removes emotional bias from retreat decisions",
                    "The best escape routes follow obvious terrain features like valleys or ridges"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "route-leg-planning",
                heading: "Breaking the Route into Legs",
                body: "Rather than treating a mountain route as a single journey from start to finish, experienced navigators break it into discrete legs between identifiable features. Each leg has a bearing, a distance, an expected time, and a catching feature that confirms you have arrived at the next waypoint. This systematic approach transforms even a long and complex route in poor visibility into a series of short, manageable navigation problems. For each leg, note the bearing, distance, estimated time, the feature you expect to find at the end, and any attack points or handrails along the way. An attack point is a clearly identifiable feature near your objective from which you begin precise navigation. A handrail is a linear feature — a wall, stream, ridge, path, or forest edge — that you can follow without continuous compass work. Using handrails whenever possible conserves mental energy for the sections that truly require precision bearing work. Write this information on a route card that you can carry in your map case for quick reference, and share copies with other members of the party.",
                diagram: nil,
                keyFacts: [
                    "Break complex routes into short legs between identifiable features",
                    "Each leg should have a bearing, distance, time estimate, and catching feature",
                    "Attack points are identifiable features near your objective from which you begin precise navigation",
                    "Route cards provide quick reference for bearing, distance, and timing on each leg"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["navigation-map-reading", "navigation-terrain-association", "navigation-whiteout"],
        relatedModules: ["navigation-route-planning", "navigation-map-reading", "navigation-terrain-association"]
    )

    // MARK: - 5. Terrain Association

    static let terrainAssociation = ExploreArticle(
        id: "navigation-terrain-association",
        domain: .navigation,
        title: "Terrain Association",
        summary: "Terrain association is the art of continuously relating the map to the ground around you. It is the most efficient form of mountain navigation — faster and less tiring than constant compass work — and the mark of an experienced navigator.",
        icon: "mountain.2.fill",
        heroImageName: "Photos/Heroes/hero-navigation-terrain",
        sections: [
            ExploreSection(
                id: "terrain-relating-map-ground",
                heading: "Relating Map to Ground",
                body: "Terrain association means constantly comparing what you see in the landscape with what the map tells you should be there. With an oriented map, you look at the terrain ahead and match it to the contour patterns, water features, and landmarks shown on the map. The key is to develop a 'mental picture' of the terrain from the map before you look up — predict what you should see, then verify it. If the map shows a spur running off to your right with a stream valley beyond it, you should see exactly that. If you see a flat boggy area instead, either your map reading is wrong or you are not where you think you are. This continuous cross-referencing between map and ground is what keeps you located. Skilled navigators do it almost unconsciously, updating their mental position every few minutes. The alternative — navigating 'head down' on compass bearings without relating to the terrain — is slower, more tiring, and more prone to error because you have no independent check on your position.",
                diagram: nil,
                keyFacts: [
                    "Always orient the map before relating it to the terrain",
                    "Predict what you should see from the map, then verify by looking at the landscape",
                    "Terrain association is faster and less tiring than constant compass bearing work",
                    "Update your mental position every few minutes by cross-referencing map and ground"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "terrain-catching-features",
                heading: "Catching Features and Backstops",
                body: "A catching feature (or collecting feature) is a large, unmistakable feature that lies beyond your objective and tells you that you have gone too far. Think of it as a safety net. If you are navigating toward a small col between two peaks and the catching feature is a large lake 500 meters beyond it, you know that if you reach the lake you have overshot the col. This knowledge allows you to navigate more aggressively — you can move faster because you know you will be caught if you overshoot. Good catching features are linear and perpendicular to your direction of travel: rivers, walls, fences, forest edges, roads, and ridgelines all work well. A point feature like a cairn or trig point is a poor catching feature because you could pass it in poor visibility without noticing it. The concept of backstops extends this principle to entire route sections: if you are traversing a ridge with a valley on each side, both valleys serve as backstops — no matter how far off course you drift, you will eventually descend into one of them and know which side of the ridge you are on.",
                diagram: nil,
                keyFacts: [
                    "A catching feature is an unmistakable feature beyond your target that tells you if you overshoot",
                    "Linear features perpendicular to your travel direction make the best catching features",
                    "Catching features allow you to navigate faster because you have a safety net if you go too far",
                    "Backstops are large-scale catching features — valleys, rivers, roads — that bound an entire route section"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "terrain-handrails-attack",
                heading: "Handrails and Attack Points",
                body: "A handrail is any linear feature that runs roughly parallel to your direction of travel and that you can follow with minimal navigational effort. Streams, ridges, walls, fence lines, paths, power lines, and forest edges can all serve as handrails. Following a handrail conserves mental energy because you do not need to take or follow compass bearings — you simply walk alongside the feature. The skill lies in identifying handrails on the map during route planning and designing your route to use them wherever possible. An attack point is a clearly identifiable feature close to your objective from which you begin precise navigation for the final approach. Rather than trying to navigate directly from one distant point to another, you navigate to the attack point using coarse methods (terrain association, handrails) and then switch to precise compass and pacing for the short leg from the attack point to the objective. This two-stage approach is both more reliable and more efficient than trying to maintain precision over long distances. For example, to find a small bothy in poor visibility, you might follow a stream (handrail) to the point where it crosses a wall (attack point), then navigate on a precise bearing for 400 meters to the bothy.",
                imageName: "Photos/navigation-stream-handrail",
                imageCaption: "Mountain stream used as a natural handrail for navigation",
                diagram: nil,
                keyFacts: [
                    "Handrails are linear features parallel to your travel that you follow with minimal effort",
                    "Attack points are identifiable features near your objective where you begin precise navigation",
                    "Use coarse navigation (terrain association, handrails) for long legs, precise navigation (compass, pacing) for short legs",
                    "Design routes during planning to maximize handrail use and minimize precision bearing work"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "terrain-aiming-off",
                heading: "Aiming Off and Deliberate Error",
                body: "Aiming off is a technique for finding a point feature on a linear feature — such as a bridge on a river, a gate on a wall, or a junction on a path. If you navigate directly toward the feature, any small error means you arrive at the linear feature but do not know whether your target is to the left or to the right. The solution is to deliberately aim to one side of the target — typically 5 to 10 degrees — so that when you reach the linear feature, you know with certainty which direction to turn. This small deliberate error eliminates a much larger potential uncertainty. The technique works best when the linear feature is clearly identifiable, the distance is moderate, and the offset is large enough to overcome normal compass error but not so large that it adds excessive distance. Related to aiming off is the broader concept of deliberate error: sometimes the fastest way to find a feature is to deliberately overshoot it to a catching feature, then navigate back along a handrail. This may be longer in distance but is faster in practice because it replaces uncertain navigation with certain navigation.",
                diagram: nil,
                keyFacts: [
                    "Aim 5-10 degrees to one side of your target on a linear feature so you know which way to turn",
                    "Aiming off replaces a large potential uncertainty with a small deliberate offset",
                    "The technique works best for point features on clear linear features at moderate distances",
                    "Deliberately overshooting to a catching feature then backtracking is often faster than trying to hit a target precisely"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["navigation-map-reading", "navigation-route-planning", "navigation-contouring"],
        relatedModules: ["navigation-terrain-association", "navigation-map-reading", "navigation-route-planning"]
    )

    // MARK: - 6. Contouring and Slope Navigation

    static let contouringAndSlopeNavigation = ExploreArticle(
        id: "navigation-contouring",
        domain: .navigation,
        title: "Contouring and Slope Navigation",
        summary: "Traversing slopes while maintaining elevation is one of the most demanding navigation tasks in mountain terrain. Mastering contouring techniques saves enormous energy and keeps you on route when crossing complex hillsides.",
        icon: "arrow.left.arrow.right",
        heroImageName: "Photos/Heroes/hero-navigation-contouring",
        sections: [
            ExploreSection(
                id: "contouring-technique",
                heading: "The Art of Contouring",
                body: "Contouring means traversing a slope while maintaining a constant elevation, following an imaginary contour line across the ground. In theory this is simple — walk level across the hillside. In practice it is one of the hardest navigation skills to execute well because the natural tendency on a slope is to drift downhill. The terrain itself conspires against you: gravity pulls you down, and paths of least resistance tend to descend. To contour effectively, use your altimeter (or GPS altitude, accepting its lower accuracy) as a constant reference. If you are contouring at 650 meters and your altimeter reads 640, you have dropped 10 meters and need to climb slightly. Without an altimeter, you must judge elevation by reading the terrain — maintaining your position relative to features at known elevations, such as a stream junction below you or a ridge crest above. Contouring is most useful when you need to traverse between two features at the same elevation without gaining or losing height unnecessarily. It is a core technique for efficient route-finding in mountain terrain.",
                diagram: nil,
                keyFacts: [
                    "Contouring means traversing a slope at constant elevation, following an imaginary contour line",
                    "The natural tendency is to drift downhill — constant vigilance is required",
                    "An altimeter provides the most reliable reference for maintaining elevation during contouring",
                    "Contouring is most efficient when crossing between two features at similar elevations"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "contouring-slope-aspect",
                heading: "Slope Aspect and Gradient Reading",
                body: "Understanding slope aspect — the direction a slope faces — is critical for both navigation and safety. In the Northern Hemisphere, south-facing slopes receive more solar radiation and are typically drier, warmer, and have less snow retention than north-facing slopes. This matters for navigation because slope conditions affect travel speed, visibility, and hazards. To determine slope aspect in the field, face directly downhill and take a compass bearing — that bearing is the aspect. On the map, slope aspect is determined by the direction contour lines descend. Reading gradient in the field is equally important: experienced navigators can estimate slope angle to within a few degrees by observing how the terrain falls away. A useful reference is that a 45-degree slope feels very steep and usually requires hands for support, a 30-degree slope is steep enough for avalanche release, and a 15-degree slope feels like a moderately steep hill walk. Matching the gradient you feel underfoot with the contour spacing on the map helps confirm your position on the hillside.",
                imageName: "Photos/navigation-slope-aspect",
                imageCaption: "Hillside showing contrasting slope aspects with varied snow cover",
                diagram: nil,
                keyFacts: [
                    "Slope aspect is the compass direction a slope faces — face directly downhill and read the bearing",
                    "South-facing slopes in the Northern Hemisphere are warmer and drier; north-facing are colder and hold more snow",
                    "45-degree slopes require hands for support; 30-degree slopes can release avalanches; 15-degree slopes are moderate hiking",
                    "Matching felt gradient with map contour spacing helps confirm your position on a hillside"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "contouring-boxing",
                heading: "Boxing Around Obstacles",
                body: "When a contouring traverse encounters an obstacle — a cliff band, a deep gully, a waterfall, or an area of dangerous ground — you must navigate around it without losing your line. The boxing technique provides a systematic approach. When you reach the obstacle, turn 90 degrees downhill (or uphill), count your paces to clear the obstacle, then turn back to your original bearing and continue traversing until you have passed the obstacle horizontally, then turn 90 degrees in the opposite direction and pace the same number of steps back to your original contour. This returns you to the same elevation on the far side of the obstacle. The technique requires accurate pacing and bearing discipline but is straightforward to execute. A simpler alternative, when the terrain allows, is to descend to a clearly identifiable feature below the obstacle, traverse below it using that feature as a handrail, and then re-ascend to your original elevation on the far side. This is less precise but often faster and less prone to error, particularly in poor visibility.",
                diagram: nil,
                keyFacts: [
                    "Boxing uses three 90-degree turns and equal pacing to navigate around obstacles while maintaining elevation",
                    "Count paces carefully on the descent leg and match them exactly on the re-ascent",
                    "An alternative is to descend to a handrail below the obstacle and traverse beneath it",
                    "In poor visibility, boxing is more reliable than trying to find a way through complex terrain"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["navigation-terrain-association", "navigation-map-reading", "navigation-whiteout"],
        relatedModules: ["navigation-contouring", "navigation-terrain-association", "navigation-map-reading"]
    )

    // MARK: - 7. Triangulation and Position Fixing

    static let triangulationAndPositionFixing = ExploreArticle(
        id: "navigation-triangulation",
        domain: .navigation,
        title: "Triangulation and Position Fixing",
        summary: "When you are unsure of your position, the ability to fix your location using compass bearings to visible landmarks is an essential mountain skill. Resection, intersection, and cross-checking with GPS form the navigator's toolkit for position confirmation.",
        icon: "triangle",
        heroImageName: "Photos/Heroes/hero-navigation-triangulation",
        sections: [
            ExploreSection(
                id: "triangulation-resection",
                heading: "Resection: Fixing Your Position",
                body: "Resection is the technique of determining your unknown position by taking compass bearings to two or more known features and plotting the back bearings on the map. To perform a resection, identify two or more features that you can see in the landscape and positively locate on the map — summits, church spires, distinct rock outcrops, or radio masts work well. Take a magnetic bearing to each feature, convert it to a grid bearing (accounting for declination), then calculate the back bearing by adding or subtracting 180 degrees. Plot each back bearing on the map from the known feature. Your position is at the intersection of the plotted lines. In practice, the lines rarely cross at a single point due to small errors in bearing taking. Instead, they form a 'cocked hat' — a small triangle of error. Your position is within this triangle, and a smaller cocked hat indicates more accurate bearings. Three bearings are better than two because the cocked hat reveals the magnitude of your error. Choose features that are roughly 60 to 120 degrees apart for the best geometric fix.",
                diagram: ExploreDiagram(
                    type: .triangle,
                    config: DiagramConfig(
                        vertices: [
                            DiagramVertex(id: "feature-a", label: "PEAK A", description: "Back bearing plotted from identified summit", color: "8B5CF6"),
                            DiagramVertex(id: "feature-b", label: "PEAK B", description: "Back bearing plotted from second landmark", color: "3B82F6"),
                            DiagramVertex(id: "feature-c", label: "TOWER C", description: "Back bearing plotted from third reference point", color: "22C55E")
                        ],
                        centerLabel: "YOUR POSITION",
                        centerDescription: "Intersection of back bearings (cocked hat)"
                    )
                ),
                keyFacts: [
                    "Resection uses back bearings from known features to fix an unknown position",
                    "Three bearings produce a 'cocked hat' — your position is within this triangle of error",
                    "Choose features 60-120 degrees apart for the best geometric accuracy",
                    "Convert magnetic bearings to grid bearings before plotting on the map"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "triangulation-intersection",
                heading: "Intersection: Locating Unknown Features",
                body: "Intersection is the reverse of resection. Instead of finding your position from known features, you use your known position to locate an unknown feature. From two or more known positions, take bearings to the unknown feature and plot them on the map. The feature is located where the bearing lines cross. This technique is useful for identifying distant peaks, locating the source of a sound (such as a distress signal), or plotting the position of a feature not shown on the map. Like resection, intersection works best when the angles between bearing lines are between 60 and 120 degrees. If you are working from two positions, try to choose locations that give a good angular spread to the target feature. Intersection can also be used with a single position if you can take a bearing to a feature that lies on a known linear feature — the bearing line will cross the linear feature at the target's location. This technique is called a single bearing position line and is useful for identifying where a path crosses a ridge, for example.",
                diagram: nil,
                keyFacts: [
                    "Intersection plots bearings from known positions to locate an unknown feature",
                    "Useful for identifying distant peaks, locating sound sources, or plotting unmarked features",
                    "Optimal accuracy when bearing lines cross at 60-120 degrees",
                    "A single bearing line crossing a known linear feature gives a position fix with just one bearing"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "triangulation-transit-lines",
                heading: "Transit Lines and Linear Position Fixes",
                body: "A transit line (or range line) is formed when two known features appear to line up — one directly behind the other from your viewpoint. This alignment places you somewhere on the straight line extending through both features, and it requires no compass at all. Transit lines are the most accurate position lines available to the mountain navigator because they depend on visual alignment rather than compass accuracy. A single transit line tells you that you are somewhere along a line; combine it with another position line — a compass bearing, a second transit, or a contour line — and you have a position fix. The contour line fix is particularly useful: if you can determine your elevation from an altimeter and you are standing on a transit line, your position is where that transit line crosses the appropriate contour. Linear features also provide continuous position lines. If you are walking along a river, you know your position is somewhere on that river, and a single compass bearing to a visible peak gives you a fix at the intersection of the bearing line and the river. Experienced navigators constantly use these techniques, often unconsciously, to maintain a running fix of their position.",
                diagram: nil,
                keyFacts: [
                    "A transit line forms when two known features align — no compass needed, very accurate",
                    "Combine a transit line with a compass bearing or altimeter reading for a full position fix",
                    "A position on a known linear feature requires only one additional bearing for a fix",
                    "Altimeter readings combined with position lines produce reliable fixes on contour lines"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "triangulation-gps-crosscheck",
                heading: "GPS Cross-Check and Hybrid Navigation",
                body: "Modern mountain navigation combines traditional techniques with GPS as a cross-checking system. The ideal workflow is to navigate primarily by terrain association and map reading, use compass bearings for precision work in poor visibility, and consult the GPS periodically to verify your position. This hybrid approach catches errors that either system alone might miss. If your terrain association suggests you are at grid reference 287 453 and the GPS agrees, your confidence is high. If they disagree significantly, you have a discrepancy to resolve before continuing — perhaps the GPS has multipath errors, or perhaps you have misidentified a terrain feature. GPS also provides a rapid cross-check for resection: take your compass bearings, plot the fix, and then compare it with the GPS position. If they agree within 50 to 100 meters, your fix is good. If they differ substantially, re-examine your bearing work and feature identification. The navigator who relies exclusively on either GPS or compass is missing the power of cross-verification. Use both systems to check each other, and your navigation will be more reliable than either alone.",
                diagram: nil,
                keyFacts: [
                    "Use GPS as a cross-check for traditional navigation, not as the primary method",
                    "If terrain association and GPS agree, confidence is high; if they disagree, stop and resolve the discrepancy",
                    "Compare compass resection fixes with GPS position — agreement within 50-100 meters confirms accuracy",
                    "Hybrid navigation using multiple methods catches errors that any single method would miss"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["navigation-compass", "navigation-gps-digital", "navigation-whiteout"],
        relatedModules: ["navigation-triangulation", "navigation-compass", "navigation-gps"]
    )

    // MARK: - 8. Whiteout Navigation

    static let whiteoutNavigation = ExploreArticle(
        id: "navigation-whiteout",
        domain: .navigation,
        title: "Whiteout Navigation",
        summary: "A whiteout — when cloud, snow, and white terrain merge into a featureless void — is the ultimate test of mountain navigation skill. Without visible landmarks, you must rely entirely on compass, pacing, and systematic techniques to move safely.",
        icon: "cloud.fog.fill",
        heroImageName: "Photos/Heroes/hero-navigation-whiteout",
        sections: [
            ExploreSection(
                id: "whiteout-what-happens",
                heading: "Understanding Whiteout Conditions",
                body: "A true whiteout occurs when overcast or foggy conditions combine with snow-covered terrain to eliminate all shadows, contrast, and depth perception. The horizon vanishes, the sky merges with the ground, and you cannot distinguish a slope from a flat surface or a dropoff. Even your sense of balance can be affected because your visual system provides no orientation reference. Whiteout is distinct from simple poor visibility: in fog, you can at least see the ground beneath your feet and judge gradient. In a full whiteout on a snow plateau, you may literally be unable to tell whether the ground ahead is rising, falling, or level. This makes navigation without instruments not just difficult but genuinely dangerous, as parties have walked over cornices and cliffs they could not see. The psychological effect is also significant — the sensory deprivation of a whiteout creates disorientation, anxiety, and a strong temptation to rely on instinct rather than instruments. Instinct in a whiteout is almost always wrong. Trust your compass, trust your pacing, and follow your pre-planned route card methodically.",
                imageName: "Photos/navigation-whiteout-conditions",
                imageCaption: "Mountaineers navigating through featureless whiteout on a snow plateau",
                diagram: nil,
                keyFacts: [
                    "Whiteout eliminates all shadows, contrast, and depth perception — you cannot judge terrain shape",
                    "Parties have walked over cliffs and cornices they could not see in whiteout conditions",
                    "Human directional instinct is unreliable without visual references — you will walk in circles",
                    "Whiteout navigation requires complete reliance on compass, pacing, and pre-planned route cards"
                ],
                warningNote: "Whiteout conditions on snow plateaus and ridges are genuinely life-threatening. If you do not have strong compass and pacing skills, do not continue — shelter in place and wait for conditions to improve rather than navigating blindly."
            ),
            ExploreSection(
                id: "whiteout-compass-pacing",
                heading: "Compass and Pacing in Zero Visibility",
                body: "In whiteout conditions, the compass is your only directional reference, and pacing is your only distance measure. Before entering terrain where whiteout is possible, you must know your personal pace count — the number of double paces you take over 100 meters on flat ground, on gentle uphill, on steep uphill, and in deep snow. For most people, this ranges from 60 to 70 double paces per 100 meters on flat ground, increasing to 80 or more on steep terrain or in deep snow. To navigate a leg in whiteout, set your bearing, begin walking, and count every double pace. The compass bearer walks on the bearing while a second person counts paces. Separate these roles because doing both simultaneously degrades accuracy. If navigating alone, stop every 50 paces to re-check your bearing, as it is extremely easy to drift off course in featureless conditions. In strong wind, you will tend to drift downwind, so be aware of the wind direction relative to your bearing and compensate. Each leg should be as short as possible — navigate to the nearest identifiable feature, confirm your position, then set the next leg.",
                imageName: "Photos/navigation-compass-pacing",
                imageCaption: "Navigator taking a compass bearing in zero-visibility conditions",
                diagram: nil,
                keyFacts: [
                    "Know your pace count: typically 60-70 double paces per 100 meters on flat ground",
                    "Pace count increases to 80+ on steep terrain or in deep snow",
                    "Separate compass bearing and pace counting roles between two people for better accuracy",
                    "Stop every 50 paces to re-check bearing when navigating alone in zero visibility"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "whiteout-leapfrog",
                heading: "Leapfrog and Dog-Leg Techniques",
                body: "The leapfrog technique is the gold standard for accurate straight-line navigation in whiteout when traveling in a group. The navigator sets the bearing and sends the most visible person forward on the bearing as far as they can be seen — perhaps only 10 to 20 meters in severe conditions. When the forward person reaches the limit of visibility, they stop and the navigator walks toward them, checking that the forward person remains on the bearing. The navigator then passes through, becomes the new reference point ahead, and the process repeats. This is slow but extremely accurate because you always have a visual reference point on your bearing line. The dog-leg technique is used to navigate around obstacles that you discover mid-leg. Rather than trying to estimate a course around the obstacle, make a deliberate 90-degree turn, pace a measured distance to clear the obstacle, turn back to your original bearing, traverse past the obstacle, then make another 90-degree turn and pace the same distance back to your original line. This is identical to the boxing technique but executed in zero visibility where the obstacle may not be visible until you are upon it.",
                diagram: nil,
                keyFacts: [
                    "Leapfrog: send a person forward on the bearing to the limit of visibility, then walk toward them",
                    "Leapfrog is slow but extremely accurate for maintaining a precise bearing line",
                    "Dog-leg technique: 90-degree turn, measured paces, return to bearing, traverse, 90-degree turn back",
                    "In severe whiteout, visibility may be as little as 5-10 meters — each leapfrog covers very little ground"
                ],
                warningNote: nil
            )
        ],
        relatedArticles: ["navigation-compass", "navigation-route-planning", "navigation-night"],
        relatedModules: ["navigation-whiteout", "navigation-compass", "navigation-route-planning"]
    )

    // MARK: - 9. Night Navigation

    static let nightNavigation = ExploreArticle(
        id: "navigation-night",
        domain: .navigation,
        title: "Night Navigation",
        summary: "Navigating in darkness demands adapted techniques, disciplined headlamp use, and heightened reliance on non-visual cues. Whether by necessity or design, night travel in the mountains requires careful preparation and a different navigational mindset.",
        icon: "moon.stars.fill",
        heroImageName: "Photos/Heroes/hero-navigation-night",
        sections: [
            ExploreSection(
                id: "night-adaptation",
                heading: "Dark Adaptation and Headlamp Discipline",
                body: "Your eyes take 20 to 30 minutes to fully adapt to darkness, and a single flash of bright light resets this process. Preserving night vision is therefore essential for effective night navigation. Use a headlamp with a red-light mode for map reading, as red light has minimal impact on dark adaptation. Keep the white beam for technical terrain where you need full detail, and always warn others before switching to white light. In moonlit conditions on snow or open terrain, you may find you can navigate without any artificial light once your eyes adapt, and this is actually preferable because headlamps create a tunnel of light that distorts depth perception and destroys awareness of the wider terrain. The pool of light from a headlamp also compresses your navigation horizon: instead of looking at features hundreds of meters away, you can only see the ground a few meters ahead. This means you must rely more heavily on compass bearings and pacing, and less on terrain association, than during daylight navigation. Plan for this shift in technique when you know your route will include night travel.",
                imageName: "Photos/navigation-headlamp-night",
                imageCaption: "Headlamp beam illuminating a mountain trail at night",
                diagram: nil,
                keyFacts: [
                    "Full dark adaptation takes 20-30 minutes and is reset by a single flash of white light",
                    "Use red-light mode for map reading to preserve night vision",
                    "Headlamps create a tunnel of light that reduces depth perception and limits terrain awareness",
                    "In good moonlight on snow, navigating without a headlamp often provides better spatial awareness"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "night-techniques",
                heading: "Navigation Techniques for Darkness",
                body: "Night navigation shares many techniques with whiteout navigation because both involve severely restricted visibility. Compass bearings and pacing become your primary tools, supplemented by the sounds and textures of the terrain. Running water, wind over a ridge, the crunch of different ground surfaces, and the feel of slope angle underfoot all provide navigational information that you may barely notice during the day. Use these cues actively. The sound of a stream can serve as a handrail; the sensation of the ground leveling off tells you when you have crested a col; a change from grass to rock underfoot confirms you have crossed a terrain boundary. In a group, the leapfrog technique works well with headlamps — the forward person is a visible reference point on the bearing. At night, silhouettes against the sky are surprisingly useful: ridgelines, individual trees, and buildings often stand out clearly against even a faintly lighter sky. Use skyline features for direction checking whenever possible, as they are visible at much greater range than ground features illuminated by a headlamp.",
                diagram: nil,
                keyFacts: [
                    "Sound, texture underfoot, and slope angle provide valuable non-visual navigation information at night",
                    "Stream sounds serve as audible handrails; ground texture changes confirm terrain boundaries",
                    "Skyline silhouettes — ridges, trees, buildings against the sky — are visible at greater range than headlamp-illuminated features",
                    "Leapfrog technique works effectively at night using headlamp-visible forward markers"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "night-hazards-preparation",
                heading: "Hazards and Preparation",
                body: "Night navigation introduces specific hazards beyond simply not being able to see. Cliff edges, steep drops, loose scree, and unmarked obstacles are all more dangerous in the dark because you discover them at closer range and have less time to react. Even familiar terrain can feel alien and disorienting at night, and navigation errors that would be quickly caught and corrected in daylight can compound into serious problems before you realize you are off course. Pre-plan your night route during daylight: walk the approach during the day if possible, memorize key features and decision points, and note potential hazards. Keep your navigation legs short and conservative — night is not the time for bold, committing decisions. A GPS with stored waypoints is particularly valuable at night as a position cross-check. Carry spare batteries for both headlamp and GPS, and ensure your spare headlamp is easily accessible in an outside pocket, not buried in your pack. Groups should stay close together at night, as separated group members in darkness on a mountainside can turn a navigational inconvenience into a search and rescue situation very quickly.",
                imageName: "Photos/navigation-night-group",
                imageCaption: "Group navigating a mountain path by headlamp in darkness",
                diagram: nil,
                keyFacts: [
                    "Cliff edges and steep drops are far more dangerous at night due to reduced reaction distance",
                    "Familiar terrain feels alien in darkness — pre-walk the route in daylight when possible",
                    "Keep navigation legs short and decisions conservative at night",
                    "Groups must stay close together — separated members in darkness can rapidly become an emergency"
                ],
                warningNote: "Never navigate at night near cliff edges, cornices, or technical terrain unless you have specific training and have reconnoitered the area in daylight. Falling accounts for a disproportionate share of mountain accidents in darkness."
            )
        ],
        relatedArticles: ["navigation-whiteout", "navigation-compass", "navigation-emergency"],
        relatedModules: ["navigation-night", "navigation-compass", "navigation-whiteout"]
    )

    // MARK: - 10. Emergency Navigation

    static let emergencyNavigation = ExploreArticle(
        id: "navigation-emergency",
        domain: .navigation,
        title: "Emergency Navigation",
        summary: "When your compass is lost, your GPS is dead, and the clouds have closed in, you are not helpless. Natural navigation methods — the sun, the stars, the wind, the vegetation — have guided travelers for millennia and remain available when technology fails.",
        icon: "star.fill",
        heroImageName: "Photos/Heroes/hero-navigation-emergency",
        sections: [
            ExploreSection(
                id: "emergency-sun-navigation",
                heading: "Navigating by the Sun",
                body: "The sun is the most reliable natural compass for daytime navigation. In the Northern Hemisphere, the sun is due south at solar noon (which varies from clock noon depending on your longitude and time zone). Before noon, the sun is in the eastern half of the sky; after noon, it is in the western half. The shadow stick method provides a more precise direction: place a straight stick vertically in the ground and mark the tip of its shadow with a stone. Wait 15 to 20 minutes and mark the new shadow tip. A line from the first mark to the second runs approximately east-to-west, with the first mark being the western end (since shadows move from west to east as the sun moves from east to west). A perpendicular line from this east-west line points approximately north. The watch method offers another approach: in the Northern Hemisphere, point the hour hand of an analog watch at the sun. The midpoint between the hour hand and 12 o'clock indicates south. These methods give approximate directions — good enough for emergency navigation toward a catching feature, though not precise enough for navigating narrow ridges or avoiding specific hazards.",
                diagram: ExploreDiagram(
                    type: .comparisonSplit,
                    config: DiagramConfig(
                        leftTitle: "Shadow Stick Method",
                        rightTitle: "Watch Method",
                        leftColor: "F59E0B",
                        rightColor: "8B5CF6",
                        leftItems: [
                            "Place vertical stick in ground",
                            "Mark shadow tip, wait 15-20 min",
                            "Mark new shadow tip",
                            "Line between marks runs east-west",
                            "Perpendicular line points north"
                        ],
                        rightItems: [
                            "Point hour hand at the sun",
                            "Bisect angle between hour hand and 12",
                            "Midpoint indicates south (N. Hemisphere)",
                            "Use 1 o'clock in summer (daylight saving)",
                            "Accuracy improves at higher latitudes"
                        ]
                    )
                ),
                keyFacts: [
                    "The sun is due south at solar noon in the Northern Hemisphere",
                    "The shadow stick method gives an east-west line in about 15-20 minutes",
                    "The watch method: point the hour hand at the sun, bisect to 12 for south",
                    "These methods give approximate directions — sufficient for reaching catching features"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "emergency-star-navigation",
                heading: "Star Navigation",
                body: "On a clear night, the stars provide a reliable directional reference. In the Northern Hemisphere, Polaris — the North Star — sits within one degree of true north and has guided navigators for thousands of years. To find Polaris, locate the constellation Ursa Major (the Plough or Big Dipper). The two stars at the end of the 'bowl' furthest from the handle are the Pointer Stars. Draw an imaginary line through these two stars and extend it approximately five times the distance between them. This line leads directly to Polaris, a moderately bright star that appears alone at the end of the handle of Ursa Minor (the Little Dipper). In the Southern Hemisphere, use the Southern Cross (Crux): extend the long axis of the cross 4.5 times its length to find the approximate position of the south celestial pole. Stars also indicate east and west: any star that has just risen is approximately east; any star that is about to set is approximately west. This works because all stars rise in the east and set in the west due to the Earth's rotation. Watching a star for a few minutes reveals its direction of movement: rising means east, sinking means west, moving right means south (Northern Hemisphere).",
                imageName: "Photos/navigation-star-sky",
                imageCaption: "Clear night sky over mountains with Polaris and the Plough visible",
                diagram: nil,
                keyFacts: [
                    "Polaris (North Star) is within 1 degree of true north and is found using the Plough's pointer stars",
                    "Extend the Plough's pointer star line 5 times to reach Polaris",
                    "Rising stars indicate east; setting stars indicate west",
                    "In the Southern Hemisphere, extend the Southern Cross's long axis 4.5 times to find south"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "emergency-natural-indicators",
                heading: "Natural Navigation Indicators",
                body: "The natural environment contains many directional clues, though none are individually reliable and all must be treated with caution. Prevailing wind direction is one of the most useful: if you know the prevailing wind in your area (westerly in most temperate regions), the lean of isolated trees, the deposition of windblown snow, and the feeling of wind on your face can give a rough directional reference. Vegetation patterns also offer clues. In the Northern Hemisphere, south-facing slopes receive more sunlight and tend to have drier, sparser vegetation, while north-facing slopes are damper with denser growth. Tree growth is often asymmetric due to prevailing wind, with branches extending further on the sheltered side. Moss grows on all sides of trees but tends to be thicker on the damper, shadier side (often north in the Northern Hemisphere), though this is highly variable and unreliable as a sole indicator. Snow melt patterns in spring provide clearer evidence: south-facing slopes lose snow first. Drainage patterns always lead downhill, and following water downstream will eventually lead to habitation in most mountain regions — though this route may involve waterfalls, gorges, and dangerous terrain.",
                diagram: nil,
                keyFacts: [
                    "Prevailing wind direction (often westerly in temperate regions) is one of the most reliable natural indicators",
                    "South-facing slopes in the Northern Hemisphere are drier with sparser vegetation; north-facing slopes are damper",
                    "Following water downstream eventually leads to habitation — but watch for waterfalls and gorges",
                    "No single natural indicator is reliable alone — use multiple clues to build a directional estimate"
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "emergency-improvised-compass",
                heading: "Improvised Compass and Systematic Descent",
                body: "An improvised compass can be made by magnetizing a small piece of ferrous metal — a sewing needle, a straightened safety pin, or a razor blade fragment — by stroking it repeatedly in one direction along a piece of silk, a magnet, or even your hair. Float the magnetized needle on a small leaf or piece of bark in still water, and it will slowly align itself with the Earth's magnetic field, indicating magnetic north. This method produces only a rough north-south line and requires patience and calm to execute, but it can provide enough directional information for emergency travel toward a known catching feature. When all navigation aids fail and you are lost in deteriorating conditions, systematic descent is often the safest strategy. Choose a broad, safe slope and descend carefully, staying well away from cliff edges and gullies. As you lose altitude, you will eventually reach vegetation, streams, paths, or fences that can guide you to habitation. The critical rule is to descend slowly and carefully — injured people in remote terrain are in a far worse situation than lost people who are uninjured. Resist the panic-driven urge to rush downhill. Move deliberately, protect yourself from further harm, and let gravity and terrain features guide you to safety.",
                diagram: nil,
                keyFacts: [
                    "A magnetized needle floated on water aligns with magnetic north — stroke it repeatedly in one direction to magnetize",
                    "An improvised compass gives a rough north-south line — sufficient for emergency travel toward catching features",
                    "Systematic descent on a broad, safe slope will eventually reach streams, paths, or habitation",
                    "Descend slowly and carefully — an injury in remote terrain is far more dangerous than being lost"
                ],
                warningNote: "Emergency navigation techniques give only approximate directions. They are survival tools for reaching large catching features, not precision instruments. If lost, descend carefully to lower ground rather than attempting precise navigation with improvised methods across hazardous terrain."
            )
        ],
        relatedArticles: ["navigation-compass", "navigation-night", "navigation-whiteout"],
        relatedModules: ["navigation-emergency", "navigation-compass", "navigation-night"]
    )
}
