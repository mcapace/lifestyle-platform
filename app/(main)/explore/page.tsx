"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlass,
  Funnel,
  MapPin,
  Calendar,
  Users,
  Star,
  Crown,
  CheckCircle,
  Lightning,
  Heart,
  Sparkle,
  Fire,
  Globe,
  List,
  NavigationArrow,
  Target,
  Plus,
  Minus,
  BookmarkSimple
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

interface MapMarker {
  id: string;
  type: 'event' | 'community' | 'user';
  title: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  category: string;
  image?: string;
  attendees?: number;
  members?: number;
  rating?: number;
  isPremium?: boolean;
  isTrending?: boolean;
  date?: string;
}

const mockMarkers: MapMarker[] = [
  {
    id: '1',
    type: 'event',
    title: 'Sunset Wellness Circle',
    location: {
      lat: 25.7617,
      lng: -80.1918,
      address: 'South Beach, Miami'
    },
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80',
    attendees: 45,
    rating: 4.8,
    isTrending: true,
    date: 'Oct 25, 6:00 PM'
  },
  {
    id: '2',
    type: 'event',
    title: 'Art Gallery Opening',
    location: {
      lat: 25.8010,
      lng: -80.1990,
      address: 'Wynwood Arts District'
    },
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1579783902671-97597589b74e?w=400&q=80',
    attendees: 89,
    rating: 4.9,
    date: 'Oct 26, 7:00 PM'
  },
  {
    id: '3',
    type: 'community',
    title: 'Miami Lifestyle Explorers',
    location: {
      lat: 25.7907,
      lng: -80.1300,
      address: 'Downtown Miami'
    },
    category: 'local',
    members: 1247,
    rating: 4.7,
    isTrending: true
  },
  {
    id: '4',
    type: 'event',
    title: 'Rooftop Mixer',
    location: {
      lat: 25.7663,
      lng: -80.1911,
      address: 'Brickell, Miami'
    },
    category: 'nightlife',
    image: 'https://images.unsplash.com/photo-1533174072545-7bd469c76857?w=400&q=80',
    attendees: 67,
    isPremium: true,
    date: 'Oct 26, 9:00 PM'
  },
  {
    id: '5',
    type: 'community',
    title: 'Wellness & Mindfulness',
    location: {
      lat: 25.7750,
      lng: -80.1850,
      address: 'Miami Beach'
    },
    category: 'wellness',
    members: 892,
    rating: 4.9
  }
];

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapZoom, setMapZoom] = useState(13);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All', icon: Globe },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'wellness', label: 'Wellness', icon: Heart },
    { id: 'nightlife', label: 'Nightlife', icon: Lightning },
    { id: 'culture', label: 'Culture', icon: Star }
  ];

  const filteredMarkers = mockMarkers.filter(marker => {
    const matchesSearch = searchQuery === '' || 
      marker.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' ||
      (selectedCategory === 'events' && marker.type === 'event') ||
      (selectedCategory === 'communities' && marker.type === 'community') ||
      marker.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const MarkerCard = ({ marker }: { marker: MapMarker }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden"
    >
      {marker.image && (
        <div className="relative h-32">
          <Image
            src={marker.image}
            alt={marker.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {marker.isTrending && (
            <span className="absolute top-2 left-2 px-2 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
              <Fire weight="fill" size={12} />
              Trending
            </span>
          )}
          {marker.isPremium && (
            <span className="absolute top-2 left-2 px-2 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
              <Crown weight="fill" size={12} />
              Premium
            </span>
          )}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="px-2 py-1 bg-brand-500/10 text-brand-400 border border-brand-500/20 rounded-full text-xs font-medium">
              {marker.type === 'event' ? 'Event' : 'Community'}
            </span>
            <h3 className="text-white font-medium mt-2">{marker.title}</h3>
          </div>
          <button className="p-2 text-neutral-400 hover:text-brand-400 transition-colors">
            <BookmarkSimple weight="regular" size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-neutral-400 text-sm mb-3">
          <MapPin weight="bold" size={14} />
          <span className="truncate">{marker.location.address}</span>
        </div>

        {marker.date && (
          <div className="flex items-center gap-2 text-neutral-400 text-sm mb-3">
            <Calendar weight="bold" size={14} />
            <span>{marker.date}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            {marker.attendees !== undefined && (
              <div className="flex items-center gap-1 text-neutral-400">
                <Users weight="bold" size={16} />
                <span>{marker.attendees}</span>
              </div>
            )}
            {marker.members !== undefined && (
              <div className="flex items-center gap-1 text-neutral-400">
                <Users weight="bold" size={16} />
                <span>{marker.members}</span>
              </div>
            )}
            {marker.rating && (
              <div className="flex items-center gap-1 text-amber-400">
                <Star weight="fill" size={16} />
                <span>{marker.rating}</span>
              </div>
            )}
          </div>
          <Link
            href={marker.type === 'event' ? `/events/${marker.id}` : `/communities/${marker.id}`}
            className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );

  const MapView = () => (
    <div className="relative h-full bg-neutral-900">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Map Grid Lines (simulated) */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Markers */}
      <div className="absolute inset-0">
        {filteredMarkers.map((marker, index) => {
          const top = 20 + (index * 15) % 60;
          const left = 15 + (index * 20) % 70;
          
          return (
            <motion.button
              key={marker.id}
              initial={{ scale: 0 }}
              animate={{ scale: selectedMarker?.id === marker.id ? 1.2 : 1 }}
              onClick={() => setSelectedMarker(marker)}
              className={`absolute w-12 h-12 rounded-full transition-all ${
                selectedMarker?.id === marker.id 
                  ? 'ring-4 ring-brand-500 z-20' 
                  : 'ring-2 ring-white/20 z-10'
              }`}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className={`w-full h-full rounded-full flex items-center justify-center ${
                marker.type === 'event' ? 'bg-blue-500' : 'bg-amber-500'
              }`}>
                {marker.type === 'event' ? (
                  <Calendar weight="fill" size={20} className="text-white" />
                ) : (
                  <Users weight="fill" size={20} className="text-white" />
                )}
              </div>
              
              {/* Pulse Animation */}
              {marker.isTrending && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full bg-red-500"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setMapZoom(Math.min(mapZoom + 1, 18))}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <Plus weight="bold" size={20} className="text-neutral-900" />
        </button>
        <button
          onClick={() => setMapZoom(Math.max(mapZoom - 1, 10))}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <Minus weight="bold" size={20} className="text-neutral-900" />
        </button>
        <button className="w-10 h-10 bg-brand-500 hover:bg-brand-600 rounded-lg flex items-center justify-center shadow-lg transition-colors">
          <Target weight="bold" size={20} className="text-white" />
        </button>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
        Zoom: {mapZoom}
      </div>

      {/* Selected Marker Card */}
      <AnimatePresence>
        {selectedMarker && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-20 left-4 right-4"
          >
            <MarkerCard marker={selectedMarker} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const ListView = () => (
    <div className="space-y-4 p-6">
      {filteredMarkers.map((marker) => (
        <MarkerCard key={marker.id} marker={marker} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-light text-white">Explore Map</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map' ? 'bg-brand-500 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <MapPin weight="bold" size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-brand-500 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <List weight="bold" size={20} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <MagnifyingGlass weight="bold" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors"
            />
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

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'map' ? (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <MapView />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto"
            >
              <ListView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Banner */}
      <div className="sticky bottom-20 mx-6 mb-4">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <NavigationArrow weight="fill" size={24} className="text-purple-400 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium text-sm mb-1">Discover Nearby</h4>
              <p className="text-neutral-300 text-xs">
                Explore events and communities in your area. Tap markers to see details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

