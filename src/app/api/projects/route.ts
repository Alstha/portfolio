import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            name: true,
            avatar: true
          }
        }
      }
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    // Find the seeded admin user
    const adminUser = await prisma.user.findFirst({
      where: {
        email: 'admin@example.com'
      }
    })

    if (!adminUser) {
      return NextResponse.json(
        { error: 'No admin user found to associate with the project' },
        { status: 400 }
      )
    }

    // Ensure technologies is stored as a JSON string
    const technologiesString = Array.isArray(technologies) 
      ? JSON.stringify(technologies)
      : typeof technologies === 'string' 
        ? technologies 
        : JSON.stringify([])

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image,
        githubUrl,
        liveUrl,
        technologies: technologiesString,
        featured: featured || false,
        user: {
          connect: {
            id: adminUser.id
          }
        }
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
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create project' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    const project = await prisma.project.update({
      where: { id },
      data,
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
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
} 