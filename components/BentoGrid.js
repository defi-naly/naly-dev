'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowUpRight,
  Github,
  Mail,
  TrendingUp,
  Layers
} from 'lucide-react';
import { projects, socialLinks } from '@/data/projects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
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
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <Link href={href}>{content}</Link>
    );
  }

  return content;
}

function TruValuePreview() {
  return (
    <div className="flex-1 relative mb-4 rounded border border-neutral-800 bg-terminal-bg overflow-hidden min-h-[180px]">
      {/* Mini chart visualization */}
      <div className="absolute inset-0 p-4">
        {/* Header stats */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[10px] font-mono text-neutral-500 mb-1">S&P 500 / GOLD</div>
            <div className="text-lg font-mono text-white">2.847</div>
          </div>
          <div className="flex items-center gap-1 text-terminal-accent">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-mono">+12.4%</span>
          </div>
        </div>

        {/* Chart area */}
        <svg className="w-full h-24" viewBox="0 0 200 60" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="15" x2="200" y2="15" stroke="#262626" strokeWidth="0.5" />
          <line x1="0" y1="30" x2="200" y2="30" stroke="#262626" strokeWidth="0.5" />
          <line x1="0" y1="45" x2="200" y2="45" stroke="#262626" strokeWidth="0.5" />

          {/* Gradient fill */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d="M0,45 Q20,42 40,38 T80,32 T120,28 T160,22 T200,15 L200,60 L0,60 Z"
            fill="url(#chartGradient)"
          />

          {/* Line */}
          <path
            d="M0,45 Q20,42 40,38 T80,32 T120,28 T160,22 T200,15"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* End dot */}
          <circle cx="200" cy="15" r="3" fill="#22c55e" />
        </svg>

        {/* Bottom labels */}
        <div className="flex justify-between mt-2">
          <span className="text-[9px] font-mono text-neutral-600">2020</span>
          <span className="text-[9px] font-mono text-neutral-600">2022</span>
          <span className="text-[9px] font-mono text-neutral-600">2024</span>
        </div>
      </div>
    </div>
  );
}

function FeaturedProject() {
  const project = projects.find(p => p.featured);
  if (!project) return null;

  return (
    <BentoCard
      href={project.href}
      className="col-span-2 row-span-2 p-6 flex flex-col"
    >
      {/* Status badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono bg-terminal-accent/10 text-terminal-accent border border-terminal-accent/20 rounded">
          <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
          {project.status.toUpperCase()}
        </span>
        <span className="text-xs font-mono text-neutral-500">{project.category}</span>
      </div>

      {/* TruValue Preview */}
      <TruValuePreview />

      {/* Title and description */}
      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-terminal-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Metrics */}
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs font-mono text-neutral-500">
              {tag}
            </span>
          ))}
        </div>
        <div className="text-right">
          <div className="text-xs font-mono text-neutral-500">{project.metrics.label}</div>
          <div className="text-sm font-mono text-terminal-accent">{project.metrics.value}</div>
        </div>
      </div>
    </BentoCard>
  );
}

function FourthTurningPreview() {
  return (
    <div className="mb-3 rounded border border-neutral-800 bg-terminal-bg overflow-hidden h-20">
      <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
        {/* Cycle bands */}
        <rect x="0" y="0" width="25" height="50" fill="#1a1a1a" />
        <rect x="25" y="0" width="25" height="50" fill="#0a0a0a" />
        <rect x="50" y="0" width="25" height="50" fill="#0a0a0a" />
        <rect x="75" y="0" width="25" height="50" fill="#0a0a0a" />
        <rect x="100" y="0" width="25" height="50" fill="#1a1a1a" />
        <rect x="125" y="0" width="25" height="50" fill="#0a0a0a" />
        <rect x="150" y="0" width="25" height="50" fill="#0a0a0a" />
        <rect x="175" y="0" width="25" height="50" fill="#1a1a1a" />

        {/* Cycle labels */}
        <text x="12" y="8" fill="#22c55e" fontSize="4" fontFamily="monospace" textAnchor="middle">WINTER</text>
        <text x="112" y="8" fill="#22c55e" fontSize="4" fontFamily="monospace" textAnchor="middle">WINTER</text>
        <text x="187" y="8" fill="#22c55e" fontSize="4" fontFamily="monospace" textAnchor="middle">WINTER</text>

        {/* Data line */}
        <path
          d="M5,40 L20,35 L35,25 L50,20 L65,22 L80,18 L95,30 L110,25 L125,15 L140,18 L155,12 L170,20 L185,10 L195,8"
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Year markers */}
        <text x="10" y="48" fill="#525252" fontSize="5" fontFamily="monospace">1860</text>
        <text x="95" y="48" fill="#525252" fontSize="5" fontFamily="monospace">1940</text>
        <text x="180" y="48" fill="#525252" fontSize="5" fontFamily="monospace">2024</text>
      </svg>
    </div>
  );
}

function SecondaryProject() {
  const project = projects.find(p => !p.featured);
  if (!project) return null;

  return (
    <BentoCard href={project.href} className="p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono bg-terminal-accent/10 text-terminal-accent border border-terminal-accent/20 rounded">
          <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
          {project.status.toUpperCase()}
        </span>
        <span className="text-xs font-mono text-neutral-500">{project.category}</span>
      </div>

      {/* Fourth Turning Preview */}
      <FourthTurningPreview />

      <h3 className="text-base font-medium text-white mb-2 group-hover:text-terminal-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
        {project.description}
      </p>

      <div className="mt-auto">
        <div className="text-xs font-mono text-neutral-500">{project.metrics.label}</div>
        <div className="text-sm font-mono text-terminal-accent">{project.metrics.value}</div>
      </div>
    </BentoCard>
  );
}

function NewsletterCard() {
  return (
    <BentoCard 
      href={socialLinks.newsletter.href} 
      external 
      className="p-5 flex flex-col"
    >
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-4 h-4 text-neutral-500" />
        <span className="text-xs font-mono text-neutral-500">NEWSLETTER</span>
      </div>
      
      <h3 className="text-base font-medium text-white mb-2 group-hover:text-terminal-accent transition-colors">
        {socialLinks.newsletter.label}
      </h3>
      <p className="text-sm text-neutral-400">
        {socialLinks.newsletter.description}
      </p>
      
      <div className="mt-auto pt-3">
        <span className="text-xs font-mono text-terminal-accent">Subscribe →</span>
      </div>
    </BentoCard>
  );
}

function SocialCard() {
  return (
    <BentoCard className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-4 h-4 text-neutral-500" />
        <span className="text-xs font-mono text-neutral-500">CONNECT</span>
      </div>
      
      <div className="space-y-3">
        <a 
          href={socialLinks.github.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2 rounded border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50 transition-all group/link"
        >
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-300">{socialLinks.github.label}</span>
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
            <span className="text-sm text-neutral-300">{socialLinks.twitter.label}</span>
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-2">
        <FeaturedProject />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <SecondaryProject />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <NewsletterCard />
      </motion.div>
      
      <motion.div variants={itemVariants} className="lg:col-span-2">
        <SocialCard />
      </motion.div>
    </motion.div>
  );
}
