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
    href: 'https://github.com/naly',
    username: '@naly',
  },
  twitter: {
    label: 'X (Twitter)',
    href: 'https://x.com/naly',
    username: '@naly',
  },
  newsletter: {
    label: 'Newsletter',
    href: 'https://newsletter.naly.dev',
    description: 'Weekly insights on markets & code',
  },
};

export const siteConfig = {
  name: 'naly.dev',
  tagline: 'Decoding the economy with code.',
  description: 'A digital garden of interactive financial dashboards and economic analysis.',
  author: 'Naly',
  year: new Date().getFullYear(),
};
