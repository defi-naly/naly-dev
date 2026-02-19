// @ts-nocheck
'use client';

import { Canvas } from '@react-three/fiber';
import { TorusKnotScene } from './TorusKnotScene';
import { DefiMachine } from './machines/DefiMachine';
import { SovereigntyMachine } from './machines/SovereigntyMachine';
import { ParaglidingMachine } from './machines/ParaglidingMachine';
import type { PhaseData } from '../hooks/usePhaseProgress';

interface SceneCanvasProps {
  phaseData: PhaseData;
}

export function SceneCanvas({ phaseData }: SceneCanvasProps) {
  const { showKnot, knot, showDefi, defi, showSov, sovereignty, showPara, paragliding } = phaseData;

  return (
    <div className="scene-canvas" style={showPara && paragliding > 0.80 ? { pointerEvents: 'auto' } : undefined}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 1, 5], fov: 42 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        {showKnot && <TorusKnotScene progress={knot} />}
        {showDefi && <DefiMachine progress={defi} />}
        {showSov && <SovereigntyMachine progress={sovereignty} />}
        {showPara && <ParaglidingMachine progress={paragliding} />}
      </Canvas>
    </div>
  );
}
