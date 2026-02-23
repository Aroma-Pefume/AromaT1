/* ═══════════════════════════════════════════════════════════════
   AROMA — backend-integration.js
   ───────────────────────────────────────────────────────────────
   PURPOSE:
     Connects the existing Aroma frontend to the Node.js backend.
     • Intercepts contact form → POST /api/contact
     • Injects checkout modal (via JS, zero HTML edits needed)
     • Hooks "Proceed to Checkout" button → opens modal
     • Submits order form → POST /api/order

   HOW TO ADD TO YOUR SITE:
     Add ONE line at the bottom of every HTML page, just before </body>:
       <script src="backend-integration.js"></script>

   CONFIGURATION:
     Set BACKEND_URL below to match your server address.
     Default: http://localhost:3000  (local development)
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Config ────────────────────────────────────────────────────
  const BACKEND_URL = '';   // Netlify redirects /api/* automatically via netlify.toml

  // ══════════════════════════════════════════════════════════════
  // 1. CONTACT FORM — override submit to call backend
  // ══════════════════════════════════════════════════════════════
  function hookContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();   // prevent any existing handlers from running

      const name    = (document.getElementById('cName')?.value    || '').trim();
      const email   = (document.getElementById('cEmail')?.value   || '').trim();
      const phone   = (document.getElementById('cPhone')?.value   || '').trim();
      const subject = (document.getElementById('cSubject')?.value || '').trim();
      const message = (document.getElementById('cMessage')?.value || '').trim();

      if (!name || !email || !message) {
        if (typeof showToast === 'function') showToast('Please fill all required fields');
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      const origText  = submitBtn?.innerHTML;
      if (submitBtn) {
        submitBtn.disabled   = true;
        submitBtn.innerHTML  = 'Sending…';
      }

      try {
        const res  = await fetch(`${BACKEND_URL}/api/contact`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ name, email, phone, subject, message }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          // Show the existing success state the designers already built
          form.style.display = 'none';
          const successEl = document.getElementById('formSuccess');
          if (successEl) successEl.classList.add('show');
        } else {
          throw new Error(data.message || 'Server error');
        }
      } catch (err) {
        console.error('[Aroma] Contact form error:', err.message);
        if (typeof showToast === 'function') {
          showToast(err.message || 'Could not send message. Please try again.');
        }
        if (submitBtn) {
          submitBtn.disabled  = false;
          submitBtn.innerHTML = origText;
        }
      }
    }, true);  // capture phase so this runs before existing listeners
  }

  // ══════════════════════════════════════════════════════════════
  // 2. CHECKOUT MODAL — inject via JS (no HTML edits)
  //    Styled inline to match the existing Aroma design system.
  // ══════════════════════════════════════════════════════════════
  function injectCheckoutModal() {
    if (document.getElementById('aromaCheckoutModal')) return;

    const styles = `
      #aromaCheckoutModal {
        display: none;
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(14,12,9,0.75);
        backdrop-filter: blur(4px);
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      #aromaCheckoutModal.open { display: flex; }
      .aroma-modal-box {
        background: #fff;
        width: 100%; max-width: 540px;
        max-height: 90vh;
        overflow-y: auto;
        border-radius: 6px;
        box-shadow: 0 32px 80px rgba(0,0,0,0.45);
        animation: aromaModalIn 0.3s ease;
      }
      @keyframes aromaModalIn {
        from { opacity:0; transform: translateY(24px) scale(0.97); }
        to   { opacity:1; transform: translateY(0)    scale(1);    }
      }
      .aroma-modal-header {
        background: #0e0c09;
        padding: 24px 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .aroma-modal-title {
        font-family: Georgia, serif;
        font-size: 1.2rem;
        color: #c6a75e;
        letter-spacing: 0.08em;
      }
      .aroma-modal-close {
        background: none;
        border: none;
        color: rgba(255,255,255,0.5);
        cursor: pointer;
        font-size: 1.4rem;
        line-height: 1;
        padding: 4px 8px;
        transition: color 0.2s;
      }
      .aroma-modal-close:hover { color: #c6a75e; }
      .aroma-modal-body { padding: 32px; }
      .aroma-modal-section {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: #c6a75e;
        margin: 0 0 16px;
      }
      .aroma-modal-order-summary {
        background: #f9f5ee;
        border: 1px solid #e8e0d0;
        border-radius: 4px;
        padding: 16px 20px;
        margin-bottom: 28px;
        font-size: 0.88rem;
        color: #4a4236;
        line-height: 2;
      }
      .aroma-modal-order-row {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ede6d8;
        padding: 6px 0;
      }
      .aroma-modal-order-row:last-child { border: none; font-weight: 700; color: #1a1208; }
      .aroma-field {
        margin-bottom: 16px;
      }
      .aroma-field label {
        display: block;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #7a6e60;
        margin-bottom: 6px;
      }
      .aroma-field input {
        width: 100%;
        border: 1.5px solid #e0d8c8;
        border-radius: 3px;
        padding: 12px 14px;
        font-size: 0.92rem;
        color: #1a1208;
        font-family: Georgia, serif;
        outline: none;
        transition: border-color 0.25s;
        background: #fff;
      }
      .aroma-field input:focus { border-color: #c6a75e; }
      .aroma-field-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
      .aroma-submit-btn {
        width: 100%;
        background: linear-gradient(135deg, #c6a75e, #a88a45);
        color: #0e0c09;
        border: none;
        padding: 16px;
        font-size: 0.82rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        border-radius: 3px;
        cursor: pointer;
        margin-top: 8px;
        transition: opacity 0.25s;
        font-family: Georgia, serif;
      }
      .aroma-submit-btn:hover   { opacity: 0.88; }
      .aroma-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      .aroma-modal-success {
        display: none;
        text-align: center;
        padding: 48px 32px;
      }
      .aroma-modal-success.show { display: block; }
      .aroma-success-icon {
        width: 64px; height: 64px;
        background: linear-gradient(135deg, #c6a75e, #a88a45);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 24px;
        font-size: 1.8rem; color: #fff;
      }
      .aroma-success-title {
        font-family: Georgia, serif;
        font-size: 1.5rem;
        color: #1a1208;
        margin-bottom: 12px;
      }
      .aroma-success-text {
        font-size: 0.9rem;
        color: #7a6e60;
        line-height: 1.8;
        max-width: 360px;
        margin: 0 auto 28px;
      }
      .aroma-success-id {
        display: inline-block;
        background: #f9f5ee;
        border: 1px solid #e8e0d0;
        padding: 10px 24px;
        border-radius: 3px;
        font-size: 0.88rem;
        color: #c6a75e;
        font-weight: 700;
        letter-spacing: 0.1em;
        margin-bottom: 28px;
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    const modalHTML = `
      <div id="aromaCheckoutModal">
        <div class="aroma-modal-box">

          <!-- Header -->
          <div class="aroma-modal-header">
            <div class="aroma-modal-title">Secure Checkout</div>
            <button class="aroma-modal-close" id="aromaModalClose" aria-label="Close">×</button>
          </div>

          <!-- Form -->
          <div class="aroma-modal-body" id="aromaModalBodyForm">

            <!-- Order summary -->
            <div class="aroma-modal-section">Your Order</div>
            <div class="aroma-modal-order-summary" id="aromaOrderSummary">
              <!-- populated by JS -->
            </div>

            <!-- Contact details -->
            <div class="aroma-modal-section">Contact Details</div>
            <div class="aroma-field">
              <label for="coName">Full Name *</label>
              <input type="text" id="coName" placeholder="Your full name" autocomplete="name">
            </div>
            <div class="aroma-field-row">
              <div class="aroma-field">
                <label for="coEmail">Email Address *</label>
                <input type="email" id="coEmail" placeholder="your@email.com" autocomplete="email">
              </div>
              <div class="aroma-field">
                <label for="coPhone">Phone (optional)</label>
                <input type="tel" id="coPhone" placeholder="+1 (000) 000 0000" autocomplete="tel">
              </div>
            </div>

            <!-- Shipping -->
            <div class="aroma-modal-section" style="margin-top:8px;">Shipping Address</div>
            <div class="aroma-field">
              <label for="coAddress">Street Address *</label>
              <input type="text" id="coAddress" placeholder="123 Main Street" autocomplete="street-address">
            </div>
            <div class="aroma-field-row">
              <div class="aroma-field">
                <label for="coCity">City *</label>
                <input type="text" id="coCity" placeholder="City" autocomplete="address-level2">
              </div>
              <div class="aroma-field">
                <label for="coPostcode">Postcode</label>
                <input type="text" id="coPostcode" placeholder="00000" autocomplete="postal-code">
              </div>
            </div>
            <div class="aroma-field">
              <label for="coCountry">Country *</label>
              <input type="text" id="coCountry" placeholder="Country" autocomplete="country-name">
            </div>

            <button class="aroma-submit-btn" id="aromaPlaceOrderBtn">
              Place Order — Cash on Delivery
            </button>

          </div>

          <!-- Success state (hidden initially) -->
          <div class="aroma-modal-success" id="aromaModalSuccess">
            <div class="aroma-success-icon">✓</div>
            <div class="aroma-success-title">Order Confirmed!</div>
            <p class="aroma-success-text">
              Thank you for your order. A confirmation email has been sent to your inbox.
              Your fragrance will be dispatched within 1–2 business days.
            </p>
            <div class="aroma-success-id" id="aromaSuccessOrderId"></div>
            <br>
            <button class="aroma-submit-btn" style="max-width:220px;margin:0 auto;"
                    onclick="document.getElementById('aromaCheckoutModal').classList.remove('open')">
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Close on backdrop click
    document.getElementById('aromaCheckoutModal').addEventListener('click', function (e) {
      if (e.target === this) this.classList.remove('open');
    });
    document.getElementById('aromaModalClose').addEventListener('click', function () {
      document.getElementById('aromaCheckoutModal').classList.remove('open');
    });

    // Place order submit
    document.getElementById('aromaPlaceOrderBtn').addEventListener('click', handleOrderSubmit);
  }

  // ══════════════════════════════════════════════════════════════
  // 3. OPEN CHECKOUT MODAL — called when user clicks checkout
  // ══════════════════════════════════════════════════════════════
  function openCheckoutModal() {
    const modal = document.getElementById('aromaCheckoutModal');
    if (!modal) return;

    // Reset to form view
    document.getElementById('aromaModalBodyForm').style.display = 'block';
    document.getElementById('aromaModalSuccess').classList.remove('show');

    // Populate order summary from cart
    populateOrderSummary();

    modal.classList.add('open');
  }

  function populateOrderSummary() {
    const summaryEl = document.getElementById('aromaOrderSummary');
    if (!summaryEl) return;

    // Read cart from localStorage (matches existing cart logic in script.js)
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('aroma_cart') || '[]'); } catch { cart = []; }

    if (cart.length === 0) {
      summaryEl.innerHTML = '<em style="color:#aaa">Your cart is empty.</em>';
      return;
    }

    // products array is defined in script.js — access via window
    const prods = (typeof products !== 'undefined') ? products : [];

    let rowsHTML = '';
    let total    = 0;

    cart.forEach(item => {
      const p = prods.find(pr => pr.id === item.id);
      if (!p) return;
      const lineTotal = p.price * item.qty;
      total += lineTotal;
      rowsHTML += `
        <div class="aroma-modal-order-row">
          <span>${p.name} × ${item.qty}</span>
          <span>$${lineTotal.toFixed(2)}</span>
        </div>`;
    });

    rowsHTML += `
      <div class="aroma-modal-order-row">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>`;

    summaryEl.innerHTML = rowsHTML;
  }

  // ══════════════════════════════════════════════════════════════
  // 4. PLACE ORDER — collect form data, post to backend
  // ══════════════════════════════════════════════════════════════
  async function handleOrderSubmit() {
    const name     = (document.getElementById('coName')?.value     || '').trim();
    const email    = (document.getElementById('coEmail')?.value    || '').trim();
    const phone    = (document.getElementById('coPhone')?.value    || '').trim();
    const address  = (document.getElementById('coAddress')?.value  || '').trim();
    const city     = (document.getElementById('coCity')?.value     || '').trim();
    const postcode = (document.getElementById('coPostcode')?.value || '').trim();
    const country  = (document.getElementById('coCountry')?.value  || '').trim();

    if (!name || !email || !address || !city || !country) {
      if (typeof showToast === 'function') showToast('Please fill all required fields');
      return;
    }

    // Build items array from cart + products
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('aroma_cart') || '[]'); } catch { cart = []; }

    const prods = (typeof products !== 'undefined') ? products : [];

    const items = cart.map(item => {
      const p = prods.find(pr => pr.id === item.id);
      return p ? { id: p.id, name: p.name, price: p.price, qty: item.qty } : null;
    }).filter(Boolean);

    if (items.length === 0) {
      if (typeof showToast === 'function') showToast('Your cart is empty');
      return;
    }

    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);

    const btn = document.getElementById('aromaPlaceOrderBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Placing Order…'; }

    try {
      const res  = await fetch(`${BACKEND_URL}/api/order`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, phone, address, city, postcode, country, items, total }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // Clear cart
        localStorage.removeItem('aroma_cart');
        if (typeof updateCartUI === 'function') updateCartUI();

        // Show success state
        document.getElementById('aromaModalBodyForm').style.display = 'none';
        document.getElementById('aromaSuccessOrderId').textContent = `Order #${data.orderId}`;
        document.getElementById('aromaModalSuccess').classList.add('show');

        if (typeof showToast === 'function') showToast('Order placed! Check your email.');
      } else {
        throw new Error(data.message || 'Order failed');
      }

    } catch (err) {
      console.error('[Aroma] Order error:', err.message);
      if (typeof showToast === 'function') {
        showToast(err.message || 'Could not place order. Please try again.');
      }
      if (btn) { btn.disabled = false; btn.textContent = 'Place Order — Cash on Delivery'; }
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 5. HOOK "PROCEED TO CHECKOUT" BUTTON in the cart drawer
  //    The button is injected dynamically by script.js, so we
  //    use event delegation on document.body.
  // ══════════════════════════════════════════════════════════════
  function hookCheckoutButton() {
    document.body.addEventListener('click', function (e) {
      const btn = e.target.closest('.cart-checkout-btn');
      if (!btn) return;

      // Prevent default if it's a link
      e.preventDefault();

      // Close cart drawer first (function from script.js)
      if (typeof closeCartDrawer === 'function') closeCartDrawer();

      // Short delay so drawer close animation looks smooth
      setTimeout(openCheckoutModal, 180);
    });
  }

  // ══════════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════════
  function init() {
    injectCheckoutModal();
    hookContactForm();
    hookCheckoutButton();
    console.log('[Aroma Backend Integration] ✅ Loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();