import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TimeMachine from '@/components/time-machine/TimeMachine';

export const metadata = {
  title: 'Purchasing Power Time Machine | naly.dev',
  description: 'See how your dollar has decayed across your lifetime. Enter your birth year and discover what $100 could buy then vs. now.',
  openGraph: {
    title: 'Your Dollar\'s Life Story',
    description: 'See how purchasing power has eroded since the year you were born.',
    type: 'website',
  },
};

export default function TimeMachinePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-sm text-terminal-accent">~/naly/tools</span>
              <span className="font-mono text-sm text-neutral-500">$</span>
              <span className="font-mono text-sm text-neutral-400">./time-machine</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
              Your Dollar's Life Story
            </h1>
            <p className="text-neutral-400 max-w-2xl">
              Enter your birth year. See how $100 has decayed across your lifetime—measured 
              in gas, gold, Big Macs, and the things that actually matter.
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
