// The Physical AI Stack - Capital Flow Tracker
// Thesis: Capital is rotating from speculative software to industrialized intelligence

export interface LayerHolding {
  ticker: string;
  name: string;
  role: string;
}

export interface StackLayer {
  id: string;
  ticker: string;
  name: string;
  role: string;
  thesis: string;
  color: string;
  holdings: LayerHolding[];
}

export const stackLayers: StackLayer[] = [
  {
    id: 'baseline',
    ticker: 'SPY',
    name: 'S&P 500',
    role: 'The Baseline',
    thesis: '~40% Big Tech. The benchmark.',
    color: '#71717a', // zinc-500
    holdings: [
      { ticker: 'AAPL', name: 'Apple', role: 'Consumer Tech' },
      { ticker: 'MSFT', name: 'Microsoft', role: 'Enterprise Cloud' },
      { ticker: 'NVDA', name: 'NVIDIA', role: 'AI Compute' },
      { ticker: 'AMZN', name: 'Amazon', role: 'E-commerce/Cloud' },
      { ticker: 'GOOGL', name: 'Alphabet', role: 'Search/AI' },
    ],
  },
  {
    id: 'energy',
    ticker: 'POWR',
    name: 'iShares U.S. Power Infrastructure',
    role: 'The Energy Layer',
    thesis: 'Solving the AI energy bottleneck.',
    color: '#f59e0b', // amber-500
    holdings: [
      { ticker: 'NEE', name: 'NextEra Energy', role: 'Clean energy supply' },
      { ticker: 'PWR', name: 'Quanta Services', role: 'Grid transmission construction' },
      { ticker: 'ETN', name: 'Eaton', role: 'Power management hardware' },
      { ticker: 'GEV', name: 'GE Vernova', role: 'Power generation turbines' },
      { ticker: 'EQT', name: 'EQT Corp', role: 'Natural gas (grid stabilizer)' },
    ],
  },
  {
    id: 'physical',
    ticker: 'IFRA',
    name: 'iShares U.S. Infrastructure',
    role: 'The Physical Layer',
    thesis: 'Data centers, transmission, materials.',
    color: '#8b5cf6', // violet-500
    holdings: [
      { ticker: 'HE', name: 'Hawaiian Electric', role: 'Utility owner' },
      { ticker: 'TGB', name: 'Taseko Mines', role: 'Copper/materials for wiring' },
      { ticker: 'CENX', name: 'Century Aluminum', role: 'Raw materials' },
      { ticker: 'AQN', name: 'Algonquin Power', role: 'Diversified utilities' },
      { ticker: 'KNTK', name: 'Kinetik Holdings', role: 'Energy midstream (pipelines)' },
    ],
  },
  {
    id: 'intelligence',
    ticker: 'BAI',
    name: 'iShares A.I. Innovation & Tech',
    role: 'The Intelligence Layer',
    thesis: 'Chips, networking, agentic AI.',
    color: '#22c55e', // emerald-500
    holdings: [
      { ticker: 'NVDA', name: 'NVIDIA', role: 'The compute engine' },
      { ticker: 'AVGO', name: 'Broadcom', role: 'Networking "nervous system"' },
      { ticker: 'GOOGL', name: 'Alphabet', role: 'Model & search integration' },
      { ticker: 'TSM', name: 'Taiwan Semiconductor', role: 'The manufacturer' },
      { ticker: 'MSFT', name: 'Microsoft', role: 'Enterprise cloud layer' },
    ],
  },
];

// Time range options matching the-fork pattern
export const timeRanges = ['1y', '3y', '5y'] as const;
export type TimeRange = (typeof timeRanges)[number];

// Descriptive labels for the UI
export const timeRangeLabels: Record<TimeRange, string> = {
  '1y': '1 Year',
  '3y': '3 Years',
  '5y': '5 Years',
};
