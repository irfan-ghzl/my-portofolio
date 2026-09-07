# Portofolio — Ahmad Irfan Ghazali

Situs portofolio pribadi berbasis Next.js (App Router), TypeScript, dan Tailwind CSS.
Situs dibangun sebagai **static export**, sehingga bisa di-hosting di GitHub Pages
tanpa server Node.

## Menjalankan secara lokal

Prasyarat: Node.js 20 atau lebih baru.

```bash
npm install
npm run dev      # http://localhost:3000
```

Perintah lain:

```bash
npm run build    # build + static export ke folder ./out
npm run lint     # ESLint
```

Setelah `npm run build`, hasil situs statis ada di folder `out/`. Untuk melihat
hasilnya, jalankan server statis apa pun di folder tersebut, misalnya:

```bash
npx serve out
```

## Menyunting konten

**Seluruh isi situs berada di satu file: [`src/data/profile.ts`](src/data/profile.ts).**
Komponen di `src/components/` hanya membaca data dari file itu, jadi untuk
memperbarui konten tidak perlu menyentuh kode komponen.

Isi file tersebut:

| Ekspor           | Bagian di situs                                           |
| ---------------- | --------------------------------------------------------- |
| `identity`       | Nama, headline, tagline, lokasi, dan kontak               |
| `about`          | Paragraf bagian "Tentang" (satu string per paragraf)      |
| `stats`          | Angka-angka pada stats band                               |
| `experiences`    | Linimasa pengalaman kerja (urut dari terbaru)             |
| `projects`       | Daftar proyek                                             |
| `skills`         | Keahlian yang dikelompokkan per kategori                  |
| `education`      | Riwayat pendidikan                                        |
| `certifications` | Sertifikasi                                               |
| `navigation`     | Tautan menu (nilai `id` harus sama dengan id `<section>`) |

Semua struktur data punya tipe TypeScript, sehingga kesalahan penulisan akan
terdeteksi saat `npm run build`. Field opsional (misalnya `description` pada
proyek atau `gpa` pada pendidikan) boleh dihilangkan — bagian terkait tidak akan
dirender.

## Gambar

### Foto profil

Letakkan foto di `public/profile.jpg` (`.png` juga diterima). Path-nya diatur
lewat `identity.photo` di `profile.ts` dan defaultnya sudah `/profile.jpg`.
Selama berkasnya belum ada — atau gagal dimuat — Hero menampilkan monogram
inisial bergaya sistem desain, bukan gambar rusak. Setel `photo: null` untuk
memaksa monogram.

### Gambar sampul proyek

Letakkan di `public/projects/` lalu isi field `image` pada proyek terkait.
Panduan lengkap (nama berkas, rasio 16:9, ukuran) ada di
[`public/projects/README.md`](public/projects/README.md). Bila `image` kosong,
kartu proyek jatuh ke diagram arsitektur proyek itu, atau ke placeholder
tipografis bila diagramnya belum ada.

## Diagram arsitektur

Diagram di bagian Pengalaman dan Proyek adalah **SVG inline buatan tangan** di
[`src/components/diagrams/`](src/components/diagrams/) — bukan berkas gambar —
sehingga warnanya mengikuti token tema dan tetap terbaca di mode gelap maupun
terang. Setiap diagram punya `<title>` dan `<desc>` berbahasa Indonesia, dan
dibungkus area gulir mendatar yang bisa difokuskan lewat papan ketik saat layar
terlalu sempit.

Untuk memasang diagram pada sebuah entri, isi `diagram` (salah satu nilai
`DiagramKey`) dan `diagramCaption` pada `experiences` atau `projects` di
`profile.ts`. Pemetaan kunci → komponen ada di
[`src/components/diagrams/index.tsx`](src/components/diagrams/index.tsx).

## Struktur proyek

```
src/
  app/
    layout.tsx        # kerangka HTML, metadata, penerapan tema
    page.tsx          # susunan urutan seksi halaman
    globals.css       # Tailwind + token tema
  components/         # komponen per seksi (Hero, StatsBand, dst.)
    diagrams/         # diagram arsitektur (SVG inline buatan tangan)
  data/
    profile.ts        # SEMUA konten situs
  lib/                # helper kecil (path gambar, inisial)
public/               # aset statis
  profile.jpg         # foto profil (opsional; fallback ke monogram)
  projects/           # gambar sampul proyek (opsional) — lihat README di dalamnya
.github/workflows/    # workflow deploy GitHub Pages
```

## Tema

Mode gelap adalah default. Tombol di pojok kanan atas mengalihkan ke mode terang,
dan pilihan disimpan di `localStorage` dengan kunci `tema`.

## Deploy ke GitHub Pages

1. Push repositori ini ke GitHub.
2. Buka **Settings → Pages**, lalu pada **Source** pilih **GitHub Actions**.
3. Setiap push ke branch `main` akan memicu workflow
   [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) yang menjalankan
   `npm ci`, `npm run build`, lalu mengunggah folder `out/` ke GitHub Pages.
   Workflow juga bisa dijalankan manual lewat tab **Actions**
   (**Run workflow** / `workflow_dispatch`).

### Base path

Untuk _project site_ (`https://<user>.github.io/<repo>`), Next.js perlu tahu
prefiks path-nya. Workflow menghitungnya otomatis dan meneruskannya lewat
variabel lingkungan `NEXT_PUBLIC_BASE_PATH`.

- _User site_ (`<user>.github.io`) atau domain kustom → kosongkan
  `NEXT_PUBLIC_BASE_PATH`.
- Build lokal dengan base path tertentu:

  ```bash
  NEXT_PUBLIC_BASE_PATH=/nama-repo npm run build
  ```

Konfigurasinya ada di [`next.config.ts`](next.config.ts).
