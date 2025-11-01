'use client'

import { formatTime, getCurrentBlindLevel, getWarningState } from '@/lib/timer'
import type { TournamentConfig } from '@/lib/types'
import { LogoTimerChip } from '@/components/Logo'

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
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen()
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen()
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

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
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 p-4 sm:p-8">
        {/* Logo and Title - Top Left (Fullscreen Only) */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
          <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-600 rounded-lg">
            {/* Slit border decorative corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-blue-500 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-blue-500 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-blue-500 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-blue-500 rounded-br-lg"></div>
            
            <LogoTimerChip size="sm" className="flex-shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                AllInTimer
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Free Poker Tournament Timer
              </p>
            </div>
          </div>
        </div>

        {/* Main Centered Content */}
        <div className="flex flex-col items-center justify-center w-full max-w-5xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-200 mb-4">Break Time</h1>
            <p className="text-xl sm:text-2xl text-purple-300">Tournament is paused</p>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <div className={`text-9xl md:text-[12rem] lg:text-[16rem] font-bold font-mono mb-4 transition-colors duration-300 ${breakTextColor}`}>
              {formatTime(breakTimeRemaining)}
            </div>
          </div>
        </div>

        {/* Exit Fullscreen Button and URL - Top Right */}
        <div className="fixed top-4 sm:top-6 right-4 sm:right-6 flex flex-col items-end gap-2 z-10">
          <button
            onClick={exitFullscreen}
            onKeyDown={(e) => handleKeyDown(e, exitFullscreen)}
            className="px-4 py-2 bg-purple-700/80 hover:bg-purple-600 active:bg-purple-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900 flex items-center gap-2 text-sm sm:text-base"
            aria-label="Exit fullscreen"
            tabIndex={0}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="hidden sm:inline">Exit Full Screen</span>
          </button>
          {/* Website URL - Only in fullscreen, more visible */}
          <div className="text-sm sm:text-base text-purple-100 font-semibold bg-purple-800/50 px-3 py-1 rounded-md">
            allintimer.com
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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-8">
      {/* Logo and Title - Top Left (Fullscreen Only) */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
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
      </div>

      {/* Main Centered Content */}
      <div className="flex flex-col items-center justify-center w-full max-w-5xl">
        {/* Tournament Name */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{config.name}</h1>
          <p className="text-lg sm:text-xl text-gray-400">Level {currentLevel + 1} of {config.blindLevels.length}</p>
        </div>

        {/* Main Timer Display - Centered */}
        <div className="text-center mb-6 sm:mb-8">
          <div
            className={`text-9xl md:text-[12rem] lg:text-[16rem] font-bold font-mono mb-4 transition-colors duration-300 ${timerTextColor}`}
          >
            {formatTime(timeRemaining)}
          </div>
          <div className="text-3xl md:text-4xl text-gray-400 font-semibold">
            {isRunning && !isPaused ? 'Running' : isPaused ? 'Paused' : 'Ready'}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-4xl mb-6 sm:mb-8">
          <div className="w-full bg-gray-700 rounded-full h-6 md:h-8 overflow-hidden shadow-2xl">
            <div
              className={`h-full ${progressBarGradient} transition-all duration-1000 ease-linear`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Blind Levels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:gap-16 mb-6 sm:mb-8 w-full max-w-4xl">
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
        <div className="flex flex-col items-center gap-4">
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
      </div>

      {/* Exit Fullscreen Button and URL - Top Right */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-6 flex flex-col items-end gap-2 z-10">
        <button
          onClick={exitFullscreen}
          onKeyDown={(e) => handleKeyDown(e, exitFullscreen)}
          className="px-4 py-2 bg-gray-700/80 hover:bg-gray-600 active:bg-gray-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center gap-2 text-sm sm:text-base"
          aria-label="Exit fullscreen"
          tabIndex={0}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="hidden sm:inline">Exit Full Screen</span>
        </button>
        {/* Website URL - Only in fullscreen, more visible */}
        <div className="text-sm sm:text-base text-white font-semibold bg-gray-700/50 px-3 py-1 rounded-md">
          allintimer.com
        </div>
      </div>

      {/* Exit Hint */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 text-center">
        Press <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">Esc</kbd> or{' '}
        <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">F11</kbd> to exit fullscreen
      </div>
    </div>
  )
}

