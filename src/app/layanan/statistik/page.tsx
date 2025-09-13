import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Users, 
  FileText, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Download,
  Calendar
} from 'lucide-react'

export default function StatistikPPIDPage() {
  const statsData = {
    overview: {
      totalInformasi: 156,
      totalPermohonan: 89,
      permohonanSelesai: 84,
      permohonanProses: 3,
      permohonanDitolak: 2,
      tingkatKepuasan: 94.5
    },
    permohonanBulanan: [
      { bulan: 'Jan', total: 12, selesai: 11 },
      { bulan: 'Feb', total: 8, selesai: 8 },
      { bulan: 'Mar', total: 15, selesai: 14 },
      { bulan: 'Apr', total: 10, selesai: 9 },
      { bulan: 'Mei', total: 7, selesai: 7 },
      { bulan: 'Jun', total: 9, selesai: 8 },
      { bulan: 'Jul', total: 11, selesai: 10 },
      { bulan: 'Agu', total: 6, selesai: 6 },
      { bulan: 'Sep', total: 8, selesai: 7 },
      { bulan: 'Okt', total: 3, selesai: 3 }
    ],
    kategoriInformasi: [
      { kategori: 'Berkala', jumlah: 45, persen: 65 },
      { kategori: 'Serta Merta', jumlah: 12, persen: 17 },
      { kategori: 'Setiap Saat', jumlah: 12, persen: 18 }
    ]
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Statistik PPID</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Data statistik layanan informasi publik PPID Diskominfo Kabupaten Sikka
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Informasi</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData.overview.totalInformasi}</div>
                <p className="text-xs text-muted-foreground">
                  +12 dari bulan lalu
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Permohonan Masuk</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData.overview.totalPermohonan}</div>
                <p className="text-xs text-muted-foreground">
                  +8 dari bulan lalu
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tingkat Kepuasan</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData.overview.tingkatKepuasan}%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% dari bulan lalu
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waktu Respon</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  jam rata-rata
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Status Permohonan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Status Permohonan</span>
                </CardTitle>
                <CardDescription>
                  Rekapitulasi status permohonan informasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Selesai</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{statsData.overview.permohonanSelesai}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {Math.round((statsData.overview.permohonanSelesai / statsData.overview.totalPermohonan) * 100)}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span>Diproses</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{statsData.overview.permohonanProses}</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {Math.round((statsData.overview.permohonanProses / statsData.overview.totalPermohonan) * 100)}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span>Ditolak</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{statsData.overview.permohonanDitolak}</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        {Math.round((statsData.overview.permohonanDitolak / statsData.overview.totalPermohonan) * 100)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kategori Informasi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Kategori Informasi</span>
                </CardTitle>
                <CardDescription>
                  Distribusi informasi berdasarkan kategori
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statsData.kategoriInformasi.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.kategori}</span>
                        <span className="text-sm text-gray-600">{item.jumlah} ({item.persen}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${item.persen}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Laporan */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Laporan Statistik</span>
              </CardTitle>
              <CardDescription>
                Download laporan statistik lengkap dalam format PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Laporan Bulanan</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Laporan Triwulan</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Laporan Tahunan</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}