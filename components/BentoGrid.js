'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

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

function BentoCard({ children, className = '', href, external = false }) {
  const content = (
    <div className={`relative group overflow-hidden bg-terminal-surface border border-neutral-800 rounded-xl transition-all duration-300 hover:border-neutral-600 ${className}`}>
      {children}
      {href && (
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-neutral-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
        </div>
      )}
    </div>
  );

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">{content}</a>
    ) : (
      <Link href={href} className="block h-full">{content}</Link>
    );
  }
  return content;
}

// TruValue - Branded splash card
function TruValueCard() {
  return (
    <BentoCard href="/tools/truvalue" className="h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-terminal-surface to-neutral-900">
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-terminal-accent/20 text-terminal-accent rounded-full">
          <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="w-16 h-16 rounded-2xl bg-terminal-accent/10 border border-terminal-accent/30 flex items-center justify-center mb-6">
        <span className="text-3xl font-light text-terminal-accent">$</span>
      </div>

      <h3 className="text-2xl font-medium tracking-tight text-white mb-2 group-hover:text-terminal-accent transition-colors">
        TruValue
      </h3>
      <p className="text-sm text-neutral-500 font-mono">
        See assets in their true value
      </p>

      <div className="absolute bottom-4 left-0 right-0 px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        <p className="text-[10px] font-mono text-neutral-600 mt-3">truvalue.lovable.app</p>
      </div>
    </BentoCard>
  );
}

// Fourth Turning - Branded splash card
function FourthTurningCard() {
  return (
    <BentoCard href="/tools/saeculum" className="h-full flex flex-col items-center justify-center text-center p-5 bg-gradient-to-br from-terminal-surface to-neutral-900">
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-terminal-accent/20 text-terminal-accent rounded-full">
          <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="w-14 h-14 rounded-xl bg-terminal-accent/10 border border-terminal-accent/30 flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-terminal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </div>

      <h3 className="text-xl font-medium tracking-tight text-white mb-1 group-hover:text-terminal-accent transition-colors">
        Saeculum
      </h3>
      <p className="text-xs text-neutral-500 font-mono mb-4">
        cycle indicator
      </p>

      <div className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-neutral-700" title="Spring" />
        <span className="w-2 h-2 rounded-full bg-neutral-700" title="Summer" />
        <span className="w-2 h-2 rounded-full bg-neutral-700" title="Fall" />
        <span className="w-2 h-2 rounded-full bg-terminal-accent animate-pulse" title="Winter" />
      </div>
    </BentoCard>
  );
}

// Time Machine - Branded splash card (horizontal)
function TimeMachineCard() {
  return (
    <BentoCard href="/tools/decay" className="h-full flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-terminal-surface to-neutral-900">
      <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <div className="text-left">
        <h3 className="text-sm font-medium tracking-tight text-white group-hover:text-terminal-accent transition-colors">
          Decay
        </h3>
        <p className="text-[10px] text-neutral-500 font-mono">time machine</p>
      </div>
      <div className="h-6 w-px bg-neutral-800 mx-2" />
      <div className="font-mono text-xs text-neutral-500">
        <span className="text-terminal-accent">$100</span> → <span className="text-amber-400">$17</span>
      </div>
    </BentoCard>
  );
}

// Echo - Historical pattern finder card (horizontal)
function EchoCard() {
  return (
    <BentoCard href="/tools/echo" className="h-full flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-terminal-surface to-neutral-900">
      <div className="w-10 h-10 rounded-lg bg-terminal-accent/10 border border-terminal-accent/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-terminal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788" />
        </svg>
      </div>
      <div className="text-left">
        <h3 className="text-sm font-medium tracking-tight text-white group-hover:text-terminal-accent transition-colors">
          Echo
        </h3>
        <p className="text-[10px] text-neutral-500 font-mono">pattern finder</p>
      </div>
      <div className="h-6 w-px bg-neutral-800 mx-2" />
      <div className="font-mono text-xs text-neutral-500">
        <span className="text-terminal-accent">Find your echo</span>
      </div>
    </BentoCard>
  );
}

// The Line - SPX/GOLD Regime Indicator (full-width, tall)
function TheLineCard() {
  return (
    <BentoCard href="/tools/the-line" className="h-full p-5 bg-gradient-to-br from-terminal-surface via-neutral-900 to-terminal-surface overflow-hidden relative">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-terminal-accent/10 border border-terminal-accent/30 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-terminal-accent" />
          </div>
          <div>
            <h3 className="text-xl font-medium tracking-tight text-white group-hover:text-terminal-accent transition-colors">
              The Line
            </h3>
            <p className="text-xs text-neutral-500 font-mono">
              SPX/GOLD regime indicator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-terminal-accent/10 text-terminal-accent rounded">
            ↗ ABOVE LINE
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-terminal-accent/20 text-terminal-accent rounded-full">
            <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
            LIVE
          </span>
        </div>
      </div>

      {/* Full chart */}
      <div className="flex-1 w-full">
        <svg
          viewBox="0 0 800 200"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background grid */}
          <line x1="0" y1="50" x2="800" y2="50" stroke="#262626" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="800" y2="100" stroke="#262626" strokeWidth="0.5" />
          <line x1="0" y1="150" x2="800" y2="150" stroke="#262626" strokeWidth="0.5" />

          {/* Threshold line at 1.50 (y=120 on this scale where 0=top, 200=bottom, threshold at ~60% from top) */}
          <line x1="0" y1="120" x2="800" y2="120" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="790" y="115" fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="end">1.50</text>

          {/* Breach zone 1: 1973-1996 (roughly x=40 to x=500) */}
          <rect x="40" y="120" width="460" height="80" fill="#ef4444" opacity="0.08" />

          {/* Breach zone 2: 2008-2013 (roughly x=680 to x=760) */}
          <rect x="680" y="120" width="80" height="60" fill="#ef4444" opacity="0.08" />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill - SPX/GOLD ratio from 1971-2024 */}
          {/* Y scale: 0 = ratio 6, 200 = ratio 0. Threshold 1.5 = y=150*(1-1.5/6)=150*0.75=112.5~120 */}
          {/* Ratio to Y: y = 200 - (ratio/6)*200 = 200*(1 - ratio/6) */}
          <path
            d="M0,123 L20,132 L40,169 L80,188 L120,183 L160,173 L200,178 L240,183 L280,188 L320,193 L340,192 L380,185 L420,179 L460,171 L500,163 L520,158 L540,150 L560,136 L580,127 L600,108 L620,75 L640,68 L660,71 L680,87 L700,98 L720,108 L740,119 L760,152 L780,168 L800,120 L800,200 L0,200 Z"
            fill="url(#chartGradient)"
          />

          {/* Main line - SPX/GOLD ratio */}
          <path
            d="M0,123 L20,132 L40,169 L80,188 L120,183 L160,173 L200,178 L240,183 L280,188 L320,193 L340,192 L380,185 L420,179 L460,171 L500,163 L520,158 L540,150 L560,136 L580,127 L600,108 L620,75 L640,68 L660,71 L680,87 L700,98 L720,108 L740,119 L760,152 L780,168 L800,120"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Current point */}
          <circle cx="800" cy="120" r="4" fill="#22c55e" />
          <circle cx="800" cy="120" r="7" fill="#22c55e" opacity="0.3" />

          {/* Year labels */}
          <text x="0" y="198" fill="#525252" fontSize="9" fontFamily="monospace">1971</text>
          <text x="200" y="198" fill="#525252" fontSize="9" fontFamily="monospace">1980</text>
          <text x="400" y="198" fill="#525252" fontSize="9" fontFamily="monospace">1990</text>
          <text x="600" y="198" fill="#525252" fontSize="9" fontFamily="monospace">2000</text>
          <text x="760" y="198" fill="#525252" fontSize="9" fontFamily="monospace">2024</text>

          {/* Ratio labels on left */}
          <text x="5" y="55" fill="#525252" fontSize="9" fontFamily="monospace">5.0</text>
          <text x="5" y="105" fill="#525252" fontSize="9" fontFamily="monospace">3.0</text>
          <text x="5" y="155" fill="#525252" fontSize="9" fontFamily="monospace">1.0</text>
        </svg>
      </div>

      {/* Bottom stats row */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-800">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Current</span>
            <span className="text-sm font-mono text-white ml-2">~2.4</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Threshold</span>
            <span className="text-sm font-mono text-red-400 ml-2">1.50</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Breaches</span>
            <span className="text-sm font-mono text-white ml-2">2</span>
            <span className="text-[10px] font-mono text-neutral-600 ml-1">in 50+ yrs</span>
          </div>
        </div>
        <span className="text-xs font-mono text-terminal-accent">View Details →</span>
      </div>
    </BentoCard>
  );
}

// Compact writing card
function WritingCard({ title, href, tag }) {
  return (
    <BentoCard href={href} className="h-full p-4 flex flex-col justify-between">
      <div>
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">{tag}</span>
        <h3 className="text-sm font-medium text-white mt-2 leading-snug group-hover:text-terminal-accent transition-colors">
          {title}
        </h3>
      </div>
      <span className="text-xs font-mono text-terminal-accent mt-3">Read →</span>
    </BentoCard>
  );
}

// Newsletter mini card
function NewsletterMini() {
  return (
    <BentoCard href="https://moneyverse.substack.com/" external className="h-full p-4 flex flex-col justify-between bg-terminal-accent/5">
      <div>
        <span className="text-[10px] font-mono text-terminal-accent uppercase tracking-wider">Newsletter</span>
        <h3 className="text-sm font-medium text-white mt-2 group-hover:text-terminal-accent transition-colors">
          MoneyVerse
        </h3>
      </div>
      <span className="text-xs font-mono text-terminal-accent mt-3">Subscribe →</span>
    </BentoCard>
  );
}

// Social mini card
function SocialMini() {
  return (
    <div className="h-full grid grid-cols-2 gap-2">
      <a
        href="https://github.com/defi-naly"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-terminal-surface border border-neutral-800 rounded-xl p-3 flex flex-col items-center justify-center hover:border-neutral-600 transition-colors group"
      >
        <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
        <span className="text-[10px] font-mono text-neutral-500 mt-1">GitHub</span>
      </a>
      <a
        href="https://x.com/defi_naly"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-terminal-surface border border-neutral-800 rounded-xl p-3 flex flex-col items-center justify-center hover:border-neutral-600 transition-colors group"
      >
        <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="text-[10px] font-mono text-neutral-500 mt-1">X</span>
      </a>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[140px]"
    >
      {/* The Line - Full width featured (6x2) */}
      <motion.div variants={itemVariants} className="col-span-4 lg:col-span-6 row-span-2">
        <TheLineCard />
      </motion.div>

      {/* TruValue - Large hero (3x2) */}
      <motion.div variants={itemVariants} className="col-span-4 lg:col-span-3 row-span-3">
        <TruValueCard />
      </motion.div>

      {/* Fourth Turning - Medium (3x2) */}
      <motion.div variants={itemVariants} className="col-span-4 lg:col-span-3 row-span-2">
        <FourthTurningCard />
      </motion.div>

      {/* Writing: Crisis - Small */}
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
        <WritingCard
          title="How to Thrive in a Crisis"
          href="/writing/how-to-thrive-in-a-crisis"
          tag="Essay"
        />
      </motion.div>

      {/* Writing: ZEC - Small */}
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
        <WritingCard
          title="Invisible Bitcoin: ZEC"
          href="/writing/invisible-bitcoin-zec"
          tag="Thesis"
        />
      </motion.div>

      {/* Newsletter - Small */}
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
        <NewsletterMini />
      </motion.div>

      {/* Time Machine - Tool (horizontal) */}
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2">
        <TimeMachineCard />
      </motion.div>

      {/* Echo - Tool (horizontal) */}
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2">
        <EchoCard />
      </motion.div>

      {/* Social - Small split */}
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2">
        <SocialMini />
      </motion.div>
    </motion.div>
  );
}
