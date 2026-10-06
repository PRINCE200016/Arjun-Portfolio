'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const ring = ringRef.current;
    if (!ring) return;

    // Smooth, responsive follower without dragging latency
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let rafId: number;
    let isRunning = true;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseDown = () => ring.classList.add('clicking');
    const onMouseUp = () => ring.classList.remove('clicking');

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.closest('a, button, [role="button"], input, textarea, select')) {
        ring.classList.add('hovering');
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.closest('a, button, [role="button"], input, textarea, select')) {
        ring.classList.remove('hovering');
      }
    };

    // Snappy, silky-smooth lerp (0.24 factor)
    const animate = () => {
      if (!isRunning) return;
      ringX += (mouseX - ringX) * 0.24;
      ringY += (mouseY - ringY) * 0.24;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={ringRef}
      className="cursor-ring"
      style={{ willChange: 'transform', pointerEvents: 'none' }}
    />
  );
}
