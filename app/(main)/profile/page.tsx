"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  CheckCircle, 
  Gear, 
  Eye, 
  Heart,
  ChatCircle,
  Calendar,
  Users
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

// Mock profile data
const profileData = {
  name: "You & Partner",
  age: "32 & 34",
  location: "Miami, FL",
  verified: true,
  verificationLevel: "Enhanced",
  memberSince: "October 2024",
  photos: [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
    "https://images.unsplash.com/photo-1470145318698-cb03732f5ddf?w=800&q=80",
  ],
  bio: "Experienced couple in the lifestyle. We value communication, respect, and genuine connections. Looking for like-minded couples for friendship and more.",
  interests: ["Travel", "Fine Dining", "Lifestyle Events", "Wine Tasting", "Beach Clubs"],
  lookingFor: ["Couples", "Verified Members", "Ages 28-40"],
  stats: {
    connections: 24,
    events: 8,
    matches: 12
  }
};

export default function ProfilePage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-light text-white">Profile</h1>
            <Link 
              href="/settings"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <Gear weight="bold" size={24} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Photo Gallery */}
        <div className="relative aspect-[3/4] bg-neutral-900 rounded-3xl overflow-hidden">
          <Image
            src={profileData.photos[activePhotoIndex]}
            alt="Profile"
            fill
            className="object-cover"
          />
          
          {/* Photo Navigation Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
            {profileData.photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePhotoIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === activePhotoIndex 
                    ? "w-6 bg-white" 
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Verified Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-brand-500/90 backdrop-blur-sm rounded-full">
            <CheckCircle weight="fill" size={14} className="text-white" />
            <span className="text-xs font-medium text-white">{profileData.verificationLevel}</span>
          </div>
        </div>

        {/* Profile Info */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-light text-white mb-1">
                {profileData.name}
                <span className="text-lg text-neutral-400 ml-2">{profileData.age}</span>
              </h2>
              <div className="flex items-center gap-1.5 text-neutral-500">
                <MapPin weight="fill" size={14} />
                <span className="text-sm font-light">{profileData.location}</span>
              </div>
            </div>
            <Link
              href="/profile/edit"
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full text-white text-sm font-light transition-colors"
            >
              Edit Profile
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-light text-white mb-1">
                {profileData.stats.connections}
              </div>
              <div className="text-xs text-neutral-600 font-light">Connections</div>
            </div>
            <div className="text-center border-x border-neutral-800">
              <div className="text-2xl font-light text-white mb-1">
                {profileData.stats.matches}
              </div>
              <div className="text-xs text-neutral-600 font-light">Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-white mb-1">
                {profileData.stats.events}
              </div>
              <div className="text-xs text-neutral-600 font-light">Events</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h3 className="text-sm text-neutral-600 uppercase tracking-wider mb-3 font-light">
            About
          </h3>
          <p className="text-white font-light leading-relaxed">
            {profileData.bio}
          </p>
        </div>

        {/* Interests */}
        <div>
          <h3 className="text-sm text-neutral-600 uppercase tracking-wider mb-3 font-light">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {profileData.interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-white font-light"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Looking For */}
        <div>
          <h3 className="text-sm text-neutral-600 uppercase tracking-wider mb-3 font-light">
            Looking For
          </h3>
          <div className="flex flex-wrap gap-2">
            {profileData.lookingFor.map((item) => (
              <span
                key={item}
                className="px-4 py-2 bg-brand-500/10 border border-brand-500/30 rounded-full text-sm text-brand-500 font-light"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Member Since */}
        <div className="text-center py-4 text-xs text-neutral-600 font-light">
          Member since {profileData.memberSince}
        </div>
      </div>
    </div>
  );
}

