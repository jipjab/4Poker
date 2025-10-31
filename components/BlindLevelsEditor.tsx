'use client'

import { useState, useEffect } from 'react'
import type { BlindLevel } from '@/lib/types'
import { DurationPicker } from './DurationPicker'
import { secondsToMinutesAndSeconds, minutesAndSecondsToSeconds } from '@/lib/timeHelpers'

interface BlindLevelsEditorProps {
  blindLevels: BlindLevel[]
  defaultDuration: number
  onChange: (levels: BlindLevel[]) => void
}

export const BlindLevelsEditor = ({
  blindLevels,
  defaultDuration,
  onChange,
}: BlindLevelsEditorProps) => {
  const [levels, setLevels] = useState<BlindLevel[]>(blindLevels)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const handleUpdateLevels = (newLevels: BlindLevel[]) => {
    setLevels(newLevels)
    onChange(newLevels)
  }

  const handleAddLevel = () => {
    const lastLevel = levels[levels.length - 1]
    const newLevel: BlindLevel = {
      level: levels.length + 1,
      smallBlind: lastLevel ? Math.round(lastLevel.smallBlind * 1.5) : 25,
      bigBlind: lastLevel ? Math.round(lastLevel.bigBlind * 1.5) : 50,
      ante: lastLevel && lastLevel.ante > 0 ? Math.round(lastLevel.ante * 1.5) : 0,
      duration: defaultDuration,
    }
    const newLevels = [...levels, newLevel].map((level, index) => ({
      ...level,
      level: index + 1,
    }))
    handleUpdateLevels(newLevels)
  }

  const handleRemoveLevel = (index: number) => {
    if (levels.length <= 1) return
    const newLevels = levels.filter((_, i) => i !== index).map((level, i) => ({
      ...level,
      level: i + 1,
    }))
    handleUpdateLevels(newLevels)
  }

  const handleUpdateLevel = (index: number, field: keyof BlindLevel, value: number) => {
    const newLevels = [...levels]
    newLevels[index] = { ...newLevels[index], [field]: value }
    // Re-number levels
    const renumbered = newLevels.map((level, i) => ({ ...level, level: i + 1 }))
    handleUpdateLevels(renumbered)
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-800">
        <h3 className="text-xl font-bold text-white">
          Blind Levels <span className="text-blue-400">({levels.length})</span>
        </h3>
        <button
          onClick={handleAddLevel}
          onKeyDown={(e) => handleKeyDown(e, handleAddLevel)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Add blind level"
          tabIndex={0}
        >
          + Add Level
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {levels.map((level, index) => (
          <div
            key={index}
            className="bg-gray-800/50 rounded-xl p-5 border-2 border-gray-700 hover:border-gray-600 transition-all duration-200 shadow-lg"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Level
                </label>
                <div className="text-2xl font-bold text-blue-400 bg-gray-900 px-4 py-3 rounded-xl text-center">
                  {level.level}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Small Blind
                </label>
                <input
                  type="number"
                  min="1"
                  value={level.smallBlind}
                  onChange={(e) =>
                    handleUpdateLevel(index, 'smallBlind', parseInt(e.target.value) || 1)
                  }
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Big Blind
                </label>
                <input
                  type="number"
                  min="1"
                  value={level.bigBlind}
                  onChange={(e) =>
                    handleUpdateLevel(index, 'bigBlind', parseInt(e.target.value) || 1)
                  }
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Ante
                </label>
                <input
                  type="number"
                  min="0"
                  value={level.ante}
                  onChange={(e) =>
                    handleUpdateLevel(index, 'ante', parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-600"
                />
              </div>

              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                    Duration
                  </label>
                  <DurationPicker
                    minutes={secondsToMinutesAndSeconds(level.duration).minutes}
                    seconds={secondsToMinutesAndSeconds(level.duration).seconds}
                    onMinutesChange={(mins) => {
                      const secs = secondsToMinutesAndSeconds(level.duration).seconds
                      handleUpdateLevel(index, 'duration', minutesAndSecondsToSeconds(mins, secs))
                    }}
                    onSecondsChange={(secs) => {
                      const mins = secondsToMinutesAndSeconds(level.duration).minutes
                      handleUpdateLevel(index, 'duration', minutesAndSecondsToSeconds(mins, secs))
                    }}
                    compact={true}
                  />
                </div>

                {levels.length > 1 && (
                  <button
                    onClick={() => handleRemoveLevel(index)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleRemoveLevel(index))}
                    className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-bold text-xl shadow-lg shadow-red-500/30 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    aria-label={`Remove level ${level.level}`}
                    tabIndex={0}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

