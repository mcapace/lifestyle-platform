// Premium Matching Algorithm - State of the Art
// This algorithm considers multiple sophisticated factors to create the best matches

export interface UserProfile {
  id: string;
  accountType: 'INDIVIDUAL' | 'COUPLE' | 'GROUP';
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  preferences: {
    lookingFor: string[];
    experienceLevel: string;
    ageRange: { min: number; max: number };
    interests: string[];
    lifestylePreferences: string[];
  };
  verification: {
    level: 'BASIC' | 'ENHANCED' | 'PREMIUM';
    verified: boolean;
    trustScore: number;
  };
  activity: {
    lastActive: Date;
    responseRate: number;
    profileViews: number;
    eventAttendance: number;
  };
  membership: {
    tier: 'FREE' | 'PREMIUM' | 'VIP';
    since: Date;
  };
  compatibility: {
    communicationStyle: string;
    availability: string;
    lifestyleGoals: string[];
  };
}

export interface MatchResult {
  user: UserProfile;
  compatibilityScore: number;
  reasons: string[];
  riskFactors: string[];
  premiumFeatures: string[];
}

export class PremiumMatchingEngine {
  private weights = {
    location: 0.25,        // Distance and travel willingness
    preferences: 0.30,     // Lifestyle preferences and experience
    interests: 0.20,       // Shared interests and activities
    verification: 0.15,    // Trust and verification level
    activity: 0.10,        // Activity level and engagement
  };

  private locationWeights = {
    sameCity: 1.0,
    within25Miles: 0.8,
    within50Miles: 0.6,
    within100Miles: 0.4,
    within200Miles: 0.2,
    beyond200Miles: 0.1,
  };

  private verificationMultipliers = {
    BASIC: 1.0,
    ENHANCED: 1.2,
    PREMIUM: 1.5,
  };

  private membershipMultipliers = {
    FREE: 1.0,
    PREMIUM: 1.1,
    VIP: 1.3,
  };

  /**
   * Calculate sophisticated compatibility score between two users
   */
  calculateCompatibility(
    user1: UserProfile, 
    user2: UserProfile,
    user1Preferences?: any
  ): MatchResult {
    const scores = {
      location: this.calculateLocationScore(user1, user2),
      preferences: this.calculatePreferencesScore(user1, user2),
      interests: this.calculateInterestsScore(user1, user2),
      verification: this.calculateVerificationScore(user1, user2),
      activity: this.calculateActivityScore(user1, user2),
    };

    // Calculate weighted compatibility score
    const baseScore = Object.entries(scores).reduce(
      (total, [key, score]) => total + (score * this.weights[key as keyof typeof this.weights]),
      0
    );

    // Apply verification and membership multipliers
    const verificationMultiplier = Math.max(
      this.verificationMultipliers[user1.verification.level],
      this.verificationMultipliers[user2.verification.level]
    );

    const membershipMultiplier = Math.max(
      this.membershipMultipliers[user1.membership.tier],
      this.membershipMultipliers[user2.membership.tier]
    );

    const finalScore = Math.min(
      100,
      baseScore * verificationMultiplier * membershipMultiplier
    );

    return {
      user: user2,
      compatibilityScore: Math.round(finalScore),
      reasons: this.generateMatchReasons(scores, user1, user2),
      riskFactors: this.identifyRiskFactors(user1, user2),
      premiumFeatures: this.identifyPremiumFeatures(user1, user2),
    };
  }

  /**
   * Calculate location-based compatibility
   */
  private calculateLocationScore(user1: UserProfile, user2: UserProfile): number {
    const distance = this.calculateDistance(
      user1.location.latitude,
      user1.location.longitude,
      user2.location.latitude,
      user2.location.longitude
    );

    // Same city bonus
    if (user1.location.city === user2.location.city) {
      return 100;
    }

    // Distance-based scoring
    if (distance <= 25) return 90;
    if (distance <= 50) return 75;
    if (distance <= 100) return 60;
    if (distance <= 200) return 40;
    return 20;
  }

  /**
   * Calculate preferences compatibility
   */
  private calculatePreferencesScore(user1: UserProfile, user2: UserProfile): number {
    let score = 0;
    let factors = 0;

    // Account type compatibility
    const accountTypeCompatibility = this.getAccountTypeCompatibility(
      user1.accountType,
      user2.accountType
    );
    score += accountTypeCompatibility * 30;
    factors += 30;

    // Looking for compatibility
    const lookingForMatch = this.calculateArrayOverlap(
      user1.preferences.lookingFor,
      user2.preferences.lookingFor
    );
    score += lookingForMatch * 25;
    factors += 25;

    // Experience level compatibility
    const experienceCompatibility = this.getExperienceCompatibility(
      user1.preferences.experienceLevel,
      user2.preferences.experienceLevel
    );
    score += experienceCompatibility * 20;
    factors += 20;

    // Age compatibility
    const ageCompatibility = this.calculateAgeCompatibility(user1, user2);
    score += ageCompatibility * 15;
    factors += 15;

    // Lifestyle preferences
    const lifestyleCompatibility = this.calculateArrayOverlap(
      user1.preferences.lifestylePreferences,
      user2.preferences.lifestylePreferences
    );
    score += lifestyleCompatibility * 10;
    factors += 10;

    return factors > 0 ? (score / factors) * 100 : 0;
  }

  /**
   * Calculate shared interests score
   */
  private calculateInterestsScore(user1: UserProfile, user2: UserProfile): number {
    const sharedInterests = this.calculateArrayOverlap(
      user1.preferences.interests,
      user2.preferences.interests
    );

    // Bonus for having multiple shared interests
    const interestBonus = Math.min(20, sharedInterests * 5);
    
    return Math.min(100, sharedInterests * 80 + interestBonus);
  }

  /**
   * Calculate verification and trust score
   */
  private calculateVerificationScore(user1: UserProfile, user2: UserProfile): number {
    let score = 0;

    // Both users verified
    if (user1.verification.verified && user2.verification.verified) {
      score += 40;
    }

    // Verification level bonus
    const verificationLevels = ['BASIC', 'ENHANCED', 'PREMIUM'];
    const user1Level = verificationLevels.indexOf(user1.verification.level);
    const user2Level = verificationLevels.indexOf(user2.verification.level);
    
    score += (user1Level + user2Level) * 10;

    // Trust score average
    const averageTrustScore = (user1.verification.trustScore + user2.verification.trustScore) / 2;
    score += averageTrustScore * 0.3;

    return Math.min(100, score);
  }

  /**
   * Calculate activity compatibility
   */
  private calculateActivityScore(user1: UserProfile, user2: UserProfile): number {
    let score = 0;

    // Response rate compatibility (both should be responsive)
    const responseRateCompatibility = Math.min(
      user1.activity.responseRate,
      user2.activity.responseRate
    );
    score += responseRateCompatibility * 0.4;

    // Activity level compatibility
    const activityLevel1 = this.calculateActivityLevel(user1);
    const activityLevel2 = this.calculateActivityLevel(user2);
    const activityCompatibility = 100 - Math.abs(activityLevel1 - activityLevel2);
    score += activityCompatibility * 0.3;

    // Event attendance compatibility
    const eventCompatibility = Math.min(
      user1.activity.eventAttendance / 10,
      user2.activity.eventAttendance / 10
    ) * 30;
    score += eventCompatibility;

    return Math.min(100, score);
  }

  /**
   * Generate human-readable match reasons
   */
  private generateMatchReasons(scores: any, user1: UserProfile, user2: UserProfile): string[] {
    const reasons: string[] = [];

    if (scores.location >= 80) {
      reasons.push("Same city - easy to meet up");
    } else if (scores.location >= 60) {
      reasons.push("Close proximity for regular meetups");
    }

    if (scores.preferences >= 80) {
      reasons.push("Highly compatible lifestyle preferences");
    }

    if (scores.interests >= 70) {
      reasons.push("Shared interests and activities");
    }

    if (scores.verification >= 80) {
      reasons.push("Both highly verified and trusted");
    }

    if (user1.membership.tier === 'VIP' || user2.membership.tier === 'VIP') {
      reasons.push("Premium member - exclusive access");
    }

    if (scores.activity >= 70) {
      reasons.push("Both active and engaged members");
    }

    return reasons.slice(0, 3); // Return top 3 reasons
  }

  /**
   * Identify potential risk factors
   */
  private identifyRiskFactors(user1: UserProfile, user2: UserProfile): string[] {
    const risks: string[] = [];

    if (!user1.verification.verified || !user2.verification.verified) {
      risks.push("Unverified profile");
    }

    if (user1.verification.trustScore < 30 || user2.verification.trustScore < 30) {
      risks.push("Low trust score");
    }

    if (user1.activity.responseRate < 20 || user2.activity.responseRate < 20) {
      risks.push("Low response rate");
    }

    const daysSinceActive = Math.floor(
      (Date.now() - user2.activity.lastActive.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceActive > 30) {
      risks.push("Inactive for over 30 days");
    }

    return risks;
  }

  /**
   * Identify premium features that could enhance the match
   */
  private identifyPremiumFeatures(user1: UserProfile, user2: UserProfile): string[] {
    const features: string[] = [];

    if (user1.membership.tier === 'VIP' || user2.membership.tier === 'VIP') {
      features.push("VIP exclusive events");
      features.push("Priority messaging");
      features.push("Advanced privacy features");
    }

    if (user1.verification.level === 'PREMIUM' || user2.verification.level === 'PREMIUM') {
      features.push("Background verified");
      features.push("Enhanced trust badge");
    }

    if (user1.membership.tier === 'PREMIUM' || user2.membership.tier === 'PREMIUM') {
      features.push("Unlimited messaging");
      features.push("Advanced filters");
    }

    return features;
  }

  // Helper methods
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI/180);
  }

  private getAccountTypeCompatibility(type1: string, type2: string): number {
    const compatibilityMatrix = {
      'INDIVIDUAL': { 'INDIVIDUAL': 80, 'COUPLE': 60, 'GROUP': 40 },
      'COUPLE': { 'INDIVIDUAL': 60, 'COUPLE': 100, 'GROUP': 70 },
      'GROUP': { 'INDIVIDUAL': 40, 'COUPLE': 70, 'GROUP': 90 },
    };
    return compatibilityMatrix[type1 as keyof typeof compatibilityMatrix][type2 as keyof typeof compatibilityMatrix[typeof type1]] || 0;
  }

  private calculateArrayOverlap(arr1: string[], arr2: string[]): number {
    if (arr1.length === 0 || arr2.length === 0) return 0;
    const intersection = arr1.filter(item => arr2.includes(item));
    return intersection.length / Math.max(arr1.length, arr2.length);
  }

  private getExperienceCompatibility(level1: string, level2: string): number {
    const levels = ['CURIOUS', 'BEGINNER', 'INTERMEDIATE', 'EXPERIENCED', 'VETERAN'];
    const index1 = levels.indexOf(level1);
    const index2 = levels.indexOf(level2);
    const diff = Math.abs(index1 - index2);
    return Math.max(0, 100 - diff * 20);
  }

  private calculateAgeCompatibility(user1: UserProfile, user2: UserProfile): number {
    // This would need actual age data from user profiles
    // For now, return a default score
    return 80;
  }

  private calculateActivityLevel(user: UserProfile): number {
    return (user.activity.responseRate + 
            Math.min(user.activity.profileViews / 100, 100) + 
            Math.min(user.activity.eventAttendance * 10, 100)) / 3;
  }

  /**
   * Get personalized match recommendations
   */
  async getPersonalizedMatches(
    userId: string,
    limit: number = 20,
    filters?: any
  ): Promise<MatchResult[]> {
    // This would integrate with your database to get potential matches
    // For now, returning mock data structure
    
    const potentialMatches: UserProfile[] = []; // Get from database
    const userProfile: UserProfile = {} as UserProfile; // Get current user profile
    
    const matches = potentialMatches
      .map(match => this.calculateCompatibility(userProfile, match))
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, limit);

    return matches;
  }

  /**
   * Get premium match insights
   */
  getMatchInsights(matchResult: MatchResult): any {
    return {
      compatibilityBreakdown: {
        location: matchResult.user.location.city,
        sharedInterests: matchResult.reasons,
        verificationLevel: matchResult.user.verification.level,
        membershipTier: matchResult.user.membership.tier,
      },
      recommendations: [
        "Try messaging during their peak activity hours",
        "Mention shared interests in your first message",
        "Suggest meeting at a lifestyle event",
      ],
      premiumSuggestions: matchResult.premiumFeatures,
    };
  }
}

export const matchingEngine = new PremiumMatchingEngine();
