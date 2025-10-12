"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlass, CheckCircle, ChatCircle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

// Mock conversations
const conversations = [
  {
    id: 1,
    name: "Sarah & Mike",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&q=80",
    lastMessage: "We'd love to meet for drinks this weekend!",
    timestamp: "2m ago",
    unread: 2,
    verified: true,
    online: true
  },
  {
    id: 2,
    name: "Jessica",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    lastMessage: "Thanks for the connection 😊",
    timestamp: "1h ago",
    unread: 0,
    verified: true,
    online: false
  },
  {
    id: 3,
    name: "Alex & Jordan",
    avatar: "https://images.unsplash.com/photo-1606122017369-d782bbb78f32?w=200&q=80",
    lastMessage: "Looking forward to the event!",
    timestamp: "3h ago",
    unread: 0,
    verified: true,
    online: true
  }
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <h1 className="text-2xl font-light text-white mb-4">Messages</h1>
          
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
              placeholder="Search conversations..."
              className="w-full h-10 pl-10 pr-4 bg-neutral-900 border border-neutral-800 rounded-full text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-brand-500/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="max-w-md mx-auto">
        {conversations.map((conversation, index) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={`/messages/${conversation.id}`}
              className="block px-6 py-4 hover:bg-neutral-900/50 transition-colors active:bg-neutral-900 border-b border-neutral-900"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-800">
                    <Image
                      src={conversation.avatar}
                      alt={conversation.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Online Indicator */}
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-neutral-950 rounded-full" />
                  )}

                  {/* Verified Badge */}
                  {conversation.verified && (
                    <div className="absolute -top-1 -right-1">
                      <CheckCircle weight="fill" size={16} className="text-brand-500" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-light truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-neutral-600 font-light flex-shrink-0">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 font-light truncate">
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {conversation.unread > 0 && (
                  <div className="flex-shrink-0 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {conversation.unread}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State (if no conversations) */}
      {conversations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <ChatCircle weight="thin" size={64} className="text-neutral-800 mb-4" />
          <p className="text-neutral-500 font-light text-center">
            No conversations yet.
            <br />
            Start connecting with people you like.
          </p>
        </div>
      )}
    </div>
  );
}

