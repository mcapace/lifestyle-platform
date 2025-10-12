"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavbarRefined() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif text-zinc-900 dark:text-white">
          Lifestyle
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link href="/signup">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

