import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { BEAT, EASE_EXPO } from '../lib/motion';

export function Headline() {
  const shouldReduceMotion = useReducedMotion();

  const lineVariants = {
    hidden: { y: '112%' },
    visible: (i) => ({
      y: '0%',
      transition: {
        duration: 1.05,
        delay: BEAT.headline + i * 0.09,
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
    <div className="headline-block">
      {/* Editorial Tag */}
      <motion.div
        className="headline-tag"
        custom={BEAT.badge}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeUpVariants}
      >
        <span className="headline-tag-dot" />
        <span>FW26 // TOKYO</span>
      </motion.div>

      {/* Minimal Architectural Streetwear Heading */}
      <h1 className="headline-title">
        <span className="headline-line">
          <motion.span
            className="headline-line__inner"
            custom={0}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={lineVariants}
          >
            ARCHITECTURAL
          </motion.span>
        </span>
        <span className="headline-line">
          <motion.span
            className="headline-line__inner"
            custom={1}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={lineVariants}
          >
            STREETWEAR
          </motion.span>
        </span>
      </h1>

      {/* Minimal Punchy Editorial Body */}
      <motion.p
        className="headline-body"
        custom={BEAT.headline + 0.24}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeUpVariants}
      >
        Precision utility engineered for the <strong>avant-garde movement</strong>.
      </motion.p>

      {/* Explore Collection Magnetic Button */}
      <motion.div
        className="headline-cta-wrap"
        custom={BEAT.cta}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeUpVariants}
      >
        <MagneticButton href="#streetwear" size="sm">
          Explore Collection
        </MagneticButton>
      </motion.div>
    </div>
  );
}
