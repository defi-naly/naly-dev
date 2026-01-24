import { NextResponse } from 'next/server';
import echoesData from '@/data/echoes.json';

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

    const changePercent = ((currentPrice - previousClose) / previousClose) * 100;

    return {
      price: currentPrice,
      change: changePercent,
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error.message);
    return null;
  }
}

export async function GET() {
  try {
    const marketSections = echoesData.marketSections;

    if (!marketSections) {
      return NextResponse.json({ prices: {}, error: 'No market sections configured' });
    }

    // Collect all tickers from all sections
    const allTickers = [];
    for (const section of Object.values(marketSections)) {
      for (const ticker of section.tickers) {
        allTickers.push(ticker.symbol);
      }
    }

    // Fetch all tickers in parallel
    const results = await Promise.all(
      allTickers.map(async (symbol) => {
        const data = await fetchYahooQuote(symbol);
        return { symbol, data };
      })
    );

    // Build prices object
    const prices = {};
    for (const { symbol, data } of results) {
      if (data) {
        prices[symbol] = data;
      }
    }

    return NextResponse.json({
      prices,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching market prices:', error);

    return NextResponse.json({
      prices: {},
      timestamp: new Date().toISOString(),
      error: 'Failed to fetch market data',
    });
  }
}
