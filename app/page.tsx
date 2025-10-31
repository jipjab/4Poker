'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BlindTimer } from '@/components/BlindTimer'
import { TournamentSettings } from '@/components/TournamentSettings'
import { AdPlacement } from '@/components/AdPlacement'
import { FullScreenToggle } from '@/components/FullScreenToggle'
import { LogoTimerChip } from '@/components/Logo'
import type { TournamentConfig } from '@/lib/types'
import { defaultTournamentConfig } from '@/lib/tournamentConfig'
import { loadCurrentTournament, saveCurrentTournament } from '@/lib/storage'

export default function Home() {
  const [config, setConfig] = useState<TournamentConfig>(defaultTournamentConfig)
  const [showSettings, setShowSettings] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    // Load saved tournament on mount
    const saved = loadCurrentTournament()
    if (saved) {
      setConfig(saved)
    }
  }, [])

  // Keyboard shortcut for fullscreen (F11)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // F11 for fullscreen toggle
      if (event.key === 'F11') {
        event.preventDefault()
        const isCurrentlyFullscreen = !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        )
        
        if (isCurrentlyFullscreen) {
          // Exit fullscreen
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen()
          } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen()
          } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen()
          }
        } else {
          // Enter fullscreen
          const element = document.documentElement
          if (element.requestFullscreen) {
            element.requestFullscreen()
          } else if ((element as any).webkitRequestFullscreen) {
            (element as any).webkitRequestFullscreen()
          } else if ((element as any).mozRequestFullScreen) {
            (element as any).mozRequestFullScreen()
          } else if ((element as any).msRequestFullscreen) {
            (element as any).msRequestFullscreen()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleConfigUpdate = (newConfig: TournamentConfig) => {
    setConfig(newConfig)
    saveCurrentTournament(newConfig)
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  // Note: Presentation mode will be handled by BlindTimer component
  // when in fullscreen mode - we don't need a separate timer instance here

  return (
    <main className="min-h-screen p-3 sm:p-4 md:p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <Link
            href="/"
            onClick={() => setShowSettings(false)}
            className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md"
            aria-label="Go to home page"
            tabIndex={0}
          >
            <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-600 rounded-lg">
              {/* Slit border decorative corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-blue-500 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-blue-500 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-blue-500 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-blue-500 rounded-br-lg"></div>
              
              <LogoTimerChip size="md" className="flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  AllInTimer
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-1">
                  Free Poker Tournament Timer
                </p>
              </div>
            </div>
          </Link>
          <div className="flex gap-2 sm:gap-3 items-center">
            <Link
              href="/rules"
              className="px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] sm:min-h-[44px] bg-gray-600 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs sm:text-sm flex items-center justify-center"
              aria-label="View poker rules"
              tabIndex={0}
            >
              Rules
            </Link>
            <Link
              href="/hand-rankings"
              className="px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] sm:min-h-[44px] bg-gray-600 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs sm:text-sm flex items-center justify-center"
              aria-label="View hand rankings"
              tabIndex={0}
            >
              Hand Rankings
            </Link>
            <FullScreenToggle
              onToggle={(fullScreen) => setIsFullScreen(fullScreen)}
              className="flex-1 sm:flex-initial"
            />
            <button
              onClick={() => setShowSettings(!showSettings)}
              onKeyDown={(e) => handleKeyDown(e, () => setShowSettings(!showSettings))}
              className="px-4 py-3 sm:px-4 sm:py-2 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm sm:text-base min-h-[44px] sm:min-h-0 flex items-center justify-center"
              aria-label={showSettings ? 'Hide settings' : 'Show settings'}
              tabIndex={0}
            >
              {showSettings ? 'Hide Settings' : 'Settings'}
            </button>
          </div>
        </header>

        {/* Introduction */}
        <div className="mb-6 sm:mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 via-gray-800/95 to-gray-900 p-6 sm:p-8 border border-gray-700/50 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
          <div className="relative max-w-3xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-3">
                    Welcome to AllInTimer
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    <span className="font-semibold text-white">AllInTimer</span> is a free, professional poker tournament timer that helps you manage blind levels and tournament timing effortlessly.{' '}
              Set up your custom blind structure, configure automatic level progression, and schedule breaks—all in one place.{' '}
              The timer automatically advances through levels, displays current and upcoming blinds, and provides visual and audio warnings as levels approach.{' '}
              <span className="text-gray-400 italic">Perfect for home games, tournaments, and poker clubs.</span> Simply configure your tournament settings, start the timer, and let it run your tournament smoothly.
            </p>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-8">
            <TournamentSettings
              config={config}
              onSave={handleConfigUpdate}
              onClose={() => setShowSettings(false)}
            />
            {/* Ad inside settings - subtle placement */}
            <div className="mt-6">
              <AdPlacement size="rectangle" className="max-w-sm mx-auto" />
            </div>
          </div>
        )}

        {/* Main Content with Optional Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Timer Display */}
          <div className="flex-1 bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
            <BlindTimer 
              config={config} 
              onConfigUpdate={handleConfigUpdate}
              isFullScreen={isFullScreen}
            />
          </div>

          {/* Sidebar Ad - Desktop Only */}
          <aside className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-4">
              <AdPlacement size="sidebar" />
            </div>
          </aside>
        </div>

        {/* Footer Banner Ad */}
        <footer className="mt-8 space-y-4">
          <AdPlacement size="banner" className="max-w-4xl mx-auto" />
          
          {/* Footer Info */}
          <div className="text-center space-y-3 pb-6">
            <div className="text-sm text-gray-400">
              <p>
                Tournament: <span className="font-semibold text-gray-300">{config.name}</span> | Starting Chips:{' '}
                <span className="font-semibold text-gray-300">{config.startingChips.toLocaleString()}</span>
              </p>
            </div>
            
            {/* Copyright */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs sm:text-sm text-gray-500">
                © {new Date().getFullYear()} AllInTimer. All rights reserved.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Free poker tournament timer for home games, tournaments, and poker clubs.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
