"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlass,
  Funnel,
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Heart,
  ShareNetwork,
  Plus,
  Fire,
  Sparkle,
  Crown,
  CheckCircle,
  Ticket,
  TrendUp,
  Lightning,
  BookmarkSimple,
  Export
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  category: 'nightlife' | 'wellness' | 'food' | 'culture' | 'adventure' | 'business';
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
  };
  host: {
    name: string;
    avatar: string;
    verified: boolean;
    tier: 'curious' | 'explorer' | 'connoisseur';
  };
  attendees: number;
  maxAttendees?: number;
  price: number | 'free';
  image: string;
  isAttending: boolean;
  isSaved: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  isPremium: boolean;
  isTrending: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Sunset Wellness Circle',
    description: 'Join us for an evening of meditation, yoga, and mindfulness as we watch the sunset over South Beach.',
    category: 'wellness',
    date: '2024-10-25',
    time: '6:00 PM - 8:00 PM',
    location: {
      name: 'South Beach',
      address: '1000 Ocean Drive',
      city: 'Miami, FL'
    },
    host: {
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      verified: true,
      tier: 'explorer'
    },
    attendees: 45,
    maxAttendees: 50,
    price: 'free',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    isAttending: false,
    isSaved: true,
    rating: 4.8,
    reviewCount: 127,
    tags: ['wellness', 'meditation', 'yoga', 'sunset'],
    isPremium: false,
    isTrending: true
  },
  {
    id: '2',
    title: 'Art Gallery Opening: Abstract Visions',
    description: 'Experience the latest contemporary art exhibition featuring emerging artists from around the world.',
    category: 'culture',
    date: '2024-10-26',
    time: '7:00 PM - 10:00 PM',
    location: {
      name: 'Wynwood Arts District',
      address: '2550 NW 2nd Ave',
      city: 'Miami, FL'
    },
    host: {
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: true,
      tier: 'connoisseur'
    },
    attendees: 89,
    maxAttendees: 100,
    price: 25,
    image: 'https://images.unsplash.com/photo-1579783902671-97597589b74e?w=800&q=80',
    isAttending: true,
    isSaved: true,
    rating: 4.9,
    reviewCount: 203,
    tags: ['art', 'culture', 'gallery', 'wine'],
    isPremium: false,
    isTrending: true
  },
  {
    id: '3',
    title: 'Exclusive Rooftop Mixer',
    description: 'An intimate gathering of lifestyle enthusiasts. Network, connect, and enjoy premium cocktails with stunning city views.',
    category: 'nightlife',
    date: '2024-10-26',
    time: '9:00 PM - 1:00 AM',
    location: {
      name: 'Sky Lounge',
      address: '1395 Brickell Ave',
      city: 'Miami, FL'
    },
    host: {
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      verified: true,
      tier: 'connoisseur'
    },
    attendees: 67,
    maxAttendees: 75,
    price: 50,
    image: 'https://images.unsplash.com/photo-1533174072545-7bd469c76857?w=800&q=80',
    isAttending: false,
    isSaved: false,
    rating: 4.7,
    reviewCount: 89,
    tags: ['nightlife', 'networking', 'rooftop', 'premium'],
    isPremium: true,
    isTrending: false
  }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'attending' | 'saved'>('all');

  const categories = [
    { id: 'all', label: 'All', icon: Sparkle },
    { id: 'nightlife', label: 'Nightlife', icon: Lightning },
    { id: 'wellness', label: 'Wellness', icon: Heart },
    { id: 'food', label: 'Food & Wine', icon: Star },
    { id: 'culture', label: 'Culture', icon: BookmarkSimple },
    { id: 'business', label: 'Business', icon: TrendUp }
  ];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'upcoming' && new Date(event.date) > new Date()) ||
      (activeFilter === 'attending' && event.isAttending) ||
      (activeFilter === 'saved' && event.isSaved);
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const EventCard = ({ event }: { event: Event }) => (
    <Link href={`/events/${event.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden"
      >
        <div className="relative h-48">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {event.isTrending && (
              <span className="px-2 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
                <Fire weight="fill" size={12} />
                Trending
              </span>
            )}
            {event.isPremium && (
              <span className="px-2 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
                <Crown weight="fill" size={12} />
                Premium
              </span>
            )}
          </div>

          {/* Save Button */}
          <button className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full transition-colors">
            <BookmarkSimple 
              weight={event.isSaved ? "fill" : "regular"} 
              size={20} 
              className={event.isSaved ? "text-brand-400" : "text-white"} 
            />
          </button>

          {/* Bottom Info */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Calendar weight="bold" size={16} />
              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              <span>•</span>
              <Clock weight="bold" size={16} />
              <span>{event.time.split(' - ')[0]}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-white font-medium text-lg mb-2">{event.title}</h3>
          <p className="text-neutral-400 text-sm mb-3 line-clamp-2">{event.description}</p>

          {/* Location */}
          <div className="flex items-center gap-2 text-neutral-400 text-sm mb-3">
            <MapPin weight="bold" size={16} />
            <span className="truncate">{event.location.name}, {event.location.city}</span>
          </div>

          {/* Host */}
          <div className="flex items-center gap-2 mb-3">
            <img 
              src={event.host.avatar} 
              alt={event.host.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-neutral-300 text-sm">Hosted by {event.host.name}</span>
            {event.host.verified && (
              <CheckCircle weight="fill" size={14} className="text-blue-400" />
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-neutral-400">
                <Users weight="bold" size={16} />
                <span>{event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <Star weight="fill" size={16} />
                <span>{event.rating}</span>
                <span className="text-neutral-500">({event.reviewCount})</span>
              </div>
            </div>
            <div className="text-white font-medium">
              {event.price === 'free' ? 'Free' : `$${event.price}`}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>

          {/* RSVP Button */}
          <button className={`w-full py-3 rounded-xl font-medium transition-colors ${
            event.isAttending
              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
              : 'bg-brand-500 hover:bg-brand-600 text-white'
          }`}>
            {event.isAttending ? 'Attending' : 'RSVP'}
          </button>
        </div>
      </motion.div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-light text-white">Events</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm transition-colors">
              <Plus weight="bold" size={16} />
              Create Event
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <MagnifyingGlass weight="bold" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mb-4">
            {[
              { id: 'all', label: 'All' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'attending', label: 'Attending' },
              { id: 'saved', label: 'Saved' }
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

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-brand-500 text-white'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  <Icon weight="bold" size={16} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-md mx-auto px-6 py-6">
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar weight="thin" size={64} className="text-neutral-600 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No events found</h3>
            <p className="text-neutral-400 text-sm mb-6">
              {searchQuery ? 'Try adjusting your search' : 'Be the first to create an event!'}
            </p>
            <button className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-colors">
              Create Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
