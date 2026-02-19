import { ComparisonRowData } from '../components/ComparisonTable';

export const comparisonRows: ComparisonRowData[] = [
  {
    feature: 'Range Management',
    reclamms: 'Automatic',
    uniV3: 'Manual',
    fullRange: 'None needed',
  },
  {
    feature: 'Position Type',
    reclamms: 'ERC-20 (fungible)',
    uniV3: 'NFT (non-fungible)',
    fullRange: 'ERC-20 (fungible)',
  },
  {
    feature: 'Oracle Dependency',
    reclamms: 'None',
    uniV3: 'None',
    fullRange: 'None',
  },
  {
    feature: 'JIT Protection',
    reclamms: 'Built-in',
    uniV3: 'None',
    fullRange: 'None',
  },
  {
    feature: 'DeFi Composability',
    reclamms: 'Full',
    uniV3: 'Limited',
    fullRange: 'Full',
  },
  {
    feature: 'Capital Efficiency',
    reclamms: 'High',
    uniV3: 'High (if in range)',
    fullRange: 'Low',
  },
];
