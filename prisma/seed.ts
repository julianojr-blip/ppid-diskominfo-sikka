import { PrismaClient, Role, JenisInformasi, InformasiStatus, BeritaStatus, PermohonanStatus } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')
  
  // 1. Create Admin User dengan password
  const admin = await prisma.user.create({
    data: {
      email: 'admin@sikka.go.id',
      name: 'Admin PPID',
      role: Role.ADMIN,
      password: '$2b$12$LQv3c1yqBWVHxkd0LHAhCOOz1HrM5w8K5J6K3Y6Y6Y6' // hash untuk "admin123"
    }
  })
  console.log('✅ Admin user created:', admin.email)
  
  // 2. Create Sample Informasi Publik
  const informasiBerkala = await prisma.informasiPublik.createMany({
    data: [
      {
        judul: 'Laporan Tahunan PPID 2023',
        kategori: 'Laporan',
        deskripsi: 'Laporan tahunan pelaksanaan tugas dan fungsi PPID Diskominfo Sikka tahun 2023',
        fileUrl: '/documents/laporan-tahunan-2023.pdf',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        jenis: JenisInformasi.BERKALA,
        status: InformasiStatus.AKTIF,
      },
      {
        judul: 'Renstra PPID 2021 - 2026',
        kategori: 'Perencanaan',
        deskripsi: 'Rencana Strategis PPID Diskominfo Sikka tahun 2021 - 2026',
        fileUrl: '/documents/renstra-2021-2026.pdf',
        fileSize: '1.8 MB',
        fileType: 'PDF',
        jenis: JenisInformasi.BERKALA,
        status: InformasiStatus.AKTIF,
      },
      {
        judul: 'Informasi Bencana Alam 2023',
        kategori: 'Darurat',
        deskripsi: 'Informasi terkait bencana alam yang terjadi di wilayah Kabupaten Sikka',
        fileUrl: '/documents/informasi-bencana-2023.pdf',
        fileSize: '1.2 MB',
        fileType: 'PDF',
        jenis: JenisInformasi.SERTA_MERTA,
        status: InformasiStatus.AKTIF,
      },
    ],
  })
  console.log(`✅ Created ${informasiBerkala.count} informasi publik records`)
  
  // 3. Create Sample Berita
  const berita = await prisma.berita.createMany({
    data: [
      {
        judul: 'Peningkatan Layanan Informasi Publik',
        konten: 'PPID Diskominfo Sikka terus berkomitmen untuk meningkatkan kualitas layanan informasi publik kepada masyarakat Kabupaten Sikka...',
        excerpt: 'PPID Diskominfo Sikka terus berkomitmen untuk meningkatkan kualitas layanan informasi publik...',
        kategori: 'Pengumuman',
        status: BeritaStatus.AKTIF,
      },
      {
        judul: 'Sosialisasi Keterbukaan Informasi',
        konten: 'Dilaksanakan sosialisasi pentingnya keterbukaan informasi publik kepada masyarakat di Kecamatan Alok Barat...',
        excerpt: 'Sosialisasi pentingnya keterbukaan informasi publik kepada masyarakat...',
        kategori: 'Kegiatan',
        status: BeritaStatus.AKTIF,
      },
    ],
  })
  console.log(`✅ Created ${berita.count} berita records`)
  
  // 4. Create Sample Statistik
  const statistik = await prisma.statistik.create({
    data: {
      totalInformasi: 150,
      totalPermohonan: 89,
      permohonanSelesai: 75,
      permohonanProses: 12,
      permohonanDitolak: 2,
      totalKeberatan: 5,
      keberatanDiterima: 4,
      keberatanDitolak: 1,
      totalSurvei: 45,
      rataKepuasan: 4.2,
    },
  })
  console.log('✅ Statistik record created')
  
  // 5. Create Sample Permohonan
  const permohonan = await prisma.permohonanInformasi.create({
    data: {
      nomorRegistrasi: 'REG-2023-001',
      nama: 'Budi Santoso',
      email: 'budi@example.com',
      telepon: '08123456789',
      alamat: 'Jl. Sudirman No. 10, Maumere',
      pekerjaan: 'Swasta',
      tujuan: 'Penelitian',
      rincianInformasi: 'Data anggaran Dinas Komunikasi dan Informatika tahun 2023',
      caraMemperoleh: 'Email',
      caraPenyampaian: 'Email',
      status: PermohonanStatus.SELESAI,
      catatan: 'Permohonan telah diproses dan data telah dikirimkan',
    },
  })
  console.log('✅ Sample permohonan created:', permohonan.nomorRegistrasi)
  
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })