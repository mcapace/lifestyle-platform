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
            Adult Friend Finder
            <br />
            hasn&apos;t changed
            <br />
            <span className="text-brand-500 italic">in 20 years.</span>
          </h2>

          <p className="text-2xl md:text-3xl text-neutral-400 font-light leading-relaxed">
            We&apos;re building what comes next.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

