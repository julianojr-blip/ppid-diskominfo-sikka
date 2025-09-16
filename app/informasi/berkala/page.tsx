'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Download, 
  Search, 
  Filter, 
  Eye, 
  FileText, 
  Calendar,
  Folder,
  HardDrive,
  X
} from 'lucide-react'
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
}

export default function InformasiBerkalaPage() {
  const [documents, setDocuments] = useState<InformasiPublik[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<InformasiPublik[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [])

  useEffect(() => {
    filterDocuments()
  }, [documents, searchTerm, selectedCategory, selectedStatus])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/informasi-publik?jenis=BERKALA')
      
      if (!response.ok) {
        throw new Error('Failed to fetch documents')
      }
      
      const data = await response.json()
      setDocuments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const filterDocuments = () => {
    let filtered = documents

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(doc => doc.kategori === selectedCategory)
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter(doc => doc.status === selectedStatus)
    }

    setFilteredDocuments(filtered)
  }

  const formatFileSize = (size?: string) => {
    if (!size) return 'Size not available'
    return size
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get unique categories for filter
  const categories = [...new Set(documents.map(doc => doc.kategori))]
  
  // Get unique statuses for filter
  const statuses = [...new Set(documents.map(doc => doc.status))]

  // Calculate statistics
  const totalDocuments = documents.length
  const activeDocuments = documents.filter(d => d.status === 'AKTIF').length
  const totalCategories = new Set(documents.map(d => d.kategori)).size
  const avgFileSize = documents.length > 0 
    ? documents.reduce((sum, doc) => sum + (parseFloat(doc.fileSize || '0') || 0), 0) / documents.length
    : 0

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedStatus('')
    setShowFilters(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <Button onClick={fetchDocuments} variant="outline">
            Coba Lagi
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Daftar Informasi Berkala
        </h1>
        <p className="text-gray-600 mb-6">
          Informasi yang wajib diumumkan secara berkala oleh PPID Diskominfo Kabupaten Sikka.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalDocuments}</div>
            <div className="text-sm text-gray-600">Total Dokumen</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{activeDocuments}</div>
            <div className="text-sm text-gray-600">Dokumen Aktif</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{totalCategories}</div>
            <div className="text-sm text-gray-600">Kategori</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{avgFileSize.toFixed(1)} MB</div>
            <div className="text-sm text-gray-600">Rata-rata Ukuran</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Cari dokumen berdasarkan judul atau deskripsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filter
              {(selectedCategory || selectedStatus) && (
                <Badge variant="secondary">Active</Badge>
              )}
            </Button>
            
            {(searchTerm || selectedCategory || selectedStatus) && (
              <Button variant="ghost" onClick={clearFilters}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Semua Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Info */}
      <div className="mb-4 text-sm text-gray-600">
        Menampilkan {filteredDocuments.length} dari {totalDocuments} dokumen
        {(searchTerm || selectedCategory || selectedStatus) && (
          <span> (filter aktif)</span>
        )}
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {documents.length === 0 ? 'Belum ada dokumen' : 'Tidak ada dokumen yang cocok'}
          </h3>
          <p className="text-gray-600">
            {documents.length === 0 
              ? 'Saat ini belum ada informasi berkala yang tersedia.'
              : 'Coba ubah filter atau kata kunci pencarian.'
            }
          </p>
          {(searchTerm || selectedCategory || selectedStatus) && (
            <Button onClick={clearFilters} variant="outline" className="mt-4">
              Hapus Filter
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 mb-2">
                      {document.judul}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="secondary">{document.kategori}</Badge>
                      {document.fileUrl && (
                        <Badge variant="outline">{document.fileType}</Badge>
                      )}
                      <Badge variant={document.status === 'AKTIF' ? 'default' : 'secondary'}>
                        {document.status}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {document.deskripsi}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{formatFileSize(document.fileSize)}</span>
                  <span>{formatDate(document.createdAt)}</span>
                </div>

                <div className="flex gap-2">
                  {document.fileUrl ? (
                    <>
                      <Button asChild size="sm" className="flex-1">
                        <a 
                          href={document.fileUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <a 
                          href={document.fileUrl} 
                          download
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" disabled className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      File tidak tersedia
                    </Button>
                  )}
                  
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/informasi/berkala/${document.id}`}>
                      Detail
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}