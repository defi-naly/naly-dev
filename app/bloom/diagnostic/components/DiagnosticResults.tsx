'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { foundations } from '../../data/method';
import type { AssetDiagnosticResult } from '../../lib/diagnostic';

interface DiagnosticResultsProps {
  result: AssetDiagnosticResult;
  onRestart: () => void;
}

export default function DiagnosticResults({ result, onRestart }: DiagnosticResultsProps) {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  async function handleEmailSubmit() {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Valid email required');
      return;
    }

    try {
      await fetch('/api/bloom/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Diagnostic User',
          email: email.trim(),
          message: `BLOOM Diagnostic completed. Grade: ${result.grade} (${result.overallScore}/5). Weakest foundation: ${result.weakestFoundation.name} (${result.weakestFoundation.score}/5). Foundation scores: ${result.assetScores.map(a => `${a.assetId}: ${a.average}`).join(', ')}.`,
        }),
      });
    } catch {
      // Non-blocking — still show results
    }

    setEmailSubmitted(true);
  }

  return (
    <motion.div
      className="diag-results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Grade Hero */}
      <div className="diag-grade-hero">
        <motion.div
          className="diag-grade-circle"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="diag-grade-letter">{result.grade}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="diag-grade-label">{result.gradeLabel}</p>
          <p className="diag-grade-score">{result.overallScore} / 5.0</p>
        </motion.div>
      </div>

      {/* Asset Scores */}
      <div className="diag-section">
        <h3 className="diag-section-title">Foundation Scores</h3>
        <div className="diag-pillar-scores">
          {result.assetScores.map((as, i) => {
            const asset = foundations.find((a) => a.id === as.assetId);
            if (!asset) return null;
            const isWeakest = as.assetId === result.weakestFoundation.id;
            return (
              <motion.div
                key={as.assetId}
                className={`diag-pillar-score-card ${isWeakest ? 'weakest' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                <div className="diag-pillar-score-header">
                  <span className="diag-pillar-score-name">{asset.name}</span>
                  <span className="diag-pillar-score-value">{as.average}</span>
                </div>
                <div className="diag-pillar-score-bar">
                  <motion.div
                    className="diag-pillar-score-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(as.average / 5) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <div className="diag-pillar-dimensions">
                  {as.dimensions.map((dim) => (
                    <div key={dim.dimensionName} className="diag-dim-row">
                      <span className="diag-dim-name">{dim.dimensionName}</span>
                      <span className="diag-dim-score">{dim.score ?? '-'}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Weakest Asset — Sprint Recommendation */}
      <motion.div
        className="diag-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h3 className="diag-section-title">Your Weakest Foundation</h3>
        <div className="diag-weakest-card">
          <p className="diag-weakest-text">
            Your weakest foundation is <strong>{result.weakestFoundation.name}</strong> ({result.weakestFoundation.score}/5).
            This is where you&apos;re most exposed.
          </p>
          <p className="diag-weakest-price">
            One sprint closes this gap. <strong>$15,000.</strong>
          </p>
          <p className="diag-weakest-anchor">
            Most agencies quote $50K+ over 3 months for comparable work.
          </p>
          <a
            href="/bloom/foundations#contact"
            className="diag-sprint-cta"
          >
            {result.weakestFoundation.sprintCTA} — $15,000 <ArrowRight size={14} strokeWidth={1.5} />
          </a>
        </div>
      </motion.div>

      {/* Email Gate — Full Report */}
      <div className="diag-section">
        {!emailSubmitted ? (
          <motion.div
            className="diag-email-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="diag-email-gate-text">
              Get your full foundation report with detailed recommendations.
            </p>
            <div className="diag-email-gate-form">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                className={`contact-input ${emailError ? 'error' : ''}`}
              />
              <button
                className="cta-button"
                onClick={handleEmailSubmit}
              >
                Get Report
              </button>
            </div>
            {emailError && <span className="contact-error">{emailError}</span>}
          </motion.div>
        ) : (
          <motion.div
            className="diag-email-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="diag-email-gate-text">
              Thanks — we&apos;ll send your full foundation report shortly.
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom CTAs */}
      <div className="diag-bottom-ctas">
        <a
          href="/bloom/foundations#contact"
          className="bloom-hero-cta"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
        >
          Start a Sprint <ArrowRight size={14} strokeWidth={1.5} />
        </a>
        <button className="diag-restart" onClick={onRestart}>
          Retake Diagnostic
        </button>
      </div>
    </motion.div>
  );
}
