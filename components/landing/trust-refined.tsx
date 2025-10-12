"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, Lock } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your identity, your control. Browse anonymously and share selectively.",
  },
  {
    icon: CheckCircle,
    title: "Verified Members",
    description:
      "Multi-layer verification combats fakes. Real people, real connections.",
  },
  {
    icon: Shield,
    title: "Safe Space",
    description:
      "Zero tolerance for harassment. Moderation that protects your wellbeing.",
  },
];

export function TrustRefined() {
  return (
    <section className="py-24 px-6 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-500/10 rounded-xl mb-4">
                <feature.icon className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

