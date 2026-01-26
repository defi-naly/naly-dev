import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Historical data from 2017-2024 (BTC, ETH, Gold, Silver monthly averages)
// This provides the long-term context that CoinGecko free tier can't access
const HISTORICAL_DATA = [
  { date: '2017-01-01', btc: 998, eth: 8, gold: 1210, silver: 17.0 },
  { date: '2017-06-01', btc: 2500, eth: 230, gold: 1255, silver: 16.7 },
  { date: '2017-12-01', btc: 14000, eth: 450, gold: 1265, silver: 16.5 },
  { date: '2018-06-01', btc: 6200, eth: 450, gold: 1275, silver: 16.2 },
  { date: '2018-12-01', btc: 3800, eth: 130, gold: 1280, silver: 15.5 },
  { date: '2019-06-01', btc: 11000, eth: 280, gold: 1410, silver: 15.0 },
  { date: '2019-12-01', btc: 7200, eth: 130, gold: 1480, silver: 17.0 },
  { date: '2020-03-01', btc: 8600, eth: 220, gold: 1580, silver: 14.5 },
  { date: '2020-06-01', btc: 9400, eth: 230, gold: 1770, silver: 18.0 },
  { date: '2020-09-01', btc: 10800, eth: 360, gold: 1920, silver: 27.0 },
  { date: '2020-12-01', btc: 29000, eth: 740, gold: 1880, silver: 26.0 },
  { date: '2021-03-01', btc: 58000, eth: 1800, gold: 1730, silver: 26.0 },
  { date: '2021-06-01', btc: 35000, eth: 2300, gold: 1770, silver: 26.0 },
  { date: '2021-09-01', btc: 47000, eth: 3400, gold: 1760, silver: 22.5 },
  { date: '2021-11-01', btc: 64000, eth: 4800, gold: 1790, silver: 23.5 },
  { date: '2021-12-01', btc: 46000, eth: 3700, gold: 1800, silver: 23.0 },
  { date: '2022-06-01', btc: 20000, eth: 1100, gold: 1830, silver: 21.5 },
  { date: '2022-12-01', btc: 16500, eth: 1200, gold: 1810, silver: 24.0 },
  { date: '2023-06-01', btc: 30000, eth: 1850, gold: 1960, silver: 23.5 },
  { date: '2023-12-01', btc: 42000, eth: 2300, gold: 2060, silver: 24.0 },
  { date: '2024-03-01', btc: 68000, eth: 3500, gold: 2180, silver: 24.5 },
  { date: '2024-06-01', btc: 64000, eth: 3400, gold: 2330, silver: 29.0 },
  { date: '2024-09-01', btc: 63000, eth: 2400, gold: 2550, silver: 30.5 },
  { date: '2024-12-01', btc: 94000, eth: 3400, gold: 2620, silver: 30.0 },
];

// Fetch last 365 days of crypto data from CoinGecko (free tier limit)
async function fetchCoinGeckoData(coin: 'bitcoin' | 'ethereum'): Promise<{ date: string; price: number }[]> {
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

  return data.prices.map((item: [number, number]) => ({
    date: new Date(item[0]).toISOString().split('T')[0],
    price: item[1],
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
function getCommodityPriceForDate(date: string, metal: 'gold' | 'silver', currentPrice: number): number {
  const targetDate = new Date(date);
  const now = new Date();

  // Recent dates use current price
  const daysDiff = (now.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24);
  if (daysDiff < 30) return currentPrice;

  // Find surrounding historical points for interpolation
  for (let i = 0; i < HISTORICAL_DATA.length - 1; i++) {
    const curr = HISTORICAL_DATA[i];
    const next = HISTORICAL_DATA[i + 1];

    if (targetDate >= new Date(curr.date) && targetDate <= new Date(next.date)) {
      const ratio = (targetDate.getTime() - new Date(curr.date).getTime()) /
                    (new Date(next.date).getTime() - new Date(curr.date).getTime());
      const currPrice = metal === 'gold' ? curr.gold : curr.silver;
      const nextPrice = metal === 'gold' ? next.gold : next.silver;
      return currPrice + (nextPrice - currPrice) * ratio;
    }
  }

  // Beyond historical data, interpolate to current
  const last = HISTORICAL_DATA[HISTORICAL_DATA.length - 1];
  const lastDate = new Date(last.date);
  if (targetDate > lastDate) {
    const ratio = Math.min(1, (targetDate.getTime() - lastDate.getTime()) / (now.getTime() - lastDate.getTime()));
    const lastPrice = metal === 'gold' ? last.gold : last.silver;
    return lastPrice + (currentPrice - lastPrice) * ratio;
  }

  return metal === 'gold' ? HISTORICAL_DATA[0].gold : HISTORICAL_DATA[0].silver;
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

    // Build maps for live data
    const btcLiveMap = new Map(btcLive.map(d => [d.date, d.price]));
    const ethLiveMap = new Map(ethLive.map(d => [d.date, d.price]));

    // Get cutoff date for live vs historical data
    const liveCutoff = new Date(btcLive[0]?.date || now);

    // Build combined dataset
    type DataPoint = { date: string; btc: number; eth: number; gold: number; silver: number };
    const combinedData: DataPoint[] = [];

    // Add historical data points that are before the live cutoff
    for (const h of HISTORICAL_DATA) {
      const hDate = new Date(h.date);
      if (hDate >= startDate && hDate < liveCutoff) {
        combinedData.push({
          date: h.date,
          btc: h.btc,
          eth: h.eth,
          gold: h.gold,
          silver: h.silver,
        });
      }
    }

    // Add live data points (weekly sampling to reduce size)
    const liveWeekly = btcLive.filter((_, i) => i % 7 === 0 || i === btcLive.length - 1);
    for (const d of liveWeekly) {
      const eth = ethLiveMap.get(d.date);
      if (!eth) continue;

      const dDate = new Date(d.date);
      if (dDate < startDate) continue;

      combinedData.push({
        date: d.date,
        btc: d.price,
        eth: eth,
        gold: getCommodityPriceForDate(d.date, 'gold', currentGold),
        silver: getCommodityPriceForDate(d.date, 'silver', currentSilver),
      });
    }

    // Sort by date
    combinedData.sort((a, b) => a.date.localeCompare(b.date));

    if (combinedData.length === 0) {
      throw new Error('No data points after filtering');
    }

    // Base prices for normalization (first data point)
    const base = combinedData[0];
    const baseBtc = base.btc;
    const baseEth = base.eth;
    const baseGold = base.gold;
    const baseSilver = base.silver;

    // Calculate normalized indices
    const history: {
      date: string;
      cryptoIndex: number;
      commoditiesIndex: number;
      spread: number;
      spreadPercent: number;
    }[] = [];

    for (const d of combinedData) {
      const btcNorm = (d.btc / baseBtc) * 100;
      const ethNorm = (d.eth / baseEth) * 100;
      const goldNorm = (d.gold / baseGold) * 100;
      const silverNorm = (d.silver / baseSilver) * 100;

      const cryptoIndex = btcNorm * 0.7 + ethNorm * 0.3;
      const commoditiesIndex = goldNorm * 0.7 + silverNorm * 0.3;
      const spread = cryptoIndex - commoditiesIndex;
      const spreadPercent = commoditiesIndex > 0
        ? ((cryptoIndex - commoditiesIndex) / commoditiesIndex) * 100
        : 0;

      history.push({
        date: d.date,
        cryptoIndex: Math.round(cryptoIndex * 100) / 100,
        commoditiesIndex: Math.round(commoditiesIndex * 100) / 100,
        spread: Math.round(spread * 100) / 100,
        spreadPercent: Math.round(spreadPercent * 10) / 10,
      });
    }

    // Calculate statistical bands
    const spreads = history.map(h => h.spread);
    const { mean, sd } = calculateStats(spreads);

    const bands = {
      upper2SD: Math.round((mean + 2 * sd) * 100) / 100,
      upper1SD: Math.round((mean + sd) * 100) / 100,
      mean: Math.round(mean * 100) / 100,
      lower1SD: Math.round((mean - sd) * 100) / 100,
      lower2SD: Math.round((mean - 2 * sd) * 100) / 100,
    };

    // Find extreme points
    const extremes: { date: string; spread: number; label: string }[] = [];
    for (const point of history) {
      if (point.spread > bands.upper2SD) {
        extremes.push({ date: point.date, spread: point.spread, label: 'Crypto Euphoria' });
      } else if (point.spread < bands.lower2SD) {
        extremes.push({ date: point.date, spread: point.spread, label: 'Physical Flight' });
      }
    }

    // Current state
    const current = history[history.length - 1];
    const currentSpread = current?.spread ?? 0;

    let regime: 'crypto' | 'commodities' | 'neutral';
    if (currentSpread > bands.upper1SD) {
      regime = 'crypto';
    } else if (currentSpread < bands.lower1SD) {
      regime = 'commodities';
    } else {
      regime = 'neutral';
    }

    return NextResponse.json({
      history,
      current: {
        spread: currentSpread,
        spreadPercent: current?.spreadPercent ?? 0,
        cryptoIndex: current?.cryptoIndex ?? 0,
        commoditiesIndex: current?.commoditiesIndex ?? 0,
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

    // Fallback: use only historical data
    const base = HISTORICAL_DATA[0];

    const history = HISTORICAL_DATA.map(d => {
      const btcNorm = (d.btc / base.btc) * 100;
      const ethNorm = (d.eth / base.eth) * 100;
      const goldNorm = (d.gold / base.gold) * 100;
      const silverNorm = (d.silver / base.silver) * 100;

      const cryptoIndex = btcNorm * 0.7 + ethNorm * 0.3;
      const commoditiesIndex = goldNorm * 0.7 + silverNorm * 0.3;
      const spread = cryptoIndex - commoditiesIndex;

      return {
        date: d.date,
        cryptoIndex: Math.round(cryptoIndex * 100) / 100,
        commoditiesIndex: Math.round(commoditiesIndex * 100) / 100,
        spread: Math.round(spread * 100) / 100,
        spreadPercent: Math.round(((cryptoIndex - commoditiesIndex) / commoditiesIndex) * 1000) / 10,
      };
    });

    const spreads = history.map(h => h.spread);
    const { mean, sd } = calculateStats(spreads);
    const current = history[history.length - 1];

    return NextResponse.json({
      history,
      current: {
        spread: current.spread,
        spreadPercent: current.spreadPercent,
        cryptoIndex: current.cryptoIndex,
        commoditiesIndex: current.commoditiesIndex,
        regime: current.spread > mean + sd ? 'crypto' as const : current.spread < mean - sd ? 'commodities' as const : 'neutral' as const,
      },
      bands: {
        upper2SD: Math.round((mean + 2 * sd) * 100) / 100,
        upper1SD: Math.round((mean + sd) * 100) / 100,
        mean: Math.round(mean * 100) / 100,
        lower1SD: Math.round((mean - sd) * 100) / 100,
        lower2SD: Math.round((mean - 2 * sd) * 100) / 100,
      },
      extremes: [
        { date: '2017-12-01', spread: history.find(h => h.date === '2017-12-01')?.spread || 0, label: 'Crypto Mania' },
        { date: '2021-11-01', spread: history.find(h => h.date === '2021-11-01')?.spread || 0, label: 'Crypto ATH' },
      ],
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data - live fetch failed',
      dataSource: 'fallback',
    });
  }
}
