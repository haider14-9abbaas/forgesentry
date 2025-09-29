// netlify/functions/contact.js
const nodemailer = require("nodemailer");
const { z } = require("zod");

// ---- CORS whitelist (comma-separated in env: ALLOWED_ORIGIN) ----
const parseOrigins = () =>
  (process.env.ALLOWED_ORIGIN || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

const corsHeaders = (origin) => ({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-CSRF-Token",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
});

// ---- Validation schema ----
const contactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(255),
  company: z.string().max(100).optional(),
  budget: z.string().min(1).max(50),
  reason: z.string().min(1).max(100),
  message: z.string().min(30).max(5000),
  consent: z.boolean().refine(v => v === true, "Consent required"),
  recaptchaToken: z.string().min(1),
});

// ---- Sanitizer ----
const sanitize = (s) =>
  typeof s === "string"
    ? s.replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#x27;")
        .replace(/\//g,"&#x2F;")
    : s;

// ---- reCAPTCHA v3 verify ----
async function verifyRecaptcha(token, ip) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) {
    console.warn("reCAPTCHA secret missing – skipping verification (DEV)");
    return true;
  }
  try {
    const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ip||"")}`,
    });
    const data = await resp.json();
    return !!(data.success && (data.score === undefined || data.score > 0.5));
  } catch (e) {
    console.error("reCAPTCHA error", e);
    return false;
  }
}

exports.handler = async (event) => {
  const origins = parseOrigins();
  const reqOrigin = event.headers.origin || "";
  const allowOrigin = origins.includes(reqOrigin) ? reqOrigin : origins[0] || "*";

  // Preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders(allowOrigin), body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders(allowOrigin), body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const ip =
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["client-ip"] ||
      event.headers["x-forwarded-for"] ||
      "unknown";

    const raw = JSON.parse(event.body || "{}");
    const data = contactSchema.parse(raw);

    // reCAPTCHA
    const ok = await verifyRecaptcha(data.recaptchaToken, ip);
    if (!ok) {
      return { statusCode: 400, headers: corsHeaders(allowOrigin), body: JSON.stringify({ error: "reCAPTCHA failed" }) };
    }

    // sanitize
    const clean = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, typeof v === "string" ? sanitize(v) : v])
    );

    // Mailer (Gmail App Password – no spaces!)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,                 // e.g. forgesentry@gmail.com
        pass: process.env.SMTP_PASS,                 // 16 chars, NO spaces
      },
    });

    const text = `
New Contact Form Submission — ForgeSentry

From: ${clean.fullName} <${clean.email}>
Company: ${clean.company || "Not provided"}
Budget: ${clean.budget}
Inquiry Type: ${clean.reason}

Message:
${clean.message}

---
Submitted: ${new Date().toISOString()}
Client IP: ${ip}
User Agent: ${event.headers["user-agent"] || "n/a"}
`;

    // Send to you
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "forgesentry@gmail.com",
      replyTo: clean.email,
      subject: `New Contact: ${clean.reason} — ${clean.fullName}`,
      text,
    });

    // Confirmation to sender
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: clean.email,
      subject: "Thanks for contacting ForgeSentry",
      text: `Hi ${clean.fullName},

Thanks for reaching out to ForgeSentry about "${clean.reason}".
We’ll get back to you within 24 hours.

— ForgeSentry Team`,
    });

    return {
      statusCode: 200,
      headers: corsHeaders(allowOrigin),
      body: JSON.stringify({ success: true, message: "Message sent" }),
    };
  } catch (err) {
    console.error("Contact function error:", err);
    const details = err?.issues || undefined; // zod errors
    return {
      statusCode: 400,
      headers: corsHeaders(allowOrigin),
      body: JSON.stringify({ error: "Unable to send", details }),
    };
  }
};
