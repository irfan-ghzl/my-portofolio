/**
 * Metadata halaman prototipe UI.
 *
 * PENTING — halaman di `/prototipe/*` adalah **rekonstruksi antarmuka** yang
 * dibuat khusus untuk portofolio ini. Bukan tangkapan layar, bukan salinan, dan
 * bukan turunan kode dari aplikasi produksi mana pun. Semua data yang tampil di
 * dalamnya adalah data contoh yang sengaja dibuat fiktif.
 *
 * Setiap fitur yang ditampilkan harus bisa ditelusuri ke deskripsi proyek yang
 * sudah ada di `src/data/profile.ts`. Jangan menambah fitur yang tidak
 * disebutkan di sana.
 */

export type PrototipeMeta = {
  /** Segmen URL: `/prototipe/<slug>/`. */
  slug: string;
  /** Harus persis sama dengan `name` proyek terkait di `profile.ts`. */
  proyek: string;
  /** Label jenis produk, tampil kecil di atas judul. */
  kategori: string;
  /** Satu kalimat penjelas, diturunkan dari deskripsi proyek di `profile.ts`. */
  ringkas: string;
  /** Chip teknologi yang ditampilkan di kepala halaman prototipe. */
  tech: string[];
  /** Daftar modul/alur yang diperagakan — semuanya berasal dari `profile.ts`. */
  cakupan: string[];
};

export const daftarPrototipe: PrototipeMeta[] = [
  {
    slug: "pintour-travel",
    proyek: "Pintour Travel",
    kategori: "Travel booking",
    ringkas:
      "Katalog paket wisata, detail paket, dan formulir pemesanan di atas REST API Go dengan frontend TypeScript dan PostgreSQL.",
    tech: ["Go — REST API", "TypeScript — frontend", "PostgreSQL"],
    cakupan: ["Katalog paket", "Detail paket", "Formulir pemesanan"],
  },
  {
    slug: "manajemen-program",
    proyek: "Sistem Full-Stack Manajemen Program",
    kategori: "Dashboard admin",
    ringkas:
      "Empat modul terdokumentasi — katalog, CRM leads, invoice, dan portal peserta — beserta status integrasi Fonnte, Midtrans, Gemini, dan OCR self-hosted.",
    tech: ["Go/Echo", "React", "TypeScript", "PostgreSQL"],
    cakupan: [
      "Katalog",
      "CRM leads",
      "Invoice",
      "Portal peserta",
      "Integrasi Fonnte / Midtrans / Gemini / OCR",
    ],
  },
  {
    slug: "pengaduan",
    proyek: "Sistem Pengaduan Masyarakat",
    kategori: "Layanan publik",
    ringkas:
      "Alur end-to-end pelaporan → disposisi → tanggapan → notifikasi, dengan dua peran: masyarakat dan petugas.",
    tech: ["Node.js/Express", "React", "PostgreSQL", "Docker Compose"],
    cakupan: [
      "Peran masyarakat",
      "Peran petugas",
      "Pelaporan",
      "Disposisi",
      "Tanggapan",
      "Notifikasi",
    ],
  },
  {
    slug: "rental-mobil",
    proyek: "Aplikasi Rental Mobil",
    kategori: "Transaksi sewa",
    ringkas:
      "Katalog mobil dengan status ketersediaan, pemesanan, unggah bukti pembayaran, konfirmasi admin, sampai pengembalian unit.",
    tech: ["PHP", "CodeIgniter 3", "MySQL", "Bootstrap"],
    cakupan: [
      "Katalog & ketersediaan",
      "Pemesanan",
      "Bukti pembayaran",
      "Konfirmasi admin",
      "Pengembalian unit",
    ],
  },
];

/** Metadata satu prototipe berdasarkan slug-nya, atau `undefined`. */
export function prototipeUntuk(slug: string): PrototipeMeta | undefined {
  return daftarPrototipe.find((p) => p.slug === slug);
}

/**
 * Kalimat penyangkalan yang wajib tampil di setiap halaman prototipe dan
 * dipakai juga sebagai teks alternatif gambar sampul kartu proyek.
 */
export const PENYANGKALAN_PROTOTIPE =
  "PROTOTIPE UI — rekonstruksi antarmuka untuk keperluan portofolio, bukan tangkapan layar aplikasi produksi.";
