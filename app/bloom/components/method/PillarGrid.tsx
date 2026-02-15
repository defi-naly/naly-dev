'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StaggerContainer, StaggerItem } from '../StaggerContainer';
import PillarCard from './PillarCard';
import type { PillarDefinition } from '../../data/method';

interface PillarGridProps {
  pillars: PillarDefinition[];
}

export default function PillarGrid({ pillars }: PillarGridProps) {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  const active = pillars.find((p) => p.id === activePillar);

  function handlePillarClick(id: string) {
    setActivePillar(activePillar === id ? null : id);
  }

  // Filter to loops only (reinforcing + balancing) — the system story
  const loops = active?.systemElements.filter(
    (el) => el.type === 'reinforcing_loop' || el.type === 'balancing_loop'
  );

  // Filter to paradigm level only — highest-leverage intervention
  const paradigmPoints = active?.leveragePoints.filter(
    (lp) => lp.level === 'paradigm'
  );

  return (
    <>
      <StaggerContainer className="pillar-grid">
        {pillars.map((pillar, i) => (
          <StaggerItem key={pillar.id}>
            <PillarCard
              pillar={pillar}
              index={i}
              isActive={activePillar === pillar.id}
              onClick={() => handlePillarClick(pillar.id)}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            className="pillar-detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pillar-detail-content pillar-detail-2col">
              {/* Left column: The System (loops) */}
              <div className="pillar-detail-col">
                <span className="pillar-detail-col-label">The System</span>
                <div className="system-elements">
                  {loops?.map((el, i) => (
                    <div key={i} className="system-element">
                      <span className={`system-element-type ${el.type}`}>
                        {el.type === 'reinforcing_loop' ? 'R Loop' : 'B Loop'}
                      </span>
                      <div className="system-element-info">
                        <div className="system-element-name">{el.name}</div>
                        <div className="system-element-desc">{el.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column: The Intervention (paradigm) */}
              <div className="pillar-detail-col">
                <span className="pillar-detail-col-label">The Intervention</span>
                {paradigmPoints && paradigmPoints.length > 0 && (
                  <div className="leverage-points-list">
                    {paradigmPoints.map((lp, i) => (
                      <div key={i} className="leverage-point-item">
                        <span className={`leverage-point-level ${lp.level}`}>{lp.level}</span>
                        <div className="leverage-point-info">
                          <div className="leverage-point-name">{lp.name}</div>
                          <div className="leverage-point-intervention">{lp.bloomIntervention}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
