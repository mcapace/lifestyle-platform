"use client";

import { motion } from "framer-motion";

const features = [
  {
    phase: "Phase 1",
    title: "Foundation",
    items: [
      "Multi-layer identity verification",
      "End-to-end encrypted messaging",
      "Granular privacy controls",
      "AI-powered safety & moderation",
    ],
  },
  {
    phase: "Phase 2",
    title: "Connection",
    items: [
      "Smart matching algorithm",
      "Interest-based communities",
      "Virtual & IRL event platform",
      "Video verification",
    ],
  },
  {
    phase: "Phase 3",
    title: "Evolution",
    items: [
      "Lifestyle concierge service",
      "Exclusive partner venues",
      "Global member network",
      "White-glove verification tier",
    ],
  },
];

export function ComingSoon() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            What We&apos;re Building
          </h2>
          <p className="text-xl text-neutral-500 font-light">
            Launch roadmap for founding members
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.phase}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Phase label */}
              <div className="text-brand-500 text-sm font-medium tracking-wider uppercase mb-4">
                {feature.phase}
              </div>

              {/* Title */}
              <h3 className="text-4xl font-light text-white mb-8">
                {feature.title}
              </h3>

              {/* Features */}
              <ul className="space-y-4">
                {feature.items.map((item) => (
                  <li
                    key={item}
                    className="text-neutral-400 font-light leading-relaxed flex items-start gap-3"
                  >
                    <span className="text-brand-500 mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Connector line */}
              {index < features.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-neutral-800" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

