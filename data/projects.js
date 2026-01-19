export const projects = [
  {
    id: 'real-terms',
    title: 'TruValue',
    description: 'See assets in their true value. Interactive visualization of inflation-adjusted economic data.',
    category: 'Dashboard',
    status: 'live',
    href: '/projects/real-terms',
    featured: true,
    tags: ['React', 'D3.js', 'Economics'],
    metrics: {
      label: 'Data Points',
      value: '10K+',
    },
  },
  {
    id: 'fourth-turning',
    title: 'The Fourth Turning',
    description: 'Generational cycle analysis and historical pattern recognition through data.',
    category: 'Research',
    status: 'live',
    href: '/projects/fourth-turning',
    featured: false,
    tags: ['Analysis', 'History', 'Cycles'],
    metrics: {
      label: 'Years Analyzed',
      value: '160+',
    },
  },
];

export const socialLinks = {
  github: {
    label: 'GitHub',
    href: 'https://github.com/defi-naly',
    username: '@defi-naly',
  },
  twitter: {
    label: 'X (Twitter)',
    href: 'https://x.com/defi_naly',
    username: '@defi_naly',
  },
  newsletter: {
    label: 'Newsletter',
    href: 'https://moneyverse.substack.com/',
    description: 'Weekly insights on markets & code',
  },
};

export const writing = [
  {
    id: 'how-to-thrive-in-a-crisis',
    title: 'How to Thrive in a Crisis',
    description: 'My investment strategy for the next 5 years.',
    date: '2025-01-19',
    href: '/writing/how-to-thrive-in-a-crisis',
    tags: ['Strategy', 'Investing'],
  },
  {
    id: 'the-jackpot-age',
    title: 'The Jackpot Age',
    description: 'Hyper-gamble your way to freedom and retire your bloodline.',
    date: '2025-11-16',
    href: '/writing/the-jackpot-age',
    tags: ['Markets', 'Culture'],
  },
  {
    id: 'invisible-bitcoin-zec',
    title: 'Invisible Bitcoin: A ZEC Investment Thesis',
    description: "Why Crypto's Most Overlooked Asset Might Be Its Most Important.",
    date: '2025-10-12',
    href: '/writing/invisible-bitcoin-zec',
    tags: ['Crypto', 'Zcash'],
  },
];

export const siteConfig = {
  name: 'naly.dev',
  tagline: 'Decoding the economy with code.',
  description: 'A digital garden of interactive financial dashboards and economic analysis.',
  author: 'Naly',
  year: new Date().getFullYear(),
};
