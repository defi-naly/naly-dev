import type { DomainId } from './domains';

export interface ScenarioChoice {
  label: string;
  nextNodeId: string;
  optimal?: boolean;
  feedback: string;
}

export interface ScenarioNode {
  id: string;
  narrative: string;
  choices?: ScenarioChoice[];
  isTerminal?: boolean;
  score?: number;       // 0-100, only on terminal nodes
  lessons?: string[];
}

export interface ScenarioRequirement {
  domain: DomainId;
  moduleSlug: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'intermediate' | 'advanced' | 'expert';
  domains: DomainId[];
  testedModules: string[];   // `${domain}-${slug}` keys
  requirements: ScenarioRequirement[];
  startNodeId: string;
  nodes: Record<string, ScenarioNode>;
}

export const scenarios: Scenario[] = [
  {
    id: 'spring-powder',
    title: 'Spring Powder Day',
    description: 'A warm front has passed overnight, followed by clearing skies and dropping temperatures. Fresh snow covers the mountains. Your group wants to ski a north-facing bowl.',
    difficulty: 'intermediate',
    domains: ['weather', 'avalanche'],
    testedModules: ['weather-fronts', 'avalanche-weather-loading', 'avalanche-human-factors', 'avalanche-slope-angle'],
    requirements: [
      { domain: 'weather', moduleSlug: 'fronts' },
      { domain: 'avalanche', moduleSlug: 'weather-loading' },
      { domain: 'avalanche', moduleSlug: 'slope-angle' },
    ],
    startNodeId: 'start',
    nodes: {
      'start': {
        id: 'start',
        narrative: 'It\'s 7am. The forecast shows a warm front passed overnight bringing 25cm of new snow, followed by NW winds at 30km/h. Skies are clearing. Your group of 4 is eager to hit a north-facing bowl at 2800m. The avalanche danger is rated Considerable. What do you do first?',
        choices: [
          { label: 'Check the avalanche bulletin and assess wind loading direction', nextNodeId: 'assess', optimal: true, feedback: 'Good — systematic assessment before committing.' },
          { label: 'Head straight to the bowl — the powder won\'t last', nextNodeId: 'rush', feedback: 'Scarcity bias is active. Fresh snow + Considerable danger demands assessment first.' },
          { label: 'Suggest a south-facing alternative instead', nextNodeId: 'south', feedback: 'Considering alternatives is smart, but you should assess the conditions first to make an informed choice.' },
        ],
      },
      'assess': {
        id: 'assess',
        narrative: 'The bulletin confirms Considerable danger on north aspects above 2400m. NW winds have been loading east and north-east aspects. Your target bowl faces north with a connected east-facing slope above. The bowl has a runout into a narrow gully. How do you proceed?',
        choices: [
          { label: 'The terrain trap (gully) and wind-loaded aspects make this too risky — choose different terrain', nextNodeId: 'good-decision', optimal: true, feedback: 'Multiple red flags: Considerable danger + wind-loaded aspects + terrain trap. Excellent risk assessment.' },
          { label: 'Proceed but stay on the true north section, avoiding the NE-loaded part', nextNodeId: 'partial', feedback: 'You identified the wind loading, but the terrain trap (gully runout) amplifies the consequence of even a small slide on any part of this slope.' },
          { label: 'Dig a pit at the top to assess before committing', nextNodeId: 'pit', feedback: 'Digging a pit on a slope you\'re concerned about exposes you to the hazard. The bulletin and terrain assessment already provide enough red flags.' },
        ],
      },
      'rush': {
        id: 'rush',
        narrative: 'You skin up quickly. At 2600m, you notice cracking in the new snow around your skis. A whumpf sound echoes across the slope. What do you do?',
        choices: [
          { label: 'Stop immediately, retreat down your skin track one at a time', nextNodeId: 'late-retreat', optimal: true, feedback: 'Shooting cracks and whumpfing are clear signs of instability. Retreating is the right call, even though you should have assessed before climbing.' },
          { label: 'Continue — whumpfing is common after new snow and doesn\'t mean it will slide', nextNodeId: 'bad-outcome', feedback: 'Whumpfing IS the weak layer collapsing under your weight. This is one of the strongest signs of instability.' },
        ],
      },
      'good-decision': {
        id: 'good-decision',
        narrative: 'You choose a wind-sheltered, south-facing slope at 30° with an open runout. The skiing is excellent — 20cm of settled powder on a supportive base. Your group has a great day with wide safety margins.',
        isTerminal: true,
        score: 95,
        lessons: [
          'Systematic assessment of avalanche bulletin, wind loading, and terrain traps prevented exposure to a high-risk slope.',
          'Choosing alternative terrain doesn\'t mean missing out — good terrain selection often leads to better skiing.',
          'The gully runout was a critical terrain trap that would have amplified any slide\'s consequence.',
        ],
      },
      'partial': {
        id: 'partial',
        narrative: 'You ski the true north section. The snow is beautiful but you hear a whumpf on your second turn. You freeze, then carefully ski to the side of the bowl. Nothing releases, but the red flag is clear.',
        isTerminal: true,
        score: 45,
        lessons: [
          'You correctly identified wind loading but underestimated the terrain trap risk.',
          'The gully runout means even a small slide could have been fatal.',
          'Considerable danger + new snow + terrain traps = enough red flags to choose completely different terrain.',
        ],
      },
      'pit': {
        id: 'pit',
        narrative: 'You expose yourself to the hazard while digging. Your CT shows 8 with a clean shear on a crust/facet interface. ECT propagates fully. The results confirm what the bulletin already told you — this slope is dangerous.',
        isTerminal: true,
        score: 40,
        lessons: [
          'The avalanche bulletin and terrain assessment provided enough information. Digging exposed you unnecessarily.',
          'A decision framework should have caught the multiple red flags before you reached the slope.',
          'CT8 with full ECT propagation means human-triggering is very likely.',
        ],
      },
      'south': {
        id: 'south',
        narrative: 'Good instinct to consider alternatives. A south-facing slope at similar elevation has been warming since sunrise. You need to assess: will the warming make it more or less stable?',
        choices: [
          { label: 'South aspects will be warming and potentially unstable — look for a lower-angle option under 30°', nextNodeId: 'good-decision', optimal: true, feedback: 'Correct. Morning solar warming on south aspects can trigger wet loose avalanches. A lower angle mitigates the risk.' },
          { label: 'South aspects are fine because the wind loaded north and east', nextNodeId: 'south-risk', feedback: 'Wind loading isn\'t the only concern on a day rated Considerable. Solar warming on south aspects creates a different hazard.' },
        ],
      },
      'south-risk': {
        id: 'south-risk',
        narrative: 'You ski a south-facing 38° slope. By 10am, the surface is warming rapidly. A wet loose slide releases above you — small, but it pushes you into rocks. Minor injuries but a lesson learned about solar warming.',
        isTerminal: true,
        score: 35,
        lessons: [
          'South-facing slopes avoid wind loading but introduce solar warming hazard.',
          'Steeper south aspects (>35°) can release wet loose avalanches as temperatures rise.',
          'Choosing safer terrain means managing angle AND aspect AND timing.',
        ],
      },
      'late-retreat': {
        id: 'late-retreat',
        narrative: 'You retreat safely, spacing yourselves along the skin track. Back at the car, you reassess and find a lower-angle option. The day is saved, but the signs of instability were clear from the start.',
        isTerminal: true,
        score: 55,
        lessons: [
          'Recognizing instability signs (cracks, whumpfing) and retreating was the right call.',
          'However, the avalanche bulletin and conditions should have prevented you from being on this slope in the first place.',
          'Scarcity bias (wanting fresh powder) drove the initial decision to skip assessment.',
        ],
      },
      'bad-outcome': {
        id: 'bad-outcome',
        narrative: 'The slope releases on your third turn. A 40cm deep slab fractures across 200m of the bowl. The debris funnels into the gully below. Two of your group are caught; one is partially buried.',
        isTerminal: true,
        score: 10,
        lessons: [
          'Whumpfing and shooting cracks are the clearest possible signs of instability.',
          'Continuing after these warnings showed commitment bias — too invested in the objective to turn back.',
          'The terrain trap (gully) amplified the consequence, exactly as predicted.',
          'Multiple failures: no assessment, ignored red flags, continued despite clear danger signs.',
        ],
      },
    },
  },
  {
    id: 'afternoon-xc',
    title: 'Afternoon XC Flight',
    description: 'A classic summer thermal day with sea breeze convergence developing. You\'re planning a 60km cross-country triangle from a mountain launch site.',
    difficulty: 'advanced',
    domains: ['weather', 'flying'],
    testedModules: ['weather-thermals', 'weather-convergence', 'flying-speed-to-fly', 'flying-xc-tactics', 'flying-between-thermals'],
    requirements: [
      { domain: 'weather', moduleSlug: 'thermals' },
      { domain: 'flying', moduleSlug: 'speed-to-fly' },
      { domain: 'flying', moduleSlug: 'xc-tactics' },
    ],
    startNodeId: 'start',
    nodes: {
      'start': {
        id: 'start',
        narrative: 'It\'s 12:30pm at a 1500m launch site. Cumulus are well-developed with bases at 2800m. A sea breeze convergence line is expected to form 30km inland by 2pm. Wind is light NW at 10km/h. You want to fly a 60km triangle. How do you plan your route?',
        choices: [
          { label: 'Route the first two legs to intercept the convergence line, use it for the longest leg, tailwind home', nextNodeId: 'good-plan', optimal: true, feedback: 'Excellent — using the convergence line as an energy highway for the longest leg maximizes your speed and altitude.' },
          { label: 'Fly the triangle as a shortest-distance equilateral', nextNodeId: 'geometric', feedback: 'The shortest route ignores energy lines. In XC, the fastest route follows lift sources, not straight lines.' },
          { label: 'Wait for the convergence to develop before launching', nextNodeId: 'wait', feedback: 'The convergence won\'t reach you until 2pm. You\'re wasting the best thermal period (12-2pm) by waiting.' },
        ],
      },
      'good-plan': {
        id: 'good-plan',
        narrative: 'You launch and climb to 2600m in a strong 3 m/s thermal. The first turnpoint is 15km NE. You\'re in good lift with cloud streets aligned NW-SE. How do you fly the first leg?',
        choices: [
          { label: 'Dolphin along the cloud street — McCready 3, speed up in sink', nextNodeId: 'dolphin', optimal: true, feedback: 'Cloud streets let you dolphin — pull up in lift, push over in sink. With 3 m/s expected climbs, McCready 3 is correct.' },
          { label: 'Climb to cloudbase in every thermal for maximum altitude', nextNodeId: 'slow-climb', feedback: 'Topping out every thermal is slow. With reliable cloud streets, you should maintain speed and use McCready theory.' },
        ],
      },
      'geometric': {
        id: 'geometric',
        narrative: 'The first leg takes you perpendicular to the cloud streets. You cross multiple sink zones between thermals and lose altitude rapidly. At 1800m, you\'re 10km from the turnpoint with no obvious lift ahead.',
        choices: [
          { label: 'Adjust course to fly along the nearest cloud street, even if it\'s not direct', nextNodeId: 'adjust', optimal: true, feedback: 'Adapting to the conditions. Cloud streets are energy lines — fly along them even if it adds distance.' },
          { label: 'Push on toward the turnpoint — you have enough altitude', nextNodeId: 'push', feedback: 'At 1800m with 10km to go and crossing cloud streets, you\'ll likely end up too low.' },
        ],
      },
      'dolphin': {
        id: 'dolphin',
        narrative: 'You reach the first turnpoint at 2400m. Ahead, you see the convergence line forming — a distinct cloud line 20km to the south. The second turnpoint is 25km SW. Do you fly direct or intercept the convergence?',
        choices: [
          { label: 'Intercept the convergence first, then ride it toward the second turnpoint', nextNodeId: 'convergence', optimal: true, feedback: 'Brilliant. The convergence line will give you sustained lift along its length, making the 25km leg almost effortless.' },
          { label: 'Fly direct to the second turnpoint in the thermal air', nextNodeId: 'direct', feedback: 'Direct works but misses the convergence. You\'ll be thermal hopping instead of riding continuous lift.' },
        ],
      },
      'convergence': {
        id: 'convergence',
        narrative: 'You intercept the convergence at 2200m. Immediately, your vario shows sustained +2 to +4 m/s. You fly along the line at 80km/h, barely losing altitude. The second turnpoint passes beneath you at 2600m. The final leg is 20km home with a light tailwind.',
        choices: [
          { label: 'Leave the convergence, glide home with tailwind — McCready 4 for speed', nextNodeId: 'fast-finish', optimal: true, feedback: 'With 2600m, 20km to go, and tailwind, you can fly fast. McCready 4 gets you home quickly.' },
          { label: 'Stay on the convergence line as long as possible, even if it takes you past home', nextNodeId: 'overshoot', feedback: 'The convergence is heading away from home. You\'ve already turned the second point — time to go home, not chase lift.' },
        ],
      },
      'fast-finish': {
        id: 'fast-finish',
        narrative: 'You arrive home at 1800m after a 60km triangle in 2 hours 15 minutes. The convergence line gave you the speed advantage that made the triangle possible. A textbook XC flight.',
        isTerminal: true,
        score: 95,
        lessons: [
          'Routing along energy lines (cloud streets + convergence) made the triangle achievable.',
          'McCready theory optimized your speed between lift sources.',
          'Intercepting the convergence line was the key tactical decision that turned a good flight into an excellent one.',
        ],
      },
      'direct': {
        id: 'direct',
        narrative: 'You thermal-hop to the second turnpoint, arriving at 2000m after 45 minutes. The final leg home is 20km with light tailwind. You make it, but the flight took 3 hours and felt labored.',
        isTerminal: true,
        score: 65,
        lessons: [
          'The triangle was completed but slowly. The convergence line would have halved the time for the second leg.',
          'In XC, energy lines (cloud streets, convergence) are highways — use them even if the route is longer.',
        ],
      },
      'slow-climb': {
        id: 'slow-climb',
        narrative: 'You top out every thermal at cloudbase (2800m) but your average speed is only 25km/h. After 40 minutes you\'ve covered only 12km. The day is passing and the convergence is forming without you.',
        isTerminal: true,
        score: 45,
        lessons: [
          'Climbing to cloudbase in every thermal wastes time. McCready theory says: fly faster when strong thermals are ahead.',
          'With cloud streets available, dolphining is far more efficient than stopping to circle.',
          'Time management is critical in XC — the best conditions don\'t last all day.',
        ],
      },
      'wait': {
        id: 'wait',
        narrative: 'You wait until 2pm to launch. The convergence has formed but is now 30km away. Meanwhile, the best thermal period (12-2pm) has passed. Thermals are weakening. You manage a 20km out-and-return but the triangle is not achievable.',
        isTerminal: true,
        score: 30,
        lessons: [
          'The best thermal period is typically 12-3pm. Waiting until 2pm wasted the strongest conditions.',
          'Launch early in thermal conditions and adapt to convergence as it develops — don\'t wait for it.',
          'Time-on-task is your most valuable resource in XC flying.',
        ],
      },
      'adjust': {
        id: 'adjust',
        narrative: 'You divert to a cloud street and climb back to 2400m. You\'ve lost 20 minutes but recovered the flight. You complete a shortened 45km triangle.',
        isTerminal: true,
        score: 55,
        lessons: [
          'Adapting to the conditions saved the flight, but the initial route planning cost you time and distance.',
          'Always plan your route along energy lines. The shortest distance is rarely the fastest in XC.',
          'Reading cloud streets from the air is a critical skill — better late than never.',
        ],
      },
      'push': {
        id: 'push',
        narrative: 'You push on but hit extended sink between cloud streets. At 1200m, 5km short of the turnpoint, you\'re forced to land in a field. Flight over.',
        isTerminal: true,
        score: 20,
        lessons: [
          'Crossing perpendicular to cloud streets means crossing sink zones. Altitude bleeds fast.',
          'When low, your options shrink. Better to divert to a cloud street early than push into sink.',
          'Altitude = options. Speed-to-fly theory helps, but only if there\'s lift ahead.',
        ],
      },
      'overshoot': {
        id: 'overshoot',
        narrative: 'The convergence carries you 10km past your home field. You now face a 10km final glide into headwind. You arrive home at 900m — barely above the landing circuit. Stressful finish.',
        isTerminal: true,
        score: 50,
        lessons: [
          'The convergence is a tool, not a destination. Know when to leave it.',
          'Final glide planning requires accounting for wind — headwind on the return leg costs more altitude than expected.',
          'Discipline to leave good lift for the goal is a key XC skill.',
        ],
      },
    },
  },
  {
    id: 'post-storm-tour',
    title: 'Post-Storm Ski Tour',
    description: 'Two days after a major storm cycle with 60cm of new snow. Danger is dropping but persistent weak layers lurk. Your team plans a ski tour through varied terrain.',
    difficulty: 'advanced',
    domains: ['avalanche', 'weather'],
    testedModules: ['avalanche-snowpack-layers', 'avalanche-stability-testing', 'avalanche-terrain-traps', 'avalanche-decision-framework', 'weather-mountain-winds'],
    requirements: [
      { domain: 'avalanche', moduleSlug: 'snowpack-layers' },
      { domain: 'avalanche', moduleSlug: 'stability-testing' },
      { domain: 'avalanche', moduleSlug: 'decision-framework' },
    ],
    startNodeId: 'start',
    nodes: {
      'start': {
        id: 'start',
        narrative: 'Day 3 after a 60cm storm. The bulletin shows danger dropping from High to Considerable on north aspects, Moderate on south. A persistent weak layer of depth hoar from January is noted 80cm deep. Winds were strong NW during the storm. Your planned tour crosses a north-facing col at 2600m. How do you assess?',
        choices: [
          { label: 'Dig a pit on a representative slope before the col to check the depth hoar layer', nextNodeId: 'pit', optimal: true, feedback: 'Systematic field assessment of the persistent weak layer. Choose a safe, representative spot — not on the slope you want to ski.' },
          { label: 'The danger is dropping, Considerable is manageable — proceed with caution', nextNodeId: 'proceed', feedback: 'Considerable danger on north aspects with a known persistent weak layer is serious. "Proceed with caution" isn\'t a plan.' },
          { label: 'Skip the col entirely and stay on south-facing terrain below 2400m', nextNodeId: 'conservative', feedback: 'Very conservative — safe, but you should verify with field observations before writing off all terrain.' },
        ],
      },
      'pit': {
        id: 'pit',
        narrative: 'At a safe site near the col approach (28°, north-facing), your pit reveals: 55cm new snow over a 1cm rain crust, then 25cm of faceted snow above the depth hoar layer at 80cm. CT shows 18 on the depth hoar, ECT no propagation. CT shows 10 on the crust/new snow interface, ECT full propagation. What\'s your assessment?',
        choices: [
          { label: 'Two problems: the storm slab on the crust is reactive (CT10+prop). The depth hoar is harder to trigger but persistent. Avoid steep north-facing terrain.', nextNodeId: 'correct-read', optimal: true, feedback: 'Excellent pit interpretation. Two weak layers, two different risk profiles. The storm slab is the immediate threat.' },
          { label: 'CT18 on depth hoar means it\'s hard to trigger — the main problem is solved', nextNodeId: 'missed-slab', feedback: 'You focused on the depth hoar but missed the more reactive storm slab. CT10 with full propagation is a clear human-trigger risk.' },
          { label: 'Everything looks bad — abandon the tour', nextNodeId: 'conservative', feedback: 'The pit shows nuance. The depth hoar is hard to trigger (CT18, no prop). But the storm slab IS reactive. You can use this information to choose terrain wisely.' },
        ],
      },
      'correct-read': {
        id: 'correct-read',
        narrative: 'Based on your assessment: storm slab on the crust is the primary concern (CT10, full propagation), especially on wind-loaded aspects. The col traverse crosses a 34° north-facing slope with NE wind-loading. What\'s your plan?',
        choices: [
          { label: 'Reroute to cross the col at a lower-angle section (<30°), avoiding the wind-loaded aspect', nextNodeId: 'reroute-success', optimal: true, feedback: 'Managing both slope angle and wind loading. This terrain choice reduces risk from both the storm slab and potential wind slab.' },
          { label: 'Proceed one-at-a-time with spacing across the 34° slope', nextNodeId: 'spacing', feedback: 'Spacing reduces the chance of multiple burials but doesn\'t reduce the probability of triggering. With CT10 and full propagation on a 34° slope, triggering is likely.' },
        ],
      },
      'reroute-success': {
        id: 'reroute-success',
        narrative: 'You find a 26° ridge traverse that avoids the wind-loaded bowl. The extra 30 minutes of skinning is worth the safety margin. You cross the col and enjoy excellent skiing on moderate south-facing slopes below.',
        isTerminal: true,
        score: 90,
        lessons: [
          'Field assessment (pit profile) provided specific data to inform terrain choices.',
          'Identifying TWO weak layers — and assessing each separately — led to informed risk management.',
          'Rerouting to manage slope angle and wind loading addressed the primary threat (reactive storm slab).',
        ],
      },
      'spacing': {
        id: 'spacing',
        narrative: 'The second person crossing triggers a slab fracture. The 34° slope releases on the crust/new snow interface. The slab is 50cm deep and runs 150m. Your partner is caught but surfaces in the debris, shaken but uninjured. Lucky outcome.',
        isTerminal: true,
        score: 30,
        lessons: [
          'CT10 with full ECT propagation on a 34° slope = high probability of human triggering.',
          'Spacing reduced consequence but did not prevent the avalanche. One-at-a-time is not terrain management.',
          'The correct response to reactive stability tests is terrain avoidance, not exposure management.',
        ],
      },
      'proceed': {
        id: 'proceed',
        narrative: 'You proceed toward the col without field assessment. At 2500m, you notice a fracture line from a natural avalanche on a nearby slope — the debris field covers the approach gully. How do you respond?',
        choices: [
          { label: 'This is a clear sign — stop, assess, and reconsider the route', nextNodeId: 'late-assessment', optimal: true, feedback: 'Natural avalanche activity is strong evidence of instability. Better late than never to start assessing.' },
          { label: 'That slope is steeper than our route — continue', nextNodeId: 'bad-proceed', feedback: 'Natural avalanches on nearby slopes indicate widespread instability. Your route has similar snow conditions.' },
        ],
      },
      'late-assessment': {
        id: 'late-assessment',
        narrative: 'You stop, dig a hand shear test, and find easy results on a crust layer 50cm down. You reroute to lower-angle terrain and complete a modified tour safely.',
        isTerminal: true,
        score: 55,
        lessons: [
          'Responding to red flags (natural avalanche debris) saved the day, but you should have assessed before entering the terrain.',
          'A quick hand shear test confirmed the instability without a full pit profile.',
          '"Considerable is manageable" is not an assessment — it\'s rationalization.',
        ],
      },
      'bad-proceed': {
        id: 'bad-proceed',
        narrative: 'You continue past the debris and trigger a slab at 2550m on the col approach. The 34° slope fractures across 100m. Two members of your party are caught in the debris.',
        isTerminal: true,
        score: 10,
        lessons: [
          'Ignoring natural avalanche evidence is a critical error. Natural activity indicates widespread instability.',
          'No field assessment was conducted despite Considerable danger and a known persistent weak layer.',
          '"Continue with caution" is not a plan — it\'s a failure of the decision framework.',
        ],
      },
      'conservative': {
        id: 'conservative',
        narrative: 'You stay on south-facing terrain below 2400m with slopes under 30°. The skiing is moderate but safe. You have a pleasant day in the mountains with zero avalanche exposure.',
        isTerminal: true,
        score: 70,
        lessons: [
          'Conservative terrain choice eliminated avalanche risk entirely.',
          'Field assessment could have opened up more terrain options safely.',
          'Staying alive always beats heroic skiing. But developing field assessment skills lets you make informed choices, not just blanket avoidance.',
        ],
      },
      'missed-slab': {
        id: 'missed-slab',
        narrative: 'You proceed onto a 35° north-facing slope, reassured by the depth hoar CT18. On your third turn, you trigger the storm slab — the CT10 layer you overlooked. The 50cm deep slab carries you 100m downhill.',
        isTerminal: true,
        score: 15,
        lessons: [
          'Pit interpretation requires assessing EVERY weak layer, not just the one you\'re looking for.',
          'The storm slab (CT10, full propagation) was more reactive than the persistent weak layer — and it was the one that got you.',
          'A full pit profile is only useful if you interpret ALL the results, not just the ones that confirm your plan.',
        ],
      },
    },
  },
  {
    id: 'thermal-day-planning',
    title: 'Thermal Day Planning',
    description: 'Plan and execute a cross-country flight on a classic thermal day. Read the sky, manage your altitude, and make tactical decisions.',
    difficulty: 'intermediate',
    domains: ['weather', 'flying'],
    testedModules: ['weather-thermals', 'weather-lapse-rates', 'flying-reading-sky', 'flying-centering', 'flying-climbing'],
    requirements: [
      { domain: 'weather', moduleSlug: 'thermals' },
      { domain: 'flying', moduleSlug: 'reading-sky' },
      { domain: 'flying', moduleSlug: 'centering' },
    ],
    startNodeId: 'start',
    nodes: {
      'start': {
        id: 'start',
        narrative: 'Morning briefing: surface temp 22°C, dewpoint 8°C, forecast high 30°C. Light SE wind. Cumulus expected by 11am. You plan a 40km out-and-return. What\'s your first calculation?',
        choices: [
          { label: 'Calculate cloudbase: LCL = 222 × (22-8) = 3,108ft ≈ 950m AGL. Plan max altitude around 900m AGL.', nextNodeId: 'calculated', optimal: true, feedback: 'Perfect. Espy\'s formula gives you the cloudbase estimate. Knowing this sets your altitude ceiling for the day.' },
          { label: 'Check the wind direction and plan the route accordingly', nextNodeId: 'wind-first', feedback: 'Wind matters, but cloudbase calculation tells you your working altitude — a more fundamental planning parameter.' },
          { label: 'Launch early and figure it out in the air', nextNodeId: 'no-plan', feedback: 'XC success depends on pre-flight planning. Cloudbase, trigger time, and route planning all improve your chances.' },
        ],
      },
      'calculated': {
        id: 'calculated',
        narrative: 'You launch at 11:15am as the first cumulus form. Initial climbs are +1.5 m/s to 700m AGL. By noon, you see cumulus darkening and growing. Some are starting to go grey at the base. What do you read from this?',
        choices: [
          { label: 'Thermals are strengthening — dark bases mean strong lift. Go now while conditions peak.', nextNodeId: 'peak-conditions', optimal: true, feedback: 'Dark bases indicate deep clouds driven by strong thermals. This is peak thermal time — exactly when to push forward on task.' },
          { label: 'Grey bases mean overdevelopment — wait for conditions to stabilize', nextNodeId: 'hesitate', feedback: 'Early grey doesn\'t mean overdevelopment. At noon, darkening bases just mean the thermals are reaching their peak strength.' },
        ],
      },
      'peak-conditions': {
        id: 'peak-conditions',
        narrative: 'You push out on course. At 15km, you find a strong thermal: +3.5 m/s. You\'re centered and climbing beautifully. At 800m AGL, the climb weakens to +1 m/s. Cloudbase is at 950m. What do you do?',
        choices: [
          { label: 'Leave at 850m — close enough to cloudbase, save time, and push forward', nextNodeId: 'smart-leave', optimal: true, feedback: 'Excellent. The thermal is weakening near cloudbase. Leaving with 100m margin avoids cloud suck and maximizes your speed.' },
          { label: 'Grind to cloudbase — every meter of altitude counts', nextNodeId: 'grind', feedback: 'Circling in +1 m/s wastes time. The altitude gained in 2 minutes of slow climbing could be covered by 1 minute of faster forward progress at +3 m/s in the next thermal.' },
        ],
      },
      'smart-leave': {
        id: 'smart-leave',
        narrative: 'You push forward at McCready 3 and reach the turnpoint at 600m AGL. You turn for home with 20km to go. Conditions are still strong. You complete the 40km task in 2 hours — a great flight.',
        isTerminal: true,
        score: 90,
        lessons: [
          'Pre-flight cloudbase calculation set accurate expectations for the day.',
          'Reading dark cloud bases correctly identified peak conditions.',
          'Leaving the thermal below cloudbase saved time without sacrificing safety.',
        ],
      },
      'grind': {
        id: 'grind',
        narrative: 'You spend 6 minutes grinding from 800m to 950m in weak lift. Meanwhile, the cloud overdevelops and you find yourself in whiteout. You push out but lose 5 minutes. You complete the task but slowly.',
        isTerminal: true,
        score: 55,
        lessons: [
          'Grinding near cloudbase is time-inefficient and risks cloud suck.',
          'McCready theory says: weak climbs should be left, strong climbs should be maximized.',
          'Cloud suck is real — maintain separation from cloudbase.',
        ],
      },
      'wind-first': {
        id: 'wind-first',
        narrative: 'You plan the route for the SE wind but don\'t calculate cloudbase. You launch and are surprised when thermals top out at only 900m AGL. Your altitude expectations were wrong, making the task harder.',
        isTerminal: true,
        score: 50,
        lessons: [
          'Cloudbase calculation (Espy\'s formula) is the foundation of flight planning.',
          'Knowing your altitude ceiling lets you plan realistic glide distances.',
          'Wind direction matters, but altitude ceiling matters more for XC task planning.',
        ],
      },
      'hesitate': {
        id: 'hesitate',
        narrative: 'You wait near launch, missing the peak thermal window. By 1:30pm, conditions start to overdevelop for real. You manage only a 15km local flight.',
        isTerminal: true,
        score: 30,
        lessons: [
          'Hesitating during peak conditions wastes the best flying time.',
          'Dark bases at noon are strong thermals, not overdevelopment. Learn to read the difference.',
          'Real overdevelopment shows spreading tops, shading, and dying lift — very different from darkening bases in growing cumulus.',
        ],
      },
      'no-plan': {
        id: 'no-plan',
        narrative: 'You launch early at 10am. Thermals are scrappy and weak — the surface hasn\'t heated enough. You spend 45 minutes scratching low before conditions develop. By the time thermals work, you\'ve wasted energy and position.',
        isTerminal: true,
        score: 25,
        lessons: [
          'Thermal trigger time depends on surface temperature reaching trigger temperature. Launching too early means weak, unreliable lift.',
          'Pre-flight planning (cloudbase, trigger time, route) dramatically improves XC outcomes.',
          'Patience and planning beat enthusiasm in cross-country flying.',
        ],
      },
    },
  },
  {
    id: 'whiteout-rescue',
    title: 'Whiteout Companion Rescue',
    description: 'A member of your ski touring group is caught in a slide during deteriorating visibility. You must execute a companion rescue in challenging conditions.',
    difficulty: 'expert',
    domains: ['avalanche'],
    testedModules: ['avalanche-companion-rescue', 'avalanche-avalanche-triangle', 'avalanche-human-factors'],
    requirements: [
      { domain: 'avalanche', moduleSlug: 'companion-rescue' },
      { domain: 'avalanche', moduleSlug: 'human-factors' },
    ],
    startNodeId: 'start',
    nodes: {
      'start': {
        id: 'start',
        narrative: 'Your group of 3 is descending in deteriorating visibility. Moderate danger, 33° slope. The lead skier triggers a wind slab — you see them carried 80m into the debris. They disappear from sight. The second skier is above you, safe. Time: 0 minutes. What is your first action?',
        choices: [
          { label: 'Switch beacon to search, note last-seen point, begin moving toward it', nextNodeId: 'beacon-search', optimal: true, feedback: 'Correct priority: beacon to search immediately. Move to last-seen point. Every second counts in the 18-minute window.' },
          { label: 'Call mountain rescue immediately', nextNodeId: 'call-first', feedback: 'Mountain rescue takes 20+ minutes minimum. Your partner needs YOU right now. Beacon search first, call while searching.' },
          { label: 'Assess for secondary avalanche risk before moving', nextNodeId: 'assess-first', feedback: 'A quick glance for secondary risk is prudent (2 seconds), but a prolonged assessment costs precious time. The 18-minute window is your priority.' },
        ],
      },
      'beacon-search': {
        id: 'beacon-search',
        narrative: 'Time: 1 minute. Your beacon picks up a signal at 40m. Visibility is poor — you can see 20m in the whiteout. You\'re moving toward the last-seen point. Signal strength is increasing. At 15m, your beacon shows directional arrows. What\'s your technique?',
        choices: [
          { label: 'Follow the directional arrows, reduce search width, slow down as distance decreases', nextNodeId: 'fine-search', optimal: true, feedback: 'Standard beacon search technique: coarse search → fine search as distance drops. Slow down below 5m for pinpoint accuracy.' },
          { label: 'Start probing immediately at the 15m mark', nextNodeId: 'early-probe', feedback: 'At 15m, your probe search area is too large. Continue the beacon fine search to narrow it down to 2-3m before probing.' },
        ],
      },
      'fine-search': {
        id: 'fine-search',
        narrative: 'Time: 3 minutes. You narrow the signal to a 2m radius. The beacon shows 1.2m depth. You mark the spot and begin probing in a spiral pattern. On the 4th probe strike, you feel resistance at 1m. What next?',
        choices: [
          { label: 'Leave the probe in place, start digging from 1.5m downhill, create a platform', nextNodeId: 'efficient-dig', optimal: true, feedback: 'Perfect technique. Dig from downhill to create a V-shaped excavation. The probe marks the victim\'s position. This is the fastest extraction method.' },
          { label: 'Start digging directly on top of the probe mark', nextNodeId: 'overhead-dig', feedback: 'Digging from directly above is slower and risks injuring the victim with your shovel. Always start downhill and excavate toward them.' },
        ],
      },
      'efficient-dig': {
        id: 'efficient-dig',
        narrative: 'Time: 5 minutes. You and the second skier dig in rotation — 60 seconds each, maximum intensity. At time 10 minutes, you expose an arm. At 12 minutes, you clear the airway. Your partner is conscious but hypothermic. They were buried 1m deep for 12 minutes.',
        isTerminal: true,
        score: 95,
        lessons: [
          '12-minute burial with airway cleared — well within the 90% survival zone.',
          'Efficient beacon technique (signal → fine → probe → strategic dig) saved critical minutes.',
          'Rotating diggers prevents exhaustion and maintains dig speed.',
          'Starting downhill and creating a V-excavation is 40% faster than digging from above.',
        ],
      },
      'overhead-dig': {
        id: 'overhead-dig',
        narrative: 'Time: 5 minutes. Digging from above is awkward — snow keeps falling back into the hole. At time 15 minutes, you finally expose your partner\'s face. They\'ve been buried 15 minutes at 1m depth. They\'re unconscious but breathing.',
        isTerminal: true,
        score: 60,
        lessons: [
          '15-minute burial — still within survival range but approaching the critical 18-minute mark.',
          'Digging from above cost 3+ extra minutes compared to the downhill excavation technique.',
          'In a rescue, technique matters as much as speed. Practice strategic digging.',
        ],
      },
      'call-first': {
        id: 'call-first',
        narrative: 'You spend 2 minutes on the phone with emergency services. They dispatch a helicopter but ETA is 35 minutes due to weather. Meanwhile, your partner has been buried for 2 minutes before you even switch your beacon to search.',
        choices: [
          { label: 'Hang up and start beacon search immediately', nextNodeId: 'late-search', optimal: true, feedback: 'Correct — 2 minutes wasted, but starting the search now is critical. You\'ve already lost 10% of the survival window.' },
          { label: 'Guide the helicopter to your location while searching', nextNodeId: 'late-search', feedback: 'You can\'t effectively guide a helicopter AND conduct a beacon search. Focus entirely on finding your partner.' },
        ],
      },
      'late-search': {
        id: 'late-search',
        narrative: 'Starting your search 2 minutes late, you locate your partner at time 5 minutes, probe at 7 minutes, and clear their airway at 19 minutes. They\'ve been buried 19 minutes. Survival probability has dropped to approximately 30%.',
        isTerminal: true,
        score: 35,
        lessons: [
          '2 minutes on the phone pushed your rescue past the 18-minute critical window.',
          'Helicopter rescue AVERAGES 45+ minutes. Companion rescue is the ONLY viable option for burial.',
          'The priority sequence is: BEACON → SEARCH → PROBE → DIG → CALL. Not the other way around.',
        ],
      },
      'assess-first': {
        id: 'assess-first',
        narrative: 'You spend 3 minutes assessing the slope for secondary avalanche risk. The assessment confirms the slope has already released and is unlikely to slide again. But 3 minutes of your partner\'s survival window are gone.',
        choices: [
          { label: 'Begin beacon search now — I can\'t waste more time', nextNodeId: 'late-search', optimal: true, feedback: 'Correct to start now. A quick visual scan (2-3 seconds) is reasonable, but a 3-minute assessment was too long.' },
        ],
      },
      'early-probe': {
        id: 'early-probe',
        narrative: 'You probe randomly at 15m radius. After 3 minutes of fruitless probing, you realize you need to continue the beacon fine search. You locate the burial at time 7 minutes — 4 minutes later than optimal.',
        isTerminal: true,
        score: 45,
        lessons: [
          'Probing at 15m radius is like searching a 700m² area — needle in a haystack without the beacon.',
          'Complete the beacon fine search to narrow to 2-3m BEFORE probing.',
          'Follow the protocol: coarse search → fine search → pinpoint → probe → dig.',
        ],
      },
    },
  },
  {
    id: 'sea-breeze-convergence',
    title: 'Sea Breeze Convergence',
    description: 'A coastal flying site with developing sea breeze. Navigate the transition from thermal to convergence lift while managing deteriorating thermal conditions.',
    difficulty: 'advanced',
    domains: ['weather', 'flying'],
    testedModules: ['weather-convergence', 'weather-mountain-winds', 'flying-convergence-sea-breeze', 'flying-valley-flying', 'flying-speed-to-fly'],
    requirements: [
      { domain: 'weather', moduleSlug: 'convergence' },
      { domain: 'flying', moduleSlug: 'convergence-sea-breeze' },
      { domain: 'flying', moduleSlug: 'valley-flying' },
    ],
    startNodeId: 'start',
    nodes: {
      'start': {
        id: 'start',
        narrative: 'You\'re flying at 1200m over a coastal mountain range. It\'s 2pm. Thermals on the seaward slopes have died — the sea breeze has arrived there. Inland, thermals are still working but weakening. You can see a distinct cloud line 15km to your east. What is it?',
        choices: [
          { label: 'Sea breeze convergence front — where maritime air meets inland thermals', nextNodeId: 'identified', optimal: true, feedback: 'Correct. The distinct cloud line marks where the cool sea breeze collides with warm inland air, forcing it upward. This is some of the best lift of the day.' },
          { label: 'A cold front approaching from the east', nextNodeId: 'wrong-id', feedback: 'Cold fronts move with the synoptic wind, typically from the west. This line is the daily sea breeze convergence — a local thermal phenomenon.' },
          { label: 'Overdeveloping cumulus — thunderstorm risk', nextNodeId: 'wrong-id', feedback: 'The distinct LINE of cloud parallel to the coast is the signature of sea breeze convergence, not random overdevelopment.' },
        ],
      },
      'identified': {
        id: 'identified',
        narrative: 'The convergence line is 15km east and moving slowly toward you as the sea breeze pushes inland. Your thermals are weakening to +1 m/s. You\'re at 1200m. What\'s your strategy?',
        choices: [
          { label: 'Fly east to intercept the convergence line — even if the thermals behind die', nextNodeId: 'intercept', optimal: true, feedback: 'The convergence will provide stronger, more sustained lift than the dying thermals. Intercepting it is the key tactical decision.' },
          { label: 'Stay in the weakening thermals — they\'re familiar and workable', nextNodeId: 'stay-thermal', feedback: 'The thermals are dying because the sea breeze is killing them from the coast inward. They will continue to weaken. The convergence is the future of today\'s lift.' },
          { label: 'Land while you have altitude — conditions are deteriorating', nextNodeId: 'early-land', feedback: 'Conditions aren\'t deteriorating everywhere — they\'re transforming. The sea breeze is killing thermals but creating convergence lift. Adapt, don\'t surrender.' },
        ],
      },
      'intercept': {
        id: 'intercept',
        narrative: 'You fly east at McCready 1 (matching the weak thermals). After 10km, the convergence line is ahead — you can see the cloud line clearly. You hit the edge and your vario jumps to +4 m/s. You climb rapidly to 1800m in smooth, strong lift. What now?',
        choices: [
          { label: 'Fly along the convergence line — ride this highway of lift as far as it goes', nextNodeId: 'ride-line', optimal: true, feedback: 'The convergence line is a highway. Fly along it, not across it. You can cover enormous distance with minimal altitude loss.' },
          { label: 'Circle up to maximum altitude, then push ahead on course', nextNodeId: 'circle-leave', feedback: 'Stopping to circle wastes the linear nature of convergence lift. Along the line, you barely need to circle — the lift is continuous.' },
        ],
      },
      'ride-line': {
        id: 'ride-line',
        narrative: 'You fly along the convergence at 90km/h, barely circling. The lift sustains between +2 and +4 m/s for 25km. The convergence slowly moves westward as the sea breeze pushes inland. You cover 25km in 20 minutes with almost no altitude loss. Best lift of the day.',
        isTerminal: true,
        score: 95,
        lessons: [
          'Sea breeze convergence provides the strongest, most sustained lift of the afternoon.',
          'Flying ALONG the line (not across it) maximizes distance with minimal altitude loss.',
          'The transition from thermal to convergence flying requires reading the sky and adapting tactics.',
          'The convergence moves inland throughout the afternoon — time your intercept based on position.',
        ],
      },
      'circle-leave': {
        id: 'circle-leave',
        narrative: 'You circle to 2000m in the convergence lift, then leave it to fly on course. Within 5km, you\'re back in dead air — the sea breeze has killed the thermals behind the convergence. You glide back to the convergence line, having wasted altitude.',
        isTerminal: true,
        score: 50,
        lessons: [
          'Convergence lift is linear — use it linearly. Flying along the line is the tactic.',
          'Behind the convergence line (seaward), the sea breeze has killed thermals. There\'s no lift there.',
          'Ahead of the convergence (inland), thermals may still work but the convergence is stronger.',
        ],
      },
      'stay-thermal': {
        id: 'stay-thermal',
        narrative: 'Thermals weaken further to +0.5 m/s. By 3pm, the sea breeze reaches your position and thermals die completely. You\'re at 800m with no lift. You land in a valley field 5km from the convergence line that would have given you +4 m/s.',
        isTerminal: true,
        score: 25,
        lessons: [
          'Staying in dying thermals while convergence lift develops east is a classic missed opportunity.',
          'The sea breeze kills thermals progressively from the coast inland. Adapt or lose your altitude.',
          'Recognizing the sea breeze convergence line is a critical skill for coastal flying.',
        ],
      },
      'early-land': {
        id: 'early-land',
        narrative: 'You land at 2:30pm with 1000m altitude to spare. From the ground, you watch the convergence line pass overhead — massive cumulus with dark bases. Other pilots report +4 m/s climbs. The best flying of the day was about to begin.',
        isTerminal: true,
        score: 15,
        lessons: [
          'What looked like deterioration was actually transformation. Sea breeze kills thermals but creates convergence.',
          'Understanding the sea breeze cycle would have kept you airborne in the strongest lift of the day.',
          'Landing with altitude and options is a waste. The convergence was 15 minutes away.',
        ],
      },
      'wrong-id': {
        id: 'wrong-id',
        narrative: 'You misidentify the cloud line and focus on avoiding it. Meanwhile, your thermals continue to weaken as the sea breeze advances. By 3pm, you\'re forced to land with no lift available.',
        isTerminal: true,
        score: 20,
        lessons: [
          'The distinct cloud line parallel to the coast is sea breeze convergence — not a front or overdevelopment.',
          'Misidentifying the convergence caused you to avoid the best lift source available.',
          'Coastal pilots must understand the daily sea breeze cycle: onset, convergence formation, and inland progression.',
        ],
      },
    },
  },
];

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find(s => s.id === id);
}
