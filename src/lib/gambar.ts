/**
 * Bantuan kecil seputar aset gambar di folder `public/`.
 *
 * Prefiks base path (mis. saat dipasang di GitHub Pages project site) sudah
 * ditangani otomatis oleh `next/image`, jadi path di sini ditulis apa adanya
 * relatif terhadap `public/`.
 */

/**
 * Daftar kandidat berkas untuk satu path gambar: path aslinya lebih dulu, lalu
 * satu varian ekstensi pengganti (`.jpg` ⇄ `.png`). Dipakai agar cukup menaruh
 * `profile.jpg` **atau** `profile.png` tanpa perlu menyunting kode.
 */
export function kandidatGambar(path: string): string[] {
  const cocok = /\.(jpe?g|png|webp)$/i.exec(path);
  if (!cocok) return [path];

  const dasar = path.slice(0, cocok.index);
  const pengganti = cocok[0].toLowerCase() === ".png" ? ".jpg" : ".png";

  return [path, `${dasar}${pengganti}`];
}

/**
 * Path varian tema terang dari sebuah sampul: `/a/b.jpg` → `/a/b-terang.jpg`.
 *
 * Berkas tanpa ekstensi yang dikenali dikembalikan apa adanya.
 */
export function varianTerang(path: string): string {
  const cocok = /\.(jpe?g|png|webp)$/i.exec(path);
  if (!cocok) return path;
  return `${path.slice(0, cocok.index)}-terang${cocok[0]}`;
}

/**
 * Melengkapi path di `public/` dengan base path deploy (mis. "/my-portofolio"
 * pada GitHub Pages project site).
 *
 * `next/image` dan `next/link` melakukannya otomatis; latar CSS tidak, jadi
 * pemakaian di `url(...)` harus memanggil ini sendiri.
 */
export function asetPublik(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

/**
 * Inisial dari sebuah nama, maksimal tiga huruf.
 * "Ahmad Irfan Ghazali" → "AIG".
 */
export function inisial(nama: string, maks = 3): string {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, maks)
    .map((kata) => kata[0]!.toUpperCase())
    .join("");
}
