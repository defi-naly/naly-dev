export interface Project {
  name: string;
  description: string;
  tag: string;
  url?: string;
}

export interface Domain {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  color: string;
  tagline: string;
  projects: Project[];
}

export const domains: Domain[] = [
  {
    id: 'defi',
    number: '01',
    title: 'Decentralised Finance',
    subtitle: 'Self-Custody',
    color: '#6b8f71',
    tagline: 'One becomes many — code replaces the middlemen.',
    projects: [
      { name: 'Beets', description: 'DEX · LST · Validator', tag: 'Liquidity · Staking · Validation', url: 'https://beets.fi' },
      { name: 'Balancer', description: 'Custom AMM Infrastructure', tag: 'Programmable Liquidity Pools', url: 'https://balancer.fi' },
      { name: 'TERMINAL', description: 'Interactive Dashboards', tag: 'Live Financial Research', url: 'https://app.naly.dev' },
    ],
  },
  {
    id: 'sovereignty',
    number: '02',
    title: 'Digital Sovereignty',
    subtitle: 'Shielded Flows',
    color: '#8b7ec8',
    tagline: 'Every network has a topology. The shape determines who has power.',
    projects: [
      { name: 'TIPZ', description: 'Privacy-first micro-tipping for creators via shielded Zcash', tag: 'Privacy-First Tipping' },
    ],
  },
  {
    id: 'paragliding',
    number: '03',
    title: 'Natural Systems',
    subtitle: 'Thermal Formation',
    color: '#4a90d9',
    tagline: 'Nature is the original systems engineer.',
    projects: [],
  },
];
