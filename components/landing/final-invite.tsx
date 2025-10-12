"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function FinalInvite() {
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
        toast({ title: "Welcome. You're on the list." });
        setEmail("");
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
            Request Your
            <br />
            <span className="text-brand-500 italic">Invitation.</span>
          </h2>

          <p className="text-xl text-neutral-400 font-light mb-12">
            Limited access. Opening Q4 2025.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
              placeholder="Your email"
              disabled={loading}
              className="flex-1 h-14 bg-black/40 backdrop-blur-xl border-white/20 text-white placeholder-white/50"
            />
            <MagneticButton
              onClick={handleWaitlist}
              disabled={loading}
              className="h-14 px-10 bg-white hover:bg-white/90 text-black font-medium"
            >
              {loading ? "..." : "Request"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

