"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlass,
  Funnel,
  Crown,
  Shield,
  Eye,
  EyeSlash,
  Camera,
  Microphone,
  Smiley,
  PaperPlaneTilt,
  Phone,
  Video,
  DotsThree,
  Check,
  Checks,
  Clock,
  Heart,
  Image as ImageIcon,
  FileText
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

// Premium messaging data structure
interface PremiumMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'TEXT' | 'PHOTO' | 'VIDEO' | 'VOICE' | 'LOCATION' | 'DISAPPEARING';
  timestamp: Date;
  isRead: boolean;
  readAt?: Date;
  isDisappearing: boolean;
  expiresAt?: Date;
  reactions?: Array<{
    emoji: string;
    userId: string;
    timestamp: Date;
  }>;
  replyTo?: string;
  edited?: boolean;
  editedAt?: Date;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    membershipTier: 'FREE' | 'PREMIUM' | 'VIP';
    online: boolean;
    lastSeen?: Date;
  };
  lastMessage: PremiumMessage;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isArchived: boolean;
  compatibility: number;
  tags: string[];
  premiumFeatures: string[];
}

// Mock premium conversations
const premiumConversations: Conversation[] = [
  {
    id: "1",
    participant: {
      id: "user1",
      name: "Sarah & Mike",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
      verified: true,
      membershipTier: "VIP",
      online: true
    },
    lastMessage: {
      id: "msg1",
      senderId: "user1",
      receiverId: "me",
      content: "We'd love to meet for drinks this weekend! Are you free Saturday evening?",
      type: "TEXT",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false,
      isDisappearing: false
    },
    unreadCount: 2,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    compatibility: 94,
    tags: ["High Compatibility", "VIP", "Nearby"],
    premiumFeatures: ["Read Receipts", "Typing Indicators", "Video Call Available"]
  },
  {
    id: "2",
    participant: {
      id: "user2",
      name: "Jessica",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      verified: true,
      membershipTier: "PREMIUM",
      online: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    lastMessage: {
      id: "msg2",
      senderId: "me",
      receiverId: "user2",
      content: "Thanks for the lovely evening! We should definitely do this again soon 😊",
      type: "TEXT",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      isRead: true,
      readAt: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
      isDisappearing: false
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    compatibility: 88,
    tags: ["Great Chemistry", "Premium"],
    premiumFeatures: ["Read Receipts"]
  },
  {
    id: "3",
    participant: {
      id: "user3",
      name: "Alex & Jordan",
      avatar: "https://images.unsplash.com/photo-1606122017369-d782bbb78f32?w=400&q=80",
      verified: true,
      membershipTier: "VIP",
      online: true
    },
    lastMessage: {
      id: "msg3",
      senderId: "user3",
      receiverId: "me",
      content: "Looking forward to the event this weekend! See you there 🎉",
      type: "TEXT",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      isRead: true,
      readAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      isDisappearing: false
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    compatibility: 91,
    tags: ["Event Buddies", "VIP", "High Compatibility"],
    premiumFeatures: ["Read Receipts", "Typing Indicators", "Video Call Available", "Disappearing Messages"]
  }
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: "ALL", label: "All Messages", icon: null },
    { id: "UNREAD", label: "Unread", icon: null },
    { id: "VIP", label: "VIP Members", icon: Crown },
    { id: "VERIFIED", label: "Verified Only", icon: Shield },
    { id: "ONLINE", label: "Online Now", icon: null },
    { id: "PINNED", label: "Pinned", icon: null },
  ];

  // Filter conversations
  const filteredConversations = premiumConversations.filter(conversation => {
    // Search filter
    if (searchQuery && !conversation.participant.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    switch (selectedFilter) {
      case "UNREAD":
        return conversation.unreadCount > 0;
      case "VIP":
        return conversation.participant.membershipTier === "VIP";
      case "VERIFIED":
        return conversation.participant.verified;
      case "ONLINE":
        return conversation.participant.online;
      case "PINNED":
        return conversation.isPinned;
      default:
        return true;
    }
  });

  // Sort conversations (pinned first, then by last message time)
  const sortedConversations = filteredConversations.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime();
  });

  const formatLastSeen = (lastSeen: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
      return `${diffInMinutes}m`;
    }
    if (diffInHours < 24) {
      return `${diffInHours}h`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light text-white">Messages</h1>
            <div className="flex items-center gap-3">
              <button className="text-neutral-500 hover:text-white transition-colors">
                <MagnifyingGlass weight="bold" size={20} />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <Funnel weight="bold" size={20} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <MagnifyingGlass 
              weight="bold" 
              size={16} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full h-10 pl-10 pr-4 bg-neutral-900 border border-neutral-800 rounded-full text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-brand-500/50 transition-colors"
            />
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex gap-2 overflow-x-auto pb-2"
              >
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-light transition-all whitespace-nowrap ${
                      selectedFilter === filter.id
                        ? "bg-brand-500 text-white"
                        : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                    }`}
                  >
                    {filter.icon && <filter.icon weight="bold" size={14} />}
                    {filter.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Conversations List */}
      <div className="max-w-md mx-auto">
        <AnimatePresence>
          {sortedConversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/messages/${conversation.id}`}>
                <div className={`px-6 py-4 border-b border-neutral-800 hover:bg-neutral-900/30 transition-colors group cursor-pointer ${
                  conversation.isPinned ? "bg-neutral-900/20" : ""
                }`}>
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <Image
                        src={conversation.participant.avatar}
                        alt={conversation.participant.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      
                      {/* Online Status */}
                      {conversation.participant.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-neutral-950 rounded-full" />
                      )}
                      
                      {/* Membership Badge */}
                      {conversation.participant.membershipTier === "VIP" && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                          <Crown weight="fill" size={10} className="text-white" />
                        </div>
                      )}
                    </div>

                    {/* Conversation Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-light truncate">
                            {conversation.participant.name}
                          </h3>
                          {conversation.participant.verified && (
                            <Shield weight="fill" size={14} className="text-brand-500 flex-shrink-0" />
                          )}
                          {conversation.isPinned && (
                            <div className="w-1 h-1 bg-brand-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-500">
                            {formatTimestamp(conversation.lastMessage.timestamp)}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-white">
                                {conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Last Message */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <p className="text-sm text-neutral-400 truncate">
                            {conversation.lastMessage.type === 'PHOTO' && (
                              <span className="flex items-center gap-1">
                                <ImageIcon weight="bold" size={12} />
                                Photo
                              </span>
                            )}
                            {conversation.lastMessage.type === 'VIDEO' && (
                              <span className="flex items-center gap-1">
                                <Video weight="bold" size={12} />
                                Video
                              </span>
                            )}
                            {conversation.lastMessage.type === 'VOICE' && (
                              <span className="flex items-center gap-1">
                                <Microphone weight="bold" size={12} />
                                Voice Message
                              </span>
                            )}
                            {conversation.lastMessage.type === 'TEXT' && conversation.lastMessage.content}
                          </p>
                          
                          {/* Read Status */}
                          {conversation.lastMessage.senderId === "me" && (
                            <div className="flex-shrink-0">
                              {conversation.lastMessage.isRead ? (
                                <Checks weight="bold" size={14} className="text-blue-400" />
                              ) : (
                                <Check weight="bold" size={14} className="text-neutral-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tags & Features */}
                      <div className="flex items-center gap-2 mt-2">
                        {/* Compatibility */}
                        <div className="flex items-center gap-1 px-2 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full">
                          <Heart weight="fill" size={10} className="text-brand-500" />
                          <span className="text-xs text-brand-500 font-medium">
                            {conversation.compatibility}%
                          </span>
                        </div>

                        {/* Premium Features */}
                        {conversation.premiumFeatures.includes("Read Receipts") && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                            <Eye weight="fill" size={10} className="text-blue-400" />
                            <span className="text-xs text-blue-400">Read</span>
                          </div>
                        )}

                        {conversation.premiumFeatures.includes("Video Call Available") && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                            <Video weight="fill" size={10} className="text-green-400" />
                            <span className="text-xs text-green-400">Video</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {sortedConversations.length === 0 && (
          <div className="text-center py-20 px-6">
            <div className="w-16 h-16 mx-auto bg-neutral-800 rounded-full flex items-center justify-center mb-4">
              <MagnifyingGlass weight="thin" size={32} className="text-neutral-600" />
            </div>
            <h3 className="text-xl font-light text-white mb-2">
              {searchQuery || selectedFilter !== "ALL" ? "No conversations found" : "No messages yet"}
            </h3>
            <p className="text-neutral-500 font-light mb-6">
              {searchQuery || selectedFilter !== "ALL" 
                ? "Try adjusting your search or filters"
                : "Start a conversation with your matches"
              }
            </p>
            {!searchQuery && selectedFilter === "ALL" && (
              <Link href="/discover">
                <button className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-light transition-colors">
                  Discover People
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}