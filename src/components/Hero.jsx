import { motion as m } from 'framer-motion';
import { Shield, Code2, Database } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';
import { fadeUp, stagger, scaleTap } from '../utils/motion';

export default function Hero() {
  const { x, y } = useParallax(0.08);

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      {/* floating background shapes */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0 parallax"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1 }}
      >
        <m.div
          style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
          className="absolute -left-10 top-16 animate-float"
        >
          <Shield className="h-20 w-20" style={{ color: 'rgba(34,211,238,.4)' }} />
        </m.div>
        <m.div
          style={{ transform: `translate3d(${-x}px, ${y}px, 0)` }}
          className="absolute right-16 top-32 animate-float"
        >
          <Code2 className="h-16 w-16" style={{ color: 'rgba(34,211,238,.4)' }} />
        </m.div>
        <m.div
          style={{ transform: `translate3d(${x}px, ${-y}px, 0)` }}
          className="absolute left-1/2 bottom-10 -translate-x-1/2 animate-float"
        >
          <Database className="h-24 w-24" style={{ color: 'rgba(163,230,53,.35)' }} />
        </m.div>
      </m.div>

      <m.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <m.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Forge<span className="gradient-text animate-hue">Sentry</span>
        </m.h1>
        <m.p variants={fadeUp} className="mt-4 text-lg text-slate-700">
          Secure web & automation, engineered for outcomes.
        </m.p>

        <m.div variants={stagger(0.12)} className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <m.a
            variants={fadeUp}
            {...scaleTap}
            href="#contact"
            className="btn rounded-xl shadow-card3d"
            style={{
              backgroundColor: 'var(--cn-cyan, #22D3EE)',
              borderColor: 'var(--cn-cyan, #22D3EE)',
              color: '#0b0f19',
            }}
          >
            Get a Free Consult
          </m.a>
          <m.a
            variants={fadeUp}
            {...scaleTap}
            href="https://wa.me/923360150999"
            className="btn rounded-xl shadow-card3d text-white hover:brightness-110"
            style={{ backgroundColor: '#22c55e', borderColor: '#22c55e' }}
          >
            WhatsApp Consult
          </m.a>
          <m.a
            variants={fadeUp}
            {...scaleTap}
            href="#work"
            className="btn rounded-xl ring-1"
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              color: 'rgb(30,41,59)',
              borderColor: 'rgba(226,232,240,0.8)',
            }}
          >
            See Our Work
          </m.a>
        </m.div>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          {['15+ Projects', '10+ Certifications', 'BS Cybersecurity — 2027'].map((t) => (
            <span
              key={t}
              className="animate-bounceBadge rounded-full px-4 py-2 text-sm bg-white/70 ring-1 ring-slate-200"
            >
              {t}
            </span>
          ))}
        </div>
      </m.div>
    </section>
  );
}
