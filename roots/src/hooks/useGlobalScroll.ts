import { useEffect, useState } from 'react';

/**
 * Maps the page scroll position to a global 0–1 progress value.
 * 0 = top of page, 1 = bottom of page.
 */
export function useGlobalScroll(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.max(0, Math.min(1, window.scrollY / total)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}
