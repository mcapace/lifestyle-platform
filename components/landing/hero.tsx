"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleWaitlist() {
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
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
          title: "Success! 🎉",
          description: data.message,
        });
        setEmail("");
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-60 right-10 w-96 h-96 bg-rose-900/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-amber-900/30 border border-amber-700/50 rounded-full text-amber-200 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Launching Soon • Join the Waitlist</span>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight">
          The Lifestyle.
          <span className="block text-amber-200">Elevated.</span>
        </h1>

        <p className="text-xl md:text-2xl text-stone-300 mb-4 max-w-3xl mx-auto leading-relaxed">
          A verified community where sophistication meets authentic connection.
        </p>

        <p className="text-lg text-stone-400 mb-10">
          Your privacy. Your terms.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleWaitlist()}
            placeholder="Enter your email"
            disabled={loading}
            className="flex-1 px-6 py-6 bg-zinc-800 border-zinc-700 text-lg focus:border-amber-600"
          />
          <Button
            onClick={handleWaitlist}
            disabled={loading}
            className="px-8 py-6 bg-amber-700 hover:bg-amber-600 text-lg h-auto"
          >
            {loading ? "Joining..." : "Join Waitlist"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <p className="text-sm text-stone-500">
          No credit card required • Launch exclusive benefits for early members
        </p>
      </div>
    </section>
  );
}

