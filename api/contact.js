import { createTransport } from 'nodemailer'
import { z } from 'zod'

// Rate limiting storage (in production, use Redis or database)
const rateLimit = new Map()

// Contact form validation schema
const contactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(255),
  company: z.string().max(100).optional(),
  budget: z.string().min(1).max(50),
  reason: z.string().min(1).max(100),
  message: z.string().min(30).max(5000),
  consent: z.boolean().refine(val => val === true),
  recaptchaToken: z.string().min(1)
})

// Security headers
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google.com;",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block'
}

// Sanitize input to prevent XSS
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Rate limiting check (5 requests per hour per IP)
const checkRateLimit = (ip) => {
  const now = Date.now()
  const hourAgo = now - (60 * 60 * 1000)
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, [])
  }
  
  const requests = rateLimit.get(ip).filter(time => time > hourAgo)
  
  if (requests.length >= 5) {
    return false
  }
  
  requests.push(now)
  rateLimit.set(ip, requests)
  return true
}

// Verify reCAPTCHA token
const verifyRecaptcha = async (token) => {
  if (!process.env.RECAPTCHA_SECRET) {
    console.warn('reCAPTCHA verification skipped - no secret key')
    return true // Skip in development
  }
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
    })
    
    const data = await response.json()
    return data.success && data.score > 0.5
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

// CSRF token verification
const verifyCsrfToken = (req) => {
  const tokenFromHeader = req.headers['x-csrf-token']
  const tokenFromCookie = req.headers.cookie
    ?.split(';')
    .find(c => c.trim().startsWith('fs_csrf='))
    ?.split('=')[1]
  
  return tokenFromHeader && tokenFromCookie && tokenFromHeader === tokenFromCookie
}

export default async function handler(req, res) {
  // Set security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value)
  })
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token')
    return res.status(200).end()
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again in an hour.' })
    }
    
    // Verify CSRF token
    if (!verifyCsrfToken(req)) {
      return res.status(403).json({ error: 'Invalid CSRF token' })
    }
    
    // Validate request body
    const validatedData = contactSchema.parse(req.body)
    
    // Verify reCAPTCHA
    const isValidRecaptcha = await verifyRecaptcha(validatedData.recaptchaToken)
    if (!isValidRecaptcha) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' })
    }
    
    // Sanitize all string inputs
    const sanitizedData = Object.fromEntries(
      Object.entries(validatedData).map(([key, value]) => [
        key,
        typeof value === 'string' ? sanitizeString(value) : value
      ])
    )
    
    // Create email transporter
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
    
    // Email content
    const emailContent = `
      New Contact Form Submission - ForgeSentry
      
      From: ${sanitizedData.fullName} <${sanitizedData.email}>
      Company: ${sanitizedData.company || 'Not provided'}
      Budget: ${sanitizedData.budget}
      Inquiry Type: ${sanitizedData.reason}
      
      Message:
      ${sanitizedData.message}
      
      ---
      Submitted at: ${new Date().toISOString()}
      Client IP: ${clientIP}
      User Agent: ${req.headers['user-agent'] || 'Not provided'}
    `
    
    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'forgesentry@gmail.com',
      subject: `New Contact Form: ${sanitizedData.reason} - ${sanitizedData.fullName}`,
      text: emailContent,
      replyTo: sanitizedData.email
    })
    
    // Send confirmation email to sender
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: sanitizedData.email,
      subject: 'Thank you for contacting ForgeSentry',
      text: `Hi ${sanitizedData.fullName},

Thank you for reaching out to ForgeSentry! We've received your inquiry about "${sanitizedData.reason}" and will get back to you within 24 hours.

We're excited to learn more about your project and discuss how we can help with your cybersecurity and development needs.

Best regards,
The ForgeSentry Team

---
This is an automated response. Please do not reply to this email.`
    })
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' 
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.errors 
      })
    }
    
    return res.status(500).json({ 
      error: 'Internal server error' 
    })
  }
}