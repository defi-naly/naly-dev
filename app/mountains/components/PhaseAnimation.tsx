'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Phase {
  title: string;
  content: React.ReactNode;
}

interface PhaseAnimationProps {
  phases: Phase[];
  currentPhase: number;
}

export default function PhaseAnimation({ phases, currentPhase }: PhaseAnimationProps) {
  return (
    <div className="mt-phase">
      {phases.map((phase, i) => (
        <div
          key={i}
          className={`mt-phase-step ${i === currentPhase ? 'active' : ''} ${i < currentPhase ? 'completed' : ''}`}
          style={i > currentPhase ? { opacity: 0.3 } : undefined}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.1em',
            color: 'var(--mt-muted)',
            marginBottom: '0.5rem',
          }}>
            Phase {i + 1}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'var(--text-lg)',
            marginBottom: '0.5rem',
          }}>
            {phase.title}
          </div>
          <AnimatePresence>
            {i === currentPhase && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {phase.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
