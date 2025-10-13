"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlass, CheckCircle, Heart, ChatCircle, Sparkle, SlidersHorizontal } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { TierBadge } from "@/components/ui/tier-badge";
import { NoMatchesEmpty } from "@/components/ui/empty-state";
import { UnlimitedSwipesPrompt } from "@/components/ui/upgrade-prompt";

// Mock matches data
const matches = [
  {
    id: 1,
    name: "Sarah & Mike",
    age: "32 & 34",
    location: "Miami, FL",
    distance: "5 miles",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    verified: true,
    tier: "VIP" as const,
    compatibility: 94,
    matchedAt: "2 days ago",
    lastMessage: "We'd love to meet for drinks!",
    online: true,
    interests: ["Events", "Travel", "Fine Dining"]
  },
  {
    id: 2,
    name: "Jessica",
    age: "29",
    location: "Fort Lauderdale, FL",
    distance: "12 miles",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    verified: true,
    tier: "PREMIUM" as const,
    compatibility: 88,
    matchedAt: "5 days ago",
    lastMessage: "Thanks for connecting 😊",
    online: false,
    interests: ["Yoga", "Music", "Art"]
  },
  {
    id: 3,
    name: "Alex & Jordan",
    age: "28 & 30",
    location: "Miami Beach, FL",
    distance: "8 miles",
    avatar: "https://images.unsplash.com/photo-1606122017369-d782bbb78f32?w=400&q=80",
    verified: true,
    tier: "VIP" as const,
    compatibility: 91,
    matchedAt: "1 week ago",
    lastMessage: "Looking forward to the event!",
    online: true,
    interests: ["Beach", "Lifestyle Events", "Wine"]
  },
  {
    id: 4,
    name: "Mia",
    age: "31",
    location: "Brickell, Miami",
    distance: "6 miles",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    verified: true,
    compatibility: 85,
    matchedAt: "3 days ago",
    lastMessage: null, // Haven't messaged yet
    online: false,
    interests: ["Fitness", "Travel", "Dining"]
  }
];

export default function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "compatibility" | "distance">("compatibility");

  const sortedMatches = [...matches].sort((a, b) => {
    if (sortBy === "compatibility") return b.compatibility - a.compatibility;
    if (sortBy === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
    return 0; // recent (already sorted)
  });

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light text-white">Matches</h1>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <SlidersHorizontal weight="bold" size={24} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <MagnifyingGlass 
              weight="bold" 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search matches..."
              className="w-full h-10 pl-10 pr-4 bg-neutral-900 border border-neutral-800 rounded-full text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-brand-500/50 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="flex gap-2 overflow-x-auto pb-2"
            >
              <button
                onClick={() => setSortBy("compatibility")}
                className={`px-4 py-2 rounded-full text-xs font-light transition-all whitespace-nowrap ${
                  sortBy === "compatibility"
                    ? "bg-brand-500 text-white"
                    : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                }`}
              >
                Best Match
              </button>
              <button
                onClick={() => setSortBy("recent")}
                className={`px-4 py-2 rounded-full text-xs font-light transition-all whitespace-nowrap ${
                  sortBy === "recent"
                    ? "bg-brand-500 text-white"
                    : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                }`}
              >
                Recent
              </button>
              <button
                onClick={() => setSortBy("distance")}
                className={`px-4 py-2 rounded-full text-xs font-light transition-all whitespace-nowrap ${
                  sortBy === "distance"
                    ? "bg-brand-500 text-white"
                    : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                }`}
              >
                Nearby
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Matches Grid */}
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {sortedMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/matches/${match.id}`} className="block group">
                {/* Card */}
                <div className="relative aspect-[3/4] bg-neutral-900 rounded-2xl overflow-hidden">
                  {/* Image */}
                  <Image
                    src={match.avatar}
                    alt={match.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  {/* Online Status */}
                  {match.online && (
                    <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                  )}

                  {/* Compatibility Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-brand-500/90 backdrop-blur-sm rounded-full">
                    <Sparkle weight="fill" size={12} className="text-white" />
                    <span className="text-xs font-medium text-white">{match.compatibility}%</span>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="text-white font-light text-sm truncate">
                        {match.name}
                      </h3>
                      {match.verified && (
                        <CheckCircle weight="fill" size={14} className="text-brand-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-white/70 font-light">{match.age}</p>
                    <p className="text-xs text-white/60 font-light">{match.distance} away</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 h-10 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full flex items-center justify-center gap-2 transition-colors group"
                  >
                    <Heart weight="fill" size={16} className="text-brand-500" />
                    <span className="text-xs text-neutral-400 group-hover:text-white font-light">Like</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/messages/${match.id}`;
                    }}
                    className="flex-1 h-10 bg-brand-500 hover:bg-brand-600 rounded-full flex items-center justify-center gap-2 transition-colors"
                  >
                    <ChatCircle weight="fill" size={16} className="text-white" />
                    <span className="text-xs text-white font-light">Message</span>
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {matches.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Heart weight="thin" size={64} className="text-neutral-800 mb-4" />
            <p className="text-neutral-500 font-light text-center">
              No matches yet.
              <br />
              Keep swiping to find connections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


