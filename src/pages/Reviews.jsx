import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Quote } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import TestimonialCard from '../components/TestimonialCard';
import WhatsAppButton from '../components/WhatsAppButton';

const Reviews = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechStart Inc',
      rating: 5,
      content:
        'ForgeSentry delivered exceptional security consultation that transformed our development process. Their attention to detail and expertise in both cybersecurity and development is unmatched. The team identified vulnerabilities we never knew existed and provided practical solutions.',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      project: 'Security Audit & MERN Development',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Digital Innovations',
      rating: 5,
      content:
        'The automation solutions implemented by ForgeSentry reduced our manual processes by 70%. Their technical expertise and professional approach exceeded all expectations. The WhatsApp automation alone saved us 20 hours per week.',
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      project: 'AI Automation & CRM Integration',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder',
      company: 'E-commerce Pro',
      rating: 5,
      content:
        'Outstanding Shopify development work. ForgeSentry built us a high-converting store with advanced features. The results speak for themselves - 40% increase in conversions and 60% improvement in page load times.',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      project: 'Shopify Development & SEO',
    },
    {
      name: 'David Kim',
      role: 'DevOps Engineer',
      company: 'CloudTech Solutions',
      rating: 5,
      content:
        'Incredible database optimization work. Our queries are now 5x faster and we have zero downtime. The migration was seamless and the documentation provided was thorough. ForgeSentry truly understands enterprise-level requirements.',
      avatar:
        'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      project: 'Database Optimization & Migration',
    },
    {
      name: 'Lisa Thompson',
      role: 'Marketing Director',
      company: 'Growth Agency',
      rating: 5,
      content:
        'The email marketing automation setup exceeded our expectations. Our open rates increased by 45% and conversions by 30%. The Klaviyo integration was flawless and the analytics dashboard is incredibly insightful.',
      avatar:
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      project: 'Email Marketing & Analytics',
    },
    {
      name: 'Alex Morgan',
      role: 'CEO',
      company: 'FinTech Startup',
      rating: 5,
      content:
        'Security was our top priority and ForgeSentry delivered beyond expectations. The penetration testing revealed critical vulnerabilities and their remediation plan was comprehensive. We now have bank-level security.',
      avatar:
        'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      project: 'Penetration Testing & Security Implementation',
    },
    {
      name: 'Rachel Green',
      role: 'Operations Manager',
      company: 'Healthcare Solutions',
      rating: 5,
      content:
        'The HIPAA-compliant automation system has revolutionized our patient communication. Appointment no-shows dropped by 35% and patient satisfaction increased significantly. The team understood healthcare compliance perfectly.',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      project: 'Healthcare Automation & Compliance',
    },
    {
      name: 'James Wilson',
      role: 'Technical Lead',
      company: 'SaaS Platform',
      rating: 5,
      content:
        'The MERN stack application they built is robust, scalable, and incredibly fast. The code quality is exceptional and the documentation is comprehensive. Our user base grew 300% without any performance issues.',
      avatar:
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      project: 'Full-Stack Web Application',
    },
    {
      name: 'Maria Santos',
      role: 'Digital Marketing Specialist',
      company: 'Retail Chain',
      rating: 5,
      content:
        'Our multi-store Shopify setup is now running perfectly. The inventory synchronization and performance optimizations have improved our operations dramatically. Customer checkout times reduced by 50%.',
      avatar:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      project: 'Multi-Store E-commerce Platform',
    },
  ];

  const stats = [
    { label: 'Average Rating', value: '5.0', icon: Star },
    { label: 'Happy Clients', value: '100%', icon: Quote },
    { label: 'Projects Completed', value: '15+', icon: ArrowRight },
    { label: 'Return Clients', value: '85%', icon: Star },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
              Client Reviews
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Don't just take our word for it. See what our clients have to say about working with ForgeSentry and the
              results we've delivered together.
            </p>

            {/* Rating */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="fill-current"
                    style={{ color: 'var(--cn-lime, #A3E635)' }}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-slate-900">5.0</span>
              <span className="text-slate-600">from {testimonials.length} reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-3"
                  style={{ backgroundColor: 'rgba(34,211,238,0.12)' }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: 'var(--cn-cyan, #22D3EE)' }} />
                </div>
                <div className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="What Our Clients Say"
            subtitle="Real feedback from real clients who trust ForgeSentry with their projects"
            center
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={t.name} className="relative">
                <TestimonialCard testimonial={t} index={i} />
                {t.project && (
                  <div className="absolute -top-3 left-6 z-10">
                    <span
                      className="inline-block px-3 py-1 text-white text-xs font-medium rounded-full"
                      style={{ background: 'linear-gradient(135deg, var(--cn-cyan, #22D3EE), var(--cn-purple, #7C3AED))' }}
                    >
                      {t.project}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-6">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              From startups to established companies, our clients trust us to deliver secure, scalable solutions that
              drive real business results.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {['TechStart Inc', 'Digital Innovations', 'E-commerce Pro', 'CloudTech Solutions', 'Growth Agency'].map(
                (c, i) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 0.6, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-slate-500 font-medium"
                  >
                    {c}
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Let's create the next success story together. Start your project with the team that delivers exceptional
              results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="btn btn-lg px-8 font-medium rounded-xl"
                style={{
                  backgroundColor: 'var(--cn-cyan, #22D3EE)',
                  borderColor: 'var(--cn-cyan, #22D3EE)',
                  color: '#0f172a',
                }}
              >
                Start Your Project
                <ArrowRight size={20} />
              </Link>
              <WhatsAppButton
                variant="button"
                className="btn-lg px-8"
                message="Hi! I've seen your amazing client reviews and I'm convinced. Can we discuss my project and create the next success story together?"
              >
                WhatsApp Us Now
              </WhatsAppButton>
              <Link
                to="/projects"
                className="btn btn-outline btn-lg px-8 rounded-xl"
                style={{
                  borderColor: 'rgba(226,232,240,.35)',
                  color: 'rgba(203,213,225,1)',
                }}
              >
                View Our Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
