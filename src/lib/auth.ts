import { cookies } from 'next/headers'

export type UserRole = 'insider' | 'outsider'

export interface User {
  id: string
  role: UserRole
  name: string
  email: string
}

// Default insider credentials (you can change this later)
const INSIDER_EMAIL = 'admin@alstha.com'
const INSIDER_PASSWORD = 'AlsthaAdmin2024!' // Change this to your preferred password

export async function signIn(email: string, password: string): Promise<User | null> {
  // Check if it's an insider login
  if (email === INSIDER_EMAIL && password === INSIDER_PASSWORD) {
    return {
      id: 'admin-1',
      role: 'insider',
      name: 'Alstha Admin',
      email: INSIDER_EMAIL
    }
  }
  
  // For outsiders, create a simple session (no password required)
  if (email && !password) {
    return {
      id: `user-${Date.now()}`,
      role: 'outsider',
      name: email.split('@')[0] || 'Guest',
      email: email
    }
  }
  
  return null
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session_token')?.value
  
  if (!sessionToken) return null
  
  try {
    const userData = JSON.parse(decodeURIComponent(sessionToken))
    return userData
  } catch {
    return null
  }
}

export async function createSession(user: User): Promise<string> {
  const sessionToken = encodeURIComponent(JSON.stringify(user))
  return sessionToken
}

export async function signOut(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('session_token')
}

export function requireAuth(requiredRole: UserRole) {
  return async () => {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('session_token')?.value

    if (!sessionToken) {
      return new Response('Unauthorized', { status: 401 })
    }

    try {
      const user = JSON.parse(decodeURIComponent(sessionToken))
      if (user.role !== requiredRole) {
        return new Response('Forbidden', { status: 403 })
      }
      return user
    } catch {
      return new Response('Unauthorized', { status: 401 })
    }
  }
}

