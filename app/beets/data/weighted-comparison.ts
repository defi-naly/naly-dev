import { ComparisonColumn, ComparisonRowData } from '../components/ComparisonTable';

export const weightedComparisonColumns: ComparisonColumn[] = [
  { key: 'feature', label: 'Feature' },
  { key: 'weighted', label: 'Weighted Pools', highlight: true },
  { key: 'uniV2', label: 'Uniswap V2 (50/50)' },
  { key: 'manual', label: 'Manual Portfolio' },
];

export const weightedComparisonRows: ComparisonRowData[] = [
  {
    feature: 'Token Count',
    weighted: 'Up to 8',
    uniV2: '2',
    manual: 'Unlimited',
  },
  {
    feature: 'Custom Weights',
    weighted: 'Any ratio',
    uniV2: '50/50 only',
    manual: 'Manual',
  },
  {
    feature: 'Rebalancing',
    weighted: 'Automatic (arb-driven)',
    uniV2: 'N/A (fixed 50/50)',
    manual: 'Manual + gas',
  },
  {
    feature: 'Swap Fee Yield',
    weighted: 'Yes',
    uniV2: 'Yes',
    manual: 'No',
  },
  {
    feature: 'Position Type',
    weighted: 'ERC-20 (fungible)',
    uniV2: 'ERC-20 (fungible)',
    manual: 'Individual tokens',
  },
  {
    feature: 'DeFi Composability',
    weighted: 'Full (BPT)',
    uniV2: 'Limited',
    manual: 'Per-token only',
  },
];
