export interface Project {
  name: string;
  description: string;
  type: 'shipped' | 'building' | 'exploring';
  url?: string;
}

export interface RootLink {
  domainId: string;
  label: string;
}

export interface Domain {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  color: string;
  body: string[];
  aside?: string;
  projects: Project[];
  roots: RootLink[];
}

export interface Connection {
  from: string;
  to: string;
  label: string;
  description: string;
}

export const domains: Domain[] = [
  {
    id: 'finance',
    number: '01',
    title: 'Finance & Macro',
    subtitle: 'The Shrinking Ruler',
    color: '#c9a84c',
    body: [
      'Money is a measuring tool that keeps changing length. Every dollar you hold is quietly shrinking — not because you spent it, but because the system is designed that way. Inflation isn\'t a bug; it\'s a feature of fiat currency.',
      'I started here: staring at charts of purchasing power, CPI adjustments, and real returns. The deeper you look, the more you realize that the "safe" path — save in dollars, trust institutions — has a built-in leak. The ruler you\'re measuring with is getting shorter every year.',
      'This is the root of everything else I explore. Once you see the shrinking ruler, you can\'t unsee it. It leads you to ask: what would money look like if the ruler didn\'t shrink?',
    ],
    aside: 'A dollar in 1971 buys what $0.14 buys today. The ruler lost 86% of its length.',
    projects: [
      { name: 'The Money Game', description: '8-chapter interactive course on monetary history', type: 'shipped', url: '/learn/game' },
      { name: 'TruValue', description: 'Inflation-adjusted asset comparison tool', type: 'shipped', url: '/tools/truvalue' },
      { name: 'The Line', description: 'Debt-to-GDP trajectory visualization', type: 'shipped', url: '/tools/the-line' },
      { name: 'Echo', description: 'Historical pattern recognition in economic cycles', type: 'shipped', url: '/tools/echo' },
    ],
    roots: [
      { domainId: 'defi', label: 'The shrinking ruler led me to programmable money' },
      { domainId: 'alpine', label: 'Markets and mountains both demand risk literacy' },
    ],
  },
  {
    id: 'defi',
    number: '02',
    title: 'DeFi & Privacy',
    subtitle: 'Shielded Transaction',
    color: '#6b8f71',
    body: [
      'If traditional finance is a shrinking ruler, DeFi is an attempt to build a ruler that nobody can tamper with. But most of crypto missed the point — it built transparent ledgers where every transaction is public. That\'s not freedom; it\'s surveillance with extra steps.',
      'Privacy in transactions isn\'t about hiding. It\'s about the basic right to not broadcast your financial life to the world. Shielded transactions — like Zcash\'s — are what cash used to be: yours, without a trail.',
      'I build at this intersection: programmable money that respects privacy. Not because I have something to hide, but because the default should be sovereignty, not exposure.',
    ],
    aside: 'Every Bitcoin transaction is permanently visible. Shielded ZEC transactions reveal nothing — not sender, receiver, or amount.',
    projects: [
      { name: 'TIPZ', description: 'Privacy-first micro-tipping for creators via shielded Zcash', type: 'building', url: 'https://tipz.cash' },
      { name: 'BLOOM', description: 'DeFi venture studio concept', type: 'exploring', url: '/bloom' },
    ],
    roots: [
      { domainId: 'finance', label: 'Understanding broken money led here' },
      { domainId: 'paragliding', label: 'Both demand reading invisible systems' },
    ],
  },
  {
    id: 'paragliding',
    number: '03',
    title: 'Paragliding',
    subtitle: 'Thermal Formation',
    color: '#4a90d9',
    body: [
      'Paragliding is the purest form of flight. No engine, no rigid structure — just a fabric wing, rising air, and patience. You launch by running off a hill and then you wait. Wait for the air to tell you where to go.',
      'Thermal flying is reading the invisible. A dark parking lot heats faster than a forest. That differential creates a column of rising air. Find it, circle in it, climb thousands of feet. The skill is reading the landscape and the sky for clues the air leaves behind.',
      'It taught me more about systems than any textbook. The atmosphere is a massive heat engine with feedback loops, delays, and phase transitions. You learn to read it or you land early.',
    ],
    aside: 'A thermal can lift you from 2,000ft to 12,000ft in minutes. The energy comes from the sun heating the ground unevenly.',
    projects: [],
    roots: [
      { domainId: 'alpine', label: 'The mountain is the launch site' },
      { domainId: 'finance', label: 'Both require reading invisible forces' },
    ],
  },
  {
    id: 'alpine',
    number: '04',
    title: 'Alpine Environments',
    subtitle: 'Reading the Mountain',
    color: '#7a9eb5',
    body: [
      'Mountains are layered systems. Below treeline: forests, mycelial networks, protected valleys. At treeline: the transition zone where trees give way to alpine meadows. Above: rock, snow, ice, and weather that changes in minutes.',
      'Reading a mountain is reading risk. Snow stability, weather windows, route finding, energy management — every decision is a probability assessment against irreversible consequences. It\'s the same framework as trading, just with higher stakes and no stop-loss orders.',
      'The alpine is where all the threads converge. Physics (weather systems, snow mechanics), biology (treeline ecology, alpine adaptations), systems thinking (route planning, risk cascades). It\'s the most honest environment I know — the mountain gives you exactly the feedback you deserve.',
    ],
    projects: [],
    roots: [
      { domainId: 'paragliding', label: 'Launch sites are alpine terrain' },
      { domainId: 'finance', label: 'Risk assessment translates across domains' },
    ],
  },
];

export const connections: Connection[] = [
  {
    from: 'finance',
    to: 'defi',
    label: 'Broken Money → Programmable Money',
    description: 'Understanding how fiat currency degrades purchasing power leads directly to asking: what if money was programmable, transparent, and couldn\'t be inflated by decree?',
  },
  {
    from: 'paragliding',
    to: 'alpine',
    label: 'Sky to Summit',
    description: 'The mountain is both the launch site and the terrain you read from above. Paragliding and alpinism are the same risk calculus from different altitudes.',
  },
  {
    from: 'defi',
    to: 'paragliding',
    label: 'Reading Invisible Systems',
    description: 'Shielded transactions and thermal columns are both invisible forces you learn to read. Both reward those who see what others can\'t.',
  },
  {
    from: 'alpine',
    to: 'finance',
    label: 'Risk Without Stop-Loss',
    description: 'Mountains and markets both punish hubris and reward preparation. The alpine makes risk assessment tangible — the feedback is immediate and irreversible.',
  },
];
