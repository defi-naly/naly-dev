'use client';

import { motion } from 'framer-motion';
import { domains } from '../data/domains';
import type { KnowledgeState } from '../lib/knowledge';
import { getReadinessScore, getDomainStrength } from '../lib/knowledge';

interface ReadinessScoreProps {
  knowledge: KnowledgeState;
}

export default function ReadinessScore({ knowledge }: ReadinessScoreProps) {
  const score = getReadinessScore(knowledge);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const scoreColor = score >= 70 ? '#22C55E' : score >= 40 ? '#F59E0B' : 'var(--mt-danger)';

  return (
    <div className="mt-readiness">
      <div className="mt-readiness-gauge">
        <svg viewBox="0 0 100 100" className="mt-readiness-ring">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="var(--mt-border)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={scoreColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="mt-readiness-value">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ color: scoreColor }}
          >
            {score}
          </motion.span>
          <span className="mt-readiness-percent">%</span>
        </div>
      </div>

      <div className="mt-readiness-label">Readiness</div>

      <div className="mt-readiness-domains">
        {domains.map(domain => {
          const strength = getDomainStrength(knowledge, domain.id);
          return (
            <div key={domain.id} className="mt-readiness-domain">
              <div className="mt-readiness-domain-label" style={{ color: domain.accent }}>
                {domain.name}
              </div>
              <div className="mt-readiness-domain-bar">
                <motion.div
                  className="mt-readiness-domain-fill"
                  style={{ background: domain.accent }}
                  initial={{ width: 0 }}
                  animate={{ width: `${strength}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
              <div className="mt-readiness-domain-value">{strength}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
