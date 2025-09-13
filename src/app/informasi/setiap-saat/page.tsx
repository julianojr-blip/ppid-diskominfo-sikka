import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Calendar, ExternalLink, Search, Filter, Info, Database } from 'lucide-react'

export default function InformasiSetiapSaatPage() {
  const informasiList = [
    {
      id: 1,
      judul: "Daftar Nama Pejabat PPID",
      kategori: "Kepegawaian",
      tanggal: "Update Real-time",
      ukuran: "245 KB",
      format: "PDF",
      deskripsi: "Daftar nama dan jabatan pejabat PPID Diskominfo Kabupaten Sikka yang selalu diperbarui",
      akses: "Publik"
    },
    {
      id: 2,
      judul: "Data Kontak Layanan",
      kategori: "Layanan",
      tanggal: "Update Real-time",
      ukuran: "156 KB",
      format: "PDF",
      deskripsi: "Data kontak layanan PPID termasuk telepon, email, dan alamat",
      akses: "Publik"
    },
    {
      id: 3,
      judul: "Jam Layanan Kantor",
      kategori: "Layanan",
      tanggal: "Update Real-time",
      ukuran: "134 KB",
      format: "PDF",
      deskripsi: "Jam buka dan tutup layanan kantor PPID Diskominfo Kabupaten Sikka",
      akses: "Publik"
    },
    {
      id: 4,
      judul: "Prosedur Pelayanan",
      kategori: "Prosedur",
      tanggal: "Update Real-time",
      ukuran: "423 KB",
      format: "PDF",
      deskripsi: "Prosedur standar pelayanan informasi publik di PPID Diskominfo Kabupaten Sikka",
      akses: "Publik"
    },
    {
      id: 5,
      judul: "Daftar Informasi Tersedia",
      kategori: "Katalog",
      tanggal: "Update Real-time",
      ukuran: "1.8 MB",
      format: "PDF",
      deskripsi: "Katalog informasi yang tersedia di PPID Diskominfo Kabupaten Sikka",
      akses: "Publik"
    },
    {
      id: 6,
      judul: "Biaya Layanan",
      kategori: "Keuangan",
      tanggal: "Update Real-time",
      ukuran: "267 KB",
      format: "PDF",
      deskripsi: "Informasi mengenai biaya layanan informasi publik di PPID Diskominfo Kabupaten Sikka",
      akses: "Publik"
    }
  ]

  const kategoriList = ["Semua", "Kepegawaian", "Layanan", "Prosedur", "Katalog", "Keuangan"]

  const getAksesBadge = (akses: string) => {
    switch (akses) {
      case "Publik":
        return <Badge className="bg-green-100 text-green-800">Publik</Badge>
      case "Terbatas":
        return <Badge className="bg-yellow-100 text-yellow-800">Terbatas</Badge>
      case "Internal":
        return <Badge className="bg-red-100 text-red-800">Internal</Badge>
      default:
        return <Badge variant="secondary">{akses}</Badge>
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Database className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Daftar Informasi Setiap Saat</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Informasi yang wajib tersedia setiap saat dan dapat diakses oleh publik kapan saja dibutuhkan
            </p>
          </div>

          {/* Info Penting */}
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <Info className="w-5 h-5" />
                <span>Informasi Penting</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-blue-800">Apa itu Informasi Setiap Saat?</h4>
                  <p className="text-sm text-blue-700">
                    Informasi yang wajib tersedia setiap saat dan dapat diakses oleh publik tanpa harus melalui permohonan terlebih dahulu.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-blue-800">Ketersediaan</h4>
                  <p className="text-sm text-blue-700">
                    Informasi ini harus tersedia 24 jam sehari dan 7 hari seminggu melalui berbagai media akses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search dan Filter */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Pencarian Informasi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Cari informasi setiap saat..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filter Kategori */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Kategori Informasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {kategoriList.map((kategori, index) => (
                  <Badge 
                    key={index} 
                    variant={index === 0 ? "default" : "outline"} 
                    className="cursor-pointer hover:bg-blue-100"
                  >
                    {kategori}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daftar Informasi */}
          <div className="space-y-4">
            {informasiList.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.judul}</h3>
                        <Badge variant="secondary">{item.kategori}</Badge>
                        {getAksesBadge(item.akses)}
                      </div>
                      <p className="text-gray-600 mb-3">{item.deskripsi}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.tanggal}</span>
                        </div>
                        <span>Ukuran: {item.ukuran}</span>
                        <span>Format: {item.format}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-sm text-gray-600">Total Informasi</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">6</div>
                <div className="text-sm text-gray-600">Akses Publik</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
                <div className="text-sm text-gray-600">Kategori</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Jam Akses</div>
              </CardContent>
            </Card>
          </div>

          {/* Cara Akses */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>Cara Akses Informasi Setiap Saat</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Online</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Website PPID: www.ppid.sikkakab.go.id</li>
                    <li>• Media sosial resmi PPID</li>
                    <li>• Email: ppid@diskominfo.sikka.go.id</li>
                    <li>• WhatsApp: 0812-3456-7890</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Offline</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Kantor PPID (Jam kerja)</li>
                    <li>• Papan informasi kantor</li>
                    <li>• Brosur dan leaflet</li>
                    <li>• Informasi via telepon</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Singkat */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>FAQ Informasi Setiap Saat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-l-blue-500 pl-4">
                  <h4 className="font-medium text-sm">Q: Apakah perlu permohonan untuk akses informasi ini?</h4>
                  <p className="text-sm text-gray-600 mt-1">A: Tidak, informasi setiap saat dapat diakses langsung tanpa permohonan.</p>
                </div>
                <div className="border-l-4 border-l-blue-500 pl-4">
                  <h4 className="font-medium text-sm">Q: Apakah ada biaya untuk mengakses informasi ini?</h4>
                  <p className="text-sm text-gray-600 mt-1">A: Tidak, akses informasi setiap saat gratis kecuali untuk fotokopi/cetak.</p>
                </div>
                <div className="border-l-4 border-l-blue-500 pl-4">
                  <h4 className="font-medium text-sm">Q: Kapan saja informasi ini bisa diakses?</h4>
                  <p className="text-sm text-gray-600 mt-1">A: 24 jam sehari, 7 hari seminggu melalui media online.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}