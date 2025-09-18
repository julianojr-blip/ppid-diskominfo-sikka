import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tahun = parseInt(searchParams.get('tahun') || new Date().getFullYear().toString())

    // Get monthly statistics for the year
    const statistik = await db.statistik.findMany({
      where: { tahun },
      orderBy: [
        { bulan: 'asc' }
      ]
    })

    // Get current year overview
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    const overview = await db.statistik.aggregate({
      where: { tahun: currentYear },
      _sum: {
        totalInformasi: true,
        totalPermohonan: true,
        permohonanDiproses: true,
        permohonanSelesai: true
      },
      _avg: {
        tingkatKepuasan: true
      }
    })

    // Get recent permohonan status
    const permohonanStatus = await db.permohonanInformasi.groupBy({
      by: ['status'],
      _count: {
        status: true
      },
      orderBy: {
        status: 'asc'
      }
    })

    // Get kepuasan data from surveys
    const kepuasanData = await db.survei.aggregate({
      _avg: {
        kepuasanKeseluruhan: true,
        kepuasanKecepatan: true,
        kepuasanKualitas: true,
        kepuasanKeramahan: true,
        kepuasanKemudahan: true
      },
      _count: {
        id: true
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        statistik,
        overview: {
          totalInformasi: overview._sum.totalInformasi || 0,
          totalPermohonan: overview._sum.totalPermohonan || 0,
          permohonanDiproses: overview._sum.permohonanDiproses || 0,
          permohonanSelesai: overview._sum.permohonanSelesai || 0,
          tingkatKepuasan: overview._avg.tingkatKepuasan || 0
        },
        permohonanStatus,
        kepuasanData: {
          ...kepuasanData,
          totalSurvei: kepuasanData._count.id
        }
      }
    })
  } catch (error) {
    console.error('Error fetching statistik:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}