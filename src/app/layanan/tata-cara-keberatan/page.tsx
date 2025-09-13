import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle, 
  FileText, 
  Clock, 
  CheckCircle, 
  Users, 
  Download, 
  ArrowRight,
  Info,
  Gavel
} from 'lucide-react'

export default function TataCaraKeberatanPage() {
  const tahapan = [
    {
      nomor: 1,
      judul: "Pengajuan Keberatan",
      icon: Users,
      deskripsi: "Pemohon mengajukan keberatan secara tertulis kepada Atasan PPID",
      detail: [
        "Mengisi formulir pengajuan keberatan",
        "Menyertakan bukti penerimaan tanggapan PPID",
        "Menjelaskan alasan keberatan secara jelas",
        "Menyebutkan tindakan yang diharapkan"
      ]
    },
    {
      nomor: 2,
      judul: "Verifikasi Keberatan",
      icon: CheckCircle,
      deskripsi: "Atasan PPID memverifikasi kelengkapan dan keabsahan keberatan",
      detail: [
        "Memeriksa kelengkapan persyaratan",
        "Memastikan batas waktu pengajuan (30 hari)",
        "Memberikan nomor registrasi keberatan",
        "Membuat berita acara penerimaan"
      ]
    },
    {
      nomor: 3,
      judul: "Proses Penelaahan",
      icon: FileText,
      deskripsi: "Atasan PPID menelaah keberatan dan tanggapan PPID",
      detail: [
        "Memanggil PPID untuk klarifikasi",
        "Menganalisis alasan keberatan",
        "Memeriksa dokumen pendukung",
        "Membuat pertimbangan hukum"
      ]
    },
    {
      nomor: 4,
      judul: "Keputusan Keberatan",
      icon: Gavel,
      deskripsi: "Atasan PPID mengambil keputusan atas keberatan",
      detail: [
        "Menerima keberatan dan memerintahkan PPID memenuhi permohonan",
        "Menerima sebagian dan menolak sebagian keberatan",
        "Menolak keberatan dengan alasan yang jelas",
        "Memberitahukan keputusan kepada pemohon"
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
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <h1 className="text-4xl font-bold text-gray-900">Tata Cara Pengajuan Keberatan</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Prosedur dan tahapan dalam mengajukan keberatan atas tanggapan PPID terhadap permohonan informasi publik
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
                    <li>• Undang-Undang Nomor 14 Tahun 2008 Pasal 24-28</li>
                    <li>• Peraturan Komisi Informasi Nomor 1 Tahun 2010</li>
                    <li>• Peraturan Menteri Dalam Negeri Nomor 35 Tahun 2010</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Waktu Penting</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Pengajuan Keberatan</p>
                        <p className="text-xs text-gray-600">Maksimal 30 hari sejak menerima tanggapan</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Proses Keberatan</p>
                        <p className="text-xs text-gray-600">Maksimal 30 hari kerja sejak diterima</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tahapan Proses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tahapan Proses Keberatan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tahapan.map((tahap, index) => (
                <Card key={tahap.nomor} className="relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {tahap.nomor}
                  </div>
                  <CardHeader className="pt-6">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <tahap.icon className="w-5 h-5 text-orange-600" />
                      <span>{tahap.judul}</span>
                    </CardTitle>
                    <CardDescription>{tahap.deskripsi}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tahap.detail.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                          <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Alasan Keberatan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Alasan Pengajuan Keberatan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Tanggapan melebihi batas waktu 10 hari kerja</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Informasi yang diberikan tidak sesuai permintaan</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Permohonan ditolak tanpa alasan yang jelas</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Biaya yang dibebankan tidak sesuai ketentuan</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Penolakan informasi yang seharusnya terbuka</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="w-5 h-5" />
                  <span>Hasil Keberatan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">Diterima</p>
                      <p className="text-sm text-green-600">PPID wajib memenuhi permohonan</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Menang</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800">Diterima Sebagian</p>
                      <p className="text-sm text-yellow-600">PPID memenuhi sebagian permintaan</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Kompromi</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-800">Ditolak</p>
                      <p className="text-sm text-red-600">Keberatan tidak beralasan</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Ditolak</Badge>
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
                Download formulir dan panduan terkait pengajuan keberatan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center space-x-2 h-auto p-4">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">Formulir Keberatan</p>
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