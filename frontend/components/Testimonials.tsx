'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ArrowUpRight } from 'lucide-react';
import { testimonialsData } from '@/data/testimonials';

const ROTATE_MS = 6000;

const initials = (name: string) => {
  const words = name.replace(/[^A-Za-z. ]/g, '').split(/\s+/).filter(Boolean);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? words[words.length - 1][0] : (words[0]?.[1] ?? '');
  return (first + last).toUpperCase();
};

export const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonialsData.length;
  const t = testimonialsData[active];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <section
      className="py-20 md:py-32 bg-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display block mb-4">Client Endorsements</span>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.1]">Testimonials</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5 text-gold">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="font-display text-sm text-charcoal/60">5.0 &middot; Trusted by homeowners</span>
          </div>
        </div>

        {/* Showcase */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured quote */}
          <div className="lg:col-span-8 relative rounded-[2rem] bg-charcoal text-cream overflow-hidden p-8 sm:p-12 md:p-14 flex">
            <div className="absolute -top-8 right-2 text-gold/10 pointer-events-none">
              <Quote size={170} strokeWidth={1} />
            </div>
            <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative z-10 flex flex-col w-full"
              >
                <div className="flex gap-1 text-gold-light mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="font-serif text-xl sm:text-2xl md:text-[1.9rem] leading-snug text-cream/95 mb-8 flex-1">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-cream/10">
                  <span className="w-12 h-12 rounded-full bg-gold/15 ring-1 ring-gold/40 flex items-center justify-center font-display font-semibold text-gold-light text-sm shrink-0">
                    {initials(t.name)}
                  </span>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-cream">{t.name}</h4>
                    <span className="text-[12px] text-gold-light">{t.role} &middot; <span className="text-cream/55">{t.project}</span></span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {testimonialsData.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(i)}
                  className={`group text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 flex items-center gap-4 ${
                    isActive
                      ? 'bg-sand border-gold/40 shadow-luxury'
                      : 'bg-cream border-charcoal/8 hover:border-gold/30 hover:bg-sand/50'
                  }`}
                >
                  <span className={`w-11 h-11 rounded-full flex items-center justify-center font-display font-semibold text-sm shrink-0 transition-colors duration-300 ${
                    isActive ? 'bg-gold text-cream' : 'bg-gold/12 text-gold'
                  }`}>
                    {initials(item.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display font-semibold text-[13px] text-charcoal truncate">{item.name}</h4>
                    <span className="text-[11px] text-charcoal/50 truncate block">{item.project}</span>
                  </div>
                  <ArrowUpRight size={16} className={`shrink-0 transition-opacity duration-300 ${isActive ? 'text-gold opacity-100' : 'text-charcoal/30 opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}

            {/* Auto-rotate progress */}
            <div className="mt-2 h-1 rounded-full bg-charcoal/10 overflow-hidden">
              <motion.div
                key={active}
                className="h-full bg-gold rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
