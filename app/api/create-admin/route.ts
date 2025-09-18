import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await db.user.findUnique({
      where: { email: "admin@example.com" }
    })

    if (existingAdmin) {
      return NextResponse.json({ 
        message: "Admin already exists", 
        user: existingAdmin 
      })
    }

    // Create admin user
    const adminUser = await db.user.create({
      data: {
        email: "admin@example.com",
        name: "Admin PPID",
        role: "ADMIN",
      }
    })

    return NextResponse.json({ 
      message: "Admin user created successfully", 
      user: adminUser 
    })
  } catch (error) {
    console.error("Error creating admin:", error)
    return NextResponse.json(
      { error: "Failed to create admin user" }, 
      { status: 500 }
    )
  }
}