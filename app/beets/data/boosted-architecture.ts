import { ArchLayer, ArchDetail } from '../components/ArchitectureDiagram';

export const boostedLayers: ArchLayer[] = [
  {
    label: 'Infrastructure',
    name: 'Balancer V3 Vault',
    className: 'vault',
    detail: 'Singleton vault with native ERC-4626 buffer layer — manages lending deposits at the vault level',
    delay: 0,
  },
  {
    label: 'Yield Layer',
    name: 'ERC-4626 Buffers',
    className: 'pool',
    detail: 'Wraps lending protocol shares (aTokens, sTokens) — vault routes surplus reserves automatically',
    delay: 0.15,
  },
  {
    label: 'Pool Module',
    name: 'Stable / Weighted Pool',
    className: 'token',
    detail: 'Standard pool math on top of yield-bearing tokens — swap fees + lending yield in one position',
    delay: 0.3,
  },
];

export const boostedDetails: ArchDetail[] = [
  { label: 'Yield Standard', value: 'ERC-4626 (tokenized vaults)' },
  { label: 'Lending Protocols', value: 'Aave, Silo, Euler (modular)' },
  { label: 'Buffer Management', value: 'Vault-level, not per-pool' },
];
