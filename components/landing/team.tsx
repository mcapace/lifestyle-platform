"use client";

import { motion } from "framer-motion";

export function Team() {
  return (
    <section className="py-32 px-6 bg-neutral-950">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            Built by people who care.
          </h2>
          <p className="text-xl text-neutral-400 font-light leading-relaxed">
            Not a faceless corporation. Not VC-backed growth at all costs.
            <br />
            <span className="text-white">
              Just a small team building what should have existed all along.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

