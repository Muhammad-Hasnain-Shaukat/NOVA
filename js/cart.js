/**
 * NOVA SHOPPING BAG & CHECKOUT CONTROLLER
 * Reactive state management, promo codes, luxury drawer & checkout flow
 */

class CartController {
  constructor() {
    this.STORAGE_KEY = 'nova_luxury_cart';
    this.items = this.loadCart();
    this.currency = 'USD';
    this.currencyRates = {
      USD: { symbol: '$', rate: 1.0 },
      EUR: { symbol: '€', rate: 0.92 },
      GBP: { symbol: '£', rate: 0.78 },
      JPY: { symbol: '¥', rate: 155.0 }
    };
    this.discountPercent = 0;
    this.activePromoCode = null;
    
    this.init();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Seed with 1 runway item so the cart isn't empty on first glance!
    return [
      {
        id: 'nova-01',
        title: 'Atelier Double-Breasted Cashmere Coat',
        price: 1850,
        size: 'L',
        color: '#222222',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        qty: 1
      }
    ];
  }

  saveCart() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {}
    this.render();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Cart drawer open buttons
    document.querySelectorAll('[data-action="open-cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Cart drawer close buttons
    const closeBtn = document.getElementById('cart-close-btn');
    const overlay = document.getElementById('cart-overlay');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDrawer());
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeDrawer();
      });
    }

    // Currency Switcher
    const currencySelect = document.getElementById('currency-select');
    if (currencySelect) {
      currencySelect.addEventListener('change', (e) => {
        this.currency = e.target.value;
        this.render();
        if (window.NovaApp) window.NovaApp.renderProducts();
      });
    }

    // Promo Code Application
    const promoBtn = document.getElementById('btn-apply-promo');
    const promoInput = document.getElementById('promo-input');
    if (promoBtn && promoInput) {
      promoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === 'NOVA10' || code === 'VIPRUNWAY') {
          this.discountPercent = 0.10;
          this.activePromoCode = code;
          if (window.NovaApp) window.NovaApp.showToast('10% VIP ATELIER PRIVILEGE APPLIED');
          this.render();
        } else if (code === 'MIDNIGHT20') {
          this.discountPercent = 0.20;
          this.activePromoCode = code;
          if (window.NovaApp) window.NovaApp.showToast('20% MIDNIGHT DROP CODE APPLIED');
          this.render();
        } else {
          if (window.NovaApp) window.NovaApp.showToast('INVALID PROMO CODE');
        }
      });
    }

    // Checkout Trigger
    const checkoutBtn = document.getElementById('btn-checkout-trigger');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        this.openCheckoutModal();
      });
    }
  }

  formatPrice(usdAmount) {
    const rateData = this.currencyRates[this.currency] || this.currencyRates.USD;
    const converted = usdAmount * rateData.rate;
    if (this.currency === 'JPY') {
      return `${rateData.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${rateData.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  addItem(product, size = 'M', color = null) {
    const selectedColor = color || (product.colors && product.colors[0]) || '#111111';
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const chosenImage = isDark && product.images.dark ? product.images.dark : product.images.light;

    const existingIndex = this.items.findIndex(
      item => item.id === product.id && item.size === size && item.color === selectedColor
    );

    if (existingIndex > -1) {
      this.items[existingIndex].qty += 1;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        size: size,
        color: selectedColor,
        image: chosenImage,
        qty: 1
      });
    }

    this.saveCart();
    this.openDrawer();
    
    if (window.NovaApp) {
      window.NovaApp.showToast(`ADDED TO BAG: ${product.title}`);
    }
  }

  updateQty(index, delta) {
    if (this.items[index]) {
      this.items[index].qty += delta;
      if (this.items[index].qty <= 0) {
        this.items.splice(index, 1);
      }
      this.saveCart();
    }
  }

  removeItem(index) {
    if (this.items[index]) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  openDrawer() {
    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openCheckoutModal() {
    if (this.items.length === 0) {
      if (window.NovaApp) window.NovaApp.showToast('YOUR SHOPPING BAG IS EMPTY');
      return;
    }
    this.closeDrawer();
    const modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  getTotalCount() {
    return this.items.reduce((acc, item) => acc + item.qty, 0);
  }

  getSubtotal() {
    return this.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  }

  render() {
    // Update Badge counts in Header
    const totalCount = this.getTotalCount();
    document.querySelectorAll('.nav-badge-count').forEach(el => {
      el.textContent = totalCount;
      el.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    const container = document.getElementById('cart-items-container');
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <p style="font-size: 1rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">Your Bag is Empty</p>
          <p style="font-size: 0.85rem; color: var(--foreground-muted);">Discover the FW26 Runway or Midnight Drop archives to curate your wardrobe.</p>
        </div>
      `;
    } else {
      container.innerHTML = this.items.map((item, idx) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-meta">Size: <strong>${item.size}</strong> • Color: <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${item.color};vertical-align:middle;margin-left:3px;"></span></div>
            <div class="cart-item-bottom">
              <div class="qty-control">
                <button class="qty-btn" onclick="window.novaCart.updateQty(${idx}, -1)">-</button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="window.novaCart.updateQty(${idx}, 1)">+</button>
              </div>
              <div style="font-weight: 800; font-size: 0.95rem;">${this.formatPrice(item.price * item.qty)}</div>
              <button onclick="window.novaCart.removeItem(${idx})" style="background:none;border:none;color:var(--foreground-muted);cursor:pointer;font-size:0.75rem;text-decoration:underline;">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Calculations
    const subtotal = this.getSubtotal();
    const discount = subtotal * this.discountPercent;
    const finalTotal = subtotal - discount;

    const subtotalEl = document.getElementById('cart-subtotal-val');
    const discountEl = document.getElementById('cart-discount-val');
    const discountRow = document.getElementById('cart-discount-row');
    const totalEl = document.getElementById('cart-final-total');
    const checkoutBtnTotal = document.getElementById('btn-checkout-total');

    if (subtotalEl) subtotalEl.textContent = this.formatPrice(subtotal);
    if (discountEl && discountRow) {
      if (this.discountPercent > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-${this.formatPrice(discount)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }
    if (totalEl) totalEl.textContent = this.formatPrice(finalTotal);
    if (checkoutBtnTotal) checkoutBtnTotal.textContent = `(${this.formatPrice(finalTotal)})`;
  }
}

window.novaCart = new CartController();
