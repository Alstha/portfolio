'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'

interface User {
  id: string
  role: 'insider' | 'outsider'
  name: string
  email: string
  bio?: string
  avatar?: string
  github?: string
  linkedin?: string
  twitter?: string
  website?: string
}

interface Project {
  id: string
  title: string
  description: string
  image?: string
  githubUrl?: string
  liveUrl?: string
  technologies: string
  featured: boolean
  createdAt: string
  updatedAt: string
  userId: string
}

interface Feedback {
  id: string
  name: string
  rating: number
  comment?: string
  createdAt: string
}

interface Contact {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'database' | 'settings'>('database')
  const [activeDatabaseTab, setActiveDatabaseTab] = useState<'contacts' | 'projects' | 'feedback' | 'users'>('contacts')
  const [users, setUsers] = useState<User[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null)
  const [cycleInterval, setCycleInterval] = useState(10)
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    tech: '',
    featured: false,
    userId: ''
  })
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'outsider' as 'insider' | 'outsider',
    bio: '',
    avatar: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: ''
  })
  const router = useRouter()
  const { currentTheme, themes, setTheme, autoCycle, setAutoCycle } = useTheme()

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        if (userData.user.role === 'insider') {
          setUser(userData.user)
        } else {
          router.push('/signin')
        }
      } else {
        router.push('/signin')
      }
    } catch {
      router.push('/signin')
    }
  }, [router])

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/users')
      if (response.ok) {
        const result = await response.json()
        setUsers(Array.isArray(result) ? result : [])
      } else {
        setUsers([])
      }
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const result = await response.json()
        setProjects(Array.isArray(result) ? result : [])
      } else {
        setProjects([])
      }
    } catch {
      setProjects([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchFeedback = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/feedback')
      if (response.ok) {
        const result = await response.json()
        setFeedback(Array.isArray(result) ? result : [])
      } else {
        setFeedback([])
      }
    } catch {
      setFeedback([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/contact')
      if (response.ok) {
        const result = await response.json()
        setContacts(Array.isArray(result) ? result : [])
      } else {
        setContacts([])
      }
    } catch {
      setContacts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
    const savedInterval = localStorage.getItem('themeCycleInterval')
    if (savedInterval) {
      setCycleInterval(parseInt(savedInterval))
    }
  }, [checkAuth])

  useEffect(() => {
    if (user) {
      if (activeDatabaseTab === 'users') fetchUsers()
      if (activeDatabaseTab === 'projects') fetchProjects()
      if (activeDatabaseTab === 'feedback') fetchFeedback()
      if (activeDatabaseTab === 'contacts') fetchContacts()
    }
  }, [user, activeDatabaseTab, fetchUsers, fetchProjects, fetchFeedback, fetchContacts])

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' })
      router.push('/signin')
    } catch {}
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return
    try {
      const endpoint = activeDatabaseTab === 'contacts' ? `/api/contact/${id}` : 
                      activeDatabaseTab === 'projects' ? `/api/projects/${id}` : 
                      activeDatabaseTab === 'feedback' ? `/api/feedback/${id}` : `/api/users/${id}`
      const response = await fetch(endpoint, { method: 'DELETE' })
      if (response.ok) {
        if (activeDatabaseTab === 'users') fetchUsers()
        if (activeDatabaseTab === 'projects') fetchProjects()
        if (activeDatabaseTab === 'feedback') fetchFeedback()
      }
    } catch {}
  }

  const handleEdit = async (record: User | Project | Feedback) => {
    if (record) {
      if (activeDatabaseTab === 'users') setEditingUser(record as User)
      if (activeDatabaseTab === 'projects') setEditingProject(record as Project)
      if (activeDatabaseTab === 'feedback') setEditingFeedback(record as Feedback)
    }
  }

  const handleSaveEdit = async (updatedData: User | Project | Feedback) => {
    if (!updatedData || typeof updatedData !== 'object' || !('id' in updatedData)) return;
    try {
      const endpoint = activeDatabaseTab === 'contacts' ? `/api/contact/${(updatedData as {id: string}).id}` : 
                      activeDatabaseTab === 'projects' ? `/api/projects/${(updatedData as {id: string}).id}` : 
                      activeDatabaseTab === 'feedback' ? `/api/feedback/${(updatedData as {id: string}).id}` : `/api/users/${(updatedData as {id: string}).id}`
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      if (response.ok) {
        if (activeDatabaseTab === 'users') setEditingUser(null)
        if (activeDatabaseTab === 'projects') setEditingProject(null)
        if (activeDatabaseTab === 'feedback') setEditingFeedback(null)
        if (activeDatabaseTab === 'users') fetchUsers()
        if (activeDatabaseTab === 'projects') fetchProjects()
        if (activeDatabaseTab === 'feedback') fetchFeedback()
      }
    } catch {}
  }

  const handleCycleIntervalChange = (newInterval: number) => {
    setCycleInterval(newInterval)
    localStorage.setItem('themeCycleInterval', newInterval.toString())
    window.dispatchEvent(new CustomEvent('themeCycleIntervalChange', {
      detail: { interval: newInterval }
    }))
  }

  const handleAddUser = async () => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })
      setShowAddUser(false)
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'outsider',
        bio: '',
        avatar: '',
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
      })
      if (activeDatabaseTab === 'users') fetchUsers()
    } catch {
      alert('Error adding user')
    }
  }

  const renderTable = () => {
    if (loading) {
      return <div className="text-center py-8 text-slate-400">Loading...</div>
    }

    if (users.length === 0 && projects.length === 0 && feedback.length === 0) {
      return <div className="text-center py-8 text-slate-400">No records found</div>
    }

    const columns = Object.keys(users[0] || projects[0] || feedback[0] || {})

    return (
      <div className="overflow-x-auto">
        <table className="w-full bg-slate-800/50 rounded-lg overflow-hidden">
          <thead className="bg-slate-700/50">
            <tr>
              {columns.map(column => (
                <th key={column} className="px-4 py-3 text-left text-slate-300 font-medium">
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </th>
              ))}
              <th className="px-4 py-3 text-left text-slate-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-700/30">
                {columns.map(column => (
                  <td key={column} className="px-4 py-3 text-slate-300">
                    {editingUser?.id === user.id ? (
                      <input
                        type="text"
                        value={
                          typeof editingUser[column as keyof User] === 'boolean'
                            ? String(editingUser[column as keyof User])
                            : editingUser[column as keyof User] || ''
                        }
                        onChange={(e) => setEditingUser({
                          ...editingUser,
                          [column]: e.target.value
                        })}
                        className="w-full px-2 py-1 bg-slate-900/50 border border-slate-600/50 rounded text-white"
                      />
                    ) : (
                      <div className="max-w-xs truncate">
                        {typeof user[column as keyof User] === 'boolean' 
                          ? (user[column as keyof User] ? 'Yes' : 'No')
                          : user[column as keyof User]?.toString() || ''}
                      </div>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3">
                  {editingUser?.id === user.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit(editingUser)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-slate-700/30">
                {columns.map(column => (
                  <td key={column} className="px-4 py-3 text-slate-300">
                    {editingProject?.id === project.id ? (
                      <input
                        type="text"
                        value={
                          typeof editingProject[column as keyof Project] === 'boolean'
                            ? (editingProject[column as keyof Project] ? 'true' : 'false')
                            : String(editingProject[column as keyof Project] ?? '')
                        }
                        onChange={(e) => setEditingProject({
                          ...editingProject,
                          [column]: e.target.value === 'true'
                        })}
                        className="w-full px-2 py-1 bg-slate-900/50 border border-slate-600/50 rounded text-white"
                      />
                    ) : (
                      <div className="max-w-xs truncate">
                        {typeof project[column as keyof Project] === 'boolean' 
                          ? (project[column as keyof Project] ? 'Yes' : 'No')
                          : project[column as keyof Project]?.toString() || ''}
                      </div>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3">
                  {editingProject?.id === project.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit(editingProject)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProject(null)}
                        className="px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {feedback.map((fb) => (
              <tr key={fb.id} className="border-t border-slate-700/30">
                {columns.map(column => (
                  <td key={column} className="px-4 py-3 text-slate-300">
                    {editingFeedback?.id === fb.id ? (
                      <input
                        type="text"
                        value={editingFeedback[column as keyof Feedback] || ''}
                        onChange={(e) => setEditingFeedback({
                          ...editingFeedback,
                          [column]: e.target.value
                        })}
                        className="w-full px-2 py-1 bg-slate-900/50 border border-slate-600/50 rounded text-white"
                      />
                    ) : (
                      <div className="max-w-xs truncate">
                        {typeof fb[column as keyof Feedback] === 'boolean' 
                          ? (fb[column as keyof Feedback] ? 'Yes' : 'No')
                          : fb[column as keyof Feedback]?.toString() || ''}
                      </div>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3">
                  {editingFeedback?.id === fb.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit(editingFeedback)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingFeedback(null)}
                        className="px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(fb)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(fb.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderSettings = () => {
    return (
      <div className="space-y-6">
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Theme Settings</h3>
          
          {/* Auto-Cycle Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-white font-medium">Auto Theme Cycling</h4>
              <p className="text-slate-400 text-sm">Change themes every {cycleInterval}s</p>
            </div>
            <button
              onClick={() => setAutoCycle(!autoCycle)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoCycle ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoCycle ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Cycle Interval Control */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {[5, 10, 15, 30, 60].map(interval => (
                <button
                  key={interval}
                  onClick={() => handleCycleIntervalChange(interval)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    cycleInterval === interval
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                  }`}
                >
                  {interval}s
                </button>
              ))}
            </div>
            <input
              type="range"
              min="3"
              max="120"
              value={cycleInterval}
              onChange={(e) => handleCycleIntervalChange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(cycleInterval - 3) / (120 - 3) * 100}%, #475569 ${(cycleInterval - 3) / (120 - 3) * 100}%, #475569 100%)`
              }}
            />
          </div>

          {/* Manual Theme Controls */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const currentIndex = themes.findIndex(t => t.id === currentTheme)
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : themes.length - 1
                  setTheme(themes[prevIndex].id)
                }}
                className="px-3 py-1 bg-slate-600 text-white rounded-md hover:bg-slate-500 transition-colors text-sm"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  const currentIndex = themes.findIndex(t => t.id === currentTheme)
                  const nextIndex = (currentIndex + 1) % themes.length
                  setTheme(themes[nextIndex].id)
                }}
                className="px-3 py-1 bg-slate-600 text-white rounded-md hover:bg-slate-500 transition-colors text-sm"
              >
                Next →
              </button>
              <button
                onClick={() => {
                  const randomTheme = themes[Math.floor(Math.random() * themes.length)]
                  setTheme(randomTheme.id)
                }}
                className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-colors text-sm"
              >
                🎲 Random
              </button>
            </div>
          </div>

          {/* Theme Selection Grid */}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className={`p-2 rounded-md border transition-all ${
                    currentTheme === theme.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded-full shadow-sm"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSecondary})` 
                      }}
                    />
                    <div className="text-left">
                      <div className="text-white text-sm">{theme.name}</div>
                    </div>
                    {currentTheme === theme.id && (
                      <span className="ml-auto text-blue-400 text-sm">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Status */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-slate-300 text-sm">Current Theme:</div>
            <div className="text-white text-sm font-medium">{themes.find(t => t.id === currentTheme)?.name}</div>
            <div className="text-slate-300 text-sm">Auto Cycle:</div>
            <div className={`text-sm font-medium ${autoCycle ? 'text-green-400' : 'text-red-400'}`}>
              {autoCycle ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderProjectManagement = () => {
    const handleAddProject = async () => {
      try {
        const body = {
          title: newProject.title,
          description: newProject.description,
          image: newProject.image,
          githubUrl: newProject.githubUrl,
          liveUrl: newProject.liveUrl,
          technologies: newProject.tech.split(',').map(t => t.trim()),
          featured: newProject.featured
        }
        if (newProject.userId) body.userId = newProject.userId
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to add project')
        }
        setShowAddProject(false)
        setNewProject({
          title: '',
          description: '',
          image: '',
          githubUrl: '',
          liveUrl: '',
          tech: '',
          featured: false,
          userId: users[0]?.id || ''
        })
        fetchProjects()
      } catch (error) {
        alert(`Error: ${error instanceof Error ? error.message : 'Error adding project'}`)
      }
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          <button
            onClick={() => setShowAddProject(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Project</span>
          </button>
        </div>

        {showAddProject && (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Add New Project</h3>
                <button
                  onClick={() => setShowAddProject(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newProject.image}
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Live URL"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={newProject.tech}
                  onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newProject.userId}
                  onChange={e => setNewProject({ ...newProject, userId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={users.length === 0}
                >
                  <option value="">{users.length === 0 ? 'No users available' : 'Select a user'}</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                  ))}
                </select>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newProject.featured}
                    onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-slate-300">Featured Project</label>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowAddProject(false)}
                    className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProject}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={users.length === 0}
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {editingProject && (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Edit Project</h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={editingProject.githubUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Live URL"
                  value={editingProject.liveUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={(() => {
                    try {
                      const techs = JSON.parse(editingProject.technologies)
                      return Array.isArray(techs) ? techs.join(', ') : ''
                    } catch {
                      return ''
                    }
                  })()}
                  onChange={(e) => setEditingProject({ 
                    ...editingProject, 
                    technologies: JSON.stringify(e.target.value.split(',').map(t => t.trim()))
                  })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-slate-300">Featured Project</label>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setEditingProject(null)}
                    className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveEdit(editingProject)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <Image
                src={project.image || '/default-project.png'}
                alt={project.title}
                width={256}
                height={128}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(() => {
                  try {
                    const techs = project.technologies ? JSON.parse(project.technologies) : [];
                    return Array.isArray(techs) ? techs.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-sm"
                      >
                        {tech}
                      </span>
                    )) : null;
                  } catch (error: unknown) {
                    console.error('Error parsing technologies:', error);
                    return null;
                  }
                })()}
              </div>
              <div className="flex justify-between items-center">
                <div className="space-x-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
                <div className="space-x-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderUserManagement = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Users</h2>
          <div className="space-x-4">
            <button
              onClick={() => {
                setNewUser({ ...newUser, role: 'outsider' })
                setShowAddUser(true)
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add User</span>
            </button>
            <button
              onClick={() => {
                setNewUser({ ...newUser, role: 'insider' })
                setShowAddUser(true)
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Admin</span>
            </button>
          </div>
        </div>

        {showAddUser && (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  Add New {newUser.role === 'insider' ? 'Admin' : 'User'}
                </h3>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Bio"
                  value={newUser.bio}
                  onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Avatar URL"
                  value={newUser.avatar}
                  onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={newUser.github}
                  onChange={(e) => setNewUser({ ...newUser, github: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={newUser.linkedin}
                  onChange={(e) => setNewUser({ ...newUser, linkedin: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Twitter URL"
                  value={newUser.twitter}
                  onChange={(e) => setNewUser({ ...newUser, twitter: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Website URL"
                  value={newUser.website}
                  onChange={(e) => setNewUser({ ...newUser, website: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowAddUser(false)}
                    className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddUser}
                    className={`px-6 py-2 text-white rounded-lg transition-colors ${
                      newUser.role === 'insider' 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    Add {newUser.role === 'insider' ? 'Admin' : 'User'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <p className="text-slate-400">{user.email}</p>
                  <span className={`px-2 py-1 rounded text-sm ${user.role === 'insider' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>{user.role === 'insider' ? 'Admin' : 'User'}</span>
                </div>
              </div>
              <p className="text-slate-400 mb-4">{user.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {user.github && (
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {user.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {user.twitter && (
                  <a
                    href={user.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                )}
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Website
                  </a>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderFeedbackManagement = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">Feedback</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedback.map((fb) => (
            <div key={fb.id} className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center mb-2">
                <span className="text-xl font-bold text-white mr-2">{fb.name}</span>
                <span className="ml-auto text-yellow-400 font-bold">{'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}</span>
              </div>
              <div className="text-slate-300 mb-2">{fb.comment || <span className="italic text-slate-500">No comment</span>}</div>
              <div className="text-xs text-slate-500 mb-2">{new Date(fb.createdAt).toLocaleString()}</div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(fb.id)}
                  className="text-red-400 hover:text-red-300 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderContactsManagement = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center mb-2">
                <span className="text-xl font-bold text-white mr-2">{contact.name}</span>
                <span className="ml-auto text-blue-400 font-bold">{contact.email}</span>
              </div>
              <div className="text-slate-300 mb-2">{contact.message}</div>
              <div className="text-xs text-slate-500 mb-2">{new Date(contact.createdAt).toLocaleString()}</div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="text-red-400 hover:text-red-300 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-xl font-black text-white">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Alstha Admin Panel</h1>
                <p className="text-slate-400">Welcome, {user.name}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1 mb-6">
          {[
            { key: 'database', label: 'Database' },
            { key: 'settings', label: 'Settings' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'database' | 'settings')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Database Sub-Navigation */}
        {activeTab === 'database' && (
          <div className="flex space-x-1 bg-slate-700/30 rounded-lg p-1 mb-6">
            {[
              { key: 'contacts', label: 'Contacts', icon: '📧' },
              { key: 'projects', label: 'Projects', icon: '🚀' },
              { key: 'feedback', label: 'Feedback', icon: '💬' },
              { key: 'users', label: 'Users', icon: '👥' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveDatabaseTab(tab.key as 'contacts' | 'projects' | 'feedback' | 'users')}
                className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2 ${
                  activeDatabaseTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-600/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        {activeTab === 'settings' ? (
          renderSettings()
        ) : activeDatabaseTab === 'projects' ? (
          renderProjectManagement()
        ) : activeDatabaseTab === 'users' ? (
          renderUserManagement()
        ) : activeDatabaseTab === 'feedback' ? (
          renderFeedbackManagement()
        ) : activeDatabaseTab === 'contacts' ? (
          renderContactsManagement()
        ) : null}
      </div>
    </div>
  )
} 