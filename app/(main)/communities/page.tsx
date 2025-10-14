"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlass,
  Funnel,
  Plus,
  Users,
  Chat,
  Calendar,
  Star,
  Crown,
  Fire,
  Globe,
  Heart,
  ShareNetwork,
  Bell,
  Settings,
  Lock,
  Eye,
  TrendingUp,
  MapPin,
  Clock,
  Tag,
  Bookmark,
  Flag
} from "@phosphor-icons/react";
import Image from "next/image";

// ELOURA Community Data Structure
interface Community {
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
  trending: boolean;
  isJoined: boolean;
  isModerator: boolean;
  createdAt: string;
  guidelines: string[];
  tags: string[];
  recentActivity: {
    type: 'post' | 'comment' | 'join';
    user: string;
    content: string;
    timestamp: string;
  }[];
}

interface CommunityPost {
  id: string;
  communityId: string;
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
}

const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Miami Lifestyle Explorers',
    slug: 'miami-lifestyle-explorers',
    description: 'Discover Miami\'s vibrant lifestyle scene together. Join us for events, discussions, and authentic connections in the Magic City.',
    category: 'Local Community',
    memberCount: 1247,
    postCount: 342,
    icon: '🌴',
    bannerImage: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=300&fit=crop',
    isPrivate: false,
    requiresVerification: false,
    requiresPremium: false,
    trending: true,
    isJoined: true,
    isModerator: false,
    createdAt: '2024-01-15',
    guidelines: ['Be respectful', 'No spam', 'Keep discussions relevant'],
    tags: ['miami', 'lifestyle', 'local', 'events'],
    recentActivity: [
      { type: 'post', user: 'Alex M.', content: 'Just discovered this amazing rooftop bar in Wynwood!', timestamp: '2 hours ago' },
      { type: 'join', user: 'Sarah K.', content: 'joined the community', timestamp: '4 hours ago' },
      { type: 'comment', user: 'Jordan L.', content: 'commented on "Best sunset spots in Miami"', timestamp: '6 hours ago' }
    ]
  },
  {
    id: '2',
    name: 'Wellness & Mindfulness',
    slug: 'wellness-mindfulness',
    description: 'Journey to inner peace and self-discovery. Share meditation tips, wellness practices, and support each other\'s growth.',
    category: 'Health & Wellness',
    memberCount: 892,
    postCount: 156,
    icon: '🧘‍♀️',
    bannerImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop',
    isPrivate: false,
    requiresVerification: true,
    requiresPremium: false,
    trending: true,
    isJoined: false,
    isModerator: false,
    createdAt: '2024-02-01',
    guidelines: ['Supportive environment', 'No medical advice', 'Respect privacy'],
    tags: ['wellness', 'meditation', 'mindfulness', 'self-care'],
    recentActivity: [
      { type: 'post', user: 'Maya R.', content: 'Starting a meditation challenge this week!', timestamp: '1 hour ago' },
      { type: 'comment', user: 'David P.', content: 'commented on "Morning routine tips"', timestamp: '3 hours ago' }
    ]
  },
  {
    id: '3',
    name: 'Creative Arts Collective',
    slug: 'creative-arts-collective',
    description: 'Express yourself through various art forms. Share your creations, get feedback, and connect with fellow artists.',
    category: 'Arts & Culture',
    memberCount: 654,
    postCount: 89,
    icon: '🎨',
    bannerImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=300&fit=crop',
    isPrivate: false,
    requiresVerification: false,
    requiresPremium: true,
    trending: false,
    isJoined: true,
    isModerator: true,
    createdAt: '2024-01-28',
    guidelines: ['Original content only', 'Constructive feedback', 'Credit artists'],
    tags: ['art', 'creativity', 'painting', 'photography'],
    recentActivity: [
      { type: 'post', user: 'Sam R.', content: 'My latest painting inspired by Miami Art Deco', timestamp: '5 hours ago' },
      { type: 'comment', user: 'Emma T.', content: 'commented on "Watercolor techniques"', timestamp: '8 hours ago' }
    ]
  },
  {
    id: '4',
    name: 'Elite Lifestyle Connoisseurs',
    slug: 'elite-lifestyle-connoisseurs',
    description: 'Exclusive community for premium members. Access to VIP events, luxury lifestyle content, and elite connections.',
    category: 'Premium',
    memberCount: 234,
    postCount: 67,
    icon: '👑',
    bannerImage: 'https://images.unsplash.com/photo-1519167758481-83f8c4e0b3d3?w=800&h=300&fit=crop',
    isPrivate: true,
    requiresVerification: true,
    requiresPremium: true,
    trending: false,
    isJoined: false,
    isModerator: false,
    createdAt: '2024-03-01',
    guidelines: ['Premium members only', 'Discretion required', 'Quality content'],
    tags: ['elite', 'luxury', 'premium', 'exclusive'],
    recentActivity: [
      { type: 'post', user: 'Victoria S.', content: 'Private yacht event this weekend', timestamp: '1 day ago' }
    ]
  }
];

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    communityId: '1',
    title: 'Best Rooftop Bars in Miami for Sunset Views',
    content: 'Just discovered this incredible rooftop bar in Wynwood with panoramic views of the city. The atmosphere is perfect for sunset drinks and the crowd is sophisticated yet relaxed. Highly recommend for anyone looking to experience Miami\'s nightlife at its finest.',
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
    isPinned: false,
    isLocked: false
  },
  {
    id: '2',
    communityId: '2',
    content: 'Starting a 30-day meditation challenge! Who\'s joining me? I\'ll be sharing daily tips, techniques, and progress updates. Let\'s support each other on this journey to mindfulness.',
    author: {
      name: 'Maya R.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      tier: 'connoisseur',
      verified: true,
      isModerator: false
    },
    createdAt: '1 hour ago',
    likes: 45,
    comments: 12,
    shares: 7,
    tags: ['meditation', 'challenge', 'mindfulness', 'wellness'],
    isPinned: false,
    isLocked: false
  }
];

export default function CommunitiesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'joined' | 'trending' | 'premium'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);

  const categories = [
    { id: 'all', name: 'All', icon: Globe },
    { id: 'local', name: 'Local', icon: MapPin },
    { id: 'wellness', name: 'Wellness', icon: Heart },
    { id: 'arts', name: 'Arts', icon: Star },
    { id: 'premium', name: 'Premium', icon: Crown }
  ];

  const filteredCommunities = mockCommunities.filter(community => {
    const matchesTab = 
      (activeTab === 'all') ||
      (activeTab === 'joined' && community.isJoined) ||
      (activeTab === 'trending' && community.trending) ||
      (activeTab === 'premium' && community.requiresPremium);
    
    const matchesCategory = selectedCategory === 'all' || 
      community.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesSearch = searchQuery === '' || 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesCategory && matchesSearch;
  });

  const CommunityCard = ({ community }: { community: Community }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden"
    >
      {/* Banner Image */}
      {community.bannerImage && (
        <div className="relative h-32">
          <Image
            src={community.bannerImage}
            alt={community.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Community Icon */}
          <div className="absolute bottom-2 left-4 text-2xl">
            {community.icon}
          </div>
          
          {/* Privacy Indicators */}
          <div className="absolute top-2 right-2 flex gap-1">
            {community.isPrivate && (
              <Lock weight="bold" size={16} className="text-white/80" />
            )}
            {community.requiresVerification && (
              <Star weight="fill" size={16} className="text-blue-400" />
            )}
            {community.requiresPremium && (
              <Crown weight="fill" size={16} className="text-amber-400" />
            )}
            {community.trending && (
              <Fire weight="fill" size={16} className="text-red-400" />
            )}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-medium text-lg mb-1">{community.name}</h3>
            <p className="text-neutral-400 text-sm">{community.category}</p>
          </div>
          {community.isJoined && (
            <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs">
              Joined
            </span>
          )}
        </div>
        
        <p className="text-neutral-300 text-sm mb-4 line-clamp-2">
          {community.description}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-neutral-400">
          <div className="flex items-center gap-1">
            <Users weight="bold" size={16} />
            {community.memberCount.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <Chat weight="bold" size={16} />
            {community.postCount}
          </div>
          <div className="flex items-center gap-1">
            <Clock weight="bold" size={16} />
            {community.createdAt}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {community.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Recent Activity */}
        <div className="space-y-2 mb-4">
          <h4 className="text-neutral-400 text-xs font-medium">Recent Activity</h4>
          {community.recentActivity.slice(0, 2).map((activity, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-medium">{activity.user}</span>
              <span>{activity.content}</span>
              <span className="text-neutral-600">• {activity.timestamp}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {community.isModerator && (
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs">
                Moderator
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-neutral-400 hover:text-white transition-colors">
              <Bell weight="regular" size={16} />
            </button>
            <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              community.isJoined 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-brand-500 hover:bg-brand-600 text-white'
            }`}>
              {community.isJoined ? 'Leave' : 'Join'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

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
        {post.isPinned && (
          <Bookmark weight="fill" size={16} className="text-amber-400" />
        )}
      </div>
      
      {post.title && (
        <h3 className="text-white font-medium mb-3">{post.title}</h3>
      )}
      
      <p className="text-neutral-200 mb-4">{post.content}</p>
      
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
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-neutral-400 hover:text-white transition-colors">
            <Flag weight="regular" size={16} />
          </button>
          <button className="p-2 text-neutral-400 hover:text-white transition-colors">
            <Bookmark weight="regular" size={16} />
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
            <h1 className="text-xl font-light text-white">Communities</h1>
            <button 
              onClick={() => setShowCreateCommunity(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-medium transition-colors"
            >
              <Plus weight="bold" size={16} />
              Create
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <MagnifyingGlass weight="bold" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mb-4">
            {[
              { id: 'all', label: 'All Communities' },
              { id: 'joined', label: 'My Communities' },
              { id: 'trending', label: 'Trending' },
              { id: 'premium', label: 'Premium' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-2 rounded-full text-sm font-light transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-500 text-white'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-light whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-brand-500 text-white'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  <Icon weight="bold" size={16} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 pt-6">
        <div className="space-y-6">
          {/* Trending Posts */}
          {activeTab === 'all' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">🔥 Trending Posts</h3>
                <button className="text-brand-400 text-sm">See All</button>
              </div>
              {mockPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Communities Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">
                {activeTab === 'all' && 'All Communities'}
                {activeTab === 'joined' && 'My Communities'}
                {activeTab === 'trending' && 'Trending Communities'}
                {activeTab === 'premium' && 'Premium Communities'}
              </h3>
              <span className="text-neutral-400 text-sm">{filteredCommunities.length} communities</span>
            </div>
            
            <div className="space-y-4">
              {filteredCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredCommunities.length === 0 && (
            <div className="text-center py-12">
              <Globe weight="thin" size={48} className="text-neutral-600 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">No communities found</h3>
              <p className="text-neutral-400 text-sm mb-6">
                {searchQuery ? 'Try adjusting your search terms' : 'Be the first to create a community in this category'}
              </p>
              <button 
                onClick={() => setShowCreateCommunity(true)}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-medium transition-colors"
              >
                Create Community
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Community Modal (Placeholder) */}
      {showCreateCommunity && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Create Community</h3>
              <button 
                onClick={() => setShowCreateCommunity(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-neutral-400 text-sm mb-6">
              Community creation feature coming soon! This will include name, description, category selection, and privacy settings.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCreateCommunity(false)}
                className="flex-1 px-4 py-2 bg-neutral-800 text-neutral-300 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowCreateCommunity(false)}
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
