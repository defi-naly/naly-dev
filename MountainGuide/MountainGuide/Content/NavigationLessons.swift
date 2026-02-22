import Foundation

enum NavigationLessons {

    // MARK: - Map Reading

    static let mapReading = Lesson(
        id: "map-reading",
        domain: .navigation,
        teachingSteps: [
            TeachingStep(
                id: "map-1",
                headline: "The Language of Contours",
                body: "Topographic maps represent three-dimensional terrain on a flat surface using contour lines — lines connecting points of equal elevation. On a 1:25,000 map, contour intervals are typically 10m. Every fifth contour (50m) is drawn heavier and labeled. The spacing between contours tells you steepness: close together means steep, far apart means gentle.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Topographic map section showing concentric contour lines forming a mountain peak with a gentle west slope (wide spacing) and steep east face (tight spacing). Elevation labels on index contours at 2400m, 2450m, 2500m.",
                    hotspots: [
                        RevealItem(id: "index-contour", label: "Index Contour", detail: "Every 5th contour is thicker and labeled with elevation. On 1:25,000 maps these appear every 50m.", x: 0.3, y: 0.4),
                        RevealItem(id: "steep-slope", label: "Steep Slope", detail: "Tightly packed contours indicate a steep gradient. Here the terrain drops 100m over just 200m horizontal distance — a 50% grade.", x: 0.75, y: 0.5),
                        RevealItem(id: "gentle-slope", label: "Gentle Slope", detail: "Widely spaced contours indicate a gradual slope. This western aspect descends 100m over 800m — a comfortable 12% grade for travel.", x: 0.2, y: 0.6),
                        RevealItem(id: "summit", label: "Summit", detail: "The innermost closed contour marks the summit area. The actual peak lies somewhere within this ring, up to one contour interval higher.", x: 0.5, y: 0.3)
                    ],
                    animationStyle: "fade"
                ),
                interactionHint: "Tap hotspots to explore map features",
                revealItems: nil
            ),
            TeachingStep(
                id: "map-2",
                headline: "Reading Terrain Features",
                body: "Contour shapes reveal specific landforms. A V-shape pointing uphill indicates a valley or drainage — water flows down the V. A V-shape pointing downhill indicates a ridge or spur — you can walk along it. Concentric closed loops mark summits or depressions (depressions have tick marks pointing inward). Saddles appear as an hourglass shape between two summits.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Ridge / Spur",
                    rightTitle: "Valley / Drainage",
                    leftColor: "8B5CF6",
                    rightColor: "3B82F6",
                    leftItems: ["Contour V points downhill", "Higher ground along center", "Safe travel corridor", "Wind-exposed"],
                    rightItems: ["Contour V points uphill", "Water collects here", "Flash flood risk", "Sheltered from wind"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "map-3",
                headline: "Scale and Distance",
                body: "Map scale determines what you can see and how far you can measure. At 1:25,000, 1cm on the map equals 250m on the ground. At 1:50,000, 1cm equals 500m. Use the grid lines: on most topographic maps, grid squares are 1km across. For slope distance, remember that map distance is horizontal — actual walking distance on steep terrain is longer. A 30-degree slope adds roughly 15% to your travel distance.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "detail", label: "1:10,000", minValue: 10000, maxValue: 15000, color: "22C55E", description: "High detail. 1cm = 100m. Trail junctions, buildings visible. Used for orienteering."),
                        DiagramZone(id: "hiking", label: "1:25,000", minValue: 15000, maxValue: 35000, color: "3B82F6", description: "Standard hiking scale. 1cm = 250m. Contours at 10m intervals. Ideal for mountain navigation."),
                        DiagramZone(id: "overview", label: "1:50,000", minValue: 35000, maxValue: 60000, color: "F59E0B", description: "Overview scale. 1cm = 500m. Contours at 20m intervals. Good for route planning, less useful for precise navigation."),
                        DiagramZone(id: "regional", label: "1:100,000", minValue: 60000, maxValue: 100000, color: "EF4444", description: "Regional overview. 1cm = 1km. Major features only. Not suitable for mountain navigation.")
                    ],
                    minValue: 10000,
                    maxValue: 100000,
                    unit: "scale",
                    currentValue: 25000
                ),
                interactionHint: "Drag to compare map scales",
                revealItems: nil
            ),
            TeachingStep(
                id: "map-4",
                headline: "Declination and Grid North",
                body: "Maps have three norths: True North (geographic pole), Grid North (top of map grid), and Magnetic North (where your compass points). The difference between Grid North and Magnetic North is the grid-magnetic angle — in the Alps it's roughly 2-3 degrees east. When transferring a bearing from map to compass, add the grid-magnetic angle. Getting this wrong by just 3 degrees puts you 52m off course per kilometer traveled.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.8, toX: 0.5, toY: 0.15, label: "Grid North", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.8, toX: 0.48, toY: 0.15, label: "True North", color: "22C55E"),
                        DiagramArrow(fromX: 0.5, fromY: 0.8, toX: 0.55, toY: 0.16, label: "Magnetic North", color: "EF4444")
                    ],
                    centerLabel: "Three Norths"
                ),
                interactionHint: nil,
                revealItems: nil
            )
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "map-q1",
                type: .multipleChoice,
                prompt: "On a 1:25,000 topographic map with 10m contour intervals, you count 8 contour lines between two points that are 2cm apart on the map. What is the approximate gradient?",
                difficulty: .intermediate,
                explanation: "8 contour lines at 10m intervals = 80m elevation change. 2cm at 1:25,000 = 500m horizontal distance. Gradient = 80/500 = 16%, or about 9 degrees.",
                options: [
                    PracticeOption(label: "16% (about 9°)", correct: true, explanation: "80m rise over 500m horizontal = 16% grade."),
                    PracticeOption(label: "40% (about 22°)", correct: false, explanation: "This would require 200m of elevation change, not 80m."),
                    PracticeOption(label: "4% (about 2°)", correct: false, explanation: "This would mean only 20m of elevation change over the distance."),
                    PracticeOption(label: "80% (about 39°)", correct: false, explanation: "This would mean the rise equals 80% of horizontal distance — far steeper than calculated.")
                ]
            ),
            PracticeQuestion(
                id: "map-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Contour lines that form a V-shape pointing toward higher elevation indicate a valley or drainage. Water flows down the V. Ridges have V-shapes pointing toward lower elevation.",
                statement: "On a topographic map, V-shaped contours pointing toward higher ground indicate a ridge.",
                isTrue: false,
                reasoning: "V-shapes pointing uphill indicate valleys or drainages where water collects and flows downhill. Ridges show V-shapes pointing downhill — the opposite pattern."
            ),
            PracticeQuestion(
                id: "map-q3",
                type: .calculation,
                prompt: "You measure 6.4cm on a 1:25,000 map between your current position and your destination. What is the horizontal distance in meters?",
                difficulty: .foundation,
                explanation: "At 1:25,000 scale, 1cm = 250m. So 6.4cm × 250m = 1,600m (1.6km).",
                correctAnswer: 1600,
                tolerance: 10,
                answerUnit: "m"
            ),
            PracticeQuestion(
                id: "map-q4",
                type: .sequenceOrder,
                prompt: "Order these terrain features from the contour pattern that would show the MOST tightly packed lines to the LEAST:",
                difficulty: .intermediate,
                explanation: "Cliff faces have the tightest contours (or overlapping), followed by steep gullies, moderate ridges, and finally valley floors which are nearly flat.",
                correctOrder: ["Cliff face", "Steep gully", "Moderate ridge", "Valley floor"],
                shuffledItems: ["Moderate ridge", "Valley floor", "Cliff face", "Steep gully"]
            )
        ],
        synthesisPrompt: "Topographic maps encode three-dimensional terrain into two-dimensional patterns. How does fluency in reading contour shapes connect to route planning and hazard avoidance? Think about how the same contour pattern might represent opportunity on one route and danger on another.",
        conceptMapNodes: [
            ConceptMapNode(id: "map-reading", label: "Map Reading", domain: .navigation, x: 0.5, y: 0.3, connections: ["compass", "route-planning", "terrain-association"]),
            ConceptMapNode(id: "contour-interpretation", label: "Contour Interpretation", domain: .navigation, x: 0.2, y: 0.55, connections: ["map-reading", "contouring"]),
            ConceptMapNode(id: "scale-distance", label: "Scale & Distance", domain: .navigation, x: 0.8, y: 0.55, connections: ["map-reading", "route-planning"]),
            ConceptMapNode(id: "slope-angle-nav", label: "Slope Assessment", domain: .avalanche, x: 0.5, y: 0.75, connections: ["map-reading"])
        ]
    )

    // MARK: - Compass

    static let compass = Lesson(
        id: "compass",
        domain: .navigation,
        teachingSteps: [
            TeachingStep(
                id: "compass-1",
                headline: "Anatomy of a Baseplate Compass",
                body: "A baseplate compass has four critical parts: the magnetic needle (red end points to magnetic north), the rotating bezel marked 0-360 degrees, the direction-of-travel arrow on the baseplate, and the orienting lines inside the housing. These components work together to let you take bearings, follow bearings, and orient your map.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "A baseplate compass showing the magnetic needle, rotating bezel with degree markings, direction-of-travel arrow, and orienting lines inside the housing",
                    hotspots: [
                        RevealItem(id: "needle", label: "Magnetic Needle", detail: "The red end always points to magnetic north. When the red end aligns with the orienting arrow ('red in the shed'), your bearing is set.", x: 0.5, y: 0.4),
                        RevealItem(id: "bezel", label: "Rotating Bezel", detail: "Marked 0-360°. Each small tick is typically 2°. Rotate to set or read bearings. N=0°/360°, E=90°, S=180°, W=270°.", x: 0.7, y: 0.3),
                        RevealItem(id: "dot-arrow", label: "Direction of Travel Arrow", detail: "Point this at your target when taking a bearing. When following a bearing, walk in the direction this arrow points.", x: 0.5, y: 0.15),
                        RevealItem(id: "orienting-lines", label: "Orienting Lines", detail: "Parallel lines inside the housing. Align these with north-south grid lines on the map when plotting bearings.", x: 0.45, y: 0.55)
                    ],
                    animationStyle: "fade"
                ),
                interactionHint: "Tap compass parts to learn their function",
                revealItems: nil
            ),
            TeachingStep(
                id: "compass-2",
                headline: "Taking a Field Bearing",
                body: "To take a bearing to a visible feature: hold the compass flat at waist level, point the direction-of-travel arrow at the target, then rotate the bezel until the red needle sits inside the orienting arrow — 'red in the shed.' Read the bearing where the direction-of-travel arrow meets the bezel. This is your magnetic bearing.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "step1", label: "Point", value: 1, description: "Hold compass flat. Point direction-of-travel arrow at your target feature.", color: "3B82F6"),
                        DiagramSegment(id: "step2", label: "Rotate", value: 2, description: "Turn the bezel until red needle sits inside orienting arrow (red in the shed).", color: "8B5CF6"),
                        DiagramSegment(id: "step3", label: "Read", value: 3, description: "Read bearing at the index line where direction-of-travel arrow meets bezel.", color: "22C55E"),
                        DiagramSegment(id: "step4", label: "Verify", value: 4, description: "Sanity check: does the bearing make sense given your rough sense of direction?", color: "F59E0B")
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "compass-3",
                headline: "Map-to-Field Bearing",
                body: "To walk a bearing from the map: place the compass on the map with the edge connecting your position to the target. Rotate the bezel until orienting lines align with the map's north-south grid lines (make sure the N on the bezel points to the top of the map). Add the magnetic declination. Then lift the compass, hold it flat, turn your body until red is in the shed, and walk the direction-of-travel arrow.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "On the Map",
                    rightTitle: "In the Field",
                    leftColor: "3B82F6",
                    rightColor: "22C55E",
                    leftItems: ["Edge connects A to B", "Orienting lines align with grid lines", "N on bezel points to map north", "Read grid bearing"],
                    rightItems: ["Add magnetic declination", "Hold compass flat at chest", "Rotate body: red in the shed", "Walk direction-of-travel arrow"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "compass-4",
                headline: "Back Bearings and Error Checking",
                body: "A back bearing is the opposite direction — add or subtract 180 degrees. If your bearing to a peak is 045°, the back bearing is 225°. Use back bearings to check your position: turn around and take a bearing back to where you came from. If it doesn't match the expected back bearing within 3-5 degrees, you've drifted off course. In mountain terrain, even small errors compound — a 5-degree error over 1km puts you 87m off target.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.7, toX: 0.8, toY: 0.3, label: "Forward: 045°", color: "22C55E"),
                        DiagramArrow(fromX: 0.8, fromY: 0.3, toX: 0.2, toY: 0.7, label: "Back: 225°", color: "EF4444")
                    ],
                    centerLabel: "±180°"
                ),
                interactionHint: nil,
                revealItems: nil
            )
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "compass-q1",
                type: .multipleChoice,
                prompt: "You take a map bearing of 312° (grid). The magnetic declination is 3° east. What magnetic bearing do you set on your compass to walk?",
                difficulty: .intermediate,
                explanation: "With east declination, magnetic north is east of grid north. To convert grid bearing to magnetic: subtract east declination. 312° - 3° = 309°. Remember: Grid to Mag — subtract east, add west.",
                options: [
                    PracticeOption(label: "309°", correct: true, explanation: "Grid to Magnetic with east declination: subtract. 312° - 3° = 309°."),
                    PracticeOption(label: "315°", correct: false, explanation: "This adds the declination — you'd be 6° off from the correct answer."),
                    PracticeOption(label: "312°", correct: false, explanation: "This ignores declination entirely. Over 1km you'd be 52m off course."),
                    PracticeOption(label: "132°", correct: false, explanation: "This is closer to the back bearing, not the forward bearing.")
                ]
            ),
            PracticeQuestion(
                id: "compass-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Holding the compass near metallic objects (ice axes, trekking poles, metal belt buckles, electronics) causes the needle to deviate from magnetic north.",
                statement: "You should hold your compass at arm's length away from your body and any metal objects when taking a bearing.",
                isTrue: true,
                reasoning: "Metal objects create local magnetic fields that deflect the compass needle. Ice axes, trekking poles, and even phones can cause errors of 10° or more. Always extend the compass away from gear."
            ),
            PracticeQuestion(
                id: "compass-q3",
                type: .calculation,
                prompt: "Your forward bearing to a summit is 127°. What is the back bearing?",
                difficulty: .foundation,
                explanation: "Back bearing = forward bearing + 180°. 127° + 180° = 307°.",
                correctAnswer: 307,
                tolerance: 0,
                answerUnit: "°"
            ),
            PracticeQuestion(
                id: "compass-q4",
                type: .sequenceOrder,
                prompt: "Order the steps for taking a map bearing from your position to a destination:",
                difficulty: .foundation,
                explanation: "The correct sequence ensures accurate bearing transfer from map to compass to field.",
                correctOrder: [
                    "Place compass edge from position to target on map",
                    "Rotate bezel until orienting lines parallel grid lines",
                    "Read grid bearing at index line",
                    "Add or subtract magnetic declination"
                ],
                shuffledItems: [
                    "Read grid bearing at index line",
                    "Place compass edge from position to target on map",
                    "Add or subtract magnetic declination",
                    "Rotate bezel until orienting lines parallel grid lines"
                ]
            )
        ],
        synthesisPrompt: "The compass translates between the abstract world of the map and the physical landscape around you. Why is understanding the three types of north critical, and how does a small declination error compound over a day of mountain travel?",
        conceptMapNodes: [
            ConceptMapNode(id: "compass", label: "Compass Navigation", domain: .navigation, x: 0.5, y: 0.3, connections: ["map-reading", "triangulation", "whiteout-navigation"]),
            ConceptMapNode(id: "bearings", label: "Bearings", domain: .navigation, x: 0.2, y: 0.55, connections: ["compass", "triangulation"]),
            ConceptMapNode(id: "declination", label: "Declination", domain: .navigation, x: 0.8, y: 0.55, connections: ["compass", "map-reading"]),
            ConceptMapNode(id: "field-technique", label: "Field Technique", domain: .navigation, x: 0.5, y: 0.75, connections: ["compass"])
        ]
    )

    // MARK: - GPS

    static let gps = Lesson(
        id: "gps",
        domain: .navigation,
        teachingSteps: [
            TeachingStep(
                id: "gps-1",
                headline: "How GPS Works",
                body: "GPS receivers calculate position by measuring the time signals take to arrive from at least 4 satellites. Each satellite broadcasts its position and a precise time signal. The receiver calculates its distance from each satellite, then uses trilateration to determine your position. Accuracy is typically 3-5m in open terrain, but degrades significantly in canyons, dense forest, and near cliff faces where signals bounce (multipath error).",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Diagram showing a GPS receiver on a mountain slope receiving signals from four satellites overhead, with signal lines drawn between each satellite and the receiver. One signal bounces off a cliff face showing multipath error.",
                    hotspots: [
                        RevealItem(id: "sat-4", label: "4+ Satellites", detail: "Minimum 4 satellites needed for a 3D fix (latitude, longitude, elevation). More satellites improve accuracy. Below 4, the receiver cannot determine altitude.", x: 0.5, y: 0.15),
                        RevealItem(id: "multipath", label: "Multipath Error", detail: "Signals bouncing off cliff faces or buildings arrive late, causing position errors of 10-30m. Common in steep terrain and narrow valleys.", x: 0.8, y: 0.5),
                        RevealItem(id: "accuracy", label: "3-5m Accuracy", detail: "Civilian GPS accuracy in ideal conditions. Altitude accuracy is typically 1.5x worse than horizontal. A 5m horizontal error means ~7.5m altitude uncertainty.", x: 0.3, y: 0.65)
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: "Tap elements to understand GPS capabilities",
                revealItems: nil
            ),
            TeachingStep(
                id: "gps-2",
                headline: "GPS Limitations in Mountains",
                body: "Mountains create the worst conditions for GPS accuracy. Steep terrain blocks satellite signals, reducing the number of visible satellites. Narrow valleys limit satellite geometry (Dilution of Precision). Cold temperatures drain batteries 2-3x faster — a phone GPS that lasts 8 hours at sea level may die in 3 hours at -10°C. Signal acquisition can take 5-15 minutes in cold start conditions. Never rely on GPS as your sole navigation tool.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "GPS Strengths",
                    rightTitle: "GPS Limitations",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: ["Precise coordinates in open terrain", "Track recording for backtracking", "Pre-loaded waypoints for route", "Distance/elevation tracking"],
                    rightItems: ["Battery dies in cold (3hrs at -10°C)", "Multipath error near cliffs", "No signal in deep canyons", "Altitude accuracy ±7-15m"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "gps-3",
                headline: "Coordinate Systems",
                body: "GPS devices display coordinates in different formats. Latitude/Longitude (WGS84) is universal: N 46°33'21\" E 7°52'15\". UTM grid coordinates (like 32T 630245 5158890) divide the Earth into numbered zones and give metric easting/northing. Swiss maps use the CH1903+ grid (e.g., 2'630'245 / 1'158'890). Always verify which coordinate system your map and GPS share — a mismatch can put you kilometers from your actual position.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "wgs84", name: "WGS84 (Lat/Long)", color: "3B82F6", heightRatio: 0.33, description: "Universal GPS datum. N 46°33'21\" E 7°52'15\". Works worldwide. Default on most GPS units."),
                        DiagramLayer(id: "utm", name: "UTM Grid", color: "8B5CF6", heightRatio: 0.33, description: "Metric grid system. Zone + Easting + Northing. Easy distance calculation. Used on many hiking maps."),
                        DiagramLayer(id: "local", name: "Local Grid (e.g., CH1903+)", color: "F59E0B", heightRatio: 0.34, description: "Country-specific grid. Optimized for local accuracy. Swiss maps use CH1903+ coordinates.")
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "gps-4",
                headline: "GPS Best Practices",
                body: "Carry spare batteries and keep them warm in an inside pocket. Set waypoints at critical decision points before you need them: trail junctions, hut locations, emergency descent routes. Mark your starting point. Download offline maps — cellular data is unreliable in mountains. Cross-check GPS position against map and compass regularly. If your GPS says you're somewhere that doesn't match the terrain you see, trust the terrain and your compass.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "prep", label: "Before Trip", value: 1, description: "Download offline maps. Pre-load waypoints. Charge batteries. Pack spares in warm pocket.", color: "3B82F6"),
                        DiagramSegment(id: "start", label: "Trailhead", value: 2, description: "Mark start waypoint. Verify coordinate system matches map. Confirm satellite fix (4+ sats).", color: "22C55E"),
                        DiagramSegment(id: "route", label: "On Route", value: 3, description: "Mark key waypoints. Cross-check GPS against map/compass every 30 min. Monitor battery.", color: "F59E0B"),
                        DiagramSegment(id: "emergency", label: "If GPS Fails", value: 4, description: "Revert to map and compass immediately. Use last known GPS position as reference. Don't wait for re-acquisition.", color: "EF4444")
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            )
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "gps-q1",
                type: .multipleChoice,
                prompt: "Your GPS shows an accuracy of 25m and you're navigating to a waypoint at the edge of a cliff band. What should you do?",
                difficulty: .intermediate,
                explanation: "With 25m accuracy, you could be anywhere within a 50m-diameter circle. Near cliff bands, this margin could place you on either side of a lethal drop. Switch to map and compass for precise navigation near hazards.",
                options: [
                    PracticeOption(label: "Stop and navigate the final approach with map and compass", correct: true, explanation: "25m accuracy near a cliff is dangerous. Use precise compass bearings and terrain features for the final approach."),
                    PracticeOption(label: "Continue following the GPS arrow to the waypoint", correct: false, explanation: "25m uncertainty near a cliff edge could be fatal. The GPS might guide you over the edge."),
                    PracticeOption(label: "Wait for better satellite reception to improve accuracy", correct: false, explanation: "In mountain terrain, accuracy may not improve. Meanwhile you're burning daylight near a hazard."),
                    PracticeOption(label: "Turn on airplane mode to save battery for later", correct: false, explanation: "This doesn't address the immediate navigation hazard.")
                ]
            ),
            PracticeQuestion(
                id: "gps-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "GPS altitude accuracy is typically 1.5 to 2 times worse than horizontal accuracy due to satellite geometry — satellites are all above you, not below, so vertical precision suffers.",
                statement: "GPS altitude readings are equally accurate as horizontal position readings.",
                isTrue: false,
                reasoning: "GPS altitude accuracy is 1.5-2x worse than horizontal because all satellites are above the receiver. A GPS showing 5m horizontal accuracy may have 7-10m altitude uncertainty."
            ),
            PracticeQuestion(
                id: "gps-q3",
                type: .multipleChoice,
                prompt: "You're planning a winter alpine route. At what temperature does battery performance become a serious concern for GPS devices?",
                difficulty: .foundation,
                explanation: "Lithium-ion batteries lose significant capacity below 0°C. At -10°C, a battery may deliver only 50-60% of its rated capacity. At -20°C, it may fail entirely.",
                options: [
                    PracticeOption(label: "Below 0°C, with severe impact below -10°C", correct: true, explanation: "Battery performance drops sharply below freezing, losing 30-50% capacity at -10°C."),
                    PracticeOption(label: "Below -20°C only", correct: false, explanation: "Significant capacity loss begins at 0°C, not -20°C."),
                    PracticeOption(label: "Temperature doesn't significantly affect GPS batteries", correct: false, explanation: "Cold is one of the biggest GPS reliability risks in mountain environments."),
                    PracticeOption(label: "Below 10°C", correct: false, explanation: "Most batteries perform adequately until they reach freezing temperatures.")
                ]
            ),
            PracticeQuestion(
                id: "gps-q4",
                type: .sequenceOrder,
                prompt: "Order these GPS troubleshooting steps when your device shows poor accuracy in a mountain valley:",
                difficulty: .intermediate,
                explanation: "Systematic troubleshooting starts with basic fixes (clear sky view), then checks device settings, then falls back to analog tools if the problem persists.",
                correctOrder: [
                    "Move to open terrain with more sky exposure",
                    "Wait 2-3 minutes for better satellite acquisition",
                    "Verify coordinate system matches your map",
                    "Switch to map and compass navigation"
                ],
                shuffledItems: [
                    "Switch to map and compass navigation",
                    "Move to open terrain with more sky exposure",
                    "Verify coordinate system matches your map",
                    "Wait 2-3 minutes for better satellite acquisition"
                ]
            )
        ],
        synthesisPrompt: "GPS is a powerful tool but a dangerous crutch. How do GPS limitations in mountain terrain reinforce the need for map and compass competence? Consider scenarios where GPS failure could become life-threatening.",
        conceptMapNodes: [
            ConceptMapNode(id: "gps", label: "GPS Navigation", domain: .navigation, x: 0.5, y: 0.3, connections: ["map-reading", "route-planning", "emergency-navigation"]),
            ConceptMapNode(id: "satellite-geometry", label: "Satellite Geometry", domain: .navigation, x: 0.2, y: 0.55, connections: ["gps"]),
            ConceptMapNode(id: "coordinate-systems", label: "Coordinate Systems", domain: .navigation, x: 0.8, y: 0.55, connections: ["gps", "map-reading"]),
            ConceptMapNode(id: "battery-management", label: "Battery Management", domain: .navigation, x: 0.5, y: 0.75, connections: ["gps", "emergency-navigation"])
        ]
    )

    // MARK: - Route Planning

    static let routePlanning = Lesson(
        id: "route-planning",
        domain: .navigation,
        teachingSteps: [
            TeachingStep(
                id: "route-1",
                headline: "Naismith's Rule",
                body: "The foundation of mountain timing: allow 1 hour for every 5km horizontal distance, plus 1 hour for every 600m of ascent. A 10km route with 1,200m of climbing takes roughly 4 hours (2 for distance + 2 for ascent). For descent, add 10 minutes per 300m on moderate terrain, more on steep or technical ground. Adjust for fitness, group size, and conditions — a group of 6 moves 20-30% slower than a group of 2.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "fast", label: "Fast Party", minValue: 0, maxValue: 3, color: "22C55E", description: "Fit pair on good trail. 5km/hr + 600m/hr ascent rate. Minimal stops."),
                        DiagramZone(id: "moderate", label: "Average Party", minValue: 3, maxValue: 6, color: "3B82F6", description: "Standard Naismith's: 5km/hr + 600m/hr. Add 20% for groups of 4+."),
                        DiagramZone(id: "slow", label: "Slow Conditions", minValue: 6, maxValue: 10, color: "F59E0B", description: "Heavy packs, poor weather, off-trail. Reduce to 3km/hr + 400m/hr."),
                        DiagramZone(id: "technical", label: "Technical Terrain", minValue: 10, maxValue: 15, color: "EF4444", description: "Scrambling, snow, glaciers. May be 1-2km/hr. Time per pitch, not per km.")
                    ],
                    minValue: 0,
                    maxValue: 15,
                    unit: "hours",
                    currentValue: 5
                ),
                interactionHint: "Drag to estimate trip duration by conditions",
                revealItems: nil
            ),
            TeachingStep(
                id: "route-2",
                headline: "Leg Planning and Checkpoints",
                body: "Break your route into legs between identifiable checkpoints — trail junctions, stream crossings, ridgelines, col passes. For each leg, note: distance, bearing, elevation change, estimated time, and identifiable features. This creates a 'route card' that lets you track progress even in poor visibility. If you miss a checkpoint, you know immediately rather than discovering you're lost 2 hours later.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "leg1", label: "Trailhead → Stream", value: 1.5, description: "2.1km, bearing 285°, +340m, 1.5hrs. Follow marked trail through forest.", color: "22C55E"),
                        DiagramSegment(id: "leg2", label: "Stream → Col", value: 2.0, description: "1.8km, bearing 310°, +520m, 2hrs. Steep switchbacks. Snow possible above 2400m.", color: "3B82F6"),
                        DiagramSegment(id: "leg3", label: "Col → Summit", value: 1.5, description: "1.2km, bearing 355°, +280m, 1.5hrs. Exposed ridge. Scrambling grade II.", color: "F59E0B"),
                        DiagramSegment(id: "leg4", label: "Summit → Hut", value: 2.0, description: "3.5km, bearing 120°, -890m, 2hrs descent. Scree slope then grass.", color: "8B5CF6")
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "route-3",
                headline: "Escape Routes and Turnaround Times",
                body: "Every route plan needs at least two escape routes — pre-planned alternatives for when conditions deteriorate. Identify these on the map before departure: sheltered descents, hut locations, valley routes. Set a firm turnaround time based on daylight, weather windows, and your slowest pace. The turnaround time is non-negotiable. Summit fever kills more mountaineers than technical difficulty.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "objective", label: "Objective", description: "Your summit or destination. Reaching it is desirable but never mandatory.", color: "22C55E"),
                        DiagramVertex(id: "turnaround", label: "Turnaround Time", description: "The latest time you can begin descent with adequate safety margin. Non-negotiable.", color: "EF4444"),
                        DiagramVertex(id: "escape", label: "Escape Routes", description: "Pre-planned alternatives: sheltered descents, huts, valley routes. Know at least two.", color: "F59E0B")
                    ],
                    centerLabel: "Route Safety",
                    centerDescription: "All three elements must be planned before departure. The turnaround time protects you from summit fever."
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "route-4",
                headline: "Terrain Hazard Assessment",
                body: "During planning, identify hazards on the map: avalanche-prone slopes (30-45°), cliff bands (closely packed contours), river crossings (especially in afternoon when snowmelt peaks), rockfall gullies (loose scree on steep slopes), and exposure to weather (ridgelines, open plateaus). Time your route to minimize exposure: cross avalanche paths early morning when snow is frozen, traverse ridges before afternoon storms build, cross rivers in the morning.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Mountain route overview showing a planned path from valley to summit, with hazard zones highlighted: an avalanche slope at 35 degrees, a cliff band, a river crossing, and an exposed ridge section",
                    hotspots: [
                        RevealItem(id: "avy-slope", label: "Avalanche Slope (35°)", detail: "Cross early morning when snow is frozen solid. Avoid after 10am in spring conditions. Have probe and shovel ready.", x: 0.3, y: 0.5),
                        RevealItem(id: "cliff-band", label: "Cliff Band", detail: "Contours nearly touching on the map. Find the weakness — a gully or ledge system — during planning, not when you arrive.", x: 0.6, y: 0.4),
                        RevealItem(id: "river-crossing", label: "River Crossing", detail: "Snowmelt swells rivers by afternoon. Plan to cross before 9am. Identify backup crossing points upstream and downstream.", x: 0.2, y: 0.75),
                        RevealItem(id: "exposed-ridge", label: "Exposed Ridge", detail: "Lightning and wind hazard. Plan to traverse before noon when thunderstorms typically build. No shelter available.", x: 0.7, y: 0.25)
                    ],
                    animationStyle: "fade"
                ),
                interactionHint: "Tap hazard zones to learn timing strategies",
                revealItems: nil
            )
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "route-q1",
                type: .calculation,
                prompt: "Using Naismith's Rule (5km/hr + 1hr per 600m ascent), estimate the time for a leg that covers 3km horizontal distance with 450m of elevation gain.",
                difficulty: .foundation,
                explanation: "Distance time: 3km ÷ 5km/hr = 0.6 hours (36 min). Ascent time: 450m ÷ 600m/hr = 0.75 hours (45 min). Total: 0.6 + 0.75 = 1.35 hours ≈ 1 hour 21 minutes.",
                correctAnswer: 1.35,
                tolerance: 0.1,
                answerUnit: "hours"
            ),
            PracticeQuestion(
                id: "route-q2",
                type: .multipleChoice,
                prompt: "You planned a 7-hour round trip starting at 6am with a turnaround time of 12pm. At 11:30am you are 30 minutes from the summit. What do you do?",
                difficulty: .intermediate,
                explanation: "The turnaround time is non-negotiable. Reaching the summit at 12pm means you'd start descent at the turnaround time with zero margin. Conditions often worsen in afternoon. Turn around.",
                options: [
                    PracticeOption(label: "Turn around now — you'll exceed your turnaround time", correct: true, explanation: "30 minutes to summit means arriving at noon exactly — no margin for the unexpected. Turnaround times exist because summit fever clouds judgment."),
                    PracticeOption(label: "Push to the summit — it's only 30 minutes away", correct: false, explanation: "This is summit fever. '30 minutes' often becomes 45 in reality, and you've already used all your time margin."),
                    PracticeOption(label: "Radio for a weather update before deciding", correct: false, explanation: "The turnaround time already accounts for weather. Seeking reasons to continue is rationalization, not decision-making."),
                    PracticeOption(label: "Speed up to reach the summit by 12pm", correct: false, explanation: "Rushing in mountain terrain increases accident risk and still leaves zero margin for descent.")
                ]
            ),
            PracticeQuestion(
                id: "route-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Naismith's Rule must be adjusted for conditions. Heavy packs, poor weather, snow, group size, and off-trail terrain all slow pace significantly.",
                statement: "Naismith's Rule of 5km/hr plus 600m/hr of ascent is accurate for all mountain conditions.",
                isTrue: false,
                reasoning: "Naismith's Rule is a baseline for fit hikers on trails in good conditions. Heavy packs reduce speed 20-30%, snow 30-50%, and large groups 20-30%. Always adjust for actual conditions."
            ),
            PracticeQuestion(
                id: "route-q4",
                type: .matchPairs,
                prompt: "Match each hazard to its timing mitigation strategy:",
                difficulty: .intermediate,
                explanation: "Mountain hazards often have predictable daily patterns that can be mitigated through timing.",
                matchPairs: [
                    MatchPair(left: "Avalanche slope crossing", right: "Early morning (frozen snow)"),
                    MatchPair(left: "River crossing", right: "Before 9am (low snowmelt)"),
                    MatchPair(left: "Exposed ridge traverse", right: "Before noon (pre-thunderstorm)"),
                    MatchPair(left: "Steep descent on scree", right: "Before afternoon heat (dry conditions)")
                ]
            )
        ],
        synthesisPrompt: "Route planning is risk management disguised as logistics. How does breaking a route into timed legs with checkpoints transform a potentially dangerous mountain day into a controlled, decision-rich process?",
        conceptMapNodes: [
            ConceptMapNode(id: "route-planning", label: "Route Planning", domain: .navigation, x: 0.5, y: 0.3, connections: ["map-reading", "terrain-association", "whiteout-navigation"]),
            ConceptMapNode(id: "naismaths-rule", label: "Naismith's Rule", domain: .navigation, x: 0.2, y: 0.55, connections: ["route-planning"]),
            ConceptMapNode(id: "escape-routes", label: "Escape Routes", domain: .navigation, x: 0.8, y: 0.55, connections: ["route-planning", "emergency-navigation"]),
            ConceptMapNode(id: "hazard-timing", label: "Hazard Timing", domain: .avalanche, x: 0.5, y: 0.75, connections: ["route-planning"])
        ]
    )

    // MARK: - Terrain Association

    static let terrainAssociation = Lesson(
        id: "terrain-association",
        domain: .navigation,
        teachingSteps: [
            TeachingStep(
                id: "terrain-1",
                headline: "Seeing the Map in the Landscape",
                body: "Terrain association is the art of continuously matching what you see on the map to what you see around you. Instead of walking bearing-to-bearing, you maintain a mental model of the terrain: 'I should see a spur to my left, a stream below me, and the col ahead.' This gives you constant position awareness without stopping to take bearings. It's the fastest and most natural form of mountain navigation.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Map View",
                    rightTitle: "Terrain View",
                    leftColor: "3B82F6",
                    rightColor: "22C55E",
                    leftItems: ["Contour spur extending NW", "Stream in valley bottom", "Col between two peaks", "Cliff band on east face"],
                    rightItems: ["Rocky ridge dropping to your left", "Sound of running water below", "Low point on skyline ahead", "Steep dark face to the right"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "terrain-2",
                headline: "Handrails and Catching Features",
                body: "A handrail is a linear feature that runs roughly parallel to your direction of travel: a stream, ridge, tree line, power line, or trail. Follow it without constant compass work. A catching feature is a large, unmissable feature beyond your target that tells you you've gone too far: a road, river, cliff edge, or lake. Plan your route to use both — handrails for efficient travel, catching features as safety nets.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "A mountain landscape showing a route that follows a stream (handrail) toward a col, with a road in the valley beyond as a catching feature. The target destination is a hut near the col.",
                    hotspots: [
                        RevealItem(id: "handrail", label: "Handrail (Stream)", detail: "Follow this stream upvalley. It runs within 100m of your route for 2km. No compass needed — just keep the stream to your right.", x: 0.3, y: 0.6),
                        RevealItem(id: "catching", label: "Catching Feature (Road)", detail: "If you overshoot the col, you'll hit this road within 500m. It's impossible to miss. Turn right on the road to relocate.", x: 0.5, y: 0.85),
                        RevealItem(id: "attack", label: "Attack Point", detail: "The stream fork is an unmistakable feature 400m before the hut. From here, take a precise bearing for the final approach.", x: 0.5, y: 0.45),
                        RevealItem(id: "target", label: "Target (Hut)", detail: "Small feature that's easy to miss in poor visibility. Use the attack point to begin precise navigation for the last 400m.", x: 0.6, y: 0.35)
                    ],
                    animationStyle: "fade"
                ),
                interactionHint: "Tap navigation features to understand their role",
                revealItems: nil
            ),
            TeachingStep(
                id: "terrain-3",
                headline: "Attack Points and Aiming Off",
                body: "An attack point is an identifiable feature close to your target from which you begin precise navigation. Rather than navigating 3km on a bearing to a small hut, navigate to a distinctive stream junction 400m away, then take a precise bearing for the short final leg. Aiming off means deliberately targeting slightly left or right of your objective. If you aim directly for a hut on a path and miss, you don't know which way to turn. Aim 5-10 degrees left, and when you hit the path, you know to turn right.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.15, fromY: 0.7, toX: 0.45, toY: 0.35, label: "Aim Left (5°)", color: "3B82F6"),
                        DiagramArrow(fromX: 0.45, fromY: 0.35, toX: 0.6, toY: 0.35, label: "Turn Right →", color: "22C55E"),
                        DiagramArrow(fromX: 0.15, fromY: 0.8, toX: 0.55, toY: 0.5, label: "Direct (risky)", color: "EF4444")
                    ],
                    centerLabel: "Aiming Off"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "terrain-4",
                headline: "Collecting Features and Tick-Off",
                body: "As you travel, mentally tick off features you pass: 'crossed the stream, passed the boulder field, now on the spur.' These collecting features confirm your position incrementally. If you expect to cross a stream after 15 minutes and haven't after 25, something is wrong — stop and relocate immediately. Don't push on hoping it will sort itself out. The earlier you recognize an error, the easier it is to correct. After 30 minutes of confused navigation, you could be anywhere.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "tick1", label: "Stream Crossing", value: 15, description: "Expected at 15 min. Cross stream flowing left to right. If you don't find it by 20 min, stop.", color: "22C55E"),
                        DiagramSegment(id: "tick2", label: "Boulder Field", value: 25, description: "Expected at 25 min. Large boulder field on left side. Confirms you're on the correct spur.", color: "3B82F6"),
                        DiagramSegment(id: "tick3", label: "Tree Line", value: 35, description: "Expected at 35 min. Emerge above tree line. Ridgeline becomes visible. Re-orient with compass.", color: "8B5CF6"),
                        DiagramSegment(id: "tick4", label: "Col Arrival", value: 50, description: "Expected at 50 min. Reach col between two peaks. If terrain steepens unexpectedly, you've drifted off the spur.", color: "F59E0B")
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            )
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "terrain-q1",
                type: .multipleChoice,
                prompt: "You need to navigate to a mountain hut that sits on a trail running east-west. Visibility is 200m. What technique ensures you find the hut?",
                difficulty: .intermediate,
                explanation: "Aiming off means deliberately navigating to one side of the target. When you reach the trail, you know which direction to turn because you planned the offset.",
                options: [
                    PracticeOption(label: "Aim off to one side, then follow the trail to the hut", correct: true, explanation: "Aim 5-10° to one side. When you hit the trail, turn toward the hut. You've eliminated the 50/50 guess."),
                    PracticeOption(label: "Walk directly on a bearing to the hut's coordinates", correct: false, explanation: "A small bearing error means you hit the trail but don't know if the hut is left or right."),
                    PracticeOption(label: "Use GPS to navigate directly to the hut", correct: false, explanation: "In 200m visibility you may walk past the hut. GPS accuracy of 5-10m doesn't help if you can't see it."),
                    PracticeOption(label: "Follow the most obvious terrain feature", correct: false, explanation: "Without a deliberate plan, the most obvious feature may lead you away from the hut.")
                ]
            ),
            PracticeQuestion(
                id: "terrain-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "A catching feature is a large, unmissable feature BEYOND your target that tells you you've overshot. It's a safety net, not a navigation target.",
                statement: "A catching feature is a prominent landmark you navigate toward as your primary destination.",
                isTrue: false,
                reasoning: "A catching feature lies beyond your target. It's the backstop that tells you you've gone too far — like a road, river, or cliff edge. Your primary navigation uses handrails and attack points."
            ),
            PracticeQuestion(
                id: "terrain-q3",
                type: .sequenceOrder,
                prompt: "Order these terrain association techniques from first used to last used when navigating to a distant target:",
                difficulty: .intermediate,
                explanation: "Start with rough navigation using handrails, then refine as you approach the target using attack points and precise bearings.",
                correctOrder: [
                    "Identify handrail features along route",
                    "Follow handrail while ticking off collecting features",
                    "Reach attack point near target",
                    "Take precise bearing for final approach"
                ],
                shuffledItems: [
                    "Take precise bearing for final approach",
                    "Follow handrail while ticking off collecting features",
                    "Identify handrail features along route",
                    "Reach attack point near target"
                ]
            ),
            PracticeQuestion(
                id: "terrain-q4",
                type: .multipleChoice,
                prompt: "While navigating, you expected to cross a stream after 15 minutes. It's been 25 minutes with no stream. What should you do?",
                difficulty: .foundation,
                explanation: "Missing an expected feature by 60% of the expected time is a strong signal you're off route. Stop immediately, relocate using identifiable features, and correct before the error compounds.",
                options: [
                    PracticeOption(label: "Stop immediately, relocate using map and last known position", correct: true, explanation: "The earlier you catch an error, the smaller it is. You're likely within a few hundred meters of your intended route."),
                    PracticeOption(label: "Continue for another 10 minutes — the stream may be ahead", correct: false, explanation: "Hoping the terrain will match your expectations is how people get seriously lost. Stop and verify."),
                    PracticeOption(label: "Turn around and go back to the start", correct: false, explanation: "Retreating fully is excessive. First try to relocate from your current position."),
                    PracticeOption(label: "Change your bearing by 10 degrees to search for the stream", correct: false, explanation: "Random course changes without relocating first will make the situation worse.")
                ]
            )
        ],
        synthesisPrompt: "Terrain association turns passive travel into active navigation. How does constantly matching map to landscape create a 'running fix' of your position, and why is this more reliable than periodic compass checks?",
        conceptMapNodes: [
            ConceptMapNode(id: "terrain-association", label: "Terrain Association", domain: .navigation, x: 0.5, y: 0.3, connections: ["map-reading", "contouring", "whiteout-navigation"]),
            ConceptMapNode(id: "handrails", label: "Handrails & Catching", domain: .navigation, x: 0.2, y: 0.55, connections: ["terrain-association", "route-planning"]),
            ConceptMapNode(id: "attack-points", label: "Attack Points", domain: .navigation, x: 0.8, y: 0.55, connections: ["terrain-association", "compass"]),
            ConceptMapNode(id: "aiming-off", label: "Aiming Off", domain: .navigation, x: 0.5, y: 0.75, connections: ["terrain-association"])
        ]
    )

    // MARK: - Contouring

    static let contouring = Lesson(
        id: "contouring",
        domain: .navigation,
        teachingSteps: [
            TeachingStep(
                id: "contour-1",
                headline: "Staying on the Level",
                body: "Contouring means traversing a slope while maintaining a constant elevation — following a contour line across the mountain. This is essential when you need to cross terrain without gaining or losing height: traversing to a col, skirting a peak, or maintaining altitude across a valley head. Your altimeter is your primary tool: set it at a known elevation and maintain that reading as you traverse.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.8),
                        DiagramPoint(x: 0.15, y: 0.6),
                        DiagramPoint(x: 0.3, y: 0.45),
                        DiagramPoint(x: 0.45, y: 0.35),
                        DiagramPoint(x: 0.55, y: 0.3),
                        DiagramPoint(x: 0.65, y: 0.35),
                        DiagramPoint(x: 0.8, y: 0.5),
                        DiagramPoint(x: 1.0, y: 0.7)
                    ],
                    overlayType: "zones",
                    labels: ["Valley", "Contour Traverse at 2,600m", "Col", "Spur", "Valley"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "contour-2",
                headline: "The Altimeter Advantage",
                body: "A barometric altimeter reads atmospheric pressure and converts it to elevation. At a known altitude, calibrate it — then as you contour, maintain that reading. If the altimeter shows you've gained 20m, you've drifted uphill. If it drops 20m, you've drifted downhill. Recalibrate at every known elevation point (summit, col, lake, hut). Warning: weather changes alter pressure — a dropping barometer makes the altimeter read falsely high by roughly 10m per hectopascal of pressure drop.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "below", label: "Drifted Low", minValue: 2540, maxValue: 2580, color: "EF4444", description: "You've lost elevation. Traverse uphill slightly to regain your contour line."),
                        DiagramZone(id: "target", label: "On Contour", minValue: 2580, maxValue: 2620, color: "22C55E", description: "Within ±20m of target elevation. You're on the correct contour line."),
                        DiagramZone(id: "above", label: "Drifted High", minValue: 2620, maxValue: 2660, color: "F59E0B", description: "You've gained elevation. Traverse slightly downhill to return to your contour.")
                    ],
                    minValue: 2540,
                    maxValue: 2660,
                    unit: "m",
                    currentValue: 2600
                ),
                interactionHint: "Drag to see elevation drift effects",
                revealItems: nil
            ),
            TeachingStep(
                id: "contour-3",
                headline: "Contouring Through Complex Terrain",
                body: "Real mountain slopes aren't smooth — you'll encounter re-entrants (small valleys cut into the slope), spurs, gullies, and cliff bands. When contouring into a re-entrant, maintain your elevation as the ground drops away below you, then rises again as you exit the other side. The path feels counterintuitive — you gain height relative to the ground even though your altitude stays constant. Trust your altimeter, not your legs.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.4),
                        DiagramPoint(x: 0.15, y: 0.35),
                        DiagramPoint(x: 0.25, y: 0.5),
                        DiagramPoint(x: 0.35, y: 0.7),
                        DiagramPoint(x: 0.45, y: 0.5),
                        DiagramPoint(x: 0.55, y: 0.35),
                        DiagramPoint(x: 0.65, y: 0.3),
                        DiagramPoint(x: 0.75, y: 0.35),
                        DiagramPoint(x: 0.85, y: 0.5),
                        DiagramPoint(x: 1.0, y: 0.4)
                    ],
                    overlayType: "zones",
                    labels: ["Spur", "Re-entrant (Gully)", "Spur", "Re-entrant", "Spur"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "contour-4",
                headline: "When Contouring Isn't the Answer",
                body: "Contouring saves energy on paper but can be dangerous in practice. Traversing steep, loose slopes is exhausting and risky — scree slides sideways under your feet. Wet grass on steep slopes is treacherously slippery. If the slope exceeds 35-40 degrees, it's often safer and faster to descend, cross the valley floor, and re-ascend the other side. Calculate the energy cost: contouring 1km on a 40-degree slope burns more energy than descending 200m and re-ascending.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Contour (Traverse)",
                    rightTitle: "Descend & Re-ascend",
                    leftColor: "F59E0B",
                    rightColor: "3B82F6",
                    leftItems: ["Good on moderate slopes (<30°)", "Maintains elevation", "Efficient on firm ground", "Dangerous on steep loose terrain"],
                    rightItems: ["Better on steep terrain (>35°)", "Loses then regains height", "Safer footing on direct line", "More energy but more control"]
                ),
                interactionHint: nil,
                revealItems: nil
            )
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "contour-q1",
                type: .multipleChoice,
                prompt: "You're contouring at 2,600m and your altimeter suddenly reads 2,620m without you noticing any change in slope. The weather has been deteriorating. What is the most likely cause?",
                difficulty: .intermediate,
                explanation: "Dropping atmospheric pressure (approaching storm) makes a barometric altimeter read falsely high. A 2hPa pressure drop causes roughly a 20m false reading increase.",
                options: [
                    PracticeOption(label: "Dropping barometric pressure from approaching weather", correct: true, explanation: "Lower pressure reads as higher altitude. A storm approach can shift readings by 20-50m over a few hours."),
                    PracticeOption(label: "You've drifted 20m uphill without noticing", correct: false, explanation: "On steep terrain 20m of drift is noticeable. Combined with deteriorating weather, pressure change is more likely."),
                    PracticeOption(label: "The altimeter battery is failing", correct: false, explanation: "Low batteries cause erratic or no readings, not a consistent 20m offset."),
                    PracticeOption(label: "GPS interference with the altimeter", correct: false, explanation: "Barometric altimeters use pressure sensors, not GPS signals. They don't interfere with each other.")
                ]
            ),
            PracticeQuestion(
                id: "contour-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Contouring on slopes steeper than 35-40° can be more dangerous and energy-intensive than descending and re-ascending due to the difficulty of traversing loose or steep terrain.",
                statement: "Contouring is always more energy-efficient than descending to a valley floor and re-ascending the other side.",
                isTrue: false,
                reasoning: "On steep terrain (>35°), traversing is exhausting and hazardous. Loose scree, wet grass, or snow on steep slopes makes contouring slower and more dangerous than losing and regaining elevation on safer ground."
            ),
            PracticeQuestion(
                id: "contour-q3",
                type: .calculation,
                prompt: "Your altimeter reads 2,450m at a known lake elevation of 2,430m. By how many meters should you adjust (recalibrate) the altimeter?",
                difficulty: .foundation,
                explanation: "The altimeter reads 20m too high. Recalibrate down by 20m to match the known elevation of 2,430m.",
                correctAnswer: 20,
                tolerance: 0,
                answerUnit: "m"
            ),
            PracticeQuestion(
                id: "contour-q4",
                type: .multipleChoice,
                prompt: "While contouring at 2,800m, you encounter a re-entrant (gully). What happens to the ground directly below your feet as you cross it?",
                difficulty: .intermediate,
                explanation: "A re-entrant cuts into the slope below your contour line. As you cross it, the ground falls away steeply below you, then rises back up on the other side. Your elevation stays constant while the terrain undulates.",
                options: [
                    PracticeOption(label: "The ground drops away below you, then rises on the far side", correct: true, explanation: "The re-entrant is a valley cut into the slope. Your constant-elevation traverse crosses above it."),
                    PracticeOption(label: "The ground rises beneath you, forming a hill to climb over", correct: false, explanation: "This describes a spur, not a re-entrant. Re-entrants are incut valleys."),
                    PracticeOption(label: "The ground stays flat throughout the crossing", correct: false, explanation: "Re-entrants create significant undulations in the slope profile."),
                    PracticeOption(label: "You must descend into the gully and climb out the other side", correct: false, explanation: "If you're contouring correctly, you maintain your elevation across the re-entrant without descending.")
                ]
            )
        ],
        synthesisPrompt: "Contouring bridges map reading and physical terrain movement. How does an altimeter transform a two-dimensional map skill into a three-dimensional navigation technique, and when does the energy equation make contouring a poor choice?",
        conceptMapNodes: [
            ConceptMapNode(id: "contouring", label: "Contouring", domain: .navigation, x: 0.5, y: 0.3, connections: ["map-reading", "terrain-association", "whiteout-navigation"]),
            ConceptMapNode(id: "altimeter-use", label: "Altimeter Use", domain: .navigation, x: 0.2, y: 0.55, connections: ["contouring", "gps"]),
            ConceptMapNode(id: "slope-traversal", label: "Slope Traversal", domain: .navigation, x: 0.8, y: 0.55, connections: ["contouring"]),
            ConceptMapNode(id: "re-entrant-nav", label: "Re-entrant Navigation", domain: .navigation, x: 0.5, y: 0.75, connections: ["contouring", "terrain-association"])
        ]
    )

    // MARK: - Triangulation

    static let triangulation = Lesson(
        id: "triangulation",
        domain: .navigation,
        teachingSteps: [
            TeachingStep(
                id: "tri-1",
                headline: "Position Fixing with Bearings",
                body: "Triangulation (more precisely, resection) lets you determine your position by taking compass bearings to two or three identifiable features and plotting them on your map. Each bearing creates a line on the map — your position is where the lines intersect. With two bearings you get a point fix; with three bearings you get a 'cocked hat' triangle that shows your margin of error.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "A topographic map showing three identifiable peaks with bearing lines drawn from each peak converging to a small triangle (cocked hat) where the navigator's position is located",
                    hotspots: [
                        RevealItem(id: "peak-a", label: "Peak A: 045°", detail: "Back-bearing plotted from Peak A. Line drawn at 225° from the peak on the map (the reciprocal of your 045° bearing).", x: 0.7, y: 0.2),
                        RevealItem(id: "peak-b", label: "Peak B: 310°", detail: "Back-bearing plotted from Peak B. Line drawn at 130° from the peak. Where it crosses the first line gives a two-bearing fix.", x: 0.2, y: 0.25),
                        RevealItem(id: "cocked-hat", label: "Cocked Hat", detail: "The small triangle formed by three bearing lines. You're inside this triangle. Smaller triangle = more accurate fix. Aim for under 100m sides.", x: 0.5, y: 0.5),
                        RevealItem(id: "peak-c", label: "Peak C: 175°", detail: "Third bearing confirms position and reveals error. If the triangle is large, one bearing may be wrong — retake them.", x: 0.5, y: 0.8)
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: "Tap bearing lines to understand position fixing",
                revealItems: nil
            ),
            TeachingStep(
                id: "tri-2",
                headline: "Selecting Features for Bearings",
                body: "Not all features make good bearing targets. Choose peaks, buildings, or distinctive features you can positively identify on both the terrain and the map. Ideal bearing separation is 60-120 degrees between lines — two bearings at 170° and 175° give almost parallel lines and terrible accuracy. Three bearings at roughly 120° apart give the best fix. Features should be between 1-5km away: too close and small angle errors don't matter, too far and haze makes identification uncertain.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "poor", label: "Poor (<30°)", minValue: 0, maxValue: 30, color: "EF4444", description: "Nearly parallel lines. Small bearing errors create huge position uncertainty. Useless for navigation."),
                        DiagramZone(id: "fair", label: "Fair (30-60°)", minValue: 30, maxValue: 60, color: "F59E0B", description: "Acceptable with careful technique. Position uncertainty moderate. Use if no better angles available."),
                        DiagramZone(id: "good", label: "Good (60-120°)", minValue: 60, maxValue: 120, color: "22C55E", description: "Ideal intersection angle. Lines cross at angles that minimize position error. Best accuracy."),
                        DiagramZone(id: "fair2", label: "Fair (120-150°)", minValue: 120, maxValue: 150, color: "F59E0B", description: "Still workable. Accuracy degrades as angle approaches 180°."),
                        DiagramZone(id: "poor2", label: "Poor (>150°)", minValue: 150, maxValue: 180, color: "EF4444", description: "Nearly opposite features. Lines are nearly parallel again. Avoid.")
                    ],
                    minValue: 0,
                    maxValue: 180,
                    unit: "degrees",
                    currentValue: 90
                ),
                interactionHint: "Drag to see how bearing angle affects accuracy",
                revealItems: nil
            ),
            TeachingStep(
                id: "tri-3",
                headline: "Plotting Bearings on the Map",
                body: "To plot a bearing: take a magnetic bearing to the feature (say 072°). Convert to grid bearing by applying declination. On the map, place the compass with the edge touching the feature. Rotate the compass body (not the bezel) until the orienting lines align with the grid lines and N points north. Draw along the edge back toward you. Repeat for each feature. Your position is at or near the intersection.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "take", label: "Take Bearing", value: 1, description: "Point compass at feature. Red in the shed. Read magnetic bearing (e.g., 072°).", color: "3B82F6"),
                        DiagramSegment(id: "convert", label: "Convert to Grid", value: 2, description: "Apply magnetic declination. If 3°E declination: 072° + 3° = 075° grid bearing.", color: "8B5CF6"),
                        DiagramSegment(id: "plot", label: "Plot on Map", value: 3, description: "Place compass on feature. Align orienting lines with grid. Draw along edge toward your approximate position.", color: "22C55E"),
                        DiagramSegment(id: "repeat", label: "Repeat & Fix", value: 4, description: "Take bearing to second (and third) feature. Plot each line. Your position is at the intersection.", color: "F59E0B")
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "tri-4",
                headline: "Single Bearing with a Linear Feature",
                body: "You don't always need two bearings. If you're on a known linear feature — a trail, ridge, stream, or contour line — a single bearing to an identifiable feature fixes your position where the bearing line crosses the linear feature. Standing on a trail and taking a bearing to a peak gives you a precise position fix. This is faster than a full triangulation and just as accurate when a linear feature is available.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.1, fromY: 0.5, toX: 0.9, toY: 0.5, label: "Known Trail (linear feature)", color: "22C55E"),
                        DiagramArrow(fromX: 0.7, fromY: 0.15, toX: 0.45, toY: 0.5, label: "Bearing: 215°", color: "3B82F6")
                    ],
                    centerLabel: "Position Fix"
                ),
                interactionHint: nil,
                revealItems: nil
            )
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "tri-q1",
                type: .multipleChoice,
                prompt: "You take three bearings for a position fix. The resulting 'cocked hat' triangle has sides of approximately 300m. What does this indicate?",
                difficulty: .intermediate,
                explanation: "A cocked hat with 300m sides indicates significant error. Ideal triangles are under 100m. One or more bearings may have been taken incorrectly, or features were misidentified.",
                options: [
                    PracticeOption(label: "One or more bearings likely has a significant error — retake them", correct: true, explanation: "A 300m cocked hat suggests a bearing error of 5-10°. Verify feature identification and retake bearings carefully."),
                    PracticeOption(label: "This is normal accuracy for mountain triangulation", correct: false, explanation: "Careful technique should produce a cocked hat under 100m. 300m indicates a problem."),
                    PracticeOption(label: "Your map scale is incorrect", correct: false, explanation: "Map scale affects the drawn size but not the actual accuracy of the fix."),
                    PracticeOption(label: "You need a fourth bearing to improve accuracy", correct: false, explanation: "Adding a fourth bearing won't fix an existing error. Retake the problematic bearing instead.")
                ]
            ),
            PracticeQuestion(
                id: "tri-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "If you're standing on a known linear feature (trail, ridge, contour), a single bearing to one identifiable feature fixes your position where the bearing line crosses the linear feature.",
                statement: "You always need at least two compass bearings to determine your position on a map.",
                isTrue: false,
                reasoning: "If you're on a known linear feature — a trail, ridge, stream, or confirmed contour line — a single bearing to a visible feature fixes your position where the bearing line intersects the linear feature."
            ),
            PracticeQuestion(
                id: "tri-q3",
                type: .calculation,
                prompt: "You take a magnetic bearing of 148° to a summit. The magnetic declination is 2° east. What grid bearing do you plot on the map?",
                difficulty: .foundation,
                explanation: "Converting magnetic to grid bearing with east declination: add the declination. 148° + 2° = 150° grid bearing. (Magnetic to Grid: add east, subtract west.)",
                correctAnswer: 150,
                tolerance: 0,
                answerUnit: "°"
            ),
            PracticeQuestion(
                id: "tri-q4",
                type: .multipleChoice,
                prompt: "Which pair of bearing angles to two features would give the BEST position fix?",
                difficulty: .foundation,
                explanation: "Bearing separation near 90° gives the best intersection geometry. Lines cross at nearly right angles, minimizing position uncertainty.",
                options: [
                    PracticeOption(label: "Feature A at 045° and Feature B at 135° (90° separation)", correct: true, explanation: "90° separation creates perpendicular lines — the ideal intersection for minimizing error."),
                    PracticeOption(label: "Feature A at 010° and Feature B at 020° (10° separation)", correct: false, explanation: "Nearly parallel lines. A tiny error in either bearing shifts the intersection point by hundreds of meters."),
                    PracticeOption(label: "Feature A at 090° and Feature B at 270° (180° separation)", correct: false, explanation: "These bearings are in opposite directions — the lines are parallel and never intersect."),
                    PracticeOption(label: "Feature A at 350° and Feature B at 355° (5° separation)", correct: false, explanation: "Almost identical bearings produce nearly parallel lines with no useful intersection.")
                ]
            )
        ],
        synthesisPrompt: "Triangulation converts visible landmarks into precise map positions. Why does the geometry of bearing angles matter so much, and how does combining a single bearing with a known linear feature simplify the process?",
        conceptMapNodes: [
            ConceptMapNode(id: "triangulation", label: "Triangulation", domain: .navigation, x: 0.5, y: 0.3, connections: ["compass", "map-reading", "whiteout-navigation"]),
            ConceptMapNode(id: "resection", label: "Resection", domain: .navigation, x: 0.2, y: 0.55, connections: ["triangulation"]),
            ConceptMapNode(id: "bearing-geometry", label: "Bearing Geometry", domain: .navigation, x: 0.8, y: 0.55, connections: ["triangulation", "compass"]),
            ConceptMapNode(id: "linear-features", label: "Linear Features", domain: .navigation, x: 0.5, y: 0.75, connections: ["triangulation", "terrain-association"])
        ]
    )

    // MARK: - Whiteout Navigation

    static let whiteoutNavigation = Lesson(
        id: "whiteout-navigation",
        domain: .navigation,
        teachingSteps: [
            TeachingStep(
                id: "white-1",
                headline: "When the World Disappears",
                body: "A whiteout occurs when cloud, fog, or blowing snow eliminates all visual references. On snow-covered terrain, you cannot distinguish ground from sky — horizon, shadows, and depth perception vanish. People have walked off cliffs, into crevasses, and in circles for hours. Visibility may drop to 5-10m. This is the most demanding navigation scenario in mountaineering, and the one where proper technique saves lives.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "clear", name: "Clear Visibility (>1km)", color: "22C55E", heightRatio: 0.25, description: "Normal navigation. Terrain association and visual piloting. All techniques work."),
                        DiagramLayer(id: "reduced", name: "Reduced (200m-1km)", color: "F59E0B", heightRatio: 0.25, description: "Compass bearings essential. Can still identify some terrain features. Increase vigilance."),
                        DiagramLayer(id: "poor", name: "Poor (50-200m)", color: "EF4444", heightRatio: 0.25, description: "Compass and pacing only. No terrain features visible. Use leapfrog technique with partner."),
                        DiagramLayer(id: "whiteout", name: "Whiteout (<50m)", color: "8B5CF6", heightRatio: 0.25, description: "No visual references at all. Ground blends with sky. Rope team, pacing, altimeter, and compass are your only tools.")
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "white-2",
                headline: "Compass and Pacing",
                body: "In whiteout conditions, you navigate by dead reckoning: compass bearing + measured distance. Measure distance by counting paces. Calibrate beforehand: on flat ground, most people take 60-70 double paces per 100m. On snow with a pack, this drops to 40-50 double paces. Count every double pace religiously. If your leg is 800m at bearing 270°, that's roughly 320-400 double paces. Lose count and you lose your position.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "flat-trail", label: "Flat Trail", minValue: 55, maxValue: 70, color: "22C55E", description: "60-70 double paces per 100m. Fast, even surface. Light pack."),
                        DiagramZone(id: "rough", label: "Rough Terrain", minValue: 45, maxValue: 55, color: "3B82F6", description: "45-55 double paces per 100m. Uneven ground, moderate pack."),
                        DiagramZone(id: "snow", label: "Snow with Pack", minValue: 35, maxValue: 45, color: "F59E0B", description: "35-45 double paces per 100m. Deep snow, heavy pack, snowshoes."),
                        DiagramZone(id: "steep-snow", label: "Steep Snow", minValue: 25, maxValue: 35, color: "EF4444", description: "25-35 double paces per 100m. Steep uphill in snow. Very tiring. Count is critical.")
                    ],
                    minValue: 25,
                    maxValue: 70,
                    unit: "paces/100m",
                    currentValue: 50
                ),
                interactionHint: "Drag to see pace count by terrain type",
                revealItems: nil
            ),
            TeachingStep(
                id: "white-3",
                headline: "The Leapfrog Technique",
                body: "Walking a straight compass bearing alone is nearly impossible — you drift. The leapfrog technique solves this: send a partner ahead to the limit of visibility (20-50m) on your bearing. When they reach that distance, shout or wave to stop them. Walk to them, then send them ahead again. This maintains a straight line even in zero visibility. For a solo navigator, use objects: throw a snowball or place a ski pole at bearing distance, walk to it, repeat.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.1, fromY: 0.7, toX: 0.3, toY: 0.55, label: "Send partner", color: "3B82F6"),
                        DiagramArrow(fromX: 0.3, fromY: 0.55, toX: 0.5, toY: 0.4, label: "Walk to them", color: "22C55E"),
                        DiagramArrow(fromX: 0.5, fromY: 0.4, toX: 0.7, toY: 0.25, label: "Send again", color: "3B82F6"),
                        DiagramArrow(fromX: 0.7, fromY: 0.25, toX: 0.9, toY: 0.1, label: "Walk to them", color: "22C55E")
                    ],
                    centerLabel: "Leapfrog on Bearing"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "white-4",
                headline: "Boxing Around Obstacles",
                body: "When you encounter an obstacle in whiteout (cliff, crevasse zone, lake), you can't just walk around it — you'll lose your bearing. Instead, box around it: turn 90° right, pace a measured distance (say 50 paces). Turn 90° left (back to original bearing), pace until you've cleared the obstacle. Turn 90° left, pace exactly 50 paces. Turn 90° right — you're back on your original bearing line, offset by the obstacle width.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Overhead view of a rectangular boxing pattern around an obstacle. The original bearing line runs left to right. The path detours in a rectangular pattern around a hazard zone, returning to the original bearing line.",
                    hotspots: [
                        RevealItem(id: "leg1", label: "Leg 1: Turn 90° Right", detail: "Turn exactly 90° from your bearing. Count paces carefully — you must match this distance on Leg 3.", x: 0.3, y: 0.6),
                        RevealItem(id: "leg2", label: "Leg 2: Resume Bearing", detail: "Turn 90° left (back to original bearing). Pace until you've cleared the obstacle. Continue counting toward your destination.", x: 0.5, y: 0.7),
                        RevealItem(id: "leg3", label: "Leg 3: Turn 90° Left", detail: "Turn 90° left. Walk EXACTLY the same number of paces as Leg 1. This returns you to the original bearing line.", x: 0.7, y: 0.6),
                        RevealItem(id: "leg4", label: "Leg 4: Resume Course", detail: "Turn 90° right. You're back on your original bearing line. Continue pacing toward your destination.", x: 0.8, y: 0.4)
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: "Tap each leg to understand the boxing technique",
                revealItems: nil
            ),
            TeachingStep(
                id: "white-5",
                headline: "The Decision to Stop",
                body: "Sometimes the safest decision in a whiteout is to stop moving. If you're on a glacier with crevasse hazard, on steep terrain near cliffs, or completely uncertain of your position — stop. Dig in, put on all your layers, and wait for conditions to improve. A few hours of cold discomfort is better than walking off a cliff. Before you set out, make the decision criteria: 'If visibility drops below X and we can't confirm our position, we stop and shelter.' Having the criteria pre-set removes the temptation to push on.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Keep Moving If...",
                    rightTitle: "Stop and Shelter If...",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: ["Route is on safe terrain (no cliffs, crevasses)", "You can confirm position within 100m", "You have a reliable bearing to safety", "Party is experienced and equipped"],
                    rightItems: ["Crevasses or cliffs in the area", "Position uncertain beyond 200m", "Party members are fatigued or cold", "Conditions worsening with no end in sight"]
                ),
                interactionHint: nil,
                revealItems: nil
            )
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "white-q1",
                type: .multipleChoice,
                prompt: "In a whiteout on a glacier, your party of three needs to navigate 1.2km to a hut. What is the most critical technique to employ?",
                difficulty: .advanced,
                explanation: "On a glacier in whiteout, crevasse fall is the primary danger. Rope up first, then use compass/pacing with the leapfrog technique to maintain a straight bearing line.",
                options: [
                    PracticeOption(label: "Rope team with leapfrog compass navigation and pace counting", correct: true, explanation: "Roping up protects against crevasses. Leapfrog maintains bearing accuracy. Pace counting tracks distance."),
                    PracticeOption(label: "Follow GPS waypoints at walking speed", correct: false, explanation: "GPS doesn't protect against crevasses, and in whiteout conditions you may walk into one between waypoint checks."),
                    PracticeOption(label: "Spread out to search for the hut visually", correct: false, explanation: "Spreading out on a crevassed glacier in whiteout is extremely dangerous. Stay roped and together."),
                    PracticeOption(label: "Stop and wait for the whiteout to clear", correct: false, explanation: "While sometimes correct, if you know the bearing to a hut 1.2km away and are equipped to navigate, reaching shelter is preferable.")
                ]
            ),
            PracticeQuestion(
                id: "white-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "The leapfrog technique requires sending a person ahead on the compass bearing to the limit of visibility, directing them left or right until they're exactly on bearing, then walking to them.",
                statement: "In the leapfrog technique, the person walking ahead holds the compass and takes the bearing.",
                isTrue: false,
                reasoning: "The person BEHIND holds the compass and directs the person ahead onto the bearing line. The forward person is the aiming point; the rear person is the navigator."
            ),
            PracticeQuestion(
                id: "white-q3",
                type: .calculation,
                prompt: "Your pace count is 45 double paces per 100m in snow. You need to travel 600m on a bearing. How many double paces should you count?",
                difficulty: .foundation,
                explanation: "600m ÷ 100m = 6 segments. 6 × 45 paces = 270 double paces.",
                correctAnswer: 270,
                tolerance: 5,
                answerUnit: "double paces"
            ),
            PracticeQuestion(
                id: "white-q4",
                type: .sequenceOrder,
                prompt: "Order the steps for boxing around an obstacle while maintaining a compass bearing:",
                difficulty: .intermediate,
                explanation: "The boxing technique uses four right-angle turns to detour around an obstacle and return precisely to the original bearing line.",
                correctOrder: [
                    "Turn 90° right and count paces to clear obstacle",
                    "Turn 90° left (resume original bearing) and pace past obstacle",
                    "Turn 90° left and walk same number of paces as first turn",
                    "Turn 90° right to resume original bearing"
                ],
                shuffledItems: [
                    "Turn 90° left and walk same number of paces as first turn",
                    "Turn 90° right and count paces to clear obstacle",
                    "Turn 90° right to resume original bearing",
                    "Turn 90° left (resume original bearing) and pace past obstacle"
                ]
            )
        ],
        synthesisPrompt: "Whiteout navigation strips away every visual cue you normally rely on. How does this extreme scenario reveal which navigation skills are truly fundamental, and why is the decision framework for stopping just as important as the technique for moving?",
        conceptMapNodes: [
            ConceptMapNode(id: "whiteout-navigation", label: "Whiteout Navigation", domain: .navigation, x: 0.5, y: 0.3, connections: ["compass", "route-planning", "emergency-navigation"]),
            ConceptMapNode(id: "dead-reckoning", label: "Dead Reckoning", domain: .navigation, x: 0.2, y: 0.55, connections: ["whiteout-navigation", "compass"]),
            ConceptMapNode(id: "leapfrog", label: "Leapfrog Technique", domain: .navigation, x: 0.8, y: 0.55, connections: ["whiteout-navigation"]),
            ConceptMapNode(id: "glacier-nav", label: "Glacier Safety", domain: .glacierTravel, x: 0.5, y: 0.75, connections: ["whiteout-navigation"])
        ]
    )

    // MARK: - Night Navigation

    static let nightNavigation = Lesson(
        id: "night-navigation",
        domain: .navigation,
        teachingSteps: [
            TeachingStep(
                id: "night-1",
                headline: "The Night Vision Advantage",
                body: "Your eyes need 20-30 minutes to fully adapt to darkness. Rod cells in the periphery of your retina are more sensitive than the cone cells in the center — you see better at night by looking slightly to the side of an object (averted vision). A single flash of white light destroys night adaptation instantly; red light preserves it. Experienced mountaineers navigate by moonlight alone when possible, using headlamps only for technical terrain.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Night Vision Preserved",
                    rightTitle: "Night Vision Lost",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: ["Red light only for 30+ min", "Peripheral vision active", "Can see terrain to ~100m in moonlight", "Skyline features visible"],
                    rightItems: ["White headlamp used frequently", "Central vision only (poor at night)", "Visible range limited to lamp beam", "20-30 min to re-adapt after each use"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "night-2",
                headline: "Using the Skyline and Stars",
                body: "At night, ridgelines and peaks are visible as dark shapes against the sky. These silhouettes become your primary terrain features for orientation. Polaris (the North Star) sits within 1° of true north — find it via the pointer stars of Ursa Major (Big Dipper). In the Southern Hemisphere, use the Southern Cross. On clear nights, prominent peaks against starfields create unmistakable reference points for maintaining direction.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Night sky view over a mountain landscape. The Big Dipper constellation is visible with pointer stars aimed at Polaris above the horizon. Mountain ridgeline silhouettes are visible against the star field.",
                    hotspots: [
                        RevealItem(id: "polaris", label: "Polaris (North Star)", detail: "Within 1° of true north. Altitude above horizon equals your latitude. At 46°N (Alps), Polaris is 46° above the northern horizon.", x: 0.45, y: 0.2),
                        RevealItem(id: "pointers", label: "Pointer Stars", detail: "The two stars at the end of the Big Dipper's bowl. Draw a line through them extending 5x their separation to find Polaris.", x: 0.3, y: 0.35),
                        RevealItem(id: "ridgeline", label: "Ridgeline Silhouette", detail: "Mountains appear as dark shapes against the sky. Compare these shapes to your map's profile for orientation. Most reliable on clear nights.", x: 0.6, y: 0.6),
                        RevealItem(id: "col-gap", label: "Col (Gap in Skyline)", detail: "A notch in the ridgeline silhouette indicates a col or pass. Use these distinctive shapes to confirm features on your map.", x: 0.75, y: 0.55)
                    ],
                    animationStyle: "fade"
                ),
                interactionHint: "Tap to explore night navigation references",
                revealItems: nil
            ),
            TeachingStep(
                id: "night-3",
                headline: "Practical Night Movement",
                body: "Move slower than daytime — roughly 50-60% of your normal speed. Shorten your stride and lift your feet higher to avoid tripping. Keep the group tight: maximum 5m between members. Designate a rear person to ensure no one drops behind. Mark waypoints with glow sticks or reflective tape at critical decision points. On trails, the compacted surface is usually lighter than surrounding terrain — follow the light strip.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "prep", label: "Pre-Movement", value: 1, description: "Study route in daylight or with map. Mark key waypoints. Set headlamp to red. Allow 20+ min for night adaptation.", color: "3B82F6"),
                        DiagramSegment(id: "easy", label: "Trail Movement", value: 2, description: "Follow lighter-colored trail surface. 50-60% daylight speed. Short strides. Headlamp off if moonlit.", color: "22C55E"),
                        DiagramSegment(id: "off-trail", label: "Off-Trail Navigation", value: 3, description: "Compass bearings essential. Pace count. Use averted vision for terrain features. Stop frequently to orient.", color: "F59E0B"),
                        DiagramSegment(id: "technical", label: "Technical Terrain", value: 4, description: "White headlamp ON. Accept night vision loss. Safety over speed. One person moves at a time on exposed ground.", color: "EF4444")
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "night-4",
                headline: "Route Selection for Night Travel",
                body: "Choose routes for night travel that minimize technical difficulty: wide ridges over narrow aretes, trails over scree slopes, gradual terrain over steep ground. Avoid cliff edges, crevassed glaciers, and water crossings at night unless absolutely necessary. Plan night movement segments during the day — identify the key bearings, distances, and checkpoints you'll need. The best time for night movement is late night under a full or near-full moon, when visibility can exceed 200m on snow.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Good Night Routes",
                    rightTitle: "Avoid at Night",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: ["Wide ridges with clear skyline", "Well-marked trails", "Gradual snow slopes", "Open terrain with moonlight"],
                    rightItems: ["Narrow aretes and exposed ledges", "Crevassed glaciers", "River crossings", "Steep scree or loose rock"]
                ),
                interactionHint: nil,
                revealItems: nil
            )
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "night-q1",
                type: .multipleChoice,
                prompt: "You need to check your map during a night approach. What is the best practice to preserve night vision?",
                difficulty: .foundation,
                explanation: "Red light preserves the rod cell adaptation that enables night vision. White light destroys adaptation, requiring 20-30 minutes to fully re-adapt.",
                options: [
                    PracticeOption(label: "Use a red-filtered headlamp at minimum brightness", correct: true, explanation: "Red light does not trigger the cone cells that reset rod cell adaptation. Minimum brightness preserves adaptation best."),
                    PracticeOption(label: "Use your headlamp on its dimmest white setting", correct: false, explanation: "Even dim white light contains blue wavelengths that degrade night adaptation."),
                    PracticeOption(label: "Shield your phone screen with your hand while reading the map", correct: false, explanation: "Phone screens emit blue/white light that destroys night vision even when partially blocked."),
                    PracticeOption(label: "Close one eye while using white light", correct: false, explanation: "While this preserves some adaptation in the closed eye, it's inferior to using red light which preserves both eyes.")
                ]
            ),
            PracticeQuestion(
                id: "night-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Averted vision — looking slightly to the side of an object — engages the rod cells in the peripheral retina, which are far more sensitive in low light than the cone cells in the center.",
                statement: "At night, you can see faint objects better by looking directly at them rather than slightly to one side.",
                isTrue: false,
                reasoning: "The center of the retina (fovea) contains cone cells which need bright light. The peripheral retina has rod cells which are 500-1,000x more sensitive in darkness. Looking slightly to the side of an object places its image on the rods."
            ),
            PracticeQuestion(
                id: "night-q3",
                type: .calculation,
                prompt: "Your daytime pace covers 5km in 1 hour on a trail. At night, moving at 55% speed, how long will a 3km trail section take?",
                difficulty: .foundation,
                explanation: "Night speed: 5km/hr × 0.55 = 2.75 km/hr. Time: 3km ÷ 2.75 km/hr = 1.09 hours ≈ 1 hour 5 minutes.",
                correctAnswer: 1.09,
                tolerance: 0.1,
                answerUnit: "hours"
            ),
            PracticeQuestion(
                id: "night-q4",
                type: .sequenceOrder,
                prompt: "Order these steps for preparing for planned night navigation:",
                difficulty: .intermediate,
                explanation: "Night navigation requires thorough preparation during daylight hours when you can study the terrain and set up your route plan.",
                correctOrder: [
                    "Study route and identify key bearings during daylight",
                    "Mark waypoints and decision points on map",
                    "Begin red-light adaptation 20-30 minutes before movement",
                    "Brief all team members on route, spacing, and signals"
                ],
                shuffledItems: [
                    "Begin red-light adaptation 20-30 minutes before movement",
                    "Study route and identify key bearings during daylight",
                    "Brief all team members on route, spacing, and signals",
                    "Mark waypoints and decision points on map"
                ]
            )
        ],
        synthesisPrompt: "Night navigation forces you to rely on non-visual senses and different visual strategies. How does understanding human night vision physiology (rod cells, averted vision, adaptation time) directly translate into practical navigation decisions?",
        conceptMapNodes: [
            ConceptMapNode(id: "night-navigation", label: "Night Navigation", domain: .navigation, x: 0.5, y: 0.3, connections: ["compass", "route-planning", "emergency-navigation"]),
            ConceptMapNode(id: "night-vision", label: "Night Vision", domain: .navigation, x: 0.2, y: 0.55, connections: ["night-navigation"]),
            ConceptMapNode(id: "celestial-nav", label: "Celestial Navigation", domain: .navigation, x: 0.8, y: 0.55, connections: ["night-navigation", "emergency-navigation"]),
            ConceptMapNode(id: "route-selection-night", label: "Route Selection", domain: .navigation, x: 0.5, y: 0.75, connections: ["night-navigation", "route-planning"])
        ]
    )

    // MARK: - Emergency Navigation

    static let emergencyNavigation = Lesson(
        id: "emergency-navigation",
        domain: .navigation,
        teachingSteps: [
            TeachingStep(
                id: "emerg-1",
                headline: "When Your Tools Fail",
                body: "Your GPS is dead, your compass is lost, and the map blew away. This happens more often than you'd think — gear fails, gets wet, drops into crevasses. Emergency navigation uses the sun, stars, terrain, and natural indicators to maintain direction and find safety. The key principle: stop, observe, think. Panic navigation is worse than no navigation. Five minutes of calm observation reveals more direction information than an hour of anxious wandering.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "sun-stars", label: "Sun & Stars", description: "The sun rises roughly east, sets roughly west. Polaris marks north. Shadow sticks give precise bearings.", color: "F59E0B"),
                        DiagramVertex(id: "terrain-reading", label: "Terrain Reading", description: "Water flows downhill to civilization. Ridges give vantage points. Valleys lead to roads and towns.", color: "22C55E"),
                        DiagramVertex(id: "natural-signs", label: "Natural Signs", description: "Prevailing wind direction, vegetation patterns, snow melt patterns, animal tracks trending to water.", color: "3B82F6")
                    ],
                    centerLabel: "Emergency Navigation",
                    centerDescription: "When tools fail, the environment itself provides direction. Stop, observe, think."
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "emerg-2",
                headline: "The Shadow Stick Method",
                body: "Place a straight stick vertically in the ground. Mark the tip of its shadow with a stone. Wait 15-20 minutes. Mark the new shadow tip. The line from the first mark to the second runs approximately west to east (in the Northern Hemisphere). A perpendicular line gives you north-south. This works because the sun moves east to west, so shadows move west to east. The longer you wait, the more accurate the line — 30 minutes gives a better bearing than 15.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "A vertical stick in the ground casting a shadow. Two stones mark the shadow tip positions 20 minutes apart. A line between the stones is labeled W-E. A perpendicular line is labeled N-S.",
                    hotspots: [
                        RevealItem(id: "first-mark", label: "First Shadow Mark", detail: "Place a stone at the tip of the shadow at time zero. This is your western reference point.", x: 0.3, y: 0.6),
                        RevealItem(id: "second-mark", label: "Second Shadow Mark", detail: "After 15-20 minutes, the shadow tip has moved east. Mark it with a second stone. Longer wait = more accurate.", x: 0.6, y: 0.6),
                        RevealItem(id: "ew-line", label: "West-East Line", detail: "The line from first mark to second mark runs approximately west to east. In the Southern Hemisphere, it runs east to west.", x: 0.45, y: 0.55),
                        RevealItem(id: "ns-line", label: "North-South Line", detail: "Stand with the first mark (W) on your left and second mark (E) on your right. You're facing north.", x: 0.45, y: 0.35)
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: "Tap to learn the shadow stick technique",
                revealItems: nil
            ),
            TeachingStep(
                id: "emerg-3",
                headline: "The Watch Method",
                body: "With an analog watch (or visualizing clock hands from a digital time): in the Northern Hemisphere, point the hour hand at the sun. The line bisecting the angle between the hour hand and 12 o'clock points roughly south. At 2pm, the hour hand points at the sun, and the bisector of the angle between 2 and 12 (which is 1 o'clock position) points south. Accuracy: within 15-20 degrees — enough for general direction. In summer with daylight saving, use 1 o'clock instead of 12.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.75, toY: 0.25, label: "Hour hand → Sun", color: "F59E0B"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.15, label: "12 o'clock", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.63, toY: 0.18, label: "SOUTH", color: "EF4444")
                    ],
                    centerLabel: "2:00 PM Example"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "emerg-4",
                headline: "Terrain-Based Descent Strategy",
                body: "If you need to reach civilization without tools: follow water downhill. Streams join rivers, rivers reach valleys, valleys have roads and towns. Stay on ridges for visibility and safety — ridges avoid the cliff bands, dense vegetation, and gorges that make valley bottoms impassable. If you can see lights at night, take a bearing using terrain features and travel toward them at first light. Avoid descending into unknown terrain at night.",
                diagramType: .crossSection,
                diagramConfig: DiagramConfig(
                    profilePoints: [
                        DiagramPoint(x: 0.0, y: 0.2),
                        DiagramPoint(x: 0.1, y: 0.15),
                        DiagramPoint(x: 0.2, y: 0.25),
                        DiagramPoint(x: 0.3, y: 0.3),
                        DiagramPoint(x: 0.4, y: 0.4),
                        DiagramPoint(x: 0.5, y: 0.55),
                        DiagramPoint(x: 0.6, y: 0.6),
                        DiagramPoint(x: 0.65, y: 0.65),
                        DiagramPoint(x: 0.7, y: 0.7),
                        DiagramPoint(x: 0.8, y: 0.75),
                        DiagramPoint(x: 0.9, y: 0.8),
                        DiagramPoint(x: 1.0, y: 0.85)
                    ],
                    overlayType: "zones",
                    labels: ["Summit Ridge (stay high for visibility)", "Upper Slopes (follow ridge)", "Tree Line (stay above until clear path)", "Valley Floor (roads, buildings)"]
                ),
                interactionHint: nil,
                revealItems: nil
            )
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "emerg-q1",
                type: .multipleChoice,
                prompt: "You're lost without a compass in the Northern Hemisphere. It's 3pm and sunny. Using the shadow stick method, after 20 minutes the shadow tip has moved. The line from the first mark to the second mark runs roughly:",
                difficulty: .intermediate,
                explanation: "In the Northern Hemisphere, the sun tracks east to west across the southern sky. Shadows therefore move from west to east. The first mark is the westernmost point, the second mark is east.",
                options: [
                    PracticeOption(label: "West to East", correct: true, explanation: "Shadows move opposite to the sun. Sun goes E→W, so shadows move W→E. First mark is west, second is east."),
                    PracticeOption(label: "East to West", correct: false, explanation: "This would be the sun's movement direction, not the shadow's. Shadows move in the opposite direction."),
                    PracticeOption(label: "North to South", correct: false, explanation: "Shadow movement follows the east-west sun path, not a north-south direction."),
                    PracticeOption(label: "The direction depends on the time of day", correct: false, explanation: "While shadow angle changes throughout the day, the east-to-west movement of the shadow tip is consistent.")
                ]
            ),
            PracticeQuestion(
                id: "emerg-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Following a stream downhill generally leads toward civilization, but streams can lead into gorges, waterfalls, and impassable canyons. Travel on ridges above the drainage for safety.",
                statement: "When lost, the safest strategy is always to follow the nearest stream directly downhill to find civilization.",
                isTrue: false,
                reasoning: "While water leads to valleys and roads, streams often enter gorges, waterfalls, and impassable canyons. It's safer to follow ridges above drainages where you have visibility and avoid technical terrain."
            ),
            PracticeQuestion(
                id: "emerg-q3",
                type: .multipleChoice,
                prompt: "Using the watch method at 4pm (16:00) in the Northern Hemisphere, where does the south-pointing bisector line fall on the watch face?",
                difficulty: .advanced,
                explanation: "Point the hour hand (4 o'clock) at the sun. Bisect the angle between 4 and 12 — the midpoint is the 2 o'clock position. That direction is approximately south.",
                options: [
                    PracticeOption(label: "The 2 o'clock position", correct: true, explanation: "The angle between 4 (hour hand at sun) and 12 is bisected at 2. The 2 o'clock direction points roughly south."),
                    PracticeOption(label: "The 8 o'clock position", correct: false, explanation: "8 o'clock is the opposite direction — that would point roughly north."),
                    PracticeOption(label: "The 12 o'clock position", correct: false, explanation: "12 o'clock only points south when the time is 12:00 noon."),
                    PracticeOption(label: "The 4 o'clock position", correct: false, explanation: "The 4 o'clock position points at the sun, not south. You need to bisect the angle with 12.")
                ]
            ),
            PracticeQuestion(
                id: "emerg-q4",
                type: .sequenceOrder,
                prompt: "Order the immediate priorities when you realize you're lost without navigation tools:",
                difficulty: .foundation,
                explanation: "The STOP protocol: Stop moving, Think about your situation, Observe your surroundings for clues, then Plan your next actions based on available information.",
                correctOrder: [
                    "Stop moving immediately — don't compound the error",
                    "Observe surroundings for directional clues (sun, terrain, sounds)",
                    "Recall last known position and approximate direction traveled",
                    "Plan route toward safety using available natural navigation"
                ],
                shuffledItems: [
                    "Observe surroundings for directional clues (sun, terrain, sounds)",
                    "Plan route toward safety using available natural navigation",
                    "Stop moving immediately — don't compound the error",
                    "Recall last known position and approximate direction traveled"
                ]
            )
        ],
        synthesisPrompt: "Emergency navigation reveals the fundamental principles beneath all navigation tools. How does understanding why a compass points north, why contours represent elevation, and why the sun moves predictably prepare you to navigate even when every tool has failed?",
        conceptMapNodes: [
            ConceptMapNode(id: "emergency-navigation", label: "Emergency Navigation", domain: .navigation, x: 0.5, y: 0.3, connections: ["compass", "night-navigation", "terrain-association"]),
            ConceptMapNode(id: "celestial-methods", label: "Celestial Methods", domain: .navigation, x: 0.2, y: 0.55, connections: ["emergency-navigation", "night-navigation"]),
            ConceptMapNode(id: "natural-indicators", label: "Natural Indicators", domain: .navigation, x: 0.8, y: 0.55, connections: ["emergency-navigation"]),
            ConceptMapNode(id: "survival-nav", label: "Survival Strategy", domain: .firstAid, x: 0.5, y: 0.75, connections: ["emergency-navigation"])
        ]
    )
}
