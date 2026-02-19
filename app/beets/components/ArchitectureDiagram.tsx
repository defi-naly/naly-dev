'use client';

import { ChevronDown } from 'lucide-react';
import MotionReveal from './MotionReveal';

export interface ArchLayer {
  label: string;
  name: string;
  className: string;
  detail?: string;
  delay: number;
}

export interface ArchDetail {
  label: string;
  value: string;
}

interface ArchitectureDiagramProps {
  layers?: ArchLayer[];
  details?: ArchDetail[];
}

const defaultLayers: ArchLayer[] = [
  {
    label: 'Infrastructure',
    name: 'Balancer V3 Vault',
    className: 'vault',
    detail: 'Singleton vault pattern — all pools share one contract for gas-efficient routing',
    delay: 0,
  },
  {
    label: 'Pool Module',
    name: 'reCLAMMs',
    className: 'pool',
    detail: 'Custom AMM hook — exponential price curve with time-decayed range bounds',
    delay: 0.15,
  },
  {
    label: 'LP Token',
    name: 'Fungible ERC-20',
    className: 'token',
    detail: 'Standard BPT — composable across lending, staking, and governance protocols',
    delay: 0.3,
  },
];

const defaultDetails: ArchDetail[] = [
  { label: 'Audit Firms', value: 'Trail of Bits, Certora, Spearbit' },
  { label: 'Math Model', value: 'Geometric mean with time decay' },
  { label: 'Oracle Dependency', value: 'None — fully on-chain' },
];

export default function ArchitectureDiagram({
  layers = defaultLayers,
  details = defaultDetails,
}: ArchitectureDiagramProps) {
  return (
    <div>
      <div className="arch-diagram">
        {layers.map((layer, i) => (
          <div key={i}>
            <MotionReveal delay={layer.delay}>
              <div className={`arch-layer ${layer.className}`}>
                <div className="arch-layer-label">{layer.label}</div>
                <div className="arch-layer-name">{layer.name}</div>
                {layer.detail && (
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted)',
                    marginTop: '0.5rem',
                    lineHeight: 1.5,
                  }}>
                    {layer.detail}
                  </div>
                )}
              </div>
            </MotionReveal>
            {i < layers.length - 1 && (
              <MotionReveal delay={layer.delay + 0.08}>
                <div className="arch-connector">
                  <ChevronDown size={18} strokeWidth={1.5} />
                </div>
              </MotionReveal>
            )}
          </div>
        ))}
      </div>

      <div className="arch-stats">
        {details.map((detail, i) => (
          <MotionReveal key={i} delay={0.1 + i * 0.1}>
            <div className="arch-stat">
              <div className="arch-stat-value" style={{ fontSize: 'var(--text-base)' }}>
                {detail.value}
              </div>
              <div className="arch-stat-label">{detail.label}</div>
            </div>
          </MotionReveal>
        ))}
      </div>
    </div>
  );
}
