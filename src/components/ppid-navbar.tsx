'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Home, User, Search, FileQuestion, MessageSquare, BarChart3, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export default function PPIDNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Profil', href: '/profil', icon: User },
    { name: 'Tracking', href: '/tracking', icon: Search },
    { 
      name: 'Layanan PPID', 
      href: '/layanan',
      icon: FileQuestion,
      isDropdown: true,
      dropdownItems: [
        { name: 'Berita PPID', href: '/layanan/berita' },
        { name: 'Statistik PPID', href: '/layanan/statistik' },
        { name: 'Tata Cara Permohonan Informasi', href: '/layanan/tata-cara-permohonan' },
        { name: 'Tata Cara Pengajuan Keberatan', href: '/layanan/tata-cara-keberatan' },
        { name: 'Tata Cara Penyelesaian Sengketa', href: '/layanan/tata-cara-sengketa' },
        { name: 'Form Permohonan Informasi', href: '/layanan/form-permohonan' },
        { name: 'Form Pengajuan Keberatan', href: '/layanan/form-keberatan' },
      ]
    },
    { 
      name: 'Daftar Informasi', 
      href: '/informasi',
      icon: BarChart3,
      isDropdown: true,
      dropdownItems: [
        { name: 'Daftar Informasi Berkala', href: '/informasi/berkala' },
        { name: 'Daftar Informasi Serta Merta', href: '/informasi/serta-merta' },
        { name: 'Daftar Informasi Setiap Saat', href: '/informasi/setiap-saat' },
        { name: 'Daftar Informasi Dikecualikan', href: '/informasi/dikecualikan' },
      ]
    },
    { name: 'FAQ', href: '/faq', icon: MessageSquare },
    { name: 'Survei Layanan', href: '/survei', icon: BarChart3 },
  ]

  const NavItems = ({ mobile = false }) => (
    <>
      {navigation.map((item) => (
        <div key={item.name} className="flex items-center">
          {item.isDropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-1 ${mobile ? 'justify-start w-full p-2 h-auto' : 'text-gray-700 hover:text-blue-600'}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {item.dropdownItems.map((dropdownItem) => (
                  <DropdownMenuItem key={dropdownItem.name} asChild>
                    <Link href={dropdownItem.href} className="text-sm">
                      {dropdownItem.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={item.href}
              className={`flex items-center space-x-1 ${mobile ? 'text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          )}
        </div>
      ))}
    </>
  )

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PPID</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">PPID</h1>
                <p className="text-xs text-gray-500">Diskominfo Sikka</p>
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