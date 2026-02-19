'use client';

import { AnnotationOverlay } from './AnnotationOverlay';
import { ChapterBar } from './ChapterContent';
import type { Domain } from '../data/domains';
import type { MachineAnnotation } from '../types/annotations';
import type { PhaseData } from '../hooks/usePhaseProgress';

function smoothFade(progress: number, fadeIn: number, fadeOut: number, dur: number): number {
  if (progress < fadeIn) return 0;
  if (progress < fadeIn + dur) return (progress - fadeIn) / dur;
  if (progress < fadeOut) return 1;
  if (progress < fadeOut + dur) return 1 - (progress - fadeOut) / dur;
  return 0;
}

interface OverlayLayerProps {
  domains: Domain[];
  annotationMap: Record<string, MachineAnnotation[]>;
  phaseData: PhaseData;
}

const DOMAIN_KEYS: { domainId: string; progressKey: keyof PhaseData; showKey: keyof PhaseData }[] = [
  { domainId: 'defi', progressKey: 'defi', showKey: 'showDefi' },
  { domainId: 'sovereignty', progressKey: 'sovereignty', showKey: 'showSov' },
  { domainId: 'paragliding', progressKey: 'paragliding', showKey: 'showPara' },
];

export function OverlayLayer({ domains, annotationMap, phaseData }: OverlayLayerProps) {
  return (
    <div className="overlay-layer">
      {DOMAIN_KEYS.map(({ domainId, progressKey, showKey }) => {
        const domain = domains.find((d) => d.id === domainId);
        if (!domain) return null;

        const isVisible = phaseData[showKey] as boolean;
        if (!isVisible) return null;

        const annotations = annotationMap[domainId] || [];
        const progress = phaseData[progressKey] as number;
        const barOpacity = smoothFade(progress, 0.05, 0.92, 0.07);

        return (
          <div key={domainId} className="overlay-chapter">
            <AnnotationOverlay
              annotations={annotations}
              progress={progress}
              color={domain.color}
            />

            <div
              className="chapter-overlay chapter-bottom-bar"
              style={{ opacity: barOpacity }}
            >
              <ChapterBar domain={domain} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
