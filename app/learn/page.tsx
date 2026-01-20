'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Play, BookOpen, Check, Circle, ChevronRight } from 'lucide-react';
import { chapters } from '@/data/chapters';

const STORAGE_KEY = 'money-game-progress';

interface SavedProgress {
  chapter: number;
  completed: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

type ChapterStatus = 'complete' | 'current' | 'locked';

function getChapterStatus(chapterNum: number, progress: SavedProgress | null): ChapterStatus {
  if (!progress) {
    return chapterNum === 1 ? 'current' : 'locked';
  }
  if (progress.completed) {
    return 'complete';
  }
  if (chapterNum < progress.chapter) {
    return 'complete';
  }
  if (chapterNum === progress.chapter) {
    return 'current';
  }
  return 'locked';
}

export default function LearnPage() {
  const [progress, setProgress] = useState<SavedProgress | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SavedProgress;
        if (parsed.chapter > 1 || parsed.completed) {
          setProgress(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const getButtonText = () => {
    if (!progress) return 'START';
    if (progress.completed) return 'PLAY AGAIN';
    return `CONTINUE FROM CHAPTER ${progress.chapter}`;
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Hero */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono font-medium tracking-tight text-white">
                Decode the money game
              </h1>
              <p className="text-neutral-400 font-mono text-xs sm:text-sm leading-relaxed max-w-2xl">
                Most people work for money their whole lives without understanding what it is,
                where it comes from, or why it keeps buying less.
              </p>
            </motion.div>

            {/* The Money Game Card */}
            <motion.div variants={itemVariants}>
              <Link href="/learn/game">
                <div className="group relative bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-amber-500/50 transition-all duration-300">
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded">
                      INTERACTIVE
                    </span>
                  </div>

                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-amber-500" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-mono font-medium text-white group-hover:text-amber-500 transition-colors">
                        The Money Game
                      </h2>
                      <p className="text-neutral-400 font-mono text-sm mt-2 leading-relaxed">
                        8 chapters. 20 minutes. From barter to Bitcoin, understand why the
                        rules changed — and who they favor.
                      </p>

                      <div className="flex items-center gap-4 mt-4">
                        <span className="inline-flex items-center gap-2 text-amber-500 font-mono text-sm font-medium group-hover:gap-3 transition-all">
                          {mounted ? getButtonText() : 'START'}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                        <span className="text-neutral-600 font-mono text-xs">
                          ~20 min · 8 chapters
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Chapter List */}
            <motion.div variants={itemVariants}>
              <div className="border-t border-neutral-800 pt-6">
                <h3 className="text-neutral-500 font-mono text-xs uppercase tracking-wider mb-4">
                  Chapter List
                </h3>
                <div className="space-y-1">
                  {chapters.map((chapter) => {
                    const status = mounted ? getChapterStatus(chapter.id, progress) : (chapter.id === 1 ? 'current' : 'locked');

                    return (
                      <div
                        key={chapter.id}
                        className={`flex items-center justify-between py-2 px-3 rounded transition-colors ${
                          status === 'current'
                            ? 'bg-amber-500/10 border border-amber-500/20'
                            : status === 'complete'
                            ? 'bg-neutral-900/50'
                            : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs w-5 ${
                            status === 'complete' ? 'text-emerald-500' :
                            status === 'current' ? 'text-amber-500' :
                            'text-neutral-600'
                          }`}>
                            {chapter.id}.
                          </span>
                          <span className={`font-mono text-sm ${
                            status === 'complete' ? 'text-neutral-400' :
                            status === 'current' ? 'text-white' :
                            'text-neutral-600'
                          }`}>
                            {chapter.title}
                          </span>
                          {status === 'current' && (
                            <span className="text-amber-500/60 font-mono text-xs">
                              {chapter.concept}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center">
                          {status === 'complete' && (
                            <Check className="w-4 h-4 text-emerald-500" />
                          )}
                          {status === 'current' && (
                            <ChevronRight className="w-4 h-4 text-amber-500" />
                          )}
                          {status === 'locked' && (
                            <Circle className="w-3 h-3 text-neutral-700" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Resources Link */}
            <motion.div variants={itemVariants}>
              <Link href="/learn/resources">
                <div className="group border-t border-neutral-800 pt-8">
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center flex-shrink-0 group-hover:border-amber-500/50 transition-colors">
                      <BookOpen className="w-4 h-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-mono font-medium text-white group-hover:text-amber-500 transition-colors">
                        Resources
                      </h3>
                      <p className="text-neutral-500 font-mono text-sm mt-1">
                        Books, videos, and articles to go deeper. Fourth Turning, Ray Dalio, Lyn Alden, and more.
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-amber-500 font-mono text-sm group-hover:gap-3 transition-all">
                        BROWSE RESOURCES
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
