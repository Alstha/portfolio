import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, rating, comment } = body

    // Validate required fields
    if (!name || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields: name and rating are required' },
        { status: 400 }
      )
    }

    const feedback = await prisma.feedback.create({
      data: {
        name,
        rating,
        comment: comment || '',
      }
    })

    return NextResponse.json(feedback)
  } catch (error) {
    console.error('Error creating feedback:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create feedback' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(feedback)
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 })
  }
} 