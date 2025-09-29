import { motion } from 'framer-motion';
import loaderImg from '../assets/loader.png';

export default function Loader({ durationSec = 5.5, title = 'Welcome to ForgeSentry' }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] bg-black"
      aria-label="Loading screen"
    >
      {/* Background image */}
      <img
        src={loaderImg}
        alt="Loading"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Center content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
          className="text-base sm:text-lg text-white/80 mb-8"
        >
          Secure web & automation, engineered for outcomes.
        </motion.p>

        {/* Progress bar */}
        <div className="h-1.5 w-64 bg-white/25 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: durationSec, ease: 'easeInOut' }}
            className="h-full"
            style={{ backgroundColor: 'var(--cn-cyan)' }}
          />
        </div>

        <div className="mt-4 text-xs text-white/70 tracking-wide">
          Loading experience…
        </div>
      </div>
    </motion.div>
  );
}
