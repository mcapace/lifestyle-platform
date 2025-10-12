"use client";

import { motion } from "framer-motion";

const values = [
  {
    title: "Verified",
    description: "Every member. Every time. No exceptions.",
  },
  {
    title: "Private",
    description: "Your identity. Your choice. Your control.",
  },
  {
    title: "Sophisticated",
    description: "Built for adults who know what they want.",
  },
  {
    title: "Safe",
    description: "Zero tolerance. Real protection. Human moderation.",
  },
];

export function WhatWeAre() {
  return (
    <section className="py-32 px-6 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            What We Stand For
          </h2>
          <div className="h-px w-16 bg-brand-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-2xl font-light text-white mb-3">
                {value.title}
              </h3>
              <p className="text-neutral-500 font-light leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

