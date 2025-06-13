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

    const feedback = await prisma.feedback.findUnique({
      where: { id }
    })

    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 })
    }

    return NextResponse.json(feedback)
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
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
    const { name, rating, comment } = body

    if (!name || !rating) {
      return NextResponse.json(
        { error: 'Name and rating are required' },
        { status: 400 }
      )
    }

    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: { name, rating, comment }
    })

    return NextResponse.json(updatedFeedback)
  } catch (error) {
    console.error('Error updating feedback:', error)
    return NextResponse.json(
      { error: 'Failed to update feedback' },
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

    await prisma.feedback.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting feedback:', error)
    return NextResponse.json(
      { error: 'Failed to delete feedback' },
      { status: 500 }
    )
  }
} 