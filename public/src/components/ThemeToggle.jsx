import React from 'react';
import { motion } from 'framer-motion';
import { EASE_EXPO } from '../lib/motion';

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-switch-btn"
      id="theme-toggle-btn"
      onClick={onToggle}
      aria-label="Toggle Light and Dark Mode"
      title="Toggle Theme (Cmd/Ctrl + J)"
    >
      <motion.div
        className="theme-switch-pill"
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
      
      {/* Sun Icon Symbol */}
      <div className={`theme-option light-opt ${!isDark ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.5" />
          <line x1="12" y1="1.5" x2="12" y2="3.5" />
          <line x1="12" y1="20.5" x2="12" y2="22.5" />
          <line x1="4.5" y1="4.5" x2="6" y2="6" />
          <line x1="18" y1="18" x2="19.5" y2="19.5" />
          <line x1="1.5" y1="12" x2="3.5" y2="12" />
          <line x1="20.5" y1="12" x2="22.5" y2="12" />
          <line x1="4.5" y1="19.5" x2="6" y2="18" />
          <line x1="18" y1="6" x2="19.5" y2="4.5" />
        </svg>
      </div>

      {/* Moon Icon Symbol */}
      <div className={`theme-option dark-opt ${isDark ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  );
}
