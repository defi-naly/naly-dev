interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <div className={`je-section-label ${className}`}>
      <span className="je-section-label-line" />
      <span className="je-caption">{text}</span>
    </div>
  );
}
