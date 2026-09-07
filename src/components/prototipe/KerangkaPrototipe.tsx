import { ArrowLeft, TriangleAlert } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { PrototipeMeta } from "@/data/prototipe";
import { PENYANGKALAN_PROTOTIPE } from "@/data/prototipe";

/**
 * Kerangka bersama semua halaman prototipe.
 *
 * Isinya, dari atas ke bawah:
 * 1. Pita penyangkalan — selalu dirender, melekat di puncak layar, tidak bisa
 *    ditutup. Wajib ikut terlihat pada tangkapan layar apa pun dari halaman ini.
 * 2. Tautan kembali ke portofolio.
 * 3. Judul proyek (satu-satunya `h1` di halaman) + ringkasan + chip teknologi.
 * 4. Slot konten prototipe.
 */
export default function KerangkaPrototipe({
  meta,
  children,
}: {
  meta: PrototipeMeta;
  children: ReactNode;
}) {
  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-14 focus:left-3 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[#0a0a0b]"
      >
        Lompat ke konten utama
      </a>

      {/* Pita penyangkalan. Sengaja memakai latar aksen penuh supaya kontrasnya
          tinggi di kedua tema dan tidak mungkin terlewat pada tangkapan layar. */}
      <div
        role="note"
        aria-label="Penyangkalan prototipe"
        className="sticky top-0 z-50 bg-accent text-[#0a0a0b] shadow-[0_1px_0_rgba(10,10,11,0.25)]"
      >
        <p className="mx-auto flex max-w-6xl items-start gap-2.5 px-5 py-2.5 text-[0.8125rem] leading-snug font-medium sm:px-8">
          <TriangleAlert
            className="mt-[3px] h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <span>
            <strong className="font-mono text-[0.75rem] font-bold tracking-[0.14em] uppercase">
              Prototipe UI
            </strong>{" "}
            — rekonstruksi antarmuka untuk keperluan portofolio,{" "}
            <strong className="font-semibold">
              bukan tangkapan layar aplikasi produksi
            </strong>
            .
          </span>
        </p>
      </div>

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
        </header>

        <main id="konten" className="py-10 sm:py-14">
          {children}
        </main>

        <footer className="border-t border-line py-10">
          <p className="max-w-[70ch] text-[0.8125rem] leading-[1.7] text-ink-3">
            {PENYANGKALAN_PROTOTIPE} Seluruh nama, angka, dan dokumen di halaman
            ini adalah <strong className="text-ink-2">data contoh</strong> yang
            dibuat fiktif. Tidak ada permintaan jaringan, tidak ada login, dan
            tidak ada data yang disimpan.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
            Cakupan yang diperagakan: {meta.cakupan.join(" · ")}
          </p>
        </footer>
      </div>
    </>
  );
}
