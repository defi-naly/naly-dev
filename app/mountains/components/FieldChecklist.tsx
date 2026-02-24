'use client';

import { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  category?: string;
}

interface FieldChecklistProps {
  title: string;
  items: ChecklistItem[];
  accent?: string;
}

export default function FieldChecklist({ title, items, accent }: FieldChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = items.length > 0 ? Math.round((checked.size / items.length) * 100) : 0;

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '1rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'var(--text-base)', textTransform: 'uppercase',
          letterSpacing: '0.02em',
        }}>
          {title}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
          color: accent || 'var(--mt-muted)',
        }}>
          {checked.size}/{items.length}
        </span>
      </div>
      <div className="mt-checklist">
        {items.map(item => (
          <div
            key={item.id}
            className={`mt-checklist-item ${checked.has(item.id) ? 'checked' : ''}`}
          >
            <input
              type="checkbox"
              id={item.id}
              checked={checked.has(item.id)}
              onChange={() => toggle(item.id)}
            />
            <label htmlFor={item.id}>{item.text}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
