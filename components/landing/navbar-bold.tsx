"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight } from "lucide-react";

export function NavbarBold() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-light text-white tracking-tight hover:text-brand-500 transition-colors"
        >
          The Lifestyle.<span className="text-brand-500 italic">Elevated.</span>
        </Link>

        {/* Right Side - CTA Only */}
        <div className="flex gap-4 items-center">
          <Link 
            href="#faq" 
            className="hidden sm:block text-sm text-neutral-400 hover:text-white transition-colors font-light"
          >
            FAQ
          </Link>
          <MagneticButton
            onClick={() => {
              const earlyAccessSection = document.querySelector('#early-access');
              earlyAccessSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="h-10 px-6 bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm"
          >
            Request Invite
            <ArrowRight className="ml-2 w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
}
