'use client';

function formatValue(value, unit) {
  if (unit === '%') {
    return `${value}%`;
  }
  return value.toFixed(2);
}

function getDeltaColor(delta) {
  if (Math.abs(delta) < 5) return 'text-neutral-500';
  if (delta > 0) return 'text-amber-400';
  return 'text-terminal-accent';
}

function formatDelta(delta, unit) {
  const sign = delta > 0 ? '+' : '';
  if (unit === '%') {
    return `${sign}${delta.toFixed(0)}%`;
  }
  return `${sign}${delta.toFixed(2)}`;
}

export default function ComparisonTable({
  currentMetrics,
  historicalMetrics,
  metricsConfig,
  year,
}) {
  const metrics = Object.keys(metricsConfig);

  return (
    <div>
      <div className="mb-3">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
          Metric Comparison
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left py-2 pr-4">
                <span className="font-mono text-xs text-neutral-600 uppercase">Metric</span>
              </th>
              <th className="text-right py-2 px-4">
                <span className="font-mono text-xs text-neutral-600 uppercase">{year}</span>
              </th>
              <th className="text-right py-2 px-4">
                <span className="font-mono text-xs text-neutral-600 uppercase">Today</span>
              </th>
              <th className="text-right py-2 pl-4">
                <span className="font-mono text-xs text-neutral-600 uppercase">Delta</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((key) => {
              const config = metricsConfig[key];
              const historical = historicalMetrics[key];
              const current = currentMetrics[key];
              const delta = current - historical;

              return (
                <tr key={key} className="border-b border-neutral-800/50">
                  <td className="py-2 pr-4">
                    <span className="font-mono text-sm text-neutral-400">{config.label}</span>
                  </td>
                  <td className="text-right py-2 px-4">
                    <span className="font-mono text-sm text-neutral-500 tabular-nums">
                      {formatValue(historical, config.unit)}
                    </span>
                  </td>
                  <td className="text-right py-2 px-4">
                    <span className="font-mono text-sm text-white tabular-nums">
                      {formatValue(current, config.unit)}
                    </span>
                  </td>
                  <td className="text-right py-2 pl-4">
                    <span className={`font-mono text-sm tabular-nums ${getDeltaColor(delta)}`}>
                      {formatDelta(delta, config.unit)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
