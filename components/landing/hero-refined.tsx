"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function HeroRefined() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleWaitlist() {
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Welcome",
          description: "You're on the list. We'll be in touch soon.",
        });
        setEmail("");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen flex items-center bg-cream-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <span className="text-sm tracking-wide font-medium text-bronze-700 dark:text-bronze-400 bg-bronze-50 dark:bg-bronze-950/30 px-5 py-2 rounded-full border border-bronze-200 dark:border-bronze-900">
              LAUNCHING SOON
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-zinc-900 dark:text-cream-50 tracking-tight">
              Where sophistication meets connection.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              A verified community built on authenticity, privacy, and genuine human connection.
            </p>
          </div>

          {/* Email Capture */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
                placeholder="Enter your email"
                disabled={loading}
                className="flex-1 h-12 px-4 text-base bg-white dark:bg-zinc-900 border-bronze-200 dark:border-bronze-900 focus:border-bronze-500 dark:focus:border-bronze-600 rounded-lg"
              />
              <Button
                onClick={handleWaitlist}
                disabled={loading}
                className="h-12 px-8 bg-bronze-700 hover:bg-bronze-800 dark:bg-bronze-600 dark:hover:bg-bronze-700 text-cream-50 font-medium rounded-lg transition-all"
              >
                {loading ? "Joining..." : "Join Waitlist"}
                <ArrowRight className="ml-2 w-4 h-4" weight="bold" />
              </Button>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-600 font-light">
              Join 1,000+ curious individuals on the waitlist
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-8 pt-4 border-t border-bronze-200 dark:border-bronze-900"
          >
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <div className="font-semibold text-zinc-900 dark:text-cream-100 mb-1">Verified only</div>
              <div className="font-light">Real people, real connections</div>
            </div>
            <div className="h-12 w-px bg-bronze-200 dark:bg-bronze-900" />
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <div className="font-semibold text-zinc-900 dark:text-cream-100 mb-1">Privacy first</div>
              <div className="font-light">Your data stays yours</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-bronze-100 via-cream-100 to-bronze-50 dark:from-bronze-950 dark:via-zinc-900 dark:to-bronze-950 shadow-2xl"
        >
          {/* Placeholder for high-quality image */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center space-y-4">
              <div className="text-bronze-600 dark:text-bronze-400 font-light text-sm tracking-widest">
                HIGH-QUALITY LIFESTYLE PHOTOGRAPHY
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm font-light max-w-xs mx-auto leading-relaxed">
                Authentic moments, real connections, sophisticated aesthetics
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
