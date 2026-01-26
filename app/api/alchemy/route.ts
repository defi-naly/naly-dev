import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Fallback historical data for resilience
const FALLBACK_DATA = [
  { date: '2017-01-01', cryptoIndex: 100, commoditiesIndex: 100, spread: 0 },
  { date: '2017-12-01', cryptoIndex: 1400, commoditiesIndex: 108, spread: 1292 }, // Crypto peak
  { date: '2018-12-01', cryptoIndex: 200, commoditiesIndex: 102, spread: 98 },    // Crypto winter
  { date: '2019-12-01', cryptoIndex: 450, commoditiesIndex: 118, spread: 332 },
  { date: '2020-12-01', cryptoIndex: 1100, commoditiesIndex: 135, spread: 965 },
  { date: '2021-11-01', cryptoIndex: 2700, commoditiesIndex: 140, spread: 2560 }, // Crypto ATH
  { date: '2022-12-01', cryptoIndex: 400, commoditiesIndex: 145, spread: 255 },   // Crypto collapse
  { date: '2023-12-01', cryptoIndex: 900, commoditiesIndex: 160, spread: 740 },
  { date: '2024-12-01', cryptoIndex: 1800, commoditiesIndex: 175, spread: 1625 },
];

// Yahoo Finance API endpoint
async function fetchYahooFinanceData(symbol: string, period1: number, period2: number) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=1wk&includePrePost=false`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${symbol}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

function processYahooData(data: any): { date: string; price: number }[] {
  const result = data?.chart?.result?.[0];
  if (!result) return [];

  const timestamps = result.timestamp || [];
  const closes = result.indicators?.quote?.[0]?.close || [];

  return timestamps.map((ts: number, i: number) => ({
    date: new Date(ts * 1000).toISOString().split('T')[0],
    price: closes[i],
  })).filter((d: { date: string; price: number | null }) => d.price != null);
}

function calculateStats(values: number[]) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const sd = Math.sqrt(variance);
  return { mean, sd };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'max';

    // Calculate date range
    const now = Math.floor(Date.now() / 1000);
    let startDate: number;

    switch (range) {
      case '1y':
        startDate = now - (365 * 24 * 60 * 60);
        break;
      case '3y':
        startDate = now - (3 * 365 * 24 * 60 * 60);
        break;
      case '5y':
        startDate = now - (5 * 365 * 24 * 60 * 60);
        break;
      case 'max':
      default:
        // Start from Jan 2017 when crypto started becoming mainstream
        startDate = Math.floor(new Date('2017-01-01').getTime() / 1000);
        break;
    }

    // Fetch all 4 symbols in parallel
    const [btcResponse, ethResponse, goldResponse, silverResponse] = await Promise.all([
      fetchYahooFinanceData('BTC-USD', startDate, now),
      fetchYahooFinanceData('ETH-USD', startDate, now),
      fetchYahooFinanceData('GC=F', startDate, now),
      fetchYahooFinanceData('SI=F', startDate, now),
    ]);

    const btcData = processYahooData(btcResponse);
    const ethData = processYahooData(ethResponse);
    const goldData = processYahooData(goldResponse);
    const silverData = processYahooData(silverResponse);

    // Create maps for lookup
    const btcMap = new Map(btcData.map(d => [d.date, d.price]));
    const ethMap = new Map(ethData.map(d => [d.date, d.price]));
    const goldMap = new Map(goldData.map(d => [d.date, d.price]));
    const silverMap = new Map(silverData.map(d => [d.date, d.price]));

    // Find the base prices (first available date for normalization)
    const allDates = Array.from(new Set(btcData.map(d => d.date))).sort();

    // Find first date where all 4 assets have data
    let baseDate: string | null = null;
    let baseBtc = 0, baseEth = 0, baseGold = 0, baseSilver = 0;

    for (const date of allDates) {
      const btc = btcMap.get(date);
      const eth = ethMap.get(date);
      const gold = goldMap.get(date);
      const silver = silverMap.get(date);

      if (btc && eth && gold && silver) {
        baseDate = date;
        baseBtc = btc;
        baseEth = eth;
        baseGold = gold;
        baseSilver = silver;
        break;
      }
    }

    if (!baseDate) {
      throw new Error('Could not find base date with all assets');
    }

    // Calculate normalized indices and spread for each date
    const history: {
      date: string;
      cryptoIndex: number;
      commoditiesIndex: number;
      spread: number;
      spreadPercent: number;
    }[] = [];

    for (const date of allDates) {
      const btc = btcMap.get(date);
      const eth = ethMap.get(date);
      const gold = goldMap.get(date);
      const silver = silverMap.get(date);

      if (btc && eth && gold && silver) {
        // Normalize to base 100
        const btcNorm = (btc / baseBtc) * 100;
        const ethNorm = (eth / baseEth) * 100;
        const goldNorm = (gold / baseGold) * 100;
        const silverNorm = (silver / baseSilver) * 100;

        // Weighted indices (70/30 split)
        const cryptoIndex = btcNorm * 0.7 + ethNorm * 0.3;
        const commoditiesIndex = goldNorm * 0.7 + silverNorm * 0.3;

        const spread = cryptoIndex - commoditiesIndex;
        const spreadPercent = commoditiesIndex > 0
          ? ((cryptoIndex - commoditiesIndex) / commoditiesIndex) * 100
          : 0;

        history.push({
          date,
          cryptoIndex: Math.round(cryptoIndex * 100) / 100,
          commoditiesIndex: Math.round(commoditiesIndex * 100) / 100,
          spread: Math.round(spread * 100) / 100,
          spreadPercent: Math.round(spreadPercent * 10) / 10,
        });
      }
    }

    // Calculate bands
    const spreads = history.map(h => h.spread);
    const { mean, sd } = calculateStats(spreads);

    const bands = {
      upper2SD: Math.round((mean + 2 * sd) * 100) / 100,
      upper1SD: Math.round((mean + sd) * 100) / 100,
      mean: Math.round(mean * 100) / 100,
      lower1SD: Math.round((mean - sd) * 100) / 100,
      lower2SD: Math.round((mean - 2 * sd) * 100) / 100,
    };

    // Find extreme points (beyond 2 SD)
    const extremes: { date: string; spread: number; label: string }[] = [];
    for (const point of history) {
      if (point.spread > bands.upper2SD) {
        extremes.push({
          date: point.date,
          spread: point.spread,
          label: 'Crypto Euphoria',
        });
      } else if (point.spread < bands.lower2SD) {
        extremes.push({
          date: point.date,
          spread: point.spread,
          label: 'Physical Flight',
        });
      }
    }

    // Get current values
    const current = history.length > 0 ? history[history.length - 1] : null;
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
      extremes: extremes.slice(-10), // Last 10 extreme points
      lastUpdated: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching Alchemy data:', error);

    // Calculate stats from fallback data
    const spreads = FALLBACK_DATA.map(d => d.spread);
    const { mean, sd } = calculateStats(spreads);
    const current = FALLBACK_DATA[FALLBACK_DATA.length - 1];

    return NextResponse.json({
      history: FALLBACK_DATA.map(d => ({
        ...d,
        spreadPercent: d.commoditiesIndex > 0
          ? Math.round(((d.cryptoIndex - d.commoditiesIndex) / d.commoditiesIndex) * 1000) / 10
          : 0,
      })),
      current: {
        spread: current.spread,
        spreadPercent: Math.round(((current.cryptoIndex - current.commoditiesIndex) / current.commoditiesIndex) * 1000) / 10,
        cryptoIndex: current.cryptoIndex,
        commoditiesIndex: current.commoditiesIndex,
        regime: current.spread > 0 ? 'crypto' as const : 'commodities' as const,
      },
      bands: {
        upper2SD: Math.round((mean + 2 * sd) * 100) / 100,
        upper1SD: Math.round((mean + sd) * 100) / 100,
        mean: Math.round(mean * 100) / 100,
        lower1SD: Math.round((mean - sd) * 100) / 100,
        lower2SD: Math.round((mean - 2 * sd) * 100) / 100,
      },
      extremes: [
        { date: '2017-12-01', spread: 1292, label: 'Crypto Mania' },
        { date: '2021-11-01', spread: 2560, label: 'Crypto ATH' },
      ],
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data - live fetch failed',
    });
  }
}
