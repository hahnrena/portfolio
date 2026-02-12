// src/components/CursorDot.jsx
// Custom cursor dot with smooth follow; shadow on hover over interactive elements.

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Dot = styled.div.attrs(({ $x, $y }) => ({
  style: {
    transform: `translate3d(${$x}px, ${$y}px, 0)`,
  },
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.rustOchre};
  pointer-events: none;
  mix-blend-mode: multiply;
  z-index: ${({ theme }) => theme.zIndex.cursor};
  transition: box-shadow 160ms ease-out;
  box-shadow: ${({ $active }) =>
    $active ? '0 0 0 12px rgba(197, 116, 87, 0.2)' : 'none'};
`;

export default function CursorDot() {
  const [pos, setPos] = useState({ x: -50, y: -50 });
  const [targetPos, setTargetPos] = useState({ x: -50, y: -50 });
  const [active, setActive] = useState(false);
  const requestRef = useRef(null);

  useEffect(() => {
    const handleMove = (event) => {
      setTargetPos({ x: event.clientX, y: event.clientY });

      const interactive = event.target.closest(
        'a, button, [data-hoverable="true"]',
      );
      setActive(Boolean(interactive));
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      setPos((current) => {
        const x = lerp(current.x, targetPos.x, 0.18);
        const y = lerp(current.y, targetPos.y, 0.18);
        return { x, y };
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [targetPos.x, targetPos.y]);

  return <Dot $x={pos.x} $y={pos.y} $active={active} />;
}

