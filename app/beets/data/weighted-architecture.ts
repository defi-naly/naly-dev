import { ArchLayer, ArchDetail } from '../components/ArchitectureDiagram';

export const weightedLayers: ArchLayer[] = [
  {
    label: 'Infrastructure',
    name: 'Balancer V3 Vault',
    className: 'vault',
    detail: 'Singleton vault pattern — all pools share one contract for gas-efficient multi-hop routing',
    delay: 0,
  },
  {
    label: 'Pool Module',
    name: 'Weighted Math',
    className: 'pool',
    detail: 'Generalized weighted constant product invariant — ∏(Bᵢ^wᵢ) = k — enforces target allocations',
    delay: 0.15,
  },
  {
    label: 'LP Token',
    name: 'Balancer Pool Token (BPT)',
    className: 'token',
    detail: 'Fungible ERC-20 representing proportional share of all pool assets at target weights',
    delay: 0.3,
  },
];

export const weightedDetails: ArchDetail[] = [
  { label: 'Math Model', value: 'Weighted constant product (∏Bᵢ^wᵢ = k)' },
  { label: 'Max Tokens', value: '8 per pool' },
  { label: 'Rebalance Mechanism', value: 'Arbitrage-driven (no keepers)' },
];
