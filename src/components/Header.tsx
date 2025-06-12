'use client'

import { useState, useEffect, useMemo } from 'react'

export default function Header() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [previewSection, setPreviewSection] = useState<string | null>(null)

  const sections = useMemo(() => [
    { id: 'home', label: 'Home', icon: '●' },
    { id: 'about', label: 'About', icon: '●' },
    { id: 'projects', label: 'Projects', icon: '●' },
    { id: 'contact', label: 'Contact', icon: '●' }
  ], [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
    setPreviewSection(null)
  }

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const getPreviewContent = (sectionId: string) => {
    switch (sectionId) {
      case 'home':
        return {
          title: 'Alson Shrestha',
          subtitle: 'AI/ML Enthusiast',
          content: 'Namaste! 🙏 Welcome to my portfolio showcasing innovative AI/ML projects and tech startup ventures.',
          color: 'from-blue-500 to-purple-600'
        }
      case 'about':
        return {
          title: 'About Me',
          subtitle: 'Tech Innovator',
          content: '18-year-old AI/ML enthusiast and startup founder from Nepal, passionate about innovation and positive impact.',
          color: 'from-emerald-500 to-teal-600'
        }
      case 'projects':
        return {
          title: 'Projects',
          subtitle: 'Innovation Hub',
          content: 'Explore cutting-edge AI/ML projects, tech solutions, and innovative applications that drive real-world impact.',
          color: 'from-purple-500 to-pink-600'
        }
      case 'contact':
        return {
          title: 'Contact',
          subtitle: 'Let\'s Connect',
          content: 'Ready to collaborate? Get in touch for AI/ML projects, tech partnerships, or innovative discussions.',
          color: 'from-orange-500 to-red-600'
        }
      default:
        return {
          title: 'Section',
          subtitle: 'Preview',
          content: 'Hover to see section preview',
          color: 'from-gray-500 to-gray-600'
        }
    }
  }

  return (
    <>
      {/* Desktop Navigation - Minimalist Dot Design (Left Side) */}
      <nav className="hidden lg:block fixed top-1/2 left-8 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-8">
          {sections.map((section) => {
            const preview = getPreviewContent(section.id)
            return (
              <div key={section.id} className="relative group flex flex-col items-center">
                {/* Dot Navigation */}
                <button
                  onClick={() => scrollToSection(section.id)}
                  onMouseEnter={() => setPreviewSection(section.id)}
                  onMouseLeave={() => setPreviewSection(null)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer border-2 hover:scale-125 hover:shadow-lg hover:shadow-accent-500/30 ${
                    activeSection === section.id
                      ? 'bg-gradient-accent scale-110 shadow-lg shadow-accent-500/50 border-accent-400'
                      : 'bg-premium-700 hover:bg-premium-600 scale-100 border-premium-500 hover:border-premium-400'
                  }`}
                  aria-label={section.label}
                />
                
                {/* Small Label Below Dot */}
                <span className={`text-xs mt-2 transition-all duration-300 ${
                  activeSection === section.id
                    ? 'text-accent-300 font-medium opacity-100'
                    : 'text-premium-400 opacity-60 group-hover:opacity-0 group-hover:text-premium-300'
                }`}>
                  {section.label}
                </span>

                {/* Preview Box */}
                {previewSection === section.id && (
                  <div className="absolute left-12 top-1/2 transform -translate-y-1/2 w-64 bg-premium-800/95 backdrop-blur-xl border border-premium-600/50 rounded-xl p-4 shadow-2xl z-50 animate-fade-in">
                    {/* Preview Header */}
                    <div className={`w-full h-2 bg-gradient-to-r ${preview.color} rounded-t-lg mb-3`}></div>
                    
                    {/* Preview Content */}
                    <div className="space-y-2">
                      <h4 className="text-premium-50 font-semibold text-sm">{preview.title}</h4>
                      <p className="text-accent-300 text-xs font-medium">{preview.subtitle}</p>
                      <p className="text-premium-300 text-xs leading-relaxed">{preview.content}</p>
                    </div>

                    {/* Preview Arrow */}
                    <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-r-4 border-r-premium-800/95 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Sign In Dot */}
          <div className="relative group flex flex-col items-center">
            <button
              onClick={() => window.location.href = '/signin'}
              onMouseEnter={() => setPreviewSection('signin')}
              onMouseLeave={() => setPreviewSection(null)}
              className="w-4 h-4 rounded-full bg-premium-700 hover:bg-premium-600 transition-all duration-300 cursor-pointer scale-100 border-2 border-premium-500 hover:border-premium-400 hover:scale-125 hover:shadow-lg hover:shadow-accent-500/30"
              aria-label="Sign In"
            />
            
            {/* Small Label Below Dot */}
            <span className="text-xs mt-2 text-premium-400 opacity-60 group-hover:opacity-0 group-hover:text-premium-300 transition-all duration-300">
              Sign In
            </span>

            {/* Sign In Preview Box */}
            {previewSection === 'signin' && (
              <div className="absolute left-12 top-1/2 transform -translate-y-1/2 w-64 bg-premium-800/95 backdrop-blur-xl border border-premium-600/50 rounded-xl p-4 shadow-2xl z-50 animate-fade-in">
                {/* Preview Header */}
                <div className="w-full h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-t-lg mb-3"></div>
                
                {/* Preview Content */}
                <div className="space-y-2">
                  <h4 className="text-premium-50 font-semibold text-sm">Admin Access</h4>
                  <p className="text-green-300 text-xs font-medium">Insider Portal</p>
                  <p className="text-premium-300 text-xs leading-relaxed">Access admin panel, manage content, and control website settings with insider privileges.</p>
                </div>

                {/* Preview Arrow */}
                <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-r-4 border-r-premium-800/95 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Minimalist Dot Design */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-premium-600/20">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="w-12 h-12 bg-gradient-accent rounded-xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <span className="text-lg font-bold text-white">A</span>
            </div>

            {/* Mobile Dot Navigation */}
            <div className="flex space-x-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 border-2 hover:scale-125 ${
                    activeSection === section.id
                      ? 'bg-gradient-accent scale-110 shadow-lg shadow-accent-500/50 border-accent-400'
                      : 'bg-premium-700 hover:bg-premium-600 scale-100 border-premium-500 hover:border-premium-400'
                  }`}
                  aria-label={section.label}
                />
              ))}
              
              {/* Sign In Dot */}
              <button
                onClick={() => window.location.href = '/signin'}
                className="w-3 h-3 rounded-full bg-premium-700 hover:bg-premium-600 transition-all duration-300 border-2 border-premium-500 hover:border-premium-400 hover:scale-125"
                aria-label="Sign In"
              />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-8 h-8 flex flex-col justify-center items-center space-y-1 hover:scale-105 transition-transform duration-300"
              aria-label="Toggle menu"
            >
              <span 
                className={`w-5 h-0.5 bg-premium-300 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5 bg-premium-50' : ''
                }`}
              ></span>
              <span 
                className={`w-5 h-0.5 bg-premium-300 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span 
                className={`w-5 h-0.5 bg-premium-300 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5 bg-premium-50' : ''
                }`}
              ></span>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full glass border-b border-premium-600/50">
              <div className="container mx-auto px-6 py-6">
                <div className="flex flex-col space-y-4">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="text-left text-lg text-premium-300 hover:text-premium-50 transition-colors py-2 flex items-center space-x-3 hover:scale-105 hover:translate-x-2 transition-all duration-300"
                    >
                      <span className={`w-2 h-2 rounded-full border-2 ${
                        activeSection === section.id ? 'bg-gradient-accent border-accent-400' : 'bg-premium-700 border-premium-500'
                      }`}></span>
                      <span>{section.label}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => window.location.href = '/signin'}
                    className="text-left text-lg text-premium-300 hover:text-premium-50 transition-colors py-2 flex items-center space-x-3 hover:scale-105 hover:translate-x-2 transition-all duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-premium-700 border-2 border-premium-500"></span>
                    <span>Sign In</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
} 