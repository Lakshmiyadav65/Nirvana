'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'light';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  icon
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 font-display font-medium tracking-wide text-[13px] px-7 py-3.5 rounded-full transition-all duration-300";

  const variants = {
    primary: "bg-gold text-charcoal-dark hover:bg-gold-light shadow-luxury hover:shadow-luxury-lg",
    secondary: "bg-charcoal-light text-cream border border-cream/10 hover:bg-charcoal-light/70",
    outline: "border border-gold/40 text-gold hover:bg-gold hover:text-charcoal-dark",
    glass: "backdrop-blur-md bg-cream/10 border border-cream/25 text-cream hover:bg-cream hover:text-charcoal-dark",
    light: "bg-cream text-charcoal-dark hover:bg-gold hover:text-charcoal-dark shadow-luxury"
  };

  const content = (
    <span className="flex items-center gap-2 relative z-10">
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </span>
  );

  if (to) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Link href={to} className={`${baseStyles} ${variants[variant]} ${className} group`}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className} group`}
    >
      {content}
    </motion.button>
  );
};
export default Button;
