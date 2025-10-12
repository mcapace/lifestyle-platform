"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavbarRefined() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-cream-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-bronze-200 dark:border-bronze-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif text-zinc-900 dark:text-cream-50 tracking-tight">
          Lifestyle
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-bronze-700 dark:hover:text-bronze-400 transition-colors"
          >
            Sign In
          </Link>
          <Link href="/signup">
            <Button className="bg-bronze-700 hover:bg-bronze-800 dark:bg-bronze-600 dark:hover:bg-bronze-700 text-cream-50 rounded-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
