'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Scenario } from '../data/scenarios';

interface ScenarioDebriefProps {
  scenario: Scenario;
  score: number;
  narrative: string;
  lessons: string[];
  breadcrumbs: { label: string; nodeId: string }[];
}

export default function ScenarioDebrief({ scenario, score, narrative, lessons, breadcrumbs }: ScenarioDebriefProps) {
  const scoreColor = score >= 70 ? '#22C55E' : score >= 40 ? '#F59E0B' : 'var(--mt-danger)';
  const scoreLabel = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Needs Work' : 'Critical Errors';

  return (
    <motion.div
      className="mt-debrief"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Outcome narrative */}
      <div className="mt-scenario-narrative" style={{ marginBottom: '2rem' }}>
        {narrative}
      </div>

      {/* Score */}
      <div className="mt-debrief-score">
        <div className="mt-debrief-score-value" style={{ color: scoreColor }}>
          {score}%
        </div>
        <div className="mt-debrief-score-label" style={{ color: scoreColor }}>
          {scoreLabel}
        </div>
      </div>

      {/* Decision trail */}
      {breadcrumbs.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.1em',
            color: 'var(--mt-muted)',
            marginBottom: '0.75rem',
          }}>
            Your decisions
          </div>
          <div className="mt-scenario-breadcrumb">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="mt-scenario-breadcrumb-step">
                {i + 1}. {b.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lessons */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
          color: 'var(--mt-muted)',
          marginBottom: '0.75rem',
        }}>
          Lessons
        </div>
        <div className="mt-debrief-lessons">
          {lessons.map((lesson, i) => (
            <div key={i} className="mt-debrief-lesson">{lesson}</div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link
          href="/mountains/scenarios"
          className="mt-continue-btn"
          style={{ borderColor: 'var(--mt-muted)', color: 'var(--mt-bright)' }}
        >
          Back to Scenarios
        </Link>
        <Link
          href="/mountains/review"
          className="mt-continue-btn"
          style={{ borderColor: '#22C55E', color: '#22C55E' }}
        >
          Review Weak Areas
        </Link>
      </div>
    </motion.div>
  );
}
