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

export interface BreakConfig {
  enabled: boolean
  duration: number // in seconds
  everyNLevels: number | null // Break every N levels (e.g., every 3 levels)
  specificLevels: number[] // Break at specific level numbers (e.g., [3, 6, 9])
}

export interface TournamentConfig {
  name: string
  description?: string
  startingChips: number
  blindLevels: BlindLevel[]
  defaultLevelDuration: number // in seconds
  soundAlertsEnabled: boolean
  currentLevel: number
  breakConfig: BreakConfig
}

export interface TimerState {
  isRunning: boolean
  isPaused: boolean
  currentLevel: number
  timeRemaining: number // in seconds
  totalElapsed: number // in seconds
  isBreakActive: boolean
  breakTimeRemaining: number // in seconds
}

export type TimerAction = 
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'BREAK_TICK' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'SET_LEVEL'; level: number; duration?: number }
  | { type: 'START_BREAK'; duration: number }
  | { type: 'END_BREAK' }

