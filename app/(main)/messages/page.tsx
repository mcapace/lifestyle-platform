"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlass,
  Funnel,
  Plus,
  ChatCircle,
  Star,
  Crown,
  CheckCircle,
  Clock,
  DotsThree,
  Camera,
  Image as ImageIcon,
  Microphone,
  Gif,
  Smiley,
  PaperPlane,
  Translate,
  VideoCamera,
  Phone,
  Info,
  Archive,
  Trash,
  Flag,
  Sparkle,
  Robot
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useHaptics } from "@/lib/haptics/advanced-feedback";

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'voice' | 'video';
  timestamp: string;
  read: boolean;
  translated?: string;
  originalLanguage?: string;
}

interface Conversation {
  id: string;
  participants: Array<{
    id: string;
    name: string;
    avatar: string;
    tier: 'curious' | 'explorer' | 'connoisseur';
    verified: boolean;
    online: boolean;
  }>;
  lastMessage: Message;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  lastActivity: string;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [{
      id: '2',
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      tier: 'explorer',
      verified: true,
      online: true
    }],
    lastMessage: {
      id: 'm1',
      conversationId: '1',
      senderId: '2',
      content: 'Would love to join the wellness event this weekend!',
      type: 'text',
      timestamp: '2 min ago',
      read: false
    },
    unreadCount: 2,
    isPinned: true,
    isArchived: false,
    lastActivity: '2 min ago'
  },
  {
    id: '2',
    participants: [{
      id: '3',
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      tier: 'connoisseur',
      verified: true,
      online: false
    }],
    lastMessage: {
      id: 'm2',
      conversationId: '2',
      senderId: 'me',
      content: 'Great meeting you at the art gallery opening!',
      type: 'text',
      timestamp: '1 hour ago',
      read: true
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
    lastActivity: '1 hour ago'
  },
  {
    id: '3',
    participants: [{
      id: '4',
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      tier: 'explorer',
      verified: true,
      online: true
    }],
    lastMessage: {
      id: 'm3',
      conversationId: '3',
      senderId: '4',
      content: 'The rooftop bar recommendation was perfect! 🌟',
      type: 'text',
      timestamp: '3 hours ago',
      read: true
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
    lastActivity: '3 hours ago'
  }
];

export default function MessagesPage() {
  const { trigger } = useHaptics();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'pinned'>('all');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = searchQuery === '' || 
      conv.participants[0].name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'unread' && conv.unreadCount > 0) ||
      (activeFilter === 'pinned' && conv.isPinned);
    
    return matchesSearch && matchesFilter && !conv.isArchived;
  });

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    trigger('SUCCESS');
    setMessageText('');
  };

  const ConversationItem = ({ conversation }: { conversation: Conversation }) => {
    const participant = conversation.participants[0];
    const isUnread = conversation.unreadCount > 0;

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setSelectedConversation(conversation.id);
          trigger('BUTTON_PRESS');
        }}
        className={`p-4 border-b border-neutral-800 cursor-pointer transition-colors ${
          isUnread ? 'bg-brand-500/5' : 'hover:bg-neutral-900/50'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="relative">
            <img
              src={participant.avatar}
              alt={participant.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            {participant.online && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-neutral-950 rounded-full" />
            )}
            {conversation.isPinned && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                <Star weight="fill" size={12} className="text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-medium truncate ${isUnread ? 'text-white' : 'text-neutral-300'}`}>
                {participant.name}
              </h3>
              {participant.tier === 'connoisseur' && (
                <Crown weight="fill" size={14} className="text-amber-400" />
              )}
              {participant.verified && (
                <CheckCircle weight="fill" size={14} className="text-blue-400" />
              )}
            </div>

            <p className={`text-sm truncate ${isUnread ? 'text-white font-medium' : 'text-neutral-400'}`}>
              {conversation.lastMessage.senderId === 'me' && 'You: '}
              {conversation.lastMessage.content}
            </p>

            <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
              <Clock weight="bold" size={12} />
              <span>{conversation.lastActivity}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {isUnread && (
              <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">{conversation.unreadCount}</span>
              </div>
            )}
            <button className="p-1 text-neutral-400 hover:text-white transition-colors">
              <DotsThree weight="bold" size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-light text-white">Messages</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm transition-colors">
              <Plus weight="bold" size={16} />
              New
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <MagnifyingGlass weight="bold" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: 'Unread' },
              { id: 'pinned', label: 'Pinned' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as typeof activeFilter)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeFilter === filter.id
                    ? 'bg-brand-500 text-white'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="max-w-md mx-auto">
        {filteredConversations.length > 0 ? (
          <div>
            {filteredConversations.map((conversation) => (
              <ConversationItem key={conversation.id} conversation={conversation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6">
            <ChatCircle weight="thin" size={64} className="text-neutral-600 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No conversations found</h3>
            <p className="text-neutral-400 text-sm mb-6">
              {searchQuery ? 'Try adjusting your search' : 'Start a conversation to connect with the community'}
            </p>
            <button className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-colors">
              Start Conversation
            </button>
          </div>
        )}
      </div>

      {/* AI Assistant Hint */}
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Robot weight="fill" size={24} className="text-purple-400 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium text-sm mb-1">AI Chat Assistant</h4>
              <p className="text-neutral-300 text-xs mb-3">
                Get conversation starters, translation help, and personalized suggestions powered by AI.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                  Auto-translate
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                  Conversation tips
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                  Voice to text
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Info */}
      <div className="max-w-md mx-auto px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-center">
            <Translate weight="bold" size={24} className="text-brand-400 mx-auto mb-2" />
            <div className="text-white text-sm font-medium mb-1">Real-time Translation</div>
            <div className="text-neutral-400 text-xs">Communicate in any language</div>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-center">
            <Microphone weight="bold" size={24} className="text-brand-400 mx-auto mb-2" />
            <div className="text-white text-sm font-medium mb-1">Voice Messages</div>
            <div className="text-neutral-400 text-xs">Send voice recordings</div>
          </div>
        </div>
      </div>
    </div>
  );
}
