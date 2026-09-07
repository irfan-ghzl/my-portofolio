# Gambar sampul proyek

Folder ini menampung gambar sampul (cover) yang tampil di kartu proyek pada
bagian **Proyek**. Folder boleh dibiarkan kosong — bila tidak ada gambar, kartu
otomatis menampilkan diagram arsitektur proyek tersebut, atau placeholder
tipografis bila diagramnya pun belum ada. Tidak akan pernah muncul gambar rusak
atau kotak kosong.

## Cara menambahkan

1. Letakkan berkas gambar di folder ini.
2. Isi field `image` pada proyek yang bersangkutan di
   [`src/data/profile.ts`](../../src/data/profile.ts) dengan path-nya, mis.:

   ```ts
   {
     name: "Pintour Travel",
     image: "/projects/pintour-travel.jpg",
     // ...
   }
   ```

Jika `image` dibiarkan `null` (atau field-nya dihapus), slot media jatuh ke
diagram/placeholder seperti dijelaskan di atas.

## Nama berkas yang diharapkan

Nama bebas, tapi disarankan memakai slug nama proyek dengan huruf kecil dan
tanda hubung:

| Proyek                              | Nama berkas yang disarankan |
| ----------------------------------- | --------------------------- |
| Pintour Travel                      | `pintour-travel.jpg`        |
| Sistem Full-Stack Manajemen Program | `manajemen-program.jpg`     |
| Sistem Pengaduan Masyarakat         | `pengaduan-masyarakat.jpg`  |
| CRM                                 | `crm.jpg`                   |
| Aplikasi Rental Mobil               | `rental-mobil.jpg`          |
| Fasisi Project                      | `fasisi-project.jpg`        |

Ekstensi `.jpg` dan `.png` sama-sama diterima. Bila path yang ditulis di
`profile.ts` berakhiran `.jpg` tetapi yang ada di folder ini adalah `.png`
(atau sebaliknya), varian satunya otomatis dicoba sebelum jatuh ke cadangan.

## Ukuran dan format

- **Rasio:** 16 : 9 (slot media memakai `aspect-[16/9]` dan `object-cover`,
  jadi gambar dengan rasio lain akan terpotong di sisi terpanjang).
- **Ukuran ideal:** 1600 × 900 piksel. Minimum yang masih tajam: 1200 × 675.
- **Format:** JPEG untuk foto/tangkapan layar, PNG bila butuh transparansi atau
  garis tajam.
- **Ukuran berkas:** usahakan di bawah ±300 KB per gambar. Situs ini adalah
  static export dengan `images.unoptimized`, jadi gambar dikirim apa adanya
  tanpa dikompres ulang oleh Next.js.
- **Kontras:** gambar tampil di tema gelap maupun terang — hindari sampul yang
  hampir putih polos atau hampir hitam polos.

## Catatan

Gambar di folder ini harus benar-benar berasal dari proyek yang bersangkutan
(tangkapan layar asli, foto, atau materi milik sendiri). Jangan memakai mockup
atau gambar hasil rekaan yang bisa disalahartikan sebagai tampilan aplikasi
yang sebenarnya.
