'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

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
      background: '#0f172a',
      foreground: '#1e293b',
      primary: '#3b82f6',
      secondary: '#6366f1',
      accent: '#8b5cf6',
      accentSecondary: '#d946ef',
      textPrimary: '#ffffff',
      textSecondary: '#e2e8f0',
      textMuted: '#94a3b8',
      border: '#334155',
      borderLight: '#475569'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    colors: {
      background: '#0f172a',
      foreground: '#1e3a8a',
      primary: '#1e40af',
      secondary: '#06b6d4',
      accent: '#0891b2',
      accentSecondary: '#0ea5e9',
      textPrimary: '#ffffff',
      textSecondary: '#e0f2fe',
      textMuted: '#bae6fd',
      border: '#1e40af',
      borderLight: '#3b82f6'
    }
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    colors: {
      background: '#064e3b',
      foreground: '#065f46',
      primary: '#047857',
      secondary: '#10b981',
      accent: '#059669',
      accentSecondary: '#34d399',
      textPrimary: '#ffffff',
      textSecondary: '#d1fae5',
      textMuted: '#a7f3d0',
      border: '#047857',
      borderLight: '#10b981'
    }
  },
  {
    id: 'purple',
    name: 'Purple Royal',
    colors: {
      background: '#1e1b4b',
      foreground: '#312e81',
      primary: '#4338ca',
      secondary: '#a855f7',
      accent: '#9333ea',
      accentSecondary: '#c084fc',
      textPrimary: '#ffffff',
      textSecondary: '#e9d5ff',
      textMuted: '#d8b4fe',
      border: '#4338ca',
      borderLight: '#6366f1'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    colors: {
      background: '#451a03',
      foreground: '#7c2d12',
      primary: '#9a3412',
      secondary: '#f97316',
      accent: '#ea580c',
      accentSecondary: '#fb923c',
      textPrimary: '#ffffff',
      textSecondary: '#fed7aa',
      textMuted: '#fdba74',
      border: '#9a3412',
      borderLight: '#f97316'
    }
  }
]

interface ThemeContextType {
  currentTheme: string
  themes: Theme[]
  setTheme: (themeId: string) => void
  autoCycle: boolean
  setAutoCycle: (enabled: boolean) => void
  cycleInterval: number
  setCycleInterval: (interval: number) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('premium-dark')
  const [autoCycle, setAutoCycle] = useState(false)
  const [cycleInterval, setCycleInterval] = useState(10)

  const applyTheme = useCallback((themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (!theme) return

    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
    root.setAttribute('data-theme', themeId)
    localStorage.setItem('theme', themeId)
  }, [])

  const handleThemeChange = useCallback((themeId: string) => {
    setCurrentTheme(themeId)
    applyTheme(themeId)
  }, [applyTheme])

  const handleAutoCycleChange = useCallback((enabled: boolean) => {
    setAutoCycle(enabled)
    localStorage.setItem('autoCycle', enabled.toString())
  }, [])

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
  }, [applyTheme])

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
  }, [applyTheme])

  // Auto-cycle effect with dynamic interval
  useEffect(() => {
    if (!autoCycle) return

    const interval = setInterval(() => {
      const currentIndex = themes.findIndex(theme => theme.id === currentTheme)
      const nextIndex = (currentIndex + 1) % themes.length
      const nextTheme = themes[nextIndex]
      handleThemeChange(nextTheme.id)
    }, cycleInterval * 1000)

    return () => clearInterval(interval)
  }, [autoCycle, currentTheme, cycleInterval, handleThemeChange])

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      themes,
      setTheme: handleThemeChange,
      autoCycle,
      setAutoCycle: handleAutoCycleChange,
      cycleInterval,
      setCycleInterval
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