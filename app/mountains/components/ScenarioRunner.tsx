'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Scenario, ScenarioNode, ScenarioChoice } from '../data/scenarios';
import ScenarioDebrief from './ScenarioDebrief';

interface ScenarioRunnerProps {
  scenario: Scenario;
  onComplete: (score: number) => void;
}

interface BreadcrumbItem {
  label: string;
  nodeId: string;
}

export default function ScenarioRunner({ scenario, onComplete }: ScenarioRunnerProps) {
  const [currentNodeId, setCurrentNodeId] = useState(scenario.startNodeId);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalLessons, setFinalLessons] = useState<string[]>([]);

  const currentNode = scenario.nodes[currentNodeId];

  const handleChoice = useCallback((choice: ScenarioChoice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
  }, []);

  const handleContinue = useCallback(() => {
    if (!selectedChoice) return;

    const nextNode = scenario.nodes[selectedChoice.nextNodeId];
    setBreadcrumbs(prev => [...prev, {
      label: selectedChoice.label.substring(0, 40) + (selectedChoice.label.length > 40 ? '...' : ''),
      nodeId: currentNodeId,
    }]);

    setCurrentNodeId(selectedChoice.nextNodeId);
    setSelectedChoice(null);
    setShowFeedback(false);

    if (nextNode.isTerminal) {
      setCompleted(true);
      setFinalScore(nextNode.score || 0);
      setFinalLessons(nextNode.lessons || []);
      onComplete(nextNode.score || 0);
    }
  }, [selectedChoice, currentNodeId, scenario.nodes, onComplete]);

  if (completed) {
    const terminalNode = scenario.nodes[currentNodeId];
    return (
      <ScenarioDebrief
        scenario={scenario}
        score={finalScore}
        narrative={terminalNode.narrative}
        lessons={finalLessons}
        breadcrumbs={breadcrumbs}
      />
    );
  }

  return (
    <div className="mt-scenario-runner">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="mt-scenario-breadcrumb">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="mt-scenario-breadcrumb-step">
              {b.label}
            </span>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentNodeId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Narrative */}
          <div className="mt-scenario-narrative">{currentNode.narrative}</div>

          {/* Choices */}
          {currentNode.choices && !showFeedback && (
            <div className="mt-scenario-choices">
              {currentNode.choices.map((choice, i) => (
                <button
                  key={i}
                  className="mt-scenario-choice"
                  onClick={() => handleChoice(choice)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          )}

          {/* Feedback */}
          {showFeedback && selectedChoice && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className="mt-decision-consequence"
                style={{
                  borderColor: selectedChoice.optimal
                    ? 'rgba(34, 197, 94, 0.3)'
                    : 'rgba(245, 158, 11, 0.3)',
                  background: selectedChoice.optimal
                    ? 'rgba(34, 197, 94, 0.05)'
                    : 'rgba(245, 158, 11, 0.05)',
                }}
              >
                {selectedChoice.feedback}
              </div>
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button
                  className="mt-continue-btn"
                  style={{ borderColor: 'var(--mt-bright)', color: 'var(--mt-bright)' }}
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
