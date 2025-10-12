"use client";

import { motion } from "framer-motion";

const features = [
  "Multi-layer verification",
  "End-to-end encrypted messaging",
  "Granular privacy controls",
  "AI-powered safety",
  "Smart matching",
  "Community spaces",
  "Event platform",
  "Video verification",
];

export function ComingSoon() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            What You Get
          </h2>
          <div className="h-px w-24 bg-brand-500" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 p-6 bg-neutral-900/30 border border-neutral-800 hover:border-brand-500/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-brand-500/20 rounded-full flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                <div className="w-2 h-2 bg-brand-500 rounded-full group-hover:bg-black" />
              </div>
              <span className="text-lg text-neutral-300 font-light">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

