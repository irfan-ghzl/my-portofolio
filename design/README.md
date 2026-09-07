# Eksplorasi Arah Visual — Portofolio Ahmad Irfan Ghazali

Folder ini berisi **eksplorasi konsep visual** untuk situs portofolio: tiga arah
desain yang dieksplorasi berdampingan supaya bisa dibandingkan langsung, bukan
dibayangkan satu per satu.

## Tiga arah

| Arah | Nama | Inti gagasan |
| --- | --- | --- |
| **A** | Infrastruktur Nasional | Cyan dingin sebagai primer — angka terbaca seperti telemetri, bukan dekorasi. Amber dipakai jarang, jadi berarti. Violet hanya nada gradien: kedalaman tanpa hue ketiga yang bersaing. |
| **B** | Warm Editorial | Paling hangat dan paling "terbitan"; serif editorial dan warna tanah. Paling ramah dibaca, tapi paling jauh dari cerita skala nasional. |
| **C** | Indigo Depth | Indigo berlapis, rapi dan aman. Paling netral — juga paling mirip produk SaaS mana pun. |

Tiap arah ditampilkan dalam dua artboard: **UI penuh** (hero, stats band, kartu
proyek, pil status) di kiri, dan **palet + rasio kontras terukur** di kanan.
Baris terakhir menaruh ketiga hero berdampingan untuk perbandingan cepat.

Semua konten di dalamnya faktual, diambil dari CV.

## Cara membuka

Buka **`arah-visual-portofolio-irfan.html`** langsung di browser:

- klik dua kali file-nya, atau
- seret (drag) file-nya ke jendela Chrome.

**Tidak perlu server**, tidak perlu `npm install`, tidak perlu build. File itu
mandiri (self-contained, ~2,6 MB) — seluruh editor kanvas dan seluruh isi desain
ada di dalam satu file HTML tersebut.

Di dalam kanvas bisa digeser (pan), di-zoom, dan tiap artboard bisa diekspor ke
PNG/PDF.

## `sumber/`

Berisi kode sumber tiap artboard, sudah tertanam juga di dalam file HTML besar
di atas — disimpan terpisah agar mudah dibaca dan di-diff:

- `Main.dc.html` — Arah A, UI penuh
- `PaletA.dc.html` — Arah A, palet & kontras
- `ArahB.dc.html` / `PaletB.dc.html` — Arah B
- `ArahC.dc.html` / `PaletC.dc.html` — Arah C
- `Perbandingan.dc.html` — tiga hero berdampingan
- `canvas.json` — tata letak artboard di kanvas + catatan anotasi

Catatan: tiap `.dc.html` memanggil `./support.js`. File itu **tidak ada di
folder ini** dan memang tidak perlu ada — `support.js` disediakan oleh runtime
kanvas saat file HTML besar dijalankan. Membuka satu `.dc.html` sendirian di
browser tetap merender isinya, hanya tanpa perkakas kanvas. Untuk melihat hasil
sebenarnya, pakai `arah-visual-portofolio-irfan.html`.

## Status: situs memakai arah A

Per commit `c1cdb82` (`feat(ui): palet "Infrastruktur Nasional" + rombak
kepadatan halaman`), situs yang di-deploy sudah memakai **arah A —
Infrastruktur Nasional**. Arah B dan C disimpan di sini sebagai pembanding dan
rekam jejak keputusan.

## Folder ini TIDAK ikut ter-build

`design/` berada **di luar `src/` dan `public/`**, jadi Next.js tidak
menyentuhnya sama sekali:

- tidak ikut dalam static export (`next build` → `out/`),
- tidak muncul di situs yang dipublikasikan,
- tidak menambah ukuran bundle yang diunduh pengunjung.

Isinya murni arsip untuk dibaca dari checkout lokal.

## Boleh dihapus

Begitu arah visual sudah mantap dan tidak perlu dibanding-bandingkan lagi,
folder `design/` **aman dihapus seluruhnya**. Tidak ada kode di repo ini yang
mengimpor atau merujuk ke sini. Riwayatnya tetap tersimpan di Git kalau suatu
saat perlu ditengok lagi.

## Catatan soal font pada ekspor

Desain ini memakai **Google Fonts** (Space Grotesk, IBM Plex Sans/Mono,
Instrument Serif, Work Sans, Sora, DM Sans/Mono) yang dimuat dari jaringan.

- **Di browser**: font tampil benar (asalkan ada koneksi internet).
- **Di ekspor PNG/PDF**: font tersebut **tidak ikut ter-embed**. Teks pada hasil
  ekspor akan jatuh ke font sistem, sehingga tipografinya terlihat berbeda dari
  tampilan di layar.

Jadi untuk menilai tipografi, lihat langsung di browser — bukan dari file
ekspor. Ekspor tetap berguna untuk menilai komposisi, warna, dan tata letak.
