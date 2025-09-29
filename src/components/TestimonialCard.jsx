import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial, index }) => {
  const { name, role, company, rating = 5, content, avatar } = testimonial;

  // Build initials safely
  const initials = (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="card-hover card rounded-2xl bg-white border border-slate-200 p-6"
      style={{
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      }}
    >
      {/* Rating */}
      <div className="flex items-center space-x-1 mb-4" aria-label={`Rating: ${rating} out of 5`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-current' : ''}
            style={{
              color: i < rating ? 'var(--cn-lime, #A3E635)' : 'rgba(148,163,184,0.6)', // lime vs. slate-400
            }}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-slate-600 mb-6 leading-relaxed">"{content}"</p>

      {/* Author */}
      <div className="flex items-center space-x-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-slate-200 bg-slate-50"
          aria-hidden={!avatar}
        >
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-slate-600 font-semibold text-sm">{initials || 'FS'}</span>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">{name}</h4>
          <p className="text-sm text-slate-600">
            {role}
            {company ? ` at ${company}` : ''}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
