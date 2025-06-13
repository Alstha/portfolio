'use client'

import { useEffect, useState } from 'react'

const CAPTIONS = [
  'Summoning AI magic... 🤖✨',
  'Sharpening pixels... 🖌️',
  'Waking up neurons... 🧠',
  'Brewing innovation... ☕',
  'Loading awesomeness... 🚀',
  'Tuning the matrix... 🧬',
  'Polishing gradients... 🎨',
  'Charging creativity... ⚡',
  'Syncing with the cloud... ☁️',
  'Unleashing potential... 🌟',
]

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState(CAPTIONS[0])

  useEffect(() => {
    // Pick a random caption on mount
    setCaption(CAPTIONS[Math.floor(Math.random() * CAPTIONS.length)])
    // Animate progress
    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 7) + 2 // random step for fun
      if (current >= 100) {
        current = 100
        clearInterval(interval)
      }
      setProgress(current)
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900 flex items-center justify-center overflow-hidden">
      {/* Animated Blurred Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-6 py-12 animate-fade-in">
        {/* Animated Gradient Ring Logo */}
        <div className="relative mb-4">
          <div className="w-24 h-24 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-500 via-accent-secondary to-purple-500 animate-spin-slow blur-sm opacity-60"></span>
            <span className="relative w-20 h-20 bg-premium-900 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-white text-4xl font-bold select-none">A</span>
            </span>
          </div>
        </div>
        {/* Name */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight whitespace-nowrap animate-fade-in">
          Alson Shrestha
        </h1>
        {/* Fun Caption */}
        <p className="text-premium-300 text-base min-h-[1.5em] transition-all duration-500 animate-fade-in flex items-center gap-2">
          <span className="animate-wiggle inline-block">{caption.split(' ').pop()}</span>
          <span>{caption.replace(/\s*\S+$/, '')}</span>
        </p>
        {/* Animated Percentage */}
        <div className="flex flex-col items-center mt-2">
          <span className="text-white text-3xl font-mono font-bold tracking-widest animate-fade-in">
            {progress}%
          </span>
          <div className="w-32 h-2 bg-premium-800/30 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-gradient-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add this to your global CSS if not present:
// .animate-spin-slow { animation: spin 2.5s linear infinite; }
// .animate-wiggle { animation: wiggle 1.2s infinite alternate; }
// @keyframes wiggle { 0% { transform: rotate(-8deg); } 100% { transform: rotate(8deg); } } 