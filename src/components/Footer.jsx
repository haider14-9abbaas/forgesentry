import { Link } from 'react-router-dom';
import { Shield, Mail, Linkedin, Github, MapPin, MessageCircle } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Projects', path: '/projects' },
      { name: 'Reviews', path: '/reviews' },
    ],
    services: [
      { name: 'MERN Development', path: '/services#mern' },
      { name: 'Security Consulting', path: '/services#security' },
      { name: 'AI Automation', path: '/services#automation' },
      { name: 'Shopify Development', path: '/services#shopify' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl"
                style={{ backgroundColor: 'var(--cn-cyan, #22D3EE)' }}
              >
                <Shield className="h-6 w-6" style={{ color: '#0b0f19' }} />
              </div>
              <span className="text-xl font-display font-bold">
                Forge
                <span className="text-[var(--cn-cyan,#22D3EE)]">Sentry</span>
              </span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Secure web & automation, engineered for outcomes. Professional cybersecurity
              and development services that deliver results.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail size={16} />
                <span className="text-sm">forgesentry@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <MessageCircle size={16} />
                <WhatsAppButton variant="link" className="text-slate-300 hover:text-green-400">
                  +92 336 0150999
                </WhatsAppButton>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <MapPin size={16} />
                <span className="text-sm">Remote & On-site Available</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">Connect</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <Link
                  to="/contact"
                  className="btn btn-sm w-full font-medium hover:scale-105 transition-transform duration-200 rounded-lg"
                  style={{
                    backgroundColor: 'var(--cn-cyan, #22D3EE)',
                    borderColor: 'var(--cn-cyan, #22D3EE)',
                    color: '#0b0f19',
                  }}
                >
                  Get Free Consultation
                </Link>
                <WhatsAppButton
                  variant="button"
                  className="btn-sm w-full rounded-lg"
                  message="Hi! I found your website and I'm interested in your cybersecurity and development services. Can we discuss my project requirements?"
                >
                  Quick WhatsApp Chat
                </WhatsAppButton>
              </div>

              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/syed-haider-abbas-zaidi-132525215/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg transition-colors duration-200 hover:bg-[var(--cn-cyan,#22D3EE)] hover:text-slate-900"
                  aria-label="Haider's LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/haider14-9abbaas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg transition-colors duration-200 hover:bg-[var(--cn-cyan,#22D3EE)] hover:text-slate-900"
                  aria-label="Haider's GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/hamza-kamran-271872297/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg transition-colors duration-200 hover:bg-[var(--cn-cyan,#22D3EE)] hover:text-slate-900"
                  aria-label="Hamza's LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/Hamza-hani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg transition-colors duration-200 hover:bg-[var(--cn-cyan,#22D3EE)] hover:text-slate-900"
                  aria-label="Hamza's GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">© {currentYear} ForgeSentry. All rights reserved.</div>
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        // safer for SSR/hydration than putting JSON directly as children
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://forgesentry.com/#organization',
                name: 'ForgeSentry',
                url: 'https://forgesentry.com',
                logo: 'https://forgesentry.com/logo-wordmark.png',
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '',
                  contactType: 'customer service',
                  email: 'forgesentry@gmail.com',
                },
                founder: [
                  {
                    '@type': 'Person',
                    name: 'Syed Haider Abbas Zaidi',
                    jobTitle: 'Cybersecurity Professional & MERN Developer',
                    sameAs: [
                      'https://www.linkedin.com/in/syed-haider-abbas-zaidi-132525215/',
                      'https://github.com/haider14-9abbaas',
                    ],
                  },
                  {
                    '@type': 'Person',
                    name: 'Hamza Kamran',
                    jobTitle: 'Cybersecurity & Full-Stack Developer',
                    sameAs: [
                      'https://www.linkedin.com/in/hamza-kamran-271872297/',
                      'https://github.com/Hamza-hani',
                    ],
                  },
                ],
              },
              {
                '@type': 'WebSite',
                '@id': 'https://forgesentry.com/#website',
                url: 'https://forgesentry.com',
                name: 'ForgeSentry',
                description: 'Secure web & automation, engineered for outcomes',
                publisher: { '@id': 'https://forgesentry.com/#organization' },
              },
            ],
          }),
        }}
      />
    </footer>
  );
};

export default Footer;
