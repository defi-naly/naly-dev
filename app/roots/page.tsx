'use client';

import dynamic from 'next/dynamic';
import { Cover } from './components/Cover';
import { OverlayLayer } from './components/OverlayLayer';
import { Footer, FooterOverlay } from './components/FooterSection';
import { GrainOverlay } from './components/GrainOverlay';
import { SideNav } from './components/SideNav';
import { MobileNav } from './components/MobileNav';
import { domains } from './data/domains';
import { useGlobalScroll } from './hooks/useGlobalScroll';
import { usePhaseProgress } from './hooks/usePhaseProgress';
import type { MachineAnnotation } from './types/annotations';

const SceneCanvas = dynamic(() => import('./components/SceneCanvas').then(m => ({ default: m.SceneCanvas })), { ssr: false });

const annotationMap: Record<string, MachineAnnotation[]> = {
  defi: [
    { id: 'd1', label: 'SINGLE AUTHORITY', value: 'One node controls the system — all state flows through it', position: [22, 38], progressMin: 0.02, progressMax: 0.25, color: '#cc2222' },
    { id: 'd2', label: 'DISTRIBUTED CONSENSUS', value: 'Every node validates — no single point of control', position: [60, 42], progressMin: 0.45, progressMax: 0.85 },
  ],
  paragliding: [
    { id: 'pg1', label: 'THE BOWL', value: 'South-facing slope — absorbs heat, triggers convection', position: [30, 72], progressMin: 0.15, progressMax: 0.40 },
    { id: 'pg2', label: 'DUST DEVILS', value: 'Surface convergence — air drawn toward the column base', position: [55, 65], progressMin: 0.30, progressMax: 0.55 },
    { id: 'pg3', label: 'CORE', value: '3–5 m/s sustained lift — strongest updraft in the column', position: [62, 40], progressMin: 0.45, progressMax: 0.75 },
    { id: 'pg4', label: 'CEILING', value: 'Convection cap — lift dissipates, air spreads laterally', position: [60, 25], progressMin: 0.6, progressMax: 0.85 },
  ],
  sovereignty: [
    { id: 's1', label: 'SINGLE POINT OF FAILURE', value: 'Hub controls all routes', position: [22, 38], progressMin: 0.22, progressMax: 0.4, color: '#cc2222' },
    { id: 's2', label: 'MESH TOPOLOGY', value: 'No single node is critical — the network routes around failure', position: [68, 38], progressMin: 0.55, progressMax: 0.85 },
  ],
};

export default function RootsPage() {
  const globalProgress = useGlobalScroll();
  const phaseData = usePhaseProgress(globalProgress);

  return (
    <>
      {/* Single fixed Canvas — z:0 */}
      <SceneCanvas phaseData={phaseData} />

      {/* Fixed overlay for annotations + prose — z:10 */}
      <OverlayLayer
        domains={domains}
        annotationMap={annotationMap}
        phaseData={phaseData}
      />

      {/* Fixed footer overlay — above canvas, below grain */}
      <FooterOverlay progress={globalProgress} />

      {/* Fixed UI elements */}
      <GrainOverlay />
      <SideNav domains={domains} />
      <MobileNav domains={domains} />

      {/* Scroll sections — transparent, create scroll height */}
      <div className="scroll-sections">
        <Cover progress={globalProgress} />

        {domains.map((domain) => (
          <section
            key={domain.id}
            id={domain.id}
            className="chapter-section"
          />
        ))}

        <Footer />
      </div>
    </>
  );
}
