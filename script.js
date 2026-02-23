/* ============================================================
   AROMA LUXURY PERFUME — SCRIPT.JS
   ============================================================ */

'use strict';

// ============================================================
// DATA
// ============================================================
// ---- Inline SVG bottle images (no network needed) ----
function bottleImg(hue, label, bg1, bg2) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='520' viewBox='0 0 400 520'>
    <defs>
      <linearGradient id='bg${hue}' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${bg1}'/>
        <stop offset='100%' stop-color='${bg2}'/>
      </linearGradient>
      <linearGradient id='bottle${hue}' x1='0' y1='0' x2='1' y2='0'>
        <stop offset='0%' stop-color='#1a1510'/>
        <stop offset='45%' stop-color='#2e2418'/>
        <stop offset='65%' stop-color='#c6a75e' stop-opacity='0.25'/>
        <stop offset='100%' stop-color='#111'/>
      </linearGradient>
      <linearGradient id='gold${hue}' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#d4b878'/>
        <stop offset='100%' stop-color='#a88a45'/>
      </linearGradient>
    </defs>
    <rect width='400' height='520' fill='url(#bg${hue})'/>
    <!-- stem -->
    <rect x='172' y='130' width='56' height='50' rx='3' fill='#1a1510'/>
    <!-- gold ring -->
    <rect x='165' y='177' width='70' height='7' rx='3' fill='url(#gold${hue})'/>
    <!-- body -->
    <rect x='100' y='183' width='200' height='270' rx='6' fill='url(#bottle${hue})'/>
    <!-- highlight -->
    <rect x='100' y='183' width='24' height='270' rx='6' fill='rgba(255,255,255,0.05)'/>
    <rect x='280' y='183' width='20' height='270' rx='4' fill='rgba(198,167,94,0.12)'/>
    <!-- label -->
    <rect x='128' y='238' width='144' height='158' rx='2' fill='rgba(198,167,94,0.1)' stroke='rgba(198,167,94,0.35)' stroke-width='1'/>
    <line x1='140' y1='252' x2='260' y2='252' stroke='rgba(198,167,94,0.5)' stroke-width='1'/>
    <line x1='140' y1='384' x2='260' y2='384' stroke='rgba(198,167,94,0.5)' stroke-width='1'/>
    <text x='200' y='300' text-anchor='middle' fill='rgba(198,167,94,0.9)' font-family='Georgia,serif' font-size='20' letter-spacing='5'>AROMA</text>
    <text x='200' y='322' text-anchor='middle' fill='rgba(198,167,94,0.55)' font-family='Georgia,serif' font-size='11' letter-spacing='3'>${label}</text>
    <text x='200' y='350' text-anchor='middle' fill='rgba(255,255,255,0.22)' font-family='Georgia,serif' font-size='9' letter-spacing='2'>EAU DE PARFUM</text>
    <text x='200' y='368' text-anchor='middle' fill='rgba(255,255,255,0.15)' font-family='Georgia,serif' font-size='8' letter-spacing='1'>100ml / 3.4 fl oz</text>
    <!-- cap -->
    <rect x='156' y='60' width='88' height='72' rx='5' fill='#111'/>
    <rect x='156' y='60' width='88' height='9' rx='5' fill='rgba(255,255,255,0.07)'/>
    <rect x='156' y='125' width='88' height='4' fill='url(#gold${hue})' opacity='0.7'/>
    <text x='200' y='104' text-anchor='middle' fill='rgba(198,167,94,0.35)' font-family='Georgia,serif' font-size='30'>A</text>
    <!-- bottom rim -->
    <rect x='100' y='447' width='200' height='6' rx='2' fill='url(#gold${hue})' opacity='0.4'/>
    <!-- shadow -->
    <ellipse cx='200' cy='468' rx='90' ry='9' fill='rgba(0,0,0,0.35)'/>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function thumbImg(hue, bg1, bg2, angle) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
    <defs>
      <linearGradient id='t${hue}${angle}' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${bg1}'/>
        <stop offset='100%' stop-color='${bg2}'/>
      </linearGradient>
    </defs>
    <rect width='200' height='200' fill='url(#t${hue}${angle})'/>
    <rect x='70' y='50' width='60' height='105' rx='4' fill='rgba(26,21,16,0.85)'/>
    <rect x='70' y='25' width='60' height='28' rx='3' fill='rgba(15,12,8,0.9)'/>
    <rect x='68' y='52' width='64' height='5' rx='2' fill='rgba(198,167,94,0.8)'/>
    <rect x='82' y='80' width='36' height='55' rx='1' fill='rgba(198,167,94,0.08)' stroke='rgba(198,167,94,0.25)' stroke-width='0.8'/>
    <text x='100' y='113' text-anchor='middle' fill='rgba(198,167,94,0.8)' font-family='Georgia,serif' font-size='8' letter-spacing='2'>AROMA</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// Pre-generate images
const imgs = {
  1: { main: bottleImg('1','VELOUR NOIR','#1a1208','#2e200c'),   thumbs: ['#1a1208','#2e200c','#3d2b10','#261a08'].map((c,i) => thumbImg('1',c,'#1a1208',i)) },
  2: { main: bottleImg('2','WHITE IRIS','#e8e0d0','#c8bfae'),    thumbs: ['#e8e0d0','#d4cab8','#c0b5a0','#ede6d8'].map((c,i) => thumbImg('2',c,'#e0d8c8',i)) },
  3: { main: bottleImg('3','OUD ROYALE','#1a0c06','#2e1508'),    thumbs: ['#1a0c06','#280e08','#3a1a0a','#150a04'].map((c,i) => thumbImg('3',c,'#1a0c06',i)) },
  4: { main: bottleImg('4','CITRUS SPRINT','#1a2808','#243a0c'), thumbs: ['#1a2808','#22340a','#1e3006','#283e10'].map((c,i) => thumbImg('4',c,'#1a2808',i)) },
  5: { main: bottleImg('5','ROSE ABSOLUE','#2e0a14','#3d1020'),  thumbs: ['#2e0a14','#38101a','#200810','#44141e'].map((c,i) => thumbImg('5',c,'#2e0a14',i)) },
  6: { main: bottleImg('6','NOIR FUMÉ','#0e0e0e','#1a1a18'),     thumbs: ['#0e0e0e','#141412','#1a1a18','#0a0a0a'].map((c,i) => thumbImg('6',c,'#0e0e0e',i)) },
  7: { main: bottleImg('7','AQUA MARINE','#081828','#0c2438'),   thumbs: ['#081828','#0a2030','#0e2840','#062030'].map((c,i) => thumbImg('7',c,'#081828',i)) },
  8: { main: bottleImg('8','BOIS SACRÉ','#1a1208','#2e200a'),    thumbs: ['#1a1208','#241808','#2e200c','#140e06'].map((c,i) => thumbImg('8',c,'#1a1208',i)) },
};

const products = [
  {
    id: 1,
    name: 'Velour Noir',
    category: 'Eau de Parfum',
    price: 240.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 127,
    badge: 'Bestseller',
    notes: ['Amber', 'Musk', 'Vanilla', 'Sandalwood', 'Tonka Bean'],
    noteType: 'Oriental',
    description: 'Velour Noir is an intoxicating Oriental fragrance that wraps the skin in a velvety embrace of amber and musk. Created by master perfumer François Demachy, this opulent scent unfolds like the finest silk — sensual, mysterious, and utterly unforgettable. The dry down reveals a warm Sandalwood and Tonka Bean accord that lingers beautifully for hours.',
    delivery: { discount: '15%', payment: 'Cash on Delivery', time: '3–4 Working Days', returns: '7 Days Easy Return' },
    image: imgs[1].main, thumbs: imgs[1].thumbs,
    reviews: [
      { name: 'Sophia R.', rating: 5, date: '2 weeks ago', text: 'Absolutely stunning fragrance. The longevity is remarkable — I still get compliments 12 hours after application. This is my signature scent now.', avatar: 'S' },
      { name: 'James O.', rating: 5, date: '1 month ago', text: 'Worth every penny. The amber and musk combination is perfectly balanced. It never feels overpowering, yet it commands a room.', avatar: 'J' }
    ]
  },
  {
    id: 2,
    name: 'White Iris',
    category: 'Eau de Toilette',
    price: 189.00,
    originalPrice: 220.00,
    rating: 4.6,
    reviewCount: 89,
    badge: 'Sale',
    notes: ['Iris', 'Bergamot', 'White Tea', 'Musk', 'Violet'],
    noteType: 'Floral',
    description: 'White Iris is a luminous floral composition that captures the pristine elegance of early morning dew. The crisp opening of Bergamot and White Tea gives way to an exquisite heart of Iris and Violet, setting on a subtle Musk base that leaves a trail of effortless sophistication.',
    delivery: { discount: '15%', payment: 'Cash on Delivery', time: '3–4 Working Days', returns: '7 Days Easy Return' },
    image: imgs[2].main, thumbs: imgs[2].thumbs,
    reviews: [
      { name: 'Elena K.', rating: 5, date: '3 weeks ago', text: 'The most beautiful iris fragrance I have ever encountered. It is clean, sophisticated, and genuinely unique.', avatar: 'E' }
    ]
  },
  {
    id: 3,
    name: 'Oud Royale',
    category: 'Extrait de Parfum',
    price: 380.00,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 54,
    badge: 'Exclusive',
    notes: ['Oud', 'Rose', 'Saffron', 'Leather', 'Amber'],
    noteType: 'Woody Oriental',
    description: 'Oud Royale is the pinnacle of our collection — a majestic interpretation of the precious Agarwood combined with Bulgarian Rose and Persian Saffron. Reserved for those who understand the language of true luxury, this Extrait de Parfum delivers an unparalleled concentration that transforms with your skin chemistry into something uniquely yours.',
    delivery: { discount: '15%', payment: 'Cash on Delivery', time: '3–4 Working Days', returns: '7 Days Easy Return' },
    image: imgs[3].main, thumbs: imgs[3].thumbs,
    reviews: [
      { name: 'Mohammed A.', rating: 5, date: '1 week ago', text: 'True liquid gold. The oud is authentic and the rose gives it a romantic depth I have not found anywhere else. Museum-worthy.', avatar: 'M' }
    ]
  },
  {
    id: 4,
    name: 'Citrus Sprint',
    category: 'Eau de Cologne',
    price: 120.00,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 213,
    badge: null,
    notes: ['Lemon', 'Grapefruit', 'Neroli', 'Cedarwood', 'Vetiver'],
    noteType: 'Fresh Citrus',
    description: 'Citrus Sprint is a vibrant, energizing composition that captures the essence of Mediterranean freshness. The explosive citrus opening of Lemon and Grapefruit is lifted by delicate Neroli, anchored by Cedarwood and Vetiver for unexpected depth and substance.',
    delivery: { discount: '15%', payment: 'Cash on Delivery', time: '3–4 Working Days', returns: '7 Days Easy Return' },
    image: imgs[4].main, thumbs: imgs[4].thumbs,
    reviews: []
  },
  {
    id: 5,
    name: 'Rose Absolue',
    category: 'Eau de Parfum',
    price: 265.00,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 98,
    badge: 'New',
    notes: ['Bulgarian Rose', 'Peony', 'Lychee', 'Patchouli', 'Musk'],
    noteType: 'Floral Fruity',
    description: 'Rose Absolue is a declaration of romance — an opulent bouquet of Bulgarian Rose and Peony that opens with the playful sweetness of Lychee. This modern feminine fragrance strikes the perfect balance between classic elegance and contemporary vibrancy, leaving a soft Patchouli and Musk trail.',
    delivery: { discount: '15%', payment: 'Cash on Delivery', time: '3–4 Working Days', returns: '7 Days Easy Return' },
    image: imgs[5].main, thumbs: imgs[5].thumbs,
    reviews: []
  },
  {
    id: 6,
    name: 'Noir Fumé',
    category: 'Eau de Parfum',
    price: 310.00,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 61,
    badge: null,
    notes: ['Smoky Birch', 'Black Pepper', 'Leather', 'Amber', 'Iso E Super'],
    noteType: 'Woody Smoky',
    description: 'Noir Fumé is an avant-garde composition for those who refuse to blend into the crowd. The daring combination of Smoky Birch and Black Pepper creates a provocative opening that evolves into a rich Leather and Amber heart. Bold, unapologetic, and completely addictive.',
    delivery: { discount: '15%', payment: 'Cash on Delivery', time: '3–4 Working Days', returns: '7 Days Easy Return' },
    image: imgs[6].main, thumbs: imgs[6].thumbs,
    reviews: []
  },
  {
    id: 7,
    name: 'Aqua Marine',
    category: 'Eau de Toilette',
    price: 155.00,
    originalPrice: 175.00,
    rating: 4.3,
    reviewCount: 176,
    badge: 'Sale',
    notes: ['Sea Salt', 'Aquatic', 'Bergamot', 'Driftwood', 'Musk'],
    noteType: 'Aquatic Fresh',
    description: 'Aqua Marine evokes the freedom of open seas — a crisp, refreshing composition that blends Sea Salt and Aquatic notes with the warmth of Driftwood. Ideal for those who carry the spirit of adventure with them wherever they go.',
    delivery: { discount: '15%', payment: 'Cash on Delivery', time: '3–4 Working Days', returns: '7 Days Easy Return' },
    image: imgs[7].main, thumbs: imgs[7].thumbs,
    reviews: []
  },
  {
    id: 8,
    name: 'Bois Sacré',
    category: 'Extrait de Parfum',
    price: 420.00,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 32,
    badge: 'Limited',
    notes: ['Sacred Wood', 'Incense', 'Myrrh', 'Vetiver', 'Amber'],
    noteType: 'Woody Incense',
    description: 'Bois Sacré is a meditative, deeply spiritual fragrance inspired by ancient sacred rituals. The interplay of Sacred Wood, Incense, and Myrrh creates an aura of reverence and timelessness. This limited edition expression is produced in small quantities and numbered individually.',
    delivery: { discount: '15%', payment: 'Cash on Delivery', time: '3–4 Working Days', returns: '7 Days Easy Return' },
    image: imgs[8].main, thumbs: imgs[8].thumbs,
    reviews: []
  }
];

// ============================================================
// CART — localStorage
// ============================================================
function getCart() {
  try { return JSON.parse(localStorage.getItem('aroma_cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('aroma_cart', JSON.stringify(cart));
}
function addToCart(productId, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx > -1) { cart[idx].qty += qty; } else { cart.push({ id: productId, qty }); }
  saveCart(cart);
  updateCartUI();
  showToast('Added to cart');
}
function removeFromCart(productId) {
  let cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  updateCartUI();
  renderCartDrawer();
}
function updateCartQty(productId, qty) {
  let cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx > -1) {
    if (qty <= 0) { cart = cart.filter(i => i.id !== productId); }
    else { cart[idx].qty = qty; }
  }
  saveCart(cart);
  updateCartUI();
  renderCartDrawer();
}
function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const p = products.find(p => p.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

// ============================================================
// NAVIGATION
// ============================================================
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Active link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // Hamburger
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // Cart icon
  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) cartIcon.addEventListener('click', openCartDrawer);
}

// ============================================================
// CART UI
// ============================================================
function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.classList.toggle('visible', count > 0);
  });
}

function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCartDrawer() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartDrawer() {
  const body = document.getElementById('cartDrawerBody');
  const totalEl = document.getElementById('cartTotal');
  if (!body) return;
  const cart = getCart();
  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty.<br>Discover our collection.</p></div>`;
  } else {
    body.innerHTML = cart.map(item => {
      const p = products.find(p => p.id === item.id);
      if (!p) return '';
      return `<div class="cart-item">
        <div class="cart-item-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-note">${p.category}</div>
          <div class="cart-item-ctrl">
            <div class="cart-item-qty">
              <button onclick="updateCartQty(${p.id}, ${item.qty - 1})">−</button>
              <span>${item.qty}</span>
              <button onclick="updateCartQty(${p.id}, ${item.qty + 1})">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${p.id})">Remove</button>
          </div>
        </div>
        <div class="cart-item-price">$${(p.price * item.qty).toFixed(2)}</div>
      </div>`;
    }).join('');
  }
  if (totalEl) totalEl.textContent = '$' + getCartTotal().toFixed(2);
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✓</span><span class="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
let _scrollObserver = null;

function initScrollAnimations() {
  if (!_scrollObserver) {
    _scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          _scrollObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  }
  document.querySelectorAll('.fade-up:not(.visible), .fade-in:not(.visible)').forEach(el => _scrollObserver.observe(el));
}

// ============================================================
// STAR RENDERER
// ============================================================
function renderStars(rating) {
  return [1,2,3,4,5].map(i => `<span class="star${i <= Math.round(rating) ? '' : ' empty'}">★</span>`).join('');
}

// ============================================================
// INDEX PAGE
// ============================================================
function initIndex() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = products.slice(0, 4);
  grid.innerHTML = featured.map(p => productCardHTML(p)).join('');
  initProductCardClicks(grid);
  // Re-observe newly added elements
  setTimeout(initScrollAnimations, 50);
}

// ============================================================
// SHOP PAGE
// ============================================================
function initShop() {
  const grid = document.getElementById('shopGrid');
  const countEl = document.getElementById('shopCount');
  const sortEl = document.getElementById('shopSort');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  let activeFilter = 'all';
  let activeSortVal = 'default';

  function getFiltered() {
    let list = [...products];
    if (activeFilter !== 'all') {
      list = list.filter(p =>
        p.noteType.toLowerCase().includes(activeFilter) ||
        p.notes.some(n => n.toLowerCase().includes(activeFilter)) ||
        p.category.toLowerCase().includes(activeFilter)
      );
    }
    if (activeSortVal === 'low') list.sort((a, b) => a.price - b.price);
    if (activeSortVal === 'high') list.sort((a, b) => b.price - a.price);
    if (activeSortVal === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }

  function render() {
    const filtered = getFiltered();
    if (countEl) countEl.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${products.length}</strong> products`;
    grid.innerHTML = filtered.map(p => productCardHTML(p)).join('');
    initProductCardClicks(grid);
    setTimeout(initScrollAnimations, 50);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      render();
    });
  });

  if (sortEl) sortEl.addEventListener('change', () => { activeSortVal = sortEl.value; render(); });

  render();
}

// ============================================================
// PRODUCT CARD HTML
// ============================================================
function productCardHTML(p) {
  const orig = p.originalPrice ? `<span style="text-decoration:line-through;color:#aaa;font-size:1rem;margin-left:8px">$${p.originalPrice.toFixed(2)}</span>` : '';
  const badge = p.badge ? `<div class="product-card-badge">${p.badge}</div>` : '';
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-card-img">
      ${badge}
      <img src="${p.image}" alt="${p.name}">
      <div class="product-card-overlay">
        <div class="product-card-quick">Quick View</div>
      </div>
    </div>
    <div class="product-card-body">
      <div class="product-card-category">${p.category}</div>
      <div class="product-card-name">${p.name}</div>
      <div class="product-card-notes">${p.notes.slice(0,3).join(' · ')}</div>
      <div class="product-card-footer">
        <div>
          <span class="product-card-price">$${p.price.toFixed(2)}</span>${orig}
          <div class="product-card-stars" style="margin-top:4px">${renderStars(p.rating)}</div>
        </div>
        <button class="product-card-add" onclick="event.stopPropagation();addToCart(${p.id})" title="Add to cart">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}

function initProductCardClicks(container) {
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.product-card-add')) return;
      const id = card.dataset.id;
      window.location.href = `product.html?id=${id}`;
    });
  });
}

// ============================================================
// PRODUCT PAGE
// ============================================================
function initProduct() {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id')) || 1;
  const product = products.find(p => p.id === id) || products[0];

  // Load reviews from localStorage
  const storedReviews = JSON.parse(localStorage.getItem(`reviews_${product.id}`) || '[]');
  const allReviews = [...product.reviews, ...storedReviews];

  // Main image
  const mainImg = document.getElementById('productMainImg');
  if (mainImg) mainImg.src = product.image;

  // Thumbnails
  const thumbsWrap = document.getElementById('productThumbs');
  if (thumbsWrap) {
    thumbsWrap.innerHTML = product.thumbs.map((src, i) =>
      `<div class="product-thumb${i===0?' active':''}" data-src="${src}">
        <img src="${src}" alt="View ${i+1}" loading="lazy">
      </div>`
    ).join('');
    thumbsWrap.querySelectorAll('.product-thumb').forEach(t => {
      t.addEventListener('click', () => {
        thumbsWrap.querySelectorAll('.product-thumb').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        if (mainImg) { mainImg.style.opacity = '0'; mainImg.src = t.dataset.src; mainImg.onload = () => { mainImg.style.opacity='1'; }; }
      });
    });
  }

  // Product info
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHTML = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };
  setText('productName', product.name);
  setText('productCategory', product.category);
  setText('productPrice', `$${product.price.toFixed(2)}`);
  if (product.originalPrice) setText('productOrigPrice', `$${product.originalPrice.toFixed(2)}`);
  setText('productDesc', product.description);
  setHTML('productRatingStars', renderStars(product.rating));
  setText('productRatingCount', `(${product.reviewCount} reviews)`);
  setHTML('productNotes', product.notes.map(n => `<span class="note-tag">${n}</span>`).join(''));
  setText('productNoteType', product.noteType);

  // Delivery
  const dv = product.delivery;
  setText('delivDiscount', dv.discount);
  setText('delivPayment', dv.payment);
  setText('delivTime', dv.time);
  setText('delivReturn', dv.returns);

  // Rating bars (simulated)
  const bars = document.querySelectorAll('.review-bar-fill');
  const percentages = [65, 25, 7, 2, 1];
  bars.forEach((bar, i) => {
    setTimeout(() => { bar.style.width = percentages[i] + '%'; }, 300 + i * 60);
  });

  // Reviews
  renderReviews(allReviews);
  setText('reviewsScore', product.rating.toFixed(1));
  const totalCount = document.getElementById('reviewsCount');
  if (totalCount) totalCount.textContent = `(${allReviews.length} reviews)`;

  // Accordion
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = header.classList.contains('open');
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('open');
        h.nextElementSibling?.classList.remove('open');
      });
      if (!isOpen) { header.classList.add('open'); body?.classList.add('open'); }
    });
  });

  // Qty
  let qty = 1;
  const qtyEl = document.getElementById('qtyNum');
  document.getElementById('qtyMinus')?.addEventListener('click', () => {
    if (qty > 1) { qty--; if (qtyEl) qtyEl.textContent = qty; }
  });
  document.getElementById('qtyPlus')?.addEventListener('click', () => {
    qty++;
    if (qtyEl) qtyEl.textContent = qty;
  });

  // Add to cart
  document.getElementById('addToCartBtn')?.addEventListener('click', () => {
    addToCart(product.id, qty);
  });
  document.getElementById('buyNowBtn')?.addEventListener('click', () => {
    addToCart(product.id, qty);
    openCartDrawer();
  });

  // Star selection
  let selectedRating = 0;
  const stars = document.querySelectorAll('.star-select span');
  stars.forEach((star, i) => {
    star.addEventListener('mouseenter', () => stars.forEach((s, j) => s.classList.toggle('active', j <= i)));
    star.addEventListener('mouseleave', () => stars.forEach((s, j) => s.classList.toggle('active', j < selectedRating)));
    star.addEventListener('click', () => { selectedRating = i + 1; });
  });

  // Review form
  document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (selectedRating === 0) { showToast('Please select a star rating'); return; }
    const name = document.getElementById('reviewName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    if (!name || !text) { showToast('Please fill all fields'); return; }
    const newReview = { name, rating: selectedRating, date: 'Just now', text, avatar: name[0].toUpperCase() };
    const stored = JSON.parse(localStorage.getItem(`reviews_${product.id}`) || '[]');
    stored.unshift(newReview);
    localStorage.setItem(`reviews_${product.id}`, JSON.stringify(stored));
    allReviews.unshift(newReview);
    renderReviews(allReviews);
    e.target.reset();
    selectedRating = 0;
    stars.forEach(s => s.classList.remove('active'));
    showToast('Review submitted! Thank you.');
  });

  // Related
  const related = products.filter(p => p.id !== product.id).slice(0, 4);
  const relGrid = document.getElementById('relatedGrid');
  if (relGrid) {
    relGrid.innerHTML = related.map(p => productCardHTML(p)).join('');
    initProductCardClicks(relGrid);
  }
}

function renderReviews(reviews) {
  const list = document.getElementById('reviewList');
  if (!list) return;
  if (reviews.length === 0) {
    list.innerHTML = `<p style="color:var(--text-light);font-size:0.92rem;">No reviews yet. Be the first to share your experience.</p>`;
    return;
  }
  list.innerHTML = reviews.map(r => `
    <div class="review-card fade-up">
      <div class="review-card-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${r.avatar}</div>
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-date">${r.date}</div>
          </div>
        </div>
        <div class="review-stars">${renderStars(r.rating)}</div>
      </div>
      <div class="review-text">${r.text}</div>
    </div>`).join('');
}

// ============================================================
// CONTACT PAGE
// ============================================================
function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const msg = document.getElementById('cMessage').value.trim();
    if (!name || !email || !msg) { showToast('Please fill all fields'); return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { showToast('Please enter a valid email'); return; }
    form.style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
  });
}

// ============================================================
// CART DRAWER — HTML injection (call once per page)
// ============================================================
function injectCartDrawer() {
  if (document.getElementById('cartDrawer')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="cart-overlay" id="cartOverlay" onclick="closeCartDrawer()"></div>
    <div class="cart-drawer" id="cartDrawer">
      <div class="cart-drawer-header">
        <h3 class="cart-drawer-title">Your Cart</h3>
        <button class="cart-drawer-close" onclick="closeCartDrawer()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="cart-drawer-body" id="cartDrawerBody"></div>
      <div class="cart-drawer-footer">
        <div class="cart-total-row">
          <span class="cart-total-label">Total</span>
          <span class="cart-total-val" id="cartTotal">$0.00</span>
        </div>
        <button class="cart-checkout-btn">Proceed to Checkout →</button>
      </div>
    </div>`);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  injectCartDrawer();
  updateCartUI();
  initScrollAnimations();
  initIndex();
  initShop();
  initProduct();
  initContact();
});

/* ═══════════════════════════════════════════════════════════════ */
/* AROMA CHATBOT v2 — Expanded Natural Language Intelligence      */
/* ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
(function () {

  const trigger  = document.getElementById('aromaChatTrigger');
  const panel    = document.getElementById('aromaChatPanel');
  const closeBtn = document.getElementById('aromaChatClose');
  const messages = document.getElementById('aromaChatMessages');
  const input    = document.getElementById('aromaChatInput');
  const sendBtn  = document.getElementById('aromaChatSend');

  if (!trigger || !panel) return;

  let isOpen  = false;
  let greeted = false;
  let lastTopic = null; // tracks conversation context

  // ── OPEN / CLOSE ──────────────────────────────────────────────
  function openChat() {
    isOpen = true;
    panel.classList.add('open');
    trigger.classList.add('hidden');
    if (!greeted) { greeted = true; setTimeout(sendWelcome, 420); }
    setTimeout(() => input && input.focus(), 440);
  }
  function closeChat() {
    isOpen = false;
    panel.classList.remove('open');
    trigger.classList.remove('hidden');
  }
  trigger.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeChat(); });

  // ── WELCOME ───────────────────────────────────────────────────
  function sendWelcome() {
    addMessage('bot',
      'Welcome to the House of Aroma ✦\n\nI am your personal fragrance advisor. I can help you with scent recommendations, fragrance families, occasion wear, gifting, ingredients, pricing, delivery and much more.\n\nHow may I assist you today?'
    );
  }

  // ── INTENT ENGINE ─────────────────────────────────────────────
  // Each intent: { id, score fn, replies[] }
  // score() returns 0–N based on how many signals match.
  // Highest score wins. Replies rotate randomly for variety.

  const intents = [

    // ── GREETINGS ──
    { id: 'greeting',
      score: q => count(q, ['hi','hello','hey','good morning','good afternoon','good evening','good night','greetings','howdy','bonjour','salut','hiya','sup','whats up','what\'s up']),
      replies: [
        'Good day. Welcome to the House of Aroma — where every scent tells a story. How may I guide you today?',
        'Bonjour and welcome! I am delighted you are here. Whether you seek a signature scent, a gift, or simply wish to explore, I am at your service.',
        'A warm welcome to Aroma. I am your personal fragrance consultant — please feel free to ask me anything about our collection or the art of perfumery.'
      ]
    },

    // ── HOW ARE YOU / SMALL TALK ──
    { id: 'smalltalk',
      score: q => count(q, ['how are you','how r you','are you okay','you good','how do you do','what are you','who are you','are you a bot','are you human','are you real','are you ai','are you robot']),
      replies: [
        'I am an Aroma fragrance advisor — always at your service and endlessly passionate about scent! I may not have a nose, but I know every note in our collection by heart. What can I help you discover today?',
        'I am doing wonderfully, thank you for asking! I exist to help you find your perfect fragrance. Now — shall we talk scent?',
        'I am an AI advisor crafted for the House of Aroma. Think of me as your personal perfume concierge, available anytime. What fragrance question can I answer for you?'
      ]
    },

    // ── THANK YOU ──
    { id: 'thanks',
      score: q => count(q, ['thank','thanks','thank you','merci','cheers','appreciate','helpful','great help','perfect','wonderful']),
      replies: [
        'It is my absolute pleasure. The House of Aroma is always here for you. Is there anything else I may assist you with?',
        'You are most welcome. If you ever have further questions — about fragrance, an order, or simply the art of scent — do not hesitate to return.',
        'Delighted to be of service. May your chosen fragrance bring you joy every time you wear it. ✦'
      ]
    },

    // ── GOODBYE ──
    { id: 'bye',
      score: q => count(q, ['bye','goodbye','see you','see ya','farewell','ciao','au revoir','take care','ttyl','later','good night','gn']),
      replies: [
        'Au revoir. It has been a pleasure guiding you. The House of Aroma awaits your return. ✦',
        'Until next time. May you wear your fragrance with confidence and grace. Farewell!',
        'Goodbye for now. Do visit us again — and feel free to return anytime you wish to explore the world of scent.'
      ]
    },

    // ── GENERAL RECOMMENDATIONS ──
    { id: 'recommend',
      score: q => count(q, ['recommend','suggestion','suggest','help me choose','what should i','what would you','which one','which perfume','which fragrance','best for me','perfect for me','what do you recommend','advise','advice','guide me','help me pick','pick for me','not sure','confused','don\'t know','dont know']),
      replies: [
        'I would be honoured to guide you. To find your perfect match, tell me a little more — do you prefer warm and oriental notes, cool and fresh accords, soft florals, deep woody tones, or something light and airy? You can also tell me the occasion, your personality, or who it is for.',
        'Choosing a fragrance is deeply personal — let me help you narrow it down. Are you looking for something bold and statement-making, or soft and intimate? For day or evening wear? For yourself or as a gift?',
        'Absolutely! The key to the perfect fragrance lies in understanding your preferences. Tell me: do you love sweet, spicy, earthy, floral, fruity, or clean scents? Even describing a memory or feeling can help me find your ideal match.'
      ]
    },

    // ── BEST SELLERS / POPULAR ──
    { id: 'bestseller',
      score: q => count(q, ['best seller','bestseller','best selling','most popular','top seller','most loved','most bought','trending','fan favourite','customer favourite','number one','most sold','iconic','signature','famous']),
      replies: [
        'Our absolute bestsellers are:\n\n✦ Velour Noir — A deep oriental of oud, amber and smoky incense. Commanding and unforgettable.\n✦ Lumière Blanche — An ethereal white floral with orris and musk. Timeless femininity.\n✦ Oud Royale — Cambodian oud meets leather and sandalwood. Pure luxury.\n✦ Rose Imperiale — Bulgarian rose and warm amber. The most romantic of our collection.\n\nWould you like more detail on any of these?',
        'The creations our clients return to again and again:\n\n✦ Velour Noir — Dark, rich, and utterly seductive\n✦ Lumière Blanche — Soft, radiant, effortlessly elegant\n✦ Cedar & Cuir — Sharp, modern, masculine sophistication\n✦ Santal Doux — Creamy sandalwood with a warm vanilla heart\n\nAny of these speak to you?'
      ]
    },

    // ── FOR MEN ──
    { id: 'men',
      score: q => count(q, ['for men','men\'s','mens','for him','for man','for a man','masculine','boyfriend','husband','father','dad','brother','son','male','gentleman','man','guy','he ',' him',' his']),
      replies: [
        'For the distinguished gentleman, our finest masculine creations:\n\n✦ Oud Royale — Cambodian oud, leather, dark incense. Bold and powerful.\n✦ Noir Absolu — Cedar, vetiver, tobacco. The modern man\'s signature.\n✦ Cedar & Cuir — Crisp wood, leather and a hint of smoke. Refined yet edgy.\n✦ Bleu Arctique — Crisp aquatic with sea salt and white cedar. Clean and sharp.\n✦ Ambre Noir — Warm amber, musk and spice. Deep and seductive.\n\nWould you like to explore any of these further?',
        'A fragrance for a man should reflect his character. Tell me — is he classic and refined, bold and adventurous, or cool and understated? Each answer leads to a different masterpiece in our collection.'
      ]
    },

    // ── FOR WOMEN ──
    { id: 'women',
      score: q => count(q, ['for women','women\'s','womens','for her','for woman','feminine','girlfriend','wife','mother','mom','mum','sister','daughter','female','lady','ladies','she ',' her',' hers']),
      replies: [
        'For the exceptional woman, our most beloved feminine creations:\n\n✦ Lumière Blanche — White rose, orris, soft musk. Ethereal and pure.\n✦ Rose Imperiale — Bulgarian rose, warm amber, sandalwood. Deeply romantic.\n✦ Fleur de Soie — Peony, jasmine, silk musk. Playful and sophisticated.\n✦ Velvet Iris — Iris, violet, creamy woods. Powdery and luxurious.\n✦ Nuit Dorée — Ylang ylang, vanilla, golden amber. Sensuous evening wear.\n\nWould you like to explore any of these further?',
        'Every woman deserves a fragrance that feels like it was made only for her. Is she soft and romantic, bold and modern, fresh and carefree, or deep and mysterious? Tell me more and I will find her perfect match.'
      ]
    },

    // ── UNISEX / GENDER NEUTRAL ──
    { id: 'unisex',
      score: q => count(q, ['unisex','gender neutral','for anyone','for both','neutral','androgynous','non binary','nonbinary','shared','couple','both of us','him and her','her and him']),
      replies: [
        'Our unisex and gender-fluid creations are among our most celebrated:\n\n✦ Santal Doux — Creamy sandalwood, warm vanilla, musk. Beautifully universal.\n✦ Oud Blanc — White oud, rose water, cedarwood. Soft yet complex.\n✦ Terra Lumina — Vetiver, amber, bergamot. Earthy and radiant.\n✦ Encens Sacré — Sacred incense, resin, soft woods. Deeply meditative.\n\nThese are loved equally by all — perfect for couples or those who prefer a fragrance beyond category.',
        'Several of our finest fragrances transcend gender entirely. Santal Doux, Oud Blanc, and Encens Sacré are particularly beloved by those seeking a truly personal — rather than gendered — scent experience.'
      ]
    },

    // ── LIGHT / SOFT / SUBTLE ──
    { id: 'light',
      score: q => count(q, ['light','soft','subtle','gentle','delicate','airy','fresh light','not too strong','not strong','mild','quiet','understated','barely there','skin scent','close to skin','intimate','sheer']),
      replies: [
        'For those who prefer a softer, more intimate fragrance presence:\n\n✦ Lumière Blanche — Sheer white florals, barely-there musk. Like clean skin.\n✦ Fleur de Soie — Light peony and jasmine with a silky dry-down.\n✦ Brume Marine — Cool sea breeze, aquatic musk, soft driftwood. Effortlessly light.\n✦ Velvet Iris — Powdery iris that sits close to the skin all day.\n\nThese are perfect for those who love scent without announcement — a beautiful secret on your skin.',
        'A light fragrance can be the most intimate luxury of all. Our Lumière Blanche and Brume Marine collections are renowned for their whisper-soft presence — elegant without overwhelming.'
      ]
    },

    // ── STRONG / INTENSE / BOLD ──
    { id: 'strong',
      score: q => count(q, ['strong','intense','powerful','bold','heavy','rich','deep','dark','statement','loud','projection','beast mode','beastly','hard','hard hitting','powerful scent','long projection','noticeable','turn heads','head turning']),
      replies: [
        'For those who wish to make an unforgettable impression:\n\n✦ Oud Royale — Cambodian oud with smoky incense and leather. Commands every room.\n✦ Velour Noir — Dark amber, oud, resinous spice. Deeply intoxicating sillage.\n✦ Ambre Noir — Rich amber, black musk, warm spice. Heady and enveloping.\n✦ Encens Sacré — Sacred incense, dark woods, resin. A bold spiritual statement.\n\nThese are fragrances that precede you and linger long after you leave.',
        'If presence and projection are your priority, our oud and amber-based fragrances are unmatched. Oud Royale and Velour Noir are legendary for their exceptional sillage and hours of powerful projection.'
      ]
    },

    // ── LONG LASTING ──
    { id: 'longlasting',
      score: q => count(q, ['long lasting','longlasting','all day','lasts long','hours','sillage','projection','longevity','stays','how long','won\'t fade','no fade','performance','long wear','24 hour','whole day','morning to night','evening to morning']),
      replies: [
        'All Aroma fragrances are Eau de Parfum concentration — our minimum standard for exceptional longevity.\n\nFor the absolute longest wear, we recommend:\n\n✦ Oud Royale — 12–16 hours, extraordinary projection\n✦ Ambre Noir — 10–14 hours, warm and persistent\n✦ Velour Noir — 10–13 hours, enveloping sillage\n✦ Encens Sacré — 10–12 hours, meditative depth\n\nPro tip: Apply to pulse points (wrists, neck, behind the knees) and on moisturised skin for maximum longevity.',
        'Longevity is a hallmark of the Aroma house. Our oud and amber-heavy compositions are particularly celebrated — clients regularly report wearing Oud Royale for over 12 hours with no reapplication. Apply post-shower on unscented skin for best results.'
      ]
    },

    // ── FRESH / CLEAN ──
    { id: 'fresh',
      score: q => count(q, ['fresh','clean','crisp','aquatic','citrus','bright','cool','cooling','summery','summer','daytime','office','work','professional','light fresh','green','herbal','ozonic','sea','ocean','water','rain','morning']),
      replies: [
        'For a fresh, clean fragrance presence, our finest:\n\n✦ Brume Marine — Sea salt, aquatic accord, white cedar. Like ocean air.\n✦ Bleu Arctique — Arctic freshness with bergamot and crisp white woods.\n✦ Citrus Nobilis — Sicilian bergamot, lemon zest, vetiver. Bright and radiant.\n✦ Thé Vert — Green tea, bamboo, soft musk. Serene and clean.\n✦ Fleur de Soie — Light floral freshness ideal for daily professional wear.\n\nPerfect for warm weather, office environments, or any moment requiring effortless freshness.',
        'Fresh fragrances are endlessly wearable — especially for daytime and professional settings. Our Brume Marine and Bleu Arctique are among our most versatile, loved by clients who seek an effortlessly polished presence without heaviness.'
      ]
    },

    // ── FLORAL ──
    { id: 'floral',
      score: q => count(q, ['floral','flower','flowers','rose','jasmine','peony','iris','violet','lily','orchid','gardenia','tuberose','magnolia','feminine floral','romantic','bloom','bouquet','petal']),
      replies: [
        'Our floral collection is a celebration of the world\'s most exquisite blooms:\n\n✦ Rose Imperiale — Bulgarian rose, amber, sandalwood. Rich and romantic.\n✦ Lumière Blanche — White rose, orris, whisper musk. Pure and radiant.\n✦ Fleur de Soie — Peony, jasmine, silk musk. Fresh and playful.\n✦ Velvet Iris — Iris, violet leaf, creamy woods. Powdery and sophisticated.\n✦ Jasmin Précieux — Sambac jasmine, tuberose, warm amber. Heady and sensuous.\n\nIs there a particular bloom or mood you are drawn to?',
        'Flowers have inspired perfumers for centuries — and our floral collection honours that tradition with rare, sustainably sourced ingredients. From the purest white rose to the most opulent jasmine, each creation tells a different floral story.'
      ]
    },

    // ── ORIENTAL / SPICY ──
    { id: 'oriental',
      score: q => count(q, ['oriental','oud','spicy','spice','warm','earthy','smoky','smoke','incense','resin','amber','balsamic','exotic','middle eastern','arabic','arabian','musky','musk','pepper','cardamom','saffron','tobacco','vanilla','sensuous','seductive']),
      replies: [
        'Our oriental collection is an invitation to the exotic:\n\n✦ Oud Royale — Cambodian oud, leather, dark incense. Pure opulence.\n✦ Velour Noir — Oud, amber, smoky resin. Deeply intoxicating.\n✦ Ambre Noir — Black amber, warm musk, cardamom. Rich and enveloping.\n✦ Encens Sacré — Sacred incense, myrrh, sandalwood. Spiritual depth.\n✦ Saffron & Silk — Iranian saffron, rose, oud, honey. A masterpiece of the East.\n\nThese are fragrances for those who appreciate depth, complexity, and an almost hypnotic presence.',
        'Oriental fragrances are the most complex in the world of perfumery — built on layers of warmth, spice, and resin that unfold over hours. Our Oud Royale is regarded by collectors worldwide as one of the finest expressions of this tradition.'
      ]
    },

    // ── WOODY / EARTHY ──
    { id: 'woody',
      score: q => count(q, ['woody','wood','woods','sandalwood','cedarwood','cedar','vetiver','patchouli','earthy','soil','forest','tree','bark','nature','natural','grounding','rooted','timber','teak','walnut']),
      replies: [
        'Our woody collection is rooted in nature\'s finest materials:\n\n✦ Santal Doux — Mysore sandalwood, creamy vanilla, soft musk. Warm and comforting.\n✦ Cedar & Cuir — Crisp cedar, leather, dark woods. Sharp masculine elegance.\n✦ Terra Lumina — Vetiver, earthy amber, bergamot. Rooted and radiant.\n✦ Bois Sacré — Sacred woods, incense, dry amber. A forest temple in a bottle.\n✦ Noir Absolu — Cedar, vetiver, tobacco leaf. Modern masculine sophistication.\n\nWoody fragrances offer timeless elegance — grounding, complex, and universally respected.'
      ]
    },

    // ── SWEET / GOURMAND ──
    { id: 'sweet',
      score: q => count(q, ['sweet','sugar','candy','caramel','chocolate','vanilla','honey','gourmand','dessert','foody','food','edible','warm sweet','delicious','yummy','soft sweet','praline','tonka','almond','coconut','fruity','fruit','peach','berry','fig','plum']),
      replies: [
        'For those with a love of warmth and sweetness:\n\n✦ Santal Doux — Sandalwood, vanilla, warm musk. Deliciously comforting.\n✦ Nuit Dorée — Vanilla, ylang ylang, golden amber. Seductive sweetness.\n✦ Miel & Soie — Wild honey, beeswax, soft woods. Golden and luminous.\n✦ Rose Imperiale — Rose, amber, a whisper of fruity sweetness.\n✦ Velour Noir — Dark amber with a hint of sweetened resin.\n\nOur sweet fragrances are sophisticated — never cloying, always elegant.',
        'Sweetness in fragrance is an art form — the best compositions use it sparingly, as a background warmth rather than a main note. Our Santal Doux and Nuit Dorée exemplify this beautifully.'
      ]
    },

    // ── OCCASION: DAILY WEAR ──
    { id: 'daily',
      score: q => count(q, ['everyday','every day','daily','casual','casual wear','regular','daytime','day wear','office','work','professional','meeting','9 to 5','9-5','commute','all purpose','versatile','wearable','go to','goto']),
      replies: [
        'For effortless everyday elegance, we recommend:\n\n✦ Lumière Blanche — Light, clean, universally loved. Office-perfect.\n✦ Citrus Nobilis — Bright bergamot, clean and energising for mornings.\n✦ Thé Vert — Green tea and soft musk. Quietly sophisticated all day.\n✦ Fleur de Soie — Playful florals, ideal from desk to dinner.\n✦ Santal Doux — Creamy and understated, a beautiful daily signature.\n\nThe best everyday fragrance is one you reach for without thinking — a second skin.',
        'A daily fragrance should be effortless, inoffensive to those around you, yet distinctly yours. Our Lumière Blanche and Citrus Nobilis are among our most-repurchased — clients call them their "invisible uniform."'
      ]
    },

    // ── OCCASION: EVENING / NIGHT ──
    { id: 'evening',
      score: q => count(q, ['evening','night','nighttime','date','date night','dinner','party','occasion','event','gala','cocktail','romantic evening','romantic night','going out','clubbing','club','bar','restaurant','wedding','special occasion']),
      replies: [
        'For an unforgettable evening presence:\n\n✦ Velour Noir — Dark oud and amber. A fragrance for those who wish to be remembered.\n✦ Nuit Dorée — Warm ylang ylang, vanilla, golden amber. Sensuous and alluring.\n✦ Jasmin Précieux — Tuberose and jasmine at their most opulent.\n✦ Saffron & Silk — Iranian saffron, rose, oud. Exotic and breathtaking.\n✦ Ambre Noir — Rich and enveloping — perfect for an intimate evening.\n\nEvening fragrances reward boldness. These are made for the moments worth remembering.',
        'Evening wear calls for depth, warmth and projection. Our Velour Noir is consistently our most chosen fragrance for special occasions — its sillage is extraordinary, and it leaves an impression that outlasts the evening itself.'
      ]
    },

    // ── OCCASION: DATE / ROMANTIC ──
    { id: 'romantic',
      score: q => count(q, ['romantic','romance','date','seduce','seductive','attractive','sexy','sensual','intimate','love','attract','alluring','date night','anniversary','valentine','passion','flirty','flirt']),
      replies: [
        'For romance and seduction, these are our most beloved:\n\n✦ Nuit Dorée — Ylang ylang, vanilla, golden amber. Irresistibly warm and sensuous.\n✦ Rose Imperiale — Deep rose and amber with a soft skin musk. Quintessentially romantic.\n✦ Jasmin Précieux — Tuberose and jasmine — intoxicating and deeply feminine.\n✦ Velour Noir — Dark, smouldering oud and amber. The most seductive in our collection.\n✦ Saffron & Silk — Exotic, mysterious, utterly captivating.\n\nScent is the most powerful of all attraction tools. Choose wisely.',
        'A romantic fragrance should feel like a secret between you and the person closest to you. Our Nuit Dorée and Rose Imperiale are enduringly popular for dates and anniversaries — both have been called "unforgettable" by clients and their admirers alike.'
      ]
    },

    // ── OCCASION: SUMMER / WARM WEATHER ──
    { id: 'summer',
      score: q => count(q, ['summer','hot weather','warm weather','holiday','vacation','beach','tropical','resort','poolside','sun','sunshine','heat','humid','warm climate','mediterranean']),
      replies: [
        'For warm weather and sun-drenched days:\n\n✦ Brume Marine — Sea breeze, aquatic musk, driftwood. Born for the coast.\n✦ Citrus Nobilis — Bergamot and lemon in full Sicilian sun.\n✦ Bleu Arctique — Crisp, refreshing, endlessly wearable in heat.\n✦ Fleur de Soie — Light florals that bloom beautifully in warm air.\n✦ Thé Vert — Green tea freshness that feels cooling even in summer.\n\nHeat amplifies fragrance — in summer, lighter compositions sing.'
      ]
    },

    // ── OCCASION: WINTER / COLD WEATHER ──
    { id: 'winter',
      score: q => count(q, ['winter','cold','cold weather','autumn','fall','cozy','cosy','warm','fireside','christmas','festive','season','chilly','freezing','snow','december','november','october']),
      replies: [
        'For cold weather and cosy evenings by the fire:\n\n✦ Oud Royale — Deep oud and leather. Made for cold, dark evenings.\n✦ Ambre Noir — Warm amber and spice. A luxurious winter blanket.\n✦ Encens Sacré — Incense and sacred woods. Perfect for the festive season.\n✦ Santal Doux — Creamy sandalwood and vanilla. Warmth in a bottle.\n✦ Velour Noir — Rich and smoky. Spectacular in cold air.\n\nCold air holds fragrance close — winter is when our deepest compositions truly come alive.'
      ]
    },

    // ── GIFTING ──
    { id: 'gift',
      score: q => count(q, ['gift','present','gifting','birthday','christmas','anniversary','surprise','wrap','box','packaging','luxury gift','for someone','for a friend','for someone special','giving','give','treat','spoil']),
      replies: [
        'A fragrance is the most personal and lasting of all gifts. For gifting, we recommend:\n\n✦ Velour Noir Gift Set — Our bestseller in signature black gift packaging.\n✦ Discovery Collection — Six 10ml vials of our most beloved creations. Perfect for the curious.\n✦ Rose Imperiale — Universally loved and presented in exquisite bottle design.\n✦ Oud Royale — A gift that speaks of extraordinary taste and generosity.\n\nAll orders include complimentary gift wrapping upon request. Shall I help you narrow it down further?',
        'Nothing says luxury quite like a bespoke fragrance gift. We offer personalised gift wrapping and handwritten cards with every order. If you tell me a little about the recipient — their personality, preferences, or the occasion — I can recommend the ideal creation.'
      ]
    },

    // ── NEW ARRIVALS ──
    { id: 'new',
      score: q => count(q, ['new','new arrival','latest','newest','just launched','recently launched','what\'s new','whats new','new collection','2024','limited','exclusive','launch']),
      replies: [
        'Our most recent additions to the Aroma Atelier:\n\n✦ Saffron & Silk — Our newest masterpiece. Iranian saffron, Damask rose, aged oud, honey. A jewel of the collection.\n✦ Terra Lumina — Earthy vetiver and radiant amber. Inspired by sun-warmed Moroccan earth.\n✦ Bois Sacré — Sacred woods, white incense, dry amber. A deeply spiritual creation.\n\nAll new arrivals are available with complimentary samples. Shall I tell you more about any of these?'
      ]
    },

    // ── LIMITED EDITION ──
    { id: 'limited',
      score: q => count(q, ['limited','limited edition','exclusive','rare','collector','collectors','one of a kind','special','bespoke','unique','only','few','numbered','rare ingredient']),
      replies: [
        'Our Limited Edition and Collector creations represent the absolute pinnacle of the Aroma house:\n\n✦ Saffron & Silk Limited — Only 500 bottles worldwide. Iranian saffron and aged oud.\n✦ Encens Sacré Grand Reserve — Aged incense accord, 12-year matured resins.\n✦ Oud Royale Private Collection — Sourced from a single Cambodian oud plantation.\n\nThese are made for those who understand that true luxury lies in rarity. Quantities are strictly limited.'
      ]
    },

    // ── INGREDIENTS / NOTES ──
    { id: 'ingredients',
      score: q => count(q, ['ingredient','note','notes','top note','heart note','base note','accord','what\'s in','whats in','made of','contain','composition','formula','what does it smell','smell like','describe','profile','olfactory']),
      replies: [
        'In the art of perfumery, fragrances are composed in three layers:\n\n✦ Top Notes — The first impression (citrus, bergamot, green herbs). Last 15–30 minutes.\n✦ Heart Notes — The soul of the fragrance (florals, spice, woods). Last 2–4 hours.\n✦ Base Notes — The lasting memory (oud, amber, musk, sandalwood). Last 6–12+ hours.\n\nWould you like me to describe the specific note profile of any fragrance in our collection?',
        'The finest fragrances use rare, ethically sourced ingredients — Bulgarian rose, Cambodian oud, Iranian saffron, Mysore sandalwood. At Aroma, we never compromise on raw material quality. Which fragrance\'s composition would you like me to describe?'
      ]
    },

    // ── OUD ──
    { id: 'oud',
      score: q => count(q, ['oud','aoud','oudy','oud based','cambodian oud','arabic oud','wood oud','dark oud','white oud']),
      replies: [
        'Oud is the most precious raw material in perfumery — sourced from the infected heartwood of the Aquilaria tree, aged for decades before extraction.\n\nOur oud creations:\n\n✦ Oud Royale — Cambodian oud at its most commanding\n✦ Saffron & Silk — Rose and oud in perfect harmony\n✦ Oud Blanc — White oud for those seeking softness with depth\n✦ Velour Noir — Oud blended with dark amber and resin\n\nOur oud is ethically and sustainably sourced — a commitment we take with great pride.'
      ]
    },

    // ── ROSE ──
    { id: 'rose',
      score: q => count(q, ['rose','bulgarian rose','turkish rose','rose water','rose gold','rose scent']),
      replies: [
        'The rose is the queen of all florals — and at Aroma, we source exclusively from the Bulgarian rose valleys of Kazanlak.\n\n✦ Rose Imperiale — Our purest rose expression. Rich, dewy, deeply romantic.\n✦ Lumière Blanche — White rose with iris. Soft and ethereal.\n✦ Saffron & Silk — Damask rose elevated by saffron and oud. Exotic and opulent.\n✦ Jasmin Précieux — Rose and jasmine in an intoxicating floral duet.\n\nIs there a particular rose mood you are seeking — romantic, fresh, or opulent?'
      ]
    },

    // ── VANILLA ──
    { id: 'vanilla',
      score: q => count(q, ['vanilla','vanillic','vanilla based','warm vanilla','sweet vanilla']),
      replies: [
        'Vanilla adds warmth, sweetness and sensuality to a fragrance without overwhelming it — when used well, it is among the most luxurious of all base notes.\n\n✦ Santal Doux — Sandalwood and vanilla. Comforting and universal.\n✦ Nuit Dorée — Vanilla as a golden, sensuous base. Our most romantic evening fragrance.\n✦ Miel & Soie — Honey and beeswax with a whisper of vanilla warmth.\n\nVanilla-based fragrances are particularly beloved in autumn and winter.'
      ]
    },

    // ── SKIN TYPE / APPLICATION ──
    { id: 'application',
      score: q => count(q, ['apply','application','how to wear','wear','how to use','where to spray','pulse point','wrist','neck','how much','how many sprays','tips','advice on wearing','last longer on me','dry skin','oily skin','skin chemistry']),
      replies: [
        'To get the most from your Aroma fragrance:\n\n✦ Apply to pulse points — wrists, neck, behind the ears, inside elbows, behind the knees.\n✦ Moisturise first — fragrance clings to hydrated skin far longer.\n✦ Do not rub your wrists together — this crushes the top notes.\n✦ Spray from 15–20cm for even distribution.\n✦ For maximum longevity, apply post-shower before dressing.\n\nDry skin types may find they need to reapply slightly more frequently — a light unscented moisturiser underneath works beautifully.',
        'The art of wearing fragrance is in the application. Less is often more — one or two sprays on pulse points allows the fragrance to evolve naturally on your skin. Oily skin tends to hold fragrance longer, while dry skin benefits from a moisturiser base.'
      ]
    },

    // ── EDP VS EDT ──
    { id: 'concentration',
      score: q => count(q, ['edp','edt','eau de parfum','eau de toilette','concentration','parfum','extrait','cologne','difference between','which is stronger','which is better edp','which is better edt']),
      replies: [
        'Fragrance concentrations, from weakest to strongest:\n\n✦ Eau de Cologne (EDC) — 2–4% concentration. Light, very fresh.\n✦ Eau de Toilette (EDT) — 5–15%. Everyday wear, moderate longevity.\n✦ Eau de Parfum (EDP) — 15–20%. Rich, long-lasting. Our standard.\n✦ Parfum / Extrait — 20–30%+. The purest, most concentrated form.\n\nAll Aroma fragrances are created as Eau de Parfum, ensuring 8–14 hours of wear. Our Private Collection range is offered as Extrait for those seeking ultimate intensity.'
      ]
    },

    // ── PRICE / BUDGET ──
    { id: 'price',
      score: q => count(q, ['price','cost','how much','expensive','affordable','budget','cheap','value','worth it','pricing','cost of','what does it cost','price range','starting from','most affordable','cheapest','luxury price']),
      replies: [
        'Our collection is priced to reflect the extraordinary quality of raw materials and craftsmanship involved:\n\n✦ Classic Collection (50ml) — From $185\n✦ Signature Collection (100ml) — From $265\n✦ Limited Edition (50–75ml) — From $320\n✦ Private Collection / Extrait (30ml) — From $420\n\nEvery bottle represents hundreds of hours of meticulous craftsmanship. And every order above $150 includes three complimentary sample vials.',
        'Luxury has a price — but at Aroma, we believe that price must be justified through exceptional ingredients, uncompromising quality, and lasting wear. Our entry point of $185 places our fragrances among the world\'s finest, yet below many comparable luxury houses.'
      ]
    },

    // ── SAMPLES ──
    { id: 'samples',
      score: q => count(q, ['sample','samples','trial','try before','tester','vial','vials','discovery set','try first','smell first','before buying','before i buy','test']),
      replies: [
        'We firmly believe you should experience before committing.\n\n✦ Every order above $150 includes three complimentary sample vials, hand-selected based on your stated preferences.\n✦ Our Discovery Set — six 10ml vials of our most beloved creations — is available for $65 and fully redeemable against a full purchase.\n✦ In-store visitors may experience our full collection with the guidance of a personal perfumer.\n\nTell me your preferences and I can suggest which samples to request.',
        'Fragrance is deeply personal — no photograph or description can replace the experience of wearing it on your skin. Our Discovery Set is the perfect starting point, and many clients find their signature scent through this journey.'
      ]
    },

    // ── DELIVERY / SHIPPING ──
    { id: 'delivery',
      score: q => count(q, ['delivery','shipping','ship','deliver','arrive','how long','dispatch','track','tracking','order','send','sent','estimated','when will','how fast','express','next day','international','worldwide']),
      replies: [
        'Our shipping options:\n\n✦ Standard Delivery — 3–5 business days. Complimentary on orders above $150.\n✦ Express Delivery — 1–2 business days. Available for a small premium.\n✦ International Shipping — Available to 42+ countries. Rates vary by destination.\n✦ Paris In-Store Collection — Available from our Rue de la Paix maison.\n\nAll orders are dispatched in our signature packaging within 24 hours of confirmation. You will receive a tracking number by email.',
        'We ship worldwide and take great care with every dispatch — your fragrance arrives in our signature box, wrapped as a gift whether it is for you or another. Orders above $150 enjoy complimentary delivery.'
      ]
    },

    // ── RETURNS ──
    { id: 'returns',
      score: q => count(q, ['return','refund','exchange','send back','money back','not happy','doesn\'t suit','doesn\'t work','wrong','mistake','damaged','broken','replace','replacement','warranty','policy','return policy']),
      replies: [
        'Your satisfaction is our absolute priority.\n\n✦ Unopened, sealed fragrances may be returned within 7 days of receipt for a full refund.\n✦ Damaged or incorrect items will be replaced at no cost — simply contact us within 48 hours.\n✦ To arrange a return: hello@aromahouse.com with your order number.\n\nWe do not accept returns of opened fragrances due to hygiene reasons — which is precisely why we offer generous samples before purchase.',
        'We stand behind every creation we dispatch. If your order arrives damaged, incorrect, or if you are not completely satisfied with an unopened purchase, please reach us at hello@aromahouse.com and we will resolve it with utmost care and speed.'
      ]
    },

    // ── LOCATION / STORE ──
    { id: 'location',
      score: q => count(q, ['location','store','shop','boutique','visit','address','where','showroom','maison','paris','physical store','come in','walk in','appointment','in person','in-store','france','rue de la paix']),
      replies: [
        'Our maison:\n\n✦ Address: 14 Rue de la Paix, 75002 Paris, France\n✦ Nearest Métro: Opéra (Lines 3, 7, 8) — 2 minute walk\n✦ Hours: Monday–Saturday 10am–7pm | Sunday 12pm–5pm\n✦ Parking: Indigo Opéra, Place de l\'Opéra, 5 minutes\n\nPrivate consultations with our master perfumers are available by appointment. We recommend booking in advance for the most personalised experience.',
        'We welcome visitors to our Paris atelier on Rue de la Paix — a quiet, intimate space dedicated to the art of fragrance. A personal consultation with one of our perfumers is an experience unlike any other. Book via contact@aromahouse.com.'
      ]
    },

    // ── CONTACT ──
    { id: 'contact',
      score: q => count(q, ['contact','email','phone','call','reach','speak','talk','customer service','support','helpline','whatsapp','chat live','human','real person','agent','representative']),
      replies: [
        'You may reach our team through the following:\n\n✦ Email: hello@aromahouse.com (response within 24 hours)\n✦ Press & Media: press@aromahouse.com\n✦ Telephone: +33 (0)1 42 68 25 00\n✦ Hours: Monday–Friday, 9am–6pm CET\n✦ In Person: 14 Rue de la Paix, Paris (by appointment)\n\nFor urgent matters, telephone is recommended.',
        'Our client care team is available Monday to Friday, 9am to 6pm CET. You can also reach us anytime at hello@aromahouse.com — we aim to respond to all enquiries within one business day.'
      ]
    },

    // ── OFFERS / DISCOUNTS ──
    { id: 'offers',
      score: q => count(q, ['offer','offers','discount','sale','promo','promotion','code','voucher','deal','coupon','special offer','free','complimentary','saving','reduced','percentage off','10% off','20% off','newsletter discount']),
      replies: [
        'Current benefits and offers at Aroma:\n\n✦ Free Shipping on all orders above $150\n✦ Three complimentary sample vials with every qualifying order\n✦ Newsletter subscribers receive early access to limited releases and private event invitations\n✦ Discovery Set ($65) fully redeemable against your first full purchase\n✦ Complimentary gift wrapping on all orders upon request\n\nSubscribe to our newsletter at the bottom of any page for exclusive member benefits.',
        'We do not run traditional sales — instead, we offer ongoing value: complimentary samples, free shipping thresholds, and exclusive access for newsletter subscribers. Our philosophy is that a luxury fragrance should never be discounted — only celebrated.'
      ]
    },

    // ── SUSTAINABILITY / ETHICS ──
    { id: 'sustainability',
      score: q => count(q, ['sustainable','sustainability','ethical','cruelty free','vegan','environment','eco','green','natural','organic','sourcing','ingredients source','responsible','planet','carbon','packaging','recyclable','biodegradable']),
      replies: [
        'Sustainability is not a trend at Aroma — it is a founding principle:\n\n✦ All oud is ethically farmed from CITES-certified Aquilaria plantations\n✦ Bulgarian and Grasse roses are sourced from sustainable cooperatives\n✦ Our packaging is 100% recyclable — outer boxes use FSC-certified card\n✦ We are committed to cruelty-free formulation — no animal testing\n✦ Our Paris atelier runs on 100% renewable energy\n\nWe believe the most luxurious thing we can offer is a fragrance made without compromise — to the environment or to ethics.'
      ]
    },

    // ── PACKAGING ──
    { id: 'packaging',
      score: q => count(q, ['packaging','bottle','box','presentation','how does it come','design','bottle design','beautiful','aesthetic','unboxing','wrap','unwrap','luxury box','black box','gift box']),
      replies: [
        'The presentation of an Aroma fragrance is itself a luxury experience:\n\n✦ Bottles are handcrafted glass with a weighted, lacquered cap\n✦ Each fragrance comes in a matte black signature box lined with silk tissue\n✦ Gift orders include a satin ribbon and space for a personalised card\n✦ Limited editions feature hand-numbered certificates of authenticity\n\nMany of our clients keep the bottles as objects of art long after the fragrance is finished.',
        'We designed our packaging to be worthy of what is inside it. Every element — from the heavy glass bottle to the gold-embossed box — reflects the same standard of excellence as the fragrance itself.'
      ]
    },

    // ── HOW TO CHOOSE / QUIZ ──
    { id: 'quiz',
      score: q => count(q, ['quiz','personality','what suits me','which suits','my personality','my style','style quiz','fragrance quiz','help me find','find my scent','scent profile','what type am i','which family','fragrance family']),
      replies: [
        'Let\'s find your signature scent together. Answer these three questions:\n\n1️⃣ What word best describes you? (Bold / Gentle / Mysterious / Fresh / Romantic)\n2️⃣ When do you wear fragrance most? (Daily / Evening / Special occasions / Always)\n3️⃣ What scents do you love in nature? (Flowers / Woods / Sea air / Spices / Earth)\n\nTell me your answers and I will match you to your perfect Aroma creation.',
        'Finding your signature fragrance is a beautiful process of self-discovery. To guide you perfectly, could you tell me: do you tend to prefer warm, enveloping scents or cool, fresh ones? And are you dressing your scent for day, night, or both?'
      ]
    },

    // ── ABOUT THE BRAND ──
    { id: 'brand',
      score: q => count(q, ['about','brand','story','history','founded','who are you','aroma house','the house','heritage','maison','perfumers','master perfumer','team','founder','when was','since','established','est.']),
      replies: [
        'The House of Aroma was founded in 2012 by a collective of master perfumers united by a singular belief: that fragrance is the most intimate form of art.\n\nFrom our atelier on Rue de la Paix in Paris, we craft each creation with rare ingredients sourced from Grasse, the Bulgarian rose valleys, Cambodian forests, and beyond.\n\nOver 12 years, 200+ fragrances, and clients in 42 countries — we remain an independent house, answerable only to the pursuit of olfactory excellence.',
        'Aroma is an independent luxury fragrance house based in Paris. Founded in 2012, we have built our reputation on uncompromising quality — rare ingredients, master craftsmanship, and creations that endure. Every bottle we produce tells a story worth wearing.'
      ]
    },

    // ── CUSTOMISATION / BESPOKE ──
    { id: 'bespoke',
      score: q => count(q, ['bespoke','custom','customise','customize','personal','personalised','personalized','made for me','one of a kind','private','commission','create','create a fragrance','unique to me','my own']),
      replies: [
        'The House of Aroma offers a Private Commission service for those who desire a truly unique creation:\n\n✦ A personal consultation with our master perfumer (Paris or virtual)\n✦ Exploration of your personality, memories, and scent preferences\n✦ Three bespoke fragrance briefs developed for your approval\n✦ Up to two rounds of refinement\n✦ Final creation presented in a hand-engraved bottle\n\nPrivate commissions begin at $2,800. Please contact bespoke@aromahouse.com to begin your journey.',
        'A bespoke Aroma commission is the ultimate luxury — a fragrance that exists nowhere else in the world, created solely for you. Our master perfumers have crafted bespoke creations for private clients, collectors, and luxury brands worldwide. Contact us to discuss.'
      ]
    },

    // ── COMPLAINTS / ISSUES ──
    { id: 'issue',
      score: q => count(q, ['problem','issue','wrong','complaint','not working','broken','didn\'t arrive','lost','missing','never came','bad','unhappy','disappointed','not what i expected','incorrect']),
      replies: [
        'I am sincerely sorry to hear you have encountered a difficulty. Please contact our client care team immediately:\n\n✦ Email: hello@aromahouse.com\n✦ Phone: +33 (0)1 42 68 25 00\n✦ Hours: Mon–Fri, 9am–6pm CET\n\nPlease include your order number and a brief description. We resolve all issues within one business day and your satisfaction is unconditionally guaranteed.',
        'We take every client concern with the utmost seriousness. Whatever the issue, our team will resolve it swiftly and fairly. Please reach us at hello@aromahouse.com with your order number — we will make it right.'
      ]
    },

  ]; // end intents


  // ── SCORING HELPER ─────────────────────────────────────────────
  // counts how many keywords from the list appear in the query
  function count(query, keywords) {
    return keywords.reduce((n, kw) => n + (query.includes(kw) ? 1 : 0), 0);
  }

  // ── SMART REPLY ENGINE ─────────────────────────────────────────
  function getReply(rawText) {
    const q = rawText.toLowerCase().trim();

    // Score every intent
    let best = null, bestScore = 0;
    for (const intent of intents) {
      const s = intent.score(q);
      if (s > bestScore) { bestScore = s; best = intent; }
    }

    // If we got a match, pick a random reply for variety
    if (best && bestScore > 0) {
      lastTopic = best.id;
      const pool = best.replies;
      return pool[Math.floor(Math.random() * pool.length)];
    }

    // ── Contextual follow-ups ──
    if (lastTopic === 'men')      return 'Could you tell me more about his style or the occasion? That will help me narrow down the perfect masculine fragrance for him.';
    if (lastTopic === 'women')    return 'Could you share a little more about her personality or the occasion? I would love to find her ideal match.';
    if (lastTopic === 'recommend') return 'Tell me more — for example, do you prefer something warm and sweet, or cool and fresh? Day or evening? For yourself or a gift?';
    if (lastTopic === 'quiz')     return 'Please share your three answers and I will find your ideal fragrance match right away.';

    // ── Fallback ──
    return 'Forgive me — I didn\'t quite catch that. I am able to help you with fragrance recommendations, our collections, ingredients, pricing, delivery, gifting, and much more. What would you like to explore?';
  }

  // ── MESSAGING ─────────────────────────────────────────────────
  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function addMessage(role, text) {
    const wrap   = document.createElement('div');
    wrap.className = `aroma-msg ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'aroma-msg-bubble';
    // Support \n for multi-line bot messages
    bubble.style.whiteSpace = 'pre-line';
    bubble.textContent = text;
    const time = document.createElement('div');
    time.className = 'aroma-msg-time';
    time.textContent = getTime();
    wrap.appendChild(bubble);
    wrap.appendChild(time);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    return wrap;
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'aroma-typing-indicator';
    wrap.id = 'aromaTyping';
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      dot.className = 'aroma-typing-dot';
      wrap.appendChild(dot);
    }
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }
  function hideTyping() {
    const t = document.getElementById('aromaTyping');
    if (t) t.remove();
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage('user', text);
    showTyping();
    // Slightly longer delay for longer replies — feels more natural
    const delay = 900 + Math.random() * 500;
    setTimeout(() => {
      hideTyping();
      addMessage('bot', getReply(text));
    }, delay);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

})();
}); // end DOMContentLoaded

/* ═══════════════════════════════════════════════════════════════ */
/* END AROMA CHATBOT v2                                           */
/* ═══════════════════════════════════════════════════════════════ */