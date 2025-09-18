import { notFound } from 'next/navigation';
import { documents } from '@/lib/data/documents';
import { Document } from '@/types/document';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const document = documents.find(doc => doc.id === params.id);
  
  if (!document || document.category !== 'serta-merta') {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/informasi/serta-merta" className="text-blue-600 hover:text-blue-800">
          &larr; Kembali ke Informasi Serta Merta
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{document.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Informasi Dokumen</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Kategori:</span> {document.category}</p>
              <p><span className="font-medium">Diunggah:</span> {format(new Date(document.uploadDate), 'dd MMMM yyyy HH:mm', { locale: id })}</p>
              <p><span className="font-medium">Oleh:</span> {document.publishedBy}</p>
              <p><span className="font-medium">Ukuran File:</span> {document.fileSize}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
            <p className="text-gray-700">{document.description}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Unduh Dokumen</h3>
          <div className="flex items-center space-x-4">
            <a 
              href={document.fileUrl} 
              download
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Unduh {document.fileName}
            </a>
            <span className="text-gray-500">{document.fileSize}</span>
          </div>
        </div>
      </div>
    </div>
  );
}