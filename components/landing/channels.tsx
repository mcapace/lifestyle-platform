"use client";

import { motion } from "framer-motion";
import { EnvelopeSimple, InstagramLogo, TwitterLogo, DiscordLogo } from "@phosphor-icons/react";
import Link from "next/link";

const channels = [
  {
    icon: InstagramLogo,
    label: "Instagram",
    handle: "@lifestyle.elevated",
    href: "https://instagram.com/lifestyle.elevated",
    description: "Behind the scenes"
  },
  {
    icon: TwitterLogo,
    label: "Twitter",
    handle: "@lifestyleapp",
    href: "https://twitter.com/lifestyleapp",
    description: "Updates & insights"
  },
  {
    icon: EnvelopeSimple,
    label: "Email",
    handle: "hello@lifestyle.app",
    href: "mailto:hello@lifestyle.app",
    description: "Direct line"
  },
  {
    icon: DiscordLogo,
    label: "Community",
    handle: "Join Discord",
    href: "https://discord.gg/lifestyle",
    description: "Early access chat"
  },
];

export function Channels() {
  return (
    <section className="py-32 px-6 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Stay Connected
          </h2>
          <p className="text-lg text-neutral-500 font-light">
            Follow the journey. Join the conversation.
          </p>
        </motion.div>

        {/* Channels Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 bg-black/50 border border-neutral-800 hover:border-brand-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <channel.icon weight="fill" size={24} className="text-brand-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="text-xs text-neutral-600 uppercase tracking-wider mb-1">
                      {channel.label}
                    </div>
                    <div className="text-xl text-white font-light mb-1 group-hover:text-brand-500 transition-colors">
                      {channel.handle}
                    </div>
                    <div className="text-sm text-neutral-500 font-light">
                      {channel.description}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-neutral-700 group-hover:text-brand-500 group-hover:translate-x-1 transition-all">
                    →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm text-neutral-600 font-light">
            Launching Q4 2025 • Follow for exclusive early access opportunities
          </p>
        </motion.div>
      </div>
    </section>
  );
}

