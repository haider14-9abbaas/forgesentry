// src/utils/motion.js
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (gap = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: 0.1 } },
});

export const scaleTap = { whileTap: { scale: 0.96 }, whileHover: { scale: 1.02 } };
