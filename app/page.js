import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import WritingPreview from '@/components/WritingPreview';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />

          {/* Section label */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
              Featured Work
            </span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          <BentoGrid />

          {/* Writing section */}
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                Latest Writing
              </span>
              <div className="flex-1 h-px bg-neutral-800" />
            </div>

            <WritingPreview />
          </div>
        </div>
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
