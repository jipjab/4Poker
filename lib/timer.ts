import type { TimerState, TimerAction, TournamentConfig } from './types'

/**
 * Timer reducer for managing tournament timer state
 */
export const timerReducer = (
  state: TimerState,
  action: TimerAction
): TimerState => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        isRunning: true,
        isPaused: false,
      }
    
    case 'PAUSE':
      return {
        ...state,
        isRunning: false,
        isPaused: true,
      }
    
    case 'RESUME':
      return {
        ...state,
        isRunning: true,
        isPaused: false,
      }
    
    case 'RESET':
      return {
        isRunning: false,
        isPaused: false,
        currentLevel: state.currentLevel,
        timeRemaining: state.timeRemaining,
        totalElapsed: 0,
      }
    
    case 'TICK':
      if (state.timeRemaining > 0) {
        return {
          ...state,
          timeRemaining: state.timeRemaining - 1,
          totalElapsed: state.totalElapsed + 1,
        }
      }
      return state
    
    case 'NEXT_LEVEL':
      return {
        ...state,
        currentLevel: state.currentLevel + 1,
        timeRemaining: state.timeRemaining, // Will be set by parent component via SET_LEVEL
        totalElapsed: 0,
      }
    
    case 'SET_LEVEL':
      return {
        ...state,
        currentLevel: action.level,
        timeRemaining: action.duration ?? state.timeRemaining,
      }
    
    default:
      return state
  }
}

/**
 * Get the current blind level configuration
 */
export const getCurrentBlindLevel = (
  config: TournamentConfig,
  level: number
) => {
  return config.blindLevels[level] || config.blindLevels[0]
}

/**
 * Get the next blind level configuration
 */
export const getNextBlindLevel = (
  config: TournamentConfig,
  currentLevel: number
) => {
  const nextLevel = currentLevel + 1
  return config.blindLevels[nextLevel] || null
}

/**
 * Format time in seconds to MM:SS string
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Get warning state based on time remaining
 * Returns 'normal' when > 30s, 'warning' when <= 30s and > 10s, 'critical' when <= 10s
 */
export const getWarningState = (timeRemaining: number): 'normal' | 'warning' | 'critical' => {
  if (timeRemaining > 30) {
    return 'normal'
  }
  if (timeRemaining > 10) {
    return 'warning'
  }
  return 'critical'
}

