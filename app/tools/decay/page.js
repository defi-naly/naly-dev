import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TimeMachine from '@/components/time-machine/TimeMachine';

export const metadata = {
  title: 'Decay | naly.dev',
  description: 'Visualize purchasing power erosion across your lifetime. Track $100 decay against gold, equities, and real assets.',
  openGraph: {
    title: 'Decay — Purchasing Power Tracker',
    description: 'Visualize how fiat currency erodes against hard assets over time.',
    type: 'website',
  },
};

export default function DecayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-sm text-terminal-accent">~/tools</span>
              <span className="font-mono text-sm text-neutral-600">/</span>
              <span className="font-mono text-sm text-neutral-400">decay</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-4">
              Decay
            </h1>
            <p className="text-neutral-500 max-w-xl font-mono text-sm">
              Enter your birth year. Visualize $100 purchasing power erosion
              against gold, equities, housing, and energy.
            </p>
          </div>

          {/* Time Machine Component */}
          <TimeMachine />
        </div>
      </main>

      <Footer />
    </div>
  );
}
