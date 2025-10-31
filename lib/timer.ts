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
        timeRemaining: 0, // Will be set by parent component
        totalElapsed: 0,
      }
    
    case 'SET_LEVEL':
      return {
        ...state,
        currentLevel: action.level,
        timeRemaining: 0, // Will be set by parent component
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

