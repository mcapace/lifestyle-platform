"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function HeroBold() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
        toast({ title: "You're on the list" });
        setEmail("");
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Large background image - full bleed */}
      <div className="absolute inset-0">
        <motion.div
          style={{ rotateX, rotateY }}
          className="absolute inset-0 scale-110"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </motion.div>
      </div>

      {/* Content - Asymmetric layout */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            {/* Badge with glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative inline-block mb-8"
            >
              <div className="absolute inset-0 bg-brand-500 blur-xl opacity-30" />
              <div className="relative px-4 py-1.5 border border-brand-500/30 rounded-full text-brand-400 text-sm font-light tracking-wider">
                LAUNCHING SOON
              </div>
            </motion.div>

            {/* Headline - Large, bold, asymmetric */}
            <h1 className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] mb-4"
              >
                The
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] mb-4"
              >
                Lifestyle.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-6xl md:text-7xl lg:text-8xl text-brand-500 leading-[0.9] italic font-light"
              >
                Elevated.
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-neutral-400 mb-10 max-w-md font-light leading-relaxed"
            >
              Where sophistication meets desire. Your privacy. Your pleasure. Your rules.
            </motion.p>

            {/* Email form - minimalist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="relative"
            >
              <div className="flex items-center gap-4 bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-none p-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border-none text-white placeholder-neutral-600 focus:ring-0 text-lg"
                />
                <Button
                  onClick={handleWaitlist}
                  disabled={loading}
                  className="bg-brand-500 hover:bg-brand-600 text-black font-medium px-8 h-12 rounded-none"
                >
                  {loading ? "..." : "JOIN"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-md"
            >
              {/* Large stat card */}
              <div className="bg-neutral-900/30 backdrop-blur-2xl border border-white/10 p-12">
                <div className="text-8xl font-light text-white mb-4">10K+</div>
                <div className="text-neutral-400 text-lg font-light mb-8">
                  Verified members worldwide
                </div>
                <div className="h-1 w-20 bg-brand-500" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 -right-8 bg-brand-500 text-black px-6 py-3 text-sm font-medium"
              >
                95% Verified
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

