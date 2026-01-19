'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Github, Mail, Layers } from 'lucide-react';
import { socialLinks } from '@/data/projects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function BentoCard({ children, className = '', href, external = false }) {
  const baseClasses = `
    relative group overflow-hidden
    bg-terminal-surface border border-neutral-800
    transition-all duration-300
    hover:border-neutral-700 hover:bg-neutral-900/50
  `;

  const content = (
    <div className={`${baseClasses} ${className}`}>
      {children}
      {href && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4 text-neutral-500" />
        </div>
      )}
    </div>
  );

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
    ) : (
      <Link href={href}>{content}</Link>
    );
  }
  return content;
}

// TruValue - Large card with iframe preview
function TruValueCard() {
  return (
    <BentoCard href="/projects/real-terms" className="col-span-2 row-span-2 p-0 flex flex-col rounded-lg">
      {/* Site Preview */}
      <div className="flex-1 relative overflow-hidden bg-neutral-950 rounded-t-lg">
        <div className="absolute inset-0 pointer-events-none">
          <iframe
            src="https://truvalue.lovable.app/"
            className="w-[200%] h-[200%] origin-top-left scale-50 border-0"
            title="TruValue Preview"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-terminal-surface via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 border-t border-neutral-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono bg-terminal-accent/10 text-terminal-accent border border-terminal-accent/20 rounded">
            <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
            LIVE
          </span>
          <span className="text-xs font-mono text-neutral-500">Dashboard</span>
        </div>
        <h3 className="text-lg font-medium text-white mb-1 group-hover:text-terminal-accent transition-colors">
          TruValue
        </h3>
        <p className="text-sm text-neutral-400">
          See assets in their true value. Inflation-adjusted data.
        </p>
      </div>
    </BentoCard>
  );
}

// Fourth Turning - Medium card
function FourthTurningCard() {
  return (
    <BentoCard href="/projects/fourth-turning" className="p-0 flex flex-col rounded-lg">
      {/* Mini visualization */}
      <div className="h-28 relative overflow-hidden bg-neutral-950 rounded-t-lg">
        <svg className="w-full h-full" viewBox="0 0 200 70" preserveAspectRatio="none">
          <rect x="0" y="0" width="25" height="70" fill="#1a1a1a" />
          <rect x="25" y="0" width="25" height="70" fill="#0d0d0d" />
          <rect x="50" y="0" width="25" height="70" fill="#0d0d0d" />
          <rect x="75" y="0" width="25" height="70" fill="#0d0d0d" />
          <rect x="100" y="0" width="25" height="70" fill="#1a1a1a" />
          <rect x="125" y="0" width="25" height="70" fill="#0d0d0d" />
          <rect x="150" y="0" width="25" height="70" fill="#0d0d0d" />
          <rect x="175" y="0" width="25" height="70" fill="#1a1a1a" />
          <text x="12" y="12" fill="#22c55e" fontSize="6" fontFamily="monospace" textAnchor="middle">CRISIS</text>
          <text x="112" y="12" fill="#22c55e" fontSize="6" fontFamily="monospace" textAnchor="middle">CRISIS</text>
          <text x="187" y="12" fill="#22c55e" fontSize="6" fontFamily="monospace" textAnchor="middle">CRISIS</text>
          <path d="M5,55 Q25,50 45,40 T85,30 T125,35 T165,20 T195,15" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="195" cy="15" r="3" fill="#22c55e" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-terminal-surface via-transparent to-transparent" />
      </div>

      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono bg-terminal-accent/10 text-terminal-accent border border-terminal-accent/20 rounded">
            <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
            LIVE
          </span>
        </div>
        <h3 className="text-base font-medium text-white mb-1 group-hover:text-terminal-accent transition-colors">
          The Fourth Turning
        </h3>
        <p className="text-xs text-neutral-400">Economic cycles visualization</p>
      </div>
    </BentoCard>
  );
}

// Writing Card - Crisis Article
function CrisisArticleCard() {
  return (
    <BentoCard href="/writing/how-to-thrive-in-a-crisis" className="p-5 flex flex-col rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded">Essay</span>
        <span className="text-xs font-mono text-neutral-600">Jan 2025</span>
      </div>

      <h3 className="text-base font-medium text-white mb-2 group-hover:text-terminal-accent transition-colors leading-tight">
        How to Thrive in a Crisis
      </h3>
      <p className="text-xs text-neutral-500 line-clamp-2 mb-auto">
        My investment strategy for the next 5 years. Sovereignty and scarcity.
      </p>

      <div className="mt-4 pt-3 border-t border-neutral-800">
        <span className="text-xs font-mono text-terminal-accent">Read essay →</span>
      </div>
    </BentoCard>
  );
}

// Writing Card - ZEC Article
function ZecArticleCard() {
  return (
    <BentoCard href="/writing/invisible-bitcoin-zec" className="col-span-2 p-5 flex flex-col rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded">Thesis</span>
        <span className="text-xs font-mono text-neutral-600">Oct 2025</span>
      </div>

      <h3 className="text-lg font-medium text-white mb-2 group-hover:text-terminal-accent transition-colors">
        Invisible Bitcoin: A ZEC Investment Thesis
      </h3>
      <p className="text-sm text-neutral-400 line-clamp-2">
        Why Crypto's Most Overlooked Asset Might Be Its Most Important. Privacy as infrastructure.
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800/50 text-neutral-500 rounded">Crypto</span>
          <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800/50 text-neutral-500 rounded">Privacy</span>
        </div>
        <span className="text-xs font-mono text-terminal-accent">Read thesis →</span>
      </div>
    </BentoCard>
  );
}

// Newsletter Card
function NewsletterCard() {
  return (
    <BentoCard href={socialLinks.newsletter.href} external className="p-5 flex flex-col rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-4 h-4 text-neutral-500" />
        <span className="text-xs font-mono text-neutral-500">NEWSLETTER</span>
      </div>

      <h3 className="text-base font-medium text-white mb-2 group-hover:text-terminal-accent transition-colors">
        MoneyVerse
      </h3>
      <p className="text-xs text-neutral-400 mb-auto">
        {socialLinks.newsletter.description}
      </p>

      <div className="mt-4 pt-3 border-t border-neutral-800">
        <span className="text-xs font-mono text-terminal-accent">Subscribe →</span>
      </div>
    </BentoCard>
  );
}

// Social Card
function SocialCard() {
  return (
    <BentoCard className="p-5 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-4 h-4 text-neutral-500" />
        <span className="text-xs font-mono text-neutral-500">CONNECT</span>
      </div>

      <div className="space-y-2">
        <a
          href={socialLinks.github.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2 rounded border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50 transition-all group/link"
        >
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-300">GitHub</span>
          </div>
          <span className="text-xs font-mono text-neutral-500 group-hover/link:text-terminal-accent transition-colors">
            {socialLinks.github.username}
          </span>
        </a>

        <a
          href={socialLinks.twitter.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2 rounded border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50 transition-all group/link"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-sm text-neutral-300">X</span>
          </div>
          <span className="text-xs font-mono text-neutral-500 group-hover/link:text-terminal-accent transition-colors">
            {socialLinks.twitter.username}
          </span>
        </a>
      </div>
    </BentoCard>
  );
}

export default function BentoGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
    >
      {/* Row 1: TruValue (2x2) + Fourth Turning + Crisis Article */}
      <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-2">
        <TruValueCard />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FourthTurningCard />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CrisisArticleCard />
      </motion.div>

      {/* Row 2: Newsletter + Social */}
      <motion.div variants={itemVariants}>
        <NewsletterCard />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SocialCard />
      </motion.div>

      {/* Row 3: ZEC Article (spans 2) */}
      <motion.div variants={itemVariants} className="lg:col-span-2">
        <ZecArticleCard />
      </motion.div>
    </motion.div>
  );
}
