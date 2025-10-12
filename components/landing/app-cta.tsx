"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function AppCTA() {
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
        toast({ title: "You're in. Check your email." });
        setEmail("");
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-32 px-6 bg-neutral-950">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Join the Waitlist
          </h2>
          <p className="text-lg text-neutral-400 mb-10 font-light">
            First 1,000 members get lifetime VIP status.
            <br />
            <span className="text-white">Be part of something better.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
              placeholder="Enter your email"
              disabled={loading}
              className="flex-1 h-14 bg-neutral-900 border-neutral-800 text-white text-lg placeholder-neutral-600"
            />
            <Button
              onClick={handleWaitlist}
              disabled={loading}
              className="h-14 px-10 bg-brand-500 hover:bg-brand-600 text-white font-medium text-lg"
            >
              {loading ? "..." : "JOIN"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

