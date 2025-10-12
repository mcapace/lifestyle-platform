"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function NavbarRefined() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-medium text-white">
          [Brand]
        </Link>

        <div className="flex gap-8 items-center">
          <Link
            href="#features"
            className="text-sm text-neutral-400 hover:text-white transition-colors hidden sm:block"
          >
            Features
          </Link>
          <Link
            href="#safety"
            className="text-sm text-neutral-400 hover:text-white transition-colors hidden sm:block"
          >
            Safety
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="text-neutral-400 hover:text-white">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-brand-500 hover:bg-brand-600 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
