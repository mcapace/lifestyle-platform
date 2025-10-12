"use client";

import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";

const principles = [
  {
    number: "01",
    title: "Absolute Privacy",
    description: "Ghost mode. Face blur. Anonymous browsing. Your professional life stays separate. We use military-grade encryption and never sell your data."
  },
  {
    number: "02",
    title: "Zero Fakes",
    description: "ID verification. Live photo check. AI screening. We weed out single guys pretending to be couples, catfish, and time-wasters. Real people only."
  },
  {
    number: "03",
    title: "Respect & Boundaries",
    description: "Clear consent tools. Block & report that works. Human moderation 24/7. Your 'no' is always respected. Zero tolerance for harassment."
  },
  {
    number: "04",
    title: "Elevated Experience",
    description: "Beautiful design. Thoughtful features. Event integration. Travel matching. This isn't a hookup app—it's a lifestyle companion."
  }
];

export function Principles() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <RevealText>
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Our Principles
            </h2>
            <p className="text-lg text-neutral-500 font-light">
              What we stand for. What we won&apos;t compromise on.
            </p>
          </div>
        </RevealText>

        {/* Principles */}
        <div className="space-y-16">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative pl-20 border-l border-neutral-800"
            >
              {/* Number */}
              <div className="absolute -left-6 top-0 w-12 h-12 bg-neutral-950 flex items-center justify-center">
                <span className="text-2xl font-light text-brand-500">
                  {principle.number}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                  {principle.title}
                </h3>
                <p className="text-lg text-neutral-400 font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

