"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, ShieldCheck, UserCircle, Lightning, Eye, CheckCircle } from "@phosphor-icons/react";

const features = [
  {
    title: "Military-Grade Privacy",
    description: "End-to-end encryption. Ghost mode. Face blur. Your secrets stay yours.",
    icon: Lock,
    span: "md:col-span-2",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80"
  },
  {
    title: "Verified Only",
    description: "Multi-layer verification weeds out fakes. Real people, real connections.",
    icon: ShieldCheck,
    span: "md:col-span-1",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
  },
  {
    title: "Smart Matching",
    description: "AI learns what you want. Compatible couples. Shared desires.",
    icon: UserCircle,
    span: "md:col-span-1",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
  },
  {
    title: "Instant Everything",
    description: "Real-time messaging. Live events. Zero lag. Built for speed.",
    icon: Lightning,
    span: "md:col-span-2",
    gradient: "from-brand-500/20 to-transparent"
  }
];

export function BentoGrid() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-neutral-500 font-light">
            Designed for your lifestyle
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-4 auto-rows-[280px]">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden ${feature.span} bg-neutral-900/30 border border-neutral-800 hover:border-brand-500/30 transition-all duration-500`}
            >
              {/* Background Image or Gradient */}
              {feature.image ? (
                <div className="absolute inset-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>
              ) : feature.gradient ? (
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
              ) : null}

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <feature.icon 
                    weight="fill" 
                    size={32} 
                    className="text-brand-500" 
                  />
                </div>
                <h3 className="text-2xl font-light text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

