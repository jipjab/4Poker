'use client'

import { useState, useEffect } from 'react'

interface FullScreenToggleProps {
  onToggle?: (isFullScreen: boolean) => void
  className?: string
}

export const FullScreenToggle = ({ onToggle, className = '' }: FullScreenToggleProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    // Check if document is in fullscreen
    const checkFullscreen = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullScreen(isCurrentlyFullscreen)
      onToggle?.(isCurrentlyFullscreen)
    }

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', checkFullscreen)
    document.addEventListener('webkitfullscreenchange', checkFullscreen)
    document.addEventListener('mozfullscreenchange', checkFullscreen)
    document.addEventListener('MSFullscreenChange', checkFullscreen)

    // Initial check
    checkFullscreen()

    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen)
      document.removeEventListener('webkitfullscreenchange', checkFullscreen)
      document.removeEventListener('mozfullscreenchange', checkFullscreen)
      document.removeEventListener('MSFullscreenChange', checkFullscreen)
    }
  }, [onToggle])

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const requestFullscreen = async () => {
    const element = document.documentElement

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen()
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen()
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen()
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen()
      }
    } catch (error) {
      console.error('Error attempting to enable fullscreen:', error)
    }
  }

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen()
      }
    } catch (error) {
      console.error('Error attempting to exit fullscreen:', error)
    }
  }

  const toggleFullscreen = () => {
    if (isFullScreen) {
      exitFullscreen()
    } else {
      requestFullscreen()
    }
  }

  return (
    <button
      onClick={toggleFullscreen}
      onKeyDown={(e) => handleKeyDown(e, toggleFullscreen)}
      className={`px-4 py-3 sm:py-2 min-h-[48px] sm:min-h-[44px] bg-gray-700 active:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm sm:text-base flex items-center justify-center ${className}`}
      aria-label={isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      title={isFullScreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen (F11)'}
      tabIndex={0}
    >
      {isFullScreen ? (
        <span className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Exit Fullscreen
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
          Fullscreen
        </span>
      )}
    </button>
  )
}

