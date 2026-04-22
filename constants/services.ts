export interface ServiceItem {
  label: string;
  value: string;
  price: number;
  category: string;
}

export const JokiServices: ServiceItem[] = [
  // 1. Jasa Tulis
  { label: "Buku Kecil A5", value: "Buku Kecil A5", price: 3000, category: "Jasa Tulis" },
  { label: "Buku Tulis Standar", value: "Buku Tulis Standar", price: 5000, category: "Jasa Tulis" },
  { label: "Kertas Double Folio", value: "Kertas Double Folio", price: 10000, category: "Jasa Tulis" },
  
  // 2. Ketik Pengetikan
  { label: "Ketik Makalah/Tugas", value: "Ketik Makalah/Tugas", price: 5000, category: "Ketik Pengetikan" },
  { label: "Ketik Dokumen (Banyak)", value: "Ketik Dokumen (Banyak)", price: 3000, category: "Ketik Pengetikan" },
  
  // 3. Olah Data & Statistik
  { label: "Uji Validitas/Reliabilitas", value: "Uji Validitas/Reliabilitas", price: 50000, category: "Olah Data" },
  { label: "Analisis Regresi/Hipotesis", value: "Analisis Regresi/Hipotesis", price: 100000, category: "Olah Data" },
  { label: "Olah Data Lengkap (Bab 4)", value: "Olah Data Lengkap (Bab 4)", price: 250000, category: "Olah Data" },

  // 4. Desain & Presentasi
  { label: "Desain PPT Standar", value: "Desain PPT Standar", price: 25000, category: "Desain" },
  { label: "Desain PPT Premium", value: "Desain PPT Premium", price: 50000, category: "Desain" },
  { label: "Desain Poster/Flyer", value: "Desain Poster/Flyer", price: 35000, category: "Desain" },

  // 5. Akademik & Umum
  { label: "Jasa Resume/Ringkasan", value: "Jasa Resume/Ringkasan", price: 15000, category: "Umum" },
  { label: "Jasa Translate (ID-EN)", value: "Jasa Translate (ID-EN)", price: 20000, category: "Umum" },
  { label: "Cek Plagiasi (Turnitin)", value: "Cek Plagiasi (Turnitin)", price: 10000, category: "Umum" },

  // 6. IT Solutions
  { label: "Web Programming", value: "Web Programming", price: 300000, category: "IT Solutions" },
  { label: "Custom Development", value: "Custom Development", price: 300000, category: "IT Solutions" },
  { label: "Mobile Programming", value: "Mobile Programming", price: 300000, category: "IT Solutions" },
  { label: "Software Licensing", value: "Software Licensing", price: 300000, category: "IT Solutions" },
  
  // Custom
  { label: "Lainnya (Custom)", value: "Lainnya", price: 0, category: "Custom" }
];
