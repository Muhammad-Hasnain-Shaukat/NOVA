import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BEAT, cardIn } from '../lib/motion';

export function PartnerCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="partner-card"
      variants={cardIn}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="show"
      custom={BEAT.cards + 0.18}
    >
      {/* Header with Title and Arrow Badge */}
      <div className="partner-card__header">
        <h3 className="partner-card__title">
          Your Partner in<br />Global Runway
        </h3>
        <div className="partner-card__badge" aria-hidden="true">
          <svg
            className="partner-card__badge-svg"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Body Text */}
      <p className="partner-card__body">
        Haute couture design systems built to hold up under real product pressure — documented, tokenised, and ready to deploy.
      </p>

      {/* Footer with Overlapping Avatars & Patrons Stat */}
      <div className="partner-card__footer">
        <div className="partner-card__avatars" aria-hidden="true">
          <div className="partner-card__avatar" />
          <div className="partner-card__avatar" />
          <div className="partner-card__avatar" />
        </div>
        <div className="partner-card__meta">
          <div className="partner-card__count">5000+</div>
          <div className="partner-card__label">Global Patrons</div>
        </div>
      </div>
    </motion.div>
  );
}
