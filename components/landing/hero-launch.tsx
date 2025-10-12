"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function HeroLaunch() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const { toast } = useToast();

  // Get real waitlist count
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

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "You're in.",
          description: "Check your email for exclusive launch updates.",
        });
        setEmail("");
        setWaitlistCount((prev) => prev + 1);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error";
      toast({ title: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Dramatic background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="relative">
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping" />
              </div>
              <span className="text-neutral-400 text-sm font-light tracking-wider uppercase">
                Launching Q1 2025
              </span>
            </div>

            {/* Headline - massive, bold statement */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] mb-8">
              It&apos;s Time for
              <br />
              <span className="text-brand-500 italic">Something Better.</span>
            </h1>

            <p className="text-2xl md:text-3xl text-neutral-400 mb-6 max-w-3xl font-light leading-relaxed">
              Adult Friend Finder hasn&apos;t changed in 20 years.
              <br />
              <span className="text-white">We&apos;re building what comes next.</span>
            </p>

            <p className="text-lg text-neutral-500 mb-12 max-w-2xl font-light">
              A verified community built for 2025. Modern design. Real privacy.
              Actual safety. No bots. No scams. No 1990s interface.
            </p>

            {/* What you get for joining early */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12 max-w-2xl">
              {[
                "First 1,000 members get lifetime VIP status",
                "Early access before public launch",
                "Founding member badge & benefits",
                "Help shape the platform",
              ].map((benefit) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <span className="text-neutral-300 font-light">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Email form */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-2xl">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
                placeholder="Enter your email"
                disabled={loading}
                className="flex-1 h-14 bg-neutral-900/50 border-neutral-800 text-white placeholder-neutral-600 text-lg focus:border-brand-500"
              />
              <Button
                onClick={handleWaitlist}
                disabled={loading}
                className="h-14 px-10 bg-brand-500 hover:bg-brand-600 text-black font-medium text-lg rounded-none"
              >
                {loading ? "JOINING..." : "JOIN WAITLIST"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Real waitlist count */}
            {waitlistCount > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-neutral-600 font-light"
              >
                <span className="text-brand-500 font-medium">{waitlistCount}</span>{" "}
                people waiting • No spam, ever
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

