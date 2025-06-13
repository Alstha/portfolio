'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

const themes = [
  {
    id: 'default',
    name: 'Premium Dark',
    colors: {
      primary: '#1e293b',
      accent: '#3b82f6',
      secondary: '#8b5cf6'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    colors: {
      primary: '#1e3a8a',
      accent: '#06b6d4',
      secondary: '#0891b2'
    }
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    colors: {
      primary: '#065f46',
      accent: '#10b981',
      secondary: '#059669'
    }
  },
  {
    id: 'purple',
    name: 'Purple Royal',
    colors: {
      primary: '#312e81',
      accent: '#a855f7',
      secondary: '#9333ea'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    colors: {
      primary: '#7c2d12',
      accent: '#f97316',
      secondary: '#ea580c'
    }
  }
]

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentTheme, autoCycle, setAutoCycle, cycleInterval, setCycleInterval } = useTheme()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load theme and autoCycle preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default'
    document.documentElement.setAttribute('data-theme', savedTheme)
    const savedAuto = localStorage.getItem('autoCycle')
    setAutoCycle(savedAuto === null ? true : savedAuto === 'true')
  }, [])

  // Save autoCycle preference to localStorage
  useEffect(() => {
    localStorage.setItem('autoCycle', autoCycle ? 'true' : 'false')
  }, [autoCycle])

  const changeTheme = (themeId: string) => {
    document.documentElement.setAttribute('data-theme', themeId)
    localStorage.setItem('theme', themeId)
    setIsOpen(false)
  }

  const currentThemeData = themes.find(theme => theme.id === currentTheme) || themes[0]

  return (
    <div className="relative">
      {/* Admin Auto-Cycle Toggle */}
      <div className="fixed bottom-28 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setAutoCycle(!autoCycle)}
          className={`w-12 h-12 glass rounded-full border border-premium-600/50 flex items-center justify-center transition-all duration-300 hover-scale hover-glow ${autoCycle ? 'bg-gradient-accent' : 'bg-premium-900'}`}
          aria-label="Toggle auto theme cycle"
        >
          {autoCycle ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.635 19A9 9 0 1 0 6 5.341" /></svg>
          ) : (
            <svg className="w-6 h-6 text-premium-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 12A6 6 0 1 1 6 12a6 6 0 0 1 12 0z" /></svg>
          )}
        </button>
        <span className="text-premium-300 text-xs font-medium select-none">Auto Theme: {autoCycle ? 'On' : 'Off'}</span>
      </div>

      {/* Admin interval control */}
      <div className="fixed bottom-40 right-6 z-50 flex items-center gap-2">
        <input
          type="number"
          min={3}
          max={60}
          value={cycleInterval}
          onChange={e => {
            const val = Math.max(3, Math.min(60, Number(e.target.value)))
            setCycleInterval(val)
            localStorage.setItem('themeCycleInterval', val.toString())
          }}
          className="w-16 px-2 py-1 rounded bg-premium-900 border border-premium-600 text-white text-xs text-center"
          aria-label="Theme cycle interval (seconds)"
        />
        <span className="text-premium-300 text-xs font-medium select-none">sec/auto</span>
      </div>

      {/* Theme Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 glass rounded-full border border-premium-600/50 flex items-center justify-center hover:border-premium-500/50 transition-all duration-300 hover-scale hover-glow z-50"
        aria-label="Change theme"
      >
        <div className="w-6 h-6 rounded-full" style={{ background: `linear-gradient(135deg, ${currentThemeData.colors.accent}, ${currentThemeData.colors.secondary})` }}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
      </button>

      {/* Theme Options Dropdown */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 glass rounded-xl border border-premium-600/50 p-4 min-w-[200px] z-50 animate-fade-in">
          <div className="space-y-3">
            <h3 className="text-premium-50 font-semibold text-sm mb-3 text-center">Choose Theme</h3>
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover-scale ${
                  currentTheme === theme.id
                    ? 'bg-premium-700/50 border border-premium-500/50'
                    : 'hover:bg-premium-800/30'
                }`}
              >
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0" 
                  style={{ background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary})` }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
                <span className="text-premium-300 text-sm font-medium">{theme.name}</span>
                {currentTheme === theme.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-gradient-accent"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
} 