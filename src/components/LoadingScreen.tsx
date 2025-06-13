'use client'

import { useEffect, useState } from 'react'

const TAGLINES = [
  'Crafting AI Experiences',
  'Building with Passion',
  'Innovating for Tomorrow',
  'Minimal. Modern. Magic.',
  "Let's Create the Future",
]

export default function LoadingScreen() {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Hide loading screen after content is ready
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    const taglineInterval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % TAGLINES.length)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      clearInterval(taglineInterval)
    }
  }, [])

  if (!isLoading) return null

  // Predefined particle positions and animations to avoid hydration mismatch
  const particles = [
    { left: '10%', top: '20%', delay: '0.5s', duration: '3.2s' },
    { left: '25%', top: '80%', delay: '1.2s', duration: '3.8s' },
    { left: '40%', top: '30%', delay: '0.8s', duration: '4.1s' },
    { left: '55%', top: '70%', delay: '1.5s', duration: '3.5s' },
    { left: '70%', top: '15%', delay: '0.3s', duration: '3.9s' },
    { left: '85%', top: '60%', delay: '1.8s', duration: '3.3s' },
    { left: '15%', top: '45%', delay: '0.7s', duration: '4.2s' },
    { left: '30%', top: '90%', delay: '1.1s', duration: '3.6s' },
    { left: '45%', top: '10%', delay: '0.9s', duration: '3.7s' },
    { left: '60%', top: '85%', delay: '1.4s', duration: '3.4s' },
    { left: '75%', top: '35%', delay: '0.6s', duration: '4.0s' },
    { left: '90%', top: '75%', delay: '1.7s', duration: '3.1s' },
    { left: '5%', top: '55%', delay: '1.0s', duration: '3.8s' },
    { left: '20%', top: '25%', delay: '0.4s', duration: '4.3s' },
    { left: '35%', top: '95%', delay: '1.3s', duration: '3.2s' },
    { left: '50%', top: '5%', delay: '0.2s', duration: '3.9s' },
    { left: '65%', top: '50%', delay: '1.6s', duration: '3.5s' },
    { left: '80%', top: '40%', delay: '0.1s', duration: '4.1s' },
    { left: '95%', top: '65%', delay: '1.9s', duration: '3.3s' },
    { left: '12%', top: '35%', delay: '0.8s', duration: '3.7s' }
  ]

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
        {/* Rotating Tagline */}
        <p className="text-premium-300 text-sm md:text-base min-h-[1.5em] transition-all duration-500 animate-fade-in">
          {TAGLINES[taglineIndex]}
        </p>
        {/* Animated Bouncing Dots */}
        <div className="flex space-x-2 mt-4" aria-label="Loading">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>

      {/* Floating Particles - Only render on client to avoid hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent-400/30 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  )
}

// Add this to your global CSS if not present:
// .animate-spin-slow { animation: spin 2.5s linear infinite; } 