"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass,
  MapPin,
  Calendar,
  Users,
  Heart,
  Chat,
  ShareNetwork,
  Star,
  Crown,
  Sparkle,
  Fire,
  Eye,
  Clock,
  Globe,
  Camera,
  MusicNote,
  GameController,
  Book,
  Car,
  Coffee,
  Wine,
  Dumbbell,
  PaintBrush,
  MagnifyingGlass,
  Filter,
  Bell,
  Plus,
  TrendingUp,
  Trophy,
  Target
} from "@phosphor-icons/react";
import Image from "next/image";

// ELOURA Lifestyle Discovery Data
interface LifestyleProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  distance: string;
  verified: boolean;
  tier: 'curious' | 'explorer' | 'connoisseur';
  avatar: string;
  bio: string;
  interests: string[];
  lifestyleScore: number;
  lastActive: string;
  communities: string[];
  lookingFor: string[];
  experienceLevel: string;
}

interface Community {
  id: string;
  name: string;
  category: string;
  memberCount: number;
  description: string;
  icon: string;
  trending: boolean;
  isJoined: boolean;
}

interface Event {
  id: string;
  title: string;
  type: string;
  location: string;
  date: string;
  attendees: number;
  image: string;
  category: string;
  price: string;
  host: {
    name: string;
    avatar: string;
    verified: boolean;
  };
}

const lifestyleProfiles: LifestyleProfile[] = [
  {
    id: '1',
    name: 'Alex M.',
    age: 32,
    location: 'Miami, FL',
    distance: '3 miles away',
    verified: true,
    tier: 'explorer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Wellness enthusiast exploring Miami\'s vibrant lifestyle scene. Love connecting with like-minded people who value growth and authentic experiences.',
    interests: ['Wellness & Health', 'Arts & Culture', 'Food & Dining', 'Travel'],
    lifestyleScore: 87,
    lastActive: 'Active now',
    communities: ['Miami Wellness', 'Art Enthusiasts', 'Foodie Adventures'],
    lookingFor: ['Friendship & Connections', 'Community & Social', 'Exploring & Curious'],
    experienceLevel: 'Intermediate'
  },
  {
    id: '2',
    name: 'Jordan K.',
    age: 28,
    location: 'Miami, FL',
    distance: '7 miles away',
    verified: true,
    tier: 'connoisseur',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    bio: 'Creative soul passionate about mindfulness and authentic connections. Always up for new adventures and meaningful conversations.',
    interests: ['Mindfulness & Meditation', 'Creative Arts', 'Music & Entertainment', 'Nature'],
    lifestyleScore: 94,
    lastActive: '2 hours ago',
    communities: ['Mindful Living', 'Creative Collective', 'Nature Lovers'],
    lookingFor: ['Friendship & Connections', 'Community & Social', 'Mentorship'],
    experienceLevel: 'Experienced'
  },
  {
    id: '3',
    name: 'Sam R.',
    age: 35,
    location: 'Miami, FL',
    distance: '12 miles away',
    verified: false,
    tier: 'curious',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'New to the lifestyle community and excited to explore. Looking for guidance and connections with respectful, experienced people.',
    interests: ['Learning & Education', 'Community & Social', 'Arts & Culture'],
    lifestyleScore: 45,
    lastActive: '1 day ago',
    communities: ['New Members', 'Learning Together'],
    lookingFor: ['Friendship & Connections', 'Mentorship/Learning', 'Exploring & Curious'],
    experienceLevel: 'New/Exploring'
  }
];

const trendingCommunities: Community[] = [
  {
    id: '1',
    name: 'Miami Lifestyle Explorers',
    category: 'Local Community',
    memberCount: 1247,
    description: 'Discover Miami\'s vibrant lifestyle scene together',
    icon: '🌴',
    trending: true,
    isJoined: false
  },
  {
    id: '2',
    name: 'Wellness & Mindfulness',
    category: 'Health & Wellness',
    memberCount: 892,
    description: 'Journey to inner peace and self-discovery',
    icon: '🧘‍♀️',
    trending: true,
    isJoined: true
  },
  {
    id: '3',
    name: 'Creative Arts Collective',
    category: 'Arts & Culture',
    memberCount: 654,
    description: 'Express yourself through various art forms',
    icon: '🎨',
    trending: false,
    isJoined: false
  }
];

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Sunset Wellness Circle',
    type: 'Community Event',
    location: 'South Beach, Miami',
    date: 'Tomorrow, 6:00 PM',
    attendees: 23,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    category: 'Wellness',
    price: 'Free',
    host: {
      name: 'Miami Wellness',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      verified: true
    }
  },
  {
    id: '2',
    title: 'Art Gallery Opening',
    type: 'Cultural Event',
    location: 'Wynwood, Miami',
    date: 'Friday, 7:00 PM',
    attendees: 45,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    category: 'Arts',
    price: '$25',
    host: {
      name: 'Creative Collective',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: true
    }
  }
];

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<'people' | 'communities' | 'events'>('people');
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [showProfileDetail, setShowProfileDetail] = useState(false);

  const currentProfile = lifestyleProfiles[currentProfileIndex];

  const handleProfileAction = (action: 'like' | 'pass' | 'super') => {
    if (currentProfileIndex < lifestyleProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
    }
  };

  const ProfileCard = ({ profile }: { profile: LifestyleProfile }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative aspect-[3/4] bg-neutral-900 rounded-3xl overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={profile.avatar}
          alt={profile.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Verified Badge */}
      {profile.verified && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/90 backdrop-blur-sm rounded-full">
          <Star weight="fill" size={14} className="text-white" />
          <span className="text-xs font-medium text-white">Verified</span>
        </div>
      )}

      {/* Tier Badge */}
      {profile.tier !== 'curious' && (
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/90 backdrop-blur-sm rounded-full">
          <Crown weight="fill" size={14} className="text-white" />
          <span className="text-xs font-medium text-white capitalize">{profile.tier}</span>
        </div>
      )}

      {/* Profile Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="mb-4">
          <h2 className="text-3xl font-light text-white mb-1">
            {profile.name}
            <span className="text-xl text-neutral-300 ml-2">{profile.age}</span>
          </h2>
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <MapPin weight="fill" size={16} />
            <span className="text-sm font-light">{profile.distance}</span>
            <span className="text-white/40">•</span>
            <span className="text-sm font-light">{profile.lastActive}</span>
          </div>
          
          {/* Lifestyle Score */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-16 bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-brand-500 to-brand-600 h-2 rounded-full"
                style={{ width: `${profile.lifestyleScore}%` }}
              />
            </div>
            <span className="text-white text-sm font-medium">{profile.lifestyleScore}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-white/90 text-sm font-light leading-relaxed mb-4">
          {profile.bio}
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white font-light"
            >
              {interest}
            </span>
          ))}
        </div>

        {/* Experience Level */}
        <div className="text-white/70 text-xs">
          Experience: <span className="text-white">{profile.experienceLevel}</span>
        </div>
      </div>
    </motion.div>
  );

  const CommunityCard = ({ community }: { community: Community }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{community.icon}</div>
          <div>
            <h4 className="text-white font-medium">{community.name}</h4>
            <p className="text-neutral-400 text-sm">{community.category}</p>
          </div>
        </div>
        {community.trending && (
          <span className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs">
            🔥 Trending
          </span>
        )}
      </div>
      
      <p className="text-neutral-300 text-sm mb-4">{community.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users weight="bold" size={16} className="text-neutral-400" />
          <span className="text-neutral-400 text-sm">{community.memberCount.toLocaleString()} members</span>
        </div>
        <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          community.isJoined 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
            : 'bg-brand-500 hover:bg-brand-600 text-white'
        }`}>
          {community.isJoined ? 'Joined' : 'Join'}
        </button>
      </div>
    </motion.div>
  );

  const EventCard = ({ event }: { event: Event }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden"
    >
      <div className="relative h-32">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
          {event.price}
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-white font-medium mb-2">{event.title}</h4>
        <p className="text-neutral-400 text-sm mb-3">{event.type}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-neutral-300 text-sm">
            <MapPin weight="bold" size={14} />
            {event.location}
          </div>
          <div className="flex items-center gap-2 text-neutral-300 text-sm">
            <Calendar weight="bold" size={14} />
            {event.date}
          </div>
          <div className="flex items-center gap-2 text-neutral-300 text-sm">
            <Users weight="bold" size={14} />
            {event.attendees} attending
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={event.host.avatar} 
              alt={event.host.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-neutral-400 text-sm">{event.host.name}</span>
            {event.host.verified && (
              <Star weight="fill" size={12} className="text-blue-400" />
            )}
          </div>
          <button className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-medium transition-colors">
            Join Event
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-light text-white">Discover</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <MagnifyingGlass weight="bold" size={20} />
              </button>
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <Filter weight="bold" size={20} />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1">
            {[
              { id: 'people', label: 'People', icon: Users },
              { id: 'communities', label: 'Communities', icon: Globe },
              { id: 'events', label: 'Events', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-500 text-white'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                <tab.icon weight="bold" size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 pt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'people' && (
            <motion.div
              key="people"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Profile Card */}
              {currentProfile && (
                <div className="relative">
                  <ProfileCard profile={currentProfile} />
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-6 mt-6">
                    {/* Pass */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleProfileAction('pass')}
                      className="w-16 h-16 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full flex items-center justify-center transition-colors group"
                    >
                      <X weight="bold" size={28} className="text-neutral-500 group-hover:text-white transition-colors" />
                    </motion.button>

                    {/* Send Interest */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleProfileAction('like')}
                      className="w-20 h-20 bg-brand-500 hover:bg-brand-600 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-brand-500/20"
                    >
                      <Heart weight="fill" size={32} className="text-white" />
                    </motion.button>

                    {/* Super Interest */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleProfileAction('super')}
                      className="w-16 h-16 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Sparkle weight="fill" size={24} className="text-blue-400" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-light text-white mb-1">89</div>
                  <div className="text-neutral-400 text-xs">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-white mb-1">12</div>
                  <div className="text-neutral-400 text-xs">Communities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-white mb-1">34</div>
                  <div className="text-neutral-400 text-xs">Posts</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'communities' && (
            <motion.div
              key="communities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium">🔥 Trending Communities</h3>
                  <button className="text-brand-400 text-sm">See All</button>
                </div>
                {trendingCommunities.map((community) => (
                  <CommunityCard key={community.id} community={community} />
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white hover:bg-neutral-900 transition-colors">
                  <Plus weight="bold" size={20} className="mb-2" />
                  <div className="text-sm font-medium">Create Community</div>
                </button>
                <button className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white hover:bg-neutral-900 transition-colors">
                  <MagnifyingGlass weight="bold" size={20} className="mb-2" />
                  <div className="text-sm font-medium">Search Communities</div>
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium">📅 Upcoming Events</h3>
                  <button className="text-brand-400 text-sm">See All</button>
                </div>
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white hover:bg-neutral-900 transition-colors">
                  <Plus weight="bold" size={20} className="mb-2" />
                  <div className="text-sm font-medium">Create Event</div>
                </button>
                <button className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white hover:bg-neutral-900 transition-colors">
                  <Calendar weight="bold" size={20} className="mb-2" />
                  <div className="text-sm font-medium">My Events</div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}