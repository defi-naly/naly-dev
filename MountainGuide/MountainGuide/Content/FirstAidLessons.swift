import Foundation

enum FirstAidLessons {

    // MARK: - Wilderness Assessment

    static let wildernessAssessment = Lesson(
        id: "wilderness-assessment",
        domain: .firstAid,
        teachingSteps: [
            TeachingStep(
                id: "wa-1",
                headline: "Scene Safety First",
                body: "Before touching the patient, stop and assess the scene. Are there rockfall hazards, lightning, unstable terrain, or avalanche risk? A rescuer who becomes a second victim doubles the problem and halves the resources. Spend 10 seconds reading the environment before you act.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Mountain accident scene showing environmental hazards to assess before approaching",
                    hotspots: [
                        RevealItem(id: "wa-rock", label: "Rockfall zone", detail: "Check above for loose rock, ice, or cornice. Position yourself uphill if possible.", x: 0.5, y: 0.15),
                        RevealItem(id: "wa-terrain", label: "Unstable ground", detail: "Loose scree, wet slabs, or crevasse-prone glacier. Secure your own footing first.", x: 0.3, y: 0.6),
                        RevealItem(id: "wa-weather", label: "Weather threats", detail: "Approaching storm, dropping temperature, rising wind. Time pressure changes your plan.", x: 0.7, y: 0.2),
                        RevealItem(id: "wa-patient", label: "Patient position", detail: "Note body position, mechanism of injury, and any obvious deformity before moving.", x: 0.5, y: 0.7),
                    ]
                ),
                interactionHint: "Tap each hotspot to learn what to assess",
                revealItems: nil
            ),
            TeachingStep(
                id: "wa-2",
                headline: "Primary Survey: ABCDEs",
                body: "The primary survey is your rapid life-threat check. Airway — is it open? Breathing — is the chest rising? Circulation — is there a pulse, any massive bleeding? Disability — is the patient conscious and responsive? Exposure — what injuries can you see? This takes 60 seconds and tells you whether someone is dying right now.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "airway", label: "A — Airway", value: 0.2, description: "Open? Obstructed? Head-tilt chin-lift if unconscious.", color: "EF4444"),
                        DiagramSegment(id: "breathing", label: "B — Breathing", value: 0.2, description: "Look, listen, feel. Rate, depth, effort. Is the chest rising equally?", color: "F59E0B"),
                        DiagramSegment(id: "circulation", label: "C — Circulation", value: 0.2, description: "Pulse present? Massive hemorrhage? Skin color and temperature.", color: "3B82F6"),
                        DiagramSegment(id: "disability", label: "D — Disability", value: 0.2, description: "AVPU scale: Alert, Voice, Pain, Unresponsive.", color: "8B5CF6"),
                        DiagramSegment(id: "exposure", label: "E — Exposure", value: 0.2, description: "Remove enough clothing to find injuries. Protect from environment.", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "wa-3",
                headline: "Secondary Survey: Head to Toe",
                body: "Once life threats are managed, perform a systematic head-to-toe exam. Start at the skull, palpate the cervical spine, check the chest for crepitus, press the abdomen for rigidity, squeeze the pelvis gently, run your hands down each limb. You are looking for deformity, swelling, tenderness, and instability. Document everything — rescue teams need your findings.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Body assessment diagram showing patient examination points from head to toe",
                    hotspots: [
                        RevealItem(id: "sec-head", label: "Head & C-spine", detail: "Palpate skull for depressions, check pupils, stabilize neck if mechanism suggests spinal injury.", x: 0.5, y: 0.1),
                        RevealItem(id: "sec-chest", label: "Chest", detail: "Feel each rib for crepitus. Watch for asymmetric breathing (pneumothorax). Auscultate if possible.", x: 0.5, y: 0.35),
                        RevealItem(id: "sec-abdomen", label: "Abdomen", detail: "Press all four quadrants gently. Rigidity or guarding suggests internal bleeding.", x: 0.5, y: 0.5),
                        RevealItem(id: "sec-pelvis", label: "Pelvis", detail: "Gentle inward compression ONCE. Instability = life-threatening hemorrhage. Do not repeat.", x: 0.5, y: 0.6),
                        RevealItem(id: "sec-limbs", label: "Extremities", detail: "Check circulation, sensation, and movement distal to any injury. Compare left to right.", x: 0.3, y: 0.8),
                    ]
                ),
                interactionHint: "Tap each body region to learn the exam technique",
                revealItems: nil
            ),
            TeachingStep(
                id: "wa-4",
                headline: "Vital Signs in the Field",
                body: "Take vitals every 15 minutes for stable patients, every 5 minutes for unstable. Pulse rate, respiratory rate, and level of consciousness are the three you can always measure without equipment. A rising pulse with a dropping consciousness level screams internal bleeding. Trending matters more than any single reading.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "critical-low", label: "Critical Low", minValue: 20, maxValue: 40, color: "EF4444", description: "Severe bradycardia — possible spinal shock, hypothermia, or cardiac event"),
                        DiagramZone(id: "low", label: "Below Normal", minValue: 40, maxValue: 60, color: "F59E0B", description: "Low pulse — monitor closely, could indicate athletic baseline or early hypothermia"),
                        DiagramZone(id: "normal", label: "Normal", minValue: 60, maxValue: 100, color: "22C55E", description: "Normal resting heart rate range"),
                        DiagramZone(id: "elevated", label: "Elevated", minValue: 100, maxValue: 130, color: "F59E0B", description: "Tachycardia — pain, anxiety, blood loss, dehydration, or altitude"),
                        DiagramZone(id: "critical-high", label: "Critical High", minValue: 130, maxValue: 180, color: "EF4444", description: "Severe tachycardia — likely significant hemorrhage, severe dehydration, or shock"),
                    ],
                    minValue: 20,
                    maxValue: 180,
                    unit: "bpm",
                    currentValue: 72
                ),
                interactionHint: "Slide to explore heart rate zones",
                revealItems: nil
            ),
            TeachingStep(
                id: "wa-5",
                headline: "SOAP Notes: Document Everything",
                body: "Use the SOAP format to record your assessment. Subjective — what the patient tells you (symptoms, pain, history). Objective — what you find (vitals, exam findings). Assessment — your working diagnosis. Plan — what you are doing and what the evacuation plan is. Write it down. Memory fails under stress, and rescue teams need accurate handover information.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "subjective", name: "S — Subjective", color: "3B82F6", heightRatio: 0.25, description: "Patient's own words: 'My ankle twisted, I heard a pop, pain is 7/10'"),
                        DiagramLayer(id: "objective", name: "O — Objective", color: "22C55E", heightRatio: 0.25, description: "Your findings: swelling lateral ankle, tenderness over fibula, pulse intact, can't bear weight"),
                        DiagramLayer(id: "assessment", name: "A — Assessment", color: "F59E0B", heightRatio: 0.25, description: "Your conclusion: suspected lateral malleolus fracture"),
                        DiagramLayer(id: "plan", name: "P — Plan", color: "8B5CF6", heightRatio: 0.25, description: "Your actions: splinted, elevated, pain management, requesting helicopter evacuation"),
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "wa-q1",
                type: .sequenceOrder,
                prompt: "Put the wilderness patient assessment steps in the correct order:",
                difficulty: .foundation,
                explanation: "Scene safety always comes first — you cannot help anyone if you become a victim. Then primary survey (life threats), secondary survey (detailed exam), then ongoing monitoring with vital signs.",
                correctOrder: ["Scene safety assessment", "Primary survey (ABCDEs)", "Secondary survey (head to toe)", "Vital signs and monitoring"],
                shuffledItems: ["Secondary survey (head to toe)", "Scene safety assessment", "Vital signs and monitoring", "Primary survey (ABCDEs)"]
            ),
            PracticeQuestion(
                id: "wa-q2",
                type: .multipleChoice,
                prompt: "During a primary survey, you find a patient who groans when you pinch their trapezius but does not open their eyes to voice. What is their AVPU level?",
                difficulty: .intermediate,
                explanation: "The AVPU scale: Alert (awake, oriented), Voice (responds to verbal stimulus), Pain (responds only to painful stimulus), Unresponsive (no response). Groaning to pain stimulus = P.",
                options: [
                    PracticeOption(label: "P — responds to Pain", correct: true, explanation: "The patient responds to a pain stimulus (trapezius pinch) but not voice, placing them at 'P' on the AVPU scale."),
                    PracticeOption(label: "V — responds to Voice", correct: false, explanation: "Voice responsiveness means reacting to verbal commands or questions. This patient only responded to pain."),
                    PracticeOption(label: "U — Unresponsive", correct: false, explanation: "Unresponsive means no reaction to any stimulus. This patient groaned to pain."),
                    PracticeOption(label: "A — Alert", correct: false, explanation: "Alert means awake, eyes open, oriented. This patient is clearly not alert."),
                ]
            ),
            PracticeQuestion(
                id: "wa-q3",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Pelvis assessment involves a single gentle compression test. Repeating it can dislodge clots and worsen hemorrhage in an unstable pelvis, which can hold several liters of blood.",
                statement: "If the pelvis feels unstable on your first compression test, you should repeat the test to confirm your finding.",
                isTrue: false,
                reasoning: "Never repeat a positive pelvis compression test. An unstable pelvis can hemorrhage catastrophically. One test is enough — if it feels unstable, treat it as fractured and bind it."
            ),
            PracticeQuestion(
                id: "wa-q4",
                type: .multipleChoice,
                prompt: "You are monitoring a climbing partner after a 5-meter fall. Over 30 minutes, their pulse rises from 80 to 120 while they become increasingly drowsy. What does this trend suggest?",
                difficulty: .advanced,
                explanation: "Rising heart rate with declining consciousness is a classic sign of compensated shock progressing to decompensated shock, most likely from internal hemorrhage after a fall.",
                options: [
                    PracticeOption(label: "Internal bleeding with developing shock", correct: true, explanation: "Tachycardia is the body compensating for blood loss. Declining consciousness means compensation is failing. This is an emergency."),
                    PracticeOption(label: "Normal pain response that will stabilize", correct: false, explanation: "Pain causes elevated heart rate, but it does not cause progressive drowsiness. This trend is ominous."),
                    PracticeOption(label: "Altitude sickness onset", correct: false, explanation: "AMS causes headache and nausea, not progressive tachycardia with declining consciousness after trauma."),
                    PracticeOption(label: "Anxiety and fatigue from the fall", correct: false, explanation: "Anxiety raises heart rate but does not cause progressive decrease in consciousness. This combination suggests hemorrhage."),
                ]
            ),
        ],
        synthesisPrompt: "Wilderness assessment differs from urban first aid because help is hours away, not minutes. How does the remoteness of your environment change which findings are most critical, and how does trending vitals over time become more important than any single measurement?",
        conceptMapNodes: [
            ConceptMapNode(id: "wilderness-assessment", label: "Patient Assessment", domain: .firstAid, x: 0.5, y: 0.2, connections: ["hypothermia", "fractures-splints", "evacuation-planning"]),
            ConceptMapNode(id: "primary-survey", label: "Primary Survey", domain: .firstAid, x: 0.2, y: 0.5, connections: ["wilderness-assessment"]),
            ConceptMapNode(id: "secondary-survey", label: "Secondary Survey", domain: .firstAid, x: 0.8, y: 0.5, connections: ["wilderness-assessment"]),
            ConceptMapNode(id: "vital-signs", label: "Vital Signs", domain: .firstAid, x: 0.5, y: 0.7, connections: ["wilderness-assessment", "hypothermia"]),
        ]
    )

    // MARK: - Hypothermia

    static let hypothermia = Lesson(
        id: "hypothermia",
        domain: .firstAid,
        teachingSteps: [
            TeachingStep(
                id: "hypo-1",
                headline: "The Stages of Cooling",
                body: "Hypothermia is a progressive core temperature drop. Mild (35-32C): shivering, confusion, poor coordination. Moderate (32-28C): shivering stops, severe confusion, paradoxical undressing. Severe (<28C): unconscious, barely perceptible pulse, cardiac instability. The transition from mild to severe can happen faster than you think — especially if the patient is wet.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "severe", label: "Severe", minValue: 24, maxValue: 28, color: "6366F1", description: "Unconscious, no shivering, cardiac arrest risk. Handle with extreme care — rough movement can trigger V-fib."),
                        DiagramZone(id: "moderate", label: "Moderate", minValue: 28, maxValue: 32, color: "3B82F6", description: "Shivering stops, confusion, paradoxical undressing. Cannot rewarm themselves — needs external heat."),
                        DiagramZone(id: "mild", label: "Mild", minValue: 32, maxValue: 35, color: "06B6D4", description: "Shivering, fumbling hands, stumbling. Still generating heat. Insulate and fuel the furnace."),
                        DiagramZone(id: "normal", label: "Normal", minValue: 35, maxValue: 37.5, color: "22C55E", description: "Normal core temperature range. Body thermoregulation working properly."),
                    ],
                    minValue: 24,
                    maxValue: 37.5,
                    unit: "C",
                    currentValue: 35
                ),
                interactionHint: "Slide to explore hypothermia stages",
                revealItems: nil
            ),
            TeachingStep(
                id: "hypo-2",
                headline: "Heat Loss Mechanisms",
                body: "You lose heat four ways: conduction (contact with cold ground — 25x faster if wet), convection (wind stripping your heat layer), radiation (body emitting infrared), and evaporation (sweat or wet clothing stealing heat). Wilderness treatment targets all four: insulate from ground, block wind, cover exposed skin, remove wet layers.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.9, label: "Conduction", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.9, toY: 0.5, label: "Convection", color: "06B6D4"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.1, label: "Radiation", color: "EF4444"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.1, toY: 0.5, label: "Evaporation", color: "8B5CF6"),
                    ],
                    centerLabel: "Body Heat"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "hypo-3",
                headline: "Field Treatment Protocol",
                body: "For mild hypothermia: remove wet clothing, insulate aggressively (sleeping bag, vapor barrier), give warm sweet drinks, add heat to armpits and groin. For moderate to severe: handle gently (rough handling triggers cardiac arrest), insulate horizontally, no food or drink, evacuate urgently. The key rule: below 32C, the patient cannot rewarm themselves. You must add external heat or evacuate.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Mild (32-35C)",
                    rightTitle: "Moderate/Severe (<32C)",
                    leftColor: "06B6D4",
                    rightColor: "6366F1",
                    leftItems: ["Remove wet clothing", "Insulate aggressively", "Warm sweet drinks", "Heat packs to core", "Encourage gentle movement"],
                    rightItems: ["Handle extremely gently", "Keep horizontal", "No food or drink", "Insulate — do not actively rewarm", "Evacuate immediately"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "hypo-4",
                headline: "The Hypothermia Wrap",
                body: "The hypothermia wrap is your primary field tool. Layer 1: vapor barrier (garbage bag or tarp) directly against skin to stop evaporation. Layer 2: insulation (sleeping bags, extra clothing, packs). Layer 3: wind/water barrier (tarp, bivy sack). Insulate from below — the ground steals heat 25 times faster than air. Two sleeping pads under the patient are more important than two sleeping bags on top.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "outer", name: "Outer Shell", color: "22C55E", heightRatio: 0.2, description: "Wind and waterproof barrier — tarp, bivy sack, or emergency blanket"),
                        DiagramLayer(id: "insulation", name: "Insulation Layer", color: "F59E0B", heightRatio: 0.3, description: "Sleeping bags, extra clothing, packs — as much as you have"),
                        DiagramLayer(id: "vapor", name: "Vapor Barrier", color: "3B82F6", heightRatio: 0.15, description: "Plastic bag or tarp against skin — stops evaporative heat loss"),
                        DiagramLayer(id: "ground", name: "Ground Insulation", color: "8B5CF6", heightRatio: 0.35, description: "TWO sleeping pads minimum — ground conduction is the biggest heat thief"),
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "hypo-q1",
                type: .multipleChoice,
                prompt: "Your partner has stopped shivering, is confused, and is trying to remove their jacket in a snowstorm. What stage of hypothermia is this?",
                difficulty: .foundation,
                explanation: "Cessation of shivering with confusion and paradoxical undressing (feeling hot when actually cold) are hallmarks of moderate hypothermia (28-32C). The body has lost its ability to generate heat through shivering.",
                options: [
                    PracticeOption(label: "Moderate hypothermia (28-32C)", correct: true, explanation: "Shivering stops, confusion deepens, and paradoxical undressing occurs as the hypothalamus malfunctions."),
                    PracticeOption(label: "Mild hypothermia (32-35C)", correct: false, explanation: "In mild hypothermia, shivering is still active — that's the body's main heat generation mechanism."),
                    PracticeOption(label: "Severe hypothermia (<28C)", correct: false, explanation: "Severe hypothermia presents with unconsciousness and barely detectable vital signs. This patient is still conscious."),
                    PracticeOption(label: "Normal response to exertion", correct: false, explanation: "Removing clothing in a snowstorm while confused is never normal. This is a medical emergency."),
                ]
            ),
            PracticeQuestion(
                id: "hypo-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Below 32C, the heart becomes extremely irritable. Rough handling, sudden movement, or jostling can trigger ventricular fibrillation, which is almost always fatal in the field without a defibrillator.",
                statement: "A severely hypothermic patient should be sat upright to improve breathing.",
                isTrue: false,
                reasoning: "Severely hypothermic patients must be kept horizontal and handled with extreme gentleness. Sitting upright causes cold peripheral blood to rush to the heart, potentially triggering fatal cardiac arrhythmia (afterdrop)."
            ),
            PracticeQuestion(
                id: "hypo-q3",
                type: .sequenceOrder,
                prompt: "Order the hypothermia wrap layers from closest to the patient outward:",
                difficulty: .foundation,
                explanation: "The wrap works from inside out: ground insulation prevents conductive loss, vapor barrier stops evaporation, insulation traps body heat, and the outer shell blocks wind and rain.",
                correctOrder: ["Ground insulation (sleeping pads)", "Vapor barrier (plastic/tarp against skin)", "Insulation (sleeping bags, clothing)", "Outer wind/water shell (tarp, bivy)"],
                shuffledItems: ["Outer wind/water shell (tarp, bivy)", "Ground insulation (sleeping pads)", "Insulation (sleeping bags, clothing)", "Vapor barrier (plastic/tarp against skin)"]
            ),
            PracticeQuestion(
                id: "hypo-q4",
                type: .multipleChoice,
                prompt: "Which heat loss mechanism is 25 times more effective when the patient is wet?",
                difficulty: .intermediate,
                explanation: "Water conducts heat 25 times faster than air. A patient lying on cold wet ground or wearing soaked clothing loses heat dramatically faster through conduction than a dry patient.",
                options: [
                    PracticeOption(label: "Conduction", correct: true, explanation: "Water is 25x more conductive than air. Wet clothing against skin or contact with wet ground causes rapid heat loss."),
                    PracticeOption(label: "Radiation", correct: false, explanation: "Radiation is infrared heat emission. It is not significantly affected by wetness."),
                    PracticeOption(label: "Convection", correct: false, explanation: "Convection is wind-driven heat loss. While wind chill is dangerous, conduction is the mechanism amplified 25x by water."),
                    PracticeOption(label: "Evaporation", correct: false, explanation: "Evaporation does increase with wetness, but the 25x factor specifically describes conduction through water vs. air."),
                ]
            ),
        ],
        synthesisPrompt: "Hypothermia is the silent killer in mountain environments. How does understanding the four heat loss mechanisms change your approach to prevention — choosing campsites, selecting clothing systems, and managing rest stops in cold conditions?",
        conceptMapNodes: [
            ConceptMapNode(id: "hypothermia", label: "Hypothermia", domain: .firstAid, x: 0.5, y: 0.2, connections: ["wilderness-assessment", "frostbite", "emergency-shelter"]),
            ConceptMapNode(id: "heat-loss", label: "Heat Loss Mechanisms", domain: .firstAid, x: 0.2, y: 0.5, connections: ["hypothermia", "emergency-shelter"]),
            ConceptMapNode(id: "hypo-treatment", label: "Hypothermia Wrap", domain: .firstAid, x: 0.8, y: 0.5, connections: ["hypothermia"]),
        ]
    )

    // MARK: - Altitude Sickness

    static let altitudeSickness = Lesson(
        id: "altitude-sickness",
        domain: .firstAid,
        teachingSteps: [
            TeachingStep(
                id: "alt-1",
                headline: "The Altitude Spectrum",
                body: "Altitude illness is a spectrum: AMS (Acute Mountain Sickness) is the mild end — headache, nausea, fatigue. HACE (High Altitude Cerebral Edema) is the brain swelling — ataxia, confusion, coma. HAPE (High Altitude Pulmonary Edema) is the lung flooding — breathlessness at rest, cough, gurgling. AMS is uncomfortable. HACE and HAPE are fatal without descent.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "hape", name: "HAPE", color: "EF4444", heightRatio: 0.3, description: "High Altitude Pulmonary Edema. Fluid in lungs. Breathless at rest, pink frothy sputum. Fatal without descent."),
                        DiagramLayer(id: "hace", name: "HACE", color: "F59E0B", heightRatio: 0.3, description: "High Altitude Cerebral Edema. Brain swelling. Ataxia (can't walk straight), confusion, coma. Fatal within 24hrs without descent."),
                        DiagramLayer(id: "ams", name: "AMS", color: "3B82F6", heightRatio: 0.4, description: "Acute Mountain Sickness. Headache + nausea/fatigue/dizziness. Uncomfortable but not immediately dangerous."),
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "alt-2",
                headline: "Recognizing AMS vs. HACE",
                body: "The critical test is the heel-to-toe walk. Ask the patient to walk a straight line placing heel to toe. If they stumble, stagger, or cannot do it, they have ataxia — the hallmark of HACE. AMS patients can walk the line. HACE patients cannot. This single test separates 'take an aspirin and rest' from 'descend immediately or die.'",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "AMS (Mild)",
                    rightTitle: "HACE (Severe)",
                    leftColor: "3B82F6",
                    rightColor: "EF4444",
                    leftItems: ["Headache + one other symptom", "Can walk heel-to-toe", "Oriented to person/place/time", "Can care for self", "Rest at same altitude or descend 500m"],
                    rightItems: ["Severe headache, vomiting", "Cannot walk heel-to-toe (ataxia)", "Confused, disoriented", "Cannot care for self", "Descend IMMEDIATELY — minimum 1000m"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "alt-3",
                headline: "HAPE: The Lung Emergency",
                body: "HAPE can develop independently of AMS — a climber can go from feeling fine to drowning in their own fluid within hours. Early signs: disproportionate breathlessness on exertion, dry cough, fatigue beyond what's expected. Late signs: breathless at rest, gurgling breath sounds, pink frothy sputum, cyanosis. Treatment is descent, descent, descent. Supplemental oxygen and nifedipine buy time but do not replace losing altitude.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "normal-alt", label: "Normal SpO2", minValue: 90, maxValue: 100, color: "22C55E", description: "Adequate oxygen saturation at altitude. Monitor but no intervention needed."),
                        DiagramZone(id: "mild-drop", label: "Mild Reduction", minValue: 80, maxValue: 90, color: "F59E0B", description: "Expected at high altitude. If symptomatic with cough or breathlessness, suspect early HAPE."),
                        DiagramZone(id: "concerning", label: "Concerning", minValue: 70, maxValue: 80, color: "EF4444", description: "Significantly low. Likely HAPE if accompanied by breathlessness at rest. Begin descent."),
                        DiagramZone(id: "critical-spo2", label: "Critical", minValue: 50, maxValue: 70, color: "6366F1", description: "Life-threatening. Advanced HAPE. Immediate descent, oxygen, and emergency evacuation."),
                    ],
                    minValue: 50,
                    maxValue: 100,
                    unit: "% SpO2",
                    currentValue: 92
                ),
                interactionHint: "Slide to explore oxygen saturation levels at altitude",
                revealItems: nil
            ),
            TeachingStep(
                id: "alt-4",
                headline: "The Golden Rules of Altitude",
                body: "Prevention beats treatment every time. Above 3000m, ascend no more than 300-500m per sleeping altitude per day. Climb high, sleep low. If you develop symptoms, do not ascend further. If symptoms worsen, descend. Never leave a symptomatic person alone — HACE causes confusion that prevents self-rescue. Acetazolamide (Diamox) accelerates acclimatization but does not prevent HAPE.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "rule-1", label: "Ascend slowly", value: 0.25, description: "Max 300-500m gain in sleeping altitude per day above 3000m", color: "22C55E"),
                        DiagramSegment(id: "rule-2", label: "Climb high, sleep low", value: 0.25, description: "You can climb higher during the day, but return to lower camp to sleep", color: "3B82F6"),
                        DiagramSegment(id: "rule-3", label: "Never ascend with symptoms", value: 0.25, description: "If you have AMS, stay at current altitude until symptoms resolve. Do not push higher.", color: "F59E0B"),
                        DiagramSegment(id: "rule-4", label: "Descend if worsening", value: 0.25, description: "If symptoms worsen despite rest, descend immediately. Descent is the definitive treatment.", color: "EF4444"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "alt-q1",
                type: .multipleChoice,
                prompt: "At 4200m, your teammate has a headache and nausea. You ask them to walk heel-to-toe and they stagger badly. What is the most likely diagnosis?",
                difficulty: .intermediate,
                explanation: "Ataxia (inability to walk heel-to-toe) is the defining feature that separates HACE from AMS. AMS causes headache and nausea but does not affect coordination.",
                options: [
                    PracticeOption(label: "HACE — the ataxia indicates cerebral edema", correct: true, explanation: "Ataxia is the key diagnostic finding. Headache + nausea + ataxia = HACE until proven otherwise. Descend immediately."),
                    PracticeOption(label: "Severe AMS — rest for 24 hours and reassess", correct: false, explanation: "Ataxia upgrades the diagnosis from AMS to HACE. Resting at altitude with HACE can be fatal."),
                    PracticeOption(label: "Dehydration causing dizziness", correct: false, explanation: "Dehydration causes lightheadedness, not true ataxia. The heel-to-toe test distinguishes the two."),
                    PracticeOption(label: "Fatigue from the climb", correct: false, explanation: "Fatigue causes weakness, not loss of coordination. Ataxia after ascent is HACE."),
                ]
            ),
            PracticeQuestion(
                id: "alt-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "HAPE can develop without any preceding AMS symptoms. Some climbers go from feeling completely well to severe pulmonary edema within hours, especially on rapid ascents or re-ascent after time at low altitude.",
                statement: "HAPE always develops as a progression from AMS — you will always have headache and nausea before lung symptoms appear.",
                isTrue: false,
                reasoning: "HAPE can develop independently of AMS, without any preceding headache or nausea. A climber can feel fine and develop HAPE overnight, especially during rapid ascent."
            ),
            PracticeQuestion(
                id: "alt-q3",
                type: .sequenceOrder,
                prompt: "Order the altitude illness progression from mildest to most severe:",
                difficulty: .foundation,
                explanation: "Altitude illness typically progresses from mild AMS symptoms through worsening AMS, then can diverge into HACE (brain) or HAPE (lungs), both of which are life-threatening emergencies requiring immediate descent.",
                correctOrder: ["Mild AMS — headache, mild nausea", "Moderate AMS — persistent headache, vomiting, fatigue", "HACE — ataxia, confusion, altered consciousness", "HACE/HAPE — coma, respiratory failure, death"],
                shuffledItems: ["HACE — ataxia, confusion, altered consciousness", "Mild AMS — headache, mild nausea", "HACE/HAPE — coma, respiratory failure, death", "Moderate AMS — persistent headache, vomiting, fatigue"]
            ),
            PracticeQuestion(
                id: "alt-q4",
                type: .multipleChoice,
                prompt: "What is the maximum recommended gain in sleeping altitude per day above 3000m?",
                difficulty: .foundation,
                explanation: "The standard acclimatization guideline is 300-500m gain in sleeping altitude per day above 3000m, with a rest day every 1000m of gain. You can climb higher during the day as long as you return to sleep low.",
                options: [
                    PracticeOption(label: "300-500 meters", correct: true, explanation: "This allows the body time to acclimatize. Faster ascent significantly increases the risk of altitude illness."),
                    PracticeOption(label: "1000 meters", correct: false, explanation: "1000m per day is too aggressive above 3000m and substantially increases AMS, HACE, and HAPE risk."),
                    PracticeOption(label: "100 meters", correct: false, explanation: "This is overly conservative. While safer, it would make most high-altitude objectives impractical."),
                    PracticeOption(label: "There is no recommended limit", correct: false, explanation: "Altitude medicine has well-established guidelines. Ignoring ascent rate is the primary cause of altitude illness."),
                ]
            ),
        ],
        synthesisPrompt: "Altitude illness is uniquely dangerous because it impairs the judgment needed to recognize it. How does this create a feedback loop, and what systems can a climbing team put in place to catch deterioration that the affected person cannot see in themselves?",
        conceptMapNodes: [
            ConceptMapNode(id: "altitude-sickness", label: "Altitude Sickness", domain: .firstAid, x: 0.5, y: 0.2, connections: ["wilderness-assessment", "evacuation-planning"]),
            ConceptMapNode(id: "ams-hace", label: "AMS / HACE", domain: .firstAid, x: 0.2, y: 0.5, connections: ["altitude-sickness"]),
            ConceptMapNode(id: "hape", label: "HAPE", domain: .firstAid, x: 0.8, y: 0.5, connections: ["altitude-sickness"]),
            ConceptMapNode(id: "acclimatization", label: "Acclimatization", domain: .firstAid, x: 0.5, y: 0.7, connections: ["altitude-sickness"]),
        ]
    )

    // MARK: - Fractures & Splints

    static let fracturesSplints = Lesson(
        id: "fractures-splints",
        domain: .firstAid,
        teachingSteps: [
            TeachingStep(
                id: "frac-1",
                headline: "Identifying Fractures in the Field",
                body: "Without X-rays, you diagnose fractures clinically. The signs: deformity (angulation, shortening, rotation), swelling, point tenderness over bone, crepitus (grinding sensation), loss of function, and abnormal movement. If in doubt, splint it. Treating a sprain as a fracture wastes nothing. Missing a fracture can cost a limb.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Limb examination showing clinical signs of fracture visible in the field",
                    hotspots: [
                        RevealItem(id: "frac-deformity", label: "Deformity", detail: "Angulation, shortening, or rotation compared to the uninjured side. Most reliable sign.", x: 0.5, y: 0.4),
                        RevealItem(id: "frac-swelling", label: "Swelling", detail: "Rapid swelling after injury suggests bleeding from bone. Compare both sides.", x: 0.3, y: 0.5),
                        RevealItem(id: "frac-tender", label: "Point tenderness", detail: "Pain precisely over bone (not muscle or ligament). Run your finger along the bone.", x: 0.7, y: 0.5),
                        RevealItem(id: "frac-distal", label: "Distal circulation", detail: "Always check pulse, sensation, and movement below the injury. Absent pulse = emergency.", x: 0.5, y: 0.75),
                    ]
                ),
                interactionHint: "Tap each sign to learn the assessment technique",
                revealItems: nil
            ),
            TeachingStep(
                id: "frac-2",
                headline: "Splinting Principles",
                body: "A good splint immobilizes the joint above and below the fracture. It should be firm but not tight — you must be able to slide a finger underneath. Pad bony prominences to prevent pressure sores. Check circulation below the splint every 15 minutes. If fingers or toes go numb, white, or cold, the splint is too tight — loosen immediately.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.15, toX: 0.5, toY: 0.3, label: "Joint above", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.7, toX: 0.5, toY: 0.85, label: "Joint below", color: "3B82F6"),
                        DiagramArrow(fromX: 0.2, fromY: 0.5, toX: 0.4, toY: 0.5, label: "Padding", color: "22C55E"),
                        DiagramArrow(fromX: 0.8, fromY: 0.5, toX: 0.6, toY: 0.5, label: "Rigid support", color: "F59E0B"),
                    ],
                    centerLabel: "Fracture Site"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "frac-3",
                headline: "Improvised Splint Materials",
                body: "In the wilderness, you splint with what you have. Trekking poles, tent poles, ice axes, foam sleeping pads (roll into a C-shape), sticks, or even a well-stuffed stuff sack. SAM splints weigh 100 grams and mold to any fracture — they should be in every mountain first aid kit. Secure with tape, bandages, torn clothing, or webbing. The best splint is the one you build with available materials.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Dedicated Gear",
                    rightTitle: "Improvised Materials",
                    leftColor: "22C55E",
                    rightColor: "F59E0B",
                    leftItems: ["SAM splint (moldable aluminum)", "Triangle bandage (sling)", "Elastic bandage (wrap)", "Medical tape"],
                    rightItems: ["Trekking poles / tent poles", "Foam sleeping pad (rolled)", "Ice axe shaft", "Torn clothing / webbing"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "frac-4",
                headline: "When to Realign",
                body: "Most fractures are splinted in the position found. But if there is no distal pulse (no blood flow below the break), you must attempt gentle realignment to restore circulation. Apply steady longitudinal traction along the axis of the limb until the pulse returns or the bone approximates normal alignment. This is painful for the patient — explain what you are doing and why. A fracture without blood flow becomes an amputation within hours.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.3, toX: 0.5, toY: 0.15, label: "Proximal hold", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.7, toX: 0.5, toY: 0.85, label: "Traction pull", color: "EF4444"),
                    ],
                    centerLabel: "Fracture — No Pulse"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "frac-q1",
                type: .multipleChoice,
                prompt: "You splint a forearm fracture. Twenty minutes later, the patient reports numbness and tingling in their fingers, which are pale and cool. What should you do?",
                difficulty: .foundation,
                explanation: "Numbness, pallor, and coolness distal to a splint indicate compromised circulation. The splint is too tight and must be loosened immediately to restore blood flow.",
                options: [
                    PracticeOption(label: "Loosen the splint immediately and reassess circulation", correct: true, explanation: "These are signs of vascular compromise. Loosen, check for return of color and sensation, then re-secure more loosely."),
                    PracticeOption(label: "Elevate the arm higher and wait 10 minutes", correct: false, explanation: "Elevation alone won't fix a splint that's cutting off circulation. You must loosen it."),
                    PracticeOption(label: "Remove the splint entirely and apply ice", correct: false, explanation: "The fracture still needs immobilization. Loosen and readjust — don't remove entirely."),
                    PracticeOption(label: "This is normal after splinting and will resolve", correct: false, explanation: "Loss of circulation is never normal. Ignoring it risks permanent nerve damage or tissue death."),
                ]
            ),
            PracticeQuestion(
                id: "frac-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "The rule of splinting is to immobilize the joint above AND the joint below the fracture. A mid-forearm fracture requires immobilization of both the wrist and the elbow to prevent rotation and movement at the fracture site.",
                statement: "A fracture of the mid-forearm only needs the wrist immobilized — the elbow can remain free.",
                isTrue: false,
                reasoning: "Both the wrist AND elbow must be immobilized. A splint that only covers the wrist allows rotation through the forearm bones at the fracture site, causing further damage."
            ),
            PracticeQuestion(
                id: "frac-q3",
                type: .multipleChoice,
                prompt: "A climber has a deformed lower leg fracture with no detectable pulse in the foot. After 30 minutes without pulse return, what is the most critical action?",
                difficulty: .advanced,
                explanation: "A fracture without distal pulse means the blood supply is compromised, likely by the displaced bone fragments compressing or kinking the artery. Gentle realignment under traction may restore circulation.",
                options: [
                    PracticeOption(label: "Attempt gentle longitudinal traction to restore alignment and pulse", correct: true, explanation: "No pulse = no blood flow. Without realignment, the limb faces ischemia. Steady traction along the limb axis may restore circulation."),
                    PracticeOption(label: "Splint in current position and evacuate urgently", correct: false, explanation: "Splinting without pulse means the limb continues without blood flow. You must try to restore circulation before splinting."),
                    PracticeOption(label: "Apply a tourniquet above the fracture", correct: false, explanation: "A tourniquet stops blood flow intentionally — this limb already has no flow. A tourniquet would make it worse."),
                    PracticeOption(label: "Massage the foot to restore circulation", correct: false, explanation: "The blockage is at the fracture site, not in the foot. Massaging distally does nothing when the artery is kinked proximally."),
                ]
            ),
            PracticeQuestion(
                id: "frac-q4",
                type: .sequenceOrder,
                prompt: "Put the fracture management steps in the correct order:",
                difficulty: .foundation,
                explanation: "First assess the injury and check distal circulation, then splint appropriately (immobilizing joints above and below), manage pain, and continuously monitor for circulatory changes.",
                correctOrder: ["Assess the injury and check distal pulse", "Apply traction if no pulse detected", "Splint immobilizing joints above and below", "Recheck distal circulation every 15 minutes"],
                shuffledItems: ["Splint immobilizing joints above and below", "Assess the injury and check distal pulse", "Recheck distal circulation every 15 minutes", "Apply traction if no pulse detected"]
            ),
        ],
        synthesisPrompt: "Fracture management in the wilderness is about preserving circulation and function until definitive care. How does the remoteness of the mountain environment change your threshold for attempting realignment, and what trade-offs do you accept when improvising with non-medical materials?",
        conceptMapNodes: [
            ConceptMapNode(id: "fractures-splints", label: "Fractures & Splints", domain: .firstAid, x: 0.5, y: 0.2, connections: ["wilderness-assessment", "evacuation-planning"]),
            ConceptMapNode(id: "splinting", label: "Splinting Principles", domain: .firstAid, x: 0.2, y: 0.5, connections: ["fractures-splints"]),
            ConceptMapNode(id: "circulation-check", label: "Circulation Monitoring", domain: .firstAid, x: 0.8, y: 0.5, connections: ["fractures-splints", "wilderness-assessment"]),
        ]
    )

    // MARK: - Wound Care

    static let woundCare = Lesson(
        id: "wound-care",
        domain: .firstAid,
        teachingSteps: [
            TeachingStep(
                id: "wound-1",
                headline: "Controlling Hemorrhage",
                body: "Bleeding kills faster than anything else you will treat in the mountains. Direct pressure with a clean dressing is first line — hold firm for 10 minutes without peeking. If blood soaks through, add more dressings on top. Elevation helps for extremity wounds. Tourniquets are last resort for life-threatening limb hemorrhage — apply 5cm above the wound, tighten until bleeding stops, note the time.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "pressure", label: "Direct Pressure", value: 0.3, description: "Firm pressure with clean dressing for 10 minutes. Do not remove to check — add dressings on top.", color: "EF4444"),
                        DiagramSegment(id: "elevate", label: "Elevate", value: 0.2, description: "Raise the wound above heart level if possible to reduce arterial pressure at the site.", color: "F59E0B"),
                        DiagramSegment(id: "pack", label: "Wound Packing", value: 0.25, description: "For deep wounds that won't close, pack gauze tightly into the wound cavity and hold pressure.", color: "3B82F6"),
                        DiagramSegment(id: "tourniquet", label: "Tourniquet", value: 0.25, description: "Last resort for life-threatening limb bleeding. 5cm above wound, tighten until bleeding stops, note time.", color: "8B5CF6"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "wound-2",
                headline: "Wound Irrigation",
                body: "Infection is the enemy of wilderness wound care. Once bleeding is controlled, irrigate the wound with the cleanest water available — pressurized irrigation is best. Use a syringe or a plastic bag with a pinhole to create a jet. You need volume and pressure: at least 500ml for a small wound, 1-2 liters for a large one. Clean water under pressure is more effective than iodine solution without pressure.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.2, fromY: 0.3, toX: 0.5, toY: 0.5, label: "Pressure irrigation", color: "3B82F6"),
                        DiagramArrow(fromX: 0.6, fromY: 0.5, toX: 0.9, toY: 0.7, label: "Debris out", color: "F59E0B"),
                    ],
                    centerLabel: "Wound"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "wound-3",
                headline: "Closure Decisions",
                body: "In the wilderness, most wounds should be left open. Closing a contaminated wound traps bacteria inside and guarantees infection. Exceptions: clean facial wounds (cosmetic concern) and scalp wounds (bleed heavily). Use wound closure strips or butterfly bandages — never suture in the field without training. Cover open wounds with moist dressing and change daily.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Close in the Field",
                    rightTitle: "Leave Open",
                    leftColor: "22C55E",
                    rightColor: "EF4444",
                    leftItems: ["Clean facial lacerations", "Scalp wounds (heavy bleeding)", "Clean wounds <6 hours old", "Wound closure strips only"],
                    rightItems: ["Contaminated wounds (dirt, debris)", "Animal bites", "Puncture wounds", "Wounds >6 hours old"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "wound-4",
                headline: "Infection Watch",
                body: "In the wilderness, wound infection is a race against time. Signs appear in 24-72 hours: increasing redness spreading from the wound, warmth, swelling, pus, red streaking toward the heart (lymphangitis — a true emergency), fever, and increasing pain. If you carry antibiotics, start them at the first sign of infection. Red streaking means the infection is spreading systemically — evacuate urgently.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Wound showing progressive signs of infection from mild to severe",
                    hotspots: [
                        RevealItem(id: "inf-redness", label: "Spreading redness", detail: "Erythema expanding beyond wound edges. Mark the border with pen and check hourly.", x: 0.5, y: 0.4),
                        RevealItem(id: "inf-pus", label: "Purulent drainage", detail: "Yellow-green discharge indicates bacterial colonization. Irrigate and start antibiotics.", x: 0.3, y: 0.5),
                        RevealItem(id: "inf-streak", label: "Red streaking", detail: "Lines tracking toward the heart = lymphangitis. Systemic infection. Evacuate NOW.", x: 0.7, y: 0.3),
                        RevealItem(id: "inf-fever", label: "Systemic signs", detail: "Fever, chills, malaise indicate the infection has entered the bloodstream. Urgent evacuation.", x: 0.5, y: 0.7),
                    ]
                ),
                interactionHint: "Tap each sign to understand the infection progression",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "wound-q1",
                type: .multipleChoice,
                prompt: "A climber has a deep laceration on their forearm that is bleeding heavily through the first dressing. What should you do?",
                difficulty: .foundation,
                explanation: "When the first dressing soaks through, never remove it — removing it disrupts any clot formation. Add more dressings on top and maintain firm pressure.",
                options: [
                    PracticeOption(label: "Add more dressings on top of the soaked ones and maintain pressure", correct: true, explanation: "Removing the soaked dressing would disrupt clot formation. Stack additional dressings and press firmly."),
                    PracticeOption(label: "Remove the soaked dressing and apply a fresh one", correct: false, explanation: "Removing the dressing tears away any clot that has started forming, restarting the bleeding cycle."),
                    PracticeOption(label: "Immediately apply a tourniquet", correct: false, explanation: "Tourniquet is last resort. Direct pressure with additional dressings should be tried first."),
                    PracticeOption(label: "Irrigate the wound to clear the blood", correct: false, explanation: "Irrigation is for cleaning after bleeding is controlled. Irrigating an actively bleeding wound makes bleeding worse."),
                ]
            ),
            PracticeQuestion(
                id: "wound-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Wilderness medicine research shows that clean drinkable water delivered under pressure is more effective at preventing wound infection than antiseptic solutions applied without pressure. The mechanical flushing action is what removes bacteria and debris.",
                statement: "Iodine solution poured over a wound is more effective at preventing infection than clean water irrigated under pressure.",
                isTrue: false,
                reasoning: "Pressure irrigation with clean water physically removes bacteria and debris. Iodine without pressure leaves contaminants in the wound. Volume and pressure matter more than what solution you use."
            ),
            PracticeQuestion(
                id: "wound-q3",
                type: .multipleChoice,
                prompt: "48 hours after a fall, a hiker's knee wound shows increasing redness with red lines tracking up the thigh. What does this indicate?",
                difficulty: .intermediate,
                explanation: "Red streaking (lymphangitis) tracking toward the heart indicates the infection has entered the lymphatic system and is spreading systemically. This is a pre-sepsis emergency.",
                options: [
                    PracticeOption(label: "Lymphangitis — systemic infection spreading. Evacuate urgently.", correct: true, explanation: "Red streaking toward the heart means bacteria are spreading through the lymphatic system. This can progress to sepsis."),
                    PracticeOption(label: "Normal healing inflammation — monitor for another day", correct: false, explanation: "Red streaking is never normal healing. It indicates dangerous systemic infection requiring urgent treatment."),
                    PracticeOption(label: "Allergic reaction to the bandage material", correct: false, explanation: "Allergic reactions cause diffuse redness and itching, not linear red streaks tracking toward the heart."),
                    PracticeOption(label: "Bruising from the original injury surfacing", correct: false, explanation: "Bruising appears as purple-blue discoloration, not red linear streaks. This is infection."),
                ]
            ),
            PracticeQuestion(
                id: "wound-q4",
                type: .sequenceOrder,
                prompt: "Order the wound management steps correctly:",
                difficulty: .foundation,
                explanation: "Control bleeding first (immediate threat), then irrigate once hemostasis is achieved, decide on closure, and finally dress and monitor for infection over the following days.",
                correctOrder: ["Control bleeding with direct pressure", "Irrigate with clean pressurized water", "Decide whether to close or leave open", "Dress and monitor for infection signs"],
                shuffledItems: ["Irrigate with clean pressurized water", "Dress and monitor for infection signs", "Control bleeding with direct pressure", "Decide whether to close or leave open"]
            ),
        ],
        synthesisPrompt: "Wound care in the wilderness balances two competing priorities: stopping bleeding (which requires pressure and closure) and preventing infection (which requires irrigation and often leaving wounds open). How do you navigate this tension when you are days from a hospital?",
        conceptMapNodes: [
            ConceptMapNode(id: "wound-care", label: "Wound Care", domain: .firstAid, x: 0.5, y: 0.2, connections: ["wilderness-assessment", "evacuation-planning"]),
            ConceptMapNode(id: "hemorrhage", label: "Hemorrhage Control", domain: .firstAid, x: 0.2, y: 0.5, connections: ["wound-care"]),
            ConceptMapNode(id: "infection-mgmt", label: "Infection Prevention", domain: .firstAid, x: 0.8, y: 0.5, connections: ["wound-care"]),
        ]
    )

    // MARK: - Lightning Injuries

    static let lightningInjuries = Lesson(
        id: "lightning-injuries",
        domain: .firstAid,
        teachingSteps: [
            TeachingStep(
                id: "light-1",
                headline: "How Lightning Injures",
                body: "Lightning delivers up to 300 million volts in 3 milliseconds. Unlike household electrocution, most current flows over the body surface (flashover). The primary killer is cardiac arrest — the electrical discharge disrupts the heart's rhythm. Secondary injuries include burns (entry/exit points and along wet skin), blast injuries from the shockwave, and neurological damage. Contrary to myth, lightning victims do NOT carry a charge — they are safe to touch immediately.",
                diagramType: .forceArrows,
                diagramConfig: DiagramConfig(
                    arrows: [
                        DiagramArrow(fromX: 0.5, fromY: 0.1, toX: 0.5, toY: 0.35, label: "Strike", color: "F59E0B"),
                        DiagramArrow(fromX: 0.35, fromY: 0.4, toX: 0.2, toY: 0.6, label: "Flashover", color: "3B82F6"),
                        DiagramArrow(fromX: 0.65, fromY: 0.4, toX: 0.8, toY: 0.6, label: "Flashover", color: "3B82F6"),
                        DiagramArrow(fromX: 0.5, fromY: 0.5, toX: 0.5, toY: 0.7, label: "Ground current", color: "EF4444"),
                    ],
                    centerLabel: "Body"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "light-2",
                headline: "Reverse Triage: The Dead First",
                body: "Lightning mass casualty events flip normal triage on its head. In standard triage, you skip the pulseless and treat the breathing. With lightning, reverse it. Cardiac arrest victims have the best chance of survival IF you start CPR immediately — the heart often restarts spontaneously. Those who are breathing will likely survive without intervention. Prioritize the apparently dead.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Standard Triage",
                    rightTitle: "Lightning Triage",
                    leftColor: "EF4444",
                    rightColor: "F59E0B",
                    leftItems: ["Skip pulseless patients", "Treat breathing victims first", "Focus on salvageable injuries", "Dead are lowest priority"],
                    rightItems: ["Treat pulseless patients FIRST", "Breathing victims can wait", "CPR can restart the heart", "Apparently dead have best prognosis"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "light-3",
                headline: "Field Treatment",
                body: "For cardiac arrest: immediate CPR. Lightning-induced cardiac arrest has a much higher survival rate than other causes if CPR is started quickly — the heart often has a viable rhythm that just needs support. For conscious patients: assess for burns (check entry/exit points, along wet clothing lines), evaluate neurological status (confusion, paralysis, vision/hearing loss), and treat for shock. All lightning strike patients need hospital evaluation, even if initially asymptomatic.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Lightning strike patient showing common injury patterns and assessment points",
                    hotspots: [
                        RevealItem(id: "light-head", label: "Neurological", detail: "Confusion, amnesia, temporary paralysis, ruptured eardrums. Assess pupils and orientation.", x: 0.5, y: 0.15),
                        RevealItem(id: "light-heart", label: "Cardiac", detail: "Arrhythmia or arrest. Check pulse immediately. Begin CPR if absent — high chance of successful resuscitation.", x: 0.5, y: 0.4),
                        RevealItem(id: "light-burns", label: "Skin burns", detail: "Lichtenberg figures (fern-like pattern), entry/exit burns, flash burns along wet skin or metal (zippers, chains).", x: 0.3, y: 0.55),
                        RevealItem(id: "light-blast", label: "Blast injuries", detail: "Shockwave can rupture eardrums, throw patients, cause blunt trauma. Check for secondary injuries from falls.", x: 0.7, y: 0.55),
                    ]
                ),
                interactionHint: "Tap each injury type to learn assessment priorities",
                revealItems: nil
            ),
            TeachingStep(
                id: "light-4",
                headline: "Prevention in the Mountains",
                body: "The 30-30 rule: if time between flash and thunder is less than 30 seconds, seek shelter. Wait 30 minutes after the last flash before resuming. Avoid ridgelines, isolated trees, metal structures, and water. In open terrain with no shelter, assume the lightning position: crouch on the balls of your feet, feet together, arms wrapped around knees, head down. Spread your group 15 meters apart to avoid multiple casualties from a single strike.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "avoid", label: "AVOID", description: "Ridgelines, summits, isolated trees, metal, water, cave entrances", color: "EF4444"),
                        DiagramVertex(id: "seek", label: "SEEK", description: "Dense forest of uniform height, low ground, substantial buildings", color: "22C55E"),
                        DiagramVertex(id: "position", label: "POSITION", description: "Crouch low, feet together, on insulation. Spread group 15m apart.", color: "3B82F6"),
                    ],
                    centerLabel: "LIGHTNING SAFETY",
                    centerDescription: "30-30 rule: shelter when flash-to-thunder <30s, wait 30min after last flash"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "light-q1",
                type: .multipleChoice,
                prompt: "Lightning strikes a group of four hikers on a ridge. Two are unconscious and pulseless, two are sitting up and groaning. Who do you treat first?",
                difficulty: .intermediate,
                explanation: "Lightning triage reverses the normal protocol. Pulseless victims from lightning strikes have a high chance of resuscitation with immediate CPR because the heart often has a viable rhythm. Breathing victims will likely survive.",
                options: [
                    PracticeOption(label: "The two pulseless patients — begin CPR immediately", correct: true, explanation: "Lightning reverses triage. Cardiac arrest from lightning has excellent survival with early CPR. The breathing patients can wait."),
                    PracticeOption(label: "The two conscious patients — they have the best chance", correct: false, explanation: "Standard triage logic doesn't apply to lightning. The conscious patients are likely to survive. Focus on the pulseless."),
                    PracticeOption(label: "Move everyone off the ridge first, then assess", correct: false, explanation: "While getting off the ridge is important, cardiac arrest patients need CPR within minutes. Start CPR, delegate movement."),
                    PracticeOption(label: "Check all four for burns before deciding", correct: false, explanation: "Burns are secondary. Cardiac arrest kills in minutes. CPR for the pulseless is the immediate priority."),
                ]
            ),
            PracticeQuestion(
                id: "light-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Lightning victims are safe to touch immediately. The electrical discharge lasts milliseconds and does not leave a residual charge. This is a dangerous myth that delays lifesaving CPR.",
                statement: "You should wait before touching a lightning strike victim because they may still carry an electrical charge.",
                isTrue: false,
                reasoning: "Lightning victims carry no residual charge. The strike lasts 3 milliseconds. Touch them immediately, check for pulse, begin CPR if needed. Delay costs lives."
            ),
            PracticeQuestion(
                id: "light-q3",
                type: .multipleChoice,
                prompt: "You hear thunder 10 seconds after seeing lightning while on an exposed ridge at 3500m. What is the approximate distance to the lightning?",
                difficulty: .foundation,
                explanation: "Sound travels approximately 340 meters per second. At 10 seconds, the lightning is roughly 3.4km away. Using the rough rule of 5 seconds per mile, this is about 2 miles. The 30-30 rule says you should already be in shelter.",
                options: [
                    PracticeOption(label: "Approximately 3.4 kilometers (2 miles)", correct: true, explanation: "Sound travels ~340m/s. 10 seconds x 340m = 3,400m. This is dangerously close — you should already be sheltered."),
                    PracticeOption(label: "Approximately 10 kilometers", correct: false, explanation: "This would require sound to travel at 1km/s, which is about 3x too fast."),
                    PracticeOption(label: "Approximately 1 kilometer", correct: false, explanation: "Sound would cover 1km in about 3 seconds, not 10."),
                    PracticeOption(label: "Approximately 30 kilometers", correct: false, explanation: "Thunder is rarely audible beyond 15-20km. At 30km the flash-to-thunder delay would be ~90 seconds."),
                ]
            ),
            PracticeQuestion(
                id: "light-q4",
                type: .sequenceOrder,
                prompt: "Order the lightning safety actions from most to least important:",
                difficulty: .intermediate,
                explanation: "Prevention is always better than treatment. Descending from exposed terrain before the storm is ideal. If caught, position and spacing minimize casualties. CPR readiness is the critical treatment skill.",
                correctOrder: ["Descend from ridges and summits before storm arrives", "Spread group members 15 meters apart", "Assume lightning position if no shelter available", "Be prepared to perform immediate CPR if anyone is struck"],
                shuffledItems: ["Be prepared to perform immediate CPR if anyone is struck", "Descend from ridges and summits before storm arrives", "Assume lightning position if no shelter available", "Spread group members 15 meters apart"]
            ),
        ],
        synthesisPrompt: "Lightning injuries are unique in emergency medicine — the standard rules of triage are reversed. How does understanding the mechanism of lightning injury (brief massive current vs. sustained electrocution) explain why cardiac arrest victims have such surprisingly good outcomes with immediate CPR?",
        conceptMapNodes: [
            ConceptMapNode(id: "lightning-injuries", label: "Lightning Injuries", domain: .firstAid, x: 0.5, y: 0.2, connections: ["wilderness-assessment", "evacuation-planning"]),
            ConceptMapNode(id: "reverse-triage", label: "Reverse Triage", domain: .firstAid, x: 0.2, y: 0.5, connections: ["lightning-injuries"]),
            ConceptMapNode(id: "lightning-prevention", label: "Prevention", domain: .firstAid, x: 0.8, y: 0.5, connections: ["lightning-injuries"]),
            ConceptMapNode(id: "thunderstorms-link", label: "Thunderstorms", domain: .weather, x: 0.5, y: 0.7, connections: ["lightning-injuries"]),
        ]
    )

    // MARK: - Frostbite

    static let frostbite = Lesson(
        id: "frostbite",
        domain: .firstAid,
        teachingSteps: [
            TeachingStep(
                id: "frost-1",
                headline: "Frostbite Stages",
                body: "Frostbite is tissue freezing. Frostnip (superficial): white, waxy skin that's numb but still soft underneath — fully reversible with rewarming. Superficial frostbite: skin is white and hard, tissue underneath is soft — blisters form after rewarming. Deep frostbite: skin and underlying tissue are frozen solid, wooden feel — tissue death likely. The transition from frostnip to deep frostbite can happen in minutes with wind and wet.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "normal-skin", label: "Normal", minValue: 30, maxValue: 37, color: "22C55E", description: "Normal skin temperature. Good circulation, sensation intact, pink color."),
                        DiagramZone(id: "cold-stress", label: "Cold Stress", minValue: 15, maxValue: 30, color: "F59E0B", description: "Vasoconstriction. Pale, cold, reduced sensation. Not yet frozen."),
                        DiagramZone(id: "frostnip", label: "Frostnip", minValue: 0, maxValue: 15, color: "3B82F6", description: "Superficial freezing. White, waxy, numb. Tissue underneath still soft. Fully reversible."),
                        DiagramZone(id: "superficial-fb", label: "Superficial Frostbite", minValue: -5, maxValue: 0, color: "6366F1", description: "Skin frozen hard, tissue below soft. Blisters after rewarming. Partial tissue loss possible."),
                        DiagramZone(id: "deep-fb", label: "Deep Frostbite", minValue: -15, maxValue: -5, color: "1E3A5F", description: "Frozen solid through skin, muscle, possibly bone. Wooden feel. Tissue death likely."),
                    ],
                    minValue: -15,
                    maxValue: 37,
                    unit: "C",
                    currentValue: 33
                ),
                interactionHint: "Slide to explore frostbite severity at different tissue temperatures",
                revealItems: nil
            ),
            TeachingStep(
                id: "frost-2",
                headline: "The Rewarming Decision",
                body: "The critical decision in frostbite is WHEN to rewarm. If there is any chance the tissue will refreeze, do NOT rewarm it. A freeze-thaw-refreeze cycle causes far more tissue destruction than staying frozen. If you are still hours from shelter and cannot guarantee the tissue stays warm after rewarming, leave it frozen. A person can walk on frozen feet. They cannot walk on rewarmed, blistered feet.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Rewarm Now",
                    rightTitle: "Keep Frozen",
                    leftColor: "22C55E",
                    rightColor: "3B82F6",
                    leftItems: ["In shelter with heat source", "No risk of refreezing", "Can maintain warmth for hours", "Evacuation imminent", "Pain management available"],
                    rightItems: ["Still exposed, hours from shelter", "Risk of refreezing exists", "Cannot maintain warmth", "Must keep moving to survive", "Walking on frozen feet is possible"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "frost-3",
                headline: "Field Rewarming Protocol",
                body: "When conditions are right, rewarm in water at 37-39C (warm but comfortable to your elbow). Immerse the frostbitten tissue for 30-60 minutes. This is extremely painful — the patient will need support. Do not rub, massage, or use dry heat (fire, stove). After rewarming, blisters form within 24 hours. Clear blisters indicate superficial damage. Hemorrhagic (blood-filled) blisters indicate deep tissue death.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "too-cold", label: "Too Cold", minValue: 20, maxValue: 33, color: "3B82F6", description: "Ineffective — rewarming too slow, prolongs tissue ischemia and pain"),
                        DiagramZone(id: "ideal", label: "Ideal Range", minValue: 37, maxValue: 39, color: "22C55E", description: "37-39C — warm to your elbow. Immerse 30-60 minutes. Tissue thaws safely."),
                        DiagramZone(id: "too-hot", label: "Too Hot", minValue: 39, maxValue: 50, color: "EF4444", description: "Burns the tissue. Frostbitten skin has no sensation — patient cannot feel the burn."),
                    ],
                    minValue: 20,
                    maxValue: 50,
                    unit: "C",
                    currentValue: 38
                ),
                interactionHint: "Slide to see the effects of different rewarming temperatures",
                revealItems: nil
            ),
            TeachingStep(
                id: "frost-4",
                headline: "Post-Rewarming Care",
                body: "After rewarming, protect the tissue like it is burned — because physiologically, it is. Do not break blisters. Apply loose, sterile dressings between fingers and toes (they will swell and stick together). Elevate to reduce swelling. Ibuprofen reduces inflammation and tissue damage. Keep rewarmed tissue from refreezing at all costs. The final extent of tissue damage may not be apparent for weeks.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Rewarmed frostbitten hand showing post-rewarming care and blister assessment",
                    hotspots: [
                        RevealItem(id: "frost-clear", label: "Clear blisters", detail: "Indicate superficial frostbite. Good prognosis. Do not rupture — they protect healing tissue.", x: 0.3, y: 0.4),
                        RevealItem(id: "frost-blood", label: "Hemorrhagic blisters", detail: "Blood-filled blisters indicate deep tissue damage. Tissue death likely. Do not rupture.", x: 0.7, y: 0.4),
                        RevealItem(id: "frost-pad", label: "Padding between digits", detail: "Place sterile gauze between fingers/toes to prevent maceration and adhesion as they swell.", x: 0.5, y: 0.6),
                        RevealItem(id: "frost-elevate", label: "Elevation", detail: "Keep affected extremity elevated above heart level to minimize edema.", x: 0.5, y: 0.2),
                    ]
                ),
                interactionHint: "Tap each area to learn post-rewarming management",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "frost-q1",
                type: .multipleChoice,
                prompt: "A mountaineer has frozen fingers but is still 6 hours from base camp with no shelter available. Should you rewarm the fingers?",
                difficulty: .intermediate,
                explanation: "If there is any chance of refreezing, do not rewarm. A freeze-thaw-refreeze cycle causes far more tissue destruction than staying frozen. The mountaineer can function with frozen fingers for 6 more hours.",
                options: [
                    PracticeOption(label: "No — risk of refreezing is too high. Keep them protected and frozen.", correct: true, explanation: "Refreezing after rewarming causes devastating tissue damage. Leave frozen until you can guarantee continuous warmth."),
                    PracticeOption(label: "Yes — rewarm with body heat in your armpits immediately", correct: false, explanation: "Body heat rewarming may partially thaw the tissue, but if it refreezes during the remaining 6-hour trek, the damage will be far worse."),
                    PracticeOption(label: "Yes — rub the fingers vigorously to restore circulation", correct: false, explanation: "Never rub frostbitten tissue. Ice crystals in the cells shred tissue when agitated, causing more damage."),
                    PracticeOption(label: "Yes — hold fingers near the stove flame briefly", correct: false, explanation: "Dry heat causes burns. Frostbitten tissue has no sensation and cannot feel burning. Only use warm water immersion."),
                ]
            ),
            PracticeQuestion(
                id: "frost-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .foundation,
                explanation: "Rubbing frostbitten tissue is one of the most harmful things you can do. The tissue contains ice crystals that act like tiny blades when agitated, tearing cells apart and dramatically increasing tissue destruction.",
                statement: "Rubbing frostbitten skin helps restore blood flow and should be done before rewarming.",
                isTrue: false,
                reasoning: "Never rub frostbitten tissue. Ice crystals within the frozen cells lacerate surrounding tissue when moved. This causes far more damage than the original frostbite."
            ),
            PracticeQuestion(
                id: "frost-q3",
                type: .multipleChoice,
                prompt: "After rewarming frostbitten toes, you observe blood-filled blisters forming. What does this indicate?",
                difficulty: .intermediate,
                explanation: "Hemorrhagic (blood-filled) blisters indicate damage extending into the deep dermis or beyond. The blood vessels in the deep tissue were destroyed, allowing blood to leak into the blister. This tissue will likely die.",
                options: [
                    PracticeOption(label: "Deep frostbite with probable tissue death", correct: true, explanation: "Hemorrhagic blisters indicate deep vascular damage. Tissue loss is likely. Do not rupture the blisters."),
                    PracticeOption(label: "Normal rewarming response — good sign of blood flow returning", correct: false, explanation: "Blood-filled blisters are not normal rewarming. Clear blisters indicate better prognosis."),
                    PracticeOption(label: "The rewarming water was too hot", correct: false, explanation: "Burns from hot water cause uniform redness, not hemorrhagic blisters in the pattern of frostbite."),
                    PracticeOption(label: "Superficial frostbite with full recovery expected", correct: false, explanation: "Superficial frostbite produces clear blisters. Hemorrhagic blisters indicate deeper, more serious damage."),
                ]
            ),
            PracticeQuestion(
                id: "frost-q4",
                type: .sequenceOrder,
                prompt: "Order the frostbite field management steps correctly:",
                difficulty: .foundation,
                explanation: "First assess whether rewarming is safe (no refreezing risk), prepare warm water at the correct temperature, immerse for 30-60 minutes, then protect and manage the rewarmed tissue.",
                correctOrder: ["Determine if rewarming is safe (no refreezing risk)", "Prepare water bath at 37-39C", "Immerse frostbitten tissue for 30-60 minutes", "Dress loosely with padding between digits"],
                shuffledItems: ["Immerse frostbitten tissue for 30-60 minutes", "Determine if rewarming is safe (no refreezing risk)", "Dress loosely with padding between digits", "Prepare water bath at 37-39C"]
            ),
        ],
        synthesisPrompt: "Frostbite management requires a counterintuitive decision: sometimes the best treatment is no treatment at all. How does the freeze-thaw-refreeze principle inform your decision-making on multi-day mountain expeditions where conditions can change rapidly?",
        conceptMapNodes: [
            ConceptMapNode(id: "frostbite", label: "Frostbite", domain: .firstAid, x: 0.5, y: 0.2, connections: ["hypothermia", "wilderness-assessment"]),
            ConceptMapNode(id: "rewarming", label: "Rewarming Protocol", domain: .firstAid, x: 0.2, y: 0.5, connections: ["frostbite"]),
            ConceptMapNode(id: "tissue-damage", label: "Tissue Assessment", domain: .firstAid, x: 0.8, y: 0.5, connections: ["frostbite"]),
        ]
    )

    // MARK: - Dehydration & Heat Illness

    static let dehydrationHeat = Lesson(
        id: "dehydration-heat",
        domain: .firstAid,
        teachingSteps: [
            TeachingStep(
                id: "heat-1",
                headline: "The Heat Illness Spectrum",
                body: "Heat illness is a continuum: heat cramps (muscle spasms from electrolyte loss), heat exhaustion (heavy sweating, weakness, nausea, headache — core temp up to 40C), and heat stroke (core temp >40C, altered mental status, often dry skin as sweating fails). Heat exhaustion is a warning. Heat stroke is an emergency — without rapid cooling, brain damage and death follow within minutes.",
                diagramType: .interactiveGauge,
                diagramConfig: DiagramConfig(
                    zones: [
                        DiagramZone(id: "normal-temp", label: "Normal", minValue: 36.5, maxValue: 37.5, color: "22C55E", description: "Normal core body temperature. Thermoregulation functioning properly."),
                        DiagramZone(id: "heat-cramps", label: "Heat Cramps", minValue: 37.5, maxValue: 38.5, color: "F59E0B", description: "Painful muscle spasms from sodium/electrolyte depletion. Rest, hydrate, replace electrolytes."),
                        DiagramZone(id: "heat-exhaustion", label: "Heat Exhaustion", minValue: 38.5, maxValue: 40, color: "EF4444", description: "Heavy sweating, weakness, nausea, headache. Still sweating = body still trying. Move to shade, cool actively."),
                        DiagramZone(id: "heat-stroke", label: "Heat Stroke", minValue: 40, maxValue: 42, color: "6366F1", description: "Altered mental status, often dry skin, core >40C. Medical emergency. Cool aggressively or die."),
                    ],
                    minValue: 36.5,
                    maxValue: 42,
                    unit: "C",
                    currentValue: 37
                ),
                interactionHint: "Slide to explore the heat illness continuum",
                revealItems: nil
            ),
            TeachingStep(
                id: "heat-2",
                headline: "Dehydration Compounds Everything",
                body: "At altitude, you lose 2-4 liters per day through breathing alone — dry mountain air pulls moisture from your lungs with every exhalation. Add sweating from exertion, and total fluid loss can reach 5-6 liters per day. By the time you feel thirsty, you are already 1-2% dehydrated. At 3% dehydration, performance drops 25%. At 5%, you cannot thermoregulate. Drink before you are thirsty, and watch your urine — clear to pale yellow means adequate hydration.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "mild-dehy", name: "1-2% Loss", color: "F59E0B", heightRatio: 0.25, description: "Thirst, dry mouth, fatigue. Performance drops begin. Most people are already here when they notice."),
                        DiagramLayer(id: "moderate-dehy", name: "3-5% Loss", color: "EF4444", heightRatio: 0.25, description: "Headache, dizziness, reduced sweating. 25% performance decrease. Thermoregulation failing."),
                        DiagramLayer(id: "severe-dehy", name: "6-8% Loss", color: "6366F1", heightRatio: 0.25, description: "Confusion, rapid heart rate, no sweating. Heat stroke imminent. Cannot self-rescue."),
                        DiagramLayer(id: "critical-dehy", name: ">10% Loss", color: "1E3A5F", heightRatio: 0.25, description: "Organ failure, seizures, death. Requires IV fluids. Evacuation critical."),
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "heat-3",
                headline: "Cooling a Heat Stroke Patient",
                body: "Heat stroke demands aggressive cooling immediately. Every minute above 40C causes more brain damage. Strip clothing, pour water over the patient (especially head, neck, armpits, groin), fan aggressively to maximize evaporative cooling. If available, ice packs to neck, armpits, and groin where major blood vessels run close to the skin. The goal is to get core temperature below 39C as fast as possible.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Heat stroke patient showing priority cooling zones and treatment approach",
                    hotspots: [
                        RevealItem(id: "cool-head", label: "Head and neck", detail: "Pour cool water. Carotid arteries run close to surface here. Cool blood going to the brain.", x: 0.5, y: 0.15),
                        RevealItem(id: "cool-axilla", label: "Armpits", detail: "Major blood vessels close to skin. Ice packs or wet cloths here cool blood efficiently.", x: 0.3, y: 0.35),
                        RevealItem(id: "cool-groin", label: "Groin", detail: "Femoral arteries close to surface. Ice packs here cool large volume of circulating blood.", x: 0.5, y: 0.6),
                        RevealItem(id: "cool-evap", label: "Full body", detail: "Wet the entire body and fan. Evaporative cooling is the fastest field method. Strip excess clothing.", x: 0.7, y: 0.4),
                    ]
                ),
                interactionHint: "Tap each cooling zone to learn the technique",
                revealItems: nil
            ),
            TeachingStep(
                id: "heat-4",
                headline: "Prevention and Hydration Strategy",
                body: "Prevention is a system, not a single action. Start hydrated (pre-load 500ml before activity). Drink 250-500ml per hour during exertion. Replace electrolytes (sodium, potassium) — water alone dilutes remaining electrolytes and can cause hyponatremia. Rest in shade during peak heat (10am-3pm). Wear light, loose, light-colored clothing. Monitor teammates for early signs: reduced sweating, confusion, stumbling.",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "hydration", label: "HYDRATION", description: "Pre-load, 250-500ml/hr, electrolytes. Urine should be pale yellow.", color: "3B82F6"),
                        DiagramVertex(id: "pacing", label: "PACING", description: "Rest in shade at peak heat. Reduce intensity. Acclimatize over days.", color: "22C55E"),
                        DiagramVertex(id: "monitoring", label: "MONITORING", description: "Watch teammates. Check urine color. Note mental status changes.", color: "F59E0B"),
                    ],
                    centerLabel: "HEAT PREVENTION",
                    centerDescription: "Prevention beats treatment. A heat stroke patient may have permanent brain damage even with perfect field care."
                ),
                interactionHint: nil,
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "heat-q1",
                type: .multipleChoice,
                prompt: "A hiker collapses on a hot trail. They are confused, their skin is hot and dry, and their pulse is rapid. What is the most likely diagnosis and immediate action?",
                difficulty: .intermediate,
                explanation: "Hot dry skin with altered mental status and tachycardia is classic heat stroke. The body has lost its ability to sweat and cool itself. Core temperature is likely above 40C.",
                options: [
                    PracticeOption(label: "Heat stroke — begin aggressive cooling immediately", correct: true, explanation: "Confusion + hot dry skin + rapid pulse = heat stroke. This is a life-threatening emergency. Cool aggressively: strip, wet, fan."),
                    PracticeOption(label: "Heat exhaustion — rest in shade and give fluids", correct: false, explanation: "Heat exhaustion patients are still sweating. Dry skin and confusion indicate progression to heat stroke, which requires aggressive cooling."),
                    PracticeOption(label: "Dehydration — give oral rehydration salts", correct: false, explanation: "While dehydration contributes, the altered mental status and dry hot skin indicate heat stroke. Oral fluids alone are insufficient."),
                    PracticeOption(label: "Altitude sickness — descend immediately", correct: false, explanation: "The presentation is heat-related (hot dry skin, hot environment), not altitude-related."),
                ]
            ),
            PracticeQuestion(
                id: "heat-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Drinking only plain water during heavy exertion dilutes blood sodium levels. Below a critical threshold, this causes hyponatremia — which can cause seizures, brain swelling, and death. This is why electrolyte replacement is critical during extended activity.",
                statement: "During extended mountain activity in heat, drinking only plain water is sufficient to prevent dehydration problems.",
                isTrue: false,
                reasoning: "Plain water alone dilutes blood sodium, risking hyponatremia (low sodium). Extended exertion requires electrolyte replacement alongside water. Hyponatremia can be as dangerous as dehydration."
            ),
            PracticeQuestion(
                id: "heat-q3",
                type: .sequenceOrder,
                prompt: "Order the heat illness severity from mildest to most severe:",
                difficulty: .foundation,
                explanation: "Heat illness progresses from cramps to exhaustion to stroke. The key transition is from exhaustion (still sweating, still conscious) to stroke (altered mental status, often dry skin, core >40C).",
                correctOrder: ["Heat cramps — muscle spasms, still functional", "Heat exhaustion — weakness, nausea, heavy sweating", "Heat stroke — confusion, hot dry skin, core >40C", "Multi-organ failure — seizures, coma, death"],
                shuffledItems: ["Heat stroke — confusion, hot dry skin, core >40C", "Heat cramps — muscle spasms, still functional", "Multi-organ failure — seizures, coma, death", "Heat exhaustion — weakness, nausea, heavy sweating"]
            ),
            PracticeQuestion(
                id: "heat-q4",
                type: .multipleChoice,
                prompt: "What is the approximate fluid loss per day from breathing alone at high altitude?",
                difficulty: .foundation,
                explanation: "Dry mountain air at altitude pulls moisture from the lungs with every breath. This insensible loss is 2-4 liters per day at altitude, significantly more than at sea level.",
                options: [
                    PracticeOption(label: "2-4 liters per day", correct: true, explanation: "The dry, low-pressure air at altitude dramatically increases respiratory water loss compared to sea level."),
                    PracticeOption(label: "0.5 liters per day", correct: false, explanation: "This is closer to sea-level respiratory loss. Altitude increases it 4-8 times due to lower humidity and increased respiration."),
                    PracticeOption(label: "500ml per week", correct: false, explanation: "This dramatically underestimates respiratory loss. Even at sea level, daily respiratory loss exceeds this."),
                    PracticeOption(label: "It depends entirely on temperature, not altitude", correct: false, explanation: "While temperature matters, altitude independently increases respiratory water loss through lower humidity and higher ventilation rates."),
                ]
            ),
        ],
        synthesisPrompt: "Dehydration and heat illness are preventable conditions that become emergencies through inattention. How does the mountain environment — altitude, exertion, solar radiation, and distance from help — compress the timeline from prevention to crisis, and what systems keep your team ahead of the curve?",
        conceptMapNodes: [
            ConceptMapNode(id: "dehydration-heat", label: "Heat & Dehydration", domain: .firstAid, x: 0.5, y: 0.2, connections: ["wilderness-assessment", "evacuation-planning"]),
            ConceptMapNode(id: "heat-illness", label: "Heat Illness Spectrum", domain: .firstAid, x: 0.2, y: 0.5, connections: ["dehydration-heat"]),
            ConceptMapNode(id: "hydration-strategy", label: "Hydration Strategy", domain: .firstAid, x: 0.8, y: 0.5, connections: ["dehydration-heat", "altitude-sickness"]),
        ]
    )

    // MARK: - Emergency Shelter

    static let emergencyShelter = Lesson(
        id: "emergency-shelter",
        domain: .firstAid,
        teachingSteps: [
            TeachingStep(
                id: "shelter-1",
                headline: "The Rule of Threes",
                body: "You can survive 3 hours without shelter in harsh conditions, 3 days without water, 3 weeks without food. Shelter is your first priority in a survival situation — before water, before food, before signaling. Hypothermia kills faster than dehydration or starvation. If you are benighted, injured, or caught in a storm, building shelter is your number one job.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "shelter-3h", label: "3 Hours", value: 0.15, description: "Survival without shelter in harsh conditions. Hypothermia kills in hours — shelter is priority one.", color: "EF4444"),
                        DiagramSegment(id: "water-3d", label: "3 Days", value: 0.35, description: "Survival without water. Dehydration degrades performance within hours but kills in days.", color: "F59E0B"),
                        DiagramSegment(id: "food-3w", label: "3 Weeks", value: 0.5, description: "Survival without food. The body has reserves. Food is important but not urgent.", color: "22C55E"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "shelter-2",
                headline: "Emergency Shelter Types",
                body: "Your emergency shelter depends on terrain and materials. Snow: dig a snow trench (fastest), build a snow cave (warmest, most effort), or construct a quinzee. Above treeline without snow: rock wall windbreak with tarp or emergency blanket. In forest: lean-to with branches and debris. The emergency bivy sack — a 100-gram orange bag — is the single most valuable piece of emergency gear. It traps body heat and blocks wind.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Snow Shelters",
                    rightTitle: "Non-Snow Shelters",
                    leftColor: "3B82F6",
                    rightColor: "22C55E",
                    leftItems: ["Snow trench (20 min, fastest)", "Snow cave (1-2 hrs, warmest)", "Quinzee (pile, wait, hollow)", "Tree well shelter (natural cavity)"],
                    rightItems: ["Emergency bivy sack (instant)", "Tarp lean-to (10-20 min)", "Rock wall windbreak (30 min)", "Debris hut (1-2 hrs, forest only)"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "shelter-3",
                headline: "Snow Shelter Principles",
                body: "Snow is an excellent insulator — a well-built snow cave maintains near 0C inside regardless of outside temperature. Key principles: entrance lower than sleeping platform (cold air sinks), ventilation hole in the roof (prevents CO2 buildup — people die in sealed snow caves), smooth the ceiling (prevents drip), and mark the outside so rescuers can find you. A candle inside raises temperature noticeably and provides light.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Cross-section of a snow cave showing key structural features for survival",
                    hotspots: [
                        RevealItem(id: "cave-entrance", label: "Low entrance", detail: "Entrance below sleeping platform traps warm air inside. Cold air sinks and drains out.", x: 0.2, y: 0.7),
                        RevealItem(id: "cave-platform", label: "Sleeping platform", detail: "Raised above entrance. Warm air rises here. Insulate with pack, rope, or branches underneath.", x: 0.6, y: 0.5),
                        RevealItem(id: "cave-vent", label: "Ventilation hole", detail: "CRITICAL: prevents CO2 buildup. Poke through roof with ski pole. People have died in sealed caves.", x: 0.5, y: 0.2),
                        RevealItem(id: "cave-ceiling", label: "Dome ceiling", detail: "Smooth to prevent dripping. Dome shape distributes weight and prevents collapse.", x: 0.4, y: 0.3),
                    ]
                ),
                interactionHint: "Tap each feature to understand its survival function",
                revealItems: nil
            ),
            TeachingStep(
                id: "shelter-4",
                headline: "Site Selection",
                body: "Where you build matters as much as what you build. Avoid avalanche runout zones, drainage channels (flash floods), exposed ridgelines (wind), and dead trees overhead (widow-makers). Look for natural windbreaks: rock faces, dense tree stands, terrain features. Consider morning sun exposure for warmth. In winter, check for cornices above and wind-loaded slopes nearby. The best shelter in the wrong location is a death trap.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Mountain terrain showing safe and dangerous shelter site locations",
                    hotspots: [
                        RevealItem(id: "site-good", label: "Protected bench", detail: "Flat area behind natural windbreak, away from avalanche paths. Morning sun exposure. Ideal site.", x: 0.4, y: 0.5),
                        RevealItem(id: "site-bad-ridge", label: "Exposed ridge", detail: "Maximum wind exposure, lightning risk, no insulation from ground. Worst possible site.", x: 0.5, y: 0.15),
                        RevealItem(id: "site-bad-gully", label: "Gully/drainage", detail: "Avalanche runout path, flash flood channel, cold air pooling. Avoid at all costs.", x: 0.2, y: 0.7),
                        RevealItem(id: "site-bad-cornice", label: "Below cornice", detail: "Cornices break without warning. Never shelter below overhanging snow formations.", x: 0.7, y: 0.25),
                    ]
                ),
                interactionHint: "Tap each location to assess its safety",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "shelter-q1",
                type: .multipleChoice,
                prompt: "Your group is caught by a storm above treeline in winter. You have a tarp and digging tools. Snow depth is 2 meters. What is the fastest adequate shelter?",
                difficulty: .foundation,
                explanation: "A snow trench is the fastest shelter to build in deep snow — approximately 20 minutes for a basic trench. It gets you out of the wind immediately and can be covered with a tarp.",
                options: [
                    PracticeOption(label: "Snow trench covered with the tarp — fastest option", correct: true, explanation: "A snow trench takes ~20 minutes, provides immediate wind protection, and the tarp creates a sealed roof. Best speed-to-protection ratio."),
                    PracticeOption(label: "Full snow cave — warmest and most protective", correct: false, explanation: "Snow caves take 1-2 hours to build. In a storm with hypothermia risk, speed matters more than perfection."),
                    PracticeOption(label: "Tarp lean-to against a rock", correct: false, explanation: "Above treeline in a storm, a lean-to provides minimal protection. A snow trench with tarp roof is far more effective."),
                    PracticeOption(label: "Keep moving to stay warm until the storm passes", correct: false, explanation: "Moving in a storm risks getting lost, falls, and accelerated heat loss from wind. Shelter in place is the correct decision."),
                ]
            ),
            PracticeQuestion(
                id: "shelter-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Snow caves can become death traps if sealed. As occupants breathe, oxygen is consumed and CO2 accumulates. Without a ventilation hole, CO2 poisoning causes drowsiness (mistaken for warmth and comfort), then unconsciousness, then death.",
                statement: "A snow cave should be sealed as tightly as possible to maximize warmth.",
                isTrue: false,
                reasoning: "A sealed snow cave can kill you through CO2 poisoning. You MUST maintain a ventilation hole through the roof. Check it regularly — snow drift or cooking condensation can block it. The slight heat loss is trivial compared to suffocation risk."
            ),
            PracticeQuestion(
                id: "shelter-q3",
                type: .sequenceOrder,
                prompt: "Order the emergency shelter building priorities from first to last:",
                difficulty: .foundation,
                explanation: "First assess the site for hazards, then get out of the wind immediately (fastest option), improve insulation from the ground (biggest heat loss), and finally improve the shelter structure if time permits.",
                correctOrder: ["Assess site for avalanche, rockfall, and wind hazards", "Get out of wind immediately (trench, bivy, or windbreak)", "Insulate from the ground (pads, branches, rope, packs)", "Improve shelter structure and ventilation"],
                shuffledItems: ["Improve shelter structure and ventilation", "Assess site for avalanche, rockfall, and wind hazards", "Insulate from the ground (pads, branches, rope, packs)", "Get out of wind immediately (trench, bivy, or windbreak)"]
            ),
            PracticeQuestion(
                id: "shelter-q4",
                type: .multipleChoice,
                prompt: "What is the single most weight-efficient piece of emergency shelter gear?",
                difficulty: .foundation,
                explanation: "An emergency bivy sack weighs approximately 100 grams and provides immediate protection from wind, rain, and heat loss. It is the best weight-to-protection ratio of any emergency gear.",
                options: [
                    PracticeOption(label: "Emergency bivy sack (~100g)", correct: true, explanation: "Instant shelter: climb in, trap body heat, block wind and rain. 100 grams that can save your life."),
                    PracticeOption(label: "Four-season tent (~3kg)", correct: false, explanation: "While excellent shelter, 3kg is heavy emergency gear. The bivy provides 80% of the protection at 3% of the weight."),
                    PracticeOption(label: "Space blanket (~50g)", correct: false, explanation: "Space blankets reflect heat but tear easily, have no structure, and are difficult to use in wind. A bivy sack is more practical."),
                    PracticeOption(label: "Tarp (~500g)", correct: false, explanation: "Tarps are versatile but require setup skill, cordage, and anchors. The bivy is instant and foolproof."),
                ]
            ),
        ],
        synthesisPrompt: "Emergency shelter connects directly to hypothermia prevention. How does understanding heat loss mechanisms (conduction, convection, radiation, evaporation) inform every decision you make about shelter — from site selection to construction technique to what you put between yourself and the ground?",
        conceptMapNodes: [
            ConceptMapNode(id: "emergency-shelter", label: "Emergency Shelter", domain: .firstAid, x: 0.5, y: 0.2, connections: ["hypothermia", "evacuation-planning"]),
            ConceptMapNode(id: "snow-shelters", label: "Snow Shelters", domain: .firstAid, x: 0.2, y: 0.5, connections: ["emergency-shelter"]),
            ConceptMapNode(id: "site-selection", label: "Site Selection", domain: .firstAid, x: 0.8, y: 0.5, connections: ["emergency-shelter"]),
            ConceptMapNode(id: "weather-link", label: "Mountain Weather", domain: .weather, x: 0.5, y: 0.7, connections: ["emergency-shelter"]),
        ]
    )

    // MARK: - Evacuation Planning

    static let evacuationPlanning = Lesson(
        id: "evacuation-planning",
        domain: .firstAid,
        teachingSteps: [
            TeachingStep(
                id: "evac-1",
                headline: "The Evacuation Decision",
                body: "The hardest decision in wilderness medicine is not what to treat — it is whether to evacuate. Every evacuation carries risk: moving an injured patient, exposure during transport, committing group resources, and the time cost if the injury is minor. The question is not 'is this person hurt?' but 'will this person get worse without hospital care, and can we safely get them there?'",
                diagramType: .triangle,
                diagramConfig: DiagramConfig(
                    vertices: [
                        DiagramVertex(id: "severity", label: "INJURY SEVERITY", description: "Life-threatening? Progressive? Needs hospital intervention? Can it be managed in the field?", color: "EF4444"),
                        DiagramVertex(id: "resources", label: "RESOURCES", description: "Group size, equipment, terrain, weather window, communication, distance to help", color: "3B82F6"),
                        DiagramVertex(id: "risk", label: "TRANSPORT RISK", description: "Terrain difficulty, weather, darkness, further injury risk, group exhaustion", color: "F59E0B"),
                    ],
                    centerLabel: "EVACUATE?",
                    centerDescription: "Balance injury severity against transport risk and available resources"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "evac-2",
                headline: "Mandatory Evacuation Triggers",
                body: "Some conditions require evacuation regardless of difficulty. Altered mental status not improving (HACE, heat stroke, head injury). Chest pain with shortness of breath. Spinal cord symptoms (numbness, paralysis). Abdominal rigidity (internal bleeding). Femur or pelvis fracture. Any wound with red streaking (systemic infection). These conditions will not improve in the field and will worsen or kill without hospital treatment.",
                diagramType: .comparisonSplit,
                diagramConfig: DiagramConfig(
                    leftTitle: "Evacuate Urgently",
                    rightTitle: "Can Manage in Field",
                    leftColor: "EF4444",
                    rightColor: "22C55E",
                    leftItems: ["Altered mental status (not improving)", "Spinal cord symptoms", "Femur/pelvis fracture", "Abdominal rigidity", "Chest pain + SOB", "Systemic infection signs"],
                    rightItems: ["Simple fractures (splinted, pulse intact)", "Minor wounds (irrigated, no infection)", "Mild AMS (responsive to rest)", "Sprains and strains", "Minor burns (<10% body surface)", "Resolved heat exhaustion"]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "evac-3",
                headline: "Evacuation Methods",
                body: "Your evacuation method depends on terrain, injury, and resources. Self-evacuation (patient walks out with support) is safest when possible. Improvised litter carry requires 6-8 people and is exhausting — expect 1km/hour over rough terrain. Helicopter evacuation requires a landing zone or long-line capability, clear weather, and communication. Know your region's rescue phone numbers and helicopter capabilities before the trip starts.",
                diagramType: .timeline,
                diagramConfig: DiagramConfig(
                    segments: [
                        DiagramSegment(id: "self-evac", label: "Self-Evacuation", value: 0.2, description: "Patient walks with assistance. Fastest, safest, lowest resource cost. Always preferred if possible.", color: "22C55E"),
                        DiagramSegment(id: "assisted", label: "Assisted Walk-Out", value: 0.2, description: "Patient walks with significant support — trekking poles, teammates carrying pack. Slower but manageable.", color: "3B82F6"),
                        DiagramSegment(id: "litter", label: "Improvised Litter", value: 0.3, description: "6-8 carriers, 1km/hr, exhausting. Built from poles, packs, rope. Only for non-ambulatory patients.", color: "F59E0B"),
                        DiagramSegment(id: "helicopter", label: "Helicopter Rescue", value: 0.3, description: "Fastest but weather-dependent. Needs LZ or long-line. May be hours away. Call early — they can always cancel.", color: "EF4444"),
                    ]
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "evac-4",
                headline: "Communication and Handover",
                body: "When rescue arrives — whether helicopter, ground team, or ranger — your SOAP notes become critical. Hand over: patient name, age, mechanism of injury, findings from your primary and secondary surveys, vital sign trends, treatments given and times, allergies and medications. A clear, organized handover saves time and may save the patient's life. Write it all down while waiting — stress degrades memory.",
                diagramType: .layeredStack,
                diagramConfig: DiagramConfig(
                    layers: [
                        DiagramLayer(id: "who", name: "Patient Info", color: "3B82F6", heightRatio: 0.2, description: "Name, age, medical history, allergies, current medications"),
                        DiagramLayer(id: "what", name: "Mechanism & Findings", color: "F59E0B", heightRatio: 0.25, description: "How it happened, primary/secondary survey findings, injury list"),
                        DiagramLayer(id: "trend", name: "Vital Sign Trends", color: "EF4444", heightRatio: 0.25, description: "Pulse, respiration, consciousness level tracked over time with timestamps"),
                        DiagramLayer(id: "treatment", name: "Treatments Given", color: "22C55E", heightRatio: 0.15, description: "What you did, when, response to treatment. Medications with doses and times."),
                        DiagramLayer(id: "concern", name: "Your Concerns", color: "8B5CF6", heightRatio: 0.15, description: "What worries you. Suspected internal bleeding, deteriorating trend, time-sensitive issues."),
                    ],
                    animationStyle: "sequential"
                ),
                interactionHint: nil,
                revealItems: nil
            ),
            TeachingStep(
                id: "evac-5",
                headline: "Pre-Trip Planning",
                body: "The best evacuation is one you planned before leaving the trailhead. Know your emergency numbers (varies by country and region). Carry a satellite communicator (PLB, InReach, or SPOT). Identify bail-out routes on your map before the trip. Brief your group on the emergency plan. Leave a trip plan with a responsible person including expected return time and the point at which they should call rescue. Most mountain deaths happen to people who had no plan B.",
                diagramType: .labeledScene,
                diagramConfig: DiagramConfig(
                    sceneDescription: "Pre-trip planning board showing essential evacuation preparation elements",
                    hotspots: [
                        RevealItem(id: "plan-comms", label: "Communications", detail: "Satellite communicator (PLB/InReach), emergency numbers, check coverage area. Battery charged.", x: 0.3, y: 0.3),
                        RevealItem(id: "plan-bailout", label: "Bail-out routes", detail: "Identify alternate descent routes on the map before leaving. Know where the nearest road access is from every point on your route.", x: 0.7, y: 0.3),
                        RevealItem(id: "plan-trip", label: "Trip plan filed", detail: "Leave route, timeline, and emergency instructions with a responsible person. Include your 'panic time' — when they should call rescue.", x: 0.3, y: 0.7),
                        RevealItem(id: "plan-gear", label: "Emergency gear check", detail: "First aid kit, emergency bivy, headlamp, extra food/water, fire-starting. Distributed across group members.", x: 0.7, y: 0.7),
                    ]
                ),
                interactionHint: "Tap each planning element to learn the details",
                revealItems: nil
            ),
        ],
        practiceQuestions: [
            PracticeQuestion(
                id: "evac-q1",
                type: .multipleChoice,
                prompt: "A climber falls 3 meters and has a deformed forearm with intact distal pulses. They can walk. The weather is stable and you are 4 hours from the trailhead. What is the best evacuation plan?",
                difficulty: .intermediate,
                explanation: "This is a stable fracture with intact circulation in an ambulatory patient. Self-evacuation with a splinted arm is the safest, fastest option. Helicopter rescue is not warranted for a stable extremity fracture.",
                options: [
                    PracticeOption(label: "Splint the arm, assist the patient to walk out — self-evacuation", correct: true, explanation: "Stable fracture, intact pulses, ambulatory patient, stable weather. Splint well and walk out. Safest option with lowest risk."),
                    PracticeOption(label: "Call for helicopter evacuation immediately", correct: false, explanation: "Helicopter evacuation carries its own risks and is not indicated for a stable extremity injury in an ambulatory patient."),
                    PracticeOption(label: "Build an improvised litter and carry the patient out", correct: false, explanation: "The patient can walk. Litter carries are exhausting, slow, and risk secondary injury. Always prefer ambulatory evacuation."),
                    PracticeOption(label: "Camp overnight and reassess in the morning", correct: false, explanation: "There is no reason to delay. The patient is stable and ambulatory. Walk out while weather and daylight permit."),
                ]
            ),
            PracticeQuestion(
                id: "evac-q2",
                type: .trueFalseReasoning,
                prompt: "True or False?",
                difficulty: .intermediate,
                explanation: "Calling for rescue early is always better than calling late. Rescue teams can be stood down if the situation improves, but they cannot travel back in time if you waited too long. Weather windows close, daylight fades, and patients deteriorate.",
                statement: "You should wait to call for helicopter rescue until you are certain the patient cannot walk out, to avoid wasting rescue resources.",
                isTrue: false,
                reasoning: "Call early. Helicopter teams can always be cancelled if the patient improves. But if weather closes in or the patient deteriorates, a delayed call may mean no rescue is possible. Early notification gives rescue teams time to mobilize."
            ),
            PracticeQuestion(
                id: "evac-q3",
                type: .sequenceOrder,
                prompt: "Order the evacuation decision-making steps:",
                difficulty: .foundation,
                explanation: "First stabilize the patient (ABCDEs), then assess the injury severity and evacuation need, evaluate your resources and route options, and finally execute the plan while maintaining patient monitoring.",
                correctOrder: ["Stabilize the patient — address life threats first", "Assess injury severity and evacuation necessity", "Evaluate resources, weather, terrain, and route options", "Execute evacuation plan with continuous patient monitoring"],
                shuffledItems: ["Evaluate resources, weather, terrain, and route options", "Stabilize the patient — address life threats first", "Execute evacuation plan with continuous patient monitoring", "Assess injury severity and evacuation necessity"]
            ),
            PracticeQuestion(
                id: "evac-q4",
                type: .multipleChoice,
                prompt: "What information is MOST critical to include when handing over a patient to a rescue team?",
                difficulty: .intermediate,
                explanation: "Vital sign trends over time reveal whether the patient is improving, stable, or deteriorating. A single reading tells far less than a trend. Rising pulse with falling consciousness is more alarming than any single elevated heart rate.",
                options: [
                    PracticeOption(label: "Vital sign trends with timestamps — pulse, respiration, consciousness over time", correct: true, explanation: "Trends reveal trajectory. A patient going from 80 to 120bpm over an hour tells a different story than a single reading of 100bpm."),
                    PracticeOption(label: "The exact GPS coordinates of where the injury occurred", correct: false, explanation: "Location is important for reports but does not change immediate medical management. Vital trends guide treatment decisions."),
                    PracticeOption(label: "A detailed account of how the accident happened", correct: false, explanation: "Mechanism is relevant but secondary to current patient status and trends. Treatment decisions depend on what's happening now."),
                    PracticeOption(label: "The patient's insurance information", correct: false, explanation: "Insurance is irrelevant during acute medical handover. Clinical information saves lives; administrative details can wait."),
                ]
            ),
        ],
        synthesisPrompt: "Evacuation planning ties together every other first aid skill. Your assessment determines urgency, your treatment buys time, and your communication enables definitive care. How does pre-trip planning — knowing bail routes, carrying communication, filing trip plans — change the entire risk calculus of a mountain objective?",
        conceptMapNodes: [
            ConceptMapNode(id: "evacuation-planning", label: "Evacuation Planning", domain: .firstAid, x: 0.5, y: 0.2, connections: ["wilderness-assessment", "emergency-shelter"]),
            ConceptMapNode(id: "evac-methods", label: "Evacuation Methods", domain: .firstAid, x: 0.2, y: 0.5, connections: ["evacuation-planning"]),
            ConceptMapNode(id: "communication", label: "Communication & Handover", domain: .firstAid, x: 0.8, y: 0.5, connections: ["evacuation-planning", "wilderness-assessment"]),
            ConceptMapNode(id: "pre-trip", label: "Pre-Trip Planning", domain: .firstAid, x: 0.5, y: 0.7, connections: ["evacuation-planning"]),
        ]
    )
}
