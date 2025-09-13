import { Document } from '@/types/document';
import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function DocumentCard({ document }: { document: Document }) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{document.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{document.description}</p>
      
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>{format(new Date(document.uploadDate), 'dd MMM yyyy', { locale: id })}</span>
        <span>{document.fileSize}</span>
      </div>
      
      <div className="flex space-x-3">
        <Link 
          href={`/informasi/${document.category}/${document.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Lihat Detail
        </Link>
        <a 
          href={document.fileUrl} 
          download
          className="text-green-600 hover:text-green-800 font-medium"
        >
          Unduh
        </a>
      </div>
    </div>
  );
}