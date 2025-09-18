import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

// GET single permohonan by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const permohonan = await prisma.permohonanInformasi.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        keberatans: true
      }
    })

    if (!permohonan) {
      return NextResponse.json(
        { error: 'Permohonan not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(permohonan)
  } catch (error) {
    console.error('Error fetching permohonan:', error)
    return NextResponse.json(
      { error: 'Failed to fetch permohonan' },
      { status: 500 }
    )
  }
}

// PUT update permohonan status (admin only)
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
    const { status, catatan } = body

    const updatedPermohonan = await prisma.permohonanInformasi.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(catatan !== undefined && { catatan })
      }
    })

    return NextResponse.json(updatedPermohonan)
  } catch (error) {
    console.error('Error updating permohonan:', error)
    return NextResponse.json(
      { error: 'Failed to update permohonan' },
      { status: 500 }
    )
  }
}