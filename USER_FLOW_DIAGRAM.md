# Tajiri Circle - User Flow Diagram

## 🎬 Complete Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     WELCOME ANIMATION                            │
│                                                                   │
│  Stage 1: Letters appear one by one (2s)                        │
│  "W E L C O M E  T O  T A J I R I  C I R C L E"                │
│                                                                   │
│  Stage 2: Words fall into place (3s)                            │
│  ┌─────────┐                                                     │
│  │ WELCOME │  ← Falls last                                      │
│  │   TO    │  ← Falls third                                     │
│  │ TAJIRI  │  ← Falls second                                    │
│  │ CIRCLE  │  ← Falls first                                     │
│  └─────────┘                                                     │
│                                                                   │
│  Stage 3: Fade out (1.5s)                                       │
│                                                                   │
│  Duration: 6-8 seconds total                                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    MAIN LANDING PAGE                             │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  🔴 RED BANNER                                            │  │
│  │  [TC Logo] Tajiri Circle    [About] [Contact] [🇰🇪 Kenya]│  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────┬──────────────────────────────────┐   │
│  │  LEFT SIDE (50%)     │  RIGHT SIDE (50%)                │   │
│  │                      │                                   │   │
│  │  ┌────────────────┐  │  ┌──────────────────────────┐   │   │
│  │  │                │  │  │  👥 TAJIRI WETU          │   │   │
│  │  │  Hero Image    │  │  │  Personal Finance        │   │   │
│  │  │  + Overlay     │  │  │                          │   │   │
│  │  │                │  │  │  [Sign Up] [Log In]      │   │   │
│  │  └────────────────┘  │  └──────────────────────────┘   │   │
│  │                      │                                   │   │
│  │  "Build Your        │  ┌──────────────────────────┐   │   │
│  │   Financial Future" │  │  🏦 BANK PORTAL          │   │   │
│  │                      │  │  (Dark Theme)            │   │   │
│  │                      │  │                          │   │   │
│  │                      │  │  [Bank Log In]           │   │   │
│  │                      │  └──────────────────────────┘   │   │
│  └──────────────────────┴──────────────────────────────────┘   │
│                                                                   │
│  [50K+ Users] [95% Fraud Detection] [4.8★ Rating]              │
└─────────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
    [Sign Up]            [Log In]            [Bank Log In]
         ↓                    ↓                    ↓
         
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  TAJIRI WETU     │  │  TAJIRI WETU     │  │  BANK LOGIN      │
│  SIGN UP         │  │  LOGIN           │  │                  │
│                  │  │                  │  │  (Dark Theme)    │
│  [TW Logo]       │  │  [TW Logo]       │  │  [🏦 Logo]       │
│                  │  │                  │  │                  │
│  Full Name       │  │  Email/Phone     │  │  Email           │
│  ID/Passport     │  │  Password        │  │  Password        │
│  Phone Number    │  │                  │  │                  │
│  Email           │  │  ┌─────────────┐ │  │  🛡️ Security     │
│                  │  │  │ Token via:  │ │  │  Notice          │
│  ☑ Not a robot   │  │  │ [SMS][Email]│ │  │                  │
│                  │  │  │ [Send Token]│ │  │  [Log In]        │
│  [Sign Up]       │  │  │ [______]    │ │  │                  │
│                  │  │  └─────────────┘ │  │  256-bit SSL     │
│  Already have    │  │                  │  │  PCI Compliant   │
│  account? Log In │  │  [Log In]        │  │                  │
└──────────────────┘  │                  │  └──────────────────┘
         ↓            │  Don't have      │           ↓
         │            │  account? Sign Up│           │
         │            └──────────────────┘           │
         │                     ↓                     │
         └─────────────────────┴─────────────────────┘
                              ↓
                              
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATED VIEWS                           │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐  ┌──────────────────────────────┐
│  TAJIRI WETU DASHBOARD       │  │  BANK DASHBOARD              │
│  (Client Portal)             │  │  (Bank Portal)               │
│                              │  │                              │
│  ┌────────────────────────┐  │  │  ┌────────────────────────┐  │
│  │ Header with Navigation │  │  │  │ Header with Logo       │  │
│  │ [💼 Logo] Tajiri Wetu  │  │  │  │ [🏦 Logo] Bank Portal  │  │
│  │ [Dashboard][Chama]     │  │  │  │                        │  │
│  │ [Fraud][Profile]       │  │  │  │ [Logout]               │  │
│  │ [Logout]               │  │  │  └────────────────────────┘  │
│  └────────────────────────┘  │  │                              │
│                              │  │  ┌────────────────────────┐  │
│  ┌────────────────────────┐  │  │  │ Analytics & Metrics    │  │
│  │ Current Page Content:  │  │  │  │ Loan Applications      │  │
│  │                        │  │  │  │ Portfolio Overview     │  │
│  │ • Dashboard            │  │  │  │ Customer Insights      │  │
│  │ • Digital Chama        │  │  │  └────────────────────────┘  │
│  │ • Fraud Alert Center   │  │  │                              │
│  │ • Profile Page         │  │  └──────────────────────────────┘
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ Mobile Bottom Nav      │  │
│  │ [Home][Chama]          │  │
│  │ [Security][Profile]    │  │
│  └────────────────────────┘  │
└──────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              🤖 FLOATING TAJIRI BOT                              │
│              (Appears on ALL pages after animation)              │
│                                                                   │
│  Position: Fixed bottom-right corner                            │
│  Appearance: Red circular button with chat icon                 │
│  Behavior: Pulsing animation, sparkle on hover                  │
│                                                                   │
│  Tooltips (context-aware):                                      │
│  • Login pages: "Need help logging in?"                         │
│  • Client portal: "Chat with TajiriBot"                         │
│  • Bank portal: "Ask about customer analytics"                  │
│                                                                   │
│  Click to open: Full chat interface in modal                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 User Journey Maps

### Journey 1: New Personal User

```
START
  ↓
[Welcome Animation] (6-8s)
  ↓
[Main Landing Page]
  ↓ Click "Sign Up" under Tajiri Wetu
[Sign Up Form]
  ├─ Enter: Full Name
  ├─ Enter: ID/Passport
  ├─ Enter: Phone Number
  ├─ Enter: Email
  └─ Check: "I am not a robot"
  ↓ Click "Sign Up"
[Processing...] (Loading state)
  ↓
[Dashboard] ✅ LOGGED IN
  ├─ View financial overview
  ├─ Access Digital Chama
  ├─ Check Fraud Alerts
  ├─ Manage Profile
  └─ Chat with Tajiri Bot 🤖
```

### Journey 2: Returning Personal User

```
START
  ↓
[Welcome Animation] (6-8s)
  ↓
[Main Landing Page]
  ↓ Click "Log In" under Tajiri Wetu
[Login Form]
  ├─ Enter: Email or Phone
  ├─ Enter: Password
  ├─ Select: Token via SMS or Email
  ├─ Click: "Send Token"
  ├─ Wait: Token delivery
  └─ Enter: 6-digit token
  ↓ Click "Log In"
[Authenticating...] (Loading state)
  ↓
[Dashboard] ✅ LOGGED IN
  └─ Access all features + Tajiri Bot 🤖
```

### Journey 3: Bank Administrator

```
START
  ↓
[Welcome Animation] (6-8s)
  ↓
[Main Landing Page]
  ↓ Click "Bank Log In"
[Bank Login] (Dark Theme)
  ├─ Enter: Email Address
  ├─ Enter: Password
  └─ View: Security Notice
  ↓ Click "Log In to Bank Portal"
[Authenticating...] (Loading state)
  ↓
[Bank Dashboard] ✅ LOGGED IN
  ├─ View analytics
  ├─ Manage loan applications
  ├─ Monitor portfolio
  └─ Chat with Tajiri Bot 🤖
```

---

## 🔄 State Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    APP STATE MACHINE                          │
└──────────────────────────────────────────────────────────────┘

State: welcome-animation
  ↓ (onComplete after 6-8s)
State: main-landing
  ├─ (onNavigate: 'tajiri-signup')
  │   ↓
  │  State: tajiri-signup
  │    ↓ (onSignup)
  │   State: tajiri-dashboard
  │
  ├─ (onNavigate: 'tajiri-login')
  │   ↓
  │  State: tajiri-login
  │    ↓ (onLogin)
  │   State: tajiri-dashboard
  │
  └─ (onNavigate: 'bank-login')
      ↓
     State: bank-login
       ↓ (onLogin)
      State: bank-dashboard

From any authenticated state:
  ↓ (onLogout)
State: main-landing
```

---

## 📱 Component Hierarchy

```
App (Main Router)
├── WelcomeAnimation
│   └── (Self-contained animation)
│
├── MainLandingPage
│   ├── Header (Red Banner)
│   │   ├── Logo
│   │   ├── About Us
│   │   ├── Contact Us
│   │   └── Country Selector
│   ├── Split Layout
│   │   ├── Left: Hero Image
│   │   └── Right: Action Cards
│   │       ├── Tajiri Wetu Card
│   │       └── Bank Card
│   └── Footer
│
├── TajiriWetuLogin
│   ├── Header
│   ├── Form
│   │   ├── Email/Phone Input
│   │   ├── Password Input
│   │   └── 2FA Section
│   │       ├── Token Method Selector
│   │       ├── Send Token Button
│   │       └── Token Input
│   └── Links (Forgot Password, Sign Up)
│
├── TajiriWetuSignup
│   ├── Header
│   ├── Form
│   │   ├── Full Name Input
│   │   ├── ID/Passport Input
│   │   ├── Phone Input
│   │   ├── Email Input
│   │   └── Robot Checkbox
│   └── Links (Terms, Log In)
│
├── BankLogin
│   ├── Header (Dark Theme)
│   ├── Form
│   │   ├── Email Input
│   │   ├── Password Input
│   │   └── Security Notice
│   └── Security Badges
│
├── Authenticated Views
│   ├── Tajiri Dashboard
│   │   ├── Header with Navigation
│   │   ├── Current Page
│   │   │   ├── Dashboard
│   │   │   ├── Digital Chama
│   │   │   ├── Fraud Alert Center
│   │   │   └── Profile Page
│   │   └── Mobile Bottom Nav
│   │
│   └── Bank Dashboard
│       ├── Header
│       └── Analytics Content
│
└── FloatingTajiriBot (Persistent)
    ├── Floating Button
    └── Chat Modal (when open)
```

---

## 🎨 Visual States

### Loading States
```
┌─────────────────────────────────────┐
│  Button States:                     │
│                                     │
│  Normal:    [Sign Up]               │
│  Hover:     [Sign Up] (brighter)    │
│  Loading:   [⟳ Signing up...]       │
│  Disabled:  [Sign Up] (grayed out)  │
└─────────────────────────────────────┘
```

### Bot States
```
┌─────────────────────────────────────┐
│  Floating Bot:                      │
│                                     │
│  Closed:    [💬] (pulsing)          │
│  Hover:     [💬 ✨] (sparkle)       │
│  Open:      [Full Chat Interface]   │
└─────────────────────────────────────┘
```

---

## 🔐 Security Flow

```
Login Attempt
  ↓
Enter Credentials
  ↓
Select 2FA Method
  ↓
Send Token
  ↓
Receive Token (SMS/Email)
  ↓
Enter Token
  ↓
Verify Token
  ↓
✅ Authenticated
```

---

## 📊 Data Flow

```
User Action
  ↓
Component State Update
  ↓
Form Validation
  ↓
API Call (simulated)
  ↓
Loading State
  ↓
Response Handling
  ↓
State Update
  ↓
UI Update
  ↓
Navigation (if needed)
```

---

This diagram provides a complete visual reference for understanding how the Tajiri Circle application flows from start to finish, including all user paths, component relationships, and state transitions.
