export interface ServiceItem {
  label: string;
  value: string;
  price: number;
  category: string;
}

export const JokiServices: ServiceItem[] = [
  // 1. Jasa Tulis
  { label: "Buku Kecil A5", value: "Buku Kecil A5", price: 3000, category: "Jasa Tulis" },
  { label: "Buku Besar", value: "Buku Besar", price: 5000, category: "Jasa Tulis" },
  { label: "Kertas Folio", value: "Kertas Folio", price: 7000, category: "Jasa Tulis" },

  // 2. Jasa Tugas
  { label: "Makalah", value: "Makalah", price: 5000, category: "Jasa Tugas" },
  { label: "Esai", value: "Esai", price: 5000, category: "Jasa Tugas" },
  { label: "Artikel", value: "Artikel", price: 30000, category: "Jasa Tugas" },
  { label: "Artikel Jurnal", value: "Artikel Jurnal", price: 50000, category: "Jasa Tugas" },
  { label: "Proposal", value: "Proposal", price: 5000, category: "Jasa Tugas" },
  { label: "Laporan", value: "Laporan", price: 5000, category: "Jasa Tugas" },
  { label: "Resume/Review", value: "Resume/Review", price: 5000, category: "Jasa Tugas" },
  { label: "PPT (Tanpa Animasi)", value: "PPT (Tanpa Animasi)", price: 2000, category: "Jasa Tugas" },
  { label: "Pembuatan Kuesioner", value: "Pembuatan Kuesioner", price: 10000, category: "Jasa Tugas" },
  { label: "Membuat Cerpen (Cust)", value: "Membuat Cerpen (Cust)", price: 15000, category: "Jasa Tugas" },
  { label: "Membuat Cerpen (Mifa)", value: "Membuat Cerpen (Mifa)", price: 25000, category: "Jasa Tugas" },
  { label: "Buat Modul (Word)", value: "Buat Modul (Word)", price: 5000, category: "Jasa Tugas" },
  { label: "Buat Modul (Canva)", value: "Buat Modul (Canva)", price: 10000, category: "Jasa Tugas" },
  { label: "Soal SD-Mahasiswa", value: "Soal SD-Mahasiswa", price: 0, category: "Jasa Tugas" },

  // 3. Jasa Ketik
  { label: "Microsoft Word", value: "Microsoft Word", price: 3000, category: "Jasa Ketik" },
  { label: "Excel", value: "Excel", price: 3000, category: "Jasa Ketik" },
  { label: "Bahasa Inggris", value: "Bahasa Inggris", price: 3000, category: "Jasa Ketik" },
  { label: "Rumus Matematika (Word)", value: "Rumus Matematika (Word)", price: 3000, category: "Jasa Ketik" },

  // 4. Jasa Formatting File
  { label: "Daftar Isi/Gambar/Tabel", value: "Daftar Isi/Gambar/Tabel", price: 5000, category: "Jasa Formatting" },
  { label: "Merapikan Isi File", value: "Merapikan Isi File", price: 1000, category: "Jasa Formatting" },
  { label: "Penomoran Halaman", value: "Penomoran Halaman", price: 1000, category: "Jasa Formatting" },
  { label: "Koreksi Typo", value: "Koreksi Typo", price: 1000, category: "Jasa Formatting" },
  { label: "Add Dapus (Mendeley)", value: "Add Dapus (Mendeley)", price: 2000, category: "Jasa Formatting" },
  { label: "Add Dapus (Manual)", value: "Add Dapus (Manual)", price: 3000, category: "Jasa Formatting" },
  { label: "Cari Sumber & Dapus", value: "Cari Sumber & Dapus", price: 5000, category: "Jasa Formatting" },

  // 5. Jasa Edit
  { label: "CV Professional", value: "CV Professional", price: 10000, category: "Jasa Edit" },
  { label: "Surat Lamaran Kerja", value: "Surat Lamaran Kerja", price: 10000, category: "Jasa Edit" },
  { label: "Buat Poster", value: "Buat Poster", price: 10000, category: "Jasa Edit" },
  { label: "Undangan Pernikahan Web", value: "Undangan Pernikahan Web", price: 50000, category: "Jasa Edit" },
  { label: "Sertifikat Digital", value: "Sertifikat Digital", price: 10000, category: "Jasa Edit" },
  { label: "Feed IG Menarik", value: "Feed IG Menarik", price: 10000, category: "Jasa Edit" },
  { label: "Mind Map / Flowchart", value: "Mind Map / Flowchart", price: 5000, category: "Jasa Edit" },
  { label: "Edit Foto Sederhana", value: "Edit Foto Sederhana", price: 5000, category: "Jasa Edit" },

  // 6. IT Solutions
  { label: "Web Programming", value: "Web Programming", price: 300000, category: "IT Solutions" },
  { label: "Custom Development", value: "Custom Development", price: 300000, category: "IT Solutions" },
  { label: "Mobile Programming", value: "Mobile Programming", price: 300000, category: "IT Solutions" },
  { label: "Software Licensing", value: "Software Licensing", price: 300000, category: "IT Solutions" },
  
  // Custom
  { label: "Lainnya (Umum)", value: "Lainnya", price: 0, category: "Custom" }
];
