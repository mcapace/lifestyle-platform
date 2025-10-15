import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Pulse Animation Component
export function PulseAnimation({ children, duration = 1000 }: { children: React.ReactNode; duration?: number }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}

// Shimmer Effect Component
export function ShimmerEffect({ width, height, borderRadius = 8 }: { width: number; height: number; borderRadius?: number }) {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 1500, easing: Easing.linear }),
      -1,
      false
    );
  }, [width]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.shimmerContainer, { width, height, borderRadius }]}>
      <Animated.View style={[styles.shimmerGradient, animatedStyle]} />
    </View>
  );
}

// Skeleton Card Component
export function SkeletonCard() {
  return (
    <View style={styles.skeletonCard}>
      <ShimmerEffect width={SCREEN_WIDTH * 0.9} height={SCREEN_WIDTH * 1.2} borderRadius={20} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonHeader}>
          <ShimmerEffect width={60} height={20} borderRadius={10} />
          <ShimmerEffect width={40} height={20} borderRadius={10} />
        </View>
        <View style={styles.skeletonBottom}>
          <ShimmerEffect width={120} height={24} borderRadius={12} />
          <ShimmerEffect width={SCREEN_WIDTH * 0.7} height={16} borderRadius={8} />
          <View style={styles.skeletonTags}>
            <ShimmerEffect width={60} height={24} borderRadius={12} />
            <ShimmerEffect width={80} height={24} borderRadius={12} />
            <ShimmerEffect width={50} height={24} borderRadius={12} />
          </View>
        </View>
      </View>
    </View>
  );
}

// Loading Spinner with Custom Animation
export function LoadingSpinner({ size = 40, color = '#8b5cf6' }: { size?: number; color?: string }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Feather name="loader" size={size} color={color} />
    </Animated.View>
  );
}

// Heart Animation for Likes
export function HeartAnimation({ visible, onComplete }: { visible: boolean; onComplete?: () => void }) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1.5, { duration: 200 }, () => {
        scale.value = withTiming(1, { duration: 100 });
      });
      opacity.value = withTiming(1, { duration: 200 }, () => {
        opacity.value = withTiming(0, { duration: 800 }, () => {
          runOnJS(onComplete || (() => {}))();
        });
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.heartContainer, animatedStyle]}>
      <Feather name="heart" size={60} color="#ef4444" />
    </Animated.View>
  );
}

// Floating Action Button Animation
export function FloatingActionButton({ 
  onPress, 
  icon = 'plus', 
  color = '#8b5cf6',
  size = 56 
}: { 
  onPress: () => void; 
  icon?: string; 
  color?: string;
  size?: number;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.9, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: color, width: size, height: size }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Feather name={icon as any} size={size * 0.4} color="#ffffff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

// Pull to Refresh Animation
export function PullToRefreshIndicator({ progress, refreshing }: { progress: number; refreshing: boolean }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (refreshing) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      rotation.value = withTiming(0);
    }
  }, [refreshing]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: interpolate(progress, [0, 1], [0.5, 1]) }
    ],
    opacity: interpolate(progress, [0, 0.3, 1], [0, 0.5, 1]),
  }));

  return (
    <Animated.View style={[styles.pullToRefresh, animatedStyle]}>
      <Feather name="refresh-cw" size={24} color="#8b5cf6" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shimmerContainer: {
    backgroundColor: '#2a2a2a',
    overflow: 'hidden',
  },
  shimmerGradient: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3a3a3a',
  },
  skeletonCard: {
    position: 'relative',
    marginBottom: 16,
  },
  skeletonContent: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    justifyContent: 'space-between',
  },
  skeletonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonBottom: {
    gap: 12,
  },
  skeletonTags: {
    flexDirection: 'row',
    gap: 8,
  },
  heartContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -30,
    marginLeft: -30,
    zIndex: 1000,
  },
  fab: {
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  pullToRefresh: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
