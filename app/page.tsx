import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Users, Search, Download, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                PPID Diskominfo Kabupaten Sikka
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Pejabat Pengelola Informasi dan Dokumentasi
              </p>
              <p className="text-lg mb-10 max-w-3xl mx-auto text-blue-50">
                Memberikan layanan informasi publik yang transparan, akuntabel, dan responsif 
                sesuai dengan Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/permohonan">
                    <FileText className="w-5 h-5 mr-2" />
                    Ajukan Permohonan Informasi
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/informasi">
                    <Search className="w-5 h-5 mr-2" />
                    Cari Informasi Publik
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Layanan Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Layanan Kami</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Kami menyediakan berbagai layanan untuk memenuhi kebutuhan informasi publik Anda.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle>Informasi Publik</CardTitle>
                  <CardDescription>
                    Akses informasi publik yang tersedia secara langsung
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/informasi">Lihat Informasi</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle>Permohonan Informasi</CardTitle>
                  <CardDescription>
                    Ajukan permohonan informasi yang belum tersedia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/permohonan">Ajukan Permohonan</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle>Download Dokumen</CardTitle>
                  <CardDescription>
                    Unduh dokumen dan laporan yang tersedia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/download">Download Dokumen</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistik Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Statistik Layanan</h2>
              <p className="text-lg text-gray-600">
                Data layanan informasi publik yang telah kami berikan
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-gray-600">Informasi Publik</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">89</div>
                <div className="text-gray-600">Permohonan Diproses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600">Tingkat Kepuasan</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">24</div>
                <div className="text-gray-600">Jam Respon</div>
              </div>
            </div>
          </div>
        </section>

        {/* Berita Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Berita Terkini</h2>
              <p className="text-lg text-gray-600">
                Informasi terbaru seputar layanan PPID Diskominfo Sikka
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <CardTitle className="text-lg">Peningkatan Layanan Informasi Publik</CardTitle>
                  <CardDescription className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    2 hari yang lalu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    PPID Diskominfo Sikka terus berkomitmen untuk meningkatkan kualitas layanan informasi publik...
                  </p>
                  <Button variant="outline" size="sm">Baca Selengkapnya</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <CardTitle className="text-lg">Sosialisasi Keterbukaan Informasi</CardTitle>
                  <CardDescription className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    1 minggu yang lalu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Dilaksanakan sosialisasi pentingnya keterbukaan informasi publik kepada masyarakat...
                  </p>
                  <Button variant="outline" size="sm">Baca Selengkapnya</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <CardTitle className="text-lg">Laporan Tahunan PPID 2023</CardTitle>
                  <CardDescription className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    2 minggu yang lalu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Laporan tahunan pelaksanaan tugas dan fungsi PPID Diskominfo Sikka tahun 2023...
                  </p>
                  <Button variant="outline" size="sm">Baca Selengkapnya</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> fd94858ef5a9374ffd2e76a50c772b439a5f87cc
