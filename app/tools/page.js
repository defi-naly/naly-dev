'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const tools = [
  { name: 'TruValue', slug: 'truvalue', description: 'inflation-adjusted', metric: '$100 → $17' },
  { name: 'Saeculum', slug: 'saeculum', description: 'fourth turning', metric: 'Year 17 · Winter' },
  { name: 'The Fork', slug: 'the-fork', description: 'debt crisis paths', metric: 'Print or Reset' },
  { name: 'Decay', slug: 'decay', description: 'time machine', metric: '$100 → $17' },
  { name: 'Echo', slug: 'echo', description: 'historical rhymes', metric: 'Find yours' },
];

const THRESHOLD = 1.5;

function getStatus(ratio) {
  if (ratio < THRESHOLD) return { label: 'CROSSED', color: 'red' };
  if (ratio < THRESHOLD * 1.1) return { label: 'Near', color: 'amber' };
  return { label: 'Safe', color: 'emerald' };
}

function getBarPosition(ratio) {
  // Map ratio to position: 0 = 0%, 1.5 = 33%, 3.0 = 66%, 4.5+ = 100%
  const minRatio = 0;
  const maxRatio = 4.5;
  const position = ((ratio - minRatio) / (maxRatio - minRatio)) * 100;
  return Math.max(0, Math.min(100, position));
}

export default function ToolsPage() {
  const [lineData, setLineData] = useState(null);
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
  const status = ratio ? getStatus(ratio) : null;
  const barPosition = ratio ? getBarPosition(ratio) : 38;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Terminal header */}
          <p className="font-mono text-sm text-zinc-500 mb-8">
            <span className="text-emerald-500">~/naly/tools</span> $ ls
          </p>

          {/* The Line - Hero Status */}
          <section className="mb-12 pb-12 border-b border-zinc-800">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h2 className="text-xl font-medium text-zinc-100">The Line</h2>
                <p className="text-sm text-zinc-500">S&P/Gold regime indicator</p>
              </div>
              <Link
                href="/tools/the-line"
                className="text-sm text-zinc-400 hover:text-amber-500 transition"
              >
                Explore →
              </Link>
            </div>

            {/* Metrics - Desktop */}
            <div className="hidden sm:flex items-end justify-between mb-6">
              <div>
                <div className="text-4xl font-mono font-semibold text-zinc-100">
                  {loading ? '—' : ratio?.toFixed(2) ?? '—'}
                </div>
                <div className="text-xs text-zinc-500 mt-1">current ratio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono text-red-500">{'< 1.5'}</div>
                <div className="text-xs text-zinc-500 mt-1">danger level</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className={`w-2 h-2 rounded-full ${
                    status?.color === 'red' ? 'bg-red-500' :
                    status?.color === 'amber' ? 'bg-amber-500' :
                    status?.color === 'emerald' ? 'bg-emerald-500' : 'bg-zinc-500'
                  }`} />
                  <span className={`text-lg ${
                    status?.color === 'red' ? 'text-red-500' :
                    status?.color === 'amber' ? 'text-amber-500' :
                    status?.color === 'emerald' ? 'text-emerald-500' : 'text-zinc-500'
                  }`}>
                    {loading ? '—' : status?.label ?? '—'}
                  </span>
                </div>
                <div className="text-xs text-zinc-500 mt-1">status</div>
              </div>
            </div>

            {/* Metrics - Mobile */}
            <div className="sm:hidden mb-6">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-3xl font-mono font-semibold text-zinc-100">
                    {loading ? '—' : ratio?.toFixed(2) ?? '—'}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">current ratio</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className={`w-2 h-2 rounded-full ${
                      status?.color === 'red' ? 'bg-red-500' :
                      status?.color === 'amber' ? 'bg-amber-500' :
                      status?.color === 'emerald' ? 'bg-emerald-500' : 'bg-zinc-500'
                    }`} />
                    <span className={`text-lg ${
                      status?.color === 'red' ? 'text-red-500' :
                      status?.color === 'amber' ? 'text-amber-500' :
                      status?.color === 'emerald' ? 'text-emerald-500' : 'text-zinc-500'
                    }`}>
                      {loading ? '—' : status?.label ?? '—'}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">status</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">Danger:</span>
                <span className="text-sm font-mono text-red-500">{'< 1.5'}</span>
              </div>
            </div>

            {/* Position bar */}
            <div className="h-2 bg-zinc-800 rounded-full relative mb-4">
              <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-500/10 rounded-l-full" />
              <div className="absolute top-0 bottom-0 w-px bg-red-500/50" style={{ left: '33%' }} />
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-zinc-950 ${
                  status?.color === 'red' ? 'bg-red-500' :
                  status?.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ left: `${barPosition}%` }}
              />
            </div>

            <p className="text-xs text-zinc-600">Only 2 breaches in 50+ years</p>
          </section>

          {/* Tools List */}
          <section>
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-wide mb-4">
              Tools
            </h2>

            <div className="border border-zinc-800 rounded-lg divide-y divide-zinc-800">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-zinc-900/50 transition group"
                >
                  <div>
                    <div className="text-zinc-100 font-medium">{tool.name}</div>
                    <div className="text-sm text-zinc-500">{tool.description}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-zinc-400 hidden sm:inline">{tool.metric}</span>
                    <span className="text-zinc-600 group-hover:text-amber-500 transition">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
