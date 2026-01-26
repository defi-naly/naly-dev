import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Historical SPX/GOLD ratio data (pre-2004, before GLD ETF existed)
// SPX/GOLD = S&P 500 Index Value / Gold Price per Ounce
// Sources: FRED, Yahoo Finance historical, MacroTrends
const HISTORICAL_DATA = [
  // 1970s - End of Bretton Woods, Oil Crisis
  { date: '1971-01-01', ratio: 2.30 },  // SPX ~92, Gold $40
  { date: '1972-01-01', ratio: 2.05 },  // SPX ~119, Gold $58
  { date: '1973-01-01', ratio: 0.92 },  // BREACH - SPX ~97, Gold $106
  { date: '1974-01-01', ratio: 0.37 },  // Deep breach - SPX ~68, Gold $183
  { date: '1975-01-01', ratio: 0.52 },  // SPX ~86, Gold $165
  { date: '1976-01-01', ratio: 0.80 },  // SPX ~103, Gold $129
  { date: '1977-01-01', ratio: 0.65 },  // SPX ~98, Gold $150
  { date: '1978-01-01', ratio: 0.52 },  // SPX ~96, Gold $185
  { date: '1979-01-01', ratio: 0.35 },  // SPX ~104, Gold $300
  { date: '1980-01-01', ratio: 0.22 },  // Gold peaks at $615 avg, SPX ~136
  { date: '1980-06-01', ratio: 0.21 },
  { date: '1981-01-01', ratio: 0.28 },  // SPX ~130, Gold $460
  { date: '1982-01-01', ratio: 0.32 },  // SPX ~120, Gold $376
  { date: '1983-01-01', ratio: 0.38 },  // SPX ~145, Gold $380
  { date: '1984-01-01', ratio: 0.44 },  // SPX ~165, Gold $375

  // 1980s - Recovery
  { date: '1985-01-01', ratio: 0.67 },  // SPX ~212, Gold $317
  { date: '1986-01-01', ratio: 0.62 },  // SPX ~242, Gold $390
  { date: '1987-01-01', ratio: 0.65 },  // SPX ~286, Gold $440
  { date: '1988-01-01', ratio: 0.63 },  // SPX ~265, Gold $420
  { date: '1989-01-01', ratio: 0.88 },  // SPX ~323, Gold $367

  // 1990s - Bull market begins
  { date: '1990-01-01', ratio: 0.85 },  // SPX ~330, Gold $386
  { date: '1991-01-01', ratio: 0.91 },  // SPX ~330, Gold $362
  { date: '1992-01-01', ratio: 1.22 },  // SPX ~417, Gold $342
  { date: '1993-01-01', ratio: 1.26 },  // SPX ~447, Gold $355
  { date: '1994-01-01', ratio: 1.19 },  // SPX ~460, Gold $386
  { date: '1995-01-01', ratio: 1.27 },  // SPX ~487, Gold $384
  { date: '1996-01-01', ratio: 1.60 },  // SPX ~616, Gold $385
  { date: '1997-01-01', ratio: 2.18 },  // SPX ~766, Gold $352
  { date: '1998-01-01', ratio: 3.24 },  // SPX ~963, Gold $297
  { date: '1999-01-01', ratio: 4.57 },  // SPX ~1279, Gold $280
  { date: '2000-01-01', ratio: 5.26 },  // Dot-com peak - SPX ~1469, Gold $279

  // 2000s - Dot-com bust, recovery, GFC
  { date: '2001-01-01', ratio: 4.80 },  // SPX ~1320, Gold $275
  { date: '2002-01-01', ratio: 3.68 },  // SPX ~1130, Gold $307
  { date: '2003-01-01', ratio: 2.46 },  // SPX ~880, Gold $358
  { date: '2004-01-01', ratio: 2.71 },  // SPX ~1112, Gold $410
];

// Threshold value - below this signals regime shift
const THRESHOLD = 1.50;

// Yahoo Finance API endpoint
async function fetchYahooFinanceData(symbol, period1, period2) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=1mo&includePrePost=false`;

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

function processYahooData(data) {
  const result = data?.chart?.result?.[0];
  if (!result) return [];

  const timestamps = result.timestamp || [];
  const closes = result.indicators?.quote?.[0]?.close || [];

  return timestamps.map((ts, i) => ({
    date: new Date(ts * 1000).toISOString().split('T')[0],
    price: closes[i],
  })).filter(d => d.price != null);
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'max'; // 1y, 5y, 10y, max

    // Calculate date range
    const now = Math.floor(Date.now() / 1000);
    let startDate;

    switch (range) {
      case '1y':
        startDate = now - (365 * 24 * 60 * 60);
        break;
      case '5y':
        startDate = now - (5 * 365 * 24 * 60 * 60);
        break;
      case '10y':
        startDate = now - (10 * 365 * 24 * 60 * 60);
        break;
      case 'max':
      default:
        // GLD inception was Nov 2004, so start from there for live data
        startDate = Math.floor(new Date('2004-11-01').getTime() / 1000);
        break;
    }

    // Fetch SPY and GLD data in parallel
    const [spyResponse, gldResponse] = await Promise.all([
      fetchYahooFinanceData('SPY', startDate, now),
      fetchYahooFinanceData('GLD', startDate, now),
    ]);

    const spyData = processYahooData(spyResponse);
    const gldData = processYahooData(gldResponse);

    // Create a map for easy lookup
    const gldMap = new Map(gldData.map(d => [d.date, d.price]));

    // Calculate ratio for each date where we have both prices
    // SPY and GLD both trade at ~1/10th of their underlying (SPX and Gold)
    // So SPY/GLD ≈ SPX/GOLD (the scaling factors cancel out)
    const liveHistory = spyData
      .filter(spy => gldMap.has(spy.date))
      .map(spy => {
        const gldPrice = gldMap.get(spy.date);
        const ratio = spy.price / gldPrice;
        return {
          date: spy.date,
          ratio: Math.round(ratio * 100) / 100,
          spy: Math.round(spy.price * 100) / 100,
          gld: Math.round(gldPrice * 100) / 100,
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Combine historical + live data for 'max' range
    let history;
    if (range === 'max') {
      // Filter historical data to before GLD inception
      const historicalBeforeGLD = HISTORICAL_DATA.filter(
        d => new Date(d.date) < new Date('2004-11-01')
      );
      history = [...historicalBeforeGLD, ...liveHistory];
    } else {
      history = liveHistory;
    }

    // Get current values
    const current = history.length > 0 ? history[history.length - 1] : null;
    const currentRatio = current?.ratio || 0;
    const status = currentRatio >= THRESHOLD ? 'above' : 'breached';

    // Calculate breach statistics
    const breachPeriods = [];
    let inBreach = false;
    let breachStart = null;

    for (const point of history) {
      if (point.ratio < THRESHOLD && !inBreach) {
        inBreach = true;
        breachStart = point.date;
      } else if (point.ratio >= THRESHOLD && inBreach) {
        breachPeriods.push({ start: breachStart, end: point.date });
        inBreach = false;
        breachStart = null;
      }
    }
    if (inBreach) {
      breachPeriods.push({ start: breachStart, end: null });
    }

    // Historical breach outcomes (hardcoded from research)
    const breachOutcomes = {
      '1973': { drawdown: -48, duration: '2 years', context: 'Oil crisis, end of gold standard' },
      '2008': { drawdown: -57, duration: '17 months', context: 'Global Financial Crisis' },
    };

    const avgDrawdown = -52; // Average of -48% and -57%

    return NextResponse.json({
      current: {
        ratio: currentRatio,
        date: current?.date,
        spy: current?.spy,
        gld: current?.gld,
      },
      threshold: THRESHOLD,
      status,
      history,
      breachPeriods,
      breachCount: 2, // Historical major breaches
      avgDrawdownAfterBreach: avgDrawdown,
      breachOutcomes,
      lastUpdated: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching The Line data:', error);

    // Return fallback with estimated current ratio
    // As of Jan 2025: SPX ~6000, Gold ~$2700, ratio ≈ 2.22
    const fallbackCurrent = {
      ratio: 2.22,
      date: new Date().toISOString().split('T')[0],
      spy: 600,
      gld: 270,
    };

    return NextResponse.json({
      current: fallbackCurrent,
      threshold: THRESHOLD,
      status: fallbackCurrent.ratio >= THRESHOLD ? 'above' : 'breached',
      history: [...HISTORICAL_DATA, fallbackCurrent],
      breachPeriods: [
        { start: '1973-01-01', end: '1992-01-01' },
      ],
      breachCount: 2,
      avgDrawdownAfterBreach: -52,
      breachOutcomes: {
        '1973': { drawdown: -48, duration: '2 years', context: 'Oil crisis, end of gold standard' },
        '2008': { drawdown: -57, duration: '17 months', context: 'Global Financial Crisis' },
      },
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data - live fetch failed',
    });
  }
}
