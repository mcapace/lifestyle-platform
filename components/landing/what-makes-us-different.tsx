"use client";

import { motion } from "framer-motion";

const differences = [
  {
    old: "Fake profiles everywhere",
    new: "Multi-layer verification. ID + photo check. Real people only."
  },
  {
    old: "Public exposure fears",
    new: "Military-grade privacy. Ghost mode. You control who sees what."
  },
  {
    old: "Sketchy meetups",
    new: "Verified events. Safety protocols. Community you can trust."
  },
  {
    old: "Desktop site from 1999",
    new: "Native iOS & Android apps. Modern. Beautiful. Fast."
  },
  {
    old: "Anyone can message you",
    new: "Smart filters. Only verified members. Your boundaries respected."
  },
  {
    old: "Single guys dominating",
    new: "Curated community. Balanced ratios. Quality over quantity."
  }
];

export function WhatMakesUsDifferent() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Why We&apos;re Different
          </h2>
          <p className="text-lg text-neutral-500 font-light">
            What other lifestyle platforms get wrong
          </p>
        </motion.div>

        {/* Comparisons */}
        <div className="space-y-6">
          {differences.map((diff, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden"
            >
              {/* Card */}
              <div className="grid md:grid-cols-2 gap-8 p-8 bg-neutral-900/30 border border-neutral-800 group-hover:border-brand-500/30 transition-all">
                {/* Old Way */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mt-1">
                    <span className="text-red-500 text-sm">✕</span>
                  </div>
                  <div>
                    <div className="text-xs text-red-500/60 uppercase tracking-wider mb-2">
                      Other Platforms
                    </div>
                    <p className="text-neutral-500 text-base font-light line-through">
                      {diff.old}
                    </p>
                  </div>
                </div>

                {/* New Way */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center mt-1">
                    <span className="text-brand-500 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="text-xs text-brand-500/60 uppercase tracking-wider mb-2">
                      Our Platform
                    </div>
                    <p className="text-white text-base font-light">
                      {diff.new}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-neutral-400 font-light">
            The lifestyle community deserves better.
            <br />
            <span className="text-white">We&apos;re building it.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

