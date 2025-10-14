import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../ui/Button';

interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  members: number;
  posts: number;
  category: string;
  isJoined: boolean;
  isPremium?: boolean;
}

interface CommunityCardProps {
  community: Community;
  onPress: () => void;
  onJoin?: () => void;
}

export default function CommunityCard({ community, onPress, onJoin }: CommunityCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.icon}>{community.icon}</Text>
        <View style={styles.headerInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>{community.name}</Text>
            {community.isPremium && <Text style={styles.premium}>👑</Text>}
          </View>
          <Text style={styles.category}>{community.category}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {community.description}
      </Text>

      <View style={styles.stats}>
        <Text style={styles.stat}>👥 {community.members.toLocaleString()} members</Text>
        <Text style={styles.stat}>💬 {community.posts} posts</Text>
      </View>

      {onJoin && (
        <Button
          title={community.isJoined ? 'Joined' : 'Join Community'}
          onPress={onJoin}
          variant={community.isJoined ? 'secondary' : 'primary'}
          size="small"
          style={styles.joinButton}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  icon: {
    fontSize: 40,
  },
  headerInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  premium: {
    fontSize: 14,
  },
  category: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  stat: {
    fontSize: 12,
    color: '#6b7280',
  },
  joinButton: {
    marginTop: 4,
  },
});

