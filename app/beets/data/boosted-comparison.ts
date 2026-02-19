import { ComparisonColumn, ComparisonRowData } from '../components/ComparisonTable';

export const boostedComparisonColumns: ComparisonColumn[] = [
  { key: 'feature', label: 'Feature' },
  { key: 'boosted', label: 'Boosted Pools', highlight: true },
  { key: 'standardAmm', label: 'Standard AMM' },
  { key: 'lendingOnly', label: 'Lending Only' },
];

export const boostedComparisonRows: ComparisonRowData[] = [
  {
    feature: 'Swap Fee Yield',
    boosted: 'Yes',
    standardAmm: 'Yes',
    lendingOnly: 'No',
  },
  {
    feature: 'Lending Yield',
    boosted: 'Yes (automatic)',
    standardAmm: 'No',
    lendingOnly: 'Yes',
  },
  {
    feature: 'Capital Efficiency',
    boosted: 'Near 100%',
    standardAmm: '5-20% utilized',
    lendingOnly: 'High',
  },
  {
    feature: 'Positions Required',
    boosted: '1',
    standardAmm: '1',
    lendingOnly: '1 per asset',
  },
  {
    feature: 'Yield Routing',
    boosted: 'Automatic (ERC-4626)',
    standardAmm: 'N/A',
    lendingOnly: 'Manual',
  },
  {
    feature: 'Swap Depth Under Load',
    boosted: 'Dynamic buffer',
    standardAmm: 'Full reserves',
    lendingOnly: 'N/A',
  },
];
