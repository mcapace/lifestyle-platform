"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export function HeroVisual() {
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
        toast({ title: "You're in." });
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
      {/* Full screen image */}
      <div className="absolute inset-0">
        <Image
          src="/images/AdobeStock_216584147.jpeg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content - Bottom left */}
      <div className="absolute bottom-20 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-3xl"
          >
            {/* Massive headline */}
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-light text-white leading-[0.85] mb-8">
              The
              <br />
              Lifestyle.
              <br />
              <span className="text-brand-500 italic">Elevated.</span>
            </h1>

            {/* Simple email capture */}
            <div className="flex gap-3 max-w-xl">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="h-16 bg-white/10 backdrop-blur-xl border-white/20 text-white text-lg placeholder-white/60"
              />
              <Button
                onClick={handleWaitlist}
                disabled={loading}
                className="h-16 px-10 bg-white hover:bg-white/90 text-black font-medium text-lg"
              >
                JOIN
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

