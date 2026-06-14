'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface Film {
  id: string; // YouTube video id
  tag: string;
  title: string;
}

// Vertical project films (YouTube Shorts) used as social proof / trust.
const FILMS: Film[] = [
  { id: 'THej1IxiU1U', tag: 'Project Film', title: 'From the Ground Up' },
  { id: 'FKS1nUyZhkI', tag: 'Project Film', title: 'Built to Last' },
];

const fadeUp = {
  initial: { opacity: 0, y: 42, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const FilmCard: React.FC<{ film: Film; index: number }> = ({ film, index }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.1 }}
      className="w-full max-w-[330px]"
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] border border-gold/15 bg-charcoal shadow-luxury">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
            title={film.title}
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play project film: ${film.title}`}
            className="group absolute inset-0 h-full w-full"
          >
            <img
              src={`https://i.ytimg.com/vi/${film.id}/maxresdefault.jpg`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${film.id}/hqdefault.jpg`;
              }}
              alt={film.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/90 via-charcoal-pure/15 to-charcoal-pure/35" />

            {/* Play button */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/90 text-charcoal-dark shadow-luxury ring-1 ring-cream/20 transition-transform duration-300 group-hover:scale-110">
                <Play size={24} className="ml-0.5 fill-current" />
              </span>
            </span>

            {/* Caption */}
            <span className="absolute inset-x-0 bottom-0 p-5 text-left">
              <span className="mb-1 block font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                {film.tag}
              </span>
              <span className="block font-serif text-lg text-cream">{film.title}</span>
            </span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const ProjectShowcase: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-charcoal-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div {...fadeUp} className="mb-14 flex flex-col items-center text-center">
          <span className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Proven Track Record
          </span>
          <h2 className="mb-5 font-serif text-4xl md:text-5xl text-cream leading-[1.1]">
            See the Work for Yourself
          </h2>
          <p className="max-w-xl font-light text-lg text-cream/60">
            A look at the spaces we&apos;ve built across Hyderabad — real projects, real craftsmanship, captured straight from site.
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-start md:gap-12">
          {FILMS.map((film, i) => (
            <FilmCard key={film.id} film={film} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
