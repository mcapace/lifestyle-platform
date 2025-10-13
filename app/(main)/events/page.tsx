"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Crown, 
  Shield,
  Sparkle,
  Clock,
  Ticket,
  Heart,
  Funnel,
  MagnifyingGlass,
  SlidersHorizontal
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

// UI Components
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

// Premium event data structure
interface PremiumEvent {
  id: string;
  title: string;
  description: string;
  type: 'HOUSE_PARTY' | 'CLUB_NIGHT' | 'RESORT_WEEKEND' | 'MEET_AND_GREET' | 'HOTEL_TAKEOVER' | 'WORKSHOP';
  date: string;
  time: string;
  location: string;
  address: string; // Only visible to RSVPs
  host: {
    name: string;
    verified: boolean;
    trustScore: number;
    avatar: string;
  };
  capacity: number;
  rsvpCount: number;
  pricing: {
    free: boolean;
    amount?: number;
    currency: string;
  };
  requirements: {
    verificationLevel: 'BASIC' | 'ENHANCED' | 'PREMIUM';
    ageMin: number;
    ageMax?: number;
    couplesOnly: boolean;
    membershipTier: 'FREE' | 'PREMIUM' | 'VIP';
  };
  coverPhoto: string;
  gallery: string[];
  dressCode: string;
  rules: string[];
  avgRating: number;
  reviewCount: number;
  featured: boolean;
  premium: boolean;
  distance: number;
  tags: string[];
}

// Mock premium events data
const premiumEvents: PremiumEvent[] = [
  {
    id: "1",
    title: "Exclusive Miami Beach Lifestyle Soirée",
    description: "An intimate gathering for sophisticated couples and singles in a stunning oceanfront penthouse. Expect champagne, gourmet catering, and meaningful connections.",
    type: "HOUSE_PARTY",
    date: "2024-11-15",
    time: "20:00",
    location: "Miami Beach, FL",
    address: "Ocean Drive Penthouse (Address shared after RSVP)",
    host: {
      name: "Sarah & Michael",
      verified: true,
      trustScore: 98,
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80"
    },
    capacity: 24,
    rsvpCount: 18,
    pricing: {
      free: false,
      amount: 150,
      currency: "USD"
    },
    requirements: {
      verificationLevel: "ENHANCED",
      ageMin: 28,
      ageMax: 45,
      couplesOnly: false,
      membershipTier: "PREMIUM"
    },
    coverPhoto: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
    ],
    dressCode: "Cocktail attire - Elegant and sophisticated",
    rules: [
      "No photography without consent",
      "Respectful behavior required",
      "No single men without prior approval",
      "RSVP required 48 hours in advance"
    ],
    avgRating: 4.9,
    reviewCount: 23,
    featured: true,
    premium: true,
    distance: 2.3,
    tags: ["Luxury", "Oceanfront", "Gourmet", "Intimate"]
  },
  {
    id: "2",
    title: "Newcomer Welcome Workshop",
    description: "A safe, educational environment for those new to the lifestyle. Learn about etiquette, communication, and building healthy connections.",
    type: "WORKSHOP",
    date: "2024-11-18",
    time: "14:00",
    location: "Fort Lauderdale, FL",
    address: "Private Venue (Address shared after RSVP)",
    host: {
      name: "Dr. Amanda Chen",
      verified: true,
      trustScore: 96,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
    },
    capacity: 40,
    rsvpCount: 32,
    pricing: {
      free: true,
      currency: "USD"
    },
    requirements: {
      verificationLevel: "BASIC",
      ageMin: 21,
      couplesOnly: false,
      membershipTier: "FREE"
    },
    coverPhoto: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    gallery: [],
    dressCode: "Smart casual",
    rules: [
      "Educational content only",
      "Respectful questions welcome",
      "Confidentiality required"
    ],
    avgRating: 4.8,
    reviewCount: 45,
    featured: false,
    premium: false,
    distance: 8.7,
    tags: ["Educational", "Newcomer Friendly", "Safe Space"]
  },
  {
    id: "3",
    title: "VIP Resort Weekend Experience",
    description: "An exclusive 3-day lifestyle retreat at a luxury resort. Includes accommodation, meals, workshops, and private events.",
    type: "RESORT_WEEKEND",
    date: "2024-12-06",
    time: "15:00",
    location: "Key West, FL",
    address: "Luxury Resort (Full details after booking)",
    host: {
      name: "Lifestyle Events Miami",
      verified: true,
      trustScore: 99,
      avatar: "https://images.unsplash.com/photo-1606122017369-d782bbb78f32?w=400&q=80"
    },
    capacity: 60,
    rsvpCount: 47,
    pricing: {
      free: false,
      amount: 1200,
      currency: "USD"
    },
    requirements: {
      verificationLevel: "PREMIUM",
      ageMin: 25,
      ageMax: 50,
      couplesOnly: true,
      membershipTier: "VIP"
    },
    coverPhoto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    gallery: [],
    dressCode: "Resort elegant",
    rules: [
      "Couples only event",
      "Full weekend commitment required",
      "No photography policy",
      "Premium verification required"
    ],
    avgRating: 4.9,
    reviewCount: 18,
    featured: true,
    premium: true,
    distance: 120.5,
    tags: ["VIP", "Resort", "Weekend", "Couples Only", "Luxury"]
  }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    type: "ALL",
    verification: "ALL",
    membership: "ALL",
    distance: 50,
    price: "ALL"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "rating" | "distance" | "capacity">("date");

  // Filter and search events
  const filteredEvents = premiumEvents
    .filter(event => {
      // Search filter
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Type filter
      if (selectedFilters.type !== "ALL" && event.type !== selectedFilters.type) {
        return false;
      }

      // Verification filter
      if (selectedFilters.verification !== "ALL" && event.requirements.verificationLevel !== selectedFilters.verification) {
        return false;
      }

      // Membership filter
      if (selectedFilters.membership !== "ALL" && event.requirements.membershipTier !== selectedFilters.membership) {
        return false;
      }

      // Distance filter
      if (event.distance > selectedFilters.distance) {
        return false;
      }

      // Price filter
      if (selectedFilters.price !== "ALL") {
        if (selectedFilters.price === "FREE" && !event.pricing.free) return false;
        if (selectedFilters.price === "PAID" && event.pricing.free) return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.avgRating - a.avgRating;
        case "distance":
          return a.distance - b.distance;
        case "capacity":
          return b.capacity - a.capacity;
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light text-white">Premium Events</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <SlidersHorizontal weight="bold" size={24} />
            </button>
          </div>

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
              placeholder="Search premium events..."
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
                className="space-y-4"
              >
                {/* Filter Options */}
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={selectedFilters.type}
                    onChange={(e) => setSelectedFilters({...selectedFilters, type: e.target.value})}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="ALL">All Types</option>
                    <option value="HOUSE_PARTY">House Party</option>
                    <option value="CLUB_NIGHT">Club Night</option>
                    <option value="WORKSHOP">Workshop</option>
                    <option value="MEET_AND_GREET">Meet & Greet</option>
                    <option value="RESORT_WEEKEND">Resort Weekend</option>
                  </select>

                  <select
                    value={selectedFilters.verification}
                    onChange={(e) => setSelectedFilters({...selectedFilters, verification: e.target.value})}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="ALL">All Verification</option>
                    <option value="BASIC">Basic</option>
                    <option value="ENHANCED">Enhanced</option>
                    <option value="PREMIUM">Premium</option>
                  </select>

                  <select
                    value={selectedFilters.membership}
                    onChange={(e) => setSelectedFilters({...selectedFilters, membership: e.target.value})}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="ALL">All Memberships</option>
                    <option value="FREE">Free</option>
                    <option value="PREMIUM">Premium</option>
                    <option value="VIP">VIP</option>
                  </select>

                  <select
                    value={selectedFilters.price}
                    onChange={(e) => setSelectedFilters({...selectedFilters, price: e.target.value})}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="ALL">All Prices</option>
                    <option value="FREE">Free Events</option>
                    <option value="PAID">Paid Events</option>
                  </select>
                </div>

                {/* Sort Options */}
                <div className="flex gap-2 overflow-x-auto">
                  {[
                    { value: "date", label: "Date" },
                    { value: "rating", label: "Rating" },
                    { value: "distance", label: "Distance" },
                    { value: "capacity", label: "Availability" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value as any)}
                      className={`px-4 py-2 rounded-full text-xs font-light transition-all whitespace-nowrap ${
                        sortBy === option.value
                          ? "bg-brand-500 text-white"
                          : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        <AnimatePresence>
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/events/${event.id}`}>
                <Card className="border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900/70 transition-all duration-300 group cursor-pointer">
                  <div className="relative">
                    {/* Event Image */}
                    <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                      <Image
                        src={event.coverPhoto}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Featured Badge */}
                      {event.featured && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-brand-500/90 backdrop-blur-sm rounded-full">
                          <Sparkle weight="fill" size={12} className="text-white" />
                          <span className="text-xs font-medium text-white">Featured</span>
                        </div>
                      )}

                      {/* Premium Badge */}
                      {event.premium && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full">
                          <Crown weight="fill" size={12} className="text-white" />
                          <span className="text-xs font-medium text-white">Premium</span>
                        </div>
                      )}

                      {/* Price Badge */}
                      <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
                        <span className="text-sm font-medium text-white">
                          {event.pricing.free ? "Free" : `$${event.pricing.amount}`}
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      {/* Event Info */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-light text-white mb-1 group-hover:text-brand-400 transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-sm text-neutral-400 line-clamp-2">
                            {event.description}
                          </p>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-neutral-400">
                            <Calendar weight="bold" size={14} />
                            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-neutral-400">
                            <MapPin weight="bold" size={14} />
                            <span>{event.location} • {event.distance} miles away</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-neutral-400">
                            <Users weight="bold" size={14} />
                            <span>{event.rsvpCount}/{event.capacity} attending</span>
                          </div>
                        </div>

                        {/* Host Info */}
                        <div className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-xl">
                          <Image
                            src={event.host.avatar}
                            alt={event.host.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white font-light">{event.host.name}</span>
                              {event.host.verified && (
                                <Shield weight="fill" size={12} className="text-brand-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-neutral-500">Trust Score: {event.host.trustScore}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    weight={i < Math.floor(event.avgRating) ? "fill" : "regular"}
                                    size={10}
                                    className="text-amber-400"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Requirements */}
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            event.requirements.verificationLevel === 'PREMIUM' 
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : event.requirements.verificationLevel === 'ENHANCED'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-neutral-600/20 text-neutral-400 border border-neutral-600/30'
                          }`}>
                            {event.requirements.verificationLevel} Required
                          </span>
                          
                          {event.requirements.couplesOnly && (
                            <span className="px-2 py-1 bg-pink-500/20 text-pink-400 border border-pink-500/30 rounded-full text-xs">
                              Couples Only
                            </span>
                          )}
                          
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            event.requirements.membershipTier === 'VIP'
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : event.requirements.membershipTier === 'PREMIUM'
                              ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                              : 'bg-neutral-600/20 text-neutral-400 border border-neutral-600/30'
                          }`}>
                            {event.requirements.membershipTier} Membership
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {event.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <Calendar weight="thin" size={64} className="text-neutral-800 mx-auto mb-4" />
            <h3 className="text-xl font-light text-white mb-2">No events found</h3>
            <p className="text-neutral-500 font-light">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}