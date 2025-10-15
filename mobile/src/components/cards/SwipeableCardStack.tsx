import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const ROTATION_MULTIPLIER = 0.1;

interface CardData {
  id: string;
  name: string;
  age: number;
  bio: string;
  image: string;
  interests: string[];
  verified: boolean;
  distance: string;
  lifestyleScore: number;
}

interface SwipeableCardStackProps {
  cards: CardData[];
  onSwipeLeft?: (card: CardData) => void;
  onSwipeRight?: (card: CardData) => void;
  onLike?: (card: CardData) => void;
  onPass?: (card: CardData) => void;
}

const SwipeableCard = ({
  card,
  index,
  onSwipeLeft,
  onSwipeRight,
  onLike,
  onPass,
}: {
  card: CardData;
  index: number;
  onSwipeLeft?: (card: CardData) => void;
  onSwipeRight?: (card: CardData) => void;
  onLike?: (card: CardData) => void;
  onPass?: (card: CardData) => void;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      scale.value = withSpring(1.05);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      
      // Add slight rotation based on swipe direction
      const rotation = interpolate(
        event.translationX,
        [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
        [-15, 0, 15],
        Extrapolate.CLAMP
      );
      
      // Add parallax effect to background
      opacity.value = interpolate(
        Math.abs(event.translationX),
        [0, SCREEN_WIDTH * 0.5],
        [1, 0.3],
        Extrapolate.CLAMP
      );
    },
    onEnd: (event) => {
      const shouldSwipeLeft = event.translationX < -SWIPE_THRESHOLD;
      const shouldSwipeRight = event.translationX > SWIPE_THRESHOLD;
      
      if (shouldSwipeLeft) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 });
        translateY.value = withTiming(event.translationY * 2, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
        runOnJS(onPass || (() => {}))(card);
      } else if (shouldSwipeRight) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 });
        translateY.value = withTiming(event.translationY * 2, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
        runOnJS(onLike || (() => {}))(card);
      } else {
        // Spring back to center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
        opacity.value = withSpring(1);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-15, 0, 15],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const likeButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP
    );
    
    return { opacity };
  });

  const passButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolate.CLAMP
    );
    
    return { opacity };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {/* Background Image with Parallax */}
        <Image source={{ uri: card.image }} style={styles.backgroundImage} />
        
        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />
        
        {/* Action Buttons */}
        <Animated.View style={[styles.likeButton, likeButtonStyle]}>
          <Feather name="heart" size={32} color="#10b981" />
        </Animated.View>
        
        <Animated.View style={[styles.passButton, passButtonStyle]}>
          <Feather name="x" size={32} color="#ef4444" />
        </Animated.View>

        {/* Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.badgeContainer}>
              <View style={styles.verifiedBadge}>
                <Feather name="check" size={14} color="#ffffff" />
              </View>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreText}>{card.lifestyleScore}</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.moreButton}>
              <Feather name="more-horizontal" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Bottom Info */}
          <View style={styles.bottomInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{card.name}</Text>
              <Text style={styles.age}>, {card.age}</Text>
              <View style={styles.distanceContainer}>
                <Feather name="map-pin" size={12} color="#d1d5db" />
                <Text style={styles.distance}>{card.distance}</Text>
              </View>
            </View>
            
            <Text style={styles.bio} numberOfLines={2}>{card.bio}</Text>
            
            {/* Interests */}
            <View style={styles.interestsContainer}>
              {card.interests.slice(0, 3).map((interest, idx) => (
                <View key={idx} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default function SwipeableCardStack({
  cards,
  onSwipeLeft,
  onSwipeRight,
  onLike,
  onPass,
}: SwipeableCardStackProps) {
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <SwipeableCard
          key={card.id}
          card={card}
          index={index}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          onLike={onLike}
          onPass={onPass}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 1.2,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    borderRadius: 20,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
  },
  likeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 25,
    padding: 12,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  passButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 25,
    padding: 12,
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  verifiedBadge: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 6,
  },
  scoreBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  bottomInfo: {
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  age: {
    fontSize: 28,
    fontWeight: '400',
    color: '#ffffff',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    gap: 4,
  },
  distance: {
    fontSize: 14,
    color: '#d1d5db',
  },
  bio: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 22,
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
});
