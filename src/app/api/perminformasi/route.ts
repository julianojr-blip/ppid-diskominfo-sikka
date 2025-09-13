import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

// GET all permohonan (admin only) or by registration number (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const registrationNumber = searchParams.get('registrationNumber')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // If registrationNumber is provided, allow public access for tracking
    if (registrationNumber) {
      const permohonan = await prisma.permohonanInformasi.findFirst({
        where: { nomorRegistrasi: registrationNumber },
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

      return NextResponse.json({
        data: [permohonan],
        pagination: {
          page: 1,
          limit: 1,
          total: 1,
          pages: 1
        }
      })
    }

    // If no registrationNumber, require admin authentication
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const where: any = {}
    if (status) where.status = status

    const [permohonan, total] = await Promise.all([
      prisma.permohonanInformasi.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
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
      }),
      prisma.permohonanInformasi.count({ where })
    ])

    return NextResponse.json({
      data: permohonan,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching permohonan:', error)
    return NextResponse.json(
      { error: 'Failed to fetch permohonan' },
      { status: 500 }
    )
  }
}

// POST create new permohonan (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      nama,
      email,
      telepon,
      alamat,
      pekerjaan,
      tujuan,
      rincianInformasi,
      caraMemperoleh,
      caraPenyampaian
    } = body

    // Validate required fields
    const requiredFields = [
      'nama', 'email', 'telepon', 'alamat', 'pekerjaan',
      'tujuan', 'rincianInformasi', 'caraMemperoleh'
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field ${field} is required` },
          { status: 400 }
        )
      }
    }

    // Generate nomor registrasi
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const nomorRegistrasi = `REG-${year}${month}-${random}`

    const newPermohonan = await prisma.permohonanInformasi.create({
      data: {
        nomorRegistrasi,
        nama,
        email,
        telepon,
        alamat,
        pekerjaan,
        tujuan,
        rincianInformasi,
        caraMemperoleh,
        caraPenyampaian: caraPenyampaian || null,
        status: 'MENUNGGU'
      }
    })

    return NextResponse.json(newPermohonan, { status: 201 })
  } catch (error) {
    console.error('Error creating permohonan:', error)
    return NextResponse.json(
      { error: 'Failed to create permohonan' },
      { status: 500 }
    )
  }
}