import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ParallaxLayer = ({ children, speed = 0.5, className = '' }) => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      if (prefersReduced) return;

      controls.set({
        y: currentScrollY * speed,
        transition: { type: 'spring', stiffness: 400, damping: 40 },
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, speed]);

  return (
    <motion.div className={className} animate={controls}>
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
