"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatProps {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedStat({ end, label, prefix = "", suffix = "", duration = 2 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-light text-white mb-2 tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-neutral-500 font-light uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export function StatsCounter() {
  return (
    <section className="py-32 px-6 bg-neutral-950 border-y border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          <AnimatedStat end={10000} label="Waitlist Members" suffix="+" />
          <AnimatedStat end={95} label="Verification Rate" suffix="%" />
          <AnimatedStat end={24} label="Support Available" suffix="/7" />
          <AnimatedStat end={100} label="Privacy Protected" suffix="%" />
        </motion.div>
      </div>
    </section>
  );
}

