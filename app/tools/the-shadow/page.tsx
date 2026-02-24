'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import ShadowChart from '@/components/tools/the-shadow/ShadowChart';
import ViewToggle, { type ViewMode } from '@/components/tools/the-shadow/ViewToggle';
import MetricsDashboard from '@/components/tools/the-shadow/MetricsDashboard';
import ComparisonTable from '@/components/tools/the-shadow/ComparisonTable';
import PrivacyNarrative from '@/components/tools/the-shadow/PrivacyNarrative';

interface OHLCCandle {
  day: number;
  open: number;
  high: number;
  low: number;
  close: number;
  date: string;
}

interface ShadowData {
  btc: {
    candles: OHLCCandle[];
    current: { price: number; marketCap: number; supply: number };
    atSameAge: { price: number; supply: number; marketCap: number; day: number; calendarDate: string };
  };
  zec: {
    candles: OHLCCandle[];
    current: { price: number; marketCap: number; supply: number };
  };
  halvings: {
    btc: { epoch: number; date: string; daysSinceGenesis: number }[];
    zec: { epoch: number; date: string; daysSinceGenesis: number }[];
  };
  emission: {
    zecBlockReward: number;
    zecDailyEmission: number;
    zecAnnualInflation: number;
    nextHalvingDate: string;
    nextHalvingEpoch: number;
    daysUntilHalving: number;
    btcEquivDate: string;
    zecAgeDays: number;
  };
  shieldedPool: {
    pools: { name: string; zec: number; color: string }[];
    totalShielded: number;
    circulatingSupply: number;
    pctOfCirculating: number;
  };
  lastUpdated: string;
  dataSource: 'live' | 'fallback';
  error?: string;
}

export default function TheShadowPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('indexed');
  const [data, setData] = useState<ShadowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/the-shadow');
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools</span>
          </Link>

          {/* Page header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
              The Shadow
            </h1>

            {/* About this tool */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                About this tool
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                ZEC is mimicking BTC&apos;s early price cycle — same 21M hard cap, same halving
                schedule, same emission dynamics. This tool overlays both price histories aligned
                by <span className="text-amber-400">days since genesis</span> so the pattern
                parallel is visually obvious.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                <span className="text-[#F7931A]">BTC</span> launched January 2009.{' '}
                <span className="text-emerald-400">ZEC</span> launched October 2016 — roughly 7
                years later. Both follow identical monetary policy. The only difference:{' '}
                <span className="text-emerald-400">ZEC is shielded</span>.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <ViewToggle selected={viewMode} onChange={setViewMode} />
            <div className="flex items-center gap-2">
              {data?.lastUpdated && (
                <span className="text-xs text-zinc-600 font-mono">
                  {data.dataSource === 'fallback' ? 'Fallback data' : 'Updated'}: {new Date(data.lastUpdated).toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={fetchData}
                disabled={loading}
                className="p-2 text-zinc-500 hover:text-white transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Error state */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Warning for fallback data */}
          {data?.error && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <p className="text-amber-400 text-sm">{data.error}</p>
            </div>
          )}

          {/* Main chart section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 sm:p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-white">
                  {viewMode === 'indexed' ? 'Lifecycle Overlay (Indexed, Base = 100)' : 'Lifecycle Overlay (Price, Log Scale)'}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  BTC at same age vs ZEC — aligned by days since genesis
                </p>
              </div>
            </div>

            {/* Chart legend */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: '#F7931A' }} />
                <span className="text-xs text-zinc-400 font-mono">BTC at same age</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                <span className="text-xs text-zinc-400 font-mono">ZEC</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0 border-t border-dashed border-zinc-400/40" style={{ width: 12 }} />
                <span className="text-xs text-zinc-600">Halving events</span>
              </div>
            </div>

            {loading && !data ? (
              <div className="h-80 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-zinc-600 animate-spin" />
              </div>
            ) : (
              <ShadowChart
                btcCandles={data?.btc.candles || []}
                zecCandles={data?.zec.candles || []}
                btcHalvings={data?.halvings.btc || []}
                zecHalvings={data?.halvings.zec || []}
                viewMode={viewMode}
              />
            )}
          </motion.div>

          {/* Metrics Dashboard */}
          {data && (
            <div className="mb-8">
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
                Dashboard
              </h3>
              <MetricsDashboard
                shieldedPool={data.shieldedPool}
                emission={data.emission}
                btcAtSameAge={data.btc.atSameAge}
                zecCurrent={data.zec.current}
              />
            </div>
          )}

          {/* Comparison Table */}
          <div className="mb-8">
            <ComparisonTable />
          </div>

          {/* Privacy Narrative */}
          <div className="mb-8">
            <PrivacyNarrative />
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-xs font-mono text-zinc-600 max-w-xl mx-auto">
              Price data sourced from CoinGecko. Shielded pool data approximate.
              This is educational content, not financial advice.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
