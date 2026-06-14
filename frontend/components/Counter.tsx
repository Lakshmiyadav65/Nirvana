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
    <div ref={ref} className="flex flex-col text-center md:text-left">
      <span className="flex items-baseline justify-center md:justify-start gap-1 whitespace-nowrap leading-none mb-2">
        <span className="font-serif text-gold text-[2rem] xl:text-[2.5rem] tracking-tight">
          {count.toLocaleString('en-US')}
        </span>
        {suffix && (
          <span className="font-serif text-gold/80 text-base xl:text-xl tracking-tight">
            {suffix}
          </span>
        )}
      </span>
      <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-cream/55 font-medium">
        {label}
      </span>
    </div>
  );
};
export default Counter;
