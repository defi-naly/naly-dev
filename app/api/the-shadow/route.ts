import { NextResponse } from 'next/server';
import {
  BTC_GENESIS,
  ZEC_GENESIS,
  BTC_HALVINGS,
  ZEC_HALVINGS,
  BTC_EARLY_PRICES,
  BTC_FALLBACK_PRICES,
  ZEC_FALLBACK_PRICES,
  SHIELDED_POOLS,
  TOTAL_SHIELDED,
  BTC_CIRCULATING_SUPPLY,
  ZEC_CIRCULATING_SUPPLY,
  SHIELDED_PCT_OF_CIRCULATING,
  ZEC_BLOCK_REWARD,
  ZEC_DAILY_EMISSION,
  ZEC_ANNUAL_INFLATION,
  ZEC_NEXT_HALVING_DATE,
  ZEC_NEXT_HALVING_EPOCH,
  daysSinceGenesis,
} from '@/data/shadow';

export const dynamic = 'force-dynamic';

interface PricePoint {
  day: number;
  price: number;
  date: string;
}

interface OHLCCandle {
  day: number;       // daysSinceGenesis of the week start
  open: number;
  high: number;
  low: number;
  close: number;
  date: string;      // calendar date of week start
}

// Convert CoinGecko market_chart prices to daysSinceGenesis format
function toDaysSeries(
  data: [number, number][],
  genesis: string
): PricePoint[] {
  return data.map(([timestamp, price]) => {
    const dateStr = new Date(timestamp).toISOString().split('T')[0];
    return {
      day: daysSinceGenesis(dateStr, genesis),
      price,
      date: dateStr,
    };
  });
}

// Merge hardcoded early data with API data, deduplicate by date
function mergeAndDedupe(
  hardcoded: { date: string; price: number }[],
  live: PricePoint[],
  genesis: string
): PricePoint[] {
  const map = new Map<string, PricePoint>();

  for (const h of hardcoded) {
    const day = daysSinceGenesis(h.date, genesis);
    if (day >= 0) {
      map.set(h.date, { day, price: h.price, date: h.date });
    }
  }

  // Live data overwrites hardcoded for same dates
  for (const point of live) {
    map.set(point.date, point);
  }

  return Array.from(map.values()).sort((a, b) => a.day - b.day);
}

// Aggregate daily prices into weekly OHLC candles
function aggregateToWeekly(daily: PricePoint[]): OHLCCandle[] {
  if (daily.length === 0) return [];

  const weeks = new Map<number, PricePoint[]>();

  for (const point of daily) {
    const weekNum = Math.floor(point.day / 7);
    if (!weeks.has(weekNum)) weeks.set(weekNum, []);
    weeks.get(weekNum)!.push(point);
  }

  return Array.from(weeks.entries())
    .sort(([a], [b]) => a - b)
    .map(([weekNum, points]) => {
      points.sort((a, b) => a.day - b.day);
      return {
        day: weekNum * 7,
        open: points[0].price,
        high: Math.max(...points.map((p) => p.price)),
        low: Math.min(...points.map((p) => p.price)),
        close: points[points.length - 1].price,
        date: points[0].date,
      };
    });
}

// Calculate BTC supply at a given day from genesis using emission schedule
function btcSupplyAtDay(day: number): number {
  const totalBlocks = day * 144; // ~144 blocks/day
  const halvingInterval = 210_000;
  let supply = 0;
  let remainingBlocks = totalBlocks;
  let reward = 50;
  while (remainingBlocks > 0 && reward > 0.00000001) {
    const blocksInEpoch = Math.min(remainingBlocks, halvingInterval);
    supply += blocksInEpoch * reward;
    remainingBlocks -= blocksInEpoch;
    reward /= 2;
  }
  return supply;
}

// Find BTC's price, supply, and market cap at the same lifecycle age as ZEC today
function getBtcAtSameAge(btcCandles: OHLCCandle[], zecAgeDays: number) {
  // Find the closest BTC candle to zecAgeDays
  let closestCandle = btcCandles[0];
  let closestDist = Infinity;
  for (const candle of btcCandles) {
    const dist = Math.abs(candle.day - zecAgeDays);
    if (dist < closestDist) {
      closestCandle = candle;
      closestDist = dist;
    }
  }

  const price = closestCandle?.close ?? 0;
  const supply = btcSupplyAtDay(zecAgeDays);
  const calendarDate = new Date(
    new Date(BTC_GENESIS).getTime() + zecAgeDays * 24 * 60 * 60 * 1000
  ).toISOString().split('T')[0];

  return {
    price,
    supply: Math.round(supply),
    marketCap: price * supply,
    day: zecAgeDays,
    calendarDate,
  };
}

export async function GET() {
  try {
    // Fetch BTC and ZEC price history (365 days = free tier limit) + current prices
    const [btcHistRes, zecHistRes, priceRes] = await Promise.all([
      fetch(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily',
        { headers: { Accept: 'application/json' }, next: { revalidate: 3600 } }
      ),
      fetch(
        'https://api.coingecko.com/api/v3/coins/zcash/market_chart?vs_currency=usd&days=365&interval=daily',
        { headers: { Accept: 'application/json' }, next: { revalidate: 3600 } }
      ),
      fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,zcash&vs_currencies=usd&include_market_cap=true',
        { headers: { Accept: 'application/json' }, next: { revalidate: 3600 } }
      ),
    ]);

    if (!btcHistRes.ok || !zecHistRes.ok || !priceRes.ok) {
      throw new Error(`CoinGecko API returned non-200: btcHist=${btcHistRes.status} zecHist=${zecHistRes.status} price=${priceRes.status}`);
    }

    const [btcHist, zecHist, priceData] = await Promise.all([
      btcHistRes.json(),
      zecHistRes.json(),
      priceRes.json(),
    ]);

    // Check for error in response body (CoinGecko can return 200 with error body)
    if (btcHist.error) throw new Error(`CoinGecko BTC history error: ${btcHist.error}`);
    if (zecHist.error) throw new Error(`CoinGecko ZEC history error: ${zecHist.error}`);
    if (priceData.error) throw new Error(`CoinGecko price error: ${priceData.error}`);

    // Convert to daysSinceGenesis series
    const btcLive = toDaysSeries(btcHist.prices, BTC_GENESIS);
    const zecLive = toDaysSeries(zecHist.prices, ZEC_GENESIS);

    // Merge hardcoded early BTC data with live
    const btcDaily = mergeAndDedupe(BTC_EARLY_PRICES, btcLive, BTC_GENESIS);
    const zecDaily = mergeAndDedupe(ZEC_FALLBACK_PRICES, zecLive, ZEC_GENESIS);

    // Aggregate to weekly OHLC candles
    const btcCandles = aggregateToWeekly(btcDaily);
    const zecCandles = aggregateToWeekly(zecDaily);

    // Calculate days until next ZEC halving
    const now = new Date();
    const nextHalving = new Date(ZEC_NEXT_HALVING_DATE);
    const daysUntilHalving = Math.max(
      0,
      Math.floor((nextHalving.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    );

    // Figure out ZEC's equivalent BTC epoch day
    const zecAge = daysSinceGenesis(now.toISOString().split('T')[0], ZEC_GENESIS);
    const btcEquivYear = new Date(
      new Date(BTC_GENESIS).getTime() + zecAge * 24 * 60 * 60 * 1000
    );

    // BTC price at the same lifecycle age as ZEC today
    const btcAtSameAge = getBtcAtSameAge(btcCandles, zecAge);

    return NextResponse.json({
      btc: {
        candles: btcCandles,
        current: {
          price: priceData.bitcoin?.usd ?? 0,
          marketCap: priceData.bitcoin?.usd_market_cap ?? 0,
          supply: BTC_CIRCULATING_SUPPLY,
        },
        atSameAge: btcAtSameAge,
      },
      zec: {
        candles: zecCandles,
        current: {
          price: priceData.zcash?.usd ?? 0,
          marketCap: priceData.zcash?.usd_market_cap ?? 0,
          supply: ZEC_CIRCULATING_SUPPLY,
        },
      },
      halvings: {
        btc: BTC_HALVINGS,
        zec: ZEC_HALVINGS,
      },
      emission: {
        zecBlockReward: ZEC_BLOCK_REWARD,
        zecDailyEmission: ZEC_DAILY_EMISSION,
        zecAnnualInflation: ZEC_ANNUAL_INFLATION,
        nextHalvingDate: ZEC_NEXT_HALVING_DATE,
        nextHalvingEpoch: ZEC_NEXT_HALVING_EPOCH,
        daysUntilHalving,
        btcEquivDate: btcEquivYear.toISOString().split('T')[0],
        zecAgeDays: zecAge,
      },
      shieldedPool: {
        pools: SHIELDED_POOLS,
        totalShielded: TOTAL_SHIELDED,
        circulatingSupply: ZEC_CIRCULATING_SUPPLY,
        pctOfCirculating: SHIELDED_PCT_OF_CIRCULATING,
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'live' as const,
    });
  } catch (error) {
    console.error('Error fetching Shadow data:', error);

    // Fallback: build candles from hardcoded data
    const btcDaily: PricePoint[] = BTC_FALLBACK_PRICES.map((p) => ({
      day: daysSinceGenesis(p.date, BTC_GENESIS),
      price: p.price,
      date: p.date,
    }));
    const zecDaily: PricePoint[] = ZEC_FALLBACK_PRICES.map((p) => ({
      day: daysSinceGenesis(p.date, ZEC_GENESIS),
      price: p.price,
      date: p.date,
    }));

    const btcCandles = aggregateToWeekly(btcDaily);
    const zecCandles = aggregateToWeekly(zecDaily);

    const now = new Date();
    const nextHalving = new Date(ZEC_NEXT_HALVING_DATE);
    const daysUntilHalving = Math.max(
      0,
      Math.floor((nextHalving.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    );
    const zecAge = daysSinceGenesis(now.toISOString().split('T')[0], ZEC_GENESIS);
    const btcEquivYear = new Date(
      new Date(BTC_GENESIS).getTime() + zecAge * 24 * 60 * 60 * 1000
    );

    const btcAtSameAge = getBtcAtSameAge(btcCandles, zecAge);

    return NextResponse.json({
      btc: {
        candles: btcCandles,
        current: { price: 93000, marketCap: 1_830_000_000_000, supply: 19_600_000 },
        atSameAge: btcAtSameAge,
      },
      zec: {
        candles: zecCandles,
        current: { price: 38, marketCap: 620_000_000, supply: 16_300_000 },
      },
      halvings: {
        btc: BTC_HALVINGS,
        zec: ZEC_HALVINGS,
      },
      emission: {
        zecBlockReward: ZEC_BLOCK_REWARD,
        zecDailyEmission: ZEC_DAILY_EMISSION,
        zecAnnualInflation: ZEC_ANNUAL_INFLATION,
        nextHalvingDate: ZEC_NEXT_HALVING_DATE,
        nextHalvingEpoch: ZEC_NEXT_HALVING_EPOCH,
        daysUntilHalving,
        btcEquivDate: btcEquivYear.toISOString().split('T')[0],
        zecAgeDays: zecAge,
      },
      shieldedPool: {
        pools: SHIELDED_POOLS,
        totalShielded: TOTAL_SHIELDED,
        circulatingSupply: ZEC_CIRCULATING_SUPPLY,
        pctOfCirculating: SHIELDED_PCT_OF_CIRCULATING,
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'fallback' as const,
      error: 'Using fallback data - live fetch failed',
    });
  }
}
