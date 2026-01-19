import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export const metadata = {
  title: 'Projects | naly.dev',
  description: 'Interactive financial dashboards and economic analysis tools.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-sm text-terminal-accent">~/naly/projects</span>
              <span className="font-mono text-sm text-neutral-500">$</span>
              <span className="font-mono text-sm text-neutral-400">ls -la</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
              Projects
            </h1>
            <p className="text-neutral-400 max-w-xl">
              Interactive tools and dashboards for understanding economic data. 
              Each project is designed to reveal insights hidden in the numbers.
            </p>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-6 mb-8 py-4 border-y border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-500">TOTAL:</span>
              <span className="font-mono text-sm text-white">{projects.length}</span>
            </div>
            <div className="h-4 w-px bg-neutral-800" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-500">LIVE:</span>
              <span className="font-mono text-sm text-terminal-accent">
                {projects.filter(p => p.status === 'live').length}
              </span>
            </div>
            <div className="h-4 w-px bg-neutral-800" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-500">BETA:</span>
              <span className="font-mono text-sm text-amber-400">
                {projects.filter(p => p.status === 'beta').length}
              </span>
            </div>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Empty state hint */}
          {projects.length === 0 && (
            <div className="text-center py-20 border border-dashed border-neutral-800 rounded">
              <div className="font-mono text-sm text-neutral-500">
                No projects found. Add projects to data/projects.js
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
