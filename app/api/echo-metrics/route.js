import { NextResponse } from 'next/server';

// FRED API configuration
const FRED_API_KEY = process.env.FRED_API_KEY;

// Fallback defaults based on most recent data (updated periodically)
const FALLBACK_METRICS = {
  debtGDP: 123,
  cape: 37,
  unemployment: 4.1,
  inflation: 2.9,
  fedRate: 4.5,
  top1Share: 50,
  goldM2: 0.09,
  polarization: 0.96,
  lastUpdated: '2025-01',
};

// Fetch data from FRED API
async function fetchFRED(seriesId) {
  if (!FRED_API_KEY) return null;

  try {
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=1`;
    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) return null;

    const data = await response.json();
    const observation = data?.observations?.[0];

    if (observation && observation.value !== '.') {
      return parseFloat(observation.value);
    }
    return null;
  } catch (error) {
    console.error(`FRED fetch error for ${seriesId}:`, error);
    return null;
  }
}

// Fetch gold price from Yahoo Finance
async function fetchGoldPrice() {
  try {
    const now = Math.floor(Date.now() / 1000);
    const oneWeekAgo = now - (7 * 24 * 60 * 60);
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/GC=F?period1=${oneWeekAgo}&period2=${now}&interval=1d`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) return null;

    const data = await response.json();
    const closes = data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];
    const latestPrice = closes.filter(p => p != null).pop();
    return latestPrice;
  } catch (error) {
    console.error('Gold price fetch error:', error);
    return null;
  }
}

export async function GET() {
  try {
    // Fetch multiple data sources in parallel
    const [
      debtGDP,
      unemployment,
      inflation,
      fedRate,
      m2,
      goldPrice,
    ] = await Promise.all([
      fetchFRED('GFDEGDQ188S'), // Federal Debt to GDP
      fetchFRED('UNRATE'),      // Unemployment Rate
      fetchFRED('CPIAUCSL'),    // CPI (need to calculate YoY)
      fetchFRED('FEDFUNDS'),    // Fed Funds Rate
      fetchFRED('M2SL'),        // M2 Money Supply (billions)
      fetchGoldPrice(),
    ]);

    // Also fetch CPI from a year ago for inflation calculation
    let inflationYoY = FALLBACK_METRICS.inflation;
    if (FRED_API_KEY) {
      try {
        const url = `https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=13`;
        const response = await fetch(url, { next: { revalidate: 86400 } });
        if (response.ok) {
          const data = await response.json();
          const observations = data?.observations || [];
          if (observations.length >= 13) {
            const currentCPI = parseFloat(observations[0]?.value);
            const yearAgoCPI = parseFloat(observations[12]?.value);
            if (currentCPI && yearAgoCPI) {
              inflationYoY = ((currentCPI - yearAgoCPI) / yearAgoCPI) * 100;
              inflationYoY = Math.round(inflationYoY * 10) / 10;
            }
          }
        }
      } catch (error) {
        console.error('Inflation calculation error:', error);
      }
    }

    // Calculate Gold/M2 ratio
    // Gold price is per ounce, M2 is in billions
    // To make ratio meaningful: (Gold price * gold_ounces_equivalent) / M2
    // Simplified: just use gold_price / (M2 * 100) to get a ratio in the 0.01-0.25 range
    let goldM2 = FALLBACK_METRICS.goldM2;
    if (goldPrice && m2) {
      // M2 is in billions, gold in dollars
      // Using a scalar to get ratio in expected range
      goldM2 = Math.round((goldPrice / (m2 * 100)) * 1000) / 1000;
    }

    // Build metrics object, using fallbacks where live data unavailable
    const metrics = {
      debtGDP: debtGDP !== null ? Math.round(debtGDP * 10) / 10 : FALLBACK_METRICS.debtGDP,
      cape: FALLBACK_METRICS.cape, // Shiller PE not easily available via free API
      unemployment: unemployment !== null ? Math.round(unemployment * 10) / 10 : FALLBACK_METRICS.unemployment,
      inflation: inflationYoY,
      fedRate: fedRate !== null ? Math.round(fedRate * 100) / 100 : FALLBACK_METRICS.fedRate,
      top1Share: FALLBACK_METRICS.top1Share, // Wealth data updated annually
      goldM2: goldM2,
      polarization: FALLBACK_METRICS.polarization, // Academic data, static
      lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    };

    // Track which values are live vs fallback
    const sources = {
      debtGDP: debtGDP !== null ? 'FRED' : 'fallback',
      cape: 'estimate',
      unemployment: unemployment !== null ? 'FRED' : 'fallback',
      inflation: FRED_API_KEY ? 'FRED' : 'fallback',
      fedRate: fedRate !== null ? 'FRED' : 'fallback',
      top1Share: 'estimate',
      goldM2: (goldPrice && m2) ? 'calculated' : 'fallback',
      polarization: 'estimate',
    };

    return NextResponse.json({
      metrics,
      sources,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching echo metrics:', error);

    // Return fallback on error
    return NextResponse.json({
      metrics: FALLBACK_METRICS,
      sources: {
        debtGDP: 'fallback',
        cape: 'fallback',
        unemployment: 'fallback',
        inflation: 'fallback',
        fedRate: 'fallback',
        top1Share: 'fallback',
        goldM2: 'fallback',
        polarization: 'fallback',
      },
      timestamp: new Date().toISOString(),
      error: 'Using fallback data - live fetch failed',
    });
  }
}
