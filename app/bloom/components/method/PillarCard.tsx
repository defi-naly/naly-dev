'use client';

import { Compass, Megaphone, Target, Settings } from 'lucide-react';
import type { PillarDefinition } from '../../data/method';

const iconMap = {
  Compass,
  Megaphone,
  Target,
  Settings,
} as const;

interface PillarCardProps {
  pillar: PillarDefinition;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export default function PillarCard({ pillar, index, isActive, onClick }: PillarCardProps) {
  const Icon = iconMap[pillar.icon as keyof typeof iconMap];

  return (
    <div
      className={`pillar-card${isActive ? ' active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      <Icon className="pillar-card-icon" size={20} strokeWidth={1.5} />
      <span className="pillar-card-number">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="pillar-card-name">{pillar.name}</h3>
      <p className="pillar-card-subtitle">{pillar.subtitle}</p>
      <p className="pillar-card-desc">{pillar.description}</p>
    </div>
  );
}
