'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MetricsPanel from './MetricsPanel';
import EchoLoading from './EchoLoading';
import EchoResults from './EchoResults';
import echoesData from '@/data/echoes.json';

// Normalize a metric value to 0-1 scale
function normalize(value, metricKey) {
  const meta = echoesData.metrics[metricKey];
  if (!meta) return 0;
  return (value - meta.min) / (meta.max - meta.min);
}

// Calculate similarity between current metrics and a historical period
function calculateSimilarity(current, historical) {
  const weights = echoesData.weights;
  let weightedSum = 0;
  let totalWeight = 0;

  for (const key of Object.keys(weights)) {
    if (current[key] !== undefined && historical[key] !== undefined) {
      const diff = normalize(current[key], key) - normalize(historical[key], key);
      weightedSum += weights[key] * diff * diff;
      totalWeight += weights[key];
    }
  }

  if (totalWeight === 0) return 0;

  const distance = Math.sqrt(weightedSum / totalWeight);
  return Math.max(0, Math.round((1 - distance) * 100));
}

// Find top N matching periods
function findEchoes(currentMetrics, n = 3) {
  const results = [];

  for (const [year, period] of Object.entries(echoesData.periods)) {
    const similarity = calculateSimilarity(currentMetrics, period.metrics);
    results.push({
      year,
      ...period,
      similarity,
    });
  }

  // Sort by similarity descending
  results.sort((a, b) => b.similarity - a.similarity);

  return results.slice(0, n);
}

export default function Echo() {
  const [metrics, setMetrics] = useState(echoesData.currentDefaults);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleMetricChange = useCallback((key, value) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleFindEcho = useCallback(() => {
    setIsLoading(true);
    setResults(null);
    setHasSearched(true);

    // Simulate loading for effect
    setTimeout(() => {
      const echoes = findEchoes(metrics);
      setResults(echoes);
      setIsLoading(false);
    }, 1200);
  }, [metrics]);

  const handleReset = useCallback(() => {
    setMetrics(echoesData.currentDefaults);
    setResults(null);
    setHasSearched(false);
  }, []);

  // Memoize metrics metadata for panel
  const metricsConfig = useMemo(() => echoesData.metrics, []);

  return (
    <div className="space-y-6">
      {/* Metrics Input Panel */}
      <MetricsPanel
        metrics={metrics}
        metricsConfig={metricsConfig}
        onChange={handleMetricChange}
        onFind={handleFindEcho}
        onReset={handleReset}
        disabled={isLoading}
        hasSearched={hasSearched}
      />

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <EchoLoading />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {results && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <EchoResults
              results={results}
              currentMetrics={metrics}
              metricsConfig={metricsConfig}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
