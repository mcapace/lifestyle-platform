"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Upload, Camera } from "@phosphor-icons/react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Input } from "@/components/ui/input";

const steps = [
  { id: 1, title: "Welcome", subtitle: "Let's set up your profile" },
  { id: 2, title: "Verification", subtitle: "Quick ID check for safety" },
  { id: 3, title: "Photos", subtitle: "Show your best self" },
  { id: 4, title: "Preferences", subtitle: "What are you looking for?" },
  { id: 5, title: "Privacy", subtitle: "Your comfort, your rules" },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (currentStep < steps.length) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps.find(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={goBack}
              disabled={currentStep === 1}
              className="text-neutral-500 hover:text-white transition-colors disabled:opacity-30"
            >
              <ArrowLeft weight="bold" size={24} />
            </button>
            <span className="text-sm text-neutral-500 font-light">
              Step {currentStep} of {steps.length}
            </span>
            <div className="w-6" /> {/* Spacer */}
          </div>
          
          <div className="h-1 bg-neutral-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-md mx-auto px-6 py-12 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: direction * 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Step Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-light text-white mb-2">
                {currentStepData?.title}
              </h1>
              <p className="text-lg text-neutral-500 font-light">
                {currentStepData?.subtitle}
              </p>
            </div>

            {/* Step Content */}
            <div className="space-y-6">
              {currentStep === 1 && <WelcomeStep />}
              {currentStep === 2 && <VerificationStep />}
              {currentStep === 3 && <PhotosStep />}
              {currentStep === 4 && <PreferencesStep />}
              {currentStep === 5 && <PrivacyStep />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <MagneticButton
            onClick={goNext}
            className="w-full h-14 bg-brand-500 hover:bg-brand-600 text-white font-medium text-base"
          >
            {currentStep === steps.length ? "Complete Setup" : "Continue"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

// Step Components
function WelcomeStep() {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-neutral-500 font-light mb-2 block">
          Display Name
        </label>
        <Input
          placeholder="How should we call you?"
          className="h-12 bg-neutral-900 border-neutral-800 text-white"
        />
      </div>
      
      <div>
        <label className="text-sm text-neutral-500 font-light mb-2 block">
          Account Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["Couple", "Single", "Group"].map((type) => (
            <button
              key={type}
              className="h-12 bg-neutral-900 hover:bg-brand-500/10 border border-neutral-800 hover:border-brand-500/30 rounded-xl text-white font-light transition-all"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function VerificationStep() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-brand-500/5 border border-brand-500/20 rounded-2xl">
        <div className="flex items-start gap-4 mb-4">
          <CheckCircle weight="fill" size={24} className="text-brand-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-white font-light mb-2">Why we verify</h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Verification keeps our community safe and authentic. It takes less than 2 minutes.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full h-16 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-2xl flex items-center justify-between px-6 transition-colors group">
          <div className="flex items-center gap-4">
            <Camera weight="fill" size={24} className="text-brand-500" />
            <div className="text-left">
              <div className="text-white font-light">Photo Verification</div>
              <div className="text-xs text-neutral-600 font-light">Take a quick selfie</div>
            </div>
          </div>
          <CheckCircle weight="fill" size={20} className="text-neutral-700 group-hover:text-brand-500 transition-colors" />
        </button>

        <button className="w-full h-16 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-2xl flex items-center justify-between px-6 transition-colors group">
          <div className="flex items-center gap-4">
            <Upload weight="fill" size={24} className="text-brand-500" />
            <div className="text-left">
              <div className="text-white font-light">ID Verification</div>
              <div className="text-xs text-neutral-600 font-light">Secure & encrypted</div>
            </div>
          </div>
          <CheckCircle weight="fill" size={20} className="text-neutral-700 group-hover:text-brand-500 transition-colors" />
        </button>
      </div>
    </div>
  );
}

function PhotosStep() {
  return (
    <div className="space-y-6">
      <p className="text-neutral-400 font-light">
        Add at least 3 photos. Your first photo will be your main profile picture.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <button
            key={i}
            className="aspect-square bg-neutral-900 hover:bg-neutral-800 border-2 border-dashed border-neutral-800 hover:border-brand-500/50 rounded-2xl flex items-center justify-center transition-all group"
          >
            <Upload weight="bold" size={24} className="text-neutral-700 group-hover:text-brand-500 transition-colors" />
          </button>
        ))}
      </div>

      <p className="text-xs text-neutral-600 font-light text-center">
        All photos are manually reviewed within 24 hours
      </p>
    </div>
  );
}

function PreferencesStep() {
  const interests = [
    "Soft Swap", "Full Swap", "Same Room", "Separate Room",
    "Lifestyle Events", "Travel", "Hotels", "House Parties",
    "New to Lifestyle", "Experienced", "Couples Only", "Singles Welcome"
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-neutral-500 font-light mb-3 block">
          What are you interested in?
        </label>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <button
              key={interest}
              className="px-4 py-2 bg-neutral-900 hover:bg-brand-500/20 border border-neutral-800 hover:border-brand-500/50 rounded-full text-sm text-white font-light transition-all"
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivacyStep() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <div>
            <div className="text-white font-light mb-1">Ghost Mode</div>
            <div className="text-xs text-neutral-600 font-light">Browse anonymously</div>
          </div>
          <div className="w-12 h-6 bg-neutral-800 rounded-full relative cursor-pointer">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <div>
            <div className="text-white font-light mb-1">Face Blur</div>
            <div className="text-xs text-neutral-600 font-light">Protect your identity</div>
          </div>
          <div className="w-12 h-6 bg-neutral-800 rounded-full relative cursor-pointer">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <div>
            <div className="text-white font-light mb-1">Private Profile</div>
            <div className="text-xs text-neutral-600 font-light">Only matches can see</div>
          </div>
          <div className="w-12 h-6 bg-brand-500 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

