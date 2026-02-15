'use client';

import { useEffect, useState } from 'react';

interface OdometerProps {
  target: number;
  duration?: number;
  delay?: number;
  label?: string;
  labelHref?: string;
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function formatNumber(num: number) {
  return Math.floor(num).toLocaleString('en-US');
}

export default function Odometer({ target, duration = 3000, delay = 500, label, labelHref }: OdometerProps) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = Date.now();

      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        setDisplay(formatNumber(target * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplay(formatNumber(target));
        }
      }

      animate();
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return (
    <div className="volume-counter">
      <div className="volume-display">
        ${display}
      </div>
      {label && (
        labelHref ? (
          <a href={labelHref} target="_blank" rel="noopener noreferrer" className="volume-label">
            {label}
          </a>
        ) : (
          <span className="volume-label">{label}</span>
        )
      )}
    </div>
  );
}
