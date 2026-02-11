import type { MachineAnnotation } from '../types/annotations';

interface Props {
  annotations: MachineAnnotation[];
  progress: number;
  color?: string;
}

export function AnnotationOverlay({ annotations, progress, color }: Props) {
  return (
    <div className="annotations">
      {annotations.map((a) => {
        const visible = progress >= a.progressMin && progress <= a.progressMax;
        const fadeIn = Math.min(1, (progress - a.progressMin) / 0.05);
        const fadeOut = Math.min(1, (a.progressMax - progress) / 0.05);
        const opacity = visible ? Math.min(fadeIn, fadeOut) : 0;

        return (
          <div
            key={a.id}
            style={{
              position: 'absolute',
              left: `${a.position[0]}%`,
              top: `${a.position[1]}%`,
              opacity,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
            }}
          >
            <span className="annotation-label" style={{ color: a.color || color }}>{a.label}</span>
            {a.value && (
              <>
                <br />
                <span className="annotation-value">{a.value}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
