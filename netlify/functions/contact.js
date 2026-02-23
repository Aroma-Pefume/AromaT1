const nodemailer = require('nodemailer');
const { contactCustomerEmail, contactAdminEmail } = require('../../emailTemplates');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const { name, email, phone, subject, message } = JSON.parse(event.body);

  if (!name || !email || !message)
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Name, email, and message are required.' }) };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const data = { name, email, phone, subject: subject || 'General Enquiry', message };

  await Promise.all([
    transporter.sendMail({ from: `"Aroma Website" <${process.env.EMAIL_USER}>`, to: process.env.ADMIN_EMAIL, subject: `[AROMA] New Contact: ${name}`, html: contactAdminEmail(data) }),
    transporter.sendMail({ from: `"House of Aroma" <${process.env.EMAIL_USER}>`, to: email, subject: `We've received your message — House of Aroma`, html: contactCustomerEmail(data) }),
  ]);

  return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ success: true, message: 'Message received!' }) };
};