'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Module, DomainId } from '../data/domains';
import FreeRecallInput from './FreeRecallInput';
import ApplicationScenario from './ApplicationScenario';
import ConnectionExercise from './ConnectionExercise';

type Phase = 'recall' | 'application' | 'connection' | 'complete';

interface RetrievalPhasesProps {
  module: Module;
  domainId: DomainId;
  domainAccent: string;
  onAllComplete: () => void;
}

const phaseLabels: Record<Phase, string> = {
  recall: 'Free Recall',
  application: 'Application',
  connection: 'Connection',
  complete: 'Complete',
};

export default function RetrievalPhases({ module, domainId, domainAccent, onAllComplete }: RetrievalPhasesProps) {
  const [phase, setPhase] = useState<Phase>('recall');
  const [recallDone, setRecallDone] = useState(false);
  const [applicationDone, setApplicationDone] = useState(false);

  const handleRecallRevealed = () => {
    setRecallDone(true);
  };

  const handleRecallContinue = () => {
    if (module.applicationScenario) {
      setPhase('application');
    } else if (module.relatedModules && module.relatedModules.length > 0) {
      setPhase('connection');
    } else {
      setPhase('complete');
      onAllComplete();
    }
  };

  const handleApplicationComplete = () => {
    setApplicationDone(true);
  };

  const handleApplicationContinue = () => {
    if (module.relatedModules && module.relatedModules.length > 0) {
      setPhase('connection');
    } else {
      setPhase('complete');
      onAllComplete();
    }
  };

  const handleConnectionComplete = () => {
    setPhase('complete');
    onAllComplete();
  };

  const phases: Phase[] = ['recall', 'application', 'connection'];
  const currentIndex = phases.indexOf(phase);

  return (
    <div className="mt-retrieval">
      {/* Phase indicator */}
      <div className="mt-retrieval-phases">
        {phases.map((p, i) => {
          const isActive = p === phase;
          const isDone = phases.indexOf(p) < currentIndex || phase === 'complete';
          return (
            <div
              key={p}
              className={`mt-retrieval-phase-dot ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
              style={isActive || isDone ? { borderColor: domainAccent, background: isDone ? domainAccent : 'transparent' } : {}}
            >
              <span>{i + 1}</span>
              <span className="mt-retrieval-phase-label">{phaseLabels[p]}</span>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* Phase 1: Free Recall */}
        {phase === 'recall' && (
          <motion.div
            key="recall"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-retrieval-header">
              <span className="mt-retrieval-badge" style={{ color: domainAccent, borderColor: domainAccent }}>
                Phase 1 — Free Recall
              </span>
            </div>
            <FreeRecallInput
              question={`In your own words, explain: ${module.concept}`}
              answer={module.takeaway}
              onRevealed={handleRecallRevealed}
            />
            {recallDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', marginTop: '1.5rem' }}
              >
                <button
                  className="mt-continue-btn"
                  style={{ borderColor: domainAccent, color: domainAccent }}
                  onClick={handleRecallContinue}
                >
                  Continue
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Phase 2: Application */}
        {phase === 'application' && module.applicationScenario && (
          <motion.div
            key="application"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-retrieval-header">
              <span className="mt-retrieval-badge" style={{ color: domainAccent, borderColor: domainAccent }}>
                Phase 2 — Application
              </span>
            </div>
            <ApplicationScenario
              scenario={module.applicationScenario}
              domainAccent={domainAccent}
              onComplete={handleApplicationComplete}
            />
            {applicationDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', marginTop: '1.5rem' }}
              >
                <button
                  className="mt-continue-btn"
                  style={{ borderColor: domainAccent, color: domainAccent }}
                  onClick={handleApplicationContinue}
                >
                  Continue
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Phase 3: Connection */}
        {phase === 'connection' && (
          <motion.div
            key="connection"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-retrieval-header">
              <span className="mt-retrieval-badge" style={{ color: domainAccent, borderColor: domainAccent }}>
                Phase 3 — Connection
              </span>
            </div>
            <ConnectionExercise
              module={module}
              domainAccent={domainAccent}
              onComplete={handleConnectionComplete}
            />
          </motion.div>
        )}

        {/* Complete */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-retrieval-complete"
          >
            <div style={{ color: '#22C55E', fontSize: '2rem', marginBottom: '0.5rem' }}>&#10003;</div>
            <p style={{ color: 'var(--mt-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
              Retrieval practice complete. Review cards generated.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
