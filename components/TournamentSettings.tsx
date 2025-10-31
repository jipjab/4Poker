'use client'

import { useState, useEffect } from 'react'
import type { TournamentConfig } from '@/lib/types'
import { BlindLevelsEditor } from './BlindLevelsEditor'
import {
  defaultTournamentConfig,
  createDefaultBlindStructure,
  createTurboBlindStructure,
  createDeepStackBlindStructure,
  validateTournamentConfig,
} from '@/lib/tournamentConfig'
import { saveTournamentConfig, getAllTournamentConfigs, loadCurrentTournament } from '@/lib/storage'

interface TournamentSettingsProps {
  config: TournamentConfig
  onSave: (config: TournamentConfig) => void
  onClose?: () => void
}

export const TournamentSettings = ({ config, onSave, onClose }: TournamentSettingsProps) => {
  const [localConfig, setLocalConfig] = useState<TournamentConfig>(config)
  const [errors, setErrors] = useState<string[]>([])
  const [showSavedConfigs, setShowSavedConfigs] = useState(false)

  useEffect(() => {
    const saved = loadCurrentTournament()
    if (saved) {
      setLocalConfig(saved)
    }
  }, [])

  const handleUpdate = (updates: Partial<TournamentConfig>) => {
    setLocalConfig((prev) => ({ ...prev, ...updates }))
    setErrors([])
  }

  const handleSave = () => {
    const validation = validateTournamentConfig(localConfig)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    saveTournamentConfig(localConfig)
    onSave(localConfig)
    setErrors([])
    onClose?.()
  }

  const handleLoadTemplate = (template: 'default' | 'turbo' | 'deepstack') => {
    let blindLevels
    switch (template) {
      case 'turbo':
        blindLevels = createTurboBlindStructure()
        break
      case 'deepstack':
        blindLevels = createDeepStackBlindStructure()
        break
      default:
        blindLevels = createDefaultBlindStructure()
    }
    handleUpdate({ blindLevels })
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const savedConfigs = getAllTournamentConfigs()

  return (
    <div className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tournament Settings</h2>
        {onClose && (
          <button
            onClick={onClose}
            onKeyDown={(e) => handleKeyDown(e, onClose)}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="Close settings"
            tabIndex={0}
          >
            ×
          </button>
        )}
      </div>

      {/* Error Display */}
      {errors.length > 0 && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg p-4">
          <ul className="list-disc list-inside text-red-800 dark:text-red-300 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tournament Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tournament Name
        </label>
        <input
          type="text"
          value={localConfig.name}
          onChange={(e) => handleUpdate({ name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter tournament name"
        />
      </div>

      {/* Starting Chips */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Starting Chips
        </label>
        <input
          type="number"
          min="1"
          value={localConfig.startingChips}
          onChange={(e) => handleUpdate({ startingChips: parseInt(e.target.value) || 1000 })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Default Level Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Default Level Duration (seconds)
        </label>
        <input
          type="number"
          min="1"
          value={localConfig.defaultLevelDuration}
          onChange={(e) =>
            handleUpdate({ defaultLevelDuration: parseInt(e.target.value) || 600 })
          }
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sound Alerts Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sound Alerts
        </label>
        <button
          onClick={() => handleUpdate({ soundAlertsEnabled: !localConfig.soundAlertsEnabled })}
          onKeyDown={(e) =>
            handleKeyDown(e, () => handleUpdate({ soundAlertsEnabled: !localConfig.soundAlertsEnabled }))
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            localConfig.soundAlertsEnabled
              ? 'bg-green-600'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
          aria-label="Toggle sound alerts"
          tabIndex={0}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              localConfig.soundAlertsEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Blind Structure Templates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Blind Structure Templates
        </label>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleLoadTemplate('default')}
            onKeyDown={(e) => handleKeyDown(e, () => handleLoadTemplate('default'))}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            tabIndex={0}
          >
            Standard
          </button>
          <button
            onClick={() => handleLoadTemplate('turbo')}
            onKeyDown={(e) => handleKeyDown(e, () => handleLoadTemplate('turbo'))}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            tabIndex={0}
          >
            Turbo
          </button>
          <button
            onClick={() => handleLoadTemplate('deepstack')}
            onKeyDown={(e) => handleKeyDown(e, () => handleLoadTemplate('deepstack'))}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            tabIndex={0}
          >
            Deep Stack
          </button>
        </div>
      </div>

      {/* Blind Levels Editor */}
      <BlindLevelsEditor
        blindLevels={localConfig.blindLevels}
        defaultDuration={localConfig.defaultLevelDuration}
        onChange={(levels) => handleUpdate({ blindLevels: levels })}
      />

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          onKeyDown={(e) => handleKeyDown(e, handleSave)}
          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Save tournament settings"
          tabIndex={0}
        >
          Save Tournament
        </button>
      </div>
    </div>
  )
}

