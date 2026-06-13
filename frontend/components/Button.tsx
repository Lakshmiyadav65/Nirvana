'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
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
  const baseStyles = "relative inline-flex items-center justify-center font-display font-medium uppercase tracking-wider text-xs px-6 py-4 transition-all duration-300 overflow-hidden";

  const variants = {
    primary: "bg-gold hover:bg-gold-luxury text-charcoal-dark shadow-luxury hover:shadow-luxury-lg",
    secondary: "bg-charcoal text-white border border-charcoal-light hover:bg-charcoal-light",
    outline: "border border-gold text-gold hover:bg-gold hover:text-charcoal-dark",
    glass: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-cream hover:text-charcoal-dark"
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
