'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.8 : 24;
      setIsScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const atTopHome = isHome && !isScrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-charcoal-dark/85 backdrop-blur-xl border-b border-gold/12 py-3 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]'
            : atTopHome
              ? 'bg-transparent py-5'
              : 'bg-charcoal-dark/40 backdrop-blur-md py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="flex items-center justify-center rounded-xl bg-[#08291f] h-11 w-11 shrink-0 ring-1 ring-gold/30 shadow-sm overflow-hidden">
              <img src="/logo-mark.png" alt="Nirvana Builders & Developers" className="h-7 w-auto" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-xl tracking-tight font-semibold text-cream group-hover:text-gold-light transition-colors duration-300">
                Nirvana
              </span>
              <span className="font-display text-[8px] sm:text-[9px] uppercase tracking-[0.26em] font-semibold mt-1 text-gold">
                Builders &amp; Developers
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative font-display text-[13px] tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-gold' : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navDot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 font-display text-[13px] tracking-wide pl-6 pr-2 py-2 rounded-full bg-gold text-charcoal-dark hover:bg-gold-light transition-colors duration-300"
            >
              Get Consultation
              <span className="w-8 h-8 rounded-full bg-charcoal-dark text-gold flex items-center justify-center">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-cream hover:text-gold transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-charcoal-dark flex flex-col justify-center items-center lg:hidden"
          >
            <div className="flex flex-col items-center space-y-7">
              {navLinks.map((link, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={link.name}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-3xl text-cream hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 bg-gold text-charcoal-dark font-display text-sm tracking-wide px-7 py-3.5 rounded-full"
                >
                  Get Consultation
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
