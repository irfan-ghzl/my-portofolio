/**
 * Satu-satunya sumber konten untuk situs ini.
 *
 * Semua teks yang tampil di halaman berasal dari file ini. Untuk memperbarui
 * isi situs, cukup sunting nilai-nilai di bawah — tidak perlu menyentuh
 * komponen di `src/components/`.
 */

export type Identity = {
  name: string;
  headline: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  /**
   * Path foto profil relatif terhadap folder `public/`, mis. "/profile.jpg".
   *
   * Cukup letakkan berkasnya di `public/profile.jpg` (atau `.png` — varian
   * ekstensi lain otomatis dicoba bila yang pertama gagal dimuat). Bila berkas
   * belum ada, gagal dimuat, atau nilai ini `null`, Hero otomatis menampilkan
   * monogram inisial sebagai gantinya — jadi tidak akan ada gambar rusak.
   */
  photo: string | null;
};

/**
 * Kunci diagram arsitektur yang digambar tangan sebagai komponen SVG di
 * `src/components/diagrams/`. Pemetaan kunci → komponen ada di
 * `src/components/diagrams/index.tsx`.
 */
export type DiagramKey =
  | "belajar-id-pipeline"
  | "pintour-travel"
  | "manajemen-program"
  | "pengaduan"
  | "rental-mobil";

export type Stat = {
  /** Angka besar yang ditampilkan, mis. "30,7 juta" */
  value: string;
  /** Keterangan singkat di bawah angka */
  label: string;
  /**
   * Satu baris konteks pendukung di bawah label — dari mana angka itu berasal.
   *
   * Isinya **bukan klaim baru**: tiap kalimat adalah potongan langsung dari
   * butir pengalaman di `experiences` yang sudah ada di bawah, hanya dipotong
   * supaya muat satu baris. Sifatnya opsional dan murni penjelas.
   */
  context?: string;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  /** Ditandai true untuk posisi yang sedang berjalan */
  current?: boolean;
  bullets: string[];
  /** Diagram arsitektur yang ditampilkan di dalam kartu pengalaman. */
  diagram?: DiagramKey;
  /** Keterangan singkat di bawah diagram. Wajib bila `diagram` diisi. */
  diagramCaption?: string;
};

export type Project = {
  name: string;
  /** Opsional — kosongkan (hilangkan field) bila tidak ada deskripsi */
  description?: string;
  tech: string[];
  repos?: string[];
  /**
   * Gambar sampul proyek, relatif terhadap `public/`, mis.
   * "/projects/pintour-travel.jpg". Lihat `public/projects/README.md` untuk
   * nama berkas dan ukuran yang diharapkan.
   *
   * Bila kosong/null atau gagal dimuat, kartu jatuh ke diagram arsitektur
   * (`diagram`) bila ada; bila tidak ada juga, ke placeholder tipografis.
   */
  image?: string | null;
  /** Diagram arsitektur yang ditampilkan di dalam kartu proyek. */
  diagram?: DiagramKey;
  /** Keterangan singkat di bawah diagram. Wajib bila `diagram` diisi. */
  diagramCaption?: string;
  /**
   * Path halaman prototipe UI proyek ini, mis. "/prototipe/pintour-travel/".
   *
   * Halaman prototipe adalah **rekonstruksi antarmuka** yang dibuat khusus
   * untuk portofolio ini — bukan tangkapan layar, salinan, atau turunan kode
   * dari aplikasi produksi. Bila field ini diisi, kartu proyek menampilkan
   * tautan "Lihat prototipe" dan menandai gambar sampulnya dengan lencana
   * "PROTOTIPE". Lihat `src/data/prototipe.ts`.
   */
  prototype?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Education = {
  degree: string;
  school: string;
  location: string;
  period: string;
  gpa?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  validUntil?: string;
  credentialId?: string;
};

export type Profile = {
  identity: Identity;
  about: string[];
  stats: Stat[];
  experiences: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  certifications: Certification[];
};

export const identity: Identity = {
  name: "Ahmad Irfan Ghazali",
  headline: "Software Engineer — Backend Go & Infrastruktur Skala Besar",
  tagline:
    "Membangun sistem identitas dan lisensi untuk puluhan juta akun pendidikan di Indonesia",
  location: "Depok, Jawa Barat, Indonesia",
  email: "aigirfan.g@gmail.com",
  phone: "(+62) 87789509545",
  linkedin: "https://www.linkedin.com/in/ahmad-irfan-ghazali",
  github: "https://github.com/irfan-ghzl",
  photo: "/profile.jpg",
};

/** Setiap elemen array adalah satu paragraf. */
export const about: string[] = [
  "Saya seorang Software Engineer yang berfokus pada pengembangan backend dengan Go dan pengelolaan infrastruktur cloud berskala besar.",
  "Sejak 2023, karier saya berpusat pada satu misi: menjaga dan membangun platform akun belajar.id — sistem identitas yang digunakan puluhan juta pendidik, tenaga kependidikan, dan peserta didik di seluruh Indonesia. Saya memulainya dari sisi operasional, menangani tiket aduan dan menelusuri akar masalah langsung ke database, lalu bergerak ke pengelolaan keandalan database, dan kini ke pengembangan layanan backend-nya.",
  "Latar belakang operasional membuat saya terbiasa memperlakukan operasi produksi berisiko tinggi dengan serius — menyusun technical design document dan runbook, serta memverifikasi jumlah data bersama pemangku kepentingan sebelum eksekusi.",
];

export const stats: Stat[] = [
  {
    value: "30,7 juta",
    label: "Akun diprovisioning",
    context:
      "Dari ±50,7 juta data pendidik, tenaga kependidikan, dan peserta didik",
  },
  {
    value: "4,66 juta",
    label: "Akun dimigrasi lisensinya",
    context:
      "Lewat CLI batch dengan pacing adaptif terhadap kuota Licensing API dan replay idempoten",
  },
  {
    value: "20",
    label: "Layanan didukung (86 pod)",
    context:
      "Backend Go (gRPC, PostgreSQL, Kubernetes) penopang layanan belajar.id",
  },
  {
    value: "10",
    label: "CLI internal dibangun",
    context:
      "Berbasis Google Admin SDK dengan domain-wide delegation untuk audit storage dan pelaporan lisensi",
  },
];

export const experiences: Experience[] = [
  {
    role: "Junior Software Engineer",
    company: "Ina Digital Edu",
    location: "Jakarta",
    period: "Jan 2025 – Sekarang",
    current: true,
    bullets: [
      "Mengembangkan dan memelihara backend Go (gRPC, PostgreSQL, Kubernetes) penopang 20 layanan belajar.id di 86 pod, termasuk pipeline provisioning akun Google Workspace berbasis CDC dan Pub/Sub dengan consumer terpisah untuk 7 jenjang pendidikan.",
      "Merencanakan dan mengeksekusi migrasi lisensi Google Workspace 4,66 juta akun peserta didik lewat CLI batch dengan pacing adaptif terhadap kuota Licensing API dan replay idempoten, sehingga eksekusi dapat dilanjutkan tanpa duplikasi.",
      "Membangun fitur pengajuan upgrade lisensi end-to-end: submisi operator sekolah, validasi kelayakan, hingga surel keputusan lewat transactional outbox dengan relay worker terpisah.",
      "Menambahkan 51 unit test pada backend CMS Rumah Pendidikan, menutup lapisan client, repository, REST, dan RPC yang sebelumnya tanpa cakupan.",
      "Mengelola infrastruktur sebagai kode (Terraform, GCP): pemutakhiran Cloud SQL PostgreSQL ke v17, perampingan request CPU dan memori, enforcement 2SV pada 4 jenjang, dan remediasi CVE kritikal di 3 layanan.",
      "Membangun 10 CLI internal berbasis Google Admin SDK dengan domain-wide delegation untuk audit storage, penghapusan massal berkas Drive, dan pelaporan lisensi; memelihara Slack compliance bot pemantau kepatuhan 283 anggota organisasi.",
      "Menyusun technical design document dan runbook untuk operasi berisiko tinggi, termasuk verifikasi jumlah data bersama pemangku kepentingan sebelum eksekusi produksi.",
      "Bekerja dengan metode Scrum: daily standup, sprint planning, refinement, retrospektif, dan code review.",
    ],
    diagram: "belajar-id-pipeline",
    diagramCaption:
      "Pipeline provisioning akun Google Workspace belajar.id: perubahan data ditangkap lewat CDC, disebar melalui Pub/Sub, lalu diproses consumer terpisah untuk 7 jenjang pendidikan. Ditopang backend Go (gRPC, PostgreSQL, Kubernetes) yang menaungi 20 layanan di 86 pod.",
  },
  {
    role: "Back End Developer",
    company: "Kementerian Pendidikan dan Kebudayaan",
    location: "Jakarta",
    period: "Mar 2024 – Des 2024",
    bullets: [
      "Menjalankan peran super admin Google Workspace belajar.id untuk 7 jenjang pendidikan.",
      "Mengelola ±30,7 juta akun yang diprovisioning dari ±50,7 juta data pendidik, tenaga kependidikan, dan peserta didik.",
      "Menangani ±10 tiket aduan tereskalasi per hari terkait pengadaan dan penggunaan akun, menelusuri akar masalah lewat kueri SQL langsung ke database belajar.id.",
      "Berkoordinasi mingguan dengan tim Customer Operations untuk menindaklanjuti isu dan tiket yang masuk.",
    ],
  },
  {
    role: "Data Engineering",
    company: "PT GITS Indonesia",
    location: "Bandung",
    period: "Des 2023 – Feb 2024",
    bullets: [
      "Memastikan kapasitas dan keandalan 2 database PostgreSQL beserta server yang menopang platform Akun belajar.id.",
      "Mengoptimalkan performa server dan konfigurasi keamanan sepanjang siklus akun, dari proses pengadaan sampai penggunaan oleh pengguna akhir.",
      "Menyelaraskan spesifikasi desain teknis bersama Kemendikbudristek dan mitra eksternal.",
    ],
  },
  {
    role: "IT",
    company: "Kementerian Pendidikan dan Kebudayaan",
    location: "Jakarta",
    period: "Okt 2023 – Des 2023",
    bullets: [
      "Melakukan load testing aplikasi Rumah Belajar menggunakan Apache JMeter untuk mengukur ketahanan sistem terhadap beban pengguna.",
      "Menangani ±3 tiket aduan belajar.id, menelusuri data akun terdampak melalui kueri ke database.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Pintour Travel",
    description:
      "Aplikasi travel booking dengan arsitektur layanan terpisah: REST API berbasis Go dan frontend TypeScript sebagai aplikasi independen.",
    tech: ["Go", "TypeScript", "PostgreSQL"],
    // `travel-fe` dan `Travel` sudah tidak dipakai; hanya repositori ini yang
    // masih berjalan.
    repos: ["https://github.com/irfan-ghzl/pintour-travel"],
    image: "/projects/pintour-travel.jpg",
    prototype: "/prototipe/pintour-travel/",
    diagram: "pintour-travel",
    diagramCaption:
      "Frontend TypeScript dan REST API Go berjalan sebagai dua aplikasi independen, dengan PostgreSQL sebagai penyimpanan data.",
  },
  {
    name: "Sistem Full-Stack Manajemen Program",
    description:
      "Sistem full-stack mencakup katalog, CRM leads, invoice, hingga portal peserta, dengan integrasi WhatsApp Gateway (Fonnte), payment gateway (Midtrans), chatbot AI (Gemini), dan OCR self-hosted untuk ekstraksi dokumen. Didahului penyusunan PRD dengan 51 functional requirement dan 9 modul.",
    tech: ["Go/Echo", "React", "TypeScript", "PostgreSQL"],
    image: "/projects/manajemen-program.jpg",
    prototype: "/prototipe/manajemen-program/",
    diagram: "manajemen-program",
    diagramCaption:
      "Backend Go/Echo menaungi modul katalog, CRM leads, invoice, dan portal peserta, dengan integrasi ke Fonnte, Midtrans, Gemini, dan OCR self-hosted.",
  },
  {
    name: "Sistem Pengaduan Masyarakat",
    description:
      "Sistem pengaduan berbasis web dengan alur end-to-end: pelaporan, disposisi ke petugas, tanggapan, hingga notifikasi pelapor. Basis data 8 tabel dan REST API multi-role (masyarakat & petugas) dengan autentikasi JWT, hashing bcrypt, rate limiting, dan validasi input. Dilengkapi dokumentasi API, perancangan UML, dan panduan deployment berbasis Docker Compose.",
    tech: ["Node.js/Express", "React", "PostgreSQL", "Docker Compose"],
    image: "/projects/pengaduan-masyarakat.jpg",
    prototype: "/prototipe/pengaduan/",
    diagram: "pengaduan",
    diagramCaption:
      "Alur pengaduan dari pelaporan sampai notifikasi pelapor, di atas REST API multi-peran Node.js/Express dengan basis data 8 tabel, dijalankan lewat Docker Compose.",
  },
  {
    name: "CRM",
    description: "Sistem manajemen relasi pelanggan.",
    tech: ["JavaScript"],
    repos: ["https://github.com/irfan-ghzl/CRM"],
  },
  {
    name: "Aplikasi Rental Mobil",
    description:
      "Aplikasi web rental mobil dengan arsitektur MVC dan dua hak akses (admin dan penyewa). Alur transaksi end-to-end: katalog mobil dengan status ketersediaan, pemesanan, unggah bukti pembayaran, konfirmasi oleh admin, hingga pengembalian unit.",
    tech: ["PHP", "CodeIgniter 3", "MySQL", "Bootstrap"],
    image: "/projects/rental-mobil.jpg",
    prototype: "/prototipe/rental-mobil/",
    diagram: "rental-mobil",
    diagramCaption:
      "Arsitektur MVC CodeIgniter 3 dengan dua hak akses, serta alur transaksi dari katalog sampai pengembalian unit.",
  },
  {
    name: "Fasisi Project",
    tech: ["Go"],
    repos: ["https://github.com/irfan-ghzl/Fasisi-project"],
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Bahasa Pemrograman",
    items: ["Go", "TypeScript", "JavaScript", "PHP", "Python", "SQL"],
  },
  {
    category: "Backend & Framework",
    items: ["gRPC", "Echo", "Node.js/Express", "REST API", "CodeIgniter 3"],
  },
  { category: "Frontend", items: ["React", "Bootstrap", "HTML", "CSS"] },
  { category: "Database", items: ["PostgreSQL", "MySQL"] },
  {
    category: "Infrastruktur & DevOps",
    items: [
      "Kubernetes",
      "Terraform",
      "GCP",
      "Cloud SQL",
      "Docker Compose",
      "Pub/Sub",
      "CDC",
    ],
  },
  {
    category: "Keamanan",
    items: [
      "JWT",
      "bcrypt",
      "Rate Limiting",
      "2SV Enforcement",
      "Remediasi CVE",
    ],
  },
  {
    category: "Integrasi",
    items: [
      "Google Admin SDK",
      "Google Workspace API",
      "Midtrans",
      "Fonnte",
      "Gemini AI",
      "OCR",
    ],
  },
  {
    category: "Praktik & Metodologi",
    items: [
      "Scrum",
      "Code Review",
      "Unit Testing",
      "UML",
      "Technical Writing",
      "Apache JMeter",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of Sistem Informasi",
    school: "Universitas Bina Sarana Informatika",
    location: "Jakarta",
    period: "Sep 2025 – Des 2026 (Perkiraan)",
    gpa: "IPK 3.62/4.00",
  },
  {
    degree: "Diploma in Sistem Informasi",
    school: "Universitas Bina Sarana Informatika",
    location: "Jakarta",
    period: "Sep 2021 – Des 2024",
    gpa: "IPK 3.76/4.00",
  },
];

export const certifications: Certification[] = [
  {
    name: "Certificate of Competence Programmer",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    year: "2024",
    validUntil: "Berlaku hingga Feb 2027",
    credentialId: "620102514500035232024",
  },
  {
    name: "PCAP: Programming Essentials in Python",
    issuer: "Cisco Networking Academy",
    year: "2022",
  },
];

export const profile: Profile = {
  identity,
  about,
  stats,
  experiences,
  projects,
  skills,
  education,
  certifications,
};

/** Daftar tautan navigasi; `id` harus sama dengan id elemen <section>. */
export const navigation: { id: string; label: string }[] = [
  { id: "tentang", label: "Tentang" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "proyek", label: "Proyek" },
  { id: "keahlian", label: "Keahlian" },
  { id: "pendidikan", label: "Pendidikan" },
  { id: "sertifikasi", label: "Sertifikasi" },
  { id: "kontak", label: "Kontak" },
];

export default profile;
