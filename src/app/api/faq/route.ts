import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const kategori = searchParams.get('kategori')

    const where: any = { isActive: true }
    if (kategori && kategori !== 'Semua') {
      where.kategori = kategori
    }

    const faq = await db.fAQ.findMany({
      where,
      orderBy: { urutan: 'asc' }
    })

    return NextResponse.json({
      success: true,
      data: faq
    })
  } catch (error) {
    console.error('Error fetching FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Get the highest urutan for the category
    const highestUrutan = await db.fAQ.findFirst({
      where: { kategori: body.kategori },
      orderBy: { urutan: 'desc' }
    })

    const urutan = highestUrutan ? highestUrutan.urutan + 1 : 1

    // Create FAQ
    const faq = await db.fAQ.create({
      data: {
        pertanyaan: body.pertanyaan,
        jawaban: body.jawaban,
        kategori: body.kategori,
        urutan,
        isActive: body.isActive ?? true
      }
    })

    return NextResponse.json({
      success: true,
      data: faq,
      message: 'FAQ berhasil dibuat'
    })
  } catch (error) {
    console.error('Error creating FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}