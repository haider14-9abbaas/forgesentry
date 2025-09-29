import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = ({
  variant = 'floating',
  message = "Hi! I'm interested in your services. Can we discuss my project?",
  className = '',
  children,
}) => {
  const phoneNumber = '+923360150999';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(
    message
  )}`;

  if (variant === 'floating') {
    return (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} className="group-hover:animate-pulse" />
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat on WhatsApp
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
        </div>
      </motion.a>
    );
  }

  if (variant === 'button') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 text-white font-medium hover:scale-105 transition-transform duration-200 ${className}`}
      >
        <MessageCircle size={20} />
        {children || 'WhatsApp'}
      </a>
    );
  }

  if (variant === 'link') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center space-x-2 font-medium transition-colors duration-200 ${className}`}
        style={{ color: '#16a34a' }} // WhatsApp green
      >
        <MessageCircle size={16} />
        <span>{children || phoneNumber}</span>
      </a>
    );
  }

  return null;
};

export default WhatsAppButton;
