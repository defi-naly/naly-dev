'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { chapters } from '@/data/chapters';

const STORAGE_KEY = 'money-game-progress';

interface SavedProgress {
  chapter: number;
  completed: boolean;
}

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

function Timestamp() {
  const now = new Date();
  const formatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return <span className="text-zinc-500 font-mono text-sm">[{formatted}]</span>;
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

  const getGameStatus = () => {
    if (!progress) return { label: 'NOT STARTED', color: 'zinc' };
    if (progress.completed) return { label: 'COMPLETE', color: 'emerald' };
    return { label: `CH ${progress.chapter}/8`, color: 'amber' };
  };

  const gameStatus = getGameStatus();
  const progressPercent = progress
    ? progress.completed
      ? 100
      : Math.round(((progress.chapter - 1) / 8) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Terminal header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
            <p className="font-mono text-sm text-zinc-500">
              <span className="text-emerald-500">~/naly/learn</span> $ ls -la
            </p>
            <Timestamp />
          </div>

          {/* Hero */}
          <div className="border border-zinc-800 mb-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">System</span>
            </div>
            <div className="p-4 md:p-6">
              <h1 className="text-2xl md:text-3xl font-mono text-white mb-2">
                Decode the money game
              </h1>
              <p className="text-zinc-500 font-mono text-sm">
                Most people work for money their whole lives without understanding what it is,
                where it comes from, or why it keeps buying less.
              </p>
            </div>
          </div>

          {/* The Money Game */}
          <div className="border border-zinc-800 border-t-0">
            <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Interactive Course</span>
              <span className="text-[10px] font-mono text-amber-400">FEATURED</span>
            </div>
            <Link href="/learn/game" className="block p-4 hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-mono text-white">The Money Game</div>
                <div className={`text-xs font-mono ${
                  gameStatus.color === 'emerald' ? 'text-emerald-400' :
                  gameStatus.color === 'amber' ? 'text-amber-400' : 'text-zinc-500'
                }`}>
                  {mounted ? gameStatus.label : '—'}
                </div>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 mb-3">
                8 chapters • 20 min • From barter to Bitcoin
              </div>
              {mounted && progressPercent > 0 && (
                <div className="w-full h-1 bg-zinc-800 mb-3">
                  <div
                    className={`h-full ${progress?.completed ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              )}
              <div className="text-xs font-mono text-zinc-600">
                {!progress ? 'START →' : progress.completed ? 'PLAY AGAIN →' : `CONTINUE FROM CH ${progress.chapter} →`}
              </div>
            </Link>
          </div>

          {/* Chapter List */}
          <div className="border border-zinc-800 border-t-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Chapters</span>
            </div>
            <div className="divide-y divide-zinc-800">
              {chapters.map((chapter) => {
                const status = mounted ? getChapterStatus(chapter.id, progress) : (chapter.id === 1 ? 'current' : 'locked');

                return (
                  <div
                    key={chapter.id}
                    className={`flex items-center justify-between p-4 ${
                      status === 'current' ? 'bg-amber-500/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm w-6 ${
                        status === 'complete' ? 'text-emerald-400' :
                        status === 'current' ? 'text-amber-400' :
                        'text-zinc-700'
                      }`}>
                        {chapter.id.toString().padStart(2, '0')}
                      </span>
                      <div>
                        <span className={`font-mono text-sm ${
                          status === 'complete' ? 'text-zinc-400' :
                          status === 'current' ? 'text-white' :
                          'text-zinc-600'
                        }`}>
                          {chapter.title}
                        </span>
                        {status === 'current' && (
                          <span className="text-[10px] font-mono text-zinc-600 ml-3">
                            {chapter.concept}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`text-[10px] font-mono ${
                      status === 'complete' ? 'text-emerald-400' :
                      status === 'current' ? 'text-amber-400' :
                      'text-zinc-700'
                    }`}>
                      {status === 'complete' ? 'DONE' :
                       status === 'current' ? 'CURRENT' : '—'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resources */}
          <div className="border border-zinc-800 border-t-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Resources</span>
            </div>
            <Link href="/learn/resources" className="block p-4 hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-mono text-white mb-1">Deep Dive Materials</div>
                  <div className="text-[10px] font-mono text-zinc-600">
                    Books, videos, articles • Fourth Turning, Ray Dalio, Lyn Alden
                  </div>
                </div>
                <div className="text-xs font-mono text-zinc-600">BROWSE →</div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
