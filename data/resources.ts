export type ResourceType = 'book' | 'video' | 'article';
export type ResourceTopic = 'cycles' | 'money' | 'macro' | 'bitcoin';

export interface Resource {
  id: string;
  title: string;
  author: string;
  type: ResourceType;
  topic: ResourceTopic[];
  description: string;
  url: string;
  year?: number;
  duration?: string; // for videos
  featured?: boolean;
}

export const resources: Resource[] = [
  // Fourth Turning / Cycles
  {
    id: 'fourth-turning',
    title: 'The Fourth Turning',
    author: 'William Strauss & Neil Howe',
    type: 'book',
    topic: ['cycles'],
    description: 'The foundational text on generational cycles. Predicts major crises every ~80 years based on repeating patterns in Anglo-American history.',
    url: 'https://www.amazon.com/Fourth-Turning-American-Prophecy-Rendezvous/dp/0767900464',
    year: 1997,
    featured: true,
  },
  {
    id: 'fourth-turning-is-here',
    title: 'The Fourth Turning Is Here',
    author: 'Neil Howe',
    type: 'book',
    topic: ['cycles'],
    description: 'The 2023 sequel. Howe updates the theory with 25 years of new data and analyzes where we are in the current Crisis era.',
    url: 'https://www.amazon.com/Fourth-Turning-Here-Seasons-History/dp/1982173734',
    year: 2023,
    featured: true,
  },
  {
    id: 'howe-fourth-turning-interview',
    title: 'Neil Howe: The Fourth Turning Is Here',
    author: 'Neil Howe (Bankless)',
    type: 'video',
    topic: ['cycles'],
    description: 'Deep dive interview where Howe explains generational theory, the current crisis, and what comes next.',
    url: 'https://www.youtube.com/watch?v=8fXFO6cKiGQ',
    year: 2023,
    duration: '1h 45m',
  },

  // Ray Dalio
  {
    id: 'changing-world-order',
    title: 'Principles for Dealing with the Changing World Order',
    author: 'Ray Dalio',
    type: 'book',
    topic: ['cycles', 'macro'],
    description: 'Dalio studies the rise and fall of reserve currencies and empires over 500 years. Spoiler: the patterns repeat.',
    url: 'https://www.amazon.com/Changing-World-Order-Nations-Succeed/dp/1982160276',
    year: 2021,
    featured: true,
  },
  {
    id: 'economic-machine',
    title: 'How The Economic Machine Works',
    author: 'Ray Dalio',
    type: 'video',
    topic: ['macro', 'money'],
    description: 'The best 30-minute explanation of credit cycles, deleveraging, and monetary policy. Essential viewing.',
    url: 'https://www.youtube.com/watch?v=PHe0bXAIuk0',
    year: 2013,
    duration: '31m',
    featured: true,
  },
  {
    id: 'dalio-changing-order-video',
    title: 'Principles for Dealing with the Changing World Order',
    author: 'Ray Dalio',
    type: 'video',
    topic: ['cycles', 'macro'],
    description: 'Animated summary of Dalio\'s research on the rise and fall of empires and reserve currencies.',
    url: 'https://www.youtube.com/watch?v=xguam0TKMw8',
    year: 2021,
    duration: '43m',
  },

  // Lyn Alden / Broken Money
  {
    id: 'broken-money',
    title: 'Broken Money',
    author: 'Lyn Alden',
    type: 'book',
    topic: ['money', 'bitcoin'],
    description: 'A comprehensive history of money, why the current system is broken, and how Bitcoin fits into the picture. Rigorous but accessible.',
    url: 'https://www.amazon.com/Broken-Money-Financial-System-Failing/dp/B0CG83FZQB',
    year: 2023,
    featured: true,
  },
  {
    id: 'lyn-alden-broken-money-interview',
    title: 'Lyn Alden: Broken Money',
    author: 'Lyn Alden (What Bitcoin Did)',
    type: 'video',
    topic: ['money', 'bitcoin'],
    description: 'Lyn breaks down the core thesis of Broken Money: why fiat currencies fail and what makes good money.',
    url: 'https://www.youtube.com/watch?v=jk_HWmmwiAs',
    year: 2023,
    duration: '2h 10m',
  },
  {
    id: 'lyn-alden-newsletter',
    title: 'Lyn Alden Investment Strategy',
    author: 'Lyn Alden',
    type: 'article',
    topic: ['macro', 'money'],
    description: 'Lyn\'s free articles cover macro, fiscal policy, and monetary systems. Some of the clearest financial writing online.',
    url: 'https://www.lynalden.com/articles/',
  },

  // Additional foundational resources
  {
    id: 'bitcoin-standard',
    title: 'The Bitcoin Standard',
    author: 'Saifedean Ammous',
    type: 'book',
    topic: ['money', 'bitcoin'],
    description: 'The economic case for Bitcoin as hard money. Heavy on Austrian economics and monetary history.',
    url: 'https://www.amazon.com/Bitcoin-Standard-Decentralized-Alternative-Central/dp/1119473861',
    year: 2018,
  },
  {
    id: 'hidden-secrets-of-money',
    title: 'Hidden Secrets of Money',
    author: 'Mike Maloney',
    type: 'video',
    topic: ['money', 'cycles'],
    description: '10-episode series on monetary history, gold, and economic cycles. Episode 4 on the dollar is legendary.',
    url: 'https://www.youtube.com/playlist?list=PLE88E9ICdiphYjJkeeLL2O09eJoC8r7Dc',
    year: 2013,
    duration: '10 episodes',
  },
  {
    id: 'wtf-1971',
    title: 'WTF Happened in 1971?',
    author: 'Various',
    type: 'article',
    topic: ['money', 'macro'],
    description: 'A collection of charts showing economic divergences that began in 1971 when Nixon ended the gold standard.',
    url: 'https://wtfhappenedin1971.com/',
    year: 2019,
  },
];

export const RESOURCE_TYPES: { key: ResourceType; label: string }[] = [
  { key: 'book', label: 'Books' },
  { key: 'video', label: 'Videos' },
  { key: 'article', label: 'Articles' },
];

export const RESOURCE_TOPICS: { key: ResourceTopic; label: string }[] = [
  { key: 'cycles', label: 'Cycles' },
  { key: 'money', label: 'Money' },
  { key: 'macro', label: 'Macro' },
  { key: 'bitcoin', label: 'Bitcoin' },
];

export function getFeaturedResources(): Resource[] {
  return resources.filter(r => r.featured);
}

export function getResourcesByType(type: ResourceType): Resource[] {
  return resources.filter(r => r.type === type);
}

export function getResourcesByTopic(topic: ResourceTopic): Resource[] {
  return resources.filter(r => r.topic.includes(topic));
}
