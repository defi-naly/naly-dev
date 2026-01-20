'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const THRESHOLD = 1.5;

function getLineStatus(ratio) {
  if (ratio < THRESHOLD) return { label: 'CROSSED', color: 'red' };
  if (ratio < THRESHOLD * 1.1) return { label: 'Near', color: 'amber' };
  return { label: 'Safe', color: 'emerald' };
}

// The Line Preview Card
function TheLinePreview() {
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
  const status = ratio ? getLineStatus(ratio) : null;

  const statusDotClass = status?.color === 'red' ? 'bg-red-400' :
    status?.color === 'amber' ? 'bg-amber-400' :
    status?.color === 'emerald' ? 'bg-emerald-400' : 'bg-neutral-400';

  const statusTextClass = status?.color === 'red' ? 'text-red-400' :
    status?.color === 'amber' ? 'text-amber-400' :
    status?.color === 'emerald' ? 'text-emerald-400' : 'text-neutral-400';

  return (
    <Link href="/tools/the-line" className="block group">
      <div className="relative overflow-hidden bg-terminal-surface border border-neutral-800 rounded-xl p-5 transition-all duration-300 hover:border-neutral-600">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-terminal-accent/10 border border-terminal-accent/30 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-terminal-accent" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white group-hover:text-terminal-accent transition-colors">
                The Line
              </h3>
              <p className="text-xs text-neutral-500 font-mono">SPX/GOLD regime</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-terminal-accent/20 text-terminal-accent rounded-full">
            <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
            LIVE
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-neutral-600 font-mono text-[10px] uppercase mb-1">Ratio</p>
            <span className="text-2xl font-mono font-light text-white">
              {loading ? '—' : ratio?.toFixed(2) ?? '—'}
            </span>
          </div>
          <div className="text-center">
            <p className="text-neutral-600 font-mono text-[10px] uppercase mb-1">Danger</p>
            <span className="text-2xl font-mono font-light text-red-400">{'<'}1.5</span>
          </div>
          <div className="text-right">
            <p className="text-neutral-600 font-mono text-[10px] uppercase mb-1">Status</p>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${statusDotClass}`} />
              <span className={`font-mono text-sm ${statusTextClass}`}>
                {loading ? '—' : status?.label ?? '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// TruValue Preview Card
function TruValuePreview() {
  return (
    <Link href="/tools/truvalue" className="block group">
      <div className="relative overflow-hidden bg-terminal-surface border border-neutral-800 rounded-xl p-5 transition-all duration-300 hover:border-neutral-600">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-terminal-accent/10 border border-terminal-accent/30 flex items-center justify-center">
              <span className="text-xl font-light text-terminal-accent">$</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white group-hover:text-terminal-accent transition-colors">
                TruValue
              </h3>
              <p className="text-xs text-neutral-500 font-mono">inflation-adjusted</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-terminal-accent/20 text-terminal-accent rounded-full">
            <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
            LIVE
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="text-center">
            <span className="text-2xl font-mono font-light text-white">$100</span>
            <p className="text-[10px] font-mono text-neutral-600 mt-1">nominal</p>
          </div>
          <span className="text-neutral-600">→</span>
          <div className="text-center">
            <span className="text-2xl font-mono font-light text-red-400">$17</span>
            <p className="text-[10px] font-mono text-neutral-600 mt-1">real value</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Saeculum Preview Card
function SaeculumPreview() {
  return (
    <Link href="/tools/saeculum" className="block group">
      <div className="relative overflow-hidden bg-terminal-surface border border-neutral-800 rounded-xl p-5 transition-all duration-300 hover:border-neutral-600">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-terminal-accent/10 border border-terminal-accent/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-terminal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white group-hover:text-terminal-accent transition-colors">
                Saeculum
              </h3>
              <p className="text-xs text-neutral-500 font-mono">fourth turning</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-amber-500/20 text-amber-400 rounded-full">
            <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
            CRISIS
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neutral-700" />
            <span className="w-2 h-2 rounded-full bg-neutral-700" />
            <span className="w-2 h-2 rounded-full bg-neutral-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
            <span className="text-xs font-mono text-amber-400 ml-1">WINTER</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-mono font-light text-white">17</span>
            <span className="text-sm font-mono text-neutral-600"> of ~22</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// The Fork Preview Card
function TheForkPreview() {
  return (
    <Link href="/tools/the-fork" className="block group">
      <div className="relative overflow-hidden bg-terminal-surface border border-neutral-800 rounded-xl p-5 transition-all duration-300 hover:border-neutral-600">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white group-hover:text-terminal-accent transition-colors">
                The Fork
              </h3>
              <p className="text-xs text-neutral-500 font-mono">debt crisis paths</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-1">
              <span className="text-emerald-400 font-mono text-lg">$</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">PRINT</span>
          </div>
          <span className="text-neutral-600 text-xs">or</span>
          <div className="text-center">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-1">
              <span className="text-amber-400 font-mono text-lg">↺</span>
            </div>
            <span className="text-[10px] font-mono text-amber-400">RESET</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Decay Preview Card
function DecayPreview() {
  return (
    <Link href="/tools/decay" className="block group">
      <div className="relative overflow-hidden bg-terminal-surface border border-neutral-800 rounded-xl p-5 transition-all duration-300 hover:border-neutral-600 h-full flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-medium text-white group-hover:text-terminal-accent transition-colors">
              Decay
            </h3>
            <p className="text-[10px] text-neutral-500 font-mono">time machine</p>
          </div>
        </div>
        <div className="font-mono text-xs text-neutral-500 mt-3">
          <span className="text-terminal-accent">$100</span> → <span className="text-amber-400">$17</span>
        </div>
      </div>
    </Link>
  );
}

// Echo Preview Card
function EchoPreview() {
  return (
    <Link href="/tools/echo" className="block group">
      <div className="relative overflow-hidden bg-terminal-surface border border-neutral-800 rounded-xl p-5 transition-all duration-300 hover:border-neutral-600 h-full flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-terminal-accent/10 border border-terminal-accent/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-terminal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-medium text-white group-hover:text-terminal-accent transition-colors">
              Echo
            </h3>
            <p className="text-[10px] text-neutral-500 font-mono">pattern finder</p>
          </div>
        </div>
        <div className="font-mono text-xs text-terminal-accent mt-3">
          Find your echo
        </div>
      </div>
    </Link>
  );
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Terminal header */}
          <p className="font-mono text-sm text-zinc-500 mb-8">
            <span className="text-emerald-500">~/naly/tools</span> $ ls -la
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* The Line - Featured */}
            <motion.div variants={itemVariants}>
              <TheLinePreview />
            </motion.div>

            {/* Main tools grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <TruValuePreview />
              </motion.div>
              <motion.div variants={itemVariants}>
                <SaeculumPreview />
              </motion.div>
              <motion.div variants={itemVariants}>
                <TheForkPreview />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <DecayPreview />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <EchoPreview />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
