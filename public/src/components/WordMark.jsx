import React from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import { BEAT, EASE_EXPO } from '../lib/motion';

export function WordMark({ pointerX, pointerY }) {
  const shouldReduceMotion = useReducedMotion();

  const wordX = useTransform(pointerX, [-1, 1], shouldReduceMotion ? [0, 0] : [12, -12]);
  const wordY = useTransform(pointerY, [-1, 1], shouldReduceMotion ? [0, 0] : [8, -8]);

  return (
    <motion.div
      className="wordmark"
      aria-hidden="true"
      style={{ x: wordX, y: wordY }}
    >
      {/* Left Group: N O */}
      <motion.div
        className="wordmark__group wordmark__group--left"
        initial={shouldReduceMotion ? false : {
          clipPath: 'inset(0% 0% 100% 0%)',
          y: '18%',
          scale: 1.04,
          filter: 'blur(14px)'
        }}
        animate={{
          clipPath: 'inset(0% 0% 0% 0%)',
          y: '0%',
          scale: 1,
          filter: 'blur(0px)'
        }}
        transition={{
          duration: 1.6,
          delay: BEAT.word,
          ease: EASE_EXPO
        }}
      >
        <span>N</span>
        <span>O</span>
      </motion.div>

      {/* Right Group: V A */}
      <motion.div
        className="wordmark__group wordmark__group--right"
        initial={shouldReduceMotion ? false : {
          clipPath: 'inset(0% 0% 100% 0%)',
          y: '18%',
          scale: 1.04,
          filter: 'blur(14px)'
        }}
        animate={{
          clipPath: 'inset(0% 0% 0% 0%)',
          y: '0%',
          scale: 1,
          filter: 'blur(0px)'
        }}
        transition={{
          duration: 1.6,
          delay: BEAT.word + 0.08,
          ease: EASE_EXPO
        }}
      >
        <span>V</span>
        <span>A</span>
      </motion.div>
    </motion.div>
  );
}
