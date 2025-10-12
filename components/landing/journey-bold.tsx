"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Create",
    subtitle: "Your Profile",
    description: "Share your story. Set your boundaries. Complete control.",
  },
  {
    step: "02",
    title: "Verify",
    subtitle: "& Protect",
    description: "Multi-layer verification. Choose your privacy level.",
  },
  {
    step: "03",
    title: "Explore",
    subtitle: "& Connect",
    description: "Curated connections. No pressure. Just possibilities.",
  },
  {
    step: "04",
    title: "Engage",
    subtitle: "Authentically",
    description: "From digital chemistry to real-world magic.",
  },
];

export function JourneyBold() {
  return (
    <section className="py-32 px-6 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-light text-white mb-2">
            Your Journey
          </h2>
          <p className="text-3xl md:text-4xl font-light text-brand-500">
            Your Pace
          </p>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center gap-12 group"
            >
              {/* Step number - huge */}
              <div className="text-9xl md:text-[12rem] font-light text-white/5 group-hover:text-white/10 transition-colors leading-none">
                {step.step}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-5xl md:text-6xl font-light text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-3xl md:text-4xl font-light text-neutral-600 mb-4">
                  {step.subtitle}
                </p>
                <p className="text-neutral-500 text-lg max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Accent line */}
              <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-brand-500/0 via-brand-500 to-brand-500/0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

