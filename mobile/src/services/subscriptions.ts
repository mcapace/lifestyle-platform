import * as InAppPurchases from 'expo-in-app-purchases';
import { Platform } from 'react-native';

// Subscription Product IDs (must match App Store Connect / Google Play Console)
export const SUBSCRIPTION_IDS = {
  EXPLORER_MONTHLY: Platform.select({
    ios: 'com.eloura.app.explorer.monthly',
    android: 'com.eloura.app.explorer.monthly',
  })!,
  CONNOISSEUR_MONTHLY: Platform.select({
    ios: 'com.eloura.app.connoisseur.monthly',
    android: 'com.eloura.app.connoisseur.monthly',
  })!,
};

export type SubscriptionTier = 'curious' | 'explorer' | 'connoisseur';

export interface Subscription {
  tier: SubscriptionTier;
  price: string;
  features: string[];
  productId?: string;
}

export const SUBSCRIPTIONS: Subscription[] = [
  {
    tier: 'curious',
    price: 'Free',
    features: [
      'Basic profile',
      'Limited swipes (10/day)',
      'Join communities',
      'Browse events',
      'Basic messaging'
    ],
  },
  {
    tier: 'explorer',
    price: '$29.99/mo',
    productId: SUBSCRIPTION_IDS.EXPLORER_MONTHLY,
    features: [
      'Unlimited swipes',
      'Advanced filters',
      'Priority support',
      'Event RSVPs',
      'AI chat assistant',
      'Voice messages',
      'Verified badge'
    ],
  },
  {
    tier: 'connoisseur',
    price: '$99.99/mo',
    productId: SUBSCRIPTION_IDS.CONNOISSEUR_MONTHLY,
    features: [
      'All Explorer features',
      'Exclusive events',
      'Concierge service',
      'Priority visibility',
      'Premium verification',
      'Custom recommendations',
      'VIP badge'
    ],
  },
];

class SubscriptionService {
  private static instance: SubscriptionService;

  private constructor() {}

  static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  /**
   * Initialize In-App Purchases
   */
  async initialize(): Promise<void> {
    try {
      await InAppPurchases.connectAsync();
      console.log('✅ In-App Purchases initialized');
    } catch (error) {
      console.error('❌ Failed to initialize IAP:', error);
    }
  }

  /**
   * Get available products from store
   */
  async getProducts(): Promise<InAppPurchases.IAPItemDetails[]> {
    try {
      const productIds = Object.values(SUBSCRIPTION_IDS);
      const { results } = await InAppPurchases.getProductsAsync(productIds);
      return results || [];
    } catch (error) {
      console.error('❌ Failed to fetch products:', error);
      return [];
    }
  }

  /**
   * Purchase a subscription
   */
  async purchaseSubscription(productId: string): Promise<boolean> {
    try {
      await InAppPurchases.purchaseItemAsync(productId);
      
      // Listen for purchase updates
      InAppPurchases.setPurchaseListener(({ responseCode, results }) => {
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
          results?.forEach(async (purchase) => {
            if (!purchase.acknowledged) {
              // Verify purchase with backend
              await this.verifyPurchase(purchase);
              
              // Acknowledge purchase
              await InAppPurchases.finishTransactionAsync(purchase, true);
            }
          });
        }
      });

      return true;
    } catch (error) {
      console.error('❌ Purchase failed:', error);
      return false;
    }
  }

  /**
   * Restore previous purchases
   */
  async restorePurchases(): Promise<InAppPurchases.IAPItemDetails[]> {
    try {
      const { results } = await InAppPurchases.getPurchaseHistoryAsync();
      return results || [];
    } catch (error) {
      console.error('❌ Failed to restore purchases:', error);
      return [];
    }
  }

  /**
   * Verify purchase with backend
   */
  private async verifyPurchase(purchase: InAppPurchases.InAppPurchase): Promise<void> {
    try {
      // Send receipt to backend for validation
      const response = await fetch('/api/subscriptions/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: Platform.OS,
          receipt: purchase.transactionReceipt,
          productId: purchase.productId,
        }),
      });

      if (response.ok) {
        console.log('✅ Purchase verified');
      } else {
        console.error('❌ Purchase verification failed');
      }
    } catch (error) {
      console.error('❌ Verification error:', error);
    }
  }

  /**
   * Check current subscription status
   */
  async getCurrentSubscription(): Promise<SubscriptionTier> {
    try {
      const purchases = await this.restorePurchases();
      
      // Check for active subscriptions
      if (purchases.some(p => p.productId === SUBSCRIPTION_IDS.CONNOISSEUR_MONTHLY)) {
        return 'connoisseur';
      }
      
      if (purchases.some(p => p.productId === SUBSCRIPTION_IDS.EXPLORER_MONTHLY)) {
        return 'explorer';
      }
      
      return 'curious';
    } catch (error) {
      console.error('❌ Failed to get subscription:', error);
      return 'curious';
    }
  }

  /**
   * Disconnect when done
   */
  async disconnect(): Promise<void> {
    await InAppPurchases.disconnectAsync();
  }
}

export default SubscriptionService.getInstance();

