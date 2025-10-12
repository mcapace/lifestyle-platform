"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Finally, a platform that respects both curiosity and privacy. The verification gave me confidence from day one.",
    author: "Sarah M.",
    location: "New York",
  },
  {
    quote:
      "What impressed me most was the quality of people. Real conversations, authentic connections, zero games.",
    author: "Michael R.",
    location: "Los Angeles",
  },
  {
    quote:
      "I was skeptical at first, but the community here is different. Respectful, genuine, and exactly what I was looking for.",
    author: "Jennifer K.",
    location: "San Francisco",
  },
];

export function TestimonialsRefined() {
  return (
    <section className="py-24 md:py-32 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white mb-4">
            What people are saying
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="text-sm text-zinc-500 dark:text-zinc-600">
                <div className="font-medium text-zinc-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div>{testimonial.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

