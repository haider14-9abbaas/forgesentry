import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Code2,
  Database,
  Workflow,
  ShieldCheck,
  ShoppingCart,
  MailCheck,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Zap,
  Award,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import WhatsAppButton from '../components/WhatsAppButton';

const Services = () => {
  const services = [
    {
      id: 'mern',
      icon: Code2,
      title: 'MERN Development',
      description:
        'Full-stack web applications using MongoDB, Express.js, React, and Node.js. We build scalable, secure, and high-performance applications tailored to your business needs.',
      features: [
        'Server-Side Rendering (SSR) and Single Page Applications (SPA)',
        'RESTful APIs and GraphQL implementation',
        'JWT and Session-based authentication systems',
        'Role-Based Access Control (RBAC)',
        'Comprehensive testing suites (Unit, Integration, E2E)',
        'CI/CD pipeline setup and deployment automation',
        'Database optimization and caching strategies',
        'Real-time features with WebSocket integration',
      ],
      benefits: ['Faster development cycles', 'Scalable architecture', 'SEO-optimized applications', 'Mobile-responsive design'],
      timeline: '4-12 weeks',
      investment: 'From $5,000',
    },
    {
      id: 'databases',
      icon: Database,
      title: 'Database Solutions',
      description:
        'Comprehensive database design, optimization, and management services. From schema design to performance tuning, we ensure your data layer is robust and efficient.',
      features: [
        'Database schema design and normalization',
        'Migration strategies and data transformation',
        'Index optimization and query performance tuning',
        'Automated backup and Point-in-Time Recovery (PITR)',
        'Role-Based Access Control (RBAC) implementation',
        'Audit logging and compliance setup',
        'Data encryption at rest and in transit',
        'Database monitoring and alerting systems',
      ],
      benefits: ['Improved query performance', 'Data integrity assurance', 'Disaster recovery planning', 'Compliance readiness'],
      timeline: '2-8 weeks',
      investment: 'From $3,000',
    },
    {
      id: 'automation',
      icon: Workflow,
      title: 'AI Automation',
      description:
        'Intelligent workflow automation using cutting-edge tools like n8n, Monday.com, and Zoho Flow. Streamline operations while maintaining security and compliance.',
      features: [
        'Custom workflow design with n8n',
        'Monday.com project management integration',
        'Zoho CRM and Bigin automation',
        'Webhook implementation and API integrations',
        'WhatsApp business automation (PHI-compliant)',
        'Email marketing automation',
        'Lead nurturing and customer journey mapping',
        'Analytics and reporting dashboards',
      ],
      benefits: ['Reduced manual workload', 'Improved response times', 'Better customer experience', 'Data-driven insights'],
      timeline: '3-10 weeks',
      investment: 'From $4,000',
    },
    {
      id: 'security',
      icon: ShieldCheck,
      title: 'Security Consulting',
      description:
        'Comprehensive cybersecurity services including assessments, penetration testing, and security implementation. We help protect your digital assets and ensure compliance.',
      features: [
        'OWASP Top 10 vulnerability assessments',
        'SQL injection prevention and mitigation',
        'Content Security Policy (CSP) implementation',
        'Security headers configuration',
        'Threat modeling and risk assessment',
        'Security code reviews and audits',
        'Secrets management and encryption',
        'Incident response planning',
      ],
      benefits: ['Enhanced security posture', 'Reduced risk exposure', 'Compliance achievement', 'Peace of mind'],
      timeline: '2-6 weeks',
      investment: 'From $2,500',
    },
    {
      id: 'shopify',
      icon: ShoppingCart,
      title: 'Shopify & E-commerce',
      description:
        'Custom Shopify development and e-commerce optimization. From theme customization to app development, we create high-converting online stores.',
      features: [
        'Custom Shopify theme development',
        'Shopify app development and integration',
        'Conversion rate optimization',
        'Schema markup and SEO implementation',
        'Performance optimization and speed enhancement',
        'Payment gateway integration',
        'Inventory management systems',
        'Multi-channel selling setup',
      ],
      benefits: ['Higher conversion rates', 'Better user experience', 'Improved search rankings', 'Increased sales'],
      timeline: '3-8 weeks',
      investment: 'From $3,500',
    },
    {
      id: 'email-crm',
      icon: MailCheck,
      title: 'Email Marketing & CRM',
      description:
        'Advanced email marketing automation and CRM optimization using Klaviyo and other leading platforms. Drive engagement and increase customer lifetime value.',
      features: [
        'Klaviyo email flows and automation',
        'List segmentation and management',
        'Email deliverability optimization',
        'UTM tracking and campaign analytics',
        'A/B testing and optimization',
        'Customer journey mapping',
        'Integration with e-commerce platforms',
        'Performance reporting and insights',
      ],
      benefits: ['Higher email engagement', 'Better customer retention', 'Increased revenue per email', 'Data-driven optimization'],
      timeline: '2-6 weeks',
      investment: 'From $2,000',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6">Our Services</h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Comprehensive digital solutions engineered for security, performance, and growth. From development to
              deployment, we've got you covered.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="badge badge-lg bg-white border-slate-200 text-slate-700 font-medium">
                <Clock size={16} className="mr-2" style={{ color: 'var(--cn-cyan, #22D3EE)' }} />
                Fast Delivery
              </div>
              <div className="badge badge-lg bg-white border-slate-200 text-slate-700 font-medium">
                <Award size={16} className="mr-2" style={{ color: 'var(--cn-cyan, #22D3EE)' }} />
                Expert Team
              </div>
              <div className="badge badge-lg bg-white border-slate-200 text-slate-700 font-medium">
                <Users size={16} className="mr-2" style={{ color: 'var(--cn-cyan, #22D3EE)' }} />
                100% Client Success
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                id={service.id}
                className="scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className="flex items-center justify-center w-16 h-16 rounded-xl"
                        style={{ backgroundColor: 'rgba(34,211,238,0.12)' }} // cyan bg
                      >
                        <service.icon className="h-8 w-8" style={{ color: 'var(--cn-cyan, #22D3EE)' }} />
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900">{service.title}</h2>
                    </div>

                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">{service.description}</p>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock size={16} style={{ color: 'var(--cn-cyan, #22D3EE)' }} />
                          <span className="font-semibold text-slate-900">Timeline</span>
                        </div>
                        <p className="text-slate-600">{service.timeline}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap size={16} style={{ color: 'var(--cn-cyan, #22D3EE)' }} />
                          <span className="font-semibold text-slate-900">Investment</span>
                        </div>
                        <p className="text-slate-600">{service.investment}</p>
                      </div>
                    </div>

                    <Link
                      to="/contact"
                      className="btn btn-lg px-8 font-medium rounded-xl"
                      style={{
                        backgroundColor: 'var(--cn-cyan, #22D3EE)',
                        borderColor: 'var(--cn-cyan, #22D3EE)',
                        color: '#0f172a',
                      }}
                    >
                      Book a Consultation
                      <ArrowRight size={20} />
                    </Link>
                    <WhatsAppButton
                      variant="button"
                      className="btn-lg px-8 mt-4"
                      message={`Hi! I'm interested in your ${service.title} services. Can we discuss my project requirements and timeline?`}
                    >
                      Quick WhatsApp Chat
                    </WhatsAppButton>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="card rounded-2xl bg-white border border-slate-200 p-8">
                      <div className="mb-8">
                        <h3 className="text-xl font-display font-semibold text-slate-900 mb-6">What You Get</h3>
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 * i }}
                              className="flex items-start text-slate-600"
                            >
                              <CheckCircle
                                size={20}
                                className="mr-3 flex-shrink-0 mt-0.5"
                                style={{ color: 'var(--cn-lime, #A3E635)' }}
                              />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-slate-200 pt-6">
                        <h4 className="font-semibold text-slate-900 mb-4">Key Benefits</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {service.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center text-sm text-slate-600">
                              <CheckCircle
                                size={16}
                                className="mr-2 flex-shrink-0"
                                style={{ color: 'var(--cn-cyan, #22D3EE)' }}
                              />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Process" subtitle="How we deliver exceptional results" center className="mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery & Planning',
                description:
                  'We start with understanding your goals, challenges, and requirements through detailed consultation and analysis.',
              },
              {
                step: '02',
                title: 'Design & Development',
                description:
                  'Our team creates detailed plans and begins development with regular check-ins and progress updates.',
              },
              {
                step: '03',
                title: 'Testing & Deployment',
                description: 'Rigorous testing ensures quality, followed by seamless deployment and ongoing support.',
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full text-xl font-bold mb-6"
                  style={{ backgroundColor: 'var(--cn-cyan, #22D3EE)', color: '#0f172a' }}
                >
                  {process.step}
                </div>
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-4">{process.title}</h3>
                <p className="text-slate-600 leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Let's discuss your project and create a custom solution that drives results.
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
                Schedule Consultation
                <ArrowRight size={20} />
              </Link>
              <WhatsAppButton
                variant="button"
                className="btn-lg px-8"
                message="Hi! I'm ready to get started with ForgeSentry's services. Can we discuss my project and schedule a consultation?"
              >
                WhatsApp Consultation
              </WhatsAppButton>
              <Link
                to="/projects"
                className="btn btn-outline btn-lg px-8 rounded-xl"
                style={{ borderColor: 'rgba(226,232,240,.35)', color: 'rgba(203,213,225,1)' }}
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
