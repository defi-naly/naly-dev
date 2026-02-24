'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeNode {
  id: string;
  question: string;
  yes?: string;     // next node ID or result text
  no?: string;      // next node ID or result text
  yesResult?: { text: string; safe: boolean };
  noResult?: { text: string; safe: boolean };
}

interface FieldDecisionTreeProps {
  title: string;
  nodes: TreeNode[];
}

export default function FieldDecisionTree({ title, nodes }: FieldDecisionTreeProps) {
  const [currentId, setCurrentId] = useState(nodes[0]?.id || '');
  const [result, setResult] = useState<{ text: string; safe: boolean } | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const current = nodes.find(n => n.id === currentId);

  const handleChoice = (isYes: boolean) => {
    if (!current) return;

    const resultData = isYes ? current.yesResult : current.noResult;
    const nextId = isYes ? current.yes : current.no;

    if (resultData) {
      setResult(resultData);
      return;
    }

    if (nextId) {
      setHistory(prev => [...prev, currentId]);
      setCurrentId(nextId);
    }
  };

  const handleReset = () => {
    setCurrentId(nodes[0]?.id || '');
    setResult(null);
    setHistory([]);
  };

  return (
    <div className="mt-field-tree">
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'var(--text-base)', textTransform: 'uppercase',
        letterSpacing: '0.02em', marginBottom: '1rem',
      }}>
        {title}
      </div>

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={`mt-field-tree-result ${result.safe ? 'safe' : 'danger'}`}>
              {result.text}
            </div>
            <button
              onClick={handleReset}
              className="mt-continue-btn"
              style={{ marginTop: '1rem', borderColor: 'var(--mt-muted)', color: 'var(--mt-bright)' }}
            >
              Start Over
            </button>
          </motion.div>
        ) : current ? (
          <motion.div
            key={currentId}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mt-field-tree-node">
              <div className="mt-field-tree-question">{current.question}</div>
              <div className="mt-field-tree-options">
                <button
                  className="mt-field-tree-option yes"
                  onClick={() => handleChoice(true)}
                >
                  Yes
                </button>
                <button
                  className="mt-field-tree-option no"
                  onClick={() => handleChoice(false)}
                >
                  No
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
