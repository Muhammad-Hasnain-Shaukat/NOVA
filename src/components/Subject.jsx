import React, { useRef, useState } from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import { useSpotlight } from '../hooks/useSpotlight';
import { BEAT, EASE_EXPO } from '../lib/motion';

const SPOT_RADIUS = 160;

export function Subject({ pointerX, pointerY }) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const [plainLoaded, setPlainLoaded] = useState(false);
  const [maskedLoaded, setMaskedLoaded] = useState(false);
  const bothLoaded = plainLoaded && maskedLoaded;

  // Spotlight mask tracking
  const { x: spotX, y: spotY, open: spotOpen } = useSpotlight(containerRef);

  // Animated mask style
  const maskImage = useTransform(
    [spotX, spotY, spotOpen],
    ([sx, sy, op]) => {
      if (shouldReduceMotion || op <= 0.001) {
        return 'none';
      }
      const radius = op * SPOT_RADIUS;
      return `radial-gradient(circle ${radius}px at ${sx}px ${sy}px, transparent 0%, transparent 40%, #000 100%)`;
    }
  );

  // Parallax transforms for subject plane
  const subX = useTransform(pointerX, [-1, 1], shouldReduceMotion ? [0, 0] : [-22, 22]);
  const subY = useTransform(pointerY, [-1, 1], shouldReduceMotion ? [0, 0] : [-12, 12]);

  return (
    <div className="subject" ref={containerRef} aria-hidden="true">
      <motion.div
        className="subject__inner"
        style={{ x: subX, y: subY }}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 46, scale: 1.05 }}
        animate={bothLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
        transition={{
          duration: 1.5,
          delay: BEAT.subject,
          ease: EASE_EXPO
        }}
      >
        <div className="subject__stack">
          {/* Bottom layer: transparent male streetwear model */}
          <img
            src="assets/male-plain.png"
            alt="NOVA Streetwear Model"
            className="subject__plain"
            onLoad={() => setPlainLoaded(true)}
          />

          {/* Top layer: cyber visor spotlight masked layer */}
          <motion.img
            src="assets/male-masked.png"
            alt="NOVA Cyber Visor Masked"
            className="subject__masked"
            style={{
              maskImage: maskImage,
              WebkitMaskImage: maskImage
            }}
            onLoad={() => setMaskedLoaded(true)}
          />
        </div>
      </motion.div>
    </div>
  );
}
