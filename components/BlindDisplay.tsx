'use client'

import type { BlindLevel } from '@/lib/types'

interface BlindDisplayProps {
  currentLevel: BlindLevel
  nextLevel: BlindLevel | null
  levelNumber: number
  totalLevels: number
}

export const BlindDisplay = ({
  currentLevel,
  nextLevel,
  levelNumber,
  totalLevels,
}: BlindDisplayProps) => {
  return (
    <div className="space-y-6">
      {/* Current Level */}
      <div className="bg-blue-700 rounded-lg p-6 shadow-lg">
        <div className="text-center">
          <div className="text-sm font-medium text-blue-100 mb-2">
            Level {levelNumber} of {totalLevels}
          </div>
          <div className="text-3xl md:text-4xl font-bold text-white mb-3">
            {currentLevel.smallBlind.toLocaleString()} / {currentLevel.bigBlind.toLocaleString()}
          </div>
          {currentLevel.ante > 0 && (
            <div className="text-lg text-blue-100">
              Ante: {currentLevel.ante.toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Next Level Preview */}
      {nextLevel && (
        <div className="bg-gray-800 rounded-lg p-4 border-2 border-dashed border-gray-600">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-400 mb-1">
              Next Level {nextLevel.level}
            </div>
            <div className="text-xl font-semibold text-gray-200">
              {nextLevel.smallBlind.toLocaleString()} / {nextLevel.bigBlind.toLocaleString()}
            </div>
            {nextLevel.ante > 0 && (
              <div className="text-sm text-gray-400 mt-1">
                Ante: {nextLevel.ante.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* End of Tournament */}
      {!nextLevel && (
        <div className="bg-red-900/30 rounded-lg p-4 border-2 border-dashed border-red-700">
          <div className="text-center text-red-300 font-medium">
            Final Level
          </div>
        </div>
      )}
    </div>
  )
}

