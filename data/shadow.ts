// ============================================================
// Static constants and fallback data for The Shadow tool
// BTC vs ZEC cycle comparison
// ============================================================

export const BTC_GENESIS = '2009-01-03';
export const ZEC_GENESIS = '2016-10-28';

// Days since genesis for each halving
export const BTC_HALVINGS = [
  { epoch: 1, date: '2012-11-28', daysSinceGenesis: 1426 },
  { epoch: 2, date: '2016-07-09', daysSinceGenesis: 2744 },
  { epoch: 3, date: '2020-05-11', daysSinceGenesis: 4147 },
  { epoch: 4, date: '2024-04-20', daysSinceGenesis: 5586 },
];

export const ZEC_HALVINGS = [
  { epoch: 1, date: '2020-11-18', daysSinceGenesis: 1483 },
  { epoch: 2, date: '2024-11-23', daysSinceGenesis: 2949 },
];

// BTC early price data — monthly, 2010-2016
// CoinGecko lacks reliable pre-2013 data, so hardcoded from historical records
export const BTC_EARLY_PRICES: { date: string; price: number }[] = [
  { date: '2010-07-01', price: 0.08 },
  { date: '2010-10-01', price: 0.10 },
  { date: '2011-01-01', price: 0.30 },
  { date: '2011-02-01', price: 1.00 },
  { date: '2011-04-01', price: 1.10 },
  { date: '2011-06-01', price: 15.00 },
  { date: '2011-07-01', price: 14.00 },
  { date: '2011-09-01', price: 5.00 },
  { date: '2011-11-01', price: 2.50 },
  { date: '2012-01-01', price: 5.00 },
  { date: '2012-04-01', price: 5.00 },
  { date: '2012-07-01', price: 8.00 },
  { date: '2012-10-01', price: 11.00 },
  { date: '2012-12-01', price: 13.00 },
  { date: '2013-01-01', price: 13.50 },
  { date: '2013-03-01', price: 47.00 },
  { date: '2013-04-01', price: 135.00 },
  { date: '2013-05-01', price: 120.00 },
  { date: '2013-07-01', price: 90.00 },
  { date: '2013-10-01', price: 140.00 },
  { date: '2013-12-01', price: 750.00 },
  { date: '2014-01-01', price: 800.00 },
  { date: '2014-03-01', price: 600.00 },
  { date: '2014-06-01', price: 580.00 },
  { date: '2014-09-01', price: 390.00 },
  { date: '2014-12-01', price: 310.00 },
  { date: '2015-01-01', price: 260.00 },
  { date: '2015-04-01', price: 245.00 },
  { date: '2015-07-01', price: 285.00 },
  { date: '2015-10-01', price: 270.00 },
  { date: '2016-01-01', price: 430.00 },
  { date: '2016-04-01', price: 420.00 },
  { date: '2016-06-01', price: 530.00 },
  { date: '2016-07-01', price: 660.00 },
  { date: '2016-10-01', price: 620.00 },
  { date: '2016-12-01', price: 780.00 },
  { date: '2017-01-01', price: 1000.00 },
  { date: '2017-03-01', price: 1200.00 },
  { date: '2017-05-01', price: 1700.00 },
  { date: '2017-06-01', price: 2500.00 },
  { date: '2017-08-01', price: 4300.00 },
  { date: '2017-10-01', price: 6000.00 },
  { date: '2017-12-01', price: 14000.00 },
  { date: '2018-01-01', price: 13500.00 },
  { date: '2018-02-01', price: 8500.00 },
  { date: '2018-04-01', price: 7000.00 },
];

// ZEC fallback price data — monthly, 2016-present
export const ZEC_FALLBACK_PRICES: { date: string; price: number }[] = [
  { date: '2016-10-28', price: 4300.00 },
  { date: '2016-11-01', price: 800.00 },
  { date: '2016-12-01', price: 50.00 },
  { date: '2017-01-01', price: 48.00 },
  { date: '2017-03-01', price: 42.00 },
  { date: '2017-05-01', price: 100.00 },
  { date: '2017-06-01', price: 350.00 },
  { date: '2017-09-01', price: 210.00 },
  { date: '2017-12-01', price: 500.00 },
  { date: '2018-01-01', price: 600.00 },
  { date: '2018-03-01', price: 260.00 },
  { date: '2018-06-01', price: 165.00 },
  { date: '2018-09-01', price: 120.00 },
  { date: '2018-12-01', price: 55.00 },
  { date: '2019-03-01', price: 50.00 },
  { date: '2019-06-01', price: 80.00 },
  { date: '2019-09-01', price: 38.00 },
  { date: '2019-12-01', price: 30.00 },
  { date: '2020-02-01', price: 50.00 },
  { date: '2020-03-01', price: 25.00 },
  { date: '2020-06-01', price: 48.00 },
  { date: '2020-08-01', price: 75.00 },
  { date: '2020-11-01', price: 65.00 },
  { date: '2021-02-01', price: 95.00 },
  { date: '2021-05-01', price: 250.00 },
  { date: '2021-08-01', price: 120.00 },
  { date: '2021-11-01', price: 230.00 },
  { date: '2022-01-01', price: 160.00 },
  { date: '2022-04-01', price: 140.00 },
  { date: '2022-06-01', price: 65.00 },
  { date: '2022-09-01', price: 55.00 },
  { date: '2022-12-01', price: 40.00 },
  { date: '2023-03-01', price: 37.00 },
  { date: '2023-06-01', price: 28.00 },
  { date: '2023-09-01', price: 24.00 },
  { date: '2023-12-01', price: 28.00 },
  { date: '2024-03-01', price: 27.00 },
  { date: '2024-06-01', price: 22.00 },
  { date: '2024-09-01', price: 30.00 },
  { date: '2024-12-01', price: 35.00 },
  { date: '2025-01-01', price: 38.00 },
];

// BTC fallback price data — monthly, for when CoinGecko fails
export const BTC_FALLBACK_PRICES: { date: string; price: number }[] = [
  ...BTC_EARLY_PRICES,
  { date: '2016-12-01', price: 780.00 },
  { date: '2017-01-01', price: 1000.00 },
  { date: '2017-03-01', price: 1200.00 },
  { date: '2017-06-01', price: 2500.00 },
  { date: '2017-09-01', price: 4200.00 },
  { date: '2017-12-01', price: 14000.00 },
  { date: '2018-01-01', price: 13500.00 },
  { date: '2018-06-01', price: 6300.00 },
  { date: '2018-12-01', price: 3700.00 },
  { date: '2019-06-01', price: 11000.00 },
  { date: '2019-12-01', price: 7200.00 },
  { date: '2020-03-01', price: 6400.00 },
  { date: '2020-06-01', price: 9100.00 },
  { date: '2020-12-01', price: 29000.00 },
  { date: '2021-04-01', price: 58000.00 },
  { date: '2021-07-01', price: 33000.00 },
  { date: '2021-11-01', price: 67000.00 },
  { date: '2022-06-01', price: 20000.00 },
  { date: '2022-12-01', price: 16500.00 },
  { date: '2023-06-01', price: 30000.00 },
  { date: '2023-12-01', price: 42000.00 },
  { date: '2024-03-01', price: 70000.00 },
  { date: '2024-06-01', price: 64000.00 },
  { date: '2024-12-01', price: 95000.00 },
  { date: '2025-01-01', price: 93000.00 },
];

// Shielded pool data (from sovereign-zec-dashboard)
export const SHIELDED_POOLS = [
  { name: 'Orchard', zec: 4_210_000, color: '#F4B728', colorDim: 'rgba(244, 183, 40, 0.15)' },
  { name: 'Sapling', zec: 7_850_000, color: '#A78BFA', colorDim: 'rgba(167, 139, 250, 0.15)' },
  { name: 'Sprout', zec: 1_940_000, color: '#6B7084', colorDim: 'rgba(107, 112, 132, 0.15)' },
];

export const TOTAL_SHIELDED = SHIELDED_POOLS.reduce((sum, p) => sum + p.zec, 0);
export const BTC_CIRCULATING_SUPPLY = 19_800_000; // approximate, updates slowly
export const ZEC_CIRCULATING_SUPPLY = 16_300_000; // approximate
export const SHIELDED_PCT_OF_CIRCULATING = Math.round((TOTAL_SHIELDED / ZEC_CIRCULATING_SUPPLY) * 1000) / 10;

// Emission constants
export const ZEC_BLOCK_REWARD = 1.5625; // post-halving 2 (Nov 2024)
export const BTC_BLOCK_REWARD = 3.125; // post-halving 4 (Apr 2024)
export const ZEC_BLOCKS_PER_DAY = 1152; // ~75 sec block time
export const BTC_BLOCKS_PER_DAY = 144; // ~10 min block time
export const ZEC_DAILY_EMISSION = ZEC_BLOCK_REWARD * ZEC_BLOCKS_PER_DAY;
export const BTC_DAILY_EMISSION = BTC_BLOCK_REWARD * BTC_BLOCKS_PER_DAY;
export const ZEC_ANNUAL_INFLATION = 4.2; // approximate %
export const BTC_ANNUAL_INFLATION = 1.7; // approximate %
export const ZEC_NEXT_HALVING_DATE = '2028-11-01';
export const ZEC_NEXT_HALVING_EPOCH = 3;

// BTC vs ZEC comparison table
export const COMPARISON_DATA = [
  { property: 'Hard cap', btc: '21M', zec: '21M' },
  { property: 'Halvings completed', btc: '4', zec: '2' },
  { property: 'Current inflation', btc: '~1.7%', zec: '~4.2%' },
  { property: 'Block time', btc: '~10 min', zec: '~75 sec' },
  { property: 'Privacy', btc: 'Pseudonymous', zec: 'Shielded (zk-SNARKs)' },
  { property: 'Genesis', btc: 'Jan 2009', zec: 'Oct 2016' },
  { property: 'Consensus', btc: 'Proof of Work', zec: 'Proof of Work' },
  { property: 'Supply model', btc: 'Deflationary', zec: 'Deflationary' },
];

// Utility: calculate days since genesis
export function daysSinceGenesis(dateStr: string, genesis: string): number {
  const date = new Date(dateStr);
  const gen = new Date(genesis);
  return Math.floor((date.getTime() - gen.getTime()) / (1000 * 60 * 60 * 24));
}

// Utility: convert daysSinceGenesis to "Year X" label
export function dayToYearLabel(day: number): string {
  const year = Math.floor(day / 365) + 1;
  return `Year ${year}`;
}
