'use client';

import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

function MetricSlider({ metricKey, value, config, onChange, disabled }) {
  const { label, unit, min, max } = config;

  // Calculate percentage for progress bar
  const percentage = ((value - min) / (max - min)) * 100;

  // Format display value
  const displayValue = unit === '%' ? `${value}%` : (Number.isInteger(value) ? value : value.toFixed(2));

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-sm text-neutral-400">{label}</span>
        <span className="font-mono text-sm text-white tabular-nums">{displayValue}</span>
      </div>

      <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
        {/* Progress fill */}
        <div
          className="absolute inset-y-0 left-0 bg-terminal-accent/30 transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />

        {/* Thumb indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-terminal-accent rounded-full shadow-lg shadow-terminal-accent/30 transition-all duration-150"
          style={{ left: `calc(${percentage}% - 6px)` }}
        />
      </div>

      {/* Hidden range input for interaction */}
      <input
        type="range"
        min={min}
        max={max}
        step={unit === '%' ? 1 : 0.01}
        value={value}
        onChange={(e) => onChange(metricKey, parseFloat(e.target.value))}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        style={{ marginTop: '-8px', height: '24px' }}
      />
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export default function MetricsPanel({
  metrics,
  metricsConfig,
  onChange,
  onFind,
  onReset,
  disabled,
  hasSearched
}) {
  const metricKeys = Object.keys(metricsConfig);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border border-neutral-800 bg-terminal-surface rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
            Current Conditions
          </span>
          {metrics.lastUpdated && (
            <span className="font-mono text-[10px] text-neutral-600">
              defaults: {metrics.lastUpdated}
            </span>
          )}
        </div>

        {hasSearched && (
          <button
            onClick={onReset}
            disabled={disabled}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="p-4">
        <div className="grid gap-6 sm:grid-cols-2">
          {metricKeys.map((key) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="relative"
            >
              <MetricSlider
                metricKey={key}
                value={metrics[key]}
                config={metricsConfig[key]}
                onChange={onChange}
                disabled={disabled}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-4">
        <button
          onClick={onFind}
          disabled={disabled}
          className="w-full py-3 px-4 bg-terminal-accent/10 hover:bg-terminal-accent/20 border border-terminal-accent/30 hover:border-terminal-accent/50 text-terminal-accent font-mono text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? 'Searching...' : 'Find Echo'}
        </button>
      </div>
    </motion.div>
  );
}
