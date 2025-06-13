'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function About() {
  const [activeCard, setActiveCard] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const cards = [
    {
      icon: '⚡',
      title: 'AI/ML Enthusiast',
      color: 'from-slate-600 to-slate-800',
      bgColor: 'bg-slate-800/20',
      borderColor: 'border-slate-600/30'
    },
    {
      icon: '🚀',
      title: 'Tech Startup Founder',
      color: 'from-slate-600 to-slate-800',
      bgColor: 'bg-slate-800/20',
      borderColor: 'border-slate-600/30'
    },
    {
      icon: '🎓',
      title: 'Student at Islington',
      color: 'from-slate-600 to-slate-800',
      bgColor: 'bg-slate-800/20',
      borderColor: 'border-slate-600/30'
    },
    {
      icon: '📍',
      title: 'From Nepal',
      color: 'from-slate-600 to-slate-800',
      bgColor: 'bg-slate-800/20',
      borderColor: 'border-slate-600/30'
    }
  ]

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 hover-scale">
            About <span className="gradient-text hover-scale">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full hover-glow"></div>
        </div>

        {/* Main Visual Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  onClick={() => setActiveCard(index)}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`
                    relative p-6 rounded-xl border transition-all duration-500 hover:scale-105
                    ${card.bgColor} ${card.borderColor}
                    ${activeCard === index ? 'scale-105 shadow-lg border-accent/50' : 'hover:shadow-md'}
                  `}>
                    {/* Animated Background */}
                    <div className={`
                      absolute inset-0 rounded-xl bg-gradient-to-br ${card.color} opacity-0 
                      group-hover:opacity-5 transition-opacity duration-500
                      ${activeCard === index ? 'opacity-10' : ''}
                    `}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className={`
                        text-3xl mb-3 transition-all duration-500 opacity-70
                        ${activeCard === index ? 'scale-110 opacity-100' : 'group-hover:opacity-90'}
                      `}>
                        {card.icon}
                      </div>
                      <h3 className={`
                        text-sm font-medium text-white transition-all duration-500
                        ${activeCard === index ? 'text-premium-50 font-semibold' : ''}
                      `}>
                        {card.title}
                      </h3>
                    </div>

                    {/* Subtle Glow Effect */}
                    <div className={`
                      absolute inset-0 rounded-xl bg-gradient-to-br ${card.color} opacity-0 
                      blur-md transition-opacity duration-500
                      ${activeCard === index ? 'opacity-20' : 'group-hover:opacity-5'}
                    `}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-premium-400/20 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${4 + Math.random() * 3}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="relative">
            <div className="glass rounded-3xl p-12 border border-premium-600/20 card-hover relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-accent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
              </div>

              {/* Profile Content */}
              <div className="relative z-10 text-center">
                {/* Profile Image */}
                <div className="relative mb-8">
                  <div className="relative w-48 h-48 mx-auto">
                    {/* Glow Ring */}
                    <div className="absolute inset-0 bg-gradient-accent rounded-full blur-xl opacity-50 animate-pulse"></div>
                    
                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-full border-4 border-accent overflow-hidden hover:scale-105 transition-transform duration-500">
                      <Image
                        src="/profile.jpeg"
                        alt="Alson Shrestha profile"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-white text-lg">✨</span>
                    </div>
                  </div>
                </div>

                {/* Name and Title */}
                <h3 className="text-3xl font-bold text-white mb-2 hover-scale">
                  Alson Shrestha
                </h3>
                <p className="text-white mb-6 hover-bright">
                  {cards[activeCard].title}
                </p>

                {/* Interactive Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400 mb-1">18</div>
                    <div className="text-xs text-white">Age</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400 mb-1">12+</div>
                    <div className="text-xs text-white">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400 mb-1">∞</div>
                    <div className="text-xs text-white">Potential</div>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-premium-800/30 rounded-full h-2 mb-6 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-accent rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${((activeCard + 1) / cards.length) * 100}%` }}
                  ></div>
                </div>

                {/* Current Status */}
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-premium-800/50 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">Currently Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 px-8 py-4 glass rounded-full border border-premium-600/20">
            <span className="text-2xl">🌟</span>
            <span className="text-white font-medium">Building the Future with AI</span>
            <span className="text-2xl">🚀</span>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-accent rounded-full shadow-lg"></div>
    </section>
  )
} 