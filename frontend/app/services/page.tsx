'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, Briefcase, Layers, FileText, Compass, CheckCircle2, ArrowRight, Leaf } from 'lucide-react';
import { servicesData } from '@/data/services';
import Button from '@/components/Button';

const fadeUp = {
  initial: { opacity: 0, y: 42, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export const Services: React.FC = () => {
  const getIcon = (name: string) => {
    const props = { size: 26, strokeWidth: 1.5, className: 'text-gold' };
    switch (name) {
      case 'Building2': return <Building2 {...props} />;
      case 'Home': return <Home {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Compass': return <Compass {...props} />;
      default: return <Building2 {...props} />;
    }
  };

  return (
    <div className="bg-charcoal-dark">

      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display mb-6">
            <Leaf size={14} /> Our Core Expertise
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-[1.05] mb-6">Services</h1>
          <p className="text-cream/60 font-light text-lg max-w-2xl leading-relaxed">
            At Nirvana Builders &amp; Developers, we deliver premium construction and real estate services under strict timelines, compliance standards, and ethical joint-ventures. Here is an overview of what we bring to every concrete foundation.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {servicesData.map((s, idx) => (
              <motion.div
                key={s.id}
                {...fadeUp}
                transition={{ duration: 0.7, delay: (idx % 2) * 0.08, ease: 'easeOut' }}
                className="group rounded-[1.75rem] bg-sand/50 border border-gold/5 p-8 sm:p-10 hover:bg-charcoal-dark hover:shadow-luxury transition-all duration-500 flex flex-col"
              >
                <div className="flex items-center gap-5 mb-7">
                  <div className="w-16 h-16 rounded-2xl bg-gold/12 flex items-center justify-center shrink-0">
                    {getIcon(s.iconName)}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-[1.7rem] text-cream leading-tight">
                    {s.title}
                  </h3>
                </div>

                <p className="text-cream/60 font-light text-sm mb-7 leading-relaxed">
                  {s.longDescription}
                </p>

                <div className="border-t border-gold/8 pt-6 mb-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold font-display block mb-4">Key Parameters</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {s.features.map((feature, i) => (
                      <li key={i} className="flex gap-2.5 text-[13px] text-cream/60 font-light">
                        <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button to="/contact" variant="outline">Consult Service</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process CTA */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            {...fadeUp}
            className="relative rounded-[2.5rem] overflow-hidden bg-charcoal-dark text-cream px-8 sm:px-16 py-16 md:py-20 text-center flex flex-col items-center"
          >
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
            <div className="relative flex flex-col items-center">
              <span className="text-[11px] uppercase tracking-[0.28em] text-gold-light font-semibold font-display mb-5">Pre-Construction to Handover</span>
              <h2 className="font-serif text-3xl sm:text-5xl leading-[1.1] mb-6 max-w-2xl">
                Engineering Precision at Every Step
              </h2>
              <p className="text-cream/65 font-light text-sm sm:text-base max-w-2xl mb-10 leading-relaxed">
                Whether layout plotting, blueprint processing, structural concrete mixing, or high-end woodwork fitting, our technical supervisors oversee the entire lifecycle. Reach out to schedule a planning overview with our chief engineer.
              </p>
              <Button to="/contact" variant="light" icon={<ArrowRight size={16} />}>
                Request Planning Consult
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
export default Services;
