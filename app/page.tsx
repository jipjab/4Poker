'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BlindTimer } from '@/components/BlindTimer'
import { TournamentSettings } from '@/components/TournamentSettings'
import { TournamentSummary } from '@/components/TournamentSummary'
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
      // Merge with defaults and force soundAlertsEnabled to false (muted by default)
      setConfig({
        ...defaultTournamentConfig,
        ...saved,
        soundAlertsEnabled: false, // Always muted by default on load
      })
    }
  }, [])

  // Listen for fullscreen changes to update state
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullScreen(isCurrentlyFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

  // Keyboard shortcut for fullscreen (F11 and Esc)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )

      // Esc key to exit fullscreen
      if (event.key === 'Escape' && isCurrentlyFullscreen) {
        event.preventDefault()
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen()
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen()
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen()
        }
        setIsFullScreen(false)
      }
      // F11 for fullscreen toggle
      else if (event.key === 'F11') {
        event.preventDefault()
        
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
          setIsFullScreen(false)
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
          setIsFullScreen(true)
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

  const handleJumpToLevel = (level: number) => {
    // Update the config - the timer will be updated by BlindTimer component
    // when it receives the updated config via handleConfigUpdate
    const updatedConfig = { ...config, currentLevel: level }
    handleConfigUpdate(updatedConfig)
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
    <main className={`bg-background ${isFullScreen ? 'min-h-screen p-0' : 'h-screen overflow-hidden p-2 sm:p-3 flex flex-col'}`}>
      <div className={`${isFullScreen ? 'max-w-full' : 'max-w-6xl mx-auto flex-1 flex flex-col min-h-0'} w-full`}>
        {/* Header */}
        {!isFullScreen ? (
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 mb-2 flex-shrink-0">
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
              
              <LogoTimerChip size="sm" className="flex-shrink-0" />
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                  <span className="text-white">All</span><span className="text-blue-400">in</span><span className="text-white">Timer</span>
                </h1>
                <p className="text-xs text-gray-400">
                  Free Poker Tournament Timer
                </p>
              </div>
            </div>
          </Link>
          <div className="flex gap-2 sm:gap-3 items-center">
            <Link
              href="/rules"
              className="px-2 sm:px-3 py-1.5 sm:py-2 min-h-[36px] sm:min-h-[40px] bg-gray-600 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs flex items-center justify-center"
              aria-label="View poker rules"
              tabIndex={0}
            >
              Rules
            </Link>
            <Link
              href="/hand-rankings"
              className="px-2 sm:px-3 py-1.5 sm:py-2 min-h-[36px] sm:min-h-[40px] bg-gray-600 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs flex items-center justify-center"
              aria-label="View hand rankings"
              tabIndex={0}
            >
              Hand Rankings
            </Link>
            {!showSettings && (
              <FullScreenToggle
                onToggle={(fullScreen) => setIsFullScreen(fullScreen)}
                className="flex-1 sm:flex-initial"
              />
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              onKeyDown={(e) => handleKeyDown(e, () => setShowSettings(!showSettings))}
              className="px-3 py-1.5 sm:py-2 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs sm:text-sm min-h-[36px] sm:min-h-[40px] flex items-center justify-center"
              aria-label={showSettings ? 'Hide settings' : 'Show settings'}
              tabIndex={0}
            >
              {showSettings ? 'Hide Settings' : 'Settings'}
            </button>
          </div>
        </header>
        ) : (
          /* Fullscreen Header - Only logo, title, and exit button */
          <header className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
            <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-600 rounded-lg">
              {/* Slit border decorative corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-blue-500 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-blue-500 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-blue-500 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-blue-500 rounded-br-lg"></div>
              
              <LogoTimerChip size="sm" className="flex-shrink-0" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">
                  <span className="text-white">All</span><span className="text-blue-400">in</span><span className="text-white">Timer</span>
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                  Free Poker Tournament Timer
                </p>
              </div>
            </div>
          </header>
        )}

        {/* Introduction - Hidden in fullscreen mode */}
        {!isFullScreen && (
          <div className="mb-2 flex-shrink-0">
          <div className="w-full">
            <div className="text-center mb-2">
              <h2 className="text-sm sm:text-base font-bold mb-1 uppercase tracking-wider">
                <span className="text-white">All</span><span className="text-blue-400">in</span><span className="text-white">Timer</span>
              </h2>
              <div className="h-px w-12 mx-auto bg-gradient-to-r from-transparent via-blue-400 to-transparent my-1.5"></div>
              <h3 className="text-xs font-medium text-blue-300 uppercase tracking-wide">
                Professional poker clock among the very best
              </h3>
            </div>
            <div className="w-full text-center px-0">
              <p className="text-xs text-gray-400 leading-tight max-w-4xl mx-auto">
                Free, professional poker tournament timer for managing blind levels and tournament timing.{' '}
                Configure custom blind structures, automatic level progression, breaks, and enjoy smooth tournament management with visual and audio warnings.
              </p>
            </div>
          </div>
        </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-2 flex-shrink-0 max-h-[60vh] overflow-y-auto">
            <TournamentSettings
              config={config}
              onSave={handleConfigUpdate}
              onClose={() => setShowSettings(false)}
            />
          </div>
        )}

        {/* Main Content with Optional Sidebar Layout */}
        {!isFullScreen ? (
          <div className="flex items-center justify-center flex-1 min-h-0 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-stretch lg:items-stretch w-full h-full">
              {/* Main Timer Display */}
              <div className="flex-1 bg-gray-800 rounded-lg shadow-xl p-2 sm:p-3 flex flex-col min-h-0 justify-between">
                <BlindTimer 
                  config={config} 
                  onConfigUpdate={handleConfigUpdate}
                  isFullScreen={isFullScreen}
                  onJumpToLevel={handleJumpToLevel}
                />
              </div>

              {/* Tournament Summary - Desktop Only, aligned with timer */}
              <aside className="hidden lg:block flex-1 min-w-0 flex flex-col">
                <div className="h-full">
                  <TournamentSummary config={config} onJumpToLevel={handleJumpToLevel} />
                </div>
              </aside>
            </div>
          </div>
        ) : (
          /* Fullscreen Timer - No container padding */
          <div className="w-full">
            <BlindTimer 
              config={config} 
              onConfigUpdate={handleConfigUpdate}
              isFullScreen={isFullScreen}
            />
          </div>
        )}

        {/* Footer Banner Ad - Hidden in fullscreen mode */}
        {!isFullScreen && (
          <footer className="mt-2 space-y-1 flex-shrink-0">
            <AdPlacement size="banner" className="max-w-4xl mx-auto" />
            
            {/* Footer Info */}
            <div className="text-center space-y-1 pb-1">
              <div className="text-xs text-gray-400">
                <p>
                  Tournament: <span className="font-semibold text-gray-300">{config.name}</span> | Starting Chips:{' '}
                  <span className="font-semibold text-gray-300">{config.startingChips.toLocaleString()}</span>
                </p>
              </div>
              
              {/* Copyright */}
              <div className="pt-1 border-t border-gray-800">
                <p className="text-xs text-gray-500">
                  © {new Date().getFullYear()} AllInTimer. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </main>
  )
}
