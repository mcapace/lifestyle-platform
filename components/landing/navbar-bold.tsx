"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function NavbarBold() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 mix-blend-difference"
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-light text-white tracking-wider">
          [BRAND]
        </Link>

        <div className="flex gap-8 items-center">
          <Link
            href="#"
            className="text-sm text-white/60 hover:text-white transition-colors font-light tracking-wide"
          >
            FEATURES
          </Link>
          <Link
            href="#"
            className="text-sm text-white/60 hover:text-white transition-colors font-light tracking-wide"
          >
            SAFETY
          </Link>
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white font-light"
            >
              SIGN IN
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-brand-500 hover:bg-brand-600 text-black font-medium rounded-none px-8">
              GET STARTED
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

