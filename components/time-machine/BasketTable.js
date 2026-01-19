'use client';

export default function BasketTable({ data }) {
  const { basket, birthYear } = data;
  
  const formatValue = (value, id) => {
    if (id === 'gold') {
      return value.toFixed(3);
    }
    if (id === 'sp500') {
      return value.toFixed(2);
    }
    return value.toFixed(1);
  };
  
  const getDeltaBars = (delta) => {
    const absVal = Math.abs(delta);
    if (absVal >= 80) return '▼▼▼▼▼';
    if (absVal >= 60) return '▼▼▼▼';
    if (absVal >= 40) return '▼▼▼';
    if (absVal >= 20) return '▼▼';
    return '▼';
  };
  
  return (
    <div className="border border-neutral-800 bg-terminal-surface">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
          Basket Analysis
        </span>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left py-3 px-4 text-neutral-500 font-normal text-xs uppercase tracking-wider">
                Commodity
              </th>
              <th className="text-right py-3 px-4 text-neutral-500 font-normal text-xs uppercase tracking-wider">
                {birthYear}
              </th>
              <th className="text-right py-3 px-4 text-neutral-500 font-normal text-xs uppercase tracking-wider">
                2024
              </th>
              <th className="text-right py-3 px-4 text-neutral-500 font-normal text-xs uppercase tracking-wider">
                Delta
              </th>
              <th className="text-right py-3 px-4 text-neutral-500 font-normal text-xs uppercase tracking-wider w-24">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {basket.map((item, i) => (
              <tr 
                key={item.id}
                className={`
                  border-b border-neutral-800/50 last:border-b-0
                  hover:bg-neutral-800/30 transition-colors
                `}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-neutral-300">{item.name}</span>
                  </div>
                </td>
                <td className="text-right py-3 px-4 text-white">
                  {formatValue(item.birthValue, item.id)}
                </td>
                <td className="text-right py-3 px-4 text-terminal-accent">
                  {formatValue(item.currentValue, item.id)}
                </td>
                <td className="text-right py-3 px-4 text-red-400">
                  {item.delta.toFixed(1)}%
                </td>
                <td className="text-right py-3 px-4 text-red-400/60 tracking-wider">
                  {getDeltaBars(item.delta)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer note */}
      <div className="px-4 py-3 border-t border-neutral-800">
        <p className="font-mono text-xs text-neutral-600">
          What $100 from {birthYear} could buy then vs. equivalent purchasing power today
        </p>
      </div>
    </div>
  );
}
