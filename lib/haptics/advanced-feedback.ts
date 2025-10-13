// Advanced Haptic Feedback System - Next-Generation
// Sophisticated haptic patterns that create premium tactile experiences

export interface HapticPattern {
  id: string;
  name: string;
  description: string;
  pattern: HapticEvent[];
  intensity: number; // 0-1
  duration: number; // milliseconds
  category: 'success' | 'error' | 'warning' | 'notification' | 'interaction' | 'celebration';
}

export interface HapticEvent {
  type: 'vibration' | 'tap' | 'impact' | 'selection';
  intensity: number;
  duration: number;
  delay?: number;
}

export class AdvancedHapticSystem {
  private readonly patterns: Record<string, HapticPattern> = {
    // Success Patterns
    MATCH_FOUND: {
      id: 'MATCH_FOUND',
      name: 'Match Found',
      description: 'Celebration haptic for finding a match',
      category: 'celebration',
      intensity: 0.8,
      duration: 1200,
      pattern: [
        { type: 'impact', intensity: 0.6, duration: 100 },
        { type: 'tap', intensity: 0.4, duration: 50, delay: 150 },
        { type: 'tap', intensity: 0.4, duration: 50, delay: 300 },
        { type: 'impact', intensity: 0.8, duration: 150, delay: 500 },
        { type: 'vibration', intensity: 0.6, duration: 400, delay: 700 }
      ]
    },

    MESSAGE_SENT: {
      id: 'MESSAGE_SENT',
      name: 'Message Sent',
      description: 'Subtle confirmation for sending messages',
      category: 'success',
      intensity: 0.3,
      duration: 200,
      pattern: [
        { type: 'tap', intensity: 0.3, duration: 50 },
        { type: 'selection', intensity: 0.2, duration: 30, delay: 100 }
      ]
    },

    PROFILE_LIKED: {
      id: 'PROFILE_LIKED',
      name: 'Profile Liked',
      description: 'Satisfying feedback for liking profiles',
      category: 'success',
      intensity: 0.5,
      duration: 300,
      pattern: [
        { type: 'tap', intensity: 0.5, duration: 80 },
        { type: 'vibration', intensity: 0.3, duration: 150, delay: 100 }
      ]
    },

    // Error Patterns
    VERIFICATION_FAILED: {
      id: 'VERIFICATION_FAILED',
      name: 'Verification Failed',
      description: 'Alert haptic for verification issues',
      category: 'error',
      intensity: 0.7,
      duration: 800,
      pattern: [
        { type: 'impact', intensity: 0.8, duration: 100 },
        { type: 'vibration', intensity: 0.6, duration: 200, delay: 150 },
        { type: 'impact', intensity: 0.7, duration: 100, delay: 400 }
      ]
    },

    PAYMENT_FAILED: {
      id: 'PAYMENT_FAILED',
      name: 'Payment Failed',
      description: 'Urgent haptic for payment issues',
      category: 'error',
      intensity: 0.9,
      duration: 1000,
      pattern: [
        { type: 'impact', intensity: 1.0, duration: 150 },
        { type: 'vibration', intensity: 0.8, duration: 300, delay: 200 },
        { type: 'impact', intensity: 0.9, duration: 150, delay: 600 }
      ]
    },

    // Warning Patterns
    LOW_BATTERY: {
      id: 'LOW_BATTERY',
      name: 'Low Battery',
      description: 'Gentle warning for low battery',
      category: 'warning',
      intensity: 0.4,
      duration: 600,
      pattern: [
        { type: 'tap', intensity: 0.4, duration: 60 },
        { type: 'tap', intensity: 0.3, duration: 60, delay: 300 }
      ]
    },

    PRIVACY_ALERT: {
      id: 'PRIVACY_ALERT',
      name: 'Privacy Alert',
      description: 'Discrete haptic for privacy concerns',
      category: 'warning',
      intensity: 0.5,
      duration: 400,
      pattern: [
        { type: 'selection', intensity: 0.5, duration: 80 },
        { type: 'vibration', intensity: 0.3, duration: 200, delay: 150 }
      ]
    },

    // Notification Patterns
    NEW_MESSAGE: {
      id: 'NEW_MESSAGE',
      name: 'New Message',
      description: 'Gentle notification for new messages',
      category: 'notification',
      intensity: 0.4,
      duration: 400,
      pattern: [
        { type: 'tap', intensity: 0.4, duration: 80 },
        { type: 'tap', intensity: 0.3, duration: 60, delay: 200 }
      ]
    },

    EVENT_REMINDER: {
      id: 'EVENT_REMINDER',
      name: 'Event Reminder',
      description: 'Friendly reminder for upcoming events',
      category: 'notification',
      intensity: 0.3,
      duration: 300,
      pattern: [
        { type: 'selection', intensity: 0.3, duration: 60 },
        { type: 'tap', intensity: 0.2, duration: 40, delay: 150 }
      ]
    },

    // Interaction Patterns
    BUTTON_PRESS: {
      id: 'BUTTON_PRESS',
      name: 'Button Press',
      description: 'Standard button interaction feedback',
      category: 'interaction',
      intensity: 0.2,
      duration: 50,
      pattern: [
        { type: 'selection', intensity: 0.2, duration: 50 }
      ]
    },

    SWIPE_GESTURE: {
      id: 'SWIPE_GESTURE',
      name: 'Swipe Gesture',
      description: 'Feedback for swipe interactions',
      category: 'interaction',
      intensity: 0.3,
      duration: 100,
      pattern: [
        { type: 'tap', intensity: 0.3, duration: 50 },
        { type: 'vibration', intensity: 0.2, duration: 50, delay: 50 }
      ]
    },

    // Celebration Patterns
    PROFILE_VERIFIED: {
      id: 'PROFILE_VERIFIED',
      name: 'Profile Verified',
      description: 'Celebration for successful verification',
      category: 'celebration',
      intensity: 0.8,
      duration: 1500,
      pattern: [
        { type: 'impact', intensity: 0.7, duration: 120 },
        { type: 'tap', intensity: 0.5, duration: 60, delay: 200 },
        { type: 'tap', intensity: 0.5, duration: 60, delay: 350 },
        { type: 'tap', intensity: 0.5, duration: 60, delay: 500 },
        { type: 'impact', intensity: 0.9, duration: 150, delay: 700 },
        { type: 'vibration', intensity: 0.6, duration: 500, delay: 900 }
      ]
    },

    VIP_UPGRADE: {
      id: 'VIP_UPGRADE',
      name: 'VIP Upgrade',
      description: 'Premium celebration for VIP upgrades',
      category: 'celebration',
      intensity: 0.9,
      duration: 2000,
      pattern: [
        { type: 'impact', intensity: 0.8, duration: 150 },
        { type: 'vibration', intensity: 0.5, duration: 200, delay: 200 },
        { type: 'tap', intensity: 0.6, duration: 80, delay: 450 },
        { type: 'tap', intensity: 0.6, duration: 80, delay: 600 },
        { type: 'tap', intensity: 0.6, duration: 80, delay: 750 },
        { type: 'impact', intensity: 1.0, duration: 200, delay: 950 },
        { type: 'vibration', intensity: 0.7, duration: 600, delay: 1200 }
      ]
    }
  };

  private isSupported: boolean = false;
  private isEnabled: boolean = true;
  private currentIntensity: number = 1.0;

  constructor() {
    this.checkSupport();
    this.loadPreferences();
  }

  /**
   * Check if haptic feedback is supported
   */
  private async checkSupport(): Promise<void> {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      this.isSupported = true;
    }
  }

  /**
   * Load user preferences for haptic feedback
   */
  private loadPreferences(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hapticPreferences');
      if (saved) {
        const prefs = JSON.parse(saved);
        this.isEnabled = prefs.enabled !== false;
        this.currentIntensity = prefs.intensity || 1.0;
      }
    }
  }

  /**
   * Save user preferences
   */
  private savePreferences(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hapticPreferences', JSON.stringify({
        enabled: this.isEnabled,
        intensity: this.currentIntensity
      }));
    }
  }

  /**
   * Trigger haptic feedback with pattern
   */
  async triggerHaptic(patternId: string, customIntensity?: number): Promise<boolean> {
    if (!this.isSupported || !this.isEnabled) {
      return false;
    }

    const pattern = this.patterns[patternId];
    if (!pattern) {
      console.warn(`Haptic pattern ${patternId} not found`);
      return false;
    }

    const intensity = customIntensity !== undefined ? customIntensity : this.currentIntensity;
    
    try {
      await this.playPattern(pattern, intensity);
      return true;
    } catch (error) {
      console.error('Haptic feedback failed:', error);
      return false;
    }
  }

  /**
   * Play haptic pattern
   */
  private async playPattern(pattern: HapticPattern, intensity: number): Promise<void> {
    const adjustedPattern = pattern.pattern.map(event => ({
      ...event,
      intensity: event.intensity * intensity * pattern.intensity
    }));

    // Play each event in sequence
    for (const event of adjustedPattern) {
      if (event.delay) {
        await this.delay(event.delay);
      }
      
      await this.playEvent(event);
    }
  }

  /**
   * Play individual haptic event
   */
  private async playEvent(event: HapticEvent): Promise<void> {
    const duration = Math.max(10, Math.min(1000, event.duration));
    const intensity = Math.max(0, Math.min(1, event.intensity));

    switch (event.type) {
      case 'vibration':
        navigator.vibrate(duration);
        break;
      
      case 'tap':
        if ('vibrate' in navigator) {
          navigator.vibrate([duration * 0.3, duration * 0.7]);
        }
        break;
      
      case 'impact':
        if ('vibrate' in navigator) {
          navigator.vibrate([duration * 0.5, duration * 0.3, duration * 0.2]);
        }
        break;
      
      case 'selection':
        if ('vibrate' in navigator) {
          navigator.vibrate(duration * 0.5);
        }
        break;
    }
  }

  /**
   * Delay utility
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Enable/disable haptic feedback
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    this.savePreferences();
  }

  /**
   * Set haptic intensity
   */
  setIntensity(intensity: number): void {
    this.currentIntensity = Math.max(0, Math.min(1, intensity));
    this.savePreferences();
  }

  /**
   * Get current settings
   */
  getSettings(): { supported: boolean; enabled: boolean; intensity: number } {
    return {
      supported: this.isSupported,
      enabled: this.isEnabled,
      intensity: this.currentIntensity
    };
  }

  /**
   * Get all available patterns
   */
  getAvailablePatterns(): HapticPattern[] {
    return Object.values(this.patterns);
  }

  /**
   * Create custom haptic pattern
   */
  createCustomPattern(
    id: string,
    name: string,
    description: string,
    category: HapticPattern['category'],
    pattern: HapticEvent[]
  ): HapticPattern {
    const customPattern: HapticPattern = {
      id,
      name,
      description,
      category,
      pattern,
      intensity: 0.5,
      duration: pattern.reduce((total, event) => total + (event.delay || 0) + event.duration, 0)
    };

    this.patterns[id] = customPattern;
    return customPattern;
  }

  /**
   * Advanced haptic sequences for complex interactions
   */
  async playMatchSequence(): Promise<void> {
    await this.triggerHaptic('MATCH_FOUND');
    await this.delay(200);
    await this.triggerHaptic('PROFILE_VERIFIED');
  }

  async playUpgradeSequence(): Promise<void> {
    await this.triggerHaptic('VIP_UPGRADE');
    await this.delay(500);
    await this.triggerHaptic('PROFILE_VERIFIED');
  }

  async playErrorSequence(): Promise<void> {
    await this.triggerHaptic('VERIFICATION_FAILED');
    await this.delay(300);
    await this.triggerHaptic('PRIVACY_ALERT');
  }

  /**
   * Context-aware haptic feedback
   */
  async triggerContextualHaptic(
    context: 'swipe' | 'match' | 'message' | 'verification' | 'payment' | 'error',
    intensity?: number
  ): Promise<boolean> {
    const patternMap: Record<string, string> = {
      swipe: 'SWIPE_GESTURE',
      match: 'MATCH_FOUND',
      message: 'NEW_MESSAGE',
      verification: 'PROFILE_VERIFIED',
      payment: 'VIP_UPGRADE',
      error: 'VERIFICATION_FAILED'
    };

    const patternId = patternMap[context];
    if (!patternId) return false;

    return await this.triggerHaptic(patternId, intensity);
  }

  /**
   * Adaptive haptic feedback based on user behavior
   */
  async triggerAdaptiveHaptic(
    basePattern: string,
    userEngagement: 'low' | 'medium' | 'high'
  ): Promise<boolean> {
    const intensityMap = {
      low: 0.3,
      medium: 0.6,
      high: 1.0
    };

    const intensity = intensityMap[userEngagement];
    return await this.triggerHaptic(basePattern, intensity);
  }
}

// Global haptic system instance
export const hapticSystem = new AdvancedHapticSystem();

// React hook for haptic feedback
export function useHaptics() {
  const trigger = async (patternId: string, intensity?: number) => {
    return await hapticSystem.triggerHaptic(patternId, intensity);
  };

  const setEnabled = (enabled: boolean) => {
    hapticSystem.setEnabled(enabled);
  };

  const setIntensity = (intensity: number) => {
    hapticSystem.setIntensity(intensity);
  };

  const getSettings = () => {
    return hapticSystem.getSettings();
  };

  return {
    trigger,
    setEnabled,
    setIntensity,
    getSettings,
    patterns: hapticSystem.getAvailablePatterns()
  };
}
