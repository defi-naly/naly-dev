import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import { tools } from '@/data/projects';

export const metadata = {
  title: 'Tools | naly.dev',
  description: 'Interactive financial tools for understanding economic data and historical patterns.',
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">
              Tools
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
              Interactive calculators and analysis tools for understanding
              economic data, historical patterns, and financial trends.
            </p>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 sm:mb-8 py-3 sm:py-4 border-y border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-neutral-500">TOTAL:</span>
              <span className="font-mono text-sm text-white">{tools.length}</span>
            </div>
            <div className="h-4 w-px bg-neutral-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-neutral-500">LIVE:</span>
              <span className="font-mono text-sm text-terminal-accent">
                {tools.filter(t => t.status === 'live').length}
              </span>
            </div>
            <div className="h-4 w-px bg-neutral-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-neutral-500">BETA:</span>
              <span className="font-mono text-sm text-amber-400">
                {tools.filter(t => t.status === 'beta').length}
              </span>
            </div>
          </div>

          {/* Tools grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>

          {/* Empty state hint */}
          {tools.length === 0 && (
            <div className="text-center py-20 border border-dashed border-neutral-800 rounded">
              <div className="font-mono text-sm text-neutral-500">
                No tools found. Add tools to data/projects.js
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
