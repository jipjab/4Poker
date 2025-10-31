# PokerTimer - Poker Tournament Timer Application Plan

## Project Overview

A production-ready Next.js 14 web application that provides a free poker tournament blind timer for poker players and tournament hosts. The application manages customizable blind levels, antes, and tournament timing with auto-advancing levels, making it easy to run smooth poker tournaments.

**Description:** A mobile-friendly poker timer that helps tournament hosts manage blind levels and timing without distractions. Similar to freepokerclock.com, it offers customizable blind structures, visual countdown timers, sound alerts, and supports both free and premium features for professional tournament management.

## Technology Stack

### Core Framework
- **Next.js 14** with App Router
- **TypeScript 5** for type safety
- **React 18** for UI components

### Styling & UI
- **TailwindCSS 3** for utility-first styling
- **Custom CSS** for specific components
- **Responsive design** (mobile, tablet, desktop)

### Data & External Services
- **Client-side state management** - All tournament data managed in React state
- **Local Storage** - Persist tournament configurations locally (free tier)
- **Date/Time Library** - date-fns for time formatting and calculations
- **Audio Library** - use-sound for level change alerts and notifications

### Backend Features (Optional - Pro Tier)
- **Next.js API Routes** for serverless endpoints (Pro: cloud save/load tournament configs)
- **Database** (optional) - Store tournament templates and user preferences (Pro tier)
- **Security headers** (HSTS, XSS protection, etc.)
- **Rate limiting** (if implementing cloud features for Pro tier)

## Application Architecture

### Directory Structure

```
/
├── README.md                     # Main project documentation (living document)
├── .gitignore                    # Git ignore for macOS, Linux, Windows
├── .env.local                    # Local environment variables (gitignored)
├── .env.example                  # Example environment variables
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Lock file (or yarn.lock/pnpm-lock.yaml)
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # TailwindCSS configuration
├── postcss.config.js             # PostCSS configuration
└── LICENSE                        # Project license

/app
├── api/
│   ├── tournament-save/
│   │   └── route.ts             # Optional: Save tournament configs (Pro tier)
│   └── tournament-load/
│       └── route.ts             # Optional: Load saved configs (Pro tier)
├── layout.tsx                   # Root layout with SEO metadata
├── page.tsx                     # Main timer dashboard
├── globals.css                  # Global styles & theme variables
├── icon.tsx                     # Favicon generator
├── apple-icon.tsx              # iOS icon generator
├── robots.ts                    # robots.txt configuration
└── sitemap.ts                   # sitemap.xml configuration

/components
├── BlindTimer.tsx               # Main timer display component
├── BlindLevelsEditor.tsx       # Configure blind structure editor
├── TournamentSettings.tsx       # Tournament setup and configuration
├── BlindDisplay.tsx             # Current and next blinds display
├── TimerControls.tsx            # Start/Pause/Reset controls
├── LevelProgress.tsx            # Visual progress indicator for current level
├── PlayerManagement.tsx         # Pro: Track players, re-buys, knockouts
├── StandingsDisplay.tsx         # Pro: Live standings and payouts
├── ThemeToggle.tsx              # Dark mode toggle
├── Logo.tsx                     # Custom SVG brand logo
├── SoundToggle.tsx              # Enable/disable sound alerts
├── AffiliateLinks.tsx           # Affiliate/referral links
├── AdPlacement.tsx              # Advertisement container
├── SocialShare.tsx              # Social media sharing
└── GoogleAnalytics.tsx          # GA4 integration

/lib
├── timer.ts                     # Timer logic and state management
├── blindCalculations.ts         # Blind level calculations and progression
├── tournamentConfig.ts         # Tournament configuration logic
├── types.ts                     # TypeScript type definitions (BlindLevel, TournamentConfig, etc.)
├── storage.ts                   # Local storage for tournament persistence
├── export.ts                    # Export tournament config (JSON/CSV)
├── useTheme.ts                  # Dark mode hook
└── useTimer.ts                  # Custom hook for timer functionality
```

## Key Features Implemented

### Core Functionality
- **Customizable Blind Levels**: Create and edit blind structures with antes for any tournament format
- **Auto-Advancing Timer**: Automatic progression through blind levels with customizable level durations
- **Current/Next Blinds Display**: Clear display of current level and preview of upcoming blinds
- **Timer Controls**: Start, pause, resume, and reset functionality with precise countdown
- **Sound Alerts**: Audio notifications for level changes, warnings, and important events
- **Mobile-Optimized Interface**: Fully responsive design for phones, tablets, and desktops

### User Experience
- Dark mode with system preference detection
- Fully responsive design (mobile-first approach) - optimized for tournament hosts
- Fast performance with client-side state management (no API calls for core features)
- Tournament export functionality (JSON/CSV) - save and share blind structures
- Loading states and error handling for all interactions
- Accessibility features (ARIA labels, keyboard navigation, screen reader support)
- Smooth animations and transitions for timer updates and level changes
- Visual countdown with progress indicators
- Configurable alert timing (warning before level change)

### SEO & Performance
- Optimized metadata and Open Graph tags
- Semantic HTML structure
- Server-side rendering (SSR)
- robots.txt and sitemap.xml
- Security headers (HSTS, XSS protection, Content Security Policy)
- Rate limiting to prevent abuse
- Image optimization (Next.js Image component)
- Code splitting and lazy loading

### Monetization (Freemium Model)
- **Free Tier**: Core timer functionality, customizable blinds, local storage
- **Pro Tier** (Future): Player management, cloud save/load, live standings, custom themes, audio announcements
- Poker affiliate program integration (poker sites, chip sets, etc.)
- Advertisement placement (SEO-friendly, poker-related ads)
- Multiple display formats (cards, banners, buttons)
- Google Analytics ready with conversion tracking for Pro upgrades

## Configuration

### Environment Variables

Required environment variables:

```bash
# Required - Production environment
NODE_ENV=production

# Required - App URL for metadata
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Not Required - All state managed client-side
# No external APIs needed for MVP
# Optional for Pro tier: Database connection for cloud features
```

Optional environment variables:

```bash
# Optional - Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional - Affiliate IDs
NEXT_PUBLIC_AFFILIATE_ID_1=[YOUR_ID]
NEXT_PUBLIC_AFFILIATE_ID_2=[YOUR_ID]

# Optional - Pro tier database (if implementing cloud features)
DATABASE_URL=[YOUR_DATABASE_URL]

# Optional - Feature flags
NEXT_PUBLIC_ENABLE_PRO_FEATURES=false
NEXT_PUBLIC_ENABLE_CLOUD_SAVE=false
```

### Data Source Configuration
- **Client-Side State Management** - No external data source required
- **Local Storage** - Browser localStorage for tournament persistence
- **Data update frequency**: Real-time (client-side state updates)
- **Rate limits**: N/A (no API calls for MVP)
- **Cost**: $0/month (fully client-side)
- **Production-ready**: Yes - All core features work without external dependencies
- **Optional Pro Features**: Database for cloud save/load (future enhancement)

## Deployment Status

### Production Ready Checklist
- [ ] TypeScript compilation passes
- [ ] ESLint checks pass
- [ ] Production build successful
- [ ] Security headers configured
- [ ] Rate limiting implemented (if Pro tier APIs added)
- [ ] Local storage working for tournament persistence
- [ ] Error handling complete
- [ ] Responsive design verified
- [ ] Dark mode implemented
- [ ] SEO optimized
- [ ] Documentation complete (README.md updated)
- [ ] .gitignore configured for all platforms
- [ ] Environment variables configured
- [ ] Local storage tested across browsers
- [ ] SSL certificate configured
- [ ] Performance testing completed
- [ ] Accessibility audit passed

### Deployment Options
1. **Vercel** (recommended) - Zero-config deployment, automatic SSL
2. **Netlify** - Alternative serverless option, generous free tier
3. **Railway** - Container deployment, easy database integration
4. **DigitalOcean** - VPS hosting with App Platform
5. **AWS Amplify** - AWS infrastructure with full AWS integration
6. **Self-hosted** - Docker or traditional VPS for full control

### Cost Estimate
- **Development**: $0 (local development)
- **Hosting (Free tier)**: $0/month (Vercel/Netlify free tier)
- **Hosting (Paid)**: $5-20/month (custom domain + hosting)
- **Data/API costs**: $0/month (fully client-side, no external APIs)
- **CDN**: Included with most hosting platforms
- **Database (Pro tier)**: $0-5/month (if implementing cloud features)
- **Total minimum**: $0/month (MVP), $5-25/month (with Pro tier database)

## Documentation Structure

Your project should include comprehensive documentation:

### Setup & Deployment
- `README.md` - **Living document** - Project overview, quick start, features, installation, usage, and contribution guide (continuously updated)
- `.gitignore` - Git ignore patterns for macOS, Linux, and Windows
- `QUICK_START.md` - 2-minute setup guide
- `PRODUCTION_DEPLOYMENT.md` - Complete deployment guide
- `DOCKER_DEPLOYMENT.md` - Docker containerization (if applicable)
- `DEPLOYMENT_SSL_GUIDE.md` - SSL configuration
- `env.template` - Environment variables template

### Features & Technical Documentation
- `PROJECT_COMPLETE.md` - Complete feature list
- `PRODUCTION_READY_SUMMARY.md` - Production readiness status
- `OPTIMIZATION_SUMMARY.md` - Performance optimizations
- `API_DOCUMENTATION.md` - API endpoint documentation
- `PERFORMANCE_METRICS.md` - Performance benchmarks

### Monetization (If Applicable)
- `ADVERTISEMENT_SETUP.md` - Ad network integration
- `AFFILIATE_SETUP.md` - Affiliate program setup
- `ANALYTICS_SETUP.md` - Google Analytics configuration

### Design & User Experience
- `DESIGN_SYSTEM.md` - Design tokens and patterns
- `BRANDING_GUIDE.md` - Brand identity guidelines
- `ACCESSIBILITY_GUIDE.md` - Accessibility standards
- `RESPONSIVE_DESIGN.md` - Responsive breakpoints

### Troubleshooting & Maintenance
- `TROUBLESHOOTING.md` - Common issues and solutions
- `DEPENDENCY_WARNINGS.md` - Handling npm deprecation warnings and dependency updates
- `CHANGELOG.md` - Version history (can be integrated into README.md)
- `CONTRIBUTING.md` - Contribution guidelines
- `LICENSE` - Project license
- `.gitignore` - Git ignore patterns (macOS, Linux, Windows)

## Feature Development Phases

### Phase 1 - MVP (Minimum Viable Product)
**Timeline**: [X weeks/months]
**Status**: [Not Started / In Progress / Complete]

- [ ] Timer countdown functionality
- [ ] Blind level management (add/edit/remove)
- [ ] Auto-advance between levels
- [ ] Start/Pause/Reset controls
- [ ] Current/Next blinds display
- [ ] Basic error handling
- [ ] Mobile responsive layout
- [ ] README.md with setup instructions
- [ ] .gitignore file (macOS, Linux, Windows)
- [ ] Initial deployment

### Phase 2 - Enhancement
**Timeline**: [X weeks/months]
**Status**: [Not Started / In Progress / Complete]

- [ ] Sound alerts for level changes
- [ ] Visual warnings before level advance
- [ ] Tournament configuration persistence (local storage)
- [ ] Import/export tournament templates
- [ ] Dark mode implementation
- [ ] Performance optimization
- [ ] Tournament history tracking

### Phase 3 - Polish & Monetization
**Timeline**: [X weeks/months]
**Status**: [Not Started / In Progress / Complete]

- [ ] Animations and micro-interactions for timer
- [ ] SEO optimization for poker tournament keywords
- [ ] Analytics integration (track timer usage, popular blind structures)
- [ ] Affiliate/ad integration (poker sites, chip sets)
- [ ] A/B testing setup for Pro tier conversion
- [ ] Social sharing for tournament results

### Phase 4 - Growth & Scale
**Timeline**: [X weeks/months]
**Status**: [Not Started / In Progress / Complete]

- [ ] Pro tier: Player management (track re-buys, knockouts)
- [ ] Pro tier: Live standings and payout calculations
- [ ] Pro tier: Cloud save/load tournament configs
- [ ] Pro tier: Custom themes and branding
- [ ] Pro tier: Audio announcements (talking host)
- [ ] Mobile app (React Native) for iOS/Android
- [ ] Advanced analytics dashboard
- [ ] User accounts and tournament history

## Key Components Breakdown

### Component 1: BlindTimer
**Purpose**: Main timer display component showing countdown, current level, and controls
**File**: `components/BlindTimer.tsx`
**Props**:
- `tournamentConfig`: TournamentConfig - Current tournament settings
- `isRunning`: boolean - Timer running state
- `onStart`: () => void - Start timer handler
- `onPause`: () => void - Pause timer handler
- `onReset`: () => void - Reset timer handler

**Features**:
- Large, readable countdown display
- Current blind level information
- Visual progress bar for level progress
- Sound alert integration
- Responsive design for mobile and desktop

### Component 2: BlindLevelsEditor
**Purpose**: Allows users to create and edit blind structures with antes
**File**: `components/BlindLevelsEditor.tsx`
**Props**:
- `blindLevels`: BlindLevel[] - Array of blind levels
- `onChange`: (levels: BlindLevel[]) => void - Update handler
- `defaultDuration`: number - Default level duration in seconds

**Features**:
- Add/remove/edit blind levels
- Set small blind, big blind, and ante values
- Configure level duration
- Drag-and-drop reordering
- Import/export blind structures

### Component 3: TournamentSettings
**Purpose**: Tournament configuration panel for setting up game parameters
**File**: `components/TournamentSettings.tsx`
**Props**:
- `config`: TournamentConfig - Tournament configuration
- `onSave`: (config: TournamentConfig) => void - Save handler
- `onLoad`: () => TournamentConfig | null - Load saved config

**Features**:
- Set tournament name and description
- Configure starting chip count
- Set level duration defaults
- Enable/disable sound alerts
- Save/load tournament templates
- Local storage integration

## API Endpoints (Optional - Pro Tier Only)

### Endpoint 1: POST /api/tournament-save
**Purpose**: Save tournament configuration to cloud storage (Pro feature)
**Request Body**:
```json
{
  "userId": "user123",
  "tournamentName": "Weekly Tournament",
  "config": {
    "blindLevels": [...],
    "startingChips": 10000,
    "levelDuration": 600
  }
}
```

**Response**:
```json
{
  "success": true,
  "tournamentId": "tour_123",
  "message": "Tournament saved successfully"
}
```

**Rate Limit**: 10 requests per minute per user
**Authentication**: Required (Pro tier users only)

### Endpoint 2: GET /api/tournament-load
**Purpose**: Load saved tournament configuration from cloud (Pro feature)
**Parameters**:
- `tournamentId` (required): Tournament identifier
- `userId` (required): User identifier

**Response**:
```json
{
  "success": true,
  "tournament": {
    "id": "tour_123",
    "name": "Weekly Tournament",
    "config": {...},
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

**Rate Limit**: 30 requests per minute per user
**Authentication**: Required (Pro tier users only)

**Note**: MVP uses client-side local storage only. API endpoints are optional for future Pro tier features.

## Performance Benchmarks

### Target Metrics
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### Current Performance
- Lighthouse Score: [X]/100 (Performance)
- Lighthouse Score: [X]/100 (Accessibility)
- Lighthouse Score: [X]/100 (Best Practices)
- Lighthouse Score: [X]/100 (SEO)

### Optimization Strategies
- Image optimization with Next.js Image
- Code splitting and lazy loading
- API response caching
- CSS optimization with Tailwind purge
- Font optimization
- Database query optimization (if applicable)

## Security Considerations

### Implemented Security Measures
- [ ] HTTPS/SSL certificate
- [ ] Security headers (HSTS, CSP, X-Frame-Options, etc.)
- [ ] Rate limiting on API endpoints
- [ ] Input validation and sanitization
- [ ] SQL injection prevention (if applicable)
- [ ] XSS protection
- [ ] CSRF tokens (if using forms)
- [ ] Environment variable protection
- [ ] API key rotation strategy
- [ ] Secure authentication (if applicable)

### Security Headers Configuration
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // ... additional headers
];
```

## Testing Strategy

### Unit Tests
- [ ] Component tests with React Testing Library
- [ ] Utility function tests
- [ ] API route tests
- [ ] Custom hook tests

### Integration Tests
- [ ] User flow tests
- [ ] API integration tests
- [ ] Database integration tests (if applicable)

### End-to-End Tests
- [ ] Critical user journeys
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance testing

### Testing Tools
- **Unit Testing**: Jest + React Testing Library
- **E2E Testing**: Playwright or Cypress
- **Performance**: Lighthouse CI
- **Accessibility**: axe-core

## Analytics & Monitoring

### What to Track

**User Behavior**:
- Page views and unique visitors
- Time on site and bounce rate
- Most used features
- User navigation patterns
- Device and browser breakdown

**Performance**:
- API response times
- Error rates and types
- Cache hit rates
- Page load times
- Core Web Vitals

**Business Metrics**:
- Conversion rates (if applicable)
- Affiliate click-through rates
- Ad impressions and clicks
- User retention rate
- Feature adoption rates

### Recommended Tools
- **Google Analytics 4** (free) - User behavior
- **Google Search Console** (free) - SEO performance
- **Vercel Analytics** (free tier) - Performance monitoring
- **Sentry** (free tier) - Error tracking
- **Plausible/Fathom** (paid) - Privacy-focused analytics

## Revenue Potential (If Applicable)

### Conservative Revenue Estimates

| Traffic/Month | Ad Revenue | Affiliate Revenue | Total/Month |
|---------------|------------|-------------------|-------------|
| 1,000 users   | $[X]-[Y]   | $[X]-[Y]          | $[X]-[Y]    |
| 5,000 users   | $[X]-[Y]   | $[X]-[Y]          | $[X]-[Y]    |
| 10,000 users  | $[X]-[Y]   | $[X]-[Y]          | $[X]-[Y]    |
| 50,000 users  | $[X]-[Y]   | $[X]-[Y]          | $[X]-[Y]    |

### Revenue Streams
1. **[Affiliate Program 1]**: [Commission structure]
2. **[Affiliate Program 2]**: [Commission structure]
3. **Display Ads**: Google AdSense or Media.net
4. **Premium Features**: Subscription model (future)
5. **Sponsorships**: Direct partnerships (future)

## Marketing & Growth Strategy

### Launch Strategy
- [ ] Beta testing with initial users
- [ ] Social media presence setup
- [ ] Content marketing plan
- [ ] SEO optimization
- [ ] Email list building
- [ ] Press release/announcement

### Growth Channels
- **Organic Search**: SEO optimization, blog content
- **Social Media**: [Platform 1], [Platform 2], [Platform 3]
- **Communities**: Reddit, Discord, Forums
- **Content Marketing**: Blog posts, tutorials, guides
- **Partnerships**: Collaborate with related services
- **Paid Advertising**: Google Ads, social media ads (when profitable)

### Content Strategy
- Regular blog posts about [topic]
- Tutorial videos and guides
- Case studies and success stories
- Newsletter with valuable insights
- Community engagement

## Support & Maintenance

### Quick Commands
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm run test        # Run tests (if configured)
npm run type-check  # TypeScript type checking
```

### Key File References
- Main page: `app/page.tsx`
- Timer component: `components/BlindTimer.tsx`
- Blind editor: `components/BlindLevelsEditor.tsx`
- Timer logic: `lib/timer.ts`
- Blind calculations: `lib/blindCalculations.ts`
- Type definitions: `lib/types.ts` (BlindLevel, TournamentConfig)
- Local storage: `lib/storage.ts`
- Configuration: `next.config.js`

### Maintenance Tasks
- **Weekly**: Review analytics and error logs
- **Monthly**: Dependency updates (`npm update`)
- **Quarterly**: Security audit and performance review
- **Annually**: Technology stack evaluation

## Future Enhancements

### Short-term (1-3 months)
- [ ] Multiple tournament templates (MTT, STT, turbo, etc.)
- [ ] Break management (scheduled breaks between levels)
- [ ] Color themes customization
- [ ] User feedback implementation and improvements

### Medium-term (3-6 months)
- [ ] Pro tier launch: Player management system
- [ ] Pro tier: Live standings and chip counts
- [ ] Mobile app development (iOS/Android)
- [ ] Tournament sharing via unique URLs

### Long-term (6-12 months)
- [ ] Advanced analytics dashboard for tournament hosts
- [ ] Integration with poker room management systems
- [ ] White-label solution for poker rooms
- [ ] Multi-language support for international tournaments

## Success Metrics

### Launch Criteria
- [ ] All core features implemented
- [ ] No critical bugs
- [ ] Performance benchmarks met
- [ ] Accessibility standards met
- [ ] Documentation complete
- [ ] Beta testing feedback addressed

### 30-Day Success Metrics
- [X] unique visitors
- [X]% bounce rate (lower is better)
- [X] average session duration
- [X] conversion rate (if applicable)

### 90-Day Success Metrics
- [X] unique visitors
- [X]% month-over-month growth
- [X] returning users
- $[X] in revenue (if applicable)

## Team & Responsibilities

### Development Team
- **Frontend Developer**: React/Next.js development
- **Backend Developer**: API and data integration
- **UI/UX Designer**: Design system and user experience
- **QA Engineer**: Testing and quality assurance

### Estimated Time Investment
- **Initial Development**: [X] hours/weeks
- **Testing & QA**: [X] hours/weeks
- **Documentation**: [X] hours
- **Deployment**: [X] hours
- **Ongoing Maintenance**: [X] hours/week

## Resources & References

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Community & Support
- Stack Overflow tag: `pokertimer` or `poker-tournament-timer`
- Documentation and support resources
- Project forums or community channels (if applicable)

### Inspiration & Similar Projects
- [FreePokerClock.com](https://freepokerclock.com/) - Reference for free tier features and user experience
- Poker Timer Pro - Inspiration for Pro tier player management features
- Tournament Director - Learning from established tournament management software

---

## Plan Metadata

**Status**: [Not Started / Planning / In Development / In Testing / Production Ready]
**Version**: 1.0.0
**Framework**: Next.js 14 + TypeScript 5 + React 18
**Last Updated**: [Date]
**Project Start Date**: [Date]
**Target Launch Date**: [Date]

---

## How to Use This Plan

1. **Update dates and status** as you progress through development
2. **Customize sections** based on your specific tournament needs (remove what doesn't apply)
3. **Update the checklist** as you complete items
4. **Keep the plan updated** throughout development
5. **Use this as a living document** that evolves with your project
6. **Share with team members** for alignment
7. **Reference during development** to stay on track
8. **Track MVP vs Pro features** separately in your roadmap

---

## README.md Structure (Living Document)

The README.md should be continuously updated and include:

1. **Project Title & Description** - Clear description of the poker timer application
2. **Features** - Current features (Free tier vs Pro tier clearly marked)
3. **Screenshots/Demo** - Visual representation of the application
4. **Tech Stack** - Technologies used (Next.js, TypeScript, React, TailwindCSS)
5. **Getting Started** - Installation and setup instructions
6. **Usage Guide** - How to use the timer (with examples)
7. **Development** - How to run locally, build, test
8. **Project Structure** - Directory layout overview
9. **Contributing** - Guidelines for contributors
10. **License** - License information
11. **Acknowledgments** - Credits and references
12. **Roadmap** - Upcoming features (keep updated)
13. **Changelog** - Recent changes and versions
14. **Support** - How to get help and contact information
15. **Deployment** - Live site links and deployment info

**Update Frequency:**
- Update with each major feature release
- Update when adding new dependencies
- Update when deployment process changes
- Update changelog section regularly
- Update screenshots when UI changes significantly

## .gitignore Configuration

Create a comprehensive `.gitignore` file covering:

**macOS:**
- `.DS_Store`
- `.AppleDouble`
- `.LSOverride`
- `._*`
- `.Spotlight-V100`
- `.Trashes`

**Linux:**
- `*~`
- `.directory`
- `.Trash-*`

**Windows:**
- `Thumbs.db`
- `ehthumbs.db`
- `Desktop.ini`
- `$RECYCLE.BIN/`

**Node.js/Next.js:**
- `node_modules/`
- `.next/`
- `out/`
- `.env*.local`
- `npm-debug.log*`
- `yarn-debug.log*`
- `yarn-error.log*`
- `.pnpm-debug.log*`

**IDE/Editors:**
- `.vscode/` (except `.vscode/settings.json` if needed)
- `.idea/`
- `*.swp`
- `*.swo`
- `*~`

**Build/Dist:**
- `dist/`
- `build/`
- `.vercel/`
- `.turbo/`

**Testing:**
- `.coverage/`
- `.nyc_output/`

**Misc:**
- `*.log`
- `.cache/`

## Notes

**Poker Timer Specific Considerations:**
- Ensure timer accuracy across different devices and browsers
- Test audio alerts in various browsers (Safari requires user interaction)
- Consider offline functionality for tournament hosts without stable internet
- Mobile-first design is critical - most tournaments run on phones/tablets
- Local storage limits may affect saving many tournament templates
- Sound alerts should be customizable (volume, types of alerts)
- Consider PWA (Progressive Web App) features for app-like experience

**Freemium Strategy:**
- Free tier must be fully functional (no crippled features)
- Pro tier adds value without removing free features
- Focus on tournament host needs for Pro tier (player management, analytics)

**Version Control Best Practices:**
- Keep README.md updated with each release
- Maintain clear commit messages
- Use semantic versioning for releases
- Track issues and feature requests in your project management system
- Use CI/CD pipelines for automated testing and deployment (optional)

**Dependency Management:**
- Update dependencies regularly with `npm outdated` and `npm update`
- Address deprecation warnings in package.json overrides when possible
- Monitor for Next.js updates that resolve ESLint 8 deprecation (Next.js 15+)
- See `DEPENDENCY_WARNINGS.md` for details on handling npm warnings
- Run `npm audit` regularly to check for security vulnerabilities
- Use `package-lock.json` for consistent dependency resolution across environments

