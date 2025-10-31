# AllInTimer - Free Poker Tournament Timer

A modern, mobile-friendly poker tournament blind timer built with Next.js 14, TypeScript, and React. Manage your poker tournaments with customizable blind levels, automatic level progression, breaks, and professional tournament management features.

![AllInTimer](https://img.shields.io/badge/Status-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

**Live at**: [allintimer.com](https://allintimer.com)

## 🎯 Features

### Core Timer Features
- ✅ **Customizable Blind Levels** - Create and edit blind structures with antes
- ✅ **Auto-Advancing Timer** - Automatic progression through blind levels
- ✅ **Duration Selection** - Choose level duration in minutes and seconds with modern dropdown selectors
- ✅ **Current/Next Blinds Display** - Clear display of current and upcoming levels
- ✅ **Timer Controls** - Start, pause, resume, and reset functionality
- ✅ **Level Navigation** - Jump to any level, move to previous/next levels
- ✅ **Visual Warnings** - Color-coded timer (white → yellow → red) as time runs out
- ✅ **Progress Indicator** - Visual progress bar showing level completion

### Break Management
- ✅ **Scheduled Breaks** - Configure breaks every N levels or at specific levels
- ✅ **Break Timer** - Dedicated break countdown with visual warnings
- ✅ **Break Duration** - Customizable break duration in minutes and seconds
- ✅ **Auto-Resume** - Automatic transition from break back to tournament

### Display & Presentation
- ✅ **Fullscreen/Presentation Mode** - Large-format display optimized for projectors and screens
- ✅ **Dark Theme** - Modern dark-only theme for reduced eye strain
- ✅ **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- ✅ **Mobile-Friendly** - Touch-optimized buttons and layouts for all screen sizes

### Content & Information
- ✅ **Texas Hold'Em Rules** - Comprehensive rules page with betting rounds and gameplay
- ✅ **Hand Rankings** - Detailed hand rankings page with visual card examples
- ✅ **Visual Card Display** - Large, colorful playing card examples for each hand type

### User Experience
- ✅ **Sound Alerts** - Audio notifications for level changes and warnings (with mute option)
- ✅ **Local Storage** - Automatic saving of tournament configurations
- ✅ **Keyboard Shortcuts** - F11 for fullscreen toggle
- ✅ **Modern UI** - Clean, polished interface with card-based layouts

### SEO & Performance
- ✅ **SEO Optimized** - Comprehensive metadata, Open Graph, and Twitter Cards
- ✅ **Structured Data** - JSON-LD schema for better search visibility
- ✅ **Sitemap & Robots.txt** - Automatic generation for search engines
- ✅ **Page-Specific Metadata** - Unique SEO for each page (home, rules, hand rankings)

### Monetization Ready
- ✅ **Ad Placements** - Strategic ad slots (banner, sidebar, rectangle) without disrupting UX
- ✅ **Future-Ready** - Structure in place for affiliate integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Navigate to project directory
cd /Users/jp.mutuyimana/Documents/Dev/4Poker

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Application URL for metadata and SEO
NEXT_PUBLIC_APP_URL=https://allintimer.com
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

The development server will start on `http://localhost:3000`. Hot reloading is enabled, so changes will reflect automatically.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📖 Usage

### Setting Up a Tournament

1. **Configure Tournament Settings**: Click "Settings" to set tournament name, starting chips, and default level duration
2. **Edit Blind Levels**: Configure your blind structure with small/big blinds and antes
3. **Configure Breaks** (Optional): Set up breaks every N levels or at specific levels
4. **Start Timer**: Click "Start" to begin the tournament timer

### During Tournament

- **Monitor Progress**: View current level, next blinds, time remaining, and total elapsed time
- **Visual Warnings**: Watch for color changes (yellow at 30s, red at 10s) before level ends
- **Control Timer**: Use pause/resume/reset controls as needed
- **Level Navigation**: Jump to any level or move to previous/next levels
- **Start Breaks**: When available, use the "Start Break" button to pause the tournament

### Presentation Mode

- Click the "Fullscreen" button or press F11 to enter presentation mode
- Large, clear display optimized for projectors and TV screens
- Timer controls remain accessible in fullscreen mode

### Reading Rules & Hand Rankings

- Click "Rules" in the navigation to learn Texas Hold'Em basics
- Click "Hand Rankings" to see detailed poker hand rankings with visual examples

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 18
- **Styling**: TailwindCSS 3
- **State Management**: React Hooks (useState, useEffect, useReducer, useCallback)
- **Audio**: use-sound library for alerts
- **Time Management**: Custom timer logic with localStorage persistence
- **SEO**: Next.js Metadata API with structured data

## 📁 Project Structure

```
4Poker/
├── app/                           # Next.js app directory
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── page.tsx                  # Main timer page
│   ├── rules/                    # Texas Hold'Em rules page
│   │   ├── layout.tsx            # Rules page metadata
│   │   └── page.tsx              # Rules content
│   ├── hand-rankings/            # Hand rankings page
│   │   ├── layout.tsx            # Hand rankings metadata
│   │   └── page.tsx              # Hand rankings content
│   ├── globals.css               # Global styles
│   ├── robots.ts                 # robots.txt generator
│   └── sitemap.ts                # sitemap.xml generator
├── components/                    # React components
│   ├── BlindTimer.tsx            # Main timer display
│   ├── BlindDisplay.tsx          # Current/next blinds
│   ├── TimerControls.tsx         # Timer control buttons
│   ├── TournamentSettings.tsx    # Settings panel
│   ├── BlindLevelsEditor.tsx    # Blind structure editor
│   ├── DurationPicker.tsx        # Minutes/seconds selector
│   ├── BreakTimer.tsx            # Break countdown display
│   ├── LevelJump.tsx             # Jump to level selector
│   ├── FullScreenToggle.tsx      # Fullscreen mode toggle
│   ├── PresentationTimer.tsx     # Fullscreen timer display
│   ├── PokerCard.tsx             # Visual card components
│   ├── AdPlacement.tsx           # Advertisement slots
│   ├── Logo.tsx                  # Application logo
│   └── SEO.tsx                   # SEO component
├── lib/                           # Utilities and helpers
│   ├── timer.ts                  # Timer reducer and logic
│   ├── useTimer.ts               # Timer custom hook
│   ├── tournamentConfig.ts       # Default configurations
│   ├── types.ts                  # TypeScript definitions
│   ├── storage.ts                # Local storage helpers
│   ├── soundAlerts.ts            # Sound alert logic
│   ├── timeHelpers.ts            # Time conversion utilities
│   └── useTheme.ts               # Theme management (legacy)
├── public/                        # Static assets
├── .env.local                    # Environment variables (gitignored)
├── README.md                     # This file
├── DEPENDENCY_WARNINGS.md        # Dependency management guide
├── .gitignore                    # Git ignore patterns
└── package.json                  # Dependencies
```

## ⚠️ Dependency Warnings

When running `npm install`, you may see deprecation warnings for some transitive dependencies (especially ESLint 8 and related packages). These warnings are:

- **Safe to ignore** - They don't affect functionality
- **Expected** - Next.js 14 requires ESLint 8 (ESLint 9 support coming in Next.js 15+)
- **Addressed** - We use package overrides for `rimraf` and `glob` to force newer versions

See [`DEPENDENCY_WARNINGS.md`](./DEPENDENCY_WARNINGS.md) for detailed information about these warnings and how to handle them.

## 📝 Completed Features

### Phase 1 - MVP ✅
- [x] Timer countdown functionality
- [x] Blind level management
- [x] Auto-advance between levels
- [x] Basic controls (start/pause/reset)
- [x] Mobile responsive design
- [x] Duration selection (minutes/seconds)
- [x] Modern form inputs and dropdowns

### Phase 2 - Enhancement ✅
- [x] Sound alerts implementation with mute option
- [x] Visual warnings before level change (color-coded)
- [x] Break management (scheduled and manual)
- [x] Level jumps (jump to any level)
- [x] Fullscreen/presentation mode
- [x] Dark mode enforcement
- [x] Modern UI polish

### Phase 3 - Content & SEO ✅
- [x] SEO optimization (metadata, Open Graph, Twitter Cards)
- [x] Structured data (JSON-LD)
- [x] Sitemap and robots.txt
- [x] Texas Hold'Em rules page
- [x] Hand rankings page with visual cards
- [x] Page-specific metadata

### Phase 4 - Branding & UX ✅
- [x] Logo design with slit border
- [x] Consistent navigation across pages
- [x] Advertisement placements
- [x] Mobile-friendly optimizations
- [x] Keyboard shortcuts

## 🔮 Future Enhancements (Pro Tier Ideas)

- [ ] Player management system
- [ ] Live standings and payouts
- [ ] Cloud save/load functionality
- [ ] Custom themes
- [ ] Audio announcements (talking host)
- [ ] Tournament history tracking
- [ ] Import/export tournament templates
- [ ] Advanced analytics

## 🐛 Known Issues

- Audio alerts require user interaction in Safari (browser security)
- Local storage limits may affect saving many tournament templates
- Timer accuracy may vary slightly across different devices/browsers

## 🌐 Domain & Deployment

- **Domain**: [allintimer.com](https://allintimer.com)
- **Environment Variable**: Set `NEXT_PUBLIC_APP_URL` to your domain for proper SEO metadata

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Poker rules verified for accuracy
- Designed for the poker community

## 📞 Support

For support and questions, please refer to the documentation or open an issue on the repository.

## 📊 Changelog

### [1.0.0] - Current Release
- ✅ Complete timer functionality with breaks and level jumps
- ✅ Fullscreen/presentation mode
- ✅ Visual warnings and color-coded timer
- ✅ Texas Hold'Em rules and hand rankings pages
- ✅ SEO optimization and structured data
- ✅ Modern UI with logo and branding
- ✅ Mobile-friendly design
- ✅ Sound alerts with mute option
- ✅ Advertisement placement structure

---

**Note**: This README is a living document and will be updated regularly as the project evolves.

Made with ❤️ for the poker community

# AllInTimer
