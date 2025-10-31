'use client'

import { useReducer, useEffect, useRef, useCallback } from 'react'
import type { TournamentConfig, TimerState, TimerAction } from './types'
import { timerReducer, getCurrentBlindLevel } from './timer'

interface UseTimerOptions {
  config: TournamentConfig
  onLevelChange?: (level: number) => void
  onTimerEnd?: () => void
}

export const useTimer = ({ config, onLevelChange, onTimerEnd }: UseTimerOptions) => {
  const initialTime = config.blindLevels[config.currentLevel]?.duration || config.defaultLevelDuration
  
  const initialState: TimerState = {
    isRunning: false,
    isPaused: false,
    currentLevel: config.currentLevel,
    timeRemaining: initialTime,
    totalElapsed: 0,
  }

  const [state, dispatch] = useReducer(timerReducer, initialState)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const previousLevelRef = useRef(state.currentLevel)

  // Update time remaining when level changes and timer is not running
  useEffect(() => {
    if (!state.isRunning) {
      const currentBlind = getCurrentBlindLevel(config, state.currentLevel)
      if (currentBlind && state.timeRemaining !== currentBlind.duration) {
        dispatch({ type: 'SET_LEVEL', level: state.currentLevel, duration: currentBlind.duration })
      }
    }
  }, [state.currentLevel, config, state.isRunning, state.timeRemaining])

  // Handle level changes callback
  useEffect(() => {
    if (previousLevelRef.current !== state.currentLevel) {
      onLevelChange?.(state.currentLevel)
    }
    previousLevelRef.current = state.currentLevel
  }, [state.currentLevel, onLevelChange])

  // Timer tick effect
  useEffect(() => {
    if (state.isRunning && !state.isPaused) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK' })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [state.isRunning, state.isPaused])

  // Handle timer reaching zero
  useEffect(() => {
    if (state.timeRemaining === 0 && state.isRunning && !state.isPaused) {
      const nextLevel = state.currentLevel + 1
      if (nextLevel < config.blindLevels.length) {
        const nextBlind = getCurrentBlindLevel(config, nextLevel)
        if (nextBlind) {
          dispatch({ type: 'NEXT_LEVEL' })
          dispatch({ type: 'SET_LEVEL', level: nextLevel, duration: nextBlind.duration })
        }
      } else {
        // Tournament ended
        dispatch({ type: 'PAUSE' })
        onTimerEnd?.()
      }
    }
  }, [state.timeRemaining, state.isRunning, state.isPaused, state.currentLevel, config, onTimerEnd])

  const start = useCallback(() => {
    // Set initial time if needed
    const currentBlind = getCurrentBlindLevel(config, state.currentLevel)
    if (currentBlind && state.timeRemaining === 0) {
      // Set time remaining to current level duration
      dispatch({ type: 'SET_LEVEL', level: state.currentLevel, duration: currentBlind.duration })
    }
    dispatch({ type: 'START' })
  }, [config, state.currentLevel, state.timeRemaining])

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' })
  }, [])

  const resume = useCallback(() => {
    dispatch({ type: 'RESUME' })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
    const currentBlind = getCurrentBlindLevel(config, state.currentLevel)
    if (currentBlind) {
      // Reset to current level's duration
      dispatch({ type: 'SET_LEVEL', level: state.currentLevel, duration: currentBlind.duration })
    }
  }, [config, state.currentLevel])

  const nextLevel = useCallback(() => {
    const nextLevelIndex = state.currentLevel + 1
    if (nextLevelIndex < config.blindLevels.length) {
      const nextBlind = getCurrentBlindLevel(config, nextLevelIndex)
      dispatch({ type: 'NEXT_LEVEL' })
      if (nextBlind) {
        dispatch({ type: 'SET_LEVEL', level: nextLevelIndex, duration: nextBlind.duration })
      }
    }
  }, [state.currentLevel, config])

  const previousLevel = useCallback(() => {
    if (state.currentLevel > 0) {
      const prevLevelIndex = state.currentLevel - 1
      const prevBlind = getCurrentBlindLevel(config, prevLevelIndex)
      if (prevBlind) {
        dispatch({ type: 'SET_LEVEL', level: prevLevelIndex, duration: prevBlind.duration })
      }
    }
  }, [state.currentLevel, config])

  const setLevel = useCallback((level: number) => {
    if (level >= 0 && level < config.blindLevels.length) {
      const levelBlind = getCurrentBlindLevel(config, level)
      if (levelBlind) {
        dispatch({ type: 'SET_LEVEL', level, duration: levelBlind.duration })
      }
    }
  }, [config])

  return {
    ...state,
    start,
    pause,
    resume,
    reset,
    nextLevel,
    previousLevel,
    setLevel,
  }
}

