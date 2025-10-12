"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const comparison = [
  { old: "Outdated interfaces", new: "Modern, intuitive design" },
  { old: "Questionable profiles", new: "Multi-layer verification" },
  { old: "Privacy concerns", new: "End-to-end encryption" },
  { old: "Limited moderation", new: "AI + human safety team" },
  { old: "Hidden costs", new: "Transparent pricing" },
];

export function Comparison() {
  return (
    <section className="py-32 px-6 bg-neutral-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            A New Standard
          </h2>
          <div className="h-px w-24 bg-brand-500" />
        </motion.div>

        <div className="space-y-8">
          {comparison.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid md:grid-cols-2 gap-8 items-center pb-8 border-b border-neutral-800"
            >
              {/* Old way */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
                  <X className="w-4 h-4 text-neutral-600" />
                </div>
                <span className="text-xl text-neutral-600 line-through font-light">
                  {item.old}
                </span>
              </div>

              {/* New way */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl text-white font-light">{item.new}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-neutral-500 font-light">
            The industry hasn&apos;t evolved.
            <br />
            <span className="text-white">We&apos;re changing that.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
