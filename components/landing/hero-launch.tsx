"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export function HeroLaunch() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Image - Full Bleed with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="/images/AdobeStock_216584147.jpeg"
          alt="Hero"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dramatic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Small badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block mb-6"
            >
              <div className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                <span className="text-white/90 text-xs font-light tracking-widest uppercase">
                  Launching 2025
                </span>
              </div>
            </motion.div>

            {/* Main headline - MASSIVE */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8"
            >
              <div className="text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] mb-4">
                The
              </div>
              <div className="text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] mb-4">
                Lifestyle.
              </div>
              <div className="text-6xl md:text-7xl lg:text-8xl text-brand-500 leading-[0.9] italic font-light">
                Elevated.
              </div>
            </motion.h1>

            {/* Single line of copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-12 font-light"
            >
              The verified community built for 2025.
            </motion.p>

            {/* Email form - clean */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex gap-3"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
                placeholder="Enter your email"
                disabled={loading}
                className="flex-1 h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/60 text-lg focus:bg-white/15 focus:border-white/40"
              />
              <Button
                onClick={handleWaitlist}
                disabled={loading}
                className="h-14 px-8 bg-white hover:bg-white/90 text-black font-medium rounded-none"
              >
                JOIN
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
