# 🌹 Aroma — Backend Email Automation

Complete Node.js + Express + Nodemailer backend for the Aroma Luxury Perfume website.

---

## What This Does

| Trigger | Action |
|---|---|
| Contact form submitted | Sends enquiry details → `ucode464@gmail.com` + warm welcome email → customer |
| Checkout "Place Order" submitted | Sends full order details → `ucode464@gmail.com` + order confirmation → customer |

---

## Project Structure

```
aroma-backend/
│
├── server.js               ← Express server + all API routes
├── emailTemplates.js       ← Beautiful HTML email templates
├── backend-integration.js  ← Frontend script (add to HTML pages)
│
├── package.json
├── .env.example            ← Copy to .env and fill in credentials
├── .gitignore
└── README.md
```

---

## Setup (5 Minutes)

### Step 1 — Install dependencies

```bash
cd aroma-backend
npm install
```

### Step 2 — Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
ADMIN_EMAIL=ucode464@gmail.com
PORT=3000
FRONTEND_ORIGIN=http://127.0.0.1:5500
```

> **Important — Gmail App Password:**
> You MUST use a Gmail **App Password**, not your regular Gmail password.
>
> How to create one:
> 1. Go to → [myaccount.google.com](https://myaccount.google.com)
> 2. Security → 2-Step Verification → scroll down → **App Passwords**
> 3. Select app: **Mail** → Select device: **Other** → name it "Aroma"
> 4. Copy the 16-character password → paste into `.env` as `EMAIL_PASS`

### Step 3 — Start the server

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

You should see:
```
✅  Email transporter is ready.
🌹  Aroma Backend running → http://localhost:3000
    POST /api/contact   — Contact form
    POST /api/order     — Order submission
    GET  /api/health    — Health check
```

### Step 4 — Add the frontend integration script

Add **one line** to the bottom of **every HTML page** (just before `</body>`):

```html
<script src="backend-integration.js"></script>
```

Example — in `contact.html`:
```html
  ...
  <script src="script.js"></script>
  <script src="backend-integration.js"></script>   ← ADD THIS
</body>
</html>
```

Do the same for: `index.html`, `shop.html`, `product.html`, `about.html`, `contact.html`

### Step 5 — Test locally

Open your frontend with VS Code Live Server (usually at `http://127.0.0.1:5500`)

**Test contact form:**
1. Go to `contact.html`
2. Fill the form and submit
3. Check `ucode464@gmail.com` for the enquiry notification
4. Check the customer email for the welcome confirmation

**Test order flow:**
1. Go to `shop.html`
2. Add items to cart
3. Click the cart icon → "Proceed to Checkout"
4. Fill in the checkout popup → "Place Order"
5. Check both emails

---

## API Reference

### POST `/api/contact`

**Request body:**
```json
{
  "name":    "Jane Smith",
  "email":   "jane@example.com",
  "phone":   "+1 555 000 1234",
  "subject": "Fragrance Consultation",
  "message": "I would like to learn more about..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Your message has been received. We will respond within 24 hours."
}
```

---

### POST `/api/order`

**Request body:**
```json
{
  "name":     "Jane Smith",
  "email":    "jane@example.com",
  "phone":    "+1 555 000 1234",
  "address":  "123 Main Street",
  "city":     "New York",
  "postcode": "10001",
  "country":  "United States",
  "items": [
    { "id": 1, "name": "Velour Noir", "price": 240.99, "qty": 1 },
    { "id": 3, "name": "Oud Royale",  "price": 380.00, "qty": 2 }
  ],
  "total": "1000.99"
}
```

**Response (200):**
```json
{
  "success": true,
  "orderId": "ARO-A1B2C3D4",
  "message": "Order #ARO-A1B2C3D4 confirmed! A confirmation has been sent to jane@example.com."
}
```

---

### GET `/api/health`

Quick check that the server is running:
```json
{ "status": "ok", "service": "Aroma Backend", "timestamp": "2024-..." }
```

---

## Deploying to Production

### Option A — Railway (easiest, free tier available)
1. Push to GitHub
2. Connect repo to [railway.app](https://railway.app)
3. Add environment variables in Railway dashboard
4. Update `FRONTEND_ORIGIN` in `.env` to your real domain
5. Update `BACKEND_URL` in `backend-integration.js` to your Railway URL

### Option B — Render
Same steps as Railway, use [render.com](https://render.com)

### Option C — VPS / DigitalOcean
```bash
npm install -g pm2
pm2 start server.js --name aroma-backend
pm2 save
pm2 startup
```

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `❌ Email transporter error` | Check `EMAIL_USER` / `EMAIL_PASS` in `.env`. Make sure it's an App Password. |
| Emails land in spam | Add SPF/DKIM to your domain, or use a transactional email service like SendGrid |
| CORS error in browser | Update `FRONTEND_ORIGIN` in `.env` to match your frontend URL exactly |
| Form submits but no email | Check terminal for error logs; verify ADMIN_EMAIL in `.env` |
| `fetch` fails from frontend | Ensure backend server is running on the correct port |

---

## Required npm Packages

| Package | Purpose |
|---|---|
| `express` | Web server & routing |
| `nodemailer` | Email sending via SMTP |
| `cors` | Cross-origin request handling |
| `dotenv` | Load `.env` variables |
| `nodemon` | Auto-restart during development |
