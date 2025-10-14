import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  verified?: boolean;
  online?: boolean;
  style?: ViewStyle;
}

export default function Avatar({
  uri,
  name,
  size = 'medium',
  verified = false,
  online = false,
  style,
}: AvatarProps) {
  const sizeStyles = {
    small: 32,
    medium: 48,
    large: 80,
  };

  const dimension = sizeStyles[size];
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  return (
    <View style={[styles.container, { width: dimension, height: dimension }, style]}>
      {uri ? (
        <Image source={{ uri }} style={[styles.image, { width: dimension, height: dimension }]} />
      ) : (
        <View style={[styles.placeholder, { width: dimension, height: dimension }]}>
          <Text style={[styles.initials, { fontSize: dimension * 0.4 }]}>{initials}</Text>
        </View>
      )}
      
      {online && (
        <View style={[styles.onlineBadge, size === 'small' && styles.onlineBadgeSmall]} />
      )}
      
      {verified && (
        <View style={[styles.verifiedBadge, size === 'small' && styles.verifiedBadgeSmall]}>
          <Text style={styles.verifiedText}>✓</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    borderRadius: 100,
  },
  placeholder: {
    borderRadius: 100,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#ffffff',
    fontWeight: '600',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#0a0a0a',
  },
  onlineBadgeSmall: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  verifiedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadgeSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

