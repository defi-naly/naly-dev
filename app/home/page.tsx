'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import purchasingPowerData from '@/data/purchasing-power.json';

const STORAGE_KEY = 'money-game-progress';
const THRESHOLD = 1.5;
const CRISIS_START = 2008;
const CRISIS_END = 2030;

interface SavedProgress {
  chapter: number;
  completed: boolean;
}

function getLineStatus(ratio: number) {
  if (ratio < THRESHOLD) return { label: 'CROSSED', color: 'red' };
  if (ratio < THRESHOLD * 1.1) return { label: 'Near', color: 'amber' };
  return { label: 'Safe', color: 'emerald' };
}

function calculateDecaySince1971(): number {
  const cpi = purchasingPowerData.cpi as Record<string, number>;
  const cpi1971 = cpi['1971'];
  const currentCPI = cpi['2024'];
  return Math.round((cpi1971 / currentCPI) * 100 - 100);
}

function Timestamp() {
  const now = new Date();
  const formatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return <span className="text-zinc-500 font-mono text-sm">[{formatted}]</span>;
}

export default function Home() {
  const [lineData, setLineData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gameProgress, setGameProgress] = useState<SavedProgress | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Fetch Line data
    async function fetchLineData() {
      try {
        const response = await fetch('/api/the-line?range=1y');
        if (response.ok) {
          const data = await response.json();
          setLineData(data);
        }
      } catch (error) {
        console.error('Failed to fetch Line data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLineData();

    // Check game progress
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SavedProgress;
        if (parsed.chapter > 1 || parsed.completed) {
          setGameProgress(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const ratio = lineData?.current?.ratio ?? null;
  const status = ratio ? getLineStatus(ratio) : null;

  const statusDotClass = status?.color === 'red' ? 'bg-red-400' :
    status?.color === 'amber' ? 'bg-amber-400' :
    status?.color === 'emerald' ? 'bg-emerald-400' : 'bg-zinc-600';

  const statusTextClass = status?.color === 'red' ? 'text-red-400' :
    status?.color === 'amber' ? 'text-amber-400' :
    status?.color === 'emerald' ? 'text-emerald-400' : 'text-zinc-500';

  const decay = calculateDecaySince1971();
  const saeculumYear = new Date().getFullYear() - CRISIS_START;
  const saeculumTotal = CRISIS_END - CRISIS_START;
  const progressPercent = (saeculumYear / saeculumTotal) * 100;

  // Game progress
  const gameProgressPercent = gameProgress
    ? gameProgress.completed
      ? 100
      : Math.round(((gameProgress.chapter - 1) / 8) * 100)
    : 0;

  const getGameStatus = () => {
    if (!gameProgress) return { label: 'NOT STARTED', color: 'zinc' };
    if (gameProgress.completed) return { label: 'COMPLETE', color: 'emerald' };
    return { label: `CH ${gameProgress.chapter}/8`, color: 'amber' };
  };

  const gameStatus = getGameStatus();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Terminal header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
            <p className="font-mono text-sm text-zinc-500">
              <span className="text-emerald-500">~/naly</span> $ status
            </p>
            <Timestamp />
          </div>

          {/* Hero */}
          <div className="border border-zinc-800 mb-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">System</span>
            </div>
            <div className="p-4 md:p-6">
              <h1 className="text-2xl md:text-3xl font-mono text-white mb-2">
                Decoding money.
              </h1>
              <p className="text-zinc-500 font-mono text-sm">
                Interactive tools for understanding the signals that matter — inflation, cycles, debt, and regime shifts.
              </p>
            </div>
          </div>

          {/* Live Signals */}
          <div className="border border-zinc-800 border-t-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Live Signals</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
              {/* THE LINE */}
              <Link href="/tools/the-line" className="block p-4 hover:bg-zinc-900/50 transition-colors">
                <div className="text-[10px] font-mono text-zinc-600 mb-2">THE LINE</div>
                <div className="text-2xl font-mono text-white mb-1">
                  {loading ? '—' : ratio?.toFixed(2) ?? '—'}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass}`} />
                  <span className={`text-xs font-mono ${statusTextClass}`}>
                    {loading ? '—' : status?.label ?? '—'}
                  </span>
                </div>
              </Link>

              {/* SAECULUM */}
              <Link href="/tools/saeculum" className="block p-4 hover:bg-zinc-900/50 transition-colors">
                <div className="text-[10px] font-mono text-zinc-600 mb-2">SAECULUM</div>
                <div className="text-2xl font-mono text-white mb-1">Year {saeculumYear}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-zinc-800 max-w-[80px]">
                    <div className="h-full bg-blue-500" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <span className="text-xs font-mono text-blue-400">WINTER</span>
                </div>
              </Link>

              {/* DECAY */}
              <Link href="/tools/decay" className="block p-4 hover:bg-zinc-900/50 transition-colors">
                <div className="text-[10px] font-mono text-zinc-600 mb-2">DECAY</div>
                <div className="text-2xl font-mono text-red-400 mb-1">{decay}%</div>
                <div className="text-[10px] font-mono text-zinc-600">USD since 1971</div>
              </Link>
            </div>
          </div>

          {/* Start Here - The Money Game */}
          <div className="border border-zinc-800 border-t-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Start Here</span>
            </div>
            <Link href="/learn/game" className="block p-4 hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-mono text-white mb-1">The Money Game</div>
                  <div className="text-[10px] font-mono text-zinc-600">8 chapters • 20 min • interactive</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-mono mb-1 ${
                    gameStatus.color === 'emerald' ? 'text-emerald-400' :
                    gameStatus.color === 'amber' ? 'text-amber-400' : 'text-zinc-500'
                  }`}>
                    {mounted ? gameStatus.label : '—'}
                  </div>
                  {mounted && gameProgressPercent > 0 && (
                    <div className="w-20 h-1 bg-zinc-800">
                      <div
                        className={`h-full ${gameProgress?.completed ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${gameProgressPercent}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>

          {/* Research */}
          <div className="border border-zinc-800 border-t-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Research</span>
            </div>
            <Link href="/research/the-signals-are-flashing" className="block p-4 hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-mono text-white mb-1">"The Signals Are Flashing"</div>
                  <div className="text-[10px] font-mono text-zinc-600">live-updated • 12 min read</div>
                </div>
                <div className="text-xs font-mono text-zinc-600">READ →</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="border border-zinc-800 border-t-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Navigate</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x divide-zinc-800">
              <Link href="/tools" className="block p-4 hover:bg-zinc-900/50 transition-colors">
                <div className="text-[10px] font-mono text-zinc-600 mb-1">explore</div>
                <div className="text-sm font-mono text-zinc-300">Tools →</div>
              </Link>
              <Link href="/research" className="block p-4 hover:bg-zinc-900/50 transition-colors">
                <div className="text-[10px] font-mono text-zinc-600 mb-1">read</div>
                <div className="text-sm font-mono text-zinc-300">Research →</div>
              </Link>
              <Link href="/learn" className="block p-4 hover:bg-zinc-900/50 transition-colors">
                <div className="text-[10px] font-mono text-zinc-600 mb-1">understand</div>
                <div className="text-sm font-mono text-zinc-300">Learn →</div>
              </Link>
              <a
                href="https://moneyverse.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 hover:bg-zinc-900/50 transition-colors"
              >
                <div className="text-[10px] font-mono text-zinc-600 mb-1">subscribe</div>
                <div className="text-sm font-mono text-zinc-300">Newsletter →</div>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
