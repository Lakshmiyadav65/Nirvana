'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ShieldCheck, Heart, CheckCircle2, Clock, Landmark, Users } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 42, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export const About: React.FC = () => {
  const values = [
    { name: "Punctuality", icon: <Clock size={20} />, desc: "Adhering to strict project schedules and ensuring on-time delivery of keys." },
    { name: "Commitment", icon: <Heart size={20} />, desc: "Unwavering commitment to design details, material parameters, and client requests." },
    { name: "Honesty", icon: <ShieldCheck size={20} />, desc: "Transparent legal operations, fair pricing, and clear joint-venture agreements." },
    { name: "Trust", icon: <Landmark size={20} />, desc: "Earning trust through decades of build durability and solid post-purchase assistance." },
    { name: "Courage", icon: <Compass size={20} />, desc: "Taking on complex structural designs and pioneering green, sustainable practices." },
    { name: "Respect", icon: <Users size={20} />, desc: "Treating clients, architectural partners, and our concrete labor force with absolute dignity." }
  ];

  const milestones = [
    { year: "2019", title: "Establishment & First Deliveries", desc: "Successfully delivered Nirvana’s Ayyappa Delight (housing our corporate head office), Green Petals, and Karanam Krest Residency in Hyderabad." },
    { year: "2023", title: "Expansion & Khammam Entry", desc: "Constructed Sri Sai Santhoshi Duplex and Royal Edge in KPHB. Expanded operations into Khammam with Nirvana’s Manohara apartments (14,375 Sft)." },
    { year: "2024", title: "Gated Communities & Mega Sft", desc: "Launched IMR Tulasi Vanam in Patancheru, a premium gated community comprising 38 luxury independent villas (60,000 Sft), alongside Venkata Lakshmi Nilayam." },
    { year: "2025", title: "Commercial Spaces & Modern Enclaves", desc: "Completed Sirisurya Nivas and Dwarakamai (16,200 Sft). Launched Nirvana’s Urban Elite, our flagship luxury commercial space." },
    { year: "2026", title: "Megastructures & Beyond", desc: "Initiated our largest undertaking, Nirvana’s Nandanavam, spreading across a massive 125,000 Sft with premium smart apartment integrations." }
  ];

  const qualityPoints = [
    "Strict structural audits and compliance with earthquake Zone-II parameters.",
    "Utilization of M25 grade concrete and high-tensile certified steel.",
    "Branded internal components: Astral piping, Jaguar plumbing fixtures, internal premium vitrified tiles.",
    "Eco-conscious installations: Rainwater harvesting ducts, solar water heater provisions, organic waste converters.",
    "Detailed 3-stage QA checks on raw concrete mixing and plaster finish."
  ];

  return (
    <div className="bg-charcoal-dark">

      {/* Page Header */}
      <section className="pt-28 md:pt-44 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display mb-6">
            The Nirvana Heritage
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-[1.05]">About Us</h1>
        </div>
      </section>

      {/* Intro Story */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-14 items-center">
          <motion.div {...fadeUp} className="lg:col-span-7 flex flex-col space-y-6">
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display">Who We Are</span>
            <h2 className="font-serif text-4xl md:text-5xl text-cream leading-[1.1]">
              History of Responsible Conduct &amp; Construction Quality
            </h2>
            <p className="text-cream/65 leading-relaxed font-light text-lg">
              Nirvana Builders &amp; Developers has a history of responsible business conduct and strongly believes that true business success is measured not only by profits but also by sustainable and ethical practices.
            </p>
            <p className="text-cream/60 leading-relaxed font-light">
              Since our inception, our focus has remained on designing spaces that inspire comfort. By utilizing certified engineering standards, complying strictly with regulatory laws, and committing to eco-friendly development, we deliver residential blocks and commercial complexes that maintain their longevity and value for decades.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
              <div className="border-l-2 border-gold/40 pl-5">
                <span className="text-gold uppercase tracking-[0.2em] text-[11px] font-semibold font-display block mb-2">Our Mission</span>
                <p className="text-[13px] text-cream/55 leading-relaxed font-light">
                  “To provide active, value-added services to customers without compromising quality.”
                </p>
              </div>
              <div className="border-l-2 border-gold/40 pl-5">
                <span className="text-gold uppercase tracking-[0.2em] text-[11px] font-semibold font-display block mb-2">Our Vision</span>
                <p className="text-[13px] text-cream/55 leading-relaxed font-light">
                  “To become a benchmark in building residential and commercial spaces.”
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="lg:col-span-5 relative">
            <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=80"
                alt="Construction Engineering Plan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-2/3 h-2/3 rounded-[2.5rem] bg-gold/10 hidden sm:block" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-sand/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display block mb-4">Our Core Principles</span>
            <h2 className="font-serif text-4xl md:text-5xl text-cream leading-[1.1] mb-5">Our Ethical Value System</h2>
            <p className="text-cream/60 font-light text-lg">
              We operate under six foundational values that govern how we interact with customers, partners, and our concrete structural layouts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: 'easeOut' }}
                className="rounded-2xl bg-charcoal-dark border border-gold/5 p-8 hover:shadow-luxury transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-gold/12 flex items-center justify-center text-gold mb-6">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl text-cream mb-3">{v.name}</h3>
                <p className="text-cream/55 text-[13px] leading-relaxed font-light">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display block mb-4">Our Journey</span>
            <h2 className="font-serif text-4xl md:text-5xl text-cream leading-[1.1]">Milestones &amp; Deliveries</h2>
          </motion.div>

          <div className="relative max-w-3xl">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gold/25" />
            <div className="space-y-12">
              {milestones.map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: 'easeOut' }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-gold border-4 border-cream shadow" />
                  <span className="font-serif text-3xl text-gold block mb-1 leading-none">{item.year}</span>
                  <h4 className="font-display font-semibold text-cream text-base mb-2">{item.title}</h4>
                  <p className="text-cream/55 text-sm leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="rounded-[2.5rem] bg-charcoal-dark text-cream overflow-hidden grid lg:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col justify-center space-y-6">
              <span className="text-[11px] uppercase tracking-[0.28em] text-gold-light font-semibold font-display">Uncompromised Standards</span>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.12]">Our Structural Quality Policy</h2>
              <p className="text-cream/65 font-light text-sm leading-relaxed">
                We never take shortcuts. Building homes that secure families requires high-standard civil engineering audit systems, verified certifications, and elite concrete raw materials. Every site is supervised directly by certified structure engineers.
              </p>
              <ul className="space-y-4 pt-2">
                {qualityPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-cream/75 font-light">
                    <CheckCircle2 size={16} className="text-gold-light shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[320px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80"
                alt="Quality Auditing Site"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
export default About;
