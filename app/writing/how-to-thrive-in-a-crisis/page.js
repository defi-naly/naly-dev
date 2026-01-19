import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'How to Thrive in a Crisis | naly.dev',
  description: 'My investment strategy for the next 5 years.',
};

export default function ArticlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Writing</span>
          </Link>

          {/* Article header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-neutral-500">Jan 19, 2025</span>
              <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded">Strategy</span>
              <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded">Investing</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
              How to Thrive in a Crisis
            </h1>
            <p className="text-xl text-neutral-400">
              My investment strategy for the next 5 years.
            </p>
          </header>

          {/* Article content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-xl font-medium text-white mt-12 mb-4">Core Framework</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              I argue that societies move in cyclical phases roughly 80-100 years long, driven by generational turnover. Two key concepts shape my analysis:
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              <strong className="text-white">The Fourth Turning</strong> proposes four repeating phases: high, awakening, unraveling, and crisis. We're currently in "Winter" (crisis phase), which began with the 2008 financial crisis.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              <strong className="text-white">The Changing World Order</strong> (Dalio's framework) suggests empires rise through productivity, then increasingly rely on debt and currency debasement—a pattern now visible in major economies.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">Current Position</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              We're at an inflection point where "the old world is dying, but the new world hasn't been born yet." This creates what I call "digital dissonance"—technological advancement in some areas masks stagnation elsewhere. Physical constraints (particularly energy) are colliding with digital acceleration.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">Investment Strategy: Five Asset Classes</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              I propose a "barbell allocation" focused on <strong className="text-terminal-accent">Sovereignty</strong> and <strong className="text-terminal-accent">Scarcity</strong>:
            </p>

            <h3 className="text-lg font-medium text-white mt-8 mb-4">Sovereignty Theme (The Hedge)</h3>
            <ul className="list-none space-y-3 mb-6">
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">
                <strong className="text-white">Gold</strong> anchors purchasing power during regime changes
              </li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">
                <strong className="text-white">Bitcoin</strong> offers counterparty-free optionality
              </li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">
                <strong className="text-white">Privacy assets</strong> preserve financial autonomy
              </li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-8 mb-4">Scarcity Theme (Growth)</h3>
            <ul className="list-none space-y-3 mb-6">
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">
                <strong className="text-white">Uranium and energy stocks</strong> address physical bottlenecks AI requires
              </li>
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">
                <strong className="text-white">Ethereum and DeFi</strong> position for potential dollar-based stablecoin expansion
              </li>
            </ul>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">Core Thesis</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Rather than betting on continuity, I explicitly seek "aggressive risks on discontinuity"—assets priced for a fundamentally different future, maximizing upside if systemic assumptions shift.
            </p>

            <div className="mt-12 p-6 bg-terminal-surface border border-neutral-800 rounded-lg">
              <p className="text-neutral-400 text-sm font-mono">
                Originally published on{' '}
                <a
                  href="https://moneyverse.substack.com/p/how-to-thrive-in-a-crisis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-accent hover:underline"
                >
                  MoneyVerse Substack
                </a>
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
