'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
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

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
            <span className="text-white text-3xl font-bold">A</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in">
            Alson Shrestha
          </h1>
          <p className="text-white text-sm animate-fade-in delay-300">
            AI/ML Enthusiast & Tech Startup Founder
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-accent rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-premium-800/30 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-accent rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-white text-sm">
            Loading amazing content... {Math.round(progress)}%
          </p>
        </div>

        {/* Loading Text */}
        <div className="space-y-2 text-white text-sm">
          <p className="animate-fade-in delay-500">🚀 Preparing AI/ML showcase...</p>
          <p className="animate-fade-in delay-700">💡 Loading innovative projects...</p>
          <p className="animate-fade-in delay-900">🌟 Setting up premium experience...</p>
        </div>

        {/* Namaste Greeting */}
        <div className="mt-8 animate-fade-in delay-1100">
          <span className="inline-block px-6 py-3 glass rounded-full text-accent-300 font-medium border border-accent-500/20">
            Namaste! 🙏
          </span>
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