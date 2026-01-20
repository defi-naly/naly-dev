'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StartHereCard from '@/components/StartHereCard';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import purchasingPowerData from '@/data/purchasing-power.json';

const THRESHOLD = 1.5;

// Saeculum cycle data
const CRISIS_START = 2008;
const CRISIS_END = 2030;
const CRISIS_LENGTH = CRISIS_END - CRISIS_START;

function getLineStatus(ratio: number) {
  if (ratio < THRESHOLD) return { label: 'CROSSED', color: 'red' };
  if (ratio < THRESHOLD * 1.1) return { label: 'Near', color: 'amber' };
  return { label: 'Safe', color: 'emerald' };
}

function calculateDecaySince1971(): number {
  const cpi = purchasingPowerData.cpi as Record<string, number>;
  const cpi1971 = cpi['1971'];
  const currentYear = new Date().getFullYear();
  const currentCPI = cpi[String(currentYear)] || cpi['2024'];
  const purchasingPower = 100 * (cpi1971 / currentCPI);
  return Math.round(purchasingPower - 100);
}

function calculateSaeculumYear(): { year: number; total: number } {
  const currentYear = new Date().getFullYear();
  const yearsIntoCrisis = currentYear - CRISIS_START;
  return { year: yearsIntoCrisis, total: CRISIS_LENGTH };
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

  const statusDotClass = status?.color === 'red' ? 'bg-red-500' :
    status?.color === 'amber' ? 'bg-amber-500' :
    status?.color === 'emerald' ? 'bg-emerald-500' : 'bg-zinc-500';

  const statusTextClass = status?.color === 'red' ? 'text-red-500' :
    status?.color === 'amber' ? 'text-amber-500' :
    status?.color === 'emerald' ? 'text-emerald-500' : 'text-zinc-500';

  // Calculate live values
  const decay = calculateDecaySince1971();
  const saeculum = calculateSaeculumYear();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Header />

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full py-12 sm:py-16">

          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-sm text-zinc-600 mb-6">
              <span className="text-emerald-500">~/naly</span> $ cat README.md
            </p>
            <h1 className="text-3xl sm:text-4xl font-medium text-zinc-100 mb-4">
              Decoding money.
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Interactive tools for understanding the signals that matter — inflation, cycles, debt, and regime shifts.
            </p>
          </motion.section>

          {/* Start Here Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-4">Start Here</h2>
            <StartHereCard />
          </motion.section>

          {/* Live Signals Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-4">Live Signals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">

              {/* The Line */}
              <Link href="/tools/the-line" className="group">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all">
                  <p className="font-mono text-xs text-zinc-500 mb-2">THE LINE</p>
                  <p className="text-2xl font-mono text-zinc-100 mb-1">
                    {loading ? '—' : ratio?.toFixed(2) ?? '—'}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass}`} />
                    <span className={`font-mono text-xs ${statusTextClass}`}>
                      {loading ? '—' : status?.label ?? '—'}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Saeculum */}
              <Link href="/tools/saeculum" className="group">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all">
                  <p className="font-mono text-xs text-zinc-500 mb-2">SAECULUM</p>
                  <p className="text-2xl font-mono text-zinc-100 mb-1">Year {saeculum.year}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-mono text-xs text-blue-500">Winter</span>
                  </div>
                </div>
              </Link>

              {/* Decay */}
              <Link href="/tools/decay" className="group">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all">
                  <p className="font-mono text-xs text-zinc-500 mb-2">DECAY</p>
                  <p className="text-2xl font-mono text-zinc-100 mb-1">{decay}%</p>
                  <p className="font-mono text-xs text-zinc-500">since 1971</p>
                </div>
              </Link>
            </div>

            <div className="text-right">
              <Link
                href="/tools"
                className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 hover:text-amber-500 transition-colors"
              >
                View all tools
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.section>

          {/* Featured Research Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-4">Latest Research</h2>
            <Link href="/research/the-signals-are-flashing">
              <div className="group bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-100 group-hover:text-amber-500 transition-colors mb-2">
                      "The Signals Are Flashing"
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-amber-500 font-mono text-[10px]">
                        LIVE-UPDATED
                      </span>
                      <span className="flex items-center gap-1 text-zinc-500 font-mono text-xs">
                        <Clock className="w-3 h-3" />
                        12 min read
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 group-hover:text-amber-500 transition-colors font-mono text-sm">
                    READ
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.section>

          {/* Quick Links */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-t border-zinc-800 pt-8"
          >
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
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
