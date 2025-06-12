'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  technologies: string
  category?: string
  year?: string
  details?: string
  image?: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export default function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        const featuredProjects = data.filter((project: Project) => project.featured)
        setProjects(featuredProjects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (project: Project) => {
    alert(`Project Details: ${project.details || 'No details available'}`)
  }

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3)

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              Loading Projects...
            </h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Explore my recent work and personal projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className="w-full"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-[var(--background)]/30 backdrop-blur-sm rounded-2xl border border-[var(--border)]/50 p-6 h-full">
                {project.image && (
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden group">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={200}
                      height={200}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  {project.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(() => {
                    try {
                      const techs = JSON.parse(project.technologies)
                      return Array.isArray(techs) ? techs.map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[var(--primary)]/20 text-[var(--text-primary)] rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      )) : null
                    } catch (error) {
                      console.error('Error parsing technologies:', error)
                      return null
                    }
                  })()}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleViewDetails(project)}
                    className="text-[var(--accent)] hover:text-[var(--accent-secondary)] transition-colors"
                  >
                    View Details
                  </button>
                  <div className="space-x-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:text-[var(--accent-secondary)] transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:text-[var(--accent-secondary)] transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="px-6 py-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white rounded-full hover:opacity-90 transition-opacity"
            >
              {showAllProjects ? 'View Less' : 'View More'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
} 