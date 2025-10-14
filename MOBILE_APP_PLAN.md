# ELOURA Mobile App - Migration Plan

## 🎯 Goal
Convert ELOURA from a web app to a **native mobile app** using React Native (Expo), while keeping the Next.js landing page as the download portal.

---

## 📱 Architecture

### **Platform Split:**

```
lifestyle-platform/
├── web/                    # Next.js Landing Page (Download Portal)
│   ├── app/page.tsx       # Landing page only
│   ├── app/waitlist/      # Waitlist signup
│   └── components/landing/
│
├── mobile/                 # React Native App (Main Product)
│   ├── App.tsx
│   ├── src/
│   │   ├── screens/       # All main features
│   │   ├── components/    # Reusable components
│   │   ├── navigation/    # React Navigation
│   │   ├── services/      # API, Auth, Subscriptions
│   │   └── utils/
│   └── app.json           # Expo config
│
└── shared/                 # Shared between web & mobile
    ├── types/
    ├── constants/
    └── api/
```

---

## 🚀 Implementation Steps

### **Phase 1: Setup React Native (Week 1)**
- [x] Create Expo project structure
- [ ] Set up TypeScript configuration
- [ ] Install core dependencies
- [ ] Configure navigation (React Navigation)
- [ ] Set up environment variables

### **Phase 2: Core Features Migration (Week 2-3)**
- [ ] Authentication screens (Login, Signup, Onboarding)
- [ ] Bottom tab navigation
- [ ] Dashboard/Home screen
- [ ] Discover screen (People/Communities/Events)
- [ ] Profile screen
- [ ] Settings screen

### **Phase 3: Advanced Features (Week 4-5)**
- [ ] Messaging system
- [ ] Communities (list, detail, posts, comments)
- [ ] Events (list, detail, RSVP)
- [ ] Map explorer (React Native Maps)
- [ ] Media handling (Camera, Image Picker)

### **Phase 4: Native Features (Week 6)**
- [ ] Push notifications (Expo Notifications)
- [ ] Haptic feedback (Expo Haptics)
- [ ] Location services (Expo Location)
- [ ] Camera integration (Expo Camera)
- [ ] Image optimization
- [ ] Offline support (AsyncStorage)

### **Phase 5: Monetization (Week 7)**
- [ ] Apple In-App Purchases (iOS)
- [ ] Google Play Billing (Android)
- [ ] Subscription management
- [ ] Receipt validation
- [ ] Tier-based feature gates

### **Phase 6: Polish & Deploy (Week 8)**
- [ ] App icons and splash screens
- [ ] App store screenshots
- [ ] App store listings
- [ ] TestFlight setup (iOS)
- [ ] Google Play Console setup
- [ ] Submit for review

---

## 📦 Tech Stack

### **Mobile App:**
- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Navigation:** React Navigation v6
- **State:** React Context + Hooks
- **UI:** React Native Paper / NativeBase
- **Animations:** React Native Reanimated
- **Maps:** React Native Maps
- **Payments:** 
  - iOS: expo-in-app-purchases
  - Android: expo-in-app-purchases
- **Push:** Expo Notifications
- **Storage:** AsyncStorage + Expo SecureStore
- **API:** Fetch/Axios to existing backend

### **Landing Page (Keep):**
- **Framework:** Next.js 15
- **Purpose:** Download portal, marketing, SEO
- **Features:** 
  - App store download buttons
  - Waitlist signup
  - Features showcase
  - App screenshots

### **Backend (Existing):**
- **Database:** Supabase/PostgreSQL
- **Auth:** NextAuth.js → Expo Auth Session
- **API:** REST endpoints (keep existing)

---

## 🎨 Design Considerations

### **Native Patterns:**
- iOS: Use native navigation patterns (tab bar, stack navigation)
- Android: Material Design components
- Platform-specific UI adjustments
- Native gestures (swipe, long-press)
- Pull-to-refresh
- Native modals and sheets

### **Component Migration:**
- Web components → React Native components
- `<div>` → `<View>`
- `<button>` → `<TouchableOpacity>` / `<Pressable>`
- `<img>` → `<Image>`
- CSS → StyleSheet API
- Framer Motion → React Native Reanimated

---

## 💰 Subscription Strategy

### **iOS (Apple App Store):**
```typescript
// Subscription Tiers
- Curious: Free (with limitations)
- Explorer: $29.99/month
- Connoisseur: $99.99/month

// Implementation
- Use expo-in-app-purchases
- Apple takes 30% (15% after year 1)
- Required for digital services
```

### **Android (Google Play):**
```typescript
// Same pricing
- Use expo-in-app-purchases
- Google takes 15% (first $1M) or 30%
- Required for in-app features
```

### **Backend Validation:**
```typescript
// Verify receipts server-side
- iOS: Validate with Apple servers
- Android: Validate with Google Play
- Store subscription status in database
- Sync across devices
```

---

## 📱 Key Dependencies

```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "@react-navigation/stack": "^6.3.0",
    "expo-in-app-purchases": "~14.0.0",
    "expo-notifications": "~0.27.0",
    "expo-camera": "~14.0.0",
    "expo-location": "~16.5.0",
    "expo-haptics": "~12.8.0",
    "react-native-maps": "1.10.0",
    "react-native-reanimated": "~3.6.0",
    "@react-native-async-storage/async-storage": "1.21.0",
    "expo-secure-store": "~12.8.0"
  }
}
```

---

## 🗂️ File Structure

```
mobile/
├── App.tsx
├── app.json
├── package.json
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainTabNavigator.tsx
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── SignupScreen.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   ├── main/
│   │   │   ├── DashboardScreen.tsx
│   │   │   ├── DiscoverScreen.tsx
│   │   │   ├── CommunitiesScreen.tsx
│   │   │   ├── EventsScreen.tsx
│   │   │   ├── MessagesScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   └── modals/
│   ├── components/
│   │   ├── cards/
│   │   ├── buttons/
│   │   ├── inputs/
│   │   └── shared/
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── subscriptions.ts
│   │   └── notifications.ts
│   ├── hooks/
│   ├── context/
│   ├── types/
│   ├── constants/
│   └── utils/
└── assets/
    ├── images/
    ├── icons/
    └── fonts/
```

---

## 🎯 Landing Page Updates

The Next.js site becomes a **download portal**:

### **New Landing Page Structure:**
```typescript
// app/page.tsx
- Hero: "Download ELOURA"
- App Store + Google Play buttons
- Feature showcase (screenshots)
- Testimonials
- Waitlist for early access
- FAQ
- Footer

// Remove:
- Dashboard, Discover, Communities (mobile-only)
- All authenticated pages
- Complex web features

// Keep:
- Marketing content
- Waitlist signup
- Blog (future)
- Support pages
```

---

## 📊 Migration Priority

### **Week 1: Foundation**
1. Expo setup
2. Navigation structure
3. Auth screens
4. Basic UI components

### **Week 2: Core Features**
5. Dashboard
6. Discover
7. Profile
8. Settings

### **Week 3: Social**
9. Communities
10. Events
11. Messaging

### **Week 4: Advanced**
12. Map
13. Notifications
14. Camera/Media

### **Week 5: Monetization**
15. Subscriptions
16. Payment flows

### **Week 6: Polish**
17. Animations
18. Performance
19. Testing

### **Week 7-8: Launch**
20. App store setup
21. Beta testing
22. Submission
23. Launch!

---

## 🚦 Next Steps

1. **Create Expo project** in `/mobile` directory
2. **Migrate authentication** screens first
3. **Build navigation** structure
4. **Convert components** one feature at a time
5. **Test on real devices** (iOS + Android)
6. **Implement subscriptions** (IAP)
7. **Submit to stores**

---

## 💡 Benefits of Native App

✅ **Better Performance** - Native rendering  
✅ **Native Features** - Camera, Location, Notifications  
✅ **App Store Presence** - Discoverability  
✅ **Offline Support** - Better UX  
✅ **Push Notifications** - Re-engagement  
✅ **Haptic Feedback** - Premium feel  
✅ **Better Monetization** - In-app purchases  
✅ **Platform Integration** - iOS/Android specific features  

---

**Ready to build a world-class mobile app!** 🚀

