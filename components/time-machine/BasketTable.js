'use client';

export default function BasketTable({ data }) {
  const { basket, birthYear } = data;

  const formatValue = (value, id) => {
    if (id === 'gold') return value.toFixed(3);
    if (id === 'sp500') return value.toFixed(3);
    if (id === 'housing') return value.toFixed(2) + '%';
    return value.toFixed(1);
  };

  // Visual decay bar
  const getDecayBar = (delta) => {
    const absVal = Math.min(Math.abs(delta), 100);
    const width = absVal;
    return (
      <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-terminal-accent to-red-500 rounded-full transition-all duration-500"
          style={{ width: `${width}%` }}
        />
      </div>
    );
  };

  return (
    <div className="border border-neutral-800 bg-terminal-surface rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
            Asset Comparison
          </span>
          <p className="text-[10px] text-neutral-600 font-mono mt-1">
            $100 purchasing power across asset classes
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-neutral-600">{birthYear}</span>
          <span className="font-mono text-xs text-neutral-700 mx-2">→</span>
          <span className="font-mono text-xs text-terminal-accent">2024</span>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="divide-y divide-neutral-800/50">
        {basket.map((item) => (
          <div
            key={item.id}
            className="px-5 py-4 hover:bg-neutral-800/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase">
                    {item.id === 'gold' && 'AU'}
                    {item.id === 'sp500' && 'SPX'}
                    {item.id === 'housing' && 'RE'}
                    {item.id === 'energy' && 'NRG'}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-neutral-200">{item.name}</span>
                  <span className="text-[10px] text-neutral-600 font-mono ml-2">{item.unit}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-red-400">
                  {item.delta.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Values row */}
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-neutral-500">{formatValue(item.birthValue, item.id)}</span>
              <span className="text-neutral-700">→</span>
              <span className="text-terminal-accent">{formatValue(item.currentValue, item.id)}</span>
            </div>

            {/* Decay bar */}
            {getDecayBar(item.delta)}
          </div>
        ))}
      </div>
    </div>
  );
}
