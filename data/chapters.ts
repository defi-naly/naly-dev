export interface Chapter {
  id: number;
  slug: string;
  title: string;
  concept: string;
  intro: string;
  takeaway: string;
  tool: 'barter' | 'gold-comparison' | 'stock-to-flow' | 'fractional-reserve' | 'printer' | 'inflation' | 'cantillon' | 'asset-race';
  status: 'build' | 'exists' | 'placeholder';
}

export const chapters: Chapter[] = [
  {
    id: 1,
    slug: 'barter',
    title: 'Barter',
    concept: 'Coincidence of wants',
    intro: "You're a fisherman. You caught fish. You need a hammer to fix your boat. Simple, right?",
    takeaway: 'This is called the "coincidence of wants" problem. For trade to work, you need something everyone wants.',
    tool: 'barter',
    status: 'build',
  },
  {
    id: 2,
    slug: 'gold',
    title: 'Gold',
    concept: 'Sound money properties',
    intro: "What if there was one thing everyone accepted? Let's figure out what that thing should be.",
    takeaway: "Gold isn't money because it's shiny. It's money because it doesn't rot, can be divided, is rare, and you can carry it.",
    tool: 'gold-comparison',
    status: 'build',
  },
  {
    id: 3,
    slug: 'stock-to-flow',
    title: 'Stock-to-Flow',
    concept: 'Scarcity over time',
    intro: "But wait — can't we just mine more gold? What makes something stay scarce?",
    takeaway: 'Stock-to-flow: how much exists vs how much is created each year. The higher the ratio, the harder the money.',
    tool: 'stock-to-flow',
    status: 'build',
  },
  {
    id: 4,
    slug: 'banks',
    title: 'Banks',
    concept: 'The Multiplier',
    intro: 'You deposit $100 at First National Bank. "Thank you! Your money is safe with us." Is it though?',
    takeaway: 'Your bank isn\'t a vault. It\'s a lending business that uses your money to make money — and gives you a sliver back.',
    tool: 'fractional-reserve',
    status: 'build',
  },
  {
    id: 5,
    slug: 'printing',
    title: 'Printing',
    concept: 'Money supply explosion',
    intro: "Then governments discovered something amazing: if money is just paper, you don't even need the gold.",
    takeaway: "Since 1971, the dollar hasn't been backed by gold. Since then, the money supply has gone up 31x.",
    tool: 'printer',
    status: 'build',
  },
  {
    id: 6,
    slug: 'inflation',
    title: 'Inflation',
    concept: 'Purchasing power decay',
    intro: "But inflation is only 2-3%, right? That's what they tell us. Let's make it personal.",
    takeaway: "Inflation is a slow thief. 3% per year doesn't feel like much. Over 40 years, you lose over half.",
    tool: 'inflation',
    status: 'build',
  },
  {
    id: 7,
    slug: 'the-exit',
    title: 'The Exit',
    concept: 'Cantillon Effect',
    intro: 'So where does all that printed money go? Not into your pocket.',
    takeaway: 'New money flows to assets first. By the time it reaches you, prices already went up. This is called the Cantillon Effect.',
    tool: 'cantillon',
    status: 'build',
  },
  {
    id: 8,
    slug: 'scoreboard',
    title: 'The Scoreboard',
    concept: 'Assets vs cash',
    intro: "So what wins? Let's look at 50 years of data. Not in dollars. In real terms.",
    takeaway: "Cash is for spending, not storing. Assets that are scarce outpace money printing. The rich don't save cash. Now you know why.",
    tool: 'asset-race',
    status: 'build',
  },
];

export const TOTAL_CHAPTERS = chapters.length;

export function getChapter(id: number): Chapter | undefined {
  return chapters.find(c => c.id === id);
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find(c => c.slug === slug);
}
