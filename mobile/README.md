# ELOURA Mobile App

> Native iOS and Android app built with React Native (Expo)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- iOS: Xcode 15+ and iOS Simulator
- Android: Android Studio and Android Emulator
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
cd mobile
npm install
```

### Run Development

```bash
# iOS
npm run ios

# Android
npm run android

# Web (for testing)
npm run web

# Start Expo Dev Client
npm start
```

---

## 📱 Features

### **Core Screens**
- ✅ Onboarding (3-slide intro)
- ✅ Authentication (Login/Signup)
- ✅ Dashboard (Home)
- ✅ Discover (People/Communities/Events)
- ✅ Messages (Chat)
- ✅ Profile (User profile)

### **Navigation**
- ✅ Bottom Tab Navigation (4 tabs)
- ✅ Stack Navigation (Auth flow)
- ✅ Modal screens ready

### **Native Features (Coming Soon)**
- [ ] Camera integration
- [ ] Location services
- [ ] Push notifications
- [ ] Haptic feedback
- [ ] Maps integration
- [ ] In-app purchases (iOS + Android)

---

## 🛠️ Tech Stack

- **Framework:** React Native (Expo SDK 54)
- **Language:** TypeScript
- **Navigation:** React Navigation v6
- **State:** React Context + Hooks
- **Storage:** AsyncStorage + SecureStore
- **Camera:** Expo Camera
- **Location:** Expo Location
- **Notifications:** Expo Notifications
- **Haptics:** Expo Haptics
- **Payments:** expo-in-app-purchases

---

## 📦 Project Structure

```
mobile/
├── App.tsx                 # Entry point
├── app.json               # Expo configuration
├── src/
│   ├── navigation/        # Navigation setup
│   ├── screens/          # All screens
│   │   ├── auth/         # Login, Signup
│   │   ├── onboarding/   # Onboarding flow
│   │   └── main/         # Main app screens
│   ├── components/       # Reusable components
│   ├── services/         # API, Auth, etc.
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utilities
│   └── types/            # TypeScript types
└── assets/               # Images, fonts, etc.
```

---

## 🎨 Design System

### **Colors**
- Brand: `#8b5cf6` (Purple)
- Background: `#0a0a0a` (Near Black)
- Surface: `#1a1a1a` (Dark Gray)
- Border: `#2a2a2a` (Gray)
- Text: `#ffffff` (White)
- Text Secondary: `#9ca3af` (Light Gray)

### **Typography**
- Title: 24px, Light (300)
- Heading: 18px, Semibold (600)
- Body: 14px, Regular (400)
- Caption: 12px, Regular (400)

### **Spacing**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

---

## 💰 Subscription Tiers

### **Curious (Free)**
- Basic profile
- Limited swipes
- Join communities
- Browse events

### **Explorer ($29.99/mo)**
- Unlimited swipes
- Advanced filters
- Priority support
- Event RSVPs
- AI chat assistant

### **Connoisseur ($99.99/mo)**
- All Explorer features
- Exclusive events
- Concierge service
- Priority visibility
- Premium verification

---

## 🍎 iOS Deployment

### **Development Build**
```bash
npx expo prebuild --platform ios
npx expo run:ios
```

### **TestFlight**
```bash
eas build --platform ios --profile preview
```

### **Production**
```bash
eas build --platform ios --profile production
eas submit --platform ios
```

---

## 🤖 Android Deployment

### **Development Build**
```bash
npx expo prebuild --platform android
npx expo run:android
```

### **Internal Testing**
```bash
eas build --platform android --profile preview
```

### **Production**
```bash
eas build --platform android --profile production
eas submit --platform android
```

---

## 📝 Environment Setup

Create `.env` file:
```env
API_URL=https://your-api.com
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
```

---

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests (Detox)
npm run test:e2e
```

---

## 📱 Running on Device

### **iOS**
1. Open Expo Go app
2. Scan QR code from terminal

### **Android**
1. Open Expo Go app
2. Scan QR code from terminal

### **Development Build**
```bash
npx expo run:ios --device
npx expo run:android --device
```

---

## 🎯 Next Steps

1. ✅ Basic navigation structure
2. ⏳ Implement all screens
3. ⏳ Add native features (camera, location)
4. ⏳ Integrate with backend API
5. ⏳ Add in-app purchases
6. ⏳ Set up push notifications
7. ⏳ Submit to app stores

---

**Built for premium lifestyle exploration** ✨

