/**
 * Type definitions for PokerTimer application
 */

export interface BlindLevel {
  level: number
  smallBlind: number
  bigBlind: number
  ante: number
  duration: number // in seconds
}

export interface TournamentConfig {
  name: string
  description?: string
  startingChips: number
  blindLevels: BlindLevel[]
  defaultLevelDuration: number // in seconds
  soundAlertsEnabled: boolean
  currentLevel: number
}

export interface TimerState {
  isRunning: boolean
  isPaused: boolean
  currentLevel: number
  timeRemaining: number // in seconds
  totalElapsed: number // in seconds
}

export type TimerAction = 
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'SET_LEVEL'; level: number; duration?: number }

