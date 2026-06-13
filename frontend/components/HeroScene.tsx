'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Home as HomeIcon, Search } from 'lucide-react';

const HERO_IMG =
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=90';

export default function HeroScene() {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Subtle scroll motion (parallax + zoom), nothing jarring.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.16]);
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const bottomY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const [location, setLocation] = useState('');
  const [ptype, setPtype] = useState('');

  const browse = () => router.push('/projects');

  const fieldWrap = 'flex items-center gap-3 px-4 py-2 flex-1 min-w-0';
  const labelCls = 'text-[10px] uppercase tracking-[0.14em] text-charcoal/45 font-semibold font-display';
  const selectCls = 'bg-transparent text-sm text-charcoal font-medium focus:outline-none cursor-pointer w-full';

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[660px] w-full overflow-hidden bg-charcoal-dark">
      {/* Background image with Ken-Burns + scroll parallax */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
        <motion.img
          src={HERO_IMG}
          alt="Luxury Nirvana residences"
          className="w-full h-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-pure/55 via-charcoal-pure/5 to-charcoal-pure/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/55 to-transparent" />

      {/* Content */}
      <div className="relative h-full max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col">
        {/* Tagline — top right */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="pt-28 md:pt-32 flex justify-end"
        >
          <p className="text-right text-cream/85 text-[13px] sm:text-sm font-light leading-relaxed max-w-[230px]">
            Building Excellence with Trust,<br className="hidden sm:block" /> Quality &amp; Modern Living
          </p>
        </motion.div>

        {/* Giant word */}
        <motion.div style={{ y: wordY }} className="flex-1 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 64, scale: 1.06 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-serif font-bold text-cream text-center leading-[0.85] tracking-tight whitespace-nowrap text-[clamp(3.5rem,18vw,15rem)] drop-shadow-[0_12px_45px_rgba(11,16,8,0.5)]"
          >
            Nirvana
          </motion.h1>
        </motion.div>

        {/* Bottom — sub-headline + search */}
        <motion.div style={{ y: bottomY }} className="pb-8 md:pb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-center font-serif text-2xl sm:text-3xl md:text-[2.4rem] leading-snug text-cream max-w-3xl mx-auto mb-8"
          >
            Discover our luxury apartments, independent villas &amp; commercial properties
          </motion.h2>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-cream/95 backdrop-blur-md rounded-[1.5rem] md:rounded-full shadow-luxury-lg p-3 md:p-2 md:pl-3 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-1 max-w-4xl mx-auto"
          >
            <div className={fieldWrap}>
              <MapPin size={17} className="text-gold shrink-0" />
              <div className="flex flex-col min-w-0 flex-1">
                <span className={labelCls}>Location</span>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectCls}>
                  <option value="">Select Your City</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="khammam">Khammam</option>
                </select>
              </div>
            </div>

            <div className="hidden md:block w-px h-9 bg-charcoal/10" />

            <div className={fieldWrap}>
              <HomeIcon size={17} className="text-gold shrink-0" />
              <div className="flex flex-col min-w-0 flex-1">
                <span className={labelCls}>Property Type</span>
                <select value={ptype} onChange={(e) => setPtype(e.target.value)} className={selectCls}>
                  <option value="">Choose Property Type</option>
                  <option value="residential">Residential Apartments</option>
                  <option value="independent">Independent Houses</option>
                  <option value="commercial">Commercial Spaces</option>
                </select>
              </div>
            </div>

            <button
              onClick={browse}
              className="group inline-flex items-center justify-center gap-2 bg-charcoal text-cream font-display text-[13px] tracking-wide px-7 py-4 rounded-full hover:bg-gold transition-colors duration-300 shrink-0"
            >
              <Search size={16} />
              Browse Properties
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
