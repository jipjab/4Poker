'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BlindTimer } from '@/components/BlindTimer'
import { TournamentSettings } from '@/components/TournamentSettings'
import type { TournamentConfig } from '@/lib/types'
import { defaultTournamentConfig } from '@/lib/tournamentConfig'
import { loadCurrentTournament, saveCurrentTournament } from '@/lib/storage'

export default function Home() {
  const [config, setConfig] = useState<TournamentConfig>(defaultTournamentConfig)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Load saved tournament on mount
    const saved = loadCurrentTournament()
    if (saved) {
      setConfig(saved)
    }
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

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <Link
            href="/"
            onClick={() => setShowSettings(false)}
            className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
            aria-label="Go to home page"
            tabIndex={0}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              PokerTimer
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-1">
              Free Poker Tournament Timer
            </p>
          </Link>
          <button
            onClick={() => setShowSettings(!showSettings)}
            onKeyDown={(e) => handleKeyDown(e, () => setShowSettings(!showSettings))}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-label={showSettings ? 'Hide settings' : 'Show settings'}
            tabIndex={0}
          >
            {showSettings ? 'Hide Settings' : 'Settings'}
          </button>
        </header>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-8">
            <TournamentSettings
              config={config}
              onSave={handleConfigUpdate}
              onClose={() => setShowSettings(false)}
            />
          </div>
        )}

        {/* Main Timer Display */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
          <BlindTimer config={config} onConfigUpdate={handleConfigUpdate} />
        </div>

        {/* Footer Info */}
        <footer className="mt-8 text-center text-sm text-gray-400">
          <p>
            Tournament: <span className="font-semibold">{config.name}</span> | Starting Chips:{' '}
            <span className="font-semibold">{config.startingChips.toLocaleString()}</span>
          </p>
        </footer>
      </div>
    </main>
  )
}
