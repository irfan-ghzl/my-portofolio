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

Gambar di folder ini harus berasal dari materi milik sendiri: tangkapan layar
aplikasi yang sungguhan, foto, atau — seperti keempat berkas yang ada sekarang —
tangkapan halaman prototipe UI di situs ini. Yang tidak boleh adalah gambar yang
**bisa disalahartikan** sebagai tampilan aplikasi produksi padahal bukan. Karena
itu sampul yang berasal dari prototipe wajib ditandai; lihat bagian berikutnya.

## Sampul dari halaman prototipe

Empat berkas yang ada sekarang — `pintour-travel.jpg`,
`manajemen-program.jpg`, `pengaduan-masyarakat.jpg`, dan `rental-mobil.jpg` —
**bukan** tangkapan layar aplikasi produksi. Keempatnya adalah tangkapan
otomatis dari halaman prototipe UI di situs ini sendiri
(`/prototipe/<slug>/`, lihat [`src/data/prototipe.ts`](../../src/data/prototipe.ts)),
yaitu rekonstruksi antarmuka yang dibuat khusus untuk portofolio ini.

Karena itu berlaku dua aturan berikut:

1. Setiap halaman prototipe memuat pita penyangkalan permanen di puncak
   halaman, dan tangkapan diambil dari puncak halaman sehingga pita itu selalu
   ikut terlihat di dalam gambar.
2. Proyek yang mengisi field `prototype` di `profile.ts` otomatis mendapat
   lencana **PROTOTIPE** di sudut gambar sampulnya beserta keterangan di
   bawahnya, ditambah teks alternatif yang menyebut bahwa gambar tersebut bukan
   aplikasi produksi.

Bila suatu saat sampul diganti dengan tangkapan layar aplikasi yang sungguhan,
hapus juga field `prototype` pada proyek itu agar lencana "PROTOTIPE" tidak
lagi tampil.

### Cara mengambil ulang

```bash
npm run build
npx http-server out -p 4321 -s          # sajikan hasil static export
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node skrip-tangkap.mjs
```

Tangkapan diambil pada viewport 1600 × 900 (16 : 9), tema gelap, `scrollY = 0`,
lalu dikonversi ke JPEG progresif tanpa metadata (EXIF/ICC) dengan target di
bawah 300 KB per berkas.
