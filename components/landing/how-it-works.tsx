"use client";

import { motion } from "framer-motion";
import { UserCircle, ShieldCheck, Compass, Sparkle } from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    icon: UserCircle,
    title: "Create your profile",
    description:
      "Share what matters to you. Set your boundaries. You control what the world sees.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Get verified",
    description:
      "Multi-layer verification ensures everyone is who they say they are. Real people only.",
  },
  {
    number: "03",
    icon: Compass,
    title: "Connect authentically",
    description:
      "Discover like-minded individuals. Start conversations. Build genuine connections.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 px-6 bg-cream-50 dark:bg-zinc-950 border-t border-bronze-200 dark:border-bronze-900">
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
            How it works
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-light">
            Three simple steps to meaningful connections
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid md:grid-cols-[auto_1fr] gap-8 items-start"
            >
              <div className="flex items-center gap-6">
                <div className="text-6xl md:text-7xl font-serif text-bronze-200 dark:text-bronze-900 tracking-tighter">
                  {step.number}
                </div>
                <div className="w-14 h-14 bg-bronze-100 dark:bg-bronze-950/30 rounded-xl flex items-center justify-center border border-bronze-200 dark:border-bronze-900">
                  <step.icon className="w-7 h-7 text-bronze-700 dark:text-bronze-400" weight="duotone" />
                </div>
              </div>
              <div className="space-y-3 mt-2">
                <h3 className="text-2xl md:text-3xl font-serif text-zinc-900 dark:text-cream-100">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
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
