import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, ArrowRight, Newspaper } from 'lucide-react'

export default function BeritaPPIDPage() {
  const beritaList = [
    {
      id: 1,
      title: "PPID Diskominfo Sikka Luncurkan Layanan Informasi Digital",
      excerpt: "Dalam rangka meningkatkan pelayanan publik, PPID Diskominfo Sikka meluncurkan layanan informasi digital yang lebih mudah dan cepat...",
      date: "15 Januari 2024",
      author: "Admin PPID",
      category: "Pengumuman",
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "Sosialisasi UU Keterbukaan Informasi Publik di Kecamatan Alok",
      excerpt: "PPID Diskominfo Sikka mengadakan sosialisasi Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik...",
      date: "10 Januari 2024",
      author: "Tim PPID",
      category: "Sosialisasi",
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      title: "Laporan Tahunan PPID 2023: Capaian dan Tantangan",
      excerpt: "PPID Diskominfo Sikka mempublikasikan laporan tahunan 2023 yang berisi capaian kinerja dan tantangan dalam memberikan layanan informasi publik...",
      date: "5 Januari 2024",
      author: "Kepala PPID",
      category: "Laporan",
      image: "/api/placeholder/400/200"
    },
    {
      id: 4,
      title: "Workshop Penyusunan Standar Operasional Prosedur (SOP)",
      excerpt: "Dalam rangka meningkatkan kualitas pelayanan, PPID Diskominfo Sikka mengadakan workshop penyusunan SOP layanan informasi publik...",
      date: "28 Desember 2023",
      author: "Admin PPID",
      category: "Workshop",
      image: "/api/placeholder/400/200"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Newspaper className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Berita PPID</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Informasi terkini seputar kegiatan, pengumuman, dan perkembangan layanan PPID Diskominfo Kabupaten Sikka
            </p>
          </div>

          {/* Filter Kategori */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Kategori Berita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">Semua</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">Pengumuman</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">Sosialisasi</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">Laporan</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">Workshop</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">Press Release</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Daftar Berita */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaList.map((berita) => (
              <Card key={berita.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{berita.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {berita.date}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{berita.title}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-1" />
                    {berita.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{berita.excerpt}</p>
                  <Button variant="outline" className="w-full">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>

          {/* Subscribe Newsletter */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Newspaper className="w-5 h-5" />
                <span>Newsletter PPID</span>
              </CardTitle>
              <CardDescription>
                Dapatkan berita terbaru langsung di email Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <input 
                  type="email" 
                  placeholder="Masukkan email Anda" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}