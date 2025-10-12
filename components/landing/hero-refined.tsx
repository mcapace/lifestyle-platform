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
        title: "Please enter a valid email",
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
          title: "You're on the list",
          description: "We'll notify you when we launch.",
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
    <section className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-500 text-sm mb-6"
            >
              Launching Soon
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1] tracking-tight">
              The Lifestyle.
              <br />
              <span className="font-normal text-brand-500">Elevated.</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 mb-8 leading-relaxed max-w-lg font-light">
              A verified community where sophistication meets authentic
              connection. Your privacy. Your terms.
            </p>

            {/* Email form */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
                placeholder="Enter your email"
                disabled={loading}
                className="h-12 bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
              <Button
                onClick={handleWaitlist}
                disabled={loading}
                className="h-12 px-8 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/20"
              >
                {loading ? "Joining..." : "Join Waitlist"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm text-neutral-600">
              No credit card required • Launch exclusive benefits
            </p>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Sophisticated lifestyle imagery */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl overflow-hidden">
                {/* Hero image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545696968-1a5245650b36?w=800&q=80')] bg-cover bg-center opacity-40" />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                
                {/* Floating card element for visual interest */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-brand-500 rounded-full" />
                    <div className="w-10 h-10 bg-brand-400 rounded-full -ml-4" />
                    <div className="w-10 h-10 bg-brand-300 rounded-full -ml-4" />
                  </div>
                  <p className="text-white text-sm font-medium mb-1">2,847 verified members</p>
                  <p className="text-neutral-400 text-xs">joined this week</p>
                </motion.div>
              </div>
              
              {/* Subtle glow */}
              <div className="absolute -inset-4 bg-brand-500/5 blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
