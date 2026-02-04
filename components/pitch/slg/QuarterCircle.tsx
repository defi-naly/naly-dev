'use client';

interface QuarterCircleProps {
  size?: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export default function QuarterCircle({
  size = 60,
  position,
  className = '',
}: QuarterCircleProps) {
  const paths: Record<string, string> = {
    'top-left': `M 0 ${size} A ${size} ${size} 0 0 1 ${size} 0 L ${size} ${size} Z`,
    'top-right': `M 0 0 A ${size} ${size} 0 0 1 ${size} ${size} L 0 ${size} Z`,
    'bottom-right': `M ${size} 0 A ${size} ${size} 0 0 1 0 ${size} L 0 0 Z`,
    'bottom-left': `M ${size} ${size} A ${size} ${size} 0 0 1 0 0 L ${size} 0 Z`,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <path d={paths[position]} fill="#E53935" />
    </svg>
  );
}

// Four quarter circles arranged to form a broken circle (Key Traits layout)
export function BrokenCircle({
  size = 200,
  gap = 40,
  className = '',
}: {
  size?: number;
  gap?: number;
  className?: string;
}) {
  const quarterSize = (size - gap) / 2;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Top Left */}
      <div className="absolute" style={{ top: 0, left: 0 }}>
        <QuarterCircle size={quarterSize} position="bottom-right" />
      </div>
      {/* Top Right */}
      <div className="absolute" style={{ top: 0, right: 0 }}>
        <QuarterCircle size={quarterSize} position="bottom-left" />
      </div>
      {/* Bottom Left */}
      <div className="absolute" style={{ bottom: 0, left: 0 }}>
        <QuarterCircle size={quarterSize} position="top-right" />
      </div>
      {/* Bottom Right */}
      <div className="absolute" style={{ bottom: 0, right: 0 }}>
        <QuarterCircle size={quarterSize} position="top-left" />
      </div>
    </div>
  );
}

// Red square bullet marker
export function RedSquare({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`bg-[#E53935] rounded-sm ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
