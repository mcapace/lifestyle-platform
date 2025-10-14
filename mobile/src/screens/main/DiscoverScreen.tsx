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
import EventCard from '../../components/cards/EventCard';
import CommunityCard from '../../components/cards/CommunityCard';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';

export default function DiscoverScreen() {
  const [activeTab, setActiveTab] = useState<'people' | 'communities' | 'events'>('people');
  const [searchQuery, setSearchQuery] = useState('');

  const mockPeople = [
    {
      id: '1',
      name: 'Sophia & Liam',
      age: '30 & 33',
      location: 'Miami, FL',
      distance: '5 miles away',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
      bio: 'Passionate about wellness and cultural exploration.',
      interests: ['Yoga', 'Art', 'Travel', 'Dining'],
      verified: true,
      score: 92,
    },
  ];

  const mockCommunities = [
    {
      id: '1',
      name: 'Miami Lifestyle Explorers',
      description: 'Discover the best of Miami\'s hidden gems and exclusive events.',
      icon: '🌴',
      members: 1247,
      posts: 342,
      category: 'Local Community',
      isJoined: false,
    },
    {
      id: '2',
      name: 'Wellness & Mindfulness',
      description: 'A space for holistic well-being, yoga, meditation.',
      icon: '🧘‍♀️',
      members: 892,
      posts: 156,
      category: 'Health & Wellness',
      isJoined: true,
    },
  ];

  const mockEvents = [
    {
      id: '1',
      title: 'Sunset Wellness Circle',
      description: 'Join us for meditation and yoga as we watch the sunset.',
      date: 'Oct 25',
      time: '6:00 PM - 8:00 PM',
      location: 'South Beach, Miami',
      attendees: 45,
      price: 'free' as const,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
      category: 'wellness',
      isTrending: true,
      host: {
        name: 'Sarah M.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore ELOURA</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Text>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'people', label: 'People', icon: '👥' },
          { id: 'communities', label: 'Communities', icon: '🌐' },
          { id: 'events', label: 'Events', icon: '📅' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id as typeof activeTab)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* People Tab */}
        {activeTab === 'people' && (
          <View style={styles.peopleContainer}>
            {mockPeople.map((person) => (
              <TouchableOpacity key={person.id} style={styles.personCard}>
                <View style={styles.personHeader}>
                  <Avatar uri={person.avatar} name={person.name} size="large" verified={person.verified} />
                  <View style={styles.personScore}>
                    <Text style={styles.scoreText}>⭐ {person.score}</Text>
                  </View>
                </View>
                
                <View style={styles.personInfo}>
                  <Text style={styles.personName}>
                    {person.name} <Text style={styles.personAge}>({person.age})</Text>
                  </Text>
                  <Text style={styles.personLocation}>📍 {person.distance}</Text>
                  <Text style={styles.personBio} numberOfLines={2}>{person.bio}</Text>
                  
                  <View style={styles.interests}>
                    {person.interests.map((interest, i) => (
                      <Badge key={i} label={interest} size="small" variant="primary" />
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Communities Tab */}
        {activeTab === 'communities' && (
          <View style={styles.listContainer}>
            {mockCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                onPress={() => console.log('View community')}
                onJoin={() => console.log('Join community')}
              />
            ))}
          </View>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <View style={styles.listContainer}>
            {mockEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onPress={() => console.log('View event')}
              />
            ))}
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  activeTab: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  tabIcon: {
    fontSize: 16,
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
    paddingHorizontal: 24,
  },
  peopleContainer: {
    gap: 16,
  },
  personCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    padding: 20,
    marginBottom: 16,
  },
  personHeader: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  personScore: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  personInfo: {
    gap: 8,
  },
  personName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  personAge: {
    fontSize: 16,
    fontWeight: '400',
    color: '#9ca3af',
  },
  personLocation: {
    fontSize: 13,
    color: '#9ca3af',
  },
  personBio: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 16,
  },
});
