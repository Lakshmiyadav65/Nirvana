'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Leaf, ShieldCheck, Building2 } from 'lucide-react';

const HERO_IMG =
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80';

/** A small stylised bird silhouette that gently floats. */
const Bird: React.FC<{ className?: string; delay?: number }> = ({ className, delay = 0 }) => (
  <motion.svg
    viewBox="0 0 64 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    <path d="M2 14 C 12 3, 21 3, 31 13 C 41 3, 50 3, 60 14" />
  </motion.svg>
);

export default function HeroScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // ── Scroll-driven transforms ────────────────────────────────
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const birdsX = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const houseRotateX = useTransform(scrollYProgress, [0, 1], [10, -3]);
  const houseY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const houseScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const card1Y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const foliageY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // ── Pointer-driven 3D tilt ──────────────────────────────────
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative overflow-hidden pt-28 md:pt-36 pb-24"
    >
      {/* Sky gradient */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 -z-20 bg-gradient-to-b from-[#edefe3] via-cream to-cream"
      />
      {/* Soft clouds */}
      <motion.div style={{ y: skyY }} className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[6%] w-72 h-40 rounded-full bg-white/55 blur-3xl" />
        <div className="absolute top-[20%] right-[10%] w-[26rem] h-48 rounded-full bg-white/45 blur-3xl" />
        <div className="absolute top-[44%] left-[28%] w-[30rem] h-56 rounded-full bg-gold/5 blur-3xl" />
      </motion.div>
      {/* Birds */}
      <motion.div style={{ x: birdsX }} className="absolute inset-x-0 top-[15%] z-0 pointer-events-none text-charcoal/40">
        <Bird className="absolute left-[15%] w-12 h-5" delay={0} />
        <Bird className="absolute left-[26%] top-7 w-8 h-4 text-charcoal/25" delay={1.4} />
        <Bird className="absolute right-[20%] top-2 w-10 h-4 text-charcoal/30" delay={0.6} />
      </motion.div>

      {/* Headline */}
      <motion.div
        style={{ y: headlineY, opacity: headlineOpacity }}
        className="relative z-20 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display mb-6"
        >
          <Leaf size={14} /> Crafting Architectural Masterpieces
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-charcoal mb-6"
        >
          Nirvana Builders <span className="italic text-gold">&amp; Developers</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-charcoal/65 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-9"
        >
          Building Excellence with Trust, Quality &amp; Modern Living. Discover our luxury apartments, independent villas, and commercial properties.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 bg-gold text-cream font-display text-[13px] tracking-wide px-8 py-4 rounded-full shadow-luxury hover:bg-gold-dark transition-colors duration-300"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-charcoal font-display text-[13px] tracking-wide hover:text-gold transition-colors"
          >
            Contact Us
            <span className="w-8 h-8 rounded-full border border-charcoal/15 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-cream transition-all">
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* 3D house scene */}
      <div className="relative z-10 mt-14 md:mt-20 flex justify-center px-6 [perspective:1800px]">
        <motion.div
          style={{ rotateX: houseRotateX, y: houseY, scale: houseScale, transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-5xl"
        >
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-luxury-lg aspect-[16/10] border border-cream/40">
              <img src={HERO_IMG} alt="Luxury Nirvana residence" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/30 via-transparent to-transparent" />
            </div>

            {/* Floating card — top left */}
            <motion.div
              style={{ y: card1Y, z: 90 }}
              className="absolute -left-3 sm:-left-9 top-10 sm:top-16 bg-cream/90 backdrop-blur-md rounded-2xl border border-charcoal/5 shadow-luxury-lg px-5 py-4 flex items-center gap-3"
            >
              <span className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold shrink-0">
                <ShieldCheck size={18} />
              </span>
              <div className="leading-tight">
                <span className="font-serif text-xl text-charcoal block">10+ Yrs</span>
                <span className="font-display text-[10px] uppercase tracking-[0.14em] text-charcoal/55">Trust &amp; Reliability</span>
              </div>
            </motion.div>

            {/* Floating card — bottom right */}
            <motion.div
              style={{ y: card2Y, z: 70 }}
              className="absolute -right-3 sm:-right-9 bottom-10 sm:bottom-14 bg-charcoal text-cream rounded-2xl shadow-luxury-lg px-5 py-4 flex items-center gap-3"
            >
              <span className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold-light shrink-0">
                <Building2 size={18} />
              </span>
              <div className="leading-tight">
                <span className="font-serif text-xl block">16+ Projects</span>
                <span className="font-display text-[10px] uppercase tracking-[0.14em] text-cream/60">Delivered in Hyderabad</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Foreground depth blobs */}
      <motion.div style={{ y: foliageY }} className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-gold/15 blur-3xl pointer-events-none z-0" />
      <motion.div style={{ y: foliageY }} className="absolute -bottom-16 -right-12 w-80 h-80 rounded-full bg-charcoal/10 blur-3xl pointer-events-none z-0" />

      {/* Scroll cue */}
      <div className="relative z-20 mt-16 flex flex-col items-center gap-2 text-charcoal/40">
        <span className="text-[10px] uppercase tracking-[0.22em] font-display">Scroll to explore</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-1.5 h-6 rounded-full bg-gold"
        />
      </div>
    </section>
  );
}
