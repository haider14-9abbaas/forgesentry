# ForgeSentry - Professional Agency Website

A modern, secure, and responsive website for ForgeSentry - cybersecurity and web development agency.

## 🚀 Features

- **Modern Design**: Professional agency website with Apple-level aesthetics
- **Security First**: CSRF protection, reCAPTCHA v3, rate limiting, and secure headers
- **Full SEO**: JSON-LD structured data, sitemap, robots.txt, and optimized meta tags
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Performance**: Optimized for speed with lazy loading and code splitting
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, DaisyUI
- **Animations**: Framer Motion with reduced motion support
- **Forms**: React Hook Form + Zod validation
- **Backend**: Node.js serverless API (Vercel)
- **Email**: Nodemailer with Gmail SMTP
- **Security**: CSRF tokens, reCAPTCHA v3, rate limiting, security headers

## 📋 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd forgesentry-website
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Email Configuration (Gmail App Password)
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-character-app-password

# reCAPTCHA v3 Keys
RECAPTCHA_SECRET=your-recaptcha-secret-key
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

### 3. Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the 16-character app password in `.env`

### 4. reCAPTCHA Setup

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site with reCAPTCHA v3
3. Add your domain (localhost for development)
4. Copy the Site Key and Secret Key to `.env`

### 5. Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the site.

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `SMTP_USER`
   - `SMTP_PASS` 
   - `RECAPTCHA_SECRET`
3. Deploy automatically on push to main branch

### Manual Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/         # Reusable components
│   ├── Navbar.jsx     # Navigation component
│   ├── Footer.jsx     # Footer with JSON-LD
│   ├── ParallaxLayer.jsx
│   ├── SectionHeader.jsx
│   ├── FilterToolbar.jsx
│   ├── ProjectCard.jsx
│   └── TestimonialCard.jsx
├── pages/             # Route components  
│   ├── Home.jsx       # Homepage with hero
│   ├── Services.jsx   # Services overview
│   ├── Projects.jsx   # Project portfolio
│   ├── Reviews.jsx    # Client testimonials
│   ├── About.jsx      # Company information
│   └── Contact.jsx    # Contact form
├── assets/            # Static assets
└── App.jsx           # Main app component

api/
└── contact.js        # Serverless contact form handler

public/
├── robots.txt        # SEO robots file
├── sitemap.xml       # SEO sitemap
├── favicon.svg       # Favicon (SVG)
├── favicon.png       # Favicon (PNG)
└── og-forgesentry.png # Open Graph image
```

## 🔒 Security Features

- **CSRF Protection**: Double-submit cookie pattern
- **reCAPTCHA v3**: Server-side verification
- **Rate Limiting**: 5 requests per hour per IP
- **Input Sanitization**: XSS prevention
- **Security Headers**: CSP, X-Content-Type-Options, etc.
- **Data Validation**: Zod schema validation

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance
- Reduced motion support

## 📊 SEO Optimization

- **Structured Data**: JSON-LD for Organization, WebSite, Service, Person
- **Meta Tags**: Title, description, keywords for each page
- **Open Graph**: Social media sharing optimization
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine crawling instructions
- **Canonical URLs**: Proper URL canonicalization

## 🎨 Design System

- **Colors**: Primary #4F46E5, Secondary #06B6D4, Accent #10B981
- **Typography**: Inter (UI) + Sora (headings)
- **Spacing**: 8px grid system
- **Components**: Consistent card design with rounded-2xl and subtle shadows
- **Animations**: Subtle micro-interactions with Framer Motion

## 📞 Support

For questions or issues:
- Email: forgesentry@gmail.com
- WhatsApp: +92 336 0150999 (Instant response)
- GitHub: Create an issue in the repository

## 📄 License

This project is proprietary and confidential. All rights reserved by ForgeSentry.

---

Built with ❤️ by the ForgeSentry team