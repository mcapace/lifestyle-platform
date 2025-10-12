"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function RealWaitlistStats() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading || count === null || count === 0) {
    return null; // Don't show if no data or zero
  }

  return (
    <section className="py-16 px-6 bg-neutral-950 border-y border-neutral-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-brand-500 rounded-full border-2 border-neutral-950" />
              <div className="w-10 h-10 bg-brand-400 rounded-full border-2 border-neutral-950" />
              <div className="w-10 h-10 bg-brand-300 rounded-full border-2 border-neutral-950" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-light text-white mb-2">
            <span className="text-brand-500">{count.toLocaleString()}</span> people waiting for access
          </p>
          <p className="text-neutral-500 font-light">
            Join the founding members
          </p>
        </motion.div>
      </div>
    </section>
  );
}

