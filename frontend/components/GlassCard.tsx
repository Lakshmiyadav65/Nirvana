'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, borderColor: 'rgba(200, 157, 94, 0.4)' } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`glass-panel rounded-lg p-6 sm:p-8 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};
export default GlassCard;
