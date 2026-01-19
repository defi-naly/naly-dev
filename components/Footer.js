import { siteConfig } from '@/data/projects';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-4">
            <span>© {siteConfig.year} {siteConfig.author}</span>
            <span className="hidden sm:inline text-neutral-700">|</span>
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-neutral-600">Built with</span>
            <span className="text-neutral-400">Next.js</span>
            <span className="text-neutral-700">+</span>
            <span className="text-neutral-400">React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
