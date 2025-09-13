import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Clock, CheckCircle, AlertCircle, Users, Download, ArrowRight } from 'lucide-react'

export default function TataCaraPermohonanPage() {
  const tahapan = [
    {
      nomor: 1,
      judul: "Pengajuan Permohonan",
      icon: Users,
      deskripsi: "Pemohon mengajukan permohonan informasi secara tertulis dengan melampirkan identitas diri",
      detail: [
        "Mengisi formulir permohonan yang telah disediakan",
        "Menyertakan fotokopi KTP/SIM/Paspor",
        "Menjelaskan rincian informasi yang dibutuhkan",
        "Menyebutkan tujuan penggunaan informasi"
      ]
    },
    {
      nomor: 2,
      judul: "Verifikasi Permohonan",
      icon: CheckCircle,
      deskripsi: "PPID melakukan verifikasi kelengkapan dan kejelasan permohonan",
      detail: [
        "Memeriksa kelengkapan persyaratan administrasi",
        "Memastikan kejelasan rincian informasi yang diminta",
        "Memberikan nomor registrasi permohonan",
        "Membuat berita acara penerimaan permohonan"
      ]
    },
    {
      nomor: 3,
      judul: "Proses Pencarian Informasi",
      icon: FileText,
      deskripsi: "PPID mencari dan mengumpulkan informasi yang diminta",
      detail: [
        "Mencari informasi di database internal",
        "Mengkoordinasikan dengan unit kerja terkait",
        "Mengolah informasi sesuai permintaan",
        "Membuat draf jawaban/respon"
      ]
    },
    {
      nomor: 4,
      judul: "Pemberian Informasi",
      icon: CheckCircle,
      deskripsi: "PPID memberikan informasi kepada pemohon",
      detail: [
        "Memberikan informasi dalam bentuk yang diminta",
        "Membuat berita acara penyerahan informasi",
        "Mencatat waktu pemberian informasi",
        "Meminta tanda terima dari pemohon"
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tata Cara Permohonan Informasi</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Prosedur dan tahapan dalam mengajukan permohonan informasi publik kepada PPID Diskominfo Kabupaten Sikka
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
                    <li>• Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik</li>
                    <li>• Peraturan Komisi Informasi Nomor 1 Tahun 2010 tentang Standar Layanan Informasi Publik</li>
                    <li>• Peraturan Daerah Kabupaten Sikka tentang Penyelenggaraan Pelayanan Informasi Publik</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Hak dan Kewajiban</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Hak Pemohon</p>
                        <p className="text-xs text-gray-600">Mengakses, memperoleh, dan menggunakan informasi publik</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Kewajiban Pemohon</p>
                        <p className="text-xs text-gray-600">Menggunakan informasi sesuai tujuan dan tidak merugikan pihak lain</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tahapan Proses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tahapan Proses Permohonan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tahapan.map((tahap, index) => (
                <Card key={tahap.nomor} className="relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {tahap.nomor}
                  </div>
                  <CardHeader className="pt-6">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <tahap.icon className="w-5 h-5 text-blue-600" />
                      <span>{tahap.judul}</span>
                    </CardTitle>
                    <CardDescription>{tahap.deskripsi}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tahap.detail.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                          <ArrowRight className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Waktu Pelayanan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Waktu Standar Pelayanan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">Informasi Siap Saji</p>
                      <p className="text-sm text-green-600">Maksimal 1 hari kerja</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Cepat</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800">Informasi Standar</p>
                      <p className="text-sm text-yellow-600">Maksimal 5 hari kerja</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Sedang</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-orange-800">Informasi Kompleks</p>
                      <p className="text-sm text-orange-600">Maksimal 10 hari kerja</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Lama</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Hal yang Perlu Diperhatikan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      <strong>Ditolak:</strong> Permohonan tidak jelas tujuannya atau informasi yang diminta dikecualikan
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      <strong>Diperpanjang:</strong> Untuk informasi yang memerlukan koordinasi lintas unit kerja
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      <strong>Dapat diajukan keberatan:</strong> Jika permohonan ditolak atau tidak ditanggapi
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Dokumen</span>
              </CardTitle>
              <CardDescription>
                Download formulir dan panduan terkait permohonan informasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center space-x-2 h-auto p-4">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">Formulir Permohonan</p>
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