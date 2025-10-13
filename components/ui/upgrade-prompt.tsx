// Upgrade Prompt Component - Encourage users to upgrade tiers
import React from 'react';
import { Crown, Star, Sparkle, ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from './button';

export interface UpgradePromptProps {
  currentTier: 'FREE' | 'PREMIUM' | 'VIP';
  feature: string;
  benefits: string[];
  variant?: 'banner' | 'card' | 'modal';
  onDismiss?: () => void;
}

export function UpgradePrompt({
  currentTier,
  feature,
  benefits,
  variant = 'card',
  onDismiss
}: UpgradePromptProps) {
  const targetTier = currentTier === 'FREE' ? 'PREMIUM' : 'VIP';
  const price = targetTier === 'PREMIUM' ? '$29.99' : '$79.99';
  const Icon = targetTier === 'PREMIUM' ? Star : Crown;

  if (variant === 'banner') {
    return (
      <div className="w-full bg-gradient-to-r from-amber-500/10 to-purple-500/10 border-y border-amber-500/20 px-6 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon weight="fill" size={20} className="text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">Unlock {feature}</p>
              <p className="text-neutral-400 text-xs">Upgrade to {targetTier} for {price}/mo</p>
            </div>
          </div>
          <Link href="/pricing">
            <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
              Upgrade
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                targetTier === 'PREMIUM' 
                  ? 'bg-amber-500/10 border border-amber-500/20' 
                  : 'bg-purple-500/10 border border-purple-500/20'
              }`}>
                <Icon 
                  weight="fill" 
                  size={24} 
                  className={targetTier === 'PREMIUM' ? 'text-amber-400' : 'text-purple-400'} 
                />
              </div>
              <div>
                <h3 className="text-white font-medium">Upgrade to {targetTier}</h3>
                <p className="text-neutral-400 text-sm">{price}/month</p>
              </div>
            </div>
            {onDismiss && (
              <button 
                onClick={onDismiss}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          <div className="mb-6">
            <p className="text-white mb-4">Unlock {feature} and more:</p>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Sparkle weight="fill" size={16} className="text-brand-400 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/pricing">
            <Button className="w-full bg-brand-500 hover:bg-brand-600">
              Upgrade Now
              <ArrowRight weight="bold" size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Default: card variant
  return (
    <div className={`rounded-2xl p-6 border ${
      targetTier === 'PREMIUM'
        ? 'bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20'
        : 'bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20'
    }`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          targetTier === 'PREMIUM' 
            ? 'bg-amber-500/10 border border-amber-500/20' 
            : 'bg-purple-500/10 border border-purple-500/20'
        }`}>
          <Icon 
            weight="fill" 
            size={24} 
            className={targetTier === 'PREMIUM' ? 'text-amber-400' : 'text-purple-400'} 
          />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-medium mb-1">
            Unlock {feature}
          </h3>
          <p className="text-neutral-400 text-sm">
            Upgrade to {targetTier} for {price}/month
          </p>
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {benefits.slice(0, 3).map((benefit, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <Sparkle weight="fill" size={14} className="text-brand-400 flex-shrink-0 mt-0.5" />
            <span className="text-neutral-300">{benefit}</span>
          </li>
        ))}
      </ul>

      <Link href="/pricing">
        <Button className="w-full bg-brand-500 hover:bg-brand-600">
          Upgrade to {targetTier}
          <ArrowRight weight="bold" size={16} className="ml-2" />
        </Button>
      </Link>
    </div>
  );
}

// Preset upgrade prompts for common scenarios
export function UnlimitedSwipesPrompt() {
  return (
    <UpgradePrompt
      currentTier="FREE"
      feature="Unlimited Swipes"
      benefits={[
        "Browse unlimited profiles every day",
        "Advanced filters by age, distance, interests",
        "See who viewed your profile",
        "Priority in search results"
      ]}
    />
  );
}

export function UnlimitedMessagingPrompt() {
  return (
    <UpgradePrompt
      currentTier="FREE"
      feature="Unlimited Messaging"
      benefits={[
        "Send unlimited messages",
        "Read receipts and typing indicators",
        "Voice messages",
        "1 hour video calls per month"
      ]}
    />
  );
}

export function EventRSVPPrompt() {
  return (
    <UpgradePrompt
      currentTier="FREE"
      feature="Event RSVP"
      benefits={[
        "RSVP to all lifestyle events",
        "Create your own events",
        "Priority event notifications",
        "Event reviews and ratings"
      ]}
    />
  );
}

export function VIPFeaturesPrompt() {
  return (
    <UpgradePrompt
      currentTier="PREMIUM"
      feature="VIP Exclusive Features"
      benefits={[
        "VIP-only exclusive events",
        "Unlimited video calls",
        "Face blur technology",
        "Background check verification",
        "Concierge service",
        "Profile boost (10x visibility)"
      ]}
    />
  );
}

