import type { TournamentConfig } from './types'

const STORAGE_KEY = 'pokertimer_configs'
const CURRENT_TOURNAMENT_KEY = 'pokertimer_current'

/**
 * Save tournament configuration to localStorage
 */
export const saveTournamentConfig = (config: TournamentConfig): void => {
  if (typeof window === 'undefined') return
  
  try {
    const configs = getAllTournamentConfigs()
    const existingIndex = configs.findIndex(c => c.name === config.name)
    
    if (existingIndex >= 0) {
      configs[existingIndex] = config
    } else {
      configs.push(config)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configs))
  } catch (error) {
    console.error('Failed to save tournament config:', error)
  }
}

/**
 * Get all saved tournament configurations
 */
export const getAllTournamentConfigs = (): TournamentConfig[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load tournament configs:', error)
    return []
  }
}

/**
 * Get a specific tournament configuration by name
 */
export const getTournamentConfig = (name: string): TournamentConfig | null => {
  const configs = getAllTournamentConfigs()
  return configs.find(c => c.name === name) || null
}

/**
 * Delete a tournament configuration
 */
export const deleteTournamentConfig = (name: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    const configs = getAllTournamentConfigs()
    const filtered = configs.filter(c => c.name !== name)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Failed to delete tournament config:', error)
  }
}

/**
 * Save current tournament state
 */
export const saveCurrentTournament = (config: TournamentConfig): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(CURRENT_TOURNAMENT_KEY, JSON.stringify(config))
  } catch (error) {
    console.error('Failed to save current tournament:', error)
  }
}

/**
 * Load current tournament state
 */
export const loadCurrentTournament = (): TournamentConfig | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(CURRENT_TOURNAMENT_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Failed to load current tournament:', error)
    return null
  }
}

