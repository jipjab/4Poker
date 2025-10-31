import type { TournamentConfig, BlindLevel, TournamentPreset } from './types'

/**
 * Default tournament configuration
 */
export const defaultTournamentConfig: TournamentConfig = {
  name: 'New Tournament',
  description: '',
  startingChips: 10000,
  blindLevels: createDefaultBlindStructure(),
  defaultLevelDuration: 600, // 10 minutes
  soundAlertsEnabled: true,
  currentLevel: 0,
  breakConfig: {
    enabled: false,
    duration: 300, // 5 minutes default
    everyNLevels: 3, // Every 3 levels
    specificLevels: [], // No specific levels by default
  },
}

/**
 * Create a default blind structure (standard tournament progression)
 */
export function createDefaultBlindStructure(): BlindLevel[] {
  const levels: BlindLevel[] = []
  let smallBlind = 25
  let bigBlind = 50
  let ante = 0
  
  // Levels 1-12: Standard progression
  for (let i = 1; i <= 12; i++) {
    levels.push({
      level: i,
      smallBlind,
      bigBlind,
      ante: i >= 6 ? ante : 0, // Antes start at level 6
      duration: 600, // 10 minutes
    })
    
    // Update blinds for next level
    if (i % 3 === 0) {
      smallBlind *= 2
      bigBlind *= 2
      if (ante > 0) ante *= 2
    } else {
      smallBlind = Math.round(smallBlind * 1.5)
      bigBlind = Math.round(bigBlind * 1.5)
      if (ante > 0) ante = Math.round(ante * 1.5)
    }
    
    if (i === 5) ante = smallBlind // Start antes at small blind value
  }
  
  return levels
}

/**
 * Create a turbo tournament structure (shorter levels)
 */
export function createTurboBlindStructure(): BlindLevel[] {
  const standard = createDefaultBlindStructure()
  return standard.map(level => ({
    ...level,
    duration: 300, // 5 minutes for turbo
  }))
}

/**
 * Create a deep stack tournament structure (longer levels)
 */
export function createDeepStackBlindStructure(): BlindLevel[] {
  const standard = createDefaultBlindStructure()
  return standard.map(level => ({
    ...level,
    duration: 1200, // 20 minutes for deep stack
  }))
}

/**
 * Validate tournament configuration
 */
export function validateTournamentConfig(config: TournamentConfig): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (!config.name || config.name.trim() === '') {
    errors.push('Tournament name is required')
  }
  
  if (config.startingChips <= 0) {
    errors.push('Starting chips must be greater than 0')
  }
  
  if (config.blindLevels.length === 0) {
    errors.push('At least one blind level is required')
  }
  
  config.blindLevels.forEach((level, index) => {
    if (level.smallBlind <= 0) {
      errors.push(`Level ${level.level}: Small blind must be greater than 0`)
    }
    if (level.bigBlind <= level.smallBlind) {
      errors.push(`Level ${level.level}: Big blind must be greater than small blind`)
    }
    if (level.ante < 0) {
      errors.push(`Level ${level.level}: Ante cannot be negative`)
    }
    if (level.duration <= 0) {
      errors.push(`Level ${level.level}: Duration must be greater than 0`)
    }
  })
  
  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Create default presets for the tournament library
 */
export function getDefaultPresets(): TournamentPreset[] {
  const standardBlindLevels = createDefaultBlindStructure()
  const turboBlindLevels = createTurboBlindStructure()
  const deepStackBlindLevels = createDeepStackBlindStructure()

  return [
    {
      id: 'preset_standard',
      name: 'Standard Tournament',
      description: 'Classic tournament structure with 10-minute levels',
      isDefault: true,
      createdAt: Date.now(),
      config: {
        ...defaultTournamentConfig,
        name: 'Standard Tournament',
        blindLevels: standardBlindLevels,
        defaultLevelDuration: 600,
      },
    },
    {
      id: 'preset_turbo',
      name: 'Turbo Tournament',
      description: 'Fast-paced tournament with 5-minute levels',
      isDefault: true,
      createdAt: Date.now(),
      config: {
        ...defaultTournamentConfig,
        name: 'Turbo Tournament',
        blindLevels: turboBlindLevels,
        defaultLevelDuration: 300,
      },
    },
    {
      id: 'preset_deepstack',
      name: 'Deep Stack Tournament',
      description: 'Slow tournament with 20-minute levels',
      isDefault: true,
      createdAt: Date.now(),
      config: {
        ...defaultTournamentConfig,
        name: 'Deep Stack Tournament',
        blindLevels: deepStackBlindLevels,
        defaultLevelDuration: 1200,
      },
    },
  ]
}

