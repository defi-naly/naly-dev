import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Echo from '@/components/echo/Echo';

export const metadata = {
  title: 'Echo | naly.dev',
  description: 'Compare current economic metrics to historical periods and find the closest echo — see what happened next.',
  openGraph: {
    title: 'Echo — Historical Pattern Finder',
    description: 'History doesn\'t repeat, but it rhymes. Find which historical crisis most resembles today.',
    type: 'website',
  },
};

export default function EchoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-6">
              Echo
            </h1>

            {/* About this tool */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
              <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">About this tool</h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                History doesn&apos;t repeat, but it rhymes. Compare today&apos;s economic conditions—debt levels,
                inequality, polarization—to historical crises like the Great Depression, 1970s stagflation,
                or 2008. Find your closest echo and see what happened next.
              </p>
            </div>
          </div>

          {/* Echo Component */}
          <Echo />
        </div>
      </main>

      <Footer />
    </div>
  );
}
