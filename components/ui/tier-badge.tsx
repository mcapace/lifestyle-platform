// Tier Badge Component - Show user's membership tier
import React from 'react';
import { Crown, Star, User } from '@phosphor-icons/react';

export interface TierBadgeProps {
  tier: 'FREE' | 'PREMIUM' | 'VIP';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const tierConfig = {
  FREE: {
    icon: User,
    label: 'Explorer',
    color: 'gray',
    bgColor: 'bg-neutral-600/10',
    borderColor: 'border-neutral-600/30',
    textColor: 'text-neutral-400',
    iconColor: 'text-neutral-500'
  },
  PREMIUM: {
    icon: Star,
    label: 'Premium',
    color: 'amber',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    iconColor: 'text-amber-500'
  },
  VIP: {
    icon: Crown,
    label: 'VIP Elite',
    color: 'purple',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    iconColor: 'text-purple-500'
  }
};

const sizeConfig = {
  sm: {
    container: 'px-2 py-1',
    icon: 12,
    text: 'text-xs'
  },
  md: {
    container: 'px-3 py-1.5',
    icon: 14,
    text: 'text-sm'
  },
  lg: {
    container: 'px-4 py-2',
    icon: 16,
    text: 'text-base'
  }
};

export function TierBadge({ 
  tier, 
  size = 'md', 
  showLabel = true,
  className = '' 
}: TierBadgeProps) {
  const config = tierConfig[tier];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  return (
    <span 
      className={`
        inline-flex items-center gap-1.5 
        ${config.bgColor} 
        ${config.borderColor} 
        border rounded-full 
        ${sizeStyles.container}
        ${className}
      `}
    >
      <Icon 
        weight="fill" 
        size={sizeStyles.icon} 
        className={config.iconColor} 
      />
      {showLabel && (
        <span className={`font-medium ${config.textColor} ${sizeStyles.text}`}>
          {config.label}
        </span>
      )}
    </span>
  );
}

// Compact version for small spaces
export function TierIcon({ tier, size = 16 }: { tier: 'FREE' | 'PREMIUM' | 'VIP'; size?: number }) {
  const config = tierConfig[tier];
  const Icon = config.icon;
  
  return (
    <Icon 
      weight="fill" 
      size={size} 
      className={config.iconColor} 
    />
  );
}

