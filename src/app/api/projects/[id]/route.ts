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

    const project = await prisma.project.findUnique({
      where: { id }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
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
    const { title, description, image, technologies, githubUrl, liveUrl } = body

    if (!title || !description || !image || !technologies) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        image,
        technologies,
        githubUrl,
        liveUrl
      }
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
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

    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
} 