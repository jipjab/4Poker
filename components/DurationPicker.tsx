'use client'

interface DurationPickerProps {
  minutes: number
  seconds: number
  onMinutesChange: (minutes: number) => void
  onSecondsChange: (seconds: number) => void
  compact?: boolean
}

export const DurationPicker = ({
  minutes,
  seconds,
  onMinutesChange,
  onSecondsChange,
  compact = false,
}: DurationPickerProps) => {
  // Generate options for minutes (0-59)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i)
  const secondOptions = Array.from({ length: 60 }, (_, i) => i)

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const selectClass = compact
    ? 'w-full px-3 py-2.5 bg-gray-800 border-2 border-gray-700 rounded-xl text-white text-sm cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-600'
    : 'w-full px-5 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl text-white cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-600'

  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Min</label>
          <select
            value={minutes}
            onChange={(e) => onMinutesChange(parseInt(e.target.value))}
            onKeyDown={(e) => handleKeyDown(e, () => {})}
            className={selectClass}
            aria-label="Minutes"
            tabIndex={0}
          >
            {minuteOptions.map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Sec</label>
          <select
            value={seconds}
            onChange={(e) => onSecondsChange(parseInt(e.target.value))}
            onKeyDown={(e) => handleKeyDown(e, () => {})}
            className={selectClass}
            aria-label="Seconds"
            tabIndex={0}
          >
            {secondOptions.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Minutes</label>
        <select
          value={minutes}
          onChange={(e) => onMinutesChange(parseInt(e.target.value))}
          onKeyDown={(e) => handleKeyDown(e, () => {})}
          className={selectClass}
          aria-label="Minutes"
          tabIndex={0}
        >
          {minuteOptions.map((min) => (
            <option key={min} value={min}>
              {min}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Seconds</label>
        <select
          value={seconds}
          onChange={(e) => onSecondsChange(parseInt(e.target.value))}
          onKeyDown={(e) => handleKeyDown(e, () => {})}
          className={selectClass}
          aria-label="Seconds"
          tabIndex={0}
        >
          {secondOptions.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

