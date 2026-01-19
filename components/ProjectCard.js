'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Clock, BarChart3 } from 'lucide-react';

const statusColors = {
  live: 'bg-terminal-accent/10 text-terminal-accent border-terminal-accent/20',
  beta: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  development: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  archived: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
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

// Fourth Turning Preview
function FourthTurningPreview() {
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

export default function ProjectCard({ project, index }) {
  const isLive = project.status === 'live';

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
      <Link href={project.href}>
        <article className="group relative h-full bg-terminal-surface border border-neutral-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-neutral-600">
          {/* Visual Preview */}
          {project.id === 'real-terms' && <TruValuePreview />}
          {project.id === 'fourth-turning' && <FourthTurningPreview />}

          {/* Live badge overlay */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border rounded-full backdrop-blur-sm ${statusColors[project.status]}`}>
              {isLive && <span className="w-1.5 h-1.5 rounded-full bg-terminal-accent animate-pulse" />}
              {!isLive && <Clock className="w-3 h-3" />}
              {project.status.toUpperCase()}
            </span>
          </div>

          {/* Arrow overlay */}
          <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-neutral-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <h3 className="text-lg font-medium text-white mb-2 group-hover:text-terminal-accent transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
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
                <div className="text-xs font-mono text-neutral-500">{project.metrics.label}</div>
                <div className="text-sm font-mono text-terminal-accent">{project.metrics.value}</div>
              </div>
              <span className="text-xs font-mono text-neutral-500">{project.category}</span>
            </div>
          </div>

          {/* Featured indicator */}
          {project.featured && (
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-terminal-accent border-l-[24px] border-l-transparent" />
          )}
        </article>
      </Link>
    </motion.div>
  );
}
