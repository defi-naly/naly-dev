'use client';

interface InteractiveSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  formatValue?: (value: number) => string;
}

export default function InteractiveSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = '',
  formatValue,
}: InteractiveSliderProps) {
  const display = formatValue ? formatValue(value) : `${value}${unit}`;

  return (
    <div className="mt-slider-container">
      <div className="mt-slider-label">
        <span>{label}</span>
        <span style={{ color: 'var(--mt-bright)' }}>{display}</span>
      </div>
      <input
        type="range"
        className="mt-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  );
}
