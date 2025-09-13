import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Calendar, ExternalLink, Search, Filter, Lock, AlertTriangle, Shield, Eye } from 'lucide-react'

export default function InformasiDikecualikanPage() {
  const informasiList = [
    {
      id: 1,
      judul: "Informasi Keamanan Negara",
      kategori: "Keamanan",
      dasarHukum: "UU 14/2008 Pasal 17 huruf a",
      deskripsi: "Informasi yang dapat membahayakan pertahanan dan keamanan negara",
      periode: "Selamanya",
      akses: "Tidak Tersedia"
    },
    {
      id: 2,
      judul: "Data Investigasi KPK",
      kategori: "Hukum",
      dasarHukum: "UU 14/2008 Pasal 17 huruf b",
      deskripsi: "Informasi dalam rangka pencegahan tindak pidana dan proses penegakan hukum",
      periode: "Selama investigasi",
      akses: "Terbatas"
    },
    {
      id: 3,
      judul: "Rahasia Dagang & Bisnis BUMN",
      kategori: "Ekonomi",
      dasarHukum: "UU 14/2008 Pasal 17 huruf c",
      deskripsi: "Informasi yang dapat merugikan kepentingan perlindungan usaha dan persaingan sehat",
      periode: "Selamanya",
      akses: "Tidak Tersedia"
    },
    {
      id: 4,
      judul: "Data Pribadi Pegawai",
      kategori: "Kepegawaian",
      dasarHukum: "UU 14/2008 Pasal 17 huruf d",
      deskripsi: "Informasi pribadi yang dilindungi undang-undang",
      periode: "Selamanya",
      akses: "Tidak Tersedia"
    },
    {
      id: 5,
      judul: "Rapat Kabinet Internal",
      kategori: "Pemerintahan",
      dasarHukum: "UU 14/2008 Pasal 17 huruf e",
      deskripsi: "Informasi hasil rapat internal pemerintah yang bersifat rahasia",
      periode: "Selama 10 tahun",
      akses: "Tidak Tersedia"
    },
    {
      id: 6,
      judul: "Negosiasi Internasional",
      kategori: "Luar Negeri",
      dasarHukum: "UU 14/2008 Pasal 17 huruf f",
      deskripsi: "Informasi yang dapat merugikan hubungan internasional",
      periode: "Selama negosiasi",
      akses: "Tidak Tersedia"
    }
  ]

  const kategoriList = ["Semua", "Keamanan", "Hukum", "Ekonomi", "Kepegawaian", "Pemerintahan", "Luar Negeri"]

  const getAksesBadge = (akses: string) => {
    switch (akses) {
      case "Tidak Tersedia":
        return <Badge className="bg-red-100 text-red-800">Tidak Tersedia</Badge>
      case "Terbatas":
        return <Badge className="bg-yellow-100 text-yellow-800">Terbatas</Badge>
      case "Dengan Izin":
        return <Badge className="bg-orange-100 text-orange-800">Dengan Izin</Badge>
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
              <Lock className="w-8 h-8 text-red-600" />
              <h1 className="text-4xl font-bold text-gray-900">Daftar Informasi Dikecualikan</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Daftar informasi yang dikecualikan dari akses publik sesuai dengan ketentuan perundang-undangan
            </p>
          </div>

          {/* Warning Penting */}
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                <span>Peringatan Penting</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-red-800">Hak Akses Terbatas</h4>
                  <p className="text-sm text-red-700">
                    Informasi dalam daftar ini tidak dapat diakses oleh publik karena alasan hukum dan keamanan.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-800">Sanksi Pelanggaran</h4>
                  <p className="text-sm text-red-700">
                    Mencoba mengakses informasi yang dikecualikan dapat dikenakan sanksi hukum sesuai UU 14/2008.
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
                      placeholder="Cari informasi dikecualikan..." 
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
                        {getAksesBadge(item.akses)}
                      </div>
                      <p className="text-gray-600 mb-3">{item.deskripsi}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Dasar Hukum:</span>
                          <p className="text-gray-600">{item.dasarHukum}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Periode:</span>
                          <p className="text-gray-600">{item.periode}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Akses:</span>
                          <p className="text-gray-600">{item.akses}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm" disabled>
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" disabled>
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
                <div className="text-3xl font-bold text-red-600 mb-2">6</div>
                <div className="text-sm text-gray-600">Total Dikecualikan</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">4</div>
                <div className="text-sm text-gray-600">Kategori</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">6</div>
                <div className="text-sm text-gray-600">Dasar Hukum</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Terlindungi</div>
              </CardContent>
            </Card>
          </div>

          {/* Dasar Hukum Lengkap */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Dasar Hukum Informasi Dikecualikan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-l-red-500 pl-4">
                  <h4 className="font-semibold mb-2">Undang-Undang Nomor 14 Tahun 2008 Pasal 17</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Badan publik dapat mengecualikan informasi yang berkaitan dengan:
                  </p>
                  <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1 ml-4">
                    <li>Keamanan dan pertahanan negara</li>
                    <li>Proses penegakan hukum</li>
                    <li>Kepentingan ekonomi Indonesia</li>
                    <li>Hak atas kekayaan intelektual dan perlindungan dari persaingan tidak sehat</li>
                    <li>Hak pribadi</li>
                    <li>Rahasia jabatan</li>
                    <li>Hubungan diplomatik dengan negara lain</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prosedur Pengajuan Keberatan */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Prosedur Jika Ingin Mengakses Informasi Dikecualikan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Langkah-langkah:</h4>
                  <ol className="text-sm text-gray-600 list-decimal list-inside space-y-2">
                    <li>Ajukan permohonan informasi secara tertulis</li>
                    <li>Sertakan alasan mengapa informasi dibutuhkan</li>
                    <li>Tunggu proses verifikasi oleh PPID</li>
                    <li>Jika ditolak, ajukan keberatan</li>
                    <li>Ikuti proses sengketa jika diperlukan</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Catatan Penting:</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Tidak semua informasi dikecualikan bersifat permanen</li>
                    <li>• Beberapa informasi dapat dibuka setelah periode tertentu</li>
                    <li>• Keputusan pembukaan informasi menjadi kewenangan PPID</li>
                    <li>• Ada prosedur khusus untuk informasi terbatas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kontak */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Konsultasi Informasi Dikecualikan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Untuk Konsultasi:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Email:</strong> konsultasi@diskominfo.sikka.go.id</p>
                    <p><strong>Telepon:</strong> (0382) 12345</p>
                    <p><strong>WhatsApp:</strong> 0812-3456-7890</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Jam Layanan:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Senin-Kamis:</strong> 08:00 - 16:00</p>
                    <p><strong>Jumat:</strong> 08:00 - 11:30</p>
                    <p><strong>Sabtu/Minggu:</strong> Tutup</p>
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