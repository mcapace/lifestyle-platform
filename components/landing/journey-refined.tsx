"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Share as much or as little as you're comfortable with.",
  },
  {
    number: "02",
    title: "Verify & Set Privacy",
    description: "Choose who can see you, when, and how.",
  },
  {
    number: "03",
    title: "Explore & Connect",
    description: "Browse content, join groups, start conversations.",
  },
  {
    number: "04",
    title: "Engage When Ready",
    description: "From digital connection to real-world experiences.",
  },
];

export function JourneyRefined() {
  return (
    <section className="py-24 px-6 bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Your Journey, Your Pace
          </h2>
          <p className="text-neutral-500 text-lg">
            From curiosity to connection
          </p>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-8 items-start group"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-brand-500 font-medium group-hover:bg-brand-500/10 group-hover:border-brand-500/30 transition-colors">
                  {step.number}
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-medium text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed">
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

