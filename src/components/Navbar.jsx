import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b
        ${scrolled
          ? 'bg-[rgba(13,18,28,0.92)] border-white/10 shadow-lg'
          : 'bg-[rgba(13,18,28,0.72)] border-white/10'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl transition-transform duration-200 group-hover:scale-110"
                 style={{ background: 'linear-gradient(135deg,var(--cn-cyan),var(--cn-purple))' }}>
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl lg:text-2xl font-display font-bold text-[var(--cn-text)]">
                Forge<span className="gradient-text animate-hue">Sentry</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${active
                      ? 'bg-[var(--cn-cyan)] text-slate-900'
                      : 'text-[var(--cn-text)]/80 hover:text-[var(--cn-text)] hover:bg-white/5'}`
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="btn btn-primary btn-sm lg:btn-md px-6 text-slate-900 font-medium hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: 'var(--cn-cyan)', borderColor: 'var(--cn-cyan)' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-[var(--cn-text)] hover:text-[var(--cn-cyan)] hover:bg-white/10 transition-colors duration-200"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.2 }}
        className="lg:hidden overflow-hidden border-t border-white/10 bg-[rgba(13,18,28,0.96)] backdrop-blur-md"
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                  ${active
                    ? 'bg-[var(--cn-cyan)] text-slate-900'
                    : 'text-[var(--cn-text)]/90 hover:text-[var(--cn-text)] hover:bg-white/5'}`
                }
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-white/10">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn btn-primary btn-block text-slate-900 font-medium"
              style={{ backgroundColor: 'var(--cn-cyan)', borderColor: 'var(--cn-cyan)' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
