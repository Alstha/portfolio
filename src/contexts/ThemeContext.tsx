'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface ThemeColors {
  background: string
  foreground: string
  primary: string
  secondary: string
  accent: string
  accentSecondary: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  border: string
  borderLight: string
}

interface Theme {
  id: string
  name: string
  colors: ThemeColors
}

const themes: Theme[] = [
  {
    id: 'premium-dark',
    name: 'Premium Dark',
    colors: {
      background: '#0a0a0a',
      foreground: '#f8fafc',
      primary: '#1e293b',
      secondary: '#334155',
      accent: '#3b82f6',
      accentSecondary: '#8b5cf6',
      textPrimary: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textMuted: '#64748b',
      border: '#334155',
      borderLight: '#475569',
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    colors: {
      background: '#0f172a',
      foreground: '#f8fafc',
      primary: '#1e3a8a',
      secondary: '#1e40af',
      accent: '#06b6d4',
      accentSecondary: '#0891b2',
      textPrimary: '#e0f2fe',
      textSecondary: '#bae6fd',
      textMuted: '#7dd3fc',
      border: '#1e40af',
      borderLight: '#3b82f6',
    }
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    colors: {
      background: '#064e3b',
      foreground: '#f8fafc',
      primary: '#065f46',
      secondary: '#047857',
      accent: '#10b981',
      accentSecondary: '#059669',
      textPrimary: '#d1fae5',
      textSecondary: '#a7f3d0',
      textMuted: '#6ee7b7',
      border: '#047857',
      borderLight: '#10b981',
    }
  },
  {
    id: 'purple',
    name: 'Purple Royal',
    colors: {
      background: '#1e1b4b',
      foreground: '#f8fafc',
      primary: '#312e81',
      secondary: '#4338ca',
      accent: '#8b5cf6',
      accentSecondary: '#7c3aed',
      textPrimary: '#e9d5ff',
      textSecondary: '#d8b4fe',
      textMuted: '#c084fc',
      border: '#4338ca',
      borderLight: '#6366f1',
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    colors: {
      background: '#451a03',
      foreground: '#f8fafc',
      primary: '#7c2d12',
      secondary: '#ea580c',
      accent: '#f97316',
      accentSecondary: '#fb923c',
      textPrimary: '#fed7aa',
      textSecondary: '#fdba74',
      textMuted: '#fb923c',
      border: '#ea580c',
      borderLight: '#f97316',
    }
  }
]

interface ThemeContextType {
  currentTheme: string
  themes: Theme[]
  setTheme: (themeId: string) => void
  autoCycle: boolean
  setAutoCycle: (enabled: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('premium-dark')
  const [autoCycle, setAutoCycle] = useState(false)
  const [cycleInterval, setCycleInterval] = useState(10) // Default 10 seconds

  const applyTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (!theme) return

    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
    root.setAttribute('data-theme', themeId)
    localStorage.setItem('theme', themeId)
  }

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId)
    applyTheme(themeId)
  }

  const handleAutoCycleChange = (enabled: boolean) => {
    setAutoCycle(enabled)
    localStorage.setItem('autoCycle', enabled.toString())
  }

  // Listen for theme changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        setCurrentTheme(e.newValue)
        applyTheme(e.newValue)
      }
      if (e.key === 'autoCycle') {
        setAutoCycle(e.newValue === 'true')
      }
      if (e.key === 'themeCycleInterval') {
        setCycleInterval(parseInt(e.newValue || '10'))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Listen for custom theme change events
  useEffect(() => {
    const handleThemeEvent = (e: CustomEvent) => {
      const { themeId } = e.detail
      if (themeId && themeId !== currentTheme) {
        setCurrentTheme(themeId)
        applyTheme(themeId)
      }
    }

    window.addEventListener('themeChange', handleThemeEvent as EventListener)
    return () => window.removeEventListener('themeChange', handleThemeEvent as EventListener)
  }, [currentTheme])

  // Listen for cycle interval change events
  useEffect(() => {
    const handleIntervalEvent = (e: CustomEvent) => {
      const { interval } = e.detail
      setCycleInterval(interval)
    }

    window.addEventListener('themeCycleIntervalChange', handleIntervalEvent as EventListener)
    return () => window.removeEventListener('themeCycleIntervalChange', handleIntervalEvent as EventListener)
  }, [])

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'premium-dark'
    const savedAutoCycle = localStorage.getItem('autoCycle') === 'true'
    const savedInterval = localStorage.getItem('themeCycleInterval')
    
    setCurrentTheme(savedTheme)
    setAutoCycle(savedAutoCycle)
    if (savedInterval) {
      setCycleInterval(parseInt(savedInterval))
    }
    applyTheme(savedTheme)
  }, [])

  // Auto-cycle effect with dynamic interval
  useEffect(() => {
    if (!autoCycle) return

    const interval = setInterval(() => {
      const currentIndex = themes.findIndex(theme => theme.id === currentTheme)
      const nextIndex = (currentIndex + 1) % themes.length
      const nextTheme = themes[nextIndex]
      handleThemeChange(nextTheme.id)
    }, cycleInterval * 1000) // Convert seconds to milliseconds

    return () => clearInterval(interval)
  }, [autoCycle, currentTheme, cycleInterval])

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      themes,
      setTheme: handleThemeChange,
      autoCycle,
      setAutoCycle: handleAutoCycleChange
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Function to trigger theme change from anywhere
export function triggerThemeChange(themeId: string) {
  // Dispatch custom event for same-tab communication
  window.dispatchEvent(new CustomEvent('themeChange', { detail: { themeId } }))
  
  // Update localStorage for cross-tab communication
  localStorage.setItem('theme', themeId)
} 