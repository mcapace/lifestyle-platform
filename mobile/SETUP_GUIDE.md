# ELOURA Mobile App - Complete Setup Guide

## 🚀 Quick Start

```bash
cd mobile
npm install
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web (testing only)

---

## 📱 Running on Physical Device

### **iOS (Real iPhone)**
1. Install **Expo Go** from App Store
2. Run `npm start`
3. Scan QR code with Camera app
4. Opens in Expo Go

### **Android (Real Android Phone)**
1. Install **Expo Go** from Play Store
2. Run `npm start`
3. Scan QR code with Expo Go app

---

## 🛠️ Development Build (For Production Features)

Some features (like In-App Purchases, Push Notifications) require a development build:

### **iOS Development Build**
```bash
npx expo prebuild --platform ios
npx expo run:ios
```

### **Android Development Build**
```bash
npx expo prebuild --platform android
npx expo run:android
```

---

## 💳 Subscription Setup

### **1. App Store Connect (iOS)**

**Create In-App Purchases:**
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Select your app
3. Go to "Features" → "In-App Purchases"
4. Create subscriptions:

**Explorer Monthly:**
- Product ID: `com.eloura.app.explorer.monthly`
- Type: Auto-Renewable Subscription
- Price: $29.99/month
- Subscription Group: ELOURA Membership

**Connoisseur Monthly:**
- Product ID: `com.eloura.app.connoisseur.monthly`
- Type: Auto-Renewable Subscription
- Price: $99.99/month
- Subscription Group: ELOURA Membership

**Get Shared Secret:**
1. App Store Connect → My Apps → Your App
2. Features → In-App Purchases
3. Manage → App-Specific Shared Secret
4. Copy and add to `.env`:
```env
APPLE_SHARED_SECRET=your_shared_secret_here
```

---

### **2. Google Play Console (Android)**

**Create Subscriptions:**
1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app
3. Monetize → Products → Subscriptions
4. Create products:

**Explorer Monthly:**
- Product ID: `com.eloura.app.explorer.monthly`
- Price: $29.99/month
- Billing period: Monthly
- Free trial: Optional

**Connoisseur Monthly:**
- Product ID: `com.eloura.app.connoisseur.monthly`
- Price: $99.99/month
- Billing period: Monthly

**Get Service Account:**
1. Google Play Console → Setup → API Access
2. Create service account
3. Download JSON key
4. Add to backend for receipt validation

---

## 🔔 Push Notifications Setup

### **Get Expo Project ID**
```bash
npx expo login
eas init
```

Copy the project ID and add to `app.json`:
```json
{
  "extra": {
    "eas": {
      "projectId": "your-project-id-here"
    }
  }
}
```

### **Test Push Notifications**
```bash
npx expo push:test
```

---

## 📸 Camera & Media Setup

**Already configured!** ✅

Permissions are set in `app.json`:
- iOS: `NSCameraUsageDescription`, `NSPhotoLibraryUsageDescription`
- Android: `CAMERA`, `READ_EXTERNAL_STORAGE`

**Usage in code:**
```typescript
import CameraService from './src/services/camera';

// Take photo
const uri = await CameraService.takePhoto();

// Pick from gallery
const uris = await CameraService.pickImage(true);
```

---

## 📍 Location Setup

**Already configured!** ✅

Permissions set in `app.json`.

**Usage:**
```typescript
import * as Location from 'expo-location';

// Get current location
const location = await Location.getCurrentPositionAsync();
```

---

## 🎮 Haptic Feedback

**Usage:**
```typescript
import HapticService from './src/services/haptics';

// Light tap
HapticService.trigger('light');

// Success
HapticService.trigger('success');

// Selection (for sliders)
HapticService.selection();
```

---

## 🏗️ Build for App Stores

### **iOS (TestFlight)**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure
eas build:configure

# Build for iOS
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

### **Android (Play Console)**
```bash
# Build for Android
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android
```

---

## 📦 Environment Variables

Create `mobile/.env`:
```env
# API
API_URL=https://your-api.com

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key

# Expo
EXPO_PROJECT_ID=your_project_id
```

---

## 🧪 Testing

### **Unit Tests**
```bash
npm test
```

### **E2E Tests (Detox)**
```bash
npm run test:e2e:ios
npm run test:e2e:android
```

---

## 📊 Performance Optimization

### **Image Optimization**
- Use `expo-image` for better performance
- Implement lazy loading
- Cache images locally

### **Bundle Size**
- Use Hermes engine (Android)
- Enable code splitting
- Remove unused dependencies

### **Memory**
- Implement pagination
- Clear image cache
- Use FlatList for long lists

---

## 🎨 UI Libraries (Optional)

Consider adding:
```bash
# React Native Paper (Material Design)
npm install react-native-paper

# NativeBase
npm install native-base

# React Native Elements
npm install @rneui/themed
```

---

## 🔐 Security Best Practices

1. **Store sensitive data in SecureStore**
```typescript
import * as SecureStore from 'expo-secure-store';
await SecureStore.setItemAsync('token', authToken);
```

2. **Validate all IAP receipts on backend**
3. **Use HTTPS for all API calls**
4. **Implement certificate pinning (production)**
5. **Obfuscate code before release**

---

## 📱 Platform-Specific Code

```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
});

// Or use Platform.select
const padding = Platform.select({
  ios: 20,
  android: 16,
  default: 16,
});
```

---

## 🚀 Launch Checklist

### **Pre-Launch**
- [ ] All features implemented
- [ ] Tested on iOS and Android devices
- [ ] Subscriptions working
- [ ] Push notifications tested
- [ ] App icons and splash screens
- [ ] Privacy policy and terms
- [ ] Age rating compliance

### **App Store Assets**
- [ ] App icon (1024x1024)
- [ ] Screenshots (all device sizes)
- [ ] App preview video (optional)
- [ ] Description and keywords
- [ ] App Store listing

### **Submission**
- [ ] Build uploaded to TestFlight/Play Console
- [ ] Beta testing completed
- [ ] All certificates and profiles configured
- [ ] Submitted for review
- [ ] Monitor review status

---

## 📞 Support & Resources

- **Expo Docs:** https://docs.expo.dev
- **React Navigation:** https://reactnavigation.org
- **IAP Guide:** https://docs.expo.dev/versions/latest/sdk/in-app-purchases/
- **Push Notifications:** https://docs.expo.dev/push-notifications/overview/

---

**Ready to launch a world-class mobile app!** 🎉

