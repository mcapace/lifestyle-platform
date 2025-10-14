"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft,
  User,
  Bell,
  Lock,
  Eye,
  Shield,
  CreditCard,
  Globe,
  Palette,
  Question,
  SignOut,
  Crown,
  CheckCircle,
  CaretRight,
  Lightning,
  Heart,
  MapPin,
  Users,
  ChatCircle,
  Camera,
  Trash,
  Warning,
  Star,
  Sparkle,
  MoonStars,
  Sun,
  DeviceMobile,
  EnvelopeSimple,
  Phone,
  At
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SettingsSection {
  id: string;
  title: string;
  icon: any;
  items: SettingItem[];
}

interface SettingItem {
  id: string;
  label: string;
  description?: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  badge?: string;
  dangerous?: boolean;
  premium?: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Settings state
  const [settings, setSettings] = useState({
    // Account
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    
    // Privacy
    profileVisibility: 'public',
    showOnlineStatus: true,
    showLocation: true,
    showAge: true,
    readReceipts: true,
    
    // Discovery
    discoverable: true,
    showInSearch: true,
    distancePreference: 50,
    ageRange: { min: 21, max: 45 },
    
    // Safety
    blockList: [],
    hideFromBlockedUsers: true,
    photoVerificationRequired: false,
    idVerificationRequired: false,
    
    // Appearance
    darkMode: true,
    language: 'en',
    
    // Subscription
    tier: 'explorer',
    autoRenew: true
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const settingsSections: SettingsSection[] = [
    {
      id: 'account',
      title: 'Account',
      icon: User,
      items: [
        { id: 'edit-profile', label: 'Edit Profile', type: 'navigation' },
        { id: 'change-email', label: 'Email', description: 'alex@example.com', type: 'navigation' },
        { id: 'change-phone', label: 'Phone Number', description: '+1 (555) 123-4567', type: 'navigation' },
        { id: 'change-password', label: 'Change Password', type: 'navigation' },
        { id: 'linked-accounts', label: 'Linked Accounts', type: 'navigation' }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      items: [
        { id: 'email-notifications', label: 'Email Notifications', description: 'Receive updates via email', type: 'toggle', value: settings.emailNotifications },
        { id: 'push-notifications', label: 'Push Notifications', description: 'Get mobile alerts', type: 'toggle', value: settings.pushNotifications },
        { id: 'sms-notifications', label: 'SMS Notifications', description: 'Text message alerts', type: 'toggle', value: settings.smsNotifications, premium: true },
        { id: 'notification-settings', label: 'Manage Preferences', description: 'Customize what you receive', type: 'navigation' }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Safety',
      icon: Shield,
      items: [
        { id: 'profile-visibility', label: 'Profile Visibility', description: 'Public', type: 'navigation' },
        { id: 'show-online', label: 'Show Online Status', type: 'toggle', value: settings.showOnlineStatus },
        { id: 'show-location', label: 'Show Location', type: 'toggle', value: settings.showLocation },
        { id: 'show-age', label: 'Show Age', type: 'toggle', value: settings.showAge },
        { id: 'read-receipts', label: 'Read Receipts', description: 'Let others see when you read messages', type: 'toggle', value: settings.readReceipts },
        { id: 'blocked-users', label: 'Blocked Users', description: `${settings.blockList.length} blocked`, type: 'navigation' },
        { id: 'data-download', label: 'Download My Data', type: 'navigation' }
      ]
    },
    {
      id: 'discovery',
      title: 'Discovery Preferences',
      icon: Sparkle,
      items: [
        { id: 'discoverable', label: 'Make Me Discoverable', description: 'Appear in search and recommendations', type: 'toggle', value: settings.discoverable },
        { id: 'distance', label: 'Distance Preference', description: `${settings.distancePreference} miles`, type: 'navigation' },
        { id: 'age-range', label: 'Age Range', description: `${settings.ageRange.min}-${settings.ageRange.max}`, type: 'navigation' },
        { id: 'interests', label: 'Manage Interests', type: 'navigation' }
      ]
    },
    {
      id: 'verification',
      title: 'Verification',
      icon: CheckCircle,
      items: [
        { id: 'photo-verification', label: 'Photo Verification', description: 'Verify your photos', type: 'navigation', badge: 'Verified' },
        { id: 'id-verification', label: 'ID Verification', description: 'Verify your identity', type: 'navigation', badge: 'Premium', premium: true },
        { id: 'verification-settings', label: 'Verification Settings', type: 'navigation' }
      ]
    },
    {
      id: 'subscription',
      title: 'Subscription & Billing',
      icon: Crown,
      items: [
        { id: 'current-plan', label: 'Current Plan', description: 'Explorer - $29.99/mo', type: 'navigation', badge: 'Active' },
        { id: 'upgrade', label: 'Upgrade to Connoisseur', description: 'Get exclusive features', type: 'navigation', premium: true },
        { id: 'payment-method', label: 'Payment Method', description: 'Visa •••• 4242', type: 'navigation' },
        { id: 'billing-history', label: 'Billing History', type: 'navigation' },
        { id: 'auto-renew', label: 'Auto-Renew', description: 'Automatically renew subscription', type: 'toggle', value: settings.autoRenew }
      ]
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      items: [
        { id: 'dark-mode', label: 'Dark Mode', type: 'toggle', value: settings.darkMode },
        { id: 'language', label: 'Language', description: 'English', type: 'navigation' },
        { id: 'text-size', label: 'Text Size', description: 'Medium', type: 'navigation' }
      ]
    },
    {
      id: 'support',
      title: 'Support & Legal',
      icon: Question,
      items: [
        { id: 'help-center', label: 'Help Center', type: 'navigation' },
        { id: 'contact-support', label: 'Contact Support', type: 'navigation' },
        { id: 'community-guidelines', label: 'Community Guidelines', type: 'navigation' },
        { id: 'privacy-policy', label: 'Privacy Policy', type: 'navigation' },
        { id: 'terms-of-service', label: 'Terms of Service', type: 'navigation' }
      ]
    },
    {
      id: 'account-management',
      title: 'Account Management',
      icon: Warning,
      items: [
        { id: 'logout', label: 'Log Out', type: 'action' },
        { id: 'deactivate', label: 'Deactivate Account', description: 'Temporarily hide your profile', type: 'action', dangerous: true },
        { id: 'delete', label: 'Delete Account', description: 'Permanently delete your account', type: 'action', dangerous: true }
      ]
    }
  ];

  const SettingItemComponent = ({ item, sectionId }: { item: SettingItem; sectionId: string }) => {
    const handleClick = () => {
      if (item.type === 'toggle') {
        toggleSetting(item.id);
      } else if (item.type === 'navigation') {
        // Navigate to detail page
        console.log('Navigate to:', item.id);
      } else if (item.type === 'action') {
        if (item.id === 'logout') {
          // Handle logout
          console.log('Logout');
        } else if (item.dangerous) {
          // Show confirmation
          console.log('Dangerous action:', item.id);
        }
      }
    };

    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`w-full flex items-center justify-between p-4 border-b border-neutral-800 text-left transition-colors ${
          item.dangerous ? 'hover:bg-red-500/5' : 'hover:bg-neutral-900/50'
        }`}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-medium ${item.dangerous ? 'text-red-400' : 'text-white'}`}>
              {item.label}
            </span>
            {item.badge && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                item.premium 
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-green-500/10 text-green-400 border border-green-500/20'
              }`}>
                {item.badge}
              </span>
            )}
            {item.premium && !item.badge && (
              <Crown weight="fill" size={14} className="text-amber-400" />
            )}
          </div>
          {item.description && (
            <p className="text-neutral-400 text-sm">{item.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {item.type === 'toggle' && (
            <div className={`relative w-11 h-6 rounded-full transition-colors ${
              item.value ? 'bg-brand-500' : 'bg-neutral-700'
            }`}>
              <motion.div
                animate={{ x: item.value ? 20 : 2 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full"
              />
            </div>
          )}
          {item.type === 'navigation' && (
            <CaretRight weight="bold" size={16} className="text-neutral-500" />
          )}
        </div>
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <ArrowLeft weight="bold" size={20} className="text-white" />
            </Link>
            <h1 className="text-xl font-light text-white">Settings</h1>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="max-w-md mx-auto px-6 py-6 border-b border-neutral-800">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-500 border-2 border-neutral-950 rounded-full flex items-center justify-center">
              <Camera weight="bold" size={12} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-white font-medium text-lg">Alex Morgan</h2>
              <Crown weight="fill" size={16} className="text-amber-400" />
              <CheckCircle weight="fill" size={16} className="text-blue-400" />
            </div>
            <p className="text-neutral-400 text-sm">Explorer Member</p>
          </div>
          <Link
            href="/profile"
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="max-w-md mx-auto">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="border-b border-neutral-800">
              <div className="px-6 py-4 bg-neutral-900/30">
                <div className="flex items-center gap-2">
                  <Icon weight="bold" size={20} className="text-brand-400" />
                  <h3 className="text-white font-medium">{section.title}</h3>
                </div>
              </div>
              <div>
                {section.items.map((item) => (
                  <SettingItemComponent
                    key={item.id}
                    item={item}
                    sectionId={section.id}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* App Info */}
      <div className="max-w-md mx-auto px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkle weight="fill" size={16} className="text-brand-400" />
          <span className="text-neutral-400 text-sm">ELOURA</span>
        </div>
        <p className="text-neutral-500 text-xs mb-1">Version 1.0.0</p>
        <p className="text-neutral-600 text-xs">© 2024 ELOURA. All rights reserved.</p>
      </div>
    </div>
  );
}
