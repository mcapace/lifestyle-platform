"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const particles = Array.from({ length: 6 }, (_, i) => {
      const particle = document.createElement("div");
      particle.className = `absolute w-2 h-2 bg-brand-500/20 rounded-full blur-sm`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      return particle;
    });

    // Animate particles
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5,
      });

      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.2,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
