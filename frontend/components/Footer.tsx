'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our luxury newsletter portfolio updates.');
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'Media Gallery', href: '/gallery' },
    { label: 'Contact Us', href: '/contact' }
  ];

  const services = [
    'Residential Apartments',
    'Independent Houses',
    'Commercial Spaces',
    'Duplex Homes',
    'Construction Planning',
    'Real Estate Development'
  ];

  return (
    <footer className="bg-charcoal-dark text-cream/70 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">

        {/* Top: brand + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-cream/10">
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="Nirvana Builders &amp; Developers — Innovative Reality" className="h-24 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed max-w-md text-cream/60">
              Building architectural excellence with trust, quality, and modern living. A history of responsible business conduct and sustainable, ethical practices.
            </p>
            <div className="flex space-x-3 pt-1">
              {[
                { href: 'https://facebook.com', path: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z', fill: true },
                { href: 'https://linkedin.com', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', fill: true }
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-cream/15 flex items-center justify-center text-gold-light hover:bg-gold hover:text-cream hover:border-gold transition-all duration-300">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-cream/15 flex items-center justify-center text-gold-light hover:bg-gold hover:text-cream hover:border-gold transition-all duration-300">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-10">
            <span className="font-serif text-xl text-cream block mb-2">Stay in the loop</span>
            <p className="text-xs text-cream/55 mb-5 max-w-sm">Receive portfolio updates, launch invites, and project brochures.</p>
            <form onSubmit={handleSubscribe} className="relative flex max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full bg-charcoal-light/40 border border-cream/15 text-sm px-5 py-3.5 rounded-full focus:outline-none focus:border-gold text-cream placeholder:text-cream/40"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-gold text-cream rounded-full flex items-center justify-center hover:bg-gold-light transition-colors duration-300"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-14">
          <div className="flex flex-col space-y-5">
            <h4 className="font-display text-[11px] uppercase tracking-[0.2em] text-gold-light font-semibold">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-cream/60 hover:text-gold-light transition-colors duration-300">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-5">
            <h4 className="font-display text-[11px] uppercase tracking-[0.2em] text-gold-light font-semibold">Our Services</h4>
            <ul className="space-y-3 text-sm">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-cream/60 hover:text-gold-light transition-colors duration-300">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-5">
            <h4 className="font-display text-[11px] uppercase tracking-[0.2em] text-gold-light font-semibold">Corporate Office</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                <span className="text-cream/60">HIG-86, Ayyappa Delight, 6th Phase, KPHB Colony, Hyderabad-500085</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+919948983456" className="text-cream/60 hover:text-gold-light transition-colors">+91 99489 83456</a>
                  <a href="tel:+919059337011" className="text-cream/60 hover:text-gold-light transition-colors">+91 90593 37011</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold shrink-0" />
                <a href="mailto:nirvanabuildersdevelelopers@gmail.com" className="text-cream/60 hover:text-gold-light transition-colors truncate">
                  nirvanabuildersdevelelopers@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-cream/50 gap-4">
          <p>&copy; {new Date().getFullYear()} Nirvana Builders &amp; Developers. All Rights Reserved.</p>
          <p className="flex gap-6">
            <a href="#" className="hover:text-gold-light transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-light transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
