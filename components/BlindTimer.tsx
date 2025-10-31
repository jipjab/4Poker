'use client'

import { useState, useEffect, useRef } from 'react'
import { useTimer } from '@/lib/useTimer'
import { formatTime, getCurrentBlindLevel, getNextBlindLevel, getWarningState, shouldBreakAtLevel } from '@/lib/timer'
import { useSoundAlerts } from '@/lib/soundAlerts'
import type { TournamentConfig } from '@/lib/types'
import { BlindDisplay } from './BlindDisplay'
import { TimerControls } from './TimerControls'
import { BreakTimer } from './BreakTimer'

interface BlindTimerProps {
  config: TournamentConfig
  onConfigUpdate?: (config: TournamentConfig) => void
}

export const BlindTimer = ({ config, onConfigUpdate }: BlindTimerProps) => {
  const [isMuted, setIsMuted] = useState(false)

  const timer = useTimer({
    config,
    onLevelChange: (level) => {
      if (onConfigUpdate) {
        onConfigUpdate({ ...config, currentLevel: level })
      }
    },
    onTimerEnd: () => {
      // Handle tournament end
      console.log('Tournament ended')
    },
  })

  // Use muted state to override soundAlertsEnabled
  const soundsEnabled = config.soundAlertsEnabled && !isMuted
  const sounds = useSoundAlerts(soundsEnabled)
  const previousTimeRef = useRef(timer.timeRemaining)
  const previousLevelRef = useRef(timer.currentLevel)
  const previousBreakActiveRef = useRef(timer.isBreakActive)

  // Play sounds for timer warnings
  useEffect(() => {
    if (!timer.isRunning || timer.isPaused || timer.isBreakActive) {
      previousTimeRef.current = timer.timeRemaining
      return
    }

    const currentTime = timer.timeRemaining
    const previousTime = previousTimeRef.current

    // Play warning sound at 30 seconds (only once when crossing threshold)
    if (previousTime > 30 && currentTime === 30) {
      sounds.playWarningSound()
    }

    // Play critical sound at 10 seconds (only once when crossing threshold)
    if (previousTime > 10 && currentTime === 10) {
      sounds.playCriticalSound()
    }

    previousTimeRef.current = currentTime
  }, [timer.timeRemaining, timer.isRunning, timer.isPaused, timer.isBreakActive, sounds])

  // Play sound on level change (detect when level advances)
  useEffect(() => {
    // Only play sound when level advances forward (not when jumping backwards or resetting)
    if (previousLevelRef.current !== timer.currentLevel && timer.currentLevel > previousLevelRef.current) {
      sounds.playLevelChangeSound()
    }
    previousLevelRef.current = timer.currentLevel
  }, [timer.currentLevel, sounds])

  // Play sounds for break events
  useEffect(() => {
    if (!previousBreakActiveRef.current && timer.isBreakActive) {
      // Break started
      sounds.playBreakStartSound()
    } else if (previousBreakActiveRef.current && !timer.isBreakActive) {
      // Break ended
      sounds.playBreakEndSound()
    }
    previousBreakActiveRef.current = timer.isBreakActive
  }, [timer.isBreakActive, sounds])

  const handleJumpToLevel = (level: number) => {
    timer.setLevel(level)
    if (onConfigUpdate) {
      onConfigUpdate({ ...config, currentLevel: level })
    }
  }

  const currentBlind = getCurrentBlindLevel(config, timer.currentLevel)
  const nextBlind = getNextBlindLevel(config, timer.currentLevel)

  if (!currentBlind) {
    return (
      <div className="text-center text-red-400">
        <p>No blind levels configured. Please set up your tournament.</p>
      </div>
    )
  }

  // Show break timer if break is active
  if (timer.isBreakActive) {
    return (
      <BreakTimer
        timeRemaining={timer.breakTimeRemaining}
        totalDuration={config.breakConfig.duration}
        onEndBreak={timer.endBreak}
      />
    )
  }

  // Check if break is available at current level
  const breakAvailable = config.breakConfig.enabled && shouldBreakAtLevel(config, timer.currentLevel)

  const progressPercentage =
    currentBlind.duration > 0
      ? ((currentBlind.duration - timer.timeRemaining) / currentBlind.duration) * 100
      : 0

  const warningState = getWarningState(timer.timeRemaining)
  
  // Determine timer text color based on warning state
  const timerTextColor = 
    warningState === 'critical' ? 'text-red-500' :
    warningState === 'warning' ? 'text-yellow-400' :
    'text-white'
  
  // Determine progress bar gradient based on warning state
  const progressBarGradient =
    warningState === 'critical' ? 'bg-gradient-to-r from-red-500 to-red-600' :
    warningState === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
    'bg-gradient-to-r from-blue-500 to-green-500'

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Timer Display */}
      <div className="text-center">
        <div className={`text-6xl md:text-8xl font-bold font-mono mb-4 transition-colors duration-300 ${timerTextColor}`}>
          {formatTime(timer.timeRemaining)}
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="text-lg text-gray-400">
            {timer.isRunning && !timer.isPaused ? 'Running' : timer.isPaused ? 'Paused' : 'Ready'}
          </div>
          {/* Mute Button */}
          {config.soundAlertsEnabled && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              onKeyDown={(e) => handleKeyDown(e, () => setIsMuted(!isMuted))}
              className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                isMuted
                  ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-label={isMuted ? 'Unmute sound alerts' : 'Mute sound alerts'}
              tabIndex={0}
              title={isMuted ? 'Sound alerts muted - Click to unmute' : 'Sound alerts enabled - Click to mute'}
            >
              {isMuted ? (
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
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
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
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${progressBarGradient} transition-all duration-1000 ease-linear`}
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        />
      </div>

      {/* Blind Levels Display */}
      <BlindDisplay
        currentLevel={currentBlind}
        nextLevel={nextBlind}
        levelNumber={timer.currentLevel + 1}
        totalLevels={config.blindLevels.length}
      />

      {/* Break Option */}
      {breakAvailable && !timer.isRunning && (
        <div className="flex justify-center">
          <button
            onClick={timer.startBreak}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-xl shadow-purple-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Start break timer"
            tabIndex={0}
          >
            Start Break
          </button>
        </div>
      )}

      {/* Timer Controls */}
      <TimerControls
        isRunning={timer.isRunning}
        isPaused={timer.isPaused}
        onStart={timer.start}
        onPause={timer.pause}
        onResume={timer.resume}
        onReset={timer.reset}
        onNextLevel={timer.nextLevel}
        onPreviousLevel={timer.previousLevel}
        canGoNext={timer.currentLevel < config.blindLevels.length - 1}
        canGoPrevious={timer.currentLevel > 0}
        onJumpToLevel={handleJumpToLevel}
        currentLevel={timer.currentLevel}
        totalLevels={config.blindLevels.length}
      />

      {/* Level Progress Indicator */}
      <div className="text-center text-sm text-gray-400">
        Total Time: {formatTime(timer.totalElapsed)}
      </div>
    </div>
  )
}

