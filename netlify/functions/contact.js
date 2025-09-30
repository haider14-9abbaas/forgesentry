import nodemailer from 'nodemailer'

/** Simple sanitiser */
const clean = (v) =>
  typeof v === 'string'
    ? v.replace(/[<>"]/g, (m) => ({ '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]))
    : v

/** Verify reCAPTCHA v3 token on the server */
async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET
  if (!secret) {
    console.warn('RECAPTCHA_SECRET is not set; skipping verification.')
    return true
  }
  try {
    const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await resp.json()
    // accept if Google says success and score is okay (fallback if score missing)
    return !!(data.success && (typeof data.score !== 'number' || data.score > 0.5))
  } catch (err) {
    console.error('reCAPTCHA check failed:', err)
    return false
  }
}

/** Read CSRF token from cookie header */
function getCsrfCookie(headers) {
  const cookie = headers.get('cookie') || headers.get('Cookie') || ''
  const match = cookie.split(';').map((c) => c.trim()).find((c) => c.startsWith('fs_csrf='))
  return match ? match.split('=')[1] : ''
}

export const handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
      },
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const ALLOWED = (process.env.ALLOWED_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean)
  const origin = event.headers.origin || event.headers.Origin || ''
  const corsHeaders = {
    'Access-Control-Allow-Origin': ALLOWED.length ? (ALLOWED.includes(origin) ? origin : ALLOWED[0]) : '*',
    Vary: 'Origin',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  }

  try {
    const body = JSON.parse(event.body || '{}')

    // CSRF check
    const csrfHeader = event.headers['x-csrf-token'] || event.headers['X-CSRF-Token']
    const csrfCookie = getCsrfCookie(new Headers(event.headers))
    if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
      return { statusCode: 403, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid CSRF token' }) }
    }

    // Basic validation
    const required = ['fullName', 'email', 'budget', 'reason', 'message', 'consent']
    for (const key of required) {
      if (!(key in body)) {
        return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: `Missing field: ${key}` }) }
      }
    }
    if (!body.consent) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Consent is required' }) }
    }
    if (String(body.message || '').length < 30) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Message must be at least 30 characters' }) }
    }

    // reCAPTCHA
    const ok = await verifyRecaptcha(body.recaptchaToken || '')
    if (!ok) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'reCAPTCHA verification failed' }) }
    }

    // nodemailer transporter (Gmail + App Password)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // 16-char app password
      },
    })

    const safe = {
      fullName: clean(body.fullName),
      email: clean(body.email),
      company: clean(body.company || 'Not provided'),
      budget: clean(body.budget),
      reason: clean(body.reason),
      message: clean(body.message),
    }

    // Send to your inbox
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'forgesentry@gmail.com',
      subject: `New Contact Form: ${safe.reason} — ${safe.fullName}`,
      text: `New Contact Form Submission

From: ${safe.fullName} <${safe.email}>
Company: ${safe.company}
Budget: ${safe.budget}
Inquiry: ${safe.reason}

Message:
${safe.message}

---
Submitted: ${new Date().toISOString()}
User-Agent: ${event.headers['user-agent'] || ''}
IP: ${event.headers['x-forwarded-for'] || 'unknown'}
`,
      replyTo: safe.email,
    })

    // Confirmation for the sender
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: safe.email,
      subject: 'Thank you for contacting ForgeSentry',
      text: `Hi ${safe.fullName},

Thanks for reaching out! We've received your inquiry about "${safe.reason}" and will get back to you within 24 hours.

— The ForgeSentry Team
(Automatic message)`,
    })

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ success: true, message: 'Message sent successfully' }) }
  } catch (err) {
    console.error('Contact function error:', err)
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Internal server error' }) }
  }
}
