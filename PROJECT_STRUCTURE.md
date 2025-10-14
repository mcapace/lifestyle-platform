# ELOURA - Complete Project Structure

## 📁 Project Organization

```
lifestyle-platform/
│
├── 📱 MOBILE APP (Main Product)
│   └── mobile/
│       ├── App.tsx                    # Entry point
│       ├── app.json                   # Expo configuration
│       ├── package.json               # Dependencies
│       ├── src/
│       │   ├── navigation/
│       │   │   ├── AppNavigator.tsx   # Root navigation
│       │   │   └── MainTabNavigator.tsx # Bottom tabs
│       │   ├── screens/
│       │   │   ├── auth/
│       │   │   │   └── LoginScreen.tsx
│       │   │   ├── onboarding/
│       │   │   │   └── OnboardingScreen.tsx
│       │   │   └── main/
│       │   │       ├── DashboardScreen.tsx
│       │   │       ├── DiscoverScreen.tsx
│       │   │       ├── MessagesScreen.tsx
│       │   │       └── ProfileScreen.tsx
│       │   ├── components/            # Reusable components (TBD)
│       │   ├── services/              # API, Auth, Subscriptions (TBD)
│       │   ├── hooks/                 # Custom hooks (TBD)
│       │   └── types/                 # TypeScript types (TBD)
│       └── assets/
│           ├── icon.png
│           ├── splash.png
│           └── adaptive-icon.png
│
├── 🌐 WEB LANDING PAGE (Download Portal)
│   ├── app/
│   │   ├── page.tsx                   # Landing/Download page ✅
│   │   ├── layout.tsx                 # Root layout
│   │   ├── globals.css                # Global styles
│   │   ├── waitlist/
│   │   │   └── route.ts               # Waitlist API
│   │   └── (main)/                    # OLD: Web app screens (keep for reference)
│   │       ├── dashboard/
│   │       ├── discover/
│   │       ├── communities/
│   │       ├── events/
│   │       ├── messages/
│   │       ├── profile/
│   │       └── settings/
│   ├── components/
│   │   ├── landing/                   # Landing page components
│   │   └── ui/                        # Shared UI components
│   └── public/
│       └── images/
│
├── 🗄️ DATABASE & BACKEND (Shared)
│   ├── prisma/
│   │   └── schema.prisma              # Database schema
│   ├── lib/
│   │   ├── auth/
│   │   │   └── config.ts              # Auth configuration
│   │   ├── db/
│   │   │   └── prisma.ts              # Prisma client
│   │   ├── haptics/
│   │   ├── ai/
│   │   ├── verification/
│   │   └── membership/
│   └── types/
│       └── next-auth.d.ts
│
├── 📚 DOCUMENTATION
│   ├── README.md                       # Main project README
│   ├── MOBILE_APP_PLAN.md             # Mobile migration plan
│   ├── PROJECT_STRUCTURE.md           # This file
│   └── docs/
│       ├── FEATURES_SUMMARY.md         # All features
│       ├── PLATFORM_ARCHITECTURE.md    # Architecture docs
│       └── eloura_user_flow (2).md    # User flow specs
│
└── ⚙️ CONFIGURATION
    ├── package.json                    # Web dependencies
    ├── next.config.ts                  # Next.js config
    ├── tailwind.config.ts              # Tailwind config
    ├── tsconfig.json                   # TypeScript config
    ├── eslint.config.mjs               # ESLint config
    ├── .env.local                      # Environment variables
    └── .gitignore
```

---

## 🎯 Two-Platform Strategy

### **📱 Mobile App (Priority)**
**Location:** `/mobile`  
**Tech:** React Native (Expo)  
**Purpose:** Main product - native iOS and Android app  
**Subscriptions:** Apple IAP + Google Play Billing  

**Features:**
- Native performance
- Camera access
- Push notifications
- Haptic feedback
- Location services
- In-app purchases
- Offline support

### **🌐 Landing Page**
**Location:** `/app`  
**Tech:** Next.js 15  
**Purpose:** Marketing, download portal, SEO  
**Subscriptions:** N/A (directs to app)  

**Features:**
- App download buttons (iOS + Android)
- Waitlist signup
- Feature showcase
- SEO optimization
- Analytics ready

---

## 📊 Platform Comparison

| Feature | Mobile App | Web Landing |
|---------|-----------|-------------|
| **Purpose** | Main product | Download portal |
| **Users** | Authenticated | Anonymous |
| **Features** | Full platform | Marketing only |
| **Auth** | Full system | Waitlist signup |
| **Payments** | IAP (App Stores) | N/A |
| **Push** | Native | N/A |
| **Camera** | Native | N/A |
| **Location** | Native | N/A |
| **Haptics** | Native | N/A |

---

## 🚀 Development Workflow

### **Mobile App Development**
```bash
cd mobile
npm install
npm start           # Start Expo
npm run ios         # iOS simulator
npm run android     # Android emulator
```

### **Landing Page Development**
```bash
npm run dev         # Next.js dev server (port 4000)
```

### **Database**
```bash
npm run db:push     # Push schema to database
npm run db:generate # Generate Prisma client
```

---

## 🎨 Design Consistency

Both platforms share:
- **Brand Colors:** Purple (#8b5cf6)
- **Dark Theme:** True black backgrounds
- **Typography:** Light headings, clean body text
- **Spacing:** Consistent padding/margins
- **Components:** Similar visual language

---

## 📱 Mobile App Screens (Planned)

### **Authentication Flow**
1. ✅ Onboarding (3 slides)
2. ✅ Login
3. ⏳ Signup
4. ⏳ 7-Step Profile Setup

### **Main App (Bottom Tabs)**
1. ✅ Dashboard/Home
2. ✅ Discover
3. ✅ Messages
4. ✅ Profile

### **Additional Screens**
5. ⏳ Communities (List)
6. ⏳ Community Detail
7. ⏳ Events (List)
8. ⏳ Event Detail
9. ⏳ Chat Conversation
10. ⏳ Settings
11. ⏳ Map Explorer
12. ⏳ Subscription/Upgrade

---

## 💳 Monetization Strategy

### **Mobile App (Primary Revenue)**
- **Platform:** Apple App Store + Google Play Store
- **Method:** In-App Purchases (IAP)
- **Tiers:**
  - Curious: Free
  - Explorer: $29.99/month
  - Connoisseur: $99.99/month

### **Revenue Split:**
- Apple: 70% to us, 30% to Apple (15% after year 1)
- Google: 70-85% to us, 15-30% to Google

---

## 🔄 Migration Status

### **✅ Completed**
- [x] React Native Expo setup
- [x] Navigation structure
- [x] Core screen placeholders
- [x] App configuration
- [x] Landing page update
- [x] Documentation

### **⏳ In Progress**
- [ ] Feature migration to React Native
- [ ] Component library
- [ ] API integration
- [ ] Native features implementation

### **📅 Upcoming**
- [ ] Apple IAP integration
- [ ] Google Play Billing
- [ ] Push notifications
- [ ] Camera/Media
- [ ] App store submission

---

## 🎯 Development Priorities

### **Phase 1: Foundation (Current)**
- ✅ Expo setup
- ✅ Navigation
- ✅ Basic screens
- ✅ App config

### **Phase 2: Core Features (Next)**
- [ ] Complete authentication
- [ ] Build main screens
- [ ] Add native features
- [ ] Integrate backend API

### **Phase 3: Advanced (Week 2-3)**
- [ ] Communities full migration
- [ ] Events full migration
- [ ] Messaging full migration
- [ ] Map integration

### **Phase 4: Monetization (Week 4)**
- [ ] Subscription UI
- [ ] Apple IAP
- [ ] Google Play Billing
- [ ] Receipt validation

### **Phase 5: Polish (Week 5-6)**
- [ ] Animations
- [ ] Performance optimization
- [ ] Testing
- [ ] App store assets

### **Phase 6: Launch (Week 7-8)**
- [ ] Beta testing (TestFlight + Play Console)
- [ ] App store submission
- [ ] Marketing preparation
- [ ] Launch! 🚀

---

## 📲 App Store Information

### **iOS App Store**
- **Name:** ELOURA
- **Bundle ID:** com.eloura.app
- **Category:** Lifestyle / Social Networking
- **Age Rating:** 17+ (Social networking)
- **Price:** Free (with IAP)

### **Google Play Store**
- **Name:** ELOURA
- **Package:** com.eloura.app
- **Category:** Lifestyle
- **Content Rating:** Mature 17+
- **Price:** Free (with IAP)

---

## 🔗 Key Links

- **Landing Page:** https://lifestyle-platform-whd2a1ri5-michael-capaces-projects-f6224d63.vercel.app
- **Mobile App:** In development (Expo)
- **GitHub:** Connected
- **Database:** Supabase configured

---

## 📝 Notes

### **Why React Native?**
1. **True native app** - Access to all device features
2. **App store presence** - Discoverability and trust
3. **Better monetization** - In-app purchases are standard
4. **Performance** - Native rendering and animations
5. **Push notifications** - Critical for engagement
6. **Camera/Location** - Essential for lifestyle platform
7. **Platform integration** - iOS and Android specific features

### **What About the Web App?**
The extensive web app we built (`/app/(main)/*`) serves as:
- **Reference implementation** - All features designed and built
- **Component library** - Logic can be migrated to React Native
- **Backup plan** - Can launch web version alongside mobile
- **Development speed** - Faster to iterate on web first

### **Migration Strategy**
- Keep all web components as reference
- Rebuild in React Native using same logic
- Share backend API and database
- Maintain design consistency
- Leverage existing UX patterns

---

**The foundation is solid. Now we build the native mobile experience!** 🚀

