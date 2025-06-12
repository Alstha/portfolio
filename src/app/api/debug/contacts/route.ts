import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Count total contacts
    const count = await prisma.contact.count()
    
    // Get all contacts
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      count,
      contacts,
      message: `Found ${count} contacts in database`
    })
  } catch (error) {
    console.error('Debug contacts error:', error)
    return NextResponse.json(
      { 
        error: 'Database error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        count: 0,
        contacts: []
      },
      { status: 500 }
    )
  }
} 