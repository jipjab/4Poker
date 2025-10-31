'use client'

import { useTimer } from '@/lib/useTimer'
import { formatTime, getCurrentBlindLevel, getNextBlindLevel } from '@/lib/timer'
import type { TournamentConfig } from '@/lib/types'
import { BlindDisplay } from './BlindDisplay'
import { TimerControls } from './TimerControls'

interface BlindTimerProps {
  config: TournamentConfig
  onConfigUpdate?: (config: TournamentConfig) => void
}

export const BlindTimer = ({ config, onConfigUpdate }: BlindTimerProps) => {
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

  const currentBlind = getCurrentBlindLevel(config, timer.currentLevel)
  const nextBlind = getNextBlindLevel(config, timer.currentLevel)

  if (!currentBlind) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        <p>No blind levels configured. Please set up your tournament.</p>
      </div>
    )
  }

  const progressPercentage =
    currentBlind.duration > 0
      ? ((currentBlind.duration - timer.timeRemaining) / currentBlind.duration) * 100
      : 0

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Timer Display */}
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-bold font-mono text-gray-900 dark:text-white mb-4">
          {formatTime(timer.timeRemaining)}
        </div>
        <div className="text-lg text-gray-600 dark:text-gray-400">
          {timer.isRunning && !timer.isPaused ? 'Running' : timer.isPaused ? 'Paused' : 'Ready'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-linear"
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
      />

      {/* Level Progress Indicator */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Total Time: {formatTime(timer.totalElapsed)}
      </div>
    </div>
  )
}

