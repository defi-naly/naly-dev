'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

interface AssetChartProps {
  data: { year: number; value: number }[];
  color: string;
  startValue?: number;
}

export default function AssetChart({ data, color, startValue = 100 }: AssetChartProps) {
  const minValue = Math.min(...data.map(d => d.value));
  const maxValue = Math.max(...data.map(d => d.value));
  const padding = (maxValue - minValue) * 0.1;

  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis
            dataKey="year"
            hide
          />
          <YAxis
            hide
            domain={[minValue - padding, maxValue + padding]}
          />
          <ReferenceLine
            y={startValue}
            stroke="#525252"
            strokeDasharray="2 2"
            strokeWidth={1}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
