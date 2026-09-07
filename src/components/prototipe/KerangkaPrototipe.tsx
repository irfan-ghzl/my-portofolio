import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { PrototipeMeta } from "@/data/prototipe";
import { PENYANGKALAN_PROTOTIPE } from "@/data/prototipe";
import { BlokPenyangkalan, PitaTipis } from "./Penyangkalan";

/**
 * Kerangka bersama semua halaman prototipe.
 *
 * Penyangkalannya muncul dua kali dan hanya dua kali:
 *
 * 1. **Pita tipis yang melekat** (±24 px) — latar amber sangat tipis, teks
 *    amber. Tetap ada sepanjang halaman digulir, tetapi tidak lagi memotong
 *    judul atau mengambil sepersepuluh layar ponsel. Ditandai `aria-hidden`
 *    karena isinya sama persis dengan blok di bawahnya.
 * 2. **Blok penyangkalan di kepala halaman** — tidak melekat, kontras tinggi,
 *    dan pasti ikut terlihat pada tangkapan layar mana pun dari puncak halaman.
 *    Ini yang dibacakan pembaca layar (`role="note"`).
 *
 * Catatan kaki menutup dengan satu paragraf. Lencana "data contoh" per widget
 * sudah dihapus dari keempat prototipe — cukup satu penanda per halaman.
 */
export default function KerangkaPrototipe({
  meta,
  children,
}: {
  meta: PrototipeMeta;
  children: ReactNode;
}) {
  return (
    <div className="laman-prototipe">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-10 focus:left-3 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[#0a0a0b]"
      >
        Lompat ke konten utama
      </a>

      <PitaTipis />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="border-b border-line py-8 sm:py-10">
          <Link
            href="/#proyek"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-ink-3 uppercase transition-colors hover:text-accent-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Kembali ke portofolio
          </Link>

          <p className="mt-6 font-mono text-[11px] tracking-[0.24em] text-accent-ink uppercase">
            {meta.kategori}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-balance text-ink sm:text-4xl">
            {meta.proyek}
          </h1>
          <p className="mt-4 max-w-[70ch] text-[0.9375rem] leading-[1.7] text-ink-2">
            {meta.ringkas}
          </p>

          <BlokPenyangkalan className="mt-6">
            Seluruh nama, angka, dan dokumen di halaman ini adalah data contoh
            fiktif.
          </BlokPenyangkalan>

          <ul aria-label="Teknologi" className="mt-6 flex flex-wrap gap-2">
            {meta.tech.map((t) => (
              <li
                key={t}
                className="border border-line bg-bg-soft px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-2"
              >
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-4 font-mono text-[11px] leading-[1.7] tracking-[0.14em] text-ink-3 uppercase">
            Cakupan: {meta.cakupan.join(" · ")}
          </p>
        </header>

        <main id="konten" className="py-10 sm:py-14">
          {children}
        </main>

        <footer className="border-t border-line py-10">
          <p className="max-w-[70ch] text-[0.8125rem] leading-[1.7] text-ink-3">
            {PENYANGKALAN_PROTOTIPE} Tidak ada permintaan jaringan, tidak ada
            login, dan tidak ada data yang disimpan.
          </p>
        </footer>
      </div>
    </div>
  );
}
