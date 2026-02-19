'use client';

import { useEffect } from 'react';

export function RootsBodyClass() {
  useEffect(() => {
    document.body.classList.add('roots-active');
    return () => document.body.classList.remove('roots-active');
  }, []);
  return null;
}
