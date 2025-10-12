"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function FinalCTA() {
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
    <section className="py-32 px-6 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-light text-white mb-8 leading-tight">
            Be Part of
            <br />
            <span className="text-brand-500 italic">Something New.</span>
          </h2>

          <p className="text-xl text-neutral-400 font-light mb-12 max-w-2xl mx-auto">
            First 1,000 members get lifetime founding member status.
            <br />
            <span className="text-white">Spots are filling fast.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
              placeholder="Enter your email"
              disabled={loading}
              className="flex-1 h-14 bg-neutral-900 border-neutral-800 text-white text-lg"
            />
            <Button
              onClick={handleWaitlist}
              disabled={loading}
              className="h-14 px-10 bg-brand-500 hover:bg-brand-600 text-black font-medium rounded-none"
            >
              {loading ? "..." : "JOIN WAITLIST"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <p className="text-sm text-neutral-600 font-light">
            No spam. No BS. Just launch updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

