# ELOURA - Complete User Flow & Technical Documentation

## Table of Contents

1. [App Store Presence](#app-store-presence)
2. [First Launch Experience](#first-launch-experience)
3. [Authentication & Signup](#authentication--signup)
4. [Profile Setup (Onboarding)](#profile-setup-onboarding)
5. [ID Verification](#id-verification)
6. [Payment Setup](#payment-setup)
7. [Welcome Experience](#welcome-experience)
8. [Returning User Login](#returning-user-login)
9. [App Structure & Navigation](#app-structure--navigation)
10. [Core Features](#core-features)
11. [Database Schema](#database-schema)
12. [Push Notifications](#push-notifications)
13. [Analytics & Tracking](#analytics--tracking)
14. [Cursor Prompting Guide](#cursor-prompting-guide)

---

## App Store Presence

### App Store Listing (iOS & Android)

**App Name:** Eloura - Lifestyle Exploration

**Tagline:** "Explore, Connect, Belong - A Safe Space for Authentic Connections"

**Screenshots (Carefully curated for app store approval):**
1. Elegant profile browsing (tasteful, non-explicit)
2. Interest-based discovery
3. Safe messaging interface
4. Community discussions
5. Privacy controls showcase

**Description:**
"Eloura is a sophisticated platform for adults seeking meaningful connections in the lifestyle community. Explore interests, join communities, and connect with like-minded individuals in a safe, verified environment. 

✨ What makes Eloura different:
• Verified profiles for authentic connections
• Interest-based discovery beyond swiping
• Thriving communities and discussions
• Privacy-first design with granular controls
• Safe, moderated environment
• Multiple ways to explore and connect

Whether you're experienced in the lifestyle or just curious, Eloura provides a welcoming space to explore at your own pace."

**Age Rating:** 17+ (iOS) / Mature 17+ (Android)

**Keywords:** lifestyle, dating, community, connections, exploration, safe space, verified

---

## First Launch Experience

### Splash Screen (2-3 seconds)

```
[Animated Logo - Elegant reveal]

    ✨ ELOURA ✨
    
[Subtle gradient animation]
[Loading indicator - minimal, elegant]
```

### Welcome Screen (First-time users only)

**Swipeable Carousel - 4 screens:**

#### Screen 1: Welcome
```
┌─────────────────────────────────────┐
│                                     │
│         [Hero Image/Illustration]    │
│      Elegant, sophisticated visual   │
│                                     │
│     ✨ Welcome to Eloura ✨         │
│                                     │
│    "Your journey of exploration     │
│         begins here"                │
│                                     │
│  A safe space for authentic         │
│  connections in the lifestyle       │
│  community                          │
│                                     │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   Create Account              │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   Sign In                     │ │
│  └───────────────────────────────┘ │
│                                     │
│     [Swipe indicators: •••○]       │
│                                     │
└─────────────────────────────────────┘
```

#### Screen 2: Safety & Privacy
```
[Icon: Shield]
"Privacy First"

Your safety matters. Control
who sees what, browse privately,
and connect with verified members.
```

#### Screen 3: Explore Your Way
```
[Icon: Compass]
"Multiple Ways to Discover"

Browse by interests, location,
communities. Swipe or search—
explore at your own pace.
```

#### Screen 4: Join Communities
```
[Icon: People]
"Find Your Tribe"

Connect through shared interests,
join discussions, and build
meaningful connections.

[Get Started →]
```

---

## Authentication & Signup

### Account Creation Screen

```
┌─────────────────────────────────────┐
│  [← Back]     Create Account        │
├─────────────────────────────────────┤
│                                     │
│  "Let's get you started"            │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 📧 Continue with Email        │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 📱 Continue with Phone        │ │
│  └───────────────────────────────┘ │
│                                     │
│  ─────────── or ───────────        │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Continue with Google         │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Continue with Apple          │ │
│  └───────────────────────────────┘ │
│                                     │
│  ────────────────────────────────  │
│                                     │
│  By continuing, you agree to our   │
│  [Terms of Service] and             │
│  [Privacy Policy]                   │
│                                     │
│  Already have an account? [Sign In]│
│                                     │
└─────────────────────────────────────┘
```

### Authentication Flow Options

#### OPTION A: Email Signup

**Screen 1: Enter Email**
```
┌─────────────────────────────────────┐
│  [← Back]     Sign Up               │
├─────────────────────────────────────┤
│                                     │
│  What's your email?                 │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Email address                 │ │
│  │ you@example.com               │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Create password (8+ chars)    │ │
│  │ ●●●●●●●●                      │ │
│  └───────────────────────────────┘ │
│  [Show password]                    │
│                                     │
│  Password strength: ━━━━━━━━━○○    │
│  Strong 💪                         │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Continue               │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Screen 2: Verify Email**
```
┌─────────────────────────────────────┐
│  [← Back]     Verify Email          │
├─────────────────────────────────────┤
│                                     │
│  We sent a code to                  │
│  you@example.com                    │
│                                     │
│  Enter the 6-digit code:            │
│                                     │
│  ┌───┬───┬───┬───┬───┬───┐        │
│  │ 4 │ 8 │ 2 │ 9 │ 1 │ 7 │        │
│  └───┴───┴───┴───┴───┴───┘        │
│                                     │
│  Didn't receive it?                 │
│  [Resend code] (available in 0:45)  │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Verify                 │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

#### OPTION B: Phone Number Signup

**Screen 1: Enter Phone**
```
┌─────────────────────────────────────┐
│  [← Back]     Sign Up               │
├─────────────────────────────────────┤
│                                     │
│  What's your phone number?          │
│                                     │
│  We'll send you a verification code │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 🇺🇸 +1  (555) 123-4567        │ │
│  └───────────────────────────────┘ │
│  [Change country code]              │
│                                     │
│  ☑️ I agree to receive SMS          │
│     verification codes              │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Send Code                  │ │
│  └───────────────────────────────┘ │
│                                     │
│  We'll never share your number or   │
│  send marketing messages            │
│                                     │
└─────────────────────────────────────┘
```

**Screen 2: Verify Phone (SMS Code)**
```
┌─────────────────────────────────────┐
│  [← Back]     Verify Phone          │
├─────────────────────────────────────┤
│                                     │
│  Enter the code we sent to          │
│  +1 (555) 123-4567                  │
│                                     │
│  ┌───┬───┬───┬───┬───┬───┐        │
│  │ 4 │ 8 │ 2 │ 9 │ 1 │ 7 │        │
│  └───┴───┴───┴───┴───┴───┘        │
│                                     │
│  Didn't receive it?                 │
│  [Resend code] (available in 0:58)  │
│  [Call me instead]                  │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Verify                 │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Screen 3: Create Password**
```
┌─────────────────────────────────────┐
│  [← Back]     Create Password       │
├─────────────────────────────────────┤
│                                     │
│  Secure your account                │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Create password (8+ chars)    │ │
│  │ ●●●●●●●●                      │ │
│  └───────────────────────────────┘ │
│  [Show password]                    │
│                                     │
│  Password strength: ━━━━━━━━━○○    │
│  Strong 💪                         │
│                                     │
│  ✓ At least 8 characters            │
│  ✓ Contains a number                │
│  ✓ Contains uppercase letter        │
│  ○ Contains special character       │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Continue               │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

#### OPTION C: Google Sign-In

**Process:**
1. User taps "Continue with Google"
2. Native Google account picker appears
3. User selects account
4. Permissions requested:
   - Email address
   - Basic profile info
   - Profile picture
5. User approves
6. Returns to app → Skip to Profile Setup

**Technical Implementation:**
- iOS: GoogleSignIn SDK
- Android: Google Sign-In SDK
- Web: Google Identity Services
- Backend: Verify OAuth token with Google

#### OPTION D: Apple Sign-In

**Process:**
1. User taps "Continue with Apple"
2. Native Apple ID prompt (Face ID/Touch ID)
3. User authenticates with biometrics
4. Permissions requested:
   - Name (optional - user can hide)
   - Email (user can hide real email)
5. User approves
6. Returns to app → Skip to Profile Setup

**Special Handling:**
- If user hides email: Apple provides relay email (privaterelay@icloud.com)
- Store Apple User ID for future logins
- Handle "Hide My Email" feature

**Technical Implementation:**
- iOS: AuthenticationServices framework
- Must support: Sign in with Apple required if other social logins offered

---

## Profile Setup (Onboarding)

**Goal:** Get users to a functional profile ASAP, then progressively enhance

### Progress Indicator (Top of every screen)

```
━━━━━━━○○○○○  Step 3 of 7
```

### Step 1: Basic Info

```
┌─────────────────────────────────────┐
│  [Skip]          Step 1 of 7        │
│  ━━━━━━━○○○○○○○                     │
├─────────────────────────────────────┤
│                                     │
│  Let's start with the basics        │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ First name (or nickname)      │ │
│  │ Alex                          │ │
│  └───────────────────────────────┘ │
│  This is how others will see you    │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Date of birth                 │ │
│  │ MM / DD / YYYY                │ │
│  └───────────────────────────────┘ │
│  You must be 18+ to use Eloura      │
│                                     │
│  Gender Identity                    │
│  ┌───────────────────────────────┐ │
│  │ ○ Man                         │ │
│  │ ○ Woman                       │ │
│  │ ○ Non-binary                  │ │
│  │ ○ Prefer to self-describe     │ │
│  │ ○ Prefer not to say           │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Continue               │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Age Verification:**
- Calculate age from DOB
- If < 18: Show error, block signup
- Store DOB securely (encrypted)
- Never display DOB publicly

### Step 2: Location

```
┌─────────────────────────────────────┐
│  [← Back]        Step 2 of 7        │
│  ━━━━━━━━━━○○○○○                    │
├─────────────────────────────────────┤
│                                     │
│  Where are you located?             │
│                                     │
│  This helps you find nearby members │
│  and relevant communities           │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 📍 Enable Location            │ │
│  │    (Recommended)              │ │
│  └───────────────────────────────┘ │
│                                     │
│  ─────────── or ───────────        │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ City, State                   │ │
│  │ Manhattan, NY                 │ │
│  └───────────────────────────────┘ │
│  [Autocomplete dropdown]            │
│                                     │
│  Privacy Settings:                  │
│  Show my location as:               │
│  ○ Exact distance (2.4 miles)      │
│  ● Approximate (2-5 miles)         │
│  ○ City only (Manhattan, NY)       │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Continue               │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Location Handling:**
- Request location permission (iOS/Android)
- If granted: Use GPS coordinates
- If denied: Manual city entry
- Store: Lat/Long + City/State
- Never expose exact location
- Use distance calculations server-side

### Step 3: Upload Photos

```
┌─────────────────────────────────────┐
│  [← Back]        Step 3 of 7        │
│  ━━━━━━━━━━━━○○○                    │
├─────────────────────────────────────┤
│                                     │
│  Add your photos                    │
│                                     │
│  Profiles with photos get 10x more  │
│  engagement                         │
│                                     │
│  ┌─────────┬─────────┬─────────┐  │
│  │  [+]    │  [+]    │  [+]    │  │
│  │  Main   │  Photo  │  Photo  │  │
│  │  Photo  │   2     │   3     │  │
│  └─────────┴─────────┴─────────┘  │
│                                     │
│  Tips for great photos:             │
│  ✓ Clear, well-lit face photo       │
│  ✓ Show your personality            │
│  ✓ Recent photos (last 6 months)    │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Upload from Gallery        │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Take Photo                 │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Skip for now                 │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Photo Upload Flow:**
1. User selects source (gallery/camera)
2. Native picker appears
3. User selects photo(s)
4. Show crop/edit interface:
   - Zoom/pan
   - Rotate
   - Filters (optional)
5. AI Safety Check (background):
   - Face detection (must have face)
   - Inappropriate content detection
   - Quality check (not blurry)
6. Upload to Supabase Storage
7. Generate thumbnails (3 sizes)
8. Show upload progress
9. Success confirmation

### Step 4: About You (Bio)

```
┌─────────────────────────────────────┐
│  [← Back]        Step 4 of 7        │
│  ━━━━━━━━━━━━━━━○○                  │
├─────────────────────────────────────┤
│                                     │
│  Tell us about yourself             │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Write a bio...                │ │
│  │                               │ │
│  │ Share what makes you unique,  │ │
│  │ what you're looking for, or   │ │
│  │ what brings you to Eloura     │ │
│  │                               │ │
│  │                               │ │
│  │                               │ │
│  └───────────────────────────────┘ │
│  0 / 500 characters                 │
│                                     │
│  💡 AI Suggestion:                  │
│  "I'm exploring [interests] and     │
│  looking to connect with..."        │
│  [Use this]                         │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Continue               │ │
│  └───────────────────────────────┘ │
│                                     │
│  [Skip for now]                     │
│                                     │
└─────────────────────────────────────┘
```

**AI Assistant Features:**
- Real-time character count
- Grammar/spell check
- Tone suggestions
- Content moderation (flag inappropriate)
- Writing prompts if stuck

### Step 5: Your Interests

```
┌─────────────────────────────────────┐
│  [← Back]        Step 5 of 7        │
│  ━━━━━━━━━━━━━━━━━○                │
├─────────────────────────────────────┤
│                                     │
│  What are you interested in?        │
│                                     │
│  Select all that apply (3 minimum)  │
│  Selected: 0                        │
│                                     │
│  [Search interests...]              │
│                                     │
│  Popular:                           │
│  ┌──────┬──────┬──────┬──────┐    │
│  │Rope/ │Impact│Role- │Group │    │
│  │Shibari│ Play │ play │ Play │    │
│  └──────┴──────┴──────┴──────┘    │
│  ┌──────┬──────┬──────┬──────┐    │
│  │Sensual│BDSM │Poly │Exhibi-│   │
│  │ Play │ 101 │Life │tionism│    │
│  └──────┴──────┴──────┴──────┘    │
│                                     │
│  Browse Categories:                 │
│  › Bondage & Restraint              │
│  › Power Dynamics                   │
│  › Roleplay & Fantasy               │
│  › Sensation Play                   │
│  › Community & Social               │
│  › Education & Learning             │
│  › Lifestyle & Relationships        │
│  › Show all (100+)                  │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Continue (Need 3 minimum)    │ │
│  └───────────────────────────────┘ │
│  [Disabled until 3 selected]        │
│                                     │
└─────────────────────────────────────┘
```

**Interest Tagging System:**
- Multi-select with visual feedback
- Categories expandable/collapsible
- Search with autocomplete
- Suggested based on location demographics
- Max 20 interests selected

### Step 6: What You're Looking For

```
┌─────────────────────────────────────┐
│  [← Back]        Step 6 of 7        │
│  ━━━━━━━━━━━━━━━━━━━○              │
├─────────────────────────────────────┤
│                                     │
│  What brings you to Eloura?         │
│                                     │
│  Select all that apply:             │
│                                     │
│  ☑ Friendship & connections         │
│  ☑ Play partners                    │
│  ☐ Dating                           │
│  ☐ Long-term relationship           │
│  ☑ Community & social               │
│  ☐ Mentorship/learning              │
│  ☑ Exploring & curious              │
│  ☐ Casual encounters                │
│                                     │
│  Relationship Status:               │
│  ○ Single                           │
│  ○ Partnered (open)                 │
│  ○ Married (open)                   │
│  ○ Polyamorous                      │
│  ○ It's complicated                 │
│  ○ Prefer not to say                │
│                                     │
│  Experience Level:                  │
│  ○ New/Exploring (< 1 year)        │
│  ● Intermediate (1-3 years)        │
│  ○ Experienced (3+ years)          │
│  ○ Expert/Educator                 │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Continue               │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### Step 7: Privacy & Safety Setup

```
┌─────────────────────────────────────┐
│  [← Back]        Step 7 of 7        │
│  ━━━━━━━━━━━━━━━━━━━━━○            │
├─────────────────────────────────────┤
│                                     │
│  🛡️ Your Privacy Matters            │
│                                     │
│  Control who sees your profile      │
│                                     │
│  Show my profile to:                │
│  ● Everyone                         │
│  ○ Verified members only            │
│  ○ Premium members only             │
│                                     │
│  ────────────────────────────────  │
│                                     │
│  Distance Visibility:               │
│  ● Approximate (2-5 miles)         │
│  ○ Exact distance                  │
│  ○ City only                       │
│                                     │
│  ────────────────────────────────  │
│                                     │
│  Private Photo Gallery:             │
│  ☑ Require approval before viewing  │
│                                     │
│  ────────────────────────────────  │
│                                     │
│  Incognito Mode: (Premium)          │
│  ○ Browse privately                 │
│  [Learn more]                       │
│                                     │
│  ────────────────────────────────  │
│                                     │
│  ☑ I agree to the Community         │
│    Guidelines and Safety Rules      │
│    [Read full guidelines]           │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Complete Profile           │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### Optional: ID Verification Prompt

```
┌─────────────────────────────────────┐
│                                     │
│  🎉 Profile Complete!               │
│                                     │
│  ✨ Get Verified ✨                 │
│                                     │
│  [Verification Badge Illustration]  │
│                                     │
│  Verified profiles get:             │
│  ✓ 10x more matches                 │
│  ✓ Priority in search results       │
│  ✓ Access to verified-only spaces   │
│  ✓ Increased trust & safety         │
│                                     │
│  Quick & secure (takes 2 minutes)   │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Get Verified Now           │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Maybe Later                │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

---

## ID Verification

### Verification Flow

**Screen 1: Choose Verification Method**
```
┌─────────────────────────────────────┐
│  [× Close]    Get Verified          │
├─────────────────────────────────────┤
│                                     │
│  How would you like to verify?      │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  📸 Video Selfie              │ │
│  │  Quick & easy (2 min)         │ │
│  │  ✓ Instant verification       │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  🆔 ID Document (Premium)     │ │
│  │  Most trusted method          │ │
│  │  ✓ Human review               │ │
│  │  ✓ Higher trust score         │ │
│  └───────────────────────────────┘ │
│                                     │
│  Why verify?                        │
│  • Build trust with the community   │
│  • Reduce fake profiles             │
│  • Safer environment for everyone   │
│                                     │
│  🔒 Your privacy is protected:      │
│  • Biometric data never stored      │
│  • ID docs deleted after review     │
│  • No data shared with third parties│
│                                     │
└─────────────────────────────────────┘
```

### Option A: Video Selfie Verification

**Screen 2a: Video Selfie Instructions**
```
┌─────────────────────────────────────┐
│  [← Back]    Video Verification     │
├─────────────────────────────────────┤
│                                     │
│  📸 Take a Video Selfie             │
│                                     │
│  [Illustration showing process]     │
│                                     │
│  How it works:                      │
│  1. Position your face in the frame │
│  2. Follow the on-screen prompts    │
│  3. Record a 3-second video         │
│                                     │
│  Tips:                              │
│  ✓ Good lighting                    │
│  ✓ Remove glasses/hat               │
│  ✓ Look directly at camera          │
│  ✓ Neutral expression               │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Start Verification         │ │
│  └───────────────────────────────┘ │
│                                     │
│  Your video is never stored or      │
│  shared. We only verify it matches  │
│  your photos.                       │
│                                     │
└─────────────────────────────────────┘
```

**Screen 2b: Camera View**
```
┌─────────────────────────────────────┐
│  [× Cancel]                         │
│                                     │
│      ┌─────────────────┐           │
│      │                 │           │
│      │   [Face Oval]   │           │
│      │   Positioning   │           │
│      │   Guide         │           │
│      │                 │           │
│      └─────────────────┘           │
│                                     │
│  Center your face in the oval       │
│                                     │
│  [Recording will start automatically]│
│                                     │
└─────────────────────────────────────┘
```

**AI Face Detection Sequence:**
1. Face detected → Green oval
2. "Look left" → User turns left
3. "Look right" → User turns right
4. "Smile" → User smiles
5. "Perfect!" → Recording complete

**Screen 2c: Processing**
```
┌─────────────────────────────────────┐
│                                     │
│  [Animated spinner]                 │
│                                     │
│  Verifying your video...            │
│                                     │
│  This takes about 10 seconds        │
│                                     │
└─────────────────────────────────────┘
```

**Backend Process:**
- AI liveness detection (not a photo/video)
- Face matching against profile photos
- Anti-spoofing checks
- Quality assessment
- Results returned in 5-15 seconds

**Screen 2d: Success**
```
┌─────────────────────────────────────┐
│                                     │
│  ✓ Verification Complete!           │
│                                     │
│  [Badge animation]                  │
│                                     │
│  You're now a verified member       │
│                                     │
│  Your profile will show:            │
│  ✓ Verified badge                   │
│  ✓ Higher in search results         │
│  ✓ Access to verified communities   │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Continue to App            │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### Option B: ID Document Verification (Premium/Elite)

**Screen 3a: ID Verification Instructions**
```
┌─────────────────────────────────────┐
│  [← Back]    ID Verification        │
├─────────────────────────────────────┤
│                                     │
│  🆔 Verify with ID                  │
│                                     │
│  Accepted documents:                │
│  ✓ Driver's License                 │
│  ✓ Passport                         │
│  ✓ State ID                         │
│  ✓ National ID Card                 │
│                                     │
│  Process:                           │
│  1. Upload photo of your ID         │
│  2. Take a selfie                   │
│  3. Our team reviews (24-48 hours)  │
│                                     │
│  🔒 Security Promise:               │
│  • Encrypted transmission           │
│  • Reviewed by verified staff only  │
│  • ID image deleted after review    │
│  • No data sold or shared           │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Upload ID                  │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Backend ID Verification Process:**
1. OCR extracts name, DOB, expiry date
2. AI checks for tampering/fake IDs
3. Face matching between ID and selfie
4. Human moderator final review
5. Age verification (18+ check)
6. Notification sent to user
7. ID images permanently deleted
8. Only verification status stored

---

## Payment Setup

### Upgrade Screen

```
┌─────────────────────────────────────┐
│  [× Close]    Upgrade to Explorer   │
├─────────────────────────────────────┤
│                                     │
│  [Premium badge illustration]       │
│                                     │
│  Unlock the Full Experience         │
│                                     │
│  ✓ Unlimited messaging              │
│  ✓ Advanced search filters          │
│  ✓ See who viewed you               │
│  ✓ Post in communities              │
│  ✓ Upload 10 photos + 3 videos      │
│  ✓ Priority in search results       │
│  ✓ Incognito mode                   │
│                                     │
│  ────────────────────────────────  │
│                                     │
│  [Toggle: Monthly / Annual]         │
│                                     │
│  ○ Explorer - $19.99/month          │
│                                     │
│  ○ Connoisseur - $39.99/month       │
│     Everything in Explorer +        │
│     • VIP badge                     │
│     • Spotlight boosts              │
│     • Elite-only communities        │
│                                     │
│  ────────────────────────────────  │
│                                     │
│  💡 Save 20% with annual billing    │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Continue                   │ │
│  └───────────────────────────────┘ │
│                                     │
│  Cancel anytime. No long-term       │
│  commitment required.               │
│                                     │
│  [Terms] • [Privacy] • [Restore]    │
│                                     │
└─────────────────────────────────────┘
```

### Payment Method Selection

```
┌─────────────────────────────────────┐
│  [← Back]    Payment Method         │
├─────────────────────────────────────┤
│                                     │
│  Explorer Membership                │
│  $19.99/month                       │
│                                     │
│  Choose payment method:             │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Apple Pay                   │ │
│  │  [Apple Pay button]          │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Google Pay                  │ │
│  │  [Google Pay button]         │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  💳 Credit/Debit Card        │ │
│  │  Visa, Mastercard, Amex      │ │
│  └───────────────────────────────┘ │
│                                     │
│  🔒 Secured by Stripe               │
│                                     │
│  Billing details:                   │
│  • First charge: Today ($19.99)     │
│  • Next charge: Nov 13, 2025        │
│  • Cancel anytime in Settings       │
│                                     │
└─────────────────────────────────────┘
```

### Apple Pay Flow (iOS)

**Technical Implementation:**
- iOS: PassKit framework
- StoreKit for subscription management
- Receipt validation with Apple servers
- Webhook handling for subscription events
- Grace periods for payment issues

### Google Pay Flow (Android)

**Technical Implementation:**
- Android: Google Pay API
- Google Play Billing for subscriptions
- Purchase token validation
- Real-time developer notifications
- Subscription state management

### Credit Card Flow

```
┌─────────────────────────────────────┐
│  [← Back]    Add Card               │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Card number                   │ │
│  │ 4242 4242 4242 4242          │ │
│  │ [Visa icon]                   │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌──────────────┬────────────────┐ │
│  │ MM / YY      │ CVC            │ │
│  │ 12 / 25      │ 123            │ │
│  └──────────────┴────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Cardholder name               │ │
│  │ John Doe                      │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ ZIP / Postal code             │ │
│  │ 10001                         │ │
│  └───────────────────────────────┘ │
│                                     │
│  ☑ Save card for future purchases   │
│                                     │
│  🔒 Your payment info is encrypted  │
│     and never stored on our servers │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Subscribe ($19.99/mo)      │ │
│  └───────────────────────────────┘ │
│                                     │
│  By subscribing, you agree to our   │
│  [Terms of Service]                 │
│                                     │
└─────────────────────────────────────┘
```

**Backend Payment Processing:**
1. Tokenize card with Stripe
2. Create customer in Stripe
3. Create subscription
4. Handle 3D Secure if required
5. Update user subscription status
6. Send confirmation email
7. Update app state

---

## Welcome Experience

### First-Time User Welcome

```
┌─────────────────────────────────────┐
│                                     │
│  🎉 Welcome to Eloura!              │
│                                     │
│  [App illustration/animation]       │
│                                     │
│  Let's take a quick tour            │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Show Me Around (30 sec)    │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Skip, I'll Explore         │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### Interactive Product Tour (Optional)

**4-Step Overlay Tutorial:**

1. **Discover Tab**: "This is your personalized feed. See new members, community posts, and people you might know"
2. **Explore Tab**: "Browse profiles by interests, location, or use swipe mode for quick discovery"
3. **Messages Tab**: "All your conversations live here. Send your first message!"
4. **Communities Tab**: "Join communities, participate in discussions, and connect with like-minded people"

---

## Returning User Login

### Login Screen

```
┌─────────────────────────────────────┐
│                                     │
│    ✨ ELOURA ✨                     │
│                                     │
│  Welcome back                       │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Continue with Google         │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Continue with Apple          │ │
│  └───────────────────────────────┘ │
│                                     │
│  ─────────── or ───────────        │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Email or phone                │ │
│  │ you@example.com               │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Password                      │ │
│  │ ●●●●●●●●                      │ │
│  └───────────────────────────────┘ │
│  [Show] [Forgot password?]          │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Sign In                │ │
│  └───────────────────────────────┘ │
│                                     │
│  Don't have an account?             │
│  [Create Account]                   │
│                                     │
└─────────────────────────────────────┘
```

### Biometric Login (iOS/Android)

**Technical Implementation:**
- iOS: LocalAuthentication framework
- Android: BiometricPrompt API
- Secure storage: Keychain (iOS) / Keystore (Android)
- Fallback to password
- Token refresh on successful auth

---

## App Structure & Navigation

### Main Navigation (Bottom Tab Bar)

```
┌──────────────────────────────────────────────┐
│  [🏠 Discover] [🔍 Explore] [💬 Messages]   │
│     [🌐 Communities] [👤 Profile]            │
└──────────────────────────────────────────────┘
```

### Tab 1: Discover (Home Feed)

**Quick Actions Row:**
- 🎲 Swipe Mode
- 🔥 Hot Now (Active users)
- 📍 Near You
- ⭐ New Members

**Feed Content:**
- Featured Communities
- Activity Feed (community posts, discussions)
- People You Might Know
- Trending Discussions
- New Member Spotlight
- Interest-based suggestions

### Tab 2: Explore (Multi-Modal Discovery)

**Exploration Modes:**
1. **👥 PEOPLE** - Profile browsing with advanced filters
2. **🏷️ INTERESTS** - Tag-based discovery
3. **📍 LOCATION** - Geographic discovery
4. **🎲 DISCOVER** - Swipe mode

### Tab 3: Messages

**Features:**
- Conversation list with filters
- Unread badges
- Online indicators
- Swipe actions (archive/delete)
- Rich media support
- Read receipts (Premium)

### Tab 4: Communities

**Sections:**
- My Communities
- Recommended Communities
- Browse by Category
- Trending Discussions
- Community Search

### Tab 5: Profile

**Sections:**
- Profile preview
- Settings
- Subscription management
- Privacy controls
- Safety & support
- Help center

---

## Database Schema

### Core Tables

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Authentication
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),
  auth_provider VARCHAR(50),
  auth_provider_id VARCHAR(255),
  
  -- Basic Profile
  first_name VARCHAR(100),
  display_name VARCHAR(100),
  date_of_birth DATE NOT NULL,
  age INT GENERATED ALWAYS AS (EXTRACT(YEAR FROM AGE(date_of_birth))) STORED,
  gender_identity VARCHAR(50),
  bio TEXT,
  
  -- Location
  city VARCHAR(100),
  state VARCHAR(50),
  country VARCHAR(50) DEFAULT 'US',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  location_visibility VARCHAR(20) DEFAULT 'approximate',
  
  -- Preferences
  relationship_status VARCHAR(50),
  experience_level VARCHAR(50),
  looking_for TEXT[],
  
  -- Subscription
  subscription_tier VARCHAR(20) DEFAULT 'curious',
  subscription_start_date TIMESTAMP,
  subscription_end_date TIMESTAMP,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  
  -- Verification
  is_email_verified BOOLEAN DEFAULT FALSE,
  is_phone_verified BOOLEAN DEFAULT FALSE,
  is_video_verified BOOLEAN DEFAULT FALSE,
  is_id_verified BOOLEAN DEFAULT FALSE,
  verification_score INT DEFAULT 0,
  
  -- Privacy & Safety
  is_active BOOLEAN DEFAULT TRUE,
  is_banned BOOLEAN DEFAULT FALSE,
  is_private BOOLEAN DEFAULT FALSE,
  incognito_mode BOOLEAN DEFAULT FALSE,
  
  -- Engagement
  last_active_at TIMESTAMP,
  profile_completion_score INT DEFAULT 0,
  
  -- Metadata
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INT DEFAULT 0,
  device_token VARCHAR(255),
  fcm_token VARCHAR(255),
  
  CONSTRAINT age_check CHECK (age >= 18)
);

-- Photos table
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  position INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  is_private BOOLEAN DEFAULT FALSE,
  
  -- Moderation
  is_approved BOOLEAN DEFAULT FALSE,
  moderation_status VARCHAR(20) DEFAULT 'pending',
  moderation_notes TEXT,
  
  -- AI Analysis
  has_face BOOLEAN,
  face_confidence DECIMAL(5, 2),
  is_explicit BOOLEAN DEFAULT FALSE,
  
  UNIQUE(user_id, position)
);

-- User Interests (many-to-many)
CREATE TABLE user_interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  interest_id UUID REFERENCES interests(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, interest_id)
);

-- Interests taxonomy
CREATE TABLE interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50),
  description TEXT,
  member_count INT DEFAULT 0,
  icon_url VARCHAR(500)
);

-- Verification Records
CREATE TABLE verification_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  verification_type VARCHAR(20),
  status VARCHAR(20),
  
  -- Video selfie
  video_url VARCHAR(500),
  liveness_score DECIMAL(5, 2),
  face_match_score DECIMAL(5, 2),
  
  -- ID document
  id_image_url VARCHAR(500),
  id_type VARCHAR(50),
  extracted_name VARCHAR(200),
  extracted_dob DATE,
  
  -- Review
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,
  rejection_reason TEXT
);

-- Payment History
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  amount_cents INT NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  
  payment_type VARCHAR(50),
  stripe_payment_intent_id VARCHAR(255),
  stripe_invoice_id VARCHAR(255),
  
  status VARCHAR(20),
  metadata JSONB
);

-- Activity Log
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  activity_type VARCHAR(50),
  target_user_id UUID REFERENCES users(id),
  metadata JSONB,
  
  ip_address INET,
  user_agent TEXT,
  device_type VARCHAR(50)
);

-- Communities
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  icon_url VARCHAR(500),
  banner_url VARCHAR(500),
  
  member_count INT DEFAULT 0,
  post_count INT DEFAULT 0,
  
  is_private BOOLEAN DEFAULT FALSE,
  requires_verification BOOLEAN DEFAULT FALSE,
  requires_premium BOOLEAN DEFAULT FALSE,
  
  created_by UUID REFERENCES users(id),
  
  guidelines TEXT,
  tags TEXT[]
);

-- Community Members
CREATE TABLE community_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT NOW(),
  
  role VARCHAR(20) DEFAULT 'member', -- 'member', 'moderator', 'admin'
  
  UNIQUE(community_id, user_id)
);

-- Community Posts
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  title VARCHAR(300),
  content TEXT NOT NULL,
  media_urls TEXT[],
  
  like_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  
  moderation_status VARCHAR(20) DEFAULT 'approved'
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  content TEXT NOT NULL,
  media_url VARCHAR(500),
  media_type VARCHAR(50),
  
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  
  is_deleted_by_sender BOOLEAN DEFAULT FALSE,
  is_deleted_by_receiver BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_messages_receiver ON messages(receiver_id, is_read);
```

---

## Push Notifications

### Key Notification Types

**1. Engagement Notifications**
- New Match: "🎉 You matched with Alex!"
- Message Received: "Alex sent you a message"
- Profile View: "5 people viewed your profile today"
- Like Received: "Someone liked your profile!"

**2. Community Notifications**
- Comment Reply: "Jordan replied to your comment"
- Post Like: "Your post got 10 new likes"
- New Community Member: "Welcome new members to [Community]"

**3. Verification & Onboarding**
- Verification Approved: "✓ You're now verified!"
- Profile Incomplete: "Complete your profile to get more matches"
- Photo Approval: "Your photo was approved"

**4. Subscription & Monetization**
- Daily Limit Reached: "You've used your 5 free interests. Upgrade?"
- Trial Ending: "Your trial ends in 3 days"
- Payment Failed: "Update your payment method"

**5. Safety & Moderation**
- Suspicious Activity: "We detected unusual activity on your account"
- Content Removed: "Your post was removed [reason]"

**6. Re-engagement**
- Inactive User: "We miss you! See who's new"
- Nearby Member: "Someone new joined near you"

---

## Analytics & Tracking

### Key Events to Track

**User Acquisition:**
- app_install
- signup_started
- signup_completed
- onboarding_step_completed
- onboarding_abandoned

**Engagement:**
- session_start / session_end
- profile_view
- swipe_left / swipe_right
- super_like
- message_sent / message_received
- community_post_created / viewed
- community_joined

**Conversion:**
- subscription_page_viewed
- subscription_started / completed / cancelled
- credits_purchased

**Verification:**
- verification_started / completed / failed

**Retention:**
- day_1_retention
- day_7_retention
- day_30_retention

---

## Cursor Prompting Guide

### Template for Cursor Prompts

```markdown
# ELOURA - [Feature Name]

## Context
- App: Eloura (Lifestyle exploration platform)
- Tech Stack: React Native / SwiftUI + Supabase + Stripe
- Current Phase: [Onboarding / Core App / etc.]

## Feature Requirements
[Detailed requirements from above]

## Design System
Colors:
- Primary: #6B46C1 (Deep Purple)
- Accent: #E8B4A8 (Rose Gold)
- Success: #10B981 (Emerald)
- Background: #0F172A (Dark) / #FAFAFA (Light)

Typography:
- Display: Zodiak/Sohne
- Body: Inter/SF Pro
- Sizes: H1(32px), H2(24px), Body(16px)

Components:
- Rounded corners: 16px
- Shadows: subtle elevation
- Animations: 300ms ease-out
- Haptics: On key interactions

## Database Schema
[Relevant tables from above]

## API Endpoints Needed
[List endpoints]

## Acceptance Criteria
- [ ] [Specific requirement 1]
- [ ] [Specific requirement 2]
- [ ] Mobile responsive
- [ ] Accessibility compliant
- [ ] Loading states handled
- [ ] Error states handled
```

---

## Tier System Summary

### Free Tier: "Curious" - $0/month
- Browse unlimited profiles
- Join public communities (read-only)
- Send 5 "interests" per day
- Receive unlimited messages
- Create profile with 3 photos
- Basic search filters

### Premium Tier: "Explorer" - $19.99/month
- Everything in Curious, plus:
- Send unlimited first messages
- Post in forums & communities
- Advanced search (100+ filters)
- See who viewed your profile
- Upload 10 photos + 3 videos
- Video verification badge
- Incognito mode
- Priority in search results

### Elite Tier: "Connoisseur" - $39.99/month
- Everything in Explorer, plus:
- Featured in "Elite Members" showcase
- Unlimited photo/video uploads
- AI compatibility insights
- 2x weekly Spotlight boosts
- VIP badge on profile
- Exclusive Elite-only forums
- Early access to new features
- Concierge verification
- Custom profile URL
- Advanced analytics

---

## Technology Stack

### Frontend
- **iOS**: SwiftUI + Combine
- **Android**: Jetpack Compose + Kotlin Coroutines
- **Web**: Next.js 14 + React 18

### Backend
- **Core**: Node.js (Express/Fastify) or Python (FastAPI)
- **Database**: PostgreSQL (Supabase) + Redis
- **Real-time**: Socket.io or Supabase Realtime
- **File Storage**: Supabase Storage (with CDN)
- **Authentication**: Supabase Auth + biometric integration

### AI/ML Services
- **Image Moderation**: AWS Rekognition or Clarifai
- **Face Verification**: Face++ or AWS Rekognition
- **Content Moderation**: OpenAI Moderation API
- **Matching Algorithm**: Custom ML model

### Payment Processing
- **Primary**: Stripe
- **Alternative**: PayPal

### Security & Privacy
- **End-to-End Encryption**: Signal Protocol
- **CDN**: Cloudflare
- **Monitoring**: Sentry + Mixpanel

---

## Next Steps

1. **Set up development environment**
2. **Initialize Supabase project**
3. **Create database schema**
4. **Implement authentication flows**
5. **Build onboarding experience**
6. **Develop core features**
7. **Integrate payment system**
8. **Implement verification system**
9. **Add push notifications**
10. **Testing & QA**
11. **App store submission**

---

*Document Version: 1.1 - No Events*
*Last Updated: October 13, 2025*