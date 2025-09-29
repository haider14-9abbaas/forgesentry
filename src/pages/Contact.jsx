import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  Linkedin,
  Github,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import WhatsAppButton from '../components/WhatsAppButton';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  budget: z.string().min(1, 'Please select a budget range'),
  reason: z.string().min(1, 'Please select a reason for contact'),
  message: z.string().min(30, 'Message must be at least 30 characters'),
  consent: z.boolean().refine((v) => v === true, 'You must agree to the terms'),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(contactSchema) });

  const messageLength = watch('message')?.length || 0;

  const budgetRanges = ['Under $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000 - $50,000', '$50,000+', 'Not sure yet'];

  const contactReasons = [
    'Project Inquiry',
    'Security Assessment',
    'n8n/Monday/Zoho Automation',
    'AI Agent/Model Training',
    'Shopify Store Development',
    'SEO/Content Strategy',
    'Email Marketing/Klaviyo',
    'Hiring/Internship',
    'Partnership/Collaboration',
    'Other',
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'forgesentry@gmail.com', link: 'mailto:forgesentry@gmail.com' },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+92 336 0150999',
      link: 'https://wa.me/923360150999?text=Hi! I found your website and would like to discuss my project requirements.',
    },
    { icon: MapPin, label: 'Location', value: 'Remote & On-site Available', link: null },
    { icon: Clock, label: 'Response Time', value: 'WhatsApp: Instant • Email: 24h', link: null },
  ];

  const founders = [
    { name: 'Syed Haider Abbas Zaidi', role: 'Cybersecurity Professional', linkedin: 'https://www.linkedin.com/in/syed-haider-abbas-zaidi-132525215/', github: 'https://github.com/haider14-9abbaas' },
    { name: 'Hamza Kamran', role: 'Full-Stack Developer', linkedin: 'https://www.linkedin.com/in/hamza-kamran-271872297/', github: 'https://github.com/Hamza-hani' },
  ];

  // Create a CSRF token once
  useEffect(() => {
    const token = Math.random().toString(36).slice(2, 11);
    setCsrfToken(token);
    document.cookie = `fs_csrf=${token}; SameSite=Strict; Secure`;
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Optional reCAPTCHA integration (dev-friendly fallback)
      const recaptchaToken = await new Promise((resolve) => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute('YOUR_SITE_KEY', { action: 'contact' }).then(resolve);
          });
        } else {
          resolve('test-token');
        }
      });

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      if (!res.ok) throw new Error('Failed to send message');
      setSubmitStatus('success');
      reset();
    } catch (e) {
      console.error(e);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6">Get In Touch</h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Ready to transform your digital presence? Let's discuss how we can help secure, automate, and optimize your business operations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="badge badge-lg bg-white border-slate-200 text-slate-700 font-medium">
                <Clock size={16} className="mr-2" />
                Instant WhatsApp Response
              </div>
              <div className="badge badge-lg bg-white border-slate-200 text-slate-700 font-medium">
                <Shield size={16} className="mr-2" />
                Secure & Confidential
              </div>
              <div className="badge badge-lg bg-white border-slate-200 text-slate-700 font-medium">
                <CheckCircle size={16} className="mr-2" />
                Free Consultation
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card rounded-2xl bg-white border border-slate-200 p-8"
            >
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Send us a message</h2>

              {submitStatus === 'success' && (
                <div className="alert alert-success mb-6">
                  <CheckCircle size={20} />
                  <span>Message sent successfully! We'll get back to you within 24 hours.</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="alert alert-error mb-6">
                  <AlertCircle size={20} />
                  <span>Failed to send message. Please try again or email us directly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="label"><span className="label-text font-medium">Full Name *</span></label>
                  <input {...register('fullName')} type="text" className={`input input-bordered w-full ${errors.fullName ? 'input-error' : ''}`} placeholder="Your full name" />
                  {errors.fullName && <label className="label"><span className="label-text-alt text-error">{errors.fullName.message}</span></label>}
                </div>

                <div>
                  <label className="label"><span className="label-text font-medium">Email Address *</span></label>
                  <input {...register('email')} type="email" className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`} placeholder="your.email@company.com" />
                  {errors.email && <label className="label"><span className="label-text-alt text-error">{errors.email.message}</span></label>}
                </div>

                <div>
                  <label className="label"><span className="label-text font-medium">Company (Optional)</span></label>
                  <input {...register('company')} type="text" className="input input-bordered w-full" placeholder="Your company name" />
                </div>

                <div>
                  <label className="label"><span className="label-text font-medium">Budget Range *</span></label>
                  <select {...register('budget')} className={`select select-bordered w-full ${errors.budget ? 'select-error' : ''}`}>
                    <option value="">Select budget range</option>
                    {budgetRanges.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.budget && <label className="label"><span className="label-text-alt text-error">{errors.budget.message}</span></label>}
                </div>

                <div>
                  <label className="label"><span className="label-text font-medium">How can we help? *</span></label>
                  <select {...register('reason')} className={`select select-bordered w-full ${errors.reason ? 'select-error' : ''}`}>
                    <option value="">Select a reason</option>
                    {contactReasons.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.reason && <label className="label"><span className="label-text-alt text-error">{errors.reason.message}</span></label>}
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Message *</span>
                    <span className="label-text-alt">{messageLength}/30 min</span>
                  </label>
                  <textarea
                    {...register('message')}
                    className={`textarea textarea-bordered w-full h-32 ${errors.message ? 'textarea-error' : ''}`}
                    placeholder="Tell us about your project, goals, timeline, or any specific requirements..."
                  />
                  {errors.message && <label className="label"><span className="label-text-alt text-error">{errors.message.message}</span></label>}
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start">
                    <input {...register('consent')} type="checkbox" className={`checkbox mr-3 ${errors.consent ? 'checkbox-error' : 'checkbox-primary'}`} />
                    <span className="label-text">I agree to the processing of my data and consent to be contacted about this inquiry. *</span>
                  </label>
                  {errors.consent && <label className="label"><span className="label-text-alt text-error">{errors.consent.message}</span></label>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg w-full font-medium hover:scale-105 transition-transform duration-200 disabled:hover:scale-100"
                  style={{ backgroundColor: 'var(--cn-cyan)', borderColor: 'var(--cn-cyan)', color: '#0f172a' }}
                >
                  {isSubmitting ? (<><Loader2 size={20} className="animate-spin" /> Sending...</>) : (<><Send size={20} /> Send Message</>)}
                </button>

                <div className="divider">OR</div>
                <WhatsAppButton
                  variant="button"
                  className="btn-lg w-full"
                  message="Hi! I prefer to discuss my project over WhatsApp. Can we chat about my requirements and how ForgeSentry can help?"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp Instead
                </WhatsAppButton>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500 text-center">
                  Protected by reCAPTCHA and our Privacy Policy. We'll never share your information with third parties.
                </p>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              {/* Contact info */}
              <div className="card rounded-2xl bg-white border border-slate-200 p-8">
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg"
                           style={{ backgroundColor: 'rgba(34,211,238,0.12)' }}>
                        <info.icon className="h-5 w-5" style={{ color: 'var(--cn-cyan)' }} />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{info.label}</div>
                        {info.link ? (
                          <a href={info.link} className="text-slate-600 hover:text-[var(--cn-cyan)] transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-slate-600">{info.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Founders */}
              <div className="card rounded-2xl bg-white border border-slate-200 p-8">
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-6">Connect with Our Team</h3>
                <div className="space-y-6">
                  {founders.map((f, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-900">{f.name}</div>
                        <div className="text-sm text-slate-600">{f.role}</div>
                      </div>
                      <div className="flex space-x-2">
                        <a href={f.linkedin} target="_blank" rel="noopener noreferrer"
                           className="p-2 bg-slate-100 rounded-lg hover:text-white transition-colors duration-200"
                           style={{ border: '1px solid #e5e7eb' }} aria-label={`${f.name}'s LinkedIn`}>
                          <Linkedin size={16} />
                        </a>
                        <a href={f.github} target="_blank" rel="noopener noreferrer"
                           className="p-2 bg-slate-100 rounded-lg hover:text-white transition-colors duration-200"
                           style={{ border: '1px solid #e5e7eb' }} aria-label={`${f.name}'s GitHub`}>
                          <Github size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="card rounded-2xl bg-white border border-slate-200 p-8">
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">How quickly will you respond?</h4>
                    <p className="text-sm text-slate-600">WhatsApp messages get instant responses during business hours. Email inquiries are answered within 24 hours.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Do you offer free consultations?</h4>
                    <p className="text-sm text-slate-600">Yes, we offer free initial consultations to understand your needs and provide recommendations.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Can I reach you on WhatsApp?</h4>
                    <p className="text-sm text-slate-600">Absolutely! WhatsApp is our preferred communication method for quick discussions and project updates.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">What information should I include?</h4>
                    <p className="text-sm text-slate-600">Include your project goals, timeline, budget range, and any specific requirements or challenges you're facing.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
