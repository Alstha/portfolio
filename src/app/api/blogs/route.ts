import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(blogs)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, image, published, userId } = body

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        excerpt,
        image,
        published,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
} 