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
    <BentoCard href="/tools/truvalue" className="h-full flex flex-col p-4 sm:p-6 bg-gradient-to-br from-terminal-surface to-neutral-900">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-terminal-accent/10 border border-terminal-accent/30 flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-light text-terminal-accent">$</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white group-hover:text-terminal-accent transition-colors">
              TruValue
            </h3>
            <p className="text-[10px] sm:text-xs text-neutral-500 font-mono">
              inflation-adjusted
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-terminal-accent/20 text-terminal-accent rounded-full">
          <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Key insight */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-wider mb-2 sm:mb-3">Since 1971</p>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-mono font-light text-white">$100</span>
            <p className="text-[10px] font-mono text-neutral-600 mt-1">nominal</p>
          </div>
          <span className="text-neutral-600 text-base sm:text-lg">→</span>
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-mono font-light text-red-400">$17</span>
            <p className="text-[10px] font-mono text-neutral-600 mt-1">real value</p>
          </div>
        </div>
        <p className="text-neutral-500 font-mono text-[10px] sm:text-xs mt-3 sm:mt-4">
          M2 supply: <span className="text-amber-400">31x</span> since Nixon
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 sm:pt-4 border-t border-neutral-800">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-neutral-600 hidden sm:inline">See what things really cost</span>
          <span className="text-[10px] font-mono text-neutral-600 sm:hidden">Real purchasing power</span>
          <span className="text-[10px] sm:text-xs font-mono text-terminal-accent">Explore →</span>
        </div>
      </div>
    </BentoCard>
  );
}

// Fourth Turning - Branded splash card
function FourthTurningCard() {
  return (
    <BentoCard href="/tools/saeculum" className="h-full flex flex-col p-4 sm:p-5 bg-gradient-to-br from-terminal-surface to-neutral-900">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-terminal-accent/10 border border-terminal-accent/30 flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-terminal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-medium tracking-tight text-white group-hover:text-terminal-accent transition-colors">
              Saeculum
            </h3>
            <p className="text-[10px] text-neutral-500 font-mono">
              fourth turning
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 text-[10px] font-mono bg-amber-500/20 text-amber-400 rounded-full">
          <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
          CRISIS
        </span>
      </div>

      {/* Key metrics */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Season indicator */}
          <div className="text-center flex-1">
            <p className="text-neutral-600 font-mono text-[10px] uppercase mb-1 sm:mb-2">Season</p>
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-700" title="Spring" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-700" title="Summer" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-700" title="Fall" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/30" title="Winter" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-amber-400">WINTER</span>
          </div>

          <div className="h-10 sm:h-12 w-px bg-neutral-800" />

          {/* Years in crisis */}
          <div className="text-center flex-1">
            <p className="text-neutral-600 font-mono text-[10px] uppercase mb-1 sm:mb-2">Year</p>
            <span className="text-xl sm:text-2xl font-mono font-light text-white">17</span>
            <p className="text-[10px] font-mono text-neutral-600">of ~22</p>
          </div>

          <div className="h-10 sm:h-12 w-px bg-neutral-800" />

          {/* Polarization */}
          <div className="text-center flex-1">
            <p className="text-neutral-600 font-mono text-[10px] uppercase mb-1 sm:mb-2">Polar.</p>
            <span className="text-xl sm:text-2xl font-mono font-light text-red-400">0.96</span>
            <p className="text-[10px] font-mono text-neutral-600 hidden sm:block">Civil War: 0.94</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 sm:pt-3 border-t border-neutral-800 flex items-center justify-between">
        <span className="text-[10px] font-mono text-neutral-600">2008–2030 Crisis</span>
        <span className="text-[10px] sm:text-xs font-mono text-terminal-accent">Explore →</span>
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

// The Fork - Debt crisis options card
function TheForkCard() {
  return (
    <BentoCard href="/tools/the-fork" className="h-full flex flex-col p-4 sm:p-5 bg-gradient-to-br from-terminal-surface to-neutral-900">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-medium tracking-tight text-white group-hover:text-terminal-accent transition-colors">
              The Fork
            </h3>
            <p className="text-[10px] text-neutral-500 font-mono">
              debt crisis paths
            </p>
          </div>
        </div>
      </div>

      {/* Two paths visualization */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Print path */}
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
              <span className="text-emerald-400 font-mono text-lg sm:text-xl font-light">$</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-emerald-400">PRINT</span>
            <p className="text-[10px] font-mono text-neutral-600 mt-0.5">inflate</p>
          </div>

          {/* Fork divider */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-px bg-neutral-700" />
            <span className="text-neutral-600 text-xs">or</span>
            <div className="w-6 h-px bg-neutral-700" />
          </div>

          {/* Restructure path */}
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-2">
              <span className="text-amber-400 font-mono text-lg sm:text-xl font-light">↺</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-amber-400">RESET</span>
            <p className="text-[10px] font-mono text-neutral-600 mt-0.5">restructure</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 sm:pt-3 border-t border-neutral-800 flex items-center justify-between">
        <span className="text-[10px] font-mono text-neutral-600">Same choice. Every crisis.</span>
        <span className="text-[10px] sm:text-xs font-mono text-terminal-accent">Explore →</span>
      </div>
    </BentoCard>
  );
}

// The Line - SPX/GOLD Regime Indicator
function TheLineCard() {
  return (
    <BentoCard href="/tools/the-line" className="h-full p-4 sm:p-6 bg-gradient-to-br from-terminal-surface to-neutral-900 flex flex-col justify-between">
      {/* Top section */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-terminal-accent/10 border border-terminal-accent/30 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-terminal-accent" />
          </div>
          <div>
            <h3 className="text-lg sm:text-2xl font-medium tracking-tight text-white group-hover:text-terminal-accent transition-colors">
              The Line
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-mono">
              SPX/GOLD regime
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] font-mono bg-terminal-accent/20 text-terminal-accent rounded-full">
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-terminal-accent animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Middle - Key insight */}
      <div className="flex-1 flex items-center justify-center py-3 sm:py-4">
        <div className="flex items-center justify-center gap-4 sm:gap-8 w-full">
          {/* Current ratio gauge */}
          <div className="text-center flex-1">
            <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-wider mb-1 sm:mb-2">Ratio</p>
            <div className="relative inline-block">
              <span className="text-2xl sm:text-4xl font-mono font-light text-white">1.64</span>
              <span className="absolute -top-1 -right-4 sm:-right-6 text-amber-400 text-sm sm:text-lg">→</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-10 sm:h-16 w-px bg-neutral-800" />

          {/* Threshold indicator */}
          <div className="text-center flex-1">
            <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-wider mb-1 sm:mb-2">Danger</p>
            <span className="text-2xl sm:text-4xl font-mono font-light text-red-400">{'<'}1.5</span>
          </div>

          {/* Divider */}
          <div className="h-10 sm:h-16 w-px bg-neutral-800" />

          {/* Status */}
          <div className="text-center flex-1">
            <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-wider mb-1 sm:mb-2">Status</p>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400" />
              <span className="font-mono text-xs sm:text-sm text-amber-400">Near</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-neutral-800">
        <p className="text-neutral-500 font-mono text-[10px] sm:text-xs">
          <span className="hidden sm:inline">Only </span><span className="text-white">2 breaches</span> in 50+ yrs
        </p>
        <span className="text-[10px] sm:text-xs font-mono text-terminal-accent">Explore →</span>
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
      {/* Row 1-2: The Line - Full width featured */}
      <motion.div variants={itemVariants} className="col-span-4 lg:col-span-6 row-span-2">
        <TheLineCard />
      </motion.div>

      {/* Row 3-4: TruValue + Fourth Turning */}
      <motion.div variants={itemVariants} className="col-span-4 lg:col-span-3 row-span-2">
        <TruValueCard />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-4 lg:col-span-3 row-span-2">
        <FourthTurningCard />
      </motion.div>

      {/* Row 5-6: The Fork + smaller tools */}
      <motion.div variants={itemVariants} className="col-span-4 lg:col-span-2 row-span-2">
        <TheForkCard />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2">
        <TimeMachineCard />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2">
        <EchoCard />
      </motion.div>

      {/* Row 6: Writing + Newsletter + Social */}
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
        <WritingCard
          title="How to Thrive in a Crisis"
          href="/writing/how-to-thrive-in-a-crisis"
          tag="Essay"
        />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
        <WritingCard
          title="Invisible Bitcoin: ZEC"
          href="/writing/invisible-bitcoin-zec"
          tag="Thesis"
        />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2">
        <NewsletterMini />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2">
        <SocialMini />
      </motion.div>
    </motion.div>
  );
}
