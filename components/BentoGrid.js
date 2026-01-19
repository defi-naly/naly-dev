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

// TruValue - Hero card with live preview
function TruValueCard() {
  return (
    <BentoCard href="/projects/real-terms" className="h-full flex flex-col">
      <div className="flex-1 relative min-h-[280px] overflow-hidden">
        <div className="absolute inset-0">
          <iframe
            src="https://truvalue.lovable.app/"
            className="w-[200%] h-[200%] origin-top-left scale-50 border-0 pointer-events-none"
            title="TruValue Preview"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-terminal-surface via-terminal-surface/20 to-transparent" />

        {/* Live badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-terminal-accent/20 text-terminal-accent border border-terminal-accent/30 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-accent animate-pulse" />
            LIVE
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-white group-hover:text-terminal-accent transition-colors">
          TruValue
        </h3>
        <p className="text-sm text-neutral-400 mt-1">See assets in their true value</p>
      </div>
    </BentoCard>
  );
}

// Fourth Turning - Large visualization card
function FourthTurningCard() {
  return (
    <BentoCard href="/projects/fourth-turning" className="h-full flex flex-col">
      <div className="flex-1 relative min-h-[180px] overflow-hidden bg-neutral-950">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          {/* Cycle backgrounds */}
          <rect x="0" y="0" width="50" height="200" fill="#1a1a1a" />
          <rect x="50" y="0" width="50" height="200" fill="#0d0d0d" />
          <rect x="100" y="0" width="50" height="200" fill="#0d0d0d" />
          <rect x="150" y="0" width="50" height="200" fill="#0d0d0d" />
          <rect x="200" y="0" width="50" height="200" fill="#1a1a1a" />
          <rect x="250" y="0" width="50" height="200" fill="#0d0d0d" />
          <rect x="300" y="0" width="50" height="200" fill="#0d0d0d" />
          <rect x="350" y="0" width="50" height="200" fill="#1a1a1a" />

          {/* Crisis labels */}
          <text x="25" y="24" fill="#22c55e" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">CRISIS</text>
          <text x="225" y="24" fill="#22c55e" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">CRISIS</text>
          <text x="375" y="24" fill="#22c55e" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">CRISIS</text>

          {/* Grid lines */}
          <line x1="0" y1="60" x2="400" y2="60" stroke="#262626" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="400" y2="100" stroke="#262626" strokeWidth="0.5" />
          <line x1="0" y1="140" x2="400" y2="140" stroke="#262626" strokeWidth="0.5" />

          {/* Data line with glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path
            d="M10,150 Q50,140 90,100 T170,80 T250,110 T330,50 T390,40"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <circle cx="390" cy="40" r="4" fill="#22c55e" filter="url(#glow)" />

          {/* Year labels */}
          <text x="25" y="190" fill="#525252" fontSize="9" fontFamily="monospace" textAnchor="middle">1860</text>
          <text x="200" y="190" fill="#525252" fontSize="9" fontFamily="monospace" textAnchor="middle">1940</text>
          <text x="375" y="190" fill="#525252" fontSize="9" fontFamily="monospace" textAnchor="middle">2024</text>
        </svg>

        <div className="absolute inset-0 bg-gradient-to-t from-terminal-surface via-transparent to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-terminal-accent/20 text-terminal-accent border border-terminal-accent/30 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-accent animate-pulse" />
            LIVE
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-white group-hover:text-terminal-accent transition-colors">
          The Fourth Turning
        </h3>
        <p className="text-sm text-neutral-400 mt-1">Economic cycles &amp; historical patterns</p>
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

      {/* Social - Small split */}
      <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
        <SocialMini />
      </motion.div>
    </motion.div>
  );
}
