'use client'

import { useReducer, useEffect, useRef, useCallback } from 'react'
import type { TournamentConfig, TimerState, TimerAction } from './types'
import { timerReducer, getCurrentBlindLevel, shouldBreakAtLevel } from './timer'

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
    isBreakActive: false,
    breakTimeRemaining: 0,
  }

  const [state, dispatch] = useReducer(timerReducer, initialState)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const breakIntervalRef = useRef<NodeJS.Timeout | null>(null)
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
    if (state.isRunning && !state.isPaused && !state.isBreakActive) {
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
  }, [state.isRunning, state.isPaused, state.isBreakActive])

  // Break timer tick effect
  useEffect(() => {
    if (state.isBreakActive && state.breakTimeRemaining > 0) {
      breakIntervalRef.current = setInterval(() => {
        dispatch({ type: 'BREAK_TICK' })
      }, 1000)
    } else {
      if (breakIntervalRef.current) {
        clearInterval(breakIntervalRef.current)
        breakIntervalRef.current = null
      }
    }

    return () => {
      if (breakIntervalRef.current) {
        clearInterval(breakIntervalRef.current)
      }
    }
  }, [state.isBreakActive, state.breakTimeRemaining])

  // Handle break timer reaching zero
  useEffect(() => {
    if (state.isBreakActive && state.breakTimeRemaining === 0) {
      // Break ended automatically
      dispatch({ type: 'END_BREAK' })
    }
  }, [state.isBreakActive, state.breakTimeRemaining])

  // Handle timer reaching zero
  useEffect(() => {
    if (state.timeRemaining === 0 && state.isRunning && !state.isPaused && !state.isBreakActive) {
      const nextLevel = state.currentLevel + 1
      if (nextLevel < config.blindLevels.length) {
        const nextBlind = getCurrentBlindLevel(config, nextLevel)
        if (nextBlind) {
          dispatch({ type: 'NEXT_LEVEL' })
          dispatch({ type: 'SET_LEVEL', level: nextLevel, duration: nextBlind.duration })
          
          // Check if break is needed at next level (after advancing)
          // Note: We pause here if break is needed, user can manually start break
          if (shouldBreakAtLevel(config, nextLevel)) {
            dispatch({ type: 'PAUSE' })
          }
        }
      } else {
        // Tournament ended
        dispatch({ type: 'PAUSE' })
        onTimerEnd?.()
      }
    }
  }, [state.timeRemaining, state.isRunning, state.isPaused, state.isBreakActive, state.currentLevel, config, onTimerEnd])

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
    if (level >= 0 && level < config.blindLevels.length && level !== state.currentLevel) {
      const levelBlind = getCurrentBlindLevel(config, level)
      if (levelBlind) {
        // Pause timer when jumping to a level
        if (state.isRunning && !state.isPaused) {
          dispatch({ type: 'PAUSE' })
        }
        // Reset elapsed time and set new level
        dispatch({ type: 'RESET' })
        dispatch({ type: 'SET_LEVEL', level, duration: levelBlind.duration })
      }
    }
  }, [config, state.isRunning, state.isPaused, state.currentLevel])

  const startBreak = useCallback(() => {
    if (config.breakConfig.enabled && !state.isBreakActive) {
      dispatch({ type: 'START_BREAK', duration: config.breakConfig.duration })
    }
  }, [config.breakConfig, state.isBreakActive])

  const endBreak = useCallback(() => {
    if (state.isBreakActive) {
      dispatch({ type: 'END_BREAK' })
    }
  }, [state.isBreakActive])

  return {
    ...state,
    start,
    pause,
    resume,
    reset,
    nextLevel,
    previousLevel,
    setLevel,
    startBreak,
    endBreak,
  }
}

