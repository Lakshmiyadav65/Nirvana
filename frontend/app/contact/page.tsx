'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, Leaf } from 'lucide-react';
import Button from '@/components/Button';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', interest: 'General Inquiry', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const projectInterests = [
    "General Inquiry",
    "Nirvana’s Nandanavam (Ongoing)",
    "Nirvana’s Urban Elite (Commercial)",
    "Nirvana’s Sirisurya Nivas",
    "Nirvana’s Venkata Lakshmi Nilayam",
    "Nirvana’s IMR Tulasi Vanam (Villas)",
    "Joint Venture Development"
  ];

  const inputClass = "bg-charcoal-dark border border-gold/10 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-gold text-cream placeholder:text-cream/40";

  return (
    <div className="bg-charcoal-dark">

      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display mb-6">
            <Leaf size={14} /> Get In Touch
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-[1.05]">Contact Us</h1>
        </div>
      </section>

      {/* Details + Form */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Details */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <h2 className="font-serif text-3xl text-cream mb-4">Head Office coordinates</h2>
              <p className="text-cream/60 font-light text-sm leading-relaxed">
                Drop by our head office or connect with our customer support teams to schedule apartment audits, project presentations, and blueprint consultations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 rounded-2xl border border-gold/5 bg-sand/50 p-6 transition-all duration-300 hover:shadow-luxury">
                <MapPin size={22} className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-display text-[13px] font-semibold text-cream mb-1.5">Corporate Office</h4>
                  <p className="text-[13px] text-cream/55 font-light leading-relaxed">
                    HIG-86, Ayyappa Delight, 6th Phase, KPHB Colony, Hyderabad-500085
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-gold/5 bg-sand/50 p-6 transition-all duration-300 hover:shadow-luxury">
                <Phone size={22} className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-display text-[13px] font-semibold text-cream mb-1.5">Phone Lines</h4>
                  <div className="flex flex-col text-[13px] text-cream/55 font-light space-y-1">
                    <a href="tel:+919948983456" className="hover:text-gold transition-colors">+91 99489 83456</a>
                    <a href="tel:+919059337011" className="hover:text-gold transition-colors">+91 90593 37011</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-gold/5 bg-sand/50 p-6 transition-all duration-300 hover:shadow-luxury">
                <Mail size={22} className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-display text-[13px] font-semibold text-cream mb-1.5">Email Inbox</h4>
                  <a href="mailto:nirvanabuildersdevelelopers@gmail.com" className="text-[13px] text-cream/55 font-light hover:text-gold transition-colors break-all">
                    nirvanabuildersdevelelopers@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-charcoal text-cream p-8 rounded-[1.5rem] flex flex-col items-center text-center">
              <MessageCircle size={34} className="text-gold-light mb-4" />
              <h4 className="font-serif text-lg mb-2">WhatsApp Assistant</h4>
              <p className="text-cream/60 text-[13px] font-light mb-6">
                Receive instant project brochures and layout documents directly on your WhatsApp chat.
              </p>
              <a
                href="https://wa.me/919948983456?text=Hello%20Nirvana%20Builders,%20I%20am%20interested%20in%20your%20projects."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center font-display font-medium tracking-wide text-[13px] px-6 py-3.5 rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors duration-300"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-sand/50 border border-gold/5 rounded-[1.75rem] p-8 sm:p-12">
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display block mb-3">Enquiry Form</span>
            <h2 className="font-serif text-3xl text-cream mb-8">Send a Message</h2>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gold/10 border border-gold/40 text-cream text-[13px] p-4 rounded-xl mb-8 flex items-center gap-3"
              >
                <CheckCircle2 size={18} className="text-gold" />
                <span>Thank you. Your inquiry has been received. Our sales manager will contact you shortly.</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-[11px] uppercase tracking-wider text-cream/50 font-semibold mb-2">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={inputClass} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[11px] uppercase tracking-wider text-cream/50 font-semibold mb-2">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-[11px] uppercase tracking-wider text-cream/50 font-semibold mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className={inputClass} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="interest" className="text-[11px] uppercase tracking-wider text-cream/50 font-semibold mb-2">Project Interest</label>
                  <select id="interest" name="interest" value={formData.interest} onChange={handleInputChange} className={inputClass}>
                    {projectInterests.map((item, idx) => (
                      <option key={idx} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-[11px] uppercase tracking-wider text-cream/50 font-semibold mb-2">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={6} required className={`${inputClass} resize-none`}></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" icon={<Send size={14} />}>
                  Send Consultation Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-charcoal-dark h-80 flex items-center justify-center">
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#9aa86a_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="relative z-10 text-center max-w-sm px-8">
              <MapPin className="text-gold-light mx-auto mb-4 animate-bounce" size={30} />
              <h4 className="font-serif text-xl text-cream mb-2">Nirvana Builders</h4>
              <p className="text-cream/60 text-[13px] leading-relaxed font-light">
                6th Phase, KPHB Colony, Kukatpally, <br />
                Hyderabad, Telangana 500085
              </p>
              <span className="text-[10px] text-gold-light block mt-4 tracking-[0.2em] font-semibold">17.4875° N, 78.3958° E</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default Contact;
