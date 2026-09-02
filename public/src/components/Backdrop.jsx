import React from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';

export function Backdrop({ pointerX, pointerY }) {
  const shouldReduceMotion = useReducedMotion();

  // Parallax transforms for plate & glow orbs
  const plateX = useTransform(pointerX, [-1, 1], shouldReduceMotion ? [0, 0] : [14, -14]);
  const plateY = useTransform(pointerY, [-1, 1], shouldReduceMotion ? [0, 0] : [10, -10]);

  const warmX = useTransform(pointerX, [-1, 1], shouldReduceMotion ? [0, 0] : [26, -26]);
  const warmY = useTransform(pointerY, [-1, 1], shouldReduceMotion ? [0, 0] : [18, -18]);

  const roseX = useTransform(pointerX, [-1, 1], shouldReduceMotion ? [0, 0] : [-30, 30]);
  const roseY = useTransform(pointerY, [-1, 1], shouldReduceMotion ? [0, 0] : [-16, 16]);

  const haloX = useTransform(pointerX, [-1, 1], shouldReduceMotion ? [0, 0] : [14, -14]);

  return (
    <div className="backdrop" aria-hidden="true">
      {/* 1. Gradient floor */}
      <div className="backdrop__floor" />

      {/* 2. Photographic plate */}
      <motion.div
        className="backdrop__plate"
        style={{ x: plateX, y: plateY }}
      />

      {/* 3. Three blurred glow orbs */}
      <motion.div
        className="glow glow--warm"
        style={{ x: warmX, y: warmY }}
      />
      <motion.div
        className="glow glow--rose"
        style={{ x: roseX, y: roseY }}
      />
      <motion.div
        className="glow glow--halo"
        style={{ x: haloX }}
      />

      {/* 4. Rim light */}
      <div className="backdrop__rim" />

      {/* 5. Vignette */}
      <div className="backdrop__vignette" />

      {/* 6. Grain flicker */}
      <div className="backdrop__grain" />
    </div>
  );
}
