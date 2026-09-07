import { experiences, projects, type SkillGroup } from "@/data/profile";

/**
 * Bobot keahlian — hierarki visual dinding keahlian.
 *
 * Dinding keahlian yang lama adalah 41 pil yang bentuknya persis sama, jadi
 * tidak ada satu pun yang menonjol. Sekarang tiap keahlian punya tingkat, dan
 * tingkat itu **diturunkan dari data yang sudah ada di `profile.ts`** — tidak
 * ada satu pun angka kemahiran, bintang, atau persentase yang dikarang:
 *
 *   +3  disebut di butir pengalaman peran yang sedang berjalan (`current`)
 *   +1  disebut di butir pengalaman peran sebelumnya
 *   +1  per proyek yang mencantumkannya di `tech`
 *   +1  per proyek yang menyebutnya di `description`
 *
 * Skor ≥3 → "inti", 1–2 → "pendukung", 0 → "lainnya". Skor itu hanyalah
 * hitungan seberapa sering sebuah nama sudah muncul di halaman ini; ia tidak
 * mengklaim apa pun tentang tingkat penguasaan.
 */

export type Tingkat = "inti" | "pendukung" | "lainnya";

export type KeahlianBerbobot = {
  nama: string;
  skor: number;
  tingkat: Tingkat;
};

export type KelompokBerbobot = {
  category: string;
  items: KeahlianBerbobot[];
};

/**
 * Apakah `nama` muncul sebagai kata utuh di `teks`?
 *
 * Batasnya hanya huruf dan angka, bukan `\b`, supaya "Go/Echo" terhitung untuk
 * "Go" maupun "Echo", sementara "Google" tidak terhitung untuk "Go".
 */
function menyebut(nama: string, teks: string): boolean {
  const aman = nama.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![\\p{L}\\d])${aman}(?![\\p{L}\\d])`, "iu").test(teks);
}

const butirSekarang = experiences
  .filter((e) => e.current)
  .flatMap((e) => e.bullets)
  .join("\n");

const butirSebelumnya = experiences
  .filter((e) => !e.current)
  .flatMap((e) => e.bullets)
  .join("\n");

export function skorKeahlian(nama: string): number {
  let skor = 0;
  if (menyebut(nama, butirSekarang)) skor += 3;
  if (menyebut(nama, butirSebelumnya)) skor += 1;
  for (const p of projects) {
    if (p.tech.some((t) => menyebut(nama, t))) skor += 1;
    if (p.description && menyebut(nama, p.description)) skor += 1;
  }
  return skor;
}

export function tingkatKeahlian(skor: number): Tingkat {
  if (skor >= 3) return "inti";
  if (skor >= 1) return "pendukung";
  return "lainnya";
}

/**
 * Memberi bobot pada satu kelompok keahlian dan mengurutkan isinya dari yang
 * paling sering muncul. Urutan asal dipertahankan untuk skor yang sama.
 */
export function beriBobot(group: SkillGroup): KelompokBerbobot {
  const items = group.items
    .map((nama, i) => {
      const skor = skorKeahlian(nama);
      return { nama, skor, tingkat: tingkatKeahlian(skor), i };
    })
    .sort((a, b) => b.skor - a.skor || a.i - b.i)
    .map(({ nama, skor, tingkat }) => ({ nama, skor, tingkat }));

  return { category: group.category, items };
}
