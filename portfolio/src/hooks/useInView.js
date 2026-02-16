// src/hooks/useInView.js
// Intersection Observer hook for scroll-triggered reveals.

import { useEffect, useRef, useState } from 'react';

export default function useInView(options = { threshold: 0.2, rootMargin: '0px' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.2,
        rootMargin: options.rootMargin ?? '0px',
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, inView };
}

