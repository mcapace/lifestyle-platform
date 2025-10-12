"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Finally, a platform that respects both curiosity and privacy.",
    author: "Sarah M.",
    role: "New York",
  },
  {
    quote: "Sophisticated without being sterile. This is what we needed.",
    author: "Michael R.",
    role: "Los Angeles",
  },
];

export function SocialProofRefined() {
  return (
    <section className="py-24 px-6 bg-neutral-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-brand-500 text-brand-500" />
            ))}
          </div>
          <p className="text-neutral-500 text-sm">
            Trusted by thousands of verified members
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-500 text-brand-500" />
                ))}
              </div>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="text-sm">
                <p className="text-white font-medium">{testimonial.author}</p>
                <p className="text-neutral-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

