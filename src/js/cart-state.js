// ==========================================================================
// NOVA — GLOBAL PRODUCT DATABASE & PERSISTENT CART STATE (LOCAL DOWNLOADED IMAGES)
// ==========================================================================

const NOVA_PRODUCTS = [
  // OUTERWEAR (6 Items from Downloads)
  {
    id: 'nova-out-01',
    name: 'Exo-Shell Gore-Tex 3L Parka',
    category: 'Outerwear',
    price: 680,
    image: 'src/assets/outerwear/outwear (1).jpg',
    badge: 'Flagship Drop',
    description: '3-layer Gore-Tex Pro membrane with welded storm hood, Fidlock magnetic collar fasteners, and internal articulated sling.'
  },
  {
    id: 'nova-out-02',
    name: 'Stealth Storm Anorak',
    category: 'Outerwear',
    price: 540,
    image: 'src/assets/outerwear/outwear (2).jpg',
    badge: 'Weatherproof',
    description: 'Ultra-lightweight ripstop nylon with DWR finish, YKK AquaGuard storm zippers, and packable modular pouch.'
  },
  {
    id: 'nova-out-03',
    name: 'Cyber Kimono Trench',
    category: 'Outerwear',
    price: 790,
    image: 'src/assets/outerwear/outwear (3).jpg',
    badge: 'Tokyo Drop',
    description: 'Traditional Japanese haori silhouette reconstructed with ballistic Dyneema composite fabric.'
  },
  {
    id: 'nova-out-04',
    name: 'Sub-Zero Heavy Parka',
    category: 'Outerwear',
    price: 890,
    image: 'src/assets/outerwear/outwear (4).jpg',
    badge: 'Thermal Shield',
    description: 'Aerogel insulated membrane tested to -30°C with waterproof external shell and magnetic storm flap.'
  },
  {
    id: 'nova-out-05',
    name: 'Kevlar Tactical Overcoat',
    category: 'Outerwear',
    price: 720,
    image: 'src/assets/outerwear/outwear (5).jpg',
    badge: 'Ballistic',
    description: 'Abrasion-resistant Kevlar blend with custom Italian hardware and ergonomic articulated sleeves.'
  },
  {
    id: 'nova-out-06',
    name: 'Nocturnal Bomber Shell',
    category: 'Outerwear',
    price: 490,
    image: 'src/assets/outerwear/outwear (6).jpg',
    badge: 'Limited Run',
    description: 'Matte black waterproof flight jacket with dual-entry chest holster pockets and reversible high-vis lining.'
  },

  // TACTICAL RIGS (6 Items from Downloads)
  {
    id: 'nova-tac-01',
    name: 'Modular Ballistic Chest Rig',
    category: 'Tactical',
    price: 380,
    image: 'src/assets/tactical/tactical rigs.jpg',
    badge: 'Modular',
    description: 'MOLLE-compatible chest harness with quick-release Cobra buckles and laser-cut attachment points.'
  },
  {
    id: 'nova-tac-02',
    name: 'Cross-Body Recon Holster',
    category: 'Tactical',
    price: 260,
    image: 'src/assets/tactical/tactical rigs (1).jpg',
    badge: 'Utility',
    description: 'Asymmetric 3-point sling holster engineered with waterproof Cordura 1000D and magnetic phone dock.'
  },
  {
    id: 'nova-tac-03',
    name: 'Plate Carrier Stealth Vest',
    category: 'Tactical',
    price: 440,
    image: 'src/assets/tactical/tactical rigs (2).jpg',
    badge: 'Armored',
    description: 'Ergonomic lightweight carrier with ventilated spacer mesh backing and detachable cargo modules.'
  },
  {
    id: 'nova-tac-04',
    name: 'Urban Field Harness',
    category: 'Tactical',
    price: 320,
    image: 'src/assets/tactical/tactical rigs (3).jpg',
    badge: 'Tactical',
    description: 'Integrated dual shoulder load-bearing harness with waterproof zippered utility compartments.'
  },
  {
    id: 'nova-tac-05',
    name: 'Combat Utility Rig V2',
    category: 'Tactical',
    price: 390,
    image: 'src/assets/tactical/tactical rigs (4).jpg',
    badge: 'Combat Spec',
    description: 'Heavy-duty modular harness with Mil-Spec webbing and concealed waterproof tech storage.'
  },
  {
    id: 'nova-tac-06',
    name: 'Minimalist Tech Vest',
    category: 'Tactical',
    price: 290,
    image: 'src/assets/tactical/tactical rigs (5).jpg',
    badge: 'Minimal Spec',
    description: 'Low-profile zip vest with breathable stretch panels and seamless laser-cut edge finishing.'
  },

  // BOTTOMS (6 Items from Downloads)
  {
    id: 'nova-bot-01',
    name: 'Apex Articulated Cargos',
    category: 'Bottoms',
    price: 420,
    image: 'src/assets/bottoms/bottoms.jpg',
    badge: 'Best Seller',
    description: 'Deep pleated 3D knee articulation with 8 ergonomic pockets, cinch cuffs, and water-repellent coating.'
  },
  {
    id: 'nova-bot-02',
    name: 'Stealth Field Trousers',
    category: 'Bottoms',
    price: 360,
    image: 'src/assets/bottoms/bottoms (1).jpg',
    badge: 'Waterproof',
    description: '4-way Schoeller stretch fabric with integrated Fidlock web belt and hidden passport zip pocket.'
  },
  {
    id: 'nova-bot-03',
    name: 'Modular Flight Pants',
    category: 'Bottoms',
    price: 390,
    image: 'src/assets/bottoms/bottoms (2).jpg',
    badge: 'Modular',
    description: 'Convertible flight pants featuring zip-off lower leg pods and magnetic pouch attachments.'
  },
  {
    id: 'nova-bot-04',
    name: 'Cyber Drop-Crotch Pants',
    category: 'Bottoms',
    price: 380,
    image: 'src/assets/bottoms/bottoms (3).jpg',
    badge: 'Tokyo Silhouette',
    description: 'Avant-garde tapered fit tailored from Japanese heavy twill with reinforced crotch gusset.'
  },
  {
    id: 'nova-bot-05',
    name: 'Tactical Combat Joggers',
    category: 'Bottoms',
    price: 340,
    image: 'src/assets/bottoms/bottoms (4).jpg',
    badge: 'Everyday Spec',
    description: 'Heavyweight loopback cotton with nylon knee overlays, zippered ankle vents, and key d-rings.'
  },
  {
    id: 'nova-bot-06',
    name: 'Obsidian Wide-Leg Trousers',
    category: 'Bottoms',
    price: 390,
    image: 'src/assets/bottoms/bottoms (5).jpg',
    badge: 'Runway Cut',
    description: 'Relaxed wide-leg architectural silhouette tailored from liquid-resistant Japanese wool-gabardine.'
  },

  // FOOTWEAR (6 Items from Downloads)
  {
    id: 'nova-foot-01',
    name: 'Vortex Cyber Combat Boot',
    category: 'Footwear',
    price: 520,
    image: 'src/assets/footwear/footwear (1).jpg',
    badge: 'Vibram Sole',
    description: 'Vibram Megagrip lug outsole with waterproof neoprene inner bootie and fast-lace speed system.'
  },
  {
    id: 'nova-foot-02',
    name: 'Matrix Runner V1',
    category: 'Footwear',
    price: 440,
    image: 'src/assets/footwear/footwear (2).jpg',
    badge: 'Carbon Plate',
    description: 'Propulsive carbon fiber plate runner with seamless TPU exo-cage and nitrogen-infused midsole.'
  },
  {
    id: 'nova-foot-03',
    name: 'Gore-Tex Trail High',
    category: 'Footwear',
    price: 480,
    image: 'src/assets/footwear/footwear (3).jpg',
    badge: 'Waterproof',
    description: 'All-terrain Gore-Tex boot with reinforced rubber rand, Cordura upper, and reflective 3M accents.'
  },
  {
    id: 'nova-foot-04',
    name: 'Obsidian Low Runner',
    category: 'Footwear',
    price: 380,
    image: 'src/assets/footwear/footwear (4).jpg',
    badge: 'Lightweight',
    description: 'Minimalist daily technical trainer with quick-toggle bungee lacing and high-abrasion toe cap.'
  },
  {
    id: 'nova-foot-05',
    name: 'Tactical Mid Sneaker-Boot',
    category: 'Footwear',
    price: 460,
    image: 'src/assets/footwear/footwear (5).jpg',
    badge: 'Hybrid Spec',
    description: 'Hybrid mid-top with weather-sealed side zipper, OrthoLite insole, and puncture-resistant shank.'
  },
  {
    id: 'nova-foot-06',
    name: 'Zero Horizon Cyber Boot',
    category: 'Footwear',
    price: 590,
    image: 'src/assets/footwear/footwear (6).jpg',
    badge: 'Atelier Spec',
    description: 'Full-grain Italian calfskin bonded to a high-traction technical sole with custom aluminum buckles.'
  },

  // STREETWEAR (8 Items from Downloads)
  {
    id: 'nova-str-01',
    name: 'Tokyo Underground Oversized Tee',
    category: 'Streetwear',
    price: 180,
    image: 'src/assets/streetwear/streetwear (1).jpg',
    badge: 'Drop 04',
    description: '300 GSM heavyweight organic cotton with cyber typographic back screen-print and raw edge hems.'
  },
  {
    id: 'nova-str-02',
    name: 'Cyberpunk Layered Hoodie',
    category: 'Streetwear',
    price: 290,
    image: 'src/assets/streetwear/streetwear (2).jpg',
    badge: 'Double Fleece',
    description: 'Double-layered french terry hoodie with structured storm hood and concealed kangaroo pocket.'
  },
  {
    id: 'nova-str-03',
    name: 'Nocturnal Oversized Sweatshirt',
    category: 'Streetwear',
    price: 240,
    image: 'src/assets/streetwear/streetwear (3).jpg',
    badge: 'Tokyo Fit',
    description: 'Boxy drop-shoulder crewneck featuring silicone NOVA monogram and thumbhole cuff details.'
  },
  {
    id: 'nova-str-04',
    name: 'Tactical Long-Sleeve Thermal',
    category: 'Streetwear',
    price: 210,
    image: 'src/assets/streetwear/streetwear (4).jpg',
    badge: 'Waffle Knit',
    description: 'Waffle-knit merino wool blend with articulated elbow ribbing and thumbhole cuffs.'
  },
  {
    id: 'nova-str-05',
    name: 'Acid Cyber Graphic Hoodie',
    category: 'Streetwear',
    price: 310,
    image: 'src/assets/streetwear/streetwear (5).jpg',
    badge: 'Glow Screen',
    description: 'Heavyweight vintage washed fleece with photoluminescent neon back graphic and heavy ribbing.'
  },
  {
    id: 'nova-str-06',
    name: 'Metropolis Technical Windbreaker',
    category: 'Streetwear',
    price: 360,
    image: 'src/assets/streetwear/streetwear (6).jpg',
    badge: 'Packable',
    description: 'Ultra-light windproof shell jacket with reflective pipeline taping and convertible hood.'
  },
  {
    id: 'nova-str-07',
    name: 'Cyber Kimono Layering Robe',
    category: 'Streetwear',
    price: 420,
    image: 'src/assets/streetwear/streetwear (7).jpg',
    badge: 'Runway Piece',
    description: 'Draped haori cut with Fidlock front closure and internal tactical carry strap.'
  },
  {
    id: 'nova-str-08',
    name: 'Urban Armored Pullover',
    category: 'Streetwear',
    price: 280,
    image: 'src/assets/streetwear/streetwear (8).jpg',
    badge: 'Reinforced',
    description: 'Reinforced shoulder and elbow panels with breathable underarm laser perforations.'
  },

  // ACCESSORIES (7 Items from Downloads)
  {
    id: 'nova-acc-01',
    name: 'Modular Messenger 20L',
    category: 'Accessories',
    price: 320,
    image: 'src/assets/accessories/acessories (1).jpg',
    badge: 'Waterproof',
    description: 'X-Pac VX21 waterproof messenger bag with magnetic Fidlock V-buckle and laptop cradle.'
  },
  {
    id: 'nova-acc-02',
    name: 'Tactical Crossbody Pod',
    category: 'Accessories',
    price: 180,
    image: 'src/assets/accessories/acessories (2).jpg',
    badge: 'Everyday Carry',
    description: 'Compact Cordura sling with quick-adjust strap, internal organizer mesh, and key carabiner.'
  },
  {
    id: 'nova-acc-03',
    name: 'Cybernetic Techwear Mask',
    category: 'Accessories',
    price: 120,
    image: 'src/assets/accessories/acessories (3).jpg',
    badge: 'N99 Filtration',
    description: 'Multi-layer breathable filtration mask with magnetic neck clasp and adjustable silicone ear loops.'
  },
  {
    id: 'nova-acc-04',
    name: 'Fidlock Magnetic Belt',
    category: 'Accessories',
    price: 140,
    image: 'src/assets/accessories/acessories (4).jpg',
    badge: 'Mil-Spec',
    description: 'Heavy-duty nylon webbing with German Fidlock V-buckle for instant one-handed release.'
  },
  {
    id: 'nova-acc-05',
    name: 'Ballistic Roll-Top Backpack 35L',
    category: 'Accessories',
    price: 450,
    image: 'src/assets/accessories/acessories (5).jpg',
    badge: 'Expedition',
    description: '100% waterproof seam-taped roll-top pack with ergonomic EVA back panel and sternum strap.'
  },
  {
    id: 'nova-acc-06',
    name: 'Tactical Fingerless Gloves',
    category: 'Accessories',
    price: 95,
    image: 'src/assets/accessories/acessories (6).jpg',
    badge: 'Touchscreen',
    description: 'Reinforced knuckle protection with goat leather palms and breathable neoprene backhand.'
  },
  {
    id: 'nova-acc-07',
    name: 'Reflective Cyber Balaclava',
    category: 'Accessories',
    price: 110,
    image: 'src/assets/accessories/acessories (7).jpg',
    badge: 'Thermal Shield',
    description: 'Seamless merino wool and silver thread balaclava with reflective 3M branding.'
  }
];

// ==========================================================================
// CART STATE MANAGEMENT (LOCAL STORAGE PERSISTENCE)
// ==========================================================================
class CartManager {
  constructor() {
    this.storageKey = 'nova_cart_items_v2';
    this.cart = this.loadCart();
    this.initUI();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
      this.updateBadges();
      this.renderDrawer();
    } catch (e) {
      console.error(e);
    }
  }

  addItem(productId, size = 'M', qty = 1) {
    const product = NOVA_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(item => item.id === productId && item.size === size);
    if (existingIndex > -1) {
      this.cart[existingIndex].qty += qty;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: size,
        qty: qty
      });
    }

    this.saveCart();
    this.showToast(`Added ${product.name} (Size: ${size}) to Bag.`);
  }

  removeItem(productId, size) {
    this.cart = this.cart.filter(item => !(item.id === productId && item.size === size));
    this.saveCart();
  }

  updateQty(productId, size, delta) {
    const item = this.cart.find(item => item.id === productId && item.size === size);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.removeItem(productId, size);
    } else {
      this.saveCart();
    }
  }

  getTotalCount() {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  getSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  updateBadges() {
    const count = this.getTotalCount();
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  initUI() {
    this.injectDrawer();
    this.injectToast();
    this.injectMobileNav();
    this.updateBadges();
  }

  injectDrawer() {
    if (document.getElementById('cart-drawer-backdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.className = 'cart-drawer-backdrop';
    backdrop.id = 'cart-drawer-backdrop';
    backdrop.onclick = (e) => {
      if (e.target === backdrop) this.closeDrawer();
    };

    backdrop.innerHTML = `
      <aside class="cart-drawer" onclick="event.stopPropagation()">
        <header class="cart-drawer__header">
          <h2 class="cart-drawer__title">Your Bag (<span id="cart-drawer-count">0</span>)</h2>
          <button class="cart-drawer__close-btn" onclick="cartManager.closeDrawer()" aria-label="Close Bag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>
        <div class="cart-drawer__body" id="cart-drawer-items"></div>
        <footer class="cart-drawer__footer" id="cart-drawer-footer">
          <div class="cart-summary-row">
            <span>Shipping Protocol</span>
            <span style="color: var(--cyan-neon); font-family: var(--font-tech);">Complimentary Global</span>
          </div>
          <div class="cart-summary-row total">
            <span>Total</span>
            <span id="cart-drawer-total" style="font-family: var(--font-tech);">$0 USD</span>
          </div>
          <a href="checkout.html" class="btn-primary cart-checkout-btn">
            <span>Proceed to Secure Checkout</span>
          </a>
        </footer>
      </aside>
    `;

    document.body.appendChild(backdrop);
    this.renderDrawer();
  }

  injectMobileNav() {
    if (document.getElementById('mobile-nav-backdrop')) return;
    
    // Inject mobile menu toggle button to .nav-actions
    const navActions = document.querySelector('.nav-actions');
    if (navActions && !document.querySelector('.mobile-menu-btn')) {
      const menuBtn = document.createElement('button');
      menuBtn.className = 'mobile-menu-btn';
      menuBtn.setAttribute('aria-label', 'Open Navigation Menu');
      menuBtn.onclick = () => this.openMobileNav();
      menuBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
      navActions.appendChild(menuBtn);
    }

    // Inject mobile drawer
    const drawerBackdrop = document.createElement('div');
    drawerBackdrop.className = 'mobile-nav-backdrop';
    drawerBackdrop.id = 'mobile-nav-backdrop';
    drawerBackdrop.onclick = (e) => {
      if (e.target === drawerBackdrop) this.closeMobileNav();
    };

    drawerBackdrop.innerHTML = `
      <div class="mobile-nav-drawer">
        <div>
          <div class="mobile-nav-header">
            <a href="index.html" class="site-brand" style="font-size: 1.25rem;">
              <svg class="site-brand__monogram-svg" width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14.25" stroke="currentColor" stroke-width="1.5"/>
                <path d="M11 22V10H13.8L18.2 17.5V10H21V22H18.2L13.8 14.5V22H11Z" fill="currentColor"/>
              </svg>
              <span>NOVA</span>
            </a>
            <button class="mobile-nav-close" onclick="cartManager.closeMobileNav()" aria-label="Close Menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <ul class="mobile-nav-links">
            <li><a href="studio.html" class="mobile-nav-link"><span>Studio</span><span class="badge">01</span></a></li>
            <li><a href="collection.html" class="mobile-nav-link"><span>Collection</span><span class="badge">39 Pieces</span></a></li>
            <li><a href="atelier.html" class="mobile-nav-link"><span>Atelier</span><span class="badge">Haute</span></a></li>
            <li><a href="streetwear.html" class="mobile-nav-link"><span>Streetwear</span><span class="badge">Tokyo</span></a></li>
            <li><a href="archives.html" class="mobile-nav-link"><span>Archives</span><span class="badge">Vault</span></a></li>
          </ul>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <a href="atelier.html" class="btn-primary" style="width: 100%; text-align: center; justify-content: center; padding: 0.85rem;">
            <span>Connect Atelier</span>
          </a>
          <div style="font-family: var(--font-tech); font-size: 0.72rem; color: var(--paper-faint); text-align: center;">
            NOVA TECHNICAL STREETWEAR // 2026
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(drawerBackdrop);
  }

  openMobileNav() {
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeMobileNav() {
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  injectToast() {
    if (document.getElementById('toast-container')) return;
    const toastCont = document.createElement('div');
    toastCont.className = 'toast-container';
    toastCont.id = 'toast-container';
    document.body.appendChild(toastCont);
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-neon)" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  openDrawer() {
    const backdrop = document.getElementById('cart-drawer-backdrop');
    if (backdrop) {
      this.renderDrawer();
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const backdrop = document.getElementById('cart-drawer-backdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  renderDrawer() {
    const itemsEl = document.getElementById('cart-drawer-items');
    const footerEl = document.getElementById('cart-drawer-footer');
    const countEl = document.getElementById('cart-drawer-count');
    const totalEl = document.getElementById('cart-drawer-total');

    if (!itemsEl) return;

    const totalCount = this.getTotalCount();
    const subtotal = this.getSubtotal();

    if (countEl) countEl.textContent = totalCount;
    if (totalEl) totalEl.textContent = `$${subtotal.toLocaleString()} USD`;

    if (this.cart.length === 0) {
      itemsEl.innerHTML = `
        <div class="cart-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h3 style="font-family: var(--font-display); font-size: 1.1rem; text-transform: uppercase;">Your Bag is Empty</h3>
          <p style="font-size: 0.85rem; color: var(--paper-faint);">Explore our collection to add technical garments to your loadout.</p>
          <a href="collection.html" class="btn-secondary" onclick="cartManager.closeDrawer()" style="margin-top: 1rem;">Browse Collection</a>
        </div>
      `;
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (footerEl) footerEl.style.display = 'flex';

    itemsEl.innerHTML = this.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item__img" />
        <div class="cart-item__details">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
            <div>
              <h4 class="cart-item__title">${item.name}</h4>
              <div class="cart-item__meta">Size: ${item.size} &bull; ${item.category}</div>
            </div>
            <button class="cart-remove-btn" onclick="cartManager.removeItem('${item.id}', '${item.size}')" title="Remove item" aria-label="Remove item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="cart-item__bottom">
            <span class="cart-item__price">$${(item.price * item.qty).toLocaleString()}</span>
            <div class="cart-qty-ctrl">
              <button class="cart-qty-btn" onclick="cartManager.updateQty('${item.id}', '${item.size}', -1)" aria-label="Decrease">&minus;</button>
              <span class="cart-qty-val">${item.qty}</span>
              <button class="cart-qty-btn" onclick="cartManager.updateQty('${item.id}', '${item.size}', 1)" aria-label="Increase">&plus;</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// Global Instant Accessors
const cartManager = new CartManager();
function addToBag(id, size, qty) { cartManager.addItem(id, size, qty); }
function openCartDrawer() { cartManager.openDrawer(); }
function closeCartDrawer() { cartManager.closeDrawer(); }
function showToast(msg) { cartManager.showToast(msg); }

// Global Theme Switcher
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('nova_theme', next);
}

// Restore saved theme on page load
(function() {
  const saved = localStorage.getItem('nova_theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    if (document.body) document.body.setAttribute('data-theme', saved);
  }
})();
