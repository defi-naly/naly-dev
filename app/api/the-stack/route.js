import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// ETFs in the Physical AI Stack
const TICKERS = ['SPY', 'POWR', 'IFRA', 'BAI'];

// Layer metadata
const LAYER_META = {
  SPY: { id: 'baseline', name: 'S&P 500', role: 'The Baseline', color: '#71717a' },
  POWR: { id: 'energy', name: 'Power Infrastructure', role: 'Energy Layer', color: '#f59e0b' },
  IFRA: { id: 'physical', name: 'U.S. Infrastructure', role: 'Physical Layer', color: '#8b5cf6' },
  BAI: { id: 'intelligence', name: 'AI Innovation', role: 'Intelligence Layer', color: '#22c55e' },
};

// Fetch historical price data from Yahoo Finance
async function fetchHistoricalData(symbol, period1, period2) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=1d&includePrePost=false`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${symbol}: ${response.statusText}`);
  }

  return response.json();
}

// Fetch quote data (includes dividend yield) from Yahoo Finance
async function fetchQuoteData(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const meta = data?.chart?.result?.[0]?.meta;

  return {
    price: meta?.regularMarketPrice || 0,
    previousClose: meta?.previousClose || 0,
    fiftyTwoWeekHigh: meta?.fiftyTwoWeekHigh || 0,
    fiftyTwoWeekLow: meta?.fiftyTwoWeekLow || 0,
  };
}

// Process Yahoo Finance chart data into price array
function processHistoricalData(data) {
  const result = data?.chart?.result?.[0];
  if (!result) return [];

  const timestamps = result.timestamp || [];
  const closes = result.indicators?.quote?.[0]?.close || [];
  const adjCloses = result.indicators?.adjclose?.[0]?.adjclose || closes;

  return timestamps.map((ts, i) => ({
    date: new Date(ts * 1000).toISOString().split('T')[0],
    price: adjCloses[i] ?? closes[i],
  })).filter(d => d.price != null);
}

// Calculate normalized returns (starting at 100)
function normalizeReturns(data, startPrice) {
  return data.map(d => ({
    date: d.date,
    value: (d.price / startPrice) * 100,
    price: d.price,
  }));
}

// Calculate period returns
function calculateReturns(data) {
  if (data.length < 2) return { ytd: 0, total: 0 };

  const first = data[0].price;
  const last = data[data.length - 1].price;
  const total = ((last - first) / first) * 100;

  // YTD: find the last trading day of previous year
  const currentYear = new Date().getFullYear();
  const yearStart = data.find(d => d.date.startsWith(String(currentYear)));
  const ytd = yearStart
    ? ((last - yearStart.price) / yearStart.price) * 100
    : total;

  return { ytd, total };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '1y';

    // Calculate date range
    const now = Math.floor(Date.now() / 1000);
    let startDate;

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
      default:
        startDate = now - (365 * 24 * 60 * 60);
    }

    // Fetch all ETF data in parallel
    const [historicalPromises, quotePromises] = [
      TICKERS.map(t => fetchHistoricalData(t, startDate, now)),
      TICKERS.map(t => fetchQuoteData(t)),
    ];

    const historicalResults = await Promise.all(historicalPromises);
    const quoteResults = await Promise.all(quotePromises);

    // Process each ETF
    const etfData = {};
    const normalized = {};

    for (let i = 0; i < TICKERS.length; i++) {
      const ticker = TICKERS[i];
      const historical = processHistoricalData(historicalResults[i]);
      const quote = quoteResults[i];

      if (historical.length === 0) {
        console.warn(`No data for ${ticker}`);
        continue;
      }

      const returns = calculateReturns(historical);
      const startPrice = historical[0].price;
      const normalizedData = normalizeReturns(historical, startPrice);

      etfData[ticker] = {
        ...LAYER_META[ticker],
        ticker,
        currentPrice: quote?.price || historical[historical.length - 1].price,
        ytdReturn: Math.round(returns.ytd * 100) / 100,
        totalReturn: Math.round(returns.total * 100) / 100,
        fiftyTwoWeekHigh: quote?.fiftyTwoWeekHigh,
        fiftyTwoWeekLow: quote?.fiftyTwoWeekLow,
      };

      normalized[ticker] = normalizedData;
    }

    // Create unified timeline with all ETFs
    // Find all unique dates across all ETFs
    const allDates = new Set();
    Object.values(normalized).forEach(data => {
      data.forEach(d => allDates.add(d.date));
    });

    // Sort dates
    const sortedDates = Array.from(allDates).sort();

    // Build history array with all ETFs for each date
    const history = sortedDates.map(date => {
      const point = { date };
      TICKERS.forEach(ticker => {
        const tickerData = normalized[ticker]?.find(d => d.date === date);
        if (tickerData) {
          point[ticker] = Math.round(tickerData.value * 100) / 100;
        }
      });
      return point;
    }).filter(point => {
      // Only include dates where we have SPY data (the baseline)
      return point.SPY !== undefined;
    });

    // Calculate which layer is currently "leading"
    const latest = history[history.length - 1];
    const leadingLayer = TICKERS.filter(t => t !== 'SPY')
      .map(t => ({ ticker: t, value: latest[t] || 0 }))
      .sort((a, b) => b.value - a.value)[0];

    // Determine regime
    const regime = {
      leader: leadingLayer?.ticker,
      leaderName: LAYER_META[leadingLayer?.ticker]?.role || 'Unknown',
      spyValue: latest?.SPY || 100,
      leaderValue: leadingLayer?.value || 100,
      outperformance: Math.round((leadingLayer?.value - (latest?.SPY || 100)) * 100) / 100,
    };

    // Approximate dividend yields (these should ideally come from a reliable source)
    // Using typical yields as fallback - in production, fetch from Yahoo or another API
    const dividendYields = {
      SPY: 1.25,   // S&P 500 typically ~1.2-1.5%
      POWR: 1.80,  // Infrastructure/utilities usually higher
      IFRA: 2.10,  // Infrastructure ETFs typically 2%+
      BAI: 0.30,   // Growth/tech ETFs usually low yield
    };

    return NextResponse.json({
      etfs: etfData,
      history,
      range,
      regime,
      dividendYields,
      lastUpdated: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching The Stack data:', error);

    // Return fallback data
    return NextResponse.json({
      etfs: {
        SPY: { ...LAYER_META.SPY, ticker: 'SPY', currentPrice: 600, ytdReturn: 0, totalReturn: 0 },
        POWR: { ...LAYER_META.POWR, ticker: 'POWR', currentPrice: 35, ytdReturn: 0, totalReturn: 0 },
        IFRA: { ...LAYER_META.IFRA, ticker: 'IFRA', currentPrice: 45, ytdReturn: 0, totalReturn: 0 },
        BAI: { ...LAYER_META.BAI, ticker: 'BAI', currentPrice: 30, ytdReturn: 0, totalReturn: 0 },
      },
      history: [],
      range: '1y',
      regime: {
        leader: 'BAI',
        leaderName: 'Intelligence Layer',
        spyValue: 100,
        leaderValue: 100,
        outperformance: 0,
      },
      dividendYields: {
        SPY: 1.25,
        POWR: 1.80,
        IFRA: 2.10,
        BAI: 0.30,
      },
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data - live fetch failed',
    });
  }
}
