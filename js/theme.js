/**
 * NOVA LUXURY THEME CONTROLLER
 * Manages Light/Dark transitions, default Light state, LocalStorage,
 * and Web Audio API haptic feedback.
 */

class ThemeController {
  constructor() {
    this.STORAGE_KEY = 'nova_luxury_theme_preference';
    this.DEFAULT_THEME = 'light'; // Light Mode as default first experience
    this.currentTheme = this.getInitialTheme();
    this.audioCtx = null;
    
    this.init();
  }

  getInitialTheme() {
    try {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (e) {
      console.warn('LocalStorage unavailable for theme storage', e);
    }
    // Strict requirement: The default first experience MUST be LIGHT MODE
    return this.DEFAULT_THEME;
  }

  init() {
    // Apply theme immediately to document root
    this.applyTheme(this.currentTheme, false);
    
    // Bind UI toggles once DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.bindEvents());
    } else {
      this.bindEvents();
    }
  }

  bindEvents() {
    const toggleBtns = document.querySelectorAll('.theme-switch-btn, [data-action="toggle-theme"]');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    });

    // Keyboard shortcut: Cmd/Ctrl + J for rapid theme preview
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  playHapticAudio(theme) {
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }

      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;

      if (theme === 'dark') {
        // Deep subterranean tech pulse for Midnight Drop
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else {
        // Crisp champagne crystalline chime for Haute Couture Showroom
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (err) {
      // Audio context error fails silently
    }
  }

  applyTheme(theme, playSound = true) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = `theme-${theme}`;

    // Update meta theme-color for mobile address bars
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#050505' : '#FAF9F6');
    }

    // Persist to storage
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (e) {}

    if (playSound) {
      this.playHapticAudio(theme);
    }

    // Dispatch global custom event for components to adapt
    window.dispatchEvent(new CustomEvent('novaThemeChanged', {
      detail: { theme: theme }
    }));
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme, true);

    if (window.NovaApp && typeof window.NovaApp.showToast === 'function') {
      const modeName = nextTheme === 'dark' ? 'MIDNIGHT STREETWEAR MODE ACTIVATED' : 'LUXURY SHOWROOM MODE ACTIVATED';
      window.NovaApp.showToast(modeName);
    }
  }
}

// Instantiate globally
window.novaTheme = new ThemeController();
