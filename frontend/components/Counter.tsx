'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number; // in milliseconds
  label: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  suffix = "",
  duration = 1500,
  label
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const startValue = 0;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Easing out function
        const easeOutQuad = (t: number) => t * (2 - t);
        const currentCount = Math.floor(easeOutQuad(progress) * (value - startValue) + startValue);

        setCount(currentCount);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <span className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-gold-luxury tracking-tight block mb-2">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="font-sans text-xs uppercase tracking-widest text-gray-400 font-semibold">
        {label}
      </span>
    </div>
  );
};
export default Counter;
