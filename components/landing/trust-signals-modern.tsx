"use client";

import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle, Sparkles } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Military-grade encryption. Browse anonymously. Share on your terms. Your identity stays yours.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: CheckCircle,
    title: "Verified Members",
    description:
      "Multi-layer verification eliminates fakes. Real people, real connections, real trust.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Safe Space",
    description:
      "Zero tolerance for harassment. AI-powered safety meets human moderation. Your wellbeing, our priority.",
    gradient: "from-rose-500 to-pink-500",
  },
];

export function TrustSignalsModern() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Built Different</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Your Safety. <span className="text-amber-400">Our Promise.</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Three pillars that set us apart from everyone else
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Glassmorphic card */}
              <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                {/* Gradient glow on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`relative w-16 h-16 mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <feature.icon className="text-white" size={32} />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-amber-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

