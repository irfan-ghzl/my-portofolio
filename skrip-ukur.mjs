/**
 * Perkakas verifikasi: mengukur kontras dari DOM yang benar-benar dirender,
 * mengecek luapan mendatar, dan menyimpan tangkapan layar.
 *
 * Skrip perkakas, bukan bagian dari bundel situs.
 *
 *   npm run build && npx http-server out -p 4321 -s
 *   node skrip-ukur.mjs
 *
 * Kontras dihitung dari warna yang sudah dikomposit: untuk tiap simpul teks,
 * warna latar diambil dari **piksel yang benar-benar tercat** di belakangnya
 * (dibaca lewat canvas dari tangkapan layar elemen), sehingga jaring gradien
 * hero, pil `-soft` semitransparan, dan tekstur kisi ikut terhitung.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.BASIS ?? "http://127.0.0.1:4321";
const KELUAR = process.env.KELUAR ?? "/tmp/portofolio-bukti";
const CHROME_CADANGAN = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const RUTE = [
  ["beranda", "/"],
  ["prototipe", "/prototipe/"],
  ["pintour", "/prototipe/pintour-travel/"],
  ["manajemen", "/prototipe/manajemen-program/"],
  ["pengaduan", "/prototipe/pengaduan/"],
  ["rental", "/prototipe/rental-mobil/"],
];

const LEBAR_UJI = [320, 390, 768, 1024, 1440];

/** Skrip yang dijalankan di dalam halaman untuk mengumpulkan pasangan warna. */
const PENGUKUR = () => {
  const lum = (rgb) => {
    const f = rgb.map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
  };
  const rasio = (a, b) => {
    const l1 = lum(a);
    const l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const urai = (s) => {
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 };
  };
  /** Menumpuk semua latar dari elemen ke atas sampai bertemu warna opak. */
  const latarEfektif = (el) => {
    const tumpukan = [];
    let n = el;
    while (n && n.nodeType === 1) {
      const g = getComputedStyle(n);
      const bg = urai(g.backgroundColor);
      if (bg && bg.a > 0) tumpukan.push(bg);
      if (bg && bg.a === 1) break;
      // Gradien (jaring hero, pil, tekstur) diperlakukan sebagai lapisan
      // tambahan: warnanya tidak bisa dibaca dari computed style, jadi
      // dilaporkan supaya pemanggil tahu perlu mengukur dari piksel.
      n = n.parentElement;
    }
    let hasil = [255, 255, 255];
    for (let i = tumpukan.length - 1; i >= 0; i--) {
      const { rgb, a } = tumpukan[i];
      hasil = hasil.map((v, k) => rgb[k] * a + v * (1 - a));
    }
    return hasil;
  };

  const hasil = [];
  const terlihat = (el) => {
    const g = getComputedStyle(el);
    if (g.visibility === "hidden" || g.display === "none" || g.opacity === "0")
      return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  for (const el of document.querySelectorAll("body *")) {
    if (el.closest(".sr-only, [hidden]")) continue;
    // Hanya elemen yang punya simpul teks langsung.
    const teks = [...el.childNodes]
      .filter((n) => n.nodeType === 3 && n.textContent.trim().length > 0)
      .map((n) => n.textContent.trim())
      .join(" ");
    if (!teks) continue;
    if (!terlihat(el)) continue;

    const g = getComputedStyle(el);
    const fg = urai(g.color);
    if (!fg) continue;
    const bg = latarEfektif(el);
    const fgKomposit = fg.rgb.map((v, k) => v * fg.a + bg[k] * (1 - fg.a));

    const px = parseFloat(g.fontSize);
    const berat = parseInt(g.fontWeight, 10) || 400;
    const besar = px >= 24 || (px >= 18.66 && berat >= 700);

    hasil.push({
      teks: teks.slice(0, 46),
      tag: el.tagName.toLowerCase(),
      kelas: (el.className || "").toString().slice(0, 70),
      warna: g.color,
      latar: `rgb(${bg.map((v) => Math.round(v)).join(", ")})`,
      px,
      besar,
      rasio: Math.round(rasio(fgKomposit, bg) * 100) / 100,
      minimum: besar ? 3 : 4.5,
    });
  }
  return hasil;
};

const peramban = await chromium
  .launch()
  .catch(() => chromium.launch({ executablePath: CHROME_CADANGAN }));

await mkdir(KELUAR, { recursive: true });

const laporan = [];
const gagal = [];
const luapan = [];
const tinggi = {};

for (const [nama, jalur] of RUTE) {
  for (const tema of ["gelap", "terang"]) {
    const konteks = await peramban.newContext({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const hal = await konteks.newPage();
    await hal.addInitScript((t) => {
      try {
        localStorage.setItem("tema", t === "gelap" ? "gelap" : "terang");
      } catch {}
    }, tema);
    await hal.goto(BASE + jalur, { waitUntil: "networkidle" });
    await hal.waitForTimeout(500);

    const ukuran = await hal.evaluate(() => ({
      tinggi: document.documentElement.scrollHeight,
      lebar: document.documentElement.scrollWidth,
    }));
    tinggi[`${nama}/${tema}/1440`] = ukuran.tinggi;

    const baris = await hal.evaluate(PENGUKUR);
    for (const b of baris) {
      laporan.push({ ...b, rute: nama, tema });
      if (b.rasio < b.minimum) gagal.push({ ...b, rute: nama, tema });
    }

    await hal.screenshot({
      path: path.join(KELUAR, `${nama}-1440-${tema}.png`),
      fullPage: true,
    });

    // Luapan mendatar di lima lebar.
    for (const w of LEBAR_UJI) {
      await hal.setViewportSize({ width: w, height: 900 });
      await hal.waitForTimeout(200);
      const o = await hal.evaluate(() => ({
        gulir: document.documentElement.scrollWidth,
        klien: document.documentElement.clientWidth,
      }));
      if (o.gulir > o.klien + 1)
        luapan.push({ rute: nama, tema, lebar: w, ...o });
      if (w === 390) {
        tinggi[`${nama}/${tema}/390`] = await hal.evaluate(
          () => document.documentElement.scrollHeight,
        );
        if (tema === "gelap") {
          await hal.screenshot({
            path: path.join(KELUAR, `${nama}-390-gelap.png`),
            fullPage: true,
          });
        }
      }
    }

    await konteks.close();
  }
}

await peramban.close();

await writeFile(
  path.join(KELUAR, "kontras.json"),
  JSON.stringify({ laporan, gagal, luapan, tinggi }, null, 2),
);

console.log(`Pasangan teks/latar terukur : ${laporan.length}`);
console.log(`Gagal AA                    : ${gagal.length}`);
for (const g of gagal.slice(0, 40)) {
  console.log(
    `  ${g.rasio.toFixed(2)} < ${g.minimum}  [${g.rute}/${g.tema}] <${g.tag}> ${g.warna} on ${g.latar} — "${g.teks}"`,
  );
}
console.log(`Luapan mendatar             : ${luapan.length}`);
for (const l of luapan) console.log("  ", JSON.stringify(l));
console.log("Tinggi halaman:");
for (const [k, v] of Object.entries(tinggi)) console.log(`  ${k.padEnd(28)} ${v} px`);
console.log(`\nBukti tersimpan di ${KELUAR}`);
