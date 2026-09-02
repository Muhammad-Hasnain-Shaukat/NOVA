import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * usePointerParallax
 * Normalised window-level pointer signal (-1 to 1) spring-smoothed for parallax planes.
 */
export function usePointerParallax() {
  const shouldReduceMotion = useReducedMotion();
  
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 55, damping: 20, mass: 0.6 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const frameRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Only enable for fine pointers (mouse / precision trackpad)
    const mediaFine = window.matchMedia('(pointer: fine)');
    if (!mediaFine.matches) return;

    const handlePointerMove = (e) => {
      if (frameRef.current) return; // rAF-throttled: one pending frame at a time

      frameRef.current = requestAnimationFrame(() => {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;
        rawX.set(normX);
        rawY.set(normY);
        frameRef.current = null;
      });
    };

    const handlePointerLeave = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [shouldReduceMotion, rawX, rawY]);

  return { x, y };
}
