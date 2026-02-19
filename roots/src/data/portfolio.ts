export interface PortfolioNode {
  id: string;
  name: string;
  label: string;
  url: string;
  type: 'work' | 'channel';
}

export const PORTFOLIO_NODES: PortfolioNode[] = [
  // Work — larger, inner ring
  { id: 'tipz', name: 'TIPZ', label: 'Privacy-First Micro-Tipping', url: 'https://tipz.cash', type: 'work' },
  { id: 'beets', name: 'BEETS', label: 'DEX · LST · Validator', url: '/beets', type: 'work' },
  { id: 'balancer', name: 'BALANCER', label: 'Custom AMM Infrastructure', url: 'https://balancer.fi', type: 'work' },
  { id: 'terminal', name: 'TERMINAL', label: 'Interactive Dashboards', url: 'https://app.naly.dev', type: 'work' },

  // Channels — smaller, outer positions
  { id: 'defi_naly', name: '@defi_naly', label: 'DeFi analysis and takes', url: 'https://x.com/defi_naly', type: 'channel' },
  { id: 'moneyverse', name: 'The Moneyverse', label: 'Long-form writing on money and systems', url: 'https://moneyverse.substack.com', type: 'channel' },
];
