"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft,
  ShieldCheck,
  Eye,
  Bell,
  Lock,
  CreditCard,
  QuestionMark,
  SignOut,
  CaretRight
} from "@phosphor-icons/react";
import Link from "next/link";

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: ShieldCheck, label: "Verification Status", value: "Enhanced", href: "/settings/verification", destructive: false as const },
      { icon: CreditCard, label: "Membership", value: "VIP", href: "/settings/membership", destructive: false as const },
    ]
  },
  {
    title: "Privacy & Safety",
    items: [
      { icon: Eye, label: "Privacy Controls", value: undefined, href: "/settings/privacy", destructive: false as const },
      { icon: Lock, label: "Blocked Users", value: undefined, href: "/settings/blocked", destructive: false as const },
      { icon: Bell, label: "Notifications", value: undefined, href: "/settings/notifications", destructive: false as const },
    ]
  },
  {
    title: "Support",
    items: [
      { icon: QuestionMark, label: "Help Center", value: undefined, href: "/help", destructive: false as const },
      { icon: SignOut, label: "Sign Out", value: undefined, href: "/logout", destructive: true as const },
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/profile" className="text-neutral-500 hover:text-white transition-colors">
              <ArrowLeft weight="bold" size={24} />
            </Link>
            <h1 className="text-xl font-light text-white">Settings</h1>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="max-w-md mx-auto px-6 py-6 space-y-8">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <h2 className="text-xs text-neutral-600 uppercase tracking-wider mb-3 px-4 font-light">
              {section.title}
            </h2>
            
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl overflow-hidden">
              {section.items.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-4 hover:bg-neutral-900/50 transition-colors ${
                    index !== section.items.length - 1 ? 'border-b border-neutral-800' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.destructive ? 'bg-red-500/10' : 'bg-brand-500/10'
                    }`}>
                      <item.icon 
                        weight="fill" 
                        size={20} 
                        className={item.destructive ? 'text-red-500' : 'text-brand-500'} 
                      />
                    </div>
                    <div>
                      <div className={`font-light ${item.destructive ? 'text-red-500' : 'text-white'}`}>
                        {item.label}
                      </div>
                      {item.value && (
                        <div className="text-xs text-neutral-600 font-light">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                  <CaretRight weight="bold" size={16} className="text-neutral-700" />
                </Link>
              ))}
            </div>
          </motion.div>
        ))}

        {/* App Info */}
        <div className="text-center pt-8 space-y-2">
          <p className="text-xs text-neutral-600 font-light">Version 1.0.0</p>
          <p className="text-xs text-neutral-600 font-light">© 2025 Lifestyle Platform</p>
        </div>
      </div>
    </div>
  );
}

