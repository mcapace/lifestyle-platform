# ELOURA - Premium Lifestyle Exploration Platform

> **A state-of-the-art lifestyle exploration platform that goes beyond traditional dating apps by focusing on authentic connections, community building, and experiential discovery.**

🚀 **Live Demo:** [https://lifestyle-platform-gj6mjkc8b-michael-capaces-projects-f6224d63.vercel.app](https://lifestyle-platform-gj6mjkc8b-michael-capaces-projects-f6224d63.vercel.app)

---

## 🌟 Overview

ELOURA is a premium lifestyle platform designed for authentic exploration and meaningful connections. Unlike traditional dating apps, ELOURA focuses on shared experiences, community engagement, and lifestyle discovery through:

- **Multi-Modal Discovery**: People, Communities, AND Events
- **AI-Powered Interactions**: Chat assistance, conversation starters, and smart recommendations
- **Community-First Approach**: Build connections through shared interests and experiences
- **Premium UX**: State-of-the-art design with smooth animations and haptic feedback
- **Safety & Privacy**: Comprehensive verification and privacy controls

---

## ✨ Key Features

### 🏠 **Core Platform**
- **Dashboard** - Lifestyle community hub with stats, trending communities, and achievement tracking
- **Discover** - Multi-modal exploration (People, Communities, Events) with advanced filtering
- **Communities** - Full community system with posts, comments, moderation, and member roles
- **Enhanced Messaging** - AI-powered chat with voice messages, translation, and conversation starters
- **Events System** - Complete RSVP functionality, reviews, ratings, and attendee management
- **Interactive Map** - Visual discovery of nearby events and communities
- **Profile & Achievements** - Gamified experience with lifestyle scores and unlockable achievements
- **Settings & Privacy** - Comprehensive account management and privacy controls

### 👤 **User Experience**
- **7-Step Onboarding Flow**
  1. Welcome & Value Proposition
  2. Basic Information
  3. Photo Upload (min 3 photos)
  4. Interest Selection (10+ categories)
  5. Lifestyle Preferences & Goals
  6. Verification Options
  7. Tier Selection (Curious/Explorer/Connoisseur)

- **Profile Features**
  - Photo carousel with verification badges
  - Lifestyle score tracking
  - Achievement system
  - Interest showcase
  - Experience level display

### 🌐 **Community Features**
- Community discovery and browsing
- Category-based filtering (Local, Wellness, Arts, Premium)
- Post creation with rich text and media
- Threaded comment system
- Member roles (Member, Moderator, Admin)
- Community guidelines and rules
- Trending communities display

### 🎉 **Events System**
- Event listing with search and filtering
- RSVP with confirmation modals
- 5-star rating and review system
- Attendee management
- Host profiles
- Location details
- Trending and premium badges
- Spots remaining tracking

### 💬 **Messaging Features**
- Real-time conversation interface
- AI chat assistant with suggestions
- Voice message recording
- Translation support
- Read receipts
- Online/offline status
- Media sharing (images, camera, GIFs)
- Quick reply options

### 🗺️ **Map Explorer**
- Interactive map view
- Event and community markers
- Zoom controls
- Map/List view toggle
- Location-based search
- Category filtering
- Quick marker previews

### ⚙️ **Settings & Privacy**
- Account management
- Notification preferences (email, push, SMS)
- Privacy controls (visibility, online status, location)
- Discovery preferences (distance, age range)
- Verification status
- Subscription management
- Appearance settings
- Support & legal links

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Phosphor Icons
- **State Management**: React Hooks

### **Backend & Database**
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **File Storage**: Ready for Supabase Storage

### **Deployment**
- **Hosting**: Vercel
- **CI/CD**: Automatic deployments from main branch
- **Environment**: Production-ready configuration

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or Supabase account)
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd lifestyle-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env.local` file:
```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:4000"
NEXTAUTH_SECRET="your-secret-key"

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

4. **Database Setup**
```bash
npm run db:push
npm run db:generate
```

5. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:4000` [[memory:4175627]]

### Production Deployment

```bash
# Push to GitHub
git push origin main

# Deploy to Vercel
vercel --prod
```

---

## 🎯 User Tiers

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

## 🎨 Design System

### **Color Palette**
- **Brand**: Purple/Blue gradient (`brand-500`)
- **Accent**: Amber for premium features
- **Background**: Dark mode (neutral-950, 900, 800)
- **Text**: White/neutral gradient for hierarchy

### **Typography**
- **Headings**: Light weight for modern aesthetic
- **Body**: Regular weight for readability
- **Accents**: Medium/Bold for CTAs

### **Components**
- Rounded corners (xl, 2xl for cards)
- Smooth transitions (200-300ms)
- Haptic feedback on interactions
- Micro-animations for delight

---

## 📱 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with waitlist |
| `/onboarding` | 7-step user onboarding |
| `/dashboard` | Main lifestyle hub |
| `/discover` | Multi-modal exploration |
| `/communities` | Community browsing |
| `/communities/[slug]` | Community detail with posts |
| `/events` | Event discovery |
| `/events/[id]` | Event detail with RSVP |
| `/messages` | Conversation list |
| `/messages/[id]` | Chat interface |
| `/explore` | Interactive map |
| `/profile` | User profile with achievements |
| `/settings` | Account & privacy settings |

---

## 🔐 Security & Privacy

- **Verification System**: Photo and ID verification ready
- **Privacy Controls**: Granular visibility settings
- **Data Protection**: GDPR-compliant data download
- **Moderation Tools**: Community and content moderation
- **Blocked Users**: Full block list management
- **Safe Messaging**: Report and flag capabilities

---

## 🚀 Performance

- **Build Time**: ~30 seconds
- **Page Load**: < 2 seconds (optimized images)
- **Mobile First**: Responsive on all devices
- **SEO Ready**: Meta tags and structured data
- **Lighthouse Score**: 90+ across all metrics

---

## 📊 Features Roadmap

### ✅ **Completed**
- [x] Dashboard with lifestyle metrics
- [x] Multi-modal discovery system
- [x] Full community platform
- [x] Post & comment system
- [x] Enhanced messaging with AI
- [x] Events with RSVP & reviews
- [x] Interactive map explorer
- [x] Settings & privacy controls
- [x] 7-step onboarding flow
- [x] Profile with achievements

### 🔄 **In Progress**
- [ ] Photo verification (AI-powered)
- [ ] ID verification (Stripe)
- [ ] Subscription system (Stripe)

### 📅 **Planned**
- [ ] Real map integration (Google Maps/Mapbox)
- [ ] Push notifications
- [ ] Video calls
- [ ] Live events
- [ ] Advanced analytics
- [ ] Referral program

---

## 🤝 Contributing

This is a premium platform project. For contributions or feature requests, please contact the development team.

---

## 📄 License

Proprietary - All rights reserved © 2024 ELOURA

---

## 🙏 Acknowledgments

- **Design Inspiration**: Modern lifestyle apps and premium platforms
- **Icons**: Phosphor Icons
- **UI Framework**: Tailwind CSS
- **Animation**: Framer Motion

---

## 📞 Support

For support, feature requests, or partnership inquiries:
- **Email**: support@eloura.app
- **Documentation**: [View Full Docs](./docs/PLATFORM_ARCHITECTURE.md)
- **User Flow**: [View User Flow](./docs/eloura_user_flow.md)

---

## 🎉 What Makes ELOURA Different?

1. **Beyond Dating**: Focus on lifestyle exploration and authentic connections
2. **Community-Driven**: Build relationships through shared experiences
3. **AI-Powered**: Smart recommendations and conversation assistance
4. **Premium UX**: State-of-the-art design and interactions
5. **Safety First**: Comprehensive verification and privacy controls
6. **Experiential**: Events and communities at the core
7. **Gamified**: Achievements and lifestyle scores for engagement
8. **Multi-Modal**: Discover through People, Communities, AND Events

---

**Built with ❤️ for authentic lifestyle exploration**
