import type { Domain } from '../data/domains';

function isInternal(url: string): boolean {
  return url.startsWith('/');
}

export function ChapterBar({ domain }: { domain: Domain }) {
  return (
    <div className="chapter-bar-content">
      <div className="chapter-bar-info">
        <span className="chapter-bar-number" style={{ color: domain.color }}>
          {domain.number}
        </span>
        <span className="chapter-bar-title">{domain.title}</span>
        <span className="chapter-bar-dot">&middot;</span>
        <span className="chapter-bar-tagline">{domain.tagline}</span>
      </div>
      {domain.projects.length > 0 && (
        <div className="chapter-bar-projects">
          {domain.projects.map((project) => {
            if (project.url) {
              return (
                <a
                  key={project.name}
                  href={project.url}
                  className="chapter-bar-project"
                  {...(isInternal(project.url) ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span className="chapter-bar-project-name">{project.name}</span>
                  <span className="chapter-bar-project-tag">{project.tag}</span>
                </a>
              );
            }
            return (
              <span key={project.name} className="chapter-bar-project chapter-bar-project--coming-soon">
                <span className="chapter-bar-project-name">{project.name}</span>
                <span className="chapter-bar-project-tag">Coming Soon</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
