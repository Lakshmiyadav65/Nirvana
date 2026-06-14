'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// Landscape clip first (best fit for a full-bleed background); the two portrait
// clips follow. Poster shows instantly while the first clip loads.
const VIDEOS = ['/videos/hero-3.mp4', '/videos/hero-1.mp4', '/videos/hero-2.mp4'];
const POSTER = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80';
const ROTATE_MS = 8000;

export default function HeroScene() {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % VIDEOS.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  // Play only the active clip (load on demand); pause the rest for performance.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal-dark">
      {/* Background videos */}
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; }}
          loop
          muted
          playsInline
          poster={POSTER}
          preload={i === 0 ? 'auto' : 'none'}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

      {/* Legibility overlays (stronger on the left, behind the text) */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-pure/90 via-charcoal-pure/55 to-charcoal-pure/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/80 via-transparent to-charcoal-pure/35" />

      {/* Content */}
      <div className="relative min-h-[100svh] max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center pt-28 pb-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-7"
          >
            <span className="w-12 h-px bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold font-display">
              Nirvana Builders &amp; Developers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-6xl sm:text-7xl lg:text-[6.5rem] text-cream leading-[0.92] tracking-tight mb-5"
          >
            Elevating<br />Spaces
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="text-sm sm:text-base uppercase tracking-[0.28em] text-gold font-display font-medium mb-6"
          >
            Into Living Masterpieces
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.74 }}
            className="text-cream/75 font-light text-base md:text-lg max-w-lg leading-relaxed mb-9"
          >
            Crafting architectural sanctuaries that fuse quiet luxury with structural brilliance — luxury apartments, independent villas &amp; commercial landmarks across Hyderabad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.86 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-gold text-charcoal-dark font-display text-[13px] tracking-wide px-8 py-4 rounded-full shadow-luxury hover:bg-gold-light transition-colors duration-300"
            >
              Begin Your Journey
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border border-cream/30 text-cream font-display text-[13px] tracking-wide px-8 py-4 rounded-full hover:bg-cream hover:text-charcoal-dark transition-colors duration-300"
            >
              View Masterpieces
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Video indicators */}
      <div className="absolute left-6 md:left-10 bottom-9 z-10 flex gap-2">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show clip ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-9 bg-gold' : 'w-3.5 bg-cream/30 hover:bg-cream/50'}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-6 md:right-10 bottom-9 z-10 hidden sm:flex flex-col items-center gap-3 text-cream/50">
        <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl] rotate-180">Scroll</span>
        <motion.span
          animate={{ scaleY: [1, 1.9, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-px h-8 bg-gold origin-top"
        />
      </div>
    </section>
  );
}
