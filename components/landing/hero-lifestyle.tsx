"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export function HeroLifestyle() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((res) => res.json())
      .then((data) => setWaitlistCount(data.count))
      .catch(() => setWaitlistCount(0));
  }, []);

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
        toast({ title: "Welcome. You're in." });
        setEmail("");
        setWaitlistCount((prev) => prev + 1);
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-bleed lifestyle image */}
      <div className="absolute inset-0">
        <Image
          src="/images/AdobeStock_216584147.jpeg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Sophisticated overlay - not too dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content - left aligned, plenty of space */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl">
            {/* Small, elegant badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-block">
                <div className="text-xs text-white/70 tracking-[0.3em] uppercase font-light">
                  Invitation Only
                </div>
              </div>
            </motion.div>

            {/* Headline - huge, elegant */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8"
            >
              <div className="text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] tracking-tight mb-6">
                The
                <br />
                Lifestyle.
              </div>
              <div className="text-5xl md:text-6xl lg:text-7xl text-brand-500 leading-[0.9] tracking-tight italic font-light">
                Elevated.
              </div>
            </motion.h1>

            {/* Subhead - minimal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-lg leading-relaxed"
            >
              A private community for those who seek more.
            </motion.p>

            {/* Email capture - elegant */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
                  placeholder="Your email"
                  disabled={loading}
                  className="flex-1 h-14 bg-black/30 backdrop-blur-xl border-white/20 text-white text-base placeholder-white/50 focus:bg-black/40 focus:border-white/40"
                />
                <Button
                  onClick={handleWaitlist}
                  disabled={loading}
                  className="h-14 px-8 bg-white hover:bg-white/90 text-black font-medium"
                >
                  {loading ? "..." : "Request Invite"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Waitlist count - social proof */}
              {waitlistCount > 0 && (
                <div className="flex items-center gap-4 text-white/60 text-sm font-light">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-brand-500 rounded-full border-2 border-black" />
                    <div className="w-8 h-8 bg-brand-400 rounded-full border-2 border-black" />
                    <div className="w-8 h-8 bg-brand-300 rounded-full border-2 border-black" />
                  </div>
                  <span>{waitlistCount.toLocaleString()} waiting for access</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Minimal scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40 text-xs tracking-widest uppercase"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

