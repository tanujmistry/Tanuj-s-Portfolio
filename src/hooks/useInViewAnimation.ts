import { useEffect, useState, useRef, type RefObject } from 'react';

interface UseInViewAnimationOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * High-performance viewport visibility hook for Canvas rendering loops.
 * Automatically suspends heavy rAF loops when elements are offscreen,
 * waking them up seamlessly with a generous rootMargin before entering the viewport.
 */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewAnimationOptions = {}
): [RefObject<T | null>, boolean] {
  const { rootMargin = '250px 0px 250px 0px', threshold = 0 } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState<boolean>(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return [ref, isInView];
}
