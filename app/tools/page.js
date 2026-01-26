'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import purchasingPowerData from '@/data/purchasing-power.json';
import echoesData from '@/data/echoes.json';

const THRESHOLD = 1.5;

function getLineStatus(ratio) {
  if (ratio < THRESHOLD) return { label: 'CROSSED', color: 'red' };
  if (ratio < THRESHOLD * 1.1) return { label: 'Near', color: 'amber' };
  return { label: 'Safe', color: 'emerald' };
}

// Calculate purchasing power decay since 1971
function calculateDecay() {
  const cpi1971 = purchasingPowerData.cpi['1971'];
  const cpi2024 = purchasingPowerData.cpi['2024'];
  const decayPercent = ((cpi1971 / cpi2024) - 1) * 100;
  const realValue = Math.round((cpi1971 / cpi2024) * 100);
  return { decayPercent: Math.round(decayPercent), realValue };
}

// Calculate top echo match using weighted similarity
function calculateEchoMatches(currentMetrics) {
  const periods = echoesData.periods;
  const metricsConfig = echoesData.metrics;
  const weights = echoesData.weights;

  let matches = [];

  for (const [year, period] of Object.entries(periods)) {
    let totalScore = 0;
    let totalWeight = 0;

    for (const [metricKey, weight] of Object.entries(weights)) {
      const config = metricsConfig[metricKey];
      if (!config || period.metrics[metricKey] === undefined) continue;

      const currentVal = currentMetrics[metricKey];
      const periodVal = period.metrics[metricKey];
      const maxDiff = config.max - config.min;

      const diff = Math.abs(currentVal - periodVal) / maxDiff;
      const similarity = Math.max(0, 1 - diff);

      totalScore += similarity * weight;
      totalWeight += weight;
    }

    const normalizedScore = totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
    matches.push({ year, name: period.name, similarity: Math.round(normalizedScore) });
  }

  matches.sort((a, b) => b.similarity - a.similarity);
  return matches.slice(0, 2);
}

// Terminal timestamp
function Timestamp() {
  const now = new Date();
  const formatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return <span className="text-zinc-500 font-mono text-sm">[{formatted}]</span>;
}

// MARKET SIGNALS Section
function MarketSignals() {
  const [lineData, setLineData] = useState(null);
  const [alchemyData, setAlchemyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const decay = calculateDecay();
  const saeculumYear = new Date().getFullYear() - 2008;
  const saeculumTotal = 22;
  const progressPercent = (saeculumYear / saeculumTotal) * 100;

  useEffect(() => {
    async function fetchData() {
      try {
        const [lineResponse, alchemyResponse] = await Promise.all([
          fetch('/api/the-line?range=1y'),
          fetch('/api/alchemy?range=1y'),
        ]);

        if (lineResponse.ok) {
          const data = await lineResponse.json();
          setLineData(data);
        }

        if (alchemyResponse.ok) {
          const data = await alchemyResponse.json();
          setAlchemyData(data);
        }
      } catch (error) {
        console.error('Failed to fetch market data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const ratio = lineData?.current?.ratio ?? null;
  const status = ratio ? getLineStatus(ratio) : null;

  const statusDotClass = status?.color === 'red' ? 'bg-red-400' :
    status?.color === 'amber' ? 'bg-amber-400' :
    status?.color === 'emerald' ? 'bg-emerald-400' : 'bg-zinc-600';

  const statusTextClass = status?.color === 'red' ? 'text-red-400' :
    status?.color === 'amber' ? 'text-amber-400' :
    status?.color === 'emerald' ? 'text-emerald-400' : 'text-zinc-500';

  const alchemyRegime = alchemyData?.current?.regime;
  const alchemyDotClass = alchemyRegime === 'crypto' ? 'bg-amber-400' :
    alchemyRegime === 'commodities' ? 'bg-emerald-400' : 'bg-zinc-400';
  const alchemyTextClass = alchemyRegime === 'crypto' ? 'text-amber-400' :
    alchemyRegime === 'commodities' ? 'text-emerald-400' : 'text-zinc-400';
  const alchemyLabel = alchemyRegime === 'crypto' ? 'DIGITAL LEADING' :
    alchemyRegime === 'commodities' ? 'PHYSICAL LEADING' : 'NEUTRAL';

  return (
    <div className="border border-zinc-800">
      <div className="px-4 py-2 border-b border-zinc-800">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Market Signals</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
        {/* THE LINE */}
        <Link href="/tools/the-line" className="block p-4 hover:bg-zinc-900/50 transition-colors">
          <div className="mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">The Line</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 mb-3">SPX/GLD</div>
          <div className="text-3xl font-mono text-white mb-2">
            {loading ? '—' : ratio?.toFixed(2) ?? '—'}
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass}`} />
            <span className={`text-xs font-mono ${statusTextClass}`}>
              {loading ? '—' : status?.label ?? '—'}
            </span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 mt-1">threshold &lt;1.50</div>
        </Link>

        {/* ALCHEMY */}
        <Link href="/tools/alchemy" className="block p-4 hover:bg-zinc-900/50 transition-colors">
          <div className="mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Alchemy</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 mb-3">Digital vs Physical</div>
          <div className="text-3xl font-mono text-white mb-2">
            {loading ? '—' : alchemyData?.current?.spreadPercent != null
              ? `${alchemyData.current.spreadPercent > 0 ? '+' : ''}${alchemyData.current.spreadPercent.toFixed(0)}%`
              : '—'}
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${alchemyDotClass}`} />
            <span className={`text-xs font-mono ${alchemyTextClass}`}>
              {loading ? '—' : alchemyLabel}
            </span>
          </div>
        </Link>

        {/* DECAY (macro) */}
        <Link href="/tools/decay" className="block p-4 hover:bg-zinc-900/50 transition-colors">
          <div className="mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Decay</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 mb-3">USD since 1971</div>
          <div className="text-3xl font-mono text-red-400 mb-2">
            {decay.decayPercent}%
          </div>
          <div className="text-xs font-mono text-zinc-500">
            $100 → ${decay.realValue}
          </div>
        </Link>

        {/* SAECULUM */}
        <Link href="/tools/saeculum" className="block p-4 hover:bg-zinc-900/50 transition-colors">
          <div className="mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Saeculum</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 mb-3">Fourth Turning</div>
          <div className="text-xl font-mono text-white mb-2">
            Year {saeculumYear} of {saeculumTotal}
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-1.5 bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
            <span className="text-xs font-mono text-blue-400">WINTER</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600">
            2008────────────────────2030
          </div>
        </Link>
      </div>
    </div>
  );
}

// ANALYSIS TOOLS Section
function AnalysisTools() {
  const [currentMetrics, setCurrentMetrics] = useState(echoesData.currentDefaults);
  const [topMatches, setTopMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveMetrics() {
      try {
        const response = await fetch('/api/echo-metrics');
        if (response.ok) {
          const data = await response.json();
          const liveMetrics = { ...echoesData.currentDefaults, ...data.metrics };
          setCurrentMetrics(liveMetrics);
          setTopMatches(calculateEchoMatches(liveMetrics));
        } else {
          setTopMatches(calculateEchoMatches(echoesData.currentDefaults));
        }
      } catch (error) {
        console.error('Failed to fetch live metrics:', error);
        setTopMatches(calculateEchoMatches(echoesData.currentDefaults));
      } finally {
        setLoading(false);
      }
    }
    fetchLiveMetrics();
  }, []);

  const current = currentMetrics;

  return (
    <div className="border border-zinc-800">
      <div className="px-4 py-2 border-b border-zinc-800">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Analysis Tools</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
        {/* THE FORK */}
        <Link href="/tools/the-fork" className="block p-4 hover:bg-zinc-900/50 transition-colors">
          <div className="mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">The Fork</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 mb-4">Debt Crisis Scenarios</div>

          <div className="flex items-start justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="text-sm font-mono text-emerald-400 mb-1">PRINT</div>
              <div className="text-[10px] font-mono text-zinc-600">inflate away</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-mono text-amber-400 mb-1">RESTRUCTURE</div>
              <div className="text-[10px] font-mono text-zinc-600">hard reset</div>
            </div>
          </div>

          {/* Fork diagram */}
          <div className="font-mono text-zinc-600 text-xs text-center">
            <div>───────┬──────────</div>
            <div className="mt-1">▼</div>
            <div className="text-zinc-400 mt-1">[TODAY]</div>
          </div>
        </Link>

        {/* ECHO */}
        <Link href="/tools/echo" className="block p-4 hover:bg-zinc-900/50 transition-colors">
          <div className="mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Echo</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 mb-4">Pattern Matcher</div>

          <div className="text-[10px] font-mono text-zinc-500 mb-3">Current conditions match:</div>

          <div className="space-y-1 mb-4">
            {loading ? (
              <div className="text-zinc-600 font-mono text-sm">Loading...</div>
            ) : (
              topMatches.map((match, i) => (
                <div key={match.year} className="flex items-center justify-between">
                  <span className="font-mono text-sm text-white">{match.year}</span>
                  <span className={`font-mono text-sm ${i === 0 ? 'text-terminal-accent' : 'text-zinc-400'}`}>
                    {match.similarity}% similarity
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-zinc-800 pt-3 space-y-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-zinc-600">CAPE:</span>
              <span className="text-zinc-400">{current.cape}</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-zinc-600">debt/gdp:</span>
              <span className="text-zinc-400">{current.debtGDP}%</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

// CALCULATORS Section
function Calculators() {
  const decay = calculateDecay();

  return (
    <div className="border border-zinc-800">
      <div className="px-4 py-2 border-b border-zinc-800">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Calculators</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
        {/* TRUVALUE */}
        <Link href="/tools/truvalue" className="block p-4 hover:bg-zinc-900/50 transition-colors">
          <div className="mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">TruValue</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 mb-4">Inflation-Adjusted Prices</div>

          <div className="text-[10px] font-mono text-zinc-500 mb-3">
            Enter any amount to see<br />real vs nominal value
          </div>

          <div className="font-mono text-sm">
            <span className="text-white">$100</span>
            <span className="text-zinc-600"> nominal → </span>
            <span className="text-red-400">${decay.realValue}</span>
            <span className="text-zinc-600"> real</span>
          </div>
        </Link>

        {/* DECAY (personal) */}
        <Link href="/tools/decay" className="block p-4 hover:bg-zinc-900/50 transition-colors">
          <div className="mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Decay</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 mb-4">Personal Purchasing Power</div>

          <div className="text-[10px] font-mono text-zinc-500 mb-3">
            Enter birth year to see<br />lifetime erosion
          </div>

          <div className="font-mono text-sm">
            <span className="text-zinc-400">Gen X: </span>
            <span className="text-red-400">-73%</span>
            <span className="text-zinc-600"> purchasing power</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Terminal header with timestamp */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
            <p className="font-mono text-sm text-zinc-500">
              <span className="text-emerald-500">~/naly/tools</span> $ status --all
            </p>
            <Timestamp />
          </div>

          <div className="space-y-0">
            <MarketSignals />
            <AnalysisTools />
            <Calculators />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
