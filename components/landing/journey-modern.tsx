"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, Shield, Compass, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: User,
    title: "Create Your Profile",
    description:
      "Share your story, set your boundaries. Complete control over what the world sees.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: Shield,
    title: "Verify & Protect",
    description:
      "Multi-layer verification. Choose your privacy level. Ghost mode to full social—you decide.",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: Compass,
    title: "Explore & Connect",
    description:
      "Educational content, discussion groups, curated connections. No pressure, just possibilities.",
    color: "from-amber-500 to-orange-500",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Engage Authentically",
    description:
      "From digital chemistry to real-world magic. Exclusive events. Genuine experiences.",
    color: "from-rose-500 to-red-500",
  },
];

export function JourneyModern() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Your Journey. <span className="text-amber-400">Your Pace.</span>
          </h2>
          <p className="text-xl text-zinc-400">
            Four steps from curiosity to connection
          </p>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Number & Icon */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`w-32 h-32 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center relative overflow-hidden group`}
                  >
                    <step.icon className="text-white z-10" size={48} />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
                    />
                  </motion.div>
                  <div className="absolute -top-4 -left-4 text-8xl font-bold text-white/5">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  className="hidden md:block absolute left-16 top-32 w-0.5 h-24 bg-gradient-to-b from-zinc-700 to-transparent origin-top"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

