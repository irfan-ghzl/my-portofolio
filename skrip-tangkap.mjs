/**
 * Mengambil ulang empat gambar sampul kartu proyek dari halaman prototipe UI
 * di situs ini sendiri, lalu menulisnya ke `public/projects/`.
 *
 * Skrip perkakas, bukan bagian dari bundel situs. Butuh `playwright` yang bisa
 * diresolusi (mis. terpasang global) — `sharp` sudah ikut lewat Next.js.
 *
 * Cara pakai:
 *
 *   npm run build
 *   npx http-server out -p 4321 -s
 *   node skrip-tangkap.mjs
 *
 * Aturan yang dijaga skrip ini:
 *
 * - **Rasio 16:9**, diambil dari viewport 1600 × 900 apa adanya.
 * - **Bukan kepala halaman.** Sampul yang lama hampir seluruhnya berisi blok
 *   judul halaman, jadi keempat kartu terlihat kembar dan tidak menunjukkan
 *   antarmuka apa pun. Sekarang halaman digulir dulu sampai bagian yang berisi
 *   UI sungguhan (tab, tabel, kartu katalog, formulir) sebelum ditangkap.
 * - **Tema gelap**, sesuai tampilan bawaan situs.
 * - **JPEG progresif < 300 KB tanpa metadata** (tanpa EXIF/ICC).
 *
 * Pita penyangkalan tipis di puncak halaman tetap ikut terlihat karena
 * `position: sticky` — itu memang disengaja.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const BASE = process.env.BASIS ?? "http://127.0.0.1:4321";
const TUJUAN = path.join(process.cwd(), "public", "projects");
const LEBAR = 1600;
const TINGGI = 900;
const BATAS_BYTE = 300 * 1024;

/**
 * Satu entri per sampul. `tab` diklik lebih dulu bila diisi, lalu halaman
 * digulir sampai judul `sasaran` berada tepat di bawah pita.
 */
const SAMPUL = [
  {
    berkas: "pintour-travel.jpg",
    jalur: "/prototipe/pintour-travel/",
    sasaran: "Katalog paket wisata",
  },
  {
    berkas: "manajemen-program.jpg",
    jalur: "/prototipe/manajemen-program/",
    tab: "CRM leads",
    sasaran: "Integrasi",
  },
  {
    berkas: "pengaduan-masyarakat.jpg",
    jalur: "/prototipe/pengaduan/",
    tab: "Petugas",
    sasaran: "Peran",
  },
  {
    berkas: "rental-mobil.jpg",
    jalur: "/prototipe/rental-mobil/",
    sasaran: "Alur transaksi",
  },
];

/** Menurunkan mutu JPEG bertahap sampai berkasnya di bawah batas. */
async function keJpeg(png) {
  for (const mutu of [86, 80, 74, 68, 62, 56, 50]) {
    const buf = await sharp(png)
      .jpeg({ quality: mutu, progressive: true, mozjpeg: true })
      .toBuffer();
    if (buf.byteLength <= BATAS_BYTE) return { buf, mutu };
  }
  throw new Error("tidak bisa turun di bawah 300 KB");
}

const peramban = await chromium.launch();
const konteks = await peramban.newContext({
  viewport: { width: LEBAR, height: TINGGI },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const halaman = await konteks.newPage();
await halaman.addInitScript(() => {
  try {
    localStorage.setItem("tema", "dark");
  } catch {}
});

await mkdir(TUJUAN, { recursive: true });

for (const s of SAMPUL) {
  await halaman.goto(BASE + s.jalur, { waitUntil: "networkidle" });
  await halaman.evaluate(() =>
    document.documentElement.classList.add("dark", "js"),
  );

  if (s.tab) {
    await halaman.getByRole("tab", { name: s.tab, exact: true }).click();
    await halaman.waitForTimeout(250);
  }

  // Gulir sampai judul bagian berada tepat di bawah pita tipis.
  await halaman.evaluate((judul) => {
    const el = [...document.querySelectorAll("h2")].find(
      (h) => h.textContent?.trim() === judul,
    );
    if (!el) throw new Error(`judul tidak ditemukan: ${judul}`);
    window.scrollTo({
      // Cukup untuk memuat nomor bagian tanpa menyeret kepala halaman ikut.
      top: el.getBoundingClientRect().top + window.scrollY - 56,
      behavior: "instant",
    });
  }, s.sasaran);
  await halaman.waitForTimeout(400);

  const png = await halaman.screenshot({ type: "png" });
  const { buf, mutu } = await keJpeg(png);
  await writeFile(path.join(TUJUAN, s.berkas), buf);
  console.log(
    `${s.berkas.padEnd(26)} ${(buf.byteLength / 1024).toFixed(0).padStart(4)} KB  (mutu ${mutu})`,
  );
}

await peramban.close();
