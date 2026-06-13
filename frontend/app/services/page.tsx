'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, Briefcase, Layers, FileText, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { servicesData } from '@/data/services';
import Button from '@/components/Button';

export const Services: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="text-gold" size={40} strokeWidth={1.2} />;
      case 'Home': return <Home className="text-gold" size={40} strokeWidth={1.2} />;
      case 'Briefcase': return <Briefcase className="text-gold" size={40} strokeWidth={1.2} />;
      case 'Layers': return <Layers className="text-gold" size={40} strokeWidth={1.2} />;
      case 'FileText': return <FileText className="text-gold" size={40} strokeWidth={1.2} />;
      case 'Compass': return <Compass className="text-gold" size={40} strokeWidth={1.2} />;
      default: return <Building2 className="text-gold" size={40} strokeWidth={1.2} />;
    }
  };

  return (
    <div className="pt-20">

      {/* Page Header */}
      <section className="bg-charcoal-dark text-white py-24 relative overflow-hidden border-b border-gold/15">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3">Our Core Expertise</span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Services
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="w-16 h-[1px] bg-gold"
          ></motion.div>
        </div>
      </section>

      {/* Intro section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
            At Nirvana Builders &amp; Developers, we deliver premium construction and real estate services under strict timelines, compliance standards, and ethical joint-ventures. Here is an overview of what we bring to every concrete foundation.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {servicesData.map((s, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 2) * 0.1 }}
                key={s.id}
                className="border border-gold/15 bg-white p-8 sm:p-10 hover:shadow-luxury hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gold/10 flex items-center justify-center rounded-lg border border-gold/15">
                      {getIcon(s.iconName)}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal-dark uppercase tracking-wider">
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 font-light text-sm mb-6 leading-relaxed">
                    {s.longDescription}
                  </p>

                  <div className="border-t border-gold/10 pt-6 mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-4">Key Parameters</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {s.features.map((feature, i) => (
                        <li key={i} className="flex gap-2 text-xs text-gray-500 font-light">
                          <CheckCircle2 size={14} className="text-gold shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button to="/contact" variant="outline" className="py-3 px-5 text-[10px]">
                    Consult Service
                  </Button>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Architectural Process CTA */}
      <section className="py-24 bg-charcoal text-white border-t border-gold/15">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-4">Pre-Construction to Handover</span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-6">
            Engineering Precision at Every Step
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base max-w-2xl mb-10 leading-relaxed">
            Whether layout plotting, blueprint processing, structural concrete mixing, or high-end woodwork fitting, our technical supervisors oversee the entire lifecycle. Reach out to schedule a planning overview with our chief engineer.
          </p>
          <Button to="/contact" variant="primary" icon={<ArrowRight size={14} />}>
            Request Planning Consult
          </Button>
        </div>
      </section>

    </div>
  );
};
export default Services;
