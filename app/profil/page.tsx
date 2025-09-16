import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, MapPin, Phone, Mail } from 'lucide-react'

export default function ProfilPage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Profil PPID</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pejabat Pengelola Informasi dan Dokumentasi Dinas Komunikasi, Informatika, Statistik dan Kearsipan Kabupaten Sikka
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visi Misi */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Visi dan Misi</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Visi</h3>
                    <p className="text-gray-600">
                      "Terwujudnya Pelayanan Informasi Publik yang Transparan, Akuntabel, dan Responsif dalam Mendukung Good Governance di Kabupaten Sikka"
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Misi</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Menyediakan akses informasi publik yang mudah dan cepat</li>
                      <li>Meningkatkan kualitas pelayanan informasi kepada masyarakat</li>
                      <li>Menjamin ketersediaan informasi yang berkualitas dan akurat</li>
                      <li>Membangun sistem dokumentasi yang modern dan terintegrasi</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Kontak */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Kontak Kami</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium">Alamat</p>
                      <p className="text-sm text-gray-600">
                        Jl. Soekarno-Hatta No. 1, Maumere, NTT
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium">Telepon</p>
                      <p className="text-sm text-gray-600">(0382) 12345</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">
                        ppid@diskominfo.sikka.go.id
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tupoksi */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Tugas Pokok dan Fungsi (Tupoksi)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Tugas Pokok:</h3>
                  <p className="text-gray-600">
                    PPID Diskominfo Sikka bertugas menyediakan, memberikan, dan/atau mempublikasikan 
                    informasi publik kepada pemohon informasi, serta melaksanakan administrasi dokumentasi.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Fungsi:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Pengelolaan dan penyediaan informasi publik</li>
                    <li>Pelayanan informasi dan dokumentasi</li>
                    <li>Koordinasi dan konsultasi terkait informasi publik</li>
                    <li>Pelaporan dan evaluasi pelayanan informasi publik</li>
                    <li>Pengembangan sistem informasi dan dokumentasi</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}