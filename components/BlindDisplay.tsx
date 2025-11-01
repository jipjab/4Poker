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
    <div className="space-y-2 sm:space-y-3">
      {/* Current Level */}
      <div className="bg-blue-700 rounded-lg p-2 sm:p-3 shadow-lg min-h-[80px] sm:min-h-[90px]">
        <div className="text-center">
          <div className="text-xs font-medium text-blue-100 mb-1">
            Level {levelNumber} of {totalLevels}
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            {currentLevel.smallBlind.toLocaleString()} / {currentLevel.bigBlind.toLocaleString()}
          </div>
          <div className="text-sm text-blue-100 h-5">
            {currentLevel.ante > 0 ? `Ante: ${currentLevel.ante.toLocaleString()}` : '\u00A0'}
          </div>
        </div>
      </div>

      {/* Next Level Preview */}
      {nextLevel && (
        <div className="bg-gray-800 rounded-lg p-2 border-2 border-dashed border-gray-600 min-h-[70px] sm:min-h-[75px]">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-400 mb-1">
              Next Level {nextLevel.level}
            </div>
            <div className="text-lg font-semibold text-gray-200">
              {nextLevel.smallBlind.toLocaleString()} / {nextLevel.bigBlind.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1 h-4">
              {nextLevel.ante > 0 ? `Ante: ${nextLevel.ante.toLocaleString()}` : '\u00A0'}
            </div>
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

