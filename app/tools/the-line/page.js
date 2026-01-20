'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from 'recharts';

const THRESHOLD = 1.50;

// Breach periods for shading
const BREACH_ZONES = [
  { start: '1973-01-01', end: '1983-01-01', label: '1973 Breach' },
  { start: '2008-03-01', end: '2013-06-01', label: '2008 Breach' },
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const date = new Date(data.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  const isBreach = data.ratio < THRESHOLD;

  return (
    <div className="bg-neutral-900 border border-neutral-700 p-3 font-mono text-sm shadow-xl">
      <div className="text-lg font-semibold text-white mb-2">{formattedDate}</div>
      <div className="text-terminal-accent mb-2">
        SPX/GOLD: <span className="text-white">{data.ratio?.toFixed(2)}</span>
      </div>
      {data.spy && (
        <div className="text-xs text-neutral-500">
          SPY: ${data.spy?.toFixed(2)} · GLD: ${data.gld?.toFixed(2)}
        </div>
      )}
      <div className={`text-xs mt-2 pt-2 border-t border-neutral-700 ${isBreach ? 'text-red-400' : 'text-terminal-accent'}`}>
        {isBreach ? '↘ BELOW THRESHOLD' : '↗ ABOVE THRESHOLD'}
      </div>
    </div>
  );
}

function StatsCard({ label, value, subtext, variant = 'default' }) {
  const colors = {
    default: 'text-white',
    green: 'text-terminal-accent',
    red: 'text-red-400',
  };

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className={`text-2xl font-mono font-semibold ${colors[variant]}`}>
        {value}
      </div>
      {subtext && (
        <div className="text-xs font-mono text-neutral-600 mt-1">{subtext}</div>
      )}
    </div>
  );
}

function MethodologyCard({ icon, title, children }) {
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <span className="text-lg">{icon}</span>
        <div>
          <h4 className="text-sm font-medium text-white mb-1">{title}</h4>
          <p className="text-xs text-neutral-500 leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default function TheLinePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('max');
  const [scale, setScale] = useState('linear');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/the-line?range=${timeRange}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter data based on time range for chart display
  const getFilteredHistory = () => {
    if (!data?.history) return [];

    const now = new Date();
    let cutoff;

    switch (timeRange) {
      case '1y':
        cutoff = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case '5y':
        cutoff = new Date(now.setFullYear(now.getFullYear() - 5));
        break;
      case '10y':
        cutoff = new Date(now.setFullYear(now.getFullYear() - 10));
        break;
      default:
        return data.history;
    }

    return data.history.filter(d => new Date(d.date) >= cutoff);
  };

  const chartData = getFilteredHistory();
  const currentRatio = data?.current?.ratio || 0;
  const status = data?.status || 'above';
  const isAbove = status === 'above';

  // Determine Y-axis domain
  const minRatio = chartData.length > 0 ? Math.min(...chartData.map(d => d.ratio)) : 0;
  const maxRatio = chartData.length > 0 ? Math.max(...chartData.map(d => d.ratio)) : 6;
  const yDomain = scale === 'log'
    ? [Math.max(0.1, minRatio * 0.8), maxRatio * 1.2]
    : [0, Math.ceil(maxRatio * 1.2)];

  // Get breach zones that fall within the visible range
  const visibleBreachZones = BREACH_ZONES.filter(zone => {
    if (chartData.length === 0) return false;
    const chartStart = new Date(chartData[0].date);
    const chartEnd = new Date(chartData[chartData.length - 1].date);
    const zoneStart = new Date(zone.start);
    const zoneEnd = new Date(zone.end);
    return zoneEnd >= chartStart && zoneStart <= chartEnd;
  });

  return (
    <div className="min-h-screen flex flex-col bg-terminal-bg">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools</span>
          </Link>

          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono bg-terminal-accent/10 text-terminal-accent border border-terminal-accent/20 rounded">
                <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
                LIVE
              </span>
              <span className="text-xs font-mono text-neutral-500">Dashboard</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
              The Line
            </h1>
            <p className="text-neutral-400 max-w-2xl font-mono text-sm">
              ~/the-line $ check --regime
            </p>
            <p className="text-neutral-500 max-w-2xl mt-2">
              SPX/GOLD regime indicator. Tracks equity strength relative to hard money.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-800">
            <div className="flex flex-wrap items-center gap-6">
              {/* Time Range */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  TIME RANGE
                </span>
                <div className="flex border border-neutral-700 rounded overflow-hidden">
                  {['1y', '5y', '10y', 'max'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                        timeRange === range
                          ? 'bg-neutral-700 text-white'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {range.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  SCALE
                </span>
                <div className="flex border border-neutral-700 rounded overflow-hidden">
                  {['linear', 'log'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setScale(s)}
                      className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                        scale === s
                          ? 'bg-neutral-700 text-white'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-terminal-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-accent animate-pulse" />
              LIVE
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chart Area - 3 columns */}
            <div className="lg:col-span-3">
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium text-white">SPX / GOLD</h2>
                  <p className="text-xs font-mono text-neutral-500">
                    Ratio • {scale.charAt(0).toUpperCase() + scale.slice(1)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-mono font-semibold text-white">
                    {loading ? '...' : currentRatio.toFixed(2)}
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded ${
                    isAbove
                      ? 'bg-terminal-accent/10 text-terminal-accent'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {isAbove ? (
                      <>
                        <TrendingUp className="w-3 h-3" />
                        ABOVE LINE
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-3 h-3" />
                        BREACHED
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-4">
                {loading ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="text-neutral-500 font-mono text-sm animate-pulse">
                      Loading data...
                    </div>
                  </div>
                ) : error && !data ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="text-red-400 font-mono text-sm">{error}</div>
                  </div>
                ) : (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={chartData}
                        margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
                      >
                        {/* Breach zone backgrounds */}
                        {visibleBreachZones.map((zone, i) => (
                          <ReferenceArea
                            key={i}
                            x1={zone.start}
                            x2={zone.end}
                            fill="#ef4444"
                            fillOpacity={0.1}
                            stroke="none"
                          />
                        ))}

                        {/* Threshold line */}
                        <ReferenceLine
                          y={THRESHOLD}
                          stroke="#ef4444"
                          strokeDasharray="5 5"
                          strokeWidth={1.5}
                          label={{
                            value: 'THE LINE (1.50)',
                            position: 'right',
                            fill: '#ef4444',
                            fontSize: 10,
                            fontFamily: 'JetBrains Mono, monospace',
                          }}
                        />

                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={{ stroke: '#404040' }}
                          tick={{
                            fontSize: 10,
                            fill: '#737373',
                            fontFamily: 'JetBrains Mono, monospace',
                          }}
                          tickFormatter={(date) => {
                            const d = new Date(date);
                            return d.getFullYear().toString();
                          }}
                          interval="preserveStartEnd"
                          minTickGap={50}
                        />

                        <YAxis
                          scale={scale}
                          domain={yDomain}
                          tickLine={false}
                          axisLine={{ stroke: '#404040' }}
                          tick={{
                            fontSize: 10,
                            fill: '#737373',
                            fontFamily: 'JetBrains Mono, monospace',
                          }}
                          tickFormatter={(v) => v.toFixed(1)}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        {/* Area fill */}
                        <defs>
                          <linearGradient id="ratioGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                          </linearGradient>
                        </defs>

                        <Area
                          type="monotone"
                          dataKey="ratio"
                          fill="url(#ratioGradient)"
                          stroke="none"
                        />

                        <Line
                          type="monotone"
                          dataKey="ratio"
                          stroke="#22c55e"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{
                            r: 4,
                            fill: '#22c55e',
                            stroke: '#0a0a0a',
                            strokeWidth: 2,
                          }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
                <StatsCard
                  label="Current"
                  value={loading ? '...' : currentRatio.toFixed(2)}
                  variant={isAbove ? 'green' : 'red'}
                />
                <StatsCard
                  label="Threshold"
                  value="1.50"
                />
                <StatsCard
                  label="Status"
                  value={loading ? '...' : (isAbove ? 'ABOVE' : 'BREACH')}
                  variant={isAbove ? 'green' : 'red'}
                />
                <StatsCard
                  label="Breaches"
                  value="2"
                  subtext="in 50+ years"
                />
                <StatsCard
                  label="Avg Drawdown"
                  value="-52%"
                  subtext="after breach"
                  variant="red"
                />
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-4">
              <MethodologyCard icon="◈" title="The Line">
                Ratio of S&P 500 to Gold price. When ratio drops below 1.50, it signals a regime shift from equities to hard assets.
              </MethodologyCard>

              <MethodologyCard icon="⚠" title="Breach Signal">
                Only 2 breaches in 50+ years. Both preceded major corrections. The signal is rare but historically significant.
              </MethodologyCard>

              <MethodologyCard icon="📉" title="1973 Breach">
                Oil crisis, end of gold standard. S&P fell -48% over 2 years as inflation surged and gold repriced.
              </MethodologyCard>

              <MethodologyCard icon="📉" title="2008 Breach">
                Global Financial Crisis. S&P fell -57% from peak. Gold surged as safe haven bid intensified.
              </MethodologyCard>

              {/* Data Sources */}
              <div className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-4 mt-6">
                <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-3">
                  Data Sources
                </h4>
                <div className="space-y-2 text-xs text-neutral-600">
                  <div>
                    <span className="text-neutral-400">Prices:</span> Yahoo Finance API
                  </div>
                  <div>
                    <span className="text-neutral-400">S&P 500:</span> SPY ETF
                  </div>
                  <div>
                    <span className="text-neutral-400">Gold:</span> GLD ETF (×10)
                  </div>
                  <div className="pt-2 border-t border-neutral-800 text-[10px]">
                    Pre-2004 data from FRED, historical records
                  </div>
                </div>
              </div>

              {/* Inspired By */}
              <div className="text-xs text-neutral-600 font-mono">
                Inspired by Ray Dalio&apos;s Big Cycle thesis and @brett_eth&apos;s SPX/GOLD analysis.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
