// Premium Membership Tier System - State of the Art
// Sophisticated tier management with dynamic features and pricing

export interface MembershipTier {
  id: 'FREE' | 'PREMIUM' | 'VIP';
  name: string;
  description: string;
  pricing: {
    monthly: number;
    yearly: number;
    currency: string;
    savings?: number;
  };
  features: {
    [key: string]: boolean | number | string;
  };
  limits: {
    [key: string]: number;
  };
  restrictions: string[];
  benefits: string[];
  color: string;
  icon: string;
}

export interface UserMembership {
  tier: 'FREE' | 'PREMIUM' | 'VIP';
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'TRIAL';
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  paymentMethod: string;
  billingCycle: 'MONTHLY' | 'YEARLY';
  features: {
    [key: string]: any;
  };
  usage: {
    [key: string]: number;
  };
  upgradeHistory: Array<{
    fromTier: string;
    toTier: string;
    date: Date;
    reason?: string;
  }>;
}

export class PremiumMembershipSystem {
  private readonly tiers: Record<string, MembershipTier> = {
    FREE: {
      id: 'FREE',
      name: 'Free Explorer',
      description: 'Perfect for newcomers to explore safely',
      pricing: {
        monthly: 0,
        yearly: 0,
        currency: 'USD'
      },
      features: {
        profileCreation: true,
        basicVerification: true,
        profileViewsPerDay: 5,
        messagesPerWeek: 1,
        photoUploads: 3,
        basicFilters: false,
        ghostMode: false,
        advancedFilters: false,
        readReceipts: false,
        videoCalls: false,
        eventRSVP: false,
        prioritySupport: false,
        faceBlur: false,
        travelMode: false,
        vipEvents: false,
        conciergeService: false,
        backgroundCheck: false,
        disappearingMessages: false,
        screenshotAlerts: false,
        profileBoost: false,
        customBadges: false,
        earlyAccess: false
      },
      limits: {
        dailySwipes: 5,
        weeklyMessages: 1,
        monthlyPhotos: 3,
        eventViews: 10
      },
      restrictions: [
        'Limited daily browsing',
        'No advanced filters',
        'No premium features',
        'Basic support only'
      ],
      benefits: [
        'Safe exploration environment',
        'Basic profile creation',
        'Email verification',
        'Community guidelines'
      ],
      color: '#6B7280',
      icon: '👤'
    },
    
    PREMIUM: {
      id: 'PREMIUM',
      name: 'Premium Lifestyle',
      description: 'Full lifestyle experience with advanced features',
      pricing: {
        monthly: 29.99,
        yearly: 199.99,
        currency: 'USD',
        savings: 44
      },
      features: {
        profileCreation: true,
        basicVerification: true,
        enhancedVerification: true,
        profileViewsPerDay: -1, // Unlimited
        messagesPerWeek: -1, // Unlimited
        photoUploads: 20,
        basicFilters: true,
        ghostMode: true,
        advancedFilters: true,
        readReceipts: true,
        videoCalls: true,
        videoCallHoursPerMonth: 1,
        eventRSVP: true,
        prioritySupport: true,
        faceBlur: false,
        travelMode: false,
        vipEvents: false,
        conciergeService: false,
        backgroundCheck: false,
        disappearingMessages: false,
        screenshotAlerts: false,
        profileBoost: false,
        customBadges: false,
        earlyAccess: false
      },
      limits: {
        dailySwipes: -1, // Unlimited
        weeklyMessages: -1, // Unlimited
        monthlyPhotos: 20,
        eventViews: -1,
        videoCallMinutes: 60
      },
      restrictions: [
        'No VIP exclusive events',
        'Limited video call time',
        'No face blur technology'
      ],
      benefits: [
        'Unlimited browsing and messaging',
        'Advanced filtering options',
        'Enhanced verification badge',
        'Priority customer support',
        'Ghost mode for privacy',
        'Event RSVP access',
        'Read receipts',
        '1 hour video calls per month'
      ],
      color: '#F59E0B',
      icon: '⭐'
    },
    
    VIP: {
      id: 'VIP',
      name: 'VIP Elite',
      description: 'Ultimate premium experience for serious lifestylers',
      pricing: {
        monthly: 79.99,
        yearly: 599.99,
        currency: 'USD',
        savings: 37
      },
      features: {
        profileCreation: true,
        basicVerification: true,
        enhancedVerification: true,
        premiumVerification: true,
        profileViewsPerDay: -1,
        messagesPerWeek: -1,
        photoUploads: -1,
        basicFilters: true,
        ghostMode: true,
        advancedFilters: true,
        readReceipts: true,
        videoCalls: true,
        videoCallHoursPerMonth: -1, // Unlimited
        eventRSVP: true,
        prioritySupport: true,
        faceBlur: true,
        travelMode: true,
        vipEvents: true,
        conciergeService: true,
        backgroundCheck: true,
        disappearingMessages: true,
        screenshotAlerts: true,
        profileBoost: true,
        customBadges: true,
        earlyAccess: true
      },
      limits: {
        dailySwipes: -1,
        weeklyMessages: -1,
        monthlyPhotos: -1,
        eventViews: -1,
        videoCallMinutes: -1
      },
      restrictions: [],
      benefits: [
        'Everything in Premium',
        'Unlimited video calls',
        'Face blur technology',
        'Travel mode (any location)',
        'VIP exclusive events',
        'Concierge service',
        'Background check verification',
        'Advanced privacy features',
        'Profile boost (priority visibility)',
        'Custom verification badges',
        'Early access to new features',
        'Disappearing messages',
        'Screenshot detection alerts'
      ],
      color: '#8B5CF6',
      icon: '👑'
    }
  };

  /**
   * Get tier information
   */
  getTier(tierId: string): MembershipTier | null {
    return this.tiers[tierId] || null;
  }

  /**
   * Get all available tiers
   */
  getAllTiers(): MembershipTier[] {
    return Object.values(this.tiers);
  }

  /**
   * Check if user has access to a specific feature
   */
  hasFeature(userMembership: UserMembership, feature: string): boolean {
    const tier = this.getTier(userMembership.tier);
    if (!tier) return false;

    // Check if membership is active
    if (userMembership.status !== 'ACTIVE' && userMembership.status !== 'TRIAL') {
      return false;
    }

    // Check if feature exists in tier
    return tier.features[feature] === true || tier.features[feature] > 0;
  }

  /**
   * Get feature limit for user
   */
  getFeatureLimit(userMembership: UserMembership, feature: string): number {
    const tier = this.getTier(userMembership.tier);
    if (!tier) return 0;

    if (userMembership.status !== 'ACTIVE' && userMembership.status !== 'TRIAL') {
      return 0;
    }

    return tier.limits[feature] || 0;
  }

  /**
   * Check if user has reached limit for a feature
   */
  hasReachedLimit(userMembership: UserMembership, feature: string): boolean {
    const limit = this.getFeatureLimit(userMembership, feature);
    if (limit === -1) return false; // Unlimited
    
    const usage = userMembership.usage[feature] || 0;
    return usage >= limit;
  }

  /**
   * Get usage statistics for user
   */
  getUsageStats(userMembership: UserMembership): {
    [key: string]: {
      used: number;
      limit: number;
      unlimited: boolean;
      percentage: number;
    };
  } {
    const tier = this.getTier(userMembership.tier);
    if (!tier) return {};

    const stats: any = {};

    Object.keys(tier.limits).forEach(feature => {
      const limit = tier.limits[feature];
      const used = userMembership.usage[feature] || 0;
      const unlimited = limit === -1;
      
      stats[feature] = {
        used,
        limit: unlimited ? 0 : limit,
        unlimited,
        percentage: unlimited ? 0 : Math.min(100, (used / limit) * 100)
      };
    });

    return stats;
  }

  /**
   * Calculate upgrade benefits
   */
  getUpgradeBenefits(currentTier: string, targetTier: string): {
    newFeatures: string[];
    increasedLimits: Array<{ feature: string; from: number; to: number | string }>;
    removedRestrictions: string[];
    savings: number;
  } {
    const current = this.getTier(currentTier);
    const target = this.getTier(targetTier);
    
    if (!current || !target) {
      return { newFeatures: [], increasedLimits: [], removedRestrictions: [], savings: 0 };
    }

    const newFeatures: string[] = [];
    const increasedLimits: Array<{ feature: string; from: number; to: number | string }> = [];
    const removedRestrictions: string[] = [];

    // Find new features
    Object.keys(target.features).forEach(feature => {
      if (target.features[feature] === true && current.features[feature] !== true) {
        newFeatures.push(this.getFeatureDisplayName(feature));
      }
    });

    // Find increased limits
    Object.keys(target.limits).forEach(feature => {
      const currentLimit = current.limits[feature] || 0;
      const targetLimit = target.limits[feature] || 0;
      
      if (targetLimit > currentLimit || (targetLimit === -1 && currentLimit > 0)) {
        increasedLimits.push({
          feature: this.getFeatureDisplayName(feature),
          from: currentLimit === -1 ? 'Unlimited' : currentLimit,
          to: targetLimit === -1 ? 'Unlimited' : targetLimit
        });
      }
    });

    // Find removed restrictions
    current.restrictions.forEach(restriction => {
      if (!target.restrictions.includes(restriction)) {
        removedRestrictions.push(restriction);
      }
    });

    // Calculate savings
    const savings = this.calculateSavings(target);

    return {
      newFeatures,
      increasedLimits,
      removedRestrictions,
      savings
    };
  }

  /**
   * Get personalized upgrade recommendations
   */
  getUpgradeRecommendations(userMembership: UserMembership, userActivity: any): {
    recommendedTier: string;
    reasons: string[];
    urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  } {
    const currentTier = userMembership.tier;
    const usage = this.getUsageStats(userMembership);

    // Check if user is hitting limits
    const hittingLimits = Object.values(usage).some(stat => 
      !stat.unlimited && stat.percentage >= 80
    );

    // Check activity level
    const isActive = userActivity.dailyActive || userActivity.weeklyActive;
    const isEngaged = userActivity.messageResponseRate > 70;

    let recommendedTier = 'PREMIUM';
    const reasons: string[] = [];
    let urgency: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';

    if (currentTier === 'FREE') {
      if (hittingLimits) {
        recommendedTier = 'PREMIUM';
        reasons.push('You\'re hitting daily browsing limits');
        reasons.push('Unlock unlimited messaging');
        urgency = 'HIGH';
      } else if (isActive && isEngaged) {
        recommendedTier = 'PREMIUM';
        reasons.push('You\'re an active member - unlock premium features');
        reasons.push('Get priority visibility in search');
        urgency = 'MEDIUM';
      }
    } else if (currentTier === 'PREMIUM') {
      if (userActivity.eventAttendance > 5) {
        recommendedTier = 'VIP';
        reasons.push('Frequent event attendee - unlock VIP events');
        reasons.push('Get concierge service for event planning');
        urgency = 'MEDIUM';
      } else if (hittingLimits) {
        recommendedTier = 'VIP';
        reasons.push('Unlock unlimited video calls');
        reasons.push('Get advanced privacy features');
        urgency = 'LOW';
      }
    }

    return {
      recommendedTier,
      reasons,
      urgency
    };
  }

  /**
   * Calculate membership savings
   */
  private calculateSavings(tier: MembershipTier): number {
    if (tier.id === 'FREE') return 0;
    
    const monthlyCost = tier.pricing.monthly * 12;
    const yearlyCost = tier.pricing.yearly;
    
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  }

  /**
   * Get human-readable feature names
   */
  private getFeatureDisplayName(feature: string): string {
    const displayNames: { [key: string]: string } = {
      profileViewsPerDay: 'Daily Profile Views',
      messagesPerWeek: 'Weekly Messages',
      photoUploads: 'Photo Uploads',
      basicFilters: 'Basic Filters',
      advancedFilters: 'Advanced Filters',
      ghostMode: 'Ghost Mode',
      readReceipts: 'Read Receipts',
      videoCalls: 'Video Calls',
      eventRSVP: 'Event RSVP',
      prioritySupport: 'Priority Support',
      faceBlur: 'Face Blur Technology',
      travelMode: 'Travel Mode',
      vipEvents: 'VIP Events',
      conciergeService: 'Concierge Service',
      backgroundCheck: 'Background Check',
      disappearingMessages: 'Disappearing Messages',
      screenshotAlerts: 'Screenshot Alerts',
      profileBoost: 'Profile Boost',
      customBadges: 'Custom Badges',
      earlyAccess: 'Early Access'
    };

    return displayNames[feature] || feature;
  }

  /**
   * Validate membership status
   */
  validateMembership(userMembership: UserMembership): {
    isValid: boolean;
    status: string;
    expiresAt?: Date;
    daysRemaining?: number;
  } {
    const now = new Date();

    if (userMembership.status === 'ACTIVE') {
      if (userMembership.endDate && userMembership.endDate < now) {
        return {
          isValid: false,
          status: 'EXPIRED',
          expiresAt: userMembership.endDate
        };
      }

      const daysRemaining = userMembership.endDate 
        ? Math.ceil((userMembership.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : undefined;

      return {
        isValid: true,
        status: 'ACTIVE',
        expiresAt: userMembership.endDate,
        daysRemaining
      };
    }

    if (userMembership.status === 'TRIAL') {
      const daysRemaining = userMembership.endDate 
        ? Math.ceil((userMembership.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

      return {
        isValid: daysRemaining > 0,
        status: 'TRIAL',
        expiresAt: userMembership.endDate,
        daysRemaining
      };
    }

    return {
      isValid: false,
      status: userMembership.status
    };
  }

  /**
   * Get membership analytics
   */
  getMembershipAnalytics(userMembership: UserMembership): {
    totalValue: number;
    featuresUsed: string[];
    mostUsedFeature: string;
    upgradePotential: number;
    retentionScore: number;
  } {
    const tier = this.getTier(userMembership.tier);
    if (!tier) {
      return {
        totalValue: 0,
        featuresUsed: [],
        mostUsedFeature: '',
        upgradePotential: 0,
        retentionScore: 0
      };
    }

    const featuresUsed = Object.keys(userMembership.usage)
      .filter(feature => userMembership.usage[feature] > 0);

    const mostUsedFeature = Object.keys(userMembership.usage)
      .reduce((a, b) => userMembership.usage[a] > userMembership.usage[b] ? a : b, '');

    const totalValue = tier.pricing.yearly;
    
    const upgradePotential = this.calculateUpgradePotential(userMembership);
    const retentionScore = this.calculateRetentionScore(userMembership);

    return {
      totalValue,
      featuresUsed,
      mostUsedFeature,
      upgradePotential,
      retentionScore
    };
  }

  private calculateUpgradePotential(userMembership: UserMembership): number {
    // Logic to calculate upgrade potential based on usage patterns
    const usage = userMembership.usage;
    const tier = userMembership.tier;

    if (tier === 'FREE') {
      const dailyUsage = (usage.dailySwipes || 0) / 5; // Max 5 for free
      return Math.min(100, dailyUsage * 100);
    }

    if (tier === 'PREMIUM') {
      const videoUsage = (usage.videoCallMinutes || 0) / 60; // 1 hour limit
      return Math.min(100, videoUsage * 100);
    }

    return 0;
  }

  private calculateRetentionScore(userMembership: UserMembership): number {
    // Logic to calculate retention score based on engagement
    const daysSinceStart = Math.floor(
      (Date.now() - userMembership.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const usage = userMembership.usage;
    const totalUsage = Object.values(usage).reduce((a, b) => a + b, 0);

    // Simple retention calculation
    const engagementScore = Math.min(100, (totalUsage / daysSinceStart) * 10);
    return Math.round(engagementScore);
  }
}

export const membershipSystem = new PremiumMembershipSystem();
