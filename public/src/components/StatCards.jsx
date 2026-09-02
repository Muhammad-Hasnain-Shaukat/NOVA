import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CountUp } from './CountUp';
import { BEAT, cardIn } from '../lib/motion';

export function StatCards() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="stat-cards-row">
      {/* Card 1: Translucent Atelier Valuation */}
      <motion.div
        className="stat-card"
        variants={cardIn}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="show"
        custom={BEAT.cards}
      >
        <div className="stat-card__label-row">
          <span className="stat-card__bullet" />
          <span className="stat-card__label">Atelier Valuation</span>
        </div>
        <div className="stat-card__val">
          <CountUp target={18} suffix="M+" delay={BEAT.cards + 0.25} />
        </div>
      </motion.div>

      {/* Card 2: Solid Light Client Retention */}
      <motion.div
        className="stat-card stat-card--solid"
        variants={cardIn}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="show"
        custom={BEAT.cards + 0.1}
      >
        <div className="stat-card__label-row">
          <span className="stat-card__label">Client Retention</span>
        </div>
        <div className="stat-card__val">
          <CountUp target={98} suffix="%" delay={BEAT.cards + 0.1 + 0.25} />
        </div>
      </motion.div>
    </div>
  );
}
