'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { writing } from '@/data/projects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function WritingPreview() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {writing.map((article) => (
        <motion.div key={article.id} variants={itemVariants}>
          <Link
            href={article.href}
            className="group block p-5 bg-terminal-surface border border-neutral-800 rounded-lg hover:border-neutral-700 hover:bg-neutral-900/50 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-neutral-500">
                    {formatDate(article.date)}
                  </span>
                  <div className="flex gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-base font-medium text-white mb-1 group-hover:text-terminal-accent transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-neutral-400 line-clamp-1">
                  {article.description}
                </p>
              </div>

              <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-terminal-accent transition-colors flex-shrink-0 mt-1" />
            </div>
          </Link>
        </motion.div>
      ))}

      <motion.div variants={itemVariants} className="pt-2">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-terminal-accent transition-colors"
        >
          View all writing
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
