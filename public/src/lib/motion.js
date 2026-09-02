/**
 * FATHOM MOTION SYSTEM
 * Shared easing curves, choreography BEAT timing table, and Framer Motion variants
 */

export const EASE_EXPO = [0.16, 1, 0.3, 1];
export const EASE_SOFT = [0.22, 0.61, 0.36, 1];

export const BEAT = {
  nav: 0.1,
  subject: 0.28,
  headline: 0.32,
  studio: 0.42,
  word: 0.5,
  cards: 0.9
};

export const lineVariants = {
  hidden: { y: '112%' },
  show: (delay = 0) => ({
    y: '0%',
    transition: {
      duration: 1.05,
      ease: EASE_EXPO,
      delay
    }
  })
};

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE_EXPO,
      delay
    }
  })
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: EASE_SOFT,
      delay
    }
  })
};

export const cardIn = {
  hidden: { opacity: 0, y: 34, scale: 0.97 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: EASE_EXPO,
      delay
    }
  })
};
