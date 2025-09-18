import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (status) {
      where.status = status
    }
    if (search) {
      where.OR = [
        { namaPemohon: { contains: search, mode: 'insensitive' } },
        { nomorKeberatan: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { alasanKeberatan: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [keberatan, total] = await Promise.all([
      db.keberatan.findMany({
        where,
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
          },
          permohonanInformasi: {
            select: {
              id: true,
              nomorPermohonan: true,
              jenisInformasi: true
            }
          }
        }
      }),
      db.keberatan.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: keberatan,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching keberatan:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate nomor keberatan
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const count = await db.keberatan.count({
      where: {
        createdAt: {
          gte: new Date(date.getFullYear(), date.getMonth(), 1),
          lt: new Date(date.getFullYear(), date.getMonth() + 1, 1)
        }
      }
    })
    const nomorKeberatan = `KBR-${year}${month}-${String(count + 1).padStart(4, '0')}`

    // Create keberatan
    const keberatan = await db.keberatan.create({
      data: {
        nomorKeberatan,
        userId: body.userId || null,
        permohonanInformasiId: body.permohonanInformasiId,
        namaPemohon: body.namaLengkap,
        jenisPemohon: body.jenisPemohon,
        pekerjaan: body.pekerjaan || null,
        alamat: body.alamat,
        kelurahan: body.kelurahan || null,
        kecamatan: body.kecamatan || null,
        kota: body.kota || null,
        provinsi: body.provinsi || null,
        kodePos: body.kodePos || null,
        noTelp: body.noTelp || null,
        email: body.email,
        noKtp: body.noKtp || null,
        noHp: body.noHp,
        tanggalPermohonan: new Date(body.tanggalPermohonan),
        tanggalPenolakan: body.tanggalPenolakan ? new Date(body.tanggalPenolakan) : null,
        alasanKeberatan: body.alasanKeberatan,
        rincianKeberatan: body.rincianKeberatan,
        dokumenIdentitasUrl: body.dokumenIdentitasUrl || null,
        dokumenPermohonanUrl: body.dokumenPermohonanUrl || null,
        dokumenPenolakanUrl: body.dokumenPenolakanUrl || null,
        dokumenPendukungUrl: body.dokumenPendukungUrl || null,
        status: 'diterima'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        permohonanInformasi: {
          select: {
            id: true,
            nomorPermohonan: true,
            jenisInformasi: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: keberatan,
      message: 'Keberatan berhasil diajukan'
    })
  } catch (error) {
    console.error('Error creating keberatan:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}