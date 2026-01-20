'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, TrendingDown, Radio, Gamepad2 } from 'lucide-react';

const statusColors = {
  live: 'bg-terminal-accent/10 text-terminal-accent border-terminal-accent/20',
  beta: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  development: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

// TruValue Preview
function TruValuePreview() {
  return (
    <div className="relative h-48 overflow-hidden bg-neutral-950 rounded-t-lg">
      <div className="absolute inset-0">
        <iframe
          src="https://truvalue.lovable.app/"
          className="w-[200%] h-[200%] origin-top-left scale-50 border-0 pointer-events-none"
          title="TruValue Preview"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-terminal-surface via-transparent to-transparent" />
    </div>
  );
}

// Saeculum Preview
function SaeculumPreview() {
  return (
    <div className="relative h-48 overflow-hidden bg-neutral-950 rounded-t-lg">
      <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid meet">
        {/* Cycle backgrounds */}
        <rect x="0" y="0" width="50" height="160" fill="#1a1a1a" />
        <rect x="50" y="0" width="50" height="160" fill="#0d0d0d" />
        <rect x="100" y="0" width="50" height="160" fill="#0d0d0d" />
        <rect x="150" y="0" width="50" height="160" fill="#0d0d0d" />
        <rect x="200" y="0" width="50" height="160" fill="#1a1a1a" />
        <rect x="250" y="0" width="50" height="160" fill="#0d0d0d" />
        <rect x="300" y="0" width="50" height="160" fill="#0d0d0d" />
        <rect x="350" y="0" width="50" height="160" fill="#1a1a1a" />

        {/* Crisis labels */}
        <text x="25" y="20" fill="#22c55e" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.7">CRISIS</text>
        <text x="225" y="20" fill="#22c55e" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.7">CRISIS</text>
        <text x="375" y="20" fill="#22c55e" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.7">CRISIS</text>

        {/* Grid lines */}
        <line x1="0" y1="50" x2="400" y2="50" stroke="#262626" strokeWidth="0.5" />
        <line x1="0" y1="80" x2="400" y2="80" stroke="#262626" strokeWidth="0.5" />
        <line x1="0" y1="110" x2="400" y2="110" stroke="#262626" strokeWidth="0.5" />

        {/* Data line */}
        <defs>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path
          d="M10,120 Q50,110 90,80 T170,65 T250,90 T330,45 T390,35"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glow2)"
        />
        <circle cx="390" cy="35" r="4" fill="#22c55e" filter="url(#glow2)" />

        {/* Year labels */}
        <text x="25" y="150" fill="#525252" fontSize="8" fontFamily="monospace" textAnchor="middle">1860</text>
        <text x="200" y="150" fill="#525252" fontSize="8" fontFamily="monospace" textAnchor="middle">1940</text>
        <text x="375" y="150" fill="#525252" fontSize="8" fontFamily="monospace" textAnchor="middle">2024</text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-terminal-surface via-transparent to-transparent" />
    </div>
  );
}

// Decay Preview - purchasing power erosion visualization
function DecayPreview() {
  return (
    <div className="relative h-48 overflow-hidden bg-neutral-950 rounded-t-lg">
      <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid meet">
        {/* Grid */}
        <line x1="40" y1="20" x2="40" y2="140" stroke="#262626" strokeWidth="1" />
        <line x1="40" y1="140" x2="380" y2="140" stroke="#262626" strokeWidth="1" />

        {/* Y-axis labels */}
        <text x="30" y="25" fill="#525252" fontSize="8" fontFamily="monospace" textAnchor="end">$100</text>
        <text x="30" y="80" fill="#525252" fontSize="8" fontFamily="monospace" textAnchor="end">$50</text>
        <text x="30" y="140" fill="#525252" fontSize="8" fontFamily="monospace" textAnchor="end">$0</text>

        {/* Decay curve */}
        <defs>
          <linearGradient id="decayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <filter id="glow3">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path
          d="M50,25 Q100,30 150,50 T250,85 T350,120"
          fill="none"
          stroke="url(#decayGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow3)"
        />

        {/* Dollar signs fading */}
        <text x="60" y="35" fill="#22c55e" fontSize="14" fontFamily="monospace" opacity="1">$</text>
        <text x="150" y="55" fill="#84cc16" fontSize="12" fontFamily="monospace" opacity="0.7">$</text>
        <text x="250" y="90" fill="#eab308" fontSize="10" fontFamily="monospace" opacity="0.5">$</text>
        <text x="340" y="125" fill="#ef4444" fontSize="8" fontFamily="monospace" opacity="0.3">$</text>

        {/* X-axis labels */}
        <text x="50" y="155" fill="#525252" fontSize="8" fontFamily="monospace">1970</text>
        <text x="200" y="155" fill="#525252" fontSize="8" fontFamily="monospace">1995</text>
        <text x="350" y="155" fill="#525252" fontSize="8" fontFamily="monospace">2024</text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-terminal-surface via-transparent to-transparent" />
    </div>
  );
}

// Echo Preview - historical pattern matching visualization
function EchoPreview() {
  return (
    <div className="relative h-48 overflow-hidden bg-neutral-950 rounded-t-lg">
      <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid meet">
        {/* Radar/sonar rings */}
        <circle cx="200" cy="80" r="70" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.1" />
        <circle cx="200" cy="80" r="50" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.2" />
        <circle cx="200" cy="80" r="30" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.3" />

        {/* Center pulse */}
        <circle cx="200" cy="80" r="8" fill="#22c55e" opacity="0.8">
          <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Historical period markers */}
        <g>
          <circle cx="130" cy="60" r="4" fill="#22c55e" opacity="0.6" />
          <text x="130" y="45" fill="#525252" fontSize="7" fontFamily="monospace" textAnchor="middle">1929</text>
        </g>
        <g>
          <circle cx="270" cy="55" r="4" fill="#22c55e" opacity="0.6" />
          <text x="270" y="40" fill="#525252" fontSize="7" fontFamily="monospace" textAnchor="middle">1973</text>
        </g>
        <g>
          <circle cx="160" cy="115" r="4" fill="#22c55e" opacity="0.6" />
          <text x="160" y="135" fill="#525252" fontSize="7" fontFamily="monospace" textAnchor="middle">2008</text>
        </g>
        <g>
          <circle cx="250" cy="110" r="4" fill="#22c55e" opacity="0.6" />
          <text x="250" y="130" fill="#525252" fontSize="7" fontFamily="monospace" textAnchor="middle">1987</text>
        </g>

        {/* Connection lines */}
        <line x1="200" y1="80" x2="130" y2="60" stroke="#22c55e" strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
        <line x1="200" y1="80" x2="270" y2="55" stroke="#22c55e" strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
        <line x1="200" y1="80" x2="160" y2="115" stroke="#22c55e" strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
        <line x1="200" y1="80" x2="250" y2="110" stroke="#22c55e" strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />

        {/* "NOW" label */}
        <text x="200" y="105" fill="#22c55e" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NOW</text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-terminal-surface via-transparent to-transparent" />
    </div>
  );
}

export default function ToolCard({ tool, index }) {
  const isLive = tool.status === 'live';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <Link href={tool.href}>
        <article className="group relative h-full bg-terminal-surface border border-neutral-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-neutral-600">
          {/* Visual Preview */}
          {tool.id === 'truvalue' && <TruValuePreview />}
          {tool.id === 'saeculum' && <SaeculumPreview />}
          {tool.id === 'decay' && <DecayPreview />}
          {tool.id === 'echo' && <EchoPreview />}

          {/* Status badge overlay */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border rounded-full backdrop-blur-sm ${statusColors[tool.status]}`}>
              {isLive && <span className="w-1.5 h-1.5 rounded-full bg-terminal-accent animate-pulse" />}
              {!isLive && <Clock className="w-3 h-3" />}
              {tool.status.toUpperCase()}
            </span>
            {tool.chapterPairing && (
              <Link href="/learn/game" onClick={(e) => e.stopPropagation()}>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full backdrop-blur-sm hover:bg-amber-500/20 transition-colors">
                  <Gamepad2 className="w-3 h-3" />
                  Ch. {tool.chapterPairing.chapter}
                </span>
              </Link>
            )}
          </div>

          {/* Arrow overlay */}
          <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-neutral-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <h3 className="text-lg font-medium text-white mb-2 group-hover:text-terminal-accent transition-colors">
              {tool.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
              {tool.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tool.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono text-neutral-500 bg-neutral-800/50 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <div>
                <div className="text-xs font-mono text-neutral-500">{tool.metrics.label}</div>
                <div className="text-sm font-mono text-terminal-accent">{tool.metrics.value}</div>
              </div>
              <span className="text-xs font-mono text-neutral-500">{tool.category}</span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
