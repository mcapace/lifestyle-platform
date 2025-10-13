"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useHaptics } from '@/lib/haptics/advanced-feedback';
import { 
  Heart, 
  X, 
  Star, 
  Shield, 
  Crown, 
  Eye, 
  Camera, 
  MapPin,
  Calendar,
  Users,
  Sparkle,
  Info
} from '@phosphor-icons/react';
import Image from 'next/image';

interface ProfileCard3DProps {
  profile: {
    id: string;
    name: string;
    age: number;
    location: string;
    photos: string[];
    bio: string;
    verified: boolean;
    membershipTier: 'FREE' | 'PREMIUM' | 'VIP';
    trustScore: number;
    compatibility: number;
    interests: string[];
    experienceLevel: string;
    lastActive: Date;
    distance: number;
  };
  onSwipe: (direction: 'left' | 'right') => void;
  onSuperLike: () => void;
  onProfileView: () => void;
  index: number;
  totalCards: number;
}

export function ProfileCard3D({
  profile,
  onSwipe,
  onSuperLike,
  onProfileView,
  index,
  totalCards
}: ProfileCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  const { trigger } = useHaptics();

  // Motion values for 3D transforms
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  // Spring animations for smooth interactions
  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  // 3D transform calculations
  const cardTransform = useTransform(
    [xSpring, ySpring, rotateXSpring, rotateYSpring, scaleSpring],
    ([x, y, rx, ry, s]) => 
      `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateX(${x}px) translateY(${y}px) scale(${s})`
  );

  // Gesture handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const maxTilt = 15;
    const maxOffset = 50;
    
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = (mouseX / rect.width) * maxTilt;
    
    const offsetX = (mouseX / rect.width) * maxOffset;
    const offsetY = (mouseY / rect.height) * maxOffset;
    
    rotateX.set(-tiltX);
    rotateY.set(tiltY);
    x.set(offsetX * 0.1);
    y.set(offsetY * 0.1);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const handleMouseEnter = () => {
    scale.set(1.02);
    trigger('BUTTON_PRESS');
  };

  // Swipe gestures
  const handleSwipeStart = () => {
    trigger('SWIPE_GESTURE');
  };

  const handleSwipeEnd = (direction: 'left' | 'right') => {
    const swipeDistance = direction === 'left' ? -300 : 300;
    
    x.set(swipeDistance);
    scale.set(0.8);
    
    setTimeout(() => {
      onSwipe(direction);
    }, 300);
  };

  // Photo navigation
  const nextPhoto = () => {
    if (currentPhotoIndex < profile.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
      trigger('BUTTON_PRESS');
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
      trigger('BUTTON_PRESS');
    }
  };

  // Super like with special animation
  const handleSuperLike = () => {
    trigger('VIP_UPGRADE');
    setShowDetails(true);
    setTimeout(() => {
      onSuperLike();
    }, 1000);
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 cursor-pointer"
      style={{
        transform: cardTransform,
        zIndex: totalCards - index,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {/* Main Card */}
      <div className="relative w-full h-full bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        
        {/* Photo Container */}
        <div className="relative h-full w-full">
          <Image
            src={profile.photos[currentPhotoIndex]}
            alt={profile.name}
            fill
            className="object-cover"
            priority={index === 0}
          />
          
          {/* Photo Navigation */}
          {profile.photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                disabled={currentPhotoIndex === 0}
              >
                <Camera weight="bold" size={16} className="rotate-180" />
              </button>
              
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                disabled={currentPhotoIndex === profile.photos.length - 1}
              >
                <Camera weight="bold" size={16} />
              </button>
              
              {/* Photo Indicators */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                {profile.photos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Top Info Bar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {profile.verified && (
                <div className="w-8 h-8 bg-brand-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Shield weight="fill" size={14} className="text-white" />
                </div>
              )}
              
              {profile.membershipTier === 'VIP' && (
                <div className="w-8 h-8 bg-amber-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Crown weight="fill" size={14} className="text-white" />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <Info weight="bold" size={14} />
              </button>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-2xl font-light text-white mb-1">
                  {profile.name}, {profile.age}
                </h2>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin weight="bold" size={14} />
                  <span className="text-sm">{profile.distance} miles away</span>
                </div>
              </div>
              
              {/* Compatibility Score */}
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Heart weight="fill" size={16} className="text-brand-500" />
                  <span className="text-lg font-medium text-white">
                    {profile.compatibility}%
                  </span>
                </div>
                <div className="text-xs text-white/60">Compatibility</div>
              </div>
            </div>

            {/* Bio Preview */}
            <p className="text-white/90 text-sm line-clamp-2 mb-4">
              {profile.bio}
            </p>

            {/* Interest Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.interests.slice(0, 3).map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white"
                >
                  {interest}
                </span>
              ))}
              {profile.interests.length > 3 && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                  +{profile.interests.length - 3} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Pass Button */}
                <button
                  onClick={() => handleSwipeEnd('left')}
                  onTouchStart={handleSwipeStart}
                  className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500/50 transition-colors"
                >
                  <X weight="bold" size={24} />
                </button>

                {/* Super Like Button */}
                <button
                  onClick={handleSuperLike}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <Star weight="fill" size={20} />
                </button>

                {/* Like Button */}
                <button
                  onClick={() => handleSwipeEnd('right')}
                  onTouchStart={handleSwipeStart}
                  className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-green-500/50 transition-colors"
                >
                  <Heart weight="bold" size={24} />
                </button>
              </div>

              {/* Profile View Button */}
              <button
                onClick={onProfileView}
                className="px-4 py-2 bg-brand-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium hover:bg-brand-600 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Details Overlay */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowDetails(false)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-light text-white">Profile Details</h3>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white"
                    >
                      <X weight="bold" size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Experience Level:</span>
                      <span className="text-white ml-2">{profile.experienceLevel}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Trust Score:</span>
                      <span className="text-white ml-2">{profile.trustScore}/100</span>
                    </div>
                    <div>
                      <span className="text-white/60">Last Active:</span>
                      <span className="text-white ml-2">
                        {profile.lastActive.toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/60">Membership:</span>
                      <span className="text-white ml-2">{profile.membershipTier}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-white/60 text-sm">Full Bio:</span>
                    <p className="text-white mt-1">{profile.bio}</p>
                  </div>

                  <div>
                    <span className="text-white/60 text-sm">All Interests:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 bg-brand-500/20 border border-brand-500/30 rounded-full text-xs text-brand-300"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Stack of 3D profile cards
interface ProfileCardStackProps {
  profiles: any[];
  onSwipe: (profileId: string, direction: 'left' | 'right') => void;
  onSuperLike: (profileId: string) => void;
  onProfileView: (profileId: string) => void;
}

export function ProfileCardStack({
  profiles,
  onSwipe,
  onSuperLike,
  onProfileView
}: ProfileCardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (profiles[currentIndex]) {
      onSwipe(profiles[currentIndex].id, direction);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSuperLike = () => {
    if (profiles[currentIndex]) {
      onSuperLike(profiles[currentIndex].id);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleProfileView = () => {
    if (profiles[currentIndex]) {
      onProfileView(profiles[currentIndex].id);
    }
  };

  return (
    <div className="relative w-full h-[600px] max-w-sm mx-auto">
      {profiles.slice(currentIndex, currentIndex + 3).map((profile, index) => (
        <ProfileCard3D
          key={profile.id}
          profile={profile}
          onSwipe={handleSwipe}
          onSuperLike={handleSuperLike}
          onProfileView={handleProfileView}
          index={index}
          totalCards={profiles.length}
        />
      ))}
      
      {/* Empty State */}
      {currentIndex >= profiles.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-neutral-900 rounded-3xl border border-neutral-800 flex flex-col items-center justify-center text-center p-8"
        >
          <Sparkle weight="thin" size={64} className="text-neutral-600 mb-4" />
          <h3 className="text-xl font-light text-white mb-2">No more profiles</h3>
            <p className="text-neutral-500 font-light mb-6">
              You&apos;ve seen everyone in your area! Check back later for new profiles.
            </p>
          <button className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-light transition-colors">
            Refresh Profiles
          </button>
        </motion.div>
      )}
    </div>
  );
}
