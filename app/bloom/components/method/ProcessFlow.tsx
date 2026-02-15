'use client';

import { motion } from 'motion/react';
import { Crosshair, Layers, TrendingUp } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../StaggerContainer';

const stageIcons = [Crosshair, Layers, TrendingUp];

export interface ProcessStep {
  id: string;
  name: string;
  duration: string;
  description: string;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
}

export default function ProcessFlow({ steps }: ProcessFlowProps) {
  return (
    <div className="process-flow">
      <motion.div
        className="process-flow-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <StaggerContainer className="process-flow-steps">
        {steps.map((step, i) => {
          const Icon = stageIcons[i];

          return (
            <StaggerItem key={step.id}>
              <div className="process-flow-step">
                <div className="process-flow-node">{String(i + 1).padStart(2, '0')}</div>
                <div className="process-flow-card">
                  <Icon className="process-flow-icon" size={18} strokeWidth={1.5} />
                  <h4 className="process-flow-title">{step.name}</h4>
                  <span className="process-flow-duration">{step.duration}</span>
                  <p className="process-flow-desc">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}
