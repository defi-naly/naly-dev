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
} from 'recharts';
import type { ViewMode } from './ViewToggle';
import { BTC_GENESIS, ZEC_GENESIS } from '@/data/shadow';

interface OHLCCandle {
  day: number;
  open: number;
  high: number;
  low: number;
  close: number;
  date: string;
}

interface HalvingEvent {
  epoch: number;
  date: string;
  daysSinceGenesis: number;
}

interface ShadowChartProps {
  btcCandles: OHLCCandle[];
  zecCandles: OHLCCandle[];
  btcHalvings: HalvingEvent[];
  zecHalvings: HalvingEvent[];
  viewMode: ViewMode;
}

const BTC_COLOR = '#F7931A';
const ZEC_COLOR = '#22c55e';

function formatDay(day: number): string {
  const year = Math.floor(day / 365) + 1;
  return `Yr ${year}`;
}

function formatPrice(val: number): string {
  if (val >= 100000) return `$${(val / 1000).toFixed(0)}k`;
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
  if (val >= 1) return `$${val.toFixed(0)}`;
  return `$${val.toFixed(2)}`;
}

// Convert daysSinceGenesis back to a calendar date string
function dayToCalendarDate(day: number, genesis: string): string {
  const gen = new Date(genesis);
  const date = new Date(gen.getTime() + day * 24 * 60 * 60 * 1000);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

interface MergedPoint {
  day: number;
  btcClose: number | null;
  zecClose: number | null;
  btcDate: string | null;
  zecDate: string | null;
}

function OverlayTooltip({ active, payload, label, isIndexed }: any) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0]?.payload as MergedPoint | undefined;
  if (!data) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 shadow-xl min-w-[180px]">
      <div className="text-[10px] text-zinc-500 font-mono mb-2">
        Day {data.day?.toLocaleString()} · {formatDay(data.day)}
      </div>
      {data.btcClose != null && (
        <div className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BTC_COLOR }} />
            <span className="text-[11px] font-mono" style={{ color: BTC_COLOR }}>BTC</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono text-zinc-200">
              {isIndexed ? data.btcClose.toFixed(0) : formatPrice(data.btcClose)}
            </span>
            {data.btcDate && (
              <span className="text-[9px] text-zinc-600 font-mono ml-1.5">
                {dayToCalendarDate(data.day, BTC_GENESIS)}
              </span>
            )}
          </div>
        </div>
      )}
      {data.zecClose != null && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ZEC_COLOR }} />
            <span className="text-[11px] font-mono" style={{ color: ZEC_COLOR }}>ZEC</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono text-zinc-200">
              {isIndexed ? data.zecClose.toFixed(0) : formatPrice(data.zecClose)}
            </span>
            {data.zecDate && (
              <span className="text-[9px] text-zinc-600 font-mono ml-1.5">
                {dayToCalendarDate(data.day, ZEC_GENESIS)}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShadowChart({
  btcCandles,
  zecCandles,
  btcHalvings,
  zecHalvings,
  viewMode,
}: ShadowChartProps) {
  const isIndexed = viewMode === 'indexed';

  const mergedData = useMemo(() => {
    // Find max day from ZEC data to bound the X-axis
    const zecMaxDay = zecCandles.length > 0
      ? Math.max(...zecCandles.map((c) => c.day))
      : 0;

    // Build maps of day → close price
    const btcMap = new Map<number, { close: number; date: string }>();
    for (const c of btcCandles) {
      if (c.day <= zecMaxDay) {
        btcMap.set(c.day, { close: c.close, date: c.date });
      }
    }

    const zecMap = new Map<number, { close: number; date: string }>();
    for (const c of zecCandles) {
      zecMap.set(c.day, { close: c.close, date: c.date });
    }

    // Find the first available day for each coin
    const firstBtcDay = btcCandles.length > 0 ? btcCandles[0].day : 0;
    const firstZecDay = zecCandles.length > 0 ? zecCandles[0].day : 0;
    // Both lines must start at the same X position
    const minStartDay = Math.max(firstBtcDay, firstZecDay);

    // Collect all unique days at or after minStartDay
    const allDays = new Set<number>();
    btcMap.forEach((_, day) => { if (day >= minStartDay) allDays.add(day); });
    zecMap.forEach((_, day) => { if (day >= minStartDay) allDays.add(day); });

    const sortedDays = Array.from(allDays).sort((a, b) => a - b);

    // Get first close prices for indexing — use the value at minStartDay
    const btcFirstClose = btcMap.get(minStartDay)?.close ?? (btcCandles.find(c => c.day >= minStartDay)?.close ?? 1);
    const zecFirstClose = zecMap.get(minStartDay)?.close ?? (zecCandles.find(c => c.day >= minStartDay)?.close ?? 1);

    return sortedDays.map((day) => {
      const btc = btcMap.get(day);
      const zec = zecMap.get(day);

      let btcClose = btc ? btc.close : null;
      let zecClose = zec ? zec.close : null;

      if (isIndexed) {
        if (btcClose != null) btcClose = (btcClose / btcFirstClose) * 100;
        if (zecClose != null) zecClose = (zecClose / zecFirstClose) * 100;
      }

      return {
        day,
        btcClose,
        zecClose,
        btcDate: btc?.date ?? null,
        zecDate: zec?.date ?? null,
      } as MergedPoint;
    });
  }, [btcCandles, zecCandles, isIndexed]);

  // Filter halvings to only those within the x-axis range
  const maxDay = mergedData.length > 0 ? mergedData[mergedData.length - 1].day : 0;

  const visibleBtcHalvings = btcHalvings.filter((h) => h.daysSinceGenesis <= maxDay);
  const visibleZecHalvings = zecHalvings.filter((h) => h.daysSinceGenesis <= maxDay);

  if (mergedData.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-zinc-600 text-sm font-mono">
        No data available
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <ComposedChart data={mergedData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />

          <XAxis
            dataKey="day"
            tickFormatter={formatDay}
            stroke="#52525b"
            tick={{ fill: '#71717a', fontSize: 10 }}
            tickLine={false}
            axisLine={{ stroke: '#27272a' }}
            interval="preserveStartEnd"
            minTickGap={80}
          />

          <YAxis
            stroke="#52525b"
            tick={{ fill: '#a1a1aa', fontSize: 9 }}
            tickLine={false}
            axisLine={false}
            width={55}
            tickFormatter={isIndexed ? (val: number) => val.toFixed(0) : formatPrice}
            {...(isIndexed ? {} : { scale: 'log', domain: ['auto', 'auto'], allowDataOverflow: true })}
          />

          <Tooltip
            content={<OverlayTooltip isIndexed={isIndexed} />}
            cursor={{ stroke: '#3f3f46', strokeDasharray: '3 3' }}
          />

          {/* BTC halvings */}
          {visibleBtcHalvings.map((h) => (
            <ReferenceLine
              key={`btc-h${h.epoch}`}
              x={h.daysSinceGenesis}
              stroke={BTC_COLOR}
              strokeDasharray="4 4"
              strokeOpacity={0.4}
              label={{
                value: `BTC H${h.epoch}`,
                position: 'top',
                fill: BTC_COLOR,
                fontSize: 8,
                fontFamily: 'monospace',
              }}
            />
          ))}

          {/* ZEC halvings */}
          {visibleZecHalvings.map((h) => (
            <ReferenceLine
              key={`zec-h${h.epoch}`}
              x={h.daysSinceGenesis}
              stroke={ZEC_COLOR}
              strokeDasharray="4 4"
              strokeOpacity={0.4}
              label={{
                value: `ZEC H${h.epoch}`,
                position: 'top',
                fill: ZEC_COLOR,
                fontSize: 8,
                fontFamily: 'monospace',
              }}
            />
          ))}

          {/* BTC line */}
          <Line
            type="monotone"
            dataKey="btcClose"
            stroke={BTC_COLOR}
            strokeWidth={1.5}
            dot={false}
            connectNulls
          />

          {/* ZEC line */}
          <Line
            type="monotone"
            dataKey="zecClose"
            stroke={ZEC_COLOR}
            strokeWidth={1.5}
            dot={false}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
