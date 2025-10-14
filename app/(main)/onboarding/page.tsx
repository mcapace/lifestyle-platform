"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  User, 
  Users, 
  ArrowRight, 
  Shield, 
  Camera, 
  CreditCard,
  MapPin,
  Heart,
  Sparkle
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Onboarding steps
const steps = [
  {
    id: 1,
    title: "Welcome to the Premium Experience",
    subtitle: "Let's create your sophisticated profile",
    component: "Welcome"
  },
  {
    id: 2,
    title: "Choose Your Account Type",
    subtitle: "Select the experience that fits your lifestyle",
    component: "AccountType"
  },
  {
    id: 3,
    title: "Verification & Trust",
    subtitle: "Build credibility with our premium verification",
    component: "Verification"
  },
  {
    id: 4,
    title: "Lifestyle Preferences",
    subtitle: "Tell us about your interests and what you're seeking",
    component: "Preferences"
  },
  {
    id: 5,
    title: "Privacy & Safety",
    subtitle: "Configure your privacy settings for maximum security",
    component: "Privacy"
  },
  {
    id: 6,
    title: "Premium Membership",
    subtitle: "Choose your membership tier for the best experience",
    component: "Membership"
  },
  {
    id: 7,
    title: "Profile Photos",
    subtitle: "Upload your best photos with our AI optimization",
    component: "Photos"
  },
  {
    id: 8,
    title: "Complete Your Journey",
    subtitle: "You're ready to join the premium community",
    component: "Complete"
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    accountType: null,
    verificationLevel: null,
    preferences: [],
    privacy: {},
    membership: null,
    photos: []
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case "Welcome":
        return <WelcomeStep />;
      case "AccountType":
        return <AccountTypeStep formData={formData} setFormData={setFormData} />;
      case "Verification":
        return <VerificationStep formData={formData} setFormData={setFormData} />;
      case "Preferences":
        return <PreferencesStep formData={formData} setFormData={setFormData} />;
      case "Privacy":
        return <PrivacyStep formData={formData} setFormData={setFormData} />;
      case "Membership":
        return <MembershipStep formData={formData} setFormData={setFormData} />;
      case "Photos":
        return <PhotosStep formData={formData} setFormData={setFormData} />;
      case "Complete":
        return <CompleteStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkle weight="fill" size={20} className="text-brand-500" />
              <span className="text-sm font-light text-white">Premium Onboarding</span>
            </div>
            <span className="text-sm text-neutral-500">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index <= currentStep
                    ? "bg-brand-500"
                    : "bg-neutral-800"
                }`}
                style={{ width: `${100 / steps.length}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8">
        <div className="max-w-2xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
          >
            {/* Step Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-light text-white mb-2">
                  {steps[currentStep].title}
              </h1>
                <p className="text-neutral-400 font-light">
                  {steps[currentStep].subtitle}
              </p>
            </div>

            {/* Step Content */}
              {renderStepContent()}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-4">
                  {currentStep < steps.length - 1 ? (
                    <Button
                      onClick={handleNext}
                      className="bg-brand-500 hover:bg-brand-600 text-white px-8"
                    >
                      Continue
                      <ArrowRight weight="bold" size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => window.location.href = '/dashboard'}
                      className="bg-brand-500 hover:bg-brand-600 text-white px-8"
                    >
                      Complete Setup
                      <CheckCircle weight="fill" size={16} className="ml-2" />
                    </Button>
                  )}
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Step Components
function WelcomeStep() {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-32 h-32 mx-auto bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center"
      >
        <Sparkle weight="fill" size={48} className="text-white" />
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-2xl font-light text-white">
          Welcome to the Future of Lifestyle Connections
        </h2>
        <p className="text-neutral-400 font-light leading-relaxed max-w-md mx-auto">
          Join an exclusive community where sophistication meets authenticity. 
          Our premium platform offers the most advanced features, security, 
          and user experience in the lifestyle space.
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-brand-500/20 rounded-full flex items-center justify-center">
            <Shield weight="fill" size={24} className="text-brand-500" />
          </div>
          <p className="text-xs text-neutral-500 font-light">Military-Grade Security</p>
        </div>
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-brand-500/20 rounded-full flex items-center justify-center">
            <Heart weight="fill" size={24} className="text-brand-500" />
          </div>
          <p className="text-xs text-neutral-500 font-light">Premium Matching</p>
        </div>
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-brand-500/20 rounded-full flex items-center justify-center">
            <Camera weight="fill" size={24} className="text-brand-500" />
          </div>
          <p className="text-xs text-neutral-500 font-light">AI Verification</p>
        </div>
      </div>
    </div>
  );
}

function AccountTypeStep({ formData, setFormData }: any) {
  const accountTypes = [
    {
      id: "INDIVIDUAL",
      title: "Individual Explorer",
      subtitle: "Solo lifestyle enthusiast",
      icon: User,
      description: "Perfect for singles exploring the lifestyle independently",
      features: ["Personal profile", "Individual verification", "Solo event access"]
    },
    {
      id: "COUPLE",
      title: "Verified Couple",
      subtitle: "Both partners verified",
      icon: Users,
      description: "For couples who want to explore together with full verification",
      features: ["Joint verification", "Couple discounts", "Partner sharing", "Enhanced privacy"]
    },
    {
      id: "GROUP",
      title: "Polycule/Group",
      subtitle: "Multiple partners verified",
      icon: UserGroup,
      description: "For polyamorous relationships and lifestyle groups",
      features: ["Multi-partner verification", "Group events", "Advanced privacy", "Custom arrangements"]
    }
  ];

  return (
    <div className="space-y-6">
      <p className="text-center text-neutral-400 font-light mb-8">
        Choose the account type that best represents your lifestyle journey
      </p>
      
      <div className="grid gap-4">
        {accountTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                formData.accountType === type.id
                  ? "border-brand-500 bg-brand-500/5"
                  : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
              }`}
              onClick={() => setFormData({...formData, accountType: type.id})}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    formData.accountType === type.id
                      ? "bg-brand-500/20"
                      : "bg-neutral-800"
                  }`}>
                    <type.icon 
                      size={24} 
                      className={formData.accountType === type.id ? "text-brand-500" : "text-neutral-400"} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-light text-white">{type.title}</h3>
                      {formData.accountType === type.id && (
                        <CheckCircle weight="fill" size={20} className="text-brand-500" />
                      )}
                    </div>
                    <p className="text-brand-500 font-light text-sm mb-2">{type.subtitle}</p>
                    <p className="text-neutral-400 font-light text-sm mb-3">{type.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {type.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
          </div>
  );
}

function VerificationStep({ formData, setFormData }: any) {
  const verificationLevels = [
    {
      id: "BASIC",
      title: "Basic Verification",
      price: "Free",
      features: ["Email verification", "Phone verification", "Basic profile"],
      badge: "Verified Email"
    },
    {
      id: "ENHANCED",
      title: "Enhanced Verification",
      price: "Premium Required",
      features: ["Live photo verification", "AI liveness detection", "Face matching", "Priority support"],
      badge: "Photo Verified"
    },
    {
      id: "PREMIUM",
      title: "Premium Verification",
      price: "VIP Required",
      features: ["Government ID verification", "Background check", "Manual review", "Gold verification badge"],
      badge: "ID Verified"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-brand-500/20 rounded-full flex items-center justify-center">
          <Shield weight="fill" size={32} className="text-brand-500" />
        </div>
        <p className="text-neutral-400 font-light">
          Verification builds trust and unlocks premium features. Choose your verification level.
        </p>
      </div>

      <div className="grid gap-4">
        {verificationLevels.map((level) => (
          <motion.div
            key={level.id}
            whileHover={{ scale: 1.02 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                formData.verificationLevel === level.id
                  ? "border-brand-500 bg-brand-500/5"
                  : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
              }`}
              onClick={() => setFormData({...formData, verificationLevel: level.id})}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-light text-white">{level.title}</h3>
                      {formData.verificationLevel === level.id && (
                        <CheckCircle weight="fill" size={20} className="text-brand-500" />
                      )}
                    </div>
                    <p className="text-brand-500 font-light text-sm mb-3">{level.price}</p>
                    
                    <div className="space-y-2">
                      {level.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle weight="fill" size={14} className="text-green-500" />
                          <span className="text-sm text-neutral-300">{feature}</span>
                        </div>
                      ))}
            </div>
          </div>
                  
                  <div className="ml-4">
                    <div className="px-3 py-1 bg-neutral-800 rounded-full">
                      <span className="text-xs text-neutral-300">{level.badge}</span>
                    </div>
            </div>
          </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PreferencesStep({ formData, setFormData }: any) {
  const categories = {
    experience: [
      { id: "CURIOUS", label: "Curious", description: "New to lifestyle, exploring" },
      { id: "BEGINNER", label: "Beginner", description: "Some experience, learning" },
      { id: "INTERMEDIATE", label: "Intermediate", description: "Active participant" },
      { id: "EXPERIENCED", label: "Experienced", description: "Regular lifestyle participant" },
      { id: "VETERAN", label: "Veteran", description: "Years in the scene" }
    ],
    seeking: [
      { id: "COUPLES", label: "Couples", description: "Looking for couples" },
      { id: "SINGLES", label: "Singles", description: "Open to singles" },
      { id: "GROUPS", label: "Groups", description: "Interested in groups" },
      { id: "FRIENDS", label: "Friends", description: "Friendship first" }
    ],
    interests: [
      { id: "EVENTS", label: "Lifestyle Events", description: "Parties, meetups" },
      { id: "TRAVEL", label: "Travel", description: "Destination experiences" },
      { id: "DINING", label: "Fine Dining", description: "Upscale restaurants" },
      { id: "RESORTS", label: "Resorts", description: "Luxury resorts" },
      { id: "CLUBS", label: "Clubs", description: "Nightlife venues" },
      { id: "WORKSHOPS", label: "Workshops", description: "Educational events" }
    ]
  };

  return (
    <div className="space-y-8">
      <p className="text-center text-neutral-400 font-light">
        Help us understand your preferences for better matching
      </p>
      
      {Object.entries(categories).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-lg font-light text-white mb-4 capitalize">
            {category.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {items.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const currentPrefs = formData.preferences || [];
                  const updated = currentPrefs.includes(item.id)
                    ? currentPrefs.filter((p: string) => p !== item.id)
                    : [...currentPrefs, item.id];
                  setFormData({...formData, preferences: updated});
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  (formData.preferences || []).includes(item.id)
                    ? "border-brand-500 bg-brand-500/10"
                    : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-white font-light">{item.label}</h4>
                  {(formData.preferences || []).includes(item.id) && (
                    <CheckCircle weight="fill" size={16} className="text-brand-500" />
                  )}
                </div>
                <p className="text-xs text-neutral-400">{item.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PrivacyStep({ formData, setFormData }: any) {
  const privacyOptions = [
    {
      id: "showOnline",
      title: "Show Online Status",
      description: "Let others see when you're active",
      default: true
    },
    {
      id: "showLocation",
      title: "Show Location",
      description: "Display your city to potential matches",
      default: true
    },
    {
      id: "allowMessages",
      title: "Message Permissions",
      description: "Control who can message you",
      options: ["EVERYONE", "VERIFIED_ONLY", "MATCHES_ONLY"]
    },
    {
      id: "profileVisibility",
      title: "Profile Visibility",
      description: "Control who can see your profile",
      options: ["PUBLIC", "VERIFIED_ONLY", "MATCHES_ONLY"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-brand-500/20 rounded-full flex items-center justify-center">
          <Shield weight="fill" size={32} className="text-brand-500" />
        </div>
      <p className="text-neutral-400 font-light">
          Configure your privacy settings for maximum security and control
        </p>
      </div>
      
      <div className="space-y-4">
        {privacyOptions.map((option) => (
          <Card key={option.id} className="border-neutral-800 bg-neutral-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-light mb-1">{option.title}</h3>
                  <p className="text-sm text-neutral-400">{option.description}</p>
                </div>
                
                {option.options ? (
                  <select 
                    className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm"
                    value={formData.privacy[option.id] || option.options[0]}
                    onChange={(e) => setFormData({
                      ...formData, 
                      privacy: {...formData.privacy, [option.id]: e.target.value}
                    })}
                  >
                    {option.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                ) : (
          <button
                    onClick={() => setFormData({
                      ...formData,
                      privacy: {...formData.privacy, [option.id]: !formData.privacy[option.id]}
                    })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      formData.privacy[option.id] !== false
                        ? "bg-brand-500"
                        : "bg-neutral-700"
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      formData.privacy[option.id] !== false
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`} />
          </button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MembershipStep({ formData, setFormData }: any) {
  const tiers = [
    {
      id: "FREE",
      title: "Free",
      price: "$0/month",
      description: "Explore the platform safely",
      features: [
        "Basic profile creation",
        "Browse 5 profiles/day",
        "1 message per week",
        "Basic verification",
        "Public events view"
      ],
      limitations: [
        "Limited browsing",
        "No advanced filters",
        "No ghost mode"
      ]
    },
    {
      id: "PREMIUM",
      title: "Premium",
      price: "$29.99/month",
      originalPrice: "$39.99/month",
      description: "Full lifestyle experience",
      popular: true,
      features: [
        "Unlimited browsing",
        "Unlimited messaging",
        "Advanced filters",
        "Enhanced verification",
        "Event RSVP",
        "Ghost mode",
        "See who liked you",
        "Priority support"
      ]
    },
    {
      id: "VIP",
      title: "VIP",
      price: "$79.99/month",
      originalPrice: "$99.99/month",
      description: "Premium experience for serious lifestylers",
      features: [
        "Everything in Premium",
        "Face blur technology",
        "Travel mode",
        "Unlimited video calls",
        "VIP events access",
        "Concierge service",
        "Advanced privacy features",
        "Profile boost",
        "Background check verification"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-brand-500/20 rounded-full flex items-center justify-center">
          <CreditCard weight="fill" size={32} className="text-brand-500" />
        </div>
        <p className="text-neutral-400 font-light">
          Choose your membership tier for the best experience
        </p>
      </div>
      
      <div className="grid gap-4">
        {tiers.map((tier) => (
          <motion.div
            key={tier.id}
            whileHover={{ scale: 1.02 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 relative ${
                formData.membership === tier.id
                  ? "border-brand-500 bg-brand-500/5"
                  : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
              } ${tier.popular ? "ring-2 ring-brand-500/20" : ""}`}
              onClick={() => setFormData({...formData, membership: tier.id})}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-brand-500 text-white px-4 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-light text-white">{tier.title}</h3>
                      {formData.membership === tier.id && (
                        <CheckCircle weight="fill" size={20} className="text-brand-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-light text-white">{tier.price}</span>
                      {tier.originalPrice && (
                        <span className="text-sm text-neutral-500 line-through">{tier.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-neutral-400 font-light text-sm">{tier.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle weight="fill" size={14} className="text-green-500" />
                      <span className="text-sm text-neutral-300">{feature}</span>
                    </div>
                  ))}
                  
                  {tier.limitations && tier.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full border border-neutral-600" />
                      <span className="text-sm text-neutral-500">{limitation}</span>
                    </div>
          ))}
        </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PhotosStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-brand-500/20 rounded-full flex items-center justify-center">
          <Camera weight="fill" size={32} className="text-brand-500" />
        </div>
        <p className="text-neutral-400 font-light">
          Upload your best photos with AI-powered optimization
        </p>
      </div>
      
      <div className="space-y-4">
        <Card className="border-neutral-800 bg-neutral-900/50">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto border-2 border-dashed border-neutral-600 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Camera size={32} className="text-neutral-500 mx-auto mb-2" />
                  <p className="text-sm text-neutral-500">Tap to add photos</p>
          </div>
        </div>

              <div className="space-y-2">
                <h3 className="text-white font-light">Photo Guidelines</h3>
                <ul className="text-sm text-neutral-400 space-y-1">
                  <li>• Clear, well-lit photos work best</li>
                  <li>• Show your face in at least one photo</li>
                  <li>• No explicit content (save for private albums)</li>
                  <li>• AI will optimize for best presentation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CompleteStep({ formData }: any) {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-32 h-32 mx-auto bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center"
      >
        <CheckCircle weight="fill" size={48} className="text-white" />
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-2xl font-light text-white">
          Welcome to the Premium Community
        </h2>
        <p className="text-neutral-400 font-light leading-relaxed max-w-md mx-auto">
          Your sophisticated profile is ready. You're now part of an exclusive 
          community that values authenticity, privacy, and genuine connections.
        </p>
          </div>

      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-brand-500/20 rounded-full flex items-center justify-center">
            <Heart weight="fill" size={24} className="text-brand-500" />
          </div>
          <p className="text-xs text-neutral-500 font-light">Start Discovering</p>
        </div>
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-brand-500/20 rounded-full flex items-center justify-center">
            <MapPin weight="fill" size={24} className="text-brand-500" />
          </div>
          <p className="text-xs text-neutral-500 font-light">Explore Events</p>
        </div>
      </div>
    </div>
  );
}