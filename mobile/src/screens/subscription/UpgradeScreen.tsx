import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import SubscriptionService, { SUBSCRIPTIONS, type SubscriptionTier } from '../../services/subscriptions';

export default function UpgradeScreen() {
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>('curious');
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('explorer');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    initializeSubscriptions();
  }, []);

  const initializeSubscriptions = async () => {
    try {
      await SubscriptionService.initialize();
      const availableProducts = await SubscriptionService.getProducts();
      setProducts(availableProducts);
      
      const tier = await SubscriptionService.getCurrentSubscription();
      setCurrentTier(tier);
    } catch (error) {
      console.error('Failed to initialize subscriptions:', error);
    }
  };

  const handlePurchase = async (tier: SubscriptionTier) => {
    if (tier === 'curious') return;

    setLoading(true);

    try {
      const subscription = SUBSCRIPTIONS.find(s => s.tier === tier);
      if (!subscription?.productId) {
        Alert.alert('Error', 'Subscription not available');
        return;
      }

      const success = await SubscriptionService.purchaseSubscription(subscription.productId);
      
      if (success) {
        Alert.alert(
          'Success! 🎉',
          `You've upgraded to ${tier.charAt(0).toUpperCase() + tier.slice(1)}!`,
          [{ text: 'OK' }]
        );
        setCurrentTier(tier);
      } else {
        Alert.alert('Error', 'Purchase failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      await SubscriptionService.restorePurchases();
      const tier = await SubscriptionService.getCurrentSubscription();
      setCurrentTier(tier);
      Alert.alert('Restored', 'Your purchases have been restored.');
    } catch (error) {
      Alert.alert('Error', 'Failed to restore purchases.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>👑</Text>
          <Text style={styles.title}>Choose Your Tier</Text>
          <Text style={styles.subtitle}>
            Unlock premium features and elevate your lifestyle exploration
          </Text>
        </View>

        {/* Current Tier Badge */}
        {currentTier !== 'curious' && (
          <View style={styles.currentBadge}>
            <Text style={styles.currentBadgeText}>
              ✨ Current: {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
            </Text>
          </View>
        )}

        {/* Subscription Tiers */}
        <View style={styles.tiers}>
          {SUBSCRIPTIONS.map((subscription) => {
            const isSelected = selectedTier === subscription.tier;
            const isCurrent = currentTier === subscription.tier;
            const isPopular = subscription.tier === 'explorer';

            return (
              <TouchableOpacity
                key={subscription.tier}
                style={[
                  styles.tierCard,
                  isSelected && styles.tierCardSelected,
                  isCurrent && styles.tierCardCurrent,
                ]}
                onPress={() => setSelectedTier(subscription.tier)}
                activeOpacity={0.7}
              >
                {isPopular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                )}

                <View style={styles.tierHeader}>
                  <Text style={styles.tierName}>
                    {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
                  </Text>
                  <Text style={styles.tierPrice}>{subscription.price}</Text>
                </View>

                <View style={styles.features}>
                  {subscription.features.map((feature, index) => (
                    <View key={index} style={styles.feature}>
                      <Text style={styles.checkmark}>✓</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {isCurrent && (
                  <View style={styles.currentLabel}>
                    <Text style={styles.currentLabelText}>Current Plan</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Purchase Button */}
        {selectedTier !== currentTier && (
          <TouchableOpacity
            style={[styles.purchaseButton, loading && styles.purchaseButtonDisabled]}
            onPress={() => handlePurchase(selectedTier)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.purchaseButtonText}>
                {selectedTier === 'curious' 
                  ? 'Downgrade to Free' 
                  : `Upgrade to ${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}`
                }
              </Text>
            )}
          </TouchableOpacity>
        )}

        {/* Restore Purchases */}
        <TouchableOpacity
          style={styles.restoreButton}
          onPress={handleRestore}
          disabled={loading}
        >
          <Text style={styles.restoreButtonText}>Restore Purchases</Text>
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.infoText}>
            • Subscriptions auto-renew unless cancelled{'\n'}
            • Cancel anytime in your device settings{'\n'}
            • Charged through App Store or Google Play{'\n'}
            • Features activate immediately
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 22,
  },
  currentBadge: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 24,
  },
  currentBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  tiers: {
    gap: 16,
    marginBottom: 24,
  },
  tierCard: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#2a2a2a',
    borderRadius: 20,
    padding: 24,
    position: 'relative',
  },
  tierCardSelected: {
    borderColor: '#8b5cf6',
    backgroundColor: '#8b5cf6' + '10',
  },
  tierCardCurrent: {
    borderColor: '#10b981',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: '#8b5cf6',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  popularText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  tierHeader: {
    marginBottom: 20,
  },
  tierName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  tierPrice: {
    fontSize: 18,
    color: '#9ca3af',
  },
  features: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkmark: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 14,
    color: '#d1d5db',
    flex: 1,
  },
  currentLabel: {
    marginTop: 16,
    paddingVertical: 8,
    backgroundColor: '#10b981' + '20',
    borderRadius: 8,
    alignItems: 'center',
  },
  currentLabelText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  purchaseButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  purchaseButtonDisabled: {
    opacity: 0.5,
  },
  purchaseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  restoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  restoreButtonText: {
    color: '#8b5cf6',
    fontSize: 14,
    fontWeight: '500',
  },
  info: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
});

