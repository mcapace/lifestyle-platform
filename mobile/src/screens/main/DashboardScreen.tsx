import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState<'discover' | 'community' | 'events'>('discover');

  const stats = {
    connections: 156,
    events: 47,
    communities: 8,
    posts: 23,
    lifestyleScore: 87,
  };

  const trendingCommunities = [
    { id: '1', name: 'Miami Lifestyle Explorers', icon: '🌴', members: 1247 },
    { id: '2', name: 'Wellness & Mindfulness', icon: '🧘‍♀️', members: 892 },
    { id: '3', name: 'Creative Arts', icon: '🎨', members: 654 },
  ];

  const achievements = [
    { id: '1', name: 'Lifestyle Explorer', icon: '🗺️', unlocked: true },
    { id: '2', name: 'Social Connector', icon: '🤝', unlocked: true },
    { id: '3', name: 'Community Leader', icon: '👑', unlocked: false, progress: 30 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>ELOURA</Text>
            <Text style={styles.subtitle}>Lifestyle Hub</Text>
          </View>
          <Badge label="Explorer" variant="premium" />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {[
            { id: 'discover', label: 'Discover', icon: '🔍' },
            { id: 'community', label: 'Community', icon: '🌐' },
            { id: 'events', label: 'Events', icon: '🎉' },
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

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{stats.connections}</Text>
            <Text style={styles.statLabel}>Connections</Text>
            <View style={styles.statChange}>
              <Text style={styles.statChangeText}>↑ 12.3%</Text>
            </View>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{stats.events}</Text>
            <Text style={styles.statLabel}>Events</Text>
            <View style={styles.statChange}>
              <Text style={styles.statChangeText}>↑ 23.5%</Text>
            </View>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{stats.communities}</Text>
            <Text style={styles.statLabel}>Communities</Text>
            <View style={styles.statChange}>
              <Text style={styles.statChangeText}>↑ 2.1%</Text>
            </View>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{stats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
            <View style={styles.statChange}>
              <Text style={styles.statChangeText}>↑ 8.2%</Text>
            </View>
          </Card>
        </View>

        {/* Lifestyle Score */}
        <Card style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <View style={styles.scoreInfo}>
              <Text style={styles.scoreIcon}>⭐</Text>
              <View>
                <Text style={styles.scoreTitle}>Lifestyle Score</Text>
                <Text style={styles.scoreSubtitle}>Your exploration journey</Text>
              </View>
            </View>
            <View style={styles.scoreValueContainer}>
              <Text style={styles.scoreValue}>{stats.lifestyleScore}</Text>
              <Text style={styles.scoreChange}>+5.4%</Text>
            </View>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${stats.lifestyleScore}%` }]} />
          </View>
          
          <Text style={styles.scoreLevel}>Advanced Explorer</Text>
        </Card>

        {/* Trending Communities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Trending Communities</Text>
          {trendingCommunities.map((community) => (
            <TouchableOpacity key={community.id} style={styles.communityItem}>
              <Text style={styles.communityIcon}>{community.icon}</Text>
              <View style={styles.communityInfo}>
                <Text style={styles.communityName}>{community.name}</Text>
                <Text style={styles.communityMembers}>
                  {community.members.toLocaleString()} members
                </Text>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Your Achievements</Text>
          {achievements.map((achievement) => (
            <Card key={achievement.id} style={styles.achievementCard}>
              <View style={styles.achievementContent}>
                <Text style={[styles.achievementIcon, !achievement.unlocked && styles.locked]}>
                  {achievement.icon}
                </Text>
                <View style={styles.achievementInfo}>
                  <Text style={[styles.achievementName, !achievement.unlocked && styles.achievementNameLocked]}>
                    {achievement.name}
                  </Text>
                  {achievement.unlocked && (
                    <Text style={styles.unlocked}>✅ Unlocked</Text>
                  )}
                  {!achievement.unlocked && achievement.progress !== undefined && (
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

        {/* Bottom Padding */}
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
    fontWeight: '600',
    color: '#8b5cf6',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 20,
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
  statsGrid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 60) / 2,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '300',
    color: '#8b5cf6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  statChange: {
    backgroundColor: '#10b981' + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statChangeText: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '600',
  },
  scoreCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#8b5cf6' + '10',
    borderColor: '#8b5cf6' + '20',
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreInfo: {
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
    marginTop: 2,
  },
  scoreValueContainer: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '300',
    color: '#8b5cf6',
  },
  scoreChange: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 4,
  },
  scoreLevel: {
    fontSize: 13,
    color: '#d1d5db',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  communityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  communityIcon: {
    fontSize: 32,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  communityMembers: {
    fontSize: 12,
    color: '#9ca3af',
  },
  joinButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  achievementCard: {
    marginBottom: 12,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  achievementIcon: {
    fontSize: 36,
  },
  locked: {
    opacity: 0.3,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  achievementNameLocked: {
    color: '#9ca3af',
  },
  unlocked: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  achievementProgress: {
    height: 6,
    backgroundColor: '#2a2a2a',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
  },
  progressText: {
    fontSize: 11,
    color: '#9ca3af',
  },
});
