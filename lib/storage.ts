import type { TournamentConfig, TournamentPreset } from './types'
import { defaultTournamentConfig } from './tournamentConfig'

const STORAGE_KEY = 'pokertimer_configs'
const CURRENT_TOURNAMENT_KEY = 'pokertimer_current'
const PRESETS_KEY = 'pokertimer_presets'

/**
 * Migrate old configs to include breakConfig if missing and force soundAlertsEnabled to false
 */
const migrateConfig = (config: any): TournamentConfig => {
  const migrated: any = { ...config }
  
  // Add breakConfig if missing
  if (!migrated.breakConfig) {
    migrated.breakConfig = defaultTournamentConfig.breakConfig
  }
  
  // Always force soundAlertsEnabled to false (muted by default)
  migrated.soundAlertsEnabled = false
  
  return migrated as TournamentConfig
}

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
    const configs = stored ? JSON.parse(stored) : []
    return configs.map(migrateConfig)
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
    if (!stored) return null
    const config = JSON.parse(stored)
    return migrateConfig(config)
  } catch (error) {
    console.error('Failed to load current tournament:', error)
    return null
  }
}

/**
 * Save a tournament preset
 */
export const saveTournamentPreset = (preset: TournamentPreset): void => {
  if (typeof window === 'undefined') return
  
  try {
    const presets = getAllTournamentPresets()
    const existingIndex = presets.findIndex(p => p.id === preset.id)
    
    if (existingIndex >= 0) {
      presets[existingIndex] = preset
    } else {
      presets.push(preset)
    }
    
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets))
  } catch (error) {
    console.error('Failed to save tournament preset:', error)
  }
}

/**
 * Get all saved tournament presets
 */
export const getAllTournamentPresets = (): TournamentPreset[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(PRESETS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load tournament presets:', error)
    return []
  }
}

/**
 * Get a specific tournament preset by ID
 */
export const getTournamentPreset = (id: string): TournamentPreset | null => {
  const presets = getAllTournamentPresets()
  return presets.find(p => p.id === id) || null
}

/**
 * Delete a tournament preset
 */
export const deleteTournamentPreset = (id: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    const presets = getAllTournamentPresets()
    const filtered = presets.filter(p => p.id !== id)
    localStorage.setItem(PRESETS_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Failed to delete tournament preset:', error)
  }
}

