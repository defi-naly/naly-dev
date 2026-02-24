'use client';

interface DangerMeterProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
}

export default function DangerMeter({ value, label, showValue = true }: DangerMeterProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const color = clamped < 30 ? '#4ADE80' : clamped < 60 ? '#F59E0B' : '#CC4444';

  return (
    <div className="mt-danger-meter">
      {label && <div className="mt-danger-meter-label">{label}</div>}
      <div className="mt-danger-meter-bar">
        <div
          className="mt-danger-meter-fill"
          style={{ width: `${clamped}%`, background: color }}
        />
      </div>
      {showValue && (
        <div className="mt-danger-meter-value" style={{ color }}>
          {clamped < 30 ? 'LOW' : clamped < 60 ? 'MODERATE' : clamped < 80 ? 'CONSIDERABLE' : 'HIGH'}
        </div>
      )}
    </div>
  );
}
