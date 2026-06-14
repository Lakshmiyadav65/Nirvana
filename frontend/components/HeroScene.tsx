'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// Single landscape clip as the full-bleed background. Poster shows instantly
// while it loads.
const HERO_VIDEO = '/videos/hero-3.mp4';
const POSTER = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80';

export default function HeroScene() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal-dark">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={POSTER}
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Legibility overlays — flat tint + centre vignette + top/bottom fade,
          so the centred text stays readable on bright video frames too */}
      <div className="absolute inset-0 bg-charcoal-pure/45" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 78% 68% at 50% 46%, rgba(0,5,2,0.55), transparent 72%)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/75 via-transparent to-charcoal-pure/45" />

      {/* Content — centered */}
      <div className="relative min-h-[100svh] max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center justify-center text-center pt-28 pb-24">
        <div className="max-w-3xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-7"
          >
            <span className="w-10 h-px bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold font-display">
              Nirvana Builders &amp; Developers
            </span>
            <span className="w-10 h-px bg-gold/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Bodoni Moda', serif" }}
            className="text-6xl sm:text-7xl lg:text-[6.5rem] font-semibold text-cream leading-[0.95] tracking-tight mb-5"
          >
            Building<br />Landmarks
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="text-sm sm:text-base uppercase tracking-[0.28em] text-gold font-display font-medium mb-6"
          >
            From the Ground Up
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.74 }}
            className="text-cream/75 font-light text-base md:text-lg max-w-xl leading-relaxed mb-9"
          >
            We turn land into enduring landmarks — engineering and constructing luxury apartments, independent villas &amp; commercial spaces from the ground up across Hyderabad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.86 }}
            className="flex flex-wrap items-center justify-center gap-4"
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
    </section>
  );
}
