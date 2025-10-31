'use client'

import { useTheme } from '@/lib/useTheme'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <span className="text-xl">🌙</span>
      ) : theme === 'light' ? (
        <span className="text-xl">☀️</span>
      ) : (
        <span className="text-xl">💻</span>
      )}
    </button>
  )
}

