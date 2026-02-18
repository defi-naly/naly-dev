export interface Feature {
  title: string;
  description: string;
  icon: string; // lucide icon name
}

export const features: Feature[] = [
  {
    title: 'Auto-Adjusting Ranges',
    description:
      'Liquidity ranges follow the market price automatically. Deploy once and earn fees — no rebalancing or keepers.',
    icon: 'RefreshCw',
  },
  {
    title: 'Oracle-Free',
    description:
      'No external price feeds, no oracle risk. reCLAMMs uses on-chain math to set ranges — fully trustless.',
    icon: 'Shield',
  },
  {
    title: 'Fungible ERC-20',
    description:
      'Your LP position is a standard ERC-20 token. Use it as collateral, stake it, or trade it — full composability.',
    icon: 'Coins',
  },
  {
    title: 'JIT Resistant',
    description:
      'The pool design makes just-in-time liquidity attacks uneconomical. Your fees stay with you, not MEV bots.',
    icon: 'Lock',
  },
  {
    title: 'Balancer V3 Vault',
    description:
      'Runs on the Balancer V3 vault — audited by Trail of Bits and Certora. Proven at scale across eight chains.',
    icon: 'Database',
  },
  {
    title: 'Sonic Native',
    description:
      'Deployed on Sonic — fast finality, low fees, and a growing DeFi ecosystem. The ideal chain for next-gen AMMs.',
    icon: 'Zap',
  },
];
