import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useInView } from '../hooks/useInView';
import { AnnotationOverlay } from './AnnotationOverlay';
import { ChapterBar } from './ChapterContent';
import type { Domain } from '../data/domains';
import type { MachineAnnotation } from '../types/annotations';

interface ChapterProps {
  domain: Domain;
  Machine: React.ComponentType<{ progress: number }>;
  annotations?: MachineAnnotation[];
}

function smoothFade(progress: number, fadeIn: number, fadeOut: number, dur: number): number {
  if (progress < fadeIn) return 0;
  if (progress < fadeIn + dur) return (progress - fadeIn) / dur;
  if (progress < fadeOut) return 1;
  if (progress < fadeOut + dur) return 1 - (progress - fadeOut) / dur;
  return 0;
}

export function Chapter({ domain, Machine, annotations = [] }: ChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const inView = useInView(sectionRef, 0.05);

  const barOpacity = smoothFade(progress, 0.05, 0.92, 0.07);

  return (
    <section
      ref={sectionRef}
      id={domain.id}
      className="chapter"
    >
      <div className="chapter-sticky">
        <div className="chapter-canvas-full">
          <Canvas
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [0, 1, 5], fov: 42 }}
            style={{ background: 'transparent' }}
            dpr={[1, 2]}
            frameloop={inView ? 'always' : 'never'}
          >
            <Machine progress={progress} />
          </Canvas>

          <AnnotationOverlay annotations={annotations} progress={progress} color={domain.color} />
        </div>

        <div
          className="chapter-overlay chapter-bottom-bar"
          style={{ opacity: barOpacity }}
        >
          <ChapterBar domain={domain} />
        </div>
      </div>
    </section>
  );
}
