/* ═══════════════════════════════════════════════════════════════
   AROMA — Email Templates
   All templates return full HTML strings suitable for Nodemailer.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Shared wrapper ─────────────────────────────────────────────
function wrap(title, bodyHTML) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #f5f0e8; font-family: Georgia, 'Times New Roman', serif; }
    .wrapper { max-width: 620px; margin: 40px auto; background: #fff; }
    .header  { background: #0e0c09; padding: 40px 48px 32px; text-align: center; }
    .logo    { font-family: Georgia, serif; font-size: 2.4rem; color: #c6a75e; letter-spacing: 0.15em; }
    .logo span { color: #fff; }
    .tagline { font-size: 0.72rem; color: rgba(198,167,94,0.55); letter-spacing: 0.35em;
               text-transform: uppercase; margin-top: 6px; }
    .body    { padding: 48px 48px 40px; }
    .greeting{ font-size: 1.35rem; font-weight: 400; color: #1a1208; margin-bottom: 20px; }
    .text    { font-size: 0.92rem; color: #4a4236; line-height: 1.85; margin-bottom: 16px; }
    .divider { border: none; border-top: 1px solid #e8e0d0; margin: 32px 0; }
    .card    { background: #f9f5ee; border: 1px solid #e8e0d0; border-radius: 6px;
               padding: 28px 32px; margin: 28px 0; }
    .card-title { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.25em;
                  text-transform: uppercase; color: #c6a75e; margin-bottom: 18px; }
    .row     { display: flex; justify-content: space-between; padding: 10px 0;
               border-bottom: 1px solid #ede6d8; font-size: 0.88rem; }
    .row:last-child { border-bottom: none; }
    .row .label { color: #7a6e60; }
    .row .value { color: #1a1208; font-weight: 600; text-align: right; max-width: 60%; }
    .total-row  { display: flex; justify-content: space-between; padding: 16px 0 0;
                  margin-top: 12px; font-size: 1rem; font-weight: 700; color: #1a1208; }
    .gold-strip { background: linear-gradient(135deg, #c6a75e, #a88a45);
                  padding: 20px 48px; text-align: center; }
    .gold-strip p { font-size: 0.82rem; color: rgba(255,255,255,0.85); letter-spacing: 0.08em;
                    line-height: 1.8; }
    .footer  { background: #0e0c09; padding: 28px 48px; text-align: center; }
    .footer p { font-size: 0.75rem; color: rgba(255,255,255,0.3); line-height: 1.9; }
    .footer a { color: rgba(198,167,94,0.7); text-decoration: none; }
    .btn     { display: inline-block; background: #c6a75e; color: #0e0c09; padding: 14px 36px;
               text-decoration: none; font-size: 0.82rem; font-weight: 700;
               letter-spacing: 0.18em; text-transform: uppercase; border-radius: 2px;
               margin: 24px 0 8px; }
    .signature { margin-top: 32px; font-size: 0.88rem; color: #4a4236; line-height: 1.9; }
    .sig-name  { font-size: 1rem; color: #1a1208; font-weight: 600; margin-top: 8px; }
    .sig-role  { font-size: 0.78rem; color: #c6a75e; letter-spacing: 0.15em;
                 text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- HEADER -->
    <div class="header">
      <div class="logo">A<span>r</span>oma</div>
      <div class="tagline">The House of Luxury Fragrances</div>
    </div>

    <!-- BODY -->
    <div class="body">
      ${bodyHTML}
    </div>

    <!-- GOLD STRIP -->
    <div class="gold-strip">
      <p>14 Rue de la Paix, 75002 Paris, France<br>
         +33 (0)1 42 68 25 00 &nbsp;·&nbsp; hello@aromahouse.com</p>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <p>
        © ${new Date().getFullYear()} Aroma Luxury Perfume House. All rights reserved.<br>
        <a href="#">Privacy Policy</a> &nbsp;·&nbsp; <a href="#">Unsubscribe</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ══════════════════════════════════════════════════════════════
//  1. CONTACT FORM — email to CUSTOMER
// ══════════════════════════════════════════════════════════════
function contactCustomerEmail({ name, email, subject, message, phone }) {
  const body = `
    <p class="greeting">Dear ${name},</p>

    <p class="text">
      Thank you for reaching out to the House of Aroma. We have received your message
      and will respond with the care and attention your enquiry deserves — typically
      within <strong>24 hours</strong>.
    </p>

    <div class="card">
      <div class="card-title">Your Enquiry Summary</div>
      <div class="row">
        <span class="label">Reference Number</span>
        <span class="value">#ARO-${Date.now().toString().slice(-8)}</span>
      </div>
      <div class="row">
        <span class="label">Subject</span>
        <span class="value">${subject || 'General Enquiry'}</span>
      </div>
      ${phone ? `<div class="row"><span class="label">Phone</span><span class="value">${phone}</span></div>` : ''}
      <div class="row">
        <span class="label">Your Message</span>
        <span class="value" style="font-style:italic;">"${message.substring(0, 200)}${message.length > 200 ? '…' : ''}"</span>
      </div>
    </div>

    <p class="text">
      In the meantime, feel free to explore our collections or speak with our
      Fragrance Advisor chatbot on the website.
    </p>

    <div style="text-align:center;">
      <a class="btn" href="https://yourdomain.com/shop.html">Explore Our Collection</a>
    </div>

    <hr class="divider">

    <div class="signature">
      Warmly,
      <div class="sig-name">The Aroma Client Care Team</div>
      <div class="sig-role">House of Aroma · Paris</div>
    </div>
  `;
  return wrap(`Message Received — Aroma`, body);
}

// ══════════════════════════════════════════════════════════════
//  2. CONTACT FORM — notification email to ADMIN
// ══════════════════════════════════════════════════════════════
function contactAdminEmail({ name, email, subject, message, phone }) {
  const body = `
    <p class="greeting">📬 New Contact Form Submission</p>

    <p class="text">
      A visitor has submitted the contact form on the Aroma website.
      Details are below.
    </p>

    <div class="card">
      <div class="card-title">Submission Details</div>
      <div class="row"><span class="label">Full Name</span><span class="value">${name}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${email}</span></div>
      ${phone ? `<div class="row"><span class="label">Phone</span><span class="value">${phone}</span></div>` : ''}
      <div class="row"><span class="label">Subject</span><span class="value">${subject || '—'}</span></div>
      <div class="row"><span class="label">Submitted At</span><span class="value">${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</span></div>
    </div>

    <div class="card">
      <div class="card-title">Message</div>
      <p class="text" style="margin:0;">${message.replace(/\n/g, '<br>')}</p>
    </div>

    <div style="text-align:center;">
      <a class="btn" href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your Aroma Enquiry')}">Reply to ${name}</a>
    </div>
  `;
  return wrap(`[AROMA] New Contact: ${name}`, body);
}

// ══════════════════════════════════════════════════════════════
//  3. ORDER — confirmation email to CUSTOMER
// ══════════════════════════════════════════════════════════════
function orderCustomerEmail({ name, email, address, city, postcode, country, items, total, orderId }) {
  const itemsHTML = items.map(item => `
    <div class="row">
      <span class="label">${item.name} × ${item.qty}</span>
      <span class="value">$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join('');

  const body = `
    <p class="greeting">Thank you, ${name}. ✦</p>

    <p class="text">
      Your order has been received and is being prepared with the utmost care.
      Our team will dispatch your fragrance within <strong>1–2 business days</strong>,
      and you will receive a shipping confirmation once it is on its way.
    </p>

    <div class="card">
      <div class="card-title">Order Confirmation</div>
      <div class="row">
        <span class="label">Order Number</span>
        <span class="value" style="color:#c6a75e;">#${orderId}</span>
      </div>
      <div class="row">
        <span class="label">Order Date</span>
        <span class="value">${new Date().toLocaleDateString('en-GB', { dateStyle: 'long' })}</span>
      </div>
      <div class="row">
        <span class="label">Payment Method</span>
        <span class="value">Cash on Delivery</span>
      </div>
      <div class="row">
        <span class="label">Estimated Delivery</span>
        <span class="value">3–4 Working Days</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Items Ordered</div>
      ${itemsHTML}
      <div class="total-row">
        <span>Order Total</span>
        <span style="color:#c6a75e;">$${parseFloat(total).toFixed(2)}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Shipping Address</div>
      <p class="text" style="margin:0; line-height:2;">
        <strong>${name}</strong><br>
        ${address}<br>
        ${city}${postcode ? ', ' + postcode : ''}<br>
        ${country}
      </p>
    </div>

    <p class="text">
      We are committed to making your experience exceptional. If you have any questions,
      please don't hesitate to contact our client care team at
      <strong>hello@aromahouse.com</strong> or call <strong>+33 (0)1 42 68 25 00</strong>.
    </p>

    <div style="text-align:center;">
      <a class="btn" href="https://yourdomain.com/shop.html">Continue Shopping</a>
    </div>

    <hr class="divider">

    <div class="signature">
      With gratitude,
      <div class="sig-name">The House of Aroma</div>
      <div class="sig-role">Paris · Est. 2012</div>
    </div>
  `;
  return wrap(`Order Confirmed #${orderId} — Aroma`, body);
}

// ══════════════════════════════════════════════════════════════
//  4. ORDER — notification email to ADMIN
// ══════════════════════════════════════════════════════════════
function orderAdminEmail({ name, email, address, city, postcode, country, phone, items, total, orderId }) {
  const itemsHTML = items.map(item => `
    <div class="row">
      <span class="label">${item.name} × ${item.qty}</span>
      <span class="value">$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join('');

  const body = `
    <p class="greeting">🛍️ New Order Received!</p>

    <p class="text">A new order has been placed on the Aroma website. Full details below.</p>

    <div class="card">
      <div class="card-title">Order Info</div>
      <div class="row"><span class="label">Order ID</span><span class="value" style="color:#c6a75e;">#${orderId}</span></div>
      <div class="row"><span class="label">Date &amp; Time</span><span class="value">${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</span></div>
    </div>

    <div class="card">
      <div class="card-title">Customer Details</div>
      <div class="row"><span class="label">Name</span><span class="value">${name}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${email}</span></div>
      ${phone ? `<div class="row"><span class="label">Phone</span><span class="value">${phone}</span></div>` : ''}
    </div>

    <div class="card">
      <div class="card-title">Shipping Address</div>
      <p class="text" style="margin:0; line-height:2;">
        ${address}<br>${city}${postcode ? ', ' + postcode : ''}<br>${country}
      </p>
    </div>

    <div class="card">
      <div class="card-title">Items Ordered</div>
      ${itemsHTML}
      <div class="total-row">
        <span>Total</span>
        <span style="color:#c6a75e;">$${parseFloat(total).toFixed(2)}</span>
      </div>
    </div>

    <div style="text-align:center;">
      <a class="btn" href="mailto:${email}?subject=Re: Your Aroma Order #${orderId}">Contact Customer</a>
    </div>
  `;
  return wrap(`[AROMA] New Order #${orderId} — $${parseFloat(total).toFixed(2)}`, body);
}

// ══════════════════════════════════════════════════════════════
module.exports = {
  contactCustomerEmail,
  contactAdminEmail,
  orderCustomerEmail,
  orderAdminEmail,
};
