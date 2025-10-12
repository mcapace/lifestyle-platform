"use client";

import { motion } from "framer-motion";

export function Team() {
  return (
    <section className="py-32 px-6 bg-neutral-950">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            Who We Are
          </h2>
          <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-3xl mx-auto mb-12">
            We&apos;re a small team of designers, engineers, and community builders who
            believe the lifestyle community deserves a platform built with care,
            respect, and modern technology.
          </p>

          <p className="text-neutral-500 font-light">
            Not backed by VC. Not optimizing for growth at all costs.
            <br />
            <span className="text-white">
              Just building something we&apos;d want to use ourselves.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

