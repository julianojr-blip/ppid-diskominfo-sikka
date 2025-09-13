import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = { isPublished: true }
    if (category) {
      where.category = category
    }
    if (search) {
      where.OR = [
        { judul: { contains: search, mode: 'insensitive' } },
        { konten: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [berita, total] = await Promise.all([
      db.berita.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishDate: 'desc' }
      }),
      db.berita.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: berita,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching berita:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create berita
    const berita = await db.berita.create({
      data: {
        judul: body.judul,
        konten: body.konten,
        excerpt: body.excerpt || null,
        author: body.author || 'Admin PPID',
        category: body.category || 'Umum',
        imageUrl: body.imageUrl || null,
        isPublished: body.isPublished ?? true
      }
    })

    return NextResponse.json({
      success: true,
      data: berita,
      message: 'Berita berhasil dibuat'
    })
  } catch (error) {
    console.error('Error creating berita:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}