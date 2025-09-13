import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import { Providers } from "@/components/providers";
import LayoutWrapper from "@/components/layout-wrapper";

// Tambahkan kembali definisi font ini
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PPID Diskominfo Kabupaten Sikka",
  description: "Pejabat Pengelola Informasi dan Dokumentasi Dinas Komunikasi dan Informatika Kabupaten Sikka - Menyediakan layanan informasi publik yang transparan dan akuntabel",
  keywords: ["PPID", "Diskominfo", "Sikka", "Informasi Publik", "Transparansi", "Kabupaten Sikka"],
  authors: [{ name: "PPID Diskominfo Sikka" }],
  openGraph: {
    title: "PPID Diskominfo Kabupaten Sikka",
    description: "Pejabat Pengelola Informasi dan Dokumentasi Dinas Komunikasi dan Informatika Kabupaten Sikka",
    url: "https://ppid.sikkakab.go.id",
    siteName: "PPID Diskominfo Sikka",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PPID Diskominfo Kabupaten Sikka",
    description: "Pejabat Pengelola Informasi dan Dokumentasi Dinas Komunikasi dan Informatika Kabupaten Sikka",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}