import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'insider') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    )
  }
} 