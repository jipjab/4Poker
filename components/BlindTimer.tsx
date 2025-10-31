'use client'

import { useTimer } from '@/lib/useTimer'
import { formatTime, getCurrentBlindLevel, getNextBlindLevel, getWarningState, shouldBreakAtLevel } from '@/lib/timer'
import type { TournamentConfig } from '@/lib/types'
import { BlindDisplay } from './BlindDisplay'
import { TimerControls } from './TimerControls'
import { BreakTimer } from './BreakTimer'

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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Timer Display */}
      <div className="text-center">
        <div className={`text-6xl md:text-8xl font-bold font-mono mb-4 transition-colors duration-300 ${timerTextColor}`}>
          {formatTime(timer.timeRemaining)}
        </div>
        <div className="text-lg text-gray-400">
          {timer.isRunning && !timer.isPaused ? 'Running' : timer.isPaused ? 'Paused' : 'Ready'}
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
      />

      {/* Level Progress Indicator */}
      <div className="text-center text-sm text-gray-400">
        Total Time: {formatTime(timer.totalElapsed)}
      </div>
    </div>
  )
}

