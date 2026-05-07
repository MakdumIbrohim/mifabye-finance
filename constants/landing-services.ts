export interface LandingServiceItem {
  name: string;
  price: string;
  slug?: string;
}

export interface LandingServiceCategory {
  category: string;
  color: string;
  badge?: string;
  items: LandingServiceItem[];
}

export const landingServices: LandingServiceCategory[] = [
  {
    category: "1. Jasa Tulis",
    color: "bg-primary",
    items: [
      { name: "Buku Kecil A5", price: "Rp 3.000/Halaman" },
      { name: "Buku Besar", price: "Rp 5.000/Halaman" },
      { name: "Kertas Folio", price: "Rp 7.000/Halaman" },
    ]
  },
  {
    category: "2. Jasa Tugas",
    color: "bg-primary",
    items: [
      { name: "Makalah", price: "Rp 5.000/Halaman" },
      { name: "Esai", price: "Rp 5.000/Halaman" },
      { name: "Artikel", price: "mulai Rp 30.000" },
      { name: "Artikel Jurnal", price: "mulai Rp 50.000" },
      { name: "Proposal", price: "Rp 5.000/Halaman" },
      { name: "Laporan", price: "Rp 5.000/Halaman" },
      { name: "Resume/Review", price: "Rp 5.000/Halaman" },
      { name: "PPT (Tanpa Animasi)", price: "Rp 2.000/Slide" },
      { name: "Pembuatan Kuesioner", price: "Rp 10.000" },
      { name: "Membuat Cerpen (Cust)", price: "Rp 15.000" },
      { name: "Membuat Cerpen (Mifa)", price: "Rp 25.000" },
      { name: "Buat Modul (Word)", price: "Rp 5.000/Halaman" },
      { name: "Buat Modul (Canva)", price: "Rp 10.000/Halaman" },
      { name: "Soal SD-Mahasiswa", price: "Menyesuaikan" },
    ]
  },
  {
    category: "3. Jasa Ketik",
    color: "bg-primary",
    items: [
      { name: "Microsoft Word", price: "Rp 3.000/Halaman" },
      { name: "Excel", price: "Rp 3.000/Halaman" },
      { name: "Bahasa Inggris", price: "Rp 3.000/Halaman" },
      { name: "Rumus Matematika (Word)", price: "Rp 3.000/Halaman" },
    ]
  },
  {
    category: "4. Jasa Formatting File",
    color: "bg-primary",
    items: [
      { name: "Daftar Isi/Gambar/Tabel", price: "Rp 5.000/Halaman" },
      { name: "Merapikan Isi File", price: "Rp 1.000/Halaman" },
      { name: "Penomoran Halaman", price: "Rp 1.000/2   Halaman" },
      { name: "Koreksi Typo", price: "Rp 1.000/2 Halaman" },
      { name: "Add Dapus (Mendeley)", price: "Rp 2.000/Sumber" },
      { name: "Add Dapus (Manual)", price: "Rp 3.000/Sumber" },
      { name: "Cari Sumber & Dapus", price: "Rp 5.000/Sumber" },
    ]
  },
  {
    category: "5. Jasa Edit",
    color: "bg-primary",
    items: [
      { name: "CV Professional", price: "Rp 10.000" },
      { name: "Surat Lamaran Kerja", price: "Rp 10.000 - Rp 20.000" },
      { name: "Buat Poster", price: "Rp 10.000 - Rp 40.000" },
      { name: "Undangan Pernikahan Web", price: "Rp 50.000 - Rp 150.000" },
      { name: "Sertifikat Digital", price: "Rp 10.000/Sertifikat" },
      { name: "Feed IG Menarik", price: "Rp 10.000/Feed" },
      { name: "Mind Map / Flowchart", price: "Rp 5.000 - Rp 10.000" },
      { name: "Edit Foto Sederhana", price: "Rp 5.000/Foto" },
    ]
  },
  {
    category: "6. IT Solutions",
    color: "bg-primary",
    badge: "START FROM RP300.000",
    items: [
      { name: "Web Programming", price: "Mulai Rp 300.000" },
      { name: "Custom Development", price: "Mulai Rp 300.000" },
      { name: "Mobile Programming", price: "Mulai Rp 300.000" },
      { name: "Software Licensing", price: "Mulai Rp 300.000", slug: "software-licensing" },
    ]
  }
];
