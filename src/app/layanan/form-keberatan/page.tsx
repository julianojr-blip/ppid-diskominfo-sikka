'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { FileText, User, Mail, Phone, AlertTriangle, Download, Info, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function FormKeberatanPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    alamat: '',
    nomorRegistrasi: '',
    alasanKeberatan: '',
    rincianKeberatan: '',
    tindakan: 'perbaiki',
    salinan: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    alert('Form pengajuan keberatan berhasil dikirim!')
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <h1 className="text-4xl font-bold text-gray-900">Form Pengajuan Keberatan</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ajukan keberatan atas tanggapan PPID terhadap permohonan informasi yang Anda ajukan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Utama */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Formulir Pengajuan Keberatan</CardTitle>
                  <CardDescription>
                    Isi data dengan lengkap dan benar. (*) wajib diisi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Data Pemohon */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Data Pemohon Keberatan</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nama">Nama Lengkap *</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input 
                              id="nama" 
                              required
                              placeholder="Masukkan nama lengkap" 
                              className="pl-10"
                              value={formData.nama}
                              onChange={(e) => setFormData({...formData, nama: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input 
                              id="email" 
                              type="email" 
                              required
                              placeholder="email@example.com" 
                              className="pl-10"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="telepon">No. Telepon/HP *</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input 
                              id="telepon" 
                              required
                              placeholder="08xx-xxxx-xxxx" 
                              className="pl-10"
                              value={formData.telepon}
                              onChange={(e) => setFormData({...formData, telepon: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="nomorRegistrasi">Nomor Registrasi Permohonan Awal *</Label>
                          <Input 
                            id="nomorRegistrasi" 
                            required
                            placeholder="Contoh: REG/2024/001" 
                            value={formData.nomorRegistrasi}
                            onChange={(e) => setFormData({...formData, nomorRegistrasi: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="alamat">Alamat Lengkap *</Label>
                        <Textarea 
                          id="alamat" 
                          required
                          placeholder="Masukkan alamat lengkap" 
                          className="min-h-[80px]"
                          value={formData.alamat}
                          onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Alasan Keberatan */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Alasan Keberatan</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="alasanKeberatan">Alasan Pengajuan Keberatan *</Label>
                        <Textarea 
                          id="alasanKeberatan" 
                          required
                          placeholder="Jelaskan alasan Anda mengajukan keberatan terhadap tanggapan PPID" 
                          className="min-h-[80px]"
                          value={formData.alasanKeberatan}
                          onChange={(e) => setFormData({...formData, alasanKeberatan: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rincianKeberatan">Rincian Keberatan *</Label>
                        <Textarea 
                          id="rincianKeberatan" 
                          required
                          placeholder="Jelaskan secara rinci keberatan yang Anda ajukan" 
                          className="min-h-[100px]"
                          value={formData.rincianKeberatan}
                          onChange={(e) => setFormData({...formData, rincianKeberatan: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Tindakan yang Diminta */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Tindakan yang Diminta</h3>
                      
                      <RadioGroup 
                        value={formData.tindakan}
                        onValueChange={(value) => setFormData({...formData, tindakan: value})}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="perbaiki" id="perbaiki" />
                          <Label htmlFor="perbaiki">Memperbaiki tanggapan permohonan informasi</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="berikan" id="berikan" />
                          <Label htmlFor="berikan">Memberikan informasi yang diminta</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="batalkan" id="batalkan" />
                          <Label htmlFor="batalkan">Membatalkan penolakan permohonan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="lainnya" id="lainnya" />
                          <Label htmlFor="lainnya">Lainnya (sebutkan)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Submit Button */}
                    <div className="flex space-x-4">
                      <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Ajukan Keberatan
                      </Button>
                      <Button type="button" variant="outline">
                        Reset
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="w-5 h-5" />
                    <span>Informasi Penting</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p>
                        <strong>Waktu Pengajuan:</strong> Maksimal 30 hari sejak menerima tanggapan PPID
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p>
                        <strong>Tidak Dipungut Biaya:</strong> Pengajuan keberatan gratis
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p>
                        <strong>Waktu Proses:</strong> Maksimal 30 hari kerja sejak keberatan diterima
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Download Form</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Form Keberatan (PDF)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Panduan Pengisian
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Contoh Pengisian
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alasan Pengajuan Keberatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Tanggapan permohonan melebihi batas waktu</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Informasi yang diberikan tidak sesuai</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Permohonan ditolak tanpa alasan yang jelas</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Biaya yang dibebankan tidak sesuai ketentuan</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Penolakan atas informasi yang seharusnya terbuka</span>
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