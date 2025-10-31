'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BlindTimer } from '@/components/BlindTimer'
import { TournamentSettings } from '@/components/TournamentSettings'
import { AdPlacement } from '@/components/AdPlacement'
import { FullScreenToggle } from '@/components/FullScreenToggle'
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
            className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
            aria-label="Go to home page"
            tabIndex={0}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              PokerTimer
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-1">
              Free Poker Tournament Timer
            </p>
          </Link>
          <div className="flex gap-2 sm:gap-3 items-center w-full sm:w-auto">
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
          <div className="text-center text-sm text-gray-400">
            <p>
              Tournament: <span className="font-semibold">{config.name}</span> | Starting Chips:{' '}
              <span className="font-semibold">{config.startingChips.toLocaleString()}</span>
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
