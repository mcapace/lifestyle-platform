"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users,
  CheckCircle,
  Star,
  Share,
  Heart,
  Clock
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Mock event details
const eventData = {
  id: 1,
  title: "Exclusive Yacht Party",
  type: "CLUB_NIGHT",
  date: "Nov 15, 2024",
  time: "9:00 PM - 2:00 AM",
  location: "Miami Marina",
  address: "1000 Marina Blvd, Miami, FL", // Only visible after RSVP
  hostName: "Elite Events Miami",
  hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  hostVerified: true,
  coverPhoto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
    "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=800&q=80"
  ],
  attendees: 45,
  capacity: 80,
  price: 75,
  rating: 4.8,
  reviewCount: 24,
  verificationRequired: "Enhanced verification required",
  couplesOnly: false,
  ageRange: "25-45",
  dresscode: "Upscale casual - no jeans or sneakers",
  description: `Join us for an unforgettable evening on our private yacht. This exclusive event is for verified members only.

What to expect:
• Welcome cocktails upon boarding
• Open premium bar
• DJ & dancing
• Multiple social areas
• Lifestyle-friendly environment
• Professional photography (opt-in)

Rules:
• Respect boundaries - consent is everything
• No phones in certain areas
• What happens on the yacht, stays on the yacht
• Be respectful to staff and other guests`,
  tags: ["Verified Only", "Open Bar", "DJ", "Premium", "Adults Only"],
  reviews: [
    {
      user: "Jennifer & Mark",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&q=80",
      rating: 5,
      text: "Amazing event! Great crowd, perfect vibes. The yacht was beautiful and the hosts were professional.",
      date: "Last month",
      verified: true
    },
    {
      user: "Amanda",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      rating: 5,
      text: "Best lifestyle event I've attended in Miami. Everyone was respectful and the atmosphere was perfect.",
      date: "2 months ago",
      verified: true
    }
  ]
};

export default function EventDetailsPage() {
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"details" | "attendees" | "reviews">("details");

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/events" className="text-neutral-500 hover:text-white transition-colors">
              <ArrowLeft weight="bold" size={24} />
            </Link>
            <button className="text-neutral-500 hover:text-white transition-colors">
              <Share weight="bold" size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Cover Photo */}
        <div className="relative aspect-[16/9]">
          <Image
            src={eventData.coverPhoto}
            alt={eventData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          {/* Quick Stats */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star weight="fill" size={16} className="text-brand-500" />
              <span className="text-white font-light text-sm">{eventData.rating}</span>
              <span className="text-white/60 text-sm font-light">({eventData.reviewCount} reviews)</span>
            </div>
            <div className="px-3 py-1.5 bg-brand-500 rounded-full">
              <span className="text-sm font-medium text-white">${eventData.price}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Title & Host */}
          <div>
            <h1 className="text-3xl font-light text-white mb-2">{eventData.title}</h1>
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-sm font-light">by {eventData.hostName}</span>
              {eventData.hostVerified && (
                <CheckCircle weight="fill" size={14} className="text-brand-500" />
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-neutral-800">
            {[
              { key: "details", label: "Details" },
              { key: "attendees", label: `Attendees (${eventData.attendees})` },
              { key: "reviews", label: "Reviews" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as 'details' | 'attendees' | 'reviews')}
                className={`pb-3 text-sm font-light transition-colors relative ${
                  selectedTab === tab.key ? "text-white" : "text-neutral-500"
                }`}
              >
                {tab.label}
                {selectedTab === tab.key && (
                  <motion.div
                    layoutId="activeEventTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {selectedTab === "details" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Key Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar weight="fill" size={20} className="text-brand-500 mt-0.5" />
                  <div>
                    <div className="text-white font-light">{eventData.date}</div>
                    <div className="text-sm text-neutral-500 font-light">{eventData.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin weight="fill" size={20} className="text-brand-500 mt-0.5" />
                  <div>
                    <div className="text-white font-light">{eventData.location}</div>
                    {hasRSVPd && (
                      <div className="text-sm text-neutral-500 font-light">{eventData.address}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users weight="fill" size={20} className="text-brand-500 mt-0.5" />
                  <div>
                    <div className="text-white font-light">{eventData.attendees} / {eventData.capacity} attending</div>
                    <div className="text-sm text-neutral-500 font-light">
                      {Math.round((eventData.attendees / eventData.capacity) * 100)}% full
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm text-neutral-600 uppercase tracking-wider mb-3 font-light">
                  About This Event
                </h3>
                <p className="text-white font-light leading-relaxed whitespace-pre-line text-sm">
                  {eventData.description}
                </p>
              </div>

              {/* Requirements */}
              <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                <h3 className="text-sm text-neutral-600 uppercase tracking-wider mb-3 font-light">
                  Requirements
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle weight="fill" size={16} className="text-brand-500" />
                    <span className="text-sm text-white font-light">{eventData.verificationRequired}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle weight="fill" size={16} className="text-brand-500" />
                    <span className="text-sm text-white font-light">Ages {eventData.ageRange}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle weight="fill" size={16} className="text-brand-500" />
                    <span className="text-sm text-white font-light">{eventData.dresscode}</span>
                  </div>
                  {eventData.couplesOnly && (
                    <div className="flex items-center gap-2">
                      <CheckCircle weight="fill" size={16} className="text-brand-500" />
                      <span className="text-sm text-white font-light">Couples only</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === "attendees" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <p className="text-sm text-neutral-500 font-light mb-4">
                {hasRSVPd ? "See who's attending:" : "RSVP to see attendee list"}
              </p>
              
              {hasRSVPd ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-neutral-900/30 border border-neutral-800 rounded-xl">
                      <div className="w-12 h-12 bg-neutral-800 rounded-full" />
                      <div className="flex-1">
                        <div className="text-white font-light text-sm">Name Hidden</div>
                        <div className="text-xs text-neutral-600 font-light">Verified member</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-neutral-900/30 border border-neutral-800 rounded-xl text-center">
                  <Users weight="thin" size={48} className="text-neutral-700 mx-auto mb-3" />
                  <p className="text-neutral-500 font-light text-sm">
                    Attendee list is private until you RSVP
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === "reviews" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {eventData.reviews.map((review, index) => (
                <div key={index} className="p-4 bg-neutral-900/30 border border-neutral-800 rounded-xl">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-800">
                      <Image src={review.avatar} alt={review.user} width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-light text-sm">{review.user}</span>
                        {review.verified && (
                          <CheckCircle weight="fill" size={12} className="text-brand-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              weight="fill"
                              size={12}
                              className={i < review.rating ? "text-brand-500" : "text-neutral-700"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-neutral-600 font-light">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom RSVP Button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          {hasRSVPd ? (
            <div className="flex items-center justify-center gap-2 h-14 bg-brand-500/10 border border-brand-500/30 rounded-2xl">
              <CheckCircle weight="fill" size={20} className="text-brand-500" />
              <span className="text-white font-light">You&apos;re attending!</span>
            </div>
          ) : (
            <MagneticButton
              onClick={() => setHasRSVPd(true)}
              className="w-full h-14 bg-brand-500 hover:bg-brand-600 text-white font-medium text-base"
            >
              RSVP for ${eventData.price}
              <Ticket className="ml-2 w-5 h-5" />
            </MagneticButton>
          )}
        </div>
      </div>
    </div>
  );
}

function Ticket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 256 256" fill="currentColor">
      <path d="M232,104a8,8,0,0,0,8-8V64a16,16,0,0,0-16-16H32A16,16,0,0,0,16,64V96a8,8,0,0,0,8,8,24,24,0,0,1,0,48,8,8,0,0,0-8,8v32a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160a8,8,0,0,0-8-8,24,24,0,0,1,0-48ZM32,167.2a40,40,0,0,0,0-78.4V64H88V192H32Zm192,0V192H104V64H224V88.8a40,40,0,0,0,0,78.4Z" />
    </svg>
  );
}


