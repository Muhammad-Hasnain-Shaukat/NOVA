import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { BEAT, EASE_EXPO } from '../lib/motion';

const NAV_LINKS = ['Atelier', 'Collections', 'The Duality', 'Archives'];

export function Navbar({ currentTheme = 'light', onToggleTheme }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      className="navbar"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: BEAT.nav,
        ease: EASE_EXPO
      }}
    >
      {/* NOVA Monogram & Wordmark Brand */}
      <a href="#top" className="nav__brand" aria-label="NOVA — Haute Couture & Creative Studio">
        <div className="nav__monogram">N</div>
        <span className="nav__brand-text">NOVA</span>
      </a>

      {/* Nav Links, Theme Switcher & CTA */}
      <div className="nav__center-right">
        <nav aria-label="Main Navigation">
          <ul className="nav__links">
            {NAV_LINKS.map((link, idx) => (
              <motion.li
                key={link}
                initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: BEAT.nav + 0.08 + idx * 0.06,
                  ease: EASE_EXPO
                }}
              >
                <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="nav__link">
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* NOVA DUAL-THEME SWITCHER */}
        <button
          className="theme-switch-btn"
          onClick={onToggleTheme}
          aria-label="Toggle Luxury Light and Midnight Dark Modes"
          title="Switch Theme (Cmd/Ctrl + J)"
        >
          <div className="theme-switch-pill" />
          <div className="theme-option light-opt">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
            </svg>
            <span>Light</span>
          </div>
          <div className="theme-option dark-opt">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <span>Dark</span>
          </div>
        </button>

        <MagneticButton href="#connect">
          Lets Connect
        </MagneticButton>
      </div>

      {/* Mobile Menu Toggle (<900px) */}
      <button
        className="nav__mobile-toggle"
        aria-label="Open mobile navigation menu"
        onClick={() => {}}
      >
        <span className="nav__mobile-hamburger" />
      </button>
    </motion.header>
  );
}
