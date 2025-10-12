"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { gsap } from "gsap";

export function HeroLifestyle() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const { toast } = useToast();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((res) => res.json())
      .then((data) => setWaitlistCount(data.count))
      .catch(() => setWaitlistCount(0));

    // GSAP animations for enhanced interactions
    const tl = gsap.timeline();
    
    tl.from(".hero-badge", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.out"
    })
    .from(".hero-title", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5")
    .from(".hero-subtitle", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.7")
    .from(".hero-form", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");

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
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Full-bleed lifestyle image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="/hero2.jpeg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Sophisticated overlay - not too dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Content - left aligned, plenty of space */}
      <motion.div style={{ opacity }} className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl">
            {/* Small, elegant badge */}
            <div className="hero-badge mb-8">
              <div className="inline-block">
                <div className="text-xs text-white/70 tracking-[0.3em] uppercase font-light">
                  Invitation Only
                </div>
              </div>
            </div>

            {/* Headline - huge, elegant */}
            <h1 className="hero-title mb-8">
              <div className="text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] tracking-tight mb-6">
                The
                <br />
                Lifestyle.
              </div>
              <div className="text-5xl md:text-6xl lg:text-7xl text-brand-500 leading-[0.9] tracking-tight italic font-light">
                Elevated.
              </div>
            </h1>

            {/* Subhead - minimal */}
            <p className="hero-subtitle text-xl md:text-2xl text-white/90 mb-12 font-light max-w-lg leading-relaxed">
              A private community for those who seek more.
            </p>

            {/* Email capture - elegant */}
            <div className="hero-form space-y-4">
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
                <MagneticButton
                  onClick={handleWaitlist}
                  disabled={loading}
                  className="h-14 px-8 bg-white hover:bg-white/90 text-black font-medium"
                >
                  {loading ? "..." : "Request Invite"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </MagneticButton>
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
            </div>
          </div>
        </div>
      </motion.div>

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

