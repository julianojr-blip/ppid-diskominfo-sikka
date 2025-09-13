import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const [survei, total] = await Promise.all([
      db.survei.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      db.survei.count()
    ])

    return NextResponse.json({
      success: true,
      data: survei,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching survei:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create survei
    const survei = await db.survei.create({
      data: {
        userId: body.userId || null,
        nama: body.nama || null,
        email: body.email || null,
        noHp: body.noHp || null,
        jenisLayanan: body.jenisLayanan ? JSON.stringify(body.jenisLayanan) : null,
        kepuasanKeseluruhan: parseInt(body.kepuasanKeseluruhan),
        kepuasanKecepatan: parseInt(body.kepuasanKecepatan),
        kepuasanKualitas: parseInt(body.kepuasanKualitas),
        kepuasanKeramahan: parseInt(body.kepuasanKeramahan),
        kepuasanKemudahan: parseInt(body.kepuasanKemudahan),
        informasiDicari: body.informasiDicari || null,
        saran: body.saran || null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: survei,
      message: 'Survei berhasil dikirim'
    })
  } catch (error) {
    console.error('Error creating survei:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}