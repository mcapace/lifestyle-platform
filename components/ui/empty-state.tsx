// Empty State Component - Show when features have no content
import React from 'react';
import { Button } from './button';
import Link from 'next/link';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  upgrade?: {
    label: string;
    href: string;
    tier: 'PREMIUM' | 'VIP';
  };
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  upgrade
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Icon */}
      <div className="w-16 h-16 mb-4 text-neutral-600 flex items-center justify-center">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-light text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-neutral-400 font-light mb-6 max-w-md">
        {description}
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {action && (
          action.href ? (
            <Link href={action.href}>
              <Button className="w-full bg-brand-500 hover:bg-brand-600">
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button 
              onClick={action.onClick}
              className="w-full bg-brand-500 hover:bg-brand-600"
            >
              {action.label}
            </Button>
          )
        )}

        {upgrade && (
          <Link href={upgrade.href}>
            <Button 
              variant="outline" 
              className={`w-full border-${upgrade.tier === 'VIP' ? 'purple' : 'amber'}-500/30 text-${upgrade.tier === 'VIP' ? 'purple' : 'amber'}-400 hover:bg-${upgrade.tier === 'VIP' ? 'purple' : 'amber'}-500/10`}
            >
              {upgrade.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

// Preset empty states for common scenarios
export function NoMatchesEmpty({ tier }: { tier: 'FREE' | 'PREMIUM' | 'VIP' }) {
  return (
    <EmptyState
      icon={<span className="text-6xl">💕</span>}
      title="No matches yet"
      description="Start discovering profiles to find your perfect match"
      action={{
        label: "Discover Now",
        href: "/discover"
      }}
      upgrade={tier === 'FREE' ? {
        label: "Upgrade for unlimited swipes",
        href: "/pricing",
        tier: "PREMIUM"
      } : undefined}
    />
  );
}

export function NoMessagesEmpty({ tier }: { tier: 'FREE' | 'PREMIUM' | 'VIP' }) {
  return (
    <EmptyState
      icon={<span className="text-6xl">💬</span>}
      title="No messages yet"
      description="Match with someone to start chatting and building connections"
      action={{
        label: "Find Matches",
        href: "/discover"
      }}
      upgrade={tier === 'FREE' ? {
        label: "Upgrade for unlimited messaging",
        href: "/pricing",
        tier: "PREMIUM"
      } : undefined}
    />
  );
}

export function NoEventsEmpty({ tier }: { tier: 'FREE' | 'PREMIUM' | 'VIP' }) {
  return (
    <EmptyState
      icon={<span className="text-6xl">🎉</span>}
      title="No events nearby"
      description="Check back soon or expand your search radius to find lifestyle events"
      action={{
        label: "Refresh Events",
        href: "/events"
      }}
      upgrade={tier === 'FREE' ? {
        label: "Upgrade to RSVP to events",
        href: "/pricing",
        tier: "PREMIUM"
      } : undefined}
    />
  );
}

export function LimitReachedEmpty({ 
  limitType,
  tier 
}: { 
  limitType: 'swipes' | 'messages' | 'views';
  tier: 'FREE' | 'PREMIUM' | 'VIP';
}) {
  const config = {
    swipes: {
      icon: '🔄',
      title: 'Daily swipe limit reached',
      description: 'You\'ve reached your daily limit. Come back tomorrow or upgrade for unlimited swipes.'
    },
    messages: {
      icon: '✉️',
      title: 'Message limit reached',
      description: 'You\'ve used your weekly message. Upgrade to Premium for unlimited messaging.'
    },
    views: {
      icon: '👀',
      title: 'View limit reached',
      description: 'You\'ve reached your daily profile view limit. Upgrade for unlimited access.'
    }
  };

  const { icon, title, description } = config[limitType];

  return (
    <EmptyState
      icon={<span className="text-6xl">{icon}</span>}
      title={title}
      description={description}
      upgrade={{
        label: tier === 'FREE' ? "Upgrade to Premium - $29.99/mo" : "Upgrade to VIP - $79.99/mo",
        href: "/pricing",
        tier: tier === 'FREE' ? "PREMIUM" : "VIP"
      }}
    />
  );
}

