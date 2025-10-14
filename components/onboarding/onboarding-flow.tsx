"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  ArrowLeft,
  Check,
  Camera,
  Upload,
  Sparkle,
  Heart,
  MapPin,
  Calendar,
  Crown,
  Shield,
  Info,
  Plus,
  X,
  Globe,
  Coffee,
  Palette,
  MusicNotes,
  Book,
  Airplane,
  Barbell,
  Users,
  Wine,
  GameController,
  GraduationCap,
  Briefcase,
  Star,
  Lock,
  Eye,
  CheckCircle
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useHaptics } from "@/lib/haptics/advanced-feedback";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
}

interface OnboardingData {
  // Step 1: Welcome (skip)
  // Step 2: Basics
  name: string;
  birthday: string;
  gender: string;
  location: string;
  bio: string;
  
  // Step 3: Photos
  photos: string[];
  
  // Step 4: Interests
  interests: string[];
  
  // Step 5: Lifestyle Preferences
  lifestyleGoals: string[];
  experienceLevel: 'curious' | 'intermediate' | 'experienced';
  lookingFor: string[];
  
  // Step 6: Verification
  photoVerified: boolean;
  idVerified: boolean;
  
  // Step 7: Tier Selection
  selectedTier: 'curious' | 'explorer' | 'connoisseur';
}

const INTERESTS_OPTIONS = [
  { id: 'wellness', label: 'Wellness & Fitness', icon: Barbell, color: 'green' },
  { id: 'travel', label: 'Travel & Adventure', icon: Airplane, color: 'blue' },
  { id: 'food', label: 'Food & Wine', icon: Wine, color: 'amber' },
  { id: 'arts', label: 'Arts & Culture', icon: Palette, color: 'purple' },
  { id: 'music', label: 'Music & Events', icon: MusicNotes, color: 'pink' },
  { id: 'nightlife', label: 'Nightlife', icon: Coffee, color: 'orange' },
  { id: 'reading', label: 'Reading & Learning', icon: Book, color: 'indigo' },
  { id: 'business', label: 'Business & Networking', icon: Briefcase, color: 'slate' },
  { id: 'gaming', label: 'Gaming & Tech', icon: GameController, color: 'cyan' },
  { id: 'education', label: 'Education & Growth', icon: GraduationCap, color: 'teal' }
];

const LIFESTYLE_GOALS = [
  'Make meaningful connections',
  'Explore new experiences',
  'Join lifestyle communities',
  'Attend exclusive events',
  'Find like-minded friends',
  'Discover hidden gems',
  'Network professionally',
  'Personal growth',
  'Cultural exploration',
  'Build relationships'
];

const LOOKING_FOR = [
  'Friendship',
  'Networking',
  'Dating',
  'Activity Partners',
  'Community',
  'Events',
  'Exploration',
  'Mentorship'
];

export default function OnboardingFlow() {
  const router = useRouter();
  const { trigger } = useHaptics();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    birthday: '',
    gender: '',
    location: '',
    bio: '',
    photos: [],
    interests: [],
    lifestyleGoals: [],
    experienceLevel: 'curious',
    lookingFor: [],
    photoVerified: false,
    idVerified: false,
    selectedTier: 'curious'
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      trigger('SUCCESS');
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    trigger('SUCCESS');
    // Save to backend
    router.push('/discover');
  };

  // Step 1: Welcome
  const WelcomeStep = () => (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-brand-500 to-purple-500 rounded-full mx-auto flex items-center justify-center"
      >
        <Sparkle weight="fill" size={40} className="text-white" />
      </motion.div>
      
      <div>
        <h2 className="text-3xl font-light text-white mb-3">Welcome to ELOURA</h2>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-md mx-auto">
          A premium lifestyle exploration platform where authentic connections and curated experiences await.
        </p>
      </div>

      <div className="space-y-3 pt-4">
        <div className="flex items-start gap-3 text-left">
          <CheckCircle weight="fill" size={24} className="text-green-400 flex-shrink-0" />
          <div>
            <h4 className="text-white font-medium">Authentic Community</h4>
            <p className="text-neutral-400 text-sm">Connect with verified, like-minded individuals</p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-left">
          <CheckCircle weight="fill" size={24} className="text-green-400 flex-shrink-0" />
          <div>
            <h4 className="text-white font-medium">Curated Experiences</h4>
            <p className="text-neutral-400 text-sm">Access exclusive events and communities</p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-left">
          <CheckCircle weight="fill" size={24} className="text-green-400 flex-shrink-0" />
          <div>
            <h4 className="text-white font-medium">Privacy First</h4>
            <p className="text-neutral-400 text-sm">Your data and preferences stay in your control</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Basic Info
  const BasicsStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-2">First Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          placeholder="What should we call you?"
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Birthday</label>
        <input
          type="date"
          value={data.birthday}
          onChange={(e) => updateData({ birthday: e.target.value })}
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Gender</label>
        <select
          value={data.gender}
          onChange={(e) => updateData({ gender: e.target.value })}
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-brand-500 transition-colors"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Location</label>
        <div className="relative">
          <MapPin weight="bold" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
            placeholder="City, State"
            className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Bio</label>
        <textarea
          value={data.bio}
          onChange={(e) => updateData({ bio: e.target.value })}
          placeholder="Tell us about yourself and what you're looking to explore..."
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors resize-none"
          rows={4}
        />
        <div className="text-right text-neutral-500 text-sm mt-1">{data.bio.length}/500</div>
      </div>
    </div>
  );

  // Step 3: Photos
  const PhotosStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-white font-medium mb-2">Add Your Photos</h3>
        <p className="text-neutral-400 text-sm">Share photos that showcase your lifestyle and personality</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="aspect-square bg-neutral-800 border-2 border-dashed border-neutral-700 rounded-xl flex items-center justify-center cursor-pointer hover:border-brand-500 transition-colors"
          >
            {data.photos[index] ? (
              <div className="relative w-full h-full">
                <img src={data.photos[index]} alt={`Photo ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
                <button
                  onClick={() => {
                    const newPhotos = [...data.photos];
                    newPhotos.splice(index, 1);
                    updateData({ photos: newPhotos });
                  }}
                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full"
                >
                  <X weight="bold" size={12} className="text-white" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Camera weight="regular" size={24} className="text-neutral-600 mx-auto mb-1" />
                <span className="text-neutral-600 text-xs">Add Photo</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info weight="bold" size={20} className="text-brand-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-white font-medium text-sm mb-1">Photo Tips</h4>
            <ul className="text-neutral-400 text-xs space-y-1">
              <li>• Use clear, recent photos</li>
              <li>• Show your lifestyle and interests</li>
              <li>• Include at least 3 photos</li>
              <li>• No group photos as your first image</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 4: Interests
  const InterestsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-white font-medium mb-2">What are you interested in?</h3>
        <p className="text-neutral-400 text-sm">Select all that apply (minimum 3)</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {INTERESTS_OPTIONS.map((interest) => {
          const Icon = interest.icon;
          const isSelected = data.interests.includes(interest.id);
          return (
            <motion.button
              key={interest.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isSelected) {
                  updateData({ interests: data.interests.filter(i => i !== interest.id) });
                } else {
                  updateData({ interests: [...data.interests, interest.id] });
                }
              }}
              className={`p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? `bg-${interest.color}-500/10 border-${interest.color}-500 text-${interest.color}-400`
                  : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'
              }`}
            >
              <Icon weight="bold" size={24} className="mb-2" />
              <div className="text-sm font-medium">{interest.label}</div>
            </motion.button>
          );
        })}
      </div>

      <div className="text-center text-neutral-400 text-sm">
        {data.interests.length} selected {data.interests.length < 3 && `(select ${3 - data.interests.length} more)`}
      </div>
    </div>
  );

  // Step 5: Lifestyle Preferences
  const LifestyleStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white font-medium mb-2">What are your lifestyle goals?</h3>
        <p className="text-neutral-400 text-sm mb-4">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {LIFESTYLE_GOALS.map((goal) => (
            <button
              key={goal}
              onClick={() => {
                if (data.lifestyleGoals.includes(goal)) {
                  updateData({ lifestyleGoals: data.lifestyleGoals.filter(g => g !== goal) });
                } else {
                  updateData({ lifestyleGoals: [...data.lifestyleGoals, goal] });
                }
              }}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                data.lifestyleGoals.includes(goal)
                  ? 'bg-brand-500 text-white'
                  : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-2">Experience Level</h3>
        <div className="space-y-2">
          {[
            { value: 'curious', label: 'Curious Explorer', desc: 'New to lifestyle exploration' },
            { value: 'intermediate', label: 'Active Explorer', desc: 'Some experience with lifestyle communities' },
            { value: 'experienced', label: 'Seasoned Explorer', desc: 'Experienced in lifestyle exploration' }
          ].map((level) => (
            <label
              key={level.value}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                data.experienceLevel === level.value
                  ? 'bg-brand-500/10 border-brand-500'
                  : 'bg-neutral-800 border-neutral-700'
              }`}
            >
              <input
                type="radio"
                name="experience"
                value={level.value}
                checked={data.experienceLevel === level.value}
                onChange={(e) => updateData({ experienceLevel: e.target.value as any })}
                className="text-brand-500"
              />
              <div>
                <div className="text-white font-medium">{level.label}</div>
                <div className="text-neutral-400 text-sm">{level.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-2">What are you looking for?</h3>
        <div className="flex flex-wrap gap-2">
          {LOOKING_FOR.map((item) => (
            <button
              key={item}
              onClick={() => {
                if (data.lookingFor.includes(item)) {
                  updateData({ lookingFor: data.lookingFor.filter(i => i !== item) });
                } else {
                  updateData({ lookingFor: [...data.lookingFor, item] });
                }
              }}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                data.lookingFor.includes(item)
                  ? 'bg-brand-500 text-white'
                  : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 6: Verification
  const VerificationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield weight="fill" size={48} className="text-brand-400 mx-auto mb-4" />
        <h3 className="text-white font-medium mb-2">Verify Your Profile</h3>
        <p className="text-neutral-400 text-sm">Build trust within the ELOURA community</p>
      </div>

      <div className="space-y-4">
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
          <div className="flex items-start gap-4 mb-4">
            <Camera weight="fill" size={24} className="text-blue-400" />
            <div className="flex-1">
              <h4 className="text-white font-medium mb-1">Photo Verification</h4>
              <p className="text-neutral-400 text-sm mb-3">Take a quick selfie to verify your photos</p>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors">
                Start Photo Verification
              </button>
            </div>
            {data.photoVerified && (
              <Check weight="bold" size={20} className="text-green-400" />
            )}
          </div>
        </div>

        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
          <div className="flex items-start gap-4 mb-4">
            <Star weight="fill" size={24} className="text-amber-400" />
            <div className="flex-1">
              <h4 className="text-white font-medium mb-1">ID Verification</h4>
              <p className="text-neutral-400 text-sm mb-3">Verify your identity for added security</p>
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm transition-colors">
                Start ID Verification
              </button>
            </div>
            {data.idVerified && (
              <Check weight="bold" size={20} className="text-green-400" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info weight="bold" size={20} className="text-brand-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-brand-400 font-medium text-sm mb-1">Why Verify?</h4>
            <ul className="text-neutral-300 text-xs space-y-1">
              <li>• Increase profile visibility</li>
              <li>• Build trust with the community</li>
              <li>• Access exclusive verified-only events</li>
              <li>• Stand out as an authentic member</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 7: Tier Selection
  const TierStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Crown weight="fill" size={48} className="text-amber-400 mx-auto mb-4" />
        <h3 className="text-white font-medium mb-2">Choose Your Tier</h3>
        <p className="text-neutral-400 text-sm">Start with Curious and upgrade anytime</p>
      </div>

      <div className="space-y-4">
        {[
          {
            id: 'curious',
            name: 'Curious',
            price: 'Free',
            features: ['Basic profile', 'Limited swipes', 'Join communities', 'Browse events'],
            color: 'neutral'
          },
          {
            id: 'explorer',
            name: 'Explorer',
            price: '$29.99/mo',
            features: ['Unlimited swipes', 'Advanced filters', 'Priority support', 'Event RSVPs'],
            color: 'brand',
            popular: true
          },
          {
            id: 'connoisseur',
            name: 'Connoisseur',
            price: '$99.99/mo',
            features: ['All Explorer features', 'Exclusive events', 'Concierge service', 'Priority visibility'],
            color: 'amber'
          }
        ].map((tier) => (
          <motion.button
            key={tier.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateData({ selectedTier: tier.id as any })}
            className={`relative w-full p-6 rounded-2xl border-2 text-left transition-all ${
              data.selectedTier === tier.id
                ? `bg-${tier.color}-500/10 border-${tier.color}-500`
                : 'bg-neutral-800 border-neutral-700'
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-500 text-white text-xs font-medium rounded-full">
                Most Popular
              </span>
            )}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-white font-medium text-lg">{tier.name}</h4>
                <p className="text-neutral-400 text-sm">{tier.price}</p>
              </div>
              {data.selectedTier === tier.id && (
                <Check weight="bold" size={24} className="text-brand-400" />
              )}
            </div>
            <ul className="space-y-2">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-neutral-300 text-sm">
                  <Check weight="bold" size={16} className="text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const steps: OnboardingStep[] = [
    { id: 1, title: 'Welcome', description: 'Welcome to ELOURA', component: <WelcomeStep /> },
    { id: 2, title: 'Basics', description: 'Tell us about yourself', component: <BasicsStep /> },
    { id: 3, title: 'Photos', description: 'Add your photos', component: <PhotosStep /> },
    { id: 4, title: 'Interests', description: 'What interests you?', component: <InterestsStep /> },
    { id: 5, title: 'Lifestyle', description: 'Your lifestyle preferences', component: <LifestyleStep /> },
    { id: 6, title: 'Verification', description: 'Verify your profile', component: <VerificationStep /> },
    { id: 7, title: 'Tier', description: 'Choose your membership', component: <TierStep /> }
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return true; // Welcome
      case 1: return data.name && data.birthday && data.gender && data.location && data.bio;
      case 2: return data.photos.length >= 3;
      case 3: return data.interests.length >= 3;
      case 4: return data.lifestyleGoals.length > 0 && data.lookingFor.length > 0;
      case 5: return true; // Verification is optional
      case 6: return data.selectedTier;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="p-2 text-neutral-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft weight="bold" size={20} />
            </button>
            <div className="text-center">
              <h2 className="text-white font-medium">{steps[currentStep].title}</h2>
              <p className="text-neutral-400 text-sm">{steps[currentStep].description}</p>
            </div>
            <div className="w-8" /> {/* Spacer */}
          </div>
          
          <div className="flex gap-1">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 h-1 rounded-full transition-all ${
                  index <= currentStep ? 'bg-brand-500' : 'bg-neutral-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep].component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={currentStep === steps.length - 1 ? completeOnboarding : nextStep}
              disabled={!isStepValid()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
              <ArrowRight weight="bold" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
