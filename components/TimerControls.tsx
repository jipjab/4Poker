'use client'

import { LevelJump } from './LevelJump'

interface TimerControlsProps {
  isRunning: boolean
  isPaused: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onReset: () => void
  onNextLevel?: () => void
  onPreviousLevel?: () => void
  canGoNext?: boolean
  canGoPrevious?: boolean
  onJumpToLevel?: (level: number) => void
  currentLevel?: number
  totalLevels?: number
}

export const TimerControls = ({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onReset,
  onNextLevel,
  onPreviousLevel,
  canGoNext = false,
  canGoPrevious = false,
  onJumpToLevel,
  currentLevel,
  totalLevels,
}: TimerControlsProps) => {
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center">
      {!isRunning && !isPaused ? (
        <button
          onClick={onStart}
          onKeyDown={(e) => handleKeyDown(e, onStart)}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Start timer"
          tabIndex={0}
        >
          Start
        </button>
      ) : isPaused ? (
        <button
          onClick={onResume}
          onKeyDown={(e) => handleKeyDown(e, onResume)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Resume timer"
          tabIndex={0}
        >
          Resume
        </button>
      ) : (
        <button
          onClick={onPause}
          onKeyDown={(e) => handleKeyDown(e, onPause)}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          aria-label="Pause timer"
          tabIndex={0}
        >
          Pause
        </button>
      )}

      <button
        onClick={onReset}
        onKeyDown={(e) => handleKeyDown(e, onReset)}
        className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        aria-label="Reset timer"
        tabIndex={0}
      >
        Reset
      </button>

      {onPreviousLevel && canGoPrevious && (
        <button
          onClick={onPreviousLevel}
          onKeyDown={(e) => handleKeyDown(e, onPreviousLevel!)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          aria-label="Previous level"
          tabIndex={0}
        >
          ← Prev
        </button>
      )}

      {onNextLevel && canGoNext && (
        <button
          onClick={onNextLevel}
          onKeyDown={(e) => handleKeyDown(e, onNextLevel!)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          aria-label="Next level"
          tabIndex={0}
        >
          Next →
        </button>
      )}

      {onJumpToLevel && currentLevel !== undefined && totalLevels !== undefined && (
        <LevelJump
          currentLevel={currentLevel}
          totalLevels={totalLevels}
          onJump={onJumpToLevel}
        />
      )}
    </div>
  )
}

