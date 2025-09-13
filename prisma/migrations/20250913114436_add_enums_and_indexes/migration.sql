-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PermohonanInformasi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomorRegistrasi" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "pekerjaan" TEXT NOT NULL,
    "tujuan" TEXT NOT NULL,
    "rincianInformasi" TEXT NOT NULL,
    "caraMemperoleh" TEXT NOT NULL,
    "caraPenyampaian" TEXT,
    "status" TEXT NOT NULL DEFAULT 'MENUNGGU',
    "catatan" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PermohonanInformasi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Keberatan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomorRegistrasi" TEXT NOT NULL,
    "alasanKeberatan" TEXT NOT NULL,
    "rincianKeberatan" TEXT NOT NULL,
    "tindakanDiminta" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DITERIMA',
    "catatan" TEXT,
    "permohonanInformasiId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Keberatan_permohonanInformasiId_fkey" FOREIGN KEY ("permohonanInformasiId") REFERENCES "PermohonanInformasi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Keberatan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Survei" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telepon" TEXT,
    "alamat" TEXT,
    "pekerjaan" TEXT,
    "kemudahan" INTEGER NOT NULL,
    "kecepatan" INTEGER NOT NULL,
    "kualitas" INTEGER NOT NULL,
    "keramahan" INTEGER NOT NULL,
    "saran" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Survei_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InformasiPublik" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "judul" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "fileUrl" TEXT,
    "fileSize" TEXT,
    "fileType" TEXT,
    "jenis" TEXT NOT NULL DEFAULT 'BERKALA',
    "status" TEXT NOT NULL DEFAULT 'AKTIF',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Berita" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "excerpt" TEXT,
    "imageUrl" TEXT,
    "kategori" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AKTIF',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Statistik" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalInformasi" INTEGER NOT NULL DEFAULT 0,
    "totalPermohonan" INTEGER NOT NULL DEFAULT 0,
    "permohonanSelesai" INTEGER NOT NULL DEFAULT 0,
    "permohonanProses" INTEGER NOT NULL DEFAULT 0,
    "permohonanDitolak" INTEGER NOT NULL DEFAULT 0,
    "totalKeberatan" INTEGER NOT NULL DEFAULT 0,
    "keberatanDiterima" INTEGER NOT NULL DEFAULT 0,
    "keberatanDitolak" INTEGER NOT NULL DEFAULT 0,
    "totalSurvei" INTEGER NOT NULL DEFAULT 0,
    "rataKepuasan" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PermohonanInformasi_nomorRegistrasi_key" ON "PermohonanInformasi"("nomorRegistrasi");

-- CreateIndex
CREATE INDEX "PermohonanInformasi_status_idx" ON "PermohonanInformasi"("status");

-- CreateIndex
CREATE INDEX "PermohonanInformasi_createdAt_idx" ON "PermohonanInformasi"("createdAt");

-- CreateIndex
CREATE INDEX "InformasiPublik_jenis_idx" ON "InformasiPublik"("jenis");

-- CreateIndex
CREATE INDEX "InformasiPublik_status_idx" ON "InformasiPublik"("status");

-- CreateIndex
CREATE INDEX "InformasiPublik_kategori_idx" ON "InformasiPublik"("kategori");

-- CreateIndex
CREATE INDEX "Berita_status_idx" ON "Berita"("status");

-- CreateIndex
CREATE INDEX "Berita_kategori_idx" ON "Berita"("kategori");

-- CreateIndex
CREATE INDEX "Berita_createdAt_idx" ON "Berita"("createdAt");
