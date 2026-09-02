import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BEAT, EASE_EXPO } from '../lib/motion';

export function StudioIntro() {
  const shouldReduceMotion = useReducedMotion();

  const lineVariants = {
    hidden: { y: '112%' },
    visible: (i) => ({
      y: '0%',
      transition: {
        duration: 1.05,
        delay: BEAT.studio + i * 0.1,
        ease: EASE_EXPO
      }
    })
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay,
        ease: EASE_EXPO
      }
    })
  };

  return (
    <div className="studio-block">
      <h2 className="studio-title">
        <span className="studio-line">
          <motion.span
            className="studio-line__inner"
            custom={0}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={lineVariants}
          >
            NOVA
          </motion.span>
        </span>
        <span className="studio-line">
          <motion.span
            className="studio-line__inner"
            custom={1}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={lineVariants}
          >
            STUDIO
          </motion.span>
        </span>
      </h2>

      <motion.p
        className="studio-body"
        custom={BEAT.studio + 0.26}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeUpVariants}
      >
        Where high fashion meets <strong>technical urban discipline</strong>.
      </motion.p>
    </div>
  );
}
