'use client'

import About from '@/components/About'
import AnimatedBackground from '@/components/AnimatedBackground'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import LoadingScreen from '@/components/LoadingScreen'
import Projects from '@/components/Projects'
import Feedback from '@/components/Feedback'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set loaded to true after loading screen completes
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2500) // Match the loading screen duration

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen />
      {isLoaded && (
        <div className="relative min-h-screen">
          <AnimatedBackground />
          <div className="relative z-10">
            <Header />
            <div id="home">
              <Hero />
            </div>
            <div id="about">
              <About />
            </div>
            <div id="projects">
              <Projects />
            </div>
            <div id="contact">
              <Contact />
            </div>
            <Feedback />
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}
