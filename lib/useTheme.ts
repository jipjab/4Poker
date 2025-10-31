'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Check for saved theme preference or default to system
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      setResolvedTheme(systemTheme)
      root.classList.add(systemTheme)
    } else {
      setResolvedTheme(theme)
      root.classList.add(theme)
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return {
    theme,
    resolvedTheme,
    toggleTheme,
    setTheme: setThemeMode,
  }
}

