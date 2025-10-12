"use client";

import { motion } from "framer-motion";
import { UsersThree, Heart, Sparkle, ShieldCheck } from "@phosphor-icons/react";

const personas = [
  {
    icon: Heart,
    title: "Curious Couples",
    description: "Exploring swinging for the first time. Looking to spice things up. Ready to dip your toes into the lifestyle.",
    weight: "fill" as const
  },
  {
    icon: UsersThree,
    title: "Experienced Lifestylers",
    description: "Active in the scene. Attending events. Seeking quality connections with verified, like-minded people.",
    weight: "fill" as const
  },
  {
    icon: Sparkle,
    title: "Open Relationships",
    description: "Polyamorous. Ethically non-monogamous. Building your chosen family. Finding your tribe.",
    weight: "fill" as const
  },
  {
    icon: ShieldCheck,
    title: "Discreet Explorers",
    description: "Privacy is paramount. Professional life, personal desires. Need absolute discretion and security.",
    weight: "fill" as const
  }
];

export function WhoThisIsFor() {
  return (
    <section className="py-32 px-6 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Who This Is For
          </h2>
          <p className="text-lg text-neutral-500 font-light">
            Whatever your journey looks like
          </p>
        </motion.div>

        {/* Personas Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative p-8 bg-black/50 border border-neutral-800 hover:border-brand-500/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-500/10 mb-6 group-hover:bg-brand-500/20 transition-colors">
                <persona.icon weight={persona.weight} size={28} className="text-brand-500" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-light text-white mb-3">
                {persona.title}
              </h3>
              <p className="text-base text-neutral-400 font-light leading-relaxed">
                {persona.description}
              </p>

              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-brand-500 group-hover:h-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-neutral-500 font-light italic">
            Wherever you are in your journey, you belong here.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

