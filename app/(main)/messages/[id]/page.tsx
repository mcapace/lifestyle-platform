"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft,
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
  Flag,
  Archive,
  Trash,
  Crown,
  CheckCircle,
  Star,
  Sparkle,
  Robot,
  Plus,
  Check,
  Checks
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useHaptics } from "@/lib/haptics/advanced-feedback";

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'voice' | 'video';
  timestamp: string;
  read: boolean;
  translated?: string;
  originalLanguage?: string;
  mediaUrl?: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'other',
    content: 'Hey! I saw your profile and we have so many interests in common. Would love to connect!',
    type: 'text',
    timestamp: '10:30 AM',
    read: true
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Hi! Thanks for reaching out. I noticed you\'re into wellness and art too!',
    type: 'text',
    timestamp: '10:32 AM',
    read: true
  },
  {
    id: '3',
    senderId: 'other',
    content: 'Yes! I just joined the Wellness & Mindfulness community. Have you been to any of the events?',
    type: 'text',
    timestamp: '10:35 AM',
    read: true
  },
  {
    id: '4',
    senderId: 'me',
    content: 'I attended the Sunset Wellness Circle last week. It was amazing! You should definitely check out the next one.',
    type: 'text',
    timestamp: '10:37 AM',
    read: true
  },
  {
    id: '5',
    senderId: 'other',
    content: 'That sounds perfect! Would love to join. Maybe we could go together?',
    type: 'text',
    timestamp: '10:40 AM',
    read: true
  }
];

export default function ConversationPage() {
  const { trigger } = useHaptics();
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [messageText, setMessageText] = useState('');
  const [showTranslate, setShowTranslate] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      content: messageText,
      type: 'text',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');
    trigger('SUCCESS');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    trigger(isRecording ? 'ERROR' : 'SUCCESS');
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const aiSuggestions = [
    "Tell me about your favorite wellness practices",
    "What community events are you excited about?",
    "Share your favorite lifestyle spots in the area"
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/messages">
                <ArrowLeft weight="bold" size={20} className="text-white" />
              </Link>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                  alt="Sarah Mitchell"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-neutral-950 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-white font-medium">Sarah Mitchell</h2>
                  <Crown weight="fill" size={14} className="text-amber-400" />
                  <CheckCircle weight="fill" size={14} className="text-blue-400" />
                </div>
                <p className="text-neutral-400 text-xs">Active now</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <Phone weight="bold" size={20} />
              </button>
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <VideoCamera weight="bold" size={20} />
              </button>
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <Info weight="bold" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-6 py-6 space-y-4">
          {messages.map((message, index) => {
            const isMe = message.senderId === 'me';
            const showTimestamp = index === 0 || messages[index - 1].timestamp !== message.timestamp;

            return (
              <div key={message.id}>
                {showTimestamp && (
                  <div className="text-center text-neutral-500 text-xs mb-4">
                    {message.timestamp}
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] ${isMe ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        isMe
                          ? 'bg-brand-500 text-white'
                          : 'bg-neutral-800 text-neutral-100'
                      } ${isMe ? 'rounded-br-none' : 'rounded-bl-none'}`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {message.translated && (
                        <div className="mt-2 pt-2 border-t border-white/10">
                          <div className="flex items-center gap-1 mb-1">
                            <Translate weight="bold" size={12} />
                            <span className="text-xs opacity-75">Translated from {message.originalLanguage}</span>
                          </div>
                          <p className="text-sm opacity-90">{message.translated}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex items-center gap-1 mt-1 px-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                      {isMe && (
                        <div className="text-neutral-500 text-xs">
                          {message.read ? <Checks weight="bold" size={12} /> : <Check weight="bold" size={12} />}
                        </div>
                      )}
                      {!isMe && showTranslate && (
                        <button className="text-brand-400 text-xs flex items-center gap-1">
                          <Translate weight="bold" size={12} />
                          Translate
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {showAIAssistant && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="border-t border-neutral-800 bg-neutral-900"
          >
            <div className="max-w-md mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Robot weight="fill" size={20} className="text-purple-400" />
                  <h3 className="text-white font-medium text-sm">AI Suggestions</h3>
                </div>
                <button
                  onClick={() => setShowAIAssistant(false)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMessageText(suggestion);
                      setShowAIAssistant(false);
                      inputRef.current?.focus();
                    }}
                    className="w-full text-left px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Recording Indicator */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="border-t border-neutral-800 bg-red-500/10"
          >
            <div className="max-w-md mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-3 h-3 bg-red-500 rounded-full"
                  />
                  <span className="text-white font-medium">{formatRecordingTime(recordingTime)}</span>
                  <span className="text-neutral-400 text-sm">Recording voice message...</span>
                </div>
                <button
                  onClick={toggleRecording}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm transition-colors"
                >
                  Stop
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="sticky bottom-0 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-xl pb-safe">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-end gap-3">
            <div className="flex items-center gap-2">
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <ImageIcon weight="bold" size={20} />
              </button>
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <Camera weight="bold" size={20} />
              </button>
            </div>

            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows={1}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors resize-none max-h-32"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  onClick={() => setShowAIAssistant(!showAIAssistant)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    showAIAssistant ? 'bg-purple-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Robot weight="bold" size={16} />
                </button>
                <button className="p-1.5 text-neutral-400 hover:text-white transition-colors">
                  <Smiley weight="bold" size={16} />
                </button>
              </div>
            </div>

            {messageText.trim() ? (
              <button
                onClick={handleSendMessage}
                className="p-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-colors"
              >
                <PaperPlane weight="fill" size={20} />
              </button>
            ) : (
              <button
                onClick={toggleRecording}
                className={`p-3 rounded-full transition-colors ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400'
                }`}
              >
                <Microphone weight="bold" size={20} />
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 mt-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-full text-xs transition-colors">
              <Translate weight="bold" size={12} />
              Translate
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-full text-xs transition-colors">
              <Gif weight="bold" size={12} />
              GIF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
