import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'about' | 'photos' | 'achievements'>('about');

  const profile = {
    name: 'Alex Morgan',
    age: 28,
    location: 'Miami, FL',
    bio: 'Lifestyle enthusiast exploring Miami\'s vibrant culture. Passionate about wellness, art, and meaningful connections.',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    ],
    tier: 'explorer',
    verified: true,
    lifestyleScore: 87,
    stats: {
      connections: 156,
      events: 47,
      communities: 8,
      posts: 23,
    },
    interests: ['Wellness', 'Travel', 'Arts', 'Food'],
    achievements: [
      { id: '1', name: 'Early Adopter', icon: '🌟', unlocked: true },
      { id: '2', name: 'Community Leader', icon: '👑', unlocked: true },
      { id: '3', name: 'Lifestyle Explorer', icon: '🗺️', unlocked: true },
      { id: '4', name: 'Verified Elite', icon: '✅', unlocked: false, progress: 60 },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Text>📤</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Image
            source={{ uri: profile.photos[0] }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          
          {profile.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ Verified</Text>
            </View>
          )}

          <View style={styles.heroInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.age}>{profile.age}</Text>
            </View>
            <Text style={styles.location}>📍 {profile.location}</Text>
            <Badge label={`✨ ${profile.tier.charAt(0).toUpperCase() + profile.tier.slice(1)}`} variant="premium" />
          </View>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          {Object.entries(profile.stats).map(([key, value]) => (
            <View key={key} style={styles.stat}>
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            </View>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {[
            { id: 'about', label: 'About' },
            { id: 'photos', label: 'Photos' },
            { id: 'achievements', label: 'Achievements' },
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

        {/* Content */}
        <View style={styles.content}>
          {activeTab === 'about' && (
            <View style={styles.aboutContent}>
              <Card style={styles.section}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <Text style={styles.bio}>{profile.bio}</Text>
              </Card>

              <Card style={styles.section}>
                <Text style={styles.sectionTitle}>My Interests</Text>
                <View style={styles.interests}>
                  {profile.interests.map((interest, i) => (
                    <Badge key={i} label={interest} variant="primary" />
                  ))}
                </View>
              </Card>

              <Card style={styles.section}>
                <View style={styles.scoreContainer}>
                  <View style={styles.scoreHeader}>
                    <Text style={styles.scoreIcon}>⭐</Text>
                    <View>
                      <Text style={styles.scoreTitle}>Lifestyle Score</Text>
                      <Text style={styles.scoreSubtitle}>Your exploration journey</Text>
                    </View>
                  </View>
                  <Text style={styles.scoreValue}>{profile.lifestyleScore}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${profile.lifestyleScore}%` }]} />
                </View>
              </Card>
            </View>
          )}

          {activeTab === 'photos' && (
            <View style={styles.photosGrid}>
              {profile.photos.map((photo, i) => (
                <TouchableOpacity key={i} style={styles.photoItem}>
                  <Image source={{ uri: photo }} style={styles.photo} />
                  {i === 0 && (
                    <View style={styles.primaryBadge}>
                      <Text style={styles.primaryText}>Primary</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.addPhoto}>
                <Text style={styles.addPhotoIcon}>+</Text>
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'achievements' && (
            <View style={styles.achievementsContent}>
              <View style={styles.achievementsHeader}>
                <Text style={styles.achievementsIcon}>🏆</Text>
                <Text style={styles.achievementsTitle}>Your Achievements</Text>
                <Text style={styles.achievementsCount}>
                  {profile.achievements.filter(a => a.unlocked).length}/{profile.achievements.length} unlocked
                </Text>
              </View>

              {profile.achievements.map((achievement) => (
                <Card key={achievement.id} style={[
                  styles.achievementCard,
                  achievement.unlocked && styles.achievementUnlocked
                ]}>
                  <View style={styles.achievementContent}>
                    <Text style={[styles.achievementIcon, !achievement.unlocked && styles.achievementLocked]}>
                      {achievement.icon}
                    </Text>
                    <View style={styles.achievementInfo}>
                      <Text style={[
                        styles.achievementName,
                        !achievement.unlocked && styles.achievementNameLocked
                      ]}>
                        {achievement.name}
                      </Text>
                      {achievement.unlocked ? (
                        <Text style={styles.unlocked}>✅ Unlocked</Text>
                      ) : (
                        <>
                          <View style={styles.achievementProgress}>
                            <View style={[styles.achievementProgressFill, { width: `${achievement.progress}%` }]} />
                          </View>
                          <Text style={styles.progressText}>{achievement.progress}% Complete</Text>
                        </>
                      )}
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Edit Button */}
      <View style={styles.editButtonContainer}>
        <Button
          title="Edit Profile"
          onPress={() => console.log('Edit profile')}
          variant="primary"
        />
      </View>
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
  headerTitle: {
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
  hero: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  heroInfo: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: '300',
    color: '#ffffff',
  },
  age: {
    fontSize: 24,
    fontWeight: '300',
    color: '#ffffff',
    opacity: 0.8,
  },
  location: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '300',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#9ca3af',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginVertical: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
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
  content: {
    paddingHorizontal: 24,
  },
  aboutContent: {
    gap: 16,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 22,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreIcon: {
    fontSize: 32,
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  scoreSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '300',
    color: '#8b5cf6',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoItem: {
    width: (width - 72) / 2,
    aspectRatio: 3/4,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  primaryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  addPhoto: {
    width: (width - 72) / 2,
    aspectRatio: 3/4,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#2a2a2a',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoIcon: {
    fontSize: 32,
    color: '#6b7280',
    marginBottom: 8,
  },
  addPhotoText: {
    fontSize: 12,
    color: '#6b7280',
  },
  achievementsContent: {
    gap: 16,
  },
  achievementsHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementsIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  achievementsCount: {
    fontSize: 14,
    color: '#9ca3af',
  },
  achievementCard: {
    padding: 16,
  },
  achievementUnlocked: {
    backgroundColor: '#f59e0b' + '15',
    borderColor: '#f59e0b' + '30',
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  achievementIcon: {
    fontSize: 40,
  },
  achievementLocked: {
    opacity: 0.3,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  achievementNameLocked: {
    color: '#9ca3af',
  },
  unlocked: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: '600',
  },
  achievementProgress: {
    height: 6,
    backgroundColor: '#2a2a2a',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
  },
  progressText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
});
