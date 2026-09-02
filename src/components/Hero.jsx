import React, { useState } from 'react';
import { usePointerParallax } from '../hooks/usePointerParallax';
import { Backdrop } from './Backdrop';
import { WordMark } from './WordMark';
import { Subject } from './Subject';
import { Navbar } from './Navbar';
import { Headline } from './Headline';
import { StudioIntro } from './StudioIntro';
import { StatCards } from './StatCards';
import { PartnerCard } from './PartnerCard';

export function Hero() {
  const [theme, setTheme] = useState('light');
  const { x: pointerX, y: pointerY } = usePointerParallax();

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <section className="hero" id="top">
      {/* Z0 — Backdrop Plane */}
      <Backdrop pointerX={pointerX} pointerY={pointerY} />

      {/* Z1 — Giant Wordmark ("NOVA") */}
      <WordMark pointerX={pointerX} pointerY={pointerY} />

      {/* Z2 — Two-Exposure Spotlight Subject */}
      <Subject pointerX={pointerX} pointerY={pointerY} />

      {/* Z3 — Interface Shell (Fixed, No Parallax) */}
      <div className="shell">
        <Navbar currentTheme={theme} onToggleTheme={toggleTheme} />

        {/* Upper Row: 3-column [Headline] [empty] [StudioIntro] */}
        <div className="shell__row shell__row--upper">
          <Headline />
          <div aria-hidden="true" />
          <StudioIntro />
        </div>

        {/* Spacer pushing the lower row down */}
        <div className="shell__spacer" aria-hidden="true" />

        {/* Lower Row: 3-column [StatCards] [empty] [PartnerCard] */}
        <div className="shell__row shell__row--lower">
          <StatCards />
          <div aria-hidden="true" />
          <PartnerCard />
        </div>
      </div>
    </section>
  );
}
