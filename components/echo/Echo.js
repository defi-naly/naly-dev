'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MetricsPanel from './MetricsPanel';
import EchoLoading from './EchoLoading';
import EchoResults from './EchoResults';
import echoesData from '@/data/echoes.json';

// Calculate similarity between current metrics and a historical period
// Uses weights and normalized differences
function calculateSimilarity(current, historical) {
  const weights = echoesData.weights;
  const metricsConfig = echoesData.metrics;
  let totalScore = 0;
  let totalWeight = 0;

  for (const [key, weight] of Object.entries(weights)) {
    if (current[key] === undefined || historical[key] === undefined) continue;

    const config = metricsConfig[key];
    if (!config) continue;

    const currentVal = current[key];
    const historicalVal = historical[key];
    const maxDiff = config.max - config.min;

    // Normalize difference (0 = identical, 1 = very different)
    const diff = Math.abs(currentVal - historicalVal) / maxDiff;
    const similarity = Math.max(0, 1 - diff);

    totalScore += similarity * weight;
    totalWeight += weight;
  }

  // Return as percentage, normalized by total weight
  if (totalWeight === 0) return 0;
  return Math.round((totalScore / totalWeight) * 100);
}

// Find all matching periods sorted by similarity
function findEchoes(currentMetrics, n = 5) {
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
  const [isFetchingLive, setIsFetchingLive] = useState(true);
  const [results, setResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch live metrics on mount
  useEffect(() => {
    async function fetchLiveMetrics() {
      try {
        const response = await fetch('/api/echo-metrics');
        if (response.ok) {
          const data = await response.json();
          setMetrics(prev => ({
            ...prev,
            ...data.metrics,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch live metrics:', error);
        // Keep using defaults on error
      } finally {
        setIsFetchingLive(false);
      }
    }
    fetchLiveMetrics();
  }, []);

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
