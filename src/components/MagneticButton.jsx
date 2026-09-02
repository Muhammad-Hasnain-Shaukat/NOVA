import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export function MagneticButton({ children, className = '', variant = '', href, onClick, ...props }) {
  const btnRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.5 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.5 });

  const handlePointerMove = (e) => {
    if (shouldReduceMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const dy = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    rawX.set(dx * 8);
    rawY.set(dy * 8 * 0.6);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={btnRef}
      href={href}
      onClick={onClick}
      className={`btn-magnetic ${variant ? `btn-magnetic--${variant}` : ''} ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onBlur={handlePointerLeave}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      {...props}
    >
      <span className="btn-magnetic__text">{children}</span>
    </Component>
  );
}
