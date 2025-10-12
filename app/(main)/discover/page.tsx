"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, MapPin, CheckCircle, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";

// Mock data - replace with real API
const profiles = [
  {
    id: 1,
    name: "Sarah & Mike",
    age: "32 & 34",
    location: "Miami, FL",
    distance: "5 miles away",
    verified: true,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    bio: "Experienced couple exploring the lifestyle. Looking for like-minded connections.",
    interests: ["Lifestyle Events", "Travel", "Fine Dining"]
  },
  {
    id: 2,
    name: "Jessica",
    age: "29",
    location: "Los Angeles, CA",
    distance: "12 miles away",
    verified: true,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    bio: "Open to exploring with respectful couples. Communication is key.",
    interests: ["Yoga", "Art", "Music Festivals"]
  }
];

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (swipeDirection: number) => {
    setDirection(swipeDirection);
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Loop back
      }
    }, 200);
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-500">No more profiles</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-light text-white">Discover</h1>
            <button className="text-sm text-neutral-500 hover:text-white transition-colors">
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Card Stack */}
      <div className="max-w-md mx-auto px-6 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProfile.id}
            initial={{ scale: 0.95, opacity: 0, x: direction * 100 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.95, opacity: 0, x: direction * -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative aspect-[3/4] bg-neutral-900 rounded-3xl overflow-hidden">
              {/* Image */}
              <Image
                src={currentProfile.image}
                alt={currentProfile.name}
                fill
                className="object-cover"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Verified Badge */}
              {currentProfile.verified && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-brand-500/90 backdrop-blur-sm rounded-full">
                  <CheckCircle weight="fill" size={14} className="text-white" />
                  <span className="text-xs font-medium text-white">Verified</span>
                </div>
              )}

              {/* Profile Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2">
                  <h2 className="text-3xl font-light text-white mb-1">
                    {currentProfile.name}
                    <span className="text-xl text-neutral-300 ml-2">{currentProfile.age}</span>
                  </h2>
                  <div className="flex items-center gap-1.5 text-white/80">
                    <MapPin weight="fill" size={16} />
                    <span className="text-sm font-light">{currentProfile.distance}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-white/90 text-sm font-light leading-relaxed mb-3">
                  {currentProfile.bio}
                </p>

                {/* Interests */}
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white font-light"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-6 mt-6">
              {/* Pass */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe(-1)}
                className="w-16 h-16 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full flex items-center justify-center transition-colors group"
              >
                <X weight="bold" size={28} className="text-neutral-500 group-hover:text-white transition-colors" />
              </motion.button>

              {/* Like */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe(1)}
                className="w-20 h-20 bg-brand-500 hover:bg-brand-600 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-brand-500/20"
              >
                <Heart weight="fill" size={32} className="text-white" />
              </motion.button>

              {/* Super Like (optional) */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center transition-colors"
              >
                <Sparkle weight="fill" size={24} className="text-blue-400" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-1.5 mt-8">
          {profiles.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "w-8 bg-brand-500" 
                  : "w-1 bg-neutral-800"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

