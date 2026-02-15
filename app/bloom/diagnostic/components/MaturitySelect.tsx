'use client';

import { motion } from 'motion/react';
import { maturityBrackets, type MaturityId } from '../../data/method';

interface MaturitySelectProps {
  onSelect: (id: MaturityId) => void;
}

export default function MaturitySelect({ onSelect }: MaturitySelectProps) {
  return (
    <div className="diag-maturity">
      <div className="diag-maturity-header">
        <h2 className="diag-step-title">Select Your Stage</h2>
        <p className="diag-step-desc">This calibrates the diagnostic to your company&apos;s context.</p>
      </div>
      <div className="diag-maturity-grid">
        {maturityBrackets.map((bracket, i) => (
          <motion.button
            key={bracket.id}
            className="diag-maturity-card"
            onClick={() => onSelect(bracket.id)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.3)' }}
          >
            <span className="diag-maturity-headcount">{bracket.headcount}</span>
            <h3 className="diag-maturity-name">{bracket.name}</h3>
            <p className="diag-maturity-subtitle">{bracket.subtitle}</p>
            <p className="diag-maturity-desc">{bracket.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
