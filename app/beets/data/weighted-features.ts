import { Feature } from './features';

export const weightedFeatures: Feature[] = [
  {
    title: 'Custom Weights',
    description:
      'Set any ratio — 80/20, 60/20/20, or equal splits. Define your allocation and the math enforces the rest.',
    icon: 'Scale',
  },
  {
    title: 'Up to 8 Tokens',
    description:
      'Build diversified index pools with up to eight assets in a single position. No need to manage multiple pairs.',
    icon: 'Layers',
  },
  {
    title: 'Self-Rebalancing',
    description:
      'Arbitrageurs rebalance to your target weights and pay swap fees to do it. Free rebalancing, built in.',
    icon: 'RefreshCw',
  },
  {
    title: 'Swap Fee Earnings',
    description:
      'Every trade through your pool pays a fee. Passive yield from day one — no active management required.',
    icon: 'Coins',
  },
  {
    title: 'Composable ERC-20',
    description:
      'Your LP position is a standard ERC-20 token. Use it as collateral, stake it, or trade it across DeFi.',
    icon: 'Puzzle',
  },
  {
    title: 'Balancer V3 Vault',
    description:
      'Runs on the Balancer V3 vault — audited by Trail of Bits and Certora. Proven at scale across eight chains.',
    icon: 'Database',
  },
];
