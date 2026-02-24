import { DomainId, domains, Module, getModule } from '../data/domains';
import { SRSCard, createCard } from './srs';

// Domain-specific application scenario templates
const applicationTemplates: Record<DomainId, (mod: Module) => string> = {
  weather: (mod) => {
    const templates: Record<string, string> = {
      'atmosphere': 'You\'re at 6000ft and the surface temperature is 30°C. Using the standard lapse rate, what temperature would you expect? How does this affect your flight planning?',
      'pressure-systems': 'Looking at a weather map, you see isobars spaced 2° apart over your planned route. What wind conditions should you expect, and how does this affect your plans?',
      'fronts': 'A cold front is approaching from the west, expected arrival in 6 hours. You\'re planning an afternoon hike. What weather sequence should you anticipate?',
      'thermals': 'It\'s 11am on a clear day. You\'re looking at a dark plowed field next to a lake. Where would you expect the first thermals to form, and why?',
      'lapse-rates': 'Surface temp is 25°C, dewpoint is 15°C. Calculate the cloud base and determine if conditions are stable or unstable.',
      'clouds': 'You see lenticular clouds forming over a ridge and cumulus building rapidly to the east. What does this tell you about current conditions?',
      'mountain-winds': 'It\'s 2pm in an alpine valley. Which direction is the valley wind blowing, and where would you expect the strongest thermals?',
      'mountain-waves': 'You observe a series of lens-shaped clouds stacked above a mountain ridge, with strong turbulence reported below. What phenomenon is occurring and what are the risks?',
      'convergence': 'Two valley systems merge ahead of you. What lift conditions should you expect at the convergence point?',
      'thunderstorms': 'You have instability, moisture, and an approaching cold front. The wind shear is moderate. Assess the thunderstorm risk.',
    };
    return templates[mod.slug] || `Apply your understanding of ${mod.title.toLowerCase()} to a practical mountain weather scenario.`;
  },
  avalanche: (mod) => {
    const templates: Record<string, string> = {
      'avalanche-triangle': 'You\'re assessing a backcountry route. The danger rating is Considerable. Walk through each side of the avalanche triangle for this terrain.',
      'slab-physics': 'You find a 40cm hard slab sitting on depth hoar while digging a pit. What does this tell you about the stability of the slope?',
      'slope-angle': 'You\'re approaching a beautiful powder bowl. Your inclinometer reads 36°. Connected slopes above measure 42°. Should you enter the bowl?',
      'terrain-traps': 'Your planned descent follows a narrow gully that opens onto a flat bench above a cliff band. Identify the terrain traps and propose an alternative.',
      'snowpack-layers': 'After a week of clear, cold nights followed by a 30cm storm, what weak layer would you most expect to find in the snowpack?',
      'stability-testing': 'Your CT result is 12, with a clean planar shear on a faceted layer. The ECT shows full propagation. Interpret these results.',
      'weather-loading': 'Strong westerly winds have been blowing for 48 hours after a 20cm snowfall. Which aspects are most dangerous and why?',
      'human-factors': 'Your group of 5 includes two experts who want to ski the steepest line. You\'re uncomfortable but don\'t want to speak up. Which heuristic traps are at play?',
      'decision-framework': 'Apply the systematic decision framework to this scenario: Considerable danger, 35° north-facing slope, recent wind loading, party of 3.',
      'companion-rescue': 'Your partner is buried. You saw them disappear 50m upslope. You have a beacon, probe, and shovel. Walk through your rescue sequence and timeline.',
    };
    return templates[mod.slug] || `Apply your understanding of ${mod.title.toLowerCase()} to a backcountry avalanche assessment scenario.`;
  },
  flying: (mod) => {
    const templates: Record<string, string> = {
      'soaring-fundamentals': 'You\'re at a coastal ridge launch site. The wind is onshore at 15 knots and cumulus are forming inland. What types of lift are available to you?',
      'reading-sky': 'You see a line of well-developed cumulus with dark flat bases trending northwest. Some are starting to spread out at the top. What do you read from this?',
      'thermal-entry': 'You\'re gliding toward a thermal marked by a circling hawk. You feel a strong surge on your right wing. Describe your entry technique.',
      'centering': 'You\'re circling in a thermal. Your vario shows +3 on the south side and +1 on the north side. How do you adjust your circle?',
      'climbing': 'You\'re climbing at +2 m/s at 5000ft. Cloudbase is estimated at 6500ft. The next thermal source is 8km away. When should you leave this thermal?',
      'valley-flying': 'It\'s 1pm in a north-south alpine valley. The east slope is in full sun, the west slope is shaded. Where do you fly and why?',
      'speed-to-fly': 'Your expected climb rate in the next thermal is 2 m/s. You\'re in 1 m/s sink between thermals. What speed should you fly at?',
      'xc-tactics': 'You\'re planning a 100km XC triangle. The wind is from the west at 20km/h. Cumulus are aligned in streets running northwest-southeast. Plan your route.',
      'convergence-sea-breeze': 'It\'s afternoon and you see a distinct cloud line forming 30km inland, parallel to the coast. What is it and how would you use it?',
      'between-thermals': 'You\'re at 4000ft, 5km from the next likely thermal source, in 1 m/s sink. Your min sink speed is 35 km/h. Calculate if you\'ll arrive with enough altitude.',
    };
    return templates[mod.slug] || `Apply your understanding of ${mod.title.toLowerCase()} to a practical flying scenario.`;
  },
};

function getConnectionQuestion(mod: Module): string {
  if (!mod.relatedModules || mod.relatedModules.length === 0) {
    return `How does ${mod.title.toLowerCase()} connect to safety decision-making in the mountains?`;
  }

  const related = mod.relatedModules[0];
  const relatedMod = getModule(related.domain, related.slug);
  if (!relatedMod) {
    return `How does ${mod.title.toLowerCase()} connect to other mountain knowledge?`;
  }

  const domainLabel = related.domain === mod.domain ? '' : ` (${related.domain})`;
  return `How does ${mod.title.toLowerCase()} connect to ${relatedMod.title.toLowerCase()}${domainLabel}?`;
}

function getConnectionAnswer(mod: Module): string {
  if (!mod.relatedModules || mod.relatedModules.length === 0) {
    return `${mod.takeaway} This knowledge directly informs decision-making in mountain environments.`;
  }

  const related = mod.relatedModules[0];
  const relatedMod = getModule(related.domain, related.slug);
  if (!relatedMod) {
    return mod.takeaway;
  }

  return `${mod.title}: ${mod.takeaway}\n\n${relatedMod.title}: ${relatedMod.takeaway}\n\nThese concepts are interconnected — understanding one deepens your grasp of the other.`;
}

export function generateCardsForModule(domain: DomainId, moduleSlug: string): SRSCard[] {
  const domainData = domains.find(d => d.id === domain);
  if (!domainData) return [];

  const mod = domainData.modules.find(m => m.slug === moduleSlug);
  if (!mod) return [];

  const cards: SRSCard[] = [];

  // 1. Concept card (due immediately)
  cards.push(createCard(
    domain,
    moduleSlug,
    mod.id,
    'concept',
    `Explain: ${mod.concept}`,
    mod.takeaway,
    1, // due tomorrow
  ));

  // 2. Application card (due in 2 days)
  const appQuestion = applicationTemplates[domain](mod);
  cards.push(createCard(
    domain,
    moduleSlug,
    mod.id,
    'application',
    appQuestion,
    `Key principle: ${mod.takeaway}`,
    2,
  ));

  // 3. Connection card (due in 3 days)
  cards.push(createCard(
    domain,
    moduleSlug,
    mod.id,
    'connection',
    getConnectionQuestion(mod),
    getConnectionAnswer(mod),
    3,
  ));

  return cards;
}

export function generateAllMissingCards(
  existingCardIds: Set<string>,
  completedModules: { domain: DomainId; slug: string }[],
): SRSCard[] {
  const newCards: SRSCard[] = [];

  for (const { domain, slug } of completedModules) {
    const moduleCards = generateCardsForModule(domain, slug);
    for (const card of moduleCards) {
      if (!existingCardIds.has(card.id)) {
        newCards.push(card);
      }
    }
  }

  return newCards;
}
