"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera,
  Crown,
  Star,
  MapPin, 
  Calendar,
  Heart,
  Users,
  Sparkle,
  Shield,
  Gear,
  Share,
  Plus,
  Trophy,
  Fire,
  Globe,
  CheckCircle,
  Lock,
  Eye,
  Pen,
  Image as ImageIcon,
  MusicNotes,
  Airplane,
  Coffee,
  Barbell,
  Book,
  Palette,
  Wine,
  Briefcase,
  Lightning,
  Medal
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  photos: string[];
  tier: 'curious' | 'explorer' | 'connoisseur';
  verified: boolean;
  lifestyleScore: number;
  interests: string[];
  stats: {
    connections: number;
    eventsAttended: number;
    communitiesJoined: number;
    postsCreated: number;
  };
  achievements: Array<{
    id: string;
    name: string;
    icon: string;
    unlocked: boolean;
    date?: string;
  }>;
  preferences: {
    lookingFor: string[];
    experienceLevel: string;
    lifestyleGoals: string[];
  };
}

const mockProfile: UserProfile = {
  id: '1',
  name: 'Alex Morgan',
  age: 28,
  location: 'Miami, FL',
  bio: 'Lifestyle enthusiast exploring Miami\'s vibrant culture. Passionate about wellness, art, and meaningful connections. Always seeking authentic experiences and like-minded individuals.',
  photos: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop&crop=face'
  ],
  tier: 'explorer',
  verified: true,
  lifestyleScore: 87,
  interests: ['wellness', 'travel', 'arts', 'food', 'music'],
  stats: {
    connections: 156,
    eventsAttended: 47,
    communitiesJoined: 8,
    postsCreated: 23
  },
  achievements: [
    { id: 'early_adopter', name: 'Early Adopter', icon: '🌟', unlocked: true, date: '2024-01-15' },
    { id: 'community_leader', name: 'Community Leader', icon: '👑', unlocked: true, date: '2024-03-20' },
    { id: 'lifestyle_explorer', name: 'Lifestyle Explorer', icon: '🗺️', unlocked: true, date: '2024-02-10' },
    { id: 'verified_elite', name: 'Verified Elite', icon: '✅', unlocked: false }
  ],
  preferences: {
    lookingFor: ['Friendship', 'Networking', 'Events', 'Community'],
    experienceLevel: 'Active Explorer',
    lifestyleGoals: ['Make meaningful connections', 'Explore new experiences', 'Join lifestyle communities']
  }
};

const INTEREST_CONFIG: Record<string, { icon: any; color: string; label: string }> = {
  wellness: { icon: Barbell, color: 'green', label: 'Wellness & Fitness' },
  travel: { icon: Airplane, color: 'blue', label: 'Travel & Adventure' },
  arts: { icon: Palette, color: 'purple', label: 'Arts & Culture' },
  food: { icon: Wine, color: 'amber', label: 'Food & Wine' },
  music: { icon: MusicNotes, color: 'pink', label: 'Music & Events' },
  nightlife: { icon: Coffee, color: 'orange', label: 'Nightlife' },
  reading: { icon: Book, color: 'indigo', label: 'Reading & Learning' },
  business: { icon: Briefcase, color: 'slate', label: 'Business & Networking' }
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'about' | 'photos' | 'achievements'>('about');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'connoisseur':
        return { name: 'Connoisseur', color: 'amber', icon: Crown };
      case 'explorer':
        return { name: 'Explorer', color: 'brand', icon: Sparkle };
      default:
        return { name: 'Curious', color: 'neutral', icon: Globe };
    }
  };

  const tierInfo = getTierInfo(mockProfile.tier);
  const TierIcon = tierInfo.icon;

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-light text-white">Profile</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <Share weight="bold" size={20} />
              </button>
            <Link href="/settings" className="p-2 text-neutral-400 hover:text-white transition-colors">
              <Gear weight="bold" size={20} />
            </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Photo */}
      <div className="relative">
        <div className="relative h-96">
          <Image
            src={mockProfile.photos[selectedPhotoIndex]}
            alt={mockProfile.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Photo Navigation */}
          <div className="absolute top-4 left-0 right-0 px-6">
            <div className="flex gap-1">
              {mockProfile.photos.map((_, index) => (
              <button
                key={index}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className={`flex-1 h-1 rounded-full transition-all ${
                    index === selectedPhotoIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          </div>

          {/* Verification Badge */}
          {mockProfile.verified && (
            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/90 backdrop-blur-sm rounded-full">
              <CheckCircle weight="fill" size={16} className="text-white" />
              <span className="text-white text-xs font-medium">Verified</span>
            </div>
          )}

          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-white text-3xl font-light">{mockProfile.name}</h2>
                  <span className="text-white/80 text-2xl font-light">{mockProfile.age}</span>
                </div>
                <div className="flex items-center gap-4 text-white/80 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin weight="fill" size={16} />
                    <span className="text-sm">{mockProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TierIcon weight="fill" size={16} className={`text-${tierInfo.color}-400`} />
                    <span className="text-sm">{tierInfo.name}</span>
          </div>
        </div>

                {/* Lifestyle Score */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/20 backdrop-blur-sm border border-brand-500/30 rounded-full">
                  <Star weight="fill" size={16} className="text-brand-400" />
                  <span className="text-white text-sm font-medium">Lifestyle Score: {mockProfile.lifestyleScore}</span>
                </div>
              </div>

              <button className="p-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-colors">
                <Pen weight="bold" size={20} />
              </button>
            </div>
          </div>
        </div>
              </div>

      {/* Stats Bar */}
      <div className="bg-neutral-900/50 border-y border-neutral-800 py-4">
        <div className="max-w-md mx-auto px-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-white text-xl font-light mb-1">{mockProfile.stats.connections}</div>
              <div className="text-neutral-400 text-xs">Connections</div>
            </div>
            <div>
              <div className="text-white text-xl font-light mb-1">{mockProfile.stats.eventsAttended}</div>
              <div className="text-neutral-400 text-xs">Events</div>
              </div>
            <div>
              <div className="text-white text-xl font-light mb-1">{mockProfile.stats.communitiesJoined}</div>
              <div className="text-neutral-400 text-xs">Communities</div>
            </div>
            <div>
              <div className="text-white text-xl font-light mb-1">{mockProfile.stats.postsCreated}</div>
              <div className="text-neutral-400 text-xs">Posts</div>
            </div>
          </div>
        </div>
        </div>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex gap-1">
            {[
              { id: 'about', label: 'About' },
              { id: 'photos', label: 'Photos' },
              { id: 'achievements', label: 'Achievements' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-light transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-500 text-white'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Bio */}
              <div>
                <h3 className="text-white font-medium mb-3">About Me</h3>
                <p className="text-neutral-300 leading-relaxed">{mockProfile.bio}</p>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-white font-medium mb-3">My Interests</h3>
                <div className="grid grid-cols-2 gap-3">
                  {mockProfile.interests.map((interestId) => {
                    const config = INTEREST_CONFIG[interestId];
                    if (!config) return null;
                    const Icon = config.icon;
                    return (
                      <div
                        key={interestId}
                        className={`flex items-center gap-3 p-3 bg-${config.color}-500/10 border border-${config.color}-500/20 rounded-xl`}
                      >
                        <Icon weight="bold" size={20} className={`text-${config.color}-400`} />
                        <span className="text-white text-sm">{config.label}</span>
                      </div>
                    );
                  })}
          </div>
        </div>

        {/* Looking For */}
        <div>
                <h3 className="text-white font-medium mb-3">Looking For</h3>
          <div className="flex flex-wrap gap-2">
                  {mockProfile.preferences.lookingFor.map((item) => (
              <span
                key={item}
                      className="px-3 py-1.5 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

              {/* Lifestyle Goals */}
              <div>
                <h3 className="text-white font-medium mb-3">Lifestyle Goals</h3>
                <div className="space-y-2">
                  {mockProfile.preferences.lifestyleGoals.map((goal, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Sparkle weight="fill" size={16} className="text-brand-400" />
                      <span className="text-neutral-300 text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h3 className="text-white font-medium mb-3">Experience Level</h3>
                <div className="flex items-center gap-3 p-4 bg-neutral-800 border border-neutral-700 rounded-xl">
                  <Lightning weight="fill" size={24} className="text-amber-400" />
                  <div>
                    <div className="text-white font-medium">{mockProfile.preferences.experienceLevel}</div>
                    <div className="text-neutral-400 text-sm">Active in the lifestyle community</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">My Photos</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm transition-colors">
                  <Plus weight="bold" size={16} />
                  Add Photos
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {mockProfile.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => {
                      setSelectedPhotoIndex(index);
                      setActiveTab('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <Image
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {index === 0 && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-brand-500 rounded-full text-white text-xs font-medium">
                        Primary
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 mt-6">
                <div className="flex items-start gap-3">
                  <ImageIcon weight="bold" size={20} className="text-brand-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1">Photo Tips</h4>
                    <ul className="text-neutral-400 text-xs space-y-1">
                      <li>• Show your authentic self and lifestyle</li>
                      <li>• Include variety in your photos</li>
                      <li>• Recent photos perform better</li>
                      <li>• Verified photos increase trust</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <Trophy weight="fill" size={48} className="text-amber-400 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Your Achievements</h3>
                <p className="text-neutral-400 text-sm">
                  {mockProfile.achievements.filter(a => a.unlocked).length} of {mockProfile.achievements.length} unlocked
                </p>
              </div>

              <div className="space-y-3">
                {mockProfile.achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`border rounded-2xl p-6 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20'
                        : 'bg-neutral-900/50 border-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${achievement.unlocked ? 'text-amber-300' : 'text-white'}`}>
                          {achievement.name}
                        </h4>
                        {achievement.unlocked && achievement.date && (
                          <p className="text-neutral-400 text-sm mt-1">
                            Unlocked on {achievement.date}
                          </p>
                        )}
                        {!achievement.unlocked && (
                          <p className="text-neutral-500 text-sm mt-1">
                            Keep exploring to unlock this achievement
                          </p>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <Medal weight="fill" size={24} className="text-amber-400" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 mt-6">
                <div className="flex items-start gap-3">
                  <Sparkle weight="fill" size={20} className="text-brand-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-brand-400 font-medium text-sm mb-1">Earn More Achievements</h4>
                    <p className="text-neutral-300 text-xs">
                      Join communities, attend events, and engage with others to unlock exclusive achievements and rewards!
                    </p>
                  </div>
                </div>
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
