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
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-sm text-terminal-accent">~/tools</span>
              <span className="font-mono text-sm text-neutral-600">/</span>
              <span className="font-mono text-sm text-neutral-400">echo</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-4">
              Echo
            </h1>
            <p className="text-neutral-500 max-w-xl font-mono text-sm">
              History doesn&apos;t repeat, but it rhymes. Compare today&apos;s economic
              conditions to historical crises and see what happened next.
            </p>
          </div>

          {/* Echo Component */}
          <Echo />
        </div>
      </main>

      <Footer />
    </div>
  );
}
