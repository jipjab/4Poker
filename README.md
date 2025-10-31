# PokerTimer - Free Poker Tournament Timer

A modern, mobile-friendly poker tournament blind timer built with Next.js 14, TypeScript, and React. Manage your poker tournaments with customizable blind levels, automatic level progression, and professional tournament management features.

![PokerTimer](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Features

### Free Tier (MVP)
- ✅ **Customizable Blind Levels** - Create and edit blind structures with antes
- ✅ **Auto-Advancing Timer** - Automatic progression through blind levels
- ✅ **Current/Next Blinds Display** - Clear display of current and upcoming levels
- ✅ **Timer Controls** - Start, pause, resume, and reset functionality
- ✅ **Mobile-Optimized** - Fully responsive design for phones, tablets, and desktops
- ✅ **Dark Mode** - System preference detection with manual toggle
- ✅ **Local Storage** - Save tournament configurations locally
- ✅ **Sound Alerts** - Audio notifications for level changes (optional)

### Pro Tier (Coming Soon)
- 🚧 **Player Management** - Track re-buys, knockouts, and player chip counts
- 🚧 **Live Standings** - Real-time tournament standings and payout calculations
- 🚧 **Cloud Save/Load** - Access tournament configs from any device
- 🚧 **Custom Themes** - Personalize your timer with custom colors and branding
- 🚧 **Audio Announcements** - Talking host feature for tournament events
- 🚧 **Advanced Analytics** - Tournament statistics and player performance tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Navigate to project directory (if not already there)
cd /Users/jp.mutuyimana/Documents/Dev/PokerTimer

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
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

1. **Configure Blind Levels**: Click "Edit Blinds" to set up your tournament structure
2. **Set Tournament Settings**: Configure starting chips, level duration, and tournament name
3. **Start Timer**: Click "Start" to begin the tournament timer
4. **Manage Tournament**: Use pause/resume/reset controls as needed
5. **Monitor Progress**: View current level, next blinds, and time remaining

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 18
- **Styling**: TailwindCSS 3
- **State Management**: React Hooks (useState, useEffect)
- **Audio**: use-sound library for alerts
- **Date/Time**: date-fns for time calculations
- **Storage**: Browser localStorage for persistence

## 📁 Project Structure

```
pokertimer/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (Pro tier)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main timer page
├── components/             # React components
│   ├── BlindTimer.tsx     # Main timer display
│   ├── BlindLevelsEditor.tsx
│   ├── TournamentSettings.tsx
│   └── ...
├── lib/                    # Utilities and helpers
│   ├── timer.ts           # Timer logic
│   ├── blindCalculations.ts
│   ├── types.ts           # TypeScript definitions
│   └── storage.ts         # Local storage helpers
├── public/                 # Static assets
├── README.md              # This file
├── DEPENDENCY_WARNINGS.md # Dependency management guide
├── .gitignore             # Git ignore patterns
└── package.json           # Dependencies
```

## ⚠️ Dependency Warnings

When running `npm install`, you may see deprecation warnings for some transitive dependencies (especially ESLint 8 and related packages). These warnings are:

- **Safe to ignore** - They don't affect functionality
- **Expected** - Next.js 14 requires ESLint 8 (ESLint 9 support coming in Next.js 15+)
- **Addressed** - We use package overrides for `rimraf` and `glob` to force newer versions

See [`DEPENDENCY_WARNINGS.md`](./DEPENDENCY_WARNINGS.md) for detailed information about these warnings and how to handle them.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## 📝 Roadmap

### Phase 1 - MVP ✅
- [x] Timer countdown functionality
- [x] Blind level management
- [x] Auto-advance between levels
- [x] Basic controls (start/pause/reset)
- [x] Mobile responsive design

### Phase 2 - Enhancement 🚧
- [ ] Sound alerts implementation
- [ ] Visual warnings before level change
- [ ] Tournament history tracking
- [ ] Import/export tournament templates
- [ ] Dark mode polish

### Phase 3 - Polish & Monetization 📋
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Affiliate program setup
- [ ] Performance optimization

### Phase 4 - Pro Features 🔮
- [ ] Player management system
- [ ] Live standings and payouts
- [ ] Cloud save/load functionality
- [ ] Custom themes
- [ ] Audio announcements

## 🐛 Known Issues

- Audio alerts require user interaction in Safari
- Local storage limits may affect saving many tournament templates
- Timer accuracy may vary slightly across different devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [FreePokerClock.com](https://freepokerclock.com/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)

## 📞 Support

For support and questions, please refer to the documentation or contact the project maintainers.

## 📊 Changelog

### [Unreleased]
- Initial project setup
- MVP features implementation

### [1.0.0] - Coming Soon
- Initial public release
- MVP features complete

---

**Note**: This README is a living document and will be updated regularly as the project evolves. Check back often for the latest information!

Made with ❤️ for the poker community

# PokerTimer
