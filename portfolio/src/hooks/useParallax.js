// src/hooks/useParallax.js
// Reusable parallax scroll hook.
// Usage: const offset = useParallax(0.25);

import { useEffect, useState } from 'react';

export default function useParallax(multiplier = 0.25) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setOffset(-y * multiplier);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [multiplier]);

  return offset;
}

