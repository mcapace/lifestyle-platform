"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass,
  MapPin,
  Calendar,
  Users,
  Crown,
  Star,
  Heart,
  Chat,
  Lightning,
  Trophy,
  Sparkle,
  ArrowUp,
  ArrowDown,
  Globe,
  Camera,
  MusicNote,
  GameController,
  Book,
  Car,
  Airplane,
  Coffee,
  Wine,
  ShoppingBag,
  Dumbbell,
  PaintBrush,
  Video,
  Microphone,
  ShareNetwork,
  Bell,
  Plus,
  MagnifyingGlass,
  Filter,
  Fire,
  Eye,
  Clock,
  Target
} from "@phosphor-icons/react";
import { useHaptics } from "@/lib/haptics/advanced-feedback";

// ELOURA Lifestyle Community Data Structure
interface ElouraData {
  overview: {
    connections: { current: number; change: number; trend: 'up' | 'down' };
    communitiesJoined: { current: number; change: number; trend: 'up' | 'down' };
    postsCreated: { current: number; change: number; trend: 'up' | 'down' };
    interestsExplored: { current: number; change: number; trend: 'up' | 'down' };
    lifestyleScore: { current: number; change: number; trend: 'up' | 'down' };
  };
  trendingCommunities: Array<{
    id: string;
    name: string;
    category: string;
    memberCount: number;
    description: string;
    icon: string;
    isJoined: boolean;
    trendingReason: string;
  }>;
  communityFeed: Array<{
    id: string;
    user: {
      name: string;
      avatar: string;
      tier: 'curious' | 'explorer' | 'connoisseur';
      verified: boolean;
    };
    community: string;
    content: string;
    type: 'post' | 'discussion' | 'event' | 'photo';
    media?: string;
    likes: number;
    comments: number;
    timestamp: string;
    tags: string[];
  }>;
  lifestyleInsights: {
    interests: Array<{ name: string; level: number; color: string }>;
    socialActivity: number;
    explorationScore: number;
    communityEngagement: number;
    learningProgress: number;
  };
  recommendations: Array<{
    type: 'community' | 'connection' | 'event' | 'interest';
    priority: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    action: string;
    category: string;
  }>;
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress: number;
    reward: string;
    category: string;
  }>;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'community' | 'insights' | 'achievements'>('discover');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { trigger } = useHaptics();

  // Mock ELOURA lifestyle data
  const elouraData: ElouraData = {
    overview: {
      connections: { current: 89, change: 23.5, trend: 'up' },
      communitiesJoined: { current: 12, change: 8.2, trend: 'up' },
      postsCreated: { current: 34, change: 15.7, trend: 'up' },
      interestsExplored: { current: 28, change: 12.3, trend: 'up' },
      lifestyleScore: { current: 87, change: 5.4, trend: 'up' }
    },
    trendingCommunities: [
      {
        id: '1',
        name: 'Miami Lifestyle Explorers',
        category: 'Local Community',
        memberCount: 1247,
        description: 'Discover Miami\'s vibrant lifestyle scene',
        icon: '🌴',
        isJoined: true,
        trendingReason: 'Hot this week'
      },
      {
        id: '2',
        name: 'Wellness & Mindfulness',
        category: 'Health & Wellness',
        memberCount: 892,
        description: 'Journey to inner peace and self-discovery',
        icon: '🧘‍♀️',
        isJoined: false,
        trendingReason: 'Trending'
      },
      {
        id: '3',
        name: 'Creative Arts Collective',
        category: 'Arts & Culture',
        memberCount: 654,
        description: 'Express yourself through various art forms',
        icon: '🎨',
        isJoined: true,
        trendingReason: 'New discussions'
      },
      {
        id: '4',
        name: 'Foodie Adventures',
        category: 'Food & Dining',
        memberCount: 1123,
        description: 'Explore Miami\'s culinary landscape',
        icon: '🍽️',
        isJoined: false,
        trendingReason: 'Active today'
      }
    ],
    communityFeed: [
      {
        id: '1',
        user: {
          name: 'Alex M.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          tier: 'explorer',
          verified: true
        },
        community: 'Miami Lifestyle Explorers',
        content: 'Just discovered this amazing rooftop bar in Wynwood! The views are incredible and the vibe is perfect for sunset drinks. Anyone want to join next weekend?',
        type: 'post',
        media: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
        likes: 23,
        comments: 8,
        timestamp: '2 hours ago',
        tags: ['nightlife', 'wynwood', 'rooftop']
      },
      {
        id: '2',
        user: {
          name: 'Jordan K.',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          tier: 'connoisseur',
          verified: true
        },
        community: 'Wellness & Mindfulness',
        content: 'Starting a meditation challenge this week! 10 minutes daily. Who\'s in? I\'ll be sharing tips and techniques I\'ve learned over the years.',
        type: 'discussion',
        likes: 45,
        comments: 12,
        timestamp: '4 hours ago',
        tags: ['meditation', 'wellness', 'challenge']
      },
      {
        id: '3',
        user: {
          name: 'Sam R.',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          tier: 'explorer',
          verified: false
        },
        community: 'Creative Arts Collective',
        content: 'My latest painting inspired by Miami\'s Art Deco architecture. The colors and geometric patterns are so inspiring!',
        type: 'photo',
        media: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
        likes: 67,
        comments: 15,
        timestamp: '6 hours ago',
        tags: ['art', 'painting', 'art-deco']
      }
    ],
    lifestyleInsights: {
      interests: [
        { name: 'Wellness & Health', level: 85, color: 'bg-green-500' },
        { name: 'Arts & Culture', level: 72, color: 'bg-purple-500' },
        { name: 'Food & Dining', level: 68, color: 'bg-orange-500' },
        { name: 'Travel & Adventure', level: 45, color: 'bg-blue-500' },
        { name: 'Music & Entertainment', level: 38, color: 'bg-pink-500' }
      ],
      socialActivity: 78,
      explorationScore: 82,
      communityEngagement: 91,
      learningProgress: 67
    },
    recommendations: [
      {
        type: 'community',
        priority: 'high',
        title: 'Join Miami Foodie Adventures',
        description: 'Based on your interest in dining, this community has great recommendations',
        action: 'Join Community',
        category: 'Food & Dining'
      },
      {
        type: 'connection',
        priority: 'medium',
        title: 'Connect with Jordan K.',
        description: 'You both share interests in wellness and meditation',
        action: 'Send Interest',
        category: 'Wellness'
      },
      {
        type: 'interest',
        priority: 'low',
        title: 'Explore Photography',
        description: 'Many in your communities enjoy photography as a hobby',
        action: 'Learn More',
        category: 'Creative Arts'
      }
    ],
    achievements: [
      {
        id: 'community_leader',
        name: 'Community Leader',
        description: 'Become an active member in 10 communities',
        icon: '👥',
        unlocked: true,
        progress: 100,
        reward: 'Exclusive community badge',
        category: 'Community'
      },
      {
        id: 'explorer',
        name: 'Lifestyle Explorer',
        description: 'Explore 25 different interests',
        icon: '🧭',
        unlocked: true,
        progress: 100,
        reward: 'Explorer profile badge',
        category: 'Exploration'
      },
      {
        id: 'wellness_enthusiast',
        name: 'Wellness Enthusiast',
        description: 'Engage in wellness communities for 30 days',
        icon: '🌱',
        unlocked: false,
        progress: 70,
        reward: 'Wellness mentor status',
        category: 'Wellness'
      },
      {
        id: 'social_connector',
        name: 'Social Connector',
        description: 'Make 50 meaningful connections',
        icon: '🤝',
        unlocked: false,
        progress: 45,
        reward: 'Networking boost',
        category: 'Social'
      }
    ]
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    trigger('BUTTON_PRESS');
  };

  const StatCard = ({ title, value, change, trend, icon: Icon, color = "brand" }: {
    title: string;
    value: number;
    change: number;
    trend: 'up' | 'down';
    icon: any;
    color?: string;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-${color}-500/10 border border-${color}-500/20 rounded-xl flex items-center justify-center`}>
          <Icon weight="bold" size={24} className={`text-${color}-400`} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
          trend === 'up' 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {trend === 'up' ? <ArrowUp weight="bold" size={12} /> : <ArrowDown weight="bold" size={12} />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-light text-white mb-1">{value.toLocaleString()}</h3>
        <p className="text-neutral-400 text-sm">{title}</p>
      </div>
    </motion.div>
  );

  const CommunityCard = ({ community }: { community: ElouraData['trendingCommunities'][0] }) => (
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
        <span className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs">
          {community.trendingReason}
                </span>
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

  const FeedCard = ({ post }: { post: ElouraData['communityFeed'][0] }) => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6"
    >
      <div className="flex items-start gap-3 mb-4">
        <img 
          src={post.user.avatar} 
          alt={post.user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-medium">{post.user.name}</h4>
            {post.user.tier !== 'curious' && (
              <Crown weight="fill" size={14} className="text-amber-400" />
            )}
            {post.user.verified && (
              <Star weight="fill" size={14} className="text-blue-400" />
            )}
          </div>
          <p className="text-neutral-400 text-sm">{post.community} • {post.timestamp}</p>
        </div>
      </div>
      
      <p className="text-neutral-200 mb-4">{post.content}</p>
      
      {post.media && (
        <div className="mb-4">
          <img 
            src={post.media} 
            alt="Post media"
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-neutral-400 hover:text-red-400 transition-colors">
            <Heart weight="regular" size={18} />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-neutral-400 hover:text-blue-400 transition-colors">
            <Chat weight="regular" size={18} />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-neutral-400 hover:text-green-400 transition-colors">
            <ShareNetwork weight="regular" size={18} />
          </button>
        </div>

        <div className="flex gap-2">
          {post.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const RecommendationCard = ({ recommendation }: { recommendation: ElouraData['recommendations'][0] }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            recommendation.type === 'community' ? 'bg-blue-500/10 border border-blue-500/20' :
            recommendation.type === 'connection' ? 'bg-green-500/10 border border-green-500/20' :
            recommendation.type === 'event' ? 'bg-purple-500/10 border border-purple-500/20' :
            'bg-orange-500/10 border border-orange-500/20'
          }`}>
            {recommendation.type === 'community' && <Users weight="bold" size={20} className="text-blue-400" />}
            {recommendation.type === 'connection' && <Heart weight="bold" size={20} className="text-green-400" />}
            {recommendation.type === 'event' && <Calendar weight="bold" size={20} className="text-purple-400" />}
            {recommendation.type === 'interest' && <Compass weight="bold" size={20} className="text-orange-400" />}
          </div>
                <div>
            <h4 className="text-white font-medium">{recommendation.title}</h4>
            <p className="text-neutral-400 text-sm">{recommendation.description}</p>
                </div>
              </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          recommendation.priority === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
          recommendation.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
          'bg-green-500/10 text-green-400 border border-green-500/20'
        }`}>
          {recommendation.priority}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-neutral-400 text-sm">{recommendation.category}</span>
        <button className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-medium transition-colors">
          {recommendation.action}
        </button>
      </div>
    </motion.div>
  );

  const AchievementCard = ({ achievement }: { achievement: ElouraData['achievements'][0] }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`border rounded-2xl p-6 ${
        achievement.unlocked 
          ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20' 
          : 'bg-neutral-900/50 border-neutral-800'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
          {achievement.icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${achievement.unlocked ? 'text-amber-300' : 'text-white'}`}>
            {achievement.name}
          </h4>
          <p className="text-neutral-400 text-sm">{achievement.description}</p>
        </div>
        {achievement.unlocked && (
          <Trophy weight="fill" size={24} className="text-amber-400" />
        )}
      </div>
      
      {!achievement.unlocked && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-neutral-400">Progress</span>
            <span className="text-white">{achievement.progress}%</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-brand-500 to-brand-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
        </div>
      )}
      
      <div className={`text-sm ${achievement.unlocked ? 'text-amber-300' : 'text-neutral-400'}`}>
        Reward: {achievement.reward}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-light text-white">✨ ELOURA</h1>
            <div className="flex items-center gap-2">
              <Crown weight="fill" size={20} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Explorer</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-full text-sm font-medium">
              <Plus weight="bold" size={16} />
              Create Post
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-neutral-400 border border-neutral-800 rounded-full text-sm font-medium">
              <MagnifyingGlass weight="bold" size={16} />
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-20 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex gap-1">
            {[
              { id: 'discover', label: 'Discover', icon: Compass },
              { id: 'community', label: 'Community', icon: Users },
              { id: 'insights', label: 'Insights', icon: Target },
              { id: 'achievements', label: 'Achievements', icon: Trophy }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as typeof activeTab)}
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
      <div className="max-w-md mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Connections"
                  value={elouraData.overview.connections.current}
                  change={elouraData.overview.connections.change}
                  trend={elouraData.overview.connections.trend}
                  icon={Heart}
                  color="brand"
                />
                <StatCard
                  title="Communities"
                  value={elouraData.overview.communitiesJoined.current}
                  change={elouraData.overview.communitiesJoined.change}
                  trend={elouraData.overview.communitiesJoined.trend}
                  icon={Users}
                  color="blue"
                />
                <StatCard
                  title="Posts Created"
                  value={elouraData.overview.postsCreated.current}
                  change={elouraData.overview.postsCreated.change}
                  trend={elouraData.overview.postsCreated.trend}
                  icon={Chat}
                  color="green"
                />
                <StatCard
                  title="Interests Explored"
                  value={elouraData.overview.interestsExplored.current}
                  change={elouraData.overview.interestsExplored.change}
                  trend={elouraData.overview.interestsExplored.trend}
                  icon={Compass}
                  color="purple"
                />
              </div>

              {/* Lifestyle Score */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-brand-500/10 to-purple-500/10 border border-brand-500/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Sparkle weight="fill" size={24} className="text-brand-400" />
                    <div>
                      <h3 className="text-white font-medium">Lifestyle Score</h3>
                      <p className="text-neutral-400 text-sm">Your exploration journey</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-light text-brand-400 mb-1">
                      {elouraData.overview.lifestyleScore.current}
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <ArrowUp weight="bold" size={12} />
                      +{elouraData.overview.lifestyleScore.change}
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-neutral-800 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-brand-500 to-brand-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${elouraData.overview.lifestyleScore.current}%` }}
                  />
                </div>
                
                <div className="text-sm text-neutral-400">
                  {elouraData.overview.lifestyleScore.current >= 90 ? 'Exceptional explorer!' :
                   elouraData.overview.lifestyleScore.current >= 80 ? 'Active community member' :
                   elouraData.overview.lifestyleScore.current >= 70 ? 'Growing your journey' :
                   'Getting started'}
                </div>
              </motion.div>

              {/* Trending Communities */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium">🔥 Trending Communities</h3>
                  <button className="text-brand-400 text-sm">See All</button>
                </div>
                {elouraData.trendingCommunities.slice(0, 2).map((community) => (
                  <CommunityCard key={community.id} community={community} />
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-white font-medium">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white hover:bg-neutral-900 transition-colors">
                    <Globe weight="bold" size={20} className="mb-2" />
                    <div className="text-sm font-medium">Find Events</div>
                  </button>
                  <button className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white hover:bg-neutral-900 transition-colors">
                    <Users weight="bold" size={20} className="mb-2" />
                    <div className="text-sm font-medium">Join Community</div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Community Feed */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">Community Feed</h3>
                {elouraData.communityFeed.map((post) => (
                  <FeedCard key={post.id} post={post} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Recommendations */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">✨ Personalized Recommendations</h3>
                {elouraData.recommendations.map((recommendation, index) => (
                  <RecommendationCard key={index} recommendation={recommendation} />
                ))}
              </div>

              {/* Interest Breakdown */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-4">Your Interest Profile</h3>
                <div className="space-y-3">
                  {elouraData.lifestyleInsights.interests.map((interest, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white">{interest.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-neutral-800 rounded-full h-2">
                          <div 
                            className={`${interest.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${interest.level}%` }}
                          />
                        </div>
                        <span className="text-neutral-400 text-sm w-8">{interest.level}%</span>
                      </div>
                    </div>
                  ))}
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
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <Trophy weight="fill" size={48} className="text-amber-400 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Your Achievements</h3>
                <p className="text-neutral-400 text-sm">
                  Celebrate your journey and unlock new possibilities
                </p>
              </div>

              <div className="space-y-4">
                {elouraData.achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}