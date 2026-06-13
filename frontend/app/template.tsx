'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Page transition: a soft fade on every route change.
 *  Opacity-only (no transform) so it never creates a containing block that
 *  would break `position: fixed` overlays like the gallery lightbox. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
