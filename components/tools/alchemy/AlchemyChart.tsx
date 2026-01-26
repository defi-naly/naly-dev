'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

type TimeRange = '1Y' | '3Y' | '5Y' | 'MAX';

interface HistoryPoint {
  date: string;
  cryptoIndex: number;
  commoditiesIndex: number;
  spread: number;
  spreadPercent: number;
}

interface AlchemyData {
  history: HistoryPoint[];
  current: {
    spread: number;
    spreadPercent: number;
    cryptoIndex: number;
    commoditiesIndex: number;
    regime: 'crypto' | 'commodities' | 'neutral';
  };
  bands: {
    upper2SD: number;
    upper1SD: number;
    mean: number;
    lower1SD: number;
    lower2SD: number;
  };
  extremes: { date: string; spread: number; label: string }[];
  lastUpdated: string;
  error?: string;
}

export default function AlchemyChart() {
  const [data, setData] = useState<AlchemyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('MAX');
  const [hoveredPoint, setHoveredPoint] = useState<HistoryPoint | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const rangeParam = timeRange.toLowerCase().replace('y', 'y');
        const response = await fetch(`/api/alchemy?range=${rangeParam}`);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        console.error('Failed to fetch Alchemy data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [timeRange]);

  // Chart dimensions
  const width = 800;
  const height = 400;
  const padding = { top: 40, right: 60, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate chart data
  const chartData = useMemo(() => {
    if (!data?.history?.length) return null;

    const history = data.history;
    const spreads = history.map(h => h.spread);
    const minSpread = Math.min(...spreads, data.bands.lower2SD);
    const maxSpread = Math.max(...spreads, data.bands.upper2SD);
    const range = maxSpread - minSpread || 1;

    const scaleX = (index: number) => (index / (history.length - 1)) * chartWidth;
    const scaleY = (value: number) => chartHeight - ((value - minSpread) / range) * chartHeight;

    // Generate path for spread line
    const pathPoints = history.map((point, i) => {
      const x = scaleX(i);
      const y = scaleY(point.spread);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');

    // Generate area paths for bands
    const meanY = scaleY(data.bands.mean);
    const upper1SDY = scaleY(data.bands.upper1SD);
    const upper2SDY = scaleY(data.bands.upper2SD);
    const lower1SDY = scaleY(data.bands.lower1SD);
    const lower2SDY = scaleY(data.bands.lower2SD);

    return {
      history,
      pathPoints,
      meanY,
      upper1SDY,
      upper2SDY,
      lower1SDY,
      lower2SDY,
      scaleX,
      scaleY,
      minSpread,
      maxSpread,
    };
  }, [data, chartWidth, chartHeight]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!chartData) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left - padding.left;
    const relativeX = x / chartWidth;

    if (relativeX >= 0 && relativeX <= 1) {
      const index = Math.round(relativeX * (chartData.history.length - 1));
      const point = chartData.history[index];
      if (point) {
        setHoveredPoint(point);
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const regime = data?.current?.regime;
  const regimeColor = regime === 'crypto' ? 'amber' : regime === 'commodities' ? 'emerald' : 'zinc';
  const regimeLabel = regime === 'crypto' ? 'DIGITAL LEADING' : regime === 'commodities' ? 'PHYSICAL LEADING' : 'NEUTRAL';

  return (
    <div>
      {/* Current value display */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
            Current Spread
          </p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl sm:text-5xl font-mono font-light ${
              regime === 'crypto' ? 'text-amber-500' : regime === 'commodities' ? 'text-emerald-500' : 'text-white'
            }`}>
              {loading ? '—' : data?.current?.spread?.toFixed(0) ?? '—'}
            </span>
            <span className="text-sm font-mono text-zinc-500">
              ({loading ? '—' : `${data?.current?.spreadPercent > 0 ? '+' : ''}${data?.current?.spreadPercent?.toFixed(1)}%`})
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`w-2 h-2 rounded-full ${
              regime === 'crypto' ? 'bg-amber-400' : regime === 'commodities' ? 'bg-emerald-400' : 'bg-zinc-400'
            }`} />
            <span className={`text-xs font-mono ${
              regime === 'crypto' ? 'text-amber-400' : regime === 'commodities' ? 'text-emerald-400' : 'text-zinc-400'
            }`}>
              {loading ? '—' : regimeLabel}
            </span>
          </div>
        </div>

        {/* Time range toggles */}
        <div className="flex items-center gap-1 bg-zinc-800/50 rounded-lg p-1">
          {(['1Y', '3Y', '5Y', 'MAX'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                timeRange === range
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
        {loading ? (
          <div className="h-80 flex items-center justify-center">
            <span className="text-zinc-500 font-mono text-sm">Loading...</span>
          </div>
        ) : chartData ? (
          <svg
            className="w-full"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Amber gradient (above mean) */}
              <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>

              {/* Emerald gradient (below mean) */}
              <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            <g transform={`translate(${padding.left}, ${padding.top})`}>
              {/* Band fill zones */}
              {/* Amber zone (above mean) */}
              <rect
                x="0"
                y={chartData.upper2SDY}
                width={chartWidth}
                height={chartData.meanY - chartData.upper2SDY}
                fill="url(#amberGradient)"
              />

              {/* Emerald zone (below mean) */}
              <rect
                x="0"
                y={chartData.meanY}
                width={chartWidth}
                height={chartData.lower2SDY - chartData.meanY}
                fill="url(#emeraldGradient)"
              />

              {/* Band lines */}
              {/* +2 SD */}
              <line
                x1="0"
                y1={chartData.upper2SDY}
                x2={chartWidth}
                y2={chartData.upper2SDY}
                stroke="#f59e0b"
                strokeWidth="1"
                strokeDasharray="6,4"
                opacity="0.5"
              />
              <text
                x={chartWidth + 8}
                y={chartData.upper2SDY + 4}
                fill="#f59e0b"
                fontSize="10"
                fontFamily="monospace"
                opacity="0.7"
              >
                +2σ
              </text>

              {/* +1 SD */}
              <line
                x1="0"
                y1={chartData.upper1SDY}
                x2={chartWidth}
                y2={chartData.upper1SDY}
                stroke="#f59e0b"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.3"
              />
              <text
                x={chartWidth + 8}
                y={chartData.upper1SDY + 4}
                fill="#f59e0b"
                fontSize="10"
                fontFamily="monospace"
                opacity="0.5"
              >
                +1σ
              </text>

              {/* Mean */}
              <line
                x1="0"
                y1={chartData.meanY}
                x2={chartWidth}
                y2={chartData.meanY}
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.3"
              />
              <text
                x={chartWidth + 8}
                y={chartData.meanY + 4}
                fill="#ffffff"
                fontSize="10"
                fontFamily="monospace"
                opacity="0.5"
              >
                μ
              </text>

              {/* -1 SD */}
              <line
                x1="0"
                y1={chartData.lower1SDY}
                x2={chartWidth}
                y2={chartData.lower1SDY}
                stroke="#10b981"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.3"
              />
              <text
                x={chartWidth + 8}
                y={chartData.lower1SDY + 4}
                fill="#10b981"
                fontSize="10"
                fontFamily="monospace"
                opacity="0.5"
              >
                -1σ
              </text>

              {/* -2 SD */}
              <line
                x1="0"
                y1={chartData.lower2SDY}
                x2={chartWidth}
                y2={chartData.lower2SDY}
                stroke="#10b981"
                strokeWidth="1"
                strokeDasharray="6,4"
                opacity="0.5"
              />
              <text
                x={chartWidth + 8}
                y={chartData.lower2SDY + 4}
                fill="#10b981"
                fontSize="10"
                fontFamily="monospace"
                opacity="0.7"
              >
                -2σ
              </text>

              {/* Spread line with animation */}
              <motion.path
                d={chartData.pathPoints}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />

              {/* Current point */}
              {chartData.history.length > 0 && (
                <g>
                  <circle
                    cx={chartData.scaleX(chartData.history.length - 1)}
                    cy={chartData.scaleY(chartData.history[chartData.history.length - 1].spread)}
                    r="6"
                    fill={regime === 'crypto' ? '#f59e0b' : regime === 'commodities' ? '#10b981' : '#ffffff'}
                    filter="url(#glow)"
                  >
                    <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}

              {/* Extreme points markers */}
              {data?.extremes?.map((extreme, i) => {
                const historyIndex = chartData.history.findIndex(h => h.date === extreme.date);
                if (historyIndex === -1) return null;
                const x = chartData.scaleX(historyIndex);
                const y = chartData.scaleY(extreme.spread);
                const isAbove = extreme.spread > data.bands.mean;

                return (
                  <g key={`${extreme.date}-${i}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill={isAbove ? '#f59e0b' : '#10b981'}
                      opacity="0.8"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.8;0.4;0.8"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Hover line */}
              {hoveredPoint && (
                <line
                  x1={chartData.scaleX(chartData.history.findIndex(h => h.date === hoveredPoint.date))}
                  y1={0}
                  x2={chartData.scaleX(chartData.history.findIndex(h => h.date === hoveredPoint.date))}
                  y2={chartHeight}
                  stroke="#ffffff"
                  strokeWidth="1"
                  opacity="0.3"
                  strokeDasharray="4,4"
                />
              )}
            </g>

            {/* Y-axis labels */}
            <g transform={`translate(${padding.left - 10}, ${padding.top})`}>
              <text x="0" y="5" fill="#71717a" fontSize="10" fontFamily="monospace" textAnchor="end">
                {chartData.maxSpread.toFixed(0)}
              </text>
              <text x="0" y={chartHeight / 2} fill="#71717a" fontSize="10" fontFamily="monospace" textAnchor="end">
                {((chartData.maxSpread + chartData.minSpread) / 2).toFixed(0)}
              </text>
              <text x="0" y={chartHeight} fill="#71717a" fontSize="10" fontFamily="monospace" textAnchor="end">
                {chartData.minSpread.toFixed(0)}
              </text>
            </g>

            {/* X-axis labels */}
            <g transform={`translate(${padding.left}, ${padding.top + chartHeight + 15})`}>
              {chartData.history.length > 0 && (
                <>
                  <text x="0" y="0" fill="#71717a" fontSize="10" fontFamily="monospace" textAnchor="start">
                    {new Date(chartData.history[0].date).getFullYear()}
                  </text>
                  <text x={chartWidth} y="0" fill="#71717a" fontSize="10" fontFamily="monospace" textAnchor="end">
                    {new Date(chartData.history[chartData.history.length - 1].date).getFullYear()}
                  </text>
                </>
              )}
            </g>
          </svg>
        ) : (
          <div className="h-80 flex items-center justify-center">
            <span className="text-zinc-500 font-mono text-sm">No data available</span>
          </div>
        )}

        {/* Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute pointer-events-none bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 shadow-lg z-10"
            style={{
              left: Math.min(mousePos.x + 10, width - 180),
              top: mousePos.y - 80,
            }}
          >
            <div className="text-xs font-mono text-zinc-400 mb-1">
              {new Date(hoveredPoint.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="text-sm font-mono text-white mb-1">
              Spread: {hoveredPoint.spread.toFixed(0)}
            </div>
            <div className="text-xs font-mono text-zinc-500">
              Crypto: {hoveredPoint.cryptoIndex.toFixed(0)} | Metals: {hoveredPoint.commoditiesIndex.toFixed(0)}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-white" />
          <span className="text-xs font-mono text-zinc-500">Crypto-Commodities Spread</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-amber-500/20 border border-amber-500/40" />
          <span className="text-xs font-mono text-zinc-500">Digital Leading</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-emerald-500/20 border border-emerald-500/40" />
          <span className="text-xs font-mono text-zinc-500">Physical Leading</span>
        </div>
      </div>

      {/* Methodology */}
      <div className="mt-8 text-[10px] font-mono text-zinc-600 space-y-1">
        <p>Index methodology: 70% BTC + 30% ETH vs 70% Gold + 30% Silver, normalized to 100 (Jan 2017)</p>
        <p>Bands: μ (mean), ±1σ, ±2σ standard deviation thresholds</p>
        <p>Data: Yahoo Finance (BTC-USD, ETH-USD, GC=F, SI=F)</p>
      </div>
    </div>
  );
}
