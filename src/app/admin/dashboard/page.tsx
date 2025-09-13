'use client'

import { useEffect, useState } from 'react'
import { AdminNavbar } from '@/components/admin-navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Download,
  MessageSquare
} from 'lucide-react'

interface DashboardStats {
  overview: {
    totalInformasi: number
    totalPermohonan: number
    permohonanDiproses: number
    permohonanSelesai: number
    tingkatKepuasan: number
  }
  permohonanStatus: Array<{
    status: string
    _count: {
      status: number
    }
  }>
  kepuasanData: {
    _avg: {
      kepuasanKeseluruhan: number
      kepuasanKecepatan: number
      kepuasanKualitas: number
      kepuasanKeramahan: number
      kepuasanKemudahan: number
    }
    totalSurvei: number
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/statistik')
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      'diterima': 'bg-blue-100 text-blue-800',
      'diproses': 'bg-yellow-100 text-yellow-800',
      'selesai': 'bg-green-100 text-green-800',
      'ditolak': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600">Selamat datang di dashboard administrasi PPID</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Informasi</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.overview.totalInformasi || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Permohonan</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.overview.totalPermohonan || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tingkat Kepuasan</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.overview.tingkatKepuasan.toFixed(1) || 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                      {stats?.overview?.totalPermohonan && stats?.overview?.totalPermohonan > 0
                        ? Math.round(((stats?.overview?.permohonanSelesai || 0) / stats?.overview?.totalPermohonan) * 100)
                        : 0}%
                  </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Permohonan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Status Permohonan</span>
                </CardTitle>
                <CardDescription>
                  Distribusi status permohonan informasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.permohonanStatus.map((item) => (
                    <div key={item.status} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {item.status === 'diterima' && 'Diterima'}
                          {item.status === 'diproses' && 'Diproses'}
                          {item.status === 'selesai' && 'Selesai'}
                          {item.status === 'ditolak' && 'Ditolak'}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item._count.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Kepuasan Pelanggan</span>
                </CardTitle>
                <CardDescription>
                  Rata-rata penilaian kepuasan pelanggan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kepuasan Keseluruhan</span>
                    <span className="text-sm font-medium text-gray-900">
                      {stats?.kepuasanData._avg.kepuasanKeseluruhan?.toFixed(1) || 0}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kecepatan Pelayanan</span>
                    <span className="text-sm font-medium text-gray-900">
                      {stats?.kepuasanData._avg.kepuasanKecepatan?.toFixed(1) || 0}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kualitas Informasi</span>
                    <span className="text-sm font-medium text-gray-900">
                      {stats?.kepuasanData._avg.kepuasanKualitas?.toFixed(1) || 0}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Keramahan Petugas</span>
                    <span className="text-sm font-medium text-gray-900">
                      {stats?.kepuasanData._avg.kepuasanKeramahan?.toFixed(1) || 0}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kemudahan Proses</span>
                    <span className="text-sm font-medium text-gray-900">
                      {stats?.kepuasanData._avg.kepuasanKemudahan?.toFixed(1) || 0}/5
                    </span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Total Responden</span>
                      <span className="text-sm font-medium text-gray-900">
                        {stats?.kepuasanData.totalSurvei || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>
                Akses cepat ke fitur-fitur admin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                  <FileText className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Permohonan Baru</h3>
                  <p className="text-sm text-gray-600">
                    {stats?.permohonanStatus.find(s => s.status === 'diterima')?._count.status || 0} menunggu
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors">
                  <Clock className="w-8 h-8 text-yellow-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Diproses</h3>
                  <p className="text-sm text-gray-600">
                    {stats?.permohonanStatus.find(s => s.status === 'diproses')?._count.status || 0} permohonan
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                  <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Selesai</h3>
                  <p className="text-sm text-gray-600">
                    {stats?.permohonanStatus.find(s => s.status === 'selesai')?._count.status || 0} selesai
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                  <AlertCircle className="w-8 h-8 text-red-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Ditolak</h3>
                  <p className="text-sm text-gray-600">
                    {stats?.permohonanStatus.find(s => s.status === 'ditolak')?._count.status || 0} ditolak
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}