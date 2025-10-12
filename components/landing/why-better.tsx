"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const comparisons = [
  {
    them: "Desktop-first website from 1996",
    us: "Native mobile app for iOS & Android",
  },
  {
    them: "Cluttered UI with popup ads",
    us: "Clean, modern interface. Zero ads.",
  },
  {
    them: "Anyone can create an account",
    us: "Multi-step verification required",
  },
  {
    them: "Your data gets sold",
    us: "End-to-end encryption. Zero tracking.",
  },
  {
    them: "Overrun with bots and scammers",
    us: "AI + human moderation 24/7",
  },
  {
    them: "Browse and spam everyone",
    us: "Smart matching based on compatibility",
  },
];

export function WhyBetter() {
  return (
    <section className="py-24 px-6 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Why We&apos;re Better
          </h2>
          <p className="text-lg text-neutral-500 font-light">
            The competition hasn&apos;t evolved. We have.
          </p>
        </motion.div>

        <div className="space-y-6">
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid md:grid-cols-2 gap-6 p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl"
            >
              {/* Them */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center mt-0.5">
                  <X className="w-4 h-4 text-neutral-600" />
                </div>
                <div>
                  <div className="text-xs text-neutral-600 uppercase tracking-wider mb-1">
                    Old Platforms
                  </div>
                  <p className="text-neutral-500 line-through">{item.them}</p>
                </div>
              </div>

              {/* Us */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-black" />
                </div>
                <div>
                  <div className="text-xs text-brand-500 uppercase tracking-wider mb-1">
                    Our App
                  </div>
                  <p className="text-white font-light">{item.us}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

