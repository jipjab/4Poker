'use client'

import { useState } from 'react'
import type { BlindLevel } from '@/lib/types'

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Blind Levels ({levels.length})
        </h3>
        <button
          onClick={handleAddLevel}
          onKeyDown={(e) => handleKeyDown(e, handleAddLevel)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Add blind level"
          tabIndex={0}
        >
          + Add Level
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {levels.map((level, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-300 dark:border-gray-700"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-center">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Level
                </label>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {level.level}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Small Blind
                </label>
                <input
                  type="number"
                  min="1"
                  value={level.smallBlind}
                  onChange={(e) =>
                    handleUpdateLevel(index, 'smallBlind', parseInt(e.target.value) || 1)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Big Blind
                </label>
                <input
                  type="number"
                  min="1"
                  value={level.bigBlind}
                  onChange={(e) =>
                    handleUpdateLevel(index, 'bigBlind', parseInt(e.target.value) || 1)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ante
                </label>
                <input
                  type="number"
                  min="0"
                  value={level.ante}
                  onChange={(e) =>
                    handleUpdateLevel(index, 'ante', parseInt(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration (sec)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={level.duration}
                    onChange={(e) =>
                      handleUpdateLevel(index, 'duration', parseInt(e.target.value) || 60)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {levels.length > 1 && (
                  <button
                    onClick={() => handleRemoveLevel(index)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleRemoveLevel(index))}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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

