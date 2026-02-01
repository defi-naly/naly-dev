'use client';

import { motion } from 'framer-motion';
import { stackLayers, type StackLayer } from '@/data/stack-layers';

interface LayerCardProps {
  layer: StackLayer;
  etfData?: {
    currentPrice: number;
    ytdReturn: number;
    totalReturn: number;
  };
  dividendYield?: number;
  isLeading?: boolean;
}

export default function LayerCard({ layer, etfData, dividendYield, isLeading }: LayerCardProps) {
  const returnValue = etfData?.totalReturn ?? 0;
  const isPositive = returnValue >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-zinc-900/50 border rounded-lg p-4 relative overflow-hidden
        ${isLeading ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10' : 'border-zinc-800'}
      `}
    >
      {/* Leading indicator */}
      {isLeading && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-zinc-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded-bl">
          LEADING
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: layer.color }}
            />
            <span className="text-xs font-mono text-zinc-500">{layer.ticker}</span>
          </div>
          <h3 className="text-sm font-medium text-white">{layer.role}</h3>
        </div>
        <div className="text-right">
          <div className={`text-lg font-mono font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{returnValue.toFixed(1)}%
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">period return</div>
        </div>
      </div>

      {/* Thesis */}
      <p className="text-xs text-zinc-400 mb-3 line-clamp-2">{layer.thesis}</p>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs">
        {dividendYield !== undefined && (
          <div>
            <span className="text-zinc-500">Yield: </span>
            <span className="text-amber-400 font-mono">{dividendYield.toFixed(2)}%</span>
          </div>
        )}
        {etfData?.currentPrice && (
          <div>
            <span className="text-zinc-500">Price: </span>
            <span className="text-zinc-300 font-mono">${etfData.currentPrice.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Top holdings */}
      <div className="mt-3 pt-3 border-t border-zinc-800">
        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-2">
          Top Holdings
        </div>
        <div className="flex flex-wrap gap-1">
          {layer.holdings.slice(0, 3).map((holding) => (
            <span
              key={holding.ticker}
              className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded"
            >
              {holding.ticker}
            </span>
          ))}
          <span className="text-[10px] font-mono text-zinc-600">
            +{layer.holdings.length - 3}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
