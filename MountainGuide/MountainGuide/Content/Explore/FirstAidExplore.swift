import Foundation

enum FirstAidExplore {

    // MARK: - All First Aid Explore Articles

    static let articles: [ExploreArticle] = [
        wildernessPatientAssessment,
        hypothermia,
        altitudeSickness,
        fracturesAndSplinting,
        woundCare,
        lightningInjuries,
        frostbite,
        dehydrationAndHeatIllness,
        emergencyShelter,
        evacuationPlanning,
    ]

    // MARK: - 1. Wilderness Patient Assessment

    static let wildernessPatientAssessment = ExploreArticle(
        id: "firstaid-wilderness-patient-assessment",
        domain: .firstAid,
        title: "Wilderness Patient Assessment",
        summary: "Patient assessment in the wilderness follows the same systematic approach used in urban medicine, but with critical adaptations for remote environments where evacuation may take hours or days and resources are limited to what you carry.",
        icon: "stethoscope",
        sections: [
            ExploreSection(
                id: "wpa-1",
                heading: "Scene Safety and Size-Up",
                body: "Before you touch the patient, stop. Scene safety is the first and most important step in any wilderness medical response, and it is the step most often skipped under the pressure of urgency. Assess the environment for ongoing hazards: rockfall, avalanche terrain, lightning exposure, swift water, unstable terrain, or hostile wildlife. Count the number of patients. Determine the mechanism of injury if possible, because the mechanism tells you what injuries to expect even before you lay hands on the patient. A rescuer who becomes a second victim does not double the problem — they eliminate the only resource available. Take ten seconds to read the scene before you commit to action.",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "Mountain accident scene showing environmental hazards to assess before approaching",
                        hotspots: [
                            RevealItem(id: "wpa-rockfall", label: "Overhead hazards", detail: "Look above for loose rock, ice seracs, cornices, or hanging snow. Position yourself on the uphill side when possible.", x: 0.5, y: 0.12),
                            RevealItem(id: "wpa-terrain", label: "Terrain stability", detail: "Loose scree, wet slabs, cliff edges, crevasses. Ensure your footing is secure before approaching.", x: 0.25, y: 0.55),
                            RevealItem(id: "wpa-weather", label: "Weather exposure", detail: "Approaching storm, dropping temperature, rising wind. These create time pressure and may force evacuation decisions.", x: 0.75, y: 0.18),
                            RevealItem(id: "wpa-mechanism", label: "Mechanism of injury", detail: "Fall distance, slide path, rock impact, equipment failure. The mechanism predicts the injury pattern.", x: 0.5, y: 0.7),
                        ]
                    )
                ),
                keyFacts: [
                    "Scene safety is the first step in every patient assessment — a second victim eliminates rescue capacity",
                    "Mechanism of injury predicts the injury pattern before you examine the patient",
                    "In mountain terrain, hazards include rockfall, avalanche, lightning, and unstable ground",
                    "Take ten seconds to read the scene before committing to action",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "wpa-2",
                heading: "Primary Survey: ABCDE",
                body: "The primary survey is a rapid 60-second assessment designed to identify and treat immediate life threats. Airway: is it open and clear? If the patient is unconscious, use a jaw thrust (not head-tilt chin-lift if spinal injury is suspected) to open the airway. Breathing: look at the chest for rise, listen for air movement, feel for breath on your cheek. Note the rate, depth, and effort. Circulation: check for a radial pulse. If absent, check the carotid. Scan for massive external hemorrhage and control it immediately with direct pressure. Disability: use the AVPU scale — is the patient Alert, responsive to Voice, responsive to Pain, or Unresponsive? Exposure: remove enough clothing to identify injuries, but protect the patient from environmental heat loss. In wilderness medicine, the primary survey is repeated every time the patient's condition changes.",
                diagram: ExploreDiagram(
                    type: .timeline,
                    config: DiagramConfig(
                        segments: [
                            DiagramSegment(id: "wpa-airway", label: "A — Airway", value: 0.2, description: "Open? Obstructed? Jaw thrust if c-spine concern. Clear debris, blood, vomit.", color: "EF4444"),
                            DiagramSegment(id: "wpa-breathing", label: "B — Breathing", value: 0.2, description: "Look, listen, feel. Rate, depth, symmetry. Chest rising equally on both sides?", color: "F59E0B"),
                            DiagramSegment(id: "wpa-circulation", label: "C — Circulation", value: 0.2, description: "Pulse present? Rate and quality. Massive hemorrhage? Control with direct pressure.", color: "3B82F6"),
                            DiagramSegment(id: "wpa-disability", label: "D — Disability", value: 0.2, description: "AVPU: Alert, Voice, Pain, Unresponsive. Check pupils for size, equality, reactivity.", color: "8B5CF6"),
                            DiagramSegment(id: "wpa-exposure", label: "E — Exposure", value: 0.2, description: "Expose to find injuries. Protect from hypothermia. Log-roll to check the back.", color: "22C55E"),
                        ]
                    )
                ),
                keyFacts: [
                    "The primary survey should take no more than 60 seconds",
                    "Use jaw thrust instead of head-tilt chin-lift when spinal injury is suspected",
                    "AVPU: Alert, Voice, Pain, Unresponsive — fastest neurological assessment",
                    "Massive hemorrhage control takes priority over everything except airway",
                    "Repeat the primary survey whenever the patient's condition changes",
                ],
                warningNote: "An unconscious patient with a mechanism suggesting spinal injury (fall from height, high-speed impact, head trauma) must have cervical spine stabilization maintained throughout the assessment. Do not move the patient until the spine is cleared or immobilized."
            ),
            ExploreSection(
                id: "wpa-3",
                heading: "Secondary Survey: Head-to-Toe Exam",
                body: "Once life threats are addressed, perform a systematic head-to-toe examination. Start at the skull: palpate for depressions, lacerations, and fluid from the ears or nose. Gently palpate the cervical spine for midline tenderness. Move to the chest: compress each side to feel for crepitus or instability suggesting rib fractures. Palpate the abdomen in all four quadrants, noting rigidity or guarding. Compress the pelvis gently inward once — if it moves, stop immediately, as pelvic instability indicates life-threatening hemorrhage. Run your hands along each extremity, checking for deformity, swelling, and tenderness. Assess circulation, sensation, and motor function distal to any injury. Check the back by log-rolling the patient. Document every finding — rescue teams arriving hours later will depend on your initial assessment to guide their treatment decisions.",
                diagram: ExploreDiagram(
                    type: .labeledScene,
                    config: DiagramConfig(
                        sceneDescription: "body assessment",
                        hotspots: [
                            RevealItem(id: "wpa-head", label: "Head & C-spine", detail: "Palpate skull for depressions, check pupils, look for blood or fluid from ears/nose. Palpate cervical spine for midline tenderness.", x: 0.5, y: 0.08),
                            RevealItem(id: "wpa-chest", label: "Chest", detail: "Compress each side. Feel for crepitus, instability. Watch for asymmetric breathing suggesting pneumothorax.", x: 0.5, y: 0.32),
                            RevealItem(id: "wpa-abdomen", label: "Abdomen", detail: "Palpate all four quadrants. Rigidity or guarding suggests internal hemorrhage. Note distension.", x: 0.5, y: 0.48),
                            RevealItem(id: "wpa-pelvis", label: "Pelvis", detail: "Gentle inward compression ONCE. If unstable, do not repeat. Bind with clothing or pack straps.", x: 0.5, y: 0.58),
                            RevealItem(id: "wpa-extremities", label: "Extremities", detail: "Check CSM (circulation, sensation, motor) distal to each injury. Compare left and right sides.", x: 0.3, y: 0.78),
                        ]
                    )
                ),
                keyFacts: [
                    "Always examine in the same order: head, neck, chest, abdomen, pelvis, extremities, back",
                    "Pelvic compression test: perform only ONCE — repeated testing can dislodge clots",
                    "Check CSM (circulation, sensation, motor) distal to every extremity injury",
                    "Document all findings with times — trending data is critical for evacuation teams",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "wpa-4",
                heading: "Vital Signs and Ongoing Assessment",
                body: "In the wilderness, you can reliably measure three vital signs without equipment: pulse rate, respiratory rate, and level of consciousness. Take vitals every 15 minutes for stable patients and every 5 minutes for unstable patients. A rising pulse rate with declining consciousness is the classic pattern of progressive hemorrhagic shock — the heart beats faster to compensate for lost blood volume until the brain can no longer maintain function. Skin color and temperature provide additional data: pale, cool, clammy skin suggests shock; hot, dry, flushed skin suggests heat illness or severe infection. The SOAP note format (Subjective, Objective, Assessment, Plan) provides a structured way to document your findings and communicate them clearly when help arrives or when you call for evacuation.",
                diagram: nil,
                keyFacts: [
                    "Three no-equipment vitals: pulse rate, respiratory rate, level of consciousness",
                    "Stable patients: vitals every 15 minutes. Unstable: every 5 minutes",
                    "Rising pulse + falling consciousness = hemorrhagic shock until proven otherwise",
                    "Document findings using SOAP format for clear handoff to rescue teams",
                    "Trending matters more than any single reading — watch the direction of change",
                ],
                warningNote: "A patient who is initially alert and talking can deteriorate rapidly from internal bleeding that is invisible from the outside. Never assume stability based on a single assessment. Continuous monitoring with documented vitals is mandatory."
            ),
        ],
        relatedArticles: [
            "firstaid-hypothermia",
            "firstaid-fractures-splinting",
            "firstaid-evacuation-planning",
        ],
        relatedModules: [
            "wilderness-assessment",
            "hypothermia",
            "evacuation-planning",
        ]
    )

    // MARK: - 2. Hypothermia

    static let hypothermia = ExploreArticle(
        id: "firstaid-hypothermia",
        domain: .firstAid,
        title: "Hypothermia",
        summary: "Hypothermia — a core body temperature below 35 degrees C — is the most common killer in wilderness environments and the most commonly underestimated threat. It can develop in any season, at any altitude, and in conditions that seem benign.",
        icon: "thermometer.snowflake",
        sections: [
            ExploreSection(
                id: "hypo-1",
                heading: "Recognition and Staging",
                body: "Hypothermia progresses through predictable stages, but in the field you cannot measure core temperature reliably. Instead, you assess clinical signs. Mild hypothermia (35-32 degrees C) presents with shivering, impaired coordination, slurred speech, and poor judgment — the \"umbles\" (stumbles, mumbles, fumbles, grumbles). Moderate hypothermia (32-28 degrees C) is marked by cessation of shivering, increasing muscle rigidity, paradoxical undressing, and declining consciousness. Severe hypothermia (below 28 degrees C) produces a patient who appears dead: unresponsive, rigid, with a barely perceptible pulse and shallow breathing. The Swiss staging system simplifies field assessment: Stage 1 (conscious, shivering), Stage 2 (drowsy, not shivering), Stage 3 (unconscious), Stage 4 (apparent death). Each stage demands different treatment.",
                diagram: ExploreDiagram(
                    type: .timeline,
                    config: DiagramConfig(
                        segments: [
                            DiagramSegment(id: "hypo-mild", label: "Mild (35-32°C)", value: 0.3, description: "Shivering, impaired coordination, poor judgment. The 'umbles': stumbles, mumbles, fumbles.", color: "3B82F6"),
                            DiagramSegment(id: "hypo-moderate", label: "Moderate (32-28°C)", value: 0.3, description: "Shivering stops, muscle rigidity, paradoxical undressing, declining consciousness.", color: "F59E0B"),
                            DiagramSegment(id: "hypo-severe", label: "Severe (<28°C)", value: 0.2, description: "Unresponsive, rigid, barely perceptible pulse. Appears dead.", color: "EF4444"),
                            DiagramSegment(id: "hypo-cardiac", label: "Cardiac Arrest", value: 0.2, description: "V-fib or asystole. CPR required. 'No one is dead until warm and dead.'", color: "7F1D1D"),
                        ]
                    )
                ),
                keyFacts: [
                    "Shivering is the body's primary heat production mechanism — when it stops, the patient is getting worse, not better",
                    "Paradoxical undressing occurs in moderate hypothermia as the brain loses thermoregulatory control",
                    "The Swiss staging system (1-4) allows field classification without a thermometer",
                    "A hypothermic patient who appears dead may still be resuscitable — never declare death in the field",
                ],
                warningNote: "A severely hypothermic patient has an irritable heart prone to ventricular fibrillation. Handle gently. Rough movement, rapid rewarming of extremities, or allowing the patient to exert themselves can trigger fatal cardiac arrest."
            ),
            ExploreSection(
                id: "hypo-2",
                heading: "Field Treatment",
                body: "Treatment depends on stage. For mild hypothermia, the priority is halting further heat loss and supporting the body's own rewarming through shivering. Remove wet clothing, insulate from the ground (this is critical — conductive heat loss to the ground is enormous), create a vapor barrier with a tarp or emergency blanket, and provide warm sweet drinks and calories to fuel shivering. For moderate hypothermia, the patient can no longer rewarm themselves. Handle them gently and horizontally to prevent cold blood from the extremities rushing to the core (afterdrop). Apply external heat sources to the trunk — hot water bottles or chemical heat packs to the armpits, groin, and neck. Do not warm the extremities. For severe hypothermia, insulate, handle with extreme care, and evacuate. These patients need hospital rewarming. If there is no pulse after 60 seconds of careful checking, begin CPR and do not stop until the patient is warm or you are physically unable to continue.",
                diagram: nil,
                keyFacts: [
                    "Insulate from the ground first — conductive heat loss to cold ground is the largest heat drain",
                    "Wet clothing loses insulation value by up to 90% — remove and replace if possible",
                    "Apply heat sources to the trunk only (armpits, groin, neck), never to extremities",
                    "Afterdrop: cold peripheral blood returning to the core can cause further temperature decline",
                    "In severe hypothermia, check for a pulse for 60 full seconds before starting CPR",
                ],
                warningNote: "Never give alcohol to a hypothermic patient. Alcohol dilates peripheral blood vessels, increasing heat loss and accelerating core cooling. Warm sweet drinks (not alcohol) provide both heat and calories for shivering."
            ),
            ExploreSection(
                id: "hypo-3",
                heading: "The Hypothermia Wrap",
                body: "The hypothermia wrap is the definitive field treatment for packaging a hypothermic patient. The goal is to create an insulated, vapor-sealed cocoon that halts all further heat loss. Layer from the inside out: place an insulating pad on the ground (two pads if available), then a vapor barrier (tarp or emergency blanket, shiny side in), then the patient in dry insulation (sleeping bag, dry clothing, anything available), then heat sources against the trunk, then close the vapor barrier completely, and finally add an outer windproof and waterproof shell. The vapor barrier is essential because evaporative heat loss can drain more energy than any other mechanism. A properly constructed hypothermia wrap can halt temperature decline even in severe conditions and buy critical time for evacuation. Practice building one before you need to build one in an emergency, because the fine motor skills required are exactly the skills that cold and stress degrade first.",
                diagram: ExploreDiagram(
                    type: .layeredStack,
                    config: DiagramConfig(
                        layers: [
                            DiagramLayer(id: "hypo-outer", name: "Outer Shell", color: "#1E3A5F", heightRatio: 0.15, description: "Windproof, waterproof layer — tarp, bivy sack, or emergency blanket"),
                            DiagramLayer(id: "hypo-vapor", name: "Vapor Barrier", color: "#2563EB", heightRatio: 0.15, description: "Sealed tarp or emergency blanket — blocks evaporative heat loss"),
                            DiagramLayer(id: "hypo-insulation", name: "Insulation + Heat", color: "#3B82F6", heightRatio: 0.30, description: "Sleeping bag, dry clothing, heat packs at armpits, groin, neck"),
                            DiagramLayer(id: "hypo-patient", name: "Patient", color: "#60A5FA", heightRatio: 0.20, description: "Dry base layer. Remove all wet clothing before wrapping."),
                            DiagramLayer(id: "hypo-ground", name: "Ground Insulation", color: "#93C5FD", heightRatio: 0.20, description: "Two pads if possible — conductive loss to ground is the largest heat drain"),
                        ],
                        animationStyle: "sequential"
                    )
                ),
                keyFacts: [
                    "The vapor barrier is the most important layer — it stops evaporative heat loss",
                    "Ground insulation matters more than top insulation because conductive loss is greatest downward",
                    "Heat sources go against the trunk: armpits, groin, and sides of the neck",
                    "The wrap must be fully sealed — any opening allows convective heat loss",
                    "Practice building the wrap in controlled conditions before you need it in an emergency",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "hypo-4",
                heading: "Prevention",
                body: "Hypothermia prevention is fundamentally about managing the four mechanisms of heat loss: conduction (contact with cold surfaces), convection (wind stripping heat from skin), radiation (body heat radiating to the environment), and evaporation (sweat and wet clothing cooling the body). Layering clothing to manage moisture is critical: a wicking base layer, an insulating mid layer, and a windproof and waterproof outer layer. Eat and drink regularly — your body cannot produce heat without fuel. Stay dry — manage sweat by ventilating before you overheat, and shelter from rain and wet snow. Recognize the early signs in yourself and others: if someone in your group is stumbling, fumbling with gear, or making poor decisions, they may already be mildly hypothermic. Address it immediately. Mild hypothermia is easily reversed; moderate hypothermia is a medical emergency.",
                diagram: nil,
                keyFacts: [
                    "Four heat loss mechanisms: conduction, convection, radiation, evaporation",
                    "Cotton is lethal in cold environments — it absorbs water and loses all insulating value",
                    "Eat before you are hungry, drink before you are thirsty — prevention requires constant fueling",
                    "The early signs in others (stumbles, fumbles, mumbles) are easier to see than in yourself",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "firstaid-wilderness-patient-assessment",
            "firstaid-frostbite",
            "firstaid-emergency-shelter",
        ],
        relatedModules: [
            "hypothermia",
            "wilderness-assessment",
            "emergency-shelter",
        ]
    )

    // MARK: - 3. Altitude Sickness

    static let altitudeSickness = ExploreArticle(
        id: "firstaid-altitude-sickness",
        domain: .firstAid,
        title: "Altitude Sickness",
        summary: "Altitude illness encompasses a spectrum from mild Acute Mountain Sickness to the lethal conditions of High Altitude Cerebral Edema and High Altitude Pulmonary Edema. The treatment for all three is the same: descend.",
        icon: "mountain.2.fill",
        sections: [
            ExploreSection(
                id: "alt-1",
                heading: "Acute Mountain Sickness (AMS)",
                body: "AMS is the mildest form of altitude illness and by far the most common. It typically develops 6 to 12 hours after arriving at a new altitude and presents as a headache combined with at least one other symptom: nausea, fatigue, dizziness, or difficulty sleeping. The Lake Louise Score provides a standardized assessment: rate headache, gastrointestinal symptoms, fatigue, and dizziness on a 0-3 scale; a score of 3 or higher with headache present diagnoses AMS. The fundamental cause is the reduced partial pressure of oxygen at altitude — at 3,000 meters, each breath delivers roughly 30% less oxygen than at sea level. Most people acclimatize within 1-3 days if they do not ascend further, but AMS is the warning signal that the body is struggling to adapt and must not be ignored.",
                diagram: nil,
                keyFacts: [
                    "AMS affects 25% of people ascending to 2,500 meters and 50% at 4,000 meters",
                    "Symptoms typically appear 6-12 hours after arrival at a new altitude",
                    "The Lake Louise Score of 3 or higher (with headache) diagnoses AMS",
                    "AMS is a warning — it tells you the body is not keeping pace with the ascent rate",
                    "Fitness does not protect against AMS — it affects athletes and sedentary people equally",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "alt-2",
                heading: "HACE and HAPE: Life-Threatening Progression",
                body: "High Altitude Cerebral Edema (HACE) is AMS that has progressed to swelling of the brain. The hallmark sign is ataxia — the inability to walk in a straight line. Perform a tandem gait test (heel-to-toe walking): if the patient cannot walk a straight line without stepping off, assume HACE until proven otherwise. Confusion, irrational behavior, and declining consciousness follow rapidly. Without descent, HACE is fatal within 24 hours. High Altitude Pulmonary Edema (HAPE) is fluid accumulation in the lungs and can develop independently of AMS. It typically presents on the second or third night at a new altitude with a dry cough that progresses to a productive cough with pink frothy sputum, breathlessness at rest, and cyanosis. HAPE kills faster than HACE and is the leading cause of altitude-related death. Both conditions demand immediate descent — every hour of delay increases the probability of death.",
                diagram: ExploreDiagram(
                    type: .comparisonSplit,
                    config: DiagramConfig(
                        leftTitle: "HACE (Brain)",
                        rightTitle: "HAPE (Lungs)",
                        leftColor: "8B5CF6",
                        rightColor: "3B82F6",
                        leftItems: [
                            "Ataxia (cannot walk heel-to-toe)",
                            "Confusion, irrational behavior",
                            "Severe headache unresponsive to meds",
                            "Declining consciousness to coma",
                            "Fatal within 24 hours without descent",
                        ],
                        rightItems: [
                            "Dry cough progressing to wet cough",
                            "Pink or frothy sputum",
                            "Breathlessness at rest",
                            "Cyanosis (blue lips/fingernails)",
                            "Leading cause of altitude death",
                        ]
                    )
                ),
                keyFacts: [
                    "HACE hallmark: ataxia — test with tandem gait (heel-to-toe walking)",
                    "HAPE hallmark: breathlessness at rest with productive cough, often worse at night",
                    "HAPE can occur without preceding AMS symptoms",
                    "Both conditions require immediate descent of at least 300-1,000 meters",
                ],
                warningNote: "HACE and HAPE are medical emergencies. Descent is the definitive treatment. If descent is impossible due to weather or terrain, administer dexamethasone (HACE) or nifedipine (HAPE) and use supplemental oxygen or a portable hyperbaric chamber (Gamow bag) as temporizing measures. These are bridges to descent, not substitutes for it."
            ),
            ExploreSection(
                id: "alt-3",
                heading: "Acclimatization Strategy",
                body: "The golden rule of acclimatization is simple: climb high, sleep low. Above 3,000 meters, increase your sleeping altitude by no more than 300-500 meters per day, with a rest day (no altitude gain) every third or fourth day. Day excursions to higher elevations are beneficial because they expose the body to lower oxygen levels while allowing it to recover at a lower sleeping altitude. Proper hydration and adequate caloric intake support acclimatization but do not replace a conservative ascent profile. Acetazolamide (Diamox) can be used prophylactically at 125-250mg twice daily starting the day before ascent — it works by inducing a mild metabolic acidosis that stimulates ventilation, effectively tricking the body into breathing more. It is not a substitute for proper acclimatization but can help when rapid ascent is unavoidable.",
                diagram: nil,
                keyFacts: [
                    "Climb high, sleep low: the fundamental acclimatization principle",
                    "Above 3,000m, gain no more than 300-500m sleeping altitude per day",
                    "Take a rest day every 3-4 days of ascent",
                    "Acetazolamide (Diamox) 125-250mg BID aids acclimatization but does not replace gradual ascent",
                    "Individual acclimatization rates vary widely and are not predicted by fitness level",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "alt-4",
                heading: "Field Decision-Making at Altitude",
                body: "The three rules of altitude medicine are non-negotiable. Rule one: any illness at altitude is altitude illness until proven otherwise. A headache at 4,500 meters is not just a headache — it is AMS until you can demonstrate another cause. Rule two: never ascend with symptoms of AMS. If a team member has AMS, the entire group stops ascending until symptoms resolve. Pushing through AMS is how people develop HACE and HAPE. Rule three: if symptoms are worsening despite rest, descend immediately. Do not wait for morning. Do not wait for better weather. Do not wait to see if medications help. Descend now. The mountain will still be there. The patient may not be if you delay. These rules save lives precisely because they are absolute — they leave no room for the rationalization and wishful thinking that kills people at altitude.",
                diagram: nil,
                keyFacts: [
                    "Rule 1: Any illness at altitude is altitude illness until proven otherwise",
                    "Rule 2: Never ascend with symptoms of AMS",
                    "Rule 3: If symptoms worsen despite rest, descend immediately",
                    "Night descents in deteriorating conditions are preferable to waiting with HACE or HAPE",
                    "Descent of even 300 meters can produce dramatic improvement in symptoms",
                ],
                warningNote: "People die from altitude illness because their companions convince themselves the symptoms will improve with rest. They almost never do. When in doubt, descend. No summit is worth a life."
            ),
        ],
        relatedArticles: [
            "firstaid-wilderness-patient-assessment",
            "firstaid-dehydration-heat-illness",
            "firstaid-evacuation-planning",
        ],
        relatedModules: [
            "altitude-sickness",
            "wilderness-assessment",
            "evacuation-planning",
        ]
    )

    // MARK: - 4. Fractures and Splinting

    static let fracturesAndSplinting = ExploreArticle(
        id: "firstaid-fractures-splinting",
        domain: .firstAid,
        title: "Fractures and Splinting",
        summary: "Wilderness fracture management differs fundamentally from hospital care. You cannot get an X-ray, and evacuation may take hours or days. The goal is to stabilize the injury, manage pain, maintain circulation, and get the patient to definitive care.",
        icon: "bandage.fill",
        sections: [
            ExploreSection(
                id: "frac-1",
                heading: "Assessment: Is It Broken?",
                body: "In the wilderness, you treat based on clinical findings, not X-rays. The signs of a fracture include deformity (the limb looks wrong), point tenderness (pain localized to one spot when you press on the bone), crepitus (a grating sensation when the bone ends move against each other — do not deliberately elicit this), swelling, and loss of function. An angulated fracture with obvious deformity is easy to diagnose. The harder call is a non-displaced fracture that presents as severe point tenderness with swelling but normal alignment. When in doubt, splint it. The consequences of splinting a severe sprain are minimal. The consequences of not splinting a fracture — further displacement, vascular injury, nerve damage — can be permanent.",
                diagram: nil,
                keyFacts: [
                    "Signs of fracture: deformity, point tenderness, crepitus, swelling, loss of function",
                    "Always check and document CSM (circulation, sensation, motor) distal to the injury",
                    "When in doubt, splint — over-treatment causes no harm; under-treatment can cause permanent damage",
                    "Compare the injured limb to the uninjured side to detect subtle deformity",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "frac-2",
                heading: "Traction and Realignment",
                body: "In wilderness medicine, realigning a deformed fracture is within scope because the alternative — hours of transport with a badly angulated limb compressing nerves and blood vessels — is worse. The indication for realignment is an angulated fracture with compromised distal circulation (no pulse, pale or blue skin, numbness distal to the fracture). Apply steady, gentle traction along the long axis of the bone while a partner stabilizes the proximal segment. The goal is not anatomic reduction but restoring gross alignment and relieving vascular compromise. If the patient has no distal pulse before realignment and has a pulse after, you have potentially saved a limb. If the fracture is open (bone protruding through skin), irrigate the wound copiously with clean water, apply a sterile dressing, and splint in position. Do not push exposed bone back through the skin — this drives contamination into the wound.",
                diagram: nil,
                keyFacts: [
                    "Realign only when distal circulation is compromised — absent pulse, blue or white skin",
                    "Apply traction along the long axis of the bone with steady, gentle force",
                    "Check CSM before and after any manipulation — document both",
                    "Open fractures: irrigate, dress, splint. Do not push bone back through the wound",
                    "Femur fractures can bleed 1-2 liters internally — treat for shock",
                ],
                warningNote: "A femur fracture can cause life-threatening internal hemorrhage of 1-2 liters into the thigh. The patient may appear stable initially but develop shock over hours. Monitor vital signs frequently and treat aggressively for shock during evacuation."
            ),
            ExploreSection(
                id: "frac-3",
                heading: "Improvised Splinting",
                body: "A good splint immobilizes the joint above and the joint below the fracture, is padded to prevent pressure sores, and allows you to monitor and maintain distal circulation. In the wilderness, splint materials are everywhere: trekking poles, tent poles, ice axes, foam sleeping pads, stiff branches, even a rolled-up newspaper or magazine. The SAM splint, if carried, is the most versatile commercial option — it can be shaped into a gutter splint, a sugar-tong splint, or a cervical collar. For lower extremity fractures, the uninjured leg can serve as a splint by securing the legs together with padding between them. The key principles are universal: immobilize above and below, pad all bony prominences, secure snugly but not so tight as to impair circulation, and recheck CSM every 15 minutes. Cold, numbness, or loss of pulse distal to the splint means it is too tight and must be loosened immediately.",
                diagram: nil,
                keyFacts: [
                    "Immobilize the joint above and the joint below the fracture",
                    "Pad all bony prominences to prevent pressure injuries during evacuation",
                    "Improvised materials: trekking poles, sleeping pads, tent poles, ice axes, stiff branches",
                    "Recheck CSM every 15 minutes — a tight splint can cause compartment syndrome",
                    "A SAM splint can be shaped for almost any fracture including C-spine",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "frac-4",
                heading: "Evacuation Decisions",
                body: "Not all fractures require helicopter evacuation. A stable, well-splinted wrist or forearm fracture in a patient who can walk may allow self-evacuation with assistance. An isolated ankle fracture may allow slow descent with improvised crutches. The fractures that demand urgent evacuation are those involving the femur (hemorrhage risk), the pelvis (hemorrhage risk), the spine (paralysis risk), and any fracture with compromised distal circulation that does not improve with realignment. Open fractures need definitive wound care within 6-8 hours to reduce infection risk. Pain management during evacuation is critical — ibuprofen 600mg every 6 hours provides both analgesic and anti-inflammatory effects. If prescription medications are carried, oral opioids or intramuscular ketorolac may be appropriate for severe pain during prolonged evacuations.",
                diagram: nil,
                keyFacts: [
                    "Urgent evacuation: femur, pelvis, spine, any fracture with compromised circulation",
                    "Open fractures need definitive care within 6-8 hours to reduce infection risk",
                    "Stable upper extremity fractures may allow assisted self-evacuation",
                    "Ibuprofen 600mg every 6 hours is the wilderness analgesic workhorse",
                    "Document mechanism of injury, exam findings, treatments, and vitals for receiving hospital",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "firstaid-wilderness-patient-assessment",
            "firstaid-wound-care",
            "firstaid-evacuation-planning",
        ],
        relatedModules: [
            "fractures-splints",
            "wilderness-assessment",
            "evacuation-planning",
        ]
    )

    // MARK: - 5. Wound Care

    static let woundCare = ExploreArticle(
        id: "firstaid-wound-care",
        domain: .firstAid,
        title: "Wound Care in the Wilderness",
        summary: "Wound management in remote environments prioritizes aggressive irrigation and infection prevention over cosmetic closure. In the wilderness, infection is the primary threat, and the decisions you make in the first hour determine the outcome days later.",
        icon: "cross.case.fill",
        sections: [
            ExploreSection(
                id: "wound-1",
                heading: "Irrigation: The Most Important Step",
                body: "Irrigation — the mechanical flushing of a wound with clean water under pressure — is the single most important wound care intervention. It physically removes bacteria, dirt, and debris that would otherwise cause infection. The standard is at least 1 liter of the cleanest water available, delivered under pressure. A syringe with an 18-gauge needle produces ideal irrigation pressure (8-12 psi). In the field, a zip-lock bag with a small hole poked in the corner, squeezed firmly, produces adequate pressure. A hydration bladder with the bite valve makes an excellent irrigator. The water does not need to be sterile — potable drinking water is sufficient. Water that is clean enough to drink is clean enough to irrigate a wound. Irrigate until the wound looks clean, then irrigate some more. The solution to pollution is dilution.",
                diagram: nil,
                keyFacts: [
                    "Irrigation pressure of 8-12 psi is optimal — a syringe with 18-gauge needle achieves this",
                    "Use at least 1 liter of clean water, more for heavily contaminated wounds",
                    "Potable water is adequate for irrigation — it does not need to be sterile",
                    "Improvised irrigators: zip-lock bag with pinhole, hydration bladder bite valve",
                    "Irrigation reduces wound infection rates by up to 80% compared to no irrigation",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "wound-2",
                heading: "Closure vs. Leaving Open",
                body: "The wilderness closure decision is fundamentally different from the emergency room. In the ER, wounds are closed primarily (sutured or stapled) within hours of injury. In the wilderness, where definitive care may be days away and infection risk is high, the default is to leave wounds open. Close a wound in the field only if all of the following are true: the wound is clean and has been copiously irrigated, it is less than 6-8 hours old, it is not a bite wound, it is not heavily contaminated, and closure will significantly improve function (such as a gaping wound over a joint). Scalp wounds are an exception — they bleed profusely and can be closed with hair ties or adhesive strips even in contaminated conditions because the scalp's rich blood supply resists infection. When leaving a wound open, pack it loosely with moist gauze, cover with a sterile dressing, and plan for delayed primary closure at a hospital.",
                diagram: nil,
                keyFacts: [
                    "Default in the wilderness: leave wounds open to prevent trapping infection",
                    "Close only if clean, irrigated, less than 6-8 hours old, not a bite, and closure aids function",
                    "Scalp wounds are an exception — close to control bleeding due to rich blood supply",
                    "Adhesive wound closure strips (Steri-Strips) are the best field closure method",
                    "Bite wounds should never be closed in the field — infection rate exceeds 50% if closed primarily",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "wound-3",
                heading: "Infection Prevention and Monitoring",
                body: "Wound infection in the wilderness can progress from nuisance to life-threatening sepsis with alarming speed. After irrigation and dressing, monitor the wound at every dressing change for signs of infection: increasing redness spreading from the wound edges, warmth, swelling, increasing pain, purulent discharge, red streaks tracking up the limb (lymphangitis), and systemic signs including fever and chills. Red streaks indicate that infection has spread to the lymphatic system and the patient needs antibiotics urgently and may need evacuation. If antibiotics are carried, a broad-spectrum option such as amoxicillin-clavulanate (Augmentin) 875/125mg twice daily or cephalexin 500mg four times daily covers most wilderness wound pathogens. Change dressings at least twice daily, re-irrigating each time. A wound that was clean yesterday can be infected today.",
                diagram: nil,
                keyFacts: [
                    "Signs of infection: spreading redness, warmth, swelling, increasing pain, purulent discharge",
                    "Red streaks (lymphangitis) indicate systemic spread — this is urgent",
                    "Change dressings at least twice daily with re-irrigation each time",
                    "Broad-spectrum antibiotics: amoxicillin-clavulanate or cephalexin for wilderness wounds",
                    "Infection risk increases with time — wounds older than 6-8 hours are much higher risk",
                ],
                warningNote: "Red streaks tracking from a wound toward the trunk indicate lymphangitis — the infection is spreading systemically. Begin antibiotics immediately if available and evacuate urgently. Untreated lymphangitis can progress to sepsis within hours."
            ),
            ExploreSection(
                id: "wound-4",
                heading: "Special Wound Types",
                body: "Certain wound types require specific management. Puncture wounds are deceptively dangerous because the small surface opening hides a deep track that is difficult to irrigate and prone to anaerobic infection. Irrigate as deeply as possible and monitor closely. Avulsion flaps (a flap of skin partially torn away) should be laid back into position after irrigation and secured with adhesive strips — the flap may survive if its blood supply is intact. Blisters are wounds: if they impair function, drain by puncturing the base with a sterilized needle, leaving the roof intact as a biological dressing. Subungual hematomas (blood under a fingernail or toenail from impact) cause excruciating pressure pain; relieve by carefully melting through the nail with a heated paperclip tip until blood escapes. Abrasions (road rash) are painful but rarely serious — irrigate aggressively, apply antibiotic ointment, and cover with a non-adherent dressing.",
                diagram: nil,
                keyFacts: [
                    "Puncture wounds: deceptively dangerous, difficult to irrigate, high infection risk",
                    "Avulsion flaps: lay back into position after irrigation, secure with adhesive strips",
                    "Blisters: drain at the base, leave the roof intact as a biological dressing",
                    "Subungual hematomas: relieve with a heated paperclip through the nail",
                    "All wounds benefit from prophylactic tetanus awareness — know your vaccination status",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "firstaid-fractures-splinting",
            "firstaid-wilderness-patient-assessment",
            "firstaid-frostbite",
        ],
        relatedModules: [
            "wound-care",
            "wilderness-assessment",
            "frostbite",
        ]
    )

    // MARK: - 6. Lightning Injuries

    static let lightningInjuries = ExploreArticle(
        id: "firstaid-lightning-injuries",
        domain: .firstAid,
        title: "Lightning Injuries",
        summary: "Lightning kills more people in mountain environments than most climbers realize. Understanding the injury mechanisms, treatment priorities, and prevention strategies specific to mountain terrain is essential wilderness medical knowledge.",
        icon: "bolt.fill",
        sections: [
            ExploreSection(
                id: "light-1",
                heading: "Mechanisms of Lightning Injury",
                body: "Lightning injures through five distinct mechanisms, and understanding them changes how you assess and treat patients. A direct strike, where the current passes through the body, is the most lethal but least common mechanism. A side flash occurs when lightning hits a nearby object (tree, rock, another person) and jumps to the victim. Ground current, the most common mechanism, occurs when lightning strikes the ground and current radiates outward, entering one foot and exiting the other, with the potential difference across the stride determining the severity. Contact injury occurs when the victim is touching a conductive object that is struck. Upward streamer injury occurs when the victim's body generates an upward leader that does not connect with the downward leader but still carries enough current to cause injury. In groups, multiple casualties are common because ground current and side flash can affect everyone within 10-15 meters of a strike point.",
                diagram: nil,
                keyFacts: [
                    "Ground current is the most common mechanism — current enters one foot, exits the other",
                    "Side flash: lightning jumps from a struck object to a nearby person",
                    "Multiple casualties are common in groups — ground current affects everyone nearby",
                    "Lightning current typically flows over the body surface (flashover) rather than through it",
                    "Cardiac arrest is the primary cause of death — the heart is electrically reset to asystole",
                ],
                warningNote: "Lightning can strike up to 10 miles ahead of a thunderstorm. If you can hear thunder, you are within strike range. Do not wait for rain or nearby strikes to take protective action."
            ),
            ExploreSection(
                id: "light-2",
                heading: "Treatment of Lightning Injuries",
                body: "Lightning injury triage reverses the normal mass casualty rules. In standard triage, patients who are not breathing and have no pulse are classified as expectant (likely dead) and resources are directed to salvageable patients. In lightning triage, the reverse is true. Patients in cardiac arrest from lightning have the highest chance of successful resuscitation if CPR is begun immediately, because lightning-induced cardiac arrest is often a simple electrical reset that responds to defibrillation or even spontaneous recovery if the patient receives ventilatory support while the heart restarts. Patients who are conscious and breathing after a lightning strike are very unlikely to die. Therefore, prioritize the apparently dead over the apparently alive. Begin aggressive CPR immediately and continue until AED/defibrillation is available or the patient is pronounced by a physician. Survivors should be assessed for burns (typically superficial), tympanic membrane rupture (check hearing), and neurological deficits.",
                diagram: nil,
                keyFacts: [
                    "Reverse triage: treat the apparently dead first — they have the best salvage rate",
                    "Lightning cardiac arrest responds well to CPR and defibrillation",
                    "Breathing, conscious patients are very unlikely to die — assess but do not prioritize",
                    "Check for tympanic membrane rupture (hearing loss) in all lightning patients",
                    "Burns from lightning are typically superficial, following the path of sweat and rain on the skin",
                ],
                warningNote: "Lightning can cause delayed cardiac arrhythmias hours after the initial strike. All lightning strike patients, even those who appear uninjured, must be evacuated for cardiac monitoring. There is no safe field observation period."
            ),
            ExploreSection(
                id: "light-3",
                heading: "Prevention in Mountain Terrain",
                body: "Lightning avoidance in mountains begins with timing. Monitor weather forecasts and observe cumulus development. The standard alpine rule — be off summits and exposed ridges by early afternoon — exists primarily because of lightning. When thunderstorms are forecast, plan routes that keep you below treeline during the afternoon peak. If caught above treeline with no time to descend, avoid being the tallest object, move away from summits, ridgelines, and isolated trees, and descend to a lower point on the slope. Avoid wet gullies and cracks in rock (current paths). Assume the lightning position: crouch on the balls of your feet with feet together, arms around knees, on insulating material if available. In a group, spread out at least 15 meters apart to reduce multiple casualties from a single strike. Remove metal-frame packs but keep them nearby for emergency use after the storm passes.",
                diagram: nil,
                keyFacts: [
                    "The 30-30 rule: if flash-to-bang time is under 30 seconds, seek shelter; wait 30 minutes after the last thunder",
                    "Spread out at least 15 meters apart in a group to reduce multiple casualties",
                    "Lightning position: crouch on balls of feet, feet together, arms around knees",
                    "Avoid summits, ridgelines, isolated trees, wet gullies, and rock cracks",
                    "Metal does not attract lightning, but metal objects in contact with skin create burn risk",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "firstaid-wilderness-patient-assessment",
            "firstaid-evacuation-planning",
            "firstaid-emergency-shelter",
        ],
        relatedModules: [
            "lightning-injuries",
            "wilderness-assessment",
            "evacuation-planning",
        ]
    )

    // MARK: - 7. Frostbite

    static let frostbite = ExploreArticle(
        id: "firstaid-frostbite",
        domain: .firstAid,
        title: "Frostbite",
        summary: "Frostbite is the freezing of tissue, most commonly affecting fingers, toes, ears, and nose. Field management decisions — particularly whether to thaw in the field or keep frozen for transport — can mean the difference between losing a fingertip and losing a hand.",
        icon: "snowflake",
        sections: [
            ExploreSection(
                id: "frost-1",
                heading: "Stages and Recognition",
                body: "Frostbite progresses through recognizable stages. Frostnip is a precursor — superficial cooling without ice crystal formation. The skin is pale and numb but soft when pressed. It resolves completely with rewarming and causes no tissue damage. Superficial frostbite involves ice crystal formation in the skin but not the deeper tissues. The skin appears white or grayish-yellow, feels waxy, and is still somewhat pliable. After rewarming, clear blisters form. Deep frostbite extends into subcutaneous tissue, muscle, tendons, and even bone. The affected area is hard as wood when pressed, completely insensate, and may appear mottled purple or black. After rewarming, hemorrhagic (blood-filled) blisters form. The depth of frostbite is often impossible to determine in the field until after thawing, which is why thawing decisions must be made carefully.",
                diagram: ExploreDiagram(
                    type: .timeline,
                    config: DiagramConfig(
                        segments: [
                            DiagramSegment(id: "frost-nip", label: "Frostnip", value: 0.2, description: "Pale, numb skin. Soft when pressed. Fully reversible with rewarming.", color: "93C5FD"),
                            DiagramSegment(id: "frost-superficial", label: "Superficial", value: 0.3, description: "White/waxy skin, pliable. Ice in skin. Clear blisters after thawing.", color: "3B82F6"),
                            DiagramSegment(id: "frost-deep", label: "Deep", value: 0.3, description: "Hard as wood, insensate, mottled. Hemorrhagic blisters after thawing.", color: "1E3A5F"),
                            DiagramSegment(id: "frost-complete", label: "Complete", value: 0.2, description: "Tissue frozen solid through to bone. Mummification likely. Surgical amputation.", color: "1E1B4B"),
                        ]
                    )
                ),
                keyFacts: [
                    "Frostnip is fully reversible — true frostbite involves tissue damage",
                    "Waxy white skin that is pliable = superficial. Hard as wood = deep frostbite",
                    "Clear blisters after thawing suggest superficial frostbite with better prognosis",
                    "Hemorrhagic (bloody) blisters indicate deep frostbite with likely tissue loss",
                    "Final tissue demarcation can take weeks to months — early amputation is almost never appropriate",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "frost-2",
                heading: "The Thawing Decision",
                body: "The most critical field decision in frostbite management is whether to thaw in the field or transport the patient with tissue still frozen. The rule is absolute: do not thaw if there is any chance the tissue will refreeze. Refreezing after thawing causes dramatically worse tissue damage than leaving the tissue frozen for transport. A frozen foot can be walked on without additional tissue loss. A thawed foot cannot bear weight and the patient becomes a litter carry. Therefore, if evacuation requires the patient to walk, or if the environment cannot guarantee the tissue will stay warm after thawing, leave it frozen. If you can definitively warm the tissue and keep it warm, and the patient can be carried or does not need the affected extremity for evacuation, then proceed with field rewarming.",
                diagram: nil,
                keyFacts: [
                    "NEVER thaw if there is any chance of refreezing — refreezing causes catastrophic tissue loss",
                    "A frozen foot can be walked on. A thawed foot cannot — the patient becomes a litter carry",
                    "Thaw only if you can keep the tissue warm afterward and the patient need not use the extremity",
                    "The decision to thaw changes the entire evacuation plan — consider this before acting",
                ],
                warningNote: "Refreezing frostbitten tissue after thawing is the single worst thing you can do. The ice crystals that reform are larger, shearing through cell walls and destroying tissue that might have been salvageable. If there is any doubt about maintaining warmth, keep the tissue frozen and transport."
            ),
            ExploreSection(
                id: "frost-3",
                heading: "Field Rewarming Protocol",
                body: "When the decision to thaw is made, the protocol is rapid rewarming in water heated to 37-39 degrees C (warm but comfortable to the touch of an uninjured hand). Immerse the frostbitten tissue completely and maintain the water temperature by adding warm water as it cools. Rewarming takes 15-30 minutes until the tissue becomes soft and pliable with a deep red or purple color. This process is excruciatingly painful — administer the strongest available analgesic before beginning. Ibuprofen 600mg has dual benefit as an analgesic and anti-prostaglandin agent that reduces tissue damage from the reperfusion cascade. After thawing, do not rupture blisters (they contain protective prostaglandins), apply a bulky sterile dressing, and splint the extremity. Separate digits with gauze to prevent tissue bonding. The thawed extremity is now extremely fragile and vulnerable to mechanical damage.",
                diagram: nil,
                keyFacts: [
                    "Rewarm in water at 37-39 degrees C — test temperature with an uninjured hand",
                    "Rewarming takes 15-30 minutes until tissue is soft and deep red or purple",
                    "Administer strong analgesics before rewarming — the pain is severe",
                    "Ibuprofen 600mg reduces tissue damage from reperfusion injury in addition to pain relief",
                    "Do not rupture blisters — they contain prostaglandins that protect the tissue",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "frost-4",
                heading: "Prevention",
                body: "Frostbite prevention begins with recognizing the conditions that cause it: cold exposure combined with moisture, wind, constriction, and inactivity. Hands and feet are most vulnerable because the body sacrifices peripheral perfusion to maintain core temperature. Keep extremities dry — moisture from sweat, snow, or wet gloves accelerates freezing. Vapor barrier liners inside boots and gloves prevent sweat from saturating insulation. Avoid tight boots and gloves that restrict blood flow. Maintain core body warmth — your hands go cold when your core goes cold, not when your hands go cold. Eat and drink regularly to maintain metabolic heat production. Check your partner's face, ears, and nose frequently — frostbite is painless once numbness sets in, and the victim often does not know it is happening. In extreme cold, use the buddy system for face checks every 15 minutes.",
                diagram: nil,
                keyFacts: [
                    "Cold + moisture + wind + constriction + inactivity = frostbite risk factors",
                    "Your hands go cold when your core goes cold — protect core temperature to protect extremities",
                    "Vapor barrier liners prevent sweat from saturating glove and boot insulation",
                    "Tight boots and gloves restrict blood flow and dramatically increase frostbite risk",
                    "Buddy system: check each other's face, ears, and nose every 15 minutes in extreme cold",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "firstaid-hypothermia",
            "firstaid-wound-care",
            "firstaid-evacuation-planning",
        ],
        relatedModules: [
            "frostbite",
            "hypothermia",
            "evacuation-planning",
        ]
    )

    // MARK: - 8. Dehydration and Heat Illness

    static let dehydrationAndHeatIllness = ExploreArticle(
        id: "firstaid-dehydration-heat-illness",
        domain: .firstAid,
        title: "Dehydration and Heat Illness",
        summary: "Dehydration and heat illness are among the most preventable wilderness emergencies and among the most dangerous when they progress unchecked. Heat stroke kills rapidly, and the window between recognizable symptoms and organ failure is disturbingly narrow.",
        icon: "sun.max.fill",
        sections: [
            ExploreSection(
                id: "heat-1",
                heading: "Dehydration: Recognition and Consequences",
                body: "Dehydration in the wilderness is insidious because the early symptoms — fatigue, headache, decreased urine output — are easily attributed to exertion and altitude. At mountain elevations, respiratory water loss is dramatically increased because the air is drier and ventilation rates are higher. Combined with sweat losses from exertion, a mountain traveler can lose 1-2 liters per hour in hot conditions at altitude. The simplest field assessment of hydration status is urine color: clear to light yellow indicates adequate hydration; dark yellow to amber indicates significant dehydration. Dehydration degrades every physiological system: cardiac output drops, thermoregulation fails, cognition declines, and physical performance deteriorates. A 2% loss of body weight from fluid deficit measurably impairs performance. At 5%, the person is a liability. At 10%, they are in a medical emergency.",
                diagram: nil,
                keyFacts: [
                    "Urine color is the simplest hydration assessment: pale yellow = hydrated, dark = dehydrated",
                    "Mountain travelers can lose 1-2 liters per hour from sweat and respiratory losses at altitude",
                    "2% body weight fluid loss measurably impairs physical and cognitive performance",
                    "5% fluid loss makes a person a liability. 10% is a medical emergency",
                    "Thirst is a late indicator — by the time you feel thirsty, you are already 1-2% dehydrated",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "heat-2",
                heading: "Heat Exhaustion vs. Heat Stroke",
                body: "Heat exhaustion and heat stroke represent a spectrum, but the distinction between them is critical because treatment differs dramatically. Heat exhaustion presents with heavy sweating, weakness, nausea, headache, dizziness, and a core temperature below 40 degrees C. The thermoregulatory system is struggling but still functioning — the patient is still sweating. Treatment is rest in shade, removal of excess clothing, active cooling, and oral rehydration with electrolyte solution. Heat stroke occurs when thermoregulation fails completely. The hallmark is altered mental status (confusion, combativeness, seizures, or unconsciousness) combined with a core temperature above 40 degrees C. Sweating may or may not be present — the classic teaching that heat stroke patients stop sweating is not always true. Heat stroke is a true medical emergency with a mortality rate exceeding 50% if cooling is delayed.",
                diagram: ExploreDiagram(
                    type: .comparisonSplit,
                    config: DiagramConfig(
                        leftTitle: "Heat Exhaustion",
                        rightTitle: "Heat Stroke",
                        leftColor: "F59E0B",
                        rightColor: "EF4444",
                        leftItems: [
                            "Core temp <40°C (104°F)",
                            "Still sweating (thermoregulation intact)",
                            "Fatigue, weakness, headache, nausea",
                            "Dizziness, muscle cramps",
                            "Alert or mildly confused",
                        ],
                        rightItems: [
                            "Core temp >40°C (104°F)",
                            "May or may not be sweating",
                            "Altered mental status (confused, combative)",
                            "Seizures, loss of consciousness",
                            "Mortality >50% if cooling delayed",
                        ]
                    )
                ),
                keyFacts: [
                    "The critical distinction: heat exhaustion = still sweating, still thinking. Heat stroke = altered mental status",
                    "Heat stroke mortality exceeds 50% if aggressive cooling is not begun immediately",
                    "Sweating may be present in heat stroke — do not rely on its absence for diagnosis",
                    "Core temperature above 40 degrees C (104 degrees F) with altered mental status = heat stroke",
                ],
                warningNote: "Heat stroke is a medical emergency that kills in minutes to hours. Begin aggressive cooling immediately: cold water immersion if available, or strip clothing, douse with water, and fan vigorously. Cooling takes priority over evacuation — cool first, then transport."
            ),
            ExploreSection(
                id: "heat-3",
                heading: "Electrolytes and Hyponatremia",
                body: "Electrolyte imbalance, particularly hyponatremia (dangerously low blood sodium), is an underappreciated wilderness danger. Hyponatremia occurs when a person drinks large amounts of plain water without replacing the sodium lost in sweat. The symptoms — nausea, headache, confusion, and seizures — mimic both heat exhaustion and altitude sickness, leading to dangerous misdiagnosis. The irony is lethal: a well-meaning rescuer who forces a hyponatremic patient to drink more plain water can kill them. The prevention is straightforward: add electrolytes to water during extended exertion, eat salty snacks regularly, and do not force fluid intake beyond thirst in cool conditions. A general guideline is 500-1000ml per hour during vigorous activity in heat, with electrolyte supplementation (sodium concentration of 500-700mg per liter) for efforts lasting more than 2 hours.",
                diagram: nil,
                keyFacts: [
                    "Hyponatremia mimics heat exhaustion and altitude sickness — dangerous misdiagnosis risk",
                    "Caused by drinking too much plain water without sodium replacement during prolonged exercise",
                    "Giving more water to a hyponatremic patient can cause seizures and death",
                    "Prevention: 500-700mg sodium per liter of water during extended exertion",
                    "Drink to thirst, not beyond — over-hydration is as dangerous as under-hydration",
                ],
                warningNote: "Hyponatremia can cause brain swelling, seizures, and death. If a patient who has been drinking large amounts of plain water during prolonged exertion develops confusion or seizures, suspect hyponatremia and do not give more plain water. Administer salty fluids or concentrated salt solution if available."
            ),
            ExploreSection(
                id: "heat-4",
                heading: "Prevention Strategies",
                body: "Heat illness prevention in the wilderness requires proactive management of hydration, electrolytes, exertion rate, and exposure. Pre-hydrate before activity: drink 500ml in the hour before departure. During activity, drink 500-1000ml per hour depending on intensity and heat, using electrolyte solutions for efforts over 2 hours. Wear light-colored, loose-fitting, breathable clothing that allows sweat to evaporate. Schedule the hardest efforts for the coolest parts of the day — early morning and late afternoon. Rest in shade during peak heat. Acclimate gradually: heat acclimatization takes 7-14 days and dramatically improves thermoregulatory efficiency. Watch your partners for early signs: someone who stops sweating, becomes confused, or stumbles may be transitioning from heat exhaustion to heat stroke. Early intervention — rest, shade, cooling, fluids — prevents the catastrophic progression.",
                diagram: nil,
                keyFacts: [
                    "Pre-hydrate: 500ml in the hour before departure",
                    "During activity: 500-1000ml per hour with electrolytes for efforts over 2 hours",
                    "Heat acclimatization takes 7-14 days and dramatically improves performance in heat",
                    "Schedule hard efforts for early morning or late afternoon, not midday heat",
                    "Early intervention in heat exhaustion prevents progression to heat stroke",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "firstaid-wilderness-patient-assessment",
            "firstaid-altitude-sickness",
            "firstaid-evacuation-planning",
        ],
        relatedModules: [
            "dehydration-heat",
            "wilderness-assessment",
            "altitude-sickness",
        ]
    )

    // MARK: - 9. Emergency Shelter

    static let emergencyShelter = ExploreArticle(
        id: "firstaid-emergency-shelter",
        domain: .firstAid,
        title: "Emergency Shelter",
        summary: "When injury, weather, or darkness forces an unplanned stop in the wilderness, your ability to create effective shelter from available materials determines whether the situation becomes an inconvenience or a fatal exposure emergency.",
        icon: "tent.fill",
        sections: [
            ExploreSection(
                id: "shelter-1",
                heading: "Bivouac Fundamentals",
                body: "An emergency bivouac is any unplanned overnight shelter. The priorities are simple and absolute: protection from wind, protection from moisture, and insulation from the ground. Of these three, ground insulation is the most critical and the most commonly neglected. Conductive heat loss to cold ground can drain body heat faster than any other mechanism. Before building overhead shelter, create a thick layer of ground insulation from any available material: packed vegetation, branches, a foam pad, a rope coiled flat, extra clothing — anything that creates dead air space between your body and the ground. A bivouac bag (essentially a waterproof, breathable sleeping bag cover) is the single most valuable piece of emergency shelter equipment per gram of weight. Combined with an emergency blanket inside for radiant heat reflection, it creates a functional survival shelter that weighs under 300 grams.",
                diagram: nil,
                keyFacts: [
                    "Priority order: ground insulation, wind protection, moisture protection",
                    "Conductive heat loss to the ground exceeds heat loss to the air in most conditions",
                    "A bivouac bag is the highest-value emergency shelter per gram of weight",
                    "Emergency blankets reflect 80-90% of radiant heat but provide zero insulation alone",
                    "Any material that creates dead air space between you and the ground provides insulation",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "shelter-2",
                heading: "Snow Shelters",
                body: "In winter mountain environments, snow is the best building material available. A snow trench is the fastest shelter to construct: dig a body-sized trench 2 feet deep, line the bottom with insulation, and roof it with a tarp, snow blocks, or ski equipment. Construction time: 20-30 minutes with a shovel. A snow cave, excavated into a stable snowbank at least 6 feet deep, provides superior insulation and wind protection but requires 1-3 hours to build and significant energy expenditure. The critical design principle for any snow shelter is that the sleeping platform must be higher than the entrance, because cold air sinks and warm air rises. A cold well at the entrance traps descending cold air below the sleeping level. Ventilation is non-negotiable: a fist-sized hole in the roof prevents carbon dioxide accumulation, and a trekking pole pushed through the roof from inside ensures the vent remains open even if snowfall covers the exterior.",
                diagram: nil,
                keyFacts: [
                    "Snow trench: 20-30 minutes with a shovel, adequate emergency shelter",
                    "Snow cave: 1-3 hours to build, superior insulation and wind protection",
                    "Sleeping platform must be higher than the entrance — cold air sinks",
                    "Ventilation hole is mandatory — CO2 accumulation in sealed snow shelters can be fatal",
                    "Interior temperature stabilizes around 0 degrees C regardless of exterior temperature",
                ],
                warningNote: "Carbon dioxide accumulation in a sealed snow shelter can cause unconsciousness and death. Always maintain at least one ventilation hole. If you wake feeling drowsy or headachy, enlarge the vent immediately. A lit candle serves as a CO2 indicator — if it goes out, ventilation is inadequate."
            ),
            ExploreSection(
                id: "shelter-3",
                heading: "Improvised Insulation and Heat Retention",
                body: "When you lack a sleeping bag or bivouac equipment, improvisation becomes survival. The principle is dead air space: trap as much still air around your body as possible. Stuff dry leaves, grass, pine needles, or crumpled newspaper between clothing layers. Pack the same materials around you inside a shelter. A garbage bag with arm and head holes cut in it becomes a vapor barrier that traps radiant heat. Two garbage bags — one worn and one as a ground layer — significantly reduce heat loss. Huddle with partners: two people sharing body heat in a single emergency blanket lose far less heat than two individuals in separate shelters. Insulate your head and neck — 30-40% of heat loss occurs from the unprotected head. Improvised headwear from a spare shirt, stuff sack, or even packed dry grass held in place with cordage can be the difference between survival and fatal hypothermia.",
                diagram: nil,
                keyFacts: [
                    "Dead air space is insulation — stuff any dry material between clothing layers",
                    "A garbage bag with holes for head and arms is an effective emergency vapor barrier",
                    "Huddle with partners — shared body heat is the most efficient heat source available",
                    "Insulate the head and neck — 30-40% of heat loss occurs from the unprotected head",
                    "Two people in one shelter lose far less heat than two people in separate shelters",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "shelter-4",
                heading: "Signaling from a Shelter Position",
                body: "If you are forced to shelter in place, making yourself visible to rescuers dramatically improves your chances of a timely rescue. Bright-colored equipment (tent fly, emergency blanket, clothing) laid out in an open area near your shelter provides a visual target. The international ground-to-air distress signal is an X or V shape at least 3 meters across, made from contrasting material on the snow or ground. Three of anything — three fires, three whistle blasts, three flashes of a signal mirror — is the universal distress signal. A signal mirror can be seen from over 50 miles on a clear day and is the most effective daytime signaling device available. At night, a headlamp or flashlight visible from the air helps helicopter crews locate your position. If you have cell service, send a text with GPS coordinates — text messages often get through when voice calls fail because they require less signal strength.",
                diagram: nil,
                keyFacts: [
                    "Three of anything (fires, whistle blasts, mirror flashes) = universal distress signal",
                    "Ground-to-air signal: X or V shape at least 3 meters across from contrasting material",
                    "Signal mirrors can be seen from 50+ miles and are the most effective daytime device",
                    "Text messages with GPS coordinates often get through when voice calls cannot",
                    "Lay bright equipment in open areas near your shelter for aerial visibility",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "firstaid-hypothermia",
            "firstaid-evacuation-planning",
            "firstaid-frostbite",
        ],
        relatedModules: [
            "emergency-shelter",
            "hypothermia",
            "evacuation-planning",
        ]
    )

    // MARK: - 10. Evacuation Planning

    static let evacuationPlanning = ExploreArticle(
        id: "firstaid-evacuation-planning",
        domain: .firstAid,
        title: "Evacuation Planning",
        summary: "The decision of how to evacuate a patient from the wilderness — self-evacuation, assisted ground evacuation, or helicopter rescue — depends on the patient's condition, the terrain, the resources available, and the time to definitive care. Getting this decision right is as important as the medical treatment itself.",
        icon: "figure.walk",
        sections: [
            ExploreSection(
                id: "evac-1",
                heading: "The Evacuation Decision",
                body: "Every evacuation decision weighs patient condition against resource availability and risk. The key questions are: Can the patient walk? Is the condition time-sensitive? What resources are available? What are the terrain and weather conditions? A patient with a well-splinted wrist fracture on a moderate trail 3 miles from a trailhead can self-evacuate with assistance. A patient with a potential spinal injury on a technical route in deteriorating weather needs a helicopter. Between these extremes lies a gray zone where judgment matters. The general principle is to use the minimum resources necessary to achieve a safe evacuation. Self-evacuation is fastest and safest when possible. Ground carry is slow, exhausting, and technically demanding but does not depend on weather or aviation availability. Helicopter evacuation is fastest for long distances but is weather-dependent, expensive, and introduces aviation risk to the rescue team.",
                diagram: nil,
                keyFacts: [
                    "Key questions: Can they walk? Is it time-sensitive? What resources exist? What is the terrain?",
                    "Self-evacuation is always preferred when the patient can safely walk out",
                    "Ground carry: 1 mile per hour is a realistic speed for a litter team over rough terrain",
                    "Helicopter evacuation is weather-dependent and introduces risk to rescue crews",
                    "Use the minimum resources necessary for a safe evacuation",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "evac-2",
                heading: "Improvised Litter Construction",
                body: "When a patient cannot walk, an improvised litter becomes necessary. The simplest design uses two rigid poles (trekking poles, branches, tent poles) threaded through jacket sleeves, with the jackets zipped closed around the poles to create a carrying surface. Reinforce with additional clothing or webbing. A more robust litter uses a sleeping pad or pack frame as a platform, secured to two poles with cordage or strap. For steep terrain, the patient must be secured to the litter with webbing or rope to prevent sliding. Every litter carry requires a minimum of 4-6 bearers with frequent rotation — carrying a loaded litter over rough terrain is extraordinarily demanding, and bearer exhaustion is the primary limiting factor. Practice litter building before you need it in an emergency. A group that has never built an improvised litter will waste 30-60 minutes of critical time figuring it out while the patient deteriorates.",
                diagram: nil,
                keyFacts: [
                    "Jacket litter: thread poles through jacket sleeves and zip closed — quickest to build",
                    "Minimum 4-6 bearers with rotation every 10-15 minutes to prevent exhaustion",
                    "Secure the patient to the litter with straps or rope for steep or uneven terrain",
                    "Realistic carry speed: 1 mile per hour on rough terrain",
                    "Practice building a litter before you need one — 30-60 minutes of fumbling wastes critical time",
                ],
                warningNote: nil
            ),
            ExploreSection(
                id: "evac-3",
                heading: "Helicopter Evacuation Protocols",
                body: "Helicopter rescue is a life-saving capability, but it requires specific knowledge and preparation from the ground team. When calling for a helicopter, provide: exact GPS coordinates, number of patients, nature and severity of injuries, current weather at the landing zone, and any hazards (wires, trees, wind). Select a landing zone that is flat, at least 30 meters in diameter, clear of obstacles, and accessible from at least one direction. Mark the center with a bright object and clear loose debris that could become projectiles in rotor wash. When the helicopter approaches, all personnel should be downhill of the landing zone with equipment secured. Never approach the helicopter from the uphill side — the rotor clearance is minimal on the uphill slope. Wait for the crew to signal you before approaching. If a hoist operation is necessary (no landing zone available), the flight crew will manage the operation. Do not grab the hoist cable until it has touched the ground to discharge static electricity.",
                diagram: nil,
                keyFacts: [
                    "Provide GPS coordinates, patient count, injury type, weather, and hazards when calling",
                    "Landing zone: flat, 30m diameter minimum, clear of obstacles, approach from one side",
                    "Never approach a helicopter from the uphill side — rotor clearance is minimal",
                    "Wait for crew signal before approaching. Secure all loose equipment from rotor wash",
                    "Let the hoist cable touch ground before grabbing it — static discharge can injure",
                ],
                warningNote: "Helicopter operations in mountain terrain are inherently dangerous. Poor weather, high altitude (reduced air density), and confined landing zones all increase risk to the flight crew. Do not request helicopter evacuation unless the patient's condition truly requires it. A helicopter crash during a rescue creates a mass casualty event."
            ),
            ExploreSection(
                id: "evac-4",
                heading: "Communication and Documentation",
                body: "Effective communication can cut evacuation time in half. When calling for rescue, use the structured format: Who you are, where you are (GPS coordinates), what happened (mechanism of injury), patient condition (SOAP note), what you need (helicopter, ground team, technical rescue), and any scene hazards. If using a satellite communicator (InReach, SPOT), pre-program emergency contacts and practice sending messages before the trip. Cell phone coverage is unreliable in mountains — if you have signal, send a text with coordinates rather than calling, because texts require less signal strength and can queue for delivery. Write your SOAP note on the patient with a marker (forearm, forehead tape) so the information transfers with them. Include time of injury, mechanism, exam findings, treatments given, vitals with times, and medications administered. This documentation directly impacts the quality of care the patient receives at the hospital.",
                diagram: nil,
                keyFacts: [
                    "Structured rescue call: who, where (GPS), what happened, condition, what you need, hazards",
                    "Text messages get through when voice calls fail — always try texting first",
                    "Write SOAP note on the patient or tape attached to them for handoff",
                    "Satellite communicators (InReach, SPOT) should be pre-programmed before every trip",
                    "Include time of injury, mechanism, findings, treatments, vitals, and meds in documentation",
                ],
                warningNote: nil
            ),
        ],
        relatedArticles: [
            "firstaid-wilderness-patient-assessment",
            "firstaid-fractures-splinting",
            "firstaid-emergency-shelter",
        ],
        relatedModules: [
            "evacuation-planning",
            "wilderness-assessment",
            "fractures-splints",
        ]
    )
}
