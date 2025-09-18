'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, FileText, User, Mail, Phone, MapPin, Briefcase, Target, Info, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function FormPermohonanPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    alamat: '',
    pekerjaan: '',
    tujuan: '',
    rincianInformasi: '',
    caraMemperoleh: '',
    caraPenyampaian: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [registrationNumber, setRegistrationNumber] = useState('')
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    const requiredFields = [
      'nama', 'email', 'telepon', 'alamat', 'pekerjaan',
      'tujuan', 'rincianInformasi', 'caraMemperoleh'
    ]
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return `Field ${field} harus diisi`
      }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return 'Format email tidak valid'
    }
    
    // Phone validation
    const phoneRegex = /^08[0-9]{8,12}$/
    if (!phoneRegex.test(formData.telepon.replace(/[\s-]/g, ''))) {
      return 'Format telepon tidak valid (contoh: 08123456789)'
    }
    
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/perminformasi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengirim permohonan')
      }
      
      setSuccess(true)
      setRegistrationNumber(data.nomorRegistrasi)
      
      // Reset form
      setFormData({
        nama: '',
        email: '',
        telepon: '',
        alamat: '',
        pekerjaan: '',
        tujuan: '',
        rincianInformasi: '',
        caraMemperoleh: '',
        caraPenyampaian: ''
      })
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Permohonan Berhasil!</CardTitle>
            <CardDescription>
              Permohonan informasi Anda telah berhasil dikirim. Simpan nomor registrasi berikut untuk tracking.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Nomor Registrasi</p>
              <p className="text-2xl font-bold text-blue-600">{registrationNumber}</p>
            </div>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/tracking">
                  Tracking Permohonan
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link href="/layanan/form-permohonan">
                  Ajukan Permohonan Lagi
                </Link>
              </Button>
              
              <Button asChild variant="ghost" className="w-full">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/layanan">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Layanan
          </Link>
        </Button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Form Permohonan Informasi</h1>
            <p className="text-gray-600">
              Ajukan permohonan informasi publik kepada PPID Diskominfo Kabupaten Sikka
            </p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Data Pemohon</CardTitle>
          <CardDescription>
            Isi data diri Anda dengan lengkap dan benar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nama" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nama Lengkap <Badge variant="destructive" className="text-xs">Wajib</Badge>
              </Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => handleChange('nama', e.target.value)}
                placeholder="Masukkan nama lengkap"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email <Badge variant="destructive" className="text-xs">Wajib</Badge>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telepon" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                No. Telepon <Badge variant="destructive" className="text-xs">Wajib</Badge>
              </Label>
              <Input
                id="telepon"
                value={formData.telepon}
                onChange={(e) => handleChange('telepon', e.target.value)}
                placeholder="08123456789"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pekerjaan" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Pekerjaan <Badge variant="destructive" className="text-xs">Wajib</Badge>
              </Label>
              <Input
                id="pekerjaan"
                value={formData.pekerjaan}
                onChange={(e) => handleChange('pekerjaan', e.target.value)}
                placeholder="Pekerjaan/Profesi"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="alamat" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Alamat Lengkap <Badge variant="destructive" className="text-xs">Wajib</Badge>
            </Label>
            <Textarea
              id="alamat"
              value={formData.alamat}
              onChange={(e) => handleChange('alamat', e.target.value)}
              placeholder="Masukkan alamat lengkap"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Detail Permohonan</CardTitle>
          <CardDescription>
            Jelaskan informasi yang Anda butuhkan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tujuan" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Tujuan Permohonan <Badge variant="destructive" className="text-xs">Wajib</Badge>
            </Label>
            <Select value={formData.tujuan} onValueChange={(value: string) => handleChange('tujuan', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tujuan permohonan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Penelitian">Penelitian</SelectItem>
                <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                <SelectItem value="Pekerjaan">Pekerjaan</SelectItem>
                <SelectItem value="Hukum">Hukum</SelectItem>
                <SelectItem value="Kepentingan Pribadi">Kepentingan Pribadi</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rincianInformasi" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Rincian Informasi <Badge variant="destructive" className="text-xs">Wajib</Badge>
            </Label>
            <Textarea
              id="rincianInformasi"
              value={formData.rincianInformasi}
              onChange={(e) => handleChange('rincianInformasi', e.target.value)}
              placeholder="Jelaskan secara detail informasi yang Anda butuhkan"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Cara Memperoleh Informasi <Badge variant="destructive" className="text-xs">Wajib</Badge></Label>
            <RadioGroup 
              value={formData.caraMemperoleh} 
              onValueChange={(value: string) => handleChange('caraMemperoleh', value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Melihat/Membaca" id="membaca" />
                <Label htmlFor="membaca">Melihat/Membaca</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Mendengar" id="mendengar" />
                <Label htmlFor="mendengar">Mendengar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Memberikan Salinan" id="salinan" />
                <Label htmlFor="salinan">Memberikan Salinan</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Cara Penyampaian Informasi</Label>
            <RadioGroup 
              value={formData.caraPenyampaian} 
              onValueChange={(value: string) => handleChange('caraPenyampaian', value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Pos" id="pos" />
                <Label htmlFor="pos">Pos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Diambil Langsung" id="langsung" />
                <Label htmlFor="langsung">Diambil Langsung</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={loading}
          className="min-w-[200px]"
        >
          {loading ? 'Mengirim...' : 'Kirim Permohonan'}
        </Button>
      </div>
    </div>
  )
}