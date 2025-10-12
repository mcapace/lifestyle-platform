"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function AppHero() {
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
        toast({ title: "You're in. We'll notify you at launch." });
        setEmail("");
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-block px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-500 text-xs font-medium tracking-wider uppercase mb-6">
              Coming Q1 2025
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
              Finally, a lifestyle app
              <br />
              <span className="text-brand-500 font-normal">that doesn&apos;t suck.</span>
            </h1>

            <p className="text-lg text-neutral-400 mb-8 leading-relaxed font-light">
              No cluttered interface. No fake profiles. No sketchy privacy.
              <br />
              <span className="text-white">Just a clean, verified community built for 2025.</span>
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              <div>
                <div className="text-3xl font-light text-white mb-1">10K+</div>
                <div className="text-sm text-neutral-600">On Waitlist</div>
              </div>
              <div>
                <div className="text-3xl font-light text-white mb-1">95%</div>
                <div className="text-sm text-neutral-600">Verified</div>
              </div>
              <div>
                <div className="text-3xl font-light text-white mb-1">100%</div>
                <div className="text-sm text-neutral-600">Encrypted</div>
              </div>
            </div>

            {/* Waitlist */}
            <div className="flex gap-3 mb-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
                placeholder="Enter your email"
                disabled={loading}
                className="flex-1 h-14 bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600 text-lg"
              />
              <Button
                onClick={handleWaitlist}
                disabled={loading}
                className="h-14 px-8 bg-brand-500 hover:bg-brand-600 text-white font-medium"
              >
                Join Waitlist
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-neutral-600">
              First 1,000 get lifetime VIP status • iOS & Android
            </p>
          </motion.div>

          {/* Right - Phone Mockups Showing App */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Multiple phones showing different screens */}
            <div className="relative flex items-center justify-center gap-4">
              {/* Phone 1 */}
              <div className="relative w-[280px] h-[560px] transform -rotate-6">
                <div className="absolute inset-0 bg-neutral-800 rounded-[3rem] shadow-2xl border-8 border-neutral-900">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-neutral-900 rounded-b-3xl z-10" />
                  <div className="absolute inset-2 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-[2.5rem] overflow-hidden">
                    <div className="p-6 h-full flex flex-col justify-between">
                      <div className="text-white text-sm font-light">Profile Screen</div>
                      <div className="space-y-3">
                        <div className="h-24 bg-neutral-800 rounded-2xl" />
                        <div className="h-16 bg-neutral-800 rounded-2xl" />
                        <div className="h-16 bg-neutral-800 rounded-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-brand-500/20 blur-2xl -z-10" />
              </div>

              {/* Phone 2 - Center */}
              <div className="relative w-[280px] h-[560px] z-10">
                <div className="absolute inset-0 bg-neutral-800 rounded-[3rem] shadow-2xl border-8 border-neutral-900">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-neutral-900 rounded-b-3xl z-10" />
                  <div className="absolute inset-2 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-[2.5rem] overflow-hidden">
                    <div className="p-6 h-full flex flex-col justify-between">
                      <div className="text-white text-sm font-light">Discover</div>
                      <div className="aspect-[3/4] bg-neutral-800 rounded-3xl mb-4" />
                      <div className="flex gap-2">
                        <div className="h-14 flex-1 bg-neutral-800 rounded-2xl" />
                        <div className="h-14 flex-1 bg-brand-500 rounded-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-brand-500/30 blur-3xl -z-10" />
              </div>

              {/* Phone 3 */}
              <div className="relative w-[280px] h-[560px] transform rotate-6">
                <div className="absolute inset-0 bg-neutral-800 rounded-[3rem] shadow-2xl border-8 border-neutral-900">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-neutral-900 rounded-b-3xl z-10" />
                  <div className="absolute inset-2 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-[2.5rem] overflow-hidden">
                    <div className="p-6 h-full flex flex-col">
                      <div className="text-white text-sm font-light mb-4">Messages</div>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="h-16 bg-neutral-800 rounded-2xl" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-brand-500/20 blur-2xl -z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

