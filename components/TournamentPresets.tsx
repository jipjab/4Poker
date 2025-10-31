'use client'

import { useState } from 'react'
import type { TournamentConfig, TournamentPreset } from '@/lib/types'
import { 
  getAllTournamentPresets, 
  saveTournamentPreset, 
  deleteTournamentPreset 
} from '@/lib/storage'
import { getDefaultPresets } from '@/lib/tournamentConfig'

interface TournamentPresetsProps {
  onLoadPreset: (config: TournamentConfig) => void
  currentConfig: TournamentConfig
}

export const TournamentPresets = ({ onLoadPreset, currentConfig }: TournamentPresetsProps) => {
  const [presets, setPresets] = useState<TournamentPreset[]>(() => {
    const saved = getAllTournamentPresets()
    const defaults = getDefaultPresets()
    // Merge defaults with saved presets (defaults first, then saved)
    const allPresets = [...defaults, ...saved.filter(p => !p.isDefault)]
    return allPresets
  })
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [presetName, setPresetName] = useState('')
  const [presetDescription, setPresetDescription] = useState('')

  const handleSavePreset = () => {
    if (!presetName.trim()) return

    const newPreset: TournamentPreset = {
      id: `preset_${Date.now()}`,
      name: presetName.trim(),
      description: presetDescription.trim() || undefined,
      config: { ...currentConfig, currentLevel: 0 }, // Reset to level 0 for preset
      createdAt: Date.now(),
      isDefault: false,
    }

    saveTournamentPreset(newPreset)
    
    // Refresh presets list
    const saved = getAllTournamentPresets()
    const defaults = getDefaultPresets()
    const allPresets = [...defaults, ...saved.filter(p => !p.isDefault)]
    setPresets(allPresets)
    
    setPresetName('')
    setPresetDescription('')
    setShowSaveDialog(false)
  }

  const handleDeletePreset = (id: string) => {
    if (confirm('Are you sure you want to delete this preset?')) {
      deleteTournamentPreset(id)
      
      // Refresh presets list
      const saved = getAllTournamentPresets()
      const defaults = getDefaultPresets()
      const allPresets = [...defaults, ...saved.filter(p => !p.isDefault)]
      setPresets(allPresets)
    }
  }

  const handleLoadPreset = (preset: TournamentPreset) => {
    onLoadPreset(preset.config)
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const savedPresets = presets.filter(p => !p.isDefault)
  const defaultPresets = presets.filter(p => p.isDefault)

  return (
    <div className="space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Tournament Presets</h3>
        <button
          onClick={() => setShowSaveDialog(!showSaveDialog)}
          onKeyDown={(e) => handleKeyDown(e, () => setShowSaveDialog(!showSaveDialog))}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Save current tournament as preset"
          tabIndex={0}
        >
          + Save Current as Preset
        </button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="bg-gray-900 p-5 rounded-xl border-2 border-gray-700 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">
              Preset Name
            </label>
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name"
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSavePreset()
                } else if (e.key === 'Escape') {
                  setShowSaveDialog(false)
                }
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">
              Description (Optional)
            </label>
            <input
              type="text"
              value={presetDescription}
              onChange={(e) => setPresetDescription(e.target.value)}
              placeholder="Brief description of this preset"
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSavePreset()
                } else if (e.key === 'Escape') {
                  setShowSaveDialog(false)
                }
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSavePreset}
              disabled={!presetName.trim()}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              tabIndex={0}
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false)
                setPresetName('')
                setPresetDescription('')
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              tabIndex={0}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Default Presets */}
      {defaultPresets.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Default Presets
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {defaultPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset)}
                onKeyDown={(e) => handleKeyDown(e, () => handleLoadPreset(preset))}
                className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-900/50 hover:to-indigo-900/50 border-2 border-gray-700 hover:border-blue-700 rounded-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-left group"
                tabIndex={0}
              >
                <div className="font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {preset.name}
                </div>
                {preset.description && (
                  <div className="text-xs text-gray-400">{preset.description}</div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  {preset.config.blindLevels.length} levels • {Math.floor(preset.config.defaultLevelDuration / 60)} min/level
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Saved Presets */}
      {savedPresets.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Your Presets
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {savedPresets.map((preset) => (
              <div
                key={preset.id}
                className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">{preset.name}</div>
                    {preset.description && (
                      <div className="text-xs text-gray-400 mb-2">{preset.description}</div>
                    )}
                    <div className="text-xs text-gray-500">
                      {preset.config.blindLevels.length} levels • {Math.floor(preset.config.defaultLevelDuration / 60)} min/level
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeletePreset(preset.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleDeletePreset(preset.id))}
                    className="ml-2 text-gray-500 hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                    aria-label={`Delete preset ${preset.name}`}
                    tabIndex={0}
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
                <button
                  onClick={() => handleLoadPreset(preset)}
                  onKeyDown={(e) => handleKeyDown(e, () => handleLoadPreset(preset))}
                  className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  tabIndex={0}
                >
                  Load Preset
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {savedPresets.length === 0 && !showSaveDialog && (
        <div className="text-center py-8 text-gray-400">
          <p className="mb-2">No custom presets saved yet.</p>
          <p className="text-sm">Save your current tournament configuration as a preset to reuse it later!</p>
        </div>
      )}
    </div>
  )
}

