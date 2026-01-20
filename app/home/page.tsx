'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const THRESHOLD = 1.5;

function getLineStatus(ratio: number) {
  if (ratio < THRESHOLD) return { label: 'CROSSED', color: 'red' };
  if (ratio < THRESHOLD * 1.1) return { label: 'Near', color: 'amber' };
  return { label: 'Safe', color: 'emerald' };
}

function getBarPosition(ratio: number) {
  const minRatio = 0;
  const maxRatio = 4.5;
  const position = ((ratio - minRatio) / (maxRatio - minRatio)) * 100;
  return Math.max(0, Math.min(100, position));
}

export default function Home() {
  const [lineData, setLineData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const ratio = lineData?.current?.ratio ?? null;
  const status = ratio ? getLineStatus(ratio) : null;
  const barPosition = ratio ? getBarPosition(ratio) : 38;

  const statusDotClass = status?.color === 'red' ? 'bg-red-500' :
    status?.color === 'amber' ? 'bg-amber-500' :
    status?.color === 'emerald' ? 'bg-emerald-500' : 'bg-zinc-500';

  const statusTextClass = status?.color === 'red' ? 'text-red-500' :
    status?.color === 'amber' ? 'text-amber-500' :
    status?.color === 'emerald' ? 'text-emerald-500' : 'text-zinc-500';

  const markerColorClass = status?.color === 'red' ? 'bg-red-500' :
    status?.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Header />

      <main className="flex-1 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full py-16">
          {/* Terminal prompt */}
          <p className="font-mono text-sm text-zinc-600 mb-12">
            <span className="text-emerald-500">~/naly</span> $ status
          </p>

          {/* The Line - Main Display */}
          <section className="mb-16">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <h1 className="text-2xl font-medium text-zinc-100 mb-1">The Line</h1>
                <p className="text-sm text-zinc-500 font-mono">S&P 500 / Gold ratio</p>
              </div>
              <Link
                href="/tools/the-line"
                className="text-sm text-zinc-500 hover:text-amber-500 transition font-mono"
              >
                details →
              </Link>
            </div>

            {/* Main metric */}
            <div className="mb-8">
              <div className="flex items-end gap-4 mb-2">
                <span className="text-6xl sm:text-7xl font-mono font-light text-zinc-100 tabular-nums">
                  {loading ? '—' : ratio?.toFixed(2) ?? '—'}
                </span>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${statusDotClass}`} />
                  <span className={`text-lg font-mono ${statusTextClass}`}>
                    {loading ? '—' : status?.label ?? '—'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-zinc-600 font-mono">
                Danger threshold: <span className="text-red-500">{'<'} 1.50</span>
              </p>
            </div>

            {/* Position bar */}
            <div className="h-2 bg-zinc-800 rounded-full relative mb-3">
              <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-500/10 rounded-l-full" />
              <div className="absolute top-0 bottom-0 w-px bg-red-500/50" style={{ left: '33%' }} />
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-zinc-950 transition-all duration-500 ${markerColorClass}`}
                style={{ left: `${barPosition}%` }}
              />
            </div>
            <p className="text-xs text-zinc-600 font-mono">Only 2 breaches in 50+ years</p>
          </section>

          {/* Quick links */}
          <section className="border-t border-zinc-800 pt-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/tools"
                className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition group"
              >
                <p className="text-xs font-mono text-zinc-500 mb-1">explore</p>
                <p className="text-sm text-zinc-300 group-hover:text-amber-500 transition">Tools →</p>
              </Link>
              <Link
                href="/research"
                className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition group"
              >
                <p className="text-xs font-mono text-zinc-500 mb-1">read</p>
                <p className="text-sm text-zinc-300 group-hover:text-amber-500 transition">Research →</p>
              </Link>
              <Link
                href="/learn"
                className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition group"
              >
                <p className="text-xs font-mono text-zinc-500 mb-1">understand</p>
                <p className="text-sm text-zinc-300 group-hover:text-amber-500 transition">Learn →</p>
              </Link>
              <a
                href="https://moneyverse.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition group"
              >
                <p className="text-xs font-mono text-zinc-500 mb-1">subscribe</p>
                <p className="text-sm text-zinc-300 group-hover:text-amber-500 transition">Newsletter →</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
