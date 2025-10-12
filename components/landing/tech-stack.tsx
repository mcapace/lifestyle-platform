"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, Eye, Fingerprint, Lightning, DeviceMobile } from "@phosphor-icons/react";

const features = [
  {
    icon: ShieldCheck,
    title: "Multi-Layer Verification",
    description: "AI-powered ID check, live photo verification, and behavioral analysis. Real humans, zero fakes."
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Military-grade encryption on all messages. Your conversations stay between you and your connections."
  },
  {
    icon: Eye,
    title: "Ghost Mode & Privacy",
    description: "Browse anonymously. Control exactly who sees your profile, photos, and location. Face blur technology."
  },
  {
    icon: Fingerprint,
    title: "Smart Matching",
    description: "AI learns your preferences. Compatible couples. Shared interests. Quality over quantity."
  },
  {
    icon: Lightning,
    title: "Instant Everything",
    description: "Real-time messaging. Live event updates. No lag, no waiting. Built for speed."
  },
  {
    icon: DeviceMobile,
    title: "Native Apps",
    description: "iOS and Android apps designed from scratch. Not a wrapped website. True native performance."
  }
];

export function TechStack() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Built With Modern Technology
          </h2>
          <p className="text-lg text-neutral-500 font-light">
            Not a legacy platform with a facelift. Built from the ground up for 2025.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative p-8 bg-neutral-900/20 border border-neutral-800 hover:border-brand-500/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-500/10 mb-6 group-hover:bg-brand-500/20 transition-colors">
                <feature.icon weight="fill" size={28} className="text-brand-500" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-light text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

