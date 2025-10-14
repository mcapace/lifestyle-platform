"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Compass, Users, ChatCircle, User, Globe } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const tabs = [
  { 
    name: "Discover", 
    href: "/discover", 
    icon: Compass 
  },
  { 
    name: "Community", 
    href: "/dashboard", 
    icon: Globe 
  },
  { 
    name: "Messages", 
    href: "/messages", 
    icon: ChatCircle 
  },
  { 
    name: "Profile", 
    href: "/profile", 
    icon: User 
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800">
      <div className="max-w-md mx-auto px-6 py-3">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className="relative flex flex-col items-center gap-1 py-2 px-4 group"
              >
                {/* Icon */}
                <div className="relative">
                  <Icon
                    weight={isActive ? "fill" : "regular"}
                    size={24}
                    className={`transition-colors ${
                      isActive ? "text-brand-500" : "text-neutral-500 group-hover:text-neutral-300"
                    }`}
                  />
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-light transition-colors ${
                    isActive ? "text-white" : "text-neutral-600"
                  }`}
                >
                  {tab.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
