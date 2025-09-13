import { Document } from '@/types/document';

export const documents: Document[] = [
  // Berkala
  {
    id: 'doc-001',
    title: 'Laporan Tahunan 2023',
    description: 'Laporan kinerja PPID tahun 2023 lengkap dengan capaian dan evaluasi',
    category: 'berkala',
    fileName: 'laporan-tahunan-2023.pdf',
    fileUrl: '/documents/berkala/laporan-tahunan-2023.pdf',
    fileSize: '3.2 MB',
    uploadDate: '2024-01-15T10:30:00Z',
    publishedBy: 'Admin PPID'
  },
  {
    id: 'doc-002',
    title: 'Daftar Informasi Publik',
    description: 'Daftar informasi yang wajib disediakan dan diumumkan secara berkala',
    category: 'berkala',
    fileName: 'daftar-informasi-publik.pdf',
    fileUrl: '/documents/berkala/daftar-informasi-publik.pdf',
    fileSize: '1.8 MB',
    uploadDate: '2024-02-01T09:15:00Z',
    publishedBy: 'Admin PPID'
  },
  {
    id: 'doc-003',
    title: 'Rencana Kerja Tahunan',
    description: 'Rencana kerja PPID untuk tahun 2024',
    category: 'berkala',
    fileName: 'rencana-kerja-2024.pdf',
    fileUrl: '/documents/berkala/rencana-kerja-2024.pdf',
    fileSize: '2.5 MB',
    uploadDate: '2024-01-10T14:20:00Z',
    publishedBy: 'Admin PPID'
  },
  
  // Setiap Saat
  {
    id: 'doc-004',
    title: 'Profil Instansi',
    description: 'Profil lengkap instansi pemerintah',
    category: 'setiap-saat',
    fileName: 'profil-instansi.pdf',
    fileUrl: '/documents/setiap-saat/profil-instansi.pdf',
    fileSize: '2.1 MB',
    uploadDate: '2024-01-20T14:45:00Z',
    publishedBy: 'Admin PPID'
  },
  {
    id: 'doc-005',
    title: 'Struktur Organisasi',
    description: 'Struktur organisasi lengkap dengan nama pejabat',
    category: 'setiap-saat',
    fileName: 'struktur-organisasi.pdf',
    fileUrl: '/documents/setiap-saat/struktur-organisasi.pdf',
    fileSize: '1.5 MB',
    uploadDate: '2024-01-05T11:30:00Z',
    publishedBy: 'Admin PPID'
  },
  
  // Serta Merta
  {
    id: 'doc-006',
    title: 'Peringatan Bencana Alam',
    description: 'Informasi penting mengenai potensi bencana alam di wilayah',
    category: 'serta-merta',
    fileName: 'peringatan-bencana.pdf',
    fileUrl: '/documents/serta-merta/peringatan-bencana.pdf',
    fileSize: '0.8 MB',
    uploadDate: '2024-03-15T08:00:00Z',
    publishedBy: 'Admin PPID'
  },
  
  // Dikecualikan
  {
    id: 'doc-007',
    title: 'Rapat Internal Dewan',
    description: 'Notulen rapat internal dewan yang bersifat rahasia',
    category: 'dikecualikan',
    fileName: 'notulen-rapat-internal.pdf',
    fileUrl: '/documents/dikecualikan/notulen-rapat-internal.pdf',
    fileSize: '1.2 MB',
    uploadDate: '2024-02-20T16:45:00Z',
    publishedBy: 'Admin PPID'
  }
];