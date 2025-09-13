'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, ArrowLeft, FileText, Calendar, Folder, HardDrive } from 'lucide-react'
import Link from 'next/link'

interface InformasiPublik {
  id: string
  judul: string
  kategori: string
  deskripsi: string
  fileUrl?: string
  fileSize?: string
  fileType?: string
  jenis: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function DocumentDetailPage() {
  const [document, setDocument] = useState<InformasiPublik | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  useEffect(() => {
    if (id) {
      fetchDocument()
    }
  }, [id])

  const fetchDocument = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/informasi-publik/${id}`)
      
      if (!response.ok) {
        throw new Error('Document not found')
      }
      
      const data = await response.json()
      setDocument(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">{error || 'Document not found'}</div>
          <Button asChild variant="outline">
            <Link href="/informasi/berkala">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Daftar
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/informasi/berkala">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Informasi Berkala
        </Link>
      </Button>

      {/* Document Detail */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-4">{document.judul}</CardTitle>
              <CardDescription className="flex flex-wrap gap-2">
                <Badge variant="secondary">{document.kategori}</Badge>
                <Badge variant={document.status === 'AKTIF' ? 'default' : 'secondary'}>
                  {document.status}
                </Badge>
                <Badge variant="outline">{document.jenis}</Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Folder className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Kategori</div>
                  <div className="font-medium">{document.kategori}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Jenis Informasi</div>
                  <div className="font-medium">{document.jenis}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Ukuran File</div>
                  <div className="font-medium">{document.fileSize || 'Tidak tersedia'}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Dibuat</div>
                  <div className="font-medium">{formatDate(document.createdAt)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Diperbarui</div>
                  <div className="font-medium">{formatDate(document.updatedAt)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Deskripsi</h3>
            <div className="prose max-w-none text-gray-700">
              {document.deskripsi}
            </div>
          </div>

          {/* Download Button */}
          {document.fileUrl ? (
            <Button asChild size="lg" className="w-full">
              <a 
                href={document.fileUrl} 
                download
                className="flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Dokumen
                {document.fileSize && (
                  <span className="text-sm opacity-75">({document.fileSize})</span>
                )}
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="lg" className="w-full" disabled>
              <Download className="w-5 h-5 mr-2" />
              File tidak tersedia untuk download
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}