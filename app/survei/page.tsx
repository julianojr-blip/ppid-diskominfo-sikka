'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Star, MessageSquare, User, Mail, Phone } from 'lucide-react'
import { useState } from 'react'

export default function SurveiPage() {
  const [ratings, setRatings] = useState({
    kemudahan: 0,
    kecepatan: 0,
    kualitas: 0,
    keramahan: 0
  })

  const handleRating = (category: string, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }))
  }

  const renderStars = (category: string, label: string) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer transition-colors ${
              star <= ratings[category as keyof typeof ratings]
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 hover:text-yellow-300'
            }`}
            onClick={() => handleRating(category, star)}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Survei Kepuasan Masyarakat</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bantu kami meningkatkan kualitas layanan dengan mengisi survei kepuasan terhadap pelayanan PPID Diskominfo Kabupaten Sikka
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Survei */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Form Survei Kepuasan</CardTitle>
                  <CardDescription>
                    Isi form berikut untuk memberikan penilaian terhadap layanan kami
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Data Pribadi */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Pribadi</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input id="nama" placeholder="Masukkan nama lengkap" className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input id="email" type="email" placeholder="email@example.com" className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="telepon">No. Telepon/HP</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input id="telepon" placeholder="08xx-xxxx-xxxx" className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pekerjaan">Pekerjaan</Label>
                        <Input id="pekerjaan" placeholder="Contoh: Swasta, PNS, Mahasiswa, dll" />
                      </div>
                    </div>
                  </div>

                  {/* Penilaian Layanan */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Penilaian Layanan</h3>
                    
                    {renderStars('kemudahan', 'Kemudahan Proses Permohonan')}
                    {renderStars('kecepatan', 'Kecepatan Respon')}
                    {renderStars('kualitas', 'Kualitas Informasi')}
                    {renderStars('keramahan', 'Keramahan Petugas')}
                  </div>

                  {/* Layanan yang Digunakan */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Layanan yang Pernah Digunakan</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="permohonan" />
                        <Label htmlFor="permohonan">Permohonan Informasi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="keberatan" />
                        <Label htmlFor="keberatan">Pengajuan Keberatan</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="konsultasi" />
                        <Label htmlFor="konsultasi">Konsultasi Informasi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="download" />
                        <Label htmlFor="download">Download Dokumen</Label>
                      </div>
                    </div>
                  </div>

                  {/* Saran dan Masukan */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Saran dan Masukan</h3>
                    <div className="space-y-2">
                      <Label htmlFor="saran">Saran Perbaikan Layanan</Label>
                      <Textarea 
                        id="saran" 
                        placeholder="Berikan saran dan masukan untuk perbaikan layanan kami..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    Kirim Survei
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Card */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>Manfaat Survei</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Membantu kami meningkatkan kualitas layanan</li>
                    <li>• Sebagai bahan evaluasi kinerja PPID</li>
                    <li>• Menjamin kepuasan masyarakat</li>
                    <li>• Mewujudkan pemerintahan yang transparan</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Kontak Kami</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">ppid@diskominfo.sikka.go.id</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Telepon</p>
                    <p className="text-gray-600">(0382) 12345</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Jam Layanan</p>
                    <p className="text-gray-600">Senin-Kamis: 08:00-16:00</p>
                    <p className="text-gray-600">Jumat: 08:00-11:30</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Keterangan Penilaian</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span>= Sangat Puas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1,2,3,4].map((i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                      <span>= Puas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1,2,3].map((i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        {[1,2].map((i) => (
                          <Star key={i} className="w-4 h-4 text-gray-300" />
                        ))}
                      </div>
                      <span>= Cukup Puas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1,2].map((i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        {[1,2,3].map((i) => (
                          <Star key={i} className="w-4 h-4 text-gray-300" />
                        ))}
                      </div>
                      <span>= Kurang Puas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {[1,2,3,4].map((i) => (
                          <Star key={i} className="w-4 h-4 text-gray-300" />
                        ))}
                      </div>
                      <span>= Tidak Puas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
