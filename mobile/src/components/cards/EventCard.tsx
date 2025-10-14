import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  price: number | 'free';
  image: string;
  category: string;
  isPremium?: boolean;
  isTrending?: boolean;
  host: {
    name: string;
    avatar: string;
  };
}

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Event Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <View style={styles.overlay} />
        
        {/* Badges */}
        <View style={styles.badges}>
          {event.isTrending && (
            <View style={styles.trendingBadge}>
              <Text style={styles.badgeText}>🔥 Trending</Text>
            </View>
          )}
          {event.isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.badgeText}>👑 Premium</Text>
            </View>
          )}
        </View>

        {/* Date Overlay */}
        <View style={styles.dateOverlay}>
          <Text style={styles.dateText}>📅 {event.date}</Text>
          <Text style={styles.timeText}>🕐 {event.time.split(' - ')[0]}</Text>
        </View>
      </View>

      {/* Event Info */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{event.description}</Text>

        <View style={styles.metadata}>
          <Text style={styles.location} numberOfLines={1}>📍 {event.location}</Text>
        </View>

        {/* Host */}
        <View style={styles.host}>
          <Avatar uri={event.host.avatar} name={event.host.name} size="small" />
          <Text style={styles.hostName} numberOfLines={1}>Hosted by {event.host.name}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.stats}>
            <Text style={styles.attendees}>👥 {event.attendees}</Text>
            <Text style={styles.rating}>⭐ 4.8</Text>
          </View>
          <Text style={styles.price}>
            {event.price === 'free' ? 'Free' : `$${event.price}`}
          </Text>
        </View>

        {/* Category */}
        <Badge label={event.category} variant="primary" size="small" style={styles.categoryBadge} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  badges: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    gap: 8,
  },
  trendingBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  dateOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backdropFilter: 'blur(10px)',
  },
  dateText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  timeText: {
    color: '#d1d5db',
    fontSize: 11,
    marginTop: 2,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
    marginBottom: 12,
  },
  metadata: {
    marginBottom: 12,
  },
  location: {
    fontSize: 13,
    color: '#9ca3af',
  },
  host: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  hostName: {
    fontSize: 13,
    color: '#d1d5db',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  attendees: {
    fontSize: 13,
    color: '#9ca3af',
  },
  rating: {
    fontSize: 13,
    color: '#f59e0b',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

