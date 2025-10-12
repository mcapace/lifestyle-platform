"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Create your profile",
    description:
      "Share what matters to you. Set your boundaries. You control what the world sees.",
  },
  {
    number: "02",
    title: "Get verified",
    description:
      "Multi-layer verification ensures everyone is who they say they are. Real people only.",
  },
  {
    number: "03",
    title: "Connect authentically",
    description:
      "Discover like-minded individuals. Start conversations. Build genuine connections.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 px-6 bg-stone-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white mb-4">
            How it works
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Three simple steps to meaningful connections
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-8 items-start"
            >
              <div className="text-6xl md:text-7xl font-serif text-amber-200 dark:text-amber-900">
                {step.number}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

