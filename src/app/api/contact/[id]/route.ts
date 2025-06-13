import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

type RouteSegment = {
  params: Promise<{ id: string }>
}

export async function GET(
  request: NextRequest,
  segment: RouteSegment
): Promise<NextResponse> {
  try {
    const { id } = await segment.params
    const user = await getCurrentUser()
    if (!user || user.role !== 'insider') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contact = await prisma.contact.findUnique({
      where: { id }
    })

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error fetching contact:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  segment: RouteSegment
): Promise<NextResponse> {
  try {
    const { id } = await segment.params
    const user = await getCurrentUser()
    if (!user || user.role !== 'insider') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: { name, email, message }
    })

    return NextResponse.json(updatedContact)
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  segment: RouteSegment
): Promise<NextResponse> {
  try {
    const { id } = await segment.params
    const user = await getCurrentUser()
    if (!user || user.role !== 'insider') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.contact.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    )
  }
} 