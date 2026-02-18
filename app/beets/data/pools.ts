export interface PoolType {
  slug: 'reclamms' | 'weighted' | 'boosted';
  name: string;
  tagline: string;
  description: string;
  stats: { value: string; label: string }[];
  gradient: string;
  icon: string; // lucide icon name
  status: 'live' | 'coming-soon';
}

export const poolTypes: PoolType[] = [
  {
    slug: 'reclamms',
    name: 'reCLAMMs',
    tagline: 'Auto-adjusting concentrated liquidity.',
    description:
      'Ranges follow the market price automatically. Deploy once, earn fees forever. No rebalancing, no oracles, fungible positions.',
    stats: [
      { value: 'Auto', label: 'Range Mgmt' },
      { value: 'ERC-20', label: 'Position Type' },
      { value: 'Zero', label: 'Oracle Dep.' },
    ],
    gradient: 'linear-gradient(135deg, #00ffff, #00f89c)',
    icon: 'RefreshCw',
    status: 'live',
  },
  {
    slug: 'weighted',
    name: 'Weighted Pools',
    tagline: 'Custom-weight index funds, on-chain.',
    description:
      'Set your token ratios and the pool rebalances itself. Up to eight tokens with custom weights — passive, composable, always earning.',
    stats: [
      { value: '8', label: 'Max Tokens' },
      { value: 'Custom', label: 'Weights' },
      { value: 'Auto', label: 'Rebalancing' },
    ],
    gradient: 'linear-gradient(135deg, #a855f7, #6366f1)',
    icon: 'Scale',
    status: 'live',
  },
  {
    slug: 'boosted',
    name: 'Boosted Pools',
    tagline: 'Idle liquidity put to work, on-chain.',
    description:
      'Unused liquidity routes to lending markets while swaps stay liquid. One position, dual yield — swap fees plus lending returns.',
    stats: [
      { value: 'Dual', label: 'Yield Sources' },
      { value: '100%', label: 'Utilization' },
      { value: 'Auto', label: 'Routing' },
    ],
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    icon: 'TrendingUp',
    status: 'live',
  },
];
