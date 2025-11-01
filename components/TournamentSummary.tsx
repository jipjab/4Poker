'use client'

import type { TournamentConfig } from '@/lib/types'
import { formatTime } from '@/lib/timer'

interface TournamentSummaryProps {
  config: TournamentConfig
  onJumpToLevel?: (level: number) => void
}

export const TournamentSummary = ({ config, onJumpToLevel }: TournamentSummaryProps) => {
  // Check if a level should have a break
  const shouldBreakAtLevel = (levelIndex: number): boolean => {
    if (!config.breakConfig.enabled) return false
    
    const levelNumber = levelIndex + 1 // Convert to 1-based level number
    
    // Check if break is at specific levels
    if (config.breakConfig.specificLevels.includes(levelNumber)) {
      return true
    }
    
    // Check if break is every N levels
    if (config.breakConfig.everyNLevels && levelNumber % config.breakConfig.everyNLevels === 0) {
      return true
    }
    
    return false
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-2 sm:p-3 border border-gray-700 h-full flex flex-col justify-between">
      <h3 className="text-sm sm:text-base font-bold text-white mb-2 pb-1 border-b border-gray-700 flex-shrink-0">
        Tournament Summary
      </h3>

      <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-1 px-1 text-gray-400 font-semibold">Level</th>
              <th className="text-left py-1 px-1 text-gray-400 font-semibold">Small</th>
              <th className="text-left py-1 px-1 text-gray-400 font-semibold">Big</th>
              <th className="text-left py-1 px-1 text-gray-400 font-semibold">Ante</th>
              <th className="text-left py-1 px-1 text-gray-400 font-semibold">Time</th>
            </tr>
          </thead>
          <tbody>
            {config.blindLevels.map((level, index) => {
              const isBreak = shouldBreakAtLevel(index)
              const isCurrentLevel = index === config.currentLevel
              
              let rowClass = 'border-b border-gray-700/50'
              if (isCurrentLevel && isBreak) {
                rowClass += ' bg-purple-900/40'
              } else if (isCurrentLevel) {
                rowClass += ' bg-blue-900/30'
              } else if (isBreak) {
                rowClass += ' bg-purple-900/20'
              }

              // Add hover and cursor styles if clickable
              if (onJumpToLevel && !isCurrentLevel) {
                rowClass += ' cursor-pointer hover:bg-gray-700/50 transition-colors'
              } else if (onJumpToLevel && isCurrentLevel) {
                rowClass += ' cursor-default'
              }

              const handleRowClick = () => {
                if (onJumpToLevel && !isCurrentLevel) {
                  onJumpToLevel(index)
                }
              }

              const handleKeyDown = (e: React.KeyboardEvent) => {
                if ((e.key === 'Enter' || e.key === ' ') && onJumpToLevel && !isCurrentLevel) {
                  e.preventDefault()
                  onJumpToLevel(index)
                }
              }

              return (
                <tr
                  key={level.level}
                  className={rowClass}
                  onClick={handleRowClick}
                  onKeyDown={handleKeyDown}
                  tabIndex={onJumpToLevel && !isCurrentLevel ? 0 : undefined}
                  aria-label={onJumpToLevel && !isCurrentLevel ? `Jump to level ${level.level}` : undefined}
                  role={onJumpToLevel && !isCurrentLevel ? 'button' : undefined}
                >
                  <td className="py-1 px-1 text-white font-medium">
                    {level.level}
                    {isBreak && <span className="ml-0.5 text-purple-400">⏸</span>}
                  </td>
                  <td className={`py-1 px-1 ${isBreak ? 'text-purple-300' : 'text-gray-300'}`}>
                    {level.smallBlind.toLocaleString()}
                  </td>
                  <td className={`py-1 px-1 ${isBreak ? 'text-purple-300' : 'text-gray-300'}`}>
                    {level.bigBlind.toLocaleString()}
                  </td>
                  <td className={`py-1 px-1 ${isBreak ? 'text-purple-300' : 'text-gray-300'}`}>
                    {level.ante > 0 ? level.ante.toLocaleString() : '-'}
                  </td>
                  <td className={`py-1 px-1 ${isBreak ? 'text-purple-300' : 'text-gray-300'}`}>
                    {formatTime(level.duration)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

