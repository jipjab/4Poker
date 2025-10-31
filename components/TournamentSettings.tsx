'use client'

import { useState, useEffect, useRef } from 'react'
import type { TournamentConfig } from '@/lib/types'
import { BlindLevelsEditor } from './BlindLevelsEditor'
import { DurationPicker } from './DurationPicker'
import { secondsToMinutesAndSeconds, minutesAndSecondsToSeconds } from '@/lib/timeHelpers'
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
  const isInitialMount = useRef(true)
  
  // Convert default duration to minutes and seconds
  const initialDurationParts = secondsToMinutesAndSeconds(config.defaultLevelDuration)
  const [defaultMinutes, setDefaultMinutes] = useState(initialDurationParts.minutes)
  const [defaultSeconds, setDefaultSeconds] = useState(initialDurationParts.seconds)

  // Break configuration state
  const initialBreakDurationParts = secondsToMinutesAndSeconds(config.breakConfig.duration)
  const [breakMinutes, setBreakMinutes] = useState(initialBreakDurationParts.minutes)
  const [breakSeconds, setBreakSeconds] = useState(initialBreakDurationParts.seconds)
  const [breakEveryNLevels, setBreakEveryNLevels] = useState<number | null>(
    config.breakConfig.everyNLevels
  )
  const [specificLevelsInput, setSpecificLevelsInput] = useState<string>(
    config.breakConfig.specificLevels.join(', ')
  )

  const handleUpdate = (updates: Partial<TournamentConfig>) => {
    setLocalConfig((prev) => ({ ...prev, ...updates }))
    setErrors([])
  }

  useEffect(() => {
    const saved = loadCurrentTournament()
    if (saved) {
      setLocalConfig(saved)
      const durationParts = secondsToMinutesAndSeconds(saved.defaultLevelDuration)
      setDefaultMinutes(durationParts.minutes)
      setDefaultSeconds(durationParts.seconds)
      
      const breakDurationParts = secondsToMinutesAndSeconds(saved.breakConfig.duration)
      setBreakMinutes(breakDurationParts.minutes)
      setBreakSeconds(breakDurationParts.seconds)
      setBreakEveryNLevels(saved.breakConfig.everyNLevels)
      setSpecificLevelsInput(saved.breakConfig.specificLevels.join(', '))
    }
    isInitialMount.current = false
  }, [])

  // Update duration when minutes or seconds change (skip on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }
    const totalSeconds = minutesAndSecondsToSeconds(defaultMinutes, defaultSeconds)
    if (totalSeconds > 0 && totalSeconds !== localConfig.defaultLevelDuration) {
      handleUpdate({ defaultLevelDuration: totalSeconds })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultMinutes, defaultSeconds])

  // Update break duration when minutes or seconds change
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }
    const totalSeconds = minutesAndSecondsToSeconds(breakMinutes, breakSeconds)
    if (totalSeconds > 0 && totalSeconds !== localConfig.breakConfig.duration) {
      handleUpdate({
        breakConfig: {
          ...localConfig.breakConfig,
          duration: totalSeconds,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakMinutes, breakSeconds])

  // Update break every N levels
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }
    if (breakEveryNLevels !== localConfig.breakConfig.everyNLevels) {
      handleUpdate({
        breakConfig: {
          ...localConfig.breakConfig,
          everyNLevels: breakEveryNLevels,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakEveryNLevels])

  // Update specific levels
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }
    const parsedLevels = specificLevelsInput
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n) && n > 0)
    const currentLevels = localConfig.breakConfig.specificLevels.sort().join(',')
    const newLevels = parsedLevels.sort().join(',')
    if (currentLevels !== newLevels) {
      handleUpdate({
        breakConfig: {
          ...localConfig.breakConfig,
          specificLevels: parsedLevels,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specificLevelsInput])

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
    <div className="space-y-8 bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
      <div className="flex justify-between items-center pb-4 border-b border-gray-800">
        <h2 className="text-3xl font-bold text-white">Tournament Settings</h2>
        {onClose && (
          <button
            onClick={onClose}
            onKeyDown={(e) => handleKeyDown(e, onClose)}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            aria-label="Close settings"
            tabIndex={0}
          >
            <span className="text-2xl">×</span>
          </button>
        )}
      </div>

      {/* Error Display */}
      {errors.length > 0 && (
        <div className="bg-red-900/30 border-2 border-red-700/50 rounded-xl p-5 backdrop-blur-sm">
          <ul className="list-disc list-inside text-red-300 space-y-2 text-sm">
            {errors.map((error, index) => (
              <li key={index} className="font-medium">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tournament Name */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">
          Tournament Name
        </label>
        <input
          type="text"
          value={localConfig.name}
          onChange={(e) => handleUpdate({ name: e.target.value })}
          className="w-full px-5 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          placeholder="Enter tournament name"
        />
      </div>

      {/* Starting Chips */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">
          Starting Chips
        </label>
        <input
          type="number"
          min="1"
          value={localConfig.startingChips}
          onChange={(e) => handleUpdate({ startingChips: parseInt(e.target.value) || 1000 })}
          className="w-full px-5 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
        />
      </div>

      {/* Default Level Duration */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">
          Default Level Duration
        </label>
        <DurationPicker
          minutes={defaultMinutes}
          seconds={defaultSeconds}
          onMinutesChange={(mins) => setDefaultMinutes(mins)}
          onSecondsChange={(secs) => setDefaultSeconds(secs)}
          compact={false}
        />
        <p className="text-xs text-gray-400 mt-2">
          Total: <span className="font-semibold text-blue-400">{minutesAndSecondsToSeconds(defaultMinutes, defaultSeconds)}</span> seconds
        </p>
      </div>

      {/* Sound Alerts Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
          Sound Alerts
        </label>
        <button
          onClick={() => handleUpdate({ soundAlertsEnabled: !localConfig.soundAlertsEnabled })}
          onKeyDown={(e) =>
            handleKeyDown(e, () => handleUpdate({ soundAlertsEnabled: !localConfig.soundAlertsEnabled }))
          }
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            localConfig.soundAlertsEnabled
              ? 'bg-green-500 shadow-lg shadow-green-500/30'
              : 'bg-gray-700'
          }`}
          aria-label="Toggle sound alerts"
          tabIndex={0}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-300 ${
              localConfig.soundAlertsEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Break Configuration */}
      <div className="space-y-6 bg-gray-800/30 p-6 rounded-xl border border-gray-700">
        <div className="flex items-center justify-between pb-2 border-b border-gray-700">
          <h3 className="text-lg font-bold text-white">Break Configuration</h3>
          <button
            onClick={() =>
              handleUpdate({
                breakConfig: {
                  ...localConfig.breakConfig,
                  enabled: !localConfig.breakConfig.enabled,
                },
              })
            }
            onKeyDown={(e) =>
              handleKeyDown(e, () =>
                handleUpdate({
                  breakConfig: {
                    ...localConfig.breakConfig,
                    enabled: !localConfig.breakConfig.enabled,
                  },
                })
              )
            }
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              localConfig.breakConfig.enabled
                ? 'bg-purple-500 shadow-lg shadow-purple-500/30'
                : 'bg-gray-700'
            }`}
            aria-label="Toggle break configuration"
            tabIndex={0}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-300 ${
                localConfig.breakConfig.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {localConfig.breakConfig.enabled && (
          <div className="space-y-5 pt-2">
            {/* Break Duration */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">
                Break Duration
              </label>
              <DurationPicker
                minutes={breakMinutes}
                seconds={breakSeconds}
                onMinutesChange={(mins) => setBreakMinutes(mins)}
                onSecondsChange={(secs) => setBreakSeconds(secs)}
                compact={false}
              />
              <p className="text-xs text-gray-400 mt-2">
                Total: <span className="font-semibold text-purple-400">{minutesAndSecondsToSeconds(breakMinutes, breakSeconds)}</span> seconds
              </p>
            </div>

            {/* Break Every N Levels */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">
                Break Every N Levels
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={breakEveryNLevels || ''}
                  onChange={(e) => {
                    const val = e.target.value === '' ? null : parseInt(e.target.value)
                    setBreakEveryNLevels(val === 0 ? null : val)
                  }}
                  placeholder="Disabled"
                  className="w-32 px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                />
                <span className="text-sm text-gray-400">
                  {breakEveryNLevels ? `Break every ${breakEveryNLevels} level${breakEveryNLevels > 1 ? 's' : ''}` : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Specific Levels */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">
                Break at Specific Levels
              </label>
              <input
                type="text"
                value={specificLevelsInput}
                onChange={(e) => setSpecificLevelsInput(e.target.value)}
                placeholder="e.g., 3, 6, 9"
                className="w-full px-5 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              />
              <p className="text-xs text-gray-400">
                Enter level numbers separated by commas (e.g., 3, 6, 9)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Blind Structure Templates */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">
          Blind Structure Templates
        </label>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => handleLoadTemplate('default')}
            onKeyDown={(e) => handleKeyDown(e, () => handleLoadTemplate('default'))}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            tabIndex={0}
          >
            Standard
          </button>
          <button
            onClick={() => handleLoadTemplate('turbo')}
            onKeyDown={(e) => handleKeyDown(e, () => handleLoadTemplate('turbo'))}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            tabIndex={0}
          >
            Turbo
          </button>
          <button
            onClick={() => handleLoadTemplate('deepstack')}
            onKeyDown={(e) => handleKeyDown(e, () => handleLoadTemplate('deepstack'))}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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
      <div className="flex gap-3 pt-4 border-t border-gray-800">
        <button
          onClick={handleSave}
          onKeyDown={(e) => handleKeyDown(e, handleSave)}
          className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl shadow-xl shadow-green-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Save tournament settings"
          tabIndex={0}
        >
          Save Tournament
        </button>
      </div>
    </div>
  )
}

