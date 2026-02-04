'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import SlideContainer from '@/components/pitch/SlideContainer';
import ProgressIndicator from '@/components/pitch/ProgressIndicator';
import { slides, TOTAL_SLIDES } from '@/data/slg-slides';
import { SLGLogo } from '@/components/pitch/slg/SwissCrossIcon';

// Import all slide components
import TitleSlide from '@/components/pitch/slg/TitleSlide';
import ProblemSlide from '@/components/pitch/slg/ProblemSlide';
import ValuePropSlide from '@/components/pitch/slg/ValuePropSlide';
import DataEvidenceSlide from '@/components/pitch/slg/DataEvidenceSlide';
import ArchitectureSlide from '@/components/pitch/slg/ArchitectureSlide';
import UnitEconomicsSlide from '@/components/pitch/slg/UnitEconomicsSlide';
import HedgingUseCaseSlide from '@/components/pitch/slg/HedgingUseCaseSlide';
import AntifragilitySlide from '@/components/pitch/slg/AntifragilitySlide';
import RevenueEvolutionSlide from '@/components/pitch/slg/RevenueEvolutionSlide';
import RoadmapSlide from '@/components/pitch/slg/RoadmapSlide';
import SummarySlide from '@/components/pitch/slg/SummarySlide';

const slideComponents: Record<string, React.ComponentType> = {
  'title': TitleSlide,
  'problem': ProblemSlide,
  'value-prop': ValuePropSlide,
  'data-evidence': DataEvidenceSlide,
  'architecture': ArchitectureSlide,
  'hedging-use-case': HedgingUseCaseSlide,
  'antifragility': AntifragilitySlide,
  'unit-economics': UnitEconomicsSlide,
  'revenue-evolution': RevenueEvolutionSlide,
  'roadmap': RoadmapSlide,
  'summary': SummarySlide,
};

function SLGPitchDeckContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse slide from URL or default to 1
  const slideParam = searchParams.get('slide');
  const initialSlide = slideParam ? Math.min(Math.max(1, parseInt(slideParam) || 1), TOTAL_SLIDES) : 1;

  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  // Sync URL with current slide
  const navigateToSlide = useCallback((slideNum: number) => {
    const validSlide = Math.min(Math.max(1, slideNum), TOTAL_SLIDES);
    setCurrentSlide(validSlide);
    router.push(`/pitch/slg?slide=${validSlide}`, { scroll: false });
  }, [router]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          if (currentSlide < TOTAL_SLIDES) {
            navigateToSlide(currentSlide + 1);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentSlide > 1) {
            navigateToSlide(currentSlide - 1);
          }
          break;
        case 'Escape':
          e.preventDefault();
          router.push('/');
          break;
        case 'Home':
          e.preventDefault();
          navigateToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          navigateToSlide(TOTAL_SLIDES);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, navigateToSlide, router]);

  // Sync state with URL on initial load
  useEffect(() => {
    if (slideParam) {
      const parsed = parseInt(slideParam);
      if (!isNaN(parsed) && parsed !== currentSlide) {
        setCurrentSlide(Math.min(Math.max(1, parsed), TOTAL_SLIDES));
      }
    }
  }, [slideParam, currentSlide]);

  const slide = slides[currentSlide - 1];
  const SlideComponent = slideComponents[slide.component];

  // Title slide has custom layout (no header)
  const isTitleSlide = slide.component === 'title';

  return (
    <main className="min-h-screen bg-white pb-24 print:pb-0">
      <div className="max-w-5xl mx-auto px-6 py-8 print:py-0 print:max-w-none">
        {/* Print: Render all slides */}
        <div className="hidden print:block">
          {slides.map((s, index) => {
            const Component = slideComponents[s.component];
            return (
              <div key={s.id} className="print:break-after-page print:min-h-screen print:p-8 relative">
                {s.component !== 'title' && (
                  <div className="mb-6">
                    <p className="text-[#E53935] font-sans text-sm uppercase tracking-wider mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="text-3xl font-sans font-bold text-[#1A1A1A]">
                      {s.title}
                    </h2>
                    {s.subtitle && (
                      <p className="text-gray-500 font-sans text-base mt-2">
                        {s.subtitle}
                      </p>
                    )}
                  </div>
                )}
                <Component />
                <div className="absolute bottom-4 right-8">
                  <SLGLogo />
                </div>
              </div>
            );
          })}
        </div>

        {/* Screen: Render current slide with animation */}
        <div className="print:hidden">
          <AnimatePresence mode="wait">
            <SlideContainer
              key={currentSlide}
              slideNumber={currentSlide}
              totalSlides={TOTAL_SLIDES}
              title={slide.title}
              subtitle={slide.subtitle}
              showHeader={!isTitleSlide}
              theme="light"
            >
              <SlideComponent />
            </SlideContainer>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <ProgressIndicator
        currentSlide={currentSlide}
        totalSlides={TOTAL_SLIDES}
        onNavigate={navigateToSlide}
        theme="light"
      />
    </main>
  );
}

// Loading fallback for Suspense
function SLGPitchDeckLoading() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-400 font-sans text-sm">Loading...</div>
    </main>
  );
}

export default function SLGPitchDeck() {
  return (
    <Suspense fallback={<SLGPitchDeckLoading />}>
      <SLGPitchDeckContent />
    </Suspense>
  );
}
