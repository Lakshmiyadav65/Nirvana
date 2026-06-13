'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gold reading-progress bar pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gold origin-left z-[60] pointer-events-none"
    />
  );
}
