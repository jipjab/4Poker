'use client'

import { formatTime, getWarningState } from '@/lib/timer'

interface BreakTimerProps {
  timeRemaining: number
  totalDuration: number
  onEndBreak: () => void
}

export const BreakTimer = ({ timeRemaining, totalDuration, onEndBreak }: BreakTimerProps) => {
  const warningState = getWarningState(timeRemaining)
  
  const timerTextColor = 
    warningState === 'critical' ? 'text-red-500' :
    warningState === 'warning' ? 'text-yellow-400' :
    'text-blue-400'
  
  const progressPercentage = totalDuration > 0 
    ? ((totalDuration - timeRemaining) / totalDuration) * 100
    : 0

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-purple-700">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="text-xl sm:text-2xl font-bold text-purple-200 mb-2">
            Break Time
          </div>
          
          <div className={`text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold font-mono transition-colors duration-300 ${timerTextColor}`}>
            {formatTime(timeRemaining)}
          </div>
          
          <div className="text-base sm:text-lg text-purple-300">
            Tournament is paused
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${
            warningState === 'critical' ? 'bg-gradient-to-r from-red-500 to-red-600' :
            warningState === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
            'bg-gradient-to-r from-blue-500 to-indigo-600'
          }`}
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        />
      </div>

      {/* End Break Button */}
      <div className="flex justify-center">
        <button
          onClick={onEndBreak}
          className="px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] sm:min-h-[44px] bg-gradient-to-r from-green-600 to-green-700 active:from-green-500 active:to-green-600 text-white font-bold rounded-xl shadow-xl shadow-green-500/30 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-base sm:text-lg"
          aria-label="End break and resume tournament"
          tabIndex={0}
        >
          End Break & Resume
        </button>
      </div>
    </div>
  )
}

