'use client';

interface RefItem {
  label: string;
  value: string;
}

interface QuickRefCardProps {
  title: string;
  items: RefItem[];
  accent?: string;
}

export default function QuickRefCard({ title, items, accent }: QuickRefCardProps) {
  return (
    <div className="mt-ref-card">
      <div className="mt-ref-card-title" style={accent ? { color: accent } : {}}>
        {title}
      </div>
      <div className="mt-ref-card-content">
        {items.map((item, i) => (
          <div key={i}>
            <strong>{item.label}:</strong> {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}
