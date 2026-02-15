'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

interface Milestone {
  year: string;
  event: string;
  highlight?: boolean;
}

interface PortfolioItem {
  name: string;
  status: 'live' | 'legacy' | 'dev';
  statusLabel: string;
  description: string;
  stats?: { value: string; label: string }[];
  tags: string[];
  milestones?: Milestone[];
  techBadges?: string[];
  link?: string;
}

interface PortfolioTimelineProps {
  items: PortfolioItem[];
}

function StatusBadge({ status, label }: { status: string; label: string }) {
  const symbols: Record<string, string> = {
    live: '●',
    legacy: '◆',
    dev: '◐',
  };
  return (
    <span className={`portfolio-status status-${status}`}>
      {symbols[status] || '●'} {label}
    </span>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [expanded, setExpanded] = useState(false);
  const hasProof = item.milestones && item.milestones.length > 0;

  return (
    <StaggerItem>
      <div className={`portfolio-item ${item.status === 'live' ? 'status-live' : ''} ${item.status === 'dev' ? 'status-dev' : ''}`}>
        <div
          className={`portfolio-card ${expanded ? 'expanded' : ''}`}
          onClick={hasProof ? () => setExpanded(!expanded) : undefined}
          style={hasProof ? { cursor: 'pointer' } : undefined}
        >
          <div className="portfolio-header">
            <h3 className="portfolio-name">{item.name}</h3>
            <StatusBadge status={item.status} label={item.statusLabel} />
          </div>
          <p className="portfolio-desc">{item.description}</p>

          {item.stats && (
            <div className="portfolio-stats">
              {item.stats.map((stat) => (
                <span key={stat.label}>
                  <span className="portfolio-stat-value">{stat.value}</span>
                  <span className="portfolio-stat-label">{stat.label}</span>
                </span>
              ))}
            </div>
          )}

          <div className="portfolio-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="portfolio-tag">{tag}</span>
            ))}
          </div>

          {hasProof && (
            <div className="proof-panel">
              <div className="proof-timeline">
                {item.milestones!.map((m, i) => (
                  <div key={i} className="proof-milestone">
                    <span className="proof-year">{m.year}</span>
                    <span className="proof-dot" style={m.highlight ? { color: 'var(--success)' } : undefined}>●</span>
                    <span className="proof-event" style={m.highlight ? { color: 'var(--success)' } : undefined}>{m.event}</span>
                  </div>
                ))}
              </div>
              {item.techBadges && (
                <div className="proof-tech">
                  {item.techBadges.map((badge) => (
                    <span key={badge} className="tech-badge">{badge}</span>
                  ))}
                </div>
              )}
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="proof-link">
                  {item.link.replace('https://', '')}
                </a>
              )}
            </div>
          )}

          {hasProof && !expanded && (
            <div className="expand-hint">Click to expand</div>
          )}
        </div>
      </div>
    </StaggerItem>
  );
}

export default function PortfolioTimeline({ items }: PortfolioTimelineProps) {
  return (
    <StaggerContainer className="portfolio-grid">
      {items.map((item) => (
        <PortfolioCard key={item.name} item={item} />
      ))}
    </StaggerContainer>
  );
}
