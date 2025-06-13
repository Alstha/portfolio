'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    // Raining lights config
    const columns = Math.floor(width / 32)
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * height)
    const blinkOffsets: number[] = Array(columns).fill(0).map(() => Math.random() * Math.PI * 2)
    const themeColors = [
      'rgba(59,130,246,0.8)', // accent
      'rgba(139,92,246,0.7)', // accent-secondary
      'rgba(255,255,255,0.5)', // white
    ]
    const randomColors = [
      'rgba(251,191,36,0.5)', // gold
      'rgba(34,197,94,0.5)', // green
      'rgba(239,68,68,0.5)', // red
      'rgba(168,85,247,0.5)', // purple
    ]

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = 0.35
      ctx.fillStyle = 'rgba(10,10,20,0.06)'
      ctx.fillRect(0, 0, width, height)
      
      const time = Date.now() * 0.001 // Slow time factor
      
      for (let i = 0; i < columns; i++) {
        const x = i * 32 + 16
        const y = drops[i]
        // 75% theme colors, 25% random colors
        const useThemeColor = Math.random() < 0.75
        const colorArray = useThemeColor ? themeColors : randomColors
        const color = colorArray[Math.floor(Math.random() * colorArray.length)]
        
        // Slow blinking effect
        const blinkAlpha = 0.3 + 0.4 * Math.sin(time * 0.3 + blinkOffsets[i])
        ctx.globalAlpha = blinkAlpha
        
        ctx.beginPath()
        ctx.arc(x, y, 3 + Math.random() * 2, 0, 2 * Math.PI)
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
        
        // Much slower fall - 20 seconds to fall
        drops[i] += 0.5 + Math.random() * 0.8
        if (drops[i] > height + 20) {
          drops[i] = -20 - Math.random() * 100
        }
      }
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    function handleResize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth
      height = window.innerHeight
      dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Raining Lights Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
        {/* Greeting */}
        <div className="mb-8 animate-slide-up">
          <span className="inline-block px-6 py-3 glass rounded-full text-white font-medium border border-accent-500/20 hover-scale hover-glow">
            Namaste! &apos; 🙏
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
          Hi, I&apos;m{' '}
          <span className="gradient-text hover-scale name-effect cursor-pointer">
            Alson Shrestha
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed animate-slide-up hover-bright">
          AI/ML enthusiast & tech startup founder from Nepal
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-premium btn-linger btn-shimmer px-8 py-4 rounded-lg font-semibold text-lg"
          >
            View My Work
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 glass border border-premium-600 text-premium-300 font-semibold rounded-lg hover:border-premium-500 hover:text-premium-100 text-lg btn-linger btn-shimmer"
          >
            Let&apos;s Connect
          </button>
        </div>
      </div>
      
      {/* Section Divider */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-accent rounded-full shadow-lg"></div>
    </section>
  )
} 