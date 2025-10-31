'use client'

import { formatTime, getCurrentBlindLevel, getWarningState } from '@/lib/timer'
import type { TournamentConfig } from '@/lib/types'

interface PresentationTimerProps {
  config: TournamentConfig
  timeRemaining: number
  isRunning: boolean
  isPaused: boolean
  currentLevel: number
  totalElapsed: number
  isBreakActive?: boolean
  breakTimeRemaining?: number
  onPause?: () => void
  onResume?: () => void
  onStart?: () => void
}

export const PresentationTimer = ({
  config,
  timeRemaining,
  isRunning,
  isPaused,
  currentLevel,
  totalElapsed,
  isBreakActive = false,
  breakTimeRemaining = 0,
  onPause,
  onResume,
  onStart,
}: PresentationTimerProps) => {
  // Show break timer if break is active
  if (isBreakActive) {
    const breakWarningState = getWarningState(breakTimeRemaining)
    const breakTextColor =
      breakWarningState === 'critical'
        ? 'text-red-500'
        : breakWarningState === 'warning'
        ? 'text-yellow-400'
        : 'text-blue-400'

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-200 mb-4">Break Time</h1>
          <p className="text-2xl text-purple-300">Tournament is paused</p>
        </div>

        <div className="text-center mb-12">
          <div className={`text-9xl md:text-[12rem] lg:text-[16rem] font-bold font-mono mb-6 transition-colors duration-300 ${breakTextColor}`}>
            {formatTime(breakTimeRemaining)}
          </div>
        </div>

        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-purple-300 text-center">
          Press <kbd className="px-2 py-1 bg-purple-800 rounded text-purple-100">Esc</kbd> or{' '}
          <kbd className="px-2 py-1 bg-purple-800 rounded text-purple-100">F11</kbd> to exit fullscreen
        </div>
      </div>
    )
  }

  const currentBlind = getCurrentBlindLevel(config, currentLevel)
  const warningState = getWarningState(timeRemaining)

  if (!currentBlind) {
    return null
  }

  const timerTextColor =
    warningState === 'critical'
      ? 'text-red-500'
      : warningState === 'warning'
      ? 'text-yellow-400'
      : 'text-white'

  const progressBarGradient =
    warningState === 'critical'
      ? 'bg-gradient-to-r from-red-500 to-red-600'
      : warningState === 'warning'
      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
      : 'bg-gradient-to-r from-blue-500 to-green-500'

  const progressPercentage =
    currentBlind.duration > 0
      ? ((currentBlind.duration - timeRemaining) / currentBlind.duration) * 100
      : 0

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      {/* Tournament Name */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{config.name}</h1>
        <p className="text-xl text-gray-400">Level {currentLevel + 1} of {config.blindLevels.length}</p>
      </div>

      {/* Main Timer Display */}
      <div className="text-center mb-12">
        <div
          className={`text-9xl md:text-[12rem] lg:text-[16rem] font-bold font-mono mb-6 transition-colors duration-300 ${timerTextColor}`}
        >
          {formatTime(timeRemaining)}
        </div>
        <div className="text-3xl md:text-4xl text-gray-400 font-semibold">
          {isRunning && !isPaused ? 'Running' : isPaused ? 'Paused' : 'Ready'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-12">
        <div className="w-full bg-gray-700 rounded-full h-6 md:h-8 overflow-hidden shadow-2xl">
          <div
            className={`h-full ${progressBarGradient} transition-all duration-1000 ease-linear`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Blind Levels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:gap-16 mb-8 w-full max-w-4xl">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-gray-700">
          <div className="text-center">
            <div className="text-xl md:text-2xl text-gray-400 mb-4 font-semibold uppercase tracking-wide">
              Current Blinds
            </div>
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
              {currentBlind.smallBlind.toLocaleString()} / {currentBlind.bigBlind.toLocaleString()}
            </div>
            {currentBlind.ante > 0 && (
              <div className="text-2xl md:text-3xl text-gray-300 mt-2">
                Ante: {currentBlind.ante.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-gray-700">
          <div className="text-center">
            <div className="text-xl md:text-2xl text-gray-400 mb-4 font-semibold uppercase tracking-wide">
              Total Time
            </div>
            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
              {formatTime(totalElapsed)}
            </div>
            <div className="text-lg md:text-xl text-gray-300 mt-2">
              Elapsed
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 mb-8">
        {!isRunning ? (
          onStart && (
            <button
              onClick={onStart}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl shadow-xl shadow-green-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-2xl md:text-3xl"
              aria-label="Start timer"
              tabIndex={0}
            >
              Start
            </button>
          )
        ) : (
          <>
            {isPaused ? (
              onResume && (
                <button
                  onClick={onResume}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-xl shadow-blue-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-2xl md:text-3xl"
                  aria-label="Resume timer"
                  tabIndex={0}
                >
                  Resume
                </button>
              )
            ) : (
              onPause && (
                <button
                  onClick={onPause}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-xl shadow-xl shadow-yellow-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-2xl md:text-3xl"
                  aria-label="Pause timer"
                  tabIndex={0}
                >
                  Pause
                </button>
              )
            )}
          </>
        )}
      </div>

      {/* Exit Hint */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 text-center">
        Press <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">Esc</kbd> or{' '}
        <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">F11</kbd> to exit fullscreen
      </div>
    </div>
  )
}

