const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { orderCustomerEmail, orderAdminEmail } = require('../../emailTemplates');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const { name, email, phone, address, city, postcode, country, items, total } = JSON.parse(event.body);

  if (!name || !email || !address || !city || !country)
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Required fields missing.' }) };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const orderId = 'ARO-' + crypto.randomBytes(4).toString('hex').toUpperCase();
  const data = { name, email, phone, address, city, postcode, country, items, total, orderId };

  await Promise.all([
    transporter.sendMail({ from: `"Aroma Orders" <${process.env.EMAIL_USER}>`, to: process.env.ADMIN_EMAIL, subject: `[AROMA] New Order #${orderId}`, html: orderAdminEmail(data) }),
    transporter.sendMail({ from: `"House of Aroma" <${process.env.EMAIL_USER}>`, to: email, subject: `Order Confirmed #${orderId}`, html: orderCustomerEmail(data) }),
  ]);

  return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ success: true, orderId, message: `Order #${orderId} confirmed!` }) };
};