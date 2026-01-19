'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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

// TruValue - Hero card (minimal)
function TruValueCard() {
  return (
    <BentoCard href="/projects/real-terms" className="h-full p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-terminal-accent/10 border border-terminal-accent/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-terminal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-terminal-accent/20 text-terminal-accent rounded-full">
            <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
            LIVE
          </span>
        </div>

        <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-terminal-accent transition-colors">
          TruValue
        </h3>
        <p className="text-neutral-400">
          See assets in their true value. Strip away inflation noise.
        </p>
      </div>

      <div className="pt-6 border-t border-neutral-800 mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-mono text-neutral-500">truvalue.lovable.app</span>
          <span className="font-mono text-terminal-accent">View →</span>
        </div>
      </div>
    </BentoCard>
  );
}

// Fourth Turning - Minimal card
function FourthTurningCard() {
  return (
    <BentoCard href="/projects/fourth-turning" className="h-full p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-terminal-accent/10 border border-terminal-accent/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-terminal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-terminal-accent/20 text-terminal-accent rounded-full">
            <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
            LIVE
          </span>
        </div>

        <h3 className="text-xl font-medium text-white mb-2 group-hover:text-terminal-accent transition-colors">
          The Fourth Turning
        </h3>
        <p className="text-sm text-neutral-400">
          Economic cycles &amp; historical patterns
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-neutral-800 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terminal-accent/50" />
          <span className="font-mono text-xs text-neutral-500">Spring</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terminal-accent/50" />
          <span className="font-mono text-xs text-neutral-500">Summer</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terminal-accent/50" />
          <span className="font-mono text-xs text-neutral-500">Fall</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terminal-accent" />
          <span className="font-mono text-xs text-terminal-accent">Winter</span>
        </div>
      </div>
    </BentoCard>
  );
}

// Time Machine - Tool card (minimal)
function TimeMachineCard() {
  return (
    <BentoCard href="/tools/time-machine" className="h-full p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-medium text-white group-hover:text-terminal-accent transition-colors">
            Time Machine
          </h3>
          <span className="px-1.5 py-0.5 text-[9px] font-mono bg-amber-500/20 text-amber-400 rounded">
            TOOL
          </span>
        </div>
        <p className="text-xs text-neutral-500">Your dollar's life story</p>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="font-mono text-xs text-neutral-500">$100 →</div>
        <div className="font-mono text-sm text-amber-400">~$17</div>
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
      <motion.div variants={itemVariants} className="col-span-4 lg:col-span-2">
        <TimeMachineCard />
      </motion.div>

      {/* Social - Small split */}
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
        <SocialMini />
      </motion.div>
    </motion.div>
  );
}
