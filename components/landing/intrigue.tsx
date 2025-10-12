"use client";

import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";
import { ImageReveal } from "@/components/ui/image-reveal";

export function Intrigue() {
  return (
    <section className="min-h-screen bg-black flex items-center">
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left - Text */}
            <div>
              <RevealText>
                <h2 className="text-5xl md:text-6xl font-light text-white mb-8 leading-tight">
                  Not everyone
                  <br />
                  gets in.
                </h2>
              </RevealText>
              <RevealText delay={0.2}>
                <div className="space-y-4 text-lg text-neutral-400 font-light leading-relaxed">
                  <p>
                    We&apos;re building something different. A space where authenticity
                    isn&apos;t optional. Where privacy isn&apos;t negotiable.
                  </p>
                  <p className="text-white">
                    Where the lifestyle community finally has a home that respects
                    who they are.
                  </p>
                </div>
              </RevealText>
            </div>

            {/* Right - Image */}
            <div className="relative aspect-[4/5]">
              <ImageReveal
                src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80"
                alt=""
                className="rounded-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

