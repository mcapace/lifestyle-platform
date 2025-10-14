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
import EventCard from '../../components/cards/EventCard';

export default function EventsScreen() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'attending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const events = [
    {
      id: '1',
      title: 'Sunset Wellness Circle',
      description: 'Join us for meditation, yoga, and mindfulness as we watch the sunset.',
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
    {
      id: '2',
      title: 'Art Gallery Opening',
      description: 'Experience contemporary art from emerging artists.',
      date: 'Oct 26',
      time: '7:00 PM - 10:00 PM',
      location: 'Wynwood Arts District',
      attendees: 89,
      price: 25,
      image: 'https://images.unsplash.com/photo-1579783902671-97597589b74e?w=800',
      category: 'culture',
      isPremium: false,
      host: {
        name: 'Marcus J.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      },
    },
    {
      id: '3',
      title: 'Exclusive Rooftop Mixer',
      description: 'Network and connect with premium cocktails and city views.',
      date: 'Oct 26',
      time: '9:00 PM - 1:00 AM',
      location: 'Brickell, Miami',
      attendees: 67,
      price: 50,
      image: 'https://images.unsplash.com/photo-1533174072545-7bd469c76857?w=800',
      category: 'nightlife',
      isPremium: true,
      host: {
        name: 'Elena R.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>+ Create</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#6b7280" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          placeholderTextColor="#6b7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {[
          { id: 'all', label: 'All' },
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'attending', label: 'Attending' },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[styles.filter, activeFilter === filter.id && styles.activeFilter]}
            onPress={() => setActiveFilter(filter.id as typeof activeFilter)}
          >
            <Text style={[styles.filterText, activeFilter === filter.id && styles.activeFilterText]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Events List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.eventsList}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => {
                // Navigate to event detail
                console.log('View event:', event.id);
              }}
            />
          ))}
        </View>
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
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 16,
  },
  filter: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  activeFilter: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  filterText: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  eventsList: {
    paddingHorizontal: 24,
  },
});

