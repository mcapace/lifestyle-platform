"use client";

import { motion } from "framer-motion";
import { Shield, Smartphone, MessageCircle, Sparkles, Eye, Zap } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Native Mobile Experience",
    description: "Designed for iOS and Android from the ground up. Fast, smooth, intuitive.",
  },
  {
    icon: Shield,
    title: "Verified Profiles Only",
    description: "Photo verification + ID check. No bots, no catfish, no fake accounts.",
  },
  {
    icon: MessageCircle,
    title: "Encrypted Messaging",
    description: "Private conversations stay private. End-to-end encryption on all messages.",
  },
  {
    icon: Sparkles,
    title: "Smart Discovery",
    description: "AI-powered matching learns your preferences. Better connections, faster.",
  },
  {
    icon: Eye,
    title: "Privacy Controls",
    description: "Choose exactly who can see your profile, photos, and online status.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "No loading screens. No lag. Built for performance on modern devices.",
  },
];

export function AppFeatures() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            What You Get
          </h2>
          <p className="text-lg text-neutral-500 font-light">
            Everything the competition should have built years ago
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-neutral-900/30 border border-neutral-800 hover:border-brand-500/30 transition-all duration-300 rounded-xl"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-500/10 rounded-xl mb-4 group-hover:bg-brand-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

