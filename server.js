/* ═══════════════════════════════════════════════════════════════
   AROMA LUXURY PERFUME — Backend Server
   Node.js + Express + Nodemailer
   ═══════════════════════════════════════════════════════════════
   Usage:
     1.  cp .env.example .env   → fill in your credentials
     2.  npm install
     3.  npm start              (production)
         npm run dev            (development with auto-reload)
   ═══════════════════════════════════════════════════════════════ */

'use strict';

require('dotenv').config();

const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const crypto     = require('crypto');

const {
  contactCustomerEmail,
  contactAdminEmail,
  orderCustomerEmail,
  orderAdminEmail,
} = require('./emailTemplates');

// ── App setup ─────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — allow only the configured frontend origin
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));

// ── Nodemailer transporter ────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,   // Use an App Password, not your Gmail password
  },
});

// Verify transporter on startup
transporter.verify((err) => {
  if (err) {
    console.error('❌  Email transporter error:', err.message);
    console.error('    → Check EMAIL_USER and EMAIL_PASS in your .env file.');
  } else {
    console.log('✅  Email transporter is ready.');
  }
});

// ── Utility: generate order ID ────────────────────────────────
function generateOrderId() {
  return 'ARO-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

// ── Helper: send email pair (admin + customer) ────────────────
async function sendEmailPair(adminOptions, customerOptions) {
  await Promise.all([
    transporter.sendMail(adminOptions),
    transporter.sendMail(customerOptions),
  ]);
}

// ══════════════════════════════════════════════════════════════
// ROUTE 1 — POST /api/contact
// Handles the contact form submission.
// Body: { name, email, phone?, subject?, message }
// ══════════════════════════════════════════════════════════════
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // ── Validation ──────────────────────────────────────────
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    const data = { name, email, phone: phone || null, subject: subject || 'General Enquiry', message };

    // ── Send both emails ─────────────────────────────────────
    await sendEmailPair(
      // → Admin notification
      {
        from:    `"Aroma Website" <${process.env.EMAIL_USER}>`,
        to:      process.env.ADMIN_EMAIL,
        subject: `[AROMA] New Contact: ${name} — ${data.subject}`,
        html:    contactAdminEmail(data),
      },
      // → Customer confirmation
      {
        from:    `"House of Aroma" <${process.env.EMAIL_USER}>`,
        to:      email,
        subject: `We've received your message — House of Aroma`,
        html:    contactCustomerEmail(data),
      }
    );

    console.log(`📩  Contact email sent for: ${name} <${email}>`);

    return res.status(200).json({
      success: true,
      message: 'Your message has been received. We will respond within 24 hours.',
    });

  } catch (err) {
    console.error('❌  /api/contact error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again or contact us directly.',
    });
  }
});

// ══════════════════════════════════════════════════════════════
// ROUTE 2 — POST /api/order
// Handles checkout / Buy Now popup form submission.
// Body: { name, email, phone?, address, city, postcode?, country, items[], total }
// items: [{ id, name, price, qty }]
// ══════════════════════════════════════════════════════════════
app.post('/api/order', async (req, res) => {
  try {
    const { name, email, phone, address, city, postcode, country, items, total } = req.body;

    // ── Validation ──────────────────────────────────────────
    if (!name || !email || !address || !city || !country) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, address, city, and country are required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item.' });
    }

    const orderId = generateOrderId();

    const data = {
      name, email, phone: phone || null,
      address, city, postcode: postcode || null, country,
      items, total, orderId,
    };

    // ── Send both emails ─────────────────────────────────────
    await sendEmailPair(
      // → Admin notification
      {
        from:    `"Aroma Orders" <${process.env.EMAIL_USER}>`,
        to:      process.env.ADMIN_EMAIL,
        subject: `[AROMA] New Order #${orderId} — $${parseFloat(total).toFixed(2)} from ${name}`,
        html:    orderAdminEmail(data),
      },
      // → Customer order confirmation
      {
        from:    `"House of Aroma" <${process.env.EMAIL_USER}>`,
        to:      email,
        subject: `Order Confirmed #${orderId} — Thank you, ${name}`,
        html:    orderCustomerEmail(data),
      }
    );

    console.log(`🛍️  Order #${orderId} confirmed for: ${name} <${email}> — $${total}`);

    return res.status(200).json({
      success: true,
      orderId,
      message: `Order #${orderId} confirmed! A confirmation has been sent to ${email}.`,
    });

  } catch (err) {
    console.error('❌  /api/order error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Order could not be processed. Please try again.',
    });
  }
});

// ── Health check ──────────────────────────────────────────────
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', service: 'Aroma Backend', timestamp: new Date().toISOString() });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌹  Aroma Backend running → http://localhost:${PORT}`);
  console.log(`    POST /api/contact   — Contact form`);
  console.log(`    POST /api/order     — Order submission`);
  console.log(`    GET  /api/health    — Health check\n`);
});
