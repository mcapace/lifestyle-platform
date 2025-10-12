"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";

const faqs = [
  {
    question: "How does verification work?",
    answer: "We use a multi-layer system: ID verification, live photo check with liveness detection, and AI-powered behavioral analysis. This ensures every member is real and serious about the lifestyle."
  },
  {
    question: "How private is my information?",
    answer: "Extremely. We use military-grade end-to-end encryption on all messages. Ghost mode lets you browse anonymously. Face blur protects your identity. Your data never leaves our servers and is never sold. Ever."
  },
  {
    question: "What makes this different from other platforms?",
    answer: "We're built from the ground up for 2025. Native iOS and Android apps (not a wrapped website). Real verification (not optional). Curated community (quality over quantity). Modern design that doesn't look like it's from the 90s."
  },
  {
    question: "Is this just for couples?",
    answer: "No. We welcome couples, singles, and those exploring ethical non-monogamy. Whether you're curious about swinging, already active in the lifestyle, or exploring polyamory—this is your space."
  },
  {
    question: "When does it launch?",
    answer: "Q1 2025. Join the waitlist now to get founding member status, 50% off lifetime pricing, and priority access when we launch."
  },
  {
    question: "How do you prevent fake profiles?",
    answer: "Every profile requires ID verification and live photo check. Our AI flags suspicious behavior. Single guys pretending to be couples? Caught. Catfish? Blocked. Bots? Eliminated. Verification is mandatory, not optional."
  }
];

export function FAQElegant() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Questions?
          </h2>
          <p className="text-lg text-neutral-500 font-light">
            Everything you need to know
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-neutral-800 bg-neutral-900/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-900/50 transition-colors"
              >
                <span className="text-lg font-light text-white pr-8">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus weight="bold" size={20} className="text-brand-500" />
                  ) : (
                    <Plus weight="bold" size={20} className="text-neutral-500" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-neutral-400 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

