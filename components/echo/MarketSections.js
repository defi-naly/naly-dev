'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import echoesData from '@/data/echoes.json';

function formatPrice(price) {
  if (price >= 1000) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (price >= 1) {
    return price.toFixed(2);
  }
  return price.toFixed(4);
}

function formatChange(change) {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

function TickerCard({ ticker, price, change, loading }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3 hover:border-neutral-700 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono text-neutral-500">{ticker.symbol}</span>
        {!loading && change !== undefined && (
          <span className={`text-xs font-mono ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {formatChange(change)}
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-white">{ticker.name}</span>
        {loading ? (
          <div className="h-4 w-16 bg-neutral-800 rounded animate-pulse" />
        ) : (
          <span className="text-sm font-mono text-neutral-300">
            ${formatPrice(price)}
          </span>
        )}
      </div>
    </div>
  );
}

function MarketSection({ section, data, loading }) {
  return (
    <div>
      <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-3">
        {section.label}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {section.tickers.map((ticker) => {
          const tickerData = data?.[ticker.symbol] || {};
          return (
            <TickerCard
              key={ticker.symbol}
              ticker={ticker}
              price={tickerData.price}
              change={tickerData.change}
              loading={loading}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function MarketSections() {
  const [marketData, setMarketData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const marketSections = echoesData.marketSections;

  useEffect(() => {
    async function fetchMarketData() {
      try {
        const response = await fetch('/api/market-prices');
        if (response.ok) {
          const data = await response.json();
          setMarketData(data.prices || {});
          setLastUpdated(new Date());
        } else {
          setError('Failed to fetch market data');
        }
      } catch (err) {
        console.error('Failed to fetch market data:', err);
        setError('Failed to fetch market data');
      } finally {
        setLoading(false);
      }
    }

    fetchMarketData();

    // Refresh every 60 seconds
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!marketSections) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Markets</h2>
        {lastUpdated && !loading && (
          <span className="text-xs font-mono text-neutral-600">
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-400 mb-4">{error}</div>
      )}

      <div className="space-y-6">
        {Object.entries(marketSections).map(([key, section]) => (
          <MarketSection
            key={key}
            section={section}
            data={marketData}
            loading={loading}
          />
        ))}
      </div>
    </motion.div>
  );
}
