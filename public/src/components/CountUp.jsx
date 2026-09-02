import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export function CountUp({ target, suffix = '', delay = 0, duration = 1.5 }) {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(shouldReduceMotion ? target : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    let animationFrame;
    let startTime;
    const delayMs = delay * 1000;

    const timeoutId = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing: [0.16, 1, 0.3, 1] approximation
        const ease = 1 - Math.pow(1 - progress, 3.5);
        const current = Math.floor(ease * target);
        setCount(current);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      animationFrame = requestAnimationFrame(step);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [target, delay, duration, shouldReduceMotion]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}
