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

const CIRCLE_SIZE = 96
const STROKE_WIDTH = 8
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState(CAPTIONS[0])
  const [visible, setVisible] = useState(true)
  const [fade, setFade] = useState(false)

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
        setTimeout(() => setFade(true), 400) // Start fade out
        setTimeout(() => setVisible(false), 1100) // Unmount after fade
      }
      setProgress(current)
    }, 40)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  const progressOffset = CIRCUMFERENCE * (1 - progress / 100)

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900 flex items-center justify-center overflow-hidden transition-opacity duration-700 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
        {/* Circular Progress Indicator */}
        <div className="relative flex items-center justify-center mt-2">
          <svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} className="block">
            <circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              stroke="#22223b"
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
            <circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              stroke="url(#gradient)"
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(.4,1.7,.7,1)' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a21caf" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-white font-mono text-xl"
              style={{ fontSize: 28 }}
            >
              {progress}%
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}

// Add this to your global CSS if not present:
// .animate-spin-slow { animation: spin 2.5s linear infinite; }
// .animate-wiggle { animation: wiggle 1.2s infinite alternate; }
// @keyframes wiggle { 0% { transform: rotate(-8deg); } 100% { transform: rotate(8deg); } } 