'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our luxury newsletter portfolio updates.');
  };

  return (
    <footer className="bg-charcoal-dark border-t border-gold/15 text-gray-400 font-sans pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Branding Column */}
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex flex-col">
            <span className="font-display font-bold text-2xl text-white tracking-widest leading-none">
              NIRVANA
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mt-1">
              Builders & Developers
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            Building architectural excellence with trust, quality, and modern living. A history of responsible business conduct and sustainable, ethical practices.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal-dark transition-all duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal-dark transition-all duration-300">
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal-dark transition-all duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col space-y-6">
          <h4 className="font-display text-white text-sm uppercase tracking-wider font-semibold border-b border-gold/15 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-gold transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold transition-colors duration-300">About Us</Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-gold transition-colors duration-300">Our Projects</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors duration-300">Services</Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-gold transition-colors duration-300">Media Gallery</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold transition-colors duration-300">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="flex flex-col space-y-6">
          <h4 className="font-display text-white text-sm uppercase tracking-wider font-semibold border-b border-gold/15 pb-2">
            Our Services
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/services" className="hover:text-gold transition-colors duration-300">Residential Apartments</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors duration-300">Independent Houses</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors duration-300">Commercial Spaces</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors duration-300">Duplex Homes</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors duration-300">Construction Planning</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors duration-300">Real Estate Development</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info & Newsletter */}
        <div className="flex flex-col space-y-6">
          <h4 className="font-display text-white text-sm uppercase tracking-wider font-semibold border-b border-gold/15 pb-2">
            Corporate Office
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span>HIG-86, Ayyappa Delight, 6th Phase, KPHB Colony, Hyderabad-500085</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold shrink-0" />
              <div className="flex flex-col">
                <a href="tel:+919948983456" className="hover:text-gold transition-colors">+91 99489 83456</a>
                <a href="tel:+919059337011" className="hover:text-gold transition-colors">+91 90593 37011</a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold shrink-0" />
              <a href="mailto:nirvanabuildersdevelelopers@gmail.com" className="hover:text-gold transition-colors truncate">
                nirvanabuildersdevelelopers@gmail.com
              </a>
            </li>
          </ul>

          <div className="pt-2">
            <span className="block text-xs uppercase tracking-wider text-white font-semibold mb-3">Newsletter</span>
            <form onSubmit={handleSubscribe} className="relative flex">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full bg-charcoal-light border border-gold/10 text-xs px-4 py-3 focus:outline-none focus:border-gold text-white"
              />
              <button
                type="submit"
                className="bg-gold text-charcoal-dark px-4 flex items-center justify-center hover:bg-gold-luxury transition-colors duration-300"
                aria-label="Subscribe"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>&copy; {new Date().getFullYear()} Nirvana Builders & Developers. All Rights Reserved.</p>
        <p className="mt-4 md:mt-0 flex gap-6">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
