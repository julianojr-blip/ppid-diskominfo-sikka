import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Scale, 
  FileText, 
  Clock, 
  CheckCircle, 
  Users, 
  Download, 
  ArrowRight,
  Info,
  Gavel,
  AlertTriangle
} from 'lucide-react'

export default function TataCaraSengketaPage() {
  const tahapan = [
    {
      nomor: 1,
      judul: "Pengajuan Sengketa",
      icon: Users,
      deskripsi: "Pemohon mengajukan sengketa kepada Komisi Informasi",
      detail: [
        "Mengisi formulir pengajuan sengketa",
        "Menyertakan bukti penolakan keberatan",
        "Melampirkan semua dokumen terkait",
        "Membayar biaya pendaftaran (jika ada)"
      ]
    },
    {
      nomor: 2,
      judul: "Registrasi & Verifikasi",
      icon: CheckCircle,
      deskripsi: "Komisi Informasi mendaftarkan dan memverifikasi sengketa",
      detail: [
        "Memberikan nomor registrasi sengketa",
        "Memeriksa kelengkapan dokumen",
        "Menentukan jadwal mediasi",
        "Memberitahukan kepada tergugat"
      ]
    },
    {
      nomor: 3,
      judul: "Mediasi",
      icon: Scale,
      deskripsi: "Proses mediasi antara pemohon dan badan publik",
      detail: [
        "Pertemuan mediasi yang difasilitasi mediator",
        "Presentasi posisi masing-masing pihak",
        "Negosiasi untuk mencari kesepakatan",
        "Pembuatan berita acara mediasi"
      ]
    },
    {
      nomor: 4,
      judul: "Putusan Sengketa",
      icon: Gavel,
      deskripsi: "Komisi Informasi mengambil keputusan akhir",
      detail: [
        "Menerima seluruhnya gugatan pemohon",
        "Menerima sebagian dan menolak sebagian",
        "Menolak seluruhnya gugatan pemohon",
        "Keputusan bersifat final dan mengikat"
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Scale className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl font-bold text-gray-900">Tata Cara Penyelesaian Sengketa</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Prosedur dan tahapan penyelesaian sengketa informasi publik melalui Komisi Informasi
            </p>
          </div>

          {/* Dasar Hukum */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Dasar Hukum</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Peraturan Perundang-undangan</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Undang-Undang Nomor 14 Tahun 2008 Pasal 29-34</li>
                    <li>• Peraturan Komisi Informasi Nomor 2 Tahun 2011</li>
                    <li>• Peraturan Komisi Informasi Nomor 1 Tahun 2013</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Waktu Penting</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Pengajuan Sengketa</p>
                        <p className="text-xs text-gray-600">Maksimal 14 hari sejak keberatan ditolak</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Proses Sengketa</p>
                        <p className="text-xs text-gray-600">Maksimal 100 hari kerja</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tahapan Proses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tahapan Proses Sengketa</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tahapan.map((tahap, index) => (
                <Card key={tahap.nomor} className="relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {tahap.nomor}
                  </div>
                  <CardHeader className="pt-6">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <tahap.icon className="w-5 h-5 text-purple-600" />
                      <span>{tahap.judul}</span>
                    </CardTitle>
                    <CardDescription>{tahap.deskripsi}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tahap.detail.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                          <ArrowRight className="w-3 h-3 text-purple-600 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Jenis Sengketa */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Jenis Sengketa yang Dapat Diajukan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Badan publik tidak merespons permohonan informasi</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Badan publik menolak permohonan secara tidak wajar</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Tidak puas dengan tanggapan badan publik</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Keberatan ditolak tanpa alasan yang jelas</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Informasi yang diberikan tidak sesuai permintaan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="w-5 h-5" />
                  <span>Hasil Putusan Sengketa</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">Dikabulkan</p>
                      <p className="text-sm text-green-600">Badan publik wajib memenuhi permintaan</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Menang</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800">Dikabulkan Sebagian</p>
                      <p className="text-sm text-yellow-600">Badan publik memenuhi sebagian permintaan</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Kompromi</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-800">Ditolak</p>
                      <p className="text-sm text-red-600">Permintaan pemohon tidak beralasan</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Ditolak</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Komisi Informasi */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gavel className="w-5 h-5" />
                <span>Komisi Informasi Provinsi NTT</span>
              </CardTitle>
              <CardDescription>
                Lembaga yang berwenang menyelesaikan sengketa informasi publik
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Kontak & Alamat</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Alamat:</strong> Jl. El Tari No. 16, Kupang</p>
                    <p><strong>Telepon:</strong> (0380) 832144</p>
                    <p><strong>Email:</strong> ki-provntt@komisiinformasi.go.id</p>
                    <p><strong>Website:</strong> www.kominfo.nttprov.go.id</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Jam Layanan</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Senin-Kamis:</strong> 09:00 - 16:00</p>
                    <p><strong>Jumat:</strong> 09:00 - 11:30</p>
                    <p><strong>Sabtu/Minggu:</strong> Tutup</p>
                    <p><strong>Hari Libur:</strong> Tutup</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Dokumen</span>
              </CardTitle>
              <CardDescription>
                Download formulir dan panduan terkait penyelesaian sengketa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center space-x-2 h-auto p-4">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">Formulir Sengketa</p>
                    <p className="text-xs text-gray-500">Format PDF</p>
                  </div>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 h-auto p-4">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">Panduan Pengisian</p>
                    <p className="text-xs text-gray-500">Format PDF</p>
                  </div>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 h-auto p-4">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">Alur Proses</p>
                    <p className="text-xs text-gray-500">Infografis</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}