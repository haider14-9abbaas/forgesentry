import BackgroundFX from '../components/BackgroundFX';

import { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Code2,
  Database,
  Workflow,
  ShoppingCart,
  MailCheck,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  Star,
  Award,
  Users,
  Target,
  Github,
  Linkedin,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import TestimonialCard from '../components/TestimonialCard';
import WhatsAppButton from '../components/WhatsAppButton';

import haiderImg from '../assets/haider.png';
import hamzaImg  from '../assets/hamza.png';

/* ===== motion helpers ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (gap = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: 0.1 } },
});

/* ===== tiny parallax hook ===== */
function useParallax(multiplier = 0.08) {
  const [offset, set] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * multiplier * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * multiplier * 100;
      set({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [multiplier]);
  return offset;
}

const Home = () => {
  const services = [
    { icon: Code2, title: 'MERN Development', description: 'Full-stack applications with React, Node.js, and MongoDB. Scalable, secure, and performance-optimized.', features: ['SSR/SPA Applications', 'REST/GraphQL APIs', 'Authentication & RBAC'] },
    { icon: Shield, title: 'Security Consulting', description: 'Comprehensive security assessments and implementations. OWASP compliance and threat modeling.', features: ['Security Audits', 'Penetration Testing', 'Compliance Implementation'] },
    { icon: Workflow, title: 'AI Automation', description: 'Intelligent workflow automation with n8n, Monday.com, and Zoho. Streamline your operations.', features: ['Process Automation', 'CRM Integration', 'Custom Workflows'] },
    { icon: Database, title: 'Database Solutions', description: 'Robust database architecture, optimization, and management. From design to deployment.', features: ['Schema Design', 'Performance Optimization', 'Backup & Recovery'] },
    { icon: ShoppingCart, title: 'Shopify Development', description: 'Custom Shopify themes and applications. E-commerce solutions that convert.', features: ['Custom Themes', 'App Development', 'Store Optimization'] },
    { icon: MailCheck, title: 'Email & CRM', description: 'Klaviyo email marketing and CRM optimization. Automated campaigns that deliver results.', features: ['Email Automation', 'List Management', 'Campaign Analytics'] },
  ];

  const stats = [
    { label: 'Projects Completed', value: '15+', icon: Target },
    { label: 'Certifications', value: '10+', icon: Award },
    { label: 'Client Success Rate', value: '100%', icon: Users },
    { label: 'Code Quality Score', value: '95%', icon: CheckCircle },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'CTO', company: 'TechStart Inc', rating: 5, content: 'ForgeSentry delivered exceptional security consultation that transformed our development process. Their attention to detail and expertise in both cybersecurity and development is unmatched.', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { name: 'Michael Chen', role: 'Product Manager', company: 'Digital Innovations', rating: 5, content: 'The automation solutions implemented by ForgeSentry reduced our manual processes by 70%. Their technical expertise and professional approach exceeded all expectations.', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { name: 'Emily Rodriguez', role: 'Founder', company: 'E-commerce Pro', rating: 5, content: 'Outstanding Shopify development work. ForgeSentry built us a high-converting store with advanced features. The results speak for themselves - 40% increase in conversions.', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
  ];

  const founders = [
    {
      name: 'Syed Haider Abbas Zaidi',
      role: 'Cybersecurity Professional & MERN Developer',
      image: haiderImg,
      linkedin: 'https://www.linkedin.com/in/syed-haider-abbas-zaidi-132525215/',
      github: 'https://github.com/haider14-9abbaas',
      bio: 'Cybersecurity expert with extensive MERN stack development experience.',
    },
    {
      name: 'Hamza Kamran',
      role: 'Cybersecurity & Full-Stack Developer',
      image: hamzaImg,
      linkedin: 'https://www.linkedin.com/in/hamza-kamran-271872297/',
      github: 'https://github.com/Hamza-hani',
      bio: 'Full-stack developer specializing in secure application architecture.',
    },
  ];

  const { x, y } = useParallax(0.08);

  return (
    <div className="min-h-screen">
      {/* ========= HERO ========= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28">
        {/* Image-based background (no video) */}
        <BackgroundFX />

        {/* floating icon layers */}
        <m.div
          aria-hidden
          className="pointer-events-none absolute inset-0 parallax z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1 }}
        >
          <m.div style={{ transform: `translate3d(${x}px, ${y}px, 0)` }} className="absolute -left-10 top-16 animate-float">
            <Shield className="h-20 w-20" style={{ color: 'var(--cn-cyan)' }} />
          </m.div>
          <m.div style={{ transform: `translate3d(${-x}px, ${y}px, 0)` }} className="absolute right-16 top-28 animate-float">
            <Code2 className="h-16 w-16" style={{ color: 'var(--cn-purple)' }} />
          </m.div>
          <m.div style={{ transform: `translate3d(${x}px, ${-y}px, 0)` }} className="absolute left-1/2 bottom-10 -translate-x-1/2 animate-float">
            <Database className="h-24 w-24" style={{ color: 'var(--cn-lime)' }} />
          </m.div>
        </m.div>

        {/* glass card */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="mx-auto max-w-5xl rounded-3xl backdrop-blur-2xl ring-1 shadow-[0_8px_40px_rgba(0,0,0,.35)] px-6 sm:px-10 py-10 sm:py-14 text-center"
            style={{ background: 'rgba(13,18,28,0.72)', borderColor: 'rgba(255,255,255,0.10)' }}
          >
            <m.div variants={stagger()} initial="hidden" animate="show">
              <m.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-4 sm:mb-6"
                style={{ color: 'var(--cn-text)' }}
              >
                Forge<span className="gradient-text animate-hue">Sentry</span>
              </m.h1>

              <m.p
                variants={fadeUp}
                className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed"
                style={{ color: 'var(--cn-sub)' }}
              >
                Secure web & automation, engineered for outcomes.
              </m.p>

              <m.div
                variants={stagger(0.12)}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10"
              >
                <m.div variants={fadeUp}>
                  <Link
                    to="/contact"
                    className="btn btn-lg px-8 rounded-xl font-medium"
                    style={{ backgroundColor: 'var(--cn-cyan)', borderColor: 'var(--cn-cyan)', color: '#0F172A' }}
                  >
                    Get a Free Consult
                    <ArrowRight size={20} />
                  </Link>
                </m.div>

                <m.div variants={fadeUp}>
                  <WhatsAppButton
                    variant="button"
                    className="btn-lg px-8 rounded-xl"
                    message="Hi! I'm interested in ForgeSentry's cybersecurity and development services. Can we schedule a free consultation to discuss my project?"
                  >
                    WhatsApp Consult
                  </WhatsAppButton>
                </m.div>

                <m.div variants={fadeUp}>
                  <Link
                    to="/projects"
                    className="btn btn-lg px-8 rounded-xl"
                    style={{
                      borderColor: 'rgba(255,255,255,0.30)',
                      color: 'var(--cn-text)',
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <PlayCircle size={20} />
                    See Our Work
                  </Link>
                </m.div>
              </m.div>

              <m.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 text-sm">
                <span
                  className="badge badge-lg"
                  style={{ background: 'rgba(17,24,39,0.85)', color: 'var(--cn-text)', borderColor: 'rgba(255,255,255,0.10)' }}
                >
                  15+ Projects
                </span>
                <span
                  className="badge badge-lg"
                  style={{ background: 'rgba(17,24,39,0.85)', color: 'var(--cn-text)', borderColor: 'rgba(255,255,255,0.10)' }}
                >
                  10+ Certifications
                </span>
                <span
                  className="badge badge-lg"
                  style={{ background: 'rgba(17,24,39,0.85)', color: 'var(--cn-text)', borderColor: 'rgba(255,255,255,0.10)' }}
                >
                  BS Cybersecurity — 2027
                </span>
              </m.div>
            </m.div>
          </div>
        </div>
      </section>

      {/* ========= FOUNDERS ========= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Meet Our Founders"
            subtitle="Cybersecurity professionals and full-stack developers"
            center={true}
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto place-items-center">
            {founders.map((founder, index) => (
              <m.div
                key={founder.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="mb-6">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover mx-auto ring-4"
                    style={{ boxShadow: '0 20px 45px rgba(0,0,0,.25)', borderColor: 'var(--cn-cyan)' }}
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">{founder.name}</h3>
                <p className="font-medium mb-4" style={{ color: 'var(--cn-cyan)' }}>{founder.role}</p>
                <p className="text-slate-600 mb-6">{founder.bio}</p>

                <div className="flex items-center justify-center space-x-4">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900/80 text-white hover:bg-[var(--cn-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--cn-cyan)] transition-colors duration-200"
                    aria-label={`${founder.name}'s LinkedIn`}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900/80 text-white hover:bg-[var(--cn-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--cn-cyan)] transition-colors duration-200"
                    aria-label={`${founder.name}'s GitHub`}
                  >
                    <Github size={20} />
                  </a>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= STATS ========= */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <m.div key={stat.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl mx-auto mb-4" style={{ backgroundColor: 'rgba(34,211,238,0.12)' }}>
                  <stat.icon className="h-8 w-8" style={{ color: 'var(--cn-cyan)' }} />
                </div>
                <div className="text-3xl font-display font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= SERVICES ========= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Services" subtitle="Comprehensive solutions for modern businesses" center={true} className="mb-12" />

          <m.div variants={stagger()} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <m.div
                key={service.title}
                variants={fadeUp}
                whileHover={{ rotateX: 4, rotateY: -4, translateZ: 6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="group relative card rounded-2xl bg-white border border-slate-200 p-6 shadow-card3d"
                style={{ transformOrigin: '60% 60%' }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition ring-2" style={{ background: 'linear-gradient(120deg,rgba(34,211,238,.2),rgba(124,58,237,.18),rgba(163,230,53,.2))' }} />
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ backgroundColor: 'rgba(34,211,238,0.12)' }}>
                    <service.icon className="h-6 w-6" style={{ color: 'var(--cn-cyan)' }} />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-slate-600">
                        <CheckCircle size={16} className="mr-2 flex-shrink-0" style={{ color: 'var(--cn-lime)' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* HIGH-CONTRAST CHIPS (visible on all cards) */}
                  <div className="mt-4 inline-flex flex-wrap gap-2">
                    {['Secure', 'Scalable', 'Performant'].map((p) => (
                      <span
                        key={p}
                        className="rounded-full px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 ring-1 ring-slate-200"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>

          <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mt-12">
            <Link
              to="/services"
              className="btn btn-lg px-8 text-slate-900 font-medium rounded-xl shadow-card3d"
              style={{ backgroundColor: 'var(--cn-cyan)', borderColor: 'var(--cn-cyan)' }}
            >
              View All Services
              <ArrowRight size={20} />
            </Link>
          </m.div>
        </div>
      </section>

      {/* ========= RESULTS STRIP ========= */}
      <section className="py-12" style={{ background: 'linear-gradient(90deg, var(--cn-cyan), var(--cn-purple))' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center text-white">
            <p className="text-xl sm:text-2xl font-display font-semibold">Cut no-shows 35% via WhatsApp automations • Available 24/7 on WhatsApp</p>
            <p className="opacity-80 mt-2">Real results from our automation implementations • Instant response guaranteed</p>
          </m.div>
        </div>
      </section>

      {/* ========= TESTIMONIALS ========= */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Client Success Stories" subtitle="What our clients say about working with us" center={true} className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>

          <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mt-12">
            <Link to="/reviews" className="btn btn-outline btn-lg px-8 border-slate-300 text-slate-700 hover:border-[var(--cn-cyan)] hover:text-[var(--cn-cyan)] rounded-xl">
              View All Reviews
              <Star size={20} />
            </Link>
          </m.div>
        </div>
      </section>

      {/* ========= CTA ========= */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">Let's discuss how we can help secure, automate, and optimize your business operations.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/contact"
                className="btn btn-lg px-8 text-slate-900 font-medium rounded-xl shadow-card3d"
                style={{ backgroundColor: 'var(--cn-cyan)', borderColor: 'var(--cn-cyan)' }}
              >
                Start Your Project
                <ArrowRight size={20} />
              </Link>
              <WhatsAppButton
                variant="button"
                className="btn-lg px-8 bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 rounded-xl shadow-card3d"
                message="Hi! I'm ready to transform my digital presence with ForgeSentry. Can we discuss my project requirements and get started?"
              >
                Chat on WhatsApp
              </WhatsAppButton>
              <Link to="/about" className="btn btn-outline btn-lg px-8 border-slate-400 text-slate-300 hover:border-white hover:text-white rounded-xl">
                Learn More About Us
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
