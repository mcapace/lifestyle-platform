import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';

interface Conversation {
  id: string;
  participant: {
    name: string;
    avatar: string;
    online: boolean;
    verified: boolean;
    tier: 'curious' | 'explorer' | 'connoisseur';
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export default function ConversationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      participant: {
        name: 'Sarah Mitchell',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        online: true,
        verified: true,
        tier: 'explorer',
      },
      lastMessage: 'Would love to join the wellness event this weekend!',
      timestamp: '2 min ago',
      unread: 2,
    },
    {
      id: '2',
      participant: {
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        online: false,
        verified: true,
        tier: 'connoisseur',
      },
      lastMessage: 'Great meeting you at the art gallery opening!',
      timestamp: '1 hour ago',
      unread: 0,
    },
    {
      id: '3',
      participant: {
        name: 'Elena Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        online: true,
        verified: true,
        tier: 'explorer',
      },
      lastMessage: 'The rooftop bar recommendation was perfect! 🌟',
      timestamp: '3 hours ago',
      unread: 0,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.newButton}>
          <Text style={styles.newButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor="#6b7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* AI Assistant Banner */}
      <View style={styles.aiBanner}>
        <Text style={styles.aiIcon}>🤖</Text>
        <View style={styles.aiInfo}>
          <Text style={styles.aiTitle}>AI Chat Assistant</Text>
          <Text style={styles.aiText}>Get conversation starters and translation help</Text>
        </View>
      </View>

      {/* Conversations */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {conversations.map((conv) => (
          <TouchableOpacity
            key={conv.id}
            style={[styles.conversation, conv.unread > 0 && styles.conversationUnread]}
            activeOpacity={0.7}
          >
            <Avatar
              uri={conv.participant.avatar}
              name={conv.participant.name}
              size="medium"
              verified={conv.participant.verified}
              online={conv.participant.online}
            />

            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <View style={styles.nameRow}>
                  <Text style={styles.participantName} numberOfLines={1}>
                    {conv.participant.name}
                  </Text>
                  {conv.participant.tier === 'connoisseur' && (
                    <Text style={styles.crown}>👑</Text>
                  )}
                </View>
                <Text style={styles.timestamp}>{conv.timestamp}</Text>
              </View>

              <Text
                style={[styles.lastMessage, conv.unread > 0 && styles.lastMessageUnread]}
                numberOfLines={1}
              >
                {conv.lastMessage}
              </Text>
            </View>

            {conv.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{conv.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: '#ffffff',
  },
  newButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
  },
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5cf6' + '15',
    borderWidth: 1,
    borderColor: '#8b5cf6' + '30',
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    gap: 12,
  },
  aiIcon: {
    fontSize: 28,
  },
  aiInfo: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  aiText: {
    fontSize: 12,
    color: '#d1d5db',
  },
  content: {
    flex: 1,
  },
  conversation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  conversationUnread: {
    backgroundColor: '#8b5cf6' + '05',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  crown: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  lastMessage: {
    fontSize: 14,
    color: '#9ca3af',
  },
  lastMessageUnread: {
    fontWeight: '600',
    color: '#ffffff',
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});

