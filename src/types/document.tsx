export type DocumentCategory = 'berkala' | 'setiap-saat' | 'serta-merta' | 'dikecualikan';

export interface Document {
  id: string;
  title: string;
  description: string;
  category: DocumentCategory;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  uploadDate: string;
  publishedBy: string;
}