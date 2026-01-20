'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Construction, Wrench, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Chapter } from '@/data/chapters';

interface PlaceholderChapterProps {
  chapter: Chapter;
  onComplete: () => void;
  existingTool?: boolean;
}

export default function PlaceholderChapter({
  chapter,
  onComplete,
  existingTool = false,
}: PlaceholderChapterProps) {
  const [interacted, setInteracted] = useState(false);

  // Auto-complete after interaction
  useEffect(() => {
    if (interacted) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [interacted, onComplete]);

  const getToolLink = () => {
    switch (chapter.tool) {
      case 'truvalue':
        return '/tools/truvalue';
      case 'decay':
        return '/tools/decay';
      case 'scoreboard':
        return '/tools/truvalue';
      default:
        return null;
    }
  };

  const toolLink = getToolLink();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center mx-auto mb-4">
          {existingTool ? (
            <Wrench className="w-5 h-5 text-amber-500" />
          ) : (
            <Construction className="w-5 h-5 text-neutral-500" />
          )}
        </div>

        {/* Status */}
        <span className={`font-mono text-xs uppercase tracking-wider ${
          existingTool ? 'text-amber-500' : 'text-neutral-500'
        }`}>
          {existingTool ? 'Tool Available' : 'Coming Soon'}
        </span>

        {/* Title */}
        <h3 className="text-lg font-mono font-medium text-white mt-3">
          {chapter.title}
        </h3>

        {/* Description */}
        <p className="text-neutral-400 font-mono text-sm mt-2">
          {existingTool
            ? `This chapter uses the ${chapter.tool === 'truvalue' || chapter.tool === 'scoreboard' ? 'TruValue' : 'Decay'} tool.`
            : `The interactive ${chapter.concept.toLowerCase()} visualization is being built.`}
        </p>

        {/* Action */}
        {existingTool && toolLink ? (
          <div className="mt-6 space-y-3">
            <Link
              href={toolLink}
              target="_blank"
              className="inline-flex items-center gap-2 text-amber-500 font-mono text-sm hover:text-amber-400 transition-colors"
            >
              Open Tool
              <ExternalLink className="w-4 h-4" />
            </Link>
            <div>
              <button
                onClick={() => setInteracted(true)}
                disabled={interacted}
                className={`font-mono text-xs px-4 py-2 rounded transition-colors ${
                  interacted
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-600'
                }`}
              >
                {interacted ? 'Explored' : 'Mark as Explored'}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setInteracted(true)}
            disabled={interacted}
            className={`mt-6 font-mono text-sm px-6 py-2 rounded transition-colors ${
              interacted
                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                : 'bg-amber-500 text-zinc-900 hover:bg-amber-400'
            }`}
          >
            {interacted ? 'Got it' : 'I understand'}
          </button>
        )}
      </div>

      {/* Concept Tag */}
      <div className="mt-6 flex items-center gap-2">
        <span className="text-neutral-600 font-mono text-xs">Concept:</span>
        <span className="text-neutral-400 font-mono text-xs px-2 py-1 bg-neutral-900 rounded">
          {chapter.concept}
        </span>
      </div>
    </motion.div>
  );
}
