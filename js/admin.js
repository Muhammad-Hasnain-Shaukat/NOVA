/**
 * NOVA ATELIER BACKSTAGE & BRAND DIRECTOR CONTROLLER
 * Live telemetry, theme usage analytics, drop stock velocity, and concierge log.
 */

class AdminController {
  constructor() {
    this.isActive = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.startLiveTelemetry();
  }

  bindEvents() {
    const adminToggleBtn = document.getElementById('admin-view-toggle');
    if (adminToggleBtn) {
      adminToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleAdminView();
      });
    }

    const closeAdminBtn = document.getElementById('admin-close-btn');
    if (closeAdminBtn) {
      closeAdminBtn.addEventListener('click', () => {
        this.toggleAdminView(false);
      });
    }
  }

  toggleAdminView(forceState = null) {
    this.isActive = forceState !== null ? forceState : !this.isActive;
    const adminSection = document.getElementById('admin-dashboard-section');
    const adminBtn = document.getElementById('admin-view-toggle');

    if (adminSection) {
      if (this.isActive) {
        adminSection.classList.add('active');
        adminSection.scrollIntoView({ behavior: 'smooth' });
        if (adminBtn) adminBtn.style.color = 'var(--accent)';
        if (window.NovaApp) window.NovaApp.showToast('ATELIER BACKSTAGE DIRECTOR VIEW OPENED');
      } else {
        adminSection.classList.remove('active');
        if (adminBtn) adminBtn.style.color = '';
      }
    }
  }

  startLiveTelemetry() {
    // Subtle realistic live increments
    setInterval(() => {
      const revenueEl = document.getElementById('admin-live-revenue');
      if (revenueEl && this.isActive) {
        const current = parseFloat(revenueEl.getAttribute('data-raw') || '148920');
        const increment = (Math.random() * 450).toFixed(2);
        const nextVal = current + parseFloat(increment);
        revenueEl.setAttribute('data-raw', nextVal.toString());
        revenueEl.textContent = `$${nextVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    }, 4500);
  }
}

window.novaAdmin = new AdminController();
