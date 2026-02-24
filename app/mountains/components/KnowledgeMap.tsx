'use client';

import { domains } from '../data/domains';
import type { KnowledgeState } from '../lib/knowledge';
import { getModuleStrength } from '../lib/mastery';
import { isCardDue } from '../lib/srs';

interface KnowledgeMapProps {
  knowledge: KnowledgeState;
}

function getStrengthColor(
  phase: string,
  strength: number,
  hasOverdue: boolean,
): string {
  if (phase === 'locked') return 'var(--mt-border)';
  if (hasOverdue) return 'var(--mt-danger)';
  if (phase === 'relearning') return 'var(--mt-danger)';
  if (strength >= 70) return '#22C55E';
  if (phase === 'reviewing') return '#F59E0B';
  if (phase === 'learning') return 'var(--mt-muted)';
  return 'var(--mt-muted)';
}

export default function KnowledgeMap({ knowledge }: KnowledgeMapProps) {
  return (
    <div className="mt-knowledge-map">
      <div className="mt-knowledge-map-label">Knowledge Map</div>
      <div className="mt-knowledge-map-grid">
        {domains.map(domain => (
          <div key={domain.id} className="mt-knowledge-map-domain">
            <div
              className="mt-knowledge-map-domain-label"
              style={{ color: domain.accent }}
            >
              {domain.name}
            </div>
            <div className="mt-knowledge-map-modules">
              {domain.modules.map((mod) => {
                const key = `${domain.id}-${mod.slug}`;
                const mastery = knowledge.modules[key];
                const strength = mastery ? getModuleStrength(mastery, knowledge.cards) : 0;
                const moduleCards = knowledge.cards.filter(c =>
                  c.domain === domain.id && c.moduleSlug === mod.slug
                );
                const hasOverdue = moduleCards.some(c => isCardDue(c));
                const color = getStrengthColor(
                  mastery?.phase || 'locked',
                  strength,
                  hasOverdue && mastery?.phase !== 'locked',
                );

                return (
                  <div
                    key={mod.slug}
                    className="mt-knowledge-map-cell"
                    style={{
                      background: color,
                      opacity: mastery?.phase === 'locked' ? 0.3 : 0.6 + (strength / 100) * 0.4,
                    }}
                    title={`${mod.title} — ${mastery?.phase || 'locked'} (${strength}%)`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-knowledge-map-legend">
        <span><span className="mt-legend-dot" style={{ background: 'var(--mt-border)', opacity: 0.3 }} /> Not started</span>
        <span><span className="mt-legend-dot" style={{ background: 'var(--mt-muted)' }} /> Learning</span>
        <span><span className="mt-legend-dot" style={{ background: '#F59E0B' }} /> Reviewing</span>
        <span><span className="mt-legend-dot" style={{ background: '#22C55E' }} /> Mastered</span>
        <span><span className="mt-legend-dot" style={{ background: 'var(--mt-danger)' }} /> Overdue</span>
      </div>
    </div>
  );
}
