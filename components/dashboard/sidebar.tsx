"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageSquare, User, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/explore", label: "Explore", icon: Search },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-stone-800 bg-zinc-900 flex flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="text-2xl font-serif text-amber-200">
          [Brand]
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-amber-700 text-white"
                  : "text-stone-400 hover:bg-zinc-800 hover:text-stone-200"
              }`}
            >
              <link.icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-stone-800">
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="ghost"
          className="w-full justify-start text-stone-400 hover:text-stone-200"
        >
          <LogOut size={20} className="mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}

