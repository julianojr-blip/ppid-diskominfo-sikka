import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

// GET all informasi publik
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const jenis = searchParams.get('jenis') as any
    const kategori = searchParams.get('kategori')
    const status = searchParams.get('status') as any

    const where: any = {}
    
    if (jenis) where.jenis = jenis
    if (kategori) where.kategori = { contains: kategori }
    if (status) where.status = status

    const informasiPublik = await prisma.informasiPublik.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(informasiPublik)
  } catch (error) {
    console.error('Error fetching informasi publik:', error)
    return NextResponse.json(
      { error: 'Failed to fetch informasi publik' },
      { status: 500 }
    )
  }
}

// POST new informasi publik (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check if user is admin
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      judul,
      kategori,
      deskripsi,
      fileUrl,
      fileSize,
      fileType,
      jenis,
      status
    } = body

    // Validate required fields
    if (!judul || !kategori || !deskripsi || !jenis) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newInformasi = await prisma.informasiPublik.create({
      data: {
        judul,
        kategori,
        deskripsi,
        fileUrl: fileUrl || null,
        fileSize: fileSize || null,
        fileType: fileType || null,
        jenis,
        status: status || 'AKTIF'
      }
    })

    return NextResponse.json(newInformasi, { status: 201 })
  } catch (error) {
    console.error('Error creating informasi publik:', error)
    return NextResponse.json(
      { error: 'Failed to create informasi publik' },
      { status: 500 }
    )
  }
}