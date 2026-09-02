/**
 * NOVA LUXURY WEB APP - V2 MAIN CONTROLLER
 * Kinetic typography, city clocks, cursor spotlight, filters & modals
 */

class NovaApplication {
  constructor() {
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.selectedProductForModal = null;
    this.selectedSizeForModal = 'M';
    this.selectedColorForModal = null;
    
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.bootstrap());
    } else {
      this.bootstrap();
    }
  }

  bootstrap() {
    this.renderProducts();
    this.initDualitySlider();
    this.initMidnightCountdown();
    this.initCityClocks();
    this.initCursorSpotlight();
    this.bindAppEvents();
    
    // Listen for theme changes to adapt product images/badges smoothly
    window.addEventListener('novaThemeChanged', (e) => {
      this.renderProducts();
    });
  }

  initCityClocks() {
    const updateClocks = () => {
      const now = new Date();
      
      const formatTime = (timeZone) => {
        try {
          return new Intl.DateTimeFormat('en-US', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }).format(now);
        } catch (e) {
          return '12:00';
        }
      };

      const parisEl = document.getElementById('clock-paris');
      const tokyoEl = document.getElementById('clock-tokyo');
      const nyEl = document.getElementById('clock-ny');

      if (parisEl) parisEl.textContent = formatTime('Europe/Paris');
      if (tokyoEl) tokyoEl.textContent = formatTime('Asia/Tokyo');
      if (nyEl) nyEl.textContent = formatTime('America/New_York');
    };

    updateClocks();
    setInterval(updateClocks, 1000);
  }

  initCursorSpotlight() {
    const spotlight = document.querySelector('.cursor-spotlight');
    if (!spotlight) return;

    window.addEventListener('mousemove', (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    });
  }

  bindAppEvents() {
    // Category Filter Tabs
    const catTabs = document.querySelectorAll('.cat-tab-btn');
    catTabs.forEach(btn => {
      btn.addEventListener('click', (e) => {
        catTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.getAttribute('data-cat') || 'all';
        this.renderProducts();
      });
    });

    // Search Input
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderProducts();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.renderProducts();
      });
    }

    // Modal Close
    const modalCloseBtn = document.getElementById('product-modal-close');
    const modalOverlay = document.getElementById('product-modal-overlay');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => this.closeProductModal());
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) this.closeProductModal();
      });
    }

    // Checkout Modal Close
    const checkoutCloseBtn = document.getElementById('checkout-modal-close');
    const checkoutOverlay = document.getElementById('checkout-modal');
    if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', () => {
      if (window.novaCart) window.novaCart.closeCheckoutModal();
    });
    if (checkoutOverlay) {
      checkoutOverlay.addEventListener('click', (e) => {
        if (e.target === checkoutOverlay) {
          if (window.novaCart) window.novaCart.closeCheckoutModal();
        }
      });
    }

    // Checkout Form Submission & Simulation
    const checkoutForm = document.getElementById('checkout-payment-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processSimulatedCheckout();
      });
    }

    // Direct Apple Pay Button
    const applePayBtn = document.getElementById('btn-apple-pay');
    if (applePayBtn) {
      applePayBtn.addEventListener('click', () => {
        this.processSimulatedCheckout('Apple Pay (Biometric Verified)');
      });
    }

    // Order Success Modal Close
    const orderSuccessClose = document.getElementById('order-success-close');
    if (orderSuccessClose) {
      orderSuccessClose.addEventListener('click', () => {
        const modal = document.getElementById('order-success-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Modal Add To Bag
    const modalAddBtn = document.getElementById('modal-add-to-bag-btn');
    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', () => {
        if (this.selectedProductForModal && window.novaCart) {
          window.novaCart.addItem(this.selectedProductForModal, this.selectedSizeForModal, this.selectedColorForModal);
          this.closeProductModal();
        }
      });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter-email');
        if (emailInput && emailInput.value) {
          this.showToast('AUTHENTICATED: WELCOME TO THE NOVA PRIVATE CIRCLE');
          emailInput.value = '';
        }
      });
    }
  }

  renderProducts() {
    const grid = document.getElementById('product-grid-container');
    if (!grid || !window.NOVA_PRODUCTS) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Filter
    let filtered = window.NOVA_PRODUCTS.filter(item => {
      const matchCat = this.currentCategory === 'all' || item.category === this.currentCategory;
      const matchSearch = !this.searchQuery || 
        item.title.toLowerCase().includes(this.searchQuery) ||
        item.categoryLabel.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    // Sort
    if (this.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'stock-asc') {
      filtered.sort((a, b) => a.stockRemaining - b.stockRemaining);
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 5rem 1rem; color: var(--foreground-muted);">
          <p style="font-size: 1.25rem; font-weight: 700; text-transform: uppercase;">No archive pieces found matching "${this.searchQuery}"</p>
          <p style="font-size: 0.95rem; margin-top: 0.5rem;">Try selecting a different atelier category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const badge = isDark ? item.badgeDark : item.badgeLight;
      const displayImage = isDark && item.images.dark ? item.images.dark : item.images.light;
      const formattedPrice = window.novaCart ? window.novaCart.formatPrice(item.price) : `$${item.price}`;

      return `
        <div class="product-card" data-id="${item.id}">
          <div class="card-image-wrap" onclick="window.NovaApp.openProductModal('${item.id}')">
            <img src="${displayImage}" alt="${item.title}" class="card-img" loading="lazy">
            <div class="card-badge">${badge}</div>
            <div class="card-drop-badge">${item.stockRemaining} LEFT</div>
            
            <div class="card-quick-actions" onclick="event.stopPropagation()">
              <button class="btn-card-action" onclick="window.NovaApp.openProductModal('${item.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                Inspect
              </button>
              <button class="btn-card-action" onclick="window.NovaApp.quickAddToCart('${item.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                </svg>
                Quick Add
              </button>
            </div>
          </div>

          <div class="card-body">
            <span class="card-category">${item.categoryLabel}</span>
            <h3 class="card-title" onclick="window.NovaApp.openProductModal('${item.id}')" style="cursor:pointer;">${item.title}</h3>
            <p class="card-specs">${item.specs.origin} • ${item.specs.fabric.split('(')[0]}</p>
            
            <div class="card-footer">
              <span class="card-price">${formattedPrice}</span>
              <div class="card-color-swatches">
                ${item.colors.map((c, i) => `
                  <span class="swatch-dot ${i === 0 ? 'active' : ''}" style="background-color: ${c};" title="Color variation"></span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  quickAddToCart(productId) {
    const product = window.NOVA_PRODUCTS.find(p => p.id === productId);
    if (product && window.novaCart) {
      window.novaCart.addItem(product, product.sizes[0] || 'M');
    }
  }

  openProductModal(productId) {
    const product = window.NOVA_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    this.selectedProductForModal = product;
    this.selectedSizeForModal = product.sizes[0] || 'M';
    this.selectedColorForModal = product.colors[0] || '#111111';

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const activeImage = isDark && product.images.dark ? product.images.dark : product.images.light;

    const modalTitle = document.getElementById('modal-product-title');
    const modalCategory = document.getElementById('modal-product-category');
    const modalPrice = document.getElementById('modal-product-price');
    const modalDesc = document.getElementById('modal-product-description');
    const modalMainImg = document.getElementById('modal-main-image');
    const modalThumbs = document.getElementById('modal-thumbs-container');
    const modalBadge = document.getElementById('modal-badge-label');
    const modalStock = document.getElementById('modal-stock-label');
    const modalSpecs = document.getElementById('modal-specs-container');
    const modalSizes = document.getElementById('modal-sizes-container');

    if (modalTitle) modalTitle.textContent = product.title;
    if (modalCategory) modalCategory.textContent = product.categoryLabel;
    if (modalPrice) modalPrice.textContent = window.novaCart ? window.novaCart.formatPrice(product.price) : `$${product.price}`;
    if (modalDesc) modalDesc.textContent = product.description;
    if (modalMainImg) modalMainImg.src = activeImage;
    if (modalBadge) modalBadge.textContent = isDark ? product.badgeDark : product.badgeLight;
    if (modalStock) modalStock.textContent = `${product.dropStatus} • ${product.stockRemaining} units available`;

    if (modalSpecs) {
      modalSpecs.innerHTML = Object.entries(product.specs).map(([key, val]) => `
        <div class="spec-item">
          <span class="spec-label">${key.toUpperCase()}</span>
          <span class="spec-val">${val}</span>
        </div>
      `).join('');
    }

    if (modalThumbs && product.images.gallery) {
      modalThumbs.innerHTML = product.images.gallery.map((img, idx) => `
        <div class="modal-thumb ${idx === 0 ? 'active' : ''}" onclick="window.NovaApp.switchModalImage('${img}', this)">
          <img src="${img}" alt="${product.title}">
        </div>
      `).join('');
    }

    if (modalSizes) {
      modalSizes.innerHTML = product.sizes.map((s, idx) => `
        <button class="size-btn ${idx === 0 ? 'active' : ''}" onclick="window.NovaApp.selectModalSize('${s}', this)">
          ${s}
        </button>
      `).join('');
    }

    const overlay = document.getElementById('product-modal-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  switchModalImage(imgUrl, thumbEl) {
    const mainImg = document.getElementById('modal-main-image');
    if (mainImg) mainImg.src = imgUrl;

    document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
  }

  selectModalSize(size, btnEl) {
    this.selectedSizeForModal = size;
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  }

  closeProductModal() {
    const overlay = document.getElementById('product-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  initDualitySlider() {
    const box = document.getElementById('duality-box');
    const leftSide = document.getElementById('duality-left');
    const handle = document.getElementById('duality-handle');

    if (!box || !leftSide || !handle) return;

    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = box.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 50) offsetX = 50;
      if (offsetX > rect.width - 50) offsetX = rect.width - 50;

      const percentage = (offsetX / rect.width) * 100;
      leftSide.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (isDragging) setPosition(e.clientX);
    });

    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) setPosition(e.touches[0].clientX);
    });
  }

  initMidnightCountdown() {
    const updateCountdown = () => {
      const hoursEl = document.getElementById('cd-hours');
      const minsEl = document.getElementById('cd-mins');
      const secsEl = document.getElementById('cd-secs');

      const now = new Date();
      const target = new Date();
      target.setHours(24, 0, 0, 0);

      let diff = Math.max(0, Math.floor((target - now) / 1000));
      const hours = Math.floor(diff / 3600);
      diff %= 3600;
      const mins = Math.floor(diff / 60);
      const secs = diff % 60;

      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  processSimulatedCheckout(paymentMethod = 'Concierge Black Card') {
    if (window.novaCart) window.novaCart.closeCheckoutModal();

    const orderNum = 'NOVA-' + Math.floor(100000 + Math.random() * 900000);
    const orderTotal = window.novaCart ? window.novaCart.formatPrice(window.novaCart.getSubtotal() * (1 - (window.novaCart.discountPercent || 0))) : '$1,850.00';

    const orderNumEl = document.getElementById('order-confirm-num');
    const orderTotalEl = document.getElementById('order-confirm-total');
    const orderMethodEl = document.getElementById('order-confirm-method');

    if (orderNumEl) orderNumEl.textContent = orderNum;
    if (orderTotalEl) orderTotalEl.textContent = orderTotal;
    if (orderMethodEl) orderMethodEl.textContent = paymentMethod;

    const successModal = document.getElementById('order-success-modal');
    if (successModal) {
      successModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    if (window.novaCart) {
      window.novaCart.items = [];
      window.novaCart.saveCart();
    }

    this.showToast('TRANSACTION AUTHORIZED • NFC SEAL ISSUED');
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
}

window.NovaApp = new NovaApplication();
