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
import { Feather } from '@expo/vector-icons';
import CommunityCard from '../../components/cards/CommunityCard';
import { useNavigation } from '@react-navigation/native';

export default function CommunitiesScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'all' | 'joined' | 'trending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const communities = [
    {
      id: '1',
      name: 'Miami Lifestyle Explorers',
      description: 'Discover the best of Miami\'s hidden gems and exclusive events.',
      icon: '🌴',
      members: 1247,
      posts: 342,
      category: 'Local Community',
      isJoined: true,
      isPremium: false,
    },
    {
      id: '2',
      name: 'Wellness & Mindfulness',
      description: 'A space for holistic well-being, yoga, meditation, and healthy living.',
      icon: '🧘‍♀️',
      members: 892,
      posts: 156,
      category: 'Health & Wellness',
      isJoined: false,
      isPremium: false,
    },
    {
      id: '3',
      name: 'Elite Lifestyle Connoisseurs',
      description: 'Exclusive community for premium members. VIP events and luxury lifestyle.',
      icon: '👑',
      members: 234,
      posts: 67,
      category: 'Premium',
      isJoined: false,
      isPremium: true,
    },
  ];

  const filteredCommunities = communities.filter(c => {
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'joined' && c.isJoined) ||
      (activeTab === 'trending' && c.members > 800);
    
    const matchesSearch = searchQuery === '' || 
      c.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Communities</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>+ Create</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#6b7280" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search communities..."
          placeholderTextColor="#6b7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'all', label: 'All' },
          { id: 'joined', label: 'My Communities' },
          { id: 'trending', label: 'Trending' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id as typeof activeTab)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Communities List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.communitiesList}>
          {filteredCommunities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              onPress={() => {
                // Navigate to community detail
                console.log('View community:', community.id);
              }}
              onJoin={() => {
                console.log('Join community:', community.id);
              }}
            />
          ))}
        </View>

        {filteredCommunities.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="globe" size={64} color="#2a2a2a" />
            <Text style={styles.emptyTitle}>No communities found</Text>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Try adjusting your search' : 'Be the first to create a community!'}
            </Text>
          </View>
        )}

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
  createButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
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
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  activeTab: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  tabText: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  communitiesList: {
    paddingHorizontal: 24,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
});

