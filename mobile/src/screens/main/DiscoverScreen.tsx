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
import SwipeableCardStack from '../../components/cards/SwipeableCardStack';
import EventCard from '../../components/cards/EventCard';
import CommunityCard from '../../components/cards/CommunityCard';
import { FloatingActionButton } from '../../components/ui/LoadingAnimations';
import { SlideUpActionSheet } from '../../components/ui/AnimatedModal';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';

export default function DiscoverScreen() {
  const [activeTab, setActiveTab] = useState<'people' | 'communities' | 'events'>('people');
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionSheet, setShowActionSheet] = useState(false);

  const mockPeople = [
    {
      id: '1',
      name: 'Sophia',
      age: 30,
      location: 'Miami, FL',
      distance: '5 miles away',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      bio: 'Passionate about wellness and cultural exploration. Love discovering hidden gems in the city.',
      interests: ['Yoga', 'Art', 'Travel', 'Dining'],
      verified: true,
      lifestyleScore: 92,
    },
    {
      id: '2',
      name: 'Marcus',
      age: 28,
      location: 'Miami, FL',
      distance: '3 miles away',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      bio: 'Tech entrepreneur with a love for adventure sports and fine dining.',
      interests: ['Technology', 'Surfing', 'Wine', 'Networking'],
      verified: true,
      lifestyleScore: 88,
    },
    {
      id: '3',
      name: 'Elena',
      age: 32,
      location: 'Miami, FL',
      distance: '7 miles away',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
      bio: 'Art curator and lifestyle enthusiast. Always exploring new cultural experiences.',
      interests: ['Art', 'Museums', 'Cocktails', 'Fashion'],
      verified: true,
      lifestyleScore: 95,
    },
  ];

  const mockCommunities = [
    {
      id: '1',
      name: 'Miami Lifestyle Explorers',
      description: 'Discover the best of Miami\'s hidden gems and exclusive events.',
      iconName: 'sun',
      iconColor: '#f59e0b',
      members: 1247,
      posts: 342,
      category: 'Local Community',
      isJoined: false,
    },
    {
      id: '2',
      name: 'Wellness & Mindfulness',
      description: 'A space for holistic well-being, yoga, meditation.',
      iconName: 'heart',
      iconColor: '#ec4899',
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
            <Feather name="search" size={20} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="sliders" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'people', label: 'People', iconName: 'users' },
          { id: 'communities', label: 'Communities', iconName: 'globe' },
          { id: 'events', label: 'Events', iconName: 'calendar' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id as typeof activeTab)}
          >
            <Feather 
              name={tab.iconName as any} 
              size={16} 
              color={activeTab === tab.id ? '#ffffff' : '#9ca3af'} 
            />
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
      </View>

      {/* Floating Action Button */}
      <FloatingActionButton
        onPress={() => setShowActionSheet(true)}
        icon="filter"
        color="#8b5cf6"
      />

      {/* Action Sheet */}
      <SlideUpActionSheet
        visible={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        title="Filter Options"
        actions={[
          {
            title: 'Age Range',
            icon: 'calendar',
            onPress: () => console.log('Age filter'),
          },
          {
            title: 'Distance',
            icon: 'map-pin',
            onPress: () => console.log('Distance filter'),
          },
          {
            title: 'Interests',
            icon: 'heart',
            onPress: () => console.log('Interests filter'),
          },
          {
            title: 'Lifestyle Score',
            icon: 'trending-up',
            onPress: () => console.log('Score filter'),
          },
        ]}
      />
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
  tabText: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ffffff',
  },
  swipeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    gap: 32,
  },
  passButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 2,
    borderColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  superLikeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 2,
    borderColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 2,
    borderColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
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
