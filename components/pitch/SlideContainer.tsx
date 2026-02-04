'use client';

import { motion } from 'framer-motion';
import { SLGLogo } from './slg/SwissCrossIcon';

interface SlideContainerProps {
  slideNumber: number;
  totalSlides: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showHeader?: boolean;
  theme?: 'light' | 'dark';
}

export default function SlideContainer({
  slideNumber,
  totalSlides,
  title,
  subtitle,
  children,
  showHeader = true,
  theme = 'light',
}: SlideContainerProps) {
  const progress = (slideNumber / totalSlides) * 100;

  // Light theme (Switch-inspired)
  if (theme === 'light') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[calc(100vh-120px)] flex flex-col print:min-h-0 print:break-after-page relative"
      >
        {showHeader && (
          <>
            {/* Progress Bar */}
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden print:hidden">
              <motion.div
                className="h-full bg-[#E53935]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            {/* Slide Title */}
            <div className="mt-12 print:mt-4">
              <p className="text-[#E53935] font-sans text-sm uppercase tracking-wider mb-2">
                {String(slideNumber).padStart(2, '0')}
              </p>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#1A1A1A]">
                {title}
              </h2>
              {subtitle && (
                <p className="text-gray-500 font-sans text-base mt-3 max-w-2xl">
                  {subtitle}
                </p>
              )}
            </div>
          </>
        )}

        {/* Content */}
        <div className="flex-1 mt-8 print:mt-4">
          {children}
        </div>

        {/* Logo watermark bottom right */}
        <div className="absolute bottom-4 right-0 print:hidden">
          <SLGLogo />
        </div>
      </motion.div>
    );
  }

  // Dark theme (original terminal style) - kept for backwards compatibility
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-120px)] flex flex-col print:min-h-0 print:break-after-page"
    >
      {showHeader && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between py-4 border-b border-neutral-800 print:border-neutral-300">
            <span className="text-amber-500 font-mono text-xs uppercase tracking-wider">
              Swiss Liquidity Gateway
            </span>
            <span className="text-neutral-500 font-mono text-xs">
              {slideNumber}/{totalSlides}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden mt-4 print:hidden">
            <motion.div
              className="h-full bg-amber-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Slide Title */}
          <div className="mt-8 print:mt-4">
            <h2 className="text-2xl sm:text-3xl font-mono font-medium text-white print:text-black">
              {title}
            </h2>
            {subtitle && (
              <p className="text-neutral-400 font-mono text-sm mt-2 print:text-neutral-600">
                {subtitle}
              </p>
            )}
          </div>
        </>
      )}

      {/* Content */}
      <div className="flex-1 mt-8 print:mt-4">
        {children}
      </div>
    </motion.div>
  );
}
