'use client'

import { useContext, useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentTheme } = useTheme()

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

    // Minimalist theme colors
    const themeColors = {
      'premium-dark': {
        primary: 'rgba(59, 130, 246, 0.03)', // very subtle blue
        secondary: 'rgba(139, 92, 246, 0.02)', // very subtle purple
        accent: 'rgba(34, 197, 94, 0.02)', // very subtle green
        particles: 'rgba(59, 130, 246, 0.15)'
      },
      ocean: {
        primary: 'rgba(6, 182, 212, 0.03)', // very subtle cyan
        secondary: 'rgba(8, 145, 178, 0.02)', // very subtle blue
        accent: 'rgba(34, 197, 94, 0.02)', // very subtle green
        particles: 'rgba(6, 182, 212, 0.15)'
      },
      emerald: {
        primary: 'rgba(16, 185, 129, 0.03)', // very subtle emerald
        secondary: 'rgba(5, 150, 105, 0.02)', // very subtle teal
        accent: 'rgba(34, 197, 94, 0.02)', // very subtle green
        particles: 'rgba(16, 185, 129, 0.15)'
      },
      purple: {
        primary: 'rgba(139, 92, 246, 0.03)', // very subtle purple
        secondary: 'rgba(124, 58, 237, 0.02)', // very subtle violet
        accent: 'rgba(147, 51, 234, 0.02)', // very subtle purple
        particles: 'rgba(139, 92, 246, 0.15)'
      },
      sunset: {
        primary: 'rgba(249, 115, 22, 0.03)', // very subtle orange
        secondary: 'rgba(251, 146, 60, 0.02)', // very subtle amber
        accent: 'rgba(245, 101, 101, 0.02)', // very subtle rose
        particles: 'rgba(249, 115, 22, 0.15)'
      }
    }

    const colors = themeColors[currentTheme as keyof typeof themeColors] || themeColors['premium-dark']

    // Minimalist floating elements
    const elements: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
      type: 'circle' | 'line'
    }> = []

    // Initialize minimalist elements
    for (let i = 0; i < 12; i++) {
      elements.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // slower movement
        vy: (Math.random() - 0.5) * 0.3,
        size: 2 + Math.random() * 3, // smaller elements
        color: [colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)],
        opacity: 0.1 + Math.random() * 0.2, // very subtle opacity
        type: Math.random() > 0.7 ? 'line' : 'circle'
      })
    }

    // Subtle particles
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
      maxLife: number
    }> = []

    function createParticle() {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8, // very slow movement
        vy: (Math.random() - 0.5) * 0.8,
        size: 1 + Math.random() * 2, // tiny particles
        life: 0,
        maxLife: 150 + Math.random() * 100 // longer life
      })
    }

    function draw() {
      if (!ctx) return

      // Very subtle fade effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.01)'
      ctx.fillRect(0, 0, width, height)

      // Update and draw minimalist elements
      elements.forEach(element => {
        // Update position
        element.x += element.vx
        element.y += element.vy

        // Wrap around edges
        if (element.x < 0) element.x = width
        if (element.x > width) element.x = 0
        if (element.y < 0) element.y = height
        if (element.y > height) element.y = 0

        // Draw element
        ctx.globalAlpha = element.opacity
        
        if (element.type === 'circle') {
          ctx.fillStyle = element.color
          ctx.beginPath()
          ctx.arc(element.x, element.y, element.size, 0, 2 * Math.PI)
          ctx.fill()
        } else {
          // Draw subtle line
          ctx.strokeStyle = element.color
          ctx.lineWidth = element.size / 2
          ctx.beginPath()
          ctx.moveTo(element.x - element.size, element.y)
          ctx.lineTo(element.x + element.size, element.y)
          ctx.stroke()
        }
      })

      // Create new particles occasionally
      if (Math.random() < 0.1) { // less frequent
        createParticle()
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Remove dead particles
        if (particle.life > particle.maxLife) {
          particles.splice(i, 1)
          continue
        }

        // Draw particle
        const alpha = 1 - (particle.life / particle.maxLife)
        ctx.globalAlpha = alpha * 0.3 // very subtle
        ctx.fillStyle = colors.particles
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI)
        ctx.fill()
      }

      // Reset global alpha
      ctx.globalAlpha = 1

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    function handleResize() {
      if (!canvas || !ctx) return
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
  }, [currentTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
} 