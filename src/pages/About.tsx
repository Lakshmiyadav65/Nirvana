import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ShieldCheck, Heart, CheckCircle2, Clock, Landmark, Users } from 'lucide-react';
import GlassCard from '../components/GlassCard';

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
    <div className="pt-20">
      
      {/* Page Header */}
      <section className="bg-charcoal-dark text-white py-24 relative overflow-hidden border-b border-gold/15">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3"
          >
            The Nirvana Heritage
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4"
          >
            About Us
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-[1px] bg-gold"
          ></motion.div>
        </div>
      </section>

      {/* Main Intro Story */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 flex flex-col space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">Who We Are</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-dark tracking-tight leading-tight">
                History of Responsible Conduct &amp; Construction Quality
              </h2>
              <p className="text-gray-600 leading-relaxed font-light">
                Nirvana Builders &amp; Developers has a history of responsible business conduct and strongly believes that true business success is measured not only by profits but also by sustainable and ethical practices.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                Since our inception, our focus has remained on designing spaces that inspire comfort. By utilizing certified engineering standards, complying strictly with regulatory laws, and committing to eco-friendly development, we deliver residential blocks and commercial complexes that maintain their longevity and value for decades.
              </p>

              {/* Mission Vision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="border-l border-gold/30 pl-4">
                  <span className="text-gold uppercase tracking-wider text-xs font-bold block mb-1">Our Mission</span>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    “To provide active, value-added services to customers without compromising quality.”
                  </p>
                </div>
                <div className="border-l border-gold/30 pl-4">
                  <span className="text-gold uppercase tracking-wider text-xs font-bold block mb-1">Our Vision</span>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    “To become a benchmark in building residential and commercial spaces.”
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="border border-gold/20 p-2 bg-white relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80" 
                  alt="Construction Engineering Plan"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-full h-full border border-gold/10 z-0"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-charcoal bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-charcoal-light to-charcoal-dark text-white border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="max-w-3xl mx-auto text-center mb-20 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">Our Core Principles</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Our Ethical Value System
            </h2>
            <p className="text-gray-400 font-light max-w-xl text-xs sm:text-sm">
              We operate under six foundational values that govern how we interact with customers, partners, and our concrete structural layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <GlassCard key={i} className="hover:border-gold/30">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-6">
                  {v.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-3">
                  {v.name}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  {v.desc}
                </p>
              </GlassCard>
            ))}
          </div>

        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="max-w-3xl mx-auto text-center mb-20 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">Our Journey</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal-dark tracking-tight">
              Milestones &amp; Deliveries
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-[1px] h-full bg-gold/20 top-0"></div>

            <div className="space-y-16">
              {milestones.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                    
                    {/* Date Point */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-4 border-white z-10 shadow"></div>

                    {/* Left space/content */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12'}`}>
                      <motion.div 
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#fafafa] border border-gold/10 p-6 shadow-luxury"
                      >
                        <span className="font-display font-extrabold text-gold text-lg block mb-1">
                          {item.year}
                        </span>
                        <h4 className="font-display font-bold text-sm text-charcoal-dark uppercase tracking-wider mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-500 text-xs leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>

                    {/* Empty space for alignment */}
                    <div className="hidden md:block w-1/2"></div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Quality Policy Section */}
      <section className="py-20 bg-charcoal text-white border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">Uncompromised standards</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Our Structural Quality Policy
            </h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              We never take shortcuts. Building homes that secure families requires high-standard civil engineering audit systems, verified certifications, and elite concrete raw materials. Every site is supervised directly by certified structure engineers.
            </p>
            <ul className="space-y-4">
              {qualityPoints.map((point, i) => (
                <li key={i} className="flex gap-3 text-xs leading-relaxed text-gray-300">
                  <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="border border-gold/15 p-2 bg-[#222222]"
          >
            <img 
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80" 
              alt="Quality Auditing Site"
              className="w-full h-[350px] object-cover"
            />
          </motion.div>

        </div>
      </section>

    </div>
  );
};
export default About;
