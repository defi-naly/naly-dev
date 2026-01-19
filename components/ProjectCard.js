'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, Clock, TrendingUp } from 'lucide-react';

const statusColors = {
  live: 'bg-terminal-accent/10 text-terminal-accent border-terminal-accent/20',
  beta: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  development: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  archived: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
};

const statusIcons = {
  live: TrendingUp,
  beta: Clock,
  development: BarChart3,
  archived: BarChart3,
};

export default function ProjectCard({ project, index }) {
  const StatusIcon = statusIcons[project.status] || BarChart3;

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
        <article className="group relative h-full bg-terminal-surface border border-neutral-800 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/50">
          {/* Status badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono border rounded ${statusColors[project.status]}`}>
              <StatusIcon className="w-3 h-3" />
              {project.status.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-neutral-500">{project.category}</span>
          </div>

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
              <div className="text-sm font-mono text-white">{project.metrics.value}</div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-terminal-accent transition-colors" />
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
