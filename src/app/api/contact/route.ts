import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const user = await requireAuth('insider')()
    if (user instanceof Response) return user

    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Contact GET error:', error)
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
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 