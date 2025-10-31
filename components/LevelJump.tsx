'use client'

import { useState } from 'react'

interface LevelJumpProps {
  currentLevel: number
  totalLevels: number
  onJump: (level: number) => void
}

export const LevelJump = ({ currentLevel, totalLevels, onJump }: LevelJumpProps) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(currentLevel + 1)
  const [isOpen, setIsOpen] = useState(false)

  const handleJump = () => {
    const levelIndex = selectedLevel - 1 // Convert to 0-indexed
    if (levelIndex >= 0 && levelIndex < totalLevels && levelIndex !== currentLevel) {
      onJump(levelIndex)
      setIsOpen(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const levelOptions = Array.from({ length: totalLevels }, (_, i) => i + 1)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(!isOpen))}
        className="w-full sm:w-auto px-4 py-3 sm:py-2 min-h-[48px] sm:min-h-[44px] bg-gradient-to-r from-indigo-600 to-purple-600 active:from-indigo-700 active:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
        aria-label="Jump to level"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        Jump to Level
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-64 max-w-sm bg-gray-800 border-2 border-gray-700 rounded-xl shadow-2xl z-20 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                  Select Level
                </label>
                <button
                  onClick={() => setIsOpen(false)}
                  onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(false))}
                  className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
                  aria-label="Close level jump menu"
                  tabIndex={0}
                >
                  <span className="text-xl">×</span>
                </button>
              </div>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                aria-label="Level selection"
                tabIndex={0}
              >
                {levelOptions.map((level) => (
                  <option key={level} value={level}>
                    Level {level} {level === currentLevel + 1 ? '(Current)' : ''}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={handleJump}
                  onKeyDown={(e) => handleKeyDown(e, handleJump)}
                  disabled={selectedLevel - 1 === currentLevel}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={`Jump to level ${selectedLevel}`}
                  tabIndex={0}
                >
                  Jump
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(false))}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Cancel"
                  tabIndex={0}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

