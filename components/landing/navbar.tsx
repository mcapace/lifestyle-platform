"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-900/80 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif text-amber-200">
          [Brand]
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            href="#features"
            className="text-stone-300 hover:text-amber-200 transition-colors hidden sm:block"
          >
            Features
          </Link>
          <Link
            href="#safety"
            className="text-stone-300 hover:text-amber-200 transition-colors hidden sm:block"
          >
            Safety
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="text-stone-300">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-amber-700 hover:bg-amber-600">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

