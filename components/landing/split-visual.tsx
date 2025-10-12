"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function SplitVisual() {
  return (
    <section className="min-h-screen flex items-center bg-black">
      <div className="w-full grid lg:grid-cols-2">
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[600px] lg:h-screen"
        >
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80"
            alt=""
            fill
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black" />
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center p-12 lg:p-20"
        >
          <div className="max-w-xl">
            <h2 className="text-6xl md:text-7xl font-light text-white mb-8 leading-tight">
              The industry
              <br />
              hasn&apos;t evolved.
              <br />
              <span className="text-brand-500 italic">We are.</span>
            </h2>
            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-8">
              Modern design. Real verification. Actual privacy.
              <br />
              <span className="text-white">Built for how people connect today.</span>
            </p>
            <div className="h-px w-32 bg-brand-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

