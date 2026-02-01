'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from 'recharts';

interface HistoryPoint {
  date: string;
  SPY?: number;
  POWR?: number;
  IFRA?: number;
  BAI?: number;
}

interface StackChartProps {
  history: HistoryPoint[];
  etfs: Record<string, { color: string; name: string }>;
}

const COLORS = {
  SPY: '#71717a',   // zinc-500
  POWR: '#f59e0b',  // amber-500
  IFRA: '#8b5cf6',  // violet-500
  BAI: '#22c55e',   // emerald-500
};

const LABELS = {
  SPY: 'S&P 500',
  POWR: 'Energy',
  IFRA: 'Physical',
  BAI: 'Intelligence',
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 shadow-xl">
      <div className="text-xs text-zinc-400 mb-2 font-mono">
        {new Date(label).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
      <div className="space-y-1">
        {payload
          .sort((a: any, b: any) => b.value - a.value)
          .map((entry: any) => {
            const change = entry.value - 100;
            const isPositive = change >= 0;
            return (
              <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-zinc-300 font-medium">
                  {LABELS[entry.dataKey as keyof typeof LABELS]}:
                </span>
                <span className={isPositive ? 'text-emerald-400' : 'text-red-400'}>
                  {isPositive ? '+' : ''}
                  {change.toFixed(1)}%
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default function StackChart({ history, etfs }: StackChartProps) {
  // Sample data to reduce density (every 5th point for smoother chart)
  const sampledHistory = useMemo(() => {
    if (history.length <= 60) return history;
    const step = Math.ceil(history.length / 60);
    return history.filter((_, i) => i % step === 0 || i === history.length - 1);
  }, [history]);

  // Calculate Y-axis domain
  const yDomain = useMemo(() => {
    let min = 100, max = 100;
    sampledHistory.forEach(point => {
      ['SPY', 'POWR', 'IFRA', 'BAI'].forEach(key => {
        const val = point[key as keyof HistoryPoint] as number | undefined;
        if (val !== undefined) {
          min = Math.min(min, val);
          max = Math.max(max, val);
        }
      });
    });
    // Add padding
    const padding = (max - min) * 0.1;
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [sampledHistory]);

  if (history.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-zinc-500">
        No data available
      </div>
    );
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <ComposedChart data={sampledHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#52525b"
            tick={{ fill: '#71717a', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#27272a' }}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            domain={yDomain}
            stroke="#52525b"
            tick={{ fill: '#71717a', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `${val}`}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* Baseline reference at 100 */}
          <ReferenceLine
            y={100}
            stroke="#3f3f46"
            strokeDasharray="3 3"
            label={{
              value: 'Start',
              position: 'right',
              fill: '#52525b',
              fontSize: 10,
            }}
          />

          {/* ETF lines */}
          <Line
            type="monotone"
            dataKey="SPY"
            stroke={COLORS.SPY}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: COLORS.SPY }}
          />
          <Line
            type="monotone"
            dataKey="POWR"
            stroke={COLORS.POWR}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: COLORS.POWR }}
          />
          <Line
            type="monotone"
            dataKey="IFRA"
            stroke={COLORS.IFRA}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: COLORS.IFRA }}
          />
          <Line
            type="monotone"
            dataKey="BAI"
            stroke={COLORS.BAI}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: COLORS.BAI }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
