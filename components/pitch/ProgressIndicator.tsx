'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProgressIndicatorProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (slide: number) => void;
  theme?: 'light' | 'dark';
}

export default function ProgressIndicator({
  currentSlide,
  totalSlides,
  onNavigate,
  theme = 'light',
}: ProgressIndicatorProps) {
  const canGoPrev = currentSlide > 1;
  const canGoNext = currentSlide < totalSlides;

  // Light theme (Switch-inspired)
  if (theme === 'light') {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Prev Button */}
          <button
            onClick={() => canGoPrev && onNavigate(currentSlide - 1)}
            disabled={!canGoPrev}
            className={`flex items-center gap-1 font-sans text-sm transition-colors ${
              canGoPrev
                ? 'text-gray-600 hover:text-[#1A1A1A]'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          {/* Navigation Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => onNavigate(num)}
                className="p-1"
                aria-label={`Go to slide ${num}`}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    num === currentSlide
                      ? 'bg-[#E53935]'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  animate={{
                    scale: num === currentSlide ? 1.25 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => canGoNext && onNavigate(currentSlide + 1)}
            disabled={!canGoNext}
            className={`flex items-center gap-1 font-sans text-sm transition-colors ${
              canGoNext
                ? 'text-gray-600 hover:text-[#1A1A1A]'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Keyboard hint */}
        <div className="text-center pb-2">
          <span className="text-gray-400 font-sans text-xs">
            Use arrow keys or spacebar to navigate
          </span>
        </div>
      </div>
    );
  }

  // Dark theme (original terminal style)
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur border-t border-neutral-800 print:hidden">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Prev Button */}
        <button
          onClick={() => canGoPrev && onNavigate(currentSlide - 1)}
          disabled={!canGoPrev}
          className={`flex items-center gap-1 font-mono text-xs transition-colors ${
            canGoPrev
              ? 'text-neutral-400 hover:text-white'
              : 'text-neutral-700 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        {/* Navigation Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => onNavigate(num)}
              className="p-1"
              aria-label={`Go to slide ${num}`}
            >
              <motion.div
                className={`w-2 h-2 rounded-full transition-colors ${
                  num === currentSlide
                    ? 'bg-amber-500'
                    : 'bg-neutral-700 hover:bg-neutral-600'
                }`}
                animate={{
                  scale: num === currentSlide ? 1.25 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => canGoNext && onNavigate(currentSlide + 1)}
          disabled={!canGoNext}
          className={`flex items-center gap-1 font-mono text-xs transition-colors ${
            canGoNext
              ? 'text-neutral-400 hover:text-white'
              : 'text-neutral-700 cursor-not-allowed'
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="text-center pb-2">
        <span className="text-neutral-600 font-mono text-[10px]">
          Use arrow keys or spacebar to navigate
        </span>
      </div>
    </div>
  );
}
