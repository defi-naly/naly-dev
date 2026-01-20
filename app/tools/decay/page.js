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
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-6">
              Decay
            </h1>

            {/* About this tool */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
              <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">About this tool</h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Enter your birth year and watch $100 decay in real-time. See how purchasing power erodes
                against gold, equities, housing, and energy over your lifetime. The dollar in your pocket
                isn&apos;t the same dollar from 20 years ago.
              </p>
            </div>
          </div>

          {/* Time Machine Component */}
          <TimeMachine />
        </div>
      </main>

      <Footer />
    </div>
  );
}
