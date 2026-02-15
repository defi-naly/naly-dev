'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getInitialAssetScores,
  runAssetDiagnostic,
  ASSET_ORDER,
  type AssetDimensionScore,
  type AssetDiagnosticResult,
} from '../lib/diagnostic';
import CustomCursor from '../components/CustomCursor';
import AuditStep from './components/AuditStep';
import DiagnosticResults from './components/DiagnosticResults';
import { ArrowLeft } from 'lucide-react';

type DiagnosticPhase = 'scoring' | 'results';

export default function DiagnosticPage() {
  const [phase, setPhase] = useState<DiagnosticPhase>('scoring');
  const [currentAsset, setCurrentAsset] = useState(0);
  const [scores, setScores] = useState<AssetDimensionScore[]>(getInitialAssetScores());
  const [result, setResult] = useState<AssetDiagnosticResult | null>(null);

  const handleScoreChange = useCallback((dimensionName: string, score: number) => {
    setScores((prev) =>
      prev.map((s) =>
        s.assetId === ASSET_ORDER[currentAsset] && s.dimensionName === dimensionName
          ? { ...s, score }
          : s
      )
    );
  }, [currentAsset]);

  const handleNext = useCallback(() => {
    if (currentAsset < ASSET_ORDER.length - 1) {
      setCurrentAsset((a) => a + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const diagnosticResult = runAssetDiagnostic(scores);
      setResult(diagnosticResult);
      setPhase('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentAsset, scores]);

  const handleBack = useCallback(() => {
    if (currentAsset > 0) {
      setCurrentAsset((a) => a - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentAsset]);

  const handleRestart = useCallback(() => {
    setPhase('scoring');
    setCurrentAsset(0);
    setScores(getInitialAssetScores());
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Background */}
      <div className="bloom-bg">
        <div className="bloom-bg-grid" />
        <div className="bloom-bg-noise" />
        <div className="bloom-bg-vignette" />
      </div>

      <CustomCursor />

      <main className="bloom-main">
        {/* Navigation */}
        <nav className="bloom-nav">
          <a href="/bloom" className="bloom-nav-logo">
            BLOOM
          </a>
          <div className="bloom-nav-links">
            <a href="/bloom" className="bloom-nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={12} strokeWidth={1.5} />
              Back
            </a>
            <a href="/bloom#what-we-build" className="bloom-nav-link">What We Build</a>
            <a href="/bloom#contact" className="bloom-nav-cta">Start a Sprint</a>
          </div>
        </nav>

        <div className="diag-container">
          {/* Header */}
          <motion.div
            className="diag-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="diag-title">Find Your Missing Durable Asset</h1>
            <p className="diag-subtitle">
              Score your organization across 4 durable assets. Find where you&apos;re exposed — and which sprint closes the gap.
            </p>
            <p className="diag-time">~5 minutes</p>
          </motion.div>

          {/* Phases */}
          <AnimatePresence mode="wait">
            {phase === 'scoring' && (
              <motion.div key={`scoring-${currentAsset}`}>
                <AuditStep
                  assetId={ASSET_ORDER[currentAsset]}
                  scores={scores}
                  onScoreChange={handleScoreChange}
                  onNext={handleNext}
                  onBack={handleBack}
                  stepIndex={currentAsset}
                  totalSteps={ASSET_ORDER.length}
                />
              </motion.div>
            )}

            {phase === 'results' && result && (
              <motion.div key="results">
                <DiagnosticResults result={result} onRestart={handleRestart} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Minimal Footer */}
        <footer className="bloom-footer" style={{ borderTop: '1px solid var(--border)', marginTop: '6rem' }}>
          <div className="footer-bottom">
            <p>&copy; 2026 BLOOM</p>
            <a href="/bloom">bloom.studio</a>
          </div>
        </footer>
      </main>
    </>
  );
}
