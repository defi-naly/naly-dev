export type AssetCategory = 'index' | 'stock' | 'crypto' | 'commodity' | 'etf';

export type Denomination = 'usd' | 'real' | 'gold' | 'house';
export type TimeRange = '1Y' | '5Y' | '10Y' | 'MAX';
export type ChartScale = 'linear' | 'log';

export const DENOMINATION_LABELS: Record<Denomination, string> = {
  usd: 'USD',
  real: 'Real',
  gold: 'Gold',
  house: 'House',
};

export const DENOMINATION_DESCRIPTIONS: Record<Denomination, string> = {
  usd: 'Nominal USD value',
  real: 'Inflation-adjusted value',
  gold: 'Priced in gold ounces',
  house: 'Priced in median home value',
};

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  color: string;
  category: AssetCategory;
}

export const ASSETS: Asset[] = [
  // Indices
  { id: 'sp500', name: 'S&P 500', symbol: 'SPY', color: 'var(--chart-1)', category: 'index' },
  { id: 'nasdaq', name: 'Nasdaq 100', symbol: 'QQQ', color: 'var(--chart-2)', category: 'index' },
  { id: 'dow', name: 'Dow Jones', symbol: 'DIA', color: 'var(--chart-3)', category: 'index' },

  // Mag 7 Stocks
  { id: 'aapl', name: 'Apple', symbol: 'AAPL', color: '#A2AAAD', category: 'stock' },
  { id: 'msft', name: 'Microsoft', symbol: 'MSFT', color: '#00A4EF', category: 'stock' },
  { id: 'googl', name: 'Alphabet', symbol: 'GOOGL', color: '#4285F4', category: 'stock' },
  { id: 'amzn', name: 'Amazon', symbol: 'AMZN', color: '#FF9900', category: 'stock' },
  { id: 'nvda', name: 'NVIDIA', symbol: 'NVDA', color: '#76B900', category: 'stock' },
  { id: 'meta', name: 'Meta', symbol: 'META', color: '#0668E1', category: 'stock' },
  { id: 'tsla', name: 'Tesla', symbol: 'TSLA', color: '#CC0000', category: 'stock' },

  // Crypto
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', color: '#F7931A', category: 'crypto' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', color: '#627EEA', category: 'crypto' },

  // Commodities
  { id: 'gold', name: 'Gold', symbol: 'GLD', color: '#FFD700', category: 'commodity' },
  { id: 'silver', name: 'Silver', symbol: 'SLV', color: '#C0C0C0', category: 'commodity' },
  { id: 'oil', name: 'Crude Oil', symbol: 'USO', color: '#8B4513', category: 'commodity' },

  // ETFs
  { id: 'tlt', name: 'Treasury Bonds', symbol: 'TLT', color: '#1E90FF', category: 'etf' },
  { id: 'gld', name: 'Gold ETF', symbol: 'GLD', color: '#DAA520', category: 'etf' },
];
