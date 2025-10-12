"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageReveal({ src, alt, className }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    
    if (!container || !image || !overlay) return;

    // Set initial states
    gsap.set(image, { scale: 1.3 });
    gsap.set(overlay, { scaleX: 1 });

    // Create reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(overlay, {
      scaleX: 0,
      duration: 1.2,
      ease: "power2.inOut",
      transformOrigin: "right center"
    })
    .to(image, {
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    }, "-=0.8");

  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imageRef}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-neutral-950 z-10"
      />
    </div>
  );
}
