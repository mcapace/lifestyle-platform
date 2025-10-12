"use client";

import { useEffect, useRef } from "react";

const partners = [
  "Coming Q4 2025",
  "Privacy First",
  "End-to-End Encrypted",
  "Verified Community",
  "Native Mobile Apps",
  "Built for the Lifestyle",
  "No Fake Profiles",
  "Your Data, Your Control"
];

export function MarqueeLogos() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let scrollPosition = 0;
    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= marquee.scrollWidth / 2) {
        scrollPosition = 0;
      }
      marquee.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <section className="py-16 px-6 bg-neutral-950 border-y border-neutral-900 overflow-hidden">
      <div className="relative">
        <div ref={marqueeRef} className="flex gap-16 whitespace-nowrap">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-neutral-600 font-light text-sm tracking-wider uppercase"
            >
              {partner}
            </div>
          ))}
        </div>

        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

