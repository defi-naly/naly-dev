'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

type TimeRange = '1Y' | '3Y' | '5Y' | 'MAX';

// Client-side fallback data when API fails (market cap ratio format)
// Metals mcap based on 8marketcap.com: Gold ~$35T + Silver ~$6.3T = ~$41T
const FALLBACK_DATA: AlchemyData = {
  history: [
    { date: '2017-01-01', cryptoMarketCap: 16.7, metalsMarketCap: 19270, ratio: 0.09 },
    { date: '2017-12-01', cryptoMarketCap: 275, metalsMarketCap: 19984, ratio: 1.38 },
    { date: '2018-12-01', cryptoMarketCap: 79, metalsMarketCap: 20082, ratio: 0.39 },
    { date: '2019-12-01', cryptoMarketCap: 144, metalsMarketCap: 23098, ratio: 0.62 },
    { date: '2020-12-01', cryptoMarketCap: 625, metalsMarketCap: 29890, ratio: 2.09 },
    { date: '2021-11-01', cryptoMarketCap: 1760, metalsMarketCap: 28315, ratio: 6.22 },
    { date: '2022-12-01', cryptoMarketCap: 465, metalsMarketCap: 28656, ratio: 1.62 },
    { date: '2023-12-01', cryptoMarketCap: 1095, metalsMarketCap: 32200, ratio: 3.40 },
    { date: '2024-12-01', cryptoMarketCap: 2260, metalsMarketCap: 41691, ratio: 5.42 },
  ],
  current: {
    ratio: 5.42,
    cryptoMarketCap: 2260,
    metalsMarketCap: 41691,
    regime: 'expansion',
  },
  bands: {
    upper2SD: 7,
    upper1SD: 5,
    mean: 2,
    lower1SD: 0,
    lower2SD: -2,
  },
  extremes: [
    { date: '2017-12-01', ratio: 1.38, label: 'Crypto Mania' },
    { date: '2021-11-01', ratio: 6.22, label: 'Crypto ATH' },
  ],
  lastUpdated: new Date().toISOString(),
};

interface HistoryPoint {
  date: string;
  cryptoMarketCap: number;    // in billions
  metalsMarketCap: number;    // in billions
  ratio: number;              // crypto as % of metals
}

interface AlchemyData {
  history: HistoryPoint[];
  current: {
    ratio: number;
    cryptoMarketCap: number;
    metalsMarketCap: number;
    regime: 'expansion' | 'contraction' | 'neutral';
  };
  bands: {
    upper2SD: number;
    upper1SD: number;
    mean: number;
    lower1SD: number;
    lower2SD: number;
  };
  extremes: { date: string; ratio: number; label: string }[];
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
        } else {
          console.error('API returned error, using fallback data');
          setData(FALLBACK_DATA);
        }
      } catch (error) {
        console.error('Failed to fetch Alchemy data, using fallback:', error);
        setData(FALLBACK_DATA);
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
    const ratios = history.map(h => h.ratio);
    const minRatio = Math.min(...ratios, data.bands.lower2SD, 0);
    const maxRatio = Math.max(...ratios, data.bands.upper2SD);
    const range = maxRatio - minRatio || 1;

    const scaleX = (index: number) => (index / (history.length - 1)) * chartWidth;
    const scaleY = (value: number) => chartHeight - ((value - minRatio) / range) * chartHeight;

    // Generate path for ratio line
    const pathPoints = history.map((point, i) => {
      const x = scaleX(i);
      const y = scaleY(point.ratio);
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
      minRatio,
      maxRatio,
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
  const regimeColor = regime === 'expansion' ? 'amber' : regime === 'contraction' ? 'emerald' : 'zinc';
  const regimeLabel = regime === 'expansion' ? 'EXPANSION' : regime === 'contraction' ? 'CONTRACTION' : 'EQUILIBRIUM';

  return (
    <div>
      {/* Current value display */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
            Crypto as % of Metals Market Cap
          </p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl sm:text-5xl font-mono font-light ${
              regime === 'expansion' ? 'text-amber-500' : regime === 'contraction' ? 'text-emerald-500' : 'text-white'
            }`}>
              {loading ? '—' : `${data?.current?.ratio?.toFixed(1)}%`}
            </span>
            <span className="text-sm font-mono text-zinc-500">
              {loading ? '' : `$${(data?.current?.cryptoMarketCap / 1000).toFixed(1)}T / $${(data?.current?.metalsMarketCap / 1000).toFixed(1)}T`}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`w-2 h-2 rounded-full ${
              regime === 'expansion' ? 'bg-amber-400' : regime === 'contraction' ? 'bg-emerald-400' : 'bg-zinc-400'
            }`} />
            <span className={`text-xs font-mono ${
              regime === 'expansion' ? 'text-amber-400' : regime === 'contraction' ? 'text-emerald-400' : 'text-zinc-400'
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
                    cy={chartData.scaleY(chartData.history[chartData.history.length - 1].ratio)}
                    r="6"
                    fill={regime === 'expansion' ? '#f59e0b' : regime === 'contraction' ? '#10b981' : '#ffffff'}
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
                const y = chartData.scaleY(extreme.ratio);
                const isAbove = extreme.ratio > data.bands.mean;

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
                {chartData.maxRatio.toFixed(0)}%
              </text>
              <text x="0" y={chartHeight / 2} fill="#71717a" fontSize="10" fontFamily="monospace" textAnchor="end">
                {((chartData.maxRatio + chartData.minRatio) / 2).toFixed(0)}%
              </text>
              <text x="0" y={chartHeight} fill="#71717a" fontSize="10" fontFamily="monospace" textAnchor="end">
                {chartData.minRatio.toFixed(0)}%
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
              left: Math.min(mousePos.x + 10, width - 200),
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
              Ratio: {hoveredPoint.ratio.toFixed(2)}%
            </div>
            <div className="text-xs font-mono text-zinc-500">
              Crypto: ${hoveredPoint.cryptoMarketCap.toFixed(0)}B | Metals: ${(hoveredPoint.metalsMarketCap / 1000).toFixed(1)}T
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-white" />
          <span className="text-xs font-mono text-zinc-500">Market Cap Ratio</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-amber-500/20 border border-amber-500/40" />
          <span className="text-xs font-mono text-zinc-500">Expansion</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-emerald-500/20 border border-emerald-500/40" />
          <span className="text-xs font-mono text-zinc-500">Contraction</span>
        </div>
      </div>

      {/* Methodology */}
      <div className="mt-8 text-[10px] font-mono text-zinc-600 space-y-1">
        <p>Methodology: (BTC + ETH market cap) / (Gold + Silver market cap) × 100</p>
        <p>Metals market cap: Gold ~$35T + Silver ~$6.3T = ~$41T (via 8marketcap.com)</p>
        <p>Bands: μ (mean), ±1σ, ±2σ standard deviation thresholds</p>
        <p>Data: CoinGecko (crypto), Metals.live (spot prices)</p>
      </div>
    </div>
  );
}
