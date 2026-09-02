/**
 * NOVA PRODUCT ARCHIVE & CATALOG DATA - V2 HIGH FASHION EDITORIAL
 * Curated haute couture runway & midnight streetwear pieces with authentic high-fashion photography.
 */

const NOVA_PRODUCTS = [
  {
    id: 'nova-01',
    title: 'Atelier Sculpted Double-Breasted Cashmere Coat',
    category: 'outerwear',
    categoryLabel: 'Haute Couture Outerwear',
    price: 1850,
    badgeLight: 'FW26 RUNWAY',
    badgeDark: 'ARCHIVE 01 // 15 PCS',
    dropStatus: 'Atelier Run',
    stockRemaining: 4,
    description: 'Monumental sculptural silhouette cut from 720GSM pure Mongolian cashmere. Features hand-etched buffalo horn buttons with the NOVA seal and silk cupro lining.',
    specs: {
      fabric: '100% Mongolian Cashmere (720GSM)',
      lining: 'Bemberg Silk Cupro Jacquard',
      origin: 'Biella, Italy',
      hardware: 'Hand-Carved Buffalo Horn',
      fit: 'Relaxed Architectural Drape'
    },
    images: {
      light: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      dark: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    colors: ['#1A1A1A', '#C5A059', '#3D3631'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'nova-02',
    title: 'Cyber-Chrome Down Puffer V2',
    category: 'streetwear',
    categoryLabel: 'Midnight Techwear',
    price: 920,
    badgeLight: 'METALLIC SERIES',
    badgeDark: 'DROP 004 // 25 PCS',
    dropStatus: 'Almost Sold Out',
    stockRemaining: 2,
    description: 'Ultra-lightweight Japanese liquid-chrome nylon shell with 850 fill-power ethically sourced goose down and magnetic Fidlock closures.',
    specs: {
      fabric: 'Liquid Chrome Ripstop Nylon',
      fill: '850FP Polish White Goose Down (90/10)',
      origin: 'Tokyo, Japan',
      hardware: 'Anodized Aluminum & Fidlock V-Buckle',
      fit: 'Cropped Boxy Silhouette'
    },
    images: {
      light: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
      dark: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    colors: ['#E6EDF3', '#0A0A0A', '#00F0FF'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'nova-03',
    title: '16oz Kojima Vintage Selvedge Denim',
    category: 'denim',
    categoryLabel: 'Artisanal Selvedge',
    price: 480,
    badgeLight: 'MASTER WEAVE',
    badgeDark: 'RAW DEEP INDIGO',
    dropStatus: 'Core Capsule',
    stockRemaining: 8,
    description: 'Woven on vintage Toyoda shuttle looms in Okayama using rope-dyed Zimbabwean long-staple cotton with custom silver selvedge ID line.',
    specs: {
      fabric: '16oz 100% Zimbabwe Cotton Selvedge',
      weave: 'Right Hand Twill Loomstate',
      origin: 'Kojima, Okayama, Japan',
      hardware: 'Solid Antiqued Brass Rivets',
      fit: 'Straight Wide-Leg Drape'
    },
    images: {
      light: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=85',
      dark: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    colors: ['#0C162D', '#111111'],
    sizes: ['30', '32', '34', '36']
  },
  {
    id: 'nova-04',
    title: 'Mulberry Silk Organza Pleated Blouse',
    category: 'couture',
    categoryLabel: 'Haute Couture',
    price: 1150,
    badgeLight: 'COUTURE ATELIER',
    badgeDark: 'GHOST SHEER',
    dropStatus: 'Made to Order',
    stockRemaining: 5,
    description: 'Architectural hand-pleated organza blouse woven from pure mulberry silk with hidden French seams and champagne mother-of-pearl buttons.',
    specs: {
      fabric: '100% Mulberry Silk Organza (14mm)',
      craft: 'Hand-Pleated Architectural Bodice',
      origin: 'Como, Italy',
      buttons: 'Tahitian Mother-of-Pearl',
      fit: 'Voluminous Draped Silhouette'
    },
    images: {
      light: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      dark: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    colors: ['#FBFBFA', '#111111', '#C5A059'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'nova-05',
    title: 'Tactical Cordura Chest Rig & Modular Pouches',
    category: 'streetwear',
    categoryLabel: 'Tech Streetwear',
    price: 390,
    badgeLight: 'MODULAR ACCESSORY',
    badgeDark: 'CYBER TACTICAL',
    dropStatus: 'Limited Drop',
    stockRemaining: 7,
    description: 'Constructed from mil-spec 1000D Cordura with water-repellent coating, laser-cut MOLLE matrix, and Cobra quick-release buckles.',
    specs: {
      fabric: '1000D Ballistic Cordura®',
      buckles: 'AustriAlpin Cobra® Aluminum',
      origin: 'Munich, Germany',
      features: 'Modular Quick-Detach Magnetic Pouches',
      fit: 'Ergonomic Fully Adjustable Harness'
    },
    images: {
      light: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
      dark: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    colors: ['#040404', '#2E3532', '#C5A059'],
    sizes: ['ONE SIZE']
  },
  {
    id: 'nova-06',
    title: 'Vortex Lug-Sole Vibram Combat Boot',
    category: 'footwear',
    categoryLabel: 'Luxury Footwear',
    price: 890,
    badgeLight: 'HAND-LASTED',
    badgeDark: 'URBAN ARMOR',
    dropStatus: 'Low Stock',
    stockRemaining: 3,
    description: 'Full-grain French calfskin leather paired with customized Vibram Arctic Grip lug soles and matte titanium lace eyelets.',
    specs: {
      leather: 'Full-Grain French Calfskin (2.2mm)',
      sole: 'Custom Vibram® Arctic Grip Compound',
      construction: 'Goodyear Welted (Recraftable)',
      origin: 'Civitanova Marche, Italy',
      hardware: 'Matte Gunmetal Titanium'
    },
    images: {
      light: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=85',
      dark: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    colors: ['#0A0A0A', '#3D3631'],
    sizes: ['40', '41', '42', '43', '44', '45']
  },
  {
    id: 'nova-07',
    title: 'Brushed Mohair Gradient Knit Sweater',
    category: 'couture',
    categoryLabel: 'Luxury Knitwear',
    price: 650,
    badgeLight: 'CHAMPAGNE SOFT',
    badgeDark: 'NEBULA WEAVE',
    dropStatus: 'Runway Exclusive',
    stockRemaining: 6,
    description: 'Spun from cloud-soft South African kid mohair and silk blend with an ombre dip-dye gradient and dropped shoulder silhouette.',
    specs: {
      fabric: '70% Superkid Mohair, 30% Mulberry Silk',
      gauge: '3-Gauge Hand Loomed Chunky Knit',
      origin: 'Florence, Italy',
      dye: 'Low-Impact Botanical Pigments',
      fit: 'Oversized Slouch Fit'
    },
    images: {
      light: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85',
      dark: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    colors: ['#F4F2EC', '#222222', '#C5A059'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'nova-08',
    title: 'Liquid Metal Chrono Watch Object 01',
    category: 'objects',
    categoryLabel: 'Atelier Objects',
    price: 2400,
    badgeLight: 'HAUTE HORLOGERIE',
    badgeDark: 'CHROME CYBER 01',
    dropStatus: 'Vault Piece // 15 Worldwide',
    stockRemaining: 1,
    description: 'Sculpted grade-5 titanium case housing an automatic Swiss caliber movement with minimalist sunray dial and liquid mercury luster.',
    specs: {
      case: 'Grade 5 Brushed & Mirror-Polished Titanium (40mm)',
      movement: 'Automatic Caliber ETA 2824-2 (38h Reserve)',
      glass: 'Double-Domed Sapphire Crystal AR Coated',
      strap: 'FKM Rubber & Quick-Release Titanium Mesh',
      origin: 'Geneva, Switzerland'
    },
    images: {
      light: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85',
      dark: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    colors: ['#C8C5BF', '#0E0E0E', '#C5A059'],
    sizes: ['40MM']
  }
];

window.NOVA_PRODUCTS = NOVA_PRODUCTS;
