import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test statistik table
    const statistik = await db.statistik.findFirst()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful!',
      data: statistik 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    }, { status: 500 })
  }
}