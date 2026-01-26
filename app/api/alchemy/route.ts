import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Metals supply constants (above-ground reserves)
const GOLD_SUPPLY_OZ = 6_334_000_000;   // ~197,000 tonnes = 6.334 billion troy oz
const SILVER_SUPPLY_OZ = 54_700_000_000; // ~1.7M tonnes = 54.7 billion troy oz

// Historical data with market caps (in billions USD) and metal prices
// BTC/ETH market caps from historical records, metal prices for calculating metals market cap
const HISTORICAL_DATA = [
  // date, btcMcap (B), ethMcap (B), goldPrice ($/oz), silverPrice ($/oz)
  { date: '2017-01-01', btcMcap: 16, ethMcap: 0.7, gold: 1210, silver: 17.0 },
  { date: '2017-06-01', btcMcap: 42, ethMcap: 21, gold: 1255, silver: 16.7 },
  { date: '2017-12-01', btcMcap: 230, ethMcap: 45, gold: 1265, silver: 16.5 },
  { date: '2018-06-01', btcMcap: 105, ethMcap: 45, gold: 1275, silver: 16.2 },
  { date: '2018-12-01', btcMcap: 66, ethMcap: 13, gold: 1280, silver: 15.5 },
  { date: '2019-06-01', btcMcap: 195, ethMcap: 30, gold: 1410, silver: 15.0 },
  { date: '2019-12-01', btcMcap: 130, ethMcap: 14, gold: 1480, silver: 17.0 },
  { date: '2020-03-01', btcMcap: 158, ethMcap: 24, gold: 1580, silver: 14.5 },
  { date: '2020-06-01', btcMcap: 172, ethMcap: 26, gold: 1770, silver: 18.0 },
  { date: '2020-09-01', btcMcap: 200, ethMcap: 40, gold: 1920, silver: 27.0 },
  { date: '2020-12-01', btcMcap: 540, ethMcap: 85, gold: 1880, silver: 26.0 },
  { date: '2021-03-01', btcMcap: 1080, ethMcap: 210, gold: 1730, silver: 26.0 },
  { date: '2021-06-01', btcMcap: 650, ethMcap: 270, gold: 1770, silver: 26.0 },
  { date: '2021-09-01', btcMcap: 880, ethMcap: 400, gold: 1760, silver: 22.5 },
  { date: '2021-11-01', btcMcap: 1200, ethMcap: 560, gold: 1790, silver: 23.5 },
  { date: '2021-12-01', btcMcap: 860, ethMcap: 440, gold: 1800, silver: 23.0 },
  { date: '2022-06-01', btcMcap: 385, ethMcap: 130, gold: 1830, silver: 21.5 },
  { date: '2022-12-01', btcMcap: 320, ethMcap: 145, gold: 1810, silver: 24.0 },
  { date: '2023-06-01', btcMcap: 590, ethMcap: 220, gold: 1960, silver: 23.5 },
  { date: '2023-12-01', btcMcap: 820, ethMcap: 275, gold: 2060, silver: 24.0 },
  { date: '2024-03-01', btcMcap: 1350, ethMcap: 420, gold: 2180, silver: 24.5 },
  { date: '2024-06-01', btcMcap: 1260, ethMcap: 410, gold: 2330, silver: 29.0 },
  { date: '2024-09-01', btcMcap: 1240, ethMcap: 290, gold: 2550, silver: 30.5 },
  { date: '2024-12-01', btcMcap: 1850, ethMcap: 410, gold: 2620, silver: 30.0 },
];

// Calculate metals market cap from prices
function calculateMetalsMarketCap(goldPrice: number, silverPrice: number): number {
  const goldMcap = (goldPrice * GOLD_SUPPLY_OZ) / 1e9; // in billions
  const silverMcap = (silverPrice * SILVER_SUPPLY_OZ) / 1e9; // in billions
  return goldMcap + silverMcap;
}

// Fetch last 365 days of crypto data from CoinGecko (free tier limit)
// Returns market caps in billions USD
async function fetchCoinGeckoData(coin: 'bitcoin' | 'ethereum'): Promise<{ date: string; marketCap: number }[]> {
  const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=365&interval=daily`;

  const response = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`CoinGecko API error for ${coin}: ${response.status}`);
  }

  const data = await response.json();

  // Check for API error in response body
  if (data.error) {
    throw new Error(`CoinGecko error: ${data.error.error_message || 'Unknown error'}`);
  }

  // Use market_caps array instead of prices - CoinGecko returns [timestamp, value] pairs
  return data.market_caps.map((item: [number, number]) => ({
    date: new Date(item[0]).toISOString().split('T')[0],
    marketCap: item[1] / 1e9, // Convert to billions
  }));
}

// Get current metal prices (fallback to latest historical)
async function fetchMetalPrice(metal: 'gold' | 'silver'): Promise<number> {
  const fallbackPrices = { gold: 2620, silver: 30 };

  try {
    const response = await fetch(`https://api.metals.live/v1/spot/${metal}`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 300 },
    });

    if (response.ok) {
      const data = await response.json();
      if (data[0]?.price) return data[0].price;
    }
  } catch (e) {
    // Fall through to fallback
  }

  return fallbackPrices[metal];
}

// Interpolate commodity prices using historical data
function getCommodityPricesForDate(date: string, currentGold: number, currentSilver: number): { gold: number; silver: number } {
  const targetDate = new Date(date);
  const now = new Date();

  // Recent dates use current prices
  const daysDiff = (now.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24);
  if (daysDiff < 30) return { gold: currentGold, silver: currentSilver };

  // Find surrounding historical points for interpolation
  for (let i = 0; i < HISTORICAL_DATA.length - 1; i++) {
    const curr = HISTORICAL_DATA[i];
    const next = HISTORICAL_DATA[i + 1];

    if (targetDate >= new Date(curr.date) && targetDate <= new Date(next.date)) {
      const ratio = (targetDate.getTime() - new Date(curr.date).getTime()) /
                    (new Date(next.date).getTime() - new Date(curr.date).getTime());
      return {
        gold: curr.gold + (next.gold - curr.gold) * ratio,
        silver: curr.silver + (next.silver - curr.silver) * ratio,
      };
    }
  }

  // Beyond historical data, interpolate to current
  const last = HISTORICAL_DATA[HISTORICAL_DATA.length - 1];
  const lastDate = new Date(last.date);
  if (targetDate > lastDate) {
    const ratio = Math.min(1, (targetDate.getTime() - lastDate.getTime()) / (now.getTime() - lastDate.getTime()));
    return {
      gold: last.gold + (currentGold - last.gold) * ratio,
      silver: last.silver + (currentSilver - last.silver) * ratio,
    };
  }

  return { gold: HISTORICAL_DATA[0].gold, silver: HISTORICAL_DATA[0].silver };
}

function calculateStats(values: number[]) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  return { mean, sd: Math.sqrt(variance) };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'max';

    // Determine date range
    const now = new Date();
    let startDate: Date;

    switch (range) {
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      case '3y':
        startDate = new Date(now.getTime() - 3 * 365 * 24 * 60 * 60 * 1000);
        break;
      case '5y':
        startDate = new Date(now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000);
        break;
      case 'max':
      default:
        startDate = new Date('2017-01-01');
        break;
    }

    // Fetch live crypto data and current metal prices
    const [btcLive, ethLive, currentGold, currentSilver] = await Promise.all([
      fetchCoinGeckoData('bitcoin'),
      fetchCoinGeckoData('ethereum'),
      fetchMetalPrice('gold'),
      fetchMetalPrice('silver'),
    ]);

    // Build maps for live data (now using market caps in billions)
    const btcLiveMap = new Map(btcLive.map(d => [d.date, d.marketCap]));
    const ethLiveMap = new Map(ethLive.map(d => [d.date, d.marketCap]));

    // Get cutoff date for live vs historical data
    const liveCutoff = new Date(btcLive[0]?.date || now);

    // Build combined dataset with market cap data
    type DataPoint = { date: string; btcMcap: number; ethMcap: number; gold: number; silver: number };
    const combinedData: DataPoint[] = [];

    // Add historical data points that are before the live cutoff
    for (const h of HISTORICAL_DATA) {
      const hDate = new Date(h.date);
      if (hDate >= startDate && hDate < liveCutoff) {
        combinedData.push({
          date: h.date,
          btcMcap: h.btcMcap,
          ethMcap: h.ethMcap,
          gold: h.gold,
          silver: h.silver,
        });
      }
    }

    // Add live data points (weekly sampling to reduce size)
    const liveWeekly = btcLive.filter((_, i) => i % 7 === 0 || i === btcLive.length - 1);
    for (const d of liveWeekly) {
      const ethMcap = ethLiveMap.get(d.date);
      if (ethMcap === undefined) continue;

      const dDate = new Date(d.date);
      if (dDate < startDate) continue;

      const metalPrices = getCommodityPricesForDate(d.date, currentGold, currentSilver);

      combinedData.push({
        date: d.date,
        btcMcap: d.marketCap,
        ethMcap: ethMcap,
        gold: metalPrices.gold,
        silver: metalPrices.silver,
      });
    }

    // Sort by date
    combinedData.sort((a, b) => a.date.localeCompare(b.date));

    if (combinedData.length === 0) {
      throw new Error('No data points after filtering');
    }

    // Calculate market cap ratio for each data point
    // Ratio = (BTC + ETH market cap) / (Gold + Silver market cap) * 100
    const history: {
      date: string;
      cryptoMarketCap: number;    // in billions
      metalsMarketCap: number;    // in billions
      ratio: number;              // crypto as % of metals (e.g., 13.2)
    }[] = [];

    for (const d of combinedData) {
      const cryptoMcap = d.btcMcap + d.ethMcap;
      const metalsMcap = calculateMetalsMarketCap(d.gold, d.silver);
      const ratio = (cryptoMcap / metalsMcap) * 100;

      history.push({
        date: d.date,
        cryptoMarketCap: Math.round(cryptoMcap * 10) / 10,
        metalsMarketCap: Math.round(metalsMcap * 10) / 10,
        ratio: Math.round(ratio * 100) / 100,
      });
    }

    // Calculate statistical bands on ratio
    const ratios = history.map(h => h.ratio);
    const { mean, sd } = calculateStats(ratios);

    const bands = {
      upper2SD: Math.round((mean + 2 * sd) * 100) / 100,
      upper1SD: Math.round((mean + sd) * 100) / 100,
      mean: Math.round(mean * 100) / 100,
      lower1SD: Math.round((mean - sd) * 100) / 100,
      lower2SD: Math.round((mean - 2 * sd) * 100) / 100,
    };

    // Find extreme points
    const extremes: { date: string; ratio: number; label: string }[] = [];
    for (const point of history) {
      if (point.ratio > bands.upper2SD) {
        extremes.push({ date: point.date, ratio: point.ratio, label: 'Crypto Euphoria' });
      } else if (point.ratio < bands.lower2SD) {
        extremes.push({ date: point.date, ratio: point.ratio, label: 'Physical Flight' });
      }
    }

    // Current state
    const current = history[history.length - 1];
    const currentRatio = current?.ratio ?? 0;

    let regime: 'expansion' | 'contraction' | 'neutral';
    if (currentRatio > bands.upper1SD) {
      regime = 'expansion';
    } else if (currentRatio < bands.lower1SD) {
      regime = 'contraction';
    } else {
      regime = 'neutral';
    }

    return NextResponse.json({
      history,
      current: {
        ratio: currentRatio,
        cryptoMarketCap: current?.cryptoMarketCap ?? 0,
        metalsMarketCap: current?.metalsMarketCap ?? 0,
        regime,
      },
      bands,
      extremes: extremes.slice(-10),
      lastUpdated: new Date().toISOString(),
      prices: { gold: currentGold, silver: currentSilver },
      dataSource: 'live',
    });

  } catch (error) {
    console.error('Error fetching Alchemy data:', error);

    // Fallback: use only historical data with market cap ratios
    const history = HISTORICAL_DATA.map(d => {
      const cryptoMcap = d.btcMcap + d.ethMcap;
      const metalsMcap = calculateMetalsMarketCap(d.gold, d.silver);
      const ratio = (cryptoMcap / metalsMcap) * 100;

      return {
        date: d.date,
        cryptoMarketCap: Math.round(cryptoMcap * 10) / 10,
        metalsMarketCap: Math.round(metalsMcap * 10) / 10,
        ratio: Math.round(ratio * 100) / 100,
      };
    });

    const ratios = history.map(h => h.ratio);
    const { mean, sd } = calculateStats(ratios);
    const current = history[history.length - 1];

    return NextResponse.json({
      history,
      current: {
        ratio: current.ratio,
        cryptoMarketCap: current.cryptoMarketCap,
        metalsMarketCap: current.metalsMarketCap,
        regime: current.ratio > mean + sd ? 'expansion' as const : current.ratio < mean - sd ? 'contraction' as const : 'neutral' as const,
      },
      bands: {
        upper2SD: Math.round((mean + 2 * sd) * 100) / 100,
        upper1SD: Math.round((mean + sd) * 100) / 100,
        mean: Math.round(mean * 100) / 100,
        lower1SD: Math.round((mean - sd) * 100) / 100,
        lower2SD: Math.round((mean - 2 * sd) * 100) / 100,
      },
      extremes: [
        { date: '2017-12-01', ratio: history.find(h => h.date === '2017-12-01')?.ratio || 0, label: 'Crypto Mania' },
        { date: '2021-11-01', ratio: history.find(h => h.date === '2021-11-01')?.ratio || 0, label: 'Crypto ATH' },
      ],
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data - live fetch failed',
      dataSource: 'fallback',
    });
  }
}
