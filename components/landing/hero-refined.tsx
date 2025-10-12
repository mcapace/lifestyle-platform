"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
          title: "Welcome!",
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
    <section className="relative min-h-screen flex items-center bg-stone-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
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
            <span className="text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-4 py-2 rounded-full">
              Launching Soon
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-zinc-900 dark:text-white">
              Where sophistication meets connection.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
                className="flex-1 h-12 px-4 text-base bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:border-amber-600 dark:focus:border-amber-500"
              />
              <Button
                onClick={handleWaitlist}
                disabled={loading}
                className="h-12 px-6 bg-amber-600 hover:bg-amber-700 text-white font-medium"
              >
                {loading ? "Joining..." : "Join Waitlist"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-600">
              Join 1,000+ curious individuals on the waitlist
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6 pt-4"
          >
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <div className="font-semibold text-zinc-900 dark:text-white">Verified only</div>
              <div>Real people, real connections</div>
            </div>
            <div className="h-12 w-px bg-zinc-300 dark:bg-zinc-700" />
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <div className="font-semibold text-zinc-900 dark:text-white">Privacy first</div>
              <div>Your data stays yours</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-950 dark:to-rose-950"
        >
          {/* Placeholder for high-quality image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 p-8">
              <div className="w-24 h-24 mx-auto bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-12 h-12 text-amber-700 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 max-w-xs mx-auto">
                Add high-quality lifestyle photography here
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

