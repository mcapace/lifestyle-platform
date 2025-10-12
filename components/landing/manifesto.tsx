"use client";

import { motion } from "framer-motion";

export function Manifesto() {
  return (
    <section className="py-32 px-6 bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="text-5xl md:text-6xl font-light text-white leading-tight">
            The lifestyle community deserves better than what exists today.
          </h2>

          <div className="space-y-8 text-xl text-neutral-400 font-light leading-relaxed">
            <p>
              Adult Friend Finder was revolutionary in 1996. But it&apos;s 2025, and
              nothing has changed. Same cluttered interface. Same questionable
              security. Same endless fake profiles and bots.
            </p>

            <p className="text-2xl text-white">
              We&apos;re building what should have existed all along.
            </p>

            <div className="grid md:grid-cols-2 gap-8 pt-8">
              <div className="space-y-3">
                <h3 className="text-brand-500 font-medium tracking-wider text-sm uppercase">
                  The Old Way
                </h3>
                <ul className="space-y-2 text-base text-neutral-500">
                  <li>• Outdated 1990s interface</li>
                  <li>• Overrun with bots and scammers</li>
                  <li>• Your privacy sold to advertisers</li>
                  <li>• No real verification</li>
                  <li>• Predatory pricing</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-brand-500 font-medium tracking-wider text-sm uppercase">
                  Our Way
                </h3>
                <ul className="space-y-2 text-base text-white">
                  <li>• Modern, intuitive design</li>
                  <li>• Multi-layer verification</li>
                  <li>• Military-grade encryption</li>
                  <li>• Real moderation by real people</li>
                  <li>• Transparent, fair pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

