"use client";

import { motion } from "framer-motion";

export function SocialProof() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-3xl md:text-4xl font-light text-white mb-8 leading-relaxed italic">
            &quot;We&apos;ve been in the lifestyle for 10 years. Every platform feels sketchy or outdated. 
            This is what we&apos;ve been waiting for—privacy, verification, and actually good design.&quot;
          </blockquote>
          <div className="text-neutral-500 font-light">
            — Sarah & Mike, Founding Members
          </div>
        </motion.div>
      </div>
    </section>
  );
}

