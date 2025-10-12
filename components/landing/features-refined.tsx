"use client";

import { motion } from "framer-motion";
import { ShieldCheck, LockKey, CheckCircle } from "@phosphor-icons/react";

const features = [
  {
    icon: LockKey,
    title: "Privacy by design",
    description:
      "Browse anonymously. Share selectively. Your identity and data remain completely under your control.",
  },
  {
    icon: CheckCircle,
    title: "Verified community",
    description:
      "Multi-layer verification eliminates fake profiles. Connect with real people seeking genuine connections.",
  },
  {
    icon: ShieldCheck,
    title: "Safe and respectful",
    description:
      "Zero tolerance for harassment. Human moderation and AI safety working together for your peace of mind.",
  },
];

export function FeaturesRefined() {
  return (
    <section className="py-24 md:py-32 px-6 bg-white dark:bg-black border-t border-bronze-200 dark:border-bronze-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-cream-50 mb-4 tracking-tight">
            Built on trust
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-light">
            Three principles that guide everything we do
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="w-14 h-14 bg-bronze-100 dark:bg-bronze-950/30 rounded-xl flex items-center justify-center border border-bronze-200 dark:border-bronze-900">
                <feature.icon className="w-7 h-7 text-bronze-700 dark:text-bronze-400" weight="duotone" />
              </div>
              <h3 className="text-2xl font-serif text-zinc-900 dark:text-cream-100">
                {feature.title}
              </h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
