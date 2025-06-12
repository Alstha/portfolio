import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            avatar: true
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Project GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, image, githubUrl, liveUrl, technologies, featured } = body

    // Validate required fields
    if (!title || !description || !technologies) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, and technologies are required' },
        { status: 400 }
      )
    }

    // Ensure technologies is stored as a JSON string
    const technologiesString = Array.isArray(technologies) 
      ? JSON.stringify(technologies)
      : typeof technologies === 'string' 
        ? technologies 
        : JSON.stringify([])

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        title,
        description,
        image,
        githubUrl,
        liveUrl,
        technologies: technologiesString,
        featured: featured || false
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Project PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Project DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
} 