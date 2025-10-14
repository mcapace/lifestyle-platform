"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft,
  ShareNetwork,
  DotsThree,
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Heart,
  BookmarkSimple,
  Crown,
  CheckCircle,
  Ticket,
  Lightning,
  Fire,
  Plus,
  Check,
  User,
  ChatCircle
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
    tier: 'curious' | 'explorer' | 'connoisseur';
  };
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      verified: true,
      tier: 'explorer'
    },
    rating: 5,
    comment: 'Amazing experience! The sunset views were breathtaking and the community was so welcoming. Perfect way to unwind after a busy week.',
    date: '2024-10-20',
    helpful: 12
  },
  {
    id: '2',
    user: {
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: true,
      tier: 'connoisseur'
    },
    rating: 4,
    comment: 'Great event with wonderful people. The meditation session was very relaxing. Would definitely attend again!',
    date: '2024-10-18',
    helpful: 8
  }
];

export default function EventDetailPage() {
  const [isAttending, setIsAttending] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'attendees' | 'reviews'>('about');
  const [showRSVPModal, setShowRSVPModal] = useState(false);

  const event = {
    id: '1',
    title: 'Sunset Wellness Circle',
    description: 'Join us for an evening of meditation, yoga, and mindfulness as we watch the sunset over South Beach. This event is perfect for anyone looking to relax, connect with like-minded individuals, and experience the beauty of Miami\'s coastline.\n\nWhat to expect:\n• Guided meditation session (30 min)\n• Gentle yoga flow (45 min)\n• Group mindfulness practice\n• Healthy refreshments\n• Sunset viewing\n\nPlease bring your own yoga mat and wear comfortable clothing. All skill levels welcome!',
    category: 'wellness',
    date: '2024-10-25',
    time: '6:00 PM - 8:00 PM',
    location: {
      name: 'South Beach',
      address: '1000 Ocean Drive',
      city: 'Miami, FL 33139'
    },
    host: {
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      verified: true,
      tier: 'explorer' as const,
      bio: 'Wellness enthusiast and certified yoga instructor'
    },
    attendees: 45,
    maxAttendees: 50,
    price: 'free' as const,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    rating: 4.8,
    reviewCount: 127,
    tags: ['wellness', 'meditation', 'yoga', 'sunset', 'mindfulness'],
    isPremium: false,
    isTrending: true
  };

  const handleRSVP = () => {
    setIsAttending(!isAttending);
    setShowRSVPModal(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/events">
              <ArrowLeft weight="bold" size={20} className="text-white" />
            </Link>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
              >
                <BookmarkSimple weight={isSaved ? "fill" : "regular"} size={20} className={isSaved ? "text-brand-400" : ""} />
              </button>
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <ShareNetwork weight="bold" size={20} />
              </button>
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <DotsThree weight="bold" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Image */}
      <div className="relative h-64">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {event.isTrending && (
            <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
              <Fire weight="fill" size={14} />
              Trending
            </span>
          )}
          {event.isPremium && (
            <span className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
              <Crown weight="fill" size={14} />
              Premium Only
            </span>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6">
        {/* Title & Category */}
        <div className="py-6 border-b border-neutral-800">
          <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-medium">
            {event.category}
          </span>
          <h1 className="text-2xl font-light text-white mt-3 mb-4">{event.title}</h1>
          
          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-neutral-300">
              <Calendar weight="bold" size={20} className="text-brand-400" />
              <div>
                <div className="text-sm font-medium">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                <div className="text-xs text-neutral-500">{event.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Users weight="bold" size={20} className="text-brand-400" />
              <div>
                <div className="text-sm font-medium">{event.attendees} attending</div>
                <div className="text-xs text-neutral-500">{event.maxAttendees ? `${event.maxAttendees - event.attendees} spots left` : 'Unlimited'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Host */}
        <div className="py-6 border-b border-neutral-800">
          <h3 className="text-white font-medium mb-3">Hosted By</h3>
          <div className="flex items-center gap-3">
            <img 
              src={event.host.avatar} 
              alt={event.host.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{event.host.name}</span>
                {event.host.verified && (
                  <CheckCircle weight="fill" size={16} className="text-blue-400" />
                )}
                {event.host.tier === 'connoisseur' && (
                  <Crown weight="fill" size={16} className="text-amber-400" />
                )}
              </div>
              <p className="text-neutral-400 text-sm">{event.host.bio}</p>
            </div>
            <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm transition-colors">
              View Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-16 z-10 bg-neutral-950 border-b border-neutral-800 -mx-6 px-6 py-4">
          <div className="flex gap-1">
            {[
              { id: 'about', label: 'About' },
              { id: 'attendees', label: `Attendees (${event.attendees})` },
              { id: 'reviews', label: `Reviews (${event.reviewCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-500 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="py-6">
          <AnimatePresence mode="wait">
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-white font-medium mb-3">Description</h3>
                  <p className="text-neutral-300 leading-relaxed whitespace-pre-line">{event.description}</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Location</h3>
                  <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <MapPin weight="bold" size={20} className="text-brand-400 mt-1" />
                      <div>
                        <div className="text-white font-medium">{event.location.name}</div>
                        <div className="text-neutral-400 text-sm">{event.location.address}</div>
                        <div className="text-neutral-400 text-sm">{event.location.city}</div>
                      </div>
                    </div>
                    <button className="w-full mt-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm transition-colors">
                      Open in Maps
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'attendees' && (
              <motion.div
                key="attendees"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-neutral-800 rounded-xl">
                    <img 
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Attendee"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">Member {i + 1}</span>
                        <CheckCircle weight="fill" size={14} className="text-blue-400" />
                      </div>
                      <p className="text-neutral-400 text-sm">Explorer</p>
                    </div>
                    <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                      <ChatCircle weight="bold" size={20} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Rating Summary */}
                <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-light text-white mb-2">{event.rating}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          weight="fill" 
                          size={20} 
                          className={i < Math.floor(event.rating) ? "text-amber-400" : "text-neutral-600"} 
                        />
                      ))}
                    </div>
                    <p className="text-neutral-400 text-sm">{event.reviewCount} reviews</p>
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img 
                          src={review.user.avatar} 
                          alt={review.user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium">{review.user.name}</span>
                            {review.user.verified && (
                              <CheckCircle weight="fill" size={14} className="text-blue-400" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  weight="fill" 
                                  size={12} 
                                  className={i < review.rating ? "text-amber-400" : "text-neutral-600"} 
                                />
                              ))}
                            </div>
                            <span className="text-neutral-500 text-xs">
                              {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-neutral-300 text-sm leading-relaxed mb-3">{review.comment}</p>
                      <button className="flex items-center gap-1 text-neutral-400 hover:text-white text-xs transition-colors">
                        <Heart weight="regular" size={14} />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom RSVP Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium text-lg">
                {event.price === 'free' ? 'Free Event' : `$${event.price}`}
              </div>
              <div className="text-neutral-400 text-sm">
                {event.maxAttendees ? `${event.maxAttendees - event.attendees} spots left` : 'Unlimited spots'}
              </div>
            </div>
            <button
              onClick={() => setShowRSVPModal(true)}
              className={`px-8 py-3 rounded-xl font-medium transition-colors ${
                isAttending
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-brand-500 hover:bg-brand-600 text-white'
              }`}
            >
              {isAttending ? 'Attending ✓' : 'RSVP'}
            </button>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showRSVPModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-white font-medium text-lg mb-4">Confirm RSVP</h3>
            <p className="text-neutral-300 mb-6">
              You're about to RSVP for <span className="text-brand-400">{event.title}</span>. 
              You'll receive event updates and reminders.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRSVPModal(false)}
                className="flex-1 px-4 py-3 bg-neutral-800 text-neutral-300 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRSVP}
                className="flex-1 px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors"
              >
                Confirm RSVP
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
