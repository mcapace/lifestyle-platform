"use client";

import { motion } from "framer-motion";

export function Manifesto() {
  return (
    <section className="py-40 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl font-light text-white leading-tight mb-12">
            The lifestyle community
            <br />
            deserves platforms
            <br />
            <span className="text-brand-500 italic">built for 2025.</span>
          </h2>

          <p className="text-2xl md:text-3xl text-neutral-400 font-light leading-relaxed">
            Not relics from the past.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
