'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Module, DomainId } from '../data/domains';
import RetrievalPhases from './RetrievalPhases';

interface ModuleWrapperProps {
  module: Module;
  currentModule: number;
  totalModules: number;
  domainId: DomainId;
  domainAccent: string;
  isComplete: boolean;
  showTakeaway: boolean;
  onContinue: () => void;
  onBack: () => void;
  children: React.ReactNode;
}

export default function ModuleWrapper({
  module,
  currentModule,
  totalModules,
  domainId,
  domainAccent,
  isComplete,
  showTakeaway,
  onContinue,
  onBack,
  children,
}: ModuleWrapperProps) {
  const [retrievalComplete, setRetrievalComplete] = useState(false);
  const progress = (currentModule / totalModules) * 100;
  const isLast = currentModule === totalModules;

  const canContinue = isComplete && retrievalComplete;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-module-wrapper"
    >
      {/* Header */}
      <div className="mt-module-header">
        <button onClick={onBack} className="mt-module-back">
          <ArrowLeft size={14} />
          Back
        </button>
        <span className="mt-module-counter">
          {currentModule}/{totalModules}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-progress-bar">
        <motion.div
          className="mt-progress-fill"
          style={{ background: domainAccent }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Title */}
      <div className="mt-module-title-section" style={{ marginBottom: '1.5rem' }}>
        <span
          className="mt-module-badge"
          style={{ display: 'inline-block', marginBottom: '0.75rem', color: domainAccent, borderColor: domainAccent }}
        >
          Module {module.id}
        </span>
        <h2>{module.title}</h2>
        <p className="concept">{module.concept}</p>
      </div>

      {/* Content */}
      <div className="mt-module-content">
        {children}
      </div>

      {/* Retrieval Practice (replaces old takeaway-only approach) */}
      <AnimatePresence>
        {showTakeaway && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: '2rem' }}
          >
            <RetrievalPhases
              module={module}
              domainId={domainId}
              domainAccent={domainAccent}
              onAllComplete={() => setRetrievalComplete(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue */}
      <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="mt-continue-btn"
          style={canContinue ? { borderColor: domainAccent, color: domainAccent } : {}}
        >
          {isLast ? 'Complete Domain' : 'Continue'}
        </button>
      </div>
    </motion.div>
  );
}
