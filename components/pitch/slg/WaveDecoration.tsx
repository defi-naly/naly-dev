'use client';

interface WaveDecorationProps {
  className?: string;
}

export default function WaveDecoration({ className = '' }: WaveDecorationProps) {
  return (
    <svg
      viewBox="0 0 1440 400"
      className={`absolute bottom-0 left-0 right-0 w-full ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E53935" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#E53935" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E53935" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Multiple flowing lines to create depth */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const yOffset = 200 + i * 15;
        const amplitude = 50 + i * 5;
        return (
          <path
            key={i}
            d={`M -100 ${yOffset}
                Q 200 ${yOffset - amplitude} 400 ${yOffset}
                T 800 ${yOffset}
                T 1200 ${yOffset}
                T 1600 ${yOffset}`}
            fill="none"
            stroke="#E53935"
            strokeWidth={1.5}
            strokeOpacity={0.15 + i * 0.05}
          />
        );
      })}

      {/* Main wave path with gradient fill */}
      <path
        d={`M -100 300
            Q 200 200 500 280
            T 900 250
            T 1300 280
            T 1600 260
            L 1600 500 L -100 500 Z`}
        fill="url(#waveGradient)"
      />
    </svg>
  );
}

// Simpler wave for quote slides - matches Switch deck style
export function QuoteWave({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 200"
      className={`absolute bottom-0 left-0 right-0 w-full h-48 ${className}`}
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Grid of flowing lines */}
      {Array.from({ length: 20 }).map((_, i) => {
        const baseY = 20 + i * 8;
        const amplitude = 20 + Math.sin(i * 0.3) * 15;
        const phase = i * 20;
        return (
          <path
            key={i}
            d={`M ${-100 + phase} ${baseY + 50}
                Q ${150 + phase} ${baseY - amplitude + 50} ${300 + phase} ${baseY + 50}
                T ${600 + phase} ${baseY + 50}
                T ${900 + phase} ${baseY + 50}
                T ${1200 + phase} ${baseY + 50}
                T ${1500 + phase} ${baseY + 50}`}
            fill="none"
            stroke="#E53935"
            strokeWidth={1}
            strokeOpacity={0.3 + (i / 20) * 0.4}
            strokeDasharray={i % 3 === 0 ? '4 4' : 'none'}
          />
        );
      })}
    </svg>
  );
}
