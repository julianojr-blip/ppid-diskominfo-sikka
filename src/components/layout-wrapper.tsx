'use client'

import { usePathname } from 'next/navigation'
import PPIDNavbar from './ppid-navbar'
import PPIDFooter from './ppid-footer'
import dynamic from 'next/dynamic'

// Dynamic import untuk AdminNavbar dengan error handling
const AdminNavbar = dynamic(
  () => import('./admin-navbar').catch(() => {
    // Fallback jika admin-navbar tidak bisa dimuat
    return function FallbackAdminNavbar() {
      return (
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
            <div className="text-red-500">Error loading admin navigation</div>
          </div>
        </nav>
      )
    }
  }).then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
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
)

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <PPIDNavbar />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isAdminRoute && <PPIDFooter />}
    </>
  )
}