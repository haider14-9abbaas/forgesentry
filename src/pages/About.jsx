import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Target,
  Users,
  Award,
  Linkedin,
  Github,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  Briefcase,
  MessageCircle,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import WhatsAppButton from '../components/WhatsAppButton';

// Import images (do not use "/src/...").
import haiderImg from '../assets/haider.png';
import hamzaImg from '../assets/hamza.png';

const About = () => {
  const founders = [
    {
      name: 'Syed Haider Abbas Zaidi',
      role: 'Cybersecurity Professional & MERN Developer',
      image: haiderImg,
      linkedin: 'https://www.linkedin.com/in/syed-haider-abbas-zaidi-132525215/',
      github: 'https://github.com/haider14-9abbaas',
      bio: 'Cybersecurity expert with extensive experience in MERN stack development. Specializes in building secure, scalable applications with a focus on threat modeling and security implementation. Currently pursuing BS in Cybersecurity (expected 2027).',
      expertise: ['Cybersecurity', 'MERN Stack', 'Threat Modeling', 'Security Audits', 'Penetration Testing'],
      achievements: ['IBM Cybersecurity Analyst (100%)', 'CEH Preparation', 'OWASP Top 10 Expert'],
    },
    {
      name: 'Hamza Kamran',
      role: 'Cybersecurity & Full-Stack Developer',
      image: hamzaImg,
      linkedin: 'https://www.linkedin.com/in/hamza-kamran-271872297/',
      github: 'https://github.com/Hamza-hani',
      bio: 'Full-stack developer with strong cybersecurity background. Expert in creating secure application architectures and implementing robust authentication systems. Passionate about automation and AI integration.',
      expertise: ['Full-Stack Development', 'Security Architecture', 'API Development', 'Database Design', 'AI Automation'],
      achievements: ['Security Implementation Expert', 'Database Optimization Specialist', 'Automation Systems Designer'],
    },
  ];

  const skills = [
    { category: 'Security', items: ['IBM Cybersecurity Analyst (100%)', 'CEH prep', 'Wireshark', 'Kali Linux', 'PKI'] },
    { category: 'Development', items: ['React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL'] },
    { category: 'Automation', items: ['n8n', 'Monday.com', 'Zoho Flow', 'Zapier', 'Custom APIs'] },
    { category: 'E-commerce', items: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Analytics'] },
  ];

  const values = [
    { icon: Shield, title: 'Security First', description: 'Every solution we build prioritizes security from the ground up, ensuring your data and systems are protected.' },
    { icon: Target, title: 'Results Driven', description: 'We focus on delivering measurable outcomes that directly impact your business objectives and growth.' },
    { icon: Users, title: 'Client Partnership', description: 'We work closely with our clients as partners, ensuring transparency and collaboration throughout every project.' },
    { icon: Award, title: 'Excellence', description: 'We maintain the highest standards in code quality, security practices, and professional service delivery.' },
  ];

  const timeline = [
    { year: '2023', title: 'ForgeSentry Founded', description: 'Started with a vision to provide secure, automated solutions for modern businesses.' },
    { year: '2024', title: 'Major Certifications', description: 'Achieved IBM Cybersecurity Analyst certification and expanded service offerings.' },
    { year: '2024', title: '15+ Projects Completed', description: 'Successfully delivered projects across various industries with 100% client satisfaction.' },
    { year: '2025', title: 'Continued Growth', description: 'Expanding services and building long-term partnerships with enterprises worldwide.' },
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
              About ForgeSentry
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Security first. Automation always. Results that compound.
            </p>

            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-sm border border-slate-200">
              <MapPin size={16} style={{ color: 'var(--cn-cyan)' }} />
              <span className="text-slate-700 font-medium">Remote & On-site Available</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Mission" subtitle="Building the future of secure digital solutions" center className="mb-16" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-lg text-slate-600 leading-relaxed">
              At ForgeSentry, we believe that security and automation should be at the heart of every digital solution.
              Our mission is to help businesses build robust, secure, and automated systems that drive real results and
              create lasting value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-xl mx-auto mb-6"
                  style={{ backgroundColor: 'rgba(34,211,238,0.12)' }}
                >
                  <value.icon className="h-8 w-8" style={{ color: 'var(--cn-cyan)' }} />
                </div>
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Meet Our Founders"
            subtitle="The cybersecurity and development experts behind ForgeSentry"
            center
            className="mb-16"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="card rounded-2xl bg-white border border-slate-200 p-8"
              >
                <div className="text-center mb-8">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-32 h-32 rounded-full object-cover ring-4 shadow-xl mx-auto mb-6"
                    style={{ boxShadow: '0 18px 40px rgba(0,0,0,.18)', borderColor: 'var(--cn-cyan)' }}
                    loading="lazy"
                  />
                  <h3 className="text-2xl font-display font-semibold text-slate-900 mb-2">{f.name}</h3>
                  <p className="font-medium mb-4" style={{ color: 'var(--cn-cyan)' }}>{f.role}</p>

                  {/* High-contrast social buttons (visible on white, gradient hover) */}
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${f.name}'s LinkedIn`}
                      className="relative group inline-flex items-center justify-center p-2 rounded-lg ring-1 ring-slate-200 bg-white text-slate-700 transition-all duration-200 hover:text-white"
                    >
                      <span
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: 'linear-gradient(135deg,var(--cn-cyan),var(--cn-purple))' }}
                      />
                      <Linkedin size={20} className="relative" />
                    </a>

                    <a
                      href={f.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${f.name}'s GitHub`}
                      className="relative group inline-flex items-center justify-center p-2 rounded-lg ring-1 ring-slate-200 bg-white text-slate-700 transition-all duration-200 hover:text-white"
                    >
                      <span
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: 'linear-gradient(135deg,var(--cn-purple),var(--cn-cyan))' }}
                      />
                      <Github size={20} className="relative" />
                    </a>
                  </div>
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed">{f.bio}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {f.expertise.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 text-sm font-medium rounded-full"
                        style={{ background: 'rgba(34,211,238,0.12)', color: '#0f172a', border: '1px solid rgba(34,211,238,.25)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {f.achievements.map((a) => (
                      <li key={a} className="flex items-center text-sm text-slate-600">
                        <CheckCircle size={16} style={{ color: 'var(--cn-lime)' }} className="mr-2 flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Skills & Certifications"
            subtitle="Our comprehensive expertise across security, development, and automation"
            center
            className="mb-16"
          />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((s, i) => (
              <motion.div
                key={s.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card rounded-2xl bg-slate-50 border border-slate-200 p-6"
              >
                <h3 className="text-lg font-display font-semibold text-slate-900 mb-4">{s.category}</h3>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center text-sm text-slate-600">
                      <CheckCircle size={14} style={{ color: 'var(--cn-cyan)' }} className="mr-2 flex-shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Journey" subtitle="Key milestones in the ForgeSentry story" center className="mb-16" />
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300" />
              {timeline.map((e, i) => (
                <motion.div
                  key={e.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative flex items-start mb-12 last:mb-0"
                >
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-full font-bold text-sm text-slate-900 z-10"
                    style={{ background: 'linear-gradient(135deg, var(--cn-cyan), var(--cn-purple))' }}
                  >
                    <span className="bg-white/80 px-2 py-1 rounded text-slate-900">{e.year}</span>
                  </div>
                  <div className="ml-8">
                    <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">{e.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{e.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div
              className="flex items-center justify-center w-16 h-16 rounded-xl mx-auto mb-6"
              style={{ backgroundColor: 'rgba(163,230,53,0.12)' }}
            >
              <Briefcase className="h-8 w-8" style={{ color: 'var(--cn-lime)' }} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6">Open to New Opportunities</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We're actively seeking internships, freelance projects, and strategic partnerships.
              Whether you're looking for cybersecurity expertise, development talent, or automation solutions,
              we'd love to discuss how we can collaborate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {['Internships', 'Freelance Projects', 'Strategic Partnerships'].map((o) => (
                <div
                  key={o}
                  className="rounded-lg p-4"
                  style={{ background: 'rgba(15,23,42,0.04)', border: '1px solid rgba(148,163,184,.35)' }}
                >
                  <CheckCircle size={20} style={{ color: 'var(--cn-lime)' }} className="mx-auto mb-2" />
                  <span className="text-slate-700 font-medium">{o}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">Let's Work Together</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Ready to build something amazing? We'd love to hear about your project and explore how we can help bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                to="/contact"
                className="btn btn-lg px-8 font-medium rounded-xl"
                style={{ backgroundColor: 'var(--cn-cyan)', borderColor: 'var(--cn-cyan)', color: '#0f172a' }}
              >
                Start a Conversation
                <ArrowRight size={20} />
              </Link>

              <WhatsAppButton
                variant="button"
                className="btn-lg px-8 bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                message="Hi! I'd love to work with the ForgeSentry team. Can we discuss potential collaboration opportunities?"
              >
                <MessageCircle size={20} />
                WhatsApp Chat
              </WhatsAppButton>

              <a
                href="mailto:forgesentry@gmail.com"
                className="btn btn-outline btn-lg px-8 border-slate-400 text-slate-300 hover:border-white hover:text-white rounded-xl"
              >
                <Mail size={20} />
                Email Us Directly
              </a>
            </div>

            <div className="text-slate-400 text-sm space-y-1">
              <div>📧 forgesentry@gmail.com</div>
              <div>📱 +92 336 0150999 (WhatsApp)</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
