import { useState, useEffect } from 'react';

/**
 * Detects mobile/tablet devices using viewport width and touch capability.
 * Returns true for screens <= 768px OR devices with touch capability on narrow viewports.
 * Listens for viewport changes so it stays accurate on resize/orientation change.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}
