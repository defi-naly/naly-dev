import { NextResponse } from 'next/server';

// Ticker symbols configuration
const TICKERS = [
  { symbol: 'GC=F', name: 'GOLD', displaySymbol: 'XAU' },
  { symbol: 'SI=F', name: 'SILVER', displaySymbol: 'XAG' },
  { symbol: 'URA', name: 'URA', displaySymbol: 'URA' },
  { symbol: '^GSPC', name: 'S&P 500', displaySymbol: 'SPX' },
  { symbol: 'BTC-USD', name: 'BITCOIN', displaySymbol: 'BTC' },
];

// Fetch quote data from Yahoo Finance
async function fetchYahooQuote(symbol) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=2d`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${symbol}: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data?.chart?.result?.[0];

    if (!result) {
      throw new Error(`No data for ${symbol}`);
    }

    const meta = result.meta;
    const quote = result.indicators?.quote?.[0];
    const closes = quote?.close?.filter(c => c != null) || [];

    // Get current price and previous close
    const currentPrice = meta.regularMarketPrice || closes[closes.length - 1];
    const previousClose = meta.previousClose || meta.chartPreviousClose || closes[closes.length - 2];

    if (!currentPrice || !previousClose) {
      throw new Error(`Missing price data for ${symbol}`);
    }

    const change = currentPrice - previousClose;
    const changePercent = ((change / previousClose) * 100);

    return {
      price: currentPrice,
      change,
      changePercent,
      previousClose,
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error.message);
    return null;
  }
}

export async function GET() {
  try {
    // Fetch all tickers in parallel
    const results = await Promise.all(
      TICKERS.map(async (ticker) => {
        const data = await fetchYahooQuote(ticker.symbol);
        return {
          symbol: ticker.displaySymbol,
          name: ticker.name,
          ...data,
        };
      })
    );

    // Filter out failed fetches and format response
    const tickers = results.filter(r => r.price != null).map(ticker => ({
      symbol: ticker.symbol,
      name: ticker.name,
      price: formatPrice(ticker.price, ticker.symbol),
      change: ticker.change,
      changePercent: Math.round(ticker.changePercent * 100) / 100,
    }));

    return NextResponse.json({
      tickers,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching tickers:', error);

    // Return fallback data on error
    return NextResponse.json({
      tickers: TICKERS.map(t => ({
        symbol: t.displaySymbol,
        name: t.name,
        price: '—',
        change: 0,
        changePercent: 0,
      })),
      timestamp: new Date().toISOString(),
      error: 'Using fallback data - live fetch failed',
    });
  }
}

// Format price based on asset type
function formatPrice(price, symbol) {
  if (symbol === 'BTC') {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
  if (symbol === 'XAU' || symbol === 'SPX') {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  if (symbol === 'XAG') {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
