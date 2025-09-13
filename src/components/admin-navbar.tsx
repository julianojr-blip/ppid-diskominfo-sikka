'use client' // Pastikan ini ada di bagian paling atas

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Home, Users, FileText, LogOut, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

  // Handle loading state
  if (status === "loading") {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="animate-pulse flex space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Permohonan', href: '/admin/permohonan', icon: FileText },
    { name: 'Pengguna', href: '/admin/pengguna', icon: Users },
  ]

  const NavItems = ({ mobile = false }) => (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center space-x-1 ${mobile ? 'text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}
        >
          <item.icon className="w-4 h-4" />
          <span className="text-sm font-medium">{item.name}</span>
        </Link>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`flex items-center space-x-1 ${mobile ? 'justify-start w-full p-2 h-auto' : 'text-gray-700 hover:text-blue-600'}`}
          >
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {session?.user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <span className="text-sm font-medium">{session?.user?.name || 'Admin'}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ADM</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
                <p className="text-xs text-gray-500">PPID Sikka</p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavItems />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Buka menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavItems mobile={true} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}