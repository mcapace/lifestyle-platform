"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CheckCircle } from "@phosphor-icons/react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const perks = [
  "Lifetime founding member status",
  "Exclusive launch pricing (50% off)",
  "Priority verification queue",
  "Direct line to the founding team",
  "Shape the platform's future",
];

export function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleWaitlist() {
    if (!email || !email.includes("@")) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast({ title: "Welcome to the founding circle." });
        setEmail("");
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="early-access" className="py-32 px-6 bg-neutral-950">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Perks */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <div className="inline-block px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-500 text-xs font-medium tracking-wider uppercase mb-4">
                Founding Members
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-4 leading-tight">
                Join the
                <br />
                <span className="text-brand-500 italic">first 1,000.</span>
              </h2>
              <p className="text-lg text-neutral-400 font-light">
                Early access comes with privileges.
              </p>
            </div>

            <div className="space-y-4">
              {perks.map((perk, index) => (
                <motion.div
                  key={perk}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <CheckCircle weight="fill" size={24} className="text-brand-500" />
                  </div>
                  <span className="text-base text-neutral-300 font-light">
                    {perk}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-black/50 border border-neutral-800 p-8 md:p-12"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-light text-white mb-2">
                Request Early Access
              </h3>
              <p className="text-sm text-neutral-500 font-light">
                Limited to 1,000 founding members
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-neutral-600 uppercase tracking-wider mb-2 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
                  placeholder="you@example.com"
                  disabled={loading}
                  className="h-12 bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600"
                />
              </div>

              <MagneticButton
                onClick={handleWaitlist}
                disabled={loading}
                className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-medium"
              >
                {loading ? "Submitting..." : "Request Invitation"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </MagneticButton>

              <p className="text-xs text-neutral-600 font-light text-center">
                We&apos;ll notify you when we launch in Q4 2025
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

