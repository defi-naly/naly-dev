'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TitleScreen from '@/components/learn/TitleScreen';
import ChapterWrapper from '@/components/learn/ChapterWrapper';
import EndScreen from '@/components/learn/EndScreen';
import PlaceholderChapter from '@/components/learn/chapters/PlaceholderChapter';
import BarterGame from '@/components/learn/chapters/BarterGame';
import GoldComparison from '@/components/learn/chapters/GoldComparison';
import StockToFlowViz from '@/components/learn/chapters/StockToFlowViz';
import FractionalReserve from '@/components/learn/chapters/FractionalReserve';
import { chapters, TOTAL_CHAPTERS, getChapter } from '@/data/chapters';

type GameState = 'title' | 'playing' | 'end';

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>('title');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterComplete, setChapterComplete] = useState(false);
  const [showTakeaway, setShowTakeaway] = useState(false);

  const chapter = getChapter(currentChapter);

  const handleStart = useCallback(() => {
    setGameState('playing');
    setCurrentChapter(1);
    setChapterComplete(false);
    setShowTakeaway(false);
  }, []);

  const handleChapterComplete = useCallback(() => {
    setChapterComplete(true);
    setShowTakeaway(true);
  }, []);

  const handleContinue = useCallback(() => {
    if (currentChapter >= TOTAL_CHAPTERS) {
      setGameState('end');
    } else {
      setCurrentChapter(prev => prev + 1);
      setChapterComplete(false);
      setShowTakeaway(false);
    }
  }, [currentChapter]);

  const handleBack = useCallback(() => {
    if (currentChapter > 1) {
      setCurrentChapter(prev => prev - 1);
      setChapterComplete(true);
      setShowTakeaway(true);
    } else {
      setGameState('title');
    }
  }, [currentChapter]);

  const handleRestart = useCallback(() => {
    setGameState('title');
    setCurrentChapter(1);
    setChapterComplete(false);
    setShowTakeaway(false);
  }, []);

  const renderChapterContent = () => {
    if (!chapter) return null;

    switch (chapter.tool) {
      case 'barter':
        return <BarterGame onComplete={handleChapterComplete} />;
      case 'gold-comparison':
        return <GoldComparison onComplete={handleChapterComplete} />;
      case 'stock-to-flow':
        return <StockToFlowViz onComplete={handleChapterComplete} />;
      case 'fractional-reserve':
        return <FractionalReserve onComplete={handleChapterComplete} />;
      case 'truvalue':
      case 'decay':
      case 'scoreboard':
        return (
          <PlaceholderChapter
            chapter={chapter}
            onComplete={handleChapterComplete}
            existingTool
          />
        );
      default:
        return (
          <PlaceholderChapter
            chapter={chapter}
            onComplete={handleChapterComplete}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <AnimatePresence mode="wait">
          {gameState === 'title' && (
            <TitleScreen key="title" onStart={handleStart} />
          )}

          {gameState === 'playing' && chapter && (
            <ChapterWrapper
              key={`chapter-${currentChapter}`}
              chapter={chapter}
              currentChapter={currentChapter}
              totalChapters={TOTAL_CHAPTERS}
              isComplete={chapterComplete}
              showTakeaway={showTakeaway}
              onComplete={handleContinue}
              onBack={handleBack}
            >
              {renderChapterContent()}
            </ChapterWrapper>
          )}

          {gameState === 'end' && (
            <EndScreen key="end" onRestart={handleRestart} />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
