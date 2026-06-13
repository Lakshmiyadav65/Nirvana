import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

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
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: 'General Inquiry',
      message: ''
    });
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
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

  return (
    <div className="pt-20">
      
      {/* Page Header */}
      <section className="bg-charcoal-dark text-white py-24 relative overflow-hidden border-b border-gold/15">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3">Get In Touch</span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Contact Us
          </h1>
          <div className="w-16 h-[1px] bg-gold"></div>
        </div>
      </section>

      {/* Main Details and Form Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-3">Corporate Details</span>
              <h2 className="font-display text-3xl font-bold text-charcoal-dark tracking-tight mb-6">
                Head Office coordinates
              </h2>
              <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
                Drop by our head office or connect with our customer support teams to schedule apartment audits, project presentations, and blueprint consultations.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="flex gap-4 border border-gray-100 p-6 bg-[#fafafa] transition-all duration-300 hover:border-gold/30">
                <MapPin size={24} className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-display text-sm font-bold text-charcoal-dark uppercase tracking-wider mb-2">Corporate Office</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    HIG-86, Ayyappa Delight, 6th Phase, KPHB Colony, Hyderabad-500085
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border border-gray-100 p-6 bg-[#fafafa] transition-all duration-300 hover:border-gold/30">
                <Phone size={24} className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-display text-sm font-bold text-charcoal-dark uppercase tracking-wider mb-2">Phone Lines</h4>
                  <div className="flex flex-col text-xs text-gray-500 font-light space-y-1">
                    <a href="tel:+919948983456" className="hover:text-gold transition-colors">+91 99489 83456</a>
                    <a href="tel:+919059337011" className="hover:text-gold transition-colors">+91 90593 37011</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 border border-gray-100 p-6 bg-[#fafafa] transition-all duration-300 hover:border-gold/30">
                <Mail size={24} className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-display text-sm font-bold text-charcoal-dark uppercase tracking-wider mb-2">Email Inbox</h4>
                  <a href="mailto:nirvanabuildersdevelelopers@gmail.com" className="text-xs text-gray-500 font-light hover:text-gold transition-colors break-all">
                    nirvanabuildersdevelelopers@gmail.com
                  </a>
                </div>
              </div>

            </div>

            {/* WhatsApp direct block */}
            <div className="bg-charcoal text-white p-8 border border-gold/15 flex flex-col items-center text-center">
              <MessageCircle size={36} className="text-gold mb-4" />
              <h4 className="font-display text-base font-bold uppercase tracking-wider mb-2">WhatsApp Assistant</h4>
              <p className="text-gray-400 text-xs font-light mb-6">
                Receive instant project brochures and layout documents directly on your WhatsApp chat.
              </p>
              <a 
                href="https://wa.me/919948983456?text=Hello%20Nirvana%20Builders,%20I%20am%20interested%20in%20your%20projects." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center font-display font-medium uppercase tracking-wider text-xs px-6 py-4 bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors duration-300"
              >
                Chat on WhatsApp
              </a>
            </div>

          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-[#fafafa] border border-gray-100 p-8 sm:p-12">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-3">Enquiry Form</span>
            <h2 className="font-display text-2xl font-bold text-charcoal-dark uppercase tracking-wider mb-8">
              Send a Message
            </h2>

            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gold/10 border border-gold text-gold text-xs p-4 mb-8 flex items-center gap-3"
              >
                <AlertCircle size={16} />
                <span>Thank you. Your inquiry has been received. Our sales manager will contact you shortly.</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white border border-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-gold text-charcoal"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white border border-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-gold text-charcoal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-white border border-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-gold text-charcoal"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="interest" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">Project Interest</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="bg-white border border-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-gold text-charcoal"
                  >
                    {projectInterests.map((item, idx) => (
                      <option key={idx} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  className="bg-white border border-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-gold text-charcoal resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <Button type="submit" variant="primary" className="w-full sm:w-auto" icon={<Send size={12} />}>
                  Send Consultation Request
                </Button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* Styled Office Map Placeholder */}
      <section className="bg-charcoal border-t border-gold/15 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-3">Map Coordinate</span>
          <h3 className="font-display text-xl text-white uppercase tracking-wider mb-6">Interactive Office Location</h3>
          
          <div className="w-full h-80 relative overflow-hidden border border-gold/15 flex items-center justify-center bg-charcoal-dark">
            {/* Visual background map simulation */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#c89d5e_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Elegant glass panel with location facts */}
            <GlassCard hoverEffect={false} className="relative z-10 max-w-sm">
              <MapPin className="text-gold mx-auto mb-4 animate-bounce" size={32} />
              <h4 className="font-display text-sm text-white uppercase tracking-widest mb-2">Nirvana Builders</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                6th Phase, KPHB Colony, Kukatpally, <br />
                Hyderabad, Telangana 500085
              </p>
              <span className="text-[9px] text-gold block mt-4 tracking-widest font-semibold">17.4875° N, 78.3958° E</span>
            </GlassCard>
          </div>
        </div>
      </section>

    </div>
  );
};
export default Contact;
