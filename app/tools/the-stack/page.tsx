'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import StackChart from '@/components/tools/the-stack/StackChart';
import LayerCard from '@/components/tools/the-stack/LayerCard';
import YieldComparison from '@/components/tools/the-stack/YieldComparison';
import TimeRangeToggle from '@/components/tools/the-stack/TimeRangeToggle';
import { stackLayers, type TimeRange } from '@/data/stack-layers';

interface ETFData {
  ticker: string;
  name: string;
  role: string;
  color: string;
  currentPrice: number;
  ytdReturn: number;
  totalReturn: number;
}

interface StackData {
  etfs: Record<string, ETFData>;
  history: Array<{
    date: string;
    SPY?: number;
    POWR?: number;
    IFRA?: number;
    BAI?: number;
  }>;
  range: TimeRange;
  regime: {
    leader: string;
    leaderName: string;
    spyValue: number;
    leaderValue: number;
    outperformance: number;
  };
  dividendYields: Record<string, number>;
  lastUpdated: string;
  error?: string;
}

export default function TheStackPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1y');
  const [data, setData] = useState<StackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (range: TimeRange) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/the-stack?range=${range}`);
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
    fetchData(timeRange);
  }, [timeRange]);

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

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
              The AI Stack
            </h1>

            {/* About this tool */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                About this tool
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                BlackRock, GIP, and MGX are betting the next 20 years of capital flows on
                "Physical AI" — the infrastructure required to power artificial intelligence.
                Their thesis: AI needs <span className="text-amber-400">power</span>,{' '}
                <span className="text-violet-400">physical buildout</span>, and{' '}
                <span className="text-emerald-400">compute</span> before it needs more software.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                This tracker compares 3 iShares ETFs that economize this trade against the S&P 500:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><span className="text-amber-400 font-mono">POWR</span> <span className="text-zinc-500">— Power Infrastructure (energy bottleneck)</span></li>
                <li><span className="text-violet-400 font-mono">IFRA</span> <span className="text-zinc-500">— U.S. Infrastructure (data centers, materials)</span></li>
                <li><span className="text-emerald-400 font-mono">BAI</span> <span className="text-zinc-500">— AI Innovation (chips, networking, agentic AI)</span></li>
              </ul>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <TimeRangeToggle selected={timeRange} onChange={handleTimeRangeChange} />
            <div className="flex items-center gap-2">
              {data?.lastUpdated && (
                <span className="text-xs text-zinc-600 font-mono">
                  Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={() => fetchData(timeRange)}
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
                <h3 className="text-sm font-medium text-white">Normalized Returns</h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  All ETFs indexed to 100 at start of period
                </p>
              </div>

              {/* Regime indicator */}
              {data?.regime && (
                <div className="text-right">
                  <div className="text-xs text-zinc-500 font-mono uppercase">Current Leader</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          data.etfs[data.regime.leader]?.color || '#22c55e',
                      }}
                    />
                    <span className="text-sm font-medium text-white">
                      {data.regime.leader}
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        data.regime.outperformance >= 0
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      {data.regime.outperformance >= 0 ? '+' : ''}
                      {data.regime.outperformance.toFixed(1)}% vs SPY
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Chart legend */}
            <div className="flex flex-wrap gap-4 mb-4">
              {stackLayers.map((layer) => (
                <div key={layer.ticker} className="flex items-center gap-2">
                  <div
                    className="w-3 h-0.5 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  <span className="text-xs text-zinc-400 font-mono">
                    {layer.ticker}
                  </span>
                  <span className="text-xs text-zinc-600">{layer.role}</span>
                </div>
              ))}
            </div>

            {loading && !data ? (
              <div className="h-80 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-zinc-600 animate-spin" />
              </div>
            ) : (
              <StackChart
                history={data?.history || []}
                etfs={data?.etfs || {}}
              />
            )}
          </motion.div>

          {/* Layer cards grid */}
          <div className="mb-8">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
              The AI Stack
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stackLayers.map((layer) => (
                <LayerCard
                  key={layer.ticker}
                  layer={layer}
                  etfData={data?.etfs[layer.ticker]}
                  dividendYield={data?.dividendYields[layer.ticker]}
                  isLeading={data?.regime?.leader === layer.ticker}
                />
              ))}
            </div>
          </div>

          {/* Yield comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {data?.dividendYields && (
              <YieldComparison yields={data.dividendYields} />
            )}

            {/* Thesis summary */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white mb-3">
                The 20-Year Trade
              </h3>
              <div className="space-y-3 text-xs text-zinc-400">
                <p>
                  <span className="text-white font-medium">The thesis:</span> AI's
                  infrastructure needs are shifting capital from "Internet 2.0"
                  companies to the physical buildout required for compute.
                </p>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <p>
                      <span className="text-amber-400">Energy Layer:</span> Data
                      centers need massive power. Grid upgrades are mandatory.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                    <p>
                      <span className="text-violet-400">Physical Layer:</span> The
                      "land and pipes" — data centers, transmission, raw materials.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <p>
                      <span className="text-emerald-400">Intelligence Layer:</span>{' '}
                      The active "brain" — chips, networking, agentic AI systems.
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 italic">
                  Track relative performance to see which layer is currently
                  attracting the most capital.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-xs font-mono text-zinc-600 max-w-xl mx-auto">
              ETF data sourced from Yahoo Finance. Dividend yields are approximate.
              This is educational content, not financial advice.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
