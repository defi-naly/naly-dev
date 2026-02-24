export type DomainId = 'weather' | 'avalanche' | 'flying';

export interface ApplicationOption {
  label: string;
  correct?: boolean;
  explanation: string;
}

export interface ApplicationScenario {
  situation: string;
  options: ApplicationOption[];
}

export interface Module {
  id: number;
  domain: DomainId;
  slug: string;
  title: string;
  concept: string;
  takeaway: string;
  tool: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  relatedModules?: { domain: DomainId; slug: string }[];
  applicationScenario?: ApplicationScenario;
  connectionPrompt?: string;
}

export interface Domain {
  id: DomainId;
  name: string;
  subtitle: string;
  description: string;
  book: string;
  author: string;
  accent: string;
  accentRgb: string;
  modules: Module[];
}

export const domains: Domain[] = [
  {
    id: 'weather',
    name: 'Weather',
    subtitle: 'Understanding the Sky',
    description: 'Read pressure systems, thermals, and mountain winds. Anticipate what the sky will do next.',
    book: 'Understanding the Sky',
    author: 'Dennis Pagen',
    accent: '#7BA7CC',
    accentRgb: '123, 167, 204',
    modules: [
      {
        id: 1, domain: 'weather', slug: 'atmosphere',
        title: 'The Atmosphere', concept: 'Atmospheric layers, pressure, temperature',
        takeaway: 'Air cools as it rises, warms as it sinks. This single principle drives all weather.',
        tool: 'AtmosphericLayerExplorer', difficulty: 'foundation',
        relatedModules: [{ domain: 'flying', slug: 'soaring-fundamentals' }],
        applicationScenario: {
          situation: 'You\'re at 6,000ft and the surface temperature is 30°C. Using the standard lapse rate (2°C/1000ft), what temperature should you expect at your altitude?',
          options: [
            { label: '18°C', correct: true, explanation: '30°C - (6 × 2°C) = 18°C. The standard environmental lapse rate is approximately 2°C per 1000 feet.' },
            { label: '24°C', correct: false, explanation: 'This would only be correct if you used 1°C per 1000ft, which is lower than the standard lapse rate.' },
            { label: '12°C', correct: false, explanation: 'You used the dry adiabatic lapse rate (3°C/1000ft) instead of the standard environmental lapse rate.' },
          ],
        },
        connectionPrompt: 'How does understanding atmospheric temperature change with altitude connect to soaring fundamentals?',
      },
      {
        id: 2, domain: 'weather', slug: 'pressure-systems',
        title: 'Pressure Systems', concept: 'Pressure gradients create wind',
        takeaway: 'Wind is simply air flowing from high to low pressure. The tighter the isobars, the stronger the wind.',
        tool: 'PressureSystemAnimator', difficulty: 'foundation',
        relatedModules: [{ domain: 'weather', slug: 'mountain-waves' }],
        applicationScenario: {
          situation: 'You see a weather map with isobars very tightly packed over the Alps. What should you expect?',
          options: [
            { label: 'Strong winds and possible mountain wave activity', correct: true, explanation: 'Tightly packed isobars indicate a strong pressure gradient, meaning strong winds — perfect conditions for mountain waves.' },
            { label: 'Light winds and good thermal conditions', correct: false, explanation: 'Tight isobars mean strong pressure gradients and strong winds, not light winds.' },
            { label: 'Heavy precipitation with calm winds', correct: false, explanation: 'Tight isobars indicate wind, not precipitation. Rain depends on moisture and lift mechanisms.' },
          ],
        },
        connectionPrompt: 'How do pressure systems relate to mountain wave formation?',
      },
      {
        id: 3, domain: 'weather', slug: 'fronts',
        title: 'Air Masses & Fronts', concept: 'Frontal weather sequence',
        takeaway: 'Cold fronts are steep and violent. Warm fronts are shallow and persistent. Both demand respect.',
        tool: 'FrontPassageTimeline', difficulty: 'foundation',
        relatedModules: [{ domain: 'weather', slug: 'thunderstorms' }],
        applicationScenario: {
          situation: 'A cold front is approaching from the west, expected in 6 hours. You\'re planning an afternoon hike. What weather sequence should you prepare for?',
          options: [
            { label: 'Rapidly deteriorating conditions with gusty winds and possible thunderstorms', correct: true, explanation: 'Cold fronts are steep and move fast. Expect a sharp wind shift, rapid temperature drop, gusty conditions, and possible cumulonimbus development.' },
            { label: 'Gradual cloud thickening and light steady rain', correct: false, explanation: 'This describes a warm front approach, not a cold front. Cold fronts bring sudden, violent weather changes.' },
            { label: 'Improving conditions as the front passes', correct: false, explanation: 'Conditions improve after the front passes, but the passage itself brings the worst weather.' },
          ],
        },
        connectionPrompt: 'How do frontal systems relate to thunderstorm development?',
      },
      {
        id: 4, domain: 'weather', slug: 'thermals',
        title: 'Thermals', concept: 'Thermal triggering & sources',
        takeaway: 'Dark surfaces heat fastest. Thermals release when the trigger temperature is exceeded — like bubbles in a pot.',
        tool: 'ThermalTriggerSimulator', difficulty: 'intermediate',
        relatedModules: [{ domain: 'flying', slug: 'thermal-entry' }, { domain: 'flying', slug: 'centering' }],
        applicationScenario: {
          situation: 'It\'s 11am on a clear day. You\'re looking at a dark plowed field next to a lake. Where would you expect the first thermals?',
          options: [
            { label: 'Over the dark plowed field', correct: true, explanation: 'Dark surfaces absorb more solar radiation and heat faster. The plowed field will reach trigger temperature before the lake, which has high thermal inertia.' },
            { label: 'Over the lake', correct: false, explanation: 'Water has very high thermal inertia — it heats slowly. Lakes suppress thermals and often create sink.' },
            { label: 'Equally from both', correct: false, explanation: 'Different surface types heat at very different rates. Dark, dry surfaces always trigger first.' },
          ],
        },
        connectionPrompt: 'How does understanding thermal sources help with thermal entry technique?',
      },
      {
        id: 5, domain: 'weather', slug: 'lapse-rates',
        title: 'Lapse Rates', concept: 'Stability & instability',
        takeaway: 'Dry air cools at 3°C/1000ft. Moist air at 1.5°C/1000ft. The gap between them determines whether air rises or sinks.',
        tool: 'LapseRateCalculator', difficulty: 'intermediate',
        relatedModules: [{ domain: 'flying', slug: 'climbing' }],
        applicationScenario: {
          situation: 'Surface temp is 25°C, dewpoint is 15°C. At what altitude will clouds form?',
          options: [
            { label: 'Approximately 2,200ft AGL', correct: true, explanation: 'Using Espy\'s formula: LCL = 222 × (T - Td) = 222 × (25 - 15) = 2,220ft. This is where rising air reaches saturation.' },
            { label: 'Approximately 5,000ft AGL', correct: false, explanation: 'This is too high. The temperature-dewpoint spread of 10°C gives an LCL around 2,200ft.' },
            { label: 'Approximately 1,000ft AGL', correct: false, explanation: 'This is too low. You\'d need a temperature-dewpoint spread of only about 4.5°C for this altitude.' },
          ],
        },
        connectionPrompt: 'How do lapse rates affect your decisions when climbing to cloudbase?',
      },
      {
        id: 6, domain: 'weather', slug: 'clouds',
        title: 'Clouds', concept: 'Cloud classification & meaning',
        takeaway: 'Every cloud is a message. Cumulus means lift. Lenticularis means waves. Cumulonimbus means run.',
        tool: 'CloudTypeIdentifier', difficulty: 'foundation',
        relatedModules: [{ domain: 'flying', slug: 'reading-sky' }],
        applicationScenario: {
          situation: 'You see lenticular clouds forming over a ridge and cumulus building rapidly to the east. What does this tell you?',
          options: [
            { label: 'Mountain waves are active over the ridge; thermals are working to the east', correct: true, explanation: 'Lenticular clouds are the signature of mountain waves — smooth, powerful lift aloft with dangerous rotors below. Active cumulus indicate thermal activity.' },
            { label: 'Rain is approaching from the east', correct: false, explanation: 'Cumulus with vertical development indicate thermals, not approaching rain. Rain comes from nimbostratus or cumulonimbus.' },
            { label: 'Stable conditions with no usable lift', correct: false, explanation: 'Both cloud types indicate active atmospheric lift — waves and thermals respectively.' },
          ],
        },
        connectionPrompt: 'How does cloud identification help with reading the sky for flying?',
      },
      {
        id: 7, domain: 'weather', slug: 'mountain-winds',
        title: 'Mountain Winds', concept: 'Valley, slope, sea breeze winds',
        takeaway: 'Valleys breathe: upslope by day, downslope by night. The transition windows are the calmest — and most flyable.',
        tool: 'ValleyWindCycleAnimator', difficulty: 'intermediate',
        relatedModules: [{ domain: 'flying', slug: 'valley-flying' }, { domain: 'avalanche', slug: 'weather-loading' }],
        applicationScenario: {
          situation: 'It\'s 2pm in an alpine valley. Which direction is the valley wind blowing?',
          options: [
            { label: 'Up-valley (anabatic)', correct: true, explanation: 'By afternoon, solar heating drives strong up-valley (anabatic) winds. The slopes heat the air which rises, drawing air up from the valley mouth.' },
            { label: 'Down-valley (katabatic)', correct: false, explanation: 'Down-valley winds occur at night when slopes cool radiatively. By 2pm, the up-valley wind is well established.' },
            { label: 'Calm — no wind during transition', correct: false, explanation: 'The morning transition is around 9-10am. By 2pm, the anabatic wind cycle is at full strength.' },
          ],
        },
        connectionPrompt: 'How do mountain wind patterns affect both valley flying and avalanche weather loading?',
      },
      {
        id: 8, domain: 'weather', slug: 'mountain-waves',
        title: 'Mountain Waves', concept: 'Lee waves, rotors, foehn',
        takeaway: 'Strong wind over ridges creates standing waves. Smooth and powerful aloft, violent rotors below. Lenticular clouds mark the crests.',
        tool: 'MountainWaveVisualizer', difficulty: 'advanced',
        relatedModules: [{ domain: 'flying', slug: 'convergence-sea-breeze' }],
        applicationScenario: {
          situation: 'You observe a stack of smooth lens-shaped clouds above a ridge with strong turbulence reported below 8,000ft. What is happening?',
          options: [
            { label: 'Mountain wave with rotor turbulence below', correct: true, explanation: 'The lenticular stack marks wave crests. Below the wave, rotor zones create severe turbulence. The smooth wave aloft is powerful lift; the rotor below is extremely dangerous.' },
            { label: 'Thunderstorm developing behind the ridge', correct: false, explanation: 'Lenticular clouds are smooth and stationary — the opposite of cumulonimbus. They indicate wave, not convective activity.' },
            { label: 'Temperature inversion trapping pollution', correct: false, explanation: 'Inversions create haze layers, not lenticular cloud stacks. The vertical extent and shape clearly indicate wave activity.' },
          ],
        },
        connectionPrompt: 'How does understanding mountain waves connect to convergence and sea breeze phenomena?',
      },
      {
        id: 9, domain: 'weather', slug: 'convergence',
        title: 'Convergence', concept: 'Convergence lift',
        takeaway: 'Where two air masses collide, air has nowhere to go but up. Convergence lines are invisible highways of lift.',
        tool: 'ConvergenceZoneFinder', difficulty: 'advanced',
        relatedModules: [{ domain: 'flying', slug: 'convergence-sea-breeze' }],
        applicationScenario: {
          situation: 'Two valley wind systems are converging ahead of you, marked by a distinct cloud line. What should you expect?',
          options: [
            { label: 'A line of strong, reliable lift along the convergence', correct: true, explanation: 'When two air masses collide, the air is forced upward. Convergence lines produce some of the strongest and most reliable lift available.' },
            { label: 'Strong sink and turbulence to avoid', correct: false, explanation: 'Convergence produces lift, not sink. The forced ascent of air creates a highway of usable energy.' },
            { label: 'The clouds will dissipate as the systems cancel out', correct: false, explanation: 'Air masses don\'t cancel — they collide and force air upward, enhancing cloud development along the convergence line.' },
          ],
        },
        connectionPrompt: 'How does convergence lift relate to sea breeze convergence in flying?',
      },
      {
        id: 10, domain: 'weather', slug: 'thunderstorms',
        title: 'Thunderstorms', concept: 'CB development & escape',
        takeaway: 'Instability + moisture + trigger + shear = thunderstorm. Missing any one of these and the storm doesn\'t form. Know all four.',
        tool: 'ThunderstormDecisionTree', difficulty: 'advanced',
        relatedModules: [{ domain: 'avalanche', slug: 'decision-framework' }],
        applicationScenario: {
          situation: 'You have instability, moisture, and an approaching cold front. Wind shear is moderate. Assess the thunderstorm risk.',
          options: [
            { label: 'High risk — all four ingredients present, expect organized storms', correct: true, explanation: 'Instability + moisture + trigger (cold front) + shear = all four ingredients. Moderate shear means storms will be organized and potentially severe.' },
            { label: 'Low risk — wind shear prevents storm formation', correct: false, explanation: 'Moderate wind shear actually organizes storms, making them longer-lasting. Only very strong shear can tear storms apart.' },
            { label: 'Moderate risk — missing the trigger mechanism', correct: false, explanation: 'The cold front IS the trigger mechanism. All four ingredients are present.' },
          ],
        },
        connectionPrompt: 'How does systematic thunderstorm assessment relate to avalanche decision frameworks?',
      },
    ],
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    subtitle: 'Staying Alive',
    description: 'Assess snowpack layers, terrain traps, and human bias. Make decisions that keep you alive.',
    book: 'Staying Alive in Avalanche Terrain',
    author: 'Bruce Tremper',
    accent: '#FFFFFF',
    accentRgb: '255, 255, 255',
    modules: [
      {
        id: 1, domain: 'avalanche', slug: 'avalanche-triangle',
        title: 'The Avalanche Triangle', concept: 'Combined factor risk',
        takeaway: 'Three sides: terrain, weather, snowpack. Plus the human factor in the center. All four must align for safety.',
        tool: 'AvalancheTriangle', difficulty: 'foundation',
        relatedModules: [{ domain: 'avalanche', slug: 'human-factors' }],
        applicationScenario: {
          situation: 'The danger rating is Considerable. You\'re looking at a 35° north-facing slope with recent wind loading. Which side of the avalanche triangle is most concerning?',
          options: [
            { label: 'All three sides are elevated — terrain, weather, and snowpack all contribute', correct: true, explanation: 'At Considerable danger, the combination matters. The 35° angle is in the prime danger zone, recent wind loading adds stress, and north-facing slopes preserve weak layers longer.' },
            { label: 'Only the terrain side — the slope angle is the main concern', correct: false, explanation: 'Slope angle alone doesn\'t cause avalanches. You need the interplay of terrain, weather (wind loading), and snowpack (weak layers preserved on north aspects).' },
            { label: 'Only the weather side — recent wind is the problem', correct: false, explanation: 'Wind loading is one factor, but it\'s the combination with susceptible terrain (35°) and preserved weak layers (north aspect) that creates the danger.' },
          ],
        },
        connectionPrompt: 'How does the avalanche triangle connect to understanding human factors in decision-making?',
      },
      {
        id: 2, domain: 'avalanche', slug: 'slab-physics',
        title: 'Slab Physics', concept: 'How avalanches release',
        takeaway: 'A slab is a cohesive layer resting on a weak layer. Stress exceeds strength at one point, then the fracture propagates at 100m/s.',
        tool: 'SlabPhysics', difficulty: 'foundation',
        relatedModules: [{ domain: 'avalanche', slug: 'snowpack-layers' }],
        applicationScenario: {
          situation: 'You find a 40cm hard slab sitting on depth hoar while digging a snow pit. What does this tell you about stability?',
          options: [
            { label: 'Extremely dangerous — hard slab on a persistent weak layer', correct: true, explanation: 'Depth hoar is a persistent weak layer that doesn\'t heal. A hard slab on depth hoar means the fracture can propagate far and wide, producing a large, destructive avalanche.' },
            { label: 'Moderately dangerous — the hard slab provides good support', correct: false, explanation: 'Slab hardness doesn\'t indicate stability. A hard slab actually stores more energy and produces larger avalanches when it releases on a weak layer.' },
            { label: 'Safe — depth hoar at the bottom means the snowpack settled well', correct: false, explanation: 'Depth hoar is the most persistent and dangerous weak layer type. It forms from temperature gradient metamorphism and does not bond or settle.' },
          ],
        },
        connectionPrompt: 'How does understanding slab physics connect to identifying snowpack layers?',
      },
      {
        id: 3, domain: 'avalanche', slug: 'slope-angle',
        title: 'Slope Angle', concept: 'The 30-45 degree danger zone',
        takeaway: '93% of avalanche fatalities occur on slopes between 30-45°. Below 30° it rarely slides. Above 45° it sloughs constantly and can\'t build slabs.',
        tool: 'SlopeAngleAnalyzer', difficulty: 'foundation',
        relatedModules: [{ domain: 'avalanche', slug: 'terrain-traps' }],
        applicationScenario: {
          situation: 'Your inclinometer reads 36° on the slope you want to ski. Connected slopes above measure 42°. Should you enter?',
          options: [
            { label: 'No — both angles are in the prime danger zone and the slope above can release onto you', correct: true, explanation: '36° and 42° are both in the 30-45° danger zone. The steeper connected slope above can trigger and run onto your position, even if you\'re on the less steep section.' },
            { label: 'Yes — 36° is near the lower end of the danger zone', correct: false, explanation: '36° is well within the prime avalanche zone. Additionally, the connected 42° slope above adds significant risk from above.' },
            { label: 'Yes — slopes above 40° slough and can\'t build slabs', correct: false, explanation: '42° is still within the slab avalanche zone. Sloughing dominates above 45°, not 42°.' },
          ],
        },
        connectionPrompt: 'How does slope angle analysis connect to terrain trap identification?',
      },
      {
        id: 4, domain: 'avalanche', slug: 'terrain-traps',
        title: 'Terrain Traps', concept: 'Terrain feature recognition',
        takeaway: 'A small slide into a terrain trap kills. Gullies, cliffs, creek beds, and trees amplify consequence. Read the terrain, not just the slope.',
        tool: 'TerrainTrapIdentifier', difficulty: 'intermediate',
        relatedModules: [{ domain: 'avalanche', slug: 'slope-angle' }],
        applicationScenario: {
          situation: 'Your planned descent follows a narrow gully that opens onto a flat bench above a cliff band. Identify the terrain trap risk.',
          options: [
            { label: 'Multiple terrain traps: gully funnels debris, cliff band prevents escape', correct: true, explanation: 'The gully channels avalanche debris and prevents lateral escape. The cliff band below the bench means even a small slide could push you over. This route has extreme consequence.' },
            { label: 'Low risk — the flat bench provides a safe runout zone', correct: false, explanation: 'A bench above a cliff is not a safe runout — it\'s a launching pad. Debris funneled by the gully can push you right off the cliff.' },
            { label: 'Moderate risk — only the gully is a concern', correct: false, explanation: 'Both the gully AND the cliff band are terrain traps. The combination multiplies the consequence of even a small slide.' },
          ],
        },
        connectionPrompt: 'How does terrain trap identification relate to slope angle assessment?',
      },
      {
        id: 5, domain: 'avalanche', slug: 'snowpack-layers',
        title: 'Snowpack Layers', concept: 'Weak layers & crystal types',
        takeaway: 'Rounds bond well. Facets don\'t. Surface hoar is beautiful and deadly. The snowpack remembers every storm and every clear night.',
        tool: 'SnowpackLayerBuilder', difficulty: 'intermediate',
        relatedModules: [{ domain: 'avalanche', slug: 'slab-physics' }, { domain: 'avalanche', slug: 'stability-testing' }],
        applicationScenario: {
          situation: 'After a week of clear, cold nights followed by a 30cm storm, what weak layer are you most concerned about?',
          options: [
            { label: 'Surface hoar buried by the new snow', correct: true, explanation: 'Clear, cold nights produce surface hoar (delicate feathery crystals). When buried by new snowfall, surface hoar creates a dangerous persistent weak layer that doesn\'t bond to the slab above.' },
            { label: 'The interface between old and new snow', correct: false, explanation: 'While storm interfaces can be weak, the specific conditions described (clear, cold nights) produce surface hoar — a much more dangerous and persistent weak layer.' },
            { label: 'Wind slab on the surface of the new snow', correct: false, explanation: 'No wind was mentioned. The key concern is what formed BEFORE the storm during those clear, cold nights — surface hoar.' },
          ],
        },
        connectionPrompt: 'How does understanding snowpack layers connect to both slab physics and stability testing?',
      },
      {
        id: 6, domain: 'avalanche', slug: 'stability-testing',
        title: 'Stability Testing', concept: 'Field stability assessment',
        takeaway: 'CT scores tell you how hard to trigger. ECT tells you if the fracture will propagate. Both matter — a CT15 with full propagation is more dangerous than CT5 with no propagation.',
        tool: 'StabilityTestSimulator', difficulty: 'intermediate',
        relatedModules: [{ domain: 'avalanche', slug: 'snowpack-layers' }],
        applicationScenario: {
          situation: 'Your compression test shows CT12 with a clean planar shear. The ECT shows full propagation (ECTP). Interpret these results.',
          options: [
            { label: 'Dangerous — moderate trigger force but the fracture will propagate widely', correct: true, explanation: 'CT12 means a moderate force triggers the weak layer. Full ECT propagation means the fracture won\'t stay local — it will spread across the slope, producing a large avalanche.' },
            { label: 'Moderate — CT12 is a moderate score so moderate danger', correct: false, explanation: 'The CT score alone is misleading. The full ECT propagation is the critical finding — it means any triggered fracture will spread across the entire slope.' },
            { label: 'Safe — you need hard force (CT > 20) before worrying', correct: false, explanation: 'CT12 can be triggered by a skier. Combined with full propagation, this is a very dangerous result. The propagation potential matters more than trigger force.' },
          ],
        },
        connectionPrompt: 'How does stability testing relate to understanding snowpack layer structure?',
      },
      {
        id: 7, domain: 'avalanche', slug: 'weather-loading',
        title: 'Weather Loading', concept: 'Wind slab formation',
        takeaway: 'Wind is the architect of avalanches. It strips snow from windward slopes and deposits it on lee slopes. 2cm of wind slab equals 20cm of natural snowfall in danger.',
        tool: 'WeatherLoadingSimulator', difficulty: 'intermediate',
        relatedModules: [{ domain: 'weather', slug: 'mountain-winds' }],
        applicationScenario: {
          situation: 'Strong westerly winds have been blowing for 48 hours after a 20cm snowfall. Which aspects are most dangerous?',
          options: [
            { label: 'East-facing slopes — lee side of the prevailing wind', correct: true, explanation: 'West winds strip snow from west-facing windward slopes and deposit it as wind slab on east-facing lee slopes. 48 hours of transport builds substantial wind slabs.' },
            { label: 'West-facing slopes — directly exposed to the wind', correct: false, explanation: 'Windward (west) slopes are actually stripped of snow by wind. The danger is on the lee (east) side where snow is deposited.' },
            { label: 'South-facing slopes — most solar exposure', correct: false, explanation: 'Solar aspect is less relevant here. Wind direction determines where slabs build — lee (east) slopes receive the wind-transported snow.' },
          ],
        },
        connectionPrompt: 'How does wind slab formation connect to understanding mountain wind patterns?',
      },
      {
        id: 8, domain: 'avalanche', slug: 'human-factors',
        title: 'Human Factors', concept: 'The 5 heuristic traps',
        takeaway: 'Familiarity, commitment, expert halo, social proof, scarcity. These biases kill more people than bad snowpack assessment.',
        tool: 'HumanFactorsScenarios', difficulty: 'advanced',
        relatedModules: [{ domain: 'avalanche', slug: 'decision-framework' }],
        applicationScenario: {
          situation: 'Your group of 5 includes two mountain guides who want to ski the steepest line. You\'re uncomfortable but don\'t want to speak up. Which heuristic traps are active?',
          options: [
            { label: 'Expert halo and social proof — deferring to perceived authority and group pressure', correct: true, explanation: 'Expert halo: you trust the guides\' judgment over your own observations. Social proof: the group consensus overrides your instinct. Both are deadly biases that silence valid concerns.' },
            { label: 'Only commitment — you\'ve driven a long way', correct: false, explanation: 'Commitment may be a factor, but the dominant traps here are expert halo (deferring to guides) and social proof (not wanting to dissent from the group).' },
            { label: 'Scarcity — wanting the fresh powder before others get it', correct: false, explanation: 'Scarcity isn\'t the main factor described. The scenario specifically highlights social dynamics: authority figures and group pressure silencing your judgment.' },
          ],
        },
        connectionPrompt: 'How do human factor biases undermine structured decision frameworks?',
      },
      {
        id: 9, domain: 'avalanche', slug: 'decision-framework',
        title: 'Decision Framework', concept: 'Structured decision-making',
        takeaway: 'A checklist is not a guarantee, but it\'s better than gut feel. Systematic evaluation catches what intuition misses.',
        tool: 'DecisionFramework', difficulty: 'advanced',
        relatedModules: [{ domain: 'weather', slug: 'thunderstorms' }, { domain: 'avalanche', slug: 'human-factors' }],
        applicationScenario: {
          situation: 'Considerable danger, 35° north-facing slope, recent wind loading, party of 3. Apply the decision framework.',
          options: [
            { label: 'Multiple red flags — choose alternative terrain below 30° or different aspect', correct: true, explanation: 'Considerable + prime slope angle + north aspect (preserves weak layers) + wind loading = too many risk factors. A systematic framework catches this stacking of dangers that gut feel might rationalize away.' },
            { label: 'Acceptable — proceed with spacing and escape route planned', correct: false, explanation: 'Spacing and escape routes mitigate consequence but don\'t reduce the high probability of triggering. The systematic framework says: too many red flags, choose different terrain.' },
            { label: 'Need more data — dig a pit before deciding', correct: false, explanation: 'A pit test here would expose you to the hazard you\'re trying to assess. The decision framework says you already have enough red flags to choose alternative terrain.' },
          ],
        },
        connectionPrompt: 'How does systematic avalanche decision-making parallel thunderstorm risk assessment?',
      },
      {
        id: 10, domain: 'avalanche', slug: 'companion-rescue',
        title: 'Companion Rescue', concept: 'The 18-minute window',
        takeaway: 'Survival drops from 90% to 30% after 18 minutes. Your partners are your lifeline. Practice until the search is automatic.',
        tool: 'CompanionRescueTimer', difficulty: 'advanced',
        applicationScenario: {
          situation: 'Your partner is buried. You saw them disappear 50m upslope 2 minutes ago. What is your first action?',
          options: [
            { label: 'Switch beacon to search, move to last-seen point, begin signal search', correct: true, explanation: 'Immediately switch to search mode and move to the last-seen point. You have 16 minutes left in the critical survival window. Signal search, then fine search, then probe, then dig.' },
            { label: 'Call for helicopter rescue immediately', correct: false, explanation: 'A helicopter takes 20-45 minutes minimum. Your partner\'s survival probability drops from 90% to 30% at 18 minutes. Companion rescue is their only chance.' },
            { label: 'Probe the debris randomly to find them faster', correct: false, explanation: 'Random probing is extremely inefficient. Your beacon can locate them in 2-3 minutes. Follow the signal search protocol: coarse → fine → probe → dig.' },
          ],
        },
        connectionPrompt: 'How does the urgency of companion rescue connect to overall avalanche safety preparation?',
      },
    ],
  },
  {
    id: 'flying',
    name: 'Flying',
    subtitle: 'Thermal Flying',
    description: 'Core thermals, glide between lift, and fly cross-country. Turn invisible energy into distance.',
    book: 'Thermal Flying',
    author: 'Burkhard Martens',
    accent: '#E8A87C',
    accentRgb: '232, 168, 124',
    modules: [
      {
        id: 1, domain: 'flying', slug: 'soaring-fundamentals',
        title: 'Soaring Fundamentals', concept: 'Types of usable lift',
        takeaway: 'Three types of lift: ridge, thermal, convergence. Each has a season, a time of day, and a signature in the sky.',
        tool: 'SoaringFundamentals', difficulty: 'foundation',
        relatedModules: [{ domain: 'weather', slug: 'atmosphere' }],
        applicationScenario: {
          situation: 'You\'re at a coastal ridge launch site. Wind is onshore at 15 knots, cumulus forming inland. What lift types are available?',
          options: [
            { label: 'Ridge lift at the coast, thermals inland — transition possible', correct: true, explanation: '15kt onshore wind creates ridge lift along the coastal cliffs. Cumulus inland mark thermal activity. You can launch in ridge lift and transition to thermals as the day develops.' },
            { label: 'Only ridge lift — thermals don\'t work near the coast', correct: false, explanation: 'The cumulus inland prove thermals are working. Coastal thermals are weaker due to marine air, but inland thermals are fully active.' },
            { label: 'Only thermals — 15 knots is too strong for ridge lift', correct: false, explanation: '15 knots is ideal for ridge lift. Ridge soaring works well from about 12-25 knots depending on the terrain.' },
          ],
        },
        connectionPrompt: 'How does understanding atmospheric layers connect to the fundamentals of soaring?',
      },
      {
        id: 2, domain: 'flying', slug: 'reading-sky',
        title: 'Reading the Sky', concept: 'Visual cues for thermals',
        takeaway: 'Cumulus with flat bases and cauliflower tops mark active thermals. Dark bases mean strong lift. Wispy edges mean dying lift.',
        tool: 'ReadingTheSky', difficulty: 'foundation',
        relatedModules: [{ domain: 'weather', slug: 'clouds' }],
        applicationScenario: {
          situation: 'You see a line of cumulus with dark flat bases trending northwest. Some tops are starting to spread out and flatten. What do you read?',
          options: [
            { label: 'Active thermal street, but the spreading tops indicate an inversion — climb will be capped', correct: true, explanation: 'Dark bases mean strong thermals. A line of cumulus is a thermal street — reliable lift along its length. Spreading, flattening tops indicate an inversion layer limiting vertical development.' },
            { label: 'Thunderstorm development — the spreading tops are anvils forming', correct: false, explanation: 'Anvils form from cumulonimbus at much greater height. Spreading cumulus tops indicate a stable layer (inversion) capping convection, not storm development.' },
            { label: 'Dying thermal conditions — the clouds are dissipating', correct: false, explanation: 'Dark bases indicate active, strong thermals. The spreading is from hitting an inversion, not from dying. These are still very usable for soaring.' },
          ],
        },
        connectionPrompt: 'How does reading the sky connect to cloud classification and identification?',
      },
      {
        id: 3, domain: 'flying', slug: 'thermal-entry',
        title: 'Thermal Entry', concept: 'Approach technique',
        takeaway: 'Enter tangentially, never head-on. A thermal is a column — you need to join its rotation, not punch through it.',
        tool: 'ThermalEntry', difficulty: 'intermediate',
        relatedModules: [{ domain: 'weather', slug: 'thermals' }],
        applicationScenario: {
          situation: 'You\'re gliding toward a thermal marked by a circling hawk. You feel a strong surge on your right wing. How should you enter?',
          options: [
            { label: 'Turn right immediately — enter tangentially on the side where you felt the surge', correct: true, explanation: 'The surge on your right wing means the thermal core is to your right. Turn toward it to enter tangentially, joining the column\'s rotation rather than punching through.' },
            { label: 'Continue straight through to find the center', correct: false, explanation: 'Flying straight through a thermal wastes the lift. You\'ll exit the other side in sink. The tangential entry lets you catch the edge and spiral into the core.' },
            { label: 'Turn left to circle back for a better approach', correct: false, explanation: 'The thermal is RIGHT NOW to your right. Turning away wastes time and altitude. Enter immediately on the side where you felt lift.' },
          ],
        },
        connectionPrompt: 'How does thermal entry technique connect to understanding how thermals form?',
      },
      {
        id: 4, domain: 'flying', slug: 'centering',
        title: 'Centering', concept: 'Core centering technique',
        takeaway: 'When the vario peaks, flatten your turn. When it drops, steepen. Shift your circle toward the strongest lift, not away from the sink.',
        tool: 'CenteringGame', difficulty: 'intermediate',
        relatedModules: [{ domain: 'weather', slug: 'thermals' }],
        applicationScenario: {
          situation: 'You\'re circling in a thermal. The vario shows +3 m/s on the south side and +1 m/s on the north. How do you adjust?',
          options: [
            { label: 'Shift your circle south — flatten the turn when the vario peaks, steepen when it drops', correct: true, explanation: 'The core is south of your current circle. Flatten your bank when the vario reads +3 (south) to widen your arc toward the core. Steepen when it drops to +1 (north) to cut back toward the stronger lift.' },
            { label: 'Tighten your turn radius to stay in the strongest part', correct: false, explanation: 'A tighter circle doesn\'t shift your position. You need to move the center of your circle toward the stronger lift by varying your bank angle throughout the turn.' },
            { label: 'Fly straight south to find the core', correct: false, explanation: 'Breaking out of your turn risks losing the thermal entirely. The technique is to gradually shift your circle using bank angle modulation, not to fly straight.' },
          ],
        },
        connectionPrompt: 'How does centering technique relate to understanding thermal structure and behavior?',
      },
      {
        id: 5, domain: 'flying', slug: 'climbing',
        title: 'Climbing to Cloudbase', concept: 'Altitude optimization',
        takeaway: 'Leave the thermal before cloudbase, not at it. Cloud suck is real and disorienting. The best altitude to leave is the one that gets you to the next thermal.',
        tool: 'ClimbingToCloudbase', difficulty: 'intermediate',
        relatedModules: [{ domain: 'weather', slug: 'lapse-rates' }],
        applicationScenario: {
          situation: 'You\'re climbing at +2 m/s at 5,000ft. Cloudbase is estimated at 6,500ft. The next thermal source is 8km away. When should you leave?',
          options: [
            { label: 'Leave around 6,000ft — high enough to reach the next thermal, safe margin below cloudbase', correct: true, explanation: 'At 6,000ft you have 500ft margin below cloudbase (avoiding cloud suck) and enough altitude to glide 8km to the next thermal. Staying longer gives diminishing returns as the thermal weakens near the base.' },
            { label: 'Climb all the way to cloudbase for maximum altitude', correct: false, explanation: 'Cloud suck near cloudbase is dangerous and disorienting. The lift also weakens near the base. Leave with margin to avoid being pulled into the cloud.' },
            { label: 'Leave immediately — any climb rate below +3 is not worth circling for', correct: false, explanation: '+2 m/s is a good climb rate. With 1,500ft still to gain and the next thermal 8km away, it\'s worth climbing higher to ensure you can make the glide.' },
          ],
        },
        connectionPrompt: 'How do lapse rates affect your decisions about climbing to cloudbase?',
      },
      {
        id: 6, domain: 'flying', slug: 'valley-flying',
        title: 'Valley Flying', concept: 'Valley wind systems',
        takeaway: 'Fly the sunny side in the morning. Transition to the shaded side after the thermals cross. The valley wind tells you the time.',
        tool: 'ValleyFlying', difficulty: 'intermediate',
        relatedModules: [{ domain: 'weather', slug: 'mountain-winds' }],
        applicationScenario: {
          situation: 'It\'s 1pm in a north-south alpine valley. The east slope is in full sun, the west slope is partially shaded. Where should you fly?',
          options: [
            { label: 'The east (sunny) slope — it has been heating longest and thermals are strongest there', correct: true, explanation: 'By 1pm, the east slope has had full morning sun and is producing the strongest thermals. The west slope is just starting to heat up. Fly the sun-heated side for the best lift.' },
            { label: 'The west slope — it will have the freshest thermals', correct: false, explanation: 'The west slope is just beginning to heat up and thermals there are weak. The east slope has been heating all morning and has the strongest, most developed thermals.' },
            { label: 'The valley center — convergence lift from both slopes', correct: false, explanation: 'Valley center convergence develops later in the afternoon. At 1pm, the strongest lift is on the sun-heated east slope.' },
          ],
        },
        connectionPrompt: 'How does understanding mountain wind patterns improve valley flying tactics?',
      },
      {
        id: 7, domain: 'flying', slug: 'speed-to-fly',
        title: 'Speed-to-Fly', concept: 'MacCready theory',
        takeaway: 'Fly faster between strong thermals, slower between weak ones. The McCready ring turns this intuition into math — and math into distance.',
        tool: 'SpeedToFly', difficulty: 'advanced',
        relatedModules: [{ domain: 'flying', slug: 'between-thermals' }],
        applicationScenario: {
          situation: 'Your expected climb rate in the next thermal is 2 m/s. You\'re currently in 1 m/s sink between thermals. What speed strategy is optimal?',
          options: [
            { label: 'Fly faster than best glide — McCready setting of 2 adds speed proportional to expected climb', correct: true, explanation: 'With a McCready setting of 2 (expected climb), you fly faster than min-sink to trade altitude for speed. In sink, you speed up even more. The math shows this minimizes total time between thermals.' },
            { label: 'Fly at minimum sink speed to conserve altitude', correct: false, explanation: 'Min sink speed conserves altitude but wastes time. McCready theory shows that flying faster (losing more altitude but covering ground quicker) is optimal when strong thermals await.' },
            { label: 'Fly at best L/D speed — maximum distance per altitude lost', correct: false, explanation: 'Best L/D is optimal only when McCready = 0 (no expected climb ahead). With a 2 m/s thermal ahead, you should fly faster than best L/D to minimize total flight time.' },
          ],
        },
        connectionPrompt: 'How does speed-to-fly theory connect to managing transitions between thermals?',
      },
      {
        id: 8, domain: 'flying', slug: 'xc-tactics',
        title: 'XC Tactics', concept: 'Cross-country route planning',
        takeaway: 'Plan your route along energy lines — ridges, dark fields, convergence zones. The shortest distance is rarely the fastest.',
        tool: 'XCTactics', difficulty: 'advanced',
        relatedModules: [{ domain: 'weather', slug: 'convergence' }],
        applicationScenario: {
          situation: 'You\'re planning a 100km triangle. Wind is from the west at 20km/h. Cumulus streets are aligned NW-SE. How do you plan?',
          options: [
            { label: 'Route along the cloud streets for the upwind legs, use tailwind for the final leg', correct: true, explanation: 'Cloud streets are highways of lift — fly along them, not across. Plan upwind legs along the streets (NW-SE) when you have altitude and energy. Save the tailwind (eastward) leg for last when you may be lower.' },
            { label: 'Fly the shortest route regardless of cloud streets', correct: false, explanation: 'The shortest distance between thermals is across the streets — through sink. Flying along cloud streets is longer but much faster because you\'re continuously in lift.' },
            { label: 'Always fly into the wind first to get the hardest leg done', correct: false, explanation: 'The strategy isn\'t about wind direction alone. Route along energy lines (cloud streets) for efficiency. Wind affects your ground speed but lift availability matters more.' },
          ],
        },
        connectionPrompt: 'How does understanding convergence zones improve cross-country route planning?',
      },
      {
        id: 9, domain: 'flying', slug: 'convergence-sea-breeze',
        title: 'Convergence & Sea Breeze', concept: 'Riding convergence lines',
        takeaway: 'Sea breeze fronts push inland all day. Where they meet valley thermals, a convergence zone forms — the strongest, most reliable lift of the day.',
        tool: 'ConvergenceSeaBreeze', difficulty: 'advanced',
        relatedModules: [{ domain: 'weather', slug: 'convergence' }, { domain: 'weather', slug: 'mountain-waves' }],
        applicationScenario: {
          situation: 'It\'s afternoon and you see a distinct cloud line 30km inland, parallel to the coast. What is it and how would you use it?',
          options: [
            { label: 'Sea breeze convergence — fly along it for sustained strong lift', correct: true, explanation: 'The sea breeze front pushes inland during the day. Where it meets the warmer inland air, a convergence line forms with strong, reliable lift. Fly along the line, not across it.' },
            { label: 'A cold front approaching from the sea', correct: false, explanation: 'Sea breeze convergence lines move inland gradually (not front-like speed) and are a daily thermal phenomenon, not a synoptic weather system.' },
            { label: 'Cloud development to avoid — instability is too high', correct: false, explanation: 'Sea breeze convergence clouds indicate strong organized lift, not dangerous instability. This is some of the best lift available for cross-country flying.' },
          ],
        },
        connectionPrompt: 'How does sea breeze convergence relate to understanding convergence lift and mountain wave phenomena?',
      },
      {
        id: 10, domain: 'flying', slug: 'between-thermals',
        title: 'Between Thermals', concept: 'Glide management',
        takeaway: 'You don\'t lose altitude in sink — you lose it in time. Speed is altitude. But too much speed and you arrive low. The art is the transition.',
        tool: 'BetweenThermals', difficulty: 'advanced',
        relatedModules: [{ domain: 'flying', slug: 'speed-to-fly' }],
        applicationScenario: {
          situation: 'You\'re at 4,000ft AGL, 5km from the next likely thermal source, in 1 m/s sink. Your best L/D is 40:1 at 90km/h. Will you arrive with enough altitude?',
          options: [
            { label: 'Marginal — you\'ll arrive around 1,500ft, which is low but workable if the thermal is strong', correct: true, explanation: 'At 40:1 in still air: 5km needs 125m (410ft) altitude loss. But 1 m/s sink at 90km/h means ~200 seconds × 1 m/s = 200m extra loss. Total: ~1,050ft lost from 4,000ft = arriving ~2,950ft. However, speeding up per McCready increases sink rate, making it more like ~1,500ft arrival.' },
            { label: 'Comfortable — 40:1 glide ratio means you only need 125m for 5km', correct: false, explanation: 'Still-air glide ratio doesn\'t account for sink. The 1 m/s sink adds significantly to altitude loss, especially if you speed up per McCready theory.' },
            { label: 'Impossible — you need to find closer lift immediately', correct: false, explanation: 'While the margins are tight, 4,000ft is enough altitude to cover 5km in sink. You\'ll arrive low but should find the thermal before getting dangerously close to the ground.' },
          ],
        },
        connectionPrompt: 'How does managing the glide between thermals connect to speed-to-fly theory?',
      },
    ],
  },
];

export const TOTAL_MODULES_PER_DOMAIN = 10;

export function getDomain(id: DomainId): Domain | undefined {
  return domains.find(d => d.id === id);
}

export function getModule(domainId: DomainId, slug: string): Module | undefined {
  const domain = getDomain(domainId);
  return domain?.modules.find(m => m.slug === slug);
}

export function getModuleById(domainId: DomainId, moduleId: number): Module | undefined {
  const domain = getDomain(domainId);
  return domain?.modules.find(m => m.id === moduleId);
}
