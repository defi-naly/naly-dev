export interface Slide {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  component: 'title' | 'problem' | 'value-prop' | 'data-evidence' | 'architecture' | 'hedging-use-case' | 'antifragility' | 'unit-economics' | 'revenue-evolution' | 'roadmap' | 'summary';
}

export const slides: Slide[] = [
  {
    id: 1,
    slug: 'title',
    title: 'Swiss Liquidity Gateway',
    subtitle: 'CHF Stablecoin Infrastructure for Aave v4',
    component: 'title',
  },
  {
    id: 2,
    slug: 'problem',
    title: 'The Yield Paradox',
    subtitle: 'Swiss franc holders face a structural disadvantage',
    component: 'problem',
  },
  {
    id: 3,
    slug: 'opportunity',
    title: 'The Opportunity',
    subtitle: 'CHF Stablecoin + Aave v4 Spoke',
    component: 'value-prop',
  },
  {
    id: 4,
    slug: 'evidence',
    title: 'Data Evidence',
    subtitle: 'Three pillars of market validation',
    component: 'data-evidence',
  },
  {
    id: 5,
    slug: 'architecture',
    title: 'Architecture',
    subtitle: 'Hub-and-Spoke design for regional compliance',
    component: 'architecture',
  },
  {
    id: 6,
    slug: 'demand',
    title: 'The Demand Engine',
    subtitle: 'Why they borrow — capturing the institutional liquidity gap',
    component: 'hedging-use-case',
  },
  {
    id: 7,
    slug: 'antifragility',
    title: 'Macro Outlook & Antifragility',
    subtitle: 'Designed for Chaos — Profiting from the "Safe-Haven" Squeeze',
    component: 'antifragility',
  },
  {
    id: 8,
    slug: 'economics',
    title: 'Unit Economics',
    subtitle: 'Revenue model across SNB rate scenarios',
    component: 'unit-economics',
  },
  {
    id: 9,
    slug: 'evolution',
    title: 'Revenue Evolution',
    subtitle: 'From Alpha to Utility',
    component: 'revenue-evolution',
  },
  {
    id: 10,
    slug: 'roadmap',
    title: 'Roadmap',
    subtitle: 'Path to market in 4 phases',
    component: 'roadmap',
  },
  {
    id: 11,
    slug: 'summary',
    title: 'Summary',
    subtitle: 'Key takeaways and next steps',
    component: 'summary',
  },
];

export const TOTAL_SLIDES = slides.length;

export function getSlide(id: number): Slide | undefined {
  return slides.find(s => s.id === id);
}

export function getSlideBySlug(slug: string): Slide | undefined {
  return slides.find(s => s.slug === slug);
}

export function getSlideIndex(slug: string): number {
  return slides.findIndex(s => s.slug === slug);
}
