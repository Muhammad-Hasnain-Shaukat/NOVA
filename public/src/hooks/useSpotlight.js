import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * useSpotlight
 * Window-level hit-testing and spring-smoothed spotlight mask positioning for the two-exposure subject reveal.
 */
export function useSpotlight(containerRef) {
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawOpen = useMotionValue(0);

  const springXY = { stiffness: 260, damping: 30, mass: 0.4 };
  const springOpen = { stiffness: 170, damping: 26, mass: 0.5 };

  const x = useSpring(rawX, springXY);
  const y = useSpring(rawY, springXY);
  const open = useSpring(rawOpen, springOpen);

  const frameRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      rawOpen.set(0);
      return;
    }

    const mediaFine = window.matchMedia('(pointer: fine)');
    if (!mediaFine.matches) return;

    const handlePointerMove = (e) => {
      if (frameRef.current) return;

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;

        const isInside =
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;

        if (isInside) {
          // Convert into element's layout space
          const localX = (clientX - rect.left) * (el.offsetWidth / (rect.width || 1));
          const localY = (clientY - rect.top) * (el.offsetHeight / (rect.height || 1));

          if (!wasOpenRef.current) {
            // Jump instantly on first entry
            if (rawX.jump) {
              rawX.jump(localX);
              rawY.jump(localY);
            } else {
              rawX.set(localX);
              rawY.set(localY);
              x.set(localX);
              y.set(localY);
            }
            wasOpenRef.current = true;
          } else {
            rawX.set(localX);
            rawY.set(localY);
          }
          rawOpen.set(1);
        } else {
          if (wasOpenRef.current) {
            wasOpenRef.current = false;
            rawOpen.set(0);
          }
        }
      });
    };

    const handlePointerLeave = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      wasOpenRef.current = false;
      rawOpen.set(0);
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
  }, [containerRef, shouldReduceMotion, rawX, rawY, rawOpen, x, y]);

  return { x, y, open };
}
