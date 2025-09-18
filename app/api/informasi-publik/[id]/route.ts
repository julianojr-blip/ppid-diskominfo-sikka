import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

// GET single informasi publik by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const informasi = await prisma.informasiPublik.findUnique({
      where: { id: params.id }
    })

    if (!informasi) {
      return NextResponse.json(
        { error: 'Informasi not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(informasi)
  } catch (error) {
    console.error('Error fetching informasi:', error)
    return NextResponse.json(
      { error: 'Failed to fetch informasi' },
      { status: 500 }
    )
  }
}

// PUT update informasi publik (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
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

    const updatedInformasi = await prisma.informasiPublik.update({
      where: { id: params.id },
      data: {
        ...(judul && { judul }),
        ...(kategori && { kategori }),
        ...(deskripsi && { deskripsi }),
        ...(fileUrl !== undefined && { fileUrl }),
        ...(fileSize !== undefined && { fileSize }),
        ...(fileType !== undefined && { fileType }),
        ...(jenis && { jenis }),
        ...(status && { status })
      }
    })

    return NextResponse.json(updatedInformasi)
  } catch (error) {
    console.error('Error updating informasi:', error)
    return NextResponse.json(
      { error: 'Failed to update informasi' },
      { status: 500 }
    )
  }
}

// DELETE informasi publik (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.informasiPublik.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Informasi deleted successfully' })
  } catch (error) {
    console.error('Error deleting informasi:', error)
    return NextResponse.json(
      { error: 'Failed to delete informasi' },
      { status: 500 }
    )
  }
}