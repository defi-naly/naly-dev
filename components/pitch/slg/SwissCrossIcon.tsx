'use client';

interface SwissCrossIconProps {
  size?: number;
  className?: string;
  variant?: 'full' | 'outline' | 'split' | 'exploded';
  withShadow?: boolean;
}

export default function SwissCrossIcon({
  size = 120,
  className = '',
  variant = 'full',
  withShadow = false,
}: SwissCrossIconProps) {
  const gap = size * 0.05;
  const squareSize = (size - gap * 2) / 3;
  const radius = squareSize * 0.15;

  // Positions for the 5 squares that form the cross
  const positions = [
    { x: squareSize + gap, y: 0 }, // top
    { x: 0, y: squareSize + gap }, // left
    { x: squareSize + gap, y: squareSize + gap }, // center
    { x: (squareSize + gap) * 2, y: squareSize + gap }, // right
    { x: squareSize + gap, y: (squareSize + gap) * 2 }, // bottom
  ];

  if (variant === 'outline') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={className}
      >
        {positions.map((pos, i) => (
          <rect
            key={i}
            x={pos.x}
            y={pos.y}
            width={squareSize}
            height={squareSize}
            rx={radius}
            fill="none"
            stroke="#E53935"
            strokeWidth={2}
          />
        ))}
      </svg>
    );
  }

  if (variant === 'split') {
    // Split cross like in slide 8 - only center square is solid, corners are quarter circles
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={className}
      >
        {/* Center square */}
        <rect
          x={squareSize + gap}
          y={squareSize + gap}
          width={squareSize}
          height={squareSize}
          rx={radius}
          fill="#E53935"
        />
        {/* Quarter circles in corners */}
        <path
          d={`M ${squareSize} ${squareSize + gap}
              A ${squareSize} ${squareSize} 0 0 0 ${squareSize + gap} ${squareSize}
              L ${squareSize + gap} ${squareSize + gap} Z`}
          fill="#E53935"
        />
        <path
          d={`M ${(squareSize + gap) * 2} ${squareSize}
              A ${squareSize} ${squareSize} 0 0 0 ${(squareSize + gap) * 2 + squareSize} ${squareSize + gap}
              L ${(squareSize + gap) * 2} ${squareSize + gap} Z`}
          fill="#E53935"
        />
        <path
          d={`M ${(squareSize + gap) * 2 + squareSize} ${(squareSize + gap) * 2}
              A ${squareSize} ${squareSize} 0 0 0 ${(squareSize + gap) * 2} ${(squareSize + gap) * 2 + squareSize}
              L ${(squareSize + gap) * 2} ${(squareSize + gap) * 2} Z`}
          fill="#E53935"
        />
        <path
          d={`M ${squareSize + gap} ${(squareSize + gap) * 2 + squareSize}
              A ${squareSize} ${squareSize} 0 0 0 ${squareSize} ${(squareSize + gap) * 2}
              L ${squareSize + gap} ${(squareSize + gap) * 2} Z`}
          fill="#E53935"
        />
      </svg>
    );
  }

  if (variant === 'exploded') {
    // Exploded cross with gap in center like logo but separate
    const explodeGap = gap * 2;
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={className}
      >
        {/* Top */}
        <rect
          x={squareSize + gap}
          y={0}
          width={squareSize}
          height={squareSize - explodeGap / 2}
          rx={radius}
          fill="#E53935"
        />
        {/* Bottom */}
        <rect
          x={squareSize + gap}
          y={(squareSize + gap) * 2 + explodeGap / 2}
          width={squareSize}
          height={squareSize - explodeGap / 2}
          rx={radius}
          fill="#E53935"
        />
        {/* Left */}
        <rect
          x={0}
          y={squareSize + gap}
          width={squareSize - explodeGap / 2}
          height={squareSize}
          rx={radius}
          fill="#E53935"
        />
        {/* Right */}
        <rect
          x={(squareSize + gap) * 2 + explodeGap / 2}
          y={squareSize + gap}
          width={squareSize - explodeGap / 2}
          height={squareSize}
          rx={radius}
          fill="#E53935"
        />
      </svg>
    );
  }

  // Full cross (default)
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={withShadow ? { filter: 'drop-shadow(8px 8px 16px rgba(0,0,0,0.15))' } : undefined}
    >
      {positions.map((pos, i) => (
        <rect
          key={i}
          x={pos.x}
          y={pos.y}
          width={squareSize}
          height={squareSize}
          rx={radius}
          fill="#E53935"
        />
      ))}
    </svg>
  );
}

// Small logo version for bottom-right branding
export function SLGLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <SwissCrossIcon size={24} />
      <span className="text-[#1A1A1A] font-sans font-bold tracking-tight">SLG</span>
    </div>
  );
}
