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
            &quot;Finally, a platform that understands what we&apos;ve been asking for.&quot;
          </blockquote>
          <div className="text-neutral-500 font-light">
            — Early Access Member
          </div>
        </motion.div>
      </div>
    </section>
  );
}

