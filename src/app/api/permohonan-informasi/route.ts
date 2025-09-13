// src/app/api/permohonan-informasi/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { PermohonanStatus } from '@prisma/client'

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
      where.status = status as PermohonanStatus // Cast ke enum
    }
    if (search) {
      where.OR = [
        { nama: { contains: search, mode: 'insensitive' } }, // Fix: namaPemohon -> nama
        { nomorRegistrasi: { contains: search, mode: 'insensitive' } }, // Fix: nomorPermohonan -> nomorRegistrasi
        { email: { contains: search, mode: 'insensitive' } },
        { rincianInformasi: { contains: search, mode: 'insensitive' } } // Fix: jenisInformasi -> rincianInformasi
      ]
    }
    
    const [permohonan, total] = await Promise.all([
      db.permohonanInformasi.findMany({ // Fix: permohonan -> permohonanInformasi
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
          }
        }
      }),
      db.permohonanInformasi.count({ where }) // Fix: permohonan -> permohonanInformasi
    ])
    
    return NextResponse.json({
      success: true,
      data: permohonan,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching permohonan:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate nomor permohonan
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const count = await db.permohonanInformasi.count({
      where: {
        createdAt: {
          gte: new Date(date.getFullYear(), date.getMonth(), 1),
          lt: new Date(date.getFullYear(), date.getMonth() + 1, 1)
        }
      }
    })
    const nomorRegistrasi = `PPID-${year}${month}-${String(count + 1).padStart(4, '0')}`
    
    // Create permohonan
    const permohonan = await db.permohonanInformasi.create({
      data: {
        nomorRegistrasi, // Fix: nomorPermohonan -> nomorRegistrasi
        userId: body.userId || null,
        nama: body.namaLengkap, // Fix: namaPemohon -> nama
        email: body.email,
        telepon: body.noHp, // Fix: noHp -> telepon
        alamat: body.alamat,
        pekerjaan: body.pekerjaan || null,
        tujuan: body.tujuanPenggunaan, // Fix: tujuanPenggunaan -> tujuan
        rincianInformasi: body.rincianInformasi,
        caraMemperoleh: body.caraMemperoleh,
        caraPenyampaian: body.caraMendapatkan, // Fix: caraMendapatkan -> caraPenyampaian
        status: 'DITERIMA' as PermohonanStatus, // Fix: Cast ke enum
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
      data: permohonan,
      message: 'Permohonan informasi berhasil dibuat'
    })
  } catch (error) {
    console.error('Error creating permohonan:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}