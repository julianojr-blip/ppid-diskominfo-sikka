'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Users, 
  FileText, 
  BarChart3, 
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Settings
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalPermohonan: 0,
    permohonanProses: 0,
    permohonanSelesai: 0,
    permohonanDitolak: 0,
    totalKeberatan: 0,
    totalSurvei: 0,
    totalBerita: 0,
    totalInformasi: 0
  })

  useEffect(() => {
    if (status === "loading") return
    if (!session || session.user?.role !== "ADMIN") {
      router.push("/admin/login")
    }
  }, [session, status, router])

  useEffect(() => {
    // Fetch real statistics from database
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/perminformasi')
        const data = await response.json()
        
        if (data.data) {
          const permohonan = data.data
          setStats(prev => ({
            ...prev,
            totalPermohonan: permohonan.length,
            permohonanProses: permohonan.filter(p => p.status === 'MENUNGGU' || p.status === 'DIPROSES').length,
            permohonanSelesai: permohonan.filter(p => p.status === 'SELESAI').length,
            permohonanDitolak: permohonan.filter(p => p.status === 'DITOLAK').length
          }))
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== "ADMIN") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Admin PPID Dashboard
                </h1>
                <p className="text-sm text-gray-500">Diskominfo Kabupaten Sikka</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  window.location.href = "/api/auth/signout"
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat Datang, {session.user?.name}!
            </h2>
            <p className="text-gray-600">
              Dashboard administrasi PPID Diskominfo Kabupaten Sikka - Kelola layanan informasi publik dengan mudah dan efisien
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Permohonan</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPermohonan}</div>
                <p className="text-xs text-muted-foreground">
                  Total permohonan informasi
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.permohonanProses}</div>
                <p className="text-xs text-muted-foreground">
                  Sedang diproses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.permohonanSelesai}</div>
                <p className="text-xs text-muted-foreground">
                  Permohonan selesai
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.permohonanDitolak}</div>
                <p className="text-xs text-muted-foreground">
                  Permohonan ditolak
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PPID Operations */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Operasional PPID</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/admin/permohonan">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        Permohonan Informasi
                      </CardTitle>
                      <CardDescription>
                        Kelola permohonan informasi masuk
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{stats.totalPermohonan} Total</Badge>
                        <Eye className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/keberatan">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                        Keberatan
                      </CardTitle>
                      <CardDescription>
                        Kelola pengajuan keberatan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{stats.totalKeberatan} Total</Badge>
                        <Eye className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/survei">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                        Survei Kepuasan
                      </CardTitle>
                      <CardDescription>
                        Hasil survei layanan masyarakat
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{stats.totalSurvei} Total</Badge>
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/tracking">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <Clock className="h-5 w-5 mr-2 text-purple-600" />
                        Tracking
                      </CardTitle>
                      <CardDescription>
                        Tracking permohonan real-time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">Live</Badge>
                        <Eye className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Content Management */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Manajemen Konten</h3>
              <div className="space-y-4">
                <Link href="/admin/berita">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                        Berita PPID
                      </CardTitle>
                      <CardDescription>
                        Kelola berita dan pengumuman
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{stats.totalBerita} Artikel</Badge>
                        <Plus className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/informasi">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <Settings className="h-5 w-5 mr-2 text-cyan-600" />
                        Informasi Publik
                      </CardTitle>
                      <CardDescription>
                        Kelola informasi publik semua kategori
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{stats.totalInformasi} Item</Badge>
                        <Edit className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/faq">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <Users className="h-5 w-5 mr-2 text-pink-600" />
                        FAQ Management
                      </CardTitle>
                      <CardDescription>
                        Kelola pertanyaan umum
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">Q&A</Badge>
                        <Edit className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">
                      <Download className="h-5 w-5 mr-2 text-gray-600" />
                      Export Data
                    </CardTitle>
                    <CardDescription>
                      Download laporan dan data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">CSV, PDF</Badge>
                      <Download className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Permohonan baru masuk</p>
                      <p className="text-xs text-gray-500">REG/2025/001 - 2 jam yang lalu</p>
                    </div>
                    <Badge variant="outline">BARU</Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Permohonan selesai diproses</p>
                      <p className="text-xs text-gray-500">REG/2024/099 - 5 jam yang lalu</p>
                    </div>
                    <Badge variant="outline">SELESAI</Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Keberatan diajukan</p>
                      <p className="text-xs text-gray-500">KEB/2024/001 - 1 hari yang lalu</p>
                    </div>
                    <Badge variant="outline">PROSES</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}