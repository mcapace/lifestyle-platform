"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft,
  ShareNetwork,
  Bell,
  Settings,
  Plus,
  Heart,
  Chat,
  ShareNetwork as Share,
  Bookmark,
  Flag,
  Crown,
  Star,
  Lock,
  Eye,
  Users,
  Calendar,
  MapPin,
  Clock,
  Tag,
  TrendingUp,
  MoreHorizontal,
  Pin,
  Lock as LockIcon,
  CheckCircle
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  tier: 'curious' | 'explorer' | 'connoisseur';
  verified: boolean;
  isModerator: boolean;
  joinedAt: string;
  lastActive: string;
}

interface CommunityPost {
  id: string;
  title?: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    tier: 'curious' | 'explorer' | 'connoisseur';
    verified: boolean;
    isModerator: boolean;
  };
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  media?: string[];
  tags: string[];
  isPinned: boolean;
  isLocked: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface CommunityDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  memberCount: number;
  postCount: number;
  icon: string;
  bannerImage?: string;
  isPrivate: boolean;
  requiresVerification: boolean;
  requiresPremium: boolean;
  isJoined: boolean;
  isModerator: boolean;
  createdAt: string;
  guidelines: string[];
  tags: string[];
  rules: string[];
  moderators: CommunityMember[];
  recentMembers: CommunityMember[];
}

// Mock data - in real app, this would come from API based on slug
const mockCommunity: CommunityDetail = {
  id: '1',
  name: 'Miami Lifestyle Explorers',
  slug: 'miami-lifestyle-explorers',
  description: 'Discover Miami\'s vibrant lifestyle scene together. Join us for events, discussions, and authentic connections in the Magic City. Whether you\'re a local or new to the area, this community welcomes everyone interested in exploring Miami\'s unique culture, nightlife, and lifestyle opportunities.',
  category: 'Local Community',
  memberCount: 1247,
  postCount: 342,
  icon: '🌴',
  bannerImage: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=300&fit=crop',
  isPrivate: false,
  requiresVerification: false,
  requiresPremium: false,
  isJoined: true,
  isModerator: false,
  createdAt: '2024-01-15',
  guidelines: ['Be respectful and kind to all members', 'Keep discussions relevant to Miami lifestyle', 'No spam or promotional content', 'Share authentic experiences and recommendations'],
  tags: ['miami', 'lifestyle', 'local', 'events', 'nightlife', 'culture'],
  rules: [
    'Respect all community members',
    'No harassment or inappropriate behavior',
    'Keep posts relevant to Miami lifestyle',
    'No spam or self-promotion',
    'Use appropriate language'
  ],
  moderators: [
    {
      id: '1',
      name: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      tier: 'connoisseur',
      verified: true,
      isModerator: true,
      joinedAt: '2024-01-15',
      lastActive: 'Active now'
    },
    {
      id: '2',
      name: 'Carlos R.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      tier: 'explorer',
      verified: true,
      isModerator: true,
      joinedAt: '2024-01-20',
      lastActive: '2 hours ago'
    }
  ],
  recentMembers: [
    {
      id: '3',
      name: 'Jessica L.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      tier: 'curious',
      verified: false,
      isModerator: false,
      joinedAt: '2024-10-14',
      lastActive: '1 hour ago'
    }
  ]
};

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    title: 'Best Rooftop Bars in Miami for Sunset Views',
    content: 'Just discovered this incredible rooftop bar in Wynwood with panoramic views of the city. The atmosphere is perfect for sunset drinks and the crowd is sophisticated yet relaxed. The cocktail menu is impressive and the service is top-notch. Highly recommend for anyone looking to experience Miami\'s nightlife at its finest. They also have a great happy hour from 5-7 PM!',
    author: {
      name: 'Alex M.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      tier: 'explorer',
      verified: true,
      isModerator: false
    },
    createdAt: '2 hours ago',
    likes: 23,
    comments: 8,
    shares: 3,
    media: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop'],
    tags: ['nightlife', 'rooftop', 'wynwood', 'sunset'],
    isPinned: true,
    isLocked: false,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '2',
    content: 'Looking for recommendations for a romantic dinner spot in Miami. Something with great ambiance and authentic cuisine. Any suggestions?',
    author: {
      name: 'Maria S.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      tier: 'curious',
      verified: false,
      isModerator: false
    },
    createdAt: '4 hours ago',
    likes: 12,
    comments: 15,
    shares: 2,
    tags: ['dining', 'romantic', 'recommendations'],
    isPinned: false,
    isLocked: false,
    isLiked: true,
    isBookmarked: false
  }
];

export default function CommunityDetailPage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'rules'>('posts');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const PostCard = ({ post }: { post: CommunityPost }) => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6"
    >
      <div className="flex items-start gap-3 mb-4">
        <img 
          src={post.author.avatar} 
          alt={post.author.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-medium">{post.author.name}</h4>
            {post.author.tier !== 'curious' && (
              <Crown weight="fill" size={14} className="text-amber-400" />
            )}
            {post.author.verified && (
              <Star weight="fill" size={14} className="text-blue-400" />
            )}
            {post.author.isModerator && (
              <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs">
                Mod
              </span>
            )}
          </div>
          <p className="text-neutral-400 text-sm">{post.createdAt}</p>
        </div>
        <div className="flex items-center gap-2">
          {post.isPinned && (
            <Pin weight="fill" size={16} className="text-amber-400" />
          )}
          {post.isLocked && (
            <LockIcon weight="bold" size={16} className="text-neutral-400" />
          )}
          <button className="p-2 text-neutral-400 hover:text-white transition-colors">
            <MoreHorizontal weight="bold" size={16} />
          </button>
        </div>
      </div>
      
      {post.title && (
        <h3 className="text-white font-medium mb-3">{post.title}</h3>
      )}
      
      <p className="text-neutral-200 mb-4 leading-relaxed">{post.content}</p>
      
      {post.media && post.media.length > 0 && (
        <div className="mb-4">
          <img 
            src={post.media[0]} 
            alt="Post media"
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded-full text-xs">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className={`flex items-center gap-2 transition-colors ${
            post.isLiked ? 'text-red-400' : 'text-neutral-400 hover:text-red-400'
          }`}>
            <Heart weight={post.isLiked ? "fill" : "regular"} size={18} />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-neutral-400 hover:text-blue-400 transition-colors">
            <Chat weight="regular" size={18} />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-neutral-400 hover:text-green-400 transition-colors">
            <Share weight="regular" size={18} />
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button className={`p-2 transition-colors ${
            post.isBookmarked ? 'text-amber-400' : 'text-neutral-400 hover:text-white'
          }`}>
            <Bookmark weight={post.isBookmarked ? "fill" : "regular"} size={16} />
          </button>
          <button className="p-2 text-neutral-400 hover:text-white transition-colors">
            <Flag weight="regular" size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const MemberCard = ({ member }: { member: CommunityMember }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4"
    >
      <div className="flex items-center gap-3">
        <img 
          src={member.avatar} 
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-medium">{member.name}</h4>
            {member.tier !== 'curious' && (
              <Crown weight="fill" size={14} className="text-amber-400" />
            )}
            {member.verified && (
              <Star weight="fill" size={14} className="text-blue-400" />
            )}
            {member.isModerator && (
              <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs">
                Mod
              </span>
            )}
          </div>
          <p className="text-neutral-400 text-sm">{member.lastActive}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-neutral-400 hover:text-white transition-colors">
            <Chat weight="regular" size={16} />
          </button>
          {member.isModerator && (
            <button className="p-2 text-neutral-400 hover:text-white transition-colors">
              <Settings weight="regular" size={16} />
            </button>
          )}
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
            <Link href="/communities" className="flex items-center gap-3">
              <ArrowLeft weight="bold" size={20} className="text-white" />
              <h1 className="text-xl font-light text-white">Community</h1>
            </Link>
            <div className="flex items-center gap-2">
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <ShareNetwork weight="bold" size={20} />
              </button>
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <Bell weight="bold" size={20} />
              </button>
              {mockCommunity.isModerator && (
                <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                  <Settings weight="bold" size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Community Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">{mockCommunity.icon}</div>
            <div className="flex-1">
              <h2 className="text-white font-medium text-lg">{mockCommunity.name}</h2>
              <p className="text-neutral-400 text-sm">{mockCommunity.category}</p>
            </div>
            <div className="flex gap-1">
              {mockCommunity.isPrivate && (
                <Lock weight="bold" size={16} className="text-white/80" />
              )}
              {mockCommunity.requiresVerification && (
                <Star weight="fill" size={16} className="text-blue-400" />
              )}
              {mockCommunity.requiresPremium && (
                <Crown weight="fill" size={16} className="text-amber-400" />
              )}
            </div>
          </div>

          {/* Join/Leave Button */}
          <button className={`w-full py-3 rounded-xl font-medium transition-colors ${
            mockCommunity.isJoined 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
              : 'bg-brand-500 hover:bg-brand-600 text-white'
          }`}>
            {mockCommunity.isJoined ? 'Joined' : 'Join Community'}
          </button>
        </div>
      </div>

      {/* Banner */}
      {mockCommunity.bannerImage && (
        <div className="relative h-48">
          <Image
            src={mockCommunity.bannerImage}
            alt={mockCommunity.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Community Stats */}
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-light text-white mb-1">{mockCommunity.memberCount.toLocaleString()}</div>
            <div className="text-neutral-400 text-xs">Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-white mb-1">{mockCommunity.postCount}</div>
            <div className="text-neutral-400 text-xs">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-white mb-1">{mockCommunity.createdAt}</div>
            <div className="text-neutral-400 text-xs">Created</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-white font-medium mb-2">About</h3>
          <p className="text-neutral-300 text-sm leading-relaxed">{mockCommunity.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {mockCommunity.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-neutral-800 text-neutral-400 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6">
          {[
            { id: 'posts', label: 'Posts', icon: Chat },
            { id: 'members', label: 'Members', icon: Users },
            { id: 'rules', label: 'Rules', icon: CheckCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-500 text-white'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                <Icon weight="bold" size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6">
        <AnimatePresence mode="wait">
          {activeTab === 'posts' && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Create Post Button */}
              {mockCommunity.isJoined && (
                <button 
                  onClick={() => setShowCreatePost(true)}
                  className="w-full p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white hover:bg-neutral-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
                      <Plus weight="bold" size={20} />
                    </div>
                    <span className="text-neutral-400">Share something with the community...</span>
                  </div>
                </button>
              )}

              {/* Posts */}
              <div className="space-y-4">
                {mockPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'members' && (
            <motion.div
              key="members"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Moderators */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">Moderators</h3>
                {mockCommunity.moderators.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>

              {/* Recent Members */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">Recent Members</h3>
                {mockCommunity.recentMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
                <button className="w-full py-3 text-brand-400 text-sm font-medium">
                  View All Members
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'rules' && (
            <motion.div
              key="rules"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-white font-medium">Community Guidelines</h3>
                <div className="space-y-3">
                  {mockCommunity.guidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-brand-500/10 border border-brand-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-brand-400 text-xs font-medium">{index + 1}</span>
                      </div>
                      <p className="text-neutral-300 text-sm">{guideline}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Rules & Policies</h3>
                <div className="space-y-3">
                  {mockCommunity.rules.map((rule, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs font-medium">!</span>
                      </div>
                      <p className="text-neutral-300 text-sm">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Post Modal (Placeholder) */}
      {showCreatePost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Create Post</h3>
              <button 
                onClick={() => setShowCreatePost(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-neutral-400 text-sm mb-6">
              Post creation feature coming soon! This will include text, images, and community-specific formatting.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCreatePost(false)}
                className="flex-1 px-4 py-2 bg-neutral-800 text-neutral-300 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowCreatePost(false)}
                className="flex-1 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-colors"
              >
                Coming Soon
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
