'use client';

import { motion } from 'motion/react';
import { RefreshCw, Shield, Coins, Lock, Database, Zap, Scale, Layers, TrendingUp, Puzzle, Target, Droplets } from 'lucide-react';
import { features as defaultFeatures, Feature } from '../data/features';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  RefreshCw,
  Shield,
  Coins,
  Lock,
  Database,
  Zap,
  Scale,
  Layers,
  TrendingUp,
  Puzzle,
  Target,
  Droplets,
};

interface FeatureGridProps {
  features?: Feature[];
}

export default function FeatureGrid({ features = defaultFeatures }: FeatureGridProps) {
  return (
    <StaggerContainer className="feature-grid">
      {features.map((feature, i) => {
        const Icon = iconMap[feature.icon];
        return (
          <StaggerItem key={i}>
            <motion.div
              className="feature-card"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="feature-card-icon">
                {Icon && <Icon size={24} strokeWidth={1.5} />}
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </motion.div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
