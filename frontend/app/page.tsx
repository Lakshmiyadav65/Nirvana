'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ArrowRight, Star, Building2, Home as HomeIcon, Award, ShieldCheck } from 'lucide-react';
import Button from '@/components/Button';
import Counter from '@/components/Counter';
import { projectsData } from '@/data/projects';
import { testimonialsData } from '@/data/testimonials';
import { servicesData } from '@/data/services';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const Home: React.FC = () => {
  const featuredProjects = projectsData.filter(
    (p) => p.id === 'nandanavam' || p.id === 'imr-tulasi-vanam' || p.id === 'manohara' || p.id === 'urban-elite'
  );

  const stats = [
    { value: 16, suffix: "+", label: "Projects Completed" },
    { value: 2, suffix: "", label: "Ongoing Projects" },
    { value: 300000, suffix: "+ Sft", label: "Built-up Area" },
    { value: 38, suffix: "+", label: "Independent Houses" },
    { value: 10, suffix: "+ Yrs", label: "Construction Excellence" }
  ];

  const heroImages = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
  ];

  return (
    <div className="relative overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative h-screen w-full bg-charcoal-dark flex items-center overflow-hidden">
        {/* Background Swiper Slideshow */}
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            effect="fade"
            className="h-full w-full"
          >
            {heroImages.map((img, i) => (
              <SwiperSlide key={i}>
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-[10000ms] scale-105"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 0.4), rgba(18, 18, 18, 0.85)), url(${img})`
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Floating background lines */}
        <div className="absolute inset-0 pointer-events-none z-10 flex justify-between px-6 md:px-12 opacity-15">
          <div className="w-[1px] h-full bg-gold/30"></div>
          <div className="w-[1px] h-full bg-gold/30 hidden md:block"></div>
          <div className="w-[1px] h-full bg-gold/30 hidden md:block"></div>
          <div className="w-[1px] h-full bg-gold/30"></div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-20 pt-20">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4"
            >
              Crafting Architectural Masterpieces
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6"
            >
              Nirvana Builders <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark">
                &amp; Developers
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-300 font-sans text-base sm:text-lg md:text-xl font-light mb-10 leading-relaxed max-w-xl"
            >
              Building Excellence with Trust, Quality &amp; Modern Living. Discover our luxury apartments, independent villas, and commercial properties.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6"
            >
              <Button to="/projects" variant="primary" icon={<ArrowRight size={14} />}>
                View Projects
              </Button>
              <Button to="/contact" variant="glass">
                Contact Us
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-6 bg-gold rounded-full"
          />
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-charcoal py-16 md:py-24 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 items-center">
            {stats.map((s, idx) => (
              <Counter key={idx} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Visual block */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative z-10 border border-gold/20 p-2 bg-cream">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Residence"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              {/* Back gold highlight box */}
              <div className="absolute -top-6 -left-6 w-1/2 h-1/2 bg-gold/10 z-0 hidden sm:block"></div>
              {/* Floating micro-badge */}
              <div className="absolute -bottom-8 -right-4 bg-charcoal text-white p-6 shadow-luxury border border-gold/15 hidden md:block">
                <span className="font-display text-3xl font-bold text-gold block">10+ Yrs</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold block mt-1">Trust &amp; Reliability</span>
              </div>
            </motion.div>

            {/* Description Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 flex flex-col space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">About Nirvana</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-dark tracking-tight leading-tight">
                Responsible Building, Sustainable Practices
              </h2>
              <p className="text-gray-600 leading-relaxed font-light text-base md:text-lg">
                “Nirvana Builders &amp; Developers has a history of responsible business conduct and strongly believes that true business success is measured not only by profits but also by sustainable and ethical practices.”
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-charcoal-dark uppercase tracking-wider mb-1">Our Mission</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      To provide active, value-added services to customers without compromising quality.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-charcoal-dark uppercase tracking-wider mb-1">Our Vision</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      To become a benchmark in building residential and commercial spaces.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button to="/about" variant="outline">
                  Read Company Story
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Projects Slider */}
      <section className="py-20 md:py-32 bg-charcoal-dark border-y border-gold/10 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-3">Portfolio Highlights</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Featured Developments
              </h2>
            </div>
            <Button to="/projects" variant="outline">
              View All Projects
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 6000 }}
              pagination={{ clickable: true }}
              navigation
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="pb-16"
            >
              {featuredProjects.map((project) => (
                <SwiperSlide key={project.id}>
                  <Link href={`/projects/${project.id}`} className="group block h-full">
                    <div className="bg-charcoal-light border border-gold/10 hover:border-gold/30 transition-all duration-500 overflow-hidden relative shadow-luxury">
                      {/* Image container */}
                      <div className="overflow-hidden h-64 relative">
                        <img
                          src={project.mainImage}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay status tag */}
                        <div className="absolute top-4 right-4 bg-charcoal-dark/80 backdrop-blur-md border border-gold/20 text-gold text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                          {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-gold font-medium mb-1 block">
                            {project.type}
                          </span>
                          <h3 className="font-display text-lg font-bold text-white group-hover:text-gold transition-colors duration-300 mb-2">
                            {project.name}
                          </h3>
                          <p className="text-gray-400 text-xs line-clamp-2 mb-4 font-light">
                            {project.description}
                          </p>
                        </div>

                        <div className="border-t border-gold/10 pt-4 flex justify-between text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                          <span>{project.location.split(',')[0]}</span>
                          <span>{project.area}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="max-w-3xl mx-auto text-center mb-20 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">Our Offerings</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-dark tracking-tight leading-tight mb-4">
              Pioneering Real Estate Solutions
            </h2>
            <p className="text-gray-600 font-light max-w-xl text-sm sm:text-base">
              From luxurious apartments and commercial buildings to precision structural planning, we build structures that endure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.slice(0, 3).map((service, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={service.id}
                className="group border border-gold/15 p-8 hover:bg-charcoal hover:border-charcoal transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                    {index === 0 && <Building2 size={36} strokeWidth={1} />}
                    {index === 1 && <HomeIcon size={36} strokeWidth={1} />}
                    {index === 2 && <Award size={36} strokeWidth={1} />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal-dark group-hover:text-white transition-colors duration-300 mb-4 uppercase tracking-wider">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-300 text-xs leading-relaxed font-light mb-6">
                    {service.description}
                  </p>
                </div>

                <Link href="/services" className="text-xs text-gold font-bold uppercase tracking-wider flex items-center gap-2 mt-auto group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn More</span>
                  <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button to="/services" variant="outline">
              View All Services
            </Button>
          </div>

        </div>
      </section>

      {/* Testimonials Glass Slider */}
      <section className="py-20 md:py-32 bg-charcoal bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-charcoal-light to-charcoal-dark border-t border-gold/10 text-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">Client Endorsements</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Testimonials
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 5000 }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {testimonialsData.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="glass-panel rounded-xl p-8 sm:p-12 text-center border border-gold/10 shadow-luxury flex flex-col items-center">
                    <div className="flex gap-1 text-gold mb-6">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 max-w-2xl font-light">
                      “{t.comment}”
                    </p>
                    <div>
                      <h4 className="font-display font-bold text-sm tracking-widest uppercase text-white mb-1">
                        {t.name}
                      </h4>
                      <span className="text-xs text-gold uppercase tracking-wider">
                        {t.role} &mdash; <span className="text-gray-400">{t.project}</span>
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="relative py-24 bg-cream overflow-hidden flex items-center justify-center">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 -skew-x-12 transform origin-top-right"></div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 w-full text-center relative z-10 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-4">Start Your Journey</span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-charcoal-dark tracking-tight leading-tight mb-6">
            Constructing Your Dream Home <br />With Trust &amp; Integrity
          </h2>
          <p className="text-gray-600 font-light text-sm sm:text-base max-w-xl mb-10">
            Consult our expert architecture and development team to outline blueprints, material budgets, and construction timelines for your properties.
          </p>
          <Button to="/contact" variant="primary" icon={<ArrowRight size={14} />}>
            Get Free Consultation
          </Button>
        </div>
      </section>

    </div>
  );
};
export default Home;
