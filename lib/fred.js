/**
 * FRED API utilities for fetching economic data
 *
 * API Documentation: https://fred.stlouisfed.org/docs/api/fred/
 *
 * For MVP: Uses hardcoded defaults from echoes.json
 * Optional: Set NEXT_PUBLIC_FRED_API_KEY to enable live data
 */

const FRED_API_BASE = 'https://api.stlouisfed.org/fred/series/observations';

// FRED series IDs for our metrics
const FRED_SERIES = {
  unemployment: 'UNRATE',      // Civilian Unemployment Rate
  fedRate: 'FEDFUNDS',         // Federal Funds Rate
  cpi: 'CPIAUCSL',             // Consumer Price Index (for inflation calc)
  debtGDP: 'GFDEGDQ188S',      // Federal Debt to GDP
  goldPrice: 'GOLDAMGBD228NLBM', // Gold Price
  m2: 'M2SL',                  // M2 Money Supply
};

/**
 * Fetch a single series from FRED
 */
async function fetchFredSeries(seriesId, limit = 1) {
  const apiKey = process.env.NEXT_PUBLIC_FRED_API_KEY;

  if (!apiKey) {
    throw new Error('FRED API key not configured');
  }

  const params = new URLSearchParams({
    series_id: seriesId,
    api_key: apiKey,
    file_type: 'json',
    limit: limit.toString(),
    sort_order: 'desc',
  });

  const response = await fetch(`${FRED_API_BASE}?${params}`);

  if (!response.ok) {
    throw new Error(`FRED API error: ${response.status}`);
  }

  const data = await response.json();
  return data.observations;
}

/**
 * Get the latest value for a FRED series
 */
async function getLatestValue(seriesId) {
  const observations = await fetchFredSeries(seriesId, 1);

  if (!observations || observations.length === 0) {
    return null;
  }

  const value = parseFloat(observations[0].value);
  return isNaN(value) ? null : value;
}

/**
 * Calculate year-over-year inflation from CPI
 */
async function calculateInflation() {
  const apiKey = process.env.NEXT_PUBLIC_FRED_API_KEY;

  if (!apiKey) {
    throw new Error('FRED API key not configured');
  }

  const params = new URLSearchParams({
    series_id: 'CPIAUCSL',
    api_key: apiKey,
    file_type: 'json',
    limit: '13', // Need 13 months to calculate YoY
    sort_order: 'desc',
  });

  const response = await fetch(`${FRED_API_BASE}?${params}`);

  if (!response.ok) {
    throw new Error(`FRED API error: ${response.status}`);
  }

  const data = await response.json();
  const observations = data.observations;

  if (!observations || observations.length < 13) {
    return null;
  }

  const currentCPI = parseFloat(observations[0].value);
  const yearAgoCPI = parseFloat(observations[12].value);

  if (isNaN(currentCPI) || isNaN(yearAgoCPI)) {
    return null;
  }

  return ((currentCPI - yearAgoCPI) / yearAgoCPI) * 100;
}

/**
 * Calculate Gold/M2 ratio
 */
async function calculateGoldM2Ratio() {
  const [goldPrice, m2] = await Promise.all([
    getLatestValue(FRED_SERIES.goldPrice),
    getLatestValue(FRED_SERIES.m2),
  ]);

  if (!goldPrice || !m2) {
    return null;
  }

  // M2 is in billions, gold is per oz
  // Normalize: (gold price * 1000) / M2 in billions
  return (goldPrice * 1000) / m2;
}

/**
 * Fetch all available metrics from FRED
 * Returns partial results if some fetches fail
 */
export async function fetchFredMetrics() {
  const results = {};
  const errors = [];

  // Fetch direct metrics
  const directFetches = [
    { key: 'unemployment', seriesId: FRED_SERIES.unemployment },
    { key: 'fedRate', seriesId: FRED_SERIES.fedRate },
    { key: 'debtGDP', seriesId: FRED_SERIES.debtGDP },
  ];

  await Promise.all(
    directFetches.map(async ({ key, seriesId }) => {
      try {
        const value = await getLatestValue(seriesId);
        if (value !== null) {
          results[key] = value;
        }
      } catch (error) {
        errors.push({ key, error: error.message });
      }
    })
  );

  // Fetch calculated metrics
  try {
    const inflation = await calculateInflation();
    if (inflation !== null) {
      results.inflation = Math.round(inflation * 10) / 10;
    }
  } catch (error) {
    errors.push({ key: 'inflation', error: error.message });
  }

  try {
    const goldM2 = await calculateGoldM2Ratio();
    if (goldM2 !== null) {
      results.goldM2 = Math.round(goldM2 * 100) / 100;
    }
  } catch (error) {
    errors.push({ key: 'goldM2', error: error.message });
  }

  return {
    metrics: results,
    errors: errors.length > 0 ? errors : null,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Check if FRED API is configured
 */
export function isFredConfigured() {
  return !!process.env.NEXT_PUBLIC_FRED_API_KEY;
}
