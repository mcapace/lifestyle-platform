"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, PaperPlaneRight, DotsThree, Image as ImageIcon, Smiley } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

// Mock messages
const mockMessages = [
  { id: 1, sender: "them", text: "Hey! We saw your profile and would love to connect 😊", timestamp: "10:30 AM" },
  { id: 2, sender: "me", text: "Thanks for reaching out! We're interested too.", timestamp: "10:35 AM" },
  { id: 3, sender: "them", text: "We'd love to meet for drinks this weekend!", timestamp: "10:40 AM" },
  { id: 4, sender: "me", text: "That sounds great! What area works best for you?", timestamp: "10:42 AM" },
];

const otherUser = {
  name: "Sarah & Mike",
  avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&q=80",
  verified: true,
  online: true
};

export default function ChatPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "me",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/messages" className="text-neutral-500 hover:text-white transition-colors">
                <ArrowLeft weight="bold" size={24} />
              </Link>
              
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-800">
                  <Image
                    src={otherUser.avatar}
                    alt={otherUser.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                  {otherUser.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-neutral-950 rounded-full" />
                  )}
                </div>

                {/* Name */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-white font-light">{otherUser.name}</h2>
                    {otherUser.verified && (
                      <div className="w-4 h-4 bg-brand-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  {otherUser.online && (
                    <p className="text-xs text-green-500 font-light">Online now</p>
                  )}
                </div>
              </div>
            </div>

            <button className="text-neutral-500 hover:text-white transition-colors">
              <DotsThree weight="bold" size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-md mx-auto w-full">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[75%] ${message.sender === "me" ? "order-2" : "order-1"}`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === "me"
                      ? "bg-brand-500 text-white"
                      : "bg-neutral-900 text-white border border-neutral-800"
                  }`}
                >
                  <p className="text-sm font-light leading-relaxed">{message.text}</p>
                </div>
                <p className="text-xs text-neutral-600 mt-1 px-2 font-light">
                  {message.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="sticky bottom-0 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-end gap-3">
            {/* Photo Button */}
            <button className="flex-shrink-0 w-10 h-10 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full flex items-center justify-center transition-colors">
              <ImageIcon weight="bold" size={20} className="text-neutral-500" />
            </button>

            {/* Input */}
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type a message..."
                rows={1}
                className="w-full px-4 py-3 pr-12 bg-neutral-900 border border-neutral-800 rounded-2xl text-white placeholder-neutral-600 text-sm resize-none focus:outline-none focus:border-brand-500/50 transition-colors font-light"
                style={{ maxHeight: '120px' }}
              />
              <button className="absolute right-3 bottom-3 text-neutral-600 hover:text-neutral-400 transition-colors">
                <Smiley weight="regular" size={20} />
              </button>
            </div>

            {/* Send Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                newMessage.trim()
                  ? "bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/20"
                  : "bg-neutral-900 border border-neutral-800"
              }`}
            >
              <PaperPlaneRight 
                weight="fill" 
                size={18} 
                className={newMessage.trim() ? "text-white" : "text-neutral-700"} 
              />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

