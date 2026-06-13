'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ArrowRight, ArrowUpRight, Star, MapPin, Minimize2, Building2, Home as HomeIcon, Award, ShieldCheck, Leaf } from 'lucide-react';
import Button from '@/components/Button';
import Counter from '@/components/Counter';
import { projectsData } from '@/data/projects';
import { testimonialsData } from '@/data/testimonials';
import { servicesData } from '@/data/services';
import HeroScene from '@/components/HeroScene';

import 'swiper/css';
import 'swiper/css/pagination';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

export const Home: React.FC = () => {
  const featuredProjects = projectsData.filter(
    (p) => p.id === 'nandanavam' || p.id === 'imr-tulasi-vanam' || p.id === 'manohara' || p.id === 'urban-elite'
  );

  const stats = [
    { value: 16, suffix: '+', label: 'Projects Completed' },
    { value: 2, suffix: '', label: 'Ongoing Projects' },
    { value: 300000, suffix: '+ Sft', label: 'Built-up Area' },
    { value: 38, suffix: '+', label: 'Independent Houses' },
    { value: 10, suffix: '+ Yrs', label: 'Construction Excellence' },
  ];

  const bentoSpan = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];

  return (
    <div className="relative overflow-x-hidden bg-cream">

      {/* ───────────────── Hero (3D scroll scene) ───────────────── */}
      <HeroScene />

      {/* ───────────────── Stats ───────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <motion.div
          {...fadeUp}
          className="rounded-[2rem] bg-sand/70 border border-charcoal/5 px-8 sm:px-12 py-12 grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6 md:divide-x md:divide-charcoal/10"
        >
          {stats.map((s, idx) => (
            <div key={idx} className="md:px-4 first:md:pl-0">
              <Counter value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* ───────────────── About preview ───────────────── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-14 items-center">
          <motion.div {...fadeUp} className="lg:col-span-6 relative">
            <div className="rounded-[2.5rem] overflow-hidden aspect-[5/4] shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Residence"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -z-10 -top-6 -left-6 w-2/3 h-2/3 rounded-[2.5rem] bg-gold/10 hidden sm:block" />
          </motion.div>

          <motion.div {...fadeUp} className="lg:col-span-6 flex flex-col space-y-6">
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display">About Nirvana</span>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.1]">
              Responsible Building, Sustainable Practices
            </h2>
            <p className="text-charcoal/65 leading-relaxed font-light text-lg">
              “Nirvana Builders &amp; Developers has a history of responsible business conduct and strongly believes that true business success is measured not only by profits but also by sustainable and ethical practices.”
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-full bg-gold/12 flex items-center justify-center text-gold shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-charcoal mb-1">Our Mission</h4>
                  <p className="text-[13px] text-charcoal/55 leading-relaxed font-light">
                    To provide active, value-added services to customers without compromising quality.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-full bg-gold/12 flex items-center justify-center text-gold shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-charcoal mb-1">Our Vision</h4>
                  <p className="text-[13px] text-charcoal/55 leading-relaxed font-light">
                    To become a benchmark in building residential and commercial spaces.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <Button to="/about" variant="outline">Read Company Story</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── Featured projects (bento) ───────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display block mb-4">Portfolio Highlights</span>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.1]">Featured Developments</h2>
            </div>
            <Link href="/projects" className="group inline-flex items-center gap-2 text-charcoal font-display text-sm hover:text-gold transition-colors">
              View All Projects
              <span className="w-9 h-9 rounded-full border border-charcoal/15 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-cream transition-all">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                className={bentoSpan[i] ?? 'lg:col-span-6'}
              >
                <Link href={`/projects/${project.id}`} className="group relative block overflow-hidden rounded-[2rem] h-[360px] md:h-[420px]">
                  <img
                    src={project.mainImage}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/90 via-charcoal-pure/25 to-transparent" />
                  <div className="absolute top-5 right-5">
                    <span className={`text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full font-semibold backdrop-blur-md ${
                      project.status === 'ongoing' ? 'bg-gold text-cream' : 'bg-cream/15 text-cream border border-cream/25'
                    }`}>
                      {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold-light font-semibold font-display block mb-2">
                      {project.type}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-cream mb-3 leading-tight">{project.name}</h3>
                    <div className="flex items-center gap-5 text-[12px] text-cream/70 font-light">
                      <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gold-light" />{project.location.split(',')[0]}</span>
                      <span className="flex items-center gap-1.5"><Minimize2 size={13} className="text-gold-light" />{project.area}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Services ───────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display block mb-4">Our Offerings</span>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.1] mb-5">Pioneering Real Estate Solutions</h2>
            <p className="text-charcoal/60 font-light text-lg">
              From luxurious apartments and commercial buildings to precision structural planning, we build structures that endure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesData.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.id}
                {...fadeUp}
                transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
                className="group bg-sand/60 rounded-[1.75rem] p-9 border border-charcoal/5 hover:bg-charcoal hover:border-charcoal transition-colors duration-500 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/12 group-hover:bg-gold/20 flex items-center justify-center text-gold mb-7 transition-colors duration-500">
                  {index === 0 && <Building2 size={26} strokeWidth={1.5} />}
                  {index === 1 && <HomeIcon size={26} strokeWidth={1.5} />}
                  {index === 2 && <Award size={26} strokeWidth={1.5} />}
                </div>
                <h3 className="font-serif text-2xl text-charcoal group-hover:text-cream transition-colors duration-500 mb-3">
                  {service.title}
                </h3>
                <p className="text-charcoal/55 group-hover:text-cream/65 text-sm leading-relaxed font-light mb-7 transition-colors duration-500">
                  {service.description}
                </p>
                <Link href="/services" className="mt-auto inline-flex items-center gap-2 text-[13px] font-display text-gold group-hover:text-gold-light transition-colors">
                  <span>Learn More</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Button to="/services" variant="outline">View All Services</Button>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── Testimonials ───────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative rounded-[2.5rem] bg-charcoal text-cream overflow-hidden px-6 sm:px-12 py-16 md:py-20">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
            <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center mb-12">
              <span className="text-[11px] uppercase tracking-[0.28em] text-gold-light font-semibold font-display block mb-4">Client Endorsements</span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight">Testimonials</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                className="pb-14"
              >
                {testimonialsData.map((t) => (
                  <SwiperSlide key={t.id}>
                    <div className="text-center flex flex-col items-center px-2">
                      <div className="flex gap-1 text-gold-light mb-7">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-cream/95 leading-relaxed mb-9 max-w-2xl">
                        “{t.comment}”
                      </p>
                      <div>
                        <h4 className="font-display font-semibold text-sm tracking-wide text-cream mb-1">{t.name}</h4>
                        <span className="text-[12px] text-gold-light uppercase tracking-wider">
                          {t.role} &mdash; <span className="text-cream/50">{t.project}</span>
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── CTA ───────────────── */}
      <section className="pb-24 md:pb-32 pt-4">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            {...fadeUp}
            className="relative rounded-[2.5rem] overflow-hidden bg-charcoal-dark text-cream px-8 sm:px-16 py-16 md:py-24 text-center flex flex-col items-center"
          >
            <div className="absolute inset-0 opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
            <div className="relative flex flex-col items-center">
              <span className="text-[11px] uppercase tracking-[0.28em] text-gold-light font-semibold font-display mb-5">Start Your Journey</span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.08] mb-6 max-w-3xl">
                Constructing Your Dream Home With Trust &amp; Integrity
              </h2>
              <p className="text-cream/65 font-light text-base sm:text-lg max-w-xl mb-10">
                Consult our expert architecture and development team to outline blueprints, material budgets, and construction timelines for your properties.
              </p>
              <Button to="/contact" variant="light" icon={<ArrowRight size={16} />}>
                Get Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
export default Home;
