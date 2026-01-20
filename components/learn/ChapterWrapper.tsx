'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { Chapter } from '@/data/chapters';

interface ChapterWrapperProps {
  chapter: Chapter;
  currentChapter: number;
  totalChapters: number;
  isComplete: boolean;
  showTakeaway: boolean;
  onComplete: () => void;
  onBack?: () => void;
  children: React.ReactNode;
}

export default function ChapterWrapper({
  chapter,
  currentChapter,
  totalChapters,
  isComplete,
  showTakeaway,
  onComplete,
  onBack,
  children,
}: ChapterWrapperProps) {
  const progress = (currentChapter / totalChapters) * 100;
  const isLastChapter = currentChapter === totalChapters;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-800">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-neutral-500 hover:text-white font-mono text-sm flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}
        <span className="text-neutral-500 font-mono text-xs">
          Chapter {currentChapter}/{totalChapters}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-neutral-800 rounded-full overflow-hidden mt-4">
        <motion.div
          className="h-full bg-amber-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Chapter Info */}
      <div className="mt-8">
        <span className="text-amber-500 font-mono text-xs uppercase tracking-wider">
          Chapter {chapter.id}
        </span>
        <h2 className="text-2xl font-mono font-medium text-white mt-2">
          {chapter.title}
        </h2>
        <p className="text-neutral-400 font-mono text-sm mt-4 max-w-xl leading-relaxed">
          {chapter.intro}
        </p>
      </div>

      {/* Chapter Content */}
      <div className="mt-8 min-h-[300px]">
        {children}
      </div>

      {/* Takeaway */}
      <AnimatePresence>
        {showTakeaway && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="mt-8 p-5 bg-neutral-900 border border-neutral-800 rounded-lg"
          >
            <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              Takeaway
            </div>
            <p className="text-neutral-300 font-mono text-sm mt-3 leading-relaxed">
              {chapter.takeaway}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      <div className="mt-8 pb-8 flex justify-center">
        <motion.button
          onClick={onComplete}
          disabled={!isComplete}
          className={`font-mono text-sm font-medium px-8 py-3 rounded transition-colors ${
            isComplete
              ? 'bg-amber-500 text-zinc-900 hover:bg-amber-400'
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
          }`}
          whileHover={isComplete ? { scale: 1.02 } : {}}
          whileTap={isComplete ? { scale: 0.98 } : {}}
        >
          {isLastChapter ? 'FINISH' : 'CONTINUE'}
        </motion.button>
      </div>
    </motion.div>
  );
}
