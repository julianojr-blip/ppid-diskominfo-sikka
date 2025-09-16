import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { HelpCircle, MessageSquare } from 'lucide-react'

export default function FAQPage() {
  const faqData = [
    {
      category: "Tentang PPID",
      questions: [
        {
          question: "Apa itu PPID?",
          answer: "PPID (Pejabat Pengelola Informasi dan Dokumentasi) adalah unit kerja yang bertanggung jawab di bidang penyimpanan, pendokumentasian, penyediaan, dan pelayanan informasi publik di badan publik."
        },
        {
          question: "Apa dasar hukum pembentukan PPID?",
          answer: "Dasar hukumnya adalah Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik dan Peraturan Komisi Informasi Nomor 1 Tahun 2010 tentang Standar Layanan Informasi Publik."
        },
        {
          question: "Siapa yang bisa mengajukan permohonan informasi?",
          answer: "Setiap orang atau kelompok orang memiliki hak untuk memperoleh informasi publik sesuai dengan ketentuan perundang-undangan."
        }
      ]
    },
    {
      category: "Permohonan Informasi",
      questions: [
        {
          question: "Bagaimana cara mengajukan permohonan informasi?",
          answer: "Permohonan informasi dapat diajukan secara langsung di kantor PPID, melalui email, atau melalui form permohonan yang tersedia di website ini."
        },
        {
          question: "Apa saja persyaratan untuk mengajukan permohonan?",
          answer: "Persyaratannya meliputi: identitas pemohon (KTP/SIM), rincian informasi yang diminta, tujuan penggunaan informasi, dan cara memperoleh informasi."
        },
        {
          question: "Berapa lama waktu proses permohonan informasi?",
          answer: "Waktu proses maksimal 10 hari kerja sejak permohonan diterima. Untuk informasi kompleks dapat diperpanjang maksimal 7 hari kerja."
        }
      ]
    },
    {
      category: "Keberatan dan Sengketa",
      questions: [
        {
          question: "Apa yang harus dilakukan jika permohonan ditolak?",
          answer: "Jika permohonan ditolak, pemohon dapat mengajukan keberatan kepada Atasan PPID dalam waktu 30 hari sejak menerima pemberitahuan penolakan."
        },
        {
          question: "Bagaimana proses penyelesaian sengketa informasi?",
          answer: "Penyelesaian sengketa dapat dilakukan melalui mediasi oleh Komisi Informasi atau melalui pengadilan."
        },
        {
          question: "Apakah ada biaya untuk mengajukan keberatan?",
          answer: "Pengajuan keberatan tidak dipungut biaya (gratis)."
        }
      ]
    },
    {
      category: "Layanan Informasi",
      questions: [
        {
          question: "Jenis informasi apa saja yang tersedia?",
          answer: "Informasi yang tersedia meliputi: informasi berkala, informasi serta merta, informasi setiap saat, dan informasi yang dikecualikan."
        },
        {
          question: "Apakah semua informasi bisa diakses publik?",
          answer: "Tidak semua informasi bisa diakses. Ada informasi yang dikecualikan sesuai UU No. 14 Tahun 2008, seperti informasi yang membahayakan negara dan informasi pribadi."
        },
        {
          question: "Bagaimana cara mendapatkan informasi dalam bentuk dokumen?",
          answer: "Dokumen dapat diperoleh dengan mendownload langsung dari website atau mengajukan permohonan untuk dokumen yang tidak tersedia online."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
            </div>
            <p className="text-lg text-gray-600">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan PPID
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqData.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>{category.category}</span>
                  </CardTitle>
                  <CardDescription>
                    Pertanyaan umum seputar {category.category.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Card */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Masih Punya Pertanyaan?</CardTitle>
              <CardDescription>
                Jika jawaban yang Anda cari tidak ada di atas, silakan hubungi kami langsung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Hubungi Kami</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Email:</strong> ppid@diskominfo.sikka.go.id</p>
                    <p><strong>Telepon:</strong> (0382) 12345</p>
                    <p><strong>Alamat:</strong> Jl. Soekarno-Hatta No. 1, Maumere</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Jam Layanan</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Senin - Kamis:</strong> 08:00 - 16:00</p>
                    <p><strong>Jumat:</strong> 08:00 - 11:30</p>
                    <p><strong>Sabtu/Minggu:</strong> Tutup</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
