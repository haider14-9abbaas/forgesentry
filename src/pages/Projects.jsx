import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import FilterToolbar from '../components/FilterToolbar';
import ProjectCard from '../components/ProjectCard';
import WhatsAppButton from '../components/WhatsAppButton';

const Projects = () => {
  const categories = ['All', 'UI/UX', 'AI', 'Security', 'Full', 'Functional', 'Interactive'];
  const [activeCategory, setActiveCategory] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'SecureAuth Dashboard',
      category: 'Security',
      badge: 'Pixel-perfect mobile-first design',
      description:
        'A comprehensive authentication dashboard with advanced security features, real-time monitoring, and user management capabilities.',
      technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'TailwindCSS'],
      liveUrl: 'https://example-secure-dashboard.com',
      githubUrl: 'https://github.com/forgesentry/secure-auth-dashboard',
    },
    {
      id: 2,
      title: 'AI-Powered CRM Automation',
      category: 'AI',
      badge: 'Advanced workflow automation',
      description:
        'Intelligent CRM system with AI-driven lead scoring, automated follow-ups, and predictive analytics for better conversion rates.',
      technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'n8n'],
      liveUrl: 'https://example-ai-crm.com',
      githubUrl: null,
    },
    {
      id: 3,
      title: 'E-commerce Security Suite',
      category: 'Full',
      badge: 'Complete security implementation',
      description:
        'Full-stack e-commerce platform with advanced security features, payment processing, and inventory management.',
      technologies: ['Next.js', 'Stripe', 'Shopify API', 'Redis', 'PostgreSQL'],
      liveUrl: null,
      githubUrl: 'https://github.com/forgesentry/ecommerce-security-suite',
    },
    {
      id: 4,
      title: 'Interactive Data Visualization',
      category: 'Interactive',
      badge: 'Real-time analytics dashboard',
      description:
        'Dynamic data visualization platform with real-time updates, interactive charts, and customizable reporting features.',
      technologies: ['Vue.js', 'D3.js', 'WebSocket', 'Express', 'InfluxDB'],
      liveUrl: 'https://example-data-viz.com',
      githubUrl: 'https://github.com/forgesentry/interactive-data-viz',
    },
    {
      id: 5,
      title: 'WhatsApp Business Automation',
      category: 'Functional',
      badge: 'PHI-compliant messaging',
      description:
        'Automated WhatsApp business solution with appointment scheduling, customer support, and compliance features.',
      technologies: ['Node.js', 'WhatsApp API', 'MongoDB', 'n8n', 'Zoho CRM'],
      liveUrl: 'https://example-whatsapp-automation.com',
      githubUrl: null,
    },
    {
      id: 6,
      title: 'Modern UI Component Library',
      category: 'UI/UX',
      badge: 'Accessible design system',
      description:
        'Comprehensive React component library with accessibility features, dark mode support, and extensive customization options.',
      technologies: ['React', 'TypeScript', 'Storybook', 'Jest', 'SCSS'],
      liveUrl: 'https://example-ui-library.com',
      githubUrl: 'https://github.com/forgesentry/ui-component-library',
    },
    {
      id: 7,
      title: 'Penetration Testing Platform',
      category: 'Security',
      badge: 'OWASP compliance testing',
      description:
        'Automated penetration testing platform for web applications with detailed reporting and remediation recommendations.',
      technologies: ['Python', 'Selenium', 'Nmap', 'OWASP ZAP', 'FastAPI'],
      liveUrl: null,
      githubUrl: 'https://github.com/forgesentry/pentest-platform',
    },
    {
      id: 8,
      title: 'AI Content Generator',
      category: 'AI',
      badge: 'GPT-powered content creation',
      description:
        'Content generation platform using AI for blogs, social media, and marketing materials with SEO optimization.',
      technologies: ['React', 'OpenAI API', 'Node.js', 'Redis', 'PostgreSQL'],
      liveUrl: 'https://example-ai-content.com',
      githubUrl: null,
    },
    {
      id: 9,
      title: 'Shopify Performance Optimizer',
      category: 'Full',
      badge: 'Speed optimization suite',
      description:
        'Complete Shopify store optimization with performance monitoring, SEO enhancements, and conversion rate improvements.',
      technologies: ['Shopify Liquid', 'JavaScript', 'Lighthouse', 'GTM', 'Google Analytics'],
      liveUrl: 'https://example-shopify-optimizer.com',
      githubUrl: 'https://github.com/forgesentry/shopify-optimizer',
    },
  ];

  const filteredProjects =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

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
              Our Projects
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Explore our portfolio of successful projects spanning cybersecurity, web development,
              automation, and digital transformation initiatives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FilterToolbar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <SectionHeader
            title={`${activeCategory} Projects`}
            badge={`${filteredProjects.length} projects`}
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">No projects found</h3>
              <p className="text-slate-600">Try selecting a different category to see more projects.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Technologies We Use"
            subtitle="Cutting-edge tools and frameworks for modern development"
            center
            className="mb-12"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'React',
              'Node.js',
              'Python',
              'MongoDB',
              'PostgreSQL',
              'TailwindCSS',
              'Next.js',
              'Express',
              'TypeScript',
              'JWT',
              'Redis',
              'AWS',
              'Docker',
              'Kubernetes',
              'GraphQL',
              'REST API',
              'WebSocket',
              'Stripe',
            ].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-center px-4 py-3 rounded-xl bg-white border border-slate-200 transition-all duration-200"
                style={{
                  boxShadow: '0 8px 24px rgba(2,6,23,0.06)',
                }}
              >
                <span className="font-medium text-sm text-slate-700">{tech}</span>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">Have a Project in Mind?</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Let's bring your vision to life with secure, scalable, and high-performance solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="/contact"
                className="btn btn-lg px-8 font-medium rounded-xl"
                style={{
                  backgroundColor: 'var(--cn-cyan, #22D3EE)',
                  borderColor: 'var(--cn-cyan, #22D3EE)',
                  color: '#0f172a',
                }}
              >
                Start Your Project
              </a>
              <WhatsAppButton
                variant="button"
                className="btn-lg px-8"
                message="Hi! I've reviewed your project portfolio and I'm impressed. Can we discuss bringing my vision to life with similar quality and expertise?"
              >
                Discuss My Project
              </WhatsAppButton>
              <a
                href="/services"
                className="btn btn-outline btn-lg px-8 rounded-xl"
                style={{
                  borderColor: 'rgba(226,232,240,.35)',
                  color: 'rgba(203,213,225,1)',
                }}
              >
                View Our Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
