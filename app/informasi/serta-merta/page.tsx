import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Calendar, ExternalLink, Search, Filter, AlertTriangle, Clock } from 'lucide-react'

export default function InformasiSertaMertaPage() {
  const informasiList = [
    {
      id: 1,
      judul: "Informasi Banjir di Kecamatan Alok",
      kategori: "Bencana Alam",
      tanggal: "15 Januari 2024",
      ukuran: "1.2 MB",
      format: "PDF",
      deskripsi: "Informasi serta merta mengenai situasi banjir di Kecamatan Alok beserta data pengungsi dan bantuan",
      status: "Aktif"
    },
    {
      id: 2,
      judul: "Update COVID-19 Kabupaten Sikka",
      kategori: "Kesehatan",
      tanggal: "10 Januari 2024",
      ukuran: "856 KB",
      format: "PDF",
      deskripsi: "Data terkini perkembangan COVID-19 di Kabupaten Sikka beserta langkah penanganan",
      status: "Aktif"
    },
    {
      id: 3,
      judul: "Kebakaran Hutan di Pulau Flores",
      kategori: "Bencana Alam",
      tanggal: "5 Januari 2024",
      ukuran: "2.1 MB",
      format: "PDF",
      deskripsi: "Informasi kebakaran hutan di wilayah Pulau Flores dan upaya pemadaman",
      status: "Selesai"
    },
    {
      id: 4,
      judul: "Krisis Air Bersih di Kota Maumere",
      kategori: "Lingkungan",
      tanggal: "28 Desember 2023",
      ukuran: "745 KB",
      format: "PDF",
      deskripsi: "Informasi krisis air bersih di Kota Maumere dan solusi jangka pendek",
      status: "Selesai"
    },
    {
      id: 5,
      judul: "Wabah Diare di Kecamatan Nelle",
      kategori: "Kesehatan",
      tanggal: "20 Desember 2023",
      ukuran: "634 KB",
      format: "PDF",
      deskripsi: "Informasi wabah diare di Kecamatan Nelle dan langkah penanggulangan",
      status: "Selesai"
    }
  ]

  const kategoriList = ["Semua", "Bencana Alam", "Kesehatan", "Lingkungan"]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aktif":
        return <Badge className="bg-red-100 text-red-800">Aktif</Badge>
      case "Selesai":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h1 className="text-4xl font-bold text-gray-900">Daftar Informasi Serta Merta</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Informasi yang dapat mengancam hajat hidup orang banyak dan ekonomi negara yang harus diumumkan segera
            </p>
          </div>

          {/* Alert Penting */}
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                <span>Informasi Penting</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-red-800">Apa itu Informasi Serta Merta?</h4>
                  <p className="text-sm text-red-700">
                    Informasi yang dapat mengancam hajat hidup orang banyak dan kerugian ekonomi negara yang harus diumumkan segera.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-800">Waktu Penyampaian</h4>
                  <p className="text-sm text-red-700">
                    Paling lambat 2 x 24 jam sejak informasi diperoleh oleh badan publik.
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
                      placeholder="Cari informasi serta merta..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                    className="cursor-pointer hover:bg-red-100"
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
              <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.judul}</h3>
                        <Badge variant="secondary">{item.kategori}</Badge>
                        {getStatusBadge(item.status)}
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
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">5</div>
                <div className="text-sm text-gray-600">Total Informasi</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">2</div>
                <div className="text-sm text-gray-600">Masih Aktif</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                <div className="text-sm text-gray-600">Selesai</div>
              </CardContent>
            </Card>
          </div>

          {/* Info Card */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Waktu Layanan Darurat</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Jam Layanan</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Senin-Jumat:</strong> 24 jam</p>
                    <p><strong>Sabtu/Minggu:</strong> 24 jam</p>
                    <p><strong>Hari Libur:</strong> 24 jam</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Kontak Darurat</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Telepon:</strong> (0382) 12345 (Emergency)</p>
                    <p><strong>WhatsApp:</strong> 0812-3456-7890</p>
                    <p><strong>Email:</strong> emergency@diskominfo.sikka.go.id</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}