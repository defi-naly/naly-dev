'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  
  const data = payload[0].payload;
  
  return (
    <div className="bg-neutral-900 border border-neutral-700 p-3 font-mono text-sm shadow-lg">
      <div className="flex items-center justify-between gap-6 mb-2 pb-2 border-b border-neutral-800">
        <span className="text-white font-medium">{data.year}</span>
        <span className="text-neutral-500">Age {data.age}</span>
      </div>
      <div className="text-terminal-accent text-lg font-medium">
        ${data.purchasingPower.toFixed(2)}
      </div>
      <div className="text-neutral-500 text-xs mt-1">
        Purchasing power remaining
      </div>
      {data.event && (
        <div className="text-amber-400 text-xs mt-2 pt-2 border-t border-neutral-800">
          {data.event}
        </div>
      )}
    </div>
  );
};

export default function DecayChart({ data }) {
  const { yearlyData, birthYear, currentYear, finalPurchasingPower } = data;
  
  // Filter events for annotation
  const events = yearlyData.filter(d => d.event);
  
  // Calculate tick interval
  const yearSpan = currentYear - birthYear;
  const tickInterval = yearSpan <= 20 ? 5 : yearSpan <= 40 ? 10 : 15;
  
  const ticks = [];
  for (let year = birthYear; year <= currentYear; year += tickInterval) {
    ticks.push(year);
  }
  if (!ticks.includes(currentYear)) {
    ticks.push(currentYear);
  }
  
  return (
    <div className="border border-neutral-800 bg-terminal-surface">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
            Purchasing Power Decay
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-neutral-500">START:</span>
            <span className="font-mono text-sm text-white">$100.00</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-neutral-500">END:</span>
            <span className="font-mono text-sm text-terminal-accent">
              ${finalPurchasingPower.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer>
            <LineChart
              data={yearlyData}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              {/* Reference lines for events */}
              {events.map((event, i) => (
                <ReferenceLine
                  key={i}
                  x={event.year}
                  stroke="#333"
                  strokeDasharray="2 2"
                />
              ))}
              
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={{ stroke: '#262626' }}
                tick={{
                  fontSize: 10,
                  fill: '#737373',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                ticks={ticks}
              />
              
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={{ stroke: '#262626' }}
                tick={{
                  fontSize: 10,
                  fill: '#737373',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                tickFormatter={(v) => `$${v}`}
                ticks={[0, 25, 50, 75, 100]}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <Line
                type="monotone"
                dataKey="purchasingPower"
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
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Event annotations */}
        {events.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 pt-4 border-t border-neutral-800">
            {events.map((event, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono">
                <span className="text-neutral-600">{event.year}:</span>
                <span className="text-neutral-400">{event.event}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
