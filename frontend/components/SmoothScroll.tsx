'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

/** Site-wide smooth (inertial) scrolling — the single biggest "premium feel" lever.
 *  Uses real scroll position (not transforms), so IntersectionObserver / whileInView
 *  reveals keep working, and touch devices fall back to native momentum scrolling. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
