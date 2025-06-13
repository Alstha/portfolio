import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      select: {
        comments: true,
      },
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    const comments = blog.comments ? JSON.parse(blog.comments) : []
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      select: {
        comments: true,
      },
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    const currentComments = blog.comments ? JSON.parse(blog.comments) : []
    const newComment = {
      id: crypto.randomUUID(),
      content,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      createdAt: new Date().toISOString(),
    }

    const updatedComments = [...currentComments, newComment]
    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        comments: JSON.stringify(updatedComments),
      },
    })

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
} 