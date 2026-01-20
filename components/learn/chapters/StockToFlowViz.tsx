'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, TrendingUp } from 'lucide-react';

interface StockToFlowVizProps {
  onComplete: () => void;
}

interface Asset {
  key: string;
  name: string;
  emoji: string;
  stock: number;
  flow: number;
  unit: string;
  color: string;
  description: string;
}

const ASSETS: Asset[] = [
  {
    key: 'gold',
    name: 'Gold',
    emoji: '🥇',
    stock: 205000,
    flow: 3500,
    unit: 'tonnes',
    color: 'amber',
    description: 'All gold ever mined still exists. New supply is tiny vs total.',
  },
  {
    key: 'silver',
    name: 'Silver',
    emoji: '🥈',
    stock: 550000,
    flow: 25000,
    unit: 'tonnes',
    color: 'zinc',
    description: 'Silver gets consumed industrially. Lower ratio than gold.',
  },
  {
    key: 'usd',
    name: 'US Dollar',
    emoji: '💵',
    stock: 21000,
    flow: 4000,
    unit: 'B (M2)',
    color: 'emerald',
    description: 'Can be printed infinitely. Stock-to-flow approaching zero.',
  },
];

export default function StockToFlowViz({ onComplete }: StockToFlowVizProps) {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [simulationYear, setSimulationYear] = useState(0);
  const [showRatio, setShowRatio] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const calculateS2F = (stock: number, flow: number) => {
    if (flow === 0) return Infinity;
    return stock / flow;
  };

  const getSimulatedStock = (asset: Asset, years: number) => {
    return asset.stock + asset.flow * years;
  };

  const getSimulatedS2F = (asset: Asset, years: number) => {
    const newStock = getSimulatedStock(asset, years);
    return calculateS2F(newStock, asset.flow);
  };

  const handleRevealRatios = () => {
    setShowRatio(true);
  };

  useEffect(() => {
    if (showRatio && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showRatio, isComplete, onComplete]);

  const maxS2F = Math.max(...ASSETS.map(a => calculateS2F(a.stock, a.flow)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Instructions */}
      <div className="text-center">
        <p className="text-neutral-400 font-mono text-sm">
          {showRatio
            ? 'The higher the ratio, the harder it is to inflate away.'
            : 'Stock-to-Flow = Total supply ÷ Annual production. Click an asset to explore.'}
        </p>
      </div>

      {/* Formula Display */}
      <div className="flex justify-center">
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg inline-flex items-center gap-3 font-mono text-sm">
          <span className="text-neutral-500">S2F =</span>
          <span className="text-amber-500">Stock</span>
          <span className="text-neutral-500">÷</span>
          <span className="text-emerald-500">Flow</span>
          <span className="text-neutral-500">=</span>
          <span className="text-white">Years to double supply</span>
        </div>
      </div>

      {/* Asset Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ASSETS.map((asset) => {
          const s2f = calculateS2F(asset.stock, asset.flow);
          const barWidth = (s2f / maxS2F) * 100;
          const isSelected = selectedAsset === asset.key;

          return (
            <motion.button
              key={asset.key}
              onClick={() => setSelectedAsset(isSelected ? null : asset.key)}
              className={`p-4 bg-neutral-900 border rounded-lg text-left transition-all ${
                isSelected
                  ? 'border-amber-500'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{asset.emoji}</span>
                <span className="text-white font-mono font-medium">{asset.name}</span>
              </div>

              {/* Stock/Flow Display */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-500">Stock:</span>
                  <span className="text-amber-500">
                    {getSimulatedStock(asset, simulationYear).toLocaleString()} {asset.unit}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-500">Flow/year:</span>
                  <span className="text-emerald-500">
                    +{asset.flow.toLocaleString()} {asset.unit}
                  </span>
                </div>
              </div>

              {/* S2F Bar */}
              <div className="h-2 bg-neutral-800 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: showRatio ? `${barWidth}%` : '0%' }}
                  transition={{ duration: 0.5, delay: ASSETS.indexOf(asset) * 0.1 }}
                  className={`h-full ${
                    asset.color === 'amber'
                      ? 'bg-amber-500'
                      : asset.color === 'zinc'
                      ? 'bg-zinc-400'
                      : 'bg-emerald-500'
                  }`}
                />
              </div>

              {/* S2F Value */}
              <AnimatePresence>
                {showRatio && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-center"
                  >
                    <span className={`font-mono text-lg font-bold ${
                      asset.color === 'amber'
                        ? 'text-amber-500'
                        : asset.color === 'zinc'
                        ? 'text-zinc-400'
                        : 'text-emerald-500'
                    }`}>
                      {getSimulatedS2F(asset, simulationYear).toFixed(1)} years
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Asset Detail */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
              <p className="text-neutral-400 font-mono text-sm">
                {ASSETS.find(a => a.key === selectedAsset)?.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time Simulation */}
      {showRatio && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg"
        >
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider mb-3 text-center">
            Simulate: +{simulationYear} years of production
          </p>
          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={() => setSimulationYear(Math.max(0, simulationYear - 10))}
              disabled={simulationYear === 0}
              className="p-2 bg-neutral-800 border border-neutral-700 rounded hover:border-amber-500 disabled:opacity-40 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Minus className="w-4 h-4 text-neutral-400" />
            </motion.button>
            <span className="text-white font-mono text-xl font-bold w-20 text-center">
              {simulationYear}
            </span>
            <motion.button
              onClick={() => setSimulationYear(Math.min(100, simulationYear + 10))}
              disabled={simulationYear === 100}
              className="p-2 bg-neutral-800 border border-neutral-700 rounded hover:border-amber-500 disabled:opacity-40 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4 text-neutral-400" />
            </motion.button>
          </div>
          <p className="text-neutral-600 font-mono text-xs text-center mt-2">
            Gold's ratio stays high. Fiat's ratio keeps dropping.
          </p>
        </motion.div>
      )}

      {/* Reveal Button */}
      {!showRatio && (
        <div className="flex justify-center">
          <motion.button
            onClick={handleRevealRatios}
            className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-4 h-4" />
            CALCULATE RATIOS
          </motion.button>
        </div>
      )}

      {/* Insight */}
      {showRatio && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center"
        >
          <p className="text-amber-500 font-mono text-sm font-medium">
            Gold: ~60 years. Dollar: ~5 years and falling.
          </p>
          <p className="text-neutral-400 font-mono text-xs mt-2">
            High stock-to-flow = hard to inflate. That's what makes money "hard."
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
