import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'premium';
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

export default function Badge({ label, variant = 'primary', size = 'medium', style }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], styles[size], style]}>
      <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`]]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  primary: {
    backgroundColor: '#8b5cf6' + '20',
    borderWidth: 1,
    borderColor: '#8b5cf6' + '40',
  },
  success: {
    backgroundColor: '#10b981' + '20',
    borderWidth: 1,
    borderColor: '#10b981' + '40',
  },
  warning: {
    backgroundColor: '#f59e0b' + '20',
    borderWidth: 1,
    borderColor: '#f59e0b' + '40',
  },
  error: {
    backgroundColor: '#ef4444' + '20',
    borderWidth: 1,
    borderColor: '#ef4444' + '40',
  },
  premium: {
    backgroundColor: '#f59e0b' + '20',
    borderWidth: 1,
    borderColor: '#f59e0b' + '40',
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: '#8b5cf6',
  },
  successText: {
    color: '#10b981',
  },
  warningText: {
    color: '#f59e0b',
  },
  errorText: {
    color: '#ef4444',
  },
  premiumText: {
    color: '#f59e0b',
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
});

