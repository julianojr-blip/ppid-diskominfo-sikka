'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Search, FileText, User, Mail, Phone, MapPin, Briefcase, Target, Info, Calendar, CheckCircle, Clock, XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface PermohonanInformasi {
  id: string
  nomorRegistrasi: string
  nama: string
  email: string
  telepon: string
  alamat: string
  pekerjaan: string
  tujuan: string
  rincianInformasi: string
  caraMemperoleh: string
  caraPenyampaian: string
  status: string
  catatan: string
  createdAt: string
  updatedAt: string
}

export default function TrackingPage() {
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [permohonan, setPermohonan] = useState<PermohonanInformasi | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!registrationNumber.trim()) {
    setError('Nomor registrasi harus diisi')
    return
  }
  
  setLoading(true)
  setError(null)
  setSearched(true)
  
  try {
    const response = await fetch(`/api/perminformasi?registrationNumber=${encodeURIComponent(registrationNumber)}`)
    
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Gagal mencari permohonan')
    }
    
    const data = await response.json()
    
    if (data.data && data.data.length > 0) {
      setPermohonan(data.data[0])
    } else {
      setError('Permohonan tidak ditemukan. Periksa kembali nomor registrasi Anda.')
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mencari permohonan')
  } finally {
    setLoading(false)
  }
}

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'MENUNGGU':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'DIPROSES':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'SELESAI':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'DITOLAK':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'MENUNGGU':
        return <Clock className="w-4 h-4" />
      case 'DIPROSES':
        return <RefreshCw className="w-4 h-4" />
      case 'SELESAI':
        return <CheckCircle className="w-4 h-4" />
      case 'DITOLAK':
        return <XCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const resetSearch = () => {
    setRegistrationNumber('')
    setPermohonan(null)
    setError(null)
    setSearched(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
        </Button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tracking Permohonan</h1>
            <p className="text-gray-600">
              Cek status permohonan informasi Anda menggunakan nomor registrasi
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Masukkan Nomor Registrasi</CardTitle>
          <CardDescription>
            Nomor registrasi Anda didapatkan saat berhasil mengajukan permohonan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  placeholder="Contoh: REG-202509-123"
                  className="text-lg"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Mencari...' : 'Cari Permohonan'}
              </Button>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searched && !permohonan && !error && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Permohonan Tidak Ditemukan
            </h3>
            <p className="text-gray-600 mb-6">
              Pastikan nomor registrasi yang Anda masukkan sudah benar
            </p>
            <Button onClick={resetSearch} variant="outline">
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Permohonan Details */}
      {permohonan && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">Detail Permohonan</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge className={getStatusColor(permohonan.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(permohonan.status)}
                      {permohonan.status}
                    </div>
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Nomor: {permohonan.nomorRegistrasi}
                  </span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Timeline */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Status Permohonan</h3>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(permohonan.status)}`}>
                  {getStatusIcon(permohonan.status)}
                </div>
                <div>
                  <div className="font-medium">{permohonan.status}</div>
                  <div className="text-sm text-gray-600">
                    Terakhir update: {formatDate(permohonan.updatedAt)}
                  </div>
                </div>
              </div>
              
              {permohonan.catatan && (
                <div className="mt-4 p-4 bg-white rounded border">
                  <div className="text-sm font-medium text-gray-700 mb-1">Catatan:</div>
                  <div className="text-sm text-gray-600">{permohonan.catatan}</div>
                </div>
              )}
            </div>

            {/* Pemohon Information */}
            <div>
              <h3 className="font-semibold mb-4">Data Pemohon</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Nama</div>
                    <div className="font-medium">{permohonan.nama}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{permohonan.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Telepon</div>
                    <div className="font-medium">{permohonan.telepon}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Pekerjaan</div>
                    <div className="font-medium">{permohonan.pekerjaan}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Alamat</div>
                  <div className="font-medium">{permohonan.alamat}</div>
                </div>
              </div>
            </div>

            {/* Permohonan Detail */}
            <div>
              <h3 className="font-semibold mb-4">Detail Permohonan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Tujuan</div>
                    <div className="font-medium">{permohonan.tujuan}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Cara Memperoleh</div>
                    <div className="font-medium">{permohonan.caraMemperoleh}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-sm text-gray-500 mb-2">Rincian Informasi</div>
                <div className="bg-gray-50 p-4 rounded">
                  {permohonan.rincianInformasi}
                </div>
              </div>
              
              {permohonan.caraPenyampaian && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Cara Penyampaian</div>
                    <div className="font-medium">{permohonan.caraPenyampaian}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-semibold mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Permohonan Dibuat</div>
                    <div className="text-sm text-gray-600">{formatDate(permohonan.createdAt)}</div>
                  </div>
                </div>
                
                {permohonan.status !== 'MENUNGGU' && (
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      permohonan.status === 'DIPROSES' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <RefreshCw className={`w-4 h-4 ${
                        permohonan.status === 'DIPROSES' ? 'text-blue-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium">Diproses</div>
                      <div className="text-sm text-gray-600">Permohonan sedang diproses oleh admin</div>
                    </div>
                  </div>
                )}
                
                {permohonan.status === 'SELESAI' && (
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Selesai</div>
                      <div className="text-sm text-gray-600">Permohonan telah selesai diproses</div>
                    </div>
                  </div>
                )}
                
                {permohonan.status === 'DITOLAK' && (
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className="font-medium">Ditolak</div>
                      <div className="text-sm text-gray-600">Permohonan tidak dapat diproses</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button onClick={resetSearch} variant="outline" className="flex-1">
                <Search className="w-4 h-4 mr-2" />
                Tracking Lain
              </Button>
              
              <Button asChild className="flex-1">
                <Link href="/layanan/form-permohonan">
                  <FileText className="w-4 h-4 mr-2" />
                  Ajukan Lagi
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}