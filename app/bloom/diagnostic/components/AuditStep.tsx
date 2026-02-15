'use client';

import { motion } from 'motion/react';
import { durableAssets, type AssetId } from '../../data/method';
import type { AssetDimensionScore } from '../../lib/diagnostic';
import ScoreSelector from './ScoreSelector';

interface AuditStepProps {
  assetId: AssetId;
  scores: AssetDimensionScore[];
  onScoreChange: (dimensionName: string, score: number) => void;
  onNext: () => void;
  onBack: () => void;
  stepIndex: number;
  totalSteps: number;
}

export default function AuditStep({
  assetId,
  scores,
  onScoreChange,
  onNext,
  onBack,
  stepIndex,
  totalSteps,
}: AuditStepProps) {
  const asset = durableAssets.find((a) => a.id === assetId);
  if (!asset) return null;

  const assetScores = scores.filter((s) => s.assetId === assetId);
  const allScored = assetScores.every((s) => s.score !== null);

  return (
    <motion.div
      className="diag-audit"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="diag-audit-header">
        <div className="diag-progress">
          <span className="diag-progress-label">
            Asset {stepIndex + 1} of {totalSteps}
          </span>
          <div className="diag-progress-bar">
            <div
              className="diag-progress-fill"
              style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="diag-step-title">{asset.name}</h2>
        <p className="diag-step-subtitle">{asset.subtitle}</p>
        <p className="diag-step-desc">{asset.description}</p>
      </div>

      <div className="diag-dimensions">
        {asset.dimensions.map((dim, i) => {
          const dimScore = assetScores.find((s) => s.dimensionName === dim.name);
          return (
            <motion.div
              key={dim.name}
              className="diag-dimension"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="diag-dimension-name">{dim.name}</h3>
              <p className="diag-dimension-desc">{dim.description}</p>
              <ScoreSelector
                rubric={dim.rubric}
                value={dimScore?.score ?? null}
                onChange={(score) => onScoreChange(dim.name, score)}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="diag-nav">
        {stepIndex > 0 ? (
          <button className="diag-nav-btn diag-nav-back" onClick={onBack}>
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          className={`diag-nav-btn diag-nav-next ${allScored ? '' : 'disabled'}`}
          onClick={onNext}
          disabled={!allScored}
        >
          {stepIndex === totalSteps - 1 ? 'See Results' : 'Next Asset'}
        </button>
      </div>
    </motion.div>
  );
}
