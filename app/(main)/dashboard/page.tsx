"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChartBar, 
  TrendUp, 
  TrendDown,
  Eye,
  Heart,
  Chat,
  Calendar,
  Users,
  Crown,
  Shield,
  Sparkle,
  ArrowUp,
  ArrowDown,
  Target,
  Trophy,
  Star,
  Clock,
  MapPin,
  Lightning,
  Lightning as Zap
} from "@phosphor-icons/react";
import { useHaptics } from "@/lib/haptics/advanced-feedback";

// Premium analytics data structures
interface AnalyticsData {
  overview: {
    profileViews: { current: number; change: number; trend: 'up' | 'down' };
    matches: { current: number; change: number; trend: 'up' | 'down' };
    messages: { current: number; change: number; trend: 'up' | 'down' };
    events: { current: number; change: number; trend: 'up' | 'down' };
    trustScore: { current: number; change: number; trend: 'up' | 'down' };
  };
  activity: {
    daily: Array<{ date: string; views: number; matches: number; messages: number }>;
    weekly: Array<{ week: string; activity: number; engagement: number }>;
    monthly: Array<{ month: string; growth: number; retention: number }>;
  };
  insights: {
    peakHours: Array<{ hour: number; activity: number }>;
    topLocations: Array<{ location: string; visits: number }>;
    popularFeatures: Array<{ feature: string; usage: number }>;
    compatibilityTrends: Array<{ date: string; score: number }>;
  };
  recommendations: Array<{
    type: 'profile' | 'activity' | 'verification' | 'premium';
    priority: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    impact: number;
    action: string;
  }>;
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress: number;
    reward: string;
  }>;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'insights' | 'achievements'>('overview');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const { trigger } = useHaptics();

  // Mock premium analytics data
  const analyticsData: AnalyticsData = {
    overview: {
      profileViews: { current: 1247, change: 23.5, trend: 'up' },
      matches: { current: 89, change: 12.3, trend: 'up' },
      messages: { current: 234, change: -5.2, trend: 'down' },
      events: { current: 12, change: 45.8, trend: 'up' },
      trustScore: { current: 94, change: 2.1, trend: 'up' }
    },
    activity: {
      daily: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 20,
        matches: Math.floor(Math.random() * 10) + 1,
        messages: Math.floor(Math.random() * 20) + 5
      })),
      weekly: Array.from({ length: 12 }, (_, i) => ({
        week: `Week ${i + 1}`,
        activity: Math.floor(Math.random() * 100) + 50,
        engagement: Math.floor(Math.random() * 30) + 60
      })),
      monthly: Array.from({ length: 6 }, (_, i) => ({
        month: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
        growth: Math.floor(Math.random() * 50) + 10,
        retention: Math.floor(Math.random() * 40) + 60
      }))
    },
    insights: {
      peakHours: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        activity: Math.floor(Math.random() * 100) + (i >= 8 && i <= 22 ? 20 : 0)
      })),
      topLocations: [
        { location: 'Miami Beach', visits: 45 },
        { location: 'Downtown Miami', visits: 32 },
        { location: 'Brickell', visits: 28 },
        { location: 'Coconut Grove', visits: 19 },
        { location: 'South Beach', visits: 15 }
      ],
      popularFeatures: [
        { feature: 'Advanced Filters', usage: 87 },
        { feature: 'Video Calls', usage: 72 },
        { feature: 'Event Discovery', usage: 65 },
        { feature: 'Ghost Mode', usage: 58 },
        { feature: 'Read Receipts', usage: 43 }
      ],
      compatibilityTrends: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        score: 85 + Math.random() * 15
      }))
    },
    recommendations: [
      {
        type: 'profile',
        priority: 'high',
        title: 'Add More Photos',
        description: 'Profiles with 5+ photos get 40% more matches',
        impact: 40,
        action: 'Upload Photos'
      },
      {
        type: 'verification',
        priority: 'medium',
        title: 'Upgrade to Premium Verification',
        description: 'Premium verification increases trust score by 25%',
        impact: 25,
        action: 'Verify Now'
      },
      {
        type: 'activity',
        priority: 'low',
        title: 'Increase Activity',
        description: 'Active users get 30% more profile views',
        impact: 30,
        action: 'Be More Active'
      }
    ],
    achievements: [
      {
        id: 'first_match',
        name: 'First Match',
        description: 'Get your first match',
        icon: '🎯',
        unlocked: true,
        progress: 100,
        reward: 'Profile boost for 24 hours'
      },
      {
        id: 'social_butterfly',
        name: 'Social Butterfly',
        description: 'Send 100 messages',
        icon: '💬',
        unlocked: true,
        progress: 100,
        reward: 'Unlimited messaging for a week'
      },
      {
        id: 'event_enthusiast',
        name: 'Event Enthusiast',
        description: 'Attend 10 events',
        icon: '🎉',
        unlocked: false,
        progress: 70,
        reward: 'Priority event RSVP'
      },
      {
        id: 'verified_legend',
        name: 'Verified Legend',
        description: 'Complete premium verification',
        icon: '👑',
        unlocked: false,
        progress: 60,
        reward: 'Gold verification badge'
      }
    ]
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    trigger('BUTTON_PRESS');
  };

  const StatCard = ({ title, value, change, trend, icon: Icon }: {
    title: string;
    value: number;
    change: number;
    trend: 'up' | 'down';
    icon: any;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-center justify-center">
          <Icon weight="bold" size={24} className="text-brand-400" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
          trend === 'up' 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {trend === 'up' ? <ArrowUp weight="bold" size={12} /> : <ArrowDown weight="bold" size={12} />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-light text-white mb-1">{value.toLocaleString()}</h3>
        <p className="text-neutral-400 text-sm">{title}</p>
      </div>
    </motion.div>
  );

  const RecommendationCard = ({ recommendation }: { recommendation: AnalyticsData['recommendations'][0] }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            recommendation.type === 'profile' ? 'bg-blue-500/10 border border-blue-500/20' :
            recommendation.type === 'verification' ? 'bg-amber-500/10 border border-amber-500/20' :
            recommendation.type === 'activity' ? 'bg-green-500/10 border border-green-500/20' :
            'bg-purple-500/10 border border-purple-500/20'
          }`}>
            {recommendation.type === 'profile' && <ChartBar weight="bold" size={20} className="text-blue-400" />}
            {recommendation.type === 'verification' && <Shield weight="bold" size={20} className="text-amber-400" />}
            {recommendation.type === 'activity' && <Target weight="bold" size={20} className="text-green-400" />}
            {recommendation.type === 'premium' && <Crown weight="bold" size={20} className="text-purple-400" />}
          </div>
          <div>
            <h4 className="text-white font-medium">{recommendation.title}</h4>
            <p className="text-neutral-400 text-sm">{recommendation.description}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          recommendation.priority === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
          recommendation.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
          'bg-green-500/10 text-green-400 border border-green-500/20'
        }`}>
          {recommendation.priority}
                </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
                <TrendUp weight="bold" size={16} className="text-green-400" />
          <span className="text-green-400 text-sm font-medium">+{recommendation.impact}% impact</span>
        </div>
        <button className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-medium transition-colors">
          {recommendation.action}
        </button>
      </div>
    </motion.div>
  );

  const AchievementCard = ({ achievement }: { achievement: AnalyticsData['achievements'][0] }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`border rounded-2xl p-6 ${
        achievement.unlocked 
          ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20' 
          : 'bg-neutral-900/50 border-neutral-800'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
          {achievement.icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${achievement.unlocked ? 'text-amber-300' : 'text-white'}`}>
            {achievement.name}
          </h4>
          <p className="text-neutral-400 text-sm">{achievement.description}</p>
        </div>
        {achievement.unlocked && (
          <Trophy weight="fill" size={24} className="text-amber-400" />
        )}
      </div>
      
      {!achievement.unlocked && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-neutral-400">Progress</span>
            <span className="text-white">{achievement.progress}%</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-brand-500 to-brand-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
        </div>
      )}
      
      <div className={`text-sm ${achievement.unlocked ? 'text-amber-300' : 'text-neutral-400'}`}>
        Reward: {achievement.reward}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-light text-white">Analytics Dashboard</h1>
            <div className="flex items-center gap-2">
              <Crown weight="fill" size={20} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">VIP</span>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex gap-2">
            {(['7d', '30d', '90d', '1y'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 rounded-full text-sm font-light transition-all ${
                  timeframe === period
                    ? 'bg-brand-500 text-white'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-20 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: ChartBar },
              { id: 'analytics', label: 'Analytics', icon: TrendUp },
              { id: 'insights', label: 'Insights', icon: Target },
              { id: 'achievements', label: 'Achievements', icon: Trophy }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-500 text-white'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                <tab.icon weight="bold" size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Profile Views"
                  value={analyticsData.overview.profileViews.current}
                  change={analyticsData.overview.profileViews.change}
                  trend={analyticsData.overview.profileViews.trend}
                  icon={Eye}
                />
                <StatCard
                  title="Matches"
                  value={analyticsData.overview.matches.current}
                  change={analyticsData.overview.matches.change}
                  trend={analyticsData.overview.matches.trend}
                  icon={Heart}
                />
                <StatCard
                  title="Messages"
                  value={analyticsData.overview.messages.current}
                  change={analyticsData.overview.messages.change}
                  trend={analyticsData.overview.messages.trend}
                  icon={Chat}
                />
                <StatCard
                  title="Events"
                  value={analyticsData.overview.events.current}
                  change={analyticsData.overview.events.change}
                  trend={analyticsData.overview.events.trend}
                  icon={Calendar}
                />
              </div>

              {/* Trust Score */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-brand-500/10 to-purple-500/10 border border-brand-500/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Shield weight="fill" size={24} className="text-brand-400" />
                <div>
                      <h3 className="text-white font-medium">Trust Score</h3>
                      <p className="text-neutral-400 text-sm">Your reputation in the community</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-light text-brand-400 mb-1">
                      {analyticsData.overview.trustScore.current}
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <ArrowUp weight="bold" size={12} />
                      +{analyticsData.overview.trustScore.change}
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-neutral-800 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-brand-500 to-brand-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${analyticsData.overview.trustScore.current}%` }}
                  />
                </div>
                
                <div className="text-sm text-neutral-400">
                  {analyticsData.overview.trustScore.current >= 90 ? 'Excellent reputation!' :
                   analyticsData.overview.trustScore.current >= 80 ? 'Great reputation' :
                   analyticsData.overview.trustScore.current >= 70 ? 'Good reputation' :
                   'Building reputation'}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-white font-medium">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white hover:bg-neutral-900 transition-colors">
                    <Zap weight="bold" size={20} className="mb-2" />
                    <div className="text-sm font-medium">Boost Profile</div>
                  </button>
                  <button className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white hover:bg-neutral-900 transition-colors">
                    <Users weight="bold" size={20} className="mb-2" />
                    <div className="text-sm font-medium">Find Events</div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Activity Chart Placeholder */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-4">Activity Trends</h3>
                <div className="h-48 bg-neutral-800/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <ChartBar weight="thin" size={48} className="text-neutral-600 mx-auto mb-2" />
                    <p className="text-neutral-500 text-sm">Interactive chart coming soon</p>
                  </div>
                </div>
              </div>

              {/* Peak Hours */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-4">Peak Activity Hours</h3>
                <div className="space-y-3">
                  {analyticsData.insights.peakHours.slice(8, 22).map((hour, index) => (
                    <div key={hour.hour} className="flex items-center gap-3">
                      <div className="w-12 text-neutral-400 text-sm">
                        {hour.hour.toString().padStart(2, '0')}:00
                      </div>
                      <div className="flex-1 bg-neutral-800 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-brand-500 to-brand-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${hour.activity}%` }}
                        />
                      </div>
                      <div className="w-8 text-neutral-400 text-sm text-right">
                        {hour.activity}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Recommendations */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">AI Recommendations</h3>
                {analyticsData.recommendations.map((recommendation, index) => (
                  <RecommendationCard key={index} recommendation={recommendation} />
          ))}
        </div>

              {/* Top Locations */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-4">Top Locations</h3>
                <div className="space-y-3">
                  {analyticsData.insights.topLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin weight="bold" size={16} className="text-neutral-400" />
                        <span className="text-white">{location.location}</span>
                      </div>
                      <span className="text-neutral-400 text-sm">{location.visits} visits</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Features */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-4">Popular Features</h3>
                <div className="space-y-3">
                  {analyticsData.insights.popularFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white">{feature.feature}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-neutral-800 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                            style={{ width: `${feature.usage}%` }}
                          />
                        </div>
                        <span className="text-neutral-400 text-sm w-8">{feature.usage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <Trophy weight="fill" size={48} className="text-amber-400 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Your Achievements</h3>
                <p className="text-neutral-400 text-sm">
                  Unlock rewards and boost your profile with achievements
                </p>
              </div>

              <div className="space-y-4">
                {analyticsData.achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}